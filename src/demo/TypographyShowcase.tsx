import { Typography, Paper } from "../components/core"
import { Input, Button } from "../components/forms"

export function TypographyShowcase() {
  return (
    <div className="mt-16" id="typography">
      <Typography variant="h2" className="mb-8">
        Container-Based Typography
      </Typography>
      <Typography variant="body" className="mb-8 text-stone-600">
        Typography that scales based on container width rather than viewport
        size. Each container adapts its text size based on its own available
        space, providing perfect scaling for component-based layouts.
      </Typography>

      {/* Responsive Headings */}
      <div className="mb-12">
        <Typography variant="h3" className="mb-6">
          Responsive Headings
        </Typography>
        <div className="space-y-6">
          <Paper variant="outlined" padding="lg">
            <Typography variant="h1" className="mb-2">
              Hero Heading (H1)
            </Typography>
            <Typography variant="body" color="muted">
              Scales from 4xl on mobile to 6xl on desktop
            </Typography>
          </Paper>

          <Paper variant="outlined" padding="md">
            <Typography variant="h2" className="mb-2">
              Section Title (H2)
            </Typography>
            <Typography variant="bodySmall" color="muted">
              Scales from 3xl on mobile to 5xl on desktop
            </Typography>
          </Paper>

          <Paper variant="outlined" padding="md">
            <Typography variant="h3" className="mb-2">
              Subsection (H3)
            </Typography>
            <Typography variant="bodySmall" color="muted">
              Scales from 2xl on mobile to 4xl on desktop
            </Typography>
          </Paper>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Paper variant="outlined" padding="sm">
              <Typography variant="h4" className="mb-1">
                H4 Title
              </Typography>
              <Typography variant="caption" color="muted">
                xl → 3xl
              </Typography>
            </Paper>
            <Paper variant="outlined" padding="sm">
              <Typography variant="h5" className="mb-1">
                H5 Title
              </Typography>
              <Typography variant="caption" color="muted">
                lg → 2xl
              </Typography>
            </Paper>
            <Paper variant="outlined" padding="sm">
              <Typography variant="h6" className="mb-1">
                H6 Title
              </Typography>
              <Typography variant="caption" color="muted">
                base → xl
              </Typography>
            </Paper>
          </div>
        </div>
      </div>

      {/* Responsive Body Text */}
      <div className="mb-12">
        <Typography variant="h3" className="mb-6">
          Responsive Body Text
        </Typography>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Paper variant="outlined" padding="lg">
            <Typography variant="bodyLarge" className="mb-4">
              Large Body Text
            </Typography>
            <Typography variant="bodyLarge" color="muted">
              This text scales from base size on mobile to lg on larger screens,
              ensuring optimal readability across all devices. Perfect for lead
              paragraphs and important content.
            </Typography>
          </Paper>

          <Paper variant="outlined" padding="lg">
            <Typography variant="body" className="mb-4">
              Regular Body Text
            </Typography>
            <Typography variant="body" color="muted">
              Standard body text that scales from sm on mobile to lg on desktop.
              This provides the perfect reading experience for most content and
              maintains excellent legibility.
            </Typography>
          </Paper>

          <Paper variant="outlined" padding="lg">
            <Typography variant="bodySmall" className="mb-4">
              Small Body Text
            </Typography>
            <Typography variant="bodySmall" color="muted">
              Smaller text that scales responsively for captions, metadata, and
              secondary information. Maintains readability while saving space on
              smaller screens.
            </Typography>
          </Paper>

          <Paper variant="outlined" padding="lg">
            <Typography variant="caption" className="mb-4">
              Caption Text
            </Typography>
            <Typography variant="caption" color="muted">
              The smallest text size for fine print, labels, and annotations.
              Scales minimally to ensure it remains readable across all device
              sizes.
            </Typography>
          </Paper>
        </div>
      </div>

      {/* Form Elements Responsive Text */}
      <div className="mb-12">
        <Typography variant="h3" className="mb-6">
          Form Elements with Responsive Text
        </Typography>
        <div className="max-w-2xl space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="Small Input"
              placeholder="Small size"
              size="sm"
              helperText="Small input text"
              labelAlign="left"
              messageAlign="left"
            />
            <Input
              label="Medium Input"
              placeholder="Medium size"
              size="md"
              helperText="Medium input text"
              labelAlign="left"
              messageAlign="left"
            />
            <Input
              label="Large Input"
              placeholder="Large size"
              size="lg"
              helperText="Large input text"
              labelAlign="left"
              messageAlign="left"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button size="sm" variant="solid">
              Small Button
            </Button>
            <Button size="md" variant="solid">
              Medium Button
            </Button>
            <Button size="lg" variant="solid">
              Large Button
            </Button>
          </div>
        </div>
      </div>

      <Paper
        variant="elevated"
        padding="lg"
        background="success"
        className="mb-8"
      >
        <Typography variant="h4" className="mb-4" color="paper">
          🎯 Responsive Typography Complete!
        </Typography>
        <Typography variant="body" color="paper" intensity="soft">
          ✅ All text elements now scale beautifully across device sizes
          <br />
          ✅ Form controls use responsive font sizing
          <br />✅ Optimized for readability on mobile, tablet, and desktop
        </Typography>
      </Paper>
    </div>
  )
}
