import type { ReactNode } from "react"

export type SectionVariant = "default" | "elevated" | "outlined"

export type SectionPadding = "none" | "sm" | "md" | "lg" | "xl"

export interface SectionProps {
  /**
   * Section content
   */
  children: ReactNode

  /**
   * Section title
   */
  title?: ReactNode

  /**
   * Section description
   */
  description?: ReactNode

  /**
   * Visual variant
   */
  variant?: SectionVariant

  /**
   * Padding size
   */
  padding?: SectionPadding

  /**
   * Additional CSS classes
   */
  className?: string
}

export interface PanelProps {
  /**
   * Panel content
   */
  children: ReactNode

  /**
   * Panel header content
   */
  header?: ReactNode

  /**
   * Panel footer content
   */
  footer?: ReactNode

  /**
   * Visual variant
   */
  variant?: SectionVariant

  /**
   * Padding size
   */
  padding?: SectionPadding

  /**
   * Whether the panel can collapse
   */
  collapsible?: boolean

  /**
   * Initial collapsed state
   */
  defaultCollapsed?: boolean

  /**
   * Additional CSS classes
   */
  className?: string
}
