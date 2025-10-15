import { render, screen } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"
import userEvent from "@testing-library/user-event"
import { Brand } from "./Brand"
import { render as renderWithTheme } from "../../../test/utils"

describe("Brand Component", () => {
  it("renders with default props", () => {
    renderWithTheme(<Brand />)

    expect(screen.getByText("Paper Design System")).toBeInTheDocument()
    expect(
      screen.getByText("A warm, tactile component library")
    ).toBeInTheDocument()
    expect(screen.getByAltText("Paper Design System logo")).toBeInTheDocument()
  })

  it("renders with custom title and subtitle", () => {
    renderWithTheme(<Brand title="Custom Brand" subtitle="Custom tagline" />)

    expect(screen.getByText("Custom Brand")).toBeInTheDocument()
    expect(screen.getByText("Custom tagline")).toBeInTheDocument()
  })

  it("renders different sizes correctly", () => {
    const { rerender } = renderWithTheme(<Brand size="sm" />)
    let logo = screen.getByAltText("Paper Design System logo")
    expect(logo).toHaveClass("h-8", "w-8")

    rerender(<Brand size="md" />)
    logo = screen.getByAltText("Paper Design System logo")
    expect(logo).toHaveClass("h-10", "w-10")

    rerender(<Brand size="lg" />)
    logo = screen.getByAltText("Paper Design System logo")
    expect(logo).toHaveClass("h-12", "w-12")
  })

  it("hides logo when showLogo is false", () => {
    renderWithTheme(<Brand showLogo={false} />)

    expect(
      screen.queryByAltText("Paper Design System logo")
    ).not.toBeInTheDocument()
    expect(screen.getByText("Paper Design System")).toBeInTheDocument()
  })

  it("hides text when showText is false", () => {
    renderWithTheme(<Brand showText={false} />)

    expect(screen.queryByText("Paper Design System")).not.toBeInTheDocument()
    expect(screen.getByAltText("Paper Design System logo")).toBeInTheDocument()
  })

  it("renders as clickable button when onClick is provided", async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()

    renderWithTheme(<Brand onClick={handleClick} />)

    const brand = screen.getByRole("button")
    expect(brand).toBeInTheDocument()
    expect(brand).toHaveClass("cursor-pointer")

    await user.click(brand)
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it("renders as div when no onClick is provided", () => {
    renderWithTheme(<Brand />)

    expect(screen.queryByRole("button")).not.toBeInTheDocument()
    const brandDiv = screen.getByText("Paper Design System").closest("div")
    expect(brandDiv).toBeInTheDocument()
  })

  it("uses custom logo source", () => {
    renderWithTheme(<Brand logoSrc="/custom-logo.png" />)

    const logo = screen.getByAltText("Paper Design System logo")
    expect(logo).toHaveAttribute("src", "/custom-logo.png")
  })

  it("applies custom className", () => {
    renderWithTheme(<Brand className="custom-class" />)

    // Find the main Brand container by looking for the element that contains both logo and text
    const logoImg = screen.getByAltText("Paper Design System logo")
    const brand = logoImg.parentElement
    expect(brand).toHaveClass("custom-class")
  })

  it("hides subtitle for small size", () => {
    renderWithTheme(<Brand size="sm" subtitle="Test subtitle" />)

    expect(screen.queryByText("Test subtitle")).not.toBeInTheDocument()
  })

  it("shows subtitle for medium and large sizes", () => {
    const { rerender } = renderWithTheme(
      <Brand size="md" subtitle="Test subtitle" />
    )
    expect(screen.getByText("Test subtitle")).toBeInTheDocument()

    rerender(<Brand size="lg" subtitle="Test subtitle" />)
    expect(screen.getByText("Test subtitle")).toBeInTheDocument()
  })

  it("forwards ref correctly", () => {
    const ref = { current: null }
    renderWithTheme(<Brand ref={ref} />)

    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })
})
