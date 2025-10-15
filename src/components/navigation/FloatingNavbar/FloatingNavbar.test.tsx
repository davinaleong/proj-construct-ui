import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import { render, screen, fireEvent } from "../../../test/utils"
import { FloatingNavbar } from "./FloatingNavbar"

// Mock scrollIntoView
const mockScrollIntoView = vi.fn()
Object.defineProperty(Element.prototype, "scrollIntoView", {
  value: mockScrollIntoView,
  writable: true,
})

// Mock querySelector to return mock elements
const mockQuerySelector = vi.fn()
Object.defineProperty(document, "querySelector", {
  value: mockQuerySelector,
  writable: true,
})

describe("FloatingNavbar Component", () => {
  const defaultItems = [
    { id: "section1", label: "Section 1", href: "#section1" },
    { id: "section2", label: "Section 2", href: "#section2" },
    { id: "section3", label: "Section 3", href: "#section3" },
  ]

  beforeEach(() => {
    vi.clearAllMocks()
    // Mock getBoundingClientRect
    Element.prototype.getBoundingClientRect = vi.fn(() => ({
      top: 100,
      bottom: 200,
      left: 0,
      right: 100,
      width: 100,
      height: 100,
      x: 0,
      y: 100,
      toJSON: () => {},
    }))
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe("Basic Rendering", () => {
    it("renders navigation items correctly", () => {
      render(<FloatingNavbar items={defaultItems} />)

      expect(screen.getByText("Section 1")).toBeInTheDocument()
      expect(screen.getByText("Section 2")).toBeInTheDocument()
      expect(screen.getByText("Section 3")).toBeInTheDocument()
    })

    it("renders with correct default position", () => {
      render(<FloatingNavbar items={defaultItems} />)

      const nav = screen.getByRole("navigation")
      expect(nav).toHaveClass("top-0", "right-0")
    })

    it("applies custom className", () => {
      render(<FloatingNavbar items={defaultItems} className="custom-class" />)

      const nav = screen.getByRole("navigation")
      expect(nav).toHaveClass("custom-class")
    })

    it("doesn't render when visible is false", () => {
      render(<FloatingNavbar items={defaultItems} visible={false} />)

      expect(screen.queryByRole("navigation")).not.toBeInTheDocument()
    })
  })

  describe("Position Variants", () => {
    it("renders in top-left position", () => {
      render(<FloatingNavbar items={defaultItems} position="top-left" />)

      const nav = screen.getByRole("navigation")
      expect(nav).toHaveClass("top-0", "left-0")
    })

    it("renders in top-right position", () => {
      render(<FloatingNavbar items={defaultItems} position="top-right" />)

      const nav = screen.getByRole("navigation")
      expect(nav).toHaveClass("top-0", "right-0")
    })

    it("renders in bottom-left position", () => {
      render(<FloatingNavbar items={defaultItems} position="bottom-left" />)

      const nav = screen.getByRole("navigation")
      expect(nav).toHaveClass("bottom-0", "left-0")
    })

    it("renders in bottom-right position", () => {
      render(<FloatingNavbar items={defaultItems} position="bottom-right" />)

      const nav = screen.getByRole("navigation")
      expect(nav).toHaveClass("bottom-0", "right-0")
    })
  })

  describe("Offset Handling", () => {
    it("applies default offset", () => {
      render(<FloatingNavbar items={defaultItems} />)

      const nav = screen.getByRole("navigation")
      expect(nav).toHaveStyle({ margin: "20px" })
    })

    it("applies custom offset", () => {
      render(<FloatingNavbar items={defaultItems} offset={40} />)

      const nav = screen.getByRole("navigation")
      expect(nav).toHaveStyle({ margin: "40px" })
    })
  })

  describe("Navigation Interactions", () => {
    it("handles item click and scrolls to element", () => {
      const mockElement = { scrollIntoView: mockScrollIntoView }
      mockQuerySelector.mockReturnValue(mockElement)

      render(<FloatingNavbar items={defaultItems} />)

      const firstItem = screen.getByText("Section 1")
      fireEvent.click(firstItem)

      expect(mockQuerySelector).toHaveBeenCalledWith("#section1")
      expect(mockScrollIntoView).toHaveBeenCalledWith({
        behavior: "smooth",
        block: "start",
      })
    })

    it("calls onItemClick callback when provided", () => {
      const onItemClick = vi.fn()
      const mockElement = { scrollIntoView: mockScrollIntoView }
      mockQuerySelector.mockReturnValue(mockElement)

      render(<FloatingNavbar items={defaultItems} onItemClick={onItemClick} />)

      const firstItem = screen.getByText("Section 1")
      fireEvent.click(firstItem)

      expect(onItemClick).toHaveBeenCalledWith(defaultItems[0])
    })

    it("handles click when element doesn't exist", () => {
      mockQuerySelector.mockReturnValue(null)

      render(<FloatingNavbar items={defaultItems} />)

      const firstItem = screen.getByText("Section 1")
      fireEvent.click(firstItem)

      expect(mockQuerySelector).toHaveBeenCalledWith("#section1")
      expect(mockScrollIntoView).not.toHaveBeenCalled()
    })
  })

  describe("Active State Management", () => {
    beforeEach(() => {
      // Mock window properties
      Object.defineProperty(window, "scrollY", {
        value: 100,
        writable: true,
      })
      Object.defineProperty(window, "innerHeight", {
        value: 800,
        writable: true,
      })
    })

    it("highlights active section based on scroll position", () => {
      const mockElement1 = {
        getBoundingClientRect: () => ({ top: 50, bottom: 150 }),
      }
      const mockElement2 = {
        getBoundingClientRect: () => ({ top: 200, bottom: 300 }),
      }

      mockQuerySelector
        .mockReturnValueOnce(mockElement1)
        .mockReturnValueOnce(mockElement2)
        .mockReturnValueOnce(null)

      render(<FloatingNavbar items={defaultItems} />)

      const firstItem = screen.getByText("Section 1")
      expect(firstItem).toHaveClass("bg-blue-100", "text-blue-900")
    })

    it("updates active section on scroll", () => {
      const mockElement1 = {
        getBoundingClientRect: () => ({ top: -100, bottom: 0 }),
      }
      const mockElement2 = {
        getBoundingClientRect: () => ({ top: 50, bottom: 150 }),
      }

      mockQuerySelector
        .mockReturnValue(mockElement1)
        .mockReturnValueOnce(mockElement1)
        .mockReturnValueOnce(mockElement2)
        .mockReturnValueOnce(null)

      render(<FloatingNavbar items={defaultItems} />)

      // Simulate scroll event
      fireEvent.scroll(window)

      // Check that the appropriate item has active styling
      const items = screen.getAllByRole("button")
      expect(items[0]).toHaveClass("bg-blue-100", "text-blue-900")
    })
  })

  describe("Accessibility", () => {
    it("has correct navigation role", () => {
      render(<FloatingNavbar items={defaultItems} />)

      const nav = screen.getByRole("navigation")
      expect(nav).toBeInTheDocument()
    })

    it("provides accessible buttons", () => {
      render(<FloatingNavbar items={defaultItems} />)

      const buttons = screen.getAllByRole("button")
      expect(buttons).toHaveLength(defaultItems.length)

      buttons.forEach((button, index) => {
        expect(button).toHaveTextContent(defaultItems[index].label)
      })
    })

    it("supports keyboard navigation", () => {
      render(<FloatingNavbar items={defaultItems} />)

      const firstButton = screen.getByText("Section 1")
      expect(firstButton).toHaveClass("focus:outline-none", "focus:ring-2")
    })
  })

  describe("Visual States", () => {
    it("applies correct styling for active items", () => {
      render(<FloatingNavbar items={defaultItems} />)

      // First item should be active by default in our mock setup
      const firstItem = screen.getByText("Section 1")
      expect(firstItem).toHaveClass(
        "bg-blue-100",
        "text-blue-900",
        "font-medium",
        "border-l-2",
        "border-blue-500"
      )
    })

    it("applies correct styling for inactive items", () => {
      render(<FloatingNavbar items={defaultItems} />)

      const secondItem = screen.getByText("Section 2")
      expect(secondItem).toHaveClass("text-stone-700")
      expect(secondItem).not.toHaveClass("bg-blue-100")
    })

    it("applies hover styles", () => {
      render(<FloatingNavbar items={defaultItems} />)

      const items = screen.getAllByRole("button")
      items.forEach((item) => {
        expect(item).toHaveClass("hover:bg-stone-100", "hover:text-stone-900")
      })
    })
  })

  describe("Container Styling", () => {
    it("has floating container styles", () => {
      render(<FloatingNavbar items={defaultItems} />)

      const nav = screen.getByRole("navigation")
      expect(nav).toHaveClass(
        "fixed",
        "z-50",
        "bg-white/90",
        "backdrop-blur-sm",
        "border",
        "border-stone-200",
        "rounded-lg",
        "shadow-lg"
      )
    })

    it("has correct transition classes", () => {
      render(<FloatingNavbar items={defaultItems} />)

      const nav = screen.getByRole("navigation")
      expect(nav).toHaveClass("transition-all", "duration-200", "ease-in-out")
    })
  })

  describe("Empty States", () => {
    it("renders empty navigation when no items provided", () => {
      render(<FloatingNavbar items={[]} />)

      const nav = screen.getByRole("navigation")
      expect(nav).toBeInTheDocument()
      expect(screen.queryByRole("button")).not.toBeInTheDocument()
    })
  })
})
