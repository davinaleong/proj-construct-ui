import type { ColorVariant } from "../../../utils/colors"
import type { ThemeElevation } from "../ThemeProvider/types"
import type { ElementType, ReactNode } from "react"

export type PaperVariant = "flat" | "elevated" | "outlined"

export type PaperPadding = "none" | "xs" | "sm" | "md" | "lg" | "xl"

export interface PaperProps {
  /**
   * Visual variant of the paper surface
   */
  variant?: PaperVariant

  /**
   * Internal padding of the paper
   */
  padding?: PaperPadding

  /**
   * Elevation override (defaults to theme elevation for elevated variant)
   */
  elevation?: ThemeElevation

  /**
   * Background color variant
   */
  background?: ColorVariant

  /**
   * Border color variant (for outlined variant)
   */
  borderColor?: ColorVariant

  /**
   * Whether to show subtle paper texture
   */
  withTexture?: boolean

  /**
   * Additional CSS classes
   */
  className?: string

  /**
   * Children content
   */
  children?: ReactNode

  /**
   * HTML element type
   */
  as?: ElementType
}
