import type { TextAlignment } from "../shared"

export type SelectSize = "sm" | "md" | "lg"

export type SelectVariant = "default" | "filled" | "outlined"

export interface SelectOption {
  /**
   * The value of the option
   */
  value: string | number

  /**
   * The display label for the option
   */
  label: string

  /**
   * Whether the option is disabled
   */
  disabled?: boolean

  /**
   * Optional icon component for the option
   */
  icon?: React.ComponentType<{ className?: string }>
}

export interface SelectOptGroup {
  /**
   * The label for the option group
   */
  label: string

  /**
   * Array of options in this group
   */
  options: SelectOption[]

  /**
   * Whether the entire group is disabled
   */
  disabled?: boolean
}

export type SelectOptionOrGroup = SelectOption | SelectOptGroup

export interface SelectProps {
  /**
   * Select value
   */
  value?: string | number

  /**
   * Default value for uncontrolled select
   */
  defaultValue?: string | number

  /**
   * Placeholder text when no option is selected
   */
  placeholder?: string

  /**
   * Array of options or option groups to display
   */
  options: SelectOptionOrGroup[]

  /**
   * Size variant
   * @default "md"
   */
  size?: SelectSize

  /**
   * Visual variant
   * @default "default"
   */
  variant?: SelectVariant

  /**
   * Whether the select is disabled
   */
  disabled?: boolean

  /**
   * Whether the field is required
   */
  required?: boolean

  /**
   * Whether the select allows multiple selections
   */
  multiple?: boolean

  /**
   * Whether the dropdown is searchable
   */
  searchable?: boolean

  /**
   * Maximum height of the dropdown
   */
  maxHeight?: string

  /**
   * Label text
   */
  label?: string

  /**
   * Label text alignment
   * @default "left"
   */
  labelAlign?: TextAlignment

  /**
   * Helper text displayed below the select
   */
  helperText?: string

  /**
   * Helper/error message text alignment
   * @default "left"
   */
  messageAlign?: TextAlignment

  /**
   * Whether the select has an error state
   */
  error?: boolean

  /**
   * Error message to display
   */
  errorMessage?: string

  /**
   * Callback fired when the value changes
   */
  onChange?: (
    value: string | number | (string | number)[],
    option?: SelectOption | SelectOption[]
  ) => void

  /**
   * Callback fired when the select receives focus
   */
  onFocus?: (event: React.FocusEvent<HTMLButtonElement>) => void

  /**
   * Callback fired when the select loses focus
   */
  onBlur?: (event: React.FocusEvent<HTMLButtonElement>) => void

  /**
   * Callback fired when searching (if searchable)
   */
  onSearch?: (query: string) => void

  /**
   * Additional CSS classes
   */
  className?: string

  /**
   * Name attribute for the hidden input
   */
  name?: string

  /**
   * ID attribute for the select
   */
  id?: string

  /**
   * Whether the dropdown should open upward
   */
  dropdownUp?: boolean

  /**
   * Custom render function for options
   */
  renderOption?: (option: SelectOption, isSelected: boolean) => React.ReactNode

  /**
   * Custom render function for selected value
   */
  renderValue?: (
    value: string | number | (string | number)[],
    options: SelectOption[]
  ) => React.ReactNode
}
