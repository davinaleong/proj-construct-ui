import type { ReactNode } from "react"

export type RadioSize = "sm" | "md" | "lg"
export type RadioAlignment = "left" | "center" | "right"

export interface RadioProps {
  /**
   * Radio checked state
   */
  checked?: boolean

  /**
   * Default checked state for uncontrolled radio
   */
  defaultChecked?: boolean

  /**
   * Radio size
   */
  size?: RadioSize

  /**
   * Disabled state
   */
  disabled?: boolean

  /**
   * Required field
   */
  required?: boolean

  /**
   * Label text or content
   */
  children?: ReactNode

  /**
   * Helper text
   */
  helperText?: string

  /**
   * Label text alignment
   */
  labelAlign?: RadioAlignment

  /**
   * Helper text alignment
   */
  helperAlign?: RadioAlignment

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
   * Radio name attribute (important for radio groups)
   */
  name?: string

  /**
   * Radio id attribute
   */
  id?: string

  /**
   * Radio value attribute
   */
  value?: string
}
