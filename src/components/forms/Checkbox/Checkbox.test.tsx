import { describe, it, expect, vi } from "vitest"
import { render, screen, fireEvent } from "../../../test/utils"
import userEvent from "@testing-library/user-event"
import { Checkbox } from "./Checkbox"

describe("Checkbox Component", () => {
  it("renders with default props", () => {
    render(<Checkbox>Accept terms</Checkbox>)

    const checkbox = screen.getByRole("checkbox")
    const label = screen.getByText("Accept terms")

    expect(checkbox).toBeInTheDocument()
    expect(label).toBeInTheDocument()
    expect(checkbox).not.toBeChecked()
  })

  it("renders different sizes correctly", () => {
    const { rerender } = render(<Checkbox size="sm">Small</Checkbox>)
    const checkboxContainer = screen.getByRole("checkbox").nextElementSibling
    expect(checkboxContainer).toHaveClass("w-4", "h-4")

    rerender(<Checkbox size="md">Medium</Checkbox>)
    const checkboxContainer2 = screen.getByRole("checkbox").nextElementSibling
    expect(checkboxContainer2).toHaveClass("w-5", "h-5")

    rerender(<Checkbox size="lg">Large</Checkbox>)
    const checkboxContainer3 = screen.getByRole("checkbox").nextElementSibling
    expect(checkboxContainer3).toHaveClass("w-6", "h-6")
  })

  it("handles checked state", () => {
    render(<Checkbox defaultChecked>Checked</Checkbox>)

    const checkbox = screen.getByRole("checkbox")
    expect(checkbox).toBeChecked()
  })

  it("handles controlled checked state", () => {
    const { rerender } = render(<Checkbox checked={false}>Controlled</Checkbox>)

    const checkbox = screen.getByRole("checkbox")
    expect(checkbox).not.toBeChecked()

    rerender(<Checkbox checked={true}>Controlled</Checkbox>)
    expect(checkbox).toBeChecked()
  })

  it("handles disabled state", () => {
    render(<Checkbox disabled>Disabled</Checkbox>)

    const checkbox = screen.getByRole("checkbox")
    expect(checkbox).toBeDisabled()
  })

  it("handles indeterminate state", () => {
    render(<Checkbox indeterminate>Indeterminate</Checkbox>)

    const checkbox = screen.getByRole("checkbox") as HTMLInputElement
    expect(checkbox.indeterminate).toBe(true)
  })

  it("calls onChange when clicked", () => {
    const handleChange = vi.fn()
    render(<Checkbox onChange={handleChange}>Click me</Checkbox>)

    const checkbox = screen.getByRole("checkbox")
    fireEvent.click(checkbox)

    expect(handleChange).toHaveBeenCalledTimes(1)
    expect(handleChange).toHaveBeenCalledWith(true, expect.any(Object))
  })

  it("does not call onChange when disabled", async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()
    render(
      <Checkbox onChange={handleChange} disabled>
        Disabled
      </Checkbox>
    )

    const checkbox = screen.getByRole("checkbox")

    // userEvent.click respects disabled state and won't trigger events
    await user.click(checkbox)

    expect(handleChange).not.toHaveBeenCalled()
  })

  it("displays error message", () => {
    render(
      <Checkbox error errorMessage="This field is required">
        Required field
      </Checkbox>
    )

    const errorMessage = screen.getByText("This field is required")
    expect(errorMessage).toBeInTheDocument()
    expect(errorMessage).toHaveClass("text-red-600")
  })

  it("displays helper text", () => {
    render(
      <Checkbox helperText="This is helpful information">With helper</Checkbox>
    )

    const helperText = screen.getByText("This is helpful information")
    expect(helperText).toBeInTheDocument()
    expect(helperText).toHaveClass("text-stone-500")
  })

  it("shows required indicator", () => {
    render(<Checkbox required>Required field</Checkbox>)

    const requiredIndicator = screen.getByText("*")
    expect(requiredIndicator).toBeInTheDocument()
    expect(requiredIndicator).toHaveClass("text-red-500")
  })

  it("renders without label", () => {
    render(<Checkbox />)

    const checkbox = screen.getByRole("checkbox")
    expect(checkbox).toBeInTheDocument()

    // Should not have a label element
    const labels = screen.queryAllByRole("label")
    expect(labels).toHaveLength(0)
  })

  it("forwards ref correctly", () => {
    let checkboxRef: HTMLInputElement | null = null

    render(
      <Checkbox
        ref={(ref: HTMLInputElement | null) => {
          checkboxRef = ref
        }}
      >
        Ref Checkbox
      </Checkbox>
    )

    expect(checkboxRef).toBeInstanceOf(HTMLInputElement)
  })

  describe("Label Alignment", () => {
    it("applies left alignment by default", () => {
      render(<Checkbox>Left aligned label</Checkbox>)

      const label = screen.getByText("Left aligned label")
      expect(label).toHaveClass("text-left")
    })

    it("applies center alignment when labelAlign is center", () => {
      render(<Checkbox labelAlign="center">Center aligned label</Checkbox>)

      const label = screen.getByText("Center aligned label")
      expect(label).toHaveClass("text-center")
    })

    it("applies right alignment when labelAlign is right", () => {
      render(<Checkbox labelAlign="right">Right aligned label</Checkbox>)

      const label = screen.getByText("Right aligned label")
      expect(label).toHaveClass("text-right")
    })
  })

  describe("Helper Text Alignment", () => {
    it("applies left alignment to helper text by default", () => {
      render(<Checkbox helperText="Helper text">Label</Checkbox>)

      const helperText = screen.getByText("Helper text")
      expect(helperText).toHaveClass("text-left")
    })

    it("applies center alignment to helper text when helperAlign is center", () => {
      render(
        <Checkbox helperText="Center helper" helperAlign="center">
          Label
        </Checkbox>
      )

      const helperText = screen.getByText("Center helper")
      expect(helperText).toHaveClass("text-center")
    })

    it("applies right alignment to helper text when helperAlign is right", () => {
      render(
        <Checkbox helperText="Right helper" helperAlign="right">
          Label
        </Checkbox>
      )

      const helperText = screen.getByText("Right helper")
      expect(helperText).toHaveClass("text-right")
    })

    it("applies alignment to error message text", () => {
      render(
        <Checkbox errorMessage="Error message" helperAlign="center">
          Label
        </Checkbox>
      )

      const errorMessage = screen.getByText("Error message")
      expect(errorMessage).toHaveClass("text-center")
    })
  })

  describe("Combined Alignments", () => {
    it("can have different alignments for label and helper text", () => {
      render(
        <Checkbox
          labelAlign="center"
          helperAlign="right"
          helperText="Right helper"
        >
          Center label
        </Checkbox>
      )

      const label = screen.getByText("Center label")
      const helperText = screen.getByText("Right helper")

      expect(label).toHaveClass("text-center")
      expect(helperText).toHaveClass("text-right")
    })
  })
})
