import { describe, it, expect, vi } from "vitest"
import { render, screen, fireEvent, waitFor } from "../../../test/utils"
import { createSelectOptions, createSelectOptGroups } from "../../../test/utils"
import { Select } from "./Select"

describe("Select Component", () => {
  const basicOptions = createSelectOptions(3)

  it("renders with default props", () => {
    render(<Select options={basicOptions} />)

    const select = screen.getByRole("button")
    expect(select).toBeInTheDocument()
    expect(select).toHaveTextContent("Select an option...")
  })

  it("renders with custom placeholder", () => {
    render(<Select options={basicOptions} placeholder="Choose something" />)

    const select = screen.getByRole("button")
    expect(select).toHaveTextContent("Choose something")
  })

  it("renders with label", () => {
    render(<Select options={basicOptions} label="Choose option" />)

    const label = screen.getByText("Choose option")
    expect(label).toBeInTheDocument()
  })

  it("opens dropdown when clicked", async () => {
    render(<Select options={basicOptions} />)

    const select = screen.getByRole("button")
    fireEvent.click(select)

    await waitFor(() => {
      expect(screen.getByText("Option 1")).toBeInTheDocument()
      expect(screen.getByText("Option 2")).toBeInTheDocument()
      expect(screen.getByText("Option 3")).toBeInTheDocument()
    })
  })

  it("selects option when clicked", async () => {
    const handleChange = vi.fn()
    render(<Select options={basicOptions} onChange={handleChange} />)

    const select = screen.getByRole("button")
    fireEvent.click(select)

    await waitFor(() => {
      const option = screen.getByText("Option 2")
      fireEvent.click(option)
    })

    expect(handleChange).toHaveBeenCalledWith(
      "option-2",
      expect.objectContaining({
        value: "option-2",
        label: "Option 2",
      })
    )
  })

  it("handles keyboard navigation", async () => {
    render(<Select options={basicOptions} />)

    const select = screen.getByRole("button")
    select.focus()

    // Open with Enter
    fireEvent.keyDown(select, { key: "Enter" })

    await waitFor(() => {
      expect(screen.getByText("Option 1")).toBeInTheDocument()
    })

    // Navigate with arrows
    fireEvent.keyDown(select, { key: "ArrowDown" })
    fireEvent.keyDown(select, { key: "ArrowDown" })

    // Select with Enter
    fireEvent.keyDown(select, { key: "Enter" })

    await waitFor(() => {
      expect(select).toHaveTextContent("Option 2")
    })
  })

  it("closes dropdown with Escape", async () => {
    render(<Select options={basicOptions} />)

    const select = screen.getByRole("button")
    fireEvent.click(select)

    await waitFor(() => {
      expect(screen.getByText("Option 1")).toBeInTheDocument()
    })

    fireEvent.keyDown(select, { key: "Escape" })

    await waitFor(() => {
      expect(screen.queryByText("Option 1")).not.toBeInTheDocument()
    })
  })

  it("handles multiple selection", async () => {
    const handleChange = vi.fn()
    render(<Select options={basicOptions} multiple onChange={handleChange} />)

    const select = screen.getByRole("button")
    fireEvent.click(select)

    await waitFor(() => {
      const option1 = screen.getByText("Option 1")
      const option2 = screen.getByText("Option 2")

      fireEvent.click(option1)
      fireEvent.click(option2)
    })

    expect(handleChange).toHaveBeenCalledWith(["option-1"], expect.any(Array))
    expect(handleChange).toHaveBeenCalledWith(
      ["option-1", "option-2"],
      expect.any(Array)
    )
  })

  it("handles searchable select", async () => {
    render(<Select options={basicOptions} searchable />)

    const select = screen.getByRole("button")
    fireEvent.click(select)

    await waitFor(() => {
      const searchInput = screen.getByPlaceholderText("Search options...")
      expect(searchInput).toBeInTheDocument()

      fireEvent.change(searchInput, { target: { value: "Option 2" } })
    })

    await waitFor(() => {
      expect(screen.getByText("Option 2")).toBeInTheDocument()
      expect(screen.queryByText("Option 1")).not.toBeInTheDocument()
      expect(screen.queryByText("Option 3")).not.toBeInTheDocument()
    })
  })

  it("renders optgroups correctly", async () => {
    const optgroups = createSelectOptGroups()
    render(<Select options={optgroups} />)

    const select = screen.getByRole("button")
    fireEvent.click(select)

    await waitFor(() => {
      expect(screen.getByText("Group 1")).toBeInTheDocument()
      expect(screen.getByText("Group 2")).toBeInTheDocument()
      expect(screen.getByText("Group 1 Option 1")).toBeInTheDocument()
      expect(screen.getByText("Group 2 Option 1")).toBeInTheDocument()
    })
  })

  it("filters optgroups when searching", async () => {
    const optgroups = createSelectOptGroups()
    render(<Select options={optgroups} searchable />)

    const select = screen.getByRole("button")
    fireEvent.click(select)

    await waitFor(() => {
      const searchInput = screen.getByPlaceholderText("Search options...")
      fireEvent.change(searchInput, { target: { value: "Group 1 Option" } })
    })

    await waitFor(() => {
      expect(screen.getByText("Group 1")).toBeInTheDocument()
      expect(screen.queryByText("Group 2")).not.toBeInTheDocument()
      expect(screen.getByText("Group 1 Option 1")).toBeInTheDocument()
    })
  })

  it("handles disabled state", () => {
    render(<Select options={basicOptions} disabled />)

    const select = screen.getByRole("button")
    expect(select).toBeDisabled()
  })

  it("displays error message", () => {
    render(
      <Select
        options={basicOptions}
        error
        errorMessage="Please select an option"
      />
    )

    const errorMessage = screen.getByText("Please select an option")
    expect(errorMessage).toBeInTheDocument()
    expect(errorMessage).toHaveClass("text-red-600")
  })

  it("displays helper text", () => {
    render(
      <Select
        options={basicOptions}
        helperText="Choose your preferred option"
      />
    )

    const helperText = screen.getByText("Choose your preferred option")
    expect(helperText).toBeInTheDocument()
    expect(helperText).toHaveClass("text-stone-500")
  })

  it("shows required indicator", () => {
    render(<Select options={basicOptions} label="Required field" required />)

    const requiredIndicator = screen.getByText("*")
    expect(requiredIndicator).toBeInTheDocument()
    expect(requiredIndicator).toHaveClass("text-red-500")
  })

  it("forwards ref correctly", () => {
    let selectRef: HTMLButtonElement | null = null

    render(
      <Select
        options={basicOptions}
        ref={(ref: HTMLButtonElement | null) => {
          selectRef = ref
        }}
      />
    )

    expect(selectRef).toBeInstanceOf(HTMLButtonElement)
  })
})
