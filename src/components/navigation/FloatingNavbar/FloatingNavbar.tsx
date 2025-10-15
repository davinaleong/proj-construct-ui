import { useEffect, useState } from "react"
import type { FloatingNavbarProps } from "./types"
import { cn } from "../../../utils/cn.js"

const positionClasses = {
  "top-left": "top-0 left-0",
  "top-right": "top-0 right-0",
  "bottom-left": "bottom-0 left-0",
  "bottom-right": "bottom-0 right-0",
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
        if (section && section.element) {
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
        "fixed z-50 p-4 bg-white/90 backdrop-blur-sm border border-stone-200 rounded-lg shadow-lg",
        "transition-all duration-200 ease-in-out",
        positionClasses[position],
        className
      )}
      style={{
        margin: `${offset}px`,
      }}
    >
      <ul className="space-y-1">
        {items.map((item) => (
          <li key={item.id}>
            <button
              onClick={() => handleItemClick(item)}
              className={cn(
                "w-full text-left px-3 py-2 text-sm rounded-md transition-all duration-200",
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
