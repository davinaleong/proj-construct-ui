import { screen, render } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"
import { Grid } from "./Grid"
import type { GridProps } from "./types"

// Helper function to create test items
const createTestItems = (count: number = 3) =>
  Array.from({ length: count }, (_, i) => (
    <div key={i} data-testid={`item-${i}`}>
      Item {i + 1}
    </div>
  ))

// Helper function to render Grid with test id
const renderGrid = (
  props: Partial<GridProps> = {},
  children = createTestItems()
) => {
  return render(
    <Grid data-testid="test-grid" {...props}>
      {children}
    </Grid>
  )
}

describe("Grid Component", () => {
  describe("Basic Rendering", () => {
    it("renders with default props", () => {
      renderGrid()

      const grid = screen.getByTestId("test-grid")
      expect(grid).toBeInTheDocument()
      expect(grid).toHaveClass(
        "grid",
        "grid-cols-1",
        "gap-4",
        "items-stretch",
        "justify-start"
      )

      // Check children are rendered
      expect(screen.getByTestId("item-0")).toBeInTheDocument()
      expect(screen.getByTestId("item-1")).toBeInTheDocument()
      expect(screen.getByTestId("item-2")).toBeInTheDocument()
    })

    it("renders with custom className", () => {
      renderGrid({ className: "custom-grid" })

      const grid = screen.getByTestId("test-grid")
      expect(grid).toHaveClass("custom-grid")
    })

    it("renders as custom element type", () => {
      renderGrid({ as: "section" })

      const grid = screen.getByTestId("test-grid")
      expect(grid.tagName).toBe("SECTION")
    })
  })

  describe("Column Configuration", () => {
    it("handles responsive columns", () => {
      renderGrid(
        {
          columns: { sm: 1, md: 2, lg: 4 },
        },
        createTestItems(4)
      )

      const grid = screen.getByTestId("test-grid")
      // Should have base columns (from sm) and responsive classes
      expect(grid).toHaveClass("grid-cols-1")
      expect(grid).toHaveClass("sm:grid-cols-1")
      expect(grid).toHaveClass("md:grid-cols-2")
      expect(grid).toHaveClass("lg:grid-cols-4")
    })

    it("handles responsive columns with missing breakpoints", () => {
      renderGrid({ columns: { md: 3, xl: 6 } }, createTestItems(6))

      const grid = screen.getByTestId("test-grid")
      // Should use first defined breakpoint as base
      expect(grid).toHaveClass("grid-cols-3")
      expect(grid).toHaveClass("md:grid-cols-3")
      expect(grid).toHaveClass("xl:grid-cols-6")
    })

    it("handles number columns", () => {
      renderGrid({ columns: 3 }, createTestItems(6))

      const grid = screen.getByTestId("test-grid")
      expect(grid).toHaveClass("grid-cols-3")
    })

    it("handles edge case with empty responsive config", () => {
      renderGrid({ columns: {} })

      const grid = screen.getByTestId("test-grid")
      expect(grid).toHaveClass("grid-cols-1") // Should default to 1
    })
  })

  describe("Gap Configuration", () => {
    it("renders different gap sizes", () => {
      const { rerender } = renderGrid({ gap: "none" })
      let grid = screen.getByTestId("test-grid")
      expect(grid).toHaveClass("gap-0")

      rerender(
        <Grid data-testid="test-grid" gap="sm">
          {createTestItems()}
        </Grid>
      )
      grid = screen.getByTestId("test-grid")
      expect(grid).toHaveClass("gap-2")

      rerender(
        <Grid data-testid="test-grid" gap="md">
          {createTestItems()}
        </Grid>
      )
      grid = screen.getByTestId("test-grid")
      expect(grid).toHaveClass("gap-4")

      rerender(
        <Grid data-testid="test-grid" gap="lg">
          {createTestItems()}
        </Grid>
      )
      grid = screen.getByTestId("test-grid")
      expect(grid).toHaveClass("gap-6")

      rerender(
        <Grid data-testid="test-grid" gap="xl">
          {createTestItems()}
        </Grid>
      )
      grid = screen.getByTestId("test-grid")
      expect(grid).toHaveClass("gap-8")
    })
  })

  describe("Alignment Configuration", () => {
    it("renders different align options", () => {
      const { rerender } = renderGrid({ align: "start" })
      let grid = screen.getByTestId("test-grid")
      expect(grid).toHaveClass("items-start")

      rerender(
        <Grid data-testid="test-grid" align="center">
          {createTestItems()}
        </Grid>
      )
      grid = screen.getByTestId("test-grid")
      expect(grid).toHaveClass("items-center")

      rerender(
        <Grid data-testid="test-grid" align="end">
          {createTestItems()}
        </Grid>
      )
      grid = screen.getByTestId("test-grid")
      expect(grid).toHaveClass("items-end")

      rerender(
        <Grid data-testid="test-grid" align="stretch">
          {createTestItems()}
        </Grid>
      )
      grid = screen.getByTestId("test-grid")
      expect(grid).toHaveClass("items-stretch")
    })

    it("renders different justify options", () => {
      const { rerender } = renderGrid({ justify: "start" })
      let grid = screen.getByTestId("test-grid")
      expect(grid).toHaveClass("justify-start")

      rerender(
        <Grid data-testid="test-grid" justify="center">
          {createTestItems()}
        </Grid>
      )
      grid = screen.getByTestId("test-grid")
      expect(grid).toHaveClass("justify-center")

      rerender(
        <Grid data-testid="test-grid" justify="end">
          {createTestItems()}
        </Grid>
      )
      grid = screen.getByTestId("test-grid")
      expect(grid).toHaveClass("justify-end")

      rerender(
        <Grid data-testid="test-grid" justify="between">
          {createTestItems()}
        </Grid>
      )
      grid = screen.getByTestId("test-grid")
      expect(grid).toHaveClass("justify-between")

      rerender(
        <Grid data-testid="test-grid" justify="around">
          {createTestItems()}
        </Grid>
      )
      grid = screen.getByTestId("test-grid")
      expect(grid).toHaveClass("justify-around")

      rerender(
        <Grid data-testid="test-grid" justify="evenly">
          {createTestItems()}
        </Grid>
      )
      grid = screen.getByTestId("test-grid")
      expect(grid).toHaveClass("justify-evenly")
    })
  })

  describe("Auto-fit Configuration", () => {
    it("renders auto-fit grid with default min width", () => {
      renderGrid({ autoFit: true })

      const grid = screen.getByTestId("test-grid")
      expect(grid).toHaveClass("grid")
      expect(grid).not.toHaveClass("grid-cols-1") // Should not have explicit columns

      // Check the style attribute directly
      expect(grid.style.gridTemplateColumns).toBe(
        "repeat(auto-fit, minmax(15rem, 1fr))"
      )
    })

    it("renders auto-fit grid with custom min width", () => {
      renderGrid({
        autoFit: true,
        minColumnWidth: 20,
      })

      const grid = screen.getByTestId("test-grid")
      expect(grid.style.gridTemplateColumns).toBe(
        "repeat(auto-fit, minmax(20rem, 1fr))"
      )
    })

    it("ignores columns prop when autoFit is true", () => {
      renderGrid({
        autoFit: true,
        columns: 4,
      })

      const grid = screen.getByTestId("test-grid")
      expect(grid).not.toHaveClass("grid-cols-4")
      expect(grid.style.gridTemplateColumns).toBe(
        "repeat(auto-fit, minmax(15rem, 1fr))"
      )
    })
  })

  describe("Custom Element Configuration", () => {
    it("forwards ref correctly", () => {
      const ref = vi.fn()
      render(
        <Grid ref={ref} data-testid="test-grid">
          {createTestItems()}
        </Grid>
      )

      expect(ref).toHaveBeenCalled()
    })
  })

  describe("HTML Attributes", () => {
    it("passes through standard HTML attributes", () => {
      renderGrid({
        id: "custom-id",
        "aria-label": "Custom grid",
        role: "grid",
      })

      const grid = screen.getByTestId("test-grid")
      expect(grid).toHaveAttribute("id", "custom-id")
      expect(grid).toHaveAttribute("aria-label", "Custom grid")
      expect(grid).toHaveAttribute("role", "grid")
    })

    it("handles event handlers", () => {
      const handleClick = vi.fn()
      renderGrid({ onClick: handleClick })

      const grid = screen.getByTestId("test-grid")
      grid.click()
      expect(handleClick).toHaveBeenCalledTimes(1)
    })
  })

  describe("Complex Configurations", () => {
    it("combines multiple props correctly", () => {
      renderGrid({
        columns: { sm: 1, md: 2, lg: 3 },
        gap: "lg",
        align: "center",
        justify: "between",
        className: "custom-grid",
      })

      const grid = screen.getByTestId("test-grid")
      expect(grid).toHaveClass(
        "grid",
        "grid-cols-1",
        "sm:grid-cols-1",
        "md:grid-cols-2",
        "lg:grid-cols-3",
        "gap-6",
        "items-center",
        "justify-between",
        "custom-grid"
      )
    })

    it("handles auto-fit with alignment and gap", () => {
      renderGrid({
        autoFit: true,
        minColumnWidth: 12,
        gap: "xl",
        align: "end",
      })

      const grid = screen.getByTestId("test-grid")
      expect(grid).toHaveClass("gap-8", "items-end")
      expect(grid.style.gridTemplateColumns).toBe(
        "repeat(auto-fit, minmax(12rem, 1fr))"
      )
    })

    it("renders with all possible gap sizes", () => {
      const gapSizes = ["none", "sm", "md", "lg", "xl"] as const
      const expectedClasses = ["gap-0", "gap-2", "gap-4", "gap-6", "gap-8"]

      gapSizes.forEach((gap, index) => {
        const { unmount } = renderGrid({ gap })
        const grid = screen.getByTestId("test-grid")
        expect(grid).toHaveClass(expectedClasses[index])
        unmount()
      })
    })
  })

  describe("Edge Cases", () => {
    it("handles undefined columns gracefully", () => {
      renderGrid({ columns: undefined })

      const grid = screen.getByTestId("test-grid")
      expect(grid).toHaveClass("grid-cols-1") // Should default to 1
    })

    it("handles empty children", () => {
      renderGrid({}, [])

      const grid = screen.getByTestId("test-grid")
      expect(grid).toBeInTheDocument()
      expect(grid).toHaveClass("grid")
    })
  })
})
