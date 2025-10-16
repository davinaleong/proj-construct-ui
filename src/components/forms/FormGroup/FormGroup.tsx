import type { FormGroupProps } from "./types"
import { cn } from "../../../utils/cn.js"
import {
  containerResponsiveHeadings,
  containerResponsiveBody,
} from "../../../utils/containerFonts"

const sizeClasses = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
}

const orientationClasses = {
  vertical: "flex-col",
  horizontal: "flex-row flex-wrap",
}

const spacingClasses = {
  none: "gap-0",
  sm: "gap-2",
  md: "gap-4",
  lg: "gap-6",
  xl: "gap-8",
}

const titleClasses = {
  sm: containerResponsiveHeadings.h4,
  md: containerResponsiveHeadings.h3,
  lg: containerResponsiveHeadings.h2,
}

export const FormGroup = ({
  children,
  title,
  description,
  disabled = false,
  size = "md",
  orientation = "vertical",
  className,
  fieldset = false,
  spacing = "md",
  "data-testid": testId,
}: FormGroupProps) => {
  const Component = fieldset ? "fieldset" : "div"
  const TitleComponent = fieldset ? "legend" : "div"

  return (
    <Component
      className={cn(
        "flex",
        orientationClasses[orientation],
        spacingClasses[spacing],
        sizeClasses[size],
        disabled && "opacity-50 pointer-events-none",
        className
      )}
      disabled={fieldset ? disabled : undefined}
      data-testid={testId}
    >
      {title && (
        <TitleComponent
          className={cn(
            titleClasses[size],
            "font-semibold text-stone-900 mb-2",
            fieldset && "px-0",
            disabled && "text-stone-500"
          )}
        >
          {title}
        </TitleComponent>
      )}

      {description && (
        <p
          className={cn(
            containerResponsiveBody.regular,
            "text-stone-600 mb-4",
            disabled && "text-stone-400"
          )}
        >
          {description}
        </p>
      )}

      <div
        className={cn(
          "flex",
          orientationClasses[orientation],
          spacingClasses[spacing],
          orientation === "horizontal" && "items-start"
        )}
      >
        {children}
      </div>
    </Component>
  )
}
