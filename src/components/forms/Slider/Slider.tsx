import { forwardRef, useId, useState } from "react"
import type { SliderProps } from "./types"
import { cn } from "../../../utils/cn.js"
import { containerResponsiveUI } from "../../../utils/containerFonts"

const sizeClasses = {
  horizontal: {
    sm: "h-1",
    md: "h-2",
    lg: "h-3",
  },
  vertical: {
    sm: "w-1 h-32",
    md: "w-2 h-40",
    lg: "w-3 h-48",
  },
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

const baseSliderClasses = [
  "relative",
  "appearance-none",
  "bg-stone-200",
  "rounded-full",
  "outline-none",
  "transition-all",
  "duration-200",
  "cursor-pointer",
  // Webkit slider thumb styling
  "[&::-webkit-slider-thumb]:appearance-none",
  "[&::-webkit-slider-thumb]:w-5",
  "[&::-webkit-slider-thumb]:h-5",
  "[&::-webkit-slider-thumb]:rounded-full",
  "[&::-webkit-slider-thumb]:bg-white",
  "[&::-webkit-slider-thumb]:border-2",
  "[&::-webkit-slider-thumb]:border-blue-600",
  "[&::-webkit-slider-thumb]:cursor-pointer",
  "[&::-webkit-slider-thumb]:shadow-sm",
  // Firefox slider thumb styling
  "[&::-moz-range-thumb]:appearance-none",
  "[&::-moz-range-thumb]:w-5",
  "[&::-moz-range-thumb]:h-5",
  "[&::-moz-range-thumb]:rounded-full",
  "[&::-moz-range-thumb]:bg-white",
  "[&::-moz-range-thumb]:border-2",
  "[&::-moz-range-thumb]:border-blue-600",
  "[&::-moz-range-thumb]:cursor-pointer",
  "[&::-moz-range-thumb]:border-none",
]

const sliderVariantClasses = {
  default: {
    enabled: [
      "bg-stone-200",
      "hover:bg-stone-300",
      "focus:ring-2",
      "focus:ring-stone-400",
      "focus:ring-offset-2",
    ],
    disabled: ["bg-stone-100", "cursor-not-allowed"],
  },
  error: {
    enabled: [
      "bg-red-200",
      "hover:bg-red-300",
      "focus:ring-2",
      "focus:ring-red-400",
      "focus:ring-offset-2",
    ],
    disabled: ["bg-red-100", "cursor-not-allowed"],
  },
}

export const Slider = forwardRef<HTMLInputElement, SliderProps>(
  (
    {
      value,
      defaultValue = 0,
      min = 0,
      max = 100,
      step = 1,
      size = "md",
      orientation = "horizontal",
      disabled = false,
      required = false,
      children,
      helperText,
      labelAlign = "left",
      helperAlign = "left",
      showValue = false,
      valueFormatter,
      error = false,
      errorMessage,
      onChange,
      onFocus,
      onBlur,
      className,
      name,
      id,
      ...props
    },
    ref
  ) => {
    const generatedId = useId()
    const sliderId = id ?? generatedId
    const [internalValue, setInternalValue] = useState(defaultValue)

    // Use controlled value if provided, otherwise use internal state
    const currentValue = value !== undefined ? value : internalValue

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled) return

      const newValue = parseFloat(event.target.value)

      // Update internal state if uncontrolled
      if (value === undefined) {
        setInternalValue(newValue)
      }

      onChange?.(newValue, event)
    }

    // Determine slider state
    const isDisabled = disabled
    const hasError = (error || !!errorMessage) && !isDisabled

    // Get variant classes
    const variantClasses = hasError
      ? sliderVariantClasses.error[isDisabled ? "disabled" : "enabled"]
      : sliderVariantClasses.default[isDisabled ? "disabled" : "enabled"]

    const groupClasses = cn("space-y-1 min-w-0", className)

    const sliderClasses = cn(
      baseSliderClasses,
      variantClasses,
      // Apply size classes based on orientation
      orientation === "horizontal" ? sizeClasses[orientation][size] : "" // Don't apply size classes for vertical - we'll handle in inline styles
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

    const valueDisplayClasses = cn(
      containerResponsiveUI.helper,
      "font-mono",
      "text-stone-700",
      isDisabled && "opacity-50"
    )

    const helpText = errorMessage || helperText
    const displayValue = valueFormatter
      ? valueFormatter(currentValue)
      : currentValue.toString()

    // Calculate fill percentage for visual progress indicator
    const fillPercentage = ((currentValue - min) / (max - min)) * 100

    const sliderStyle = {
      background: `linear-gradient(to ${
        orientation === "horizontal" ? "right" : "right"
      }, ${
        hasError ? "#dc2626" : "#3b82f6"
      } ${fillPercentage}%, transparent ${fillPercentage}%)`,
    }

    return (
      <div className={groupClasses}>
        <div
          className={
            orientation === "horizontal"
              ? "space-y-2"
              : "flex items-start gap-4"
          }
        >
          {/* Label and Value */}
          {(children || showValue) && (
            <div
              className={
                orientation === "horizontal"
                  ? "flex justify-between items-center"
                  : "flex flex-col gap-1"
              }
            >
              {children && (
                <label htmlFor={sliderId} className={labelClasses}>
                  {children}
                  {required && !isDisabled && (
                    <span className="text-red-600 ml-1" aria-label="required">
                      *
                    </span>
                  )}
                </label>
              )}
              {showValue && (
                <span className={valueDisplayClasses}>{displayValue}</span>
              )}
            </div>
          )}

          {/* Slider Input */}
          <div
            className={cn(
              "relative flex justify-center items-center",
              orientation === "vertical" && "h-40 w-8"
            )}
          >
            <input
              ref={ref}
              type="range"
              id={sliderId}
              name={name}
              min={min}
              max={max}
              step={step}
              value={currentValue}
              disabled={disabled}
              required={required}
              onChange={handleChange}
              onFocus={onFocus}
              onBlur={onBlur}
              className={cn(
                sliderClasses,
                orientation === "vertical" && [
                  "transform",
                  "-rotate-90",
                  "origin-center",
                  "w-40",
                  sizeClasses.horizontal[size],
                ]
              )}
              style={sliderStyle}
              {...props}
            />
          </div>
        </div>

        {/* Helper text */}
        {helpText && (
          <p
            className={cn(helperClasses, hasError && "text-red-600")}
            role={hasError ? "alert" : undefined}
          >
            {helpText}
          </p>
        )}
      </div>
    )
  }
)

Slider.displayName = "Slider"
