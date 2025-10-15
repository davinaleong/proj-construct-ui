import { render, screen } from "@testing-library/react"
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest"
import { useContext } from "react"
import { ThemeProvider } from "./ThemeProvider"
import { ThemeContext } from "./ThemeContext"

// Test component to access theme context
const ThemeTestComponent = () => {
  const theme = useContext(ThemeContext)
  if (!theme) return <div>No theme context</div>

  return (
    <div>
      <div data-testid="mode">{theme.mode}</div>
      <div data-testid="accent">{theme.accentColor}</div>
      <div data-testid="radius">{theme.radius}</div>
      <div data-testid="elevation">{theme.elevation}</div>
      <button onClick={() => theme.setMode("dark")}>Change to dark</button>
      <button
        onClick={() => theme.setMode(theme.mode === "light" ? "dark" : "light")}
      >
        Toggle mode
      </button>
    </div>
  )
}

describe("ThemeProvider Component", () => {
  const localStorageMock = {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
  }

  beforeEach(() => {
    Object.defineProperty(window, "localStorage", {
      value: localStorageMock,
      writable: true,
    })
    localStorageMock.getItem.mockClear()
    localStorageMock.setItem.mockClear()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it("renders with default theme configuration", () => {
    render(
      <ThemeProvider>
        <ThemeTestComponent />
      </ThemeProvider>
    )

    expect(screen.getByTestId("mode")).toHaveTextContent("paper")
    expect(screen.getByTestId("accent")).toHaveTextContent("primary")
    expect(screen.getByTestId("radius")).toHaveTextContent("md")
    expect(screen.getByTestId("elevation")).toHaveTextContent("sm")
  })

  it("applies custom default theme", () => {
    render(
      <ThemeProvider
        defaultTheme={{
          mode: "dark",
          accentColor: "danger",
          radius: "lg",
          elevation: "xl",
        }}
      >
        <ThemeTestComponent />
      </ThemeProvider>
    )

    expect(screen.getByTestId("mode")).toHaveTextContent("dark")
    expect(screen.getByTestId("accent")).toHaveTextContent("danger")
    expect(screen.getByTestId("radius")).toHaveTextContent("lg")
    expect(screen.getByTestId("elevation")).toHaveTextContent("xl")
  })

  it("loads theme from localStorage when available", () => {
    const storedTheme = {
      mode: "light",
      accentColor: "success",
      radius: "sm",
      elevation: "md",
    }
    localStorageMock.getItem.mockReturnValue(JSON.stringify(storedTheme))

    render(
      <ThemeProvider persistKey="test-theme">
        <ThemeTestComponent />
      </ThemeProvider>
    )

    expect(localStorageMock.getItem).toHaveBeenCalledWith("test-theme")
    expect(screen.getByTestId("mode")).toHaveTextContent("light")
    expect(screen.getByTestId("accent")).toHaveTextContent("success")
    expect(screen.getByTestId("radius")).toHaveTextContent("sm")
    expect(screen.getByTestId("elevation")).toHaveTextContent("md")
  })

  it("handles invalid localStorage data gracefully", () => {
    localStorageMock.getItem.mockReturnValue("invalid-json")
    const consoleSpy = vi.spyOn(console, "warn").mockImplementation(() => {})

    render(
      <ThemeProvider>
        <ThemeTestComponent />
      </ThemeProvider>
    )

    expect(consoleSpy).toHaveBeenCalledWith(
      "Failed to load theme from localStorage:",
      expect.any(Error)
    )
    expect(screen.getByTestId("mode")).toHaveTextContent("paper")

    consoleSpy.mockRestore()
  })

  it("saves theme changes to localStorage", async () => {
    const user = await import("@testing-library/user-event")
    const userEvent = user.default.setup()

    render(
      <ThemeProvider persistKey="test-theme">
        <ThemeTestComponent />
      </ThemeProvider>
    )

    await userEvent.click(screen.getByText("Change to dark"))

    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      "test-theme",
      expect.stringContaining('"mode":"dark"')
    )
  })

  it("toggles between light and dark modes", async () => {
    const user = await import("@testing-library/user-event")
    const userEvent = user.default.setup()

    render(
      <ThemeProvider defaultTheme={{ mode: "light" }}>
        <ThemeTestComponent />
      </ThemeProvider>
    )

    expect(screen.getByTestId("mode")).toHaveTextContent("light")

    await userEvent.click(screen.getByText("Toggle mode"))
    expect(screen.getByTestId("mode")).toHaveTextContent("dark")

    await userEvent.click(screen.getByText("Toggle mode"))
    expect(screen.getByTestId("mode")).toHaveTextContent("light")
  })

  it("toggles between paper and dark modes when starting with paper", async () => {
    const user = await import("@testing-library/user-event")
    const userEvent = user.default.setup()

    render(
      <ThemeProvider defaultTheme={{ mode: "paper" }}>
        <ThemeTestComponent />
      </ThemeProvider>
    )

    expect(screen.getByTestId("mode")).toHaveTextContent("paper")

    await userEvent.click(screen.getByText("Toggle mode"))
    expect(screen.getByTestId("mode")).toHaveTextContent("dark")

    await userEvent.click(screen.getByText("Toggle mode"))
    expect(screen.getByTestId("mode")).toHaveTextContent("light")
  })

  it("applies theme classes to document element", () => {
    render(
      <ThemeProvider defaultTheme={{ mode: "dark" }}>
        <ThemeTestComponent />
      </ThemeProvider>
    )

    expect(document.documentElement.classList.contains("dark")).toBe(true)
  })

  it("cleans up theme classes on unmount", () => {
    const { unmount } = render(
      <ThemeProvider defaultTheme={{ mode: "dark" }}>
        <ThemeTestComponent />
      </ThemeProvider>
    )

    expect(document.documentElement.classList.contains("dark")).toBe(true)

    unmount()

    expect(document.documentElement.classList.contains("dark")).toBe(false)
  })

  it("works without localStorage (SSR)", () => {
    // Mock SSR environment
    const originalWindow = global.window
    delete (global as unknown as { window: unknown }).window

    render(
      <ThemeProvider>
        <ThemeTestComponent />
      </ThemeProvider>
    )

    expect(screen.getByTestId("mode")).toHaveTextContent("paper")

    // Restore window
    global.window = originalWindow
  })

  it("skips localStorage when persistKey is undefined", async () => {
    const user = await import("@testing-library/user-event")
    const userEvent = user.default.setup()

    render(
      <ThemeProvider persistKey={undefined}>
        <ThemeTestComponent />
      </ThemeProvider>
    )

    await userEvent.click(screen.getByText("Change to dark"))

    expect(localStorageMock.setItem).not.toHaveBeenCalled()
    expect(screen.getByTestId("mode")).toHaveTextContent("dark")
  })

  it("provides context value without provider", () => {
    // This tests the context usage outside provider
    const TestWithoutProvider = () => {
      const theme = useContext(ThemeContext)
      return <div>{theme ? "Has context" : "No context"}</div>
    }

    render(<TestWithoutProvider />)
    expect(screen.getByText("No context")).toBeInTheDocument()
  })

  it("updates theme with partial configuration", async () => {
    const user = await import("@testing-library/user-event")
    const userEvent = user.default.setup()

    const TestComponent = () => {
      const theme = useContext(ThemeContext)
      if (!theme) return <div>No theme</div>

      return (
        <div>
          <div data-testid="accent">{theme.accentColor}</div>
          <button onClick={() => theme.setAccentColor("success")}>
            Change accent
          </button>
        </div>
      )
    }

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    )

    expect(screen.getByTestId("accent")).toHaveTextContent("primary")

    await userEvent.click(screen.getByText("Change accent"))

    expect(screen.getByTestId("accent")).toHaveTextContent("success")
  })
})
