import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { Paper } from "./Paper"
import { render as renderWithTheme } from "../../../test/utils"

describe("Paper Component", () => {
  it("renders with default props", () => {
    renderWithTheme(<Paper>Default paper</Paper>)

    const paper = screen.getByText("Default paper")
    expect(paper).toBeInTheDocument()
    expect(paper).toHaveClass(
      "relative",
      "rounded-sm",
      "p-4",
      "backdrop-blur-sm"
    )
  })

  it("renders different variants correctly", () => {
    const { rerender } = renderWithTheme(
      <Paper variant="flat">Flat paper</Paper>
    )
    let paper = screen.getByText("Flat paper")
    expect(paper).toHaveClass("shadow-none")

    rerender(<Paper variant="elevated">Elevated paper</Paper>)
    paper = screen.getByText("Elevated paper")
    expect(paper).toHaveClass("shadow-md", "hover:shadow-lg")

    rerender(<Paper variant="outlined">Outlined paper</Paper>)
    paper = screen.getByText("Outlined paper")
    expect(paper).toHaveClass("border-2")
  })

  it("applies different padding variants", () => {
    const { rerender } = renderWithTheme(
      <Paper padding="none">No padding</Paper>
    )
    let paper = screen.getByText("No padding")
    expect(paper).not.toHaveClass("p-4")

    rerender(<Paper padding="xs">XS padding</Paper>)
    paper = screen.getByText("XS padding")
    expect(paper).toHaveClass("p-2")

    rerender(<Paper padding="sm">SM padding</Paper>)
    paper = screen.getByText("SM padding")
    expect(paper).toHaveClass("p-3")

    rerender(<Paper padding="lg">LG padding</Paper>)
    paper = screen.getByText("LG padding")
    expect(paper).toHaveClass("p-6")

    rerender(<Paper padding="xl">XL padding</Paper>)
    paper = screen.getByText("XL padding")
    expect(paper).toHaveClass("p-8")
  })

  it("applies custom elevation", () => {
    const { rerender } = renderWithTheme(
      <Paper elevation="sm">Small elevation</Paper>
    )
    let paper = screen.getByText("Small elevation")
    expect(paper).toHaveClass("shadow-sm")

    rerender(<Paper elevation="lg">Large elevation</Paper>)
    paper = screen.getByText("Large elevation")
    expect(paper).toHaveClass("shadow-lg")

    rerender(<Paper elevation="xl">XL elevation</Paper>)
    paper = screen.getByText("XL elevation")
    expect(paper).toHaveClass("shadow-xl")
  })

  it("applies background color variants", () => {
    const { rerender } = renderWithTheme(
      <Paper background="primary">Primary background</Paper>
    )
    let paper = screen.getByText("Primary background")
    expect(paper).toHaveClass("bg-blue-400")

    rerender(<Paper background="danger">Danger background</Paper>)
    paper = screen.getByText("Danger background")
    expect(paper).toHaveClass("bg-red-400")
  })

  it("applies border color variants for outlined variant", () => {
    const { rerender } = renderWithTheme(
      <Paper variant="outlined" borderColor="primary">
        Primary border
      </Paper>
    )
    let paper = screen.getByText("Primary border")
    expect(paper).toHaveClass("border-2", "border-blue-600")

    rerender(
      <Paper variant="outlined" borderColor="danger">
        Danger border
      </Paper>
    )
    paper = screen.getByText("Danger border")
    expect(paper).toHaveClass("border-2", "border-red-600")
  })

  it("applies texture when withTexture is true", () => {
    renderWithTheme(<Paper withTexture>Textured paper</Paper>)

    const paper = screen.getByText("Textured paper")
    expect(paper).toHaveClass(
      "before:absolute",
      "before:inset-0",
      "before:pointer-events-none",
      "before:opacity-20"
    )
    expect(paper).toHaveStyle({
      backgroundImage: expect.stringContaining("radial-gradient"),
    })
  })

  it("renders with custom element", () => {
    renderWithTheme(<Paper as="section">Section paper</Paper>)

    const paper = screen.getByText("Section paper")
    expect(paper.tagName).toBe("SECTION")
  })

  it("applies custom className", () => {
    renderWithTheme(<Paper className="custom-paper-class">Custom paper</Paper>)

    const paper = screen.getByText("Custom paper")
    expect(paper).toHaveClass("custom-paper-class")
  })

  it("forwards ref correctly", () => {
    const ref = { current: null }
    renderWithTheme(<Paper ref={ref}>Ref paper</Paper>)

    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })

  it("forwards ref correctly with custom element", () => {
    const ref = { current: null }
    renderWithTheme(
      <Paper ref={ref} as="article">
        Article paper
      </Paper>
    )

    expect(ref.current).toBeInstanceOf(HTMLElement)
  })

  it("passes through additional props", () => {
    renderWithTheme(
      <Paper data-testid="paper" role="banner">
        Accessible paper
      </Paper>
    )

    const paper = screen.getByTestId("paper")
    expect(paper).toHaveAttribute("role", "banner")
  })

  it("renders complex content correctly", () => {
    renderWithTheme(
      <Paper>
        <h2>Paper Title</h2>
        <p>Paper content with multiple elements</p>
        <button>Action button</button>
      </Paper>
    )

    expect(screen.getByText("Paper Title")).toBeInTheDocument()
    expect(
      screen.getByText("Paper content with multiple elements")
    ).toBeInTheDocument()
    expect(screen.getByText("Action button")).toBeInTheDocument()
  })

  it("combines all props correctly", () => {
    renderWithTheme(
      <Paper
        variant="elevated"
        padding="lg"
        elevation="xl"
        background="primary"
        withTexture
        className="combined-paper"
        as="main"
      >
        Combined props paper
      </Paper>
    )

    const paper = screen.getByText("Combined props paper")
    expect(paper.tagName).toBe("MAIN")
    expect(paper).toHaveClass(
      "relative",
      "rounded-sm",
      "p-6",
      "shadow-xl",
      "bg-blue-400",
      "backdrop-blur-sm",
      "before:absolute",
      "combined-paper"
    )
  })

  it("applies hover effects for elevated variants", () => {
    renderWithTheme(<Paper variant="elevated">Hoverable paper</Paper>)

    const paper = screen.getByText("Hoverable paper")
    expect(paper).toHaveClass(
      "transition-all",
      "duration-200",
      "hover:shadow-lg",
      "hover:-translate-y-[1px]",
      "active:shadow-inner"
    )
  })

  it("has default border for non-outlined variants", () => {
    renderWithTheme(<Paper variant="flat">Bordered paper</Paper>)

    const paper = screen.getByText("Bordered paper")
    expect(paper).toHaveClass("border", "border-stone-200/60")
  })
})
