import type { ReactNode, HTMLAttributes } from "react"
import type { ColorVariant } from "../../../utils/colors.js"

export type TableVariant = "default" | "striped" | "bordered" | "compact"
export type TableAlign = "left" | "center" | "right"
export type TableSize = "sm" | "md" | "lg"

export type { ColorVariant }

export interface StaticTableColumn {
  /**
   * Unique key for the column
   */
  key: string

  /**
   * Display label for the column header
   */
  label: string

  /**
   * Text alignment for the column
   * @default "left"
   */
  align?: TableAlign

  /**
   * Width of the column (CSS value)
   */
  width?: string

  /**
   * Whether the column is sortable (visual only)
   * @default false
   */
  sortable?: boolean

  /**
   * Color variant for the entire column
   */
  colorVariant?: ColorVariant

  /**
   * Custom render function for cell content
   */
  render?: (value: unknown, row: StaticTableRow, index: number) => ReactNode
}

export interface StaticTableRow {
  /**
   * Unique identifier for the row
   */
  id: string | number

  /**
   * Color variant for the entire row
   */
  colorVariant?: ColorVariant

  /**
   * Data for each column (key-value pairs)
   */
  [key: string]: unknown
}

export interface StaticTableCell {
  /**
   * Cell content
   */
  content: ReactNode

  /**
   * Color variant for this specific cell (overrides row/column variants)
   */
  colorVariant?: ColorVariant

  /**
   * Custom alignment for this cell
   */
  align?: TableAlign
}

export type StaticTableProps = {
  /**
   * Column definitions
   */
  columns: StaticTableColumn[]

  /**
   * Row data
   */
  rows: StaticTableRow[]

  /**
   * Table visual variant
   * @default "default"
   */
  variant?: TableVariant

  /**
   * Color variant for the entire table
   * @default "default"
   */
  colorVariant?: ColorVariant

  /**
   * Table size
   * @default "md"
   */
  size?: TableSize

  /**
   * Enable zebra striping on rows
   * @default false
   */
  striped?: boolean

  /**
   * Enable hover effects on rows
   * @default true
   */
  hoverable?: boolean

  /**
   * Table caption for accessibility
   */
  caption?: string

  /**
   * Additional CSS classes
   */
  className?: string

  /**
   * Loading state
   * @default false
   */
  loading?: boolean

  /**
   * Empty state content when no rows
   */
  emptyState?: ReactNode
} & HTMLAttributes<HTMLTableElement>
