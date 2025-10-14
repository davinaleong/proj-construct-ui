import type { ReactNode } from "react"

export type DividerOrientation = "horizontal" | "vertical"

export type DividerVariant = "solid" | "dashed" | "dotted"

export interface DividerProps {
  /**
   * Text label to display in the divider
   */
  label?: ReactNode

  /**
   * Orientation of the divider
   */
  orientation?: DividerOrientation

  /**
   * Visual variant of the divider line
   */
  variant?: DividerVariant

  /**
   * Additional CSS classes
   */
  className?: string
}
