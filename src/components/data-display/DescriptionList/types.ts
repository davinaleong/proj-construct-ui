import type { ReactNode, HTMLAttributes } from "react"
import type { ColorVariant } from "../../../utils/colors.js"

export type DescriptionListLayout = "horizontal" | "vertical"
export type DescriptionListSize = "sm" | "md" | "lg"

export interface DescriptionListItem {
  /**
   * Unique identifier for the item
   */
  id?: string

  /**
   * The term/label for this item
   */
  term: ReactNode

  /**
   * The description/value for this item
   */
  description: ReactNode

  /**
   * Color variant for this specific item
   */
  colorVariant?: ColorVariant

  /**
   * Custom class name for this item
   */
  className?: string
}

export interface DescriptionListProps
  extends Omit<HTMLAttributes<HTMLDListElement>, "children"> {
  /**
   * Array of description list items
   */
  items: DescriptionListItem[]

  /**
   * Layout orientation
   * @default "vertical"
   */
  layout?: DescriptionListLayout

  /**
   * Size variant
   * @default "md"
   */
  size?: DescriptionListSize

  /**
   * Color variant for the entire list
   * @default "default"
   */
  colorVariant?: ColorVariant

  /**
   * Whether to add borders between items
   * @default false
   */
  bordered?: boolean

  /**
   * Whether to add striped background
   * @default false
   */
  striped?: boolean

  /**
   * Custom spacing between term and description in horizontal layout
   */
  termWidth?: string

  /**
   * Custom render function for terms
   */
  renderTerm?: (
    term: ReactNode,
    item: DescriptionListItem,
    index: number
  ) => ReactNode

  /**
   * Custom render function for descriptions
   */
  renderDescription?: (
    description: ReactNode,
    item: DescriptionListItem,
    index: number
  ) => ReactNode
}
