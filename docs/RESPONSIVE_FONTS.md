# Responsive Font System

This utility provides a comprehensive responsive typography system that automatically scales font sizes based on screen width.

## Features

- **Mobile-first scaling**: Starts with smaller fonts and scales up
- **Breakpoint-aware**: Uses Tailwind CSS responsive prefixes (sm, md, lg, xl, 2xl)
- **Semantic sizing**: Purpose-built scales for headings, body text, and UI elements
- **Consistent spacing**: Maintains proper line heights and letter spacing

## Breakpoints

- **sm**: 640px and up (mobile landscape)
- **md**: 768px and up (tablet)
- **lg**: 1024px and up (desktop)
- **xl**: 1280px and up (large desktop)
- **2xl**: 1536px and up (extra large desktop)

## Usage

### Basic Font Sizes

```tsx
import { responsiveFontSizes } from "../utils/responsiveFonts"

// Apply responsive font class
;<div className={responsiveFontSizes.lg}>
  This text scales from base → xl → 2xl
</div>
```

### Headings

```tsx
import { responsiveHeadingSizes } from "../utils/responsiveFonts"

;<h1 className={responsiveHeadingSizes.h1}>Hero Heading (4xl → 6xl)</h1>
```

### Body Text

```tsx
import { responsiveBodySizes } from "../utils/responsiveFonts"

;<p className={responsiveBodySizes.regular}>Body text (sm → base → lg)</p>
```

### UI Elements

```tsx
import { responsiveUISizes } from '../utils/responsiveFonts'

// Button text
<button className={responsiveUISizes.button.md}>
  Button
</button>

// Input text
<input className={responsiveUISizes.input.lg} />

// Labels and helpers
<label className={responsiveUISizes.label}>Label</label>
<span className={responsiveUISizes.helper}>Helper text</span>
```

### Helper Functions

```tsx
import {
  getResponsiveFontClass,
  getResponsiveHeadingClass,
  getResponsiveBodyClass,
  getResponsiveUIClass,
} from "../utils/responsiveFonts"

// Get classes programmatically
const headingClass = getResponsiveHeadingClass("h2")
const bodyClass = getResponsiveBodyClass("large")
const buttonClass = getResponsiveUIClass("button", "lg")
```

### Pre-built Component Classes

```tsx
import { responsiveTextClasses } from '../utils/responsiveFonts'

// Hero section
<h1 className={responsiveTextClasses.hero.title}>Hero Title</h1>
<p className={responsiveTextClasses.hero.subtitle}>Hero Subtitle</p>

// Article
<h2 className={responsiveTextClasses.article.title}>Article Title</h2>
<p className={responsiveTextClasses.article.body}>Article body</p>

// Cards
<h3 className={responsiveTextClasses.card.title}>Card Title</h3>
<p className={responsiveTextClasses.card.body}>Card content</p>
```

## Typography Scale

### Heading Scale (Playfair Display)

- **H1**: 4xl → 5xl → 6xl (Hero headings)
- **H2**: 3xl → 4xl → 5xl (Section titles)
- **H3**: 2xl → 3xl → 4xl (Subsections)
- **H4**: xl → 2xl → 3xl (Card titles)
- **H5**: lg → xl → 2xl (Small headings)
- **H6**: base → lg → xl (Minimal headings)

### Body Scale (Montserrat)

- **Lead**: lg → xl → 2xl (Article intros)
- **Large**: base → lg → xl (Important content)
- **Regular**: sm → base → lg (Standard text)
- **Small**: sm → sm → base (Secondary text)
- **Caption**: xs → xs → sm (Fine print)

### UI Scale (Montserrat)

- **Button SM**: xs → sm
- **Button MD**: sm → base
- **Button LG**: base → lg
- **Input SM**: sm → base
- **Input MD**: sm → base → lg
- **Input LG**: base → lg → xl
- **Labels**: sm → base (with font-medium)
- **Helpers**: xs → sm

## Best Practices

1. **Use semantic scales**: Choose heading, body, or UI scales based on content purpose
2. **Test on devices**: Always verify scaling works well on actual devices
3. **Consider context**: Larger screens can handle more text, smaller screens need concise content
4. **Maintain hierarchy**: Ensure font size relationships remain clear across breakpoints
5. **Optimize line lengths**: Aim for 45-75 characters per line for optimal readability

## Integration with Components

All form components (Button, Input, Textarea) and Typography components automatically use the responsive font system. The scaling is seamless and maintains design consistency across all screen sizes.
