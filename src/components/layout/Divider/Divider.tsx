import type { DividerProps } from "./types"
import { cn } from "../../../utils/cn.js"

const orientationClasses = {
  horizontal: "w-full h-px",
  vertical: "h-full w-px",
}

const variantClasses = {
  solid: "border-solid",
  dashed: "border-dashed",
  dotted: "border-dotted",
}

const baseLineClasses = [
  "border-stone-200/60", // Paper theme border color
  "bg-stone-200/60",
]

export function Divider({
  label,
  orientation = "horizontal",
  variant = "solid",
  className,
}: DividerProps) {
  const isHorizontal = orientation === "horizontal"
  const hasLabel = !!label

  if (hasLabel && isHorizontal) {
    // Horizontal divider with label
    return (
      <div className={cn("flex items-center gap-4", className)}>
        <div
          className={cn(
            "flex-1",
            orientationClasses[orientation],
            variantClasses[variant],
            baseLineClasses,
            isHorizontal ? "border-t" : "border-l"
          )}
        />
        <span className="text-sm text-stone-500 font-medium px-2">{label}</span>
        <div
          className={cn(
            "flex-1",
            orientationClasses[orientation],
            variantClasses[variant],
            baseLineClasses,
            isHorizontal ? "border-t" : "border-l"
          )}
        />
      </div>
    )
  }

  if (hasLabel && !isHorizontal) {
    // Vertical divider with label (rotated text)
    return (
      <div className={cn("flex flex-col items-center gap-4", className)}>
        <div
          className={cn(
            "flex-1",
            orientationClasses[orientation],
            variantClasses[variant],
            baseLineClasses,
            "border-l"
          )}
        />
        <span className="text-sm text-stone-500 font-medium py-2 writing-mode-vertical-rl text-orientation-mixed">
          {label}
        </span>
        <div
          className={cn(
            "flex-1",
            orientationClasses[orientation],
            variantClasses[variant],
            baseLineClasses,
            "border-l"
          )}
        />
      </div>
    )
  }

  // Simple divider without label
  return (
    <div
      className={cn(
        orientationClasses[orientation],
        variantClasses[variant],
        baseLineClasses,
        isHorizontal ? "border-t" : "border-l",
        className
      )}
      role="separator"
      aria-orientation={orientation}
    />
  )
}
