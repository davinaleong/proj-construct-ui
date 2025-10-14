import type { LucideIcon } from "lucide-react"

export type InputSize = "sm" | "md" | "lg"

export type InputVariant = "default" | "filled" | "outlined"

export interface InputProps {
  /**
   * Input value
   */
  value?: string

  /**
   * Default value for uncontrolled input
   */
  defaultValue?: string

  /**
   * Placeholder text
   */
  placeholder?: string

  /**
   * Input type
   */
  type?: "text" | "email" | "password" | "search" | "tel" | "url" | "number"

  /**
   * Visual variant
   */
  variant?: InputVariant

  /**
   * Input size
   */
  size?: InputSize

  /**
   * Disabled state
   */
  disabled?: boolean

  /**
   * Readonly state
   */
  readonly?: boolean

  /**
   * Required field
   */
  required?: boolean

  /**
   * Error state
   */
  error?: boolean

  /**
   * Error message
   */
  errorMessage?: string

  /**
   * Helper text
   */
  helperText?: string

  /**
   * Label text
   */
  label?: string

  /**
   * Left icon
   */
  leftIcon?: LucideIcon

  /**
   * Right icon
   */
  rightIcon?: LucideIcon

  /**
   * Change handler
   */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void

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
   * Input name attribute
   */
  name?: string

  /**
   * Input id attribute
   */
  id?: string
}
