import { forwardRef } from "react"
import { cn } from "../../../utils/cn.js"
import type {
  StaticTableProps,
  StaticTableColumn,
  StaticTableRow,
  ColorVariant,
  TableAlign,
} from "./types"

// Color variant classes for table elements
const COLOR_VARIANTS = {
  default: {
    row: "bg-stone-50/50 hover:bg-stone-100/50",
    cell: "text-stone-900",
    header: "bg-stone-100 text-stone-800 font-medium",
  },
  primary: {
    row: "bg-blue-50/30 hover:bg-blue-100/40",
    cell: "text-blue-900",
    header: "bg-blue-100 text-blue-800 font-medium",
  },
  secondary: {
    row: "bg-purple-50/30 hover:bg-purple-100/40",
    cell: "text-purple-900",
    header: "bg-purple-100 text-purple-800 font-medium",
  },
  success: {
    row: "bg-green-50/30 hover:bg-green-100/40",
    cell: "text-green-900",
    header: "bg-green-100 text-green-800 font-medium",
  },
  warning: {
    row: "bg-yellow-50/30 hover:bg-yellow-100/40",
    cell: "text-yellow-900",
    header: "bg-yellow-100 text-yellow-800 font-medium",
  },
  error: {
    row: "bg-red-50/30 hover:bg-red-100/40",
    cell: "text-red-900",
    header: "bg-red-100 text-red-800 font-medium",
  },
  info: {
    row: "bg-cyan-50/30 hover:bg-cyan-100/40",
    cell: "text-cyan-900",
    header: "bg-cyan-100 text-cyan-800 font-medium",
  },
  neutral: {
    row: "bg-gray-50/30 hover:bg-gray-100/40",
    cell: "text-gray-900",
    header: "bg-gray-100 text-gray-800 font-medium",
  },
} as const

// Table size classes
const SIZE_CLASSES = {
  sm: {
    cell: "px-2 py-1 text-sm",
    header: "px-2 py-2 text-sm font-medium",
  },
  md: {
    cell: "px-3 py-2 text-sm",
    header: "px-3 py-3 text-sm font-medium",
  },
  lg: {
    cell: "px-4 py-3 text-base",
    header: "px-4 py-4 text-base font-medium",
  },
} as const

// Alignment classes
const ALIGN_CLASSES = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
} as const

// Get color variant classes
const getColorVariantClasses = (
  type: "row" | "cell" | "header",
  variant: ColorVariant = "default"
) => {
  return COLOR_VARIANTS[variant][type]
}

// Get alignment class
const getAlignClass = (align: TableAlign = "left") => {
  return ALIGN_CLASSES[align]
}

// Get cell content based on column definition
const getCellContent = (
  column: StaticTableColumn,
  row: StaticTableRow,
  rowIndex: number
): React.ReactNode => {
  const value = row[column.key]

  if (column.render) {
    return column.render(value, row, rowIndex)
  }

  return String(value ?? "")
}

// Get effective color variant for a cell (cell > row > column > default)
const getEffectiveColorVariant = (
  cellVariant?: ColorVariant,
  rowVariant?: ColorVariant,
  columnVariant?: ColorVariant
): ColorVariant => {
  return cellVariant ?? rowVariant ?? columnVariant ?? "default"
}

export const StaticTable = forwardRef<HTMLTableElement, StaticTableProps>(
  (
    {
      columns,
      rows,
      variant = "default",
      size = "md",
      striped = false,
      hoverable = true,
      caption,
      className,
      loading = false,
      emptyState,
      ...props
    },
    ref
  ) => {
    // Handle loading state
    if (loading) {
      return (
        <div className="flex items-center justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-600"></div>
          <span className="ml-2 text-gray-600">Loading...</span>
        </div>
      )
    }

    // Handle empty state
    if (!rows.length) {
      return (
        <div className="flex items-center justify-center p-8">
          {emptyState || (
            <div className="text-center text-gray-500">
              <p className="text-lg font-medium">No data available</p>
              <p className="text-sm">There are no rows to display</p>
            </div>
          )}
        </div>
      )
    }

    const tableClasses = cn(
      // Base table styles
      "w-full border-collapse",
      "bg-white rounded-lg shadow-sm",
      "border border-gray-200",

      // Variant-specific styles
      variant === "bordered" && "border-2",
      variant === "compact" && "text-sm",

      // Custom classes
      className
    )

    const sizeClasses = SIZE_CLASSES[size]

    return (
      <div className="overflow-x-auto">
        <table ref={ref} className={tableClasses} {...props}>
          {caption && <caption className="sr-only">{caption}</caption>}

          <thead>
            <tr>
              {columns.map((column) => {
                const colorVariant = column.colorVariant ?? "default"
                const headerClasses = cn(
                  sizeClasses.header,
                  getAlignClass(column.align),
                  getColorVariantClasses("header", colorVariant),
                  "border-b border-gray-200",
                  "first:rounded-tl-lg last:rounded-tr-lg"
                )

                return (
                  <th
                    key={column.key}
                    className={headerClasses}
                    style={{ width: column.width }}
                    scope="col"
                  >
                    <div className="flex items-center gap-1">
                      {column.label}
                      {column.sortable && (
                        <svg
                          className="w-4 h-4 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                          />
                        </svg>
                      )}
                    </div>
                  </th>
                )
              })}
            </tr>
          </thead>

          <tbody>
            {rows.map((row, rowIndex) => {
              const isEven = rowIndex % 2 === 0
              const showStripes = striped && !row.colorVariant

              const rowColorVariant = row.colorVariant ?? "default"
              const rowClasses = cn(
                // Base row styles
                "border-b border-gray-100 last:border-b-0",

                // Striped rows (only if no color variant)
                showStripes && isEven && "bg-gray-50/30",

                // Color variant (overrides striping)
                row.colorVariant &&
                  getColorVariantClasses("row", rowColorVariant),

                // Hover effects
                hoverable && "transition-colors duration-150"
              )

              return (
                <tr key={row.id} className={rowClasses}>
                  {columns.map((column) => {
                    const content = getCellContent(column, row, rowIndex)
                    const effectiveColorVariant = getEffectiveColorVariant(
                      undefined, // No cell-specific variant in this implementation
                      row.colorVariant,
                      column.colorVariant
                    )

                    const cellClasses = cn(
                      sizeClasses.cell,
                      getAlignClass(column.align),
                      getColorVariantClasses("cell", effectiveColorVariant),
                      "border-r border-gray-100 last:border-r-0"
                    )

                    return (
                      <td
                        key={`${row.id}-${column.key}`}
                        className={cellClasses}
                      >
                        {content}
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }
)

StaticTable.displayName = "StaticTable"
