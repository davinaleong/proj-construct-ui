import type { ReactNode } from "react"
import type { LucideIcon } from "lucide-react"
import type { ColorVariant } from "../../../utils/colors"

export type ButtonVariant = "solid" | "outline" | "ghost" | "link"

export type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl"

export interface ButtonProps {
  /**
   * Button content
   */
  children?: ReactNode

  /**
   * Visual variant
   */
  variant?: ButtonVariant

  /**
   * Button size
   */
  size?: ButtonSize

  /**
   * Color theme
   */
  color?: ColorVariant

  /**
   * Loading state
   */
  loading?: boolean

  /**
   * Disabled state
   */
  disabled?: boolean

  /**
   * Icon to display
   */
  icon?: LucideIcon

  /**
   * Icon position
   */
  iconPosition?: "left" | "right"

  /**
   * Truncate text if too long
   */
  truncate?: boolean

  /**
   * Minimum width for the button
   */
  minWidth?: boolean

  /**
   * Button type
   */
  type?: "button" | "submit" | "reset"

  /**
   * Click handler
   */
  onClick?: () => void

  /**
   * Additional CSS classes
   */
  className?: string
}
