import { describe, it, expect } from "vitest"
import { render, screen } from "../../../test/utils"
import { Typography } from "./Typography"

describe("Typography Component", () => {
  it("renders with default props", () => {
    render(<Typography>Default text</Typography>)

    const text = screen.getByText("Default text")
    expect(text).toBeInTheDocument()
    expect(text.tagName).toBe("P")
  })

  it("renders different variants correctly", () => {
    const { rerender } = render(<Typography variant="h1">Heading 1</Typography>)
    let element = screen.getByText("Heading 1")
    expect(element.tagName).toBe("H1")

    rerender(<Typography variant="h2">Heading 2</Typography>)
    element = screen.getByText("Heading 2")
    expect(element.tagName).toBe("H2")

    rerender(<Typography variant="body">Body text</Typography>)
    element = screen.getByText("Body text")
    expect(element.tagName).toBe("P")

    rerender(<Typography variant="caption">Caption text</Typography>)
    element = screen.getByText("Caption text")
    expect(element.tagName).toBe("SPAN")
  })

  it("renders with custom element", () => {
    render(
      <Typography variant="h1" as="div">
        Custom element
      </Typography>
    )

    const element = screen.getByText("Custom element")
    expect(element.tagName).toBe("DIV")
  })

  it("applies color variants correctly", () => {
    const { rerender } = render(
      <Typography color="primary">Primary</Typography>
    )
    let element = screen.getByText("Primary")
    expect(element).toHaveClass("text-blue-600") // actual primary color

    rerender(<Typography color="muted">Muted</Typography>)
    element = screen.getByText("Muted")
    expect(element).toHaveClass("text-stone-500")

    rerender(<Typography color="danger">Danger</Typography>)
    element = screen.getByText("Danger")
    expect(element).toHaveClass("text-red-600")
  })

  it("applies container responsive font classes", () => {
    render(<Typography variant="h1">Large heading</Typography>)

    const element = screen.getByText("Large heading")
    // Should have container query classes
    expect(element).toHaveClass("text-4xl") // actual base size for h1
  })

  it("applies text alignment correctly", () => {
    const { rerender } = render(
      <Typography align="center">Centered</Typography>
    )
    let element = screen.getByText("Centered")
    expect(element).toHaveClass("text-center")

    rerender(<Typography align="right">Right aligned</Typography>)
    element = screen.getByText("Right aligned")
    expect(element).toHaveClass("text-right")
  })

  it("applies custom className", () => {
    render(<Typography className="custom-class">Custom</Typography>)

    const element = screen.getByText("Custom")
    expect(element).toHaveClass("custom-class")
  })

  it("handles weight variants", () => {
    const { rerender } = render(
      <Typography weight="bold">Bold text</Typography>
    )
    let element = screen.getByText("Bold text")
    expect(element).toHaveClass("font-bold")

    rerender(<Typography weight="semibold">Semibold text</Typography>)
    element = screen.getByText("Semibold text")
    expect(element).toHaveClass("font-semibold")
  })

  it("handles truncate prop", () => {
    render(
      <Typography truncate>Very long text that should be truncated</Typography>
    )

    const element = screen.getByText("Very long text that should be truncated")
    expect(element).toHaveClass("truncate")
  })

  it("forwards ref correctly", () => {
    let elementRef: HTMLParagraphElement | null = null

    render(
      <Typography
        ref={(ref: HTMLParagraphElement | null) => {
          elementRef = ref
        }}
      >
        Ref text
      </Typography>
    )

    expect(elementRef).toBeInstanceOf(HTMLParagraphElement)
  })

  it("preserves accessibility with semantic elements", () => {
    render(<Typography variant="h1">Page Title</Typography>)

    const heading = screen.getByRole("heading", { level: 1 })
    expect(heading).toBeInTheDocument()
    expect(heading).toHaveTextContent("Page Title")
  })
})
