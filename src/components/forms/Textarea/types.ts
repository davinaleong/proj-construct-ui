export type TextareaSize = "sm" | "md" | "lg"

export type TextareaVariant = "default" | "filled" | "outlined"

export type TextareaResize = "none" | "vertical" | "horizontal" | "both"

export interface TextareaProps {
  /**
   * Textarea value
   */
  value?: string

  /**
   * Default value for uncontrolled textarea
   */
  defaultValue?: string

  /**
   * Placeholder text
   */
  placeholder?: string

  /**
   * Visual variant
   */
  variant?: TextareaVariant

  /**
   * Textarea size
   */
  size?: TextareaSize

  /**
   * Number of visible rows
   */
  rows?: number

  /**
   * Resize behavior
   */
  resize?: TextareaResize

  /**
   * Disabled state
   */
  disabled?: boolean

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
   * Maximum character length
   */
  maxLength?: number

  /**
   * Show character count
   */
  showCharCount?: boolean

  /**
   * Change handler
   */
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void

  /**
   * Focus handler
   */
  onFocus?: (event: React.FocusEvent<HTMLTextAreaElement>) => void

  /**
   * Blur handler
   */
  onBlur?: (event: React.FocusEvent<HTMLTextAreaElement>) => void

  /**
   * Additional CSS classes
   */
  className?: string

  /**
   * Textarea name attribute
   */
  name?: string

  /**
   * Textarea id attribute
   */
  id?: string
}
