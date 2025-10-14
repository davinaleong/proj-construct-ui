import type { ReactNode } from "react"

export type CardVariant = "elevated" | "outlined" | "filled"

export type CardPadding = "none" | "sm" | "md" | "lg" | "xl"

export interface CardProps {
  children?: ReactNode
  variant?: CardVariant
  padding?: CardPadding
  hoverable?: boolean
  className?: string
}

export interface CardHeaderProps {
  children: ReactNode
  className?: string
}

export interface CardBodyProps {
  children: ReactNode
  className?: string
}

export interface CardFooterProps {
  children: ReactNode
  className?: string
}
