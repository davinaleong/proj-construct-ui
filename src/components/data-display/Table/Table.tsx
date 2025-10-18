import { forwardRef, useMemo } from "react"
import { Search, X } from "lucide-react"
import { cn } from "../../../utils/cn.js"
import {
  getColorClasses,
  type ColorVariant as UtilsColorVariant,
} from "../../../utils/colors.js"
import { useTable } from "./useTable.js"
import type { TableProps, TableColumn, TableRow } from "./types"

// Table header component
interface TableHeaderProps<T extends Record<string, unknown>> {
  column: TableColumn<T>
  onSort?: (columnId: string) => void
  sortDirection?: "asc" | "desc" | null
  colorVariant?: string
  size: "sm" | "md" | "lg"
}

function TableHeader<T extends Record<string, unknown>>({
  column,
  onSort,
  sortDirection,
  colorVariant = "default",
  size,
}: TableHeaderProps<T>) {
  const sizeClasses = {
    sm: "px-2 py-2 text-sm font-medium",
    md: "px-3 py-3 text-sm font-medium",
    lg: "px-4 py-4 text-base font-medium",
  }

  const handleSort = () => {
    if (column.sortable && onSort) {
      onSort(column.id)
    }
  }

  const headerClasses = cn(
    sizeClasses[size],
    "text-left border-b border-stone-200",
    column.sortable && "cursor-pointer hover:bg-stone-50",
    getTableHeaderClasses(colorVariant as UtilsColorVariant)
  )

  if (column.headerCell) {
    return (
      <th className={headerClasses} style={{ width: column.width }}>
        {column.headerCell({ column, sortDirection, onSort: handleSort })}
      </th>
    )
  }

  return (
    <th
      className={headerClasses}
      style={{ width: column.width }}
      onClick={handleSort}
    >
      <div className="flex items-center gap-2">
        <span>{column.header}</span>
        {column.sortable && (
          <div className="flex flex-col">
            {sortDirection === null && (
              <svg
                className="w-3 h-3 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M5 8l5-5 5 5H5zM5 12l5 5 5-5H5z" />
              </svg>
            )}
            {sortDirection === "asc" && (
              <svg
                className="w-3 h-3 text-gray-700"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M5 8l5-5 5 5H5z" />
              </svg>
            )}
            {sortDirection === "desc" && (
              <svg
                className="w-3 h-3 text-gray-700"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M5 12l5 5 5-5H5z" />
              </svg>
            )}
          </div>
        )}
      </div>
    </th>
  )
}

// Table cell component
interface TableCellProps<T extends Record<string, unknown>> {
  row: TableRow<T>
  column: TableColumn<T>
  value: unknown
  colorVariant?: string
  size: "sm" | "md" | "lg"
}

function TableCell<T extends Record<string, unknown>>({
  row,
  column,
  value,
  colorVariant = "default",
  size,
}: TableCellProps<T>) {
  const sizeClasses = {
    sm: "px-2 py-1 text-sm",
    md: "px-3 py-2 text-sm",
    lg: "px-4 py-3 text-base",
  }

  const alignClasses = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  }

  const cellClasses = cn(
    sizeClasses[size],
    alignClasses[column.align || "left"],
    "border-r border-stone-100 last:border-r-0",
    getTableCellClasses(colorVariant as UtilsColorVariant)
  )

  if (column.cell) {
    return (
      <td className={cellClasses}>
        {column.cell({ value, row, rowIndex: row.index, column })}
      </td>
    )
  }

  return <td className={cellClasses}>{String(value ?? "")}</td>
}

// Helper functions for color classes (reusing logic from StaticTable)
const getTableHeaderClasses = (variant: UtilsColorVariant = "default") => {
  const colorMapping: Record<UtilsColorVariant, string> = {
    primary: "bg-blue-100 text-blue-800 font-medium",
    secondary: "bg-slate-100 text-slate-800 font-medium",
    danger: "bg-red-100 text-red-800 font-medium",
    success: "bg-green-100 text-green-800 font-medium",
    warning: "bg-yellow-100 text-yellow-800 font-medium",
    info: "bg-sky-100 text-sky-800 font-medium",
    default: "bg-stone-100 text-stone-800 font-medium",
    paper: "bg-stone-100 text-stone-800 font-medium",
    muted: "bg-gray-100 text-gray-800 font-medium",
    accent: "bg-teal-100 text-teal-800 font-medium",
    transparent: "bg-transparent text-gray-800 font-medium",
    custom: "font-medium",
    slate: "bg-slate-100 text-slate-800 font-medium",
    gray: "bg-gray-100 text-gray-800 font-medium",
    zinc: "bg-zinc-100 text-zinc-800 font-medium",
    neutral: "bg-neutral-100 text-neutral-800 font-medium",
    stone: "bg-stone-100 text-stone-800 font-medium",
    red: "bg-red-100 text-red-800 font-medium",
    orange: "bg-orange-100 text-orange-800 font-medium",
    amber: "bg-amber-100 text-amber-800 font-medium",
    yellow: "bg-yellow-100 text-yellow-800 font-medium",
    lime: "bg-lime-100 text-lime-800 font-medium",
    green: "bg-green-100 text-green-800 font-medium",
    emerald: "bg-emerald-100 text-emerald-800 font-medium",
    teal: "bg-teal-100 text-teal-800 font-medium",
    cyan: "bg-cyan-100 text-cyan-800 font-medium",
    sky: "bg-sky-100 text-sky-800 font-medium",
    blue: "bg-blue-100 text-blue-800 font-medium",
    indigo: "bg-indigo-100 text-indigo-800 font-medium",
    violet: "bg-violet-100 text-violet-800 font-medium",
    purple: "bg-purple-100 text-purple-800 font-medium",
    fuchsia: "bg-fuchsia-100 text-fuchsia-800 font-medium",
    pink: "bg-pink-100 text-pink-800 font-medium",
    rose: "bg-rose-100 text-rose-800 font-medium",
  }

  return colorMapping[variant] || colorMapping.default
}

const getTableCellClasses = (variant: UtilsColorVariant = "default") => {
  const colorMapping: Record<UtilsColorVariant, string> = {
    primary: "text-blue-900",
    secondary: "text-slate-900",
    danger: "text-red-900",
    success: "text-green-900",
    warning: "text-yellow-900",
    info: "text-sky-900",
    default: "text-stone-900",
    paper: "text-stone-900",
    muted: "text-gray-600",
    accent: "text-teal-900",
    transparent: "text-gray-900",
    custom: "",
    slate: "text-slate-900",
    gray: "text-gray-900",
    zinc: "text-zinc-900",
    neutral: "text-neutral-900",
    stone: "text-stone-900",
    red: "text-red-900",
    orange: "text-orange-900",
    amber: "text-amber-900",
    yellow: "text-yellow-900",
    lime: "text-lime-900",
    green: "text-green-900",
    emerald: "text-emerald-900",
    teal: "text-teal-900",
    cyan: "text-cyan-900",
    sky: "text-sky-900",
    blue: "text-blue-900",
    indigo: "text-indigo-900",
    violet: "text-violet-900",
    purple: "text-purple-900",
    fuchsia: "text-fuchsia-900",
    pink: "text-pink-900",
    rose: "text-rose-900",
  }

  return colorMapping[variant] || colorMapping.default
}

const getWholeTableClasses = (variant: UtilsColorVariant = "default") => {
  const colorMapping: Record<UtilsColorVariant, string> = {
    primary: "border border-blue-200 bg-blue-50/90 backdrop-blur-sm rounded-lg",
    secondary:
      "border border-slate-200 bg-slate-50/90 backdrop-blur-sm rounded-lg",
    danger: "border border-red-200 bg-red-50/90 backdrop-blur-sm rounded-lg",
    success:
      "border border-green-200 bg-green-50/90 backdrop-blur-sm rounded-lg",
    warning:
      "border border-yellow-200 bg-yellow-50/90 backdrop-blur-sm rounded-lg",
    info: "border border-sky-200 bg-sky-50/90 backdrop-blur-sm rounded-lg",
    default:
      "border border-stone-200 bg-stone-50/90 backdrop-blur-sm rounded-lg",
    paper: "border border-stone-200 bg-stone-50/90 backdrop-blur-sm rounded-lg",
    muted: "border border-gray-200 bg-gray-50/90 backdrop-blur-sm rounded-lg",
    accent: "border border-teal-200 bg-teal-50/90 backdrop-blur-sm rounded-lg",
    transparent:
      "border border-gray-200 bg-white/90 backdrop-blur-sm rounded-lg",
    custom: "backdrop-blur-sm rounded-lg",
    slate: "border border-slate-200 bg-slate-50/90 backdrop-blur-sm rounded-lg",
    gray: "border border-gray-200 bg-gray-50/90 backdrop-blur-sm rounded-lg",
    zinc: "border border-zinc-200 bg-zinc-50/90 backdrop-blur-sm rounded-lg",
    neutral:
      "border border-neutral-200 bg-neutral-50/90 backdrop-blur-sm rounded-lg",
    stone: "border border-stone-200 bg-stone-50/90 backdrop-blur-sm rounded-lg",
    red: "border border-red-200 bg-red-50/90 backdrop-blur-sm rounded-lg",
    orange:
      "border border-orange-200 bg-orange-50/90 backdrop-blur-sm rounded-lg",
    amber: "border border-amber-200 bg-amber-50/90 backdrop-blur-sm rounded-lg",
    yellow:
      "border border-yellow-200 bg-yellow-50/90 backdrop-blur-sm rounded-lg",
    lime: "border border-lime-200 bg-lime-50/90 backdrop-blur-sm rounded-lg",
    green: "border border-green-200 bg-green-50/90 backdrop-blur-sm rounded-lg",
    emerald:
      "border border-emerald-200 bg-emerald-50/90 backdrop-blur-sm rounded-lg",
    teal: "border border-teal-200 bg-teal-50/90 backdrop-blur-sm rounded-lg",
    cyan: "border border-cyan-200 bg-cyan-50/90 backdrop-blur-sm rounded-lg",
    sky: "border border-sky-200 bg-sky-50/90 backdrop-blur-sm rounded-lg",
    blue: "border border-blue-200 bg-blue-50/90 backdrop-blur-sm rounded-lg",
    indigo:
      "border border-indigo-200 bg-indigo-50/90 backdrop-blur-sm rounded-lg",
    violet:
      "border border-violet-200 bg-violet-50/90 backdrop-blur-sm rounded-lg",
    purple:
      "border border-purple-200 bg-purple-50/90 backdrop-blur-sm rounded-lg",
    fuchsia:
      "border border-fuchsia-200 bg-fuchsia-50/90 backdrop-blur-sm rounded-lg",
    pink: "border border-pink-200 bg-pink-50/90 backdrop-blur-sm rounded-lg",
    rose: "border border-rose-200 bg-rose-50/90 backdrop-blur-sm rounded-lg",
  }

  return colorMapping[variant] || colorMapping.default
}

export const Table = forwardRef<HTMLDivElement, TableProps>(
  (
    {
      columns,
      data,
      getRowId,
      options = {},
      callbacks = {},
      initialState = {},
      state: controlledState,
      colorVariant = "default",
      size = "md",
      striped = false,
      hoverable = true,
      caption,
      className,
      toolbar,
      footer,
      ...props
    },
    ref
  ) => {
    const table = useTable(columns, data, options, initialState)

    // Handle controlled state
    const currentState = controlledState
      ? { ...table.state, ...controlledState }
      : table.state

    // Handle sorting
    const handleSort = (columnId: string) => {
      const currentSort = currentState.sorting.find(
        (s) => s.columnId === columnId
      )
      let newSorting = currentState.sorting.filter(
        (s) => s.columnId !== columnId
      )

      if (!currentSort) {
        newSorting = [...newSorting, { columnId, direction: "asc" as const }]
      } else if (currentSort.direction === "asc") {
        newSorting = [...newSorting, { columnId, direction: "desc" as const }]
      }
      // If desc, remove from sorting (third click removes sort)

      table.actions.setSort(newSorting)
      callbacks.onSortingChange?.(newSorting)
    }

    // Loading state
    if (table.meta.isLoading) {
      return (
        <div
          ref={ref}
          className={cn("flex items-center justify-center p-8", className)}
          {...props}
        >
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-stone-600"></div>
          <span className="ml-2 text-stone-600">Loading...</span>
        </div>
      )
    }

    // Error state
    if (table.meta.error) {
      return (
        <div
          ref={ref}
          className={cn("flex items-center justify-center p-8", className)}
          {...props}
        >
          <div className="text-center text-red-500">
            <p className="text-lg font-medium">Error loading data</p>
            <p className="text-sm">{String(table.meta.error)}</p>
          </div>
        </div>
      )
    }

    // Empty state
    if (table.rows.length === 0) {
      return (
        <div
          ref={ref}
          className={cn("flex items-center justify-center p-8", className)}
          {...props}
        >
          <div className="text-center text-stone-500">
            <p className="text-lg font-medium">No data available</p>
            <p className="text-sm">There are no rows to display</p>
          </div>
        </div>
      )
    }

    const tableClasses = cn(
      "w-full border-collapse shadow-lg",
      // Color variant styles with paper-like appearance
      colorVariant === "default"
        ? "bg-white/95 backdrop-blur-sm border border-stone-200 rounded-lg"
        : getWholeTableClasses(colorVariant as UtilsColorVariant),
      className
    )

    return (
      <div ref={ref} className="space-y-4" {...props}>
        {/* Toolbar */}
        {toolbar && (
          <div className="flex items-center justify-between">{toolbar}</div>
        )}

        {/* Search input */}
        {options.enableGlobalSearch && (
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              type="text"
              placeholder={options.searchPlaceholder || "Search..."}
              value={currentState.globalFilter || ""}
              onChange={(e) => table.actions.setGlobalFilter(e.target.value)}
              className="w-full pl-10 pr-10 py-2 border border-stone-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {currentState.globalFilter && (
              <button
                onClick={() => table.actions.setGlobalFilter("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-stone-100 rounded-sm text-stone-400 hover:text-stone-600 transition-colors"
                aria-label="Clear search"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        )}

        <div className="overflow-y-hidden overflow-x-auto rounded-sm shadow-lg border border-stone-200">
          <table className={tableClasses}>
            {caption && <caption className="sr-only">{caption}</caption>}

            <thead>
              <tr>
                {table.columns.map((column) => {
                  const currentSort = currentState.sorting.find(
                    (s) => s.columnId === column.id
                  )
                  return (
                    <TableHeader
                      key={column.id}
                      column={column}
                      onSort={handleSort}
                      sortDirection={currentSort?.direction || null}
                      colorVariant={column.colorVariant || colorVariant}
                      size={size}
                    />
                  )
                })}
              </tr>
            </thead>

            <tbody>
              {table.rows.map((row, rowIndex) => {
                const isEven = rowIndex % 2 === 0
                const showStripes = striped && !row.colorVariant

                const rowClasses = cn(
                  "border-b border-stone-100 last:border-b-0",
                  showStripes && isEven && "bg-stone-50/30",
                  hoverable &&
                    "transition-colors duration-150 hover:bg-stone-100/40",
                  row.colorVariant &&
                    getWholeTableClasses(row.colorVariant as UtilsColorVariant)
                )

                return (
                  <tr
                    key={row.id}
                    className={rowClasses}
                    onClick={(e) => callbacks.onRowClick?.(row, e)}
                    onDoubleClick={(e) => callbacks.onRowDoubleClick?.(row, e)}
                  >
                    {table.columns.map((column) => {
                      const value =
                        row.original[
                          column.accessor as keyof typeof row.original
                        ]
                      const effectiveColorVariant =
                        row.colorVariant || column.colorVariant || colorVariant

                      return (
                        <TableCell
                          key={`${row.id}-${column.id}`}
                          row={row}
                          column={column}
                          value={value}
                          colorVariant={effectiveColorVariant}
                          size={size}
                        />
                      )
                    })}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {footer && <div>{footer}</div>}
      </div>
    )
  }
)

Table.displayName = "Table"
