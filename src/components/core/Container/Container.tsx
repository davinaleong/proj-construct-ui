import { forwardRef } from "react"
import clsx from "clsx"
import type { ContainerProps } from "./types"

const MAX_WIDTH_CLASSES = {
  xs: "max-w-xs", // 480px
  sm: "max-w-sm", // 640px
  md: "max-w-md", // 768px
  lg: "max-w-lg", // 1024px
  xl: "max-w-xl", // 1280px
  "2xl": "max-w-2xl", // 1536px
  full: "max-w-full", // 100%
  none: "", // no max-width constraint
} as const

const PADDING_CLASSES = {
  none: "",
  sm: "px-4",
  md: "px-6",
  lg: "px-8",
} as const

export const Container = forwardRef<HTMLElement, ContainerProps>(
  (
    {
      maxWidth = "lg",
      padding = "md",
      center = true,
      gutter = true,
      className,
      children,
      as: Component = "div",
      ...props
    },
    ref
  ) => {
    const containerClasses = clsx(
      // Base styles
      "w-full",

      // Max width
      MAX_WIDTH_CLASSES[maxWidth],

      // Horizontal padding
      PADDING_CLASSES[padding],

      // Mobile gutter (safe area for mobile devices)
      gutter && "px-4 sm:px-6",

      // Centering
      center && "mx-auto",

      // Custom classes
      className
    )

    return (
      <Component ref={ref} className={containerClasses} {...props}>
        {children}
      </Component>
    )
  }
)

Container.displayName = "Container"
