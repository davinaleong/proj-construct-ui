import { forwardRef } from "react"
import { cn } from "../../../utils/cn.js"
import { useThemeUtils } from "../ThemeProvider/useThemeUtils"
import {
  getBackgroundColorClasses,
  getBorderColorClasses,
} from "../../../utils/colors"
import type { PaperProps } from "./types"

const PADDING_CLASSES = {
  none: "",
  xs: "p-2",
  sm: "p-3",
  md: "p-4",
  lg: "p-6",
  xl: "p-8",
} as const

// Paper theme elevation with tactile hover effects
const ELEVATION_CLASSES = {
  none: "shadow-none",
  sm: "shadow-sm hover:shadow-md active:shadow-inner hover:-translate-y-[1px] transition-all duration-200",
  md: "shadow-md hover:shadow-lg active:shadow-inner hover:-translate-y-[1px] transition-all duration-200",
  lg: "shadow-lg hover:shadow-xl active:shadow-md hover:-translate-y-[1px] transition-all duration-200",
  xl: "shadow-xl hover:shadow-2xl active:shadow-lg hover:-translate-y-[1px] transition-all duration-200",
} as const

// Paper texture using CSS background pattern
const PAPER_TEXTURE = {
  backgroundImage: `
    radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.03) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 40% 40%, rgba(120, 119, 198, 0.02) 0%, transparent 50%)
  `,
}

export const Paper = forwardRef<HTMLElement, PaperProps>(
  (
    {
      variant = "flat",
      padding = "md",
      elevation,
      background = "paper",
      borderColor = "default",
      withTexture = false,
      className,
      children,
      as: Component = "div",
      ...props
    },
    ref
  ) => {
    const { isPaper } = useThemeUtils()

    // Determine elevation class based on variant with paper theme hover effects
    const getVariantElevation = () => {
      if (elevation) {
        return ELEVATION_CLASSES[elevation]
      }

      switch (variant) {
        case "elevated":
          return ELEVATION_CLASSES.sm // Paper theme default elevation
        case "outlined":
        case "flat":
        default:
          return ELEVATION_CLASSES.none
      }
    }

    // Get background classes
    const backgroundClasses = () => {
      if (variant === "outlined") {
        return "bg-transparent"
      }

      if (background === "paper" && isPaper) {
        return "bg-stone-50 dark:bg-gray-900"
      }

      return getBackgroundColorClasses(background, "subtle")
    }

    // Get border classes - using paper theme border
    const borderClasses = () => {
      if (variant === "outlined") {
        return cn("border-2", getBorderColorClasses(borderColor))
      }
      // Default paper theme always has a subtle border
      return cn("border", "border-stone-200/60")
    }

    // Combine all classes using paper theme
    const paperClasses = cn(
      // Base styles
      "relative",

      // Paper theme: always rounded-sm for consistency
      "rounded-sm",

      // Variant-specific styles
      backgroundClasses(),
      borderClasses(),

      // Layout styles
      PADDING_CLASSES[padding],

      // Elevation with paper theme hover effects
      getVariantElevation(),

      // Paper theme backdrop blur for depth
      "backdrop-blur-sm",

      // Paper texture overlay
      withTexture &&
        "before:absolute before:inset-0 before:pointer-events-none before:opacity-20",

      // Custom classes
      className
    )

    const style = withTexture ? PAPER_TEXTURE : undefined

    return (
      <Component ref={ref} className={paperClasses} style={style} {...props}>
        {children}
      </Component>
    )
  }
)

Paper.displayName = "Paper"
