import type { LucideIcon } from "lucide-react"
import type { ColorVariant, ColorIntensity } from "../../../utils/colors"

export type IconSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl"

export interface IconProps {
  /**
   * Lucide icon component
   */
  icon: LucideIcon

  /**
   * Icon size
   */
  size?: IconSize

  /**
   * Custom size in pixels (overrides size prop)
   */
  customSize?: number

  /**
   * Icon color variant
   */
  color?: ColorVariant

  /**
   * Color intensity
   */
  intensity?: ColorIntensity

  /**
   * Accessible label for screen readers
   */
  "aria-label"?: string

  /**
   * Whether icon is decorative (hidden from screen readers)
   */
  decorative?: boolean

  /**
   * Stroke width (1-3, defaults to 2)
   */
  strokeWidth?: number

  /**
   * Additional CSS classes
   */
  className?: string

  /**
   * Click handler
   */
  onClick?: () => void
}
