import type { StackProps, StackGap, StackResponsive } from "./types"
import { cn } from "../../../utils/cn.js"

const gapClasses: Record<StackGap, string> = {
  none: "gap-0",
  xs: "gap-1",
  sm: "gap-2",
  md: "gap-4",
  lg: "gap-6",
  xl: "gap-8",
  "2xl": "gap-12",
}

const alignClasses: Record<string, string> = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch",
}

const directionClasses: Record<string, string> = {
  column: "flex-col",
  "column-reverse": "flex-col-reverse",
}

const paperClasses = [
  "bg-stone-50",
  "border",
  "border-stone-200/60",
  "rounded-sm",
  "shadow-sm",
  "backdrop-blur-sm",
  "hover:shadow-md",
  "hover:-translate-y-[1px]",
  "active:shadow-inner",
  "transition-all",
  "duration-200",
]

function getResponsiveGapClasses(gap: StackGap | StackResponsive): string {
  if (typeof gap === "string") {
    return gapClasses[gap]
  }

  const classes: string[] = []

  if (gap.base) classes.push(gapClasses[gap.base])
  if (gap.sm) classes.push(`sm:${gapClasses[gap.sm]}`)
  if (gap.md) classes.push(`md:${gapClasses[gap.md]}`)
  if (gap.lg) classes.push(`lg:${gapClasses[gap.lg]}`)
  if (gap.xl) classes.push(`xl:${gapClasses[gap.xl]}`)

  return classes.join(" ")
}

export function Stack({
  children,
  gap = "md",
  align = "stretch",
  direction = "column",
  className,
  paper = false,
}: StackProps) {
  const gapClass = getResponsiveGapClasses(gap)
  const alignClass = alignClasses[align]
  const directionClass = directionClasses[direction]

  const stackClasses = cn(
    "flex",
    directionClass,
    alignClass,
    gapClass,
    paper && paperClasses,
    className
  )

  return <div className={stackClasses}>{children}</div>
}
