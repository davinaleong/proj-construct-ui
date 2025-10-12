import type { ColorVariant, ColorIntensity } from "../../../utils/colors"
import type { ElementType, ReactNode } from "react"

export type TypographyVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "title"
  | "subtitle"
  | "body"
  | "bodyLarge"
  | "bodySmall"
  | "caption"
  | "overline"
  | "code"
  | "pre"

export type TypographyWeight =
  | "thin"
  | "light"
  | "normal"
  | "medium"
  | "semibold"
  | "bold"
  | "extrabold"

export type TypographyAlign = "left" | "center" | "right" | "justify"

export interface TypographyProps {
  /**
   * Typography variant that determines size and styling
   */
  variant?: TypographyVariant

  /**
   * Text color variant
   */
  color?: ColorVariant

  /**
   * Color intensity
   */
  intensity?: ColorIntensity

  /**
   * Font weight
   */
  weight?: TypographyWeight

  /**
   * Text alignment
   */
  align?: TypographyAlign

  /**
   * Whether text should be truncated with ellipsis
   */
  truncate?: boolean

  /**
   * Whether text should wrap or nowrap
   */
  noWrap?: boolean

  /**
   * Maximum number of lines before truncation (requires truncate)
   */
  maxLines?: number

  /**
   * Additional CSS classes
   */
  className?: string

  /**
   * Children content
   */
  children?: ReactNode

  /**
   * HTML element type (auto-determined by variant if not specified)
   */
  as?: ElementType
}
