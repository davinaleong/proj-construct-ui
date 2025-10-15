export type FileUploadVariant = "simple" | "popup"

export interface FileValidation {
  /**
   * Allowed file types (MIME types or extensions)
   * Examples: ['image/*', '.pdf', 'application/json']
   */
  allowedTypes?: string[]

  /**
   * Minimum file size in bytes
   */
  minSize?: number

  /**
   * Maximum file size in bytes
   */
  maxSize?: number

  /**
   * Maximum number of files (for multiple upload)
   */
  maxFiles?: number
}

export interface FileUploadProgress {
  file: File
  progress: number
  status: "pending" | "uploading" | "completed" | "error"
  error?: string
}

export interface FileUploadProps {
  /**
   * Upload variant style
   * @default "simple"
   */
  variant?: FileUploadVariant

  /**
   * Allow multiple file selection
   * @default false
   */
  multiple?: boolean

  /**
   * File validation rules
   */
  validation?: FileValidation

  /**
   * Input disabled state
   * @default false
   */
  disabled?: boolean

  /**
   * Label for the upload area
   */
  label?: string

  /**
   * Helper text below the upload area
   */
  helperText?: string

  /**
   * Error message
   */
  errorMessage?: string

  /**
   * Error state
   * @default false
   */
  error?: boolean

  /**
   * Custom class name
   */
  className?: string

  /**
   * Callback when files are selected
   */
  onFilesSelected?: (files: File[]) => void

  /**
   * Callback for upload progress updates
   */
  onProgress?: (progress: FileUploadProgress[]) => void

  /**
   * Callback when upload completes
   */
  onUploadComplete?: (files: File[]) => void

  /**
   * Callback when upload fails
   */
  onUploadError?: (error: string, file?: File) => void

  /**
   * Custom upload function
   * If not provided, files will only be validated and selected
   */
  onUpload?: (file: File) => Promise<void>
}
