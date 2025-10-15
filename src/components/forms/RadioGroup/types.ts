import type { ReactNode } from "react"
import type { RadioSize, RadioAlignment } from "../Radio/types"

export interface RadioOption {
  /**
   * Option value
   */
  value: string

  /**
   * Option label
   */
  label: ReactNode

  /**
   * Option disabled state
   */
  disabled?: boolean

  /**
   * Option helper text
   */
  helperText?: string
}

export type RadioGroupOrientation = "horizontal" | "vertical"

export interface RadioGroupProps {
  /**
   * Group name for radio inputs
   */
  name: string

  /**
   * Selected value
   */
  value?: string

  /**
   * Default selected value for uncontrolled group
   */
  defaultValue?: string

  /**
   * Radio options
   */
  options: RadioOption[]

  /**
   * Group label
   */
  label?: ReactNode

  /**
   * Radio size
   */
  size?: RadioSize

  /**
   * Group orientation
   */
  orientation?: RadioGroupOrientation

  /**
   * Disabled state for all radios
   */
  disabled?: boolean

  /**
   * Required field
   */
  required?: boolean

  /**
   * Helper text for the group
   */
  helperText?: string

  /**
   * Label text alignment for all radios
   */
  labelAlign?: RadioAlignment

  /**
   * Helper text alignment for all radios
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
  onChange?: (value: string, event: React.ChangeEvent<HTMLInputElement>) => void

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
   * Group id attribute
   */
  id?: string
}
