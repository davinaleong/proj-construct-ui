import { Tag } from "./Tag"
import {
  User,
  Settings,
  Star,
  Heart,
  Zap,
  ShoppingCart,
  Calendar,
  Mail,
} from "lucide-react"

export function TagShowcase() {
  const sampleTags = [
    { label: "React", color: "primary" as const },
    { label: "TypeScript", color: "secondary" as const },
    { label: "Design System", color: "success" as const },
    { label: "UI Components", color: "info" as const },
    { label: "Documentation", color: "warning" as const },
    { label: "Testing", color: "danger" as const },
    { label: "Accessibility", color: "accent" as const },
    { label: "Performance", color: "muted" as const },
  ]

  return (
    <div className="space-y-8">
      {/* Basic Tags */}
      <section>
        <h3 className="text-lg font-semibold text-stone-800 mb-4">
          Basic Tags
        </h3>
        <div className="flex flex-wrap gap-2">
          <Tag>Default</Tag>
          <Tag>React</Tag>
          <Tag>TypeScript</Tag>
          <Tag>Next.js</Tag>
          <Tag>Tailwind CSS</Tag>
        </div>
      </section>

      {/* Size Variants */}
      <section>
        <h3 className="text-lg font-semibold text-stone-800 mb-4">
          Size Variants
        </h3>
        <div className="flex flex-wrap items-center gap-3">
          <Tag size="xs">Extra Small</Tag>
          <Tag size="sm">Small</Tag>
          <Tag size="md">Medium</Tag>
          <Tag size="lg">Large</Tag>
        </div>
      </section>

      {/* Visual Variants */}
      <section>
        <h3 className="text-lg font-semibold text-stone-800 mb-4">
          Visual Variants
        </h3>
        <div className="grid gap-4">
          {(["solid", "soft", "outline", "ghost"] as const).map((variant) => (
            <div key={variant} className="space-y-2">
              <h4 className="text-sm font-medium text-stone-600 capitalize">
                {variant}
              </h4>
              <div className="flex flex-wrap gap-2">
                <Tag variant={variant} colorVariant="primary">
                  Primary
                </Tag>
                <Tag variant={variant} colorVariant="secondary">
                  Secondary
                </Tag>
                <Tag variant={variant} colorVariant="success">
                  Success
                </Tag>
                <Tag variant={variant} colorVariant="warning">
                  Warning
                </Tag>
                <Tag variant={variant} colorVariant="danger">
                  Danger
                </Tag>
                <Tag variant={variant} colorVariant="info">
                  Info
                </Tag>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Color Variants */}
      <section>
        <h3 className="text-lg font-semibold text-stone-800 mb-4">
          Color Variants
        </h3>
        <div className="grid gap-4 md:grid-cols-2">
          {/* Semantic Colors */}
          <div>
            <h4 className="text-sm font-medium text-stone-600 mb-2">
              Semantic Colors
            </h4>
            <div className="flex flex-wrap gap-2">
              <Tag colorVariant="default">Default</Tag>
              <Tag colorVariant="primary">Primary</Tag>
              <Tag colorVariant="secondary">Secondary</Tag>
              <Tag colorVariant="success">Success</Tag>
              <Tag colorVariant="warning">Warning</Tag>
              <Tag colorVariant="danger">Danger</Tag>
              <Tag colorVariant="info">Info</Tag>
              <Tag colorVariant="accent">Accent</Tag>
            </div>
          </div>

          {/* Tailwind Colors */}
          <div>
            <h4 className="text-sm font-medium text-stone-600 mb-2">
              Tailwind Colors
            </h4>
            <div className="flex flex-wrap gap-2">
              <Tag colorVariant="red">Red</Tag>
              <Tag colorVariant="orange">Orange</Tag>
              <Tag colorVariant="yellow">Yellow</Tag>
              <Tag colorVariant="green">Green</Tag>
              <Tag colorVariant="blue">Blue</Tag>
              <Tag colorVariant="purple">Purple</Tag>
              <Tag colorVariant="pink">Pink</Tag>
              <Tag colorVariant="gray">Gray</Tag>
            </div>
          </div>
        </div>
      </section>

      {/* With Icons */}
      <section>
        <h3 className="text-lg font-semibold text-stone-800 mb-4">
          Tags with Icons
        </h3>
        <div className="space-y-3">
          {/* Start Icons */}
          <div>
            <h4 className="text-sm font-medium text-stone-600 mb-2">
              Start Icons
            </h4>
            <div className="flex flex-wrap gap-2">
              <Tag startIcon={<User />} colorVariant="primary">
                User
              </Tag>
              <Tag startIcon={<Settings />} colorVariant="secondary">
                Settings
              </Tag>
              <Tag startIcon={<Star />} colorVariant="warning">
                Favorite
              </Tag>
              <Tag startIcon={<Heart />} colorVariant="danger">
                Liked
              </Tag>
            </div>
          </div>

          {/* End Icons */}
          <div>
            <h4 className="text-sm font-medium text-stone-600 mb-2">
              End Icons
            </h4>
            <div className="flex flex-wrap gap-2">
              <Tag endIcon={<Zap />} colorVariant="success">
                Fast
              </Tag>
              <Tag endIcon={<ShoppingCart />} colorVariant="info">
                Cart
              </Tag>
              <Tag endIcon={<Calendar />} colorVariant="accent">
                Date
              </Tag>
              <Tag endIcon={<Mail />} colorVariant="muted">
                Email
              </Tag>
            </div>
          </div>

          {/* Both Icons */}
          <div>
            <h4 className="text-sm font-medium text-stone-600 mb-2">
              Both Icons
            </h4>
            <div className="flex flex-wrap gap-2">
              <Tag
                startIcon={<User />}
                endIcon={<Settings />}
                colorVariant="primary"
              >
                User Settings
              </Tag>
              <Tag
                startIcon={<Star />}
                endIcon={<Heart />}
                colorVariant="danger"
              >
                Favorite
              </Tag>
            </div>
          </div>

          {/* Dot Indicators */}
          <div>
            <h4 className="text-sm font-medium text-stone-600 mb-2">
              Dot Indicators
            </h4>
            <div className="flex flex-wrap gap-2">
              <Tag dot colorVariant="success">
                Online
              </Tag>
              <Tag dot colorVariant="warning">
                Away
              </Tag>
              <Tag dot colorVariant="danger">
                Busy
              </Tag>
              <Tag dot colorVariant="muted">
                Offline
              </Tag>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Tags */}
      <section>
        <h3 className="text-lg font-semibold text-stone-800 mb-4">
          Interactive Tags
        </h3>
        <div className="space-y-3">
          {/* Clickable */}
          <div>
            <h4 className="text-sm font-medium text-stone-600 mb-2">
              Clickable (hover to see effect)
            </h4>
            <div className="flex flex-wrap gap-2">
              <Tag clickable colorVariant="primary">
                Click me
              </Tag>
              <Tag clickable colorVariant="secondary">
                Interactive
              </Tag>
              <Tag clickable colorVariant="success">
                Button-like
              </Tag>
            </div>
          </div>

          {/* Dismissible */}
          <div>
            <h4 className="text-sm font-medium text-stone-600 mb-2">
              Dismissible (click × to remove)
            </h4>
            <div className="flex flex-wrap gap-2">
              {sampleTags.map((tag, index) => (
                <Tag
                  key={`${tag.label}-${index}`}
                  dismissible
                  colorVariant={tag.color}
                  onDismiss={() => console.log(`Dismissed: ${tag.label}`)}
                >
                  {tag.label}
                </Tag>
              ))}
            </div>
          </div>

          {/* Both Clickable and Dismissible */}
          <div>
            <h4 className="text-sm font-medium text-stone-600 mb-2">
              Clickable + Dismissible
            </h4>
            <div className="flex flex-wrap gap-2">
              <Tag
                clickable
                dismissible
                colorVariant="primary"
                onClick={() => console.log("Tag clicked")}
                onDismiss={() => console.log("Tag dismissed")}
              >
                Interactive Tag
              </Tag>
            </div>
          </div>
        </div>
      </section>

      {/* Disabled State */}
      <section>
        <h3 className="text-lg font-semibold text-stone-800 mb-4">
          Disabled State
        </h3>
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            <Tag disabled>Disabled</Tag>
            <Tag disabled clickable>
              Disabled Clickable
            </Tag>
            <Tag disabled dismissible>
              Disabled Dismissible
            </Tag>
            <Tag disabled startIcon={<User />}>
              Disabled with Icon
            </Tag>
          </div>
        </div>
      </section>

      {/* Shape Variants */}
      <section>
        <h3 className="text-lg font-semibold text-stone-800 mb-4">
          Shape Variants
        </h3>
        <div className="space-y-3">
          <div>
            <h4 className="text-sm font-medium text-stone-600 mb-2">
              Rounded (default)
            </h4>
            <div className="flex flex-wrap gap-2">
              <Tag colorVariant="primary">Rounded</Tag>
              <Tag colorVariant="secondary">Full Rounded</Tag>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-stone-600 mb-2">Square</h4>
            <div className="flex flex-wrap gap-2">
              <Tag rounded={false} colorVariant="primary">
                Square
              </Tag>
              <Tag rounded={false} colorVariant="secondary">
                Rectangular
              </Tag>
            </div>
          </div>
        </div>
      </section>

      {/* Truncation */}
      <section>
        <h3 className="text-lg font-semibold text-stone-800 mb-4">
          Content Truncation
        </h3>
        <div className="space-y-3">
          <div>
            <h4 className="text-sm font-medium text-stone-600 mb-2">
              With Max Width
            </h4>
            <div className="flex flex-wrap gap-2">
              <Tag maxWidth="100px" colorVariant="primary">
                This is a very long tag that should be truncated
              </Tag>
              <Tag maxWidth="150px" colorVariant="secondary">
                Another long tag with different max width
              </Tag>
            </div>
          </div>
        </div>
      </section>

      {/* Real-world Examples */}
      <section>
        <h3 className="text-lg font-semibold text-stone-800 mb-4">
          Real-world Examples
        </h3>
        <div className="space-y-4">
          {/* Technology Stack */}
          <div>
            <h4 className="text-sm font-medium text-stone-600 mb-2">
              Technology Stack
            </h4>
            <div className="flex flex-wrap gap-2">
              <Tag variant="solid" colorVariant="blue">
                React
              </Tag>
              <Tag variant="solid" colorVariant="indigo">
                TypeScript
              </Tag>
              <Tag variant="solid" colorVariant="green">
                Node.js
              </Tag>
              <Tag variant="solid" colorVariant="purple">
                PostgreSQL
              </Tag>
              <Tag variant="solid" colorVariant="orange">
                Docker
              </Tag>
            </div>
          </div>

          {/* Status Tags */}
          <div>
            <h4 className="text-sm font-medium text-stone-600 mb-2">
              Status Indicators
            </h4>
            <div className="flex flex-wrap gap-2">
              <Tag dot variant="soft" colorVariant="success">
                Active
              </Tag>
              <Tag dot variant="soft" colorVariant="warning">
                Pending
              </Tag>
              <Tag dot variant="soft" colorVariant="danger">
                Error
              </Tag>
              <Tag dot variant="soft" colorVariant="muted">
                Inactive
              </Tag>
            </div>
          </div>

          {/* Filter Tags */}
          <div>
            <h4 className="text-sm font-medium text-stone-600 mb-2">
              Filter Tags (dismissible)
            </h4>
            <div className="flex flex-wrap gap-2">
              <Tag dismissible variant="outline" colorVariant="primary">
                Category: Web
              </Tag>
              <Tag dismissible variant="outline" colorVariant="secondary">
                Price: $0-50
              </Tag>
              <Tag dismissible variant="outline" colorVariant="success">
                Rating: 4+
              </Tag>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
