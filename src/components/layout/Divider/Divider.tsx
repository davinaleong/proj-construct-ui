import type { DividerProps } from "./types"
import { cn } from "../../../utils/cn.js"

const orientationClasses = {
  horizontal: "w-full",
  vertical: "h-full min-h-4",
}

const sizeClasses = {
  horizontal: {
    sm: "h-px",
    md: "h-0.5",
    lg: "h-1",
  },
  vertical: {
    sm: "w-px",
    md: "w-0.5",
    lg: "w-1",
  },
}

const variantClasses = {
  solid: "border-solid",
  dashed: "border-dashed",
  dotted: "border-dotted",
  gradient: "",
  fade: "",
}

const colorClasses = {
  default: "border-stone-200/60 bg-stone-200/60",
  primary: "border-blue-200/60 bg-blue-200/60",
  secondary: "border-stone-300/60 bg-stone-300/60",
  muted: "border-stone-100/60 bg-stone-100/60",
  accent: "border-amber-200/60 bg-amber-200/60",
}

const spacingClasses = {
  horizontal: {
    none: "my-0",
    sm: "my-2",
    md: "my-4",
    lg: "my-6",
    xl: "my-8",
  },
  vertical: {
    none: "mx-0",
    sm: "mx-2",
    md: "mx-4",
    lg: "mx-6",
    xl: "mx-8",
  },
}

export function Divider({
  orientation = "horizontal",
  variant = "solid",
  size = "sm",
  color = "default",
  spacing = "md",
  decorative = false,
  label,
  icon,
  className,
  ...props
}: DividerProps) {
  const isHorizontal = orientation === "horizontal"
  const sizeClass = sizeClasses[orientation][size]
  const colorClass = colorClasses[color]
  const spacingClass = spacingClasses[orientation][spacing]

  // Handle special variants
  const gradientClass =
    variant === "gradient"
      ? isHorizontal
        ? "bg-gradient-to-r from-transparent via-current to-transparent"
        : "bg-gradient-to-b from-transparent via-current to-transparent"
      : ""

  const fadeClass =
    variant === "fade"
      ? isHorizontal
        ? "bg-gradient-to-r from-stone-200/60 via-stone-200/20 to-stone-200/60"
        : "bg-gradient-to-b from-stone-200/60 via-stone-200/20 to-stone-200/60"
      : ""

  if (label || icon) {
    return (
      <div
        className={cn(
          "flex items-center gap-4 text-sm text-stone-500/80",
          isHorizontal ? "w-full" : "flex-col h-full",
          spacingClass,
          className
        )}
        role={decorative ? "presentation" : "separator"}
        aria-label={typeof label === "string" ? label : undefined}
        {...props}
      >
        <div
          className={cn(
            orientationClasses[orientation],
            sizeClass,
            variant === "gradient" || variant === "fade"
              ? ""
              : variantClasses[variant],
            variant === "gradient"
              ? gradientClass
              : variant === "fade"
              ? fadeClass
              : colorClass,
            isHorizontal
              ? variant === "solid"
                ? "border-t"
                : ""
              : variant === "solid"
              ? "border-l"
              : "",
            "flex-1"
          )}
        />

        <div
          className={cn(
            "flex items-center gap-2 px-2 bg-white whitespace-nowrap",
            !isHorizontal &&
              "writing-mode-vertical-rl text-orientation-mixed py-2 px-0"
          )}
        >
          {icon && <span className="text-stone-400">{icon}</span>}
          {label && <span className="font-medium">{label}</span>}
        </div>

        <div
          className={cn(
            orientationClasses[orientation],
            sizeClass,
            variant === "gradient" || variant === "fade"
              ? ""
              : variantClasses[variant],
            variant === "gradient"
              ? gradientClass
              : variant === "fade"
              ? fadeClass
              : colorClass,
            isHorizontal
              ? variant === "solid"
                ? "border-t"
                : ""
              : variant === "solid"
              ? "border-l"
              : "",
            "flex-1"
          )}
        />
      </div>
    )
  }

  return (
    <div
      className={cn(
        orientationClasses[orientation],
        sizeClass,
        variant === "gradient" || variant === "fade"
          ? ""
          : variantClasses[variant],
        variant === "gradient"
          ? gradientClass
          : variant === "fade"
          ? fadeClass
          : colorClass,
        isHorizontal
          ? variant === "solid"
            ? "border-t"
            : ""
          : variant === "solid"
          ? "border-l"
          : "",
        spacingClass,
        className
      )}
      role={decorative ? "presentation" : "separator"}
      aria-orientation={orientation}
      {...props}
    />
  )
}
