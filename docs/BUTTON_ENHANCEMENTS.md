# Button Min Width and Text Truncation

The Button component now supports minimum width constraints and text truncation to ensure consistent layouts and handle varying text lengths gracefully.

## Features

- **Minimum Width**: Ensures buttons maintain consistent width regardless of text length
- **Text Truncation**: Handles long text with ellipsis truncation
- **Size-Aware**: Minimum widths scale appropriately with button sizes
- **Flexible**: Can be used independently or together

## Props

### minWidth

Controls whether the button should have a minimum width.

```tsx
/**
 * Minimum width for the button
 * @default false
 */
minWidth?: boolean
```

**Minimum width values by size:**

- `xs`: 64px (min-w-16)
- `sm`: 80px (min-w-20)
- `md`: 96px (min-w-24)
- `lg`: 128px (min-w-32)
- `xl`: 160px (min-w-40)

### truncate

Controls whether long text should be truncated with ellipsis.

```tsx
/**
 * Truncate text if too long
 * @default false
 */
truncate?: boolean
```

## Usage Examples

### Basic Minimum Width

```tsx
import { Button } from './components/forms'

// Inconsistent widths (default)
<Button>Yes</Button>
<Button>No</Button>
<Button>Cancel</Button>

// Consistent widths with minWidth
<Button minWidth>Yes</Button>
<Button minWidth>No</Button>
<Button minWidth>Cancel</Button>
```

### Text Truncation

```tsx
// Long text that might cause layout issues
<div className="w-48">
  <Button className="w-full">
    This is very long button text that overflows
  </Button>
</div>

// Truncated text with ellipsis
<div className="w-48">
  <Button truncate className="w-full">
    This is very long button text that overflows
  </Button>
</div>
```

### Combined Usage

```tsx
// Perfect for action button groups
<Button minWidth truncate>Save</Button>
<Button minWidth truncate>Save and Continue</Button>
<Button minWidth truncate>Save as Draft and Send for Review</Button>
<Button minWidth truncate>Cancel</Button>
```

### Different Button Variants

```tsx
// Works with all variants
<Button variant="solid" minWidth truncate>Solid Button</Button>
<Button variant="outline" minWidth truncate>Outline Button</Button>
<Button variant="ghost" minWidth truncate>Ghost Button</Button>
<Button variant="link" minWidth truncate>Link Button</Button>
```

### Size Variations

```tsx
// Minimum width scales with size
<Button size="xs" minWidth truncate>Extra Small</Button>
<Button size="sm" minWidth truncate>Small Button</Button>
<Button size="md" minWidth truncate>Medium Button</Button>
<Button size="lg" minWidth truncate>Large Button</Button>
<Button size="xl" minWidth truncate>Extra Large</Button>
```

## Use Cases

### Action Button Groups

Perfect for maintaining visual consistency in button groups with varying text lengths:

```tsx
<div className="flex gap-2">
  <Button minWidth>Save</Button>
  <Button minWidth>Cancel</Button>
  <Button minWidth>Save and Continue</Button>
</div>
```

### Navigation Menus

Ensures navigation buttons have consistent appearance:

```tsx
<nav className="flex gap-1">
  <Button variant="ghost" minWidth>
    Home
  </Button>
  <Button variant="ghost" minWidth>
    About
  </Button>
  <Button variant="ghost" minWidth>
    Contact Us
  </Button>
</nav>
```

### Form Actions

Maintains clean form layouts:

```tsx
<div className="space-y-2">
  <Button variant="outline" minWidth truncate className="w-full">
    Submit Application
  </Button>
  <Button variant="outline" minWidth truncate className="w-full">
    Save as Draft
  </Button>
  <Button variant="outline" minWidth truncate className="w-full">
    Cancel
  </Button>
</div>
```

### Modal Actions

Consistent dialog button layouts:

```tsx
<div className="flex justify-end gap-2">
  <Button variant="ghost" minWidth>
    Cancel
  </Button>
  <Button variant="solid" minWidth>
    Confirm
  </Button>
</div>
```

### Responsive Button Lists

Handling dynamic content with unknown text lengths:

```tsx
{
  actions.map((action) => (
    <Button key={action.id} minWidth truncate onClick={action.handler}>
      {action.label}
    </Button>
  ))
}
```

## Design Patterns

### Consistent Action Groups

```tsx
// Before: Inconsistent button sizes
<ButtonGroup>
  <Button>OK</Button>                    {/* 32px wide */}
  <Button>Cancel</Button>                {/* 64px wide */}
  <Button>Save and Continue</Button>     {/* 140px wide */}
</ButtonGroup>

// After: Consistent minimum widths
<ButtonGroup>
  <Button minWidth>OK</Button>           {/* 96px wide */}
  <Button minWidth>Cancel</Button>       {/* 96px wide */}
  <Button minWidth>Save and Continue</Button> {/* 140px wide */}
</ButtonGroup>
```

### Responsive Card Actions

```tsx
// Handles varying content lengths gracefully
<Card>
  <CardContent>...</CardContent>
  <CardActions>
    <Button minWidth truncate>
      {dynamicActionText}
    </Button>
  </CardActions>
</Card>
```

### Table Row Actions

```tsx
// Consistent widths in table cells
<TableCell>
  <Button size="sm" minWidth truncate>
    {action.name}
  </Button>
</TableCell>
```

## Browser Support

Uses standard CSS properties with universal support:

- ✅ `min-width`: All modern browsers
- ✅ `text-overflow: ellipsis`: All modern browsers
- ✅ `overflow: hidden`: All modern browsers
- ✅ `white-space: nowrap`: All modern browsers

## Accessibility

Both features maintain full accessibility:

- **Screen Readers**: Full text is still available to assistive technology
- **Keyboard Navigation**: Button focus and activation work normally
- **High Contrast**: Visual truncation indicators work in all themes
- **Touch Targets**: Minimum width improves touch usability

## Technical Implementation

### CSS Classes Applied

**Minimum Width:**

```css
.min-w-16 {
  min-width: 4rem;
} /* xs */
.min-w-20 {
  min-width: 5rem;
} /* sm */
.min-w-24 {
  min-width: 6rem;
} /* md */
.min-w-32 {
  min-width: 8rem;
} /* lg */
.min-w-40 {
  min-width: 10rem;
} /* xl */
```

**Text Truncation:**

```css
.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.min-w-0 {
  min-width: 0;
} /* Allows flex item to shrink */
```

### Component Structure

```tsx
// Text content is wrapped when truncate is enabled
{
  truncate ? <span className="truncate min-w-0">{children}</span> : children
}
```

This enhancement system provides the control needed for consistent, professional button layouts while gracefully handling dynamic content and varying text lengths.
