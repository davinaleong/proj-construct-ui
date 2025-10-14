import { Loader2 } from "lucide-react"
import type { ButtonProps } from "./types"
import { cn } from "../../../utils/cn.js"
import { getColorClasses } from "../../../utils/colors"

const sizeClasses = {
  xs: "px-2 py-1 text-xs gap-1",
  sm: "px-3 py-1.5 text-sm gap-1.5",
  md: "px-4 py-2 text-sm gap-2",
  lg: "px-6 py-2.5 text-base gap-2",
  xl: "px-8 py-3 text-lg gap-2.5",
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

// Paper theme button styles following Sample.tsx patterns
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
  link: [
    "bg-transparent",
    "border-0",
    "p-0",
    "underline",
    "underline-offset-4",
    "shadow-none",
    "rounded-none",
    "hover:no-underline",
    "hover:opacity-70",
  ],
}

export function Button({
  children,
  variant = "solid",
  size = "md",
  color = "primary",
  loading = false,
  disabled = false,
  icon: Icon,
  iconPosition = "left",
  type = "button",
  onClick,
  className,
}: ButtonProps) {
  const isDisabled = disabled || loading

  const buttonClasses = cn(
    baseClasses,
    sizeClasses[size],
    variantClasses[variant],

    // Apply color classes for non-link variants
    variant !== "link" &&
      getColorClasses(
        color,
        variant === "solid"
          ? "solid"
          : variant === "outline"
          ? "outline"
          : "soft"
      ),

    // Link variant colors
    variant === "link" &&
      "text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300",

    className
  )

  const iconSize = size === "xs" || size === "sm" ? "w-4 h-4" : "w-5 h-5"

  const renderIcon = () => {
    if (loading) {
      return <Loader2 className={cn(iconSize, "animate-spin")} />
    }
    if (Icon) {
      return <Icon className={iconSize} />
    }
    return null
  }

  const renderContent = () => {
    const iconElement = renderIcon()

    if (variant === "link") {
      return (
        <>
          {iconElement && iconPosition === "left" && iconElement}
          {children}
          {iconElement && iconPosition === "right" && iconElement}
        </>
      )
    }

    return (
      <>
        {iconElement && iconPosition === "left" && iconElement}
        {children}
        {iconElement && iconPosition === "right" && iconElement}
      </>
    )
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      className={buttonClasses}
    >
      {renderContent()}
    </button>
  )
}
