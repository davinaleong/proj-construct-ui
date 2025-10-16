import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { FormField } from "./FormField"
import { Input } from "../Input"

describe("FormField Component", () => {
  describe("Basic Rendering", () => {
    it("renders a form field with input", () => {
      render(
        <FormField>
          <Input placeholder="Test input" />
        </FormField>
      )

      const input = screen.getByPlaceholderText("Test input")
      expect(input).toBeInTheDocument()
    })

    it("renders with label", () => {
      render(
        <FormField label="Test Label">
          <Input placeholder="Test input" />
        </FormField>
      )

      expect(screen.getByLabelText("Test Label")).toBeInTheDocument()
      expect(screen.getByText("Test Label")).toBeInTheDocument()
    })

    it("renders with description", () => {
      render(
        <FormField description="This is a description">
          <Input placeholder="Test input" />
        </FormField>
      )

      expect(screen.getByText("This is a description")).toBeInTheDocument()
    })

    it("renders with error message", () => {
      render(
        <FormField error="This is an error">
          <Input placeholder="Test input" />
        </FormField>
      )

      expect(screen.getByText("This is an error")).toBeInTheDocument()
    })

    it("renders with hint text", () => {
      render(
        <FormField hint="This is a hint">
          <Input placeholder="Test input" />
        </FormField>
      )

      expect(screen.getByText("This is a hint")).toBeInTheDocument()
    })
  })

  describe("Required Field", () => {
    it("shows required indicator when required", () => {
      render(
        <FormField label="Required Field" required>
          <Input placeholder="Test input" />
        </FormField>
      )

      expect(screen.getByText("*")).toBeInTheDocument()
    })

    it("passes required prop to child input", () => {
      render(
        <FormField required>
          <Input placeholder="Test input" />
        </FormField>
      )

      const input = screen.getByPlaceholderText("Test input")
      expect(input).toHaveAttribute("required")
    })
  })

  describe("Error State", () => {
    it("applies error state to child input", () => {
      render(
        <FormField error="Error message">
          <Input placeholder="Test input" />
        </FormField>
      )

      const input = screen.getByPlaceholderText("Test input")
      expect(input).toHaveAttribute("aria-invalid", "true")
    })

    it("shows error message instead of description", () => {
      render(
        <FormField description="Description text" error="Error message">
          <Input placeholder="Test input" />
        </FormField>
      )

      expect(screen.getByText("Error message")).toBeInTheDocument()
      expect(screen.queryByText("Description text")).not.toBeInTheDocument()
    })
  })

  describe("Disabled State", () => {
    it("applies disabled styling", () => {
      render(
        <FormField label="Disabled Field" disabled>
          <Input placeholder="Test input" />
        </FormField>
      )

      const container = screen.getByText("Disabled Field").closest("div")
      expect(container).toHaveClass("opacity-50", "pointer-events-none")
    })

    it("passes disabled prop to child input", () => {
      render(
        <FormField disabled>
          <Input placeholder="Test input" />
        </FormField>
      )

      const input = screen.getByPlaceholderText("Test input")
      expect(input).toHaveAttribute("disabled")
    })
  })

  describe("Accessibility", () => {
    it("connects label to input with correct id", () => {
      render(
        <FormField label="Test Label" id="test-field">
          <Input placeholder="Test input" />
        </FormField>
      )

      const label = screen.getByText("Test Label")
      const input = screen.getByPlaceholderText("Test input")

      expect(label).toHaveAttribute("for", "test-field")
      expect(input).toHaveAttribute("id", "test-field")
    })

    it("connects description to input with aria-describedby", () => {
      render(
        <FormField description="Test description" id="test-field">
          <Input placeholder="Test input" />
        </FormField>
      )

      const input = screen.getByPlaceholderText("Test input")
      expect(input).toHaveAttribute(
        "aria-describedby",
        "test-field-description"
      )
    })

    it("connects error to input with aria-describedby", () => {
      render(
        <FormField error="Test error" id="test-field">
          <Input placeholder="Test input" />
        </FormField>
      )

      const input = screen.getByPlaceholderText("Test input")
      expect(input).toHaveAttribute("aria-describedby", "test-field-error")
    })
  })

  describe("Layout Orientations", () => {
    it("renders in vertical orientation by default", () => {
      render(
        <FormField label="Test Label">
          <Input placeholder="Test input" />
        </FormField>
      )

      const container = screen.getByText("Test Label").closest("div")
      expect(container).toHaveClass("flex-col")
    })

    it("renders in horizontal orientation", () => {
      render(
        <FormField label="Test Label" orientation="horizontal">
          <Input placeholder="Test input" />
        </FormField>
      )

      const container = screen.getByText("Test Label").closest("div")
      expect(container).toHaveClass("flex-row", "items-center")
    })
  })

  describe("Sizes", () => {
    it("applies small size classes", () => {
      render(
        <FormField size="sm" data-testid="form-field">
          <Input placeholder="Test input" />
        </FormField>
      )

      const container = screen.getByTestId("form-field")
      expect(container).toHaveClass("gap-1")
    })

    it("applies large size classes", () => {
      render(
        <FormField size="lg" data-testid="form-field">
          <Input placeholder="Test input" />
        </FormField>
      )

      const container = screen.getByTestId("form-field")
      expect(container).toHaveClass("gap-3")
    })
  })

  describe("Custom Classes", () => {
    it("applies custom className", () => {
      render(
        <FormField className="custom-class" data-testid="form-field">
          <Input placeholder="Test input" />
        </FormField>
      )

      const container = screen.getByTestId("form-field")
      expect(container).toHaveClass("custom-class")
    })
  })
})
