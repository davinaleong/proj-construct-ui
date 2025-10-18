import React, { forwardRef, cloneElement, isValidElement } from "react"
import { X } from "lucide-react"
import { cn } from "../../../utils/cn.js"
import { getColorClasses } from "../../../utils/colors.js"
import type { ColorVariant as UtilsColorVariant } from "../../../utils/colors.js"
import type { TagProps, TagSize, TagVariant } from "./types.js"

/**
 * Tag component for displaying compact labels and categories
 *
 * Features:
 * - Multiple size variants (xs, sm, md, lg)
 * - Visual variants (solid, soft, outline, ghost)
 * - Full color system integration (42 variants)
 * - Dismissible functionality with custom icons
 * - Start and end icon support
 * - Clickable state with hover effects
 * - Dot indicator option
 * - Content truncation with ellipsis
 * - Paper-like styling with backdrop blur
 * - Full accessibility support
 */
export const Tag = forwardRef<HTMLSpanElement, TagProps>(
  (
    {
      children,
      size = "md",
      variant = "soft",
      colorVariant = "default",
      dismissible = false,
      startIcon,
      endIcon,
      disabled = false,
      clickable = false,
      onDismiss,
      dismissIcon,
      dot = false,
      rounded = true,
      maxWidth,
      className,
      onClick,
      ...props
    },
    ref
  ) => {
    // Size-based styling
    const sizeClasses: Record<
      TagSize,
      { base: string; text: string; icon: string; dismiss: string; dot: string }
    > = {
      xs: {
        base: "px-1.5 py-0.5 gap-1",
        text: "text-xs",
        icon: "w-3 h-3", // 12px matches text-xs
        dismiss: "w-3 h-3 ml-1 -mr-0.5",
        dot: "w-1.5 h-1.5",
      },
      sm: {
        base: "px-2 py-1 gap-1.5",
        text: "text-xs",
        icon: "w-3 h-3", // 12px matches text-xs
        dismiss: "w-3 h-3 ml-1.5 -mr-0.5",
        dot: "w-2 h-2",
      },
      md: {
        base: "px-2.5 py-1.5 gap-2",
        text: "text-sm",
        icon: "w-3.5 h-3.5", // 14px matches text-sm
        dismiss: "w-3.5 h-3.5 ml-2 -mr-1",
        dot: "w-2 h-2",
      },
      lg: {
        base: "px-3 py-2 gap-2",
        text: "text-base",
        icon: "w-4 h-4", // 16px matches text-base
        dismiss: "w-4 h-4 ml-2 -mr-1",
        dot: "w-2.5 h-2.5",
      },
    }

    // Get variant-specific color classes
    const getVariantClasses = (
      variant: TagVariant,
      colorVariant: UtilsColorVariant
    ) => {
      switch (variant) {
        case "solid":
          return getColorClasses(colorVariant, "solid")
        case "soft":
          return getColorClasses(colorVariant, "soft")
        case "outline":
          return getColorClasses(colorVariant, "outline")
        case "ghost":
          return getColorClasses(colorVariant, "ghost")
        default:
          return getColorClasses(colorVariant, "soft")
      }
    }

    // Base tag classes
    const tagClasses = cn(
      // Base styling
      "flex items-center justify-center gap-2 font-medium",
      "backdrop-blur-sm transition-all duration-200",
      "border border-transparent",

      // Size classes
      sizeClasses[size].base,
      sizeClasses[size].text,

      // Shape
      rounded ? "rounded-full" : "rounded-sm",

      // Color and variant
      getVariantClasses(variant, colorVariant as UtilsColorVariant),

      // Interactive states
      clickable &&
        !disabled &&
        "cursor-pointer hover:scale-105 active:scale-95",
      disabled && "opacity-50 cursor-not-allowed",

      // Focus styling
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1",
      colorVariant === "default"
        ? "focus-visible:ring-stone-400"
        : `focus-visible:ring-${colorVariant}-400`,

      className
    )

    // Content container classes for truncation
    const contentClasses = cn(
      "flex items-center gap-1",
      maxWidth && "max-w-full"
    )

    // Text content classes
    const textClasses = cn(maxWidth && "truncate", "select-none")

    // Dismiss button classes
    const dismissClasses = cn(
      "flex-shrink-0 rounded-full transition-colors duration-150",
      "hover:bg-black/10 focus:bg-black/10 focus:outline-none",
      sizeClasses[size].dismiss,
      disabled && "pointer-events-none"
    )

    // Dot indicator classes
    const dotClasses = cn(
      "flex-shrink-0 rounded-full bg-current",
      sizeClasses[size].dot
    )

    // Helper function to clone icons with proper size classes
    const cloneIconWithSize = (icon: React.ReactNode) => {
      if (isValidElement(icon)) {
        const iconElement = icon as React.ReactElement<{ className?: string }>
        return cloneElement(iconElement, {
          className: cn(sizeClasses[size].icon, iconElement.props.className),
        })
      }
      return icon
    }

    // Helper function to clone dismiss icons with proper size classes
    const cloneDismissIconWithSize = (icon: React.ReactNode) => {
      if (isValidElement(icon)) {
        const iconElement = icon as React.ReactElement<{ className?: string }>
        return cloneElement(iconElement, {
          className: cn("w-full h-full", iconElement.props.className),
        })
      }
      return icon
    }

    // Handle dismiss click
    const handleDismiss = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation()
      if (onDismiss && !disabled) {
        onDismiss(event)
      }
    }

    // Handle tag click
    const handleClick = (event: React.MouseEvent<HTMLSpanElement>) => {
      if (disabled) {
        event.preventDefault()
        return
      }
      if (onClick) {
        onClick(event)
      }
    }

    return (
      <span
        ref={ref}
        className={tagClasses}
        onClick={clickable ? handleClick : onClick}
        style={maxWidth ? { maxWidth } : undefined}
        tabIndex={clickable && !disabled ? 0 : undefined}
        role={clickable ? "button" : undefined}
        aria-disabled={disabled}
        {...props}
      >
        <div className={contentClasses}>
          {/* Dot indicator */}
          {dot && <span className={dotClasses} aria-hidden="true" />}

          {/* Start icon */}
          {startIcon && (
            <span className="flex-shrink-0" aria-hidden="true">
              {cloneIconWithSize(startIcon)}
            </span>
          )}

          {/* Content */}
          <span className={textClasses}>{children}</span>

          {/* End icon */}
          {endIcon && (
            <span className="flex-shrink-0" aria-hidden="true">
              {cloneIconWithSize(endIcon)}
            </span>
          )}

          {/* Dismiss button */}
          {dismissible && (
            <button
              type="button"
              className={dismissClasses}
              onClick={handleDismiss}
              disabled={disabled}
              aria-label="Remove tag"
            >
              {dismissIcon ? (
                cloneDismissIconWithSize(dismissIcon)
              ) : (
                <X className="w-full h-full" />
              )}
            </button>
          )}
        </div>
      </span>
    )
  }
)

Tag.displayName = "Tag"
