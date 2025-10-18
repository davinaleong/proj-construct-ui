import type { ReactNode, HTMLAttributes, MouseEvent } from "react"
import type { ColorVariant } from "../../../utils/colors.js"

export type TableAlign = "left" | "center" | "right"
export type SortDirection = "asc" | "desc" | null
export type FilterType = "text" | "number" | "date" | "select" | "boolean"
export type EditingType =
  | "text"
  | "number"
  | "email"
  | "select"
  | "textarea"
  | "boolean"

export interface TableColumn<T = unknown> {
  /**
   * Unique identifier for the column
   */
  id: string

  /**
   * Key to access data in row object
   */
  accessor: keyof T | string

  /**
   * Display header text
   */
  header: string

  /**
   * Column width (CSS value)
   */
  width?: string

  /**
   * Minimum width for resizing
   */
  minWidth?: number

  /**
   * Maximum width for resizing
   */
  maxWidth?: number

  /**
   * Text alignment
   * @default "left"
   */
  align?: TableAlign

  /**
   * Enable sorting for this column
   * @default false
   */
  sortable?: boolean

  /**
   * Enable filtering for this column
   * @default false
   */
  filterable?: boolean

  /**
   * Filter type for this column
   * @default "text"
   */
  filterType?: FilterType

  /**
   * Options for select filter type
   */
  filterOptions?: Array<{ label: string; value: unknown }>

  /**
   * Enable column resizing
   * @default false
   */
  resizable?: boolean

  /**
   * Enable column reordering
   * @default false
   */
  reorderable?: boolean

  /**
   * Enable editing for this column
   * @default false
   */
  editable?: boolean

  /**
   * Editing input type
   * @default "text"
   */
  editingType?: EditingType

  /**
   * Options for select editing type
   */
  editingOptions?: Array<{ label: string; value: unknown }>

  /**
   * Validation function for edited values
   */
  validate?: (value: unknown) => boolean | string

  /**
   * Hide column by default
   * @default false
   */
  hidden?: boolean

  /**
   * Pin column to left or right
   */
  pinned?: "left" | "right"

  /**
   * Color variant for column header
   */
  colorVariant?: ColorVariant

  /**
   * Custom cell renderer
   */
  cell?: (props: {
    value: unknown
    row: TableRow<T>
    rowIndex: number
    column: TableColumn<T>
  }) => ReactNode

  /**
   * Custom header renderer
   */
  headerCell?: (props: {
    column: TableColumn<T>
    sortDirection?: SortDirection
    onSort?: () => void
  }) => ReactNode

  /**
   * Footer cell content or renderer
   */
  footer?: ReactNode | ((column: TableColumn<T>) => ReactNode)
}

export interface TableFilter {
  /**
   * Column ID to filter
   */
  columnId: string

  /**
   * Filter value
   */
  value: unknown

  /**
   * Filter operator
   */
  operator?:
    | "equals"
    | "contains"
    | "startsWith"
    | "endsWith"
    | "gt"
    | "gte"
    | "lt"
    | "lte"
}

export interface TableSort {
  /**
   * Column ID to sort by
   */
  columnId: string

  /**
   * Sort direction
   */
  direction: "asc" | "desc"
}

export interface TablePagination {
  /**
   * Current page (0-based)
   */
  pageIndex: number

  /**
   * Number of rows per page
   */
  pageSize: number

  /**
   * Total number of rows
   */
  totalRows?: number
}

export interface TableSelection {
  /**
   * Selected row IDs
   */
  selectedRowIds: Set<string | number>

  /**
   * All rows selected
   */
  isAllSelected: boolean

  /**
   * Some rows selected (indeterminate state)
   */
  isSomeSelected: boolean
}

export interface TableState<T = unknown> {
  /**
   * Current sorting state
   */
  sorting: TableSort[]

  /**
   * Current filters
   */
  filters: TableFilter[]

  /**
   * Global search value
   */
  globalFilter?: string

  /**
   * Current pagination state
   */
  pagination?: TablePagination

  /**
   * Current selection state
   */
  selection?: TableSelection

  /**
   * Column visibility and order
   */
  columnVisibility: Record<string, boolean>

  /**
   * Column order
   */
  columnOrder: string[]

  /**
   * Column widths
   */
  columnWidths: Record<string, number>

  /**
   * Expanded rows (for row expansion feature)
   */
  expandedRows: Set<string | number>

  /**
   * Grouped columns
   */
  grouping: string[]

  /**
   * Currently editing rows (row ID -> edited data)
   */
  editingRows: Record<string | number, Partial<T>>
}

export interface TableRow<T = unknown> {
  /**
   * Unique identifier
   */
  id: string | number

  /**
   * Row data
   */
  original: T

  /**
   * Row index in current page/view
   */
  index: number

  /**
   * Whether row is selected
   */
  isSelected?: boolean

  /**
   * Whether row is expanded (for expandable rows)
   */
  isExpanded?: boolean

  /**
   * Color variant for entire row
   */
  colorVariant?: ColorVariant

  /**
   * Whether row is disabled
   */
  disabled?: boolean

  /**
   * Sub-rows for grouping/nesting
   */
  subRows?: TableRow<T>[]

  /**
   * Row expansion content
   */
  expansion?: ReactNode
}

export interface TableOptions {
  /**
   * Enable multi-row selection
   * @default false
   */
  enableSelection?: boolean

  /**
   * Enable single row selection
   * @default false
   */
  enableSingleSelection?: boolean

  /**
   * Enable sorting
   * @default true
   */
  enableSorting?: boolean

  /**
   * Enable multi-column sorting
   * @default false
   */
  enableMultiSort?: boolean

  /**
   * Enable filtering
   * @default true
   */
  enableFiltering?: boolean

  /**
   * Enable global search
   * @default false
   */
  enableGlobalSearch?: boolean

  /**
   * Search placeholder text
   * @default "Search..."
   */
  searchPlaceholder?: string

  /**
   * Enable pagination
   * @default false
   */
  enablePagination?: boolean

  /**
   * Enable column resizing
   * @default false
   */
  enableColumnResizing?: boolean

  /**
   * Enable column reordering
   * @default false
   */
  enableColumnReordering?: boolean

  /**
   * Enable row expansion
   * @default false
   */
  enableExpanding?: boolean

  /**
   * Enable inline editing
   * @default false
   */
  enableEditing?: boolean

  /**
   * Enable grouping
   * @default false
   */
  enableGrouping?: boolean

  /**
   * Enable virtual scrolling
   * @default false
   */
  enableVirtualization?: boolean

  /**
   * Row height for virtualization
   */
  rowHeight?: number

  /**
   * Manual pagination (server-side)
   * @default false
   */
  manualPagination?: boolean

  /**
   * Manual sorting (server-side)
   * @default false
   */
  manualSorting?: boolean

  /**
   * Manual filtering (server-side)
   * @default false
   */
  manualFiltering?: boolean

  /**
   * Default page size
   * @default 10
   */
  defaultPageSize?: number

  /**
   * Page size options
   */
  pageSizeOptions?: number[]

  /**
   * Auto-reset page to 0 when data changes
   * @default true
   */
  autoResetPageIndex?: boolean

  /**
   * Loading state
   * @default false
   */
  loading?: boolean

  /**
   * Error state
   */
  error?: Error | string

  /**
   * Empty state message
   */
  emptyMessage?: string

  /**
   * Global filter value
   */
  globalFilter?: string
}

export interface TableCallbacks<T = unknown> {
  /**
   * Called when sorting changes
   */
  onSortingChange?: (sorting: TableSort[]) => void

  /**
   * Called when filters change
   */
  onFiltersChange?: (filters: TableFilter[]) => void

  /**
   * Called when pagination changes
   */
  onPaginationChange?: (pagination: TablePagination) => void

  /**
   * Called when selection changes
   */
  onSelectionChange?: (selection: TableSelection) => void

  /**
   * Called when row is clicked
   */
  onRowClick?: (row: TableRow<T>, event: MouseEvent) => void

  /**
   * Called when row is double-clicked
   */
  onRowDoubleClick?: (row: TableRow<T>, event: MouseEvent) => void

  /**
   * Called when cell is clicked
   */
  onCellClick?: (
    cell: unknown,
    row: TableRow<T>,
    column: TableColumn<T>,
    event: MouseEvent
  ) => void

  /**
   * Called when column is reordered
   */
  onColumnReorder?: (columnOrder: string[]) => void

  /**
   * Called when column is resized
   */
  onColumnResize?: (columnId: string, width: number) => void

  /**
   * Called when row expansion changes
   */
  onExpandedChange?: (expandedRows: Set<string | number>) => void

  /**
   * Called when global filter changes
   */
  onGlobalFilterChange?: (value: string) => void

  /**
   * Called when a row starts being edited
   */
  onEditStart?: (rowId: string | number, rowData: T) => void

  /**
   * Called when row edits are saved
   */
  onEditSave?: (rowId: string | number, oldData: T, newData: Partial<T>) => void

  /**
   * Called when row edits are cancelled
   */
  onEditCancel?: (rowId: string | number, rowData: T) => void
}

export type TableProps<T = unknown> = {
  /**
   * Column definitions
   */
  columns: TableColumn<T>[]

  /**
   * Row data
   */
  data: T[]

  /**
   * Row ID accessor function
   */
  getRowId?: (row: T, index: number) => string | number

  /**
   * Table options
   */
  options?: TableOptions

  /**
   * Event callbacks
   */
  callbacks?: TableCallbacks<T>

  /**
   * Initial table state
   */
  initialState?: Partial<TableState<T>>

  /**
   * Controlled state
   */
  state?: Partial<TableState<T>>

  /**
   * Color variant for entire table
   */
  colorVariant?: ColorVariant

  /**
   * Table size
   */
  size?: "sm" | "md" | "lg"

  /**
   * Enable striped rows
   * @default false
   */
  striped?: boolean

  /**
   * Enable hover effects
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
   * Custom toolbar component
   */
  toolbar?: ReactNode

  /**
   * Custom footer component
   */
  footer?: ReactNode
} & HTMLAttributes<HTMLDivElement>

export interface UseTableReturn<T = unknown> {
  /**
   * Processed table rows
   */
  rows: TableRow<T>[]

  /**
   * Processed table columns
   */
  columns: TableColumn<T>[]

  /**
   * Current table state
   */
  state: TableState<T>

  /**
   * Table actions
   */
  actions: {
    setSort: (sorting: TableSort[]) => void
    setFilters: (filters: TableFilter[]) => void
    setGlobalFilter: (value: string) => void
    setPagination: (pagination: Partial<TablePagination>) => void
    setSelection: (selection: Partial<TableSelection>) => void
    toggleRowSelection: (rowId: string | number) => void
    toggleAllRowsSelection: () => void
    setColumnVisibility: (columnId: string, visible: boolean) => void
    setColumnOrder: (order: string[]) => void
    setColumnWidth: (columnId: string, width: number) => void
    toggleRowExpansion: (rowId: string | number) => void
    setGrouping: (grouping: string[]) => void
    startEditing: (rowId: string | number) => void
    saveEditing: (rowId: string | number) => void
    cancelEditing: (rowId: string | number) => void
    updateEditingCell: (
      rowId: string | number,
      columnId: string,
      value: unknown
    ) => void
    reset: () => void
  }

  /**
   * Table meta information
   */
  meta: {
    totalRows: number
    totalPages: number
    hasNextPage: boolean
    hasPreviousPage: boolean
    isLoading: boolean
    error?: Error | string
  }
}
