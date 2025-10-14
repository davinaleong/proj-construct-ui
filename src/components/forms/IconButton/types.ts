import type { LucideIcon } from "lucide-react"
import type { ColorVariant } from "../../../utils/colors"

export type IconButtonVariant = "solid" | "outline" | "ghost"

export type IconButtonSize = "xs" | "sm" | "md" | "lg" | "xl"

export interface IconButtonProps {
  /**
   * Icon to display
   */
  icon: LucideIcon

  /**
   * Accessible label for screen readers
   */
  "aria-label": string

  /**
   * Visual variant
   */
  variant?: IconButtonVariant

  /**
   * Button size
   */
  size?: IconButtonSize

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
