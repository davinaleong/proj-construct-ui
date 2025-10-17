import { screen, render } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { StaticTable } from "./StaticTable"
import type {
  StaticTableProps,
  StaticTableColumn,
  StaticTableRow,
} from "./types"

// Helper function to create test columns
const createTestColumns = (): StaticTableColumn[] => [
  {
    key: "id",
    label: "ID",
    align: "center",
    width: "80px",
  },
  {
    key: "name",
    label: "Name",
    align: "left",
  },
  {
    key: "email",
    label: "Email",
    align: "left",
  },
  {
    key: "status",
    label: "Status",
    align: "center",
    colorVariant: "success",
  },
]

// Helper function to create test rows
const createTestRows = (): StaticTableRow[] => [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    status: "Active",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    status: "Inactive",
    colorVariant: "warning",
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob@example.com",
    status: "Pending",
  },
]

// Helper function to render StaticTable with test id
const renderTable = (props: Partial<StaticTableProps> = {}) => {
  const defaultProps: StaticTableProps = {
    columns: createTestColumns(),
    rows: createTestRows(),
  }

  return render(
    <StaticTable data-testid="static-table" {...defaultProps} {...props} />
  )
}

describe("StaticTable Component", () => {
  describe("Basic Rendering", () => {
    it("renders with default props", () => {
      renderTable()

      const table = screen.getByTestId("static-table")
      expect(table).toBeInTheDocument()
      expect(table.tagName).toBe("TABLE")

      // Check headers are rendered
      expect(screen.getByText("ID")).toBeInTheDocument()
      expect(screen.getByText("Name")).toBeInTheDocument()
      expect(screen.getByText("Email")).toBeInTheDocument()
      expect(screen.getByText("Status")).toBeInTheDocument()

      // Check row data is rendered
      expect(screen.getByText("John Doe")).toBeInTheDocument()
      expect(screen.getByText("jane@example.com")).toBeInTheDocument()
      expect(screen.getByText("Active")).toBeInTheDocument()
    })

    it("renders with custom className", () => {
      renderTable({ className: "custom-table" })

      const table = screen.getByTestId("static-table")
      expect(table).toHaveClass("custom-table")
    })

    it("renders with caption", () => {
      renderTable({ caption: "User data table" })

      const caption = screen.getByText("User data table")
      expect(caption).toBeInTheDocument()
      expect(caption.tagName).toBe("CAPTION")
    })
  })

  describe("Column Configuration", () => {
    it("handles column alignment", () => {
      const columns: StaticTableColumn[] = [
        { key: "left", label: "Left", align: "left" },
        { key: "center", label: "Center", align: "center" },
        { key: "right", label: "Right", align: "right" },
      ]
      const rows: StaticTableRow[] = [
        { id: 1, left: "L1", center: "C1", right: "R1" },
      ]

      renderTable({ columns, rows })

      const headers = screen.getAllByRole("columnheader")
      expect(headers[0]).toHaveClass("text-left")
      expect(headers[1]).toHaveClass("text-center")
      expect(headers[2]).toHaveClass("text-right")
    })

    it("handles sortable columns", () => {
      const columns: StaticTableColumn[] = [
        { key: "name", label: "Name", sortable: true },
        { key: "email", label: "Email", sortable: false },
      ]

      renderTable({ columns, rows: createTestRows() })

      // Check sort icon is present for sortable column
      const nameHeader = screen.getByText("Name").closest("th")
      expect(nameHeader?.querySelector("svg")).toBeInTheDocument()

      // Check sort icon is not present for non-sortable column
      const emailHeader = screen.getByText("Email").closest("th")
      expect(emailHeader?.querySelector("svg")).not.toBeInTheDocument()
    })

    it("handles custom column widths", () => {
      const columns: StaticTableColumn[] = [
        { key: "id", label: "ID", width: "100px" },
        { key: "name", label: "Name" },
      ]

      renderTable({ columns, rows: createTestRows() })

      const idHeader = screen.getByText("ID").closest("th")
      expect(idHeader).toHaveStyle({ width: "100px" })
    })

    it("handles custom render functions", () => {
      const columns: StaticTableColumn[] = [
        {
          key: "name",
          label: "Name",
          render: (value) => (
            <strong data-testid="custom-render">{String(value)}</strong>
          ),
        },
      ]

      renderTable({ columns, rows: createTestRows() })

      const customElement = screen.getByTestId("custom-render")
      expect(customElement).toBeInTheDocument()
      expect(customElement.tagName).toBe("STRONG")
      expect(customElement).toHaveTextContent("John Doe")
    })
  })

  describe("Row Configuration", () => {
    it("handles row color variants", () => {
      const rows: StaticTableRow[] = [
        { id: 1, name: "John", colorVariant: "primary" },
        { id: 2, name: "Jane", colorVariant: "success" },
        { id: 3, name: "Bob" }, // default
      ]

      renderTable({ rows })

      const tableRows = screen.getAllByRole("row")
      // Skip header row (index 0)
      expect(tableRows[1]).toHaveClass("bg-pp-blue-50/30")
      expect(tableRows[2]).toHaveClass("bg-pp-green-50/30")
    })

    it("handles striped rows", () => {
      renderTable({ striped: true })

      const tableRows = screen.getAllByRole("row")
      // Skip header row, check data rows
      expect(tableRows[2]).toHaveClass("bg-pp-gray-50/30") // Second data row (even index)
    })

    it("prioritizes row color variants over striping", () => {
      const rows: StaticTableRow[] = [
        { id: 1, name: "John" }, // Will be striped
        { id: 2, name: "Jane", colorVariant: "warning" }, // Color variant overrides striping
      ]

      renderTable({ rows, striped: true })

      const tableRows = screen.getAllByRole("row")
      expect(tableRows[1]).not.toHaveClass("bg-pp-gray-50/30") // No striping
      expect(tableRows[2]).toHaveClass("bg-pp-yellow-50/30") // Color variant
    })
  })

  describe("Column Color Variants", () => {
    it("applies color variants to columns", () => {
      const columns: StaticTableColumn[] = [
        { key: "name", label: "Name", colorVariant: "primary" },
        { key: "status", label: "Status", colorVariant: "success" },
      ]

      renderTable({ columns, rows: createTestRows() })

      const headers = screen.getAllByRole("columnheader")
      expect(headers[0]).toHaveClass("bg-pp-blue-100")
      expect(headers[1]).toHaveClass("bg-pp-green-100")
    })

    it("prioritizes row variants over column variants", () => {
      const columns: StaticTableColumn[] = [
        { key: "name", label: "Name", colorVariant: "primary" },
      ]
      const rows: StaticTableRow[] = [
        { id: 1, name: "John", colorVariant: "warning" },
      ]

      renderTable({ columns, rows })

      const dataCells = screen.getAllByRole("cell")
      expect(dataCells[0]).toHaveClass("text-pp-yellow-900") // Row variant wins
    })
  })

  describe("Table Variants and Sizes", () => {
    it("handles different table variants", () => {
      const { rerender } = renderTable({ variant: "bordered" })
      let table = screen.getByTestId("static-table")
      expect(table).toHaveClass("border-2")

      rerender(
        <StaticTable
          data-testid="static-table"
          columns={createTestColumns()}
          rows={createTestRows()}
          variant="compact"
        />
      )
      table = screen.getByTestId("static-table")
      expect(table).toHaveClass("text-sm")
    })

    it("handles different table sizes", () => {
      const { rerender } = renderTable({ size: "sm" })
      let cells = screen.getAllByRole("cell")
      expect(cells[0]).toHaveClass("px-2", "py-1", "text-sm")

      rerender(
        <StaticTable
          data-testid="static-table"
          columns={createTestColumns()}
          rows={createTestRows()}
          size="lg"
        />
      )
      cells = screen.getAllByRole("cell")
      expect(cells[0]).toHaveClass("px-4", "py-3", "text-base")
    })

    it("handles hoverable option", () => {
      renderTable({ hoverable: false })

      const tableRows = screen.getAllByRole("row")
      // Skip header row
      expect(tableRows[1]).not.toHaveClass("transition-colors")
    })
  })

  describe("Loading and Empty States", () => {
    it("renders loading state", () => {
      renderTable({ loading: true })

      expect(screen.getByText("Loading...")).toBeInTheDocument()
      expect(screen.queryByRole("table")).not.toBeInTheDocument()
    })

    it("renders default empty state", () => {
      renderTable({ rows: [] })

      expect(screen.getByText("No data available")).toBeInTheDocument()
      expect(
        screen.getByText("There are no rows to display")
      ).toBeInTheDocument()
      expect(screen.queryByRole("table")).not.toBeInTheDocument()
    })

    it("renders custom empty state", () => {
      const customEmptyState = (
        <div data-testid="custom-empty">No users found</div>
      )

      renderTable({ rows: [], emptyState: customEmptyState })

      expect(screen.getByTestId("custom-empty")).toBeInTheDocument()
      expect(screen.getByText("No users found")).toBeInTheDocument()
      expect(screen.queryByText("No data available")).not.toBeInTheDocument()
    })
  })

  describe("Accessibility", () => {
    it("has proper table structure", () => {
      renderTable()

      const table = screen.getByRole("table")
      expect(table).toBeInTheDocument()

      const headers = screen.getAllByRole("columnheader")
      expect(headers).toHaveLength(4)

      const rows = screen.getAllByRole("row")
      expect(rows).toHaveLength(4) // 1 header + 3 data rows
    })

    it("has proper scope attributes on headers", () => {
      renderTable()

      const headers = screen.getAllByRole("columnheader")
      headers.forEach((header) => {
        expect(header).toHaveAttribute("scope", "col")
      })
    })

    it("renders caption for screen readers", () => {
      renderTable({ caption: "User data table" })

      const caption = screen.getByText("User data table")
      expect(caption).toHaveClass("sr-only")
    })
  })

  describe("Edge Cases", () => {
    it("handles missing cell values", () => {
      const rows: StaticTableRow[] = [
        { id: 1, name: "John" }, // Missing email and status
      ]

      renderTable({ rows })

      // Should not crash and should render empty cells
      const cells = screen.getAllByRole("cell")
      expect(cells).toHaveLength(4) // All columns should have cells
      expect(cells[2]).toHaveTextContent("") // Empty email cell
      expect(cells[3]).toHaveTextContent("") // Empty status cell
    })

    it("handles null and undefined values", () => {
      const rows: StaticTableRow[] = [
        { id: 1, name: null, email: undefined, status: "Active" },
      ]

      renderTable({ rows })

      const cells = screen.getAllByRole("cell")
      expect(cells[1]).toHaveTextContent("") // null value
      expect(cells[2]).toHaveTextContent("") // undefined value
      expect(cells[3]).toHaveTextContent("Active") // normal value
    })

    it("handles complex data types in render functions", () => {
      const columns: StaticTableColumn[] = [
        {
          key: "user",
          label: "User",
          render: (value) => {
            const user = value as { name: string; role: string }
            return `${user.name} (${user.role})`
          },
        },
      ]
      const rows: StaticTableRow[] = [
        { id: 1, user: { name: "John", role: "Admin" } },
      ]

      renderTable({ columns, rows })

      expect(screen.getByText("John (Admin)")).toBeInTheDocument()
    })
  })
})
