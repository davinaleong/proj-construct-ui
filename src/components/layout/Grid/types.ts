import type { ReactNode, ElementType } from "react"

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

export interface GridProps {
  /**
   * Number of columns
   */
  columns?: GridColumns | GridResponsive

  /**
   * Gap between grid items
   */
  gap?: GridGap

  /**
   * Vertical alignment of grid items
   */
  align?: GridAlign

  /**
   * Horizontal distribution of grid items
   */
  justify?: GridJustify

  /**
   * Whether to auto-fit columns based on content
   */
  autoFit?: boolean

  /**
   * Minimum column width for auto-fit (in rem)
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
   * HTML element type
   */
  as?: ElementType
}
