import { describe, it, expect, vi } from "vitest"
import { render, screen } from "../../../test/utils"
import userEvent from "@testing-library/user-event"
import { Switch } from "./Switch"

describe("Switch Component", () => {
  describe("Basic Rendering", () => {
    it("renders with default props", () => {
      render(<Switch>Enable notifications</Switch>)

      const switchInput = screen.getByRole("checkbox")
      const label = screen.getByText("Enable notifications")

      expect(switchInput).toBeInTheDocument()
      expect(label).toBeInTheDocument()
      expect(switchInput).not.toBeChecked()
    })

    it("renders without label", () => {
      render(<Switch />)

      const switchInput = screen.getByRole("checkbox")
      expect(switchInput).toBeInTheDocument()
      expect(switchInput).not.toBeChecked()
    })

    it("applies custom className", () => {
      render(<Switch className="custom-class">Test</Switch>)

      // className should be on the outermost container, not the immediate parent of the checkbox
      const container = screen.getByRole("checkbox").closest(".custom-class")
      expect(container).toBeInTheDocument()
    })

    it("generates unique id when not provided", () => {
      const { unmount } = render(<Switch>First</Switch>)
      const firstId = screen.getByRole("checkbox").id
      unmount()

      render(<Switch>Second</Switch>)
      const secondId = screen.getByRole("checkbox").id

      expect(firstId).toBeDefined()
      expect(secondId).toBeDefined()
      expect(firstId).not.toBe(secondId)
    })

    it("uses provided id", () => {
      render(<Switch id="custom-switch">Test</Switch>)

      const switchInput = screen.getByRole("checkbox")
      expect(switchInput).toHaveAttribute("id", "custom-switch")
    })
  })

  describe("Size Variants", () => {
    it("renders small size correctly", () => {
      render(<Switch size="sm">Small switch</Switch>)

      const switchContainer = screen.getByRole("checkbox").nextElementSibling
      expect(switchContainer).toHaveClass("w-8", "h-4")
    })

    it("renders medium size correctly (default)", () => {
      render(<Switch size="md">Medium switch</Switch>)

      const switchContainer = screen.getByRole("checkbox").nextElementSibling
      expect(switchContainer).toHaveClass("w-10", "h-5")
    })

    it("renders large size correctly", () => {
      render(<Switch size="lg">Large switch</Switch>)

      const switchContainer = screen.getByRole("checkbox").nextElementSibling
      expect(switchContainer).toHaveClass("w-12", "h-6")
    })

    it("uses medium size as default", () => {
      render(<Switch>Default size</Switch>)

      const switchContainer = screen.getByRole("checkbox").nextElementSibling
      expect(switchContainer).toHaveClass("w-10", "h-5")
    })
  })

  describe("State Management", () => {
    it("handles checked state", () => {
      render(<Switch defaultChecked>Checked switch</Switch>)

      const switchInput = screen.getByRole("checkbox")
      expect(switchInput).toBeChecked()
    })

    it("handles controlled checked state", () => {
      const { rerender } = render(<Switch checked={false}>Controlled</Switch>)

      const switchInput = screen.getByRole("checkbox")
      expect(switchInput).not.toBeChecked()

      rerender(<Switch checked={true}>Controlled</Switch>)
      expect(switchInput).toBeChecked()
    })

    it("handles disabled state", () => {
      render(<Switch disabled>Disabled switch</Switch>)

      const switchInput = screen.getByRole("checkbox")
      expect(switchInput).toBeDisabled()
    })

    it("handles required state", () => {
      render(<Switch required>Required switch</Switch>)

      const switchInput = screen.getByRole("checkbox")
      const requiredIndicator = screen.getByText("*")

      expect(switchInput).toBeRequired()
      expect(requiredIndicator).toBeInTheDocument()
    })

    it("doesn't show required indicator when disabled", () => {
      render(
        <Switch required disabled>
          Disabled required
        </Switch>
      )

      expect(screen.queryByText("*")).not.toBeInTheDocument()
    })
  })

  describe("Error States", () => {
    it("handles error state", () => {
      render(<Switch error>Error switch</Switch>)

      const switchContainer = screen.getByRole("checkbox").nextElementSibling
      expect(switchContainer).toHaveClass("border-red-300")
    })

    it("displays error message", () => {
      render(
        <Switch errorMessage="This field is required">Error switch</Switch>
      )

      const errorMessage = screen.getByText("This field is required")
      expect(errorMessage).toBeInTheDocument()
      expect(errorMessage).toHaveAttribute("role", "alert")
    })

    it("prioritizes error message over helper text", () => {
      render(
        <Switch helperText="Helper text" errorMessage="Error message" error>
          Switch with both
        </Switch>
      )

      expect(screen.getByText("Error message")).toBeInTheDocument()
      expect(screen.queryByText("Helper text")).not.toBeInTheDocument()
    })

    it("doesn't show error state when disabled", () => {
      render(
        <Switch error disabled>
          Disabled error
        </Switch>
      )

      const switchContainer = screen.getByRole("checkbox").nextElementSibling
      expect(switchContainer).not.toHaveClass("border-red-300")
      expect(switchContainer).toHaveClass("border-stone-200")
    })
  })

  describe("Helper Text", () => {
    it("displays helper text", () => {
      render(<Switch helperText="Toggle to enable feature">Switch</Switch>)

      const helperText = screen.getByText("Toggle to enable feature")
      expect(helperText).toBeInTheDocument()
    })

    it("applies disabled styling to helper text", () => {
      render(
        <Switch disabled helperText="Disabled helper">
          Disabled
        </Switch>
      )

      const helperText = screen.getByText("Disabled helper")
      expect(helperText).toHaveClass("opacity-50")
    })
  })

  describe("User Interactions", () => {
    it("handles click events", async () => {
      const user = userEvent.setup()
      const handleChange = vi.fn()

      render(<Switch onChange={handleChange}>Clickable switch</Switch>)

      const switchInput = screen.getByRole("checkbox")
      await user.click(switchInput)

      expect(handleChange).toHaveBeenCalledTimes(1)
      expect(handleChange).toHaveBeenCalledWith(true, expect.any(Object))
    })

    it("handles label click", async () => {
      const user = userEvent.setup()
      const handleChange = vi.fn()

      render(<Switch onChange={handleChange}>Label click</Switch>)

      const label = screen.getByText("Label click")
      await user.click(label)

      expect(handleChange).toHaveBeenCalledTimes(1)
      expect(handleChange).toHaveBeenCalledWith(true, expect.any(Object))
    })

    it("ignores clicks when disabled", async () => {
      const user = userEvent.setup()
      const handleChange = vi.fn()

      render(
        <Switch disabled onChange={handleChange}>
          Disabled switch
        </Switch>
      )

      const switchInput = screen.getByRole("checkbox")
      await user.click(switchInput)

      expect(handleChange).not.toHaveBeenCalled()
    })

    it("handles focus and blur events", async () => {
      const user = userEvent.setup()
      const handleFocus = vi.fn()
      const handleBlur = vi.fn()

      render(
        <Switch onFocus={handleFocus} onBlur={handleBlur}>
          Focus switch
        </Switch>
      )

      const switchInput = screen.getByRole("checkbox")

      await user.click(switchInput)
      expect(handleFocus).toHaveBeenCalledTimes(1)

      await user.tab()
      expect(handleBlur).toHaveBeenCalledTimes(1)
    })

    it("handles keyboard navigation", async () => {
      const user = userEvent.setup()
      const handleChange = vi.fn()

      render(<Switch onChange={handleChange}>Keyboard switch</Switch>)

      const switchInput = screen.getByRole("checkbox")
      switchInput.focus()

      await user.keyboard(" ")
      expect(handleChange).toHaveBeenCalledWith(true, expect.any(Object))
    })
  })

  describe("Form Attributes", () => {
    it("applies name attribute", () => {
      render(<Switch name="switch-name">Named switch</Switch>)

      const switchInput = screen.getByRole("checkbox")
      expect(switchInput).toHaveAttribute("name", "switch-name")
    })

    it("applies value attribute", () => {
      render(<Switch value="switch-value">Valued switch</Switch>)

      const switchInput = screen.getByRole("checkbox")
      expect(switchInput).toHaveAttribute("value", "switch-value")
    })

    it("forwards additional props to input", () => {
      render(
        <Switch data-testid="custom-switch" aria-describedby="description">
          Custom props
        </Switch>
      )

      const switchInput = screen.getByRole("checkbox")
      expect(switchInput).toHaveAttribute("data-testid", "custom-switch")
      expect(switchInput).toHaveAttribute("aria-describedby", "description")
    })
  })

  describe("Accessibility", () => {
    it("has correct role", () => {
      render(<Switch>Accessible switch</Switch>)

      const switchInput = screen.getByRole("checkbox")
      expect(switchInput).toBeInTheDocument()
    })

    it("associates label with input using implicit labeling", () => {
      render(<Switch>Associated label</Switch>)

      const switchInput = screen.getByRole("checkbox")
      const label = screen.getByText("Associated label")

      expect(switchInput.closest("label")).toContain(label)
    })

    it("announces error messages to screen readers", () => {
      render(
        <Switch errorMessage="Required field" error>
          Error switch
        </Switch>
      )

      const errorMessage = screen.getByRole("alert")
      expect(errorMessage).toHaveTextContent("Required field")
    })

    it("provides focus indicators", () => {
      render(<Switch>Focus switch</Switch>)

      const switchContainer = screen.getByRole("checkbox").nextElementSibling
      expect(switchContainer).toHaveClass("focus-within:ring-2")
    })

    it("hides switch input from screen readers appropriately", () => {
      render(<Switch>Screen reader switch</Switch>)

      const switchInput = screen.getByRole("checkbox")
      expect(switchInput).toHaveClass("sr-only")
    })
  })

  describe("Text Alignment", () => {
    describe("Label Alignment", () => {
      it("applies left alignment by default", () => {
        render(<Switch>Left aligned label</Switch>)

        const label = screen.getByText("Left aligned label")
        expect(label).toHaveClass("text-left")
      })

      it("applies center alignment when labelAlign is center", () => {
        render(<Switch labelAlign="center">Center aligned label</Switch>)

        const label = screen.getByText("Center aligned label")
        expect(label).toHaveClass("text-center")
      })

      it("applies right alignment when labelAlign is right", () => {
        render(<Switch labelAlign="right">Right aligned label</Switch>)

        const label = screen.getByText("Right aligned label")
        expect(label).toHaveClass("text-right")
      })
    })

    describe("Helper Text Alignment", () => {
      it("applies left alignment to helper text by default", () => {
        render(<Switch helperText="Helper text">Label</Switch>)

        const helperText = screen.getByText("Helper text")
        expect(helperText).toHaveClass("text-left")
      })

      it("applies center alignment to helper text when helperAlign is center", () => {
        render(
          <Switch helperText="Center helper" helperAlign="center">
            Label
          </Switch>
        )

        const helperText = screen.getByText("Center helper")
        expect(helperText).toHaveClass("text-center")
      })

      it("applies right alignment to helper text when helperAlign is right", () => {
        render(
          <Switch helperText="Right helper" helperAlign="right">
            Label
          </Switch>
        )

        const helperText = screen.getByText("Right helper")
        expect(helperText).toHaveClass("text-right")
      })

      it("applies alignment to error message text", () => {
        render(
          <Switch errorMessage="Error message" helperAlign="center" error>
            Label
          </Switch>
        )

        const errorMessage = screen.getByText("Error message")
        expect(errorMessage).toHaveClass("text-center")
      })
    })

    describe("Combined Alignments", () => {
      it("can have different alignments for label and helper text", () => {
        render(
          <Switch
            labelAlign="center"
            helperAlign="right"
            helperText="Right helper"
          >
            Center label
          </Switch>
        )

        const label = screen.getByText("Center label")
        const helperText = screen.getByText("Right helper")

        expect(label).toHaveClass("text-center")
        expect(helperText).toHaveClass("text-right")
      })
    })
  })

  describe("Visual State", () => {
    it("shows correct thumb position when unchecked", () => {
      render(<Switch>Unchecked switch</Switch>)

      const thumb = screen
        .getByRole("checkbox")
        .nextElementSibling?.querySelector("div")
      expect(thumb).toHaveClass("left-0.5")
    })

    it("shows correct thumb position when checked", () => {
      render(<Switch defaultChecked>Checked switch</Switch>)

      const thumb = screen
        .getByRole("checkbox")
        .nextElementSibling?.querySelector("div")
      expect(thumb).toHaveClass("left-5") // for medium size
    })

    it("applies correct thumb size for different switch sizes", () => {
      const { rerender } = render(<Switch size="sm">Small</Switch>)
      let thumb = screen
        .getByRole("checkbox")
        .nextElementSibling?.querySelector("div")
      expect(thumb).toHaveClass("w-3", "h-3")

      rerender(<Switch size="lg">Large</Switch>)
      thumb = screen
        .getByRole("checkbox")
        .nextElementSibling?.querySelector("div")
      expect(thumb).toHaveClass("w-5", "h-5")
    })
  })
})
