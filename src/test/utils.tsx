import { render } from "@testing-library/react"
import type { RenderOptions } from "@testing-library/react"
import type { ReactElement } from "react"
import { ThemeProvider } from "../components/core"
import { expect } from "vitest"

// Custom render function that includes providers
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider defaultTheme={{ mode: "paper" }}>{children}</ThemeProvider>
  )
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders, ...options })

export * from "@testing-library/react"
export { customRender as render }

// Helper function to create mock options for Select component
export const createSelectOptions = (count: number = 3) => {
  return Array.from({ length: count }, (_, i) => ({
    value: `option-${i + 1}`,
    label: `Option ${i + 1}`,
  }))
}

// Helper function to create mock optgroups for Select component
export const createSelectOptGroups = () => {
  return [
    {
      label: "Group 1",
      options: [
        { value: "g1-opt1", label: "Group 1 Option 1" },
        { value: "g1-opt2", label: "Group 1 Option 2" },
      ],
    },
    {
      label: "Group 2",
      options: [
        { value: "g2-opt1", label: "Group 2 Option 1" },
        { value: "g2-opt2", label: "Group 2 Option 2" },
      ],
    },
  ]
}

// Common test matchers and utilities
export const expectToHaveClasses = (
  element: HTMLElement,
  classes: string[]
) => {
  classes.forEach((className) => {
    expect(element).toHaveClass(className)
  })
}

export const expectNotToHaveClasses = (
  element: HTMLElement,
  classes: string[]
) => {
  classes.forEach((className) => {
    expect(element).not.toHaveClass(className)
  })
}

// Form testing utilities
export const getFormControl = (container: HTMLElement, labelText: string) => {
  const label = container.querySelector(`label:has-text("${labelText}")`)
  if (!label) return null

  const id = label.getAttribute("for")
  if (!id) return null

  return container.querySelector(`#${id}`)
}

// Accessibility testing helpers
export const expectToBeAccessible = (element: HTMLElement) => {
  // Basic accessibility checks
  if (element.tagName === "BUTTON") {
    expect(element).toHaveAttribute("type")
  }

  if (element.hasAttribute("aria-expanded")) {
    const expanded = element.getAttribute("aria-expanded")
    expect(["true", "false"]).toContain(expanded)
  }

  if (element.hasAttribute("aria-required")) {
    const required = element.getAttribute("aria-required")
    expect(["true", "false"]).toContain(required)
  }
}
