/**
 * Comprehensive color utilities for the Paper Design System
 *
 * This module provides a complete color system with support for:
 * - All Tailwind CSS color variants (22 total)
 * - 4 color styles: soft, solid, outline, ghost
 * - 4 color intensities: subtle, soft, bold, strong
 * - Light and dark mode support
 * - Custom paper theme colors
 * - Full spectrum of semantic colors (primary, secondary, danger, success, etc.)
 *
 * Colors are designed to work harmoniously with the paper theme (#faf9f6 base)
 * while providing maximum flexibility for component theming.
 */

import clsx from "clsx"

export type ColorVariant =
  | "primary"
  | "secondary"
  | "danger"
  | "success"
  | "warning"
  | "info"
  | "default"
  | "paper"
  | "muted"
  | "accent"
  | "transparent"
  | "custom"
  // Full Tailwind Color Spectrum
  | "slate"
  | "gray"
  | "zinc"
  | "neutral"
  | "stone"
  | "red"
  | "orange"
  | "amber"
  | "yellow"
  | "lime"
  | "green"
  | "emerald"
  | "teal"
  | "cyan"
  | "sky"
  | "blue"
  | "indigo"
  | "violet"
  | "purple"
  | "fuchsia"
  | "pink"
  | "rose"

export type ThemeMode = "light" | "dark" | "paper"

export type ColorIntensity = "subtle" | "soft" | "bold" | "strong"

// Paper theme specific colors
export const paperColors = {
  base: "#faf9f6", // Off-white paper base
  surface: "#ffffff", // Pure white for elevated surfaces
  border: "#e5e3df", // Warm gray borders
  muted: "#8b8680", // Muted text
  accent: "#0f766e", // Teal accent (desaturated)
  accent2: "#7c3aed", // Purple accent (desaturated)
} as const

// Light mode color classes
const lightColorClasses: Record<ColorVariant, string> = {
  primary:
    "bg-blue-50 text-blue-900 border-blue-200 dark:bg-blue-950 dark:text-blue-100 dark:border-blue-800",
  secondary:
    "bg-slate-50 text-slate-900 border-slate-200 dark:bg-slate-900 dark:text-slate-100 dark:border-slate-700",
  danger:
    "bg-red-50 text-red-900 border-red-200 dark:bg-red-950 dark:text-red-100 dark:border-red-800",
  success:
    "bg-green-50 text-green-900 border-green-200 dark:bg-green-950 dark:text-green-100 dark:border-green-800",
  warning:
    "bg-yellow-50 text-yellow-900 border-yellow-200 dark:bg-yellow-950 dark:text-yellow-100 dark:border-yellow-800",
  info: "bg-sky-50 text-sky-900 border-sky-200 dark:bg-sky-950 dark:text-sky-100 dark:border-sky-800",
  default:
    "bg-white text-gray-900 border-gray-200 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700",
  paper:
    "bg-[#faf9f6] text-gray-900 border-[#e5e3df] dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700",
  muted:
    "bg-gray-100 text-gray-600 border-gray-300 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600",
  accent:
    "bg-teal-50 text-teal-900 border-teal-200 dark:bg-teal-950 dark:text-teal-100 dark:border-teal-800",
  transparent:
    "bg-transparent text-gray-900 border-transparent dark:text-gray-100",
  custom: "",
  // Full Tailwind Color Spectrum
  slate:
    "bg-slate-50 text-slate-900 border-slate-200 dark:bg-slate-950 dark:text-slate-100 dark:border-slate-800",
  gray: "bg-gray-50 text-gray-900 border-gray-200 dark:bg-gray-950 dark:text-gray-100 dark:border-gray-800",
  zinc: "bg-zinc-50 text-zinc-900 border-zinc-200 dark:bg-zinc-950 dark:text-zinc-100 dark:border-zinc-800",
  neutral:
    "bg-neutral-50 text-neutral-900 border-neutral-200 dark:bg-neutral-950 dark:text-neutral-100 dark:border-neutral-800",
  stone:
    "bg-stone-50 text-stone-900 border-stone-200 dark:bg-stone-950 dark:text-stone-100 dark:border-stone-800",
  red: "bg-red-50 text-red-900 border-red-200 dark:bg-red-950 dark:text-red-100 dark:border-red-800",
  orange:
    "bg-orange-50 text-orange-900 border-orange-200 dark:bg-orange-950 dark:text-orange-100 dark:border-orange-800",
  amber:
    "bg-amber-50 text-amber-900 border-amber-200 dark:bg-amber-950 dark:text-amber-100 dark:border-amber-800",
  yellow:
    "bg-yellow-50 text-yellow-900 border-yellow-200 dark:bg-yellow-950 dark:text-yellow-100 dark:border-yellow-800",
  lime: "bg-lime-50 text-lime-900 border-lime-200 dark:bg-lime-950 dark:text-lime-100 dark:border-lime-800",
  green:
    "bg-green-50 text-green-900 border-green-200 dark:bg-green-950 dark:text-green-100 dark:border-green-800",
  emerald:
    "bg-emerald-50 text-emerald-900 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-100 dark:border-emerald-800",
  teal: "bg-teal-50 text-teal-900 border-teal-200 dark:bg-teal-950 dark:text-teal-100 dark:border-teal-800",
  cyan: "bg-cyan-50 text-cyan-900 border-cyan-200 dark:bg-cyan-950 dark:text-cyan-100 dark:border-cyan-800",
  sky: "bg-sky-50 text-sky-900 border-sky-200 dark:bg-sky-950 dark:text-sky-100 dark:border-sky-800",
  blue: "bg-blue-50 text-blue-900 border-blue-200 dark:bg-blue-950 dark:text-blue-100 dark:border-blue-800",
  indigo:
    "bg-indigo-50 text-indigo-900 border-indigo-200 dark:bg-indigo-950 dark:text-indigo-100 dark:border-indigo-800",
  violet:
    "bg-violet-50 text-violet-900 border-violet-200 dark:bg-violet-950 dark:text-violet-100 dark:border-violet-800",
  purple:
    "bg-purple-50 text-purple-900 border-purple-200 dark:bg-purple-950 dark:text-purple-100 dark:border-purple-800",
  fuchsia:
    "bg-fuchsia-50 text-fuchsia-900 border-fuchsia-200 dark:bg-fuchsia-950 dark:text-fuchsia-100 dark:border-fuchsia-800",
  pink: "bg-pink-50 text-pink-900 border-pink-200 dark:bg-pink-950 dark:text-pink-100 dark:border-pink-800",
  rose: "bg-rose-50 text-rose-900 border-rose-200 dark:bg-rose-950 dark:text-rose-100 dark:border-rose-800",
}

// Solid color variants (for buttons, badges, etc.)
const solidColorClasses: Record<ColorVariant, string> = {
  primary:
    "bg-blue-600 text-white border-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600",
  secondary:
    "bg-slate-600 text-white border-slate-600 hover:bg-slate-700 dark:bg-slate-500 dark:hover:bg-slate-600",
  danger:
    "bg-red-600 text-white border-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600",
  success:
    "bg-green-600 text-white border-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600",
  warning:
    "bg-yellow-600 text-white border-yellow-600 hover:bg-yellow-700 dark:bg-yellow-500 dark:hover:bg-yellow-600",
  info: "bg-sky-600 text-white border-sky-600 hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-600",
  default:
    "bg-gray-600 text-white border-gray-600 hover:bg-gray-700 dark:bg-gray-500 dark:hover:bg-gray-600",
  paper:
    "bg-[#0f766e] text-white border-[#0f766e] hover:bg-[#0d5d56] dark:bg-teal-500 dark:hover:bg-teal-600",
  muted:
    "bg-gray-400 text-white border-gray-400 hover:bg-gray-500 dark:bg-gray-600 dark:hover:bg-gray-700",
  accent:
    "bg-teal-600 text-white border-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600",
  transparent:
    "bg-transparent text-gray-600 border-transparent hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800",
  custom: "",
  // Full Tailwind Color Spectrum
  slate:
    "bg-slate-600 text-white border-slate-600 hover:bg-slate-700 dark:bg-slate-500 dark:hover:bg-slate-600",
  gray: "bg-gray-600 text-white border-gray-600 hover:bg-gray-700 dark:bg-gray-500 dark:hover:bg-gray-600",
  zinc: "bg-zinc-600 text-white border-zinc-600 hover:bg-zinc-700 dark:bg-zinc-500 dark:hover:bg-zinc-600",
  neutral:
    "bg-neutral-600 text-white border-neutral-600 hover:bg-neutral-700 dark:bg-neutral-500 dark:hover:bg-neutral-600",
  stone:
    "bg-stone-600 text-white border-stone-600 hover:bg-stone-700 dark:bg-stone-500 dark:hover:bg-stone-600",
  red: "bg-red-600 text-white border-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600",
  orange:
    "bg-orange-600 text-white border-orange-600 hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600",
  amber:
    "bg-amber-600 text-white border-amber-600 hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-600",
  yellow:
    "bg-yellow-600 text-white border-yellow-600 hover:bg-yellow-700 dark:bg-yellow-500 dark:hover:bg-yellow-600",
  lime: "bg-lime-600 text-white border-lime-600 hover:bg-lime-700 dark:bg-lime-500 dark:hover:bg-lime-600",
  green:
    "bg-green-600 text-white border-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600",
  emerald:
    "bg-emerald-600 text-white border-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600",
  teal: "bg-teal-600 text-white border-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600",
  cyan: "bg-cyan-600 text-white border-cyan-600 hover:bg-cyan-700 dark:bg-cyan-500 dark:hover:bg-cyan-600",
  sky: "bg-sky-600 text-white border-sky-600 hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-600",
  blue: "bg-blue-600 text-white border-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600",
  indigo:
    "bg-indigo-600 text-white border-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600",
  violet:
    "bg-violet-600 text-white border-violet-600 hover:bg-violet-700 dark:bg-violet-500 dark:hover:bg-violet-600",
  purple:
    "bg-purple-600 text-white border-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600",
  fuchsia:
    "bg-fuchsia-600 text-white border-fuchsia-600 hover:bg-fuchsia-700 dark:bg-fuchsia-500 dark:hover:bg-fuchsia-600",
  pink: "bg-pink-600 text-white border-pink-600 hover:bg-pink-700 dark:bg-pink-500 dark:hover:bg-pink-600",
  rose: "bg-rose-600 text-white border-rose-600 hover:bg-rose-700 dark:bg-rose-500 dark:hover:bg-rose-600",
}

// Outline color variants
const outlineColorClasses: Record<ColorVariant, string> = {
  primary:
    "bg-transparent text-blue-600 border-blue-300 hover:bg-blue-50 dark:text-blue-400 dark:border-blue-600 dark:hover:bg-blue-950",
  secondary:
    "bg-transparent text-slate-600 border-slate-300 hover:bg-slate-50 dark:text-slate-400 dark:border-slate-600 dark:hover:bg-slate-950",
  danger:
    "bg-transparent text-red-600 border-red-300 hover:bg-red-50 dark:text-red-400 dark:border-red-600 dark:hover:bg-red-950",
  success:
    "bg-transparent text-green-600 border-green-300 hover:bg-green-50 dark:text-green-400 dark:border-green-600 dark:hover:bg-green-950",
  warning:
    "bg-transparent text-yellow-600 border-yellow-300 hover:bg-yellow-50 dark:text-yellow-400 dark:border-yellow-600 dark:hover:bg-yellow-950",
  info: "bg-transparent text-sky-600 border-sky-300 hover:bg-sky-50 dark:text-sky-400 dark:border-sky-600 dark:hover:bg-sky-950",
  default:
    "bg-transparent text-gray-600 border-gray-300 hover:bg-gray-50 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-900",
  paper:
    "bg-transparent text-[#0f766e] border-[#e5e3df] hover:bg-[#faf9f6] dark:text-teal-400 dark:border-gray-600 dark:hover:bg-gray-900",
  muted:
    "bg-transparent text-gray-500 border-gray-300 hover:bg-gray-50 dark:text-gray-500 dark:border-gray-600 dark:hover:bg-gray-900",
  accent:
    "bg-transparent text-teal-600 border-teal-300 hover:bg-teal-50 dark:text-teal-400 dark:border-teal-600 dark:hover:bg-teal-950",
  transparent:
    "bg-transparent text-gray-600 border-transparent hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800",
  custom: "",
  // Full Tailwind Color Spectrum
  slate:
    "bg-transparent text-slate-600 border-slate-300 hover:bg-slate-50 dark:text-slate-400 dark:border-slate-600 dark:hover:bg-slate-950",
  gray: "bg-transparent text-gray-600 border-gray-300 hover:bg-gray-50 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-950",
  zinc: "bg-transparent text-zinc-600 border-zinc-300 hover:bg-zinc-50 dark:text-zinc-400 dark:border-zinc-600 dark:hover:bg-zinc-950",
  neutral:
    "bg-transparent text-neutral-600 border-neutral-300 hover:bg-neutral-50 dark:text-neutral-400 dark:border-neutral-600 dark:hover:bg-neutral-950",
  stone:
    "bg-transparent text-stone-600 border-stone-300 hover:bg-stone-50 dark:text-stone-400 dark:border-stone-600 dark:hover:bg-stone-950",
  red: "bg-transparent text-red-600 border-red-300 hover:bg-red-50 dark:text-red-400 dark:border-red-600 dark:hover:bg-red-950",
  orange:
    "bg-transparent text-orange-600 border-orange-300 hover:bg-orange-50 dark:text-orange-400 dark:border-orange-600 dark:hover:bg-orange-950",
  amber:
    "bg-transparent text-amber-600 border-amber-300 hover:bg-amber-50 dark:text-amber-400 dark:border-amber-600 dark:hover:bg-amber-950",
  yellow:
    "bg-transparent text-yellow-600 border-yellow-300 hover:bg-yellow-50 dark:text-yellow-400 dark:border-yellow-600 dark:hover:bg-yellow-950",
  lime: "bg-transparent text-lime-600 border-lime-300 hover:bg-lime-50 dark:text-lime-400 dark:border-lime-600 dark:hover:bg-lime-950",
  green:
    "bg-transparent text-green-600 border-green-300 hover:bg-green-50 dark:text-green-400 dark:border-green-600 dark:hover:bg-green-950",
  emerald:
    "bg-transparent text-emerald-600 border-emerald-300 hover:bg-emerald-50 dark:text-emerald-400 dark:border-emerald-600 dark:hover:bg-emerald-950",
  teal: "bg-transparent text-teal-600 border-teal-300 hover:bg-teal-50 dark:text-teal-400 dark:border-teal-600 dark:hover:bg-teal-950",
  cyan: "bg-transparent text-cyan-600 border-cyan-300 hover:bg-cyan-50 dark:text-cyan-400 dark:border-cyan-600 dark:hover:bg-cyan-950",
  sky: "bg-transparent text-sky-600 border-sky-300 hover:bg-sky-50 dark:text-sky-400 dark:border-sky-600 dark:hover:bg-sky-950",
  blue: "bg-transparent text-blue-600 border-blue-300 hover:bg-blue-50 dark:text-blue-400 dark:border-blue-600 dark:hover:bg-blue-950",
  indigo:
    "bg-transparent text-indigo-600 border-indigo-300 hover:bg-indigo-50 dark:text-indigo-400 dark:border-indigo-600 dark:hover:bg-indigo-950",
  violet:
    "bg-transparent text-violet-600 border-violet-300 hover:bg-violet-50 dark:text-violet-400 dark:border-violet-600 dark:hover:bg-violet-950",
  purple:
    "bg-transparent text-purple-600 border-purple-300 hover:bg-purple-50 dark:text-purple-400 dark:border-purple-600 dark:hover:bg-purple-950",
  fuchsia:
    "bg-transparent text-fuchsia-600 border-fuchsia-300 hover:bg-fuchsia-50 dark:text-fuchsia-400 dark:border-fuchsia-600 dark:hover:bg-fuchsia-950",
  pink: "bg-transparent text-pink-600 border-pink-300 hover:bg-pink-50 dark:text-pink-400 dark:border-pink-600 dark:hover:bg-pink-950",
  rose: "bg-transparent text-rose-600 border-rose-300 hover:bg-rose-50 dark:text-rose-400 dark:border-rose-600 dark:hover:bg-rose-950",
}

// Ghost color variants (minimal styling)
const ghostColorClasses: Record<ColorVariant, string> = {
  primary:
    "bg-transparent text-blue-600 border-transparent hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-950/50",
  secondary:
    "bg-transparent text-slate-600 border-transparent hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-950/50",
  danger:
    "bg-transparent text-red-600 border-transparent hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/50",
  success:
    "bg-transparent text-green-600 border-transparent hover:bg-green-50 dark:text-green-400 dark:hover:bg-green-950/50",
  warning:
    "bg-transparent text-yellow-600 border-transparent hover:bg-yellow-50 dark:text-yellow-400 dark:hover:bg-yellow-950/50",
  info: "bg-transparent text-sky-600 border-transparent hover:bg-sky-50 dark:text-sky-400 dark:hover:bg-sky-950/50",
  default:
    "bg-transparent text-gray-600 border-transparent hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-900/50",
  paper:
    "bg-transparent text-[#0f766e] border-transparent hover:bg-[#faf9f6] dark:text-teal-400 dark:hover:bg-gray-900/50",
  muted:
    "bg-transparent text-gray-500 border-transparent hover:bg-gray-50 dark:text-gray-500 dark:hover:bg-gray-900/50",
  accent:
    "bg-transparent text-teal-600 border-transparent hover:bg-teal-50 dark:text-teal-400 dark:hover:bg-teal-950/50",
  transparent:
    "bg-transparent text-gray-600 border-transparent hover:bg-gray-100/50 dark:text-gray-400 dark:hover:bg-gray-800/50",
  custom: "",
  // Full Tailwind Color Spectrum
  slate:
    "bg-transparent text-slate-600 border-transparent hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-950/50",
  gray: "bg-transparent text-gray-600 border-transparent hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-950/50",
  zinc: "bg-transparent text-zinc-600 border-transparent hover:bg-zinc-50 dark:text-zinc-400 dark:hover:bg-zinc-950/50",
  neutral:
    "bg-transparent text-neutral-600 border-transparent hover:bg-neutral-50 dark:text-neutral-400 dark:hover:bg-neutral-950/50",
  stone:
    "bg-transparent text-stone-600 border-transparent hover:bg-stone-50 dark:text-stone-400 dark:hover:bg-stone-950/50",
  red: "bg-transparent text-red-600 border-transparent hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/50",
  orange:
    "bg-transparent text-orange-600 border-transparent hover:bg-orange-50 dark:text-orange-400 dark:hover:bg-orange-950/50",
  amber:
    "bg-transparent text-amber-600 border-transparent hover:bg-amber-50 dark:text-amber-400 dark:hover:bg-amber-950/50",
  yellow:
    "bg-transparent text-yellow-600 border-transparent hover:bg-yellow-50 dark:text-yellow-400 dark:hover:bg-yellow-950/50",
  lime: "bg-transparent text-lime-600 border-transparent hover:bg-lime-50 dark:text-lime-400 dark:hover:bg-lime-950/50",
  green:
    "bg-transparent text-green-600 border-transparent hover:bg-green-50 dark:text-green-400 dark:hover:bg-green-950/50",
  emerald:
    "bg-transparent text-emerald-600 border-transparent hover:bg-emerald-50 dark:text-emerald-400 dark:hover:bg-emerald-950/50",
  teal: "bg-transparent text-teal-600 border-transparent hover:bg-teal-50 dark:text-teal-400 dark:hover:bg-teal-950/50",
  cyan: "bg-transparent text-cyan-600 border-transparent hover:bg-cyan-50 dark:text-cyan-400 dark:hover:bg-cyan-950/50",
  sky: "bg-transparent text-sky-600 border-transparent hover:bg-sky-50 dark:text-sky-400 dark:hover:bg-sky-950/50",
  blue: "bg-transparent text-blue-600 border-transparent hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-950/50",
  indigo:
    "bg-transparent text-indigo-600 border-transparent hover:bg-indigo-50 dark:text-indigo-400 dark:hover:bg-indigo-950/50",
  violet:
    "bg-transparent text-violet-600 border-transparent hover:bg-violet-50 dark:text-violet-400 dark:hover:bg-violet-950/50",
  purple:
    "bg-transparent text-purple-600 border-transparent hover:bg-purple-50 dark:text-purple-400 dark:hover:bg-purple-950/50",
  fuchsia:
    "bg-transparent text-fuchsia-600 border-transparent hover:bg-fuchsia-50 dark:text-fuchsia-400 dark:hover:bg-fuchsia-950/50",
  pink: "bg-transparent text-pink-600 border-transparent hover:bg-pink-50 dark:text-pink-400 dark:hover:bg-pink-950/50",
  rose: "bg-transparent text-rose-600 border-transparent hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-950/50",
}

export type ColorStyle = "soft" | "solid" | "outline" | "ghost"

/**
 * Get Tailwind classes for a given color variant and style.
 *
 * @param color - One of the supported color variants
 * @param style - The styling approach (soft, solid, outline, ghost)
 * @param extra - Optional extra classes to merge
 */
export function getColorClasses(
  color: ColorVariant = "default",
  style: ColorStyle = "soft",
  extra?: string
) {
  let classes = ""

  switch (style) {
    case "soft":
      classes = lightColorClasses[color]
      break
    case "solid":
      classes = solidColorClasses[color]
      break
    case "outline":
      classes = outlineColorClasses[color]
      break
    case "ghost":
      classes = ghostColorClasses[color]
      break
  }

  return clsx(classes, extra)
}

/**
 * Get text color classes for a given color variant.
 *
 * @param color - One of the supported color variants
 * @param intensity - The color intensity
 * @param extra - Optional extra classes to merge
 */
export function getTextColorClasses(
  color: ColorVariant = "default",
  intensity: ColorIntensity = "bold",
  extra?: string
) {
  const textClasses: Record<ColorVariant, Record<ColorIntensity, string>> = {
    primary: {
      subtle: "text-blue-400 dark:text-blue-500",
      soft: "text-blue-500 dark:text-blue-400",
      bold: "text-blue-600 dark:text-blue-400",
      strong: "text-blue-700 dark:text-blue-300",
    },
    secondary: {
      subtle: "text-slate-400 dark:text-slate-500",
      soft: "text-slate-500 dark:text-slate-400",
      bold: "text-slate-600 dark:text-slate-400",
      strong: "text-slate-700 dark:text-slate-300",
    },
    danger: {
      subtle: "text-red-400 dark:text-red-500",
      soft: "text-red-500 dark:text-red-400",
      bold: "text-red-600 dark:text-red-400",
      strong: "text-red-700 dark:text-red-300",
    },
    success: {
      subtle: "text-green-400 dark:text-green-500",
      soft: "text-green-500 dark:text-green-400",
      bold: "text-green-600 dark:text-green-400",
      strong: "text-green-700 dark:text-green-300",
    },
    warning: {
      subtle: "text-yellow-400 dark:text-yellow-500",
      soft: "text-yellow-500 dark:text-yellow-400",
      bold: "text-yellow-600 dark:text-yellow-400",
      strong: "text-yellow-700 dark:text-yellow-300",
    },
    info: {
      subtle: "text-sky-400 dark:text-sky-500",
      soft: "text-sky-500 dark:text-sky-400",
      bold: "text-sky-600 dark:text-sky-400",
      strong: "text-sky-700 dark:text-sky-300",
    },
    default: {
      subtle: "text-gray-400 dark:text-gray-500",
      soft: "text-gray-500 dark:text-gray-400",
      bold: "text-gray-600 dark:text-gray-300",
      strong: "text-gray-700 dark:text-gray-200",
    },
    paper: {
      subtle: "text-[#8b8680] dark:text-gray-500",
      soft: "text-[#0f766e] dark:text-teal-400",
      bold: "text-[#0d5d56] dark:text-teal-300",
      strong: "text-gray-900 dark:text-gray-100",
    },
    muted: {
      subtle: "text-gray-400 dark:text-gray-600",
      soft: "text-gray-500 dark:text-gray-500",
      bold: "text-gray-600 dark:text-gray-400",
      strong: "text-gray-700 dark:text-gray-300",
    },
    accent: {
      subtle: "text-teal-400 dark:text-teal-500",
      soft: "text-teal-500 dark:text-teal-400",
      bold: "text-teal-600 dark:text-teal-400",
      strong: "text-teal-700 dark:text-teal-300",
    },
    transparent: {
      subtle: "text-gray-400 dark:text-gray-500",
      soft: "text-gray-500 dark:text-gray-400",
      bold: "text-gray-600 dark:text-gray-300",
      strong: "text-gray-700 dark:text-gray-200",
    },
    custom: {
      subtle: "",
      soft: "",
      bold: "",
      strong: "",
    },
    // Full Tailwind Color Spectrum
    slate: {
      subtle: "text-slate-400 dark:text-slate-500",
      soft: "text-slate-500 dark:text-slate-400",
      bold: "text-slate-600 dark:text-slate-400",
      strong: "text-slate-700 dark:text-slate-300",
    },
    gray: {
      subtle: "text-gray-400 dark:text-gray-500",
      soft: "text-gray-500 dark:text-gray-400",
      bold: "text-gray-600 dark:text-gray-400",
      strong: "text-gray-700 dark:text-gray-300",
    },
    zinc: {
      subtle: "text-zinc-400 dark:text-zinc-500",
      soft: "text-zinc-500 dark:text-zinc-400",
      bold: "text-zinc-600 dark:text-zinc-400",
      strong: "text-zinc-700 dark:text-zinc-300",
    },
    neutral: {
      subtle: "text-neutral-400 dark:text-neutral-500",
      soft: "text-neutral-500 dark:text-neutral-400",
      bold: "text-neutral-600 dark:text-neutral-400",
      strong: "text-neutral-700 dark:text-neutral-300",
    },
    stone: {
      subtle: "text-stone-400 dark:text-stone-500",
      soft: "text-stone-500 dark:text-stone-400",
      bold: "text-stone-600 dark:text-stone-400",
      strong: "text-stone-700 dark:text-stone-300",
    },
    red: {
      subtle: "text-red-400 dark:text-red-500",
      soft: "text-red-500 dark:text-red-400",
      bold: "text-red-600 dark:text-red-400",
      strong: "text-red-700 dark:text-red-300",
    },
    orange: {
      subtle: "text-orange-400 dark:text-orange-500",
      soft: "text-orange-500 dark:text-orange-400",
      bold: "text-orange-600 dark:text-orange-400",
      strong: "text-orange-700 dark:text-orange-300",
    },
    amber: {
      subtle: "text-amber-400 dark:text-amber-500",
      soft: "text-amber-500 dark:text-amber-400",
      bold: "text-amber-600 dark:text-amber-400",
      strong: "text-amber-700 dark:text-amber-300",
    },
    yellow: {
      subtle: "text-yellow-400 dark:text-yellow-500",
      soft: "text-yellow-500 dark:text-yellow-400",
      bold: "text-yellow-600 dark:text-yellow-400",
      strong: "text-yellow-700 dark:text-yellow-300",
    },
    lime: {
      subtle: "text-lime-400 dark:text-lime-500",
      soft: "text-lime-500 dark:text-lime-400",
      bold: "text-lime-600 dark:text-lime-400",
      strong: "text-lime-700 dark:text-lime-300",
    },
    green: {
      subtle: "text-green-400 dark:text-green-500",
      soft: "text-green-500 dark:text-green-400",
      bold: "text-green-600 dark:text-green-400",
      strong: "text-green-700 dark:text-green-300",
    },
    emerald: {
      subtle: "text-emerald-400 dark:text-emerald-500",
      soft: "text-emerald-500 dark:text-emerald-400",
      bold: "text-emerald-600 dark:text-emerald-400",
      strong: "text-emerald-700 dark:text-emerald-300",
    },
    teal: {
      subtle: "text-teal-400 dark:text-teal-500",
      soft: "text-teal-500 dark:text-teal-400",
      bold: "text-teal-600 dark:text-teal-400",
      strong: "text-teal-700 dark:text-teal-300",
    },
    cyan: {
      subtle: "text-cyan-400 dark:text-cyan-500",
      soft: "text-cyan-500 dark:text-cyan-400",
      bold: "text-cyan-600 dark:text-cyan-400",
      strong: "text-cyan-700 dark:text-cyan-300",
    },
    sky: {
      subtle: "text-sky-400 dark:text-sky-500",
      soft: "text-sky-500 dark:text-sky-400",
      bold: "text-sky-600 dark:text-sky-400",
      strong: "text-sky-700 dark:text-sky-300",
    },
    blue: {
      subtle: "text-blue-400 dark:text-blue-500",
      soft: "text-blue-500 dark:text-blue-400",
      bold: "text-blue-600 dark:text-blue-400",
      strong: "text-blue-700 dark:text-blue-300",
    },
    indigo: {
      subtle: "text-indigo-400 dark:text-indigo-500",
      soft: "text-indigo-500 dark:text-indigo-400",
      bold: "text-indigo-600 dark:text-indigo-400",
      strong: "text-indigo-700 dark:text-indigo-300",
    },
    violet: {
      subtle: "text-violet-400 dark:text-violet-500",
      soft: "text-violet-500 dark:text-violet-400",
      bold: "text-violet-600 dark:text-violet-400",
      strong: "text-violet-700 dark:text-violet-300",
    },
    purple: {
      subtle: "text-purple-400 dark:text-purple-500",
      soft: "text-purple-500 dark:text-purple-400",
      bold: "text-purple-600 dark:text-purple-400",
      strong: "text-purple-700 dark:text-purple-300",
    },
    fuchsia: {
      subtle: "text-fuchsia-400 dark:text-fuchsia-500",
      soft: "text-fuchsia-500 dark:text-fuchsia-400",
      bold: "text-fuchsia-600 dark:text-fuchsia-400",
      strong: "text-fuchsia-700 dark:text-fuchsia-300",
    },
    pink: {
      subtle: "text-pink-400 dark:text-pink-500",
      soft: "text-pink-500 dark:text-pink-400",
      bold: "text-pink-600 dark:text-pink-400",
      strong: "text-pink-700 dark:text-pink-300",
    },
    rose: {
      subtle: "text-rose-400 dark:text-rose-500",
      soft: "text-rose-500 dark:text-rose-400",
      bold: "text-rose-600 dark:text-rose-400",
      strong: "text-rose-700 dark:text-rose-300",
    },
  }

  return clsx(textClasses[color][intensity], extra)
}

/**
 * Get background color classes for a given color variant.
 *
 * @param color - One of the supported color variants
 * @param intensity - The color intensity
 * @param extra - Optional extra classes to merge
 */
export function getBackgroundColorClasses(
  color: ColorVariant = "default",
  intensity: ColorIntensity = "soft",
  extra?: string
) {
  const bgClasses: Record<ColorVariant, Record<ColorIntensity, string>> = {
    primary: {
      subtle: "bg-blue-50 dark:bg-blue-950/30",
      soft: "bg-blue-100 dark:bg-blue-950/50",
      bold: "bg-blue-500 dark:bg-blue-600",
      strong: "bg-blue-600 dark:bg-blue-500",
    },
    secondary: {
      subtle: "bg-slate-50 dark:bg-slate-950/30",
      soft: "bg-slate-100 dark:bg-slate-950/50",
      bold: "bg-slate-500 dark:bg-slate-600",
      strong: "bg-slate-600 dark:bg-slate-500",
    },
    danger: {
      subtle: "bg-red-50 dark:bg-red-950/30",
      soft: "bg-red-100 dark:bg-red-950/50",
      bold: "bg-red-500 dark:bg-red-600",
      strong: "bg-red-600 dark:bg-red-500",
    },
    success: {
      subtle: "bg-green-50 dark:bg-green-950/30",
      soft: "bg-green-100 dark:bg-green-950/50",
      bold: "bg-green-500 dark:bg-green-600",
      strong: "bg-green-600 dark:bg-green-500",
    },
    warning: {
      subtle: "bg-yellow-50 dark:bg-yellow-950/30",
      soft: "bg-yellow-100 dark:bg-yellow-950/50",
      bold: "bg-yellow-500 dark:bg-yellow-600",
      strong: "bg-yellow-600 dark:bg-yellow-500",
    },
    info: {
      subtle: "bg-sky-50 dark:bg-sky-950/30",
      soft: "bg-sky-100 dark:bg-sky-950/50",
      bold: "bg-sky-500 dark:bg-sky-600",
      strong: "bg-sky-600 dark:bg-sky-500",
    },
    default: {
      subtle: "bg-gray-50 dark:bg-gray-950/30",
      soft: "bg-gray-100 dark:bg-gray-900/50",
      bold: "bg-gray-500 dark:bg-gray-600",
      strong: "bg-gray-600 dark:bg-gray-500",
    },
    paper: {
      subtle: "bg-[#faf9f6] dark:bg-gray-950/30",
      soft: "bg-white dark:bg-gray-900/50",
      bold: "bg-[#0f766e] dark:bg-teal-600",
      strong: "bg-[#0d5d56] dark:bg-teal-500",
    },
    muted: {
      subtle: "bg-gray-100 dark:bg-gray-800/30",
      soft: "bg-gray-200 dark:bg-gray-800/50",
      bold: "bg-gray-400 dark:bg-gray-600",
      strong: "bg-gray-500 dark:bg-gray-500",
    },
    accent: {
      subtle: "bg-teal-50 dark:bg-teal-950/30",
      soft: "bg-teal-100 dark:bg-teal-950/50",
      bold: "bg-teal-500 dark:bg-teal-600",
      strong: "bg-teal-600 dark:bg-teal-500",
    },
    transparent: {
      subtle: "bg-transparent",
      soft: "bg-transparent",
      bold: "bg-transparent",
      strong: "bg-transparent",
    },
    custom: {
      subtle: "",
      soft: "",
      bold: "",
      strong: "",
    },
    // Full Tailwind Color Spectrum
    slate: {
      subtle: "bg-slate-50 dark:bg-slate-950/30",
      soft: "bg-slate-100 dark:bg-slate-950/50",
      bold: "bg-slate-500 dark:bg-slate-600",
      strong: "bg-slate-600 dark:bg-slate-500",
    },
    gray: {
      subtle: "bg-gray-50 dark:bg-gray-950/30",
      soft: "bg-gray-100 dark:bg-gray-950/50",
      bold: "bg-gray-500 dark:bg-gray-600",
      strong: "bg-gray-600 dark:bg-gray-500",
    },
    zinc: {
      subtle: "bg-zinc-50 dark:bg-zinc-950/30",
      soft: "bg-zinc-100 dark:bg-zinc-950/50",
      bold: "bg-zinc-500 dark:bg-zinc-600",
      strong: "bg-zinc-600 dark:bg-zinc-500",
    },
    neutral: {
      subtle: "bg-neutral-50 dark:bg-neutral-950/30",
      soft: "bg-neutral-100 dark:bg-neutral-950/50",
      bold: "bg-neutral-500 dark:bg-neutral-600",
      strong: "bg-neutral-600 dark:bg-neutral-500",
    },
    stone: {
      subtle: "bg-stone-50 dark:bg-stone-950/30",
      soft: "bg-stone-100 dark:bg-stone-950/50",
      bold: "bg-stone-500 dark:bg-stone-600",
      strong: "bg-stone-600 dark:bg-stone-500",
    },
    red: {
      subtle: "bg-red-50 dark:bg-red-950/30",
      soft: "bg-red-100 dark:bg-red-950/50",
      bold: "bg-red-500 dark:bg-red-600",
      strong: "bg-red-600 dark:bg-red-500",
    },
    orange: {
      subtle: "bg-orange-50 dark:bg-orange-950/30",
      soft: "bg-orange-100 dark:bg-orange-950/50",
      bold: "bg-orange-500 dark:bg-orange-600",
      strong: "bg-orange-600 dark:bg-orange-500",
    },
    amber: {
      subtle: "bg-amber-50 dark:bg-amber-950/30",
      soft: "bg-amber-100 dark:bg-amber-950/50",
      bold: "bg-amber-500 dark:bg-amber-600",
      strong: "bg-amber-600 dark:bg-amber-500",
    },
    yellow: {
      subtle: "bg-yellow-50 dark:bg-yellow-950/30",
      soft: "bg-yellow-100 dark:bg-yellow-950/50",
      bold: "bg-yellow-500 dark:bg-yellow-600",
      strong: "bg-yellow-600 dark:bg-yellow-500",
    },
    lime: {
      subtle: "bg-lime-50 dark:bg-lime-950/30",
      soft: "bg-lime-100 dark:bg-lime-950/50",
      bold: "bg-lime-500 dark:bg-lime-600",
      strong: "bg-lime-600 dark:bg-lime-500",
    },
    green: {
      subtle: "bg-green-50 dark:bg-green-950/30",
      soft: "bg-green-100 dark:bg-green-950/50",
      bold: "bg-green-500 dark:bg-green-600",
      strong: "bg-green-600 dark:bg-green-500",
    },
    emerald: {
      subtle: "bg-emerald-50 dark:bg-emerald-950/30",
      soft: "bg-emerald-100 dark:bg-emerald-950/50",
      bold: "bg-emerald-500 dark:bg-emerald-600",
      strong: "bg-emerald-600 dark:bg-emerald-500",
    },
    teal: {
      subtle: "bg-teal-50 dark:bg-teal-950/30",
      soft: "bg-teal-100 dark:bg-teal-950/50",
      bold: "bg-teal-500 dark:bg-teal-600",
      strong: "bg-teal-600 dark:bg-teal-500",
    },
    cyan: {
      subtle: "bg-cyan-50 dark:bg-cyan-950/30",
      soft: "bg-cyan-100 dark:bg-cyan-950/50",
      bold: "bg-cyan-500 dark:bg-cyan-600",
      strong: "bg-cyan-600 dark:bg-cyan-500",
    },
    sky: {
      subtle: "bg-sky-50 dark:bg-sky-950/30",
      soft: "bg-sky-100 dark:bg-sky-950/50",
      bold: "bg-sky-500 dark:bg-sky-600",
      strong: "bg-sky-600 dark:bg-sky-500",
    },
    blue: {
      subtle: "bg-blue-50 dark:bg-blue-950/30",
      soft: "bg-blue-100 dark:bg-blue-950/50",
      bold: "bg-blue-500 dark:bg-blue-600",
      strong: "bg-blue-600 dark:bg-blue-500",
    },
    indigo: {
      subtle: "bg-indigo-50 dark:bg-indigo-950/30",
      soft: "bg-indigo-100 dark:bg-indigo-950/50",
      bold: "bg-indigo-500 dark:bg-indigo-600",
      strong: "bg-indigo-600 dark:bg-indigo-500",
    },
    violet: {
      subtle: "bg-violet-50 dark:bg-violet-950/30",
      soft: "bg-violet-100 dark:bg-violet-950/50",
      bold: "bg-violet-500 dark:bg-violet-600",
      strong: "bg-violet-600 dark:bg-violet-500",
    },
    purple: {
      subtle: "bg-purple-50 dark:bg-purple-950/30",
      soft: "bg-purple-100 dark:bg-purple-950/50",
      bold: "bg-purple-500 dark:bg-purple-600",
      strong: "bg-purple-600 dark:bg-purple-500",
    },
    fuchsia: {
      subtle: "bg-fuchsia-50 dark:bg-fuchsia-950/30",
      soft: "bg-fuchsia-100 dark:bg-fuchsia-950/50",
      bold: "bg-fuchsia-500 dark:bg-fuchsia-600",
      strong: "bg-fuchsia-600 dark:bg-fuchsia-500",
    },
    pink: {
      subtle: "bg-pink-50 dark:bg-pink-950/30",
      soft: "bg-pink-100 dark:bg-pink-950/50",
      bold: "bg-pink-500 dark:bg-pink-600",
      strong: "bg-pink-600 dark:bg-pink-500",
    },
    rose: {
      subtle: "bg-rose-50 dark:bg-rose-950/30",
      soft: "bg-rose-100 dark:bg-rose-950/50",
      bold: "bg-rose-500 dark:bg-rose-600",
      strong: "bg-rose-600 dark:bg-rose-500",
    },
  }

  return clsx(bgClasses[color][intensity], extra)
}

/**
 * Get border color classes for a given color variant.
 *
 * @param color - One of the supported color variants
 * @param extra - Optional extra classes to merge
 */
export function getBorderColorClasses(
  color: ColorVariant = "default",
  extra?: string
) {
  const borderClasses: Record<ColorVariant, string> = {
    primary: "border-blue-200 dark:border-blue-800",
    secondary: "border-slate-200 dark:border-slate-700",
    danger: "border-red-200 dark:border-red-800",
    success: "border-green-200 dark:border-green-800",
    warning: "border-yellow-200 dark:border-yellow-800",
    info: "border-sky-200 dark:border-sky-800",
    default: "border-gray-200 dark:border-gray-700",
    paper: "border-[#e5e3df] dark:border-gray-700",
    muted: "border-gray-300 dark:border-gray-600",
    accent: "border-teal-200 dark:border-teal-800",
    transparent: "border-transparent",
    custom: "",
    // Full Tailwind Color Spectrum
    slate: "border-slate-200 dark:border-slate-800",
    gray: "border-gray-200 dark:border-gray-800",
    zinc: "border-zinc-200 dark:border-zinc-800",
    neutral: "border-neutral-200 dark:border-neutral-800",
    stone: "border-stone-200 dark:border-stone-800",
    red: "border-red-200 dark:border-red-800",
    orange: "border-orange-200 dark:border-orange-800",
    amber: "border-amber-200 dark:border-amber-800",
    yellow: "border-yellow-200 dark:border-yellow-800",
    lime: "border-lime-200 dark:border-lime-800",
    green: "border-green-200 dark:border-green-800",
    emerald: "border-emerald-200 dark:border-emerald-800",
    teal: "border-teal-200 dark:border-teal-800",
    cyan: "border-cyan-200 dark:border-cyan-800",
    sky: "border-sky-200 dark:border-sky-800",
    blue: "border-blue-200 dark:border-blue-800",
    indigo: "border-indigo-200 dark:border-indigo-800",
    violet: "border-violet-200 dark:border-violet-800",
    purple: "border-purple-200 dark:border-purple-800",
    fuchsia: "border-fuchsia-200 dark:border-fuchsia-800",
    pink: "border-pink-200 dark:border-pink-800",
    rose: "border-rose-200 dark:border-rose-800",
  }

  return clsx(borderClasses[color], extra)
}
