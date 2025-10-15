import { screen } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"
import userEvent from "@testing-library/user-event"
import { Heart, Search, Settings, Plus } from "lucide-react"
import { IconButton } from "./IconButton"
import { render as renderWithTheme } from "../../../test/utils"

describe("IconButton Component", () => {
  it("renders with default props", () => {
    renderWithTheme(<IconButton icon={Heart} aria-label="Like" />)

    const button = screen.getByRole("button", { name: "Like" })
    expect(button).toBeInTheDocument()
    expect(button).toHaveClass(
      "inline-flex",
      "items-center",
      "justify-center",
      "font-medium",
      "transition-all",
      "duration-200",
      "cursor-pointer"
    )
  })

  it("renders different sizes correctly", () => {
    const { rerender } = renderWithTheme(
      <IconButton icon={Search} size="xs" aria-label="Search" />
    )
    let button = screen.getByRole("button")
    expect(button).toHaveClass("w-6", "h-6", "p-1")

    rerender(<IconButton icon={Search} size="sm" aria-label="Search" />)
    button = screen.getByRole("button")
    expect(button).toHaveClass("w-8", "h-8", "p-1.5")

    rerender(<IconButton icon={Search} size="md" aria-label="Search" />)
    button = screen.getByRole("button")
    expect(button).toHaveClass("w-10", "h-10", "p-2")

    rerender(<IconButton icon={Search} size="lg" aria-label="Search" />)
    button = screen.getByRole("button")
    expect(button).toHaveClass("w-12", "h-12", "p-2.5")

    rerender(<IconButton icon={Search} size="xl" aria-label="Search" />)
    button = screen.getByRole("button")
    expect(button).toHaveClass("w-16", "h-16", "p-3")
  })

  it("renders different variants correctly", () => {
    const { rerender } = renderWithTheme(
      <IconButton icon={Settings} variant="solid" aria-label="Settings" />
    )
    let button = screen.getByRole("button")
    expect(button).toHaveClass("rounded-sm", "border", "shadow-sm")

    rerender(
      <IconButton icon={Settings} variant="outline" aria-label="Settings" />
    )
    button = screen.getByRole("button")
    expect(button).toHaveClass("border-2")

    rerender(
      <IconButton icon={Settings} variant="ghost" aria-label="Settings" />
    )
    button = screen.getByRole("button")
    expect(button).toHaveClass("hover:bg-stone-100/50")
  })

  it("applies color variants correctly", () => {
    const { rerender } = renderWithTheme(
      <IconButton icon={Heart} color="primary" aria-label="Like" />
    )
    let button = screen.getByRole("button")
    expect(button).toHaveClass("bg-blue-600", "text-white")

    rerender(<IconButton icon={Heart} color="danger" aria-label="Delete" />)
    button = screen.getByRole("button")
    expect(button).toHaveClass("bg-red-600", "text-white")
  })

  it("handles click events", async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()

    renderWithTheme(
      <IconButton icon={Plus} onClick={handleClick} aria-label="Add item" />
    )

    const button = screen.getByRole("button")
    await user.click(button)

    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it("handles disabled state", () => {
    renderWithTheme(
      <IconButton icon={Settings} disabled aria-label="Settings" />
    )

    const button = screen.getByRole("button")
    expect(button).toBeDisabled()
    expect(button).toHaveClass(
      "disabled:opacity-50",
      "disabled:cursor-not-allowed"
    )
  })

  it("shows loading state", () => {
    renderWithTheme(<IconButton icon={Heart} loading aria-label="Loading" />)

    const button = screen.getByRole("button")
    expect(button).toBeDisabled()

    // Should show loading spinner instead of original icon
    const loadingIcon = button.querySelector("svg")
    expect(loadingIcon).toBeInTheDocument()
  })

  it("doesn't trigger click when disabled", async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()

    renderWithTheme(
      <IconButton
        icon={Plus}
        onClick={handleClick}
        disabled
        aria-label="Add item"
      />
    )

    const button = screen.getByRole("button")
    await user.click(button)

    expect(handleClick).not.toHaveBeenCalled()
  })

  it("doesn't trigger click when loading", async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()

    renderWithTheme(
      <IconButton
        icon={Plus}
        onClick={handleClick}
        loading
        aria-label="Loading"
      />
    )

    const button = screen.getByRole("button")
    await user.click(button)

    expect(handleClick).not.toHaveBeenCalled()
  })

  it("applies custom className", () => {
    renderWithTheme(
      <IconButton
        icon={Search}
        className="custom-icon-button"
        aria-label="Search"
      />
    )

    const button = screen.getByRole("button")
    expect(button).toHaveClass("custom-icon-button")
  })

  it("passes through additional props", () => {
    renderWithTheme(
      <IconButton icon={Settings} aria-label="Settings" type="submit" />
    )

    const button = screen.getByRole("button")
    expect(button).toHaveAttribute("aria-label", "Settings")
    expect(button).toHaveAttribute("type", "submit")
  })

  it("requires aria-label for accessibility", () => {
    renderWithTheme(<IconButton icon={Heart} aria-label="Like" />)

    const button = screen.getByRole("button", { name: "Like" })
    expect(button).toBeInTheDocument()
    expect(button).toHaveAttribute("aria-label", "Like")
  })

  it("combines all props correctly", () => {
    const handleClick = vi.fn()

    renderWithTheme(
      <IconButton
        icon={Search}
        size="lg"
        variant="outline"
        color="primary"
        className="search-button"
        onClick={handleClick}
        aria-label="Search documents"
      />
    )

    const button = screen.getByRole("button", { name: "Search documents" })
    expect(button).toHaveClass(
      "w-12",
      "h-12",
      "p-2.5",
      "border-2",
      "search-button"
    )
  })

  it("handles keyboard events", async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()

    renderWithTheme(
      <IconButton icon={Plus} onClick={handleClick} aria-label="Add item" />
    )

    const button = screen.getByRole("button")
    button.focus()
    await user.keyboard("{Enter}")

    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it("shows hover effects for interactive variants", () => {
    renderWithTheme(
      <IconButton icon={Heart} variant="solid" aria-label="Like" />
    )

    const button = screen.getByRole("button")
    expect(button).toHaveClass(
      "hover:shadow-md",
      "hover:-translate-y-[1px]",
      "active:shadow-inner"
    )
  })

  it("handles different color intensities with outline variant", () => {
    renderWithTheme(
      <IconButton
        icon={Settings}
        variant="outline"
        color="primary"
        aria-label="Settings"
      />
    )

    const button = screen.getByRole("button")
    expect(button).toHaveClass("border-blue-300", "text-blue-600")
  })
})
