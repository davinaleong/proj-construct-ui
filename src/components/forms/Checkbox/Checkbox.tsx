import { forwardRef, useEffect, useRef } from "react"
import { Check, Minus } from "lucide-react"
import type { CheckboxProps } from "./types"
import { cn } from "../../../utils/cn.js"
import { containerResponsiveUI } from "../../../utils/containerFonts"

const sizeClasses = {
  sm: "w-4 h-4",
  md: "w-5 h-5",
  lg: "w-6 h-6",
}

const iconSizeClasses = {
  sm: "w-3 h-3",
  md: "w-4 h-4",
  lg: "w-5 h-5",
}

const labelSizeClasses = {
  sm: containerResponsiveUI.helper,
  md: containerResponsiveUI.label,
  lg: containerResponsiveUI.label,
}

const alignmentClasses = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
}

const baseCheckboxClasses = [
  "relative",
  "flex",
  "items-center",
  "justify-center",
  "rounded-sm", // Paper theme consistency
  "border-2",
  "transition-all",
  "duration-200",
  "cursor-pointer",
  "focus-within:ring-2",
  "focus-within:ring-stone-400",
  "focus-within:ring-offset-2",
]

const checkboxVariantClasses = {
  default: {
    unchecked: [
      "border-stone-300",
      "bg-white",
      "hover:border-stone-400",
      "hover:bg-stone-50",
    ],
    checked: [
      "border-blue-600",
      "bg-blue-600",
      "hover:border-blue-700",
      "hover:bg-blue-700",
    ],
    disabled: ["border-stone-200", "bg-stone-100", "cursor-not-allowed"],
  },
  error: {
    unchecked: [
      "border-red-300",
      "bg-white",
      "hover:border-red-400",
      "hover:bg-red-50",
    ],
    checked: [
      "border-red-600",
      "bg-red-600",
      "hover:border-red-700",
      "hover:bg-red-700",
    ],
    disabled: ["border-red-200", "bg-red-100", "cursor-not-allowed"],
  },
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      checked,
      defaultChecked,
      size = "md",
      disabled = false,
      required = false,
      indeterminate = false,
      children,
      helperText,
      labelAlign = "left",
      helperAlign = "left",
      error = false,
      errorMessage,
      onChange,
      onFocus,
      onBlur,
      className,
      name,
      id,
      value,
      ...props
    },
    ref
  ) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const hasError = error || !!errorMessage
    const helpText = errorMessage || helperText

    // Handle indeterminate state
    useEffect(() => {
      const input = ref && "current" in ref ? ref.current : inputRef.current
      if (input) {
        input.indeterminate = indeterminate
      }
    }, [indeterminate, ref])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(event.target.checked, event)
    }

    // Determine the current state for styling
    const getCheckboxState = () => {
      if (disabled) return "disabled"
      if (checked || indeterminate) return "checked"
      return "unchecked"
    }

    const checkboxVariant = hasError ? "error" : "default"
    const checkboxState = getCheckboxState()

    const checkboxClasses = cn(
      baseCheckboxClasses,
      sizeClasses[size],
      checkboxVariantClasses[checkboxVariant][checkboxState]
    )

    const labelClasses = cn(
      labelSizeClasses[size],
      "w-full text-stone-700",
      alignmentClasses[labelAlign],
      disabled && "text-stone-400"
    )

    const wrapperClasses = cn("flex items-start gap-3", className)

    const renderIcon = () => {
      const iconClasses = cn(
        iconSizeClasses[size],
        "text-white",
        checked || indeterminate ? "opacity-100" : "opacity-0",
        "transition-opacity",
        "duration-200"
      )

      if (indeterminate) {
        return <Minus className={iconClasses} />
      }

      return <Check className={iconClasses} />
    }

    return (
      <div className="space-y-1">
        <div className={wrapperClasses}>
          <div className="relative">
            <input
              ref={ref || inputRef}
              type="checkbox"
              id={id}
              name={name}
              value={value}
              checked={checked}
              defaultChecked={defaultChecked}
              disabled={disabled}
              required={required}
              onChange={handleChange}
              onFocus={onFocus}
              onBlur={onBlur}
              className="sr-only"
              {...props}
            />
            <div className={checkboxClasses}>{renderIcon()}</div>
          </div>

          {children && (
            <label htmlFor={id} className={labelClasses}>
              {children}
              {required && <span className="text-red-500 ml-1">*</span>}
            </label>
          )}
        </div>

        {helpText && (
          <p
            className={cn(
              containerResponsiveUI.helper,
              hasError ? "text-red-600" : "text-stone-500",
              alignmentClasses[helperAlign],
              "ml-8" // Align with checkbox content
            )}
          >
            {helpText}
          </p>
        )}
      </div>
    )
  }
)

Checkbox.displayName = "Checkbox"
