# Container-Based Font Scaling

This advanced typography system uses CSS Container Queries to scale fonts based on their container width rather than viewport width, providing more precise and component-aware responsive design.

## Why Container-Based Scaling?

### Traditional Viewport-Based Issues

- All text scales the same regardless of component size
- Sidebars and main content use identical font sizes
- Components can't adapt to their available space
- Complex layouts struggle with fixed viewport breakpoints

### Container-Based Benefits

- Each component scales independently based on its container
- Perfect for component-based architectures (React, Vue, etc.)
- Sidebars, cards, and modals all scale appropriately
- True responsive design at the component level

## How It Works

Container queries use the `@container` CSS rule to apply styles based on a container's size rather than the viewport size:

```css
.component {
  container-type: inline-size; /* Enables container queries */
}

.text {
  font-size: 1rem;
}

@container (min-width: 320px) {
  .text {
    font-size: 1.125rem;
  }
}

@container (min-width: 480px) {
  .text {
    font-size: 1.25rem;
  }
}
```

## Container Breakpoints

Our system uses these container-based breakpoints:

- **320px**: Small container (narrow sidebars, small cards)
- **480px**: Medium container (regular cards, form sections)
- **640px**: Large container (main content areas)
- **768px**: Extra large container (hero sections)
- **1024px**: XXL container (full-width layouts)

## Usage Examples

### Typography Components

```tsx
import { Typography } from './components/core'

// This heading will scale based on its container width
<div className="w-64"> {/* Narrow container */}
  <Typography variant="h2">
    Compact Heading {/* Smaller text */}
  </Typography>
</div>

<div className="w-full max-w-4xl"> {/* Wide container */}
  <Typography variant="h2">
    Spacious Heading {/* Larger text */}
  </Typography>
</div>
```

### Form Components

```tsx
import { Input, Button } from './components/forms'

// Form in narrow sidebar
<div className="w-56">
  <Input label="Search" size="md" /> {/* Adapts to narrow space */}
  <Button size="md">Submit</Button> {/* Compact button text */}
</div>

// Form in main content
<div className="w-full max-w-2xl">
  <Input label="Email Address" size="md" /> {/* Larger, more readable */}
  <Button size="md">Submit</Button> {/* Comfortable button text */}
</div>
```

### Container Query Classes

You can also use the container font classes directly:

```tsx
import { containerResponsiveHeadings } from "../utils/containerFonts"

;<div className="w-96">
  <h1 className={containerResponsiveHeadings.h1}>Container-Aware Heading</h1>
</div>
```

## Component Integration

All components automatically use container-based scaling:

### Typography Component

- All variants (h1-h6, body, caption) scale with container
- Perfect for cards, modals, sidebars
- Maintains hierarchy across different container sizes

### Form Components

- **Button**: Text scales based on button's container
- **Input**: Input text, labels, and helpers all container-aware
- **Textarea**: Same container-aware scaling as Input

### Layout Components

- **Card**: Content scales appropriately for card width
- **Paper**: Typography adapts to paper component size
- **Container**: Provides optimal text sizing for content width

## Real-World Scenarios

### Dashboard Layout

```tsx
// Sidebar navigation (narrow)
<aside className="w-64">
  <Typography variant="h5">Navigation</Typography> {/* Compact */}
  <Button size="sm">Menu Item</Button> {/* Small button text */}
</aside>

// Main dashboard (wide)
<main className="flex-1">
  <Typography variant="h2">Dashboard</Typography> {/* Large heading */}
  <Typography variant="body">
    Content scales perfectly for reading {/* Optimal body text */}
  </Typography>
</main>
```

### Card Grids

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {cards.map((card) => (
    <Card key={card.id}>
      <Typography variant="h4">{card.title}</Typography>
      {/* Title scales based on card width, not screen width */}
      <Typography variant="body">{card.description}</Typography>
      {/* Body text adapts to card's available space */}
    </Card>
  ))}
</div>
```

### Modal Dialogs

```tsx
<Modal>
  <div className="w-96">
    {" "}
    {/* Fixed modal width */}
    <Typography variant="h3">Confirm Action</Typography>
    {/* Heading scales for modal container, not viewport */}
    <Typography variant="body">Are you sure you want to continue?</Typography>
    <Button size="md">Confirm</Button>
    {/* Button text perfect for modal width */}
  </div>
</Modal>
```

## Browser Support

Container queries are supported in:

- ✅ Chrome 105+
- ✅ Firefox 110+
- ✅ Safari 16+
- ✅ Edge 105+

For older browsers, the system gracefully falls back to the base font size.

## Best Practices

1. **Enable container context**: Components automatically enable `container-type: inline-size`

2. **Test different container sizes**: Always verify text looks good in narrow and wide containers

3. **Consider content hierarchy**: Ensure headings remain proportionally larger than body text across all container sizes

4. **Use semantic components**: Prefer Typography, Input, Button components over manual classes

5. **Design mobile-first**: Start with small container sizes and scale up

6. **Optimize line length**: Container queries help maintain 45-75 characters per line regardless of container width

This container-based approach provides true responsive typography that adapts to component context rather than just screen size, making it perfect for modern component-driven applications.
