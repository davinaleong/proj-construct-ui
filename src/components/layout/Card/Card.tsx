import type {
  CardProps,
  CardHeaderProps,
  CardBodyProps,
  CardFooterProps,
} from "./types"
import { cn } from "../../../utils/cn.js"

const variantClasses = {
  elevated: [
    "bg-stone-50",
    "border",
    "border-stone-200/60",
    "shadow-sm",
    "backdrop-blur-sm",
  ],
  outlined: ["bg-stone-50/80", "border-2", "border-stone-300", "shadow-none"],
  filled: ["bg-stone-100", "border", "border-stone-200/40", "shadow-inner"],
}

const paddingClasses = {
  none: "p-0",
  sm: "p-3",
  md: "p-4",
  lg: "p-6",
  xl: "p-8",
}

const hoverClasses = [
  "hover:shadow-md",
  "hover:-translate-y-[1px]",
  "active:shadow-inner",
  "transition-all",
  "duration-200",
]

export function Card({
  children,
  variant = "elevated",
  padding = "md",
  hoverable = false,
  className,
}: CardProps) {
  const cardClasses = cn(
    "rounded-sm",
    "overflow-hidden",
    variantClasses[variant],
    paddingClasses[padding],
    hoverable && hoverClasses,
    className
  )

  return <div className={cardClasses}>{children}</div>
}

export function CardHeader({ children, className }: CardHeaderProps) {
  const headerClasses = cn(
    "border-b",
    "border-stone-200/60",
    "pb-3",
    "mb-4",
    "last:border-b-0",
    "last:pb-0",
    "last:mb-0",
    className
  )

  return <div className={headerClasses}>{children}</div>
}

export function CardBody({ children, className }: CardBodyProps) {
  const bodyClasses = cn("flex-1", className)

  return <div className={bodyClasses}>{children}</div>
}

export function CardFooter({ children, className }: CardFooterProps) {
  const footerClasses = cn(
    "border-t",
    "border-stone-200/60",
    "pt-3",
    "mt-4",
    "first:border-t-0",
    "first:pt-0",
    "first:mt-0",
    className
  )

  return <div className={footerClasses}>{children}</div>
}
