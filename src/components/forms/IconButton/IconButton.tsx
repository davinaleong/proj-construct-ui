import { Loader2 } from "lucide-react"
import type { IconButtonProps } from "./types"
import { cn } from "../../../utils/cn.js"
import { getColorClasses } from "../../../utils/colors"

// Square icon button sizes following paper theme
const sizeClasses = {
  xs: "w-6 h-6 p-1",
  sm: "w-8 h-8 p-1.5",
  md: "w-10 h-10 p-2",
  lg: "w-12 h-12 p-2.5",
  xl: "w-16 h-16 p-3",
}

const iconSizeClasses = {
  xs: "w-4 h-4",
  sm: "w-5 h-5",
  md: "w-6 h-6",
  lg: "w-7 h-7",
  xl: "w-10 h-10",
}

const baseClasses = [
  "inline-flex",
  "items-center",
  "justify-center",
  "font-medium",
  "transition-all",
  "duration-200",
  "cursor-pointer",
  "disabled:opacity-50",
  "disabled:cursor-not-allowed",
  "disabled:hover:transform-none",
  "disabled:hover:shadow-none",
]

// Paper theme icon button styles following Sample.tsx patterns
const variantClasses = {
  solid: [
    "rounded-sm",
    "border",
    "shadow-sm",
    "hover:shadow-md",
    "active:shadow-inner",
    "hover:-translate-y-[1px]",
    "active:translate-y-0",
  ],
  outline: [
    "rounded-sm",
    "border-2",
    "bg-transparent",
    "shadow-sm",
    "hover:shadow-md",
    "active:shadow-inner",
    "hover:-translate-y-[1px]",
    "active:translate-y-0",
  ],
  ghost: [
    "rounded-sm",
    "border",
    "border-transparent",
    "bg-transparent",
    "hover:bg-stone-100/50",
    "hover:border-stone-200/60",
    "active:bg-stone-200/50",
  ],
}

export function IconButton({
  icon: Icon,
  "aria-label": ariaLabel,
  variant = "solid",
  size = "md",
  color = "primary",
  loading = false,
  disabled = false,
  type = "button",
  onClick,
  className,
}: IconButtonProps) {
  const isDisabled = disabled || loading

  const buttonClasses = cn(
    baseClasses,
    sizeClasses[size],
    variantClasses[variant],
    getColorClasses(
      color,
      variant === "solid" ? "solid" : variant === "outline" ? "outline" : "soft"
    ),
    className
  )

  const iconClasses = iconSizeClasses[size]

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      className={buttonClasses}
      aria-label={ariaLabel}
    >
      {loading ? (
        <Loader2 className={cn(iconClasses, "animate-spin")} />
      ) : (
        <Icon className={iconClasses} />
      )}
    </button>
  )
}
