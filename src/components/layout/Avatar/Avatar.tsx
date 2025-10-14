import { useState } from "react"
import type { AvatarProps } from "./types"
import { cn } from "../../../utils/cn.js"

const sizeClasses = {
  xs: "w-6 h-6 text-xs",
  sm: "w-8 h-8 text-sm",
  md: "w-10 h-10 text-base",
  lg: "w-12 h-12 text-lg",
  xl: "w-16 h-16 text-xl",
  "2xl": "w-20 h-20 text-2xl",
}

const variantClasses = {
  circular: "rounded-full",
  rounded: "rounded-sm", // Paper theme consistency
  square: "rounded-none",
}

const baseClasses = [
  "inline-flex",
  "items-center",
  "justify-center",
  "bg-stone-100",
  "border",
  "border-stone-200/60",
  "font-medium",
  "text-stone-700",
  "shadow-sm",
  "transition-all",
  "duration-200",
  "overflow-hidden",
  "select-none",
]

const hoverClasses = [
  "hover:shadow-md",
  "hover:-translate-y-[1px]",
  "cursor-pointer",
]

export function Avatar({
  src,
  alt,
  fallback,
  size = "md",
  variant = "circular",
  className,
  onClick,
}: AvatarProps) {
  const [imageError, setImageError] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  const showImage = src && !imageError && imageLoaded
  const showFallback = !showImage && fallback
  const isClickable = !!onClick

  const avatarClasses = cn(
    baseClasses,
    sizeClasses[size],
    variantClasses[variant],
    isClickable && hoverClasses,
    className
  )

  const handleImageLoad = () => {
    setImageLoaded(true)
  }

  const handleImageError = () => {
    setImageError(true)
    setImageLoaded(false)
  }

  const content = showImage ? (
    <img
      src={src}
      alt={alt || "Avatar"}
      className="w-full h-full object-cover"
      onLoad={handleImageLoad}
      onError={handleImageError}
    />
  ) : showFallback ? (
    fallback
  ) : (
    // Default fallback icon when no image or fallback text
    <svg
      className="w-3/5 h-3/5 text-stone-500"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V21C3 22.11 3.89 23 5 23H11V21H5V3H13V9H21ZM16 11H14V13H16V11ZM20 11H18V13H20V11ZM20 15H14V17H20V15ZM20 19H14V21H20V19Z" />
    </svg>
  )

  return (
    <div
      className={avatarClasses}
      onClick={onClick}
      role={isClickable ? "button" : undefined}
      tabIndex={isClickable ? 0 : undefined}
    >
      {content}

      {/* Preload image if src is provided */}
      {src && !imageLoaded && !imageError && (
        <img
          src={src}
          alt=""
          className="hidden"
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
      )}
    </div>
  )
}
