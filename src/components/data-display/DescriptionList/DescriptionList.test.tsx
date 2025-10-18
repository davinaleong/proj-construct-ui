import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import { DescriptionList } from "./DescriptionList"
import type { DescriptionListItem } from "./types"

// Mock data for testing
const mockItems: DescriptionListItem[] = [
  {
    id: "1",
    term: "Name",
    description: "John Doe",
  },
  {
    id: "2",
    term: "Email",
    description: "john.doe@example.com",
  },
  {
    id: "3",
    term: "Phone",
    description: "+1 (555) 123-4567",
  },
]

const mockItemsWithColorVariants: DescriptionListItem[] = [
  {
    id: "1",
    term: "Success",
    description: "Operation completed",
    colorVariant: "success",
  },
  {
    id: "2",
    term: "Warning",
    description: "Check required",
    colorVariant: "warning",
  },
  {
    id: "3",
    term: "Error",
    description: "Action failed",
    colorVariant: "danger",
  },
]

describe("DescriptionList", () => {
  it("renders basic description list correctly", () => {
    render(<DescriptionList items={mockItems} />)

    // Check that all terms and descriptions are rendered
    expect(screen.getByText("Name")).toBeInTheDocument()
    expect(screen.getByText("John Doe")).toBeInTheDocument()
    expect(screen.getByText("Email")).toBeInTheDocument()
    expect(screen.getByText("john.doe@example.com")).toBeInTheDocument()
    expect(screen.getByText("Phone")).toBeInTheDocument()
    expect(screen.getByText("+1 (555) 123-4567")).toBeInTheDocument()
  })

  it("applies correct layout classes", () => {
    const { rerender } = render(
      <DescriptionList items={mockItems} layout="vertical" />
    )
    const dlElement = screen.getByRole("definition")

    // Vertical layout should have space-y-1 class
    expect(dlElement.firstChild).toHaveClass("space-y-1")

    rerender(<DescriptionList items={mockItems} layout="horizontal" />)
    // Horizontal layout should have grid classes
    expect(dlElement.firstChild).toHaveClass("sm:grid")
  })

  it("applies correct size classes", () => {
    const { rerender } = render(<DescriptionList items={mockItems} size="sm" />)
    let termElement = screen.getByText("Name")
    expect(termElement).toHaveClass("text-sm")

    rerender(<DescriptionList items={mockItems} size="md" />)
    termElement = screen.getByText("Name")
    expect(termElement).toHaveClass("text-base")

    rerender(<DescriptionList items={mockItems} size="lg" />)
    termElement = screen.getByText("Name")
    expect(termElement).toHaveClass("text-lg")
  })

  it("applies color variants correctly", () => {
    render(<DescriptionList items={mockItemsWithColorVariants} />)

    // Check that color variant classes are applied
    const successTerm = screen.getByText("Success")
    const warningTerm = screen.getByText("Warning")
    const errorTerm = screen.getByText("Error")

    expect(successTerm).toBeInTheDocument()
    expect(warningTerm).toBeInTheDocument()
    expect(errorTerm).toBeInTheDocument()
  })

  it("renders with bordered styling", () => {
    render(<DescriptionList items={mockItems} bordered />)
    const dlElement = screen.getByRole("definition")

    expect(dlElement).toHaveClass("border", "border-stone-200", "rounded-sm")
  })

  it("renders with striped styling", () => {
    render(<DescriptionList items={mockItems} striped />)
    const dlElement = screen.getByRole("definition")

    // First item (index 0, even) should have striped background
    const firstItem = dlElement.firstChild
    expect(firstItem).toHaveClass("bg-stone-50/30")
  })

  it("applies custom term width in horizontal layout", () => {
    render(
      <DescriptionList
        items={mockItems}
        layout="horizontal"
        termWidth="200px"
      />
    )

    const dlElement = screen.getByRole("definition")
    const firstItem = dlElement.firstChild as HTMLElement

    expect(firstItem).toHaveStyle({ gridTemplateColumns: "200px 1fr" })
  })

  it("uses custom render functions", () => {
    const renderTerm = vi.fn((term) => `Term: ${term}`)
    const renderDescription = vi.fn((description) => `Desc: ${description}`)

    render(
      <DescriptionList
        items={mockItems}
        renderTerm={renderTerm}
        renderDescription={renderDescription}
      />
    )

    expect(screen.getByText("Term: Name")).toBeInTheDocument()
    expect(screen.getByText("Desc: John Doe")).toBeInTheDocument()
    expect(renderTerm).toHaveBeenCalledTimes(3)
    expect(renderDescription).toHaveBeenCalledTimes(3)
  })

  it("handles empty items array", () => {
    render(<DescriptionList items={[]} />)
    const dlElement = screen.getByRole("definition")

    expect(dlElement).toBeEmptyDOMElement()
  })

  it("applies custom className", () => {
    render(<DescriptionList items={mockItems} className="custom-class" />)
    const dlElement = screen.getByRole("definition")

    expect(dlElement).toHaveClass("custom-class")
  })

  it("applies item-specific className", () => {
    const itemsWithClass: DescriptionListItem[] = [
      {
        id: "1",
        term: "Special",
        description: "Value",
        className: "special-item",
      },
    ]

    render(<DescriptionList items={itemsWithClass} />)
    const dlElement = screen.getByRole("definition")
    const itemElement = dlElement.firstChild

    expect(itemElement).toHaveClass("special-item")
  })

  it("supports ReactNode content for terms and descriptions", () => {
    const itemsWithNodes: DescriptionListItem[] = [
      {
        id: "1",
        term: <strong>Bold Term</strong>,
        description: <em>Italic Description</em>,
      },
    ]

    render(<DescriptionList items={itemsWithNodes} />)

    expect(screen.getByText("Bold Term")).toBeInTheDocument()
    expect(screen.getByText("Italic Description")).toBeInTheDocument()
  })

  it("forwards ref correctly", () => {
    const ref = vi.fn()
    render(<DescriptionList ref={ref} items={mockItems} />)

    expect(ref).toHaveBeenCalledWith(expect.any(HTMLDListElement))
  })

  it("passes through HTML attributes", () => {
    render(
      <DescriptionList
        items={mockItems}
        data-testid="description-list"
        aria-label="User details"
      />
    )

    const dlElement = screen.getByTestId("description-list")
    expect(dlElement).toHaveAttribute("aria-label", "User details")
  })

  it("applies paper-like styling", () => {
    render(<DescriptionList items={mockItems} />)
    const dlElement = screen.getByRole("definition")

    expect(dlElement).toHaveClass("bg-white/95", "backdrop-blur-sm")
  })
})
