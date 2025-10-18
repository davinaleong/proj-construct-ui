import { forwardRef } from "react"
import { cn } from "../../../utils/cn.js"
import type { ColorVariant as UtilsColorVariant } from "../../../utils/colors.js"
import type {
  StaticTableProps,
  StaticTableColumn,
  StaticTableRow,
  ColorVariant,
  TableAlign,
} from "./types"

// Helper functions to get table-specific color classes using the color utilities
const getTableRowClasses = (variant: ColorVariant = "default") => {
  // Map table-specific variants to color utility variants
  const colorMap: Record<string, UtilsColorVariant> = {
    error: "danger",
    neutral: "gray",
  }

  const utilsVariant = (colorMap[variant] || variant) as UtilsColorVariant

  // Create subtle row background with hover effect based on the variant
  const colorMapping: Record<UtilsColorVariant, string> = {
    primary: "bg-blue-50/30 hover:bg-blue-100/40",
    secondary: "bg-slate-50/30 hover:bg-slate-100/40",
    danger: "bg-red-50/30 hover:bg-red-100/40",
    success: "bg-green-50/30 hover:bg-green-100/40",
    warning: "bg-yellow-50/30 hover:bg-yellow-100/40",
    info: "bg-sky-50/30 hover:bg-sky-100/40",
    default: "bg-stone-50/30 hover:bg-stone-100/40",
    paper: "bg-stone-50/30 hover:bg-stone-100/40",
    muted: "bg-gray-50/30 hover:bg-gray-100/40",
    accent: "bg-teal-50/30 hover:bg-teal-100/40",
    transparent: "bg-transparent hover:bg-gray-50/20",
    custom: "",
    slate: "bg-slate-50/30 hover:bg-slate-100/40",
    gray: "bg-gray-50/30 hover:bg-gray-100/40",
    zinc: "bg-zinc-50/30 hover:bg-zinc-100/40",
    neutral: "bg-neutral-50/30 hover:bg-neutral-100/40",
    stone: "bg-stone-50/30 hover:bg-stone-100/40",
    red: "bg-red-50/30 hover:bg-red-100/40",
    orange: "bg-orange-50/30 hover:bg-orange-100/40",
    amber: "bg-amber-50/30 hover:bg-amber-100/40",
    yellow: "bg-yellow-50/30 hover:bg-yellow-100/40",
    lime: "bg-lime-50/30 hover:bg-lime-100/40",
    green: "bg-green-50/30 hover:bg-green-100/40",
    emerald: "bg-emerald-50/30 hover:bg-emerald-100/40",
    teal: "bg-teal-50/30 hover:bg-teal-100/40",
    cyan: "bg-cyan-50/30 hover:bg-cyan-100/40",
    sky: "bg-sky-50/30 hover:bg-sky-100/40",
    blue: "bg-blue-50/30 hover:bg-blue-100/40",
    indigo: "bg-indigo-50/30 hover:bg-indigo-100/40",
    violet: "bg-violet-50/30 hover:bg-violet-100/40",
    purple: "bg-purple-50/30 hover:bg-purple-100/40",
    fuchsia: "bg-fuchsia-50/30 hover:bg-fuchsia-100/40",
    pink: "bg-pink-50/30 hover:bg-pink-100/40",
    rose: "bg-rose-50/30 hover:bg-rose-100/40",
  }

  return colorMapping[utilsVariant] || colorMapping.default
}

const getTableCellClasses = (variant: ColorVariant = "default") => {
  const colorMap: Record<string, UtilsColorVariant> = {
    error: "danger",
    neutral: "gray",
  }

  const utilsVariant = (colorMap[variant] || variant) as UtilsColorVariant

  // Create text color mapping based on color variants
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

  return colorMapping[utilsVariant] || colorMapping.default
}

const getTableHeaderClasses = (variant: ColorVariant = "default") => {
  const colorMap: Record<string, UtilsColorVariant> = {
    error: "danger",
    neutral: "gray",
  }

  const utilsVariant = (colorMap[variant] || variant) as UtilsColorVariant

  // Create header color mapping with background and text colors
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

  return colorMapping[utilsVariant] || colorMapping.default
}

// Helper function to get whole-table color classes
const getWholeTableClasses = (variant: ColorVariant = "default") => {
  const colorMap: Record<string, UtilsColorVariant> = {
    error: "danger",
    neutral: "gray",
  }

  const utilsVariant = (colorMap[variant] || variant) as UtilsColorVariant

  // Create whole-table color mapping with paper-like styling
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

  return colorMapping[utilsVariant] || colorMapping.default
}

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
  switch (type) {
    case "row":
      return getTableRowClasses(variant)
    case "cell":
      return getTableCellClasses(variant)
    case "header":
      return getTableHeaderClasses(variant)
    default:
      return ""
  }
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

// Get effective color variant for a cell (cell > row > column > table > default)
const getEffectiveColorVariant = (
  cellVariant?: ColorVariant,
  rowVariant?: ColorVariant,
  columnVariant?: ColorVariant,
  tableVariant?: ColorVariant
): ColorVariant => {
  return cellVariant ?? rowVariant ?? columnVariant ?? tableVariant ?? "default"
}

export const StaticTable = forwardRef<HTMLTableElement, StaticTableProps>(
  (
    {
      columns,
      rows,
      variant = "default",
      colorVariant = "default",
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
      // Base table styles with paper-like appearance
      "w-full border-collapse",

      // Color variant styles (includes paper-like styling)
      colorVariant === "default"
        ? "bg-white/95 backdrop-blur-sm"
        : getWholeTableClasses(colorVariant),

      // Variant-specific styles
      variant === "bordered" && "border-2",
      variant === "compact" && "text-sm",

      // Custom classes
      className
    )

    const sizeClasses = SIZE_CLASSES[size]

    return (
      <div className="overflow-y-hidden overflow-x-auto rounded-sm shadow-lg border border-stone-200 ">
        <table ref={ref} className={tableClasses} {...props}>
          {caption && <caption className="sr-only">{caption}</caption>}

          <thead>
            <tr>
              {columns.map((column) => {
                const effectiveHeaderVariant =
                  column.colorVariant ?? colorVariant ?? "default"
                const headerClasses = cn(
                  sizeClasses.header,
                  getAlignClass(column.align),
                  getColorVariantClasses("header", effectiveHeaderVariant),
                  "border-b border-stone-200"
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
                "border-b border-stone-100 last:border-b-0",

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
                      column.colorVariant,
                      colorVariant // Table-level color variant
                    )

                    const cellClasses = cn(
                      sizeClasses.cell,
                      getAlignClass(column.align),
                      getColorVariantClasses("cell", effectiveColorVariant),
                      "border-r border-stone-100 last:border-r-0"
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
