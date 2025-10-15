import type { ReactNode } from "react"

export type SwitchSize = "sm" | "md" | "lg"
export type SwitchAlignment = "left" | "center" | "right"

export interface SwitchProps {
  /**
   * Switch checked state
   */
  checked?: boolean

  /**
   * Default checked state for uncontrolled switch
   */
  defaultChecked?: boolean

  /**
   * Switch size
   */
  size?: SwitchSize

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
  labelAlign?: SwitchAlignment

  /**
   * Helper text alignment
   */
  helperAlign?: SwitchAlignment

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
   * Switch name attribute
   */
  name?: string

  /**
   * Switch id attribute
   */
  id?: string

  /**
   * Switch value attribute
   */
  value?: string
}
