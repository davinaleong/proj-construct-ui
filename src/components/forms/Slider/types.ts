import type { ReactNode } from "react"

export type SliderSize = "sm" | "md" | "lg"
export type SliderAlignment = "left" | "center" | "right"
export type SliderOrientation = "horizontal" | "vertical"

export interface SliderProps {
  /**
   * Current value of the slider
   */
  value?: number

  /**
   * Default value for uncontrolled slider
   */
  defaultValue?: number

  /**
   * Minimum value
   */
  min?: number

  /**
   * Maximum value
   */
  max?: number

  /**
   * Step increment
   */
  step?: number

  /**
   * Slider size
   */
  size?: SliderSize

  /**
   * Slider orientation
   */
  orientation?: SliderOrientation

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
  labelAlign?: SliderAlignment

  /**
   * Helper text alignment
   */
  helperAlign?: SliderAlignment

  /**
   * Show value indicator
   */
  showValue?: boolean

  /**
   * Value formatter function
   */
  valueFormatter?: (value: number) => string

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
  onChange?: (value: number, event: React.ChangeEvent<HTMLInputElement>) => void

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
   * Slider name attribute
   */
  name?: string

  /**
   * Slider id attribute
   */
  id?: string
}
