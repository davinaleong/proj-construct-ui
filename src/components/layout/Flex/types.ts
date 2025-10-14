import type { ReactNode } from "react"

export type FlexDirection = "row" | "row-reverse" | "column" | "column-reverse"

export type FlexWrap = "nowrap" | "wrap" | "wrap-reverse"

export type FlexJustify =
  | "start"
  | "end"
  | "center"
  | "between"
  | "around"
  | "evenly"

export type FlexAlign = "start" | "end" | "center" | "baseline" | "stretch"

export type FlexGap = "none" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl"

export interface FlexResponsive {
  base?: FlexGap
  sm?: FlexGap
  md?: FlexGap
  lg?: FlexGap
  xl?: FlexGap
}

export interface FlexProps {
  children: ReactNode
  direction?: FlexDirection
  wrap?: FlexWrap
  justify?: FlexJustify
  align?: FlexAlign
  gap?: FlexGap | FlexResponsive
  className?: string
  paper?: boolean
}
