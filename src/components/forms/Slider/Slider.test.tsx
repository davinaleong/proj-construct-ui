import { describe, it, expect, vi } from "vitest"
import { render, screen } from "../../../test/utils"
import userEvent from "@testing-library/user-event"
import { Slider } from "./Slider"

describe("Slider Component", () => {
  describe("Basic Rendering", () => {
    it("renders with default props", () => {
      render(<Slider>Volume</Slider>)

      const slider = screen.getByRole("slider")
      const label = screen.getByText("Volume")

      expect(slider).toBeInTheDocument()
      expect(label).toBeInTheDocument()
      expect(slider).toHaveValue("0")
    })

    it("renders without label", () => {
      render(<Slider />)

      const slider = screen.getByRole("slider")
      expect(slider).toBeInTheDocument()
      expect(slider).toHaveValue("0")
    })

    it("applies custom className", () => {
      render(<Slider className="custom-class">Test</Slider>)

      const container = screen.getByRole("slider").closest("div")
      expect(container).toHaveClass("custom-class")
    })

    it("generates unique id when not provided", () => {
      const { rerender } = render(<Slider>First</Slider>)
      const firstId = screen.getByRole("slider").id

      rerender(<Slider>Second</Slider>)
      const secondId = screen.getByRole("slider").id

      expect(firstId).toBeDefined()
      expect(secondId).toBeDefined()
      expect(firstId).not.toBe(secondId)
    })

    it("uses provided id", () => {
      render(<Slider id="custom-slider">Test</Slider>)

      const slider = screen.getByRole("slider")
      expect(slider).toHaveAttribute("id", "custom-slider")
    })
  })

  describe("Size Variants", () => {
    it("renders small size correctly", () => {
      render(<Slider size="sm">Small slider</Slider>)

      const slider = screen.getByRole("slider")
      expect(slider).toHaveClass("h-1")
    })

    it("renders medium size correctly (default)", () => {
      render(<Slider size="md">Medium slider</Slider>)

      const slider = screen.getByRole("slider")
      expect(slider).toHaveClass("h-2")
    })

    it("renders large size correctly", () => {
      render(<Slider size="lg">Large slider</Slider>)

      const slider = screen.getByRole("slider")
      expect(slider).toHaveClass("h-3")
    })

    it("uses medium size as default", () => {
      render(<Slider>Default size</Slider>)

      const slider = screen.getByRole("slider")
      expect(slider).toHaveClass("h-2")
    })
  })

  describe("Orientation", () => {
    it("renders horizontal orientation by default", () => {
      render(<Slider>Horizontal slider</Slider>)

      const slider = screen.getByRole("slider")
      expect(slider).toHaveClass("h-2") // horizontal sizing
      expect(slider).not.toHaveClass("w-2") // not vertical sizing
    })

    it("renders vertical orientation", () => {
      render(<Slider orientation="vertical">Vertical slider</Slider>)

      const slider = screen.getByRole("slider")
      expect(slider).toHaveClass("w-2", "h-40") // vertical sizing
    })
  })

  describe("Value Management", () => {
    it("handles default value", () => {
      render(<Slider defaultValue={25}>Default value</Slider>)

      const slider = screen.getByRole("slider")
      expect(slider).toHaveValue("25")
    })

    it("handles controlled value", () => {
      const { rerender } = render(<Slider value={30}>Controlled</Slider>)

      const slider = screen.getByRole("slider")
      expect(slider).toHaveValue("30")

      rerender(<Slider value={60}>Controlled</Slider>)
      expect(slider).toHaveValue("60")
    })

    it("handles min and max values", () => {
      render(
        <Slider min={10} max={90} defaultValue={50}>
          Range slider
        </Slider>
      )

      const slider = screen.getByRole("slider")
      expect(slider).toHaveAttribute("min", "10")
      expect(slider).toHaveAttribute("max", "90")
      expect(slider).toHaveValue("50")
    })

    it("handles step value", () => {
      render(
        <Slider step={5} defaultValue={15}>
          Step slider
        </Slider>
      )

      const slider = screen.getByRole("slider")
      expect(slider).toHaveAttribute("step", "5")
      expect(slider).toHaveValue("15")
    })
  })

  describe("State Management", () => {
    it("handles disabled state", () => {
      render(<Slider disabled>Disabled slider</Slider>)

      const slider = screen.getByRole("slider")
      expect(slider).toBeDisabled()
    })

    it("handles required state", () => {
      render(<Slider required>Required slider</Slider>)

      const slider = screen.getByRole("slider")
      const requiredIndicator = screen.getByText("*")

      expect(slider).toBeRequired()
      expect(requiredIndicator).toBeInTheDocument()
    })

    it("doesn't show required indicator when disabled", () => {
      render(
        <Slider required disabled>
          Disabled required
        </Slider>
      )

      expect(screen.queryByText("*")).not.toBeInTheDocument()
    })
  })

  describe("Error States", () => {
    it("handles error state", () => {
      render(<Slider error>Error slider</Slider>)

      const slider = screen.getByRole("slider")
      expect(slider).toHaveClass("focus:ring-red-400")
    })

    it("displays error message", () => {
      render(<Slider errorMessage="Value out of range">Error slider</Slider>)

      const errorMessage = screen.getByText("Value out of range")
      expect(errorMessage).toBeInTheDocument()
      expect(errorMessage).toHaveAttribute("role", "alert")
    })

    it("prioritizes error message over helper text", () => {
      render(
        <Slider helperText="Helper text" errorMessage="Error message" error>
          Slider with both
        </Slider>
      )

      expect(screen.getByText("Error message")).toBeInTheDocument()
      expect(screen.queryByText("Helper text")).not.toBeInTheDocument()
    })

    it("doesn't show error state when disabled", () => {
      render(
        <Slider error disabled>
          Disabled error
        </Slider>
      )

      const slider = screen.getByRole("slider")
      expect(slider).not.toHaveClass("focus:ring-red-400")
      expect(slider).toHaveClass("cursor-not-allowed")
    })
  })

  describe("Helper Text", () => {
    it("displays helper text", () => {
      render(<Slider helperText="Adjust the volume level">Volume</Slider>)

      const helperText = screen.getByText("Adjust the volume level")
      expect(helperText).toBeInTheDocument()
    })

    it("applies disabled styling to helper text", () => {
      render(
        <Slider disabled helperText="Disabled helper">
          Disabled
        </Slider>
      )

      const helperText = screen.getByText("Disabled helper")
      expect(helperText).toHaveClass("opacity-50")
    })
  })

  describe("Value Display", () => {
    it("shows value when showValue is true", () => {
      render(
        <Slider showValue defaultValue={42}>
          Slider with value
        </Slider>
      )

      const valueDisplay = screen.getByText("42")
      expect(valueDisplay).toBeInTheDocument()
    })

    it("doesn't show value by default", () => {
      render(<Slider defaultValue={42}>Slider without value</Slider>)

      expect(screen.queryByText("42")).not.toBeInTheDocument()
    })

    it("uses value formatter when provided", () => {
      const formatter = (value: number) => `${value}%`

      render(
        <Slider showValue defaultValue={75} valueFormatter={formatter}>
          Percentage slider
        </Slider>
      )

      const valueDisplay = screen.getByText("75%")
      expect(valueDisplay).toBeInTheDocument()
    })
  })

  describe("User Interactions", () => {
    it("handles value changes", async () => {
      const user = userEvent.setup()
      const handleChange = vi.fn()

      render(<Slider onChange={handleChange}>Interactive slider</Slider>)

      const slider = screen.getByRole("slider")
      await user.clear(slider)
      await user.type(slider, "25")

      expect(handleChange).toHaveBeenCalled()
      expect(handleChange).toHaveBeenLastCalledWith(25, expect.any(Object))
    })

    it("ignores changes when disabled", async () => {
      const user = userEvent.setup()
      const handleChange = vi.fn()

      render(
        <Slider disabled onChange={handleChange}>
          Disabled slider
        </Slider>
      )

      const slider = screen.getByRole("slider")
      await user.click(slider)

      expect(handleChange).not.toHaveBeenCalled()
    })

    it("handles focus and blur events", async () => {
      const user = userEvent.setup()
      const handleFocus = vi.fn()
      const handleBlur = vi.fn()

      render(
        <Slider onFocus={handleFocus} onBlur={handleBlur}>
          Focus slider
        </Slider>
      )

      const slider = screen.getByRole("slider")

      await user.click(slider)
      expect(handleFocus).toHaveBeenCalledTimes(1)

      await user.tab()
      expect(handleBlur).toHaveBeenCalledTimes(1)
    })

    it("handles keyboard navigation", async () => {
      const user = userEvent.setup()
      const handleChange = vi.fn()

      render(
        <Slider onChange={handleChange} defaultValue={50}>
          Keyboard slider
        </Slider>
      )

      const slider = screen.getByRole("slider")
      slider.focus()

      await user.keyboard("{ArrowRight}")
      expect(handleChange).toHaveBeenCalled()
    })
  })

  describe("Form Attributes", () => {
    it("applies name attribute", () => {
      render(<Slider name="slider-name">Named slider</Slider>)

      const slider = screen.getByRole("slider")
      expect(slider).toHaveAttribute("name", "slider-name")
    })

    it("forwards additional props to input", () => {
      render(
        <Slider data-testid="custom-slider" aria-describedby="description">
          Custom props
        </Slider>
      )

      const slider = screen.getByRole("slider")
      expect(slider).toHaveAttribute("data-testid", "custom-slider")
      expect(slider).toHaveAttribute("aria-describedby", "description")
    })
  })

  describe("Accessibility", () => {
    it("has correct role", () => {
      render(<Slider>Accessible slider</Slider>)

      const slider = screen.getByRole("slider")
      expect(slider).toBeInTheDocument()
    })

    it("associates label with input", () => {
      render(<Slider id="test-slider">Associated label</Slider>)

      const slider = screen.getByRole("slider")
      const label = screen.getByLabelText("Associated label")

      expect(slider).toBe(label)
    })

    it("announces error messages to screen readers", () => {
      render(
        <Slider errorMessage="Required field" error>
          Error slider
        </Slider>
      )

      const errorMessage = screen.getByRole("alert")
      expect(errorMessage).toHaveTextContent("Required field")
    })

    it("provides focus indicators", () => {
      render(<Slider>Focus slider</Slider>)

      const slider = screen.getByRole("slider")
      expect(slider).toHaveClass("focus:ring-2")
    })

    it("supports keyboard interaction", () => {
      render(<Slider>Keyboard slider</Slider>)

      const slider = screen.getByRole("slider")
      slider.focus()

      expect(document.activeElement).toBe(slider)
    })
  })

  describe("Text Alignment", () => {
    describe("Label Alignment", () => {
      it("applies left alignment by default", () => {
        render(<Slider>Left aligned label</Slider>)

        const label = screen.getByText("Left aligned label")
        expect(label).toHaveClass("text-left")
      })

      it("applies center alignment when labelAlign is center", () => {
        render(<Slider labelAlign="center">Center aligned label</Slider>)

        const label = screen.getByText("Center aligned label")
        expect(label).toHaveClass("text-center")
      })

      it("applies right alignment when labelAlign is right", () => {
        render(<Slider labelAlign="right">Right aligned label</Slider>)

        const label = screen.getByText("Right aligned label")
        expect(label).toHaveClass("text-right")
      })
    })

    describe("Helper Text Alignment", () => {
      it("applies left alignment to helper text by default", () => {
        render(<Slider helperText="Helper text">Label</Slider>)

        const helperText = screen.getByText("Helper text")
        expect(helperText).toHaveClass("text-left")
      })

      it("applies center alignment to helper text when helperAlign is center", () => {
        render(
          <Slider helperText="Center helper" helperAlign="center">
            Label
          </Slider>
        )

        const helperText = screen.getByText("Center helper")
        expect(helperText).toHaveClass("text-center")
      })

      it("applies right alignment to helper text when helperAlign is right", () => {
        render(
          <Slider helperText="Right helper" helperAlign="right">
            Label
          </Slider>
        )

        const helperText = screen.getByText("Right helper")
        expect(helperText).toHaveClass("text-right")
      })

      it("applies alignment to error message text", () => {
        render(
          <Slider errorMessage="Error message" helperAlign="center" error>
            Label
          </Slider>
        )

        const errorMessage = screen.getByText("Error message")
        expect(errorMessage).toHaveClass("text-center")
      })
    })

    describe("Combined Alignments", () => {
      it("can have different alignments for label and helper text", () => {
        render(
          <Slider
            labelAlign="center"
            helperAlign="right"
            helperText="Right helper"
          >
            Center label
          </Slider>
        )

        const label = screen.getByText("Center label")
        const helperText = screen.getByText("Right helper")

        expect(label).toHaveClass("text-center")
        expect(helperText).toHaveClass("text-right")
      })
    })
  })

  describe("Layout", () => {
    it("arranges elements correctly for horizontal orientation", () => {
      render(
        <Slider orientation="horizontal" showValue defaultValue={50}>
          Horizontal Layout
        </Slider>
      )

      const container = screen.getByRole("slider").closest("div")?.parentElement
      expect(container).toHaveClass("space-y-2")
    })

    it("arranges elements correctly for vertical orientation", () => {
      render(
        <Slider orientation="vertical" showValue defaultValue={50}>
          Vertical Layout
        </Slider>
      )

      const container = screen.getByRole("slider").closest("div")?.parentElement
      expect(container).toHaveClass("flex", "items-start", "gap-4")
    })
  })
})
