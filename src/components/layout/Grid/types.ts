import type { ReactNode, ElementType, HTMLAttributes } from "react"

export type GridColumns = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
export type GridGap = "none" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl"
export type GridAlign = "start" | "end" | "center" | "stretch"
export type GridJustify =
  | "start"
  | "end"
  | "center"
  | "between"
  | "around"
  | "evenly"

export interface GridResponsive {
  sm?: GridColumns
  md?: GridColumns
  lg?: GridColumns
  xl?: GridColumns
}

export type GridProps = {
  /**
   * Number of columns - can be a fixed number or responsive object
   * @default 1
   */
  columns?: GridColumns | GridResponsive

  /**
   * Gap between grid items
   * @default "md"
   */
  gap?: GridGap

  /**
   * Vertical alignment of grid items
   * @default "stretch"
   */
  align?: GridAlign

  /**
   * Horizontal distribution of grid items
   * @default "start"
   */
  justify?: GridJustify

  /**
   * Whether to auto-fit columns based on content
   * When true, columns will automatically fit based on minColumnWidth
   * @default false
   */
  autoFit?: boolean

  /**
   * Minimum column width for auto-fit (in rem)
   * Only applies when autoFit is true
   * @default 15
   */
  minColumnWidth?: number

  /**
   * Additional CSS classes
   */
  className?: string

  /**
   * Children content
   */
  children?: ReactNode

  /**
   * HTML element type to render as
   * @default "div"
   */
  as?: ElementType
} & HTMLAttributes<HTMLElement>
