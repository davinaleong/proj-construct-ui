import { cloneElement, isValidElement } from "react"
import type { FormFieldProps } from "./types"
import { cn } from "../../../utils/cn.js"
import { containerResponsiveUI } from "../../../utils/containerFonts"

interface FormElementProps {
  id?: string
  disabled?: boolean
  error?: boolean
  errorMessage?: string
  helperText?: string
  "aria-describedby"?: string
  "aria-invalid"?: boolean
  required?: boolean
}

const sizeClasses = {
  sm: "gap-1",
  md: "gap-2",
  lg: "gap-3",
}

const orientationClasses = {
  vertical: "flex-col",
  horizontal: "flex-row items-center",
}

const labelClasses = {
  sm: containerResponsiveUI.label,
  md: containerResponsiveUI.label,
  lg: containerResponsiveUI.label,
}

const descriptionClasses = {
  sm: containerResponsiveUI.helper,
  md: containerResponsiveUI.helper,
  lg: containerResponsiveUI.helper,
}

export const FormField = ({
  children,
  label,
  description,
  error,
  required = false,
  size = "md",
  orientation = "vertical",
  disabled = false,
  className,
  id,
  hint,
  "data-testid": testId,
}: FormFieldProps) => {
  const fieldId = id || `field-${Math.random().toString(36).substr(2, 9)}`
  const descriptionId = description ? `${fieldId}-description` : undefined
  const errorId = error ? `${fieldId}-error` : undefined
  const hintId = hint ? `${fieldId}-hint` : undefined

  // Clone the child element and pass necessary props
  const enhancedChild = isValidElement(children)
    ? cloneElement(children as React.ReactElement<FormElementProps>, {
        id: fieldId,
        disabled:
          disabled ||
          (children as React.ReactElement<FormElementProps>).props?.disabled,
        error:
          !!error ||
          (children as React.ReactElement<FormElementProps>).props?.error,
        // If FormField provides error, suppress child's errorMessage to avoid duplicates
        errorMessage: error
          ? undefined
          : (children as React.ReactElement<FormElementProps>).props
              ?.errorMessage,
        // If FormField provides description/error, suppress child's helperText
        helperText:
          error || description
            ? undefined
            : (children as React.ReactElement<FormElementProps>).props
                ?.helperText,
        "aria-describedby":
          [
            descriptionId,
            errorId,
            hintId,
            (children as React.ReactElement<FormElementProps>).props?.[
              "aria-describedby"
            ],
          ]
            .filter(Boolean)
            .join(" ") || undefined,
        "aria-invalid": !!error,
        required:
          required ||
          (children as React.ReactElement<FormElementProps>).props?.required,
      })
    : children

  return (
    <div
      className={cn(
        "flex",
        sizeClasses[size],
        orientationClasses[orientation],
        disabled && "opacity-50 pointer-events-none",
        className
      )}
      data-testid={testId}
    >
      {label && (
        <label
          htmlFor={fieldId}
          className={cn(
            labelClasses[size],
            "font-medium text-stone-900",
            orientation === "horizontal" && "min-w-0 flex-shrink-0 w-32",
            disabled && "text-stone-500"
          )}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div className={cn("flex-1", orientation === "vertical" && "w-full")}>
        {enhancedChild}

        {hint && (
          <p
            id={hintId}
            className={cn(descriptionClasses[size], "text-stone-600 mt-1")}
          >
            {hint}
          </p>
        )}

        {description && !error && (
          <p
            id={descriptionId}
            className={cn(descriptionClasses[size], "text-stone-600 mt-1")}
          >
            {description}
          </p>
        )}

        {error && (
          <p
            id={errorId}
            className={cn(descriptionClasses[size], "text-red-600 mt-1")}
          >
            {error}
          </p>
        )}
      </div>
    </div>
  )
}
