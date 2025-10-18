import { forwardRef } from "react"
import { cn } from "../../../utils/cn.js"
import {
  getColorClasses,
  getTextColorClasses,
  type ColorVariant as UtilsColorVariant,
} from "../../../utils/colors.js"
import type { DescriptionListProps, DescriptionListItem } from "./types"

/**
 * DescriptionList component for displaying key-value pairs in a structured format
 *
 * Features:
 * - Horizontal and vertical layouts
 * - Multiple size variants (sm, md, lg)
 * - Color variants support
 * - Bordered and striped styling options
 * - Custom render functions for terms and descriptions
 * - Responsive design with paper-like styling
 * - Full accessibility support
 */
export const DescriptionList = forwardRef<
  HTMLDListElement,
  DescriptionListProps
>(
  (
    {
      items,
      layout = "vertical",
      size = "md",
      colorVariant = "default",
      bordered = false,
      striped = false,
      termWidth,
      renderTerm,
      renderDescription,
      className,
      ...props
    },
    ref
  ) => {
    // Size-based styling
    const sizeClasses = {
      sm: {
        term: "text-sm font-medium",
        description: "text-sm",
        spacing: layout === "horizontal" ? "gap-3" : "gap-1",
        padding: "p-2",
      },
      md: {
        term: "text-base font-medium",
        description: "text-base",
        spacing: layout === "horizontal" ? "gap-4" : "gap-2",
        padding: "p-3",
      },
      lg: {
        term: "text-lg font-medium",
        description: "text-lg",
        spacing: layout === "horizontal" ? "gap-6" : "gap-3",
        padding: "p-4",
      },
    }

    // Layout-based styling
    const layoutClasses = {
      horizontal: "sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start text-left",
      vertical: "space-y-1 text-left",
    }

    // Container styling
    const containerClasses = cn(
      "space-y-0 text-left rounded-sm shadow-lg",
      // Paper-like styling
      "bg-white/95 backdrop-blur-sm",
      getColorClasses(colorVariant as UtilsColorVariant, "soft"),
      bordered && "border border-stone-200",
      className
    )

    // Item styling
    const getItemClasses = (item: DescriptionListItem, index: number) => {
      const isEven = index % 2 === 0

      return cn(
        sizeClasses[size].padding,
        bordered && "border-b border-stone-100 last:border-b-0",
        striped && isEven && "bg-stone-50/30",
        layout === "horizontal"
          ? layoutClasses.horizontal
          : layoutClasses.vertical,
        sizeClasses[size].spacing,
        item.className
      )
    }

    // Term styling
    const getTermClasses = (item: DescriptionListItem) => {
      const itemColorVariant = item.colorVariant || colorVariant

      return cn(
        sizeClasses[size].term,
        getTextColorClasses(itemColorVariant as UtilsColorVariant, "strong"),
        layout === "horizontal" ? "sm:col-span-1 text-left" : "mb-1 text-left"
      )
    }

    // Description styling
    const getDescriptionClasses = (item: DescriptionListItem) => {
      const itemColorVariant = item.colorVariant || colorVariant

      return cn(
        sizeClasses[size].description,
        getTextColorClasses(itemColorVariant as UtilsColorVariant, "bold"),
        layout === "horizontal" ? "sm:col-span-2 text-left" : "text-left"
      )
    }

    // Term width for horizontal layout
    const termWidthStyle =
      layout === "horizontal" && termWidth
        ? { gridTemplateColumns: `${termWidth} 1fr` }
        : undefined

    return (
      <dl ref={ref} className={containerClasses} {...props}>
        {items.map((item, index) => (
          <div
            key={item.id || index}
            className={getItemClasses(item, index)}
            style={termWidthStyle}
          >
            <dt className={getTermClasses(item)}>
              {renderTerm ? renderTerm(item.term, item, index) : item.term}
            </dt>
            <dd className={getDescriptionClasses(item)}>
              {renderDescription
                ? renderDescription(item.description, item, index)
                : item.description}
            </dd>
          </div>
        ))}
      </dl>
    )
  }
)

DescriptionList.displayName = "DescriptionList"
