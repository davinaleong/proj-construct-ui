import { forwardRef } from "react"
import type { TextareaProps } from "./types"
import { cn } from "../../../utils/cn.js"
import { containerResponsiveUI } from "../../../utils/containerFonts"

const sizeClasses = {
  sm: `px-3 py-1.5 ${containerResponsiveUI.input.sm}`,
  md: `px-3 py-2 ${containerResponsiveUI.input.md}`,
  lg: `px-4 py-2.5 ${containerResponsiveUI.input.lg}`,
}

const resizeClasses = {
  none: "resize-none",
  vertical: "resize-y",
  horizontal: "resize-x",
  both: "resize",
}

const textAlignClasses = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
  justify: "text-justify",
}

const baseTextareaClasses = [
  "w-full",
  "rounded-sm", // Paper theme consistency
  "border",
  "bg-white",
  "transition-all",
  "duration-200",
  "placeholder-stone-400",
  "disabled:opacity-50",
  "disabled:cursor-not-allowed",
  "disabled:bg-stone-50",
  "min-h-[2.5rem]", // Minimum height
]

const variantClasses = {
  default: [
    "border-stone-200/60",
    "focus:border-stone-400",
    "focus:ring-1",
    "focus:ring-stone-200",
    "hover:border-stone-300",
  ],
  filled: [
    "border-stone-200/60",
    "bg-stone-50",
    "focus:bg-white",
    "focus:border-stone-400",
    "focus:ring-1",
    "focus:ring-stone-200",
    "hover:border-stone-300",
  ],
  outlined: [
    "border-2",
    "border-stone-300",
    "focus:border-stone-500",
    "hover:border-stone-400",
  ],
}

const errorClasses = [
  "border-red-300",
  "focus:border-red-500",
  "focus:ring-red-200",
  "hover:border-red-400",
]

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      value,
      defaultValue,
      placeholder,
      variant = "default",
      size = "md",
      rows = 3,
      resize = "vertical",
      disabled = false,
      required = false,
      error = false,
      errorMessage,
      helperText,
      label,
      labelAlign = "left",
      messageAlign = "left",
      maxLength,
      showCharCount = false,
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
    const textareaId = id || name
    const hasError = error || !!errorMessage
    const helpText = errorMessage || helperText
    const currentLength = value?.length || defaultValue?.length || 0

    const textareaClasses = cn(
      baseTextareaClasses,
      sizeClasses[size],
      variantClasses[variant],
      resizeClasses[resize],
      hasError && errorClasses,
      className
    )

    return (
      <div className="space-y-1">
        {label && (
          <label
            htmlFor={textareaId}
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
          <textarea
            ref={ref}
            id={textareaId}
            name={name}
            value={value}
            defaultValue={defaultValue}
            placeholder={placeholder}
            rows={rows}
            maxLength={maxLength}
            disabled={disabled}
            required={required}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            className={textareaClasses}
            {...props}
          />
        </div>

        <div className="flex justify-between items-start">
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

          {showCharCount && maxLength && (
            <p
              className={cn(
                `${containerResponsiveUI.helper} ml-auto`,
                currentLength > maxLength * 0.9
                  ? "text-orange-600"
                  : "text-stone-500",
                currentLength >= maxLength ? "text-red-600" : ""
              )}
            >
              {currentLength}/{maxLength}
            </p>
          )}
        </div>
      </div>
    )
  }
)

Textarea.displayName = "Textarea"
