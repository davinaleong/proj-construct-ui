# Testing Documentation

## Overview

This document provides comprehensive documentation for the test suite of the Construct UI component library. The project uses modern testing tools to ensure component reliability, accessibility compliance, and behavioral correctness.

**Test Statistics (Current):**

- **Total Tests**: 185 passing + 1 skipped = 186 tests
- **Test Files**: 13 comprehensive test suites
- **Components Tested**: 24+ components across core, forms, and layout categories
- **Coverage Focus**: Accessibility, user interactions, prop validation, error states

## Testing Stack

### Core Testing Framework

- **Vitest**: Modern test runner with excellent Vite integration
- **React Testing Library**: Component testing with accessibility-focused queries
- **Jest DOM**: Custom matchers for DOM assertions
- **User Event**: Realistic user interaction simulation
- **jsdom**: Browser environment simulation

### Test Configuration

- **Environment**: jsdom for browser API simulation
- **Coverage Provider**: v8 for accurate coverage reporting
- **Coverage Thresholds**: 80% across branches, functions, lines, and statements
- **Reporters**: Default, HTML, and JSON coverage reports

## Comprehensive Test Coverage

### Core Components (54 Tests)

#### Brand Component (`src/components/core/Brand/Brand.test.tsx`) - 12 Tests

Complete brand component testing with logo integration and accessibility.

**Test Coverage:**

- Size variants (small, medium, large) with proper styling
- Optional logo rendering from assets folder
- Text content display and customization
- Click handlers and navigation functionality
- Accessibility compliance (roles, labels, keyboard navigation)
- Theme integration and responsive behavior

#### Container Component (`src/components/core/Container/Container.test.tsx`) - 13 Tests

Layout container with responsive behavior and theme integration.

**Test Coverage:**

- Responsive breakpoint handling (xs, sm, md, lg, xl, 2xl)
- Padding and margin variant applications
- Center alignment and constrained widths
- Theme-aware styling and CSS class generation
- Content overflow and scrolling behavior

#### Icon Component (`src/components/core/Icon/Icon.test.tsx`) - 13 Tests

SVG icon system with accessibility and customization features.

**Test Coverage:**

- Icon rendering and SVG path generation
- Size variants and custom size styling
- Color application and theme integration
- Accessibility features (decorative icons, ARIA labels)
- Custom className and style prop handling

#### Paper Component (`src/components/core/Paper/Paper.test.tsx`) - 16 Tests

Foundational surface component with elevation and styling options.

**Test Coverage:**

- Elevation levels (none, sm, md, lg, xl) with shadow classes
- Color variants (white, gray, colored surfaces)
- Border and padding applications
- Interactive states (hover effects, focus handling)
- Texture overlays and visual enhancements
- Content rendering and layout behavior

### Theme System (12 Tests)

#### ThemeProvider Component (`src/components/core/ThemeProvider/ThemeProvider.test.tsx`) - 12 Tests + 1 Skipped

Complete theme management system with persistence and SSR support.

**Test Coverage:**

- Theme initialization and default configurations
- Mode switching (light, dark, paper) with proper CSS class application
- localStorage persistence and data validation
- Custom theme configurations and partial updates
- SSR compatibility and environment guards
- Error handling for invalid localStorage data
- Theme context provision and consumption
- Document element class management and cleanup

### Typography System (11 Tests)

#### Typography Component (`src/components/core/Typography/Typography.test.tsx`) - 11 Tests

Foundational text rendering with responsive font system.

**Test Coverage:**

- Typography variants (h1-h6, body, caption, code)
- Font family assignments (Montserrat, Playfair, Source Code Pro)
- Responsive font scaling with container queries
- Color variants and theme integration
- Semantic HTML element rendering
- Accessibility and screen reader compatibility

### Form Components (82 Tests)

#### Input Component (`src/components/forms/Input/Input.test.tsx`) - 20 Tests

Text input with validation, states, and accessibility features.

**Test Coverage:**

- Input types (text, email, password, number, tel, url)
- Size variants (sm, md, lg) with proper styling
- State management (disabled, readonly, error states)
- Validation integration and error display
- Icon integration (leading and trailing icons)
- Accessibility (labels, descriptions, error announcements)
- User interactions (focus, blur, input events)

#### Textarea Component (`src/components/forms/Textarea/Textarea.test.tsx`) - 20 Tests

Multi-line text input with auto-resize and validation.

**Test Coverage:**

- Auto-resize functionality based on content
- Size variants and custom dimensions
- Character counting and limit enforcement
- Validation states and error handling
- Placeholder text and label associations
- Accessibility compliance and screen reader support

#### IconButton Component (`src/components/forms/IconButton/IconButton.test.tsx`) - 16 Tests

Icon-based buttons with accessibility and interaction handling.

**Test Coverage:**

- Size variants (sm, md, lg, xl) with proper scaling
- Color variants and theme integration
- Loading states with spinner indicators
- Disabled state handling and visual feedback
- Accessibility (ARIA labels, keyboard navigation)
- Click events and user interaction simulation

#### Button Component (`src/components/forms/Button/Button.test.tsx`) - 11 Tests

Primary action buttons with states and variants.

**Test Coverage:**

- Button variants (primary, secondary, outline, ghost)
- Size options and responsive behavior
- Loading states and disabled conditions
- Icon integration and content layout
- Accessibility and keyboard interaction

#### Checkbox Component (`src/components/forms/Checkbox/Checkbox.test.tsx`) - 13 Tests

Checkbox input with custom styling and accessibility.

**Test Coverage:**

- Checked and unchecked states
- Indeterminate state handling
- Custom styling and theme integration
- Label associations and accessibility
- User interaction simulation

#### Select Component (`src/components/forms/Select/Select.test.tsx`) - 16 Tests

Dropdown selection with search and multi-select capabilities.

**Test Coverage:**

- Single and multiple selection modes
- Search functionality and filtering
- Custom option rendering
- Accessibility (ARIA attributes, keyboard navigation)
- Loading states and async data handling

### Utility Tests (12 Tests)

#### Container Fonts (`src/utils/containerFonts.test.ts`) - 12 Tests

Responsive font system with container query support.

**Test Coverage:**

- Font configuration object validation
- Responsive breakpoint generation (320px, 480px, 640px, 768px)
- Typography variant mappings (h1-h6, body, caption)
- Container query CSS generation
- Font family assignments across design system

## Test Suite Structure

### 1. Utility Tests

#### Container Fonts (`src/utils/containerFonts.test.ts`)

Tests the responsive font system that adapts to container sizes.

**Test Categories:**

- **Font Object Structure**: Validates font configuration objects contain required properties
- **Responsive Breakpoints**: Ensures proper CSS container query generation
- **Font Scale Validation**: Confirms font sizes follow design system scale
- **Cross-Device Consistency**: Tests font rendering across different screen sizes

**Key Test Cases:**

- Font objects include all required breakpoints (320px, 480px, 640px, 768px)
- Typography variants (h1-h6, body, caption) have correct text-size mappings
- Container queries generate valid CSS syntax
- Font family assignments (Montserrat, Playfair Display, Source Code Pro)

### 2. Component Tests

#### Typography Component (`src/components/core/Typography/Typography.test.tsx`)

Comprehensive testing of the foundational typography component.

**Test Categories:**

- **Rendering**: Default props, variants, custom elements
- **Color System**: Primary, muted, danger color variants with proper classes
- **Responsive Behavior**: Container-based font scaling
- **Text Styling**: Alignment, weight, truncation
- **Accessibility**: Semantic element mapping, ref forwarding
- **Custom Styling**: className merging, style overrides

**Critical Validations:**

- `h1` variant generates `text-4xl` classes for proper heading hierarchy
- Color variants map to correct Tailwind classes (`primary` → `text-blue-600`)
- Container responsive classes apply correctly for different breakpoints
- Semantic HTML elements chosen appropriately for accessibility

#### Button Component (`src/components/forms/Button/Button.test.tsx`)

Tests interactive button behaviors and styling variations.

**Test Categories:**

- **Basic Rendering**: Default state, content display
- **Variant System**: Size, color, and style variants
- **Interactive States**: Disabled, loading, pressed states
- **Event Handling**: Click events, focus management
- **Accessibility**: ARIA attributes, keyboard navigation
- **Advanced Features**: Icon integration, custom styling

**Behavioral Tests:**

- Click events properly fired when button enabled
- Disabled buttons don't trigger click handlers
- Loading states show appropriate visual indicators
- Ref forwarding works for imperative access
- Size variants apply correct padding and font sizes

#### Checkbox Component (`src/components/forms/Checkbox/Checkbox.test.tsx`)

Tests form input functionality and state management.

**Test Categories:**

- **Form Integration**: Controlled/uncontrolled modes, default values
- **State Management**: Checked, indeterminate, disabled states
- **User Interactions**: Click handling, keyboard navigation
- **Visual Feedback**: Check marks, indeterminate indicators
- **Accessibility**: Labels, ARIA attributes, focus management
- **Error States**: Validation feedback, error styling

**Key Behavioral Tests:**

- Controlled checkboxes respond to checked prop changes
- Indeterminate state displays appropriate visual indicator
- Disabled checkboxes don't respond to user interactions (using `userEvent` for realistic simulation)
- Helper text and error messages display correctly
- Proper form integration with name/value attributes

#### Select Component (`src/components/forms/Select/Select.test.tsx`)

Complex dropdown component with single/multiple selection modes.

**Test Categories:**

- **Dropdown Behavior**: Open/close states, keyboard navigation
- **Option Selection**: Single and multiple selection modes
- **Option Groups**: Optgroup support with proper structure
- **Accessibility**: ARIA compliance, screen reader support
- **Search Integration**: Filtering, highlighting matches
- **Form Integration**: Value handling, change events

**Advanced Features Tested:**

- Multiple selection with tag display and removal
- Option groups with proper ARIA labeling
- Keyboard navigation (Arrow keys, Enter, Escape)
- Search functionality with case-insensitive filtering
- Disabled options and form states
- Custom option rendering and styling

## Testing Patterns and Best Practices

### 1. Behavior-Focused Testing

Tests focus on user-observable behavior rather than implementation details:

```typescript
// ✅ Good: Tests behavior
expect(screen.getByRole("button")).toBeInTheDocument()
await user.click(screen.getByRole("button"))
expect(mockHandler).toHaveBeenCalled()

// ❌ Avoid: Tests implementation
expect(element).toHaveClass("specific-internal-class")
```

### 2. Accessibility-First Queries

Using React Testing Library's accessibility-focused queries:

```typescript
// ✅ Preferred: Accessibility queries
screen.getByRole("button", { name: "Submit" })
screen.getByLabelText("Email address")
screen.getByText("Error message")

// ⚠️ Fallback: When accessibility queries aren't sufficient
screen.getByTestId("complex-component")
```

### 3. Realistic User Interactions

Using `userEvent` for realistic interaction simulation:

```typescript
// ✅ Realistic: userEvent respects disabled states
await user.click(disabledButton) // Won't trigger if disabled

// ❌ Unrealistic: fireEvent can bypass disabled states
fireEvent.click(disabledButton) // May still trigger
```

### 4. Custom Render Utilities

Using theme-aware render utilities for consistent testing:

```typescript
// Custom render with theme provider
function renderWithTheme(ui: ReactElement) {
  return render(ui, { wrapper: AllTheProviders })
}
```

## Test Environment Setup

### Browser API Mocking

The test environment includes mocks for browser APIs not available in jsdom:

```typescript
// IntersectionObserver mock for container queries
global.IntersectionObserver = vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))

// ResizeObserver mock for responsive components
global.ResizeObserver = vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))

// matchMedia mock for responsive testing
Object.defineProperty(window, "matchMedia", {
  writable: true,
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

## Coverage Requirements

The project maintains high code coverage standards:

- **Branches**: 80% minimum
- **Functions**: 80% minimum
- **Lines**: 80% minimum
- **Statements**: 80% minimum

Coverage reports are generated in multiple formats:

- **HTML**: Interactive coverage report in `coverage/index.html`
- **JSON**: Machine-readable coverage data in `coverage/coverage-final.json`
- **Text**: Terminal summary during test runs

## Running Tests

### Basic Commands

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test -- Button.test.tsx

# Run tests matching pattern
npm test -- --grep "renders with default props"
```

### Debugging Tests

```bash
# Run tests with debugging output
npm test -- --reporter=verbose

# Run single test for debugging
npm test -- --run --reporter=verbose src/components/forms/Button/Button.test.tsx
```

## Common Testing Patterns

### Testing Component Props

```typescript
it("applies custom className", () => {
  render(<Component className="custom-class" />)
  expect(screen.getByRole("button")).toHaveClass("custom-class")
})
```

### Testing Event Handlers

```typescript
it("calls onClick when clicked", async () => {
  const handleClick = vi.fn()
  render(<Button onClick={handleClick} />)

  await user.click(screen.getByRole("button"))
  expect(handleClick).toHaveBeenCalledTimes(1)
})
```

### Testing Conditional Rendering

```typescript
it("shows loading state", () => {
  render(<Button loading>Submit</Button>)
  expect(screen.getByText("Loading...")).toBeInTheDocument()
  expect(screen.queryByText("Submit")).not.toBeInTheDocument()
})
```

### Testing Form Integration

```typescript
it("integrates with forms", () => {
  render(
    <form>
      <Input name="email" />
    </form>
  )

  const input = screen.getByRole("textbox")
  expect(input).toHaveAttribute("name", "email")
})
```

## Troubleshooting

### Common Issues

1. **Tests fail in CI but pass locally**

   - Check timezone differences
   - Verify Node.js version consistency
   - Ensure all dependencies are locked

2. **Coverage drops unexpectedly**

   - Check for new files not covered by tests
   - Verify test file patterns in `vitest.config.ts`
   - Look for dead code or unreachable branches

3. **Tests are slow**

   - Use `vi.useFakeTimers()` for time-dependent tests
   - Mock heavy external dependencies
   - Avoid unnecessary DOM mutations

4. **Accessibility warnings**
   - Ensure all interactive elements have accessible names
   - Check ARIA attribute usage
   - Test keyboard navigation paths

### Performance Optimization

- **Parallel execution**: Tests run in parallel by default
- **Code splitting**: Large test files split by component area
- **Selective testing**: Use `--changed` flag for testing only modified files
- **Mock optimization**: Heavy dependencies mocked to reduce test overhead

## Contributing to Tests

### Writing New Tests

1. **Create test file alongside component**:

   ```
   src/components/forms/NewComponent/
   ├── NewComponent.tsx
   ├── NewComponent.test.tsx
   └── index.ts
   ```

2. **Follow naming conventions**:

   - Test files: `ComponentName.test.tsx`
   - Test suites: `describe('ComponentName', () => {})`
   - Test cases: `it('does something specific', () => {})`

3. **Cover these areas**:
   - Basic rendering with default props
   - All prop variations
   - User interactions
   - Accessibility compliance
   - Error states
   - Edge cases

### Updating Existing Tests

1. **When components change**:

   - Update tests to match new behavior
   - Ensure backward compatibility
   - Add tests for new features

2. **When tests fail**:

   - Investigate if failure indicates real bug
   - Update test expectations if behavior changed intentionally
   - Consider if test was testing implementation details

3. **Performance considerations**:
   - Avoid testing implementation details
   - Focus on user-observable behavior
   - Use efficient queries and assertions

## Test Report Examples

### Successful Test Run

```
✓ src/utils/containerFonts.test.ts (12 tests)
✓ src/components/core/Typography/Typography.test.tsx (11 tests)
✓ src/components/forms/Button/Button.test.tsx (11 tests)
✓ src/components/forms/Select/Select.test.tsx (16 tests)
✓ src/components/forms/Checkbox/Checkbox.test.tsx (13 tests)

Test Files  5 passed (5)
Tests  63 passed (63)
Coverage  85.4% Branches 82.1% Functions 87.2% Lines 85.4% Statements
```

### Coverage Report Structure

```
Coverage Summary
├── Branches: 82.1% (234/285)
├── Functions: 87.2% (156/179)
├── Lines: 85.4% (423/495)
└── Statements: 85.4% (423/495)

Detailed Coverage
├── src/components/
│   ├── core/ - 89.2%
│   └── forms/ - 84.7%
├── src/utils/ - 91.3%
└── src/types/ - 95.8%
```

This comprehensive testing setup ensures the Construct UI component library maintains high quality, accessibility compliance, and behavioral reliability across all components and utilities.
