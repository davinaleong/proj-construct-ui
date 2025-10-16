export interface FloatingNavbarItem {
  id: string
  label: string
  href: string
}

export type FloatingNavbarPosition =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"

export interface FloatingNavbarProps {
  /**
   * Array of navigation items
   */
  items: FloatingNavbarItem[]

  /**
   * Position of the floating navbar on screen
   * @default "top-right"
   */
  position?: FloatingNavbarPosition

  /**
   * Offset from the edge of the screen in pixels
   * Can be a number for uniform offset or an object for individual x/y control
   * @default 20
   */
  offset?: number | { x?: number; y?: number }

  /**
   * Whether to show the navbar initially
   * @default true
   */
  visible?: boolean

  /**
   * Custom class name for the navbar container
   */
  className?: string

  /**
   * Callback when an item is clicked
   */
  onItemClick?: (item: FloatingNavbarItem) => void
}
