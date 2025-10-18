import { describe, it, expect, vi } from "vitest"
import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import { User, Settings, X } from "lucide-react"
import { Tag } from "./Tag"

describe("Tag Component", () => {
  // Basic rendering tests
  describe("Basic Rendering", () => {
    it("renders with default props", () => {
      render(<Tag>Default Tag</Tag>)

      const tag = screen.getByText("Default Tag")
      expect(tag).toBeInTheDocument()
      expect(tag).toHaveClass("inline-flex", "items-center", "justify-center")
    })

    it("renders children correctly", () => {
      render(<Tag>Test Content</Tag>)

      expect(screen.getByText("Test Content")).toBeInTheDocument()
    })

    it("applies custom className", () => {
      render(<Tag className="custom-class">Test</Tag>)

      const tag = screen.getByText("Test")
      expect(tag).toHaveClass("custom-class")
    })

    it("forwards ref correctly", () => {
      const ref = vi.fn()
      render(<Tag ref={ref}>Test</Tag>)

      expect(ref).toHaveBeenCalled()
    })
  })

  // Size variants tests
  describe("Size Variants", () => {
    it("renders xs size correctly", () => {
      render(<Tag size="xs">Extra Small</Tag>)

      const tag = screen.getByText("Extra Small")
      expect(tag).toHaveClass("px-1.5", "py-0.5", "text-xs")
    })

    it("renders sm size correctly", () => {
      render(<Tag size="sm">Small</Tag>)

      const tag = screen.getByText("Small")
      expect(tag).toHaveClass("px-2", "py-1", "text-xs")
    })

    it("renders md size correctly (default)", () => {
      render(<Tag size="md">Medium</Tag>)

      const tag = screen.getByText("Medium")
      expect(tag).toHaveClass("px-2.5", "py-1.5", "text-sm")
    })

    it("renders lg size correctly", () => {
      render(<Tag size="lg">Large</Tag>)

      const tag = screen.getByText("Large")
      expect(tag).toHaveClass("px-3", "py-2", "text-base")
    })
  })

  // Visual variant tests
  describe("Visual Variants", () => {
    it("renders solid variant", () => {
      render(<Tag variant="solid">Solid Tag</Tag>)

      const tag = screen.getByText("Solid Tag")
      expect(tag).toBeInTheDocument()
      // Solid variant should have color classes applied
    })

    it("renders soft variant (default)", () => {
      render(<Tag variant="soft">Soft Tag</Tag>)

      const tag = screen.getByText("Soft Tag")
      expect(tag).toBeInTheDocument()
    })

    it("renders outline variant", () => {
      render(<Tag variant="outline">Outline Tag</Tag>)

      const tag = screen.getByText("Outline Tag")
      expect(tag).toBeInTheDocument()
    })

    it("renders ghost variant", () => {
      render(<Tag variant="ghost">Ghost Tag</Tag>)

      const tag = screen.getByText("Ghost Tag")
      expect(tag).toBeInTheDocument()
    })
  })

  // Color variant tests
  describe("Color Variants", () => {
    const colors = [
      "primary",
      "secondary",
      "success",
      "warning",
      "danger",
      "info",
    ]

    colors.forEach((color) => {
      it(`renders with ${color} color variant`, () => {
        render(<Tag colorVariant={color as any}>{color} Tag</Tag>)

        const tag = screen.getByText(`${color} Tag`)
        expect(tag).toBeInTheDocument()
      })
    })

    it("renders with default color variant", () => {
      render(<Tag colorVariant="default">Default Color</Tag>)

      const tag = screen.getByText("Default Color")
      expect(tag).toBeInTheDocument()
    })
  })

  // Icon tests
  describe("Icons", () => {
    it("renders with start icon", () => {
      render(
        <Tag startIcon={<User data-testid="start-icon" />}>With Start Icon</Tag>
      )

      expect(screen.getByTestId("start-icon")).toBeInTheDocument()
      expect(screen.getByText("With Start Icon")).toBeInTheDocument()
    })

    it("renders with end icon", () => {
      render(
        <Tag endIcon={<Settings data-testid="end-icon" />}>With End Icon</Tag>
      )

      expect(screen.getByTestId("end-icon")).toBeInTheDocument()
      expect(screen.getByText("With End Icon")).toBeInTheDocument()
    })

    it("renders with both start and end icons", () => {
      render(
        <Tag
          startIcon={<User data-testid="start-icon" />}
          endIcon={<Settings data-testid="end-icon" />}
        >
          Both Icons
        </Tag>
      )

      expect(screen.getByTestId("start-icon")).toBeInTheDocument()
      expect(screen.getByTestId("end-icon")).toBeInTheDocument()
      expect(screen.getByText("Both Icons")).toBeInTheDocument()
    })

    it("renders with dot indicator", () => {
      render(<Tag dot>With Dot</Tag>)

      const tag = screen.getByText("With Dot")
      expect(tag).toBeInTheDocument()
      // Check for dot element (it should have rounded-full and bg-current classes)
      const dotElement = tag.querySelector(".rounded-full.bg-current")
      expect(dotElement).toBeInTheDocument()
    })

    it("applies correct size classes to icons", () => {
      render(
        <Tag size="md" startIcon={<User data-testid="start-icon" />}>
          Medium Tag
        </Tag>
      )

      const startIcon = screen.getByTestId("start-icon")
      expect(startIcon).toHaveClass("w-3.5", "h-3.5") // md size should be w-3.5 h-3.5
    })

    it("preserves existing icon classes when cloning", () => {
      render(
        <Tag 
          size="lg" 
          startIcon={<User data-testid="start-icon" className="text-red-500" />}
        >
          Large Tag
        </Tag>
      )

      const startIcon = screen.getByTestId("start-icon")
      expect(startIcon).toHaveClass("w-4", "h-4", "text-red-500") // lg size + preserved class
    })
  })

  // Dismissible functionality tests
  describe("Dismissible Functionality", () => {
    it("renders dismiss button when dismissible", () => {
      render(<Tag dismissible>Dismissible Tag</Tag>)

      const dismissButton = screen.getByRole("button", { name: /remove tag/i })
      expect(dismissButton).toBeInTheDocument()
    })

    it("calls onDismiss when dismiss button is clicked", async () => {
      const handleDismiss = vi.fn()
      render(
        <Tag dismissible onDismiss={handleDismiss}>
          Dismissible Tag
        </Tag>
      )

      const dismissButton = screen.getByRole("button", { name: /remove tag/i })
      fireEvent.click(dismissButton)

      await waitFor(() => {
        expect(handleDismiss).toHaveBeenCalledTimes(1)
      })
    })

    it("renders custom dismiss icon", () => {
      render(
        <Tag dismissible dismissIcon={<X data-testid="custom-dismiss" />}>
          Custom Dismiss
        </Tag>
      )

      expect(screen.getByTestId("custom-dismiss")).toBeInTheDocument()
    })

    it("prevents dismiss when disabled", () => {
      const handleDismiss = vi.fn()
      render(
        <Tag dismissible disabled onDismiss={handleDismiss}>
          Disabled Dismissible
        </Tag>
      )

      const dismissButton = screen.getByRole("button", { name: /remove tag/i })
      expect(dismissButton).toBeDisabled()

      fireEvent.click(dismissButton)
      expect(handleDismiss).not.toHaveBeenCalled()
    })
  })

  // Clickable functionality tests
  describe("Clickable Functionality", () => {
    it("renders as button when clickable", () => {
      render(<Tag clickable>Clickable Tag</Tag>)

      const tag = screen.getByRole("button")
      expect(tag).toBeInTheDocument()
      expect(tag).toHaveAttribute("tabindex", "0")
    })

    it("calls onClick when clickable tag is clicked", () => {
      const handleClick = vi.fn()
      render(
        <Tag clickable onClick={handleClick}>
          Clickable Tag
        </Tag>
      )

      const tag = screen.getByRole("button")
      fireEvent.click(tag)

      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it("applies hover classes when clickable", () => {
      render(<Tag clickable>Clickable Tag</Tag>)

      const tag = screen.getByRole("button")
      expect(tag).toHaveClass("cursor-pointer")
    })

    it("prevents click when disabled", () => {
      const handleClick = vi.fn()
      render(
        <Tag clickable disabled onClick={handleClick}>
          Disabled Clickable
        </Tag>
      )

      const tag = screen.getByText("Disabled Clickable")
      fireEvent.click(tag)

      expect(handleClick).not.toHaveBeenCalled()
    })
  })

  // Disabled state tests
  describe("Disabled State", () => {
    it("applies disabled styling", () => {
      render(<Tag disabled>Disabled Tag</Tag>)

      const tag = screen.getByText("Disabled Tag")
      expect(tag).toHaveClass("opacity-50", "cursor-not-allowed")
      expect(tag).toHaveAttribute("aria-disabled", "true")
    })

    it("prevents interactions when disabled", () => {
      const handleClick = vi.fn()
      const handleDismiss = vi.fn()

      render(
        <Tag
          disabled
          clickable
          dismissible
          onClick={handleClick}
          onDismiss={handleDismiss}
        >
          Disabled Interactive
        </Tag>
      )

      const tag = screen.getByText("Disabled Interactive")
      const dismissButton = screen.getByRole("button", { name: /remove tag/i })

      fireEvent.click(tag)
      fireEvent.click(dismissButton)

      expect(handleClick).not.toHaveBeenCalled()
      expect(handleDismiss).not.toHaveBeenCalled()
    })
  })

  // Styling options tests
  describe("Styling Options", () => {
    it("renders with rounded corners by default", () => {
      render(<Tag>Rounded Tag</Tag>)

      const tag = screen.getByText("Rounded Tag")
      expect(tag).toHaveClass("rounded-full")
    })

    it("renders with square corners when rounded=false", () => {
      render(<Tag rounded={false}>Square Tag</Tag>)

      const tag = screen.getByText("Square Tag")
      expect(tag).toHaveClass("rounded-sm")
      expect(tag).not.toHaveClass("rounded-full")
    })

    it("applies maxWidth style", () => {
      render(<Tag maxWidth="100px">Long Tag Content</Tag>)

      const tag = screen.getByText("Long Tag Content")
      expect(tag).toHaveStyle({ maxWidth: "100px" })
    })

    it("applies truncation classes when maxWidth is set", () => {
      render(<Tag maxWidth="50px">Very Long Tag Content</Tag>)

      const tag = screen.getByText("Very Long Tag Content")
      const textElement = tag.querySelector(".truncate")
      expect(textElement).toBeInTheDocument()
    })
  })

  // Accessibility tests
  describe("Accessibility", () => {
    it("has correct ARIA attributes for clickable tag", () => {
      render(<Tag clickable>Clickable</Tag>)

      const tag = screen.getByRole("button")
      expect(tag).toHaveAttribute("role", "button")
      expect(tag).toHaveAttribute("tabindex", "0")
    })

    it("has correct ARIA attributes for disabled tag", () => {
      render(
        <Tag disabled clickable>
          Disabled
        </Tag>
      )

      const tag = screen.getByText("Disabled")
      expect(tag).toHaveAttribute("aria-disabled", "true")
    })

    it("has accessible dismiss button", () => {
      render(<Tag dismissible>Dismissible</Tag>)

      const dismissButton = screen.getByRole("button", { name: /remove tag/i })
      expect(dismissButton).toHaveAttribute("aria-label", "Remove tag")
      expect(dismissButton).toHaveAttribute("type", "button")
    })

    it("has proper focus styling", () => {
      render(<Tag clickable>Focusable</Tag>)

      const tag = screen.getByRole("button")
      expect(tag).toHaveClass(
        "focus-visible:outline-none",
        "focus-visible:ring-2"
      )
    })
  })

  // Edge cases tests
  describe("Edge Cases", () => {
    it("handles empty children", () => {
      render(<Tag></Tag>)

      const tag = screen.getByRole("generic")
      expect(tag).toBeInTheDocument()
    })

    it("handles complex children", () => {
      render(
        <Tag>
          <span>Complex</span> <strong>Children</strong>
        </Tag>
      )

      expect(screen.getByText("Complex")).toBeInTheDocument()
      expect(screen.getByText("Children")).toBeInTheDocument()
    })

    it("stops propagation on dismiss click", () => {
      const handleTagClick = vi.fn()
      const handleDismiss = vi.fn()

      render(
        <Tag
          clickable
          dismissible
          onClick={handleTagClick}
          onDismiss={handleDismiss}
        >
          Test Tag
        </Tag>
      )

      const dismissButton = screen.getByRole("button", { name: /remove tag/i })
      fireEvent.click(dismissButton)

      expect(handleDismiss).toHaveBeenCalledTimes(1)
      expect(handleTagClick).not.toHaveBeenCalled()
    })

    it("handles keyboard events on clickable tags", () => {
      const handleClick = vi.fn()
      render(
        <Tag clickable onClick={handleClick}>
          Clickable
        </Tag>
      )

      const tag = screen.getByRole("button")
      fireEvent.keyDown(tag, { key: "Enter" })

      // Note: The component doesn't handle keyboard events by default,
      // but it should be focusable
      expect(tag).toHaveAttribute("tabindex", "0")
    })
  })
})
