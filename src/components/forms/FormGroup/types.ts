import type { ReactNode } from "react"

export type FormGroupSize = "sm" | "md" | "lg"
export type FormGroupOrientation = "vertical" | "horizontal"

export interface FormGroupProps {
  /**
   * Form group content - typically FormField components
   */
  children: ReactNode

  /**
   * Group title/legend
   */
  title?: string

  /**
   * Group description
   */
  description?: string

  /**
   * Whether the group is disabled
   */
  disabled?: boolean

  /**
   * Group size
   */
  size?: FormGroupSize

  /**
   * Layout orientation for fields within the group
   */
  orientation?: FormGroupOrientation

  /**
   * Additional CSS classes
   */
  className?: string

  /**
   * Whether to render as a fieldset
   */
  fieldset?: boolean

  /**
   * Custom spacing between fields
   */
  spacing?: "none" | "sm" | "md" | "lg" | "xl"

  /**
   * Test ID for testing
   */
  "data-testid"?: string
}
