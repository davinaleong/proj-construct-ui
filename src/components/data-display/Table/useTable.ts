import { useMemo, useState, useCallback } from "react"
import type {
  TableColumn,
  TableRow,
  TableState,
  TableSort,
  TableFilter,
  TablePagination,
  TableSelection,
  UseTableReturn,
  TableOptions,
} from "./types"

/**
 * Advanced table hook that provides comprehensive data processing capabilities
 *
 * Features:
 * - Data sorting (single and multi-column)
 * - Advanced filtering with multiple operators
 * - Pagination with customizable page sizes
 * - Row selection (single and multi-select)
 * - Column visibility and ordering
 * - Loading and error state management
 * - Responsive design support
 *
 * @param columns - Array of column definitions
 * @param data - Raw data array to be processed
 * @param options - Configuration options for table behavior
 * @param initialState - Initial state for table features
 * @returns Processed table data and control functions
 */
export function useTable<T extends Record<string, unknown>>(
  columns: TableColumn<T>[],
  data: T[],
  options: TableOptions<T> = {},
  initialState: Partial<TableState<T>> = {}
): UseTableReturn<T> {
  // ========================================
  // Configuration & Default Options
  // ========================================
  const {
    enableSorting = true,
    enableFiltering = true,
    enableGlobalSearch = false,
    enablePagination = false,
    enableSingleSelection = false,
    autoResetPageIndex = true,
    defaultPageSize = 10,
    loading = false,
    error,
  } = options

  // ========================================
  // State Initialization
  // ========================================
  const [state, setState] = useState<TableState<T>>(() => ({
    sorting: initialState.sorting || [],
    filters: initialState.filters || [],
    globalFilter: initialState.globalFilter || "",
    pagination: initialState.pagination || {
      pageIndex: 0,
      pageSize: defaultPageSize,
      totalRows: data.length,
    },
    selection: initialState.selection || {
      selectedRowIds: new Set(),
      isAllSelected: false,
      isSomeSelected: false,
    },
    columnVisibility:
      initialState.columnVisibility ||
      columns.reduce((acc, col) => ({ ...acc, [col.id]: !col.hidden }), {}),
    columnOrder: initialState.columnOrder || columns.map((col) => col.id),
    columnWidths: initialState.columnWidths || {},
    expandedRows: initialState.expandedRows || new Set(),
    grouping: initialState.grouping || [],
  }))

  // ========================================
  // Helper Functions
  // ========================================

  /**
   * Get unique identifier for a row
   */
  const getRowId = useCallback((row: T, index: number): string | number => {
    if (
      "id" in row &&
      (typeof row.id === "string" || typeof row.id === "number")
    ) {
      return row.id
    }
    return index
  }, [])

  // ========================================
  // Data Processing Pipeline
  // ========================================

  /**
   * Apply filters to the raw data
   */
  const filteredData = useMemo(() => {
    if (!enableFiltering || state.filters.length === 0) {
      return data
    }

    return data.filter((row) => {
      return state.filters.every((filter) => {
        const column = columns.find((col) => col.id === filter.columnId)
        if (!column) return true

        const value = row[column.accessor as keyof T]
        const filterValue = filter.value

        if (
          filterValue === undefined ||
          filterValue === null ||
          filterValue === ""
        ) {
          return true
        }

        const operator = filter.operator || "contains"

        switch (operator) {
          case "equals":
            return value === filterValue
          case "contains":
            return String(value)
              .toLowerCase()
              .includes(String(filterValue).toLowerCase())
          case "startsWith":
            return String(value)
              .toLowerCase()
              .startsWith(String(filterValue).toLowerCase())
          case "endsWith":
            return String(value)
              .toLowerCase()
              .endsWith(String(filterValue).toLowerCase())
          case "gt":
            return Number(value) > Number(filterValue)
          case "gte":
            return Number(value) >= Number(filterValue)
          case "lt":
            return Number(value) < Number(filterValue)
          case "lte":
            return Number(value) <= Number(filterValue)
          default:
            return true
        }
      })
    })
  }, [data, state.filters, columns, enableFiltering])

  /**
   * Apply global search to the filtered data
   */
  const globalFilteredData = useMemo(() => {
    if (
      !enableGlobalSearch ||
      !state.globalFilter ||
      state.globalFilter.trim() === ""
    ) {
      return filteredData
    }

    const searchTerm = state.globalFilter.toLowerCase()

    return filteredData.filter((row) => {
      // Search through all visible columns
      return columns.some((column) => {
        if (column.hidden) return false

        const value = row[column.accessor as keyof T]
        if (value === null || value === undefined) return false

        return String(value).toLowerCase().includes(searchTerm)
      })
    })
  }, [filteredData, state.globalFilter, columns, enableGlobalSearch])

  /**
   * Apply sorting to the searched data
   */
  const sortedData = useMemo(() => {
    if (!enableSorting || state.sorting.length === 0) {
      return globalFilteredData
    }

    return [...globalFilteredData].sort((a, b) => {
      for (const sort of state.sorting) {
        const column = columns.find((col) => col.id === sort.columnId)
        if (!column) continue

        const aValue = a[column.accessor as keyof T]
        const bValue = b[column.accessor as keyof T]

        let comparison = 0

        if (aValue < bValue) {
          comparison = -1
        } else if (aValue > bValue) {
          comparison = 1
        }

        if (comparison !== 0) {
          return sort.direction === "desc" ? -comparison : comparison
        }
      }
      return 0
    })
  }, [globalFilteredData, state.sorting, columns, enableSorting])

  /**
   * Apply pagination to the sorted data
   */
  const paginatedData = useMemo(() => {
    if (!enablePagination || !state.pagination) {
      return sortedData
    }

    const { pageIndex, pageSize } = state.pagination
    const start = pageIndex * pageSize
    const end = start + pageSize

    return sortedData.slice(start, end)
  }, [sortedData, state.pagination, enablePagination])

  /**
   * Transform raw data into table rows with metadata
   */
  const rows = useMemo((): TableRow<T>[] => {
    return paginatedData.map((item, index) => {
      const id = getRowId(item, index)
      const isSelected = state.selection?.selectedRowIds.has(id) || false
      const isExpanded = state.expandedRows.has(id)

      return {
        id,
        original: item,
        index,
        isSelected,
        isExpanded,
      }
    })
  }, [
    paginatedData,
    getRowId,
    state.selection?.selectedRowIds,
    state.expandedRows,
  ])

  /**
   * Process columns based on visibility and order settings
   */
  const processedColumns = useMemo(() => {
    return state.columnOrder
      .map((id) => columns.find((col) => col.id === id))
      .filter(
        (col): col is TableColumn<T> =>
          col !== undefined && state.columnVisibility[col.id] !== false
      )
  }, [columns, state.columnOrder, state.columnVisibility])

  // ========================================
  // Action Handlers
  // ========================================

  /**
   * Set sorting configuration
   */
  const setSort = useCallback(
    (sorting: TableSort[]) => {
      setState((prev) => ({ ...prev, sorting }))
      if (autoResetPageIndex && state.pagination) {
        setState((prev) => ({
          ...prev,
          pagination: prev.pagination
            ? { ...prev.pagination, pageIndex: 0 }
            : undefined,
        }))
      }
    },
    [autoResetPageIndex, state.pagination]
  )

  /**
   * Set filter configuration
   */
  const setFilters = useCallback(
    (filters: TableFilter[]) => {
      setState((prev) => ({ ...prev, filters }))
      if (autoResetPageIndex && state.pagination) {
        setState((prev) => ({
          ...prev,
          pagination: prev.pagination
            ? { ...prev.pagination, pageIndex: 0 }
            : undefined,
        }))
      }
    },
    [autoResetPageIndex, state.pagination]
  )

  /**
   * Set global search filter
   */
  const setGlobalFilter = useCallback(
    (value: string) => {
      setState((prev) => ({ ...prev, globalFilter: value }))
      if (autoResetPageIndex && state.pagination) {
        setState((prev) => ({
          ...prev,
          pagination: prev.pagination
            ? { ...prev.pagination, pageIndex: 0 }
            : undefined,
        }))
      }
    },
    [autoResetPageIndex, state.pagination]
  )

  /**
   * Set pagination configuration
   */
  const setPagination = useCallback((pagination: Partial<TablePagination>) => {
    setState((prev) => ({
      ...prev,
      pagination: prev.pagination
        ? { ...prev.pagination, ...pagination }
        : undefined,
    }))
  }, [])

  /**
   * Set selection configuration
   */
  const setSelection = useCallback((selection: Partial<TableSelection<T>>) => {
    setState((prev) => ({
      ...prev,
      selection: prev.selection
        ? { ...prev.selection, ...selection }
        : undefined,
    }))
  }, [])

  /**
   * Toggle selection state for a specific row
   */
  const toggleRowSelection = useCallback(
    (rowId: string | number) => {
      setState((prev) => {
        if (!prev.selection) return prev

        const newSelectedIds = new Set(prev.selection.selectedRowIds)

        if (enableSingleSelection) {
          // Single selection mode
          newSelectedIds.clear()
          if (!prev.selection.selectedRowIds.has(rowId)) {
            newSelectedIds.add(rowId)
          }
        } else {
          // Multi selection mode
          if (newSelectedIds.has(rowId)) {
            newSelectedIds.delete(rowId)
          } else {
            newSelectedIds.add(rowId)
          }
        }

        const isAllSelected =
          newSelectedIds.size === sortedData.length && sortedData.length > 0
        const isSomeSelected = newSelectedIds.size > 0 && !isAllSelected

        return {
          ...prev,
          selection: {
            selectedRowIds: newSelectedIds,
            isAllSelected,
            isSomeSelected,
          },
        }
      })
    },
    [enableSingleSelection, sortedData]
  )

  /**
   * Toggle selection state for all rows
   */
  const toggleAllRowsSelection = useCallback(() => {
    setState((prev) => {
      if (!prev.selection || enableSingleSelection) return prev

      const allIds = sortedData.map((_, index) =>
        getRowId(sortedData[index], index)
      )
      const newSelectedIds = prev.selection.isAllSelected
        ? new Set<string | number>()
        : new Set(allIds)

      return {
        ...prev,
        selection: {
          selectedRowIds: newSelectedIds,
          isAllSelected: !prev.selection.isAllSelected,
          isSomeSelected: false,
        },
      }
    })
  }, [enableSingleSelection, sortedData, getRowId])

  /**
   * Set column visibility
   */
  const setColumnVisibility = useCallback(
    (columnId: string, visible: boolean) => {
      setState((prev) => ({
        ...prev,
        columnVisibility: { ...prev.columnVisibility, [columnId]: visible },
      }))
    },
    []
  )

  /**
   * Set column order
   */
  const setColumnOrder = useCallback((order: string[]) => {
    setState((prev) => ({ ...prev, columnOrder: order }))
  }, [])

  /**
   * Set column width
   */
  const setColumnWidth = useCallback((columnId: string, width: number) => {
    setState((prev) => ({
      ...prev,
      columnWidths: { ...prev.columnWidths, [columnId]: width },
    }))
  }, [])

  /**
   * Toggle row expansion state
   */
  const toggleRowExpansion = useCallback((rowId: string | number) => {
    setState((prev) => {
      const newExpandedRows = new Set(prev.expandedRows)
      if (newExpandedRows.has(rowId)) {
        newExpandedRows.delete(rowId)
      } else {
        newExpandedRows.add(rowId)
      }
      return { ...prev, expandedRows: newExpandedRows }
    })
  }, [])

  /**
   * Set grouping configuration
   */
  const setGrouping = useCallback((grouping: string[]) => {
    setState((prev) => ({ ...prev, grouping }))
  }, [])

  /**
   * Reset all table state to defaults
   */
  const reset = useCallback(() => {
    setState({
      sorting: [],
      filters: [],
      globalFilter: "",
      pagination: {
        pageIndex: 0,
        pageSize: defaultPageSize,
        totalRows: data.length,
      },
      selection: {
        selectedRowIds: new Set(),
        isAllSelected: false,
        isSomeSelected: false,
      },
      columnVisibility: columns.reduce(
        (acc, col) => ({ ...acc, [col.id]: !col.hidden }),
        {}
      ),
      columnOrder: columns.map((col) => col.id),
      columnWidths: {},
      expandedRows: new Set(),
      grouping: [],
    })
  }, [defaultPageSize, data.length, columns])

  // ========================================
  // Actions Object (Memoized)
  // ========================================
  const actions = useMemo(
    () => ({
      setSort,
      setFilters,
      setGlobalFilter,
      setPagination,
      setSelection,
      toggleRowSelection,
      toggleAllRowsSelection,
      setColumnVisibility,
      setColumnOrder,
      setColumnWidth,
      toggleRowExpansion,
      setGrouping,
      reset,
    }),
    [
      setSort,
      setFilters,
      setGlobalFilter,
      setPagination,
      setSelection,
      toggleRowSelection,
      toggleAllRowsSelection,
      setColumnVisibility,
      setColumnOrder,
      setColumnWidth,
      toggleRowExpansion,
      setGrouping,
      reset,
    ]
  )

  // ========================================
  // Meta Information
  // ========================================

  /**
   * Computed metadata about the table state
   */
  const meta = useMemo(() => {
    const totalRows = sortedData.length
    const totalPages = state.pagination
      ? Math.ceil(totalRows / state.pagination.pageSize)
      : 1
    const currentPage = state.pagination?.pageIndex || 0

    return {
      totalRows,
      totalPages,
      hasNextPage: currentPage < totalPages - 1,
      hasPreviousPage: currentPage > 0,
      isLoading: loading,
      error,
    }
  }, [sortedData.length, state.pagination, loading, error])

  // ========================================
  // Side Effects
  // ========================================

  /**
   * Update pagination total when data changes
   */
  useMemo(() => {
    if (state.pagination && state.pagination.totalRows !== sortedData.length) {
      setState((prev) => ({
        ...prev,
        pagination: prev.pagination
          ? {
              ...prev.pagination,
              totalRows: sortedData.length,
            }
          : undefined,
      }))
    }
  }, [sortedData.length, state.pagination])

  return {
    rows,
    columns: processedColumns,
    state,
    actions,
    meta,
  }
}
