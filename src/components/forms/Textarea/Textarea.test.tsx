import { screen } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"
import userEvent from "@testing-library/user-event"
import { Textarea } from "./Textarea"
import { render as renderWithTheme } from "../../../test/utils"

describe("Textarea Component", () => {
  it("renders with default props", () => {
    renderWithTheme(<Textarea />)

    const textarea = screen.getByRole("textbox")
    expect(textarea).toBeInTheDocument()
    expect(textarea).toHaveClass(
      "w-full",
      "rounded-sm",
      "border",
      "bg-white",
      "transition-all",
      "duration-200",
      "min-h-[2.5rem]"
    )
  })

  it("renders with label", () => {
    renderWithTheme(<Textarea label="Message" name="message" />)

    expect(screen.getByText("Message")).toBeInTheDocument()
    expect(screen.getByLabelText("Message")).toBeInTheDocument()
  })

  it("renders with placeholder", () => {
    renderWithTheme(<Textarea placeholder="Enter your message" />)

    const textarea = screen.getByPlaceholderText("Enter your message")
    expect(textarea).toBeInTheDocument()
  })

  it("handles different sizes", () => {
    const { rerender } = renderWithTheme(<Textarea size="sm" />)
    let textarea = screen.getByRole("textbox")
    expect(textarea).toHaveClass("px-3", "py-1.5")

    rerender(<Textarea size="md" />)
    textarea = screen.getByRole("textbox")
    expect(textarea).toHaveClass("px-3", "py-2")

    rerender(<Textarea size="lg" />)
    textarea = screen.getByRole("textbox")
    expect(textarea).toHaveClass("px-4", "py-2.5")
  })

  it("handles different variants", () => {
    const { rerender } = renderWithTheme(<Textarea variant="default" />)
    let textarea = screen.getByRole("textbox")
    expect(textarea).toHaveClass("border-stone-200/60", "bg-white")

    rerender(<Textarea variant="filled" />)
    textarea = screen.getByRole("textbox")
    expect(textarea).toHaveClass("bg-stone-50")

    rerender(<Textarea variant="outlined" />)
    textarea = screen.getByRole("textbox")
    expect(textarea).toHaveClass("border-2", "border-stone-300")
  })

  it("handles resize options", () => {
    const { rerender } = renderWithTheme(<Textarea resize="none" />)
    let textarea = screen.getByRole("textbox")
    expect(textarea).toHaveClass("resize-none")

    rerender(<Textarea resize="vertical" />)
    textarea = screen.getByRole("textbox")
    expect(textarea).toHaveClass("resize-y")

    rerender(<Textarea resize="horizontal" />)
    textarea = screen.getByRole("textbox")
    expect(textarea).toHaveClass("resize-x")

    rerender(<Textarea resize="both" />)
    textarea = screen.getByRole("textbox")
    expect(textarea).toHaveClass("resize")
  })

  it("handles rows prop", () => {
    renderWithTheme(<Textarea rows={5} />)

    const textarea = screen.getByRole("textbox")
    expect(textarea).toHaveAttribute("rows", "5")
  })

  it("handles disabled state", () => {
    renderWithTheme(<Textarea disabled />)

    const textarea = screen.getByRole("textbox")
    expect(textarea).toBeDisabled()
    expect(textarea).toHaveClass(
      "disabled:opacity-50",
      "disabled:cursor-not-allowed"
    )
  })

  it("handles error state", () => {
    renderWithTheme(<Textarea error />)

    const textarea = screen.getByRole("textbox")
    expect(textarea).toHaveClass("border-red-300")
  })

  it("shows error message when provided", () => {
    renderWithTheme(<Textarea error errorMessage="Message is too short" />)

    expect(screen.getByText("Message is too short")).toBeInTheDocument()
    expect(screen.getByText("Message is too short")).toHaveClass("text-red-600")
  })

  it("shows helper text when provided", () => {
    renderWithTheme(<Textarea helperText="Maximum 500 characters" />)

    expect(screen.getByText("Maximum 500 characters")).toBeInTheDocument()
    expect(screen.getByText("Maximum 500 characters")).toHaveClass(
      "text-stone-500"
    )
  })

  it("handles required field", () => {
    renderWithTheme(<Textarea label="Description" required />)

    const label = screen.getByText("Description")
    expect(
      label.querySelector('span[class*="text-red-500"]')
    ).toBeInTheDocument()
  })

  it("handles value changes", async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()

    renderWithTheme(<Textarea onChange={handleChange} />)

    const textarea = screen.getByRole("textbox")
    await user.type(textarea, "This is a test message")

    expect(handleChange).toHaveBeenCalled()
    expect(textarea).toHaveValue("This is a test message")
  })

  it("forwards ref correctly", () => {
    const ref = { current: null }
    renderWithTheme(<Textarea ref={ref} />)

    expect(ref.current).toBeInstanceOf(HTMLTextAreaElement)
  })

  it("applies custom className", () => {
    renderWithTheme(<Textarea className="custom-textarea" />)

    const textarea = screen.getByRole("textbox")
    expect(textarea).toHaveClass("custom-textarea")
  })

  it("passes through additional props", () => {
    renderWithTheme(
      <Textarea data-testid="test-textarea" maxLength={500} name="message" />
    )

    const textarea = screen.getByTestId("test-textarea")
    expect(textarea).toHaveAttribute("maxlength", "500")
    expect(textarea).toHaveAttribute("name", "message")
  })

  it("combines all props correctly", () => {
    renderWithTheme(
      <Textarea
        label="Feedback"
        placeholder="Share your thoughts..."
        variant="filled"
        size="lg"
        rows={6}
        resize="vertical"
        helperText="Help us improve our service"
        className="feedback-textarea"
        required
        maxLength={1000}
      />
    )

    expect(screen.getByText("Feedback")).toBeInTheDocument()
    expect(
      screen.getByPlaceholderText("Share your thoughts...")
    ).toBeInTheDocument()
    expect(screen.getByText("Help us improve our service")).toBeInTheDocument()

    const textarea = screen.getByRole("textbox")
    expect(textarea).toHaveClass(
      "px-4",
      "py-2.5",
      "bg-stone-50",
      "resize-y",
      "feedback-textarea"
    )
    expect(textarea).toHaveAttribute("rows", "6")
    expect(textarea).toHaveAttribute("maxlength", "1000")
    expect(textarea).toBeRequired()
  })

  it("shows error message instead of helper text when both provided", () => {
    renderWithTheme(
      <Textarea
        error
        errorMessage="This field is required"
        helperText="This is helper text"
      />
    )

    expect(screen.getByText("This field is required")).toBeInTheDocument()
    expect(screen.queryByText("This is helper text")).not.toBeInTheDocument()
  })

  it("generates unique IDs for multiple textareas", () => {
    renderWithTheme(
      <div>
        <Textarea label="First Message" name="first" />
        <Textarea label="Second Message" name="second" />
      </div>
    )

    const firstTextarea = screen.getByLabelText("First Message")
    const secondTextarea = screen.getByLabelText("Second Message")

    expect(firstTextarea.id).toBe("first")
    expect(secondTextarea.id).toBe("second")
    expect(firstTextarea.id).not.toBe(secondTextarea.id)
  })

  it("handles focus and blur events", async () => {
    const user = userEvent.setup()
    const handleFocus = vi.fn()
    const handleBlur = vi.fn()

    renderWithTheme(<Textarea onFocus={handleFocus} onBlur={handleBlur} />)

    const textarea = screen.getByRole("textbox")

    await user.click(textarea)
    expect(handleFocus).toHaveBeenCalledTimes(1)

    await user.tab()
    expect(handleBlur).toHaveBeenCalledTimes(1)
  })
})
