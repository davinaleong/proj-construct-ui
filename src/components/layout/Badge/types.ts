import type { ReactNode } from "react"
import type { ColorVariant } from "../../../utils/colors"

export type BadgeSize = "xs" | "sm" | "md" | "lg"

export type BadgeVariant = "solid" | "soft" | "outline" | "ghost"

export interface BadgeProps {
  /**
   * Badge content
   */
  children: ReactNode

  /**
   * Color theme
   */
  color?: ColorVariant

  /**
   * Visual variant
   */
  variant?: BadgeVariant

  /**
   * Badge size
   */
  size?: BadgeSize

  /**
   * Additional CSS classes
   */
  className?: string

  /**
   * Click handler
   */
  onClick?: () => void
}
