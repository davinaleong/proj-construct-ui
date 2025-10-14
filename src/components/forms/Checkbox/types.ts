import type { ReactNode } from "react"

export type CheckboxSize = "sm" | "md" | "lg"

export interface CheckboxProps {
  /**
   * Checkbox checked state
   */
  checked?: boolean

  /**
   * Default checked state for uncontrolled checkbox
   */
  defaultChecked?: boolean

  /**
   * Checkbox size
   */
  size?: CheckboxSize

  /**
   * Disabled state
   */
  disabled?: boolean

  /**
   * Required field
   */
  required?: boolean

  /**
   * Indeterminate state (for parent checkboxes)
   */
  indeterminate?: boolean

  /**
   * Label text or content
   */
  children?: ReactNode

  /**
   * Helper text
   */
  helperText?: string

  /**
   * Error state
   */
  error?: boolean

  /**
   * Error message
   */
  errorMessage?: string

  /**
   * Change handler
   */
  onChange?: (
    checked: boolean,
    event: React.ChangeEvent<HTMLInputElement>
  ) => void

  /**
   * Focus handler
   */
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void

  /**
   * Blur handler
   */
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void

  /**
   * Additional CSS classes
   */
  className?: string

  /**
   * Checkbox name attribute
   */
  name?: string

  /**
   * Checkbox id attribute
   */
  id?: string

  /**
   * Checkbox value attribute
   */
  value?: string
}
