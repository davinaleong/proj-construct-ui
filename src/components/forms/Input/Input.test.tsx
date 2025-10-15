import { screen } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"
import userEvent from "@testing-library/user-event"
import { Search, User, Eye } from "lucide-react"
import { Input } from "./Input"
import { render as renderWithTheme } from "../../../test/utils"

describe("Input Component", () => {
  it("renders with default props", () => {
    renderWithTheme(<Input />)

    const input = screen.getByRole("textbox")
    expect(input).toBeInTheDocument()
    expect(input).toHaveClass(
      "w-full",
      "rounded-sm",
      "border",
      "bg-white",
      "transition-all",
      "duration-200"
    )
  })

  it("renders with label", () => {
    renderWithTheme(<Input label="Email Address" name="email" />)

    expect(screen.getByText("Email Address")).toBeInTheDocument()
    expect(screen.getByLabelText("Email Address")).toBeInTheDocument()
  })

  it("renders with placeholder", () => {
    renderWithTheme(<Input placeholder="Enter your email" />)

    const input = screen.getByPlaceholderText("Enter your email")
    expect(input).toBeInTheDocument()
  })

  it("handles different sizes", () => {
    const { rerender } = renderWithTheme(<Input size="sm" />)
    let input = screen.getByRole("textbox")
    expect(input).toHaveClass("px-3", "py-1.5")

    rerender(<Input size="md" />)
    input = screen.getByRole("textbox")
    expect(input).toHaveClass("px-3", "py-2")

    rerender(<Input size="lg" />)
    input = screen.getByRole("textbox")
    expect(input).toHaveClass("px-4", "py-2.5")
  })

  it("renders with left icon", () => {
    renderWithTheme(<Input leftIcon={Search} />)

    const input = screen.getByRole("textbox")
    expect(input).toHaveClass("pl-10") // Medium size default left padding
  })

  it("renders with right icon", () => {
    renderWithTheme(<Input rightIcon={User} />)

    const input = screen.getByRole("textbox")
    expect(input).toHaveClass("pr-10") // Medium size default right padding
  })

  it("handles disabled state", () => {
    renderWithTheme(<Input disabled />)

    const input = screen.getByRole("textbox")
    expect(input).toBeDisabled()
    expect(input).toHaveClass(
      "disabled:opacity-50",
      "disabled:cursor-not-allowed"
    )
  })

  it("handles error state", () => {
    renderWithTheme(<Input error />)

    const input = screen.getByRole("textbox")
    expect(input).toHaveClass("border-red-300")
  })

  it("shows error message when provided", () => {
    renderWithTheme(<Input error errorMessage="Invalid email" />)

    expect(screen.getByText("Invalid email")).toBeInTheDocument()
    expect(screen.getByText("Invalid email")).toHaveClass("text-red-600")
  })

  it("shows helper text when provided", () => {
    renderWithTheme(<Input helperText="We'll never share your email" />)

    expect(screen.getByText("We'll never share your email")).toBeInTheDocument()
    expect(screen.getByText("We'll never share your email")).toHaveClass(
      "text-stone-500"
    )
  })

  it("handles required field", () => {
    renderWithTheme(<Input label="Email" required />)

    const label = screen.getByText("Email")
    expect(
      label.querySelector('span[class*="text-red-500"]')
    ).toBeInTheDocument()
  })

  it("handles different input types", () => {
    const { rerender } = renderWithTheme(<Input type="email" />)
    let input = screen.getByRole("textbox")
    expect(input).toHaveAttribute("type", "email")

    rerender(<Input type="password" />)
    input = document.querySelector('input[type="password"]') as HTMLInputElement
    expect(input).toHaveAttribute("type", "password")

    rerender(<Input type="number" />)
    input = screen.getByRole("spinbutton")
    expect(input).toHaveAttribute("type", "number")
  })

  it("handles value changes", async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()

    renderWithTheme(<Input onChange={handleChange} />)

    const input = screen.getByRole("textbox")
    await user.type(input, "test@example.com")

    expect(handleChange).toHaveBeenCalled()
    expect(input).toHaveValue("test@example.com")
  })

  it("forwards ref correctly", () => {
    const ref = { current: null }
    renderWithTheme(<Input ref={ref} />)

    expect(ref.current).toBeInstanceOf(HTMLInputElement)
  })

  it("applies custom className", () => {
    renderWithTheme(<Input className="custom-input" />)

    const input = screen.getByRole("textbox")
    expect(input).toHaveClass("custom-input")
  })

  it("passes through additional props", () => {
    renderWithTheme(
      <Input data-testid="test-input" name="email" id="email-input" />
    )

    const input = screen.getByTestId("test-input")
    expect(input).toHaveAttribute("name", "email")
    expect(input).toHaveAttribute("id", "email-input")
  })

  it("renders with both icons", () => {
    renderWithTheme(<Input leftIcon={Search} rightIcon={Eye} size="lg" />)

    const input = screen.getByRole("textbox")
    expect(input).toHaveClass("pl-11", "pr-11") // Large size padding for both sides
  })

  it("combines all props correctly", () => {
    renderWithTheme(
      <Input
        label="Search Query"
        placeholder="Type to search..."
        leftIcon={Search}
        size="lg"
        helperText="Search across all documents"
        className="search-input"
        required
      />
    )

    expect(screen.getByText("Search Query")).toBeInTheDocument()
    expect(screen.getByPlaceholderText("Type to search...")).toBeInTheDocument()
    expect(screen.getByText("Search across all documents")).toBeInTheDocument()

    const input = screen.getByRole("textbox")
    expect(input).toHaveClass("px-4", "py-2.5", "pl-11", "search-input")
    expect(input).toBeRequired()
  })

  it("shows error message instead of helper text when both provided", () => {
    renderWithTheme(
      <Input
        error
        errorMessage="This field is required"
        helperText="This is helper text"
      />
    )

    expect(screen.getByText("This field is required")).toBeInTheDocument()
    expect(screen.queryByText("This is helper text")).not.toBeInTheDocument()
  })

  it("generates unique IDs for multiple inputs", () => {
    renderWithTheme(
      <div>
        <Input label="First Input" name="first" />
        <Input label="Second Input" name="second" />
      </div>
    )

    const firstInput = screen.getByLabelText("First Input")
    const secondInput = screen.getByLabelText("Second Input")

    expect(firstInput.id).toBe("first")
    expect(secondInput.id).toBe("second")
    expect(firstInput.id).not.toBe(secondInput.id)
  })
})
