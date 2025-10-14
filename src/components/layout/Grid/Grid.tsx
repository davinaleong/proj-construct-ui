import { forwardRef } from "react"
import { cn } from "../../../utils/cn.js"
import type { GridProps, GridResponsive } from "./types"

// Paper-themed gap classes (following Sample.tsx patterns)
const GAP_CLASSES = {
  none: "gap-0",
  xs: "gap-1",
  sm: "gap-2",
  md: "gap-4",
  lg: "gap-6",
  xl: "gap-8",
  "2xl": "gap-12",
} as const

// Grid columns classes
const COLUMNS_CLASSES = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
  5: "grid-cols-5",
  6: "grid-cols-6",
  7: "grid-cols-7",
  8: "grid-cols-8",
  9: "grid-cols-9",
  10: "grid-cols-10",
  11: "grid-cols-11",
  12: "grid-cols-12",
} as const

// Responsive breakpoint prefixes
const RESPONSIVE_COLUMNS_CLASSES = {
  sm: {
    1: "sm:grid-cols-1",
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-3",
    4: "sm:grid-cols-4",
    5: "sm:grid-cols-5",
    6: "sm:grid-cols-6",
    7: "sm:grid-cols-7",
    8: "sm:grid-cols-8",
    9: "sm:grid-cols-9",
    10: "sm:grid-cols-10",
    11: "sm:grid-cols-11",
    12: "sm:grid-cols-12",
  },
  md: {
    1: "md:grid-cols-1",
    2: "md:grid-cols-2",
    3: "md:grid-cols-3",
    4: "md:grid-cols-4",
    5: "md:grid-cols-5",
    6: "md:grid-cols-6",
    7: "md:grid-cols-7",
    8: "md:grid-cols-8",
    9: "md:grid-cols-9",
    10: "md:grid-cols-10",
    11: "md:grid-cols-11",
    12: "md:grid-cols-12",
  },
  lg: {
    1: "lg:grid-cols-1",
    2: "lg:grid-cols-2",
    3: "lg:grid-cols-3",
    4: "lg:grid-cols-4",
    5: "lg:grid-cols-5",
    6: "lg:grid-cols-6",
    7: "lg:grid-cols-7",
    8: "lg:grid-cols-8",
    9: "lg:grid-cols-9",
    10: "lg:grid-cols-10",
    11: "lg:grid-cols-11",
    12: "lg:grid-cols-12",
  },
  xl: {
    1: "xl:grid-cols-1",
    2: "xl:grid-cols-2",
    3: "xl:grid-cols-3",
    4: "xl:grid-cols-4",
    5: "xl:grid-cols-5",
    6: "xl:grid-cols-6",
    7: "xl:grid-cols-7",
    8: "xl:grid-cols-8",
    9: "xl:grid-cols-9",
    10: "xl:grid-cols-10",
    11: "xl:grid-cols-11",
    12: "xl:grid-cols-12",
  },
} as const

const ALIGN_CLASSES = {
  start: "items-start",
  end: "items-end",
  center: "items-center",
  stretch: "items-stretch",
} as const

const JUSTIFY_CLASSES = {
  start: "justify-start",
  end: "justify-end",
  center: "justify-center",
  between: "justify-between",
  around: "justify-around",
  evenly: "justify-evenly",
} as const

export const Grid = forwardRef<HTMLElement, GridProps>(
  (
    {
      columns = 1,
      gap = "md",
      align = "stretch",
      justify = "start",
      autoFit = false,
      minColumnWidth = 15, // 15rem default
      className,
      children,
      as: Component = "div",
      ...props
    },
    ref
  ) => {
    // Build column classes
    const getColumnClasses = () => {
      if (autoFit) {
        return "" // Will use custom CSS for auto-fit
      }

      if (typeof columns === "number") {
        return COLUMNS_CLASSES[columns]
      }

      // Handle responsive columns
      const responsiveColumns = columns as GridResponsive
      const classes = []

      // Default columns (mobile-first)
      if (responsiveColumns.sm) {
        classes.push(COLUMNS_CLASSES[1]) // Default to 1 column on mobile
      }

      // Responsive breakpoints
      Object.entries(responsiveColumns).forEach(([breakpoint, cols]) => {
        if (cols && breakpoint in RESPONSIVE_COLUMNS_CLASSES) {
          const bp = breakpoint as keyof typeof RESPONSIVE_COLUMNS_CLASSES
          const responsiveClassMap = RESPONSIVE_COLUMNS_CLASSES[bp]
          classes.push(
            responsiveClassMap[cols as keyof typeof responsiveClassMap]
          )
        }
      })

      return classes.join(" ")
    }

    // Custom style for auto-fit
    const autoFitStyle = autoFit
      ? {
          gridTemplateColumns: `repeat(auto-fit, minmax(${minColumnWidth}rem, 1fr))`,
        }
      : undefined

    const gridClasses = cn(
      // Base grid styles
      "grid",

      // Column configuration
      getColumnClasses(),

      // Gap (paper-themed spacing)
      GAP_CLASSES[gap],

      // Alignment
      ALIGN_CLASSES[align],

      // Justification
      JUSTIFY_CLASSES[justify],

      // Custom classes
      className
    )

    return (
      <Component
        ref={ref}
        className={gridClasses}
        style={autoFitStyle}
        {...props}
      >
        {children}
      </Component>
    )
  }
)

Grid.displayName = "Grid"
