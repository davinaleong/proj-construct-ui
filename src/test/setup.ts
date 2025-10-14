import "@testing-library/jest-dom"

// Mock IntersectionObserver
globalThis.IntersectionObserver = class IntersectionObserver {
  root = null
  rootMargin = ""
  thresholds = []

  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
  takeRecords() {
    return []
  }
}

// Mock ResizeObserver
globalThis.ResizeObserver = class ResizeObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
}

// Mock matchMedia
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
})

// Mock scrollTo
Object.defineProperty(window, "scrollTo", {
  writable: true,
  value: () => {},
})

// Mock getComputedStyle for container queries
Object.defineProperty(window, "getComputedStyle", {
  writable: true,
  value: () => ({
    getPropertyValue: () => "",
  }),
})
