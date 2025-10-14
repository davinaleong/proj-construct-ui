import { forwardRef, useState, useRef, useEffect } from "react"
import { ChevronDown, X, Check, Search } from "lucide-react"
import type {
  SelectProps,
  SelectOption,
  SelectOptGroup,
  SelectOptionOrGroup,
} from "./types"
import { cn } from "../../../utils/cn.js"
import { containerResponsiveUI } from "../../../utils/containerFonts"
import type { TextAlignment } from "../shared"

const sizeClasses = {
  sm: "h-9 px-3 text-sm",
  md: "h-10 px-3",
  lg: "h-12 px-4 text-lg",
}

const baseTriggerClasses = [
  "relative",
  "w-full",
  "flex",
  "items-center",
  "justify-between",
  "gap-2",
  "rounded-sm", // Paper theme consistency
  "border",
  "bg-white",
  "transition-all",
  "duration-200",
  "cursor-pointer",
  "focus:outline-none",
  "focus:ring-2",
  "focus:ring-stone-400",
  "focus:ring-offset-2",
  "disabled:cursor-not-allowed",
  "disabled:opacity-50",
]

const variantClasses = {
  default: [
    "border-stone-300",
    "hover:border-stone-400",
    "focus:border-stone-500",
  ],
  filled: [
    "border-transparent",
    "bg-stone-100",
    "hover:bg-stone-200",
    "focus:bg-white",
    "focus:border-stone-500",
  ],
  outlined: [
    "border-stone-400",
    "hover:border-stone-500",
    "focus:border-stone-600",
    "bg-transparent",
  ],
}

const errorClasses = [
  "border-red-300",
  "hover:border-red-400",
  "focus:border-red-500",
  "focus:ring-red-400",
]

const dropdownClasses = [
  "absolute",
  "z-50",
  "w-full",
  "mt-1",
  "bg-white",
  "border",
  "border-stone-300",
  "rounded-sm",
  "shadow-lg",
  "overflow-hidden",
]

const optionClasses = [
  "w-full",
  "px-3",
  "py-2",
  "text-left",
  "flex",
  "items-center",
  "gap-2",
  "hover:bg-stone-50",
  "focus:bg-stone-50",
  "focus:outline-none",
  "disabled:opacity-50",
  "disabled:cursor-not-allowed",
  "transition-colors",
  "duration-150",
]

const textAlignClasses: Record<TextAlignment, string> = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
  justify: "text-justify",
}

// Helper functions for working with optgroups
const isOptGroup = (item: SelectOptionOrGroup): item is SelectOptGroup => {
  return "options" in item
}

const getAllOptions = (items: SelectOptionOrGroup[]): SelectOption[] => {
  return items.reduce<SelectOption[]>((acc, item) => {
    if (isOptGroup(item)) {
      return [...acc, ...item.options]
    }
    return [...acc, item]
  }, [])
}

const filterItems = (
  items: SelectOptionOrGroup[],
  query: string
): SelectOptionOrGroup[] => {
  return items.reduce<SelectOptionOrGroup[]>((acc, item) => {
    if (isOptGroup(item)) {
      const filteredOptions = item.options.filter((option) =>
        option.label.toLowerCase().includes(query.toLowerCase())
      )
      if (filteredOptions.length > 0) {
        acc.push({
          ...item,
          options: filteredOptions,
        })
      }
    } else {
      if (item.label.toLowerCase().includes(query.toLowerCase())) {
        acc.push(item)
      }
    }
    return acc
  }, [])
}

export const Select = forwardRef<HTMLButtonElement, SelectProps>(
  (
    {
      value,
      defaultValue,
      placeholder = "Select an option...",
      options = [],
      size = "md",
      variant = "default",
      disabled = false,
      required = false,
      multiple = false,
      searchable = false,
      maxHeight = "200px",
      label,
      labelAlign = "left",
      helperText,
      messageAlign = "left",
      error = false,
      errorMessage,
      onChange,
      onFocus,
      onBlur,
      onSearch,
      className,
      name,
      id,
      dropdownUp = false,
      renderOption,
      renderValue,
      ...props
    },
    ref
  ) => {
    const selectId = id || name
    const hasError = error || !!errorMessage
    const helpText = errorMessage || helperText

    const [isOpen, setIsOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedValue, setSelectedValue] = useState<
      string | number | (string | number)[] | undefined
    >(value || defaultValue)
    const [focusedIndex, setFocusedIndex] = useState(-1)

    const triggerRef = useRef<HTMLButtonElement>(null)
    const dropdownRef = useRef<HTMLDivElement>(null)
    const searchInputRef = useRef<HTMLInputElement>(null)

    // Filter options based on search query
    const filteredOptions =
      searchable && searchQuery ? filterItems(options, searchQuery) : options

    // Get all options (flattened from optgroups)
    const allOptions = getAllOptions(options)

    // Get selected option(s)
    const getSelectedOptions = () => {
      if (multiple) {
        const values = Array.isArray(selectedValue) ? selectedValue : []
        return allOptions.filter((option) => values.includes(option.value))
      }
      return allOptions.find((option) => option.value === selectedValue)
    }

    // Handle value change
    const handleValueChange = (
      optionValue: string | number,
      option: SelectOption
    ) => {
      let newValue: string | number | (string | number)[]

      if (multiple) {
        const currentValues = Array.isArray(selectedValue) ? selectedValue : []
        if (currentValues.includes(optionValue)) {
          newValue = currentValues.filter((v) => v !== optionValue)
        } else {
          newValue = [...currentValues, optionValue]
        }
        setSelectedValue(newValue)
        onChange?.(newValue, multiple ? getSelectedOptions() : option)
      } else {
        newValue = optionValue
        setSelectedValue(newValue)
        setIsOpen(false)
        onChange?.(newValue, option)
      }
    }

    // Handle keyboard navigation
    const handleKeyDown = (event: React.KeyboardEvent) => {
      const flattenedOptions = getAllOptions(filteredOptions)

      switch (event.key) {
        case "Enter":
        case " ":
          event.preventDefault()
          if (isOpen && focusedIndex >= 0) {
            const option = flattenedOptions[focusedIndex]
            if (option && !option.disabled) {
              handleValueChange(option.value, option)
            }
          } else {
            setIsOpen(!isOpen)
          }
          break
        case "Escape":
          setIsOpen(false)
          triggerRef.current?.focus()
          break
        case "ArrowDown":
          event.preventDefault()
          if (!isOpen) {
            setIsOpen(true)
          } else {
            setFocusedIndex((prev) =>
              prev < flattenedOptions.length - 1 ? prev + 1 : 0
            )
          }
          break
        case "ArrowUp":
          event.preventDefault()
          if (!isOpen) {
            setIsOpen(true)
          } else {
            setFocusedIndex((prev) =>
              prev > 0 ? prev - 1 : flattenedOptions.length - 1
            )
          }
          break
      }
    }

    // Handle click outside
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target as Node) &&
          triggerRef.current &&
          !triggerRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false)
        }
      }

      if (isOpen) {
        document.addEventListener("mousedown", handleClickOutside)
        return () =>
          document.removeEventListener("mousedown", handleClickOutside)
      }
    }, [isOpen])

    // Focus search input when dropdown opens
    useEffect(() => {
      if (isOpen && searchable && searchInputRef.current) {
        searchInputRef.current.focus()
      }
    }, [isOpen, searchable])

    // Reset focused index when options change
    useEffect(() => {
      setFocusedIndex(-1)
    }, [filteredOptions])

    const triggerClasses = cn(
      baseTriggerClasses,
      sizeClasses[size],
      variantClasses[variant],
      hasError && errorClasses,
      className
    )

    const renderSelectedValue = () => {
      if (renderValue) {
        return renderValue(selectedValue || "", allOptions)
      }

      const selected = getSelectedOptions()

      if (multiple) {
        const selectedOptions = Array.isArray(selected) ? selected : []
        if (selectedOptions.length === 0) {
          return <span className="text-stone-500">{placeholder}</span>
        }
        return (
          <div className="flex flex-wrap gap-1">
            {selectedOptions.map((option) => (
              <span
                key={option.value}
                className="inline-flex items-center gap-1 px-2 py-1 bg-stone-100 rounded text-sm"
              >
                {option.label}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleValueChange(option.value, option)
                  }}
                  className="hover:text-red-600"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        )
      }

      if (selected && typeof selected === "object" && "label" in selected) {
        return (
          <span className="flex items-center gap-2">
            {selected.icon && <selected.icon className="w-4 h-4" />}
            {selected.label}
          </span>
        )
      }

      return <span className="text-stone-500">{placeholder}</span>
    }

    return (
      <div className="space-y-1">
        {label && (
          <label
            htmlFor={selectId}
            className={cn(
              "block",
              containerResponsiveUI.label,
              "text-stone-700",
              textAlignClasses[labelAlign]
            )}
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        <div className="relative">
          <button
            ref={ref || triggerRef}
            type="button"
            id={selectId}
            disabled={disabled}
            onClick={() => setIsOpen(!isOpen)}
            onFocus={onFocus}
            onBlur={onBlur}
            onKeyDown={handleKeyDown}
            className={triggerClasses}
            aria-haspopup="listbox"
            aria-expanded={isOpen}
            {...props}
          >
            <div className="flex-1 min-w-0">{renderSelectedValue()}</div>

            <ChevronDown
              className={cn(
                "w-4 h-4 text-stone-500 transition-transform duration-200",
                isOpen && "rotate-180"
              )}
            />
          </button>

          {/* Hidden input for form submission */}
          {name && (
            <input
              type="hidden"
              name={name}
              value={
                multiple
                  ? Array.isArray(selectedValue)
                    ? selectedValue.map(String).join(",")
                    : ""
                  : selectedValue
                  ? String(selectedValue)
                  : ""
              }
            />
          )}

          {/* Dropdown */}
          {isOpen && (
            <div
              ref={dropdownRef}
              className={cn(
                dropdownClasses,
                dropdownUp && "bottom-full mb-1 mt-0"
              )}
              style={{ maxHeight }}
            >
              {/* Search input */}
              {searchable && (
                <div className="p-2 border-b border-stone-200">
                  <div className="relative">
                    <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-stone-400" />
                    <input
                      ref={searchInputRef}
                      type="text"
                      placeholder="Search options..."
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value)
                        onSearch?.(e.target.value)
                      }}
                      className="w-full pl-8 pr-3 py-2 text-sm border border-stone-300 rounded focus:outline-none focus:ring-1 focus:ring-stone-400"
                    />
                  </div>
                </div>
              )}

              {/* Options */}
              <div className="overflow-y-auto" style={{ maxHeight }}>
                {filteredOptions.length === 0 ? (
                  <div className="px-3 py-2 text-stone-500 text-sm">
                    {searchQuery ? "No options found" : "No options available"}
                  </div>
                ) : (
                  filteredOptions.map((item, groupIndex) => {
                    if (isOptGroup(item)) {
                      // Render optgroup
                      return (
                        <div key={`group-${groupIndex}`}>
                          <div className="px-3 py-2 text-xs font-semibold text-stone-600 bg-stone-50 border-b border-stone-200">
                            {item.label}
                          </div>
                          {item.options.map((option, optionIndex) => {
                            const isSelected = multiple
                              ? Array.isArray(selectedValue) &&
                                selectedValue.includes(option.value)
                              : selectedValue === option.value
                            const globalIndex =
                              getAllOptions(
                                filteredOptions.slice(0, groupIndex + 1)
                              ).length -
                              item.options.length +
                              optionIndex
                            const isFocused = globalIndex === focusedIndex

                            return (
                              <button
                                key={option.value}
                                type="button"
                                disabled={option.disabled || item.disabled}
                                onClick={() =>
                                  handleValueChange(option.value, option)
                                }
                                className={cn(
                                  optionClasses,
                                  "pl-6", // Indent grouped options
                                  isSelected && "bg-blue-50 text-blue-700",
                                  isFocused && "bg-stone-100",
                                  (option.disabled || item.disabled) &&
                                    "opacity-50 cursor-not-allowed"
                                )}
                              >
                                {renderOption ? (
                                  renderOption(option, isSelected)
                                ) : (
                                  <>
                                    {option.icon && (
                                      <option.icon className="w-4 h-4" />
                                    )}
                                    <span className="flex-1 text-left">
                                      {option.label}
                                    </span>
                                    {isSelected && (
                                      <Check className="w-4 h-4 text-blue-600" />
                                    )}
                                  </>
                                )}
                              </button>
                            )
                          })}
                        </div>
                      )
                    } else {
                      // Render regular option
                      const isSelected = multiple
                        ? Array.isArray(selectedValue) &&
                          selectedValue.includes(item.value)
                        : selectedValue === item.value
                      const globalIndex =
                        getAllOptions(filteredOptions.slice(0, groupIndex + 1))
                          .length - 1
                      const isFocused = globalIndex === focusedIndex

                      return (
                        <button
                          key={item.value}
                          type="button"
                          disabled={item.disabled}
                          onClick={() => handleValueChange(item.value, item)}
                          className={cn(
                            optionClasses,
                            isSelected && "bg-blue-50 text-blue-700",
                            isFocused && "bg-stone-100",
                            item.disabled && "opacity-50 cursor-not-allowed"
                          )}
                        >
                          {renderOption ? (
                            renderOption(item, isSelected)
                          ) : (
                            <>
                              {item.icon && <item.icon className="w-4 h-4" />}
                              <span className="flex-1 text-left">
                                {item.label}
                              </span>
                              {isSelected && (
                                <Check className="w-4 h-4 text-blue-600" />
                              )}
                            </>
                          )}
                        </button>
                      )
                    }
                  })
                )}
              </div>
            </div>
          )}
        </div>

        {helpText && (
          <p
            className={cn(
              containerResponsiveUI.helper,
              hasError ? "text-red-600" : "text-stone-500",
              textAlignClasses[messageAlign]
            )}
          >
            {helpText}
          </p>
        )}
      </div>
    )
  }
)

Select.displayName = "Select"
