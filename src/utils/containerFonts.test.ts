import { describe, it, expect } from "vitest"
import {
  containerResponsiveHeadings,
  containerResponsiveUI,
} from "./containerFonts"

describe("Container Fonts Utility", () => {
  describe("containerResponsiveHeadings", () => {
    it("has all heading levels defined", () => {
      expect(containerResponsiveHeadings.h1).toBeDefined()
      expect(containerResponsiveHeadings.h2).toBeDefined()
      expect(containerResponsiveHeadings.h3).toBeDefined()
      expect(containerResponsiveHeadings.h4).toBeDefined()
      expect(containerResponsiveHeadings.h5).toBeDefined()
      expect(containerResponsiveHeadings.h6).toBeDefined()
    })

    it("contains container query classes", () => {
      const h1Classes = containerResponsiveHeadings.h1

      // Should contain base classes and container queries
      expect(h1Classes).toContain("text-4xl") // base size for h1 is text-4xl
      expect(h1Classes).toMatch(/@container.*text-/) // container query pattern
    })

    it("has responsive scaling from small to large containers", () => {
      const h1Classes = containerResponsiveHeadings.h1

      // Should have multiple container breakpoints
      expect(h1Classes).toMatch(/320px.*text-/)
      expect(h1Classes).toMatch(/768px.*text-/)
      expect(h1Classes).toMatch(/1024px.*text-/)
    })
  })

  describe("containerResponsiveUI", () => {
    it("has all UI text sizes defined", () => {
      expect(containerResponsiveUI.label).toBeDefined()
      expect(containerResponsiveUI.helper).toBeDefined()
      expect(containerResponsiveUI.button).toBeDefined()
      expect(containerResponsiveUI.input).toBeDefined()
      expect(containerResponsiveUI.badge).toBeDefined()
    })

    it("label text has container responsive classes", () => {
      const labelClasses = containerResponsiveUI.label

      expect(labelClasses).toContain("text-sm") // base size
      expect(labelClasses).toMatch(/@container.*text-/) // container query pattern
    })

    it("helper text is smaller than label text", () => {
      const labelClasses = containerResponsiveUI.label
      const helperClasses = containerResponsiveUI.helper

      // Helper should have smaller base size
      expect(helperClasses).toContain("text-xs")
      expect(labelClasses).toContain("text-sm")
    })

    it("label text has appropriate sizing", () => {
      const labelClasses = containerResponsiveUI.label

      expect(labelClasses).toContain("text-sm")
      expect(labelClasses).toMatch(/@container.*text-/)
    })
  })

  describe("Container Query Syntax", () => {
    it("uses correct container query syntax", () => {
      const h1Classes = containerResponsiveHeadings.h1

      // Should use @container syntax for container queries
      expect(h1Classes).toMatch(/@container\s*\([^)]+\)/)
    })

    it("has proper breakpoint progression", () => {
      const h1Classes = containerResponsiveHeadings.h1

      // Should have breakpoints in ascending order
      const breakpoints = h1Classes.match(/(\d+)px/g)
      if (breakpoints) {
        const values = breakpoints.map((bp) => parseInt(bp))
        const sorted = [...values].sort((a, b) => a - b)
        expect(values).toEqual(sorted)
      }
    })

    it("has reasonable breakpoint values", () => {
      const h1Classes = containerResponsiveHeadings.h1

      // Should include common breakpoints
      expect(h1Classes).toMatch(/320px/) // mobile
      expect(h1Classes).toMatch(/768px/) // tablet
      expect(h1Classes).toMatch(/1024px/) // desktop
    })
  })

  describe("CSS Class Structure", () => {
    it("returns valid CSS class strings", () => {
      Object.values(containerResponsiveHeadings).forEach((classes) => {
        expect(typeof classes).toBe("string")
        expect(classes.length).toBeGreaterThan(0)
        expect(classes.trim()).toBe(classes) // no leading/trailing whitespace
      })
    })

    it("UI classes are properly formatted", () => {
      // Test string properties
      expect(typeof containerResponsiveUI.label).toBe("string")
      expect(typeof containerResponsiveUI.helper).toBe("string")
      expect(containerResponsiveUI.label.length).toBeGreaterThan(0)
      expect(containerResponsiveUI.helper.length).toBeGreaterThan(0)

      // Test object properties
      expect(typeof containerResponsiveUI.button).toBe("object")
      expect(typeof containerResponsiveUI.button.sm).toBe("string")
      expect(typeof containerResponsiveUI.button.md).toBe("string")
      expect(typeof containerResponsiveUI.button.lg).toBe("string")
    })
  })
})
