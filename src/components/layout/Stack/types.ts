import type { ReactNode } from "react"

export type StackGap = "none" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl"

export type StackAlign = "start" | "center" | "end" | "stretch"

export type StackDirection = "column" | "column-reverse"

export interface StackResponsive {
  base?: StackGap
  sm?: StackGap
  md?: StackGap
  lg?: StackGap
  xl?: StackGap
}

export interface StackProps {
  children: ReactNode
  gap?: StackGap | StackResponsive
  align?: StackAlign
  direction?: StackDirection
  className?: string
  paper?: boolean
}
