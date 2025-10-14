import type { ReactNode } from "react"

export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl"

export type AvatarVariant = "circular" | "rounded" | "square"

export interface AvatarProps {
  /**
   * Image source URL
   */
  src?: string

  /**
   * Alt text for the image
   */
  alt?: string

  /**
   * Fallback text (usually initials)
   */
  fallback?: string

  /**
   * Avatar size
   */
  size?: AvatarSize

  /**
   * Avatar shape variant
   */
  variant?: AvatarVariant

  /**
   * Additional CSS classes
   */
  className?: string

  /**
   * Click handler
   */
  onClick?: () => void
}

export interface AvatarGroupProps {
  /**
   * Avatar components to display
   */
  children: ReactNode

  /**
   * Maximum number of avatars to show
   */
  max?: number

  /**
   * Size for all avatars in the group
   */
  size?: AvatarSize

  /**
   * Additional CSS classes
   */
  className?: string
}
