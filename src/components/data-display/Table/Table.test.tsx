import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import { renderHook, act } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Table } from "./Table"
import { useTable } from "./useTable"
import type { TableColumn } from "./types"

// Mock data
interface TestData {
  id: number
  name: string
  age: number
  email: string
  status: "active" | "inactive"
  createdAt: string
}

const mockData: TestData[] = [
  {
    id: 1,
    name: "John Doe",
    age: 30,
    email: "john@example.com",
    status: "active",
    createdAt: "2023-01-01",
  },
  {
    id: 2,
    name: "Jane Smith",
    age: 25,
    email: "jane@example.com",
    status: "inactive",
    createdAt: "2023-01-02",
  },
  {
    id: 3,
    name: "Bob Johnson",
    age: 35,
    email: "bob@example.com",
    status: "active",
    createdAt: "2023-01-03",
  },
]

const mockColumns: TableColumn<TestData>[] = [
  {
    id: "id",
    accessor: "id",
    header: "ID",
    width: "80px",
    sortable: true,
  },
  {
    id: "name",
    accessor: "name",
    header: "Name",
    sortable: true,
  },
  {
    id: "age",
    accessor: "age",
    header: "Age",
    sortable: true,
    align: "center",
  },
  {
    id: "email",
    accessor: "email",
    header: "Email",
  },
  {
    id: "status",
    accessor: "status",
    header: "Status",
    sortable: true,
    cell: ({ value }) => (
      <span className={value === "active" ? "text-green-600" : "text-red-600"}>
        {String(value)}
      </span>
    ),
  },
]

describe("Table Component", () => {
  describe("Basic Rendering", () => {
    it("renders table with data", () => {
      render(<Table columns={mockColumns} data={mockData} />)

      expect(screen.getByRole("table")).toBeInTheDocument()
      expect(screen.getByText("John Doe")).toBeInTheDocument()
      expect(screen.getByText("Jane Smith")).toBeInTheDocument()
      expect(screen.getByText("Bob Johnson")).toBeInTheDocument()
    })

    it("renders column headers", () => {
      render(<Table columns={mockColumns} data={mockData} />)

      expect(screen.getByText("ID")).toBeInTheDocument()
      expect(screen.getByText("Name")).toBeInTheDocument()
      expect(screen.getByText("Age")).toBeInTheDocument()
      expect(screen.getByText("Email")).toBeInTheDocument()
      expect(screen.getByText("Status")).toBeInTheDocument()
    })

    it("renders custom cell content", () => {
      render(<Table columns={mockColumns} data={mockData} />)

      const activeStatus = screen.getAllByText("active")
      expect(activeStatus).toHaveLength(2)
      expect(activeStatus[0]).toHaveClass("text-green-600")

      const inactiveStatus = screen.getByText("inactive")
      expect(inactiveStatus).toHaveClass("text-red-600")
    })

    it("applies correct CSS classes", () => {
      render(
        <Table
          columns={mockColumns}
          data={mockData}
          className="custom-table"
          colorVariant="primary"
        />
      )

      const tableContainer = screen.getByRole("table").closest("div")
      expect(tableContainer).toHaveClass("space-y-4")
    })
  })

  describe("Empty States", () => {
    it("shows loading state", () => {
      render(
        <Table columns={mockColumns} data={[]} options={{ loading: true }} />
      )

      expect(screen.getByText("Loading...")).toBeInTheDocument()
      expect(screen.getByRole("status", { hidden: true })).toBeInTheDocument()
    })

    it("shows error state", () => {
      render(
        <Table
          columns={mockColumns}
          data={[]}
          options={{ error: "Failed to load data" }}
        />
      )

      expect(screen.getByText("Error loading data")).toBeInTheDocument()
      expect(screen.getByText("Failed to load data")).toBeInTheDocument()
    })

    it("shows empty state", () => {
      render(<Table columns={mockColumns} data={[]} />)

      expect(screen.getByText("No data available")).toBeInTheDocument()
      expect(
        screen.getByText("There are no rows to display")
      ).toBeInTheDocument()
    })
  })

  describe("Sorting", () => {
    it("shows sort indicators for sortable columns", () => {
      render(<Table columns={mockColumns} data={mockData} />)

      const nameHeader = screen.getByText("Name").closest("th")
      expect(nameHeader).toHaveClass("cursor-pointer")

      const emailHeader = screen.getByText("Email").closest("th")
      expect(emailHeader).not.toHaveClass("cursor-pointer")
    })

    it("handles column sorting", async () => {
      const user = userEvent.setup()
      const onSortingChange = vi.fn()

      render(
        <Table
          columns={mockColumns}
          data={mockData}
          callbacks={{ onSortingChange }}
        />
      )

      const nameHeader = screen.getByText("Name").closest("th")
      await user.click(nameHeader!)

      expect(onSortingChange).toHaveBeenCalledWith([
        { columnId: "name", direction: "asc" },
      ])
    })

    it("toggles sort direction on multiple clicks", async () => {
      const user = userEvent.setup()
      const onSortingChange = vi.fn()

      render(
        <Table
          columns={mockColumns}
          data={mockData}
          callbacks={{ onSortingChange }}
        />
      )

      const nameHeader = screen.getByText("Name").closest("th")

      // First click - ascending
      await user.click(nameHeader!)
      expect(onSortingChange).toHaveBeenCalledWith([
        { columnId: "name", direction: "asc" },
      ])

      // Second click - descending
      await user.click(nameHeader!)
      expect(onSortingChange).toHaveBeenCalledWith([
        { columnId: "name", direction: "desc" },
      ])

      // Third click - clear sort
      await user.click(nameHeader!)
      expect(onSortingChange).toHaveBeenCalledWith([])
    })
  })

  describe("Color Variants", () => {
    it("applies default color variant", () => {
      render(<Table columns={mockColumns} data={mockData} />)

      const table = screen.getByRole("table")
      expect(table).toHaveClass(
        "bg-white/95",
        "backdrop-blur-sm",
        "border-stone-200"
      )
    })

    it("applies custom color variant", () => {
      render(
        <Table columns={mockColumns} data={mockData} colorVariant="primary" />
      )

      const table = screen.getByRole("table")
      expect(table).toHaveClass("bg-blue-50/90", "border-blue-200")
    })

    it("applies column-specific color variants", () => {
      const columnsWithColors = [
        { ...mockColumns[0], colorVariant: "success" as const },
        ...mockColumns.slice(1),
      ]

      render(<Table columns={columnsWithColors} data={mockData} />)

      const idHeader = screen.getByText("ID").closest("th")
      expect(idHeader).toHaveClass("bg-green-100", "text-green-800")
    })
  })

  describe("Size Variants", () => {
    it("applies small size", () => {
      render(<Table columns={mockColumns} data={mockData} size="sm" />)

      const firstCell = screen.getByText("John Doe").closest("td")
      expect(firstCell).toHaveClass("px-2", "py-1", "text-sm")
    })

    it("applies large size", () => {
      render(<Table columns={mockColumns} data={mockData} size="lg" />)

      const firstCell = screen.getByText("John Doe").closest("td")
      expect(firstCell).toHaveClass("px-4", "py-3", "text-base")
    })
  })

  describe("Striped and Hover Effects", () => {
    it("applies striped styling", () => {
      render(<Table columns={mockColumns} data={mockData} striped />)

      const rows = screen.getAllByRole("row")
      const dataRows = rows.slice(1) // Skip header row

      expect(dataRows[0]).toHaveClass("bg-stone-50/30") // Even row (0-indexed)
      expect(dataRows[1]).not.toHaveClass("bg-stone-50/30") // Odd row
      expect(dataRows[2]).toHaveClass("bg-stone-50/30") // Even row
    })

    it("applies hover effects by default", () => {
      render(<Table columns={mockColumns} data={mockData} />)

      const rows = screen.getAllByRole("row")
      const firstDataRow = rows[1] // Skip header row

      expect(firstDataRow).toHaveClass("hover:bg-stone-100/40")
    })

    it("disables hover effects when hoverable is false", () => {
      render(<Table columns={mockColumns} data={mockData} hoverable={false} />)

      const rows = screen.getAllByRole("row")
      const firstDataRow = rows[1] // Skip header row

      expect(firstDataRow).not.toHaveClass("hover:bg-stone-100/40")
    })
  })

  describe("Event Callbacks", () => {
    it("handles row click events", async () => {
      const user = userEvent.setup()
      const onRowClick = vi.fn()

      render(
        <Table
          columns={mockColumns}
          data={mockData}
          callbacks={{ onRowClick }}
        />
      )

      const rows = screen.getAllByRole("row")
      const firstDataRow = rows[1] // Skip header row

      await user.click(firstDataRow)

      expect(onRowClick).toHaveBeenCalledWith(
        expect.objectContaining({
          id: 1,
          original: mockData[0],
        }),
        expect.any(Object)
      )
    })

    it("handles row double click events", async () => {
      const user = userEvent.setup()
      const onRowDoubleClick = vi.fn()

      render(
        <Table
          columns={mockColumns}
          data={mockData}
          callbacks={{ onRowDoubleClick }}
        />
      )

      const rows = screen.getAllByRole("row")
      const firstDataRow = rows[1] // Skip header row

      await user.dblClick(firstDataRow)

      expect(onRowDoubleClick).toHaveBeenCalledWith(
        expect.objectContaining({
          id: 1,
          original: mockData[0],
        }),
        expect.any(Object)
      )
    })
  })

  describe("Custom Toolbar and Footer", () => {
    it("renders custom toolbar", () => {
      const toolbar = <div data-testid="custom-toolbar">Custom Toolbar</div>

      render(<Table columns={mockColumns} data={mockData} toolbar={toolbar} />)

      expect(screen.getByTestId("custom-toolbar")).toBeInTheDocument()
      expect(screen.getByText("Custom Toolbar")).toBeInTheDocument()
    })

    it("renders custom footer", () => {
      const footer = <div data-testid="custom-footer">Custom Footer</div>

      render(<Table columns={mockColumns} data={mockData} footer={footer} />)

      expect(screen.getByTestId("custom-footer")).toBeInTheDocument()
      expect(screen.getByText("Custom Footer")).toBeInTheDocument()
    })
  })

  describe("Accessibility", () => {
    it("includes table caption when provided", () => {
      render(
        <Table
          columns={mockColumns}
          data={mockData}
          caption="User data table"
        />
      )

      const caption = screen.getByText("User data table")
      expect(caption).toBeInTheDocument()
      expect(caption.tagName).toBe("CAPTION")
      expect(caption).toHaveClass("sr-only")
    })

    it("sets proper table structure", () => {
      render(<Table columns={mockColumns} data={mockData} />)

      expect(screen.getByRole("table")).toBeInTheDocument()
      expect(screen.getAllByRole("columnheader")).toHaveLength(5)
      expect(screen.getAllByRole("row")).toHaveLength(4) // 1 header + 3 data rows
    })
  })
})

describe("useTable Hook", () => {
  describe("Data Processing", () => {
    it("transforms data to table rows", () => {
      const { result } = renderHook(() => useTable(mockColumns, mockData))

      expect(result.current.rows).toHaveLength(3)
      expect(result.current.rows[0]).toEqual(
        expect.objectContaining({
          id: 1,
          original: mockData[0],
          index: 0,
        })
      )
    })

    it("processes visible columns", () => {
      const { result } = renderHook(() => useTable(mockColumns, mockData))

      expect(result.current.columns).toHaveLength(5)
      expect(result.current.columns.map((col) => col.id)).toEqual([
        "id",
        "name",
        "age",
        "email",
        "status",
      ])
    })
  })

  describe("Sorting", () => {
    it("sorts data in ascending order", () => {
      const { result } = renderHook(() => useTable(mockColumns, mockData))

      act(() => {
        result.current.actions.setSort([{ columnId: "name", direction: "asc" }])
      })

      expect(result.current.rows.map((row) => row.original.name)).toEqual([
        "Bob Johnson",
        "Jane Smith",
        "John Doe",
      ])
    })

    it("sorts data in descending order", () => {
      const { result } = renderHook(() => useTable(mockColumns, mockData))

      act(() => {
        result.current.actions.setSort([{ columnId: "age", direction: "desc" }])
      })

      expect(result.current.rows.map((row) => row.original.age)).toEqual([
        35, 30, 25,
      ])
    })
  })

  describe("Filtering", () => {
    it("filters data by text contains", () => {
      const { result } = renderHook(() => useTable(mockColumns, mockData))

      act(() => {
        result.current.actions.setFilters([
          { columnId: "name", value: "john", operator: "contains" },
        ])
      })

      expect(result.current.rows).toHaveLength(2)
      expect(result.current.rows.map((row) => row.original.name)).toEqual([
        "John Doe",
        "Bob Johnson",
      ])
    })

    it("filters data by exact match", () => {
      const { result } = renderHook(() => useTable(mockColumns, mockData))

      act(() => {
        result.current.actions.setFilters([
          { columnId: "status", value: "active", operator: "equals" },
        ])
      })

      expect(result.current.rows).toHaveLength(2)
      expect(
        result.current.rows.every((row) => row.original.status === "active")
      ).toBe(true)
    })

    it("filters data by numeric comparison", () => {
      const { result } = renderHook(() => useTable(mockColumns, mockData))

      act(() => {
        result.current.actions.setFilters([
          { columnId: "age", value: 30, operator: "gte" },
        ])
      })

      expect(result.current.rows).toHaveLength(2)
      expect(result.current.rows.every((row) => row.original.age >= 30)).toBe(
        true
      )
    })
  })

  describe("Pagination", () => {
    it("paginates data correctly", () => {
      const { result } = renderHook(() =>
        useTable(mockColumns, mockData, {
          enablePagination: true,
          defaultPageSize: 2,
        })
      )

      expect(result.current.rows).toHaveLength(2)
      expect(result.current.meta.totalRows).toBe(3)
      expect(result.current.meta.totalPages).toBe(2)
      expect(result.current.meta.hasNextPage).toBe(true)
      expect(result.current.meta.hasPreviousPage).toBe(false)
    })

    it("navigates to next page", () => {
      const { result } = renderHook(() =>
        useTable(mockColumns, mockData, {
          enablePagination: true,
          defaultPageSize: 2,
        })
      )

      act(() => {
        result.current.actions.setPagination({ pageIndex: 1 })
      })

      expect(result.current.rows).toHaveLength(1)
      expect(result.current.meta.hasNextPage).toBe(false)
      expect(result.current.meta.hasPreviousPage).toBe(true)
    })
  })

  describe("State Management", () => {
    it("resets to initial state", () => {
      const { result } = renderHook(() =>
        useTable(mockColumns, mockData, { enablePagination: true })
      )

      // Modify state
      act(() => {
        result.current.actions.setSort([{ columnId: "name", direction: "asc" }])
        result.current.actions.setFilters([
          { columnId: "status", value: "active" },
        ])
        result.current.actions.setPagination({ pageIndex: 1 })
      })

      // Reset
      act(() => {
        result.current.actions.reset()
      })

      expect(result.current.state.sorting).toEqual([])
      expect(result.current.state.filters).toEqual([])
      expect(result.current.state.pagination?.pageIndex).toBe(0)
    })
  })
})
