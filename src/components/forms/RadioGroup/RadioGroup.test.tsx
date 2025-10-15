import { describe, it, expect, vi } from "vitest"
import { render, screen } from "../../../test/utils"
import userEvent from "@testing-library/user-event"
import { RadioGroup } from "./RadioGroup"
import type { RadioOption } from "./types"

const mockOptions: RadioOption[] = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
]

const mockOptionsWithHelpers: RadioOption[] = [
  { value: "basic", label: "Basic Plan", helperText: "For individual use" },
  { value: "pro", label: "Pro Plan", helperText: "For small teams" },
  {
    value: "enterprise",
    label: "Enterprise",
    helperText: "For large organizations",
  },
]

const mockOptionsWithDisabled: RadioOption[] = [
  { value: "available", label: "Available Option" },
  { value: "disabled", label: "Disabled Option", disabled: true },
  { value: "available2", label: "Another Available Option" },
]

describe("RadioGroup Component", () => {
  describe("Basic Rendering", () => {
    it("renders with default props", () => {
      render(<RadioGroup name="test" options={mockOptions} />)

      const group = screen.getByRole("radiogroup")
      const radios = screen.getAllByRole("radio")

      expect(group).toBeInTheDocument()
      expect(radios).toHaveLength(3)
      expect(radios[0]).toHaveAttribute("name", "test")
      expect(radios[1]).toHaveAttribute("name", "test")
      expect(radios[2]).toHaveAttribute("name", "test")
    })

    it("renders with group label", () => {
      render(
        <RadioGroup
          name="test"
          options={mockOptions}
          label="Choose an option"
        />
      )

      const label = screen.getByText("Choose an option")
      expect(label).toBeInTheDocument()
      expect(label.tagName).toBe("LEGEND")
    })

    it("applies custom className", () => {
      render(
        <RadioGroup
          name="test"
          options={mockOptions}
          className="custom-class"
        />
      )

      const fieldset = screen.getByRole("radiogroup").closest("fieldset")
      expect(fieldset).toHaveClass("custom-class")
    })

    it("uses provided id", () => {
      render(<RadioGroup name="test" options={mockOptions} id="custom-id" />)

      const fieldset = screen.getByRole("radiogroup").closest("fieldset")
      expect(fieldset).toHaveAttribute("id", "custom-id")
    })

    it("generates unique id when not provided", () => {
      render(
        <>
          <RadioGroup name="test1" options={mockOptions} />
          <RadioGroup name="test2" options={mockOptions} />
        </>
      )

      const fieldsets = screen
        .getAllByRole("radiogroup")
        .map((group) => group.closest("fieldset"))

      expect(fieldsets[0]).toHaveAttribute("id")
      expect(fieldsets[1]).toHaveAttribute("id")
      expect(fieldsets[0]?.id).not.toBe(fieldsets[1]?.id)
    })
  })

  describe("Orientation", () => {
    it("renders vertical orientation by default", () => {
      render(<RadioGroup name="test" options={mockOptions} />)

      const container = screen.getByRole("radiogroup")
      expect(container).toHaveClass("flex", "flex-col", "gap-2")
    })

    it("renders horizontal orientation", () => {
      render(
        <RadioGroup
          name="test"
          options={mockOptions}
          orientation="horizontal"
        />
      )

      const container = screen.getByRole("radiogroup")
      expect(container).toHaveClass("flex", "flex-wrap", "gap-4")
    })
  })

  describe("Size Variants", () => {
    it("applies size to all radio buttons", () => {
      render(<RadioGroup name="test" options={mockOptions} size="lg" />)

      const radios = screen.getAllByRole("radio")
      radios.forEach((radio) => {
        const container = radio.parentElement
        expect(container).toHaveClass("w-6", "h-6")
      })
    })

    it("uses medium size as default", () => {
      render(<RadioGroup name="test" options={mockOptions} />)

      const radios = screen.getAllByRole("radio")
      radios.forEach((radio) => {
        const container = radio.parentElement
        expect(container).toHaveClass("w-5", "h-5")
      })
    })
  })

  describe("State Management", () => {
    it("handles default value", () => {
      render(
        <RadioGroup name="test" options={mockOptions} defaultValue="option2" />
      )

      const radios = screen.getAllByRole("radio")
      expect(radios[0]).not.toBeChecked()
      expect(radios[1]).toBeChecked()
      expect(radios[2]).not.toBeChecked()
    })

    it("handles controlled value", () => {
      const { rerender } = render(
        <RadioGroup name="test" options={mockOptions} value="option1" />
      )

      let radios = screen.getAllByRole("radio")
      expect(radios[0]).toBeChecked()
      expect(radios[1]).not.toBeChecked()
      expect(radios[2]).not.toBeChecked()

      rerender(<RadioGroup name="test" options={mockOptions} value="option3" />)

      radios = screen.getAllByRole("radio")
      expect(radios[0]).not.toBeChecked()
      expect(radios[1]).not.toBeChecked()
      expect(radios[2]).toBeChecked()
    })

    it("handles disabled state for entire group", () => {
      render(<RadioGroup name="test" options={mockOptions} disabled />)

      const fieldset = screen.getByRole("radiogroup").closest("fieldset")
      const radios = screen.getAllByRole("radio")

      expect(fieldset).toBeDisabled()
      radios.forEach((radio) => {
        expect(radio).toBeDisabled()
      })
    })

    it("handles individually disabled options", () => {
      render(<RadioGroup name="test" options={mockOptionsWithDisabled} />)

      const radios = screen.getAllByRole("radio")
      expect(radios[0]).not.toBeDisabled()
      expect(radios[1]).toBeDisabled()
      expect(radios[2]).not.toBeDisabled()
    })

    it("handles required state", () => {
      render(
        <RadioGroup
          name="test"
          options={mockOptions}
          label="Required Group"
          required
        />
      )

      const requiredIndicator = screen.getByLabelText("required")
      expect(requiredIndicator).toHaveTextContent("*")
    })

    it("doesn't show required indicator when disabled", () => {
      render(
        <RadioGroup
          name="test"
          options={mockOptions}
          label="Disabled Required"
          required
          disabled
        />
      )

      expect(screen.queryByLabelText("required")).not.toBeInTheDocument()
    })
  })

  describe("Error States", () => {
    it("handles error state", () => {
      render(
        <RadioGroup
          name="test"
          options={mockOptions}
          label="Error Group"
          error
        />
      )

      const label = screen.getByText("Error Group")
      expect(label).toHaveClass("text-red-700")

      const radios = screen.getAllByRole("radio")
      radios.forEach((radio) => {
        const container = radio.parentElement
        expect(container).toHaveClass("border-red-600")
      })
    })

    it("displays error message", () => {
      render(
        <RadioGroup
          name="test"
          options={mockOptions}
          error
          errorMessage="Please select an option"
        />
      )

      const errorMessage = screen.getByRole("alert")
      expect(errorMessage).toHaveTextContent("Please select an option")
      expect(errorMessage).toHaveClass("text-red-600")
    })

    it("prioritizes error message over helper text", () => {
      render(
        <RadioGroup
          name="test"
          options={mockOptions}
          error
          helperText="Helper text"
          errorMessage="Error message"
        />
      )

      expect(screen.getByRole("alert")).toHaveTextContent("Error message")
      expect(screen.queryByText("Helper text")).not.toBeInTheDocument()
    })

    it("doesn't show error state when disabled", () => {
      render(
        <RadioGroup
          name="test"
          options={mockOptions}
          label="Disabled Error"
          error
          disabled
          errorMessage="Error"
        />
      )

      const label = screen.getByText("Disabled Error")
      expect(label).not.toHaveClass("text-red-700")
      expect(screen.queryByRole("alert")).not.toBeInTheDocument()
    })
  })

  describe("Helper Text", () => {
    it("displays group helper text", () => {
      render(
        <RadioGroup
          name="test"
          options={mockOptions}
          helperText="Choose one option"
        />
      )

      const helperText = screen.getByText("Choose one option")
      expect(helperText).toBeInTheDocument()
      expect(helperText).toHaveClass("text-stone-600")
    })

    it("displays individual option helper text", () => {
      render(<RadioGroup name="test" options={mockOptionsWithHelpers} />)

      expect(screen.getByText("For individual use")).toBeInTheDocument()
      expect(screen.getByText("For small teams")).toBeInTheDocument()
      expect(screen.getByText("For large organizations")).toBeInTheDocument()
    })

    it("applies disabled styling to helper text", () => {
      render(
        <RadioGroup
          name="test"
          options={mockOptions}
          helperText="Disabled helper"
          disabled
        />
      )

      const helperText = screen.getByText("Disabled helper")
      expect(helperText).toHaveClass("opacity-50")
    })
  })

  describe("User Interactions", () => {
    it("handles uncontrolled selection", async () => {
      const user = userEvent.setup()
      const handleChange = vi.fn()

      render(
        <RadioGroup name="test" options={mockOptions} onChange={handleChange} />
      )

      const radios = screen.getAllByRole("radio")

      await user.click(radios[1])

      expect(handleChange).toHaveBeenCalledTimes(1)
      expect(handleChange).toHaveBeenCalledWith("option2", expect.any(Object))
      expect(radios[1]).toBeChecked()
    })

    it("handles controlled selection", async () => {
      const user = userEvent.setup()
      const handleChange = vi.fn()

      render(
        <RadioGroup
          name="test"
          options={mockOptions}
          value="option1"
          onChange={handleChange}
        />
      )

      const radios = screen.getAllByRole("radio")

      await user.click(radios[2])

      expect(handleChange).toHaveBeenCalledTimes(1)
      expect(handleChange).toHaveBeenCalledWith("option3", expect.any(Object))
      // In controlled mode, the component doesn't change state automatically
      expect(radios[0]).toBeChecked() // Still the controlled value
    })

    it("allows changing selection in uncontrolled mode", async () => {
      const user = userEvent.setup()

      render(
        <RadioGroup name="test" options={mockOptions} defaultValue="option1" />
      )

      const radios = screen.getAllByRole("radio")

      expect(radios[0]).toBeChecked()

      await user.click(radios[2])

      expect(radios[0]).not.toBeChecked()
      expect(radios[2]).toBeChecked()
    })

    it("ignores clicks on disabled options", async () => {
      const user = userEvent.setup()
      const handleChange = vi.fn()

      render(
        <RadioGroup
          name="test"
          options={mockOptionsWithDisabled}
          onChange={handleChange}
        />
      )

      const disabledRadio = screen.getAllByRole("radio")[1]

      await user.click(disabledRadio)

      expect(handleChange).not.toHaveBeenCalled()
      expect(disabledRadio).not.toBeChecked()
    })

    it("ignores clicks when entire group is disabled", async () => {
      const user = userEvent.setup()
      const handleChange = vi.fn()

      render(
        <RadioGroup
          name="test"
          options={mockOptions}
          disabled
          onChange={handleChange}
        />
      )

      const radios = screen.getAllByRole("radio")

      await user.click(radios[0])

      expect(handleChange).not.toHaveBeenCalled()
      expect(radios[0]).not.toBeChecked()
    })

    it("handles focus and blur events", async () => {
      const user = userEvent.setup()
      const handleFocus = vi.fn()
      const handleBlur = vi.fn()

      render(
        <RadioGroup
          name="test"
          options={mockOptions}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      )

      const radio = screen.getAllByRole("radio")[0]

      await user.click(radio)
      expect(handleFocus).toHaveBeenCalledTimes(1)

      await user.tab()
      expect(handleBlur).toHaveBeenCalledTimes(1)
    })

    it("handles keyboard navigation between options", async () => {
      const user = userEvent.setup()

      render(
        <RadioGroup name="test" options={mockOptions} defaultValue="option1" />
      )

      const radios = screen.getAllByRole("radio")

      // Focus first radio and navigate with arrow keys
      await user.click(radios[0])
      expect(radios[0]).toHaveFocus()

      await user.keyboard("{ArrowDown}")
      expect(radios[1]).toHaveFocus()
      expect(radios[1]).toBeChecked()

      await user.keyboard("{ArrowDown}")
      expect(radios[2]).toHaveFocus()
      expect(radios[2]).toBeChecked()
    })
  })

  describe("Accessibility", () => {
    it("has correct radiogroup role", () => {
      render(<RadioGroup name="test" options={mockOptions} />)

      const group = screen.getByRole("radiogroup")
      expect(group).toBeInTheDocument()
    })

    it("uses fieldset and legend for grouping", () => {
      render(
        <RadioGroup
          name="test"
          options={mockOptions}
          label="Accessible Group"
        />
      )

      const fieldset = screen.getByRole("radiogroup").closest("fieldset")
      const legend = screen.getByText("Accessible Group")

      expect(fieldset).toBeInTheDocument()
      expect(legend.tagName).toBe("LEGEND")
    })

    it("associates radio buttons with the same name", () => {
      render(<RadioGroup name="test-group" options={mockOptions} />)

      const radios = screen.getAllByRole("radio")
      radios.forEach((radio) => {
        expect(radio).toHaveAttribute("name", "test-group")
      })
    })

    it("provides unique values for each option", () => {
      render(<RadioGroup name="test" options={mockOptions} />)

      const radios = screen.getAllByRole("radio")
      expect(radios[0]).toHaveAttribute("value", "option1")
      expect(radios[1]).toHaveAttribute("value", "option2")
      expect(radios[2]).toHaveAttribute("value", "option3")
    })

    it("announces error messages to screen readers", () => {
      render(
        <RadioGroup
          name="test"
          options={mockOptions}
          error
          errorMessage="Selection required"
        />
      )

      const errorMessage = screen.getByRole("alert")
      expect(errorMessage).toBeInTheDocument()
    })

    it("supports keyboard navigation", async () => {
      const user = userEvent.setup()

      render(<RadioGroup name="test" options={mockOptions} />)

      // Tab into the group
      await user.tab()

      const radios = screen.getAllByRole("radio")
      expect(radios[0]).toHaveFocus()
    })

    it("maintains proper focus management", async () => {
      const user = userEvent.setup()

      render(
        <RadioGroup name="test" options={mockOptions} defaultValue="option2" />
      )

      // When tabbing into a radio group, focus should go to the checked radio
      await user.tab()

      const radios = screen.getAllByRole("radio")
      expect(radios[1]).toHaveFocus() // The checked radio
    })
  })

  describe("Form Integration", () => {
    it("forwards additional props to fieldset", () => {
      render(
        <RadioGroup
          name="test"
          options={mockOptions}
          data-testid="custom-group"
        />
      )

      const fieldset = screen.getByTestId("custom-group")
      expect(fieldset).toBeInTheDocument()
    })

    it("works with form submission", () => {
      render(
        <form data-testid="test-form">
          <RadioGroup
            name="choice"
            options={mockOptions}
            defaultValue="option2"
          />
        </form>
      )

      const form = screen.getByTestId("test-form")
      const formData = new FormData(form as HTMLFormElement)

      expect(formData.get("choice")).toBe("option2")
    })
  })

  describe("Text Alignment", () => {
    describe("Label Alignment", () => {
      it("applies left alignment to all radio labels by default", () => {
        render(<RadioGroup name="test" options={mockOptions} />)

        const labels = screen
          .getAllByRole("radio")
          .map((radio) => radio.closest("label")?.querySelector("span"))

        labels.forEach((label) => {
          expect(label).toHaveClass("text-left")
        })
      })

      it("applies center alignment to all radio labels when labelAlign is center", () => {
        render(
          <RadioGroup name="test" options={mockOptions} labelAlign="center" />
        )

        const labels = screen
          .getAllByRole("radio")
          .map((radio) => radio.closest("label")?.querySelector("span"))

        labels.forEach((label) => {
          expect(label).toHaveClass("text-center")
        })
      })

      it("applies right alignment to all radio labels when labelAlign is right", () => {
        render(
          <RadioGroup name="test" options={mockOptions} labelAlign="right" />
        )

        const labels = screen
          .getAllByRole("radio")
          .map((radio) => radio.closest("label")?.querySelector("span"))

        labels.forEach((label) => {
          expect(label).toHaveClass("text-right")
        })
      })
    })

    describe("Helper Text Alignment", () => {
      it("applies left alignment to group helper text by default", () => {
        render(
          <RadioGroup
            name="test"
            options={mockOptions}
            helperText="Choose one option"
          />
        )

        const helperText = screen.getByText("Choose one option")
        expect(helperText).toHaveClass("text-left")
      })

      it("applies center alignment to group helper text when helperAlign is center", () => {
        render(
          <RadioGroup
            name="test"
            options={mockOptions}
            helperText="Choose one option"
            helperAlign="center"
          />
        )

        const helperText = screen.getByText("Choose one option")
        expect(helperText).toHaveClass("text-center")
      })

      it("applies right alignment to group helper text when helperAlign is right", () => {
        render(
          <RadioGroup
            name="test"
            options={mockOptions}
            helperText="Choose one option"
            helperAlign="right"
          />
        )

        const helperText = screen.getByText("Choose one option")
        expect(helperText).toHaveClass("text-right")
      })

      it("applies alignment to group error message", () => {
        render(
          <RadioGroup
            name="test"
            options={mockOptions}
            errorMessage="Selection required"
            helperAlign="center"
            error
          />
        )

        const errorMessage = screen.getByText("Selection required")
        expect(errorMessage).toHaveClass("text-center")
      })

      it("applies alignment to individual radio helper text", () => {
        render(
          <RadioGroup
            name="test"
            options={mockOptionsWithHelpers}
            helperAlign="center"
          />
        )

        const individualHelpers = [
          screen.getByText("For individual use"),
          screen.getByText("For small teams"),
          screen.getByText("For large organizations"),
        ]

        individualHelpers.forEach((helper) => {
          expect(helper).toHaveClass("text-center")
        })
      })
    })

    describe("Combined Alignments", () => {
      it("can have different alignments for labels and helper text", () => {
        render(
          <RadioGroup
            name="test"
            options={mockOptionsWithHelpers}
            labelAlign="center"
            helperAlign="right"
            helperText="Group helper text"
          />
        )

        // Check label alignment
        const labels = screen
          .getAllByRole("radio")
          .map((radio) => radio.closest("label")?.querySelector("span"))

        labels.forEach((label) => {
          expect(label).toHaveClass("text-center")
        })

        // Check group helper text alignment
        const groupHelper = screen.getByText("Group helper text")
        expect(groupHelper).toHaveClass("text-right")

        // Check individual helper text alignment
        const individualHelpers = [
          screen.getByText("For individual use"),
          screen.getByText("For small teams"),
          screen.getByText("For large organizations"),
        ]

        individualHelpers.forEach((helper) => {
          expect(helper).toHaveClass("text-right")
        })
      })
    })
  })
})
