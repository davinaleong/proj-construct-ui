import type { ColorVariant } from "../../../utils/colors"

export type ThemeMode = "light" | "dark" | "paper"

export type ThemeRadius = "none" | "sm" | "md" | "lg" | "xl"

export type ThemeElevation = "none" | "sm" | "md" | "lg" | "xl"

export interface ThemeConfig {
  mode: ThemeMode
  accentColor: ColorVariant
  radius: ThemeRadius
  elevation: ThemeElevation
}

export interface ThemeContextValue extends ThemeConfig {
  setMode: (mode: ThemeMode) => void
  setAccentColor: (color: ColorVariant) => void
  setRadius: (radius: ThemeRadius) => void
  setElevation: (elevation: ThemeElevation) => void
  resetTheme: () => void
}

export interface ThemeProviderProps {
  children: React.ReactNode
  defaultTheme?: Partial<ThemeConfig>
  persistKey?: string | null // localStorage key for persistence, null to disable
}
