import { forwardRef, useId, useState } from "react"
import type { SwitchProps } from "./types"
import { cn } from "../../../utils/cn.js"
import { containerResponsiveUI } from "../../../utils/containerFonts"

const sizeClasses = {
  sm: "w-8 h-4",
  md: "w-10 h-5",
  lg: "w-12 h-6",
}

const thumbSizeClasses = {
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

const baseSwitchClasses = [
  "relative",
  "inline-flex",
  "rounded-full",
  "border-2",
  "transition-all",
  "duration-200",
  "cursor-pointer",
  "focus-within:ring-2",
  "focus-within:ring-stone-400",
  "focus-within:ring-offset-2",
]

const switchVariantClasses = {
  default: {
    unchecked: [
      "border-stone-300",
      "bg-stone-200",
      "hover:border-stone-400",
      "hover:bg-stone-300",
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
      "bg-red-200",
      "hover:border-red-400",
      "hover:bg-red-300",
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

const thumbClasses = [
  "absolute",
  "top-0.3",
  "bg-white",
  "rounded-full",
  "shadow-sm",
  "transition-all",
  "duration-200",
  "transform",
]

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
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
    const switchId = id ?? generatedId

    // State management for uncontrolled component
    const [internalChecked, setInternalChecked] = useState(
      defaultChecked ?? false
    )
    const isControlled = checked !== undefined
    const checkedValue = isControlled ? checked : internalChecked

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled) return

      const newChecked = event.target.checked

      // Update internal state if uncontrolled
      if (!isControlled) {
        setInternalChecked(newChecked)
      }

      onChange?.(newChecked, event)
    }

    // Determine switch state
    const isDisabled = disabled
    const hasError = (error || !!errorMessage) && !isDisabled
    const isChecked = checkedValue

    // Get variant classes
    let variantClasses: string[]
    if (isDisabled) {
      variantClasses = switchVariantClasses.default.disabled
    } else if (hasError) {
      if (isChecked) {
        variantClasses = switchVariantClasses.error.checked
      } else {
        variantClasses = switchVariantClasses.error.unchecked
      }
    } else {
      if (isChecked) {
        variantClasses = switchVariantClasses.default.checked
      } else {
        variantClasses = switchVariantClasses.default.unchecked
      }
    }

    const groupClasses = cn("space-y-1 min-w-0", className)

    const switchClasses = cn(
      baseSwitchClasses,
      variantClasses,
      sizeClasses[size]
    )

    const labelClasses = cn(
      "select-none",
      "flex-1",
      labelSizeClasses[size],
      alignmentClasses[labelAlign],
      isDisabled && "opacity-50 cursor-not-allowed",
      hasError && "text-red-700"
    )

    const helperClasses = cn(
      containerResponsiveUI.helper,
      alignmentClasses[helperAlign],
      hasError ? "text-red-600" : "text-stone-600",
      isDisabled && "opacity-50"
    )

    // Calculate thumb position based on switch size and checked state
    const getThumbClasses = () => {
      const baseThumbClasses = cn(thumbClasses, thumbSizeClasses[size])

      if (isChecked) {
        switch (size) {
          case "sm":
            return cn(baseThumbClasses, "left-4", "translate-x-0")
          case "md":
            return cn(baseThumbClasses, "left-5", "translate-x-0")
          case "lg":
            return cn(baseThumbClasses, "left-6", "translate-x-0")
          default:
            return cn(baseThumbClasses, "left-5", "translate-x-0")
        }
      } else {
        return cn(baseThumbClasses, "left-0.5", "translate-x-0")
      }
    }

    const helpText = errorMessage || helperText

    return (
      <div className={groupClasses}>
        <label className="flex items-start gap-3 cursor-pointer group min-w-0">
          <div className="relative">
            <input
              ref={ref}
              type="checkbox"
              checked={checkedValue}
              disabled={disabled}
              required={required}
              name={name}
              id={switchId}
              value={value}
              onChange={handleChange}
              onFocus={onFocus}
              onBlur={onBlur}
              className="sr-only peer"
              {...props}
            />
            <div className={switchClasses}>
              {/* Switch thumb */}
              <div className={getThumbClasses()} />
            </div>
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
        {helpText && (
          <p
            className={cn(
              helperClasses,
              hasError && "text-red-600",
              "ml-11" // Align with switch content (switch width + gap)
            )}
            role={hasError ? "alert" : undefined}
          >
            {helpText}
          </p>
        )}
      </div>
    )
  }
)

Switch.displayName = "Switch"
