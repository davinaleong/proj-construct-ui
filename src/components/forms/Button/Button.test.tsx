import { describe, it, expect, vi } from "vitest"
import { render, screen, fireEvent } from "../../../test/utils"
import { Button } from "./Button"

describe("Button Component", () => {
  it("renders with default props", () => {
    render(<Button>Click me</Button>)

    const button = screen.getByRole("button", { name: /click me/i })
    expect(button).toBeInTheDocument()
    expect(button).toHaveAttribute("type", "button")
    expect(button).not.toBeDisabled()
  })

  it("renders different sizes correctly", () => {
    const { rerender } = render(<Button size="sm">Small</Button>)
    const button = screen.getByRole("button")
    expect(button).toBeInTheDocument()

    rerender(<Button size="md">Medium</Button>)
    expect(screen.getByRole("button")).toBeInTheDocument()

    rerender(<Button size="lg">Large</Button>)
    expect(screen.getByRole("button")).toBeInTheDocument()
  })

  it("renders different variants correctly", () => {
    const { rerender } = render(<Button variant="solid">Solid</Button>)
    const button = screen.getByRole("button")
    expect(button).toBeInTheDocument()

    rerender(<Button variant="outline">Outline</Button>)
    expect(screen.getByRole("button")).toBeInTheDocument()

    rerender(<Button variant="ghost">Ghost</Button>)
    expect(screen.getByRole("button")).toBeInTheDocument()
  })

  it("handles disabled state", () => {
    render(<Button disabled>Disabled</Button>)

    const button = screen.getByRole("button")
    expect(button).toBeDisabled()
  })

  it("handles loading state", () => {
    render(<Button loading>Loading</Button>)

    const button = screen.getByRole("button")
    expect(button).toBeDisabled()
  })

  it("calls onClick when clicked", () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Click me</Button>)

    const button = screen.getByRole("button")
    fireEvent.click(button)

    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it("does not call onClick when disabled", () => {
    const handleClick = vi.fn()
    render(
      <Button onClick={handleClick} disabled>
        Disabled
      </Button>
    )

    const button = screen.getByRole("button")
    fireEvent.click(button)

    expect(handleClick).not.toHaveBeenCalled()
  })

  it("does not call onClick when loading", () => {
    const handleClick = vi.fn()
    render(
      <Button onClick={handleClick} loading>
        Loading
      </Button>
    )

    const button = screen.getByRole("button")
    fireEvent.click(button)

    expect(handleClick).not.toHaveBeenCalled()
  })

  it("renders with minimum width when minWidth prop is true", () => {
    render(<Button minWidth>Min Width</Button>)

    const button = screen.getByRole("button")
    expect(button).toHaveClass("min-w-24") // default md min width
  })

  it("truncates text when truncate prop is true", () => {
    render(
      <Button truncate>Very long button text that should be truncated</Button>
    )

    const button = screen.getByRole("button")
    const span = button.querySelector("span")
    expect(span).toHaveClass("truncate")
  })

  it("renders with custom className", () => {
    render(<Button className="custom-class">Custom</Button>)

    const button = screen.getByRole("button")
    expect(button).toHaveClass("custom-class")
  })
})
