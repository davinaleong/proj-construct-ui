import { describe, it, expect, vi } from "vitest"
import { render, screen } from "../../../test/utils"
import userEvent from "@testing-library/user-event"
import { Radio } from "./Radio"

describe("Radio Component", () => {
  describe("Basic Rendering", () => {
    it("renders with default props", () => {
      render(<Radio>Accept terms</Radio>)

      const radio = screen.getByRole("radio")
      const label = screen.getByText("Accept terms")

      expect(radio).toBeInTheDocument()
      expect(label).toBeInTheDocument()
      expect(radio).not.toBeChecked()
    })

    it("renders without label", () => {
      render(<Radio />)

      const radio = screen.getByRole("radio")
      expect(radio).toBeInTheDocument()
    })

    it("applies custom className", () => {
      render(<Radio className="custom-class">Test</Radio>)

      const radioContainer = screen.getByText("Test").closest("div")
      expect(radioContainer).toHaveClass("custom-class")
    })

    it("generates unique id when not provided", () => {
      render(
        <>
          <Radio>First</Radio>
          <Radio>Second</Radio>
        </>
      )

      const radios = screen.getAllByRole("radio")
      expect(radios[0]).toHaveAttribute("id")
      expect(radios[1]).toHaveAttribute("id")
      expect(radios[0].id).not.toBe(radios[1].id)
    })

    it("uses provided id", () => {
      render(<Radio id="custom-id">Test</Radio>)

      const radio = screen.getByRole("radio")
      expect(radio).toHaveAttribute("id", "custom-id")
    })
  })

  describe("Size Variants", () => {
    it("renders small size correctly", () => {
      render(<Radio size="sm">Small</Radio>)

      const radioContainer = screen.getByRole("radio").parentElement
      expect(radioContainer).toHaveClass("w-4", "h-4")
    })

    it("renders medium size correctly (default)", () => {
      render(<Radio size="md">Medium</Radio>)

      const radioContainer = screen.getByRole("radio").parentElement
      expect(radioContainer).toHaveClass("w-5", "h-5")
    })

    it("renders large size correctly", () => {
      render(<Radio size="lg">Large</Radio>)

      const radioContainer = screen.getByRole("radio").parentElement
      expect(radioContainer).toHaveClass("w-6", "h-6")
    })

    it("uses medium size as default", () => {
      render(<Radio>Default</Radio>)

      const radioContainer = screen.getByRole("radio").parentElement
      expect(radioContainer).toHaveClass("w-5", "h-5")
    })
  })

  describe("State Management", () => {
    it("handles checked state", () => {
      render(<Radio defaultChecked>Checked</Radio>)

      const radio = screen.getByRole("radio")
      expect(radio).toBeChecked()
    })

    it("handles controlled checked state", () => {
      const { rerender } = render(<Radio checked={false}>Controlled</Radio>)

      const radio = screen.getByRole("radio")
      expect(radio).not.toBeChecked()

      rerender(<Radio checked={true}>Controlled</Radio>)
      expect(radio).toBeChecked()
    })

    it("handles disabled state", () => {
      render(<Radio disabled>Disabled</Radio>)

      const radio = screen.getByRole("radio")
      const label = screen.getByText("Disabled")

      expect(radio).toBeDisabled()
      expect(label).toHaveClass("opacity-50", "cursor-not-allowed")
    })

    it("handles required state", () => {
      render(<Radio required>Required</Radio>)

      const radio = screen.getByRole("radio")
      const requiredIndicator = screen.getByLabelText("required")

      expect(radio).toBeRequired()
      expect(requiredIndicator).toHaveTextContent("*")
    })

    it("doesn't show required indicator when disabled", () => {
      render(
        <Radio required disabled>
          Required Disabled
        </Radio>
      )

      expect(screen.queryByLabelText("required")).not.toBeInTheDocument()
    })
  })

  describe("Error States", () => {
    it("handles error state", () => {
      render(<Radio error>Error</Radio>)

      const radioContainer = screen.getByRole("radio").parentElement
      const label = screen.getByText("Error")

      expect(radioContainer).toHaveClass("border-red-600")
      expect(label).toHaveClass("text-red-700")
    })

    it("displays error message", () => {
      render(
        <Radio error errorMessage="This field is required">
          Error
        </Radio>
      )

      const errorMessage = screen.getByRole("alert")
      expect(errorMessage).toHaveTextContent("This field is required")
      expect(errorMessage).toHaveClass("text-red-600")
    })

    it("prioritizes error message over helper text", () => {
      render(
        <Radio error helperText="Helper text" errorMessage="Error message">
          Test
        </Radio>
      )

      expect(screen.getByRole("alert")).toHaveTextContent("Error message")
      expect(screen.queryByText("Helper text")).not.toBeInTheDocument()
    })

    it("doesn't show error state when disabled", () => {
      render(
        <Radio error disabled errorMessage="Error">
          Disabled Error
        </Radio>
      )

      const radioContainer = screen.getByRole("radio").parentElement
      expect(radioContainer).not.toHaveClass("border-red-600")
      expect(screen.queryByRole("alert")).not.toBeInTheDocument()
    })
  })

  describe("Helper Text", () => {
    it("displays helper text", () => {
      render(<Radio helperText="This is helper text">Test</Radio>)

      const helperText = screen.getByText("This is helper text")
      expect(helperText).toBeInTheDocument()
      expect(helperText).toHaveClass("text-stone-600")
    })

    it("applies disabled styling to helper text", () => {
      render(
        <Radio disabled helperText="Disabled helper">
          Test
        </Radio>
      )

      const helperText = screen.getByText("Disabled helper")
      expect(helperText).toHaveClass("opacity-50")
    })
  })

  describe("User Interactions", () => {
    it("handles click events", async () => {
      const user = userEvent.setup()
      const handleChange = vi.fn()

      render(<Radio onChange={handleChange}>Clickable</Radio>)

      const radio = screen.getByRole("radio")
      await user.click(radio)

      expect(handleChange).toHaveBeenCalledTimes(1)
      expect(handleChange).toHaveBeenCalledWith(true, expect.any(Object))
    })

    it("handles label click", async () => {
      const user = userEvent.setup()
      const handleChange = vi.fn()

      render(<Radio onChange={handleChange}>Click Label</Radio>)

      const label = screen.getByText("Click Label")
      await user.click(label)

      expect(handleChange).toHaveBeenCalledTimes(1)
    })

    it("ignores clicks when disabled", async () => {
      const user = userEvent.setup()
      const handleChange = vi.fn()

      render(
        <Radio disabled onChange={handleChange}>
          Disabled
        </Radio>
      )

      const radio = screen.getByRole("radio")
      await user.click(radio)

      expect(handleChange).not.toHaveBeenCalled()
    })

    it("handles focus and blur events", async () => {
      const user = userEvent.setup()
      const handleFocus = vi.fn()
      const handleBlur = vi.fn()

      render(
        <Radio onFocus={handleFocus} onBlur={handleBlur}>
          Focus Test
        </Radio>
      )

      const radio = screen.getByRole("radio")

      await user.click(radio)
      expect(handleFocus).toHaveBeenCalledTimes(1)

      await user.tab()
      expect(handleBlur).toHaveBeenCalledTimes(1)
    })

    it("handles keyboard navigation", async () => {
      const user = userEvent.setup()

      render(<Radio>Keyboard</Radio>)

      const radio = screen.getByRole("radio")

      await user.tab()
      expect(radio).toHaveFocus()

      await user.keyboard(" ")
      expect(radio).toBeChecked()
    })
  })

  describe("Form Attributes", () => {
    it("applies name attribute", () => {
      render(<Radio name="test-group">Named</Radio>)

      const radio = screen.getByRole("radio")
      expect(radio).toHaveAttribute("name", "test-group")
    })

    it("applies value attribute", () => {
      render(<Radio value="test-value">Valued</Radio>)

      const radio = screen.getByRole("radio")
      expect(radio).toHaveAttribute("value", "test-value")
    })

    it("forwards additional props to input", () => {
      render(<Radio data-testid="custom-radio">Test</Radio>)

      const radio = screen.getByTestId("custom-radio")
      expect(radio).toBeInTheDocument()
    })
  })

  describe("Accessibility", () => {
    it("has correct role", () => {
      render(<Radio>Accessible</Radio>)

      const radio = screen.getByRole("radio")
      expect(radio).toBeInTheDocument()
    })

    it("associates label with input using implicit labeling", () => {
      render(<Radio>Associated Label</Radio>)

      const radio = screen.getByRole("radio")
      const label = screen.getByText("Associated Label")

      // With implicit labeling, the input is inside the label
      expect(label.closest("label")).toContainElement(radio)
    })

    it("announces error messages to screen readers", () => {
      render(
        <Radio error errorMessage="Required field">
          Error
        </Radio>
      )

      const errorMessage = screen.getByRole("alert")
      expect(errorMessage).toBeInTheDocument()
    })

    it("provides focus indicators", () => {
      render(<Radio>Focus Test</Radio>)

      const radioContainer = screen.getByRole("radio").parentElement
      expect(radioContainer).toHaveClass("focus-within:ring-2")
    })

    it("hides radio input from screen readers appropriately", () => {
      render(<Radio>Screen Reader</Radio>)

      const radio = screen.getByRole("radio")
      expect(radio).toHaveClass("sr-only")
    })
  })

  describe("Visual Indicator", () => {
    it("shows indicator when checked", () => {
      render(<Radio checked>Checked</Radio>)

      const indicator = screen.getByRole("radio").nextElementSibling
      expect(indicator).toHaveClass("scale-100")
    })

    it("hides indicator when unchecked", () => {
      render(<Radio checked={false}>Unchecked</Radio>)

      const indicator = screen.getByRole("radio").nextElementSibling
      expect(indicator).toHaveClass("scale-0")
    })

    it("applies disabled styling to indicator", () => {
      render(
        <Radio checked disabled>
          Disabled Checked
        </Radio>
      )

      const indicator = screen.getByRole("radio").nextElementSibling
      expect(indicator).toHaveClass("bg-stone-300")
    })
  })

  describe("Text Alignment", () => {
    describe("Label Alignment", () => {
      it("applies left alignment by default", () => {
        render(<Radio>Left aligned label</Radio>)

        const label = screen.getByText("Left aligned label")
        expect(label).toHaveClass("text-left")
      })

      it("applies center alignment when labelAlign is center", () => {
        render(<Radio labelAlign="center">Center aligned label</Radio>)

        const label = screen.getByText("Center aligned label")
        expect(label).toHaveClass("text-center")
      })

      it("applies right alignment when labelAlign is right", () => {
        render(<Radio labelAlign="right">Right aligned label</Radio>)

        const label = screen.getByText("Right aligned label")
        expect(label).toHaveClass("text-right")
      })
    })

    describe("Helper Text Alignment", () => {
      it("applies left alignment to helper text by default", () => {
        render(<Radio helperText="Helper text">Label</Radio>)

        const helperText = screen.getByText("Helper text")
        expect(helperText).toHaveClass("text-left")
      })

      it("applies center alignment to helper text when helperAlign is center", () => {
        render(
          <Radio helperText="Center helper" helperAlign="center">
            Label
          </Radio>
        )

        const helperText = screen.getByText("Center helper")
        expect(helperText).toHaveClass("text-center")
      })

      it("applies right alignment to helper text when helperAlign is right", () => {
        render(
          <Radio helperText="Right helper" helperAlign="right">
            Label
          </Radio>
        )

        const helperText = screen.getByText("Right helper")
        expect(helperText).toHaveClass("text-right")
      })

      it("applies alignment to error message text", () => {
        render(
          <Radio errorMessage="Error message" helperAlign="center" error>
            Label
          </Radio>
        )

        const errorMessage = screen.getByText("Error message")
        expect(errorMessage).toHaveClass("text-center")
      })
    })

    describe("Combined Alignments", () => {
      it("can have different alignments for label and helper text", () => {
        render(
          <Radio
            labelAlign="center"
            helperAlign="right"
            helperText="Right helper"
          >
            Center label
          </Radio>
        )

        const label = screen.getByText("Center label")
        const helperText = screen.getByText("Right helper")

        expect(label).toHaveClass("text-center")
        expect(helperText).toHaveClass("text-right")
      })
    })
  })
})
