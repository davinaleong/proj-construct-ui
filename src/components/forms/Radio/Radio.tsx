import { forwardRef, useId } from "react"
import type { RadioProps } from "./types"
import { cn } from "../../../utils/cn.js"
import { containerResponsiveUI } from "../../../utils/containerFonts"

const sizeClasses = {
  sm: "w-4 h-4",
  md: "w-5 h-5",
  lg: "w-6 h-6",
}

const indicatorSizeClasses = {
  sm: "w-2 h-2",
  md: "w-2.5 h-2.5",
  lg: "w-3 h-3",
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

const baseRadioClasses = [
  "relative",
  "flex",
  "items-center",
  "justify-center",
  "rounded-full", // Circular for radio buttons
  "border-2",
  "transition-all",
  "duration-200",
  "cursor-pointer",
  "focus-within:ring-2",
  "focus-within:ring-stone-400",
  "focus-within:ring-offset-2",
]

const radioVariantClasses = {
  default: {
    unchecked: [
      "border-stone-300",
      "bg-white",
      "hover:border-stone-400",
      "hover:bg-stone-50",
    ],
    checked: ["border-blue-600", "bg-white", "hover:border-blue-700"],
    disabled: ["border-stone-200", "bg-stone-50", "cursor-not-allowed"],
    error: ["border-red-600", "bg-white", "hover:border-red-700"],
  },
}

const indicatorClasses = [
  "rounded-full",
  "bg-blue-600",
  "transition-all",
  "duration-200",
  "scale-0",
  "group-checked:scale-100",
]

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      checked,
      defaultChecked,
      size = "md",
      disabled = false,
      required = false,
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
    const generatedId = useId()
    const radioId = id ?? generatedId

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled) return
      onChange?.(event.target.checked, event)
    }

    // Determine radio state
    const isDisabled = disabled
    const isError = error && !isDisabled
    const isChecked = checked

    // Get variant classes
    let variantClasses: string[]
    if (isDisabled) {
      variantClasses = radioVariantClasses.default.disabled
    } else if (isError) {
      variantClasses = radioVariantClasses.default.error
    } else if (isChecked) {
      variantClasses = radioVariantClasses.default.checked
    } else {
      variantClasses = radioVariantClasses.default.unchecked
    }

    const groupClasses = cn("space-y-1", className)

    const radioClasses = cn(baseRadioClasses, variantClasses, sizeClasses[size])

    const labelClasses = cn(
      "w-full select-none",
      "flex-1", // Allow the label to grow and take available space
      labelSizeClasses[size],
      alignmentClasses[labelAlign],
      isDisabled && "opacity-50 cursor-not-allowed",
      isError && "text-red-700"
    )

    const helperClasses = cn(
      containerResponsiveUI.helper,
      alignmentClasses[helperAlign],
      isError ? "text-red-600" : "text-stone-600",
      isDisabled && "opacity-50"
    )

    return (
      <div className={groupClasses}>
        <label className="flex items-start gap-2 cursor-pointer group">
          <div className={radioClasses}>
            <input
              ref={ref}
              type="radio"
              checked={checked}
              defaultChecked={defaultChecked}
              disabled={disabled}
              required={required}
              name={name}
              id={radioId}
              value={value}
              onChange={handleChange}
              onFocus={onFocus}
              onBlur={onBlur}
              className="sr-only peer"
              {...props}
            />
            {/* Radio indicator dot */}
            <div
              className={cn(
                indicatorClasses,
                indicatorSizeClasses[size],
                isChecked && "scale-100",
                !isChecked && "scale-0",
                isDisabled && "bg-stone-300"
              )}
            />
          </div>

          {children && (
            <span className={labelClasses}>
              {children}
              {required && !isDisabled && (
                <span className="text-red-600 ml-1" aria-label="required">
                  *
                </span>
              )}
            </span>
          )}
        </label>

        {/* Helper text */}
        {helperText && !errorMessage && (
          <p className={helperClasses}>{helperText}</p>
        )}

        {/* Error message */}
        {errorMessage && isError && (
          <p className={cn(helperClasses, "text-red-600")} role="alert">
            {errorMessage}
          </p>
        )}
      </div>
    )
  }
)

Radio.displayName = "Radio"
