import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { FormGroup } from "./FormGroup"
import { FormField } from "../FormField"
import { Input } from "../Input"

describe("FormGroup Component", () => {
  describe("Basic Rendering", () => {
    it("renders a form group with children", () => {
      render(
        <FormGroup>
          <FormField label="Field 1">
            <Input placeholder="Input 1" />
          </FormField>
          <FormField label="Field 2">
            <Input placeholder="Input 2" />
          </FormField>
        </FormGroup>
      )

      expect(screen.getByPlaceholderText("Input 1")).toBeInTheDocument()
      expect(screen.getByPlaceholderText("Input 2")).toBeInTheDocument()
    })

    it("renders with title", () => {
      render(
        <FormGroup title="Group Title">
          <FormField>
            <Input placeholder="Test input" />
          </FormField>
        </FormGroup>
      )

      expect(screen.getByText("Group Title")).toBeInTheDocument()
    })

    it("renders with description", () => {
      render(
        <FormGroup description="Group description">
          <FormField>
            <Input placeholder="Test input" />
          </FormField>
        </FormGroup>
      )

      expect(screen.getByText("Group description")).toBeInTheDocument()
    })
  })

  describe("Fieldset Mode", () => {
    it("renders as fieldset when fieldset prop is true", () => {
      render(
        <FormGroup title="Fieldset Title" fieldset>
          <FormField>
            <Input placeholder="Test input" />
          </FormField>
        </FormGroup>
      )

      const fieldset = screen.getByRole("group")
      expect(fieldset.tagName).toBe("FIELDSET")
      expect(screen.getByText("Fieldset Title").tagName).toBe("LEGEND")
    })

    it("renders as div when fieldset prop is false", () => {
      render(
        <FormGroup title="Regular Title">
          <FormField>
            <Input placeholder="Test input" />
          </FormField>
        </FormGroup>
      )

      // Should not have a fieldset
      expect(screen.queryByRole("group")).not.toBeInTheDocument()
      expect(screen.getByText("Regular Title").tagName).toBe("DIV")
    })
  })

  describe("Disabled State", () => {
    it("applies disabled styling", () => {
      render(
        <FormGroup title="Disabled Group" disabled data-testid="form-group">
          <FormField>
            <Input placeholder="Test input" />
          </FormField>
        </FormGroup>
      )

      const container = screen.getByTestId("form-group")
      expect(container).toHaveClass("opacity-50", "pointer-events-none")
    })

    it("sets disabled attribute on fieldset", () => {
      render(
        <FormGroup disabled fieldset>
          <FormField>
            <Input placeholder="Test input" />
          </FormField>
        </FormGroup>
      )

      const fieldset = screen.getByRole("group")
      expect(fieldset).toHaveAttribute("disabled")
    })
  })

  describe("Layout Orientations", () => {
    it("renders in vertical orientation by default", () => {
      render(
        <FormGroup data-testid="form-group">
          <FormField>
            <Input placeholder="Test input" />
          </FormField>
        </FormGroup>
      )

      const container = screen.getByTestId("form-group")
      expect(container).toHaveClass("flex-col")
    })

    it("renders in horizontal orientation", () => {
      render(
        <FormGroup orientation="horizontal" data-testid="form-group">
          <FormField>
            <Input placeholder="Test input" />
          </FormField>
        </FormGroup>
      )

      const container = screen.getByTestId("form-group")
      expect(container).toHaveClass("flex-row", "flex-wrap")
    })
  })

  describe("Spacing", () => {
    it("applies default medium spacing", () => {
      render(
        <FormGroup data-testid="form-group">
          <FormField>
            <Input placeholder="Test input" />
          </FormField>
        </FormGroup>
      )

      const container = screen.getByTestId("form-group")
      expect(container).toHaveClass("gap-4")
    })

    it("applies small spacing", () => {
      render(
        <FormGroup spacing="sm" data-testid="form-group">
          <FormField>
            <Input placeholder="Test input" />
          </FormField>
        </FormGroup>
      )

      const container = screen.getByTestId("form-group")
      expect(container).toHaveClass("gap-2")
    })

    it("applies large spacing", () => {
      render(
        <FormGroup spacing="lg" data-testid="form-group">
          <FormField>
            <Input placeholder="Test input" />
          </FormField>
        </FormGroup>
      )

      const container = screen.getByTestId("form-group")
      expect(container).toHaveClass("gap-6")
    })

    it("applies no spacing", () => {
      render(
        <FormGroup spacing="none" data-testid="form-group">
          <FormField>
            <Input placeholder="Test input" />
          </FormField>
        </FormGroup>
      )

      const container = screen.getByTestId("form-group")
      expect(container).toHaveClass("gap-0")
    })
  })

  describe("Sizes", () => {
    it("applies small size classes", () => {
      render(
        <FormGroup size="sm" data-testid="form-group">
          <FormField>
            <Input placeholder="Test input" />
          </FormField>
        </FormGroup>
      )

      const container = screen.getByTestId("form-group")
      expect(container).toHaveClass("text-sm")
    })

    it("applies large size classes", () => {
      render(
        <FormGroup size="lg" data-testid="form-group">
          <FormField>
            <Input placeholder="Test input" />
          </FormField>
        </FormGroup>
      )

      const container = screen.getByTestId("form-group")
      expect(container).toHaveClass("text-lg")
    })
  })

  describe("Custom Classes", () => {
    it("applies custom className", () => {
      render(
        <FormGroup className="custom-class" data-testid="form-group">
          <FormField>
            <Input placeholder="Test input" />
          </FormField>
        </FormGroup>
      )

      const container = screen.getByTestId("form-group")
      expect(container).toHaveClass("custom-class")
    })
  })

  describe("Title and Description Styling", () => {
    it("applies title styling based on size", () => {
      render(
        <FormGroup title="Small Title" size="sm">
          <FormField>
            <Input placeholder="Test input" />
          </FormField>
        </FormGroup>
      )

      const title = screen.getByText("Small Title")
      expect(title).toHaveClass("font-semibold", "text-stone-900")
    })

    it("styles disabled title correctly", () => {
      render(
        <FormGroup title="Disabled Title" disabled>
          <FormField>
            <Input placeholder="Test input" />
          </FormField>
        </FormGroup>
      )

      const title = screen.getByText("Disabled Title")
      expect(title).toHaveClass("text-stone-500")
    })
  })
})
