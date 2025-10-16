import type { ReactNode } from "react"

export type FormFieldSize = "sm" | "md" | "lg"
export type FormFieldOrientation = "vertical" | "horizontal"

export interface FormFieldProps {
  /**
   * Form field content - typically an input component
   */
  children: ReactNode

  /**
   * Field label
   */
  label?: string

  /**
   * Field description or helper text
   */
  description?: string

  /**
   * Error message
   */
  error?: string

  /**
   * Whether the field is required
   */
  required?: boolean

  /**
   * Field size
   */
  size?: FormFieldSize

  /**
   * Layout orientation
   */
  orientation?: FormFieldOrientation

  /**
   * Whether to disable the field
   */
  disabled?: boolean

  /**
   * Additional CSS classes
   */
  className?: string

  /**
   * Field ID for accessibility
   */
  id?: string

  /**
   * Optional hint text for accessibility
   */
  hint?: string

  /**
   * Test ID for testing
   */
  "data-testid"?: string
}
