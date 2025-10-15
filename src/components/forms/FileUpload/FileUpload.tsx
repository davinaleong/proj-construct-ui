import { forwardRef, useState, useRef, useCallback, useEffect } from "react"
import { Upload, X, CheckCircle, AlertCircle, FileIcon } from "lucide-react"
import type { FileUploadProps, FileUploadProgress } from "./types"
import { cn } from "../../../utils/cn.js"
import { containerResponsiveUI } from "../../../utils/containerFonts"

const baseUploadClasses = [
  "relative",
  "border-2",
  "border-dashed",
  "rounded-lg",
  "transition-all",
  "duration-200",
]

const uploadVariantClasses = {
  default: {
    base: [
      "border-stone-300",
      "bg-stone-50",
      "hover:border-stone-400",
      "hover:bg-stone-100",
    ],
    active: ["border-blue-500", "bg-blue-50"],
    error: ["border-red-300", "bg-red-50"],
    disabled: ["border-stone-200", "bg-stone-100", "cursor-not-allowed"],
  },
}

const progressBarClasses = [
  "w-full",
  "h-2",
  "bg-stone-200",
  "rounded-full",
  "overflow-hidden",
]

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes"
  const k = 1024
  const sizes = ["Bytes", "KB", "MB", "GB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
}

const validateFile = (
  file: File,
  validation?: FileUploadProps["validation"]
): string | null => {
  if (!validation) return null

  // Check file type
  if (validation.allowedTypes && validation.allowedTypes.length > 0) {
    const isAllowed = validation.allowedTypes.some((type) => {
      if (type.startsWith(".")) {
        return file.name.toLowerCase().endsWith(type.toLowerCase())
      }
      if (type.includes("*")) {
        const baseType = type.split("/")[0]
        return file.type.startsWith(baseType)
      }
      return file.type === type
    })

    if (!isAllowed) {
      return `File type not allowed. Allowed types: ${validation.allowedTypes.join(
        ", "
      )}`
    }
  }

  // Check file size
  if (validation.minSize && file.size < validation.minSize) {
    return `File too small. Minimum size: ${formatFileSize(validation.minSize)}`
  }

  if (validation.maxSize && file.size > validation.maxSize) {
    return `File too large. Maximum size: ${formatFileSize(validation.maxSize)}`
  }

  return null
}

export const FileUpload = forwardRef<HTMLInputElement, FileUploadProps>(
  (
    {
      variant = "simple",
      multiple = false,
      validation,
      disabled = false,
      label,
      helperText,
      errorMessage,
      error = false,
      className,
      onFilesSelected,
      onProgress,
      onUploadComplete,
      onUploadError,
      onUpload,
      ...props
    },
    ref
  ) => {
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [isDragActive, setIsDragActive] = useState(false)
    const [uploadProgress, setUploadProgress] = useState<FileUploadProgress[]>(
      []
    )
    const [isPopupOpen, setIsPopupOpen] = useState(false)

    // Check for upload completion whenever uploadProgress changes
    useEffect(() => {
      if (uploadProgress.length === 0) return

      const allCompleted = uploadProgress.every(
        (p) => p.status === "completed" || p.status === "error"
      )

      if (allCompleted) {
        const successfulFiles = uploadProgress
          .filter((p) => p.status === "completed")
          .map((p) => p.file)

        if (successfulFiles.length > 0) {
          onUploadComplete?.(successfulFiles)
        }
      }
    }, [uploadProgress, onUploadComplete])

    // Determine component state
    const isDisabled = disabled
    const hasError = error && !isDisabled

    // Get variant classes
    let variantClasses: string[]
    if (isDisabled) {
      variantClasses = uploadVariantClasses.default.disabled
    } else if (hasError) {
      variantClasses = uploadVariantClasses.default.error
    } else if (isDragActive) {
      variantClasses = uploadVariantClasses.default.active
    } else {
      variantClasses = uploadVariantClasses.default.base
    }

    const groupClasses = cn("space-y-2 min-w-0", className)

    const uploadClasses = cn(
      baseUploadClasses,
      variantClasses,
      variant === "simple" ? "p-8" : "p-6"
    )

    const labelClasses = cn(
      containerResponsiveUI.label,
      "font-medium",
      "mb-2",
      isDisabled && "opacity-50",
      hasError && "text-red-700"
    )

    const helperClasses = cn(
      containerResponsiveUI.helper,
      "text-stone-600",
      hasError ? "text-red-600" : "text-stone-600",
      isDisabled && "opacity-50"
    )

    const processFiles = useCallback(
      async (files: File[]) => {
        const validFiles: File[] = []
        const newProgress: FileUploadProgress[] = []

        // Validate files
        for (const file of files) {
          const validationError = validateFile(file, validation)
          if (validationError) {
            onUploadError?.(validationError, file)
            newProgress.push({
              file,
              progress: 0,
              status: "error",
              error: validationError,
            })
          } else {
            validFiles.push(file)
            newProgress.push({
              file,
              progress: 0,
              status: "pending",
            })
          }
        }

        // Check max files limit
        if (validation?.maxFiles && validFiles.length > validation.maxFiles) {
          const error = `Too many files. Maximum allowed: ${validation.maxFiles}`
          onUploadError?.(error)
          return
        }

        setUploadProgress(newProgress)
        onProgress?.(newProgress)

        // Only call onFilesSelected if there are valid files
        if (validFiles.length > 0) {
          onFilesSelected?.(validFiles)
        }

        // If upload function is provided, start uploading
        if (onUpload && validFiles.length > 0) {
          for (let i = 0; i < validFiles.length; i++) {
            const file = validFiles[i]
            try {
              // Update progress to uploading
              setUploadProgress((prev) =>
                prev.map((p) =>
                  p.file === file ? { ...p, status: "uploading" as const } : p
                )
              )

              // Simulate progress for demo (replace with actual upload logic)
              const progressInterval = setInterval(() => {
                setUploadProgress((prev) =>
                  prev.map((p) => {
                    if (p.file === file && p.status === "uploading") {
                      const newProgress = Math.min(p.progress + 10, 90)
                      return { ...p, progress: newProgress }
                    }
                    return p
                  })
                )
              }, 100)

              await onUpload(file)

              clearInterval(progressInterval)

              // Complete upload
              setUploadProgress((prev) =>
                prev.map((p) =>
                  p.file === file
                    ? { ...p, progress: 100, status: "completed" as const }
                    : p
                )
              )
            } catch (uploadError) {
              const errorMessage =
                uploadError instanceof Error
                  ? uploadError.message
                  : "Upload failed"

              setUploadProgress((prev) =>
                prev.map((p) =>
                  p.file === file
                    ? { ...p, status: "error" as const, error: errorMessage }
                    : p
                )
              )

              onUploadError?.(errorMessage, file)
            }
          }
        }
      },
      [validation, onFilesSelected, onProgress, onUpload, onUploadError]
    )

    const handleFileSelect = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(event.target.files || [])
        if (files.length > 0) {
          processFiles(files)
        }
      },
      [processFiles]
    )

    const handleDrop = useCallback(
      (event: React.DragEvent) => {
        event.preventDefault()
        setIsDragActive(false)

        if (isDisabled) return

        const files = Array.from(event.dataTransfer.files)
        if (files.length > 0) {
          processFiles(files)
        }
      },
      [processFiles, isDisabled]
    )

    const handleDragOver = useCallback(
      (event: React.DragEvent) => {
        event.preventDefault()
        if (!isDisabled) {
          setIsDragActive(true)
        }
      },
      [isDisabled]
    )

    const handleDragLeave = useCallback(() => {
      setIsDragActive(false)
    }, [])

    const openFileDialog = useCallback(() => {
      if (variant === "popup") {
        setIsPopupOpen(true)
      } else {
        fileInputRef.current?.click()
      }
    }, [variant])

    const removeFile = useCallback((fileToRemove: File) => {
      setUploadProgress((prev) => prev.filter((p) => p.file !== fileToRemove))
    }, [])

    const helpText = errorMessage || helperText

    const renderFileList = () => {
      if (uploadProgress.length === 0) return null

      return (
        <div className="mt-4 space-y-2">
          {uploadProgress.map((item, index) => (
            <div
              key={`${item.file.name}-${index}`}
              className="flex items-center gap-3 p-3 bg-stone-50 rounded-lg"
            >
              <FileIcon className="w-5 h-5 text-stone-500 flex-shrink-0" />

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-stone-900 truncate">
                    {item.file.name}
                  </span>
                  <span className="text-xs text-stone-500">
                    {formatFileSize(item.file.size)}
                  </span>
                </div>

                {item.status === "uploading" && (
                  <div
                    className={cn(progressBarClasses)}
                    role="progressbar"
                    aria-valuenow={item.progress}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  >
                    <div
                      className="h-full bg-blue-600 transition-all duration-300"
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                )}

                {item.error && (
                  <p className="text-xs text-red-600 mt-1">{item.error}</p>
                )}
              </div>

              <div className="flex items-center gap-2">
                {item.status === "completed" && (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                )}
                {item.status === "error" && (
                  <AlertCircle className="w-5 h-5 text-red-600" />
                )}

                <button
                  onClick={() => removeFile(item.file)}
                  className="p-1 hover:bg-stone-200 rounded transition-colors"
                  aria-label={`Remove ${item.file.name}`}
                >
                  <X className="w-4 h-4 text-stone-500" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )
    }

    const renderUploadArea = () => (
      <div
        className={uploadClasses}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={openFileDialog}
        role="button"
        tabIndex={isDisabled ? -1 : 0}
        aria-disabled={isDisabled}
      >
        <input
          ref={ref || fileInputRef}
          type="file"
          multiple={multiple}
          disabled={isDisabled}
          onChange={handleFileSelect}
          className="sr-only"
          accept={validation?.allowedTypes?.join(",")}
          {...props}
        />

        <div className="text-center">
          <Upload className="mx-auto h-12 w-12 text-stone-400 mb-4" />

          <div className="mb-2">
            <span className="text-sm font-medium text-stone-900">
              Click to upload
            </span>
            {!isDisabled && (
              <span className="text-sm text-stone-600"> or drag and drop</span>
            )}
          </div>

          {validation?.allowedTypes && (
            <p className="text-xs text-stone-500 mb-1">
              Supported: {validation.allowedTypes.join(", ")}
            </p>
          )}

          {validation?.maxSize && (
            <p className="text-xs text-stone-500">
              Max size: {formatFileSize(validation.maxSize)}
            </p>
          )}
        </div>
      </div>
    )

    const renderPopupUpload = () => {
      if (!isPopupOpen) return null

      return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Upload Files</h3>
              <button
                onClick={() => setIsPopupOpen(false)}
                className="p-1 hover:bg-stone-100 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {renderUploadArea()}
            {renderFileList()}

            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => setIsPopupOpen(false)}
                className="px-4 py-2 text-sm text-stone-600 hover:text-stone-800"
              >
                Cancel
              </button>
              <button
                onClick={() => setIsPopupOpen(false)}
                className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                disabled={uploadProgress.length === 0}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className={groupClasses}>
        {label && <label className={labelClasses}>{label}</label>}

        {variant === "simple" ? (
          <>
            {renderUploadArea()}
            {renderFileList()}
          </>
        ) : (
          <>
            <button
              onClick={openFileDialog}
              disabled={isDisabled}
              className={cn(
                "w-full p-4 border-2 border-dashed rounded-lg text-center transition-colors",
                isDisabled
                  ? "border-stone-200 bg-stone-100 cursor-not-allowed"
                  : "border-stone-300 hover:border-stone-400 hover:bg-stone-50"
              )}
            >
              <Upload className="mx-auto h-8 w-8 text-stone-400 mb-2" />
              <span className="text-sm text-stone-600">
                Click to open upload dialog
              </span>
            </button>
            {renderPopupUpload()}
          </>
        )}

        {helpText && (
          <p
            className={cn(helperClasses, hasError && "text-red-600")}
            role={hasError ? "alert" : undefined}
          >
            {helpText}
          </p>
        )}
      </div>
    )
  }
)

FileUpload.displayName = "FileUpload"
