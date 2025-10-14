import type { SectionProps } from "./types"
import { cn } from "../../../utils/cn.js"

const variantClasses = {
  default: ["bg-transparent"],
  elevated: [
    "bg-stone-50",
    "border",
    "border-stone-200/60",
    "rounded-sm",
    "shadow-sm",
    "backdrop-blur-sm",
  ],
  outlined: ["bg-stone-50/80", "border-2", "border-stone-300", "rounded-sm"],
}

const paddingClasses = {
  none: "p-0",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
  xl: "p-12",
}

export function Section({
  children,
  title,
  description,
  variant = "default",
  padding = "md",
  className,
}: SectionProps) {
  const hasHeader = title || description

  const sectionClasses = cn(
    "space-y-4",
    variantClasses[variant],
    variant !== "default" && paddingClasses[padding],
    className
  )

  const contentClasses = cn(variant === "default" && paddingClasses[padding])

  return (
    <section className={sectionClasses}>
      {hasHeader && (
        <header className="space-y-2">
          {title && (
            <h2 className="text-lg font-semibold text-stone-900">{title}</h2>
          )}
          {description && (
            <p className="text-sm text-stone-600">{description}</p>
          )}
        </header>
      )}

      <div className={contentClasses}>{children}</div>
    </section>
  )
}
