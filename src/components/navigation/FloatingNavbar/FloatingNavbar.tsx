import { useEffect, useState } from "react"
import type { FloatingNavbarProps } from "./types"
import { cn } from "../../../utils/cn.js"

const getPositionClasses = (position: string) => {
  const baseClasses = {
    "top-left": "top-0 left-0",
    "top-right": "top-0 right-0",
    "bottom-left": "bottom-0 left-0",
    "bottom-right": "bottom-0 right-0",
  }
  return (
    baseClasses[position as keyof typeof baseClasses] ||
    baseClasses["top-right"]
  )
}

export const FloatingNavbar = ({
  items,
  position = "top-right",
  offset = 20,
  visible = true,
  className,
  onItemClick,
}: FloatingNavbarProps) => {
  const [activeId, setActiveId] = useState<string>("")

  // Parse offset into x and y values
  const offsetX = typeof offset === "number" ? offset : offset.x ?? 20
  const offsetY = typeof offset === "number" ? offset : offset.y ?? 20

  // Generate position-specific margins
  const getMarginStyle = () => {
    switch (position) {
      case "top-left":
        return { marginTop: `${offsetY}px`, marginLeft: `${offsetX}px` }
      case "top-right":
        return { marginTop: `${offsetY}px`, marginRight: `${offsetX}px` }
      case "bottom-left":
        return { marginBottom: `${offsetY}px`, marginLeft: `${offsetX}px` }
      case "bottom-right":
        return { marginBottom: `${offsetY}px`, marginRight: `${offsetX}px` }
      default:
        return { marginTop: `${offsetY}px`, marginRight: `${offsetX}px` }
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      // Get all sections that correspond to navigation items
      const sections = items
        .map((item) => {
          const element = document.querySelector(item.href)
          return element ? { id: item.id, element, href: item.href } : null
        })
        .filter(Boolean)

      if (sections.length === 0) return

      // Find which section is currently in view
      let currentSection = ""
      const scrollPosition = window.scrollY + window.innerHeight / 3

      for (const section of sections) {
        if (
          section &&
          section.element &&
          typeof section.element.getBoundingClientRect === "function"
        ) {
          const rect = section.element.getBoundingClientRect()
          const elementTop = rect.top + window.scrollY

          if (elementTop <= scrollPosition) {
            currentSection = section.id
          }
        }
      }

      setActiveId(currentSection)
    }

    // Set initial active section
    handleScroll()

    // Add scroll listener
    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => window.removeEventListener("scroll", handleScroll)
  }, [items])

  const handleItemClick = (item: (typeof items)[0]) => {
    const element = document.querySelector(item.href)
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
    onItemClick?.(item)
  }

  if (!visible) return null

  return (
    <nav
      className={cn(
        "fixed z-50 p-4 bg-white/90 backdrop-blur-sm border border-stone-200 rounded-sm shadow-lg",
        "transition-all duration-200 ease-in-out",
        getPositionClasses(position),
        className
      )}
      style={getMarginStyle()}
    >
      <ul className="space-y-1">
        {items.map((item) => (
          <li key={item.id}>
            <button
              onClick={() => handleItemClick(item)}
              className={cn(
                "cursor-pointer w-full text-left px-3 py-2 text-sm rounded-md transition-all duration-200",
                "hover:bg-stone-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1",
                activeId === item.id
                  ? "bg-blue-100 text-blue-900 font-medium border-l-2 border-blue-500 pl-2"
                  : "text-stone-700 hover:text-stone-900"
              )}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}

FloatingNavbar.displayName = "FloatingNavbar"
