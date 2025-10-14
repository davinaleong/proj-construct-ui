/**
 * Container-Based Responsive Font Utilities
 *
 * This utility provides font scaling based on container width using CSS container queries.
 * Fonts will scale relative to their immediate container rather than viewport width,
 * providing more precise and component-aware responsive typography.
 *
 * Container Query Breakpoints:
 * - @container (min-width: 320px) - Small container
 * - @container (min-width: 480px) - Medium container
 * - @container (min-width: 640px) - Large container
 * - @container (min-width: 768px) - Extra large container
 * - @container (min-width: 1024px) - XXL container
 */

// Container query font scaling using Tailwind's arbitrary properties
export const containerResponsiveFonts = {
  // Extra small text - scales with container
  xs: "text-xs [container-type:inline-size] [@container(min-width:320px)]:text-sm [@container(min-width:480px)]:text-sm [@container(min-width:640px)]:text-sm",

  // Small text
  sm: "text-sm [container-type:inline-size] [@container(min-width:320px)]:text-sm [@container(min-width:480px)]:text-base [@container(min-width:640px)]:text-base",

  // Base text
  base: "text-sm [container-type:inline-size] [@container(min-width:320px)]:text-base [@container(min-width:480px)]:text-base [@container(min-width:640px)]:text-lg [@container(min-width:768px)]:text-lg",

  // Large text
  lg: "text-base [container-type:inline-size] [@container(min-width:320px)]:text-lg [@container(min-width:480px)]:text-lg [@container(min-width:640px)]:text-xl [@container(min-width:768px)]:text-xl",

  // Extra large text
  xl: "text-lg [container-type:inline-size] [@container(min-width:320px)]:text-xl [@container(min-width:480px)]:text-xl [@container(min-width:640px)]:text-2xl [@container(min-width:768px)]:text-2xl",

  // 2X large text
  "2xl":
    "text-xl [container-type:inline-size] [@container(min-width:320px)]:text-2xl [@container(min-width:480px)]:text-2xl [@container(min-width:640px)]:text-3xl [@container(min-width:768px)]:text-3xl",

  // 3X large text
  "3xl":
    "text-2xl [container-type:inline-size] [@container(min-width:320px)]:text-3xl [@container(min-width:480px)]:text-3xl [@container(min-width:640px)]:text-4xl [@container(min-width:768px)]:text-4xl",

  // 4X large text
  "4xl":
    "text-3xl [container-type:inline-size] [@container(min-width:320px)]:text-4xl [@container(min-width:480px)]:text-4xl [@container(min-width:640px)]:text-5xl [@container(min-width:768px)]:text-5xl",

  // 5X large text
  "5xl":
    "text-4xl [container-type:inline-size] [@container(min-width:320px)]:text-5xl [@container(min-width:480px)]:text-5xl [@container(min-width:640px)]:text-6xl [@container(min-width:768px)]:text-6xl",

  // 6X large text (hero titles)
  "6xl":
    "text-5xl [container-type:inline-size] [@container(min-width:320px)]:text-6xl [@container(min-width:480px)]:text-6xl [@container(min-width:640px)]:text-7xl [@container(min-width:768px)]:text-8xl",
} as const

// Container-aware heading sizes
export const containerResponsiveHeadings = {
  h1: "text-4xl leading-tight [container-type:inline-size] [@container(min-width:320px)]:text-5xl [@container(min-width:480px)]:text-5xl [@container(min-width:640px)]:text-6xl [@container(min-width:768px)]:text-6xl [@container(min-width:1024px)]:text-7xl",
  h2: "text-3xl leading-tight [container-type:inline-size] [@container(min-width:320px)]:text-4xl [@container(min-width:480px)]:text-4xl [@container(min-width:640px)]:text-5xl [@container(min-width:768px)]:text-5xl [@container(min-width:1024px)]:text-6xl",
  h3: "text-2xl leading-snug [container-type:inline-size] [@container(min-width:320px)]:text-3xl [@container(min-width:480px)]:text-3xl [@container(min-width:640px)]:text-4xl [@container(min-width:768px)]:text-4xl [@container(min-width:1024px)]:text-5xl",
  h4: "text-xl leading-snug [container-type:inline-size] [@container(min-width:320px)]:text-2xl [@container(min-width:480px)]:text-2xl [@container(min-width:640px)]:text-3xl [@container(min-width:768px)]:text-3xl [@container(min-width:1024px)]:text-4xl",
  h5: "text-lg leading-normal [container-type:inline-size] [@container(min-width:320px)]:text-xl [@container(min-width:480px)]:text-xl [@container(min-width:640px)]:text-2xl [@container(min-width:768px)]:text-2xl [@container(min-width:1024px)]:text-3xl",
  h6: "text-base leading-normal [container-type:inline-size] [@container(min-width:320px)]:text-lg [@container(min-width:480px)]:text-lg [@container(min-width:640px)]:text-xl [@container(min-width:768px)]:text-xl [@container(min-width:1024px)]:text-2xl",
} as const

// Container-aware body text sizes
export const containerResponsiveBody = {
  // Caption text
  caption:
    "text-xs leading-normal [container-type:inline-size] [@container(min-width:320px)]:text-xs [@container(min-width:480px)]:text-sm [@container(min-width:640px)]:text-sm [@container(min-width:768px)]:text-sm",

  // Small body text
  small:
    "text-sm leading-relaxed [container-type:inline-size] [@container(min-width:320px)]:text-sm [@container(min-width:480px)]:text-base [@container(min-width:640px)]:text-base [@container(min-width:768px)]:text-base",

  // Regular body text
  regular:
    "text-sm leading-relaxed [container-type:inline-size] [@container(min-width:320px)]:text-base [@container(min-width:480px)]:text-base [@container(min-width:640px)]:text-lg [@container(min-width:768px)]:text-lg",

  // Large body text
  large:
    "text-base leading-relaxed [container-type:inline-size] [@container(min-width:320px)]:text-lg [@container(min-width:480px)]:text-lg [@container(min-width:640px)]:text-xl [@container(min-width:768px)]:text-xl",

  // Lead text (article intros)
  lead: "text-lg leading-relaxed [container-type:inline-size] [@container(min-width:320px)]:text-xl [@container(min-width:480px)]:text-xl [@container(min-width:640px)]:text-2xl [@container(min-width:768px)]:text-2xl",
} as const

// Container-aware UI element sizes
export const containerResponsiveUI = {
  // Button text
  button: {
    sm: "text-xs [container-type:inline-size] [@container(min-width:320px)]:text-sm [@container(min-width:480px)]:text-sm [@container(min-width:640px)]:text-sm",
    md: "text-sm [container-type:inline-size] [@container(min-width:320px)]:text-base [@container(min-width:480px)]:text-base [@container(min-width:640px)]:text-base",
    lg: "text-base [container-type:inline-size] [@container(min-width:320px)]:text-lg [@container(min-width:480px)]:text-lg [@container(min-width:640px)]:text-lg",
  },

  // Input text
  input: {
    sm: "text-sm [container-type:inline-size] [@container(min-width:320px)]:text-sm [@container(min-width:480px)]:text-base [@container(min-width:640px)]:text-base",
    md: "text-sm [container-type:inline-size] [@container(min-width:320px)]:text-base [@container(min-width:480px)]:text-base [@container(min-width:640px)]:text-lg",
    lg: "text-base [container-type:inline-size] [@container(min-width:320px)]:text-lg [@container(min-width:480px)]:text-lg [@container(min-width:640px)]:text-xl",
  },

  // Label text
  label:
    "text-sm font-medium [container-type:inline-size] [@container(min-width:320px)]:text-sm [@container(min-width:480px)]:text-base [@container(min-width:640px)]:text-base",

  // Helper text
  helper:
    "text-xs [container-type:inline-size] [@container(min-width:320px)]:text-xs [@container(min-width:480px)]:text-sm [@container(min-width:640px)]:text-sm",

  // Badge text
  badge:
    "text-xs font-medium [container-type:inline-size] [@container(min-width:320px)]:text-xs [@container(min-width:480px)]:text-sm [@container(min-width:640px)]:text-sm",

  // Navigation text
  nav: "text-sm font-medium [container-type:inline-size] [@container(min-width:320px)]:text-base [@container(min-width:480px)]:text-base [@container(min-width:640px)]:text-lg",
} as const

// Utility class to make any element a container query context
export const containerQueryContext = "[container-type:inline-size]"

// Utility function to wrap content with container context
export function withContainerQuery(className: string): string {
  return `${containerQueryContext} ${className}`
}

// Utility functions to get container-aware classes
export function getContainerFontClass(
  size: keyof typeof containerResponsiveFonts
): string {
  return containerResponsiveFonts[size]
}

export function getContainerHeadingClass(
  level: keyof typeof containerResponsiveHeadings
): string {
  return containerResponsiveHeadings[level]
}

export function getContainerBodyClass(
  size: keyof typeof containerResponsiveBody
): string {
  return containerResponsiveBody[size]
}

export function getContainerUIClass(
  element: keyof typeof containerResponsiveUI,
  size?: string
): string {
  const elementSizes = containerResponsiveUI[element]

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

  return containerResponsiveFonts.base
}

// Pre-built container-aware text classes for common use cases
export const containerTextClasses = {
  // Hero section
  hero: {
    title: containerResponsiveHeadings.h1,
    subtitle: containerResponsiveBody.lead,
    caption: containerResponsiveBody.regular,
  },

  // Article/blog
  article: {
    title: containerResponsiveHeadings.h2,
    subtitle: containerResponsiveHeadings.h4,
    lead: containerResponsiveBody.lead,
    body: containerResponsiveBody.regular,
    caption: containerResponsiveBody.caption,
  },

  // Card components
  card: {
    title: containerResponsiveHeadings.h4,
    subtitle: containerResponsiveHeadings.h6,
    body: containerResponsiveBody.small,
    caption: containerResponsiveBody.caption,
  },

  // Navigation
  navigation: {
    primary: containerResponsiveUI.nav,
    secondary: containerResponsiveBody.small,
    breadcrumb: containerResponsiveBody.caption,
  },
} as const

export type ContainerFontSize = keyof typeof containerResponsiveFonts
export type ContainerHeadingSize = keyof typeof containerResponsiveHeadings
export type ContainerBodySize = keyof typeof containerResponsiveBody
export type ContainerUIElement = keyof typeof containerResponsiveUI
