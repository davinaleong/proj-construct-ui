import { useState, useEffect, useCallback } from "react"
import { ThemeContext } from "./ThemeContext"
import type {
  ThemeProviderProps,
  ThemeConfig,
  ThemeMode,
  ThemeRadius,
  ThemeElevation,
} from "./types"
import type { ColorVariant } from "../../../utils/colors"

const DEFAULT_THEME: ThemeConfig = {
  mode: "paper",
  accentColor: "primary",
  radius: "md",
  elevation: "sm",
}

const RADIUS_CLASSES = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-lg",
  lg: "rounded-xl",
  xl: "rounded-2xl",
} as const

const ELEVATION_CLASSES = {
  none: "shadow-none",
  sm: "shadow-sm",
  md: "shadow-md",
  lg: "shadow-lg",
  xl: "shadow-xl",
} as const

export function ThemeProvider({
  children,
  defaultTheme = {},
  persistKey = "paper-theme",
}: ThemeProviderProps) {
  // Initialize theme from localStorage or defaults
  const [theme, setTheme] = useState<ThemeConfig>(() => {
    if (typeof window !== "undefined" && persistKey) {
      try {
        const stored = localStorage.getItem(persistKey)
        if (stored) {
          const parsed = JSON.parse(stored)
          return { ...DEFAULT_THEME, ...defaultTheme, ...parsed }
        }
      } catch (error) {
        console.warn("Failed to load theme from localStorage:", error)
      }
    }
    return { ...DEFAULT_THEME, ...defaultTheme }
  })

  // Persist theme changes to localStorage
  useEffect(() => {
    if (typeof window !== "undefined" && persistKey) {
      try {
        localStorage.setItem(persistKey, JSON.stringify(theme))
      } catch (error) {
        console.warn("Failed to save theme to localStorage:", error)
      }
    }
  }, [theme, persistKey])

  // Apply theme to document root
  useEffect(() => {
    const root = document.documentElement

    // Remove existing theme classes
    root.classList.remove("light", "dark", "paper")
    Object.values(RADIUS_CLASSES).forEach((cls) => {
      root.classList.remove(cls)
    })
    Object.values(ELEVATION_CLASSES).forEach((cls) => {
      root.classList.remove(cls)
    })

    // Apply current theme classes
    root.classList.add(theme.mode)

    // Set CSS custom properties for theme values
    root.style.setProperty("--theme-mode", theme.mode)
    root.style.setProperty("--theme-accent", theme.accentColor)
    root.style.setProperty("--theme-radius", theme.radius)
    root.style.setProperty("--theme-elevation", theme.elevation)

    // Add specific classes for radius and elevation if needed
    const radiusClass = RADIUS_CLASSES[theme.radius]
    const elevationClass = ELEVATION_CLASSES[theme.elevation]

    if (radiusClass) root.classList.add(`default-${radiusClass}`)
    if (elevationClass) root.classList.add(`default-${elevationClass}`)
  }, [theme])

  // Theme setters
  const setMode = useCallback((mode: ThemeMode) => {
    setTheme((prev) => ({ ...prev, mode }))
  }, [])

  const setAccentColor = useCallback((accentColor: ColorVariant) => {
    setTheme((prev) => ({ ...prev, accentColor }))
  }, [])

  const setRadius = useCallback((radius: ThemeRadius) => {
    setTheme((prev) => ({ ...prev, radius }))
  }, [])

  const setElevation = useCallback((elevation: ThemeElevation) => {
    setTheme((prev) => ({ ...prev, elevation }))
  }, [])

  const resetTheme = useCallback(() => {
    setTheme({ ...DEFAULT_THEME, ...defaultTheme })
  }, [defaultTheme])

  const contextValue = {
    ...theme,
    setMode,
    setAccentColor,
    setRadius,
    setElevation,
    resetTheme,
  }

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  )
}
