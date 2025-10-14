import type { BadgeProps } from "./types"
import { cn } from "../../../utils/cn.js"
import { getColorClasses } from "../../../utils/colors"

const sizeClasses = {
  xs: "px-1.5 py-0.5 text-xs",
  sm: "px-2 py-1 text-xs",
  md: "px-2.5 py-1 text-sm",
  lg: "px-3 py-1.5 text-sm",
}

const baseClasses = [
  "inline-flex",
  "items-center",
  "justify-center",
  "font-medium",
  "rounded-sm", // Paper theme consistency
  "border",
  "transition-all",
  "duration-200",
  "whitespace-nowrap",
]

const clickableClasses = [
  "cursor-pointer",
  "hover:shadow-sm",
  "hover:-translate-y-[1px]",
  "active:shadow-inner",
]

export function Badge({
  children,
  color = "primary",
  variant = "soft",
  size = "sm",
  className,
  onClick,
}: BadgeProps) {
  const isClickable = !!onClick

  const badgeClasses = cn(
    baseClasses,
    sizeClasses[size],
    getColorClasses(color, variant),
    isClickable && clickableClasses,
    className
  )

  const handleClick = () => {
    if (onClick) {
      onClick()
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (isClickable && (event.key === "Enter" || event.key === " ")) {
      event.preventDefault()
      onClick?.()
    }
  }

  return (
    <span
      className={badgeClasses}
      onClick={isClickable ? handleClick : undefined}
      onKeyDown={isClickable ? handleKeyDown : undefined}
      role={isClickable ? "button" : undefined}
      tabIndex={isClickable ? 0 : undefined}
    >
      {children}
    </span>
  )
}
