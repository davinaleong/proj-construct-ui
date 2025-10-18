import { forwardRef } from "react"
import {
  Search,
  X,
  Check,
  Edit,
  XCircle,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
} from "lucide-react"
import { cn } from "../../../utils/cn.js"
import {
  getColorClasses,
  getTextColorClasses,
  getBackgroundColorClasses,
  getBorderColorClasses,
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
          <div className="flex items-center">
            {sortDirection === null && (
              <ArrowUpDown className="w-3 h-3 text-gray-400" />
            )}
            {sortDirection === "asc" && (
              <ArrowUp className="w-3 h-3 text-gray-700" />
            )}
            {sortDirection === "desc" && (
              <ArrowDown className="w-3 h-3 text-gray-700" />
            )}
          </div>
        )}
      </div>
    </th>
  )
}

// Editable cell component
interface EditableCellProps<T extends Record<string, unknown>> {
  row: TableRow<T>
  column: TableColumn<T>
  value: unknown
  editingValue?: unknown
  colorVariant?: string
  size: "sm" | "md" | "lg"
  onUpdateValue: (value: unknown) => void
}

function EditableCell<T extends Record<string, unknown>>({
  row,
  column,
  value,
  editingValue,
  colorVariant = "default",
  size,
  onUpdateValue,
}: EditableCellProps<T>) {
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

  const inputClasses =
    "w-full bg-transparent border-none outline-none focus:ring-1 focus:ring-blue-500 rounded-sm px-1"

  // If not editable or not editing, show regular cell
  const isEditing = editingValue !== undefined
  if (!column.editable || !isEditing) {
    if (column.cell) {
      return (
        <td className={cellClasses}>
          {column.cell({
            value,
            row: row.original,
            rowIndex: row.index,
            column,
          })}
        </td>
      )
    }
    return <td className={cellClasses}>{String(value ?? "")}</td>
  }

  // Render editable input based on editing type
  const editingType = column.editingType || "text"
  const currentValue = editingValue ?? value ?? ""

  return (
    <td className={cellClasses}>
      {editingType === "select" && column.editingOptions ? (
        <select
          value={String(currentValue)}
          onChange={(e) => onUpdateValue(e.target.value)}
          className={cn(inputClasses, "cursor-pointer")}
        >
          {column.editingOptions.map((option) => (
            <option key={String(option.value)} value={String(option.value)}>
              {option.label}
            </option>
          ))}
        </select>
      ) : editingType === "textarea" ? (
        <textarea
          value={String(currentValue)}
          onChange={(e) => onUpdateValue(e.target.value)}
          className={cn(inputClasses, "resize-none min-h-[2rem]")}
          rows={2}
        />
      ) : editingType === "boolean" ? (
        <input
          type="checkbox"
          checked={Boolean(currentValue)}
          onChange={(e) => onUpdateValue(e.target.checked)}
          className="rounded-sm border-stone-300 text-blue-600 focus:ring-blue-500"
        />
      ) : (
        <input
          type={
            editingType === "number"
              ? "number"
              : editingType === "email"
              ? "email"
              : "text"
          }
          value={String(currentValue)}
          onChange={(e) => {
            const newValue =
              editingType === "number" ? Number(e.target.value) : e.target.value
            onUpdateValue(newValue)
          }}
          className={inputClasses}
        />
      )}
    </td>
  )
}

// Actions column component for editing
interface ActionsColumnProps {
  isEditing: boolean
  onStartEdit?: () => void
  onSaveEdit?: () => void
  onCancelEdit?: () => void
  size: "sm" | "md" | "lg"
}

function ActionsColumn({
  isEditing,
  onStartEdit,
  onSaveEdit,
  onCancelEdit,
  size,
}: ActionsColumnProps) {
  const sizeClasses = {
    sm: "px-2 py-1",
    md: "px-3 py-2",
    lg: "px-4 py-3",
  }

  const iconSizeClasses = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  }

  const cellClasses = cn(
    sizeClasses[size],
    "border-r border-stone-100 last:border-r-0"
  )

  if (isEditing) {
    return (
      <td className={cellClasses}>
        <div className="flex items-center gap-1">
          <button
            onClick={onSaveEdit}
            className="p-1 hover:bg-green-100 rounded-sm text-green-600 hover:text-green-700 transition-colors"
            aria-label="Save changes"
          >
            <Check className={iconSizeClasses[size]} />
          </button>
          <button
            onClick={onCancelEdit}
            className="p-1 hover:bg-red-100 rounded-sm text-red-600 hover:text-red-700 transition-colors"
            aria-label="Cancel changes"
          >
            <XCircle className={iconSizeClasses[size]} />
          </button>
        </div>
      </td>
    )
  }

  return (
    <td className={cellClasses}>
      <div className="flex items-center gap-1">
        <button
          onClick={onStartEdit}
          className="p-1 hover:bg-stone-100 rounded-sm text-stone-600 hover:text-stone-900 transition-colors"
          aria-label="Edit row"
        >
          <Edit className={iconSizeClasses[size]} />
        </button>
      </div>
    </td>
  )
}

// Helper functions for color classes using utils/colors.ts
const getTableHeaderClasses = (variant: UtilsColorVariant = "default") => {
  return getColorClasses(variant, "soft", "font-medium")
}

const getTableCellClasses = (variant: UtilsColorVariant = "default") => {
  return getTextColorClasses(variant, "strong")
}

const getWholeTableClasses = (variant: UtilsColorVariant = "default") => {
  const baseClasses = "backdrop-blur-sm rounded-sm"

  if (variant === "custom") {
    return baseClasses
  }

  if (variant === "transparent") {
    return cn(getBorderColorClasses("gray"), "bg-white/90", baseClasses)
  }

  // Extract just the background color from the utility and add opacity
  const bgUtilityClass = getBackgroundColorClasses(variant, "subtle")
  const bgColor = bgUtilityClass.split(" ")[0] // Get first class which is bg-*
  const backgroundClass = bgColor.includes("bg-") ? bgColor + "/90" : bgColor
  const borderClass = getBorderColorClasses(variant)

  return cn("border", borderClass, backgroundClass, baseClasses)
}

export const Table = forwardRef<HTMLDivElement, TableProps>(
  (
    {
      columns,
      data,
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
        ? "bg-white/95 backdrop-blur-sm border border-stone-200 rounded-sm"
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

                {/* Actions column header */}
                {options.enableEditing && (
                  <TableHeader
                    key="actions"
                    column={{
                      id: "actions",
                      accessor: "actions",
                      header: "Actions",
                      width: "100px",
                      align: "center",
                    }}
                    colorVariant={colorVariant}
                    size={size}
                  />
                )}
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

                      const isRowEditing =
                        options.enableEditing &&
                        table.state.editingRows[row.id] !== undefined
                      const editingValue = isRowEditing
                        ? table.state.editingRows[row.id]?.[
                            column.accessor as string
                          ]
                        : undefined

                      return (
                        <EditableCell
                          key={`${row.id}-${column.id}`}
                          row={row}
                          column={column}
                          value={value}
                          editingValue={editingValue}
                          colorVariant={effectiveColorVariant}
                          size={size}
                          onUpdateValue={(newValue) =>
                            table.actions.updateEditingCell(
                              row.id,
                              column.accessor as string,
                              newValue
                            )
                          }
                        />
                      )
                    })}

                    {/* Actions column for editing */}
                    {options.enableEditing && (
                      <ActionsColumn
                        isEditing={
                          table.state.editingRows[row.id] !== undefined
                        }
                        onStartEdit={() => table.actions.startEditing(row.id)}
                        onSaveEdit={() => table.actions.saveEditing(row.id)}
                        onCancelEdit={() => table.actions.cancelEditing(row.id)}
                        size={size}
                      />
                    )}
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
