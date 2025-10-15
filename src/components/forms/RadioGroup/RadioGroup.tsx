import { forwardRef, useId, useState } from "react"
import { Radio } from "../Radio"
import type { RadioGroupProps } from "./types"
import { cn } from "../../../utils/cn.js"
import { containerResponsiveUI } from "../../../utils/containerFonts"

const orientationClasses = {
  horizontal: "flex flex-wrap gap-4",
  vertical: "flex flex-col gap-2",
}

const alignmentClasses = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
}

export const RadioGroup = forwardRef<HTMLFieldSetElement, RadioGroupProps>(
  (
    {
      name,
      value,
      defaultValue,
      options,
      label,
      size = "md",
      orientation = "vertical",
      disabled = false,
      required = false,
      helperText,
      labelAlign = "left",
      helperAlign = "left",
      error = false,
      errorMessage,
      onChange,
      onFocus,
      onBlur,
      className,
      id,
      ...props
    },
    ref
  ) => {
    const generatedId = useId()
    const groupId = id ?? generatedId
    const [internalValue, setInternalValue] = useState(defaultValue)

    // Use controlled value if provided, otherwise use internal state
    const currentValue = value !== undefined ? value : internalValue

    const handleChange = (
      checked: boolean,
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      if (disabled || !checked) return

      const newValue = event.target.value

      // Update internal state if uncontrolled
      if (value === undefined) {
        setInternalValue(newValue)
      }

      onChange?.(newValue, event)
    }

    const isError = error && !disabled

    const groupClasses = cn("space-y-2", className)

    const labelClasses = cn(
      containerResponsiveUI.label,
      "w-full mx-auto text-center font-medium",
      disabled && "opacity-50",
      isError && "text-red-700"
    )

    const optionsContainerClasses = cn(
      orientationClasses[orientation],
      disabled && "opacity-50"
    )

    const helperClasses = cn(
      containerResponsiveUI.helper,
      alignmentClasses[helperAlign],
      isError ? "text-red-600" : "text-stone-600",
      disabled && "opacity-50"
    )

    return (
      <fieldset
        ref={ref}
        className={groupClasses}
        id={groupId}
        disabled={disabled}
        {...props}
      >
        {/* Group label */}
        {label && (
          <legend className={labelClasses}>
            {label}
            {required && !disabled && (
              <span className="text-red-600 ml-1" aria-label="required">
                *
              </span>
            )}
          </legend>
        )}

        {/* Radio options */}
        <div className={optionsContainerClasses} role="radiogroup">
          {options.map((option) => (
            <Radio
              key={option.value}
              name={name}
              value={option.value}
              checked={currentValue === option.value}
              size={size}
              disabled={disabled || option.disabled}
              error={isError}
              helperText={option.helperText}
              labelAlign={labelAlign}
              helperAlign={helperAlign}
              onChange={handleChange}
              onFocus={onFocus}
              onBlur={onBlur}
              className={
                orientation === "horizontal" ? "min-w-[10ch] w-auto" : undefined
              }
            >
              {option.label}
            </Radio>
          ))}
        </div>

        {/* Group helper text */}
        {helperText && !errorMessage && (
          <p className={helperClasses}>{helperText}</p>
        )}

        {/* Group error message */}
        {errorMessage && isError && (
          <p className={cn(helperClasses, "text-red-600")} role="alert">
            {errorMessage}
          </p>
        )}
      </fieldset>
    )
  }
)

RadioGroup.displayName = "RadioGroup"
