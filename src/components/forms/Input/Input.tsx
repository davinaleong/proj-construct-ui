import { forwardRef } from "react"
import type { InputProps } from "./types"
import { cn } from "../../../utils/cn.js"
import { containerResponsiveUI } from "../../../utils/containerFonts"

const sizeClasses = {
  sm: `px-3 py-1.5 ${containerResponsiveUI.input.sm}`,
  md: `px-3 py-2 ${containerResponsiveUI.input.md}`,
  lg: `px-4 py-2.5 ${containerResponsiveUI.input.lg}`,
}

const iconSizeClasses = {
  sm: "w-4 h-4",
  md: "w-5 h-5",
  lg: "w-5 h-5",
}

const iconPaddingClasses = {
  sm: {
    left: "pl-9",
    right: "pr-9",
  },
  md: {
    left: "pl-10",
    right: "pr-10",
  },
  lg: {
    left: "pl-11",
    right: "pr-11",
  },
}

const baseInputClasses = [
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
]

const readonlyClasses = [
  "bg-stone-50/50",
  "cursor-default",
  "focus:ring-0",
  "focus:border-stone-200/60",
  "hover:border-stone-200/60",
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

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      value,
      defaultValue,
      placeholder,
      type = "text",
      variant = "default",
      size = "md",
      disabled = false,
      readonly = false,
      required = false,
      error = false,
      errorMessage,
      helperText,
      label,
      leftIcon: LeftIcon,
      rightIcon: RightIcon,
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
    const inputId = id || name
    const hasError = error || !!errorMessage
    const helpText = errorMessage || helperText

    const inputClasses = cn(
      baseInputClasses,
      sizeClasses[size],
      variantClasses[variant],
      hasError && errorClasses,
      readonly && readonlyClasses,
      LeftIcon && iconPaddingClasses[size].left,
      RightIcon && iconPaddingClasses[size].right,
      className
    )

    const iconClasses = iconSizeClasses[size]

    return (
      <div className="space-y-1">
        {label && (
          <label
            htmlFor={inputId}
            className={`block ${containerResponsiveUI.label} text-stone-700`}
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        <div className="relative">
          {LeftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400">
              <LeftIcon className={iconClasses} />
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            name={name}
            type={type}
            value={value}
            defaultValue={defaultValue}
            placeholder={placeholder}
            disabled={disabled}
            readOnly={readonly}
            required={required}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            className={inputClasses}
            {...props}
          />

          {RightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400">
              <RightIcon className={iconClasses} />
            </div>
          )}
        </div>

        {helpText && (
          <p
            className={cn(
              containerResponsiveUI.helper,
              hasError ? "text-red-600" : "text-stone-500"
            )}
          >
            {helpText}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = "Input"
