import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { Container } from "./Container"
import { render as renderWithTheme } from "../../../test/utils"

describe("Container Component", () => {
  it("renders with default props", () => {
    renderWithTheme(<Container>Test content</Container>)

    const container = screen.getByText("Test content")
    expect(container).toBeInTheDocument()
    expect(container).toHaveClass(
      "w-full",
      "max-w-lg",
      "px-6",
      "px-4",
      "sm:px-6",
      "mx-auto"
    )
  })

  it("renders with custom maxWidth", () => {
    renderWithTheme(<Container maxWidth="sm">Content</Container>)

    const container = screen.getByText("Content")
    expect(container).toHaveClass("max-w-sm")
  })

  it("renders with all maxWidth variants", () => {
    const variants = [
      "xs",
      "sm",
      "md",
      "lg",
      "xl",
      "2xl",
      "full",
      "none",
    ] as const

    variants.forEach((variant) => {
      const { rerender } = renderWithTheme(
        <Container maxWidth={variant}>Content {variant}</Container>
      )

      const container = screen.getByText(`Content ${variant}`)
      if (variant === "none") {
        expect(container).not.toHaveClass("max-w-none")
      } else {
        expect(container).toHaveClass(`max-w-${variant}`)
      }

      rerender(<Container maxWidth="lg">Reset</Container>)
    })
  })

  it("renders with custom padding", () => {
    const { rerender } = renderWithTheme(
      <Container padding="none">Content</Container>
    )
    let container = screen.getByText("Content")
    expect(container).not.toHaveClass("px-6")

    rerender(<Container padding="sm">Content</Container>)
    container = screen.getByText("Content")
    expect(container).toHaveClass("px-4")

    rerender(<Container padding="lg">Content</Container>)
    container = screen.getByText("Content")
    expect(container).toHaveClass("px-8")
  })

  it("handles center prop correctly", () => {
    const { rerender } = renderWithTheme(
      <Container center={false}>Content</Container>
    )
    let container = screen.getByText("Content")
    expect(container).not.toHaveClass("mx-auto")

    rerender(<Container center={true}>Content</Container>)
    container = screen.getByText("Content")
    expect(container).toHaveClass("mx-auto")
  })

  it("handles gutter prop correctly", () => {
    const { rerender } = renderWithTheme(
      <Container gutter={false}>Content</Container>
    )
    let container = screen.getByText("Content")
    expect(container).not.toHaveClass("px-4", "sm:px-6")

    rerender(<Container gutter={true}>Content</Container>)
    container = screen.getByText("Content")
    expect(container).toHaveClass("px-4", "sm:px-6")
  })

  it("renders with custom element", () => {
    renderWithTheme(<Container as="section">Section content</Container>)

    const container = screen.getByText("Section content")
    expect(container.tagName).toBe("SECTION")
  })

  it("applies custom className", () => {
    renderWithTheme(<Container className="custom-class">Content</Container>)

    const container = screen.getByText("Content")
    expect(container).toHaveClass("custom-class")
  })

  it("forwards ref correctly", () => {
    const ref = { current: null }
    renderWithTheme(<Container ref={ref}>Content</Container>)

    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })

  it("forwards ref correctly with custom element", () => {
    const ref = { current: null }
    renderWithTheme(
      <Container ref={ref} as="section">
        Content
      </Container>
    )

    expect(ref.current).toBeInstanceOf(HTMLElement)
  })

  it("passes through additional props", () => {
    renderWithTheme(
      <Container data-testid="container" role="banner">
        Content
      </Container>
    )

    const container = screen.getByTestId("container")
    expect(container).toHaveAttribute("role", "banner")
  })

  it("renders complex content correctly", () => {
    renderWithTheme(
      <Container>
        <h1>Title</h1>
        <p>Paragraph</p>
        <div>Nested content</div>
      </Container>
    )

    expect(screen.getByText("Title")).toBeInTheDocument()
    expect(screen.getByText("Paragraph")).toBeInTheDocument()
    expect(screen.getByText("Nested content")).toBeInTheDocument()
  })

  it("combines all props correctly", () => {
    renderWithTheme(
      <Container
        maxWidth="xl"
        padding="lg"
        center={false}
        gutter={false}
        className="custom-styling"
        as="main"
      >
        Combined props content
      </Container>
    )

    const container = screen.getByText("Combined props content")
    expect(container.tagName).toBe("MAIN")
    expect(container).toHaveClass(
      "w-full",
      "max-w-xl",
      "px-8",
      "custom-styling"
    )
    expect(container).not.toHaveClass("mx-auto", "px-4", "sm:px-6")
  })
})
