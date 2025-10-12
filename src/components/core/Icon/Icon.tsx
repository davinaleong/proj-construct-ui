import { forwardRef } from "react"
import clsx from "clsx"
import { getTextColorClasses } from "../../../utils/colors"
import type { IconProps } from "./types"

const SIZE_CLASSES = {
  xs: "w-3 h-3", // 12px
  sm: "w-4 h-4", // 16px
  md: "w-5 h-5", // 20px
  lg: "w-6 h-6", // 24px
  xl: "w-8 h-8", // 32px
  "2xl": "w-10 h-10", // 40px
} as const

export const Icon = forwardRef<SVGSVGElement, IconProps>(
  (
    {
      icon: IconComponent,
      size = "md",
      customSize,
      color = "default",
      intensity = "bold",
      "aria-label": ariaLabel,
      decorative = false,
      strokeWidth = 2,
      className,
      onClick,
      ...props
    },
    ref
  ) => {
    // Get color classes
    const colorClasses = getTextColorClasses(color, intensity)

    // Determine size
    const sizeClasses = customSize ? "" : SIZE_CLASSES[size]
    const customSizeStyle = customSize
      ? {
          width: `${customSize}px`,
          height: `${customSize}px`,
        }
      : undefined

    // Build classes
    const iconClasses = clsx(
      // Base styles
      "inline-block",
      "flex-shrink-0",

      // Size
      sizeClasses,

      // Color
      colorClasses,

      // Interactive styles
      onClick && [
        "cursor-pointer",
        "transition-colors duration-200",
        "hover:opacity-75",
      ],

      // Custom classes
      className
    )

    // Accessibility props
    const accessibilityProps = decorative
      ? { "aria-hidden": true }
      : {
          "aria-label": ariaLabel,
          role: onClick ? "button" : "img",
        }

    return (
      <IconComponent
        ref={ref}
        className={iconClasses}
        style={customSizeStyle}
        strokeWidth={strokeWidth}
        onClick={onClick}
        {...accessibilityProps}
        {...props}
      />
    )
  }
)

Icon.displayName = "Icon"
