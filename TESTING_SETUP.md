# Testing Setup and Development Guide

## Quick Start

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode (development)
npm run test:watch

# Run tests with coverage report
npm run test:coverage

# Run specific test file
npx vitest run src/components/core/Button/Button.test.tsx

# Run tests matching a pattern
npx vitest run --grep "Button Component"
```

### Test Development Environment

The testing environment is automatically configured with:

- **jsdom**: Browser environment simulation
- **Vitest**: Modern test runner with hot reload
- **React Testing Library**: Component testing utilities
- **User Event**: Realistic user interaction simulation
- **Custom Render**: Pre-configured component wrapper with theme providers

## Test File Structure

### Naming Convention

```
ComponentName.test.tsx
utilityFunction.test.ts
```

### Standard Test File Template

```typescript
import { describe, it, expect, beforeEach, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { ComponentName } from "./ComponentName"

describe("ComponentName", () => {
  beforeEach(() => {
    // Reset any mocks or global state
  })

  describe("Basic Rendering", () => {
    it("renders with default props", () => {
      render(<ComponentName />)
      expect(screen.getByRole("expected-role")).toBeInTheDocument()
    })
  })

  describe("Props and Variants", () => {
    it("applies size variants correctly", () => {
      render(<ComponentName size="lg" />)
      expect(screen.getByRole("expected-role")).toHaveClass("expected-class")
    })
  })

  describe("User Interactions", () => {
    it("handles click events", async () => {
      const user = userEvent.setup()
      const handleClick = vi.fn()

      render(<ComponentName onClick={handleClick} />)
      await user.click(screen.getByRole("button"))

      expect(handleClick).toHaveBeenCalledTimes(1)
    })
  })

  describe("Accessibility", () => {
    it("provides proper ARIA attributes", () => {
      render(<ComponentName aria-label="test label" />)
      expect(screen.getByLabelText("test label")).toBeInTheDocument()
    })
  })
})
```

## Testing Patterns and Best Practices

### 1. Query Prioritization (React Testing Library)

Use queries in this order of preference:

```typescript
// 1. Accessible to everyone (preferred)
screen.getByRole("button", { name: /submit/i })
screen.getByLabelText(/username/i)
screen.getByPlaceholderText(/enter email/i)
screen.getByText(/loading/i)

// 2. Semantic queries
screen.getByAltText(/profile picture/i)
screen.getByTitle(/close dialog/i)

// 3. Test IDs (last resort)
screen.getByTestId("submit-button")
```

### 2. User Interaction Testing

```typescript
import userEvent from "@testing-library/user-event"

describe("User Interactions", () => {
  it("handles form submission", async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()

    render(<Form onSubmit={onSubmit} />)

    // Type in input
    await user.type(screen.getByLabelText(/email/i), "test@example.com")

    // Click button
    await user.click(screen.getByRole("button", { name: /submit/i }))

    expect(onSubmit).toHaveBeenCalledWith({
      email: "test@example.com",
    })
  })
})
```

### 3. Async Testing

```typescript
import { waitFor, waitForElementToBeRemoved } from "@testing-library/react"

describe("Async Behavior", () => {
  it("loads data asynchronously", async () => {
    render(<AsyncComponent />)

    // Wait for loading to disappear
    await waitForElementToBeRemoved(() => screen.queryByText(/loading/i))

    // Wait for content to appear
    await waitFor(() => {
      expect(screen.getByText(/data loaded/i)).toBeInTheDocument()
    })
  })
})
```

### 4. Component Mocking

```typescript
import { vi } from "vitest"

// Mock external dependencies
vi.mock("./ExternalComponent", () => ({
  ExternalComponent: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="mocked-external">{children}</div>
  ),
}))

// Mock functions
const mockHandler = vi.fn()

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
}

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
})
```

## Custom Testing Utilities

### AllTheProviders Wrapper

Our custom render function includes theme and context providers:

```typescript
// src/test/utils.tsx
import { render as rtlRender } from "@testing-library/react"
import { ThemeProvider } from "../components/core/ThemeProvider"

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider defaultTheme={{ mode: "paper" }}>{children}</ThemeProvider>
  )
}

const customRender = (ui: React.ReactElement, options = {}) =>
  rtlRender(ui, { wrapper: AllTheProviders, ...options })

// Re-export everything
export * from "@testing-library/react"
export { customRender as render }
```

### Custom Matchers

Available custom matchers for enhanced assertions:

```typescript
// DOM assertions
expect(element).toBeInTheDocument()
expect(element).toBeVisible()
expect(element).toHaveClass("expected-class")
expect(element).toHaveAttribute("aria-label", "expected")
expect(element).toHaveTextContent("expected text")

// Form assertions
expect(input).toBeDisabled()
expect(input).toBeRequired()
expect(input).toHaveValue("expected value")
expect(checkbox).toBeChecked()

// Focus assertions
expect(element).toHaveFocus()
```

## Component Testing Checklist

### Essential Tests for Every Component

- [ ] **Rendering**: Component renders without crashing
- [ ] **Props**: All props are applied correctly
- [ ] **Variants**: Size, color, and style variants work
- [ ] **States**: Disabled, loading, error states
- [ ] **Interactions**: Click, focus, keyboard events
- [ ] **Accessibility**: ARIA attributes, keyboard navigation
- [ ] **Content**: Children, text content rendering

### Form Component Additional Tests

- [ ] **Validation**: Error states and messages
- [ ] **Input handling**: Value changes, formatting
- [ ] **Label association**: Proper form control linking
- [ ] **Required states**: Visual and functional indicators

### Layout Component Additional Tests

- [ ] **Responsive behavior**: Breakpoint handling
- [ ] **Spacing**: Margins, padding, gaps
- [ ] **Overflow**: Content that exceeds boundaries
- [ ] **Grid/Flex**: Proper layout behavior

## Debugging Test Issues

### Common Issues and Solutions

#### 1. Element Not Found

```typescript
// Problem: Element not found
screen.getByRole("button") // ❌ Element not found

// Solution: Use debugging tools
screen.debug() // Shows current DOM structure
screen.logTestingPlaygroundURL() // Opens browser debugging tool
```

#### 2. Async Issues

```typescript
// Problem: Testing async behavior
expect(screen.getByText("loaded")).toBeInTheDocument() // ❌ Too early

// Solution: Wait for async operations
await waitFor(() => {
  expect(screen.getByText("loaded")).toBeInTheDocument()
})
```

#### 3. User Event Issues

```typescript
// Problem: Not waiting for user events
userEvent.click(button)
expect(handler).toHaveBeenCalled() // ❌ Too early

// Solution: Await user interactions
await userEvent.click(button)
expect(handler).toHaveBeenCalled() // ✅
```

### Test Environment Variables

```typescript
// Check environment
if (typeof window === "undefined") {
  // SSR/Node environment
  return // Skip browser-specific tests
}

// Mock browser APIs when needed
Object.defineProperty(window, "matchMedia", {
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})
```

## Coverage and Quality Metrics

### Coverage Thresholds

Current coverage requirements:

- **Branches**: 80%
- **Functions**: 80%
- **Lines**: 80%
- **Statements**: 80%

### Running Coverage

```bash
# Generate coverage report
npm run test:coverage

# View HTML coverage report
open coverage/index.html
```

### Quality Gates

Before merging code:

1. All tests must pass
2. Coverage thresholds must be met
3. No accessibility violations
4. Performance regressions identified

## CI/CD Integration

### GitHub Actions Configuration

```yaml
- name: Run Tests
  run: npm test

- name: Generate Coverage
  run: npm run test:coverage

- name: Upload Coverage
  uses: codecov/codecov-action@v3
  with:
    file: ./coverage/lcov.info
```

### Pre-commit Hooks

```json
{
  "husky": {
    "hooks": {
      "pre-commit": "npm run test:changed",
      "pre-push": "npm test"
    }
  }
}
```

## Performance Testing

### Component Performance

```typescript
import { render } from "@testing-library/react"
import { performance } from "perf_hooks"

describe("Performance", () => {
  it("renders efficiently", () => {
    const start = performance.now()
    render(<LargeComponent />)
    const end = performance.now()

    expect(end - start).toBeLessThan(100) // ms
  })
})
```

### Memory Leak Detection

```typescript
describe("Memory Management", () => {
  it("cleans up properly", () => {
    const { unmount } = render(<Component />)

    // Perform operations...

    unmount()

    // Verify cleanup
    expect(document.body.innerHTML).toBe("")
  })
})
```

## Successfully Installed Testing Framework

### Core Testing Dependencies

- **Vitest** - Modern test runner with excellent Vite integration ✅
- **@testing-library/react** - Component testing utilities ✅
- **@testing-library/jest-dom** - Custom Jest matchers for DOM testing ✅
- **@testing-library/user-event** - User interaction simulation ✅
- **jsdom** - Browser environment simulation ✅
- **@vitest/ui** - Optional UI for test visualization ✅

### Configuration Files

- **vitest.config.ts** - Test runner configuration ✅
- **src/test/setup.ts** - Global test setup ✅
- **src/test/utils.tsx** - Custom render utilities ✅

### Current Test Statistics

- **Total Tests**: 185 passing + 1 skipped = 186 tests ✅
- **Test Files**: 13 comprehensive test suites ✅
- **Components Tested**: 24+ components across all categories ✅
- **Coverage**: Comprehensive accessibility and behavioral testing ✅

## Conclusion

This testing setup provides a robust foundation for maintaining high-quality, accessible, and reliable React components. Following these patterns ensures consistent test coverage and helps catch issues early in development.

For additional questions or testing scenarios not covered here, refer to the main [TESTING.md](./TESTING.md) documentation or reach out to the development team.

- **jsdom** - DOM environment for testing

### Configuration Files

- `vitest.config.ts` - Vitest configuration with coverage settings
- `src/test/setup.ts` - Global test setup with mocks for browser APIs
- `src/test/utils.tsx` - Custom render function with theme providers

### Test Scripts (package.json)

```json
{
  "test": "vitest",
  "test:ui": "vitest --ui",
  "test:run": "vitest run",
  "test:coverage": "vitest run --coverage"
}
```

### Test Coverage Configuration

- **Provider**: v8
- **Reporters**: text, json, html
- **Thresholds**: 80% across branches, functions, lines, statements
- **Includes**: src/components/**, src/utils/**
- **Excludes**: tests, stories, main.tsx, App.tsx

## 📁 Test Files Created

### Component Tests

- `src/components/forms/Button/Button.test.tsx` - Button component tests
- `src/components/forms/Checkbox/Checkbox.test.tsx` - Checkbox component tests
- `src/components/forms/Select/Select.test.tsx` - Select component tests
- `src/components/core/Typography/Typography.test.tsx` - Typography component tests

### Utility Tests

- `src/utils/containerFonts.test.ts` - Container fonts utility tests

## 🛠️ Test Utilities Provided

### Custom Render Function

```tsx
import { render } from "../test/utils"
// Automatically wraps components with ThemeProvider
```

### Helper Functions

- `createSelectOptions()` - Generate mock select options
- `createSelectOptGroups()` - Generate mock optgroups
- `expectToHaveClasses()` - Batch class assertions
- `expectToBeAccessible()` - Basic accessibility checks

## 🔧 Current Status

### Working Features

- ✅ Test runner configured and operational
- ✅ DOM environment mocked properly
- ✅ React Testing Library integration
- ✅ Theme provider wrapping for component tests
- ✅ Test file structure established

### Issues to Address

- ⚠️ Some component tests expect specific implementation details
- ⚠️ Container fonts tests need alignment with actual implementation
- ⚠️ Color class expectations may need updates based on theme system

## 🎯 Recommendations

### For Development

1. **Focus on behavior testing** over implementation details
2. **Use integration tests** for complex component interactions
3. **Test accessibility** with screen reader queries
4. **Mock external dependencies** properly

### For Component Testing

```tsx
// Good - tests behavior
expect(screen.getByRole("button")).toBeInTheDocument()
expect(screen.getByRole("button")).toBeDisabled()

// Avoid - tests implementation
expect(element).toHaveClass("specific-internal-class")
```

### Running Tests

```bash
npm test          # Watch mode
npm run test:run  # Single run
npm run test:coverage  # With coverage report
```

## 📊 Coverage Goals

- **80% minimum** across all metrics
- **Components** fully covered for public API
- **Utils** thoroughly tested for edge cases
- **Integration tests** for complex workflows

The testing infrastructure is now ready for comprehensive component and utility testing!
