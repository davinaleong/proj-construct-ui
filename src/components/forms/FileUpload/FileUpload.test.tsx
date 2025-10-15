import { describe, it, expect, vi, beforeEach } from "vitest"
import { render, screen, fireEvent, waitFor } from "../../../test/utils"
import userEvent from "@testing-library/user-event"
import { FileUpload } from "./FileUpload"

// Mock file creation helper
const createMockFile = (name: string, size: number, type: string) => {
  const file = new File(["test content"], name, { type })
  Object.defineProperty(file, "size", {
    value: size,
    writable: false,
  })
  return file
}

// Mock drag and drop events
const createDragEvent = (type: string, files: File[]) => {
  const event = new Event(type, { bubbles: true })
  Object.defineProperty(event, "dataTransfer", {
    value: {
      files,
      types: ["Files"],
    },
  })
  return event
}

describe("FileUpload Component", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe("Basic Rendering", () => {
    it("renders simple variant by default", () => {
      render(<FileUpload />)

      expect(screen.getByText("Click to upload")).toBeInTheDocument()
      expect(screen.getByText("or drag and drop")).toBeInTheDocument()
      expect(screen.getByRole("button")).toBeInTheDocument()
    })

    it("renders with label", () => {
      render(<FileUpload label="Upload Documents" />)

      expect(screen.getByText("Upload Documents")).toBeInTheDocument()
    })

    it("renders with helper text", () => {
      render(<FileUpload helperText="Select files to upload" />)

      expect(screen.getByText("Select files to upload")).toBeInTheDocument()
    })

    it("applies custom className", () => {
      render(<FileUpload className="custom-class" />)

      // className should be on the outermost container, not the immediate parent of the button
      const container = screen.getByRole("button").closest(".custom-class")
      expect(container).toBeInTheDocument()
    })
  })

  describe("Variants", () => {
    it("renders simple variant", () => {
      render(<FileUpload variant="simple" />)

      expect(screen.getByText("Click to upload")).toBeInTheDocument()
      expect(
        screen.queryByText("Click to open upload dialog")
      ).not.toBeInTheDocument()
    })

    it("renders popup variant", () => {
      render(<FileUpload variant="popup" />)

      expect(
        screen.getByText("Click to open upload dialog")
      ).toBeInTheDocument()
      expect(screen.queryByText("Click to upload")).not.toBeInTheDocument()
    })

    it("opens popup dialog when clicked in popup variant", async () => {
      const user = userEvent.setup()
      render(<FileUpload variant="popup" />)

      const button = screen.getByText("Click to open upload dialog")
      await user.click(button)

      expect(screen.getByText("Upload Files")).toBeInTheDocument()
      expect(screen.getByText("Cancel")).toBeInTheDocument()
      expect(screen.getByText("Done")).toBeInTheDocument()
    })
  })

  describe("File Validation", () => {
    it("displays allowed file types", () => {
      render(
        <FileUpload
          validation={{
            allowedTypes: ["image/*", ".pdf", ".docx"],
          }}
        />
      )

      expect(
        screen.getByText("Supported: image/*, .pdf, .docx")
      ).toBeInTheDocument()
    })

    it("displays max file size", () => {
      render(
        <FileUpload
          validation={{
            maxSize: 5242880, // 5MB
          }}
        />
      )

      expect(screen.getByText("Max size: 5 MB")).toBeInTheDocument()
    })

    it("validates file types correctly", async () => {
      const onUploadError = vi.fn()
      const onFilesSelected = vi.fn()

      render(
        <FileUpload
          validation={{
            allowedTypes: ["image/*"],
          }}
          onUploadError={onUploadError}
          onFilesSelected={onFilesSelected}
        />
      )

      const input = screen
        .getByRole("button")
        .querySelector("input[type='file']") as HTMLInputElement
      const invalidFile = createMockFile(
        "document.pdf",
        1024,
        "application/pdf"
      )

      fireEvent.change(input, {
        target: { files: [invalidFile] },
      })

      await waitFor(() => {
        expect(onUploadError).toHaveBeenCalledWith(
          expect.stringContaining("File type not allowed"),
          invalidFile
        )
        expect(onFilesSelected).not.toHaveBeenCalled()
      })
    })

    it("validates file size correctly", async () => {
      const onUploadError = vi.fn()

      render(
        <FileUpload
          validation={{
            maxSize: 1024, // 1KB
          }}
          onUploadError={onUploadError}
        />
      )

      const input = screen
        .getByRole("button")
        .querySelector("input[type='file']") as HTMLInputElement
      const largeFile = createMockFile("large.txt", 2048, "text/plain")

      fireEvent.change(input, {
        target: { files: [largeFile] },
      })

      await waitFor(() => {
        expect(onUploadError).toHaveBeenCalledWith(
          expect.stringContaining("File too large"),
          largeFile
        )
      })
    })

    it("validates minimum file size", async () => {
      const onUploadError = vi.fn()

      render(
        <FileUpload
          validation={{
            minSize: 1024, // 1KB
          }}
          onUploadError={onUploadError}
        />
      )

      const input = screen
        .getByRole("button")
        .querySelector("input[type='file']") as HTMLInputElement
      const smallFile = createMockFile("small.txt", 512, "text/plain")

      fireEvent.change(input, {
        target: { files: [smallFile] },
      })

      await waitFor(() => {
        expect(onUploadError).toHaveBeenCalledWith(
          expect.stringContaining("File too small"),
          smallFile
        )
      })
    })

    it("validates maximum file count", async () => {
      const onUploadError = vi.fn()

      render(
        <FileUpload
          multiple
          validation={{
            maxFiles: 2,
          }}
          onUploadError={onUploadError}
        />
      )

      const input = screen
        .getByRole("button")
        .querySelector("input[type='file']") as HTMLInputElement
      const files = [
        createMockFile("file1.txt", 1024, "text/plain"),
        createMockFile("file2.txt", 1024, "text/plain"),
        createMockFile("file3.txt", 1024, "text/plain"),
      ]

      fireEvent.change(input, {
        target: { files },
      })

      await waitFor(() => {
        expect(onUploadError).toHaveBeenCalledWith(
          expect.stringContaining("Too many files")
        )
      })
    })
  })

  describe("File Selection", () => {
    it("handles single file selection", async () => {
      const onFilesSelected = vi.fn()

      render(<FileUpload onFilesSelected={onFilesSelected} />)

      const input = screen
        .getByRole("button")
        .querySelector("input[type='file']") as HTMLInputElement
      const file = createMockFile("test.txt", 1024, "text/plain")

      fireEvent.change(input, {
        target: { files: [file] },
      })

      await waitFor(() => {
        expect(onFilesSelected).toHaveBeenCalledWith([file])
      })
    })

    it("handles multiple file selection", async () => {
      const onFilesSelected = vi.fn()

      render(<FileUpload multiple onFilesSelected={onFilesSelected} />)

      const input = screen
        .getByRole("button")
        .querySelector("input[type='file']") as HTMLInputElement
      const files = [
        createMockFile("file1.txt", 1024, "text/plain"),
        createMockFile("file2.txt", 1024, "text/plain"),
      ]

      fireEvent.change(input, {
        target: { files },
      })

      await waitFor(() => {
        expect(onFilesSelected).toHaveBeenCalledWith(files)
      })
    })

    it("displays selected files", async () => {
      render(<FileUpload />)

      const input = screen
        .getByRole("button")
        .querySelector("input[type='file']") as HTMLInputElement
      const file = createMockFile("test-document.pdf", 2048, "application/pdf")

      fireEvent.change(input, {
        target: { files: [file] },
      })

      await waitFor(() => {
        expect(screen.getByText("test-document.pdf")).toBeInTheDocument()
        expect(screen.getByText("2 KB")).toBeInTheDocument()
      })
    })
  })

  describe("Drag and Drop", () => {
    it("handles drag and drop", async () => {
      const onFilesSelected = vi.fn()

      render(<FileUpload onFilesSelected={onFilesSelected} />)

      const uploadArea = screen.getByRole("button")
      const file = createMockFile("dropped.txt", 1024, "text/plain")

      // Simulate drag over
      fireEvent.dragOver(uploadArea)

      // Simulate drop
      fireEvent(uploadArea, createDragEvent("drop", [file]))

      await waitFor(() => {
        expect(onFilesSelected).toHaveBeenCalledWith([file])
      })
    })

    it("shows active state during drag", () => {
      render(<FileUpload />)

      const uploadArea = screen.getByRole("button")

      fireEvent.dragOver(uploadArea)

      expect(uploadArea).toHaveClass("border-blue-500", "bg-blue-50")
    })

    it("ignores drag and drop when disabled", () => {
      const onFilesSelected = vi.fn()

      render(<FileUpload disabled onFilesSelected={onFilesSelected} />)

      const uploadArea = screen.getByRole("button")
      const file = createMockFile("test.txt", 1024, "text/plain")

      fireEvent(uploadArea, createDragEvent("drop", [file]))

      expect(onFilesSelected).not.toHaveBeenCalled()
    })
  })

  describe("Upload Progress", () => {
    it("shows progress during upload", async () => {
      const mockUpload = vi
        .fn()
        .mockImplementation(
          () => new Promise((resolve) => setTimeout(resolve, 100))
        )

      render(<FileUpload onUpload={mockUpload} />)

      const input = screen
        .getByRole("button")
        .querySelector("input[type='file']") as HTMLInputElement
      const file = createMockFile("test.txt", 1024, "text/plain")

      fireEvent.change(input, {
        target: { files: [file] },
      })

      await waitFor(() => {
        expect(screen.getByText("test.txt")).toBeInTheDocument()
      })

      // Should show progress bar during upload
      expect(screen.getByRole("progressbar")).toBeInTheDocument()
    })

    it("calls upload complete callback", async () => {
      const mockUpload = vi.fn().mockResolvedValue(undefined)
      const onUploadComplete = vi.fn()

      render(
        <FileUpload onUpload={mockUpload} onUploadComplete={onUploadComplete} />
      )

      const input = screen
        .getByRole("button")
        .querySelector("input[type='file']") as HTMLInputElement
      const file = createMockFile("test.txt", 1024, "text/plain")

      fireEvent.change(input, {
        target: { files: [file] },
      })

      // Wait longer for upload simulation to complete
      await waitFor(
        () => {
          expect(onUploadComplete).toHaveBeenCalledWith([file])
        },
        { timeout: 3000 }
      )
    })

    it("handles upload errors", async () => {
      const mockUpload = vi.fn().mockRejectedValue(new Error("Upload failed"))
      const onUploadError = vi.fn()

      render(<FileUpload onUpload={mockUpload} onUploadError={onUploadError} />)

      const input = screen
        .getByRole("button")
        .querySelector("input[type='file']") as HTMLInputElement
      const file = createMockFile("test.txt", 1024, "text/plain")

      fireEvent.change(input, {
        target: { files: [file] },
      })

      await waitFor(() => {
        expect(onUploadError).toHaveBeenCalledWith("Upload failed", file)
      })
    })
  })

  describe("File Management", () => {
    it("allows removing files", async () => {
      const user = userEvent.setup()

      render(<FileUpload />)

      const input = screen
        .getByRole("button")
        .querySelector("input[type='file']") as HTMLInputElement
      const file = createMockFile("test.txt", 1024, "text/plain")

      fireEvent.change(input, {
        target: { files: [file] },
      })

      await waitFor(() => {
        expect(screen.getByText("test.txt")).toBeInTheDocument()
      })

      const removeButton = screen.getByLabelText("Remove test.txt")
      await user.click(removeButton)

      expect(screen.queryByText("test.txt")).not.toBeInTheDocument()
    })
  })

  describe("Disabled State", () => {
    it("disables interaction when disabled", () => {
      render(<FileUpload disabled />)

      const uploadArea = screen.getByRole("button")
      expect(uploadArea).toHaveAttribute("aria-disabled", "true")
      expect(uploadArea).toHaveClass("cursor-not-allowed")
    })

    it("doesn't show drag text when disabled", () => {
      render(<FileUpload disabled />)

      expect(screen.getByText("Click to upload")).toBeInTheDocument()
      expect(screen.queryByText("or drag and drop")).not.toBeInTheDocument()
    })
  })

  describe("Error States", () => {
    it("shows error styling", () => {
      render(<FileUpload error errorMessage="Upload failed" />)

      expect(screen.getByText("Upload failed")).toBeInTheDocument()
      expect(screen.getByRole("alert")).toBeInTheDocument()
    })

    it("shows error styling on upload area", () => {
      render(<FileUpload error />)

      const uploadArea = screen.getByRole("button")
      expect(uploadArea).toHaveClass("border-red-300", "bg-red-50")
    })
  })

  describe("Accessibility", () => {
    it("has correct ARIA attributes", () => {
      render(<FileUpload />)

      const uploadArea = screen.getByRole("button")
      expect(uploadArea).toHaveAttribute("tabIndex", "0")
      expect(uploadArea).toHaveAttribute("aria-disabled", "false")
    })

    it("supports keyboard navigation", async () => {
      const user = userEvent.setup()

      render(<FileUpload />)

      const uploadArea = screen.getByRole("button")

      uploadArea.focus()
      expect(uploadArea).toHaveFocus()

      // Should be able to activate with Enter or Space
      await user.keyboard("{Enter}")
      // File dialog would open (but can't test in jsdom)
    })

    it("provides proper labels for screen readers", () => {
      render(<FileUpload label="Upload Documents" />)

      expect(screen.getByText("Upload Documents")).toBeInTheDocument()
    })
  })
})
