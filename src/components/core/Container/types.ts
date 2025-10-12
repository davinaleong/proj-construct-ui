import type { ElementType, ReactNode } from "react"

export type ContainerMaxWidth =
  | "xs" // 480px
  | "sm" // 640px
  | "md" // 768px
  | "lg" // 1024px
  | "xl" // 1280px
  | "2xl" // 1536px
  | "full" // 100%
  | "none" // no max-width

export type ContainerPadding = "none" | "sm" | "md" | "lg"

export interface ContainerProps {
  /**
   * Maximum width of the container
   */
  maxWidth?: ContainerMaxWidth

  /**
   * Horizontal padding
   */
  padding?: ContainerPadding

  /**
   * Whether to center the container
   */
  center?: boolean

  /**
   * Whether to apply consistent gutter padding on mobile
   */
  gutter?: boolean

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
