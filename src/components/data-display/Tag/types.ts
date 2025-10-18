import type { ReactNode, HTMLAttributes, MouseEvent } from "react"
import type { ColorVariant } from "../../../utils/colors.js"

export type TagSize = "xs" | "sm" | "md" | "lg"
export type TagVariant = "solid" | "soft" | "outline" | "ghost"

export interface TagProps
  extends Omit<HTMLAttributes<HTMLSpanElement>, "size"> {
  /**
   * The content to display inside the tag
   */
  children: ReactNode

  /**
   * Size variant of the tag
   * @default "md"
   */
  size?: TagSize

  /**
   * Visual variant of the tag
   * @default "soft"
   */
  variant?: TagVariant

  /**
   * Color variant of the tag
   * @default "default"
   */
  colorVariant?: ColorVariant

  /**
   * Whether the tag can be dismissed/removed
   * @default false
   */
  dismissible?: boolean

  /**
   * Icon to display before the content
   */
  startIcon?: ReactNode

  /**
   * Icon to display after the content
   */
  endIcon?: ReactNode

  /**
   * Whether the tag is disabled
   * @default false
   */
  disabled?: boolean

  /**
   * Whether the tag is clickable (adds hover effects)
   * @default false
   */
  clickable?: boolean

  /**
   * Callback function when the tag is dismissed
   */
  onDismiss?: (event: MouseEvent<HTMLButtonElement>) => void

  /**
   * Custom dismiss icon
   */
  dismissIcon?: ReactNode

  /**
   * Whether to show a dot indicator
   * @default false
   */
  dot?: boolean

  /**
   * Whether the tag should have rounded corners
   * @default true
   */
  rounded?: boolean

  /**
   * Maximum width for the tag content (truncates with ellipsis)
   */
  maxWidth?: string

  /**
   * Custom class name for the tag
   */
  className?: string
}
