import type { ReactNode } from "react"

export type DividerOrientation = "horizontal" | "vertical"

export type DividerVariant = "solid" | "dashed" | "dotted" | "gradient" | "fade"

export type DividerSize = "sm" | "md" | "lg"

export type DividerColor =
  | "default"
  | "primary"
  | "secondary"
  | "muted"
  | "accent"

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
   * Size/thickness of the divider
   */
  size?: DividerSize

  /**
   * Color theme of the divider
   */
  color?: DividerColor

  /**
   * Icon to display instead of or alongside label
   */
  icon?: ReactNode

  /**
   * Position of icon relative to label
   */
  iconPosition?: "left" | "right" | "center"

  /**
   * Custom spacing around the divider
   */
  spacing?: "none" | "sm" | "md" | "lg" | "xl"

  /**
   * Whether to show decorative end caps
   */
  decorative?: boolean

  /**
   * Additional CSS classes
   */
  className?: string

  /**
   * Test ID for testing
   */
  "data-testid"?: string
}
