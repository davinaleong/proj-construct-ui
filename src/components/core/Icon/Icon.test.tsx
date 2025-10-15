import { screen } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"
import userEvent from "@testing-library/user-event"
import { Heart, Star, Settings } from "lucide-react"
import { Icon } from "./Icon"
import { render as renderWithTheme } from "../../../test/utils"

describe("Icon Component", () => {
  it("renders with default props", () => {
    renderWithTheme(<Icon icon={Heart} aria-label="Heart icon" />)

    const icon = screen.getByLabelText("Heart icon")
    expect(icon).toBeInTheDocument()
    expect(icon).toHaveClass("w-5", "h-5", "inline-block", "flex-shrink-0")
    expect(icon).toHaveAttribute("role", "img")
  })

  it("renders different sizes correctly", () => {
    const { rerender } = renderWithTheme(
      <Icon icon={Star} size="xs" aria-label="Star icon" />
    )
    let icon = screen.getByLabelText("Star icon")
    expect(icon).toHaveClass("w-3", "h-3")

    rerender(<Icon icon={Star} size="sm" aria-label="Star icon" />)
    icon = screen.getByLabelText("Star icon")
    expect(icon).toHaveClass("w-4", "h-4")

    rerender(<Icon icon={Star} size="md" aria-label="Star icon" />)
    icon = screen.getByLabelText("Star icon")
    expect(icon).toHaveClass("w-5", "h-5")

    rerender(<Icon icon={Star} size="lg" aria-label="Star icon" />)
    icon = screen.getByLabelText("Star icon")
    expect(icon).toHaveClass("w-6", "h-6")

    rerender(<Icon icon={Star} size="xl" aria-label="Star icon" />)
    icon = screen.getByLabelText("Star icon")
    expect(icon).toHaveClass("w-8", "h-8")

    rerender(<Icon icon={Star} size="2xl" aria-label="Star icon" />)
    icon = screen.getByLabelText("Star icon")
    expect(icon).toHaveClass("w-10", "h-10")
  })

  it("renders with custom size", () => {
    renderWithTheme(
      <Icon icon={Settings} customSize={48} aria-label="Settings icon" />
    )

    const icon = screen.getByLabelText("Settings icon")
    // Check that inline styles are applied
    expect(icon.style.width).toBe("48px")
    expect(icon.style.height).toBe("48px")
    expect(icon).not.toHaveClass("w-5", "h-5")
  })

  it("applies color variants correctly", () => {
    const { rerender } = renderWithTheme(
      <Icon icon={Heart} color="primary" aria-label="Heart icon" />
    )
    let icon = screen.getByLabelText("Heart icon")
    expect(icon).toHaveClass("text-blue-600")

    rerender(<Icon icon={Heart} color="danger" aria-label="Heart icon" />)
    icon = screen.getByLabelText("Heart icon")
    expect(icon).toHaveClass("text-red-600")

    rerender(<Icon icon={Heart} color="muted" aria-label="Heart icon" />)
    icon = screen.getByLabelText("Heart icon")
    expect(icon).toHaveClass("text-gray-600")
  })

  it("applies color intensity correctly", () => {
    const { rerender } = renderWithTheme(
      <Icon
        icon={Heart}
        color="primary"
        intensity="subtle"
        aria-label="Heart icon"
      />
    )
    let icon = screen.getByLabelText("Heart icon")
    expect(icon).toHaveClass("text-blue-400")

    rerender(
      <Icon
        icon={Heart}
        color="primary"
        intensity="strong"
        aria-label="Heart icon"
      />
    )
    icon = screen.getByLabelText("Heart icon")
    expect(icon).toHaveClass("text-blue-700")
  })

  it("handles click events correctly", async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()

    renderWithTheme(
      <Icon icon={Star} onClick={handleClick} aria-label="Clickable star" />
    )

    const icon = screen.getByLabelText("Clickable star")
    expect(icon).toHaveClass(
      "cursor-pointer",
      "transition-colors",
      "hover:opacity-75"
    )
    expect(icon).toHaveAttribute("role", "button")

    await user.click(icon)
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it("handles decorative icons correctly", () => {
    renderWithTheme(<Icon icon={Heart} decorative />)

    const icon = document.querySelector('svg[aria-hidden="true"]')
    expect(icon).toHaveAttribute("aria-hidden", "true")
    expect(icon).not.toHaveAttribute("aria-label")
  })

  it("applies custom className", () => {
    renderWithTheme(
      <Icon
        icon={Settings}
        className="custom-icon-class"
        aria-label="Settings"
      />
    )

    const icon = screen.getByLabelText("Settings")
    expect(icon).toHaveClass("custom-icon-class")
  })

  it("forwards ref correctly", () => {
    const ref = { current: null }
    renderWithTheme(<Icon icon={Heart} ref={ref} aria-label="Heart icon" />)

    expect(ref.current).toBeInstanceOf(SVGSVGElement)
  })

  it("applies custom strokeWidth", () => {
    renderWithTheme(<Icon icon={Star} strokeWidth={3} aria-label="Star icon" />)

    const icon = screen.getByLabelText("Star icon")
    expect(icon).toHaveAttribute("stroke-width", "3")
  })

  it("passes through additional props", () => {
    renderWithTheme(
      <Icon icon={Settings} strokeWidth={3} aria-label="Settings" />
    )

    const icon = screen.getByLabelText("Settings")
    expect(icon).toHaveAttribute("stroke-width", "3")
  })

  it("renders without aria-label when decorative", () => {
    renderWithTheme(<Icon icon={Heart} decorative />)

    // Should not throw accessibility error and should be hidden
    const container = document.querySelector('svg[aria-hidden="true"]')
    expect(container).toBeInTheDocument()
    expect(container).not.toHaveAttribute("aria-label")
  })

  it("combines multiple props correctly", () => {
    const handleClick = vi.fn()

    renderWithTheme(
      <Icon
        icon={Star}
        size="lg"
        color="primary"
        intensity="strong"
        customSize={30}
        strokeWidth={2.5}
        className="special-icon"
        onClick={handleClick}
        aria-label="Special star"
      />
    )

    const icon = screen.getByLabelText("Special star")
    expect(icon).toHaveClass("special-icon", "text-blue-700", "cursor-pointer")
    expect(icon.style.width).toBe("30px")
    expect(icon.style.height).toBe("30px")
    expect(icon).toHaveAttribute("stroke-width", "2.5")
    expect(icon).toHaveAttribute("role", "button")
  })
})
