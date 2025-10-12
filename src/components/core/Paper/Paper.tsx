import { forwardRef } from "react"
import clsx from "clsx"
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
      radius,
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
    const { getRadiusClass, getElevationClass, isPaper } = useThemeUtils()

    // Determine radius class
    const radiusClass = radius ? RADIUS_CLASSES[radius] : getRadiusClass()

    // Determine elevation class based on variant
    const getVariantElevation = () => {
      if (elevation) {
        return ELEVATION_CLASSES[elevation]
      }

      switch (variant) {
        case "elevated":
          return getElevationClass()
        case "outlined":
        case "flat":
        default:
          return "shadow-none"
      }
    }

    // Get background classes
    const backgroundClasses = () => {
      if (variant === "outlined") {
        return "bg-transparent"
      }

      if (background === "paper" && isPaper) {
        return "bg-[#faf9f6] dark:bg-gray-900"
      }

      return getBackgroundColorClasses(background, "subtle")
    }

    // Get border classes
    const borderClasses = () => {
      if (variant === "outlined") {
        return clsx("border", getBorderColorClasses(borderColor))
      }
      return ""
    }

    // Combine all classes
    const paperClasses = clsx(
      // Base styles
      "relative",
      "transition-all duration-200",

      // Variant-specific styles
      backgroundClasses(),
      borderClasses(),

      // Layout styles
      PADDING_CLASSES[padding],
      radiusClass,
      getVariantElevation(),

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
