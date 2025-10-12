import { forwardRef } from "react"
import clsx from "clsx"
import { getTextColorClasses } from "../../../utils/colors"
import type { TypographyProps, TypographyVariant } from "./types"

// Map variants to default HTML elements
const VARIANT_ELEMENTS: Record<TypographyVariant, keyof HTMLElementTagNameMap> =
  {
    h1: "h1",
    h2: "h2",
    h3: "h3",
    h4: "h4",
    h5: "h5",
    h6: "h6",
    title: "h2",
    subtitle: "h3",
    body: "p",
    bodyLarge: "p",
    bodySmall: "p",
    caption: "span",
    overline: "span",
    code: "code",
    pre: "pre",
  }

// Typography scale with paper theme fonts
const VARIANT_CLASSES: Record<TypographyVariant, string> = {
  // Headings (Playfair Display)
  h1: "font-playfair text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight",
  h2: "font-playfair text-3xl md:text-4xl font-bold leading-tight tracking-tight",
  h3: "font-playfair text-2xl md:text-3xl font-semibold leading-snug tracking-tight",
  h4: "font-playfair text-xl md:text-2xl font-semibold leading-snug",
  h5: "font-playfair text-lg md:text-xl font-medium leading-snug",
  h6: "font-playfair text-base md:text-lg font-medium leading-normal",

  // Semantic variants (Montserrat)
  title:
    "font-montserrat text-2xl md:text-3xl font-bold leading-tight tracking-tight",
  subtitle:
    "font-montserrat text-lg md:text-xl font-semibold leading-normal text-gray-600 dark:text-gray-400",

  // Body text (Montserrat)
  body: "font-montserrat text-base leading-relaxed",
  bodyLarge: "font-montserrat text-lg leading-relaxed",
  bodySmall: "font-montserrat text-sm leading-normal",

  // Utility text (Montserrat)
  caption:
    "font-montserrat text-xs leading-normal text-gray-500 dark:text-gray-400",
  overline:
    "font-montserrat text-xs font-medium uppercase tracking-wider leading-normal text-gray-500 dark:text-gray-400",

  // Code text (Source Code Pro)
  code: "font-source-code-pro text-sm bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded-md",
  pre: "font-source-code-pro text-sm bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto",
}

const WEIGHT_CLASSES = {
  thin: "font-thin",
  light: "font-light",
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
  extrabold: "font-extrabold",
} as const

const ALIGN_CLASSES = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
  justify: "text-justify",
} as const

export const Typography = forwardRef<HTMLElement, TypographyProps>(
  (
    {
      variant = "body",
      color = "default",
      intensity = "bold",
      weight,
      align,
      truncate = false,
      noWrap = false,
      maxLines,
      className,
      children,
      as,
      ...props
    },
    ref
  ) => {
    // Determine the HTML element
    const Component = as || VARIANT_ELEMENTS[variant]

    // Get base variant classes
    const variantClasses = VARIANT_CLASSES[variant]

    // Get text color classes
    const colorClasses = getTextColorClasses(color, intensity)

    // Build classes
    const typographyClasses = clsx(
      // Base variant styles
      variantClasses,

      // Text color
      colorClasses,

      // Weight override
      weight && WEIGHT_CLASSES[weight],

      // Alignment
      align && ALIGN_CLASSES[align],

      // Text wrapping
      noWrap && "whitespace-nowrap",
      truncate && !maxLines && "truncate",

      // Multi-line truncation
      maxLines &&
        truncate && [
          "overflow-hidden",
          "display: -webkit-box",
          "-webkit-box-orient: vertical",
          { [`-webkit-line-clamp: ${maxLines}`]: true },
        ],

      // Custom classes
      className
    )

    const style =
      maxLines && truncate
        ? {
            display: "-webkit-box",
            WebkitBoxOrient: "vertical" as const,
            WebkitLineClamp: maxLines,
            overflow: "hidden",
          }
        : undefined

    return (
      <Component
        ref={ref}
        className={typographyClasses}
        style={style}
        {...props}
      >
        {children}
      </Component>
    )
  }
)

Typography.displayName = "Typography"
