import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import type { PanelProps } from "./types"
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

export function Panel({
  children,
  header,
  footer,
  variant = "elevated",
  padding = "md",
  collapsible = false,
  defaultCollapsed = false,
  className,
}: PanelProps) {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed)

  const panelClasses = cn("overflow-hidden", variantClasses[variant], className)

  const headerClasses = cn(
    "flex items-center justify-between",
    "border-b border-stone-200/60",
    paddingClasses[padding],
    collapsible && "cursor-pointer hover:bg-stone-100/50 transition-colors"
  )

  const contentClasses = cn(paddingClasses[padding], isCollapsed && "hidden")

  const footerClasses = cn(
    "border-t border-stone-200/60",
    paddingClasses[padding],
    isCollapsed && "hidden"
  )

  const toggleCollapse = () => {
    if (collapsible) {
      setIsCollapsed(!isCollapsed)
    }
  }

  return (
    <div className={panelClasses}>
      {header && (
        <div
          className={headerClasses}
          onClick={toggleCollapse}
          role={collapsible ? "button" : undefined}
          tabIndex={collapsible ? 0 : undefined}
          onKeyDown={(e) => {
            if (collapsible && (e.key === "Enter" || e.key === " ")) {
              e.preventDefault()
              toggleCollapse()
            }
          }}
        >
          <div className="flex-1">{header}</div>

          {collapsible && (
            <div className="ml-4 text-stone-500">
              {isCollapsed ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronUp className="w-4 h-4" />
              )}
            </div>
          )}
        </div>
      )}

      <div className={contentClasses}>{children}</div>

      {footer && <div className={footerClasses}>{footer}</div>}
    </div>
  )
}
