import { forwardRef } from "react"
import { clsx } from "clsx"
import { Typography } from "../Typography"

export interface BrandProps {
  /**
   * Size variant of the brand
   */
  size?: "sm" | "md" | "lg"
  /**
   * Whether to show the logo
   */
  showLogo?: boolean
  /**
   * Whether to show the text
   */
  showText?: boolean
  /**
   * Custom logo source
   */
  logoSrc?: string
  /**
   * Brand text content
   */
  title?: string
  /**
   * Subtitle/tagline text
   */
  subtitle?: string
  /**
   * Click handler for brand
   */
  onClick?: () => void
  /**
   * Additional CSS classes
   */
  className?: string
}

const SIZE_CONFIG = {
  sm: {
    logo: "h-8 w-8",
    titleVariant: "h6" as const,
    subtitleVariant: "caption" as const,
    gap: "gap-2",
  },
  md: {
    logo: "h-10 w-10",
    titleVariant: "title" as const,
    subtitleVariant: "bodySmall" as const,
    gap: "gap-3",
  },
  lg: {
    logo: "h-12 w-12",
    titleVariant: "h4" as const,
    subtitleVariant: "body" as const,
    gap: "gap-4",
  },
} as const

export const Brand = forwardRef<HTMLDivElement, BrandProps>(
  (
    {
      size = "md",
      showLogo = true,
      showText = true,
      logoSrc = "/logo.png",
      title = "Paper Design System",
      subtitle = "A warm, tactile component library",
      onClick,
      className,
      ...props
    },
    ref
  ) => {
    const config = SIZE_CONFIG[size]

    const brandClasses = clsx(
      "flex items-center",
      config.gap,
      onClick && "cursor-pointer hover:opacity-80 transition-opacity",
      className
    )

    const content = (
      <>
        {showLogo && (
          <img
            src={logoSrc}
            alt={`${title} logo`}
            className={clsx(config.logo, "object-contain flex-shrink-0")}
          />
        )}

        {showText && (
          <div className="flex flex-col min-w-0 flex-1">
            <Typography
              variant={config.titleVariant}
              className="font-playfair leading-tight"
            >
              {title}
            </Typography>
            {subtitle && size !== "sm" && (
              <Typography
                variant={config.subtitleVariant}
                color="muted"
                className="mt-0.5"
              >
                {subtitle}
              </Typography>
            )}
          </div>
        )}
      </>
    )

    if (onClick) {
      return (
        <button
          ref={ref as React.RefObject<HTMLButtonElement>}
          onClick={onClick}
          className={brandClasses}
          {...props}
        >
          {content}
        </button>
      )
    }

    return (
      <div ref={ref} className={brandClasses} {...props}>
        {content}
      </div>
    )
  }
)

Brand.displayName = "Brand"
