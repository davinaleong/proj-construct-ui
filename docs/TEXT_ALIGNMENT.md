# Text Alignment for Form Components

The Input and Textarea components now support independent text alignment control for labels and helper/error messages, providing flexible layout options for different design requirements.

## Features

- **Independent Control**: Set different alignments for labels and messages
- **Four Alignment Options**: left, center, right, justify
- **Consistent API**: Same props work for both Input and Textarea
- **Default Behavior**: Left alignment by default (no breaking changes)

## Text Alignment Options

### Available Alignments

- **`left`** (default): Standard left alignment
- **`center`**: Center-aligned text
- **`right`**: Right-aligned text
- **`justify`**: Justified text (spreads text to fill width)

## Usage

### Basic Input Alignment

```tsx
import { Input } from './components/forms'

// Label alignment only
<Input
  label="Center Aligned Label"
  labelAlign="center"
  placeholder="Label appears centered above"
  helperText="Message uses default left alignment"
/>

// Message alignment only
<Input
  label="Default Label"
  placeholder="Right-aligned helper text"
  messageAlign="right"
  helperText="This message appears on the right"
/>

// Both label and message alignment
<Input
  label="Right Aligned Label"
  labelAlign="right"
  placeholder="Both elements aligned"
  messageAlign="right"
  helperText="Both label and message aligned right"
/>
```

### Textarea Alignment

```tsx
import { Textarea } from "./components/forms"

// Same API works for Textarea
;<Textarea
  label="Centered Form Layout"
  labelAlign="center"
  messageAlign="center"
  placeholder="Enter your message..."
  helperText="All text centered for a clean look"
  rows={4}
/>
```

### Error Message Alignment

```tsx
// Error messages respect alignment settings
<Input
  label="Validation Input"
  labelAlign="left"
  messageAlign="right"
  placeholder="Enter email"
  error
  errorMessage="Error appears on the right"
/>
```

## TypeScript Support

```tsx
import type { TextAlignment } from './components/forms'

// Type-safe alignment values
const labelAlignment: TextAlignment = "center"
const messageAlignment: TextAlignment = "right"

<Input
  label="Type-Safe Alignment"
  labelAlign={labelAlignment}
  messageAlign={messageAlignment}
  placeholder="Fully type-safe"
/>
```

## Props API

### Input Component

```tsx
interface InputProps {
  // ... other props

  /**
   * Label text alignment
   * @default "left"
   */
  labelAlign?: "left" | "center" | "right" | "justify"

  /**
   * Helper/error message text alignment
   * @default "left"
   */
  messageAlign?: "left" | "center" | "right" | "justify"
}
```

### Textarea Component

```tsx
interface TextareaProps {
  // ... other props

  /**
   * Label text alignment
   * @default "left"
   */
  labelAlign?: "left" | "center" | "right" | "justify"

  /**
   * Helper/error message text alignment
   * @default "left"
   */
  messageAlign?: "left" | "center" | "right" | "justify"
}
```

## Design Patterns

### Professional Forms

```tsx
// Clean, professional look with right-aligned helper text
<div className="space-y-4">
  <Input
    label="Full Name"
    placeholder="John Doe"
    messageAlign="right"
    helperText="As it appears on ID"
  />

  <Input
    label="Email Address"
    placeholder="john@example.com"
    messageAlign="right"
    helperText="We'll never share your email"
  />
</div>
```

### Centered Layouts

```tsx
// Fully centered form design
<div className="max-w-md mx-auto">
  <Input
    label="Username"
    labelAlign="center"
    messageAlign="center"
    placeholder="Choose a username"
    helperText="3-20 characters, letters and numbers only"
  />

  <Textarea
    label="Bio"
    labelAlign="center"
    messageAlign="center"
    placeholder="Tell us about yourself..."
    helperText="Optional - share what makes you unique"
    rows={4}
  />
</div>
```

### Mixed Alignment Layouts

```tsx
// Creative layouts with different alignments
<div className="grid grid-cols-2 gap-4">
  <Input
    label="Left Label"
    labelAlign="left"
    messageAlign="right"
    placeholder="Mixed alignment"
    helperText="Right helper"
  />

  <Input
    label="Right Label"
    labelAlign="right"
    messageAlign="left"
    placeholder="Opposite alignment"
    helperText="Left helper"
  />
</div>
```

### RTL Language Support

```tsx
// Right-to-left language layouts
<Input
  label="النص العربي"
  labelAlign="right"
  messageAlign="right"
  placeholder="أدخل النص هنا"
  helperText="النص المساعد"
/>
```

## Use Cases

### When to Use Different Alignments

**Left Alignment (Default)**

- Standard forms and applications
- Left-to-right reading patterns
- Most common use case

**Center Alignment**

- Landing pages and marketing forms
- Clean, minimal design aesthetics
- Single-column layouts

**Right Alignment**

- Professional and business forms
- Right-to-left languages (Arabic, Hebrew)
- Column layouts where right alignment improves readability

**Justify Alignment**

- Wide form layouts
- When you want text to fill the full width
- Professional documents and reports

## Browser Support

Text alignment uses standard CSS `text-align` properties, providing universal browser support:

- ✅ All modern browsers
- ✅ Internet Explorer 11+
- ✅ Mobile browsers
- ✅ Screen readers and accessibility tools

## Accessibility

The alignment feature maintains full accessibility:

- **Screen Readers**: Alignment doesn't affect content reading order
- **Keyboard Navigation**: Tab order remains logical regardless of alignment
- **High Contrast**: Text remains readable in high contrast modes
- **Zoom**: Text alignment works correctly at all zoom levels

This text alignment system provides the flexibility needed for various design requirements while maintaining consistency and accessibility across your form components.
