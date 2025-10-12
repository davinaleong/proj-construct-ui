import { useTheme } from "./ThemeContext"
import {
  getColorClasses,
  getBorderColorClasses,
  getBackgroundColorClasses,
} from "../../../utils/colors"
import type { ColorStyle, ColorIntensity } from "../../../utils/colors"

/**
 * Hook that provides theme-aware utility functions
 */
export function useThemeUtils() {
  const theme = useTheme()

  /**
   * Get color classes using the current accent color
   */
  const getAccentColorClasses = (
    style: ColorStyle = "soft",
    extra?: string
  ) => {
    return getColorClasses(theme.accentColor, style, extra)
  }

  /**
   * Get background classes using the current accent color
   */
  const getAccentBackgroundClasses = (
    intensity: ColorIntensity = "soft",
    extra?: string
  ) => {
    return getBackgroundColorClasses(theme.accentColor, intensity, extra)
  }

  /**
   * Get border classes using the current accent color
   */
  const getAccentBorderClasses = (extra?: string) => {
    return getBorderColorClasses(theme.accentColor, extra)
  }

  /**
   * Get the current radius class
   */
  const getRadiusClass = () => {
    const radiusMap = {
      none: "rounded-none",
      sm: "rounded-sm",
      md: "rounded-lg",
      lg: "rounded-xl",
      xl: "rounded-2xl",
    }
    return radiusMap[theme.radius]
  }

  /**
   * Get the current elevation class
   */
  const getElevationClass = () => {
    const elevationMap = {
      none: "shadow-none",
      sm: "shadow-sm",
      md: "shadow-md",
      lg: "shadow-lg",
      xl: "shadow-xl",
    }
    return elevationMap[theme.elevation]
  }

  /**
   * Check if the current theme is dark mode
   */
  const isDark = theme.mode === "dark"

  /**
   * Check if the current theme is paper mode
   */
  const isPaper = theme.mode === "paper"

  /**
   * Get base theme classes for paper mode styling
   */
  const getPaperModeClasses = () => {
    if (theme.mode === "paper") {
      return "bg-[#faf9f6] text-gray-900 dark:bg-gray-900 dark:text-gray-100"
    }
    return ""
  }

  return {
    theme,
    getAccentColorClasses,
    getAccentBackgroundClasses,
    getAccentBorderClasses,
    getRadiusClass,
    getElevationClass,
    getPaperModeClasses,
    isDark,
    isPaper,
  }
}
