/**
 * Responsive Font Size Utilities
 *
 * This utility provides consistent font scaling across different screen sizes
 * following a harmonious typographic scale that adapts to viewport width.
 *
 * Breakpoints:
 * - sm: 640px and up (mobile landscape)
 * - md: 768px and up (tablet)
 * - lg: 1024px and up (desktop)
 * - xl: 1280px and up (large desktop)
 * - 2xl: 1536px and up (extra large desktop)
 */

// Base font scale (mobile-first)
export const responsiveFontSizes = {
  // Extra small text
  xs: "text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm",

  // Small text
  sm: "text-sm sm:text-sm md:text-base lg:text-base xl:text-base",

  // Base text
  base: "text-sm sm:text-base md:text-base lg:text-lg xl:text-lg",

  // Large text
  lg: "text-base sm:text-lg md:text-lg lg:text-xl xl:text-xl",

  // Extra large text
  xl: "text-lg sm:text-xl md:text-xl lg:text-2xl xl:text-2xl",

  // 2X large text
  "2xl": "text-xl sm:text-2xl md:text-2xl lg:text-3xl xl:text-3xl",

  // 3X large text
  "3xl": "text-2xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-4xl",

  // 4X large text
  "4xl": "text-3xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-5xl",

  // 5X large text
  "5xl": "text-4xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-6xl",

  // 6X large text (hero titles)
  "6xl": "text-5xl sm:text-6xl md:text-6xl lg:text-7xl xl:text-8xl",

  // 7X large text (display)
  "7xl": "text-6xl sm:text-7xl md:text-7xl lg:text-8xl xl:text-9xl",
} as const

// Responsive font sizes for headings with optimal line heights
export const responsiveHeadingSizes = {
  h1: "text-4xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-6xl leading-tight",
  h2: "text-3xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-5xl leading-tight",
  h3: "text-2xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-4xl leading-snug",
  h4: "text-xl sm:text-2xl md:text-2xl lg:text-3xl xl:text-3xl leading-snug",
  h5: "text-lg sm:text-xl md:text-xl lg:text-2xl xl:text-2xl leading-normal",
  h6: "text-base sm:text-lg md:text-lg lg:text-xl xl:text-xl leading-normal",
} as const

// Responsive font sizes for body text with optimal readability
export const responsiveBodySizes = {
  // Caption text
  caption: "text-xs sm:text-xs md:text-sm lg:text-sm xl:text-sm leading-normal",

  // Small body text
  small:
    "text-sm sm:text-sm md:text-base lg:text-base xl:text-base leading-relaxed",

  // Regular body text
  regular:
    "text-sm sm:text-base md:text-base lg:text-lg xl:text-lg leading-relaxed",

  // Large body text
  large:
    "text-base sm:text-lg md:text-lg lg:text-xl xl:text-xl leading-relaxed",

  // Lead text (article intros)
  lead: "text-lg sm:text-xl md:text-xl lg:text-2xl xl:text-2xl leading-relaxed",
} as const

// Responsive font sizes for UI elements
export const responsiveUISizes = {
  // Button text
  button: {
    sm: "text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm",
    md: "text-sm sm:text-base md:text-base lg:text-base xl:text-base",
    lg: "text-base sm:text-lg md:text-lg lg:text-lg xl:text-lg",
  },

  // Input text
  input: {
    sm: "text-sm sm:text-sm md:text-base lg:text-base xl:text-base",
    md: "text-sm sm:text-base md:text-base lg:text-lg xl:text-lg",
    lg: "text-base sm:text-lg md:text-lg lg:text-xl xl:text-xl",
  },

  // Label text
  label:
    "text-sm sm:text-sm md:text-base lg:text-base xl:text-base font-medium",

  // Helper text
  helper: "text-xs sm:text-xs md:text-sm lg:text-sm xl:text-sm",

  // Badge text
  badge: "text-xs sm:text-xs md:text-sm lg:text-sm xl:text-sm font-medium",

  // Navigation text
  nav: "text-sm sm:text-base md:text-base lg:text-lg xl:text-lg font-medium",
} as const

// Utility function to get responsive font class
export function getResponsiveFontClass(
  size: keyof typeof responsiveFontSizes
): string {
  return responsiveFontSizes[size]
}

// Utility function to get responsive heading class
export function getResponsiveHeadingClass(
  level: keyof typeof responsiveHeadingSizes
): string {
  return responsiveHeadingSizes[level]
}

// Utility function to get responsive body class
export function getResponsiveBodyClass(
  size: keyof typeof responsiveBodySizes
): string {
  return responsiveBodySizes[size]
}

// Utility function to get responsive UI element class
export function getResponsiveUIClass(
  element: keyof typeof responsiveUISizes,
  size?: string
): string {
  const elementSizes = responsiveUISizes[element]

  if (typeof elementSizes === "object" && size && size in elementSizes) {
    return elementSizes[size as keyof typeof elementSizes]
  }

  if (typeof elementSizes === "string") {
    return elementSizes
  }

  // Fallback to medium size for button/input elements
  if (typeof elementSizes === "object" && "md" in elementSizes) {
    return elementSizes.md
  }

  return responsiveFontSizes.base
}

// Pre-built responsive text classes for common use cases
export const responsiveTextClasses = {
  // Hero section
  hero: {
    title: responsiveHeadingSizes.h1,
    subtitle: responsiveBodySizes.lead,
    caption: responsiveBodySizes.regular,
  },

  // Article/blog
  article: {
    title: responsiveHeadingSizes.h2,
    subtitle: responsiveHeadingSizes.h4,
    lead: responsiveBodySizes.lead,
    body: responsiveBodySizes.regular,
    caption: responsiveBodySizes.caption,
  },

  // Card components
  card: {
    title: responsiveHeadingSizes.h4,
    subtitle: responsiveHeadingSizes.h6,
    body: responsiveBodySizes.small,
    caption: responsiveBodySizes.caption,
  },

  // Navigation
  navigation: {
    primary: responsiveUISizes.nav,
    secondary: responsiveBodySizes.small,
    breadcrumb: responsiveBodySizes.caption,
  },
} as const

export type ResponsiveFontSize = keyof typeof responsiveFontSizes
export type ResponsiveHeadingSize = keyof typeof responsiveHeadingSizes
export type ResponsiveBodySize = keyof typeof responsiveBodySizes
export type ResponsiveUIElement = keyof typeof responsiveUISizes
