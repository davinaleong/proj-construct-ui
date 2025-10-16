import { Typography } from "../components/core"
import {
  Flex,
  Stack,
  Avatar,
  AvatarGroup,
  Badge,
  Divider,
  Section,
  Panel,
} from "../components/layout"

export function UIPrimitivesShowcase() {
  return (
    <div className="mt-16" id="ui-primitives">
      <Typography variant="h2" className="mb-8">
        UI Primitives
      </Typography>

      {/* Avatar Components */}
      <div className="mb-12">
        <Typography variant="h3" className="mb-4">
          Avatar & Avatar Group
        </Typography>
        <div className="space-y-6">
          <div>
            <Typography variant="body" className="mb-3">
              Individual Avatars
            </Typography>
            <Flex gap="md" align="center">
              <Avatar
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
                alt="John Doe"
                size="sm"
              />
              <Avatar fallback="AB" size="md" />
              <Avatar fallback="CD" size="lg" variant="rounded" />
              <Avatar fallback="EF" size="xl" variant="square" />
            </Flex>
          </div>

          <div>
            <Typography variant="body" className="mb-3">
              Avatar Groups
            </Typography>
            <Stack gap="md">
              <AvatarGroup max={3} size="md">
                <Avatar src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" />
                <Avatar fallback="AB" />
                <Avatar fallback="CD" />
                <Avatar fallback="EF" />
                <Avatar fallback="GH" />
              </AvatarGroup>

              <AvatarGroup max={5} size="sm">
                <Avatar fallback="A" />
                <Avatar fallback="B" />
                <Avatar fallback="C" />
                <Avatar fallback="D" />
                <Avatar fallback="E" />
                <Avatar fallback="F" />
                <Avatar fallback="G" />
              </AvatarGroup>
            </Stack>
          </div>
        </div>
      </div>

      {/* Badge Components */}
      <div className="mb-12">
        <Typography variant="h3" className="mb-4">
          Badges
        </Typography>
        <div className="space-y-4">
          <div>
            <Typography variant="body" className="mb-3">
              Color Variants
            </Typography>
            <Flex gap="sm" wrap="wrap">
              <Badge color="primary">Primary</Badge>
              <Badge color="secondary">Secondary</Badge>
              <Badge color="success">Success</Badge>
              <Badge color="warning">Warning</Badge>
              <Badge color="danger">Danger</Badge>
              <Badge color="info">Info</Badge>
            </Flex>
          </div>

          <div>
            <Typography variant="body" className="mb-3">
              Style Variants
            </Typography>
            <Flex gap="sm" wrap="wrap">
              <Badge variant="solid" color="primary">
                Solid
              </Badge>
              <Badge variant="soft" color="primary">
                Soft
              </Badge>
              <Badge variant="outline" color="primary">
                Outline
              </Badge>
              <Badge variant="ghost" color="primary">
                Ghost
              </Badge>
            </Flex>
          </div>

          <div>
            <Typography variant="body" className="mb-3">
              Sizes
            </Typography>
            <Flex gap="sm" align="center">
              <Badge size="xs">Extra Small</Badge>
              <Badge size="sm">Small</Badge>
              <Badge size="md">Medium</Badge>
              <Badge size="lg">Large</Badge>
            </Flex>
          </div>
        </div>
      </div>

      {/* Divider Components */}
      <div className="mb-12">
        <Typography variant="h3" className="mb-4">
          Dividers
        </Typography>
        <div className="space-y-8">
          {/* Basic Dividers */}
          <div>
            <Typography variant="body" className="mb-3">
              Basic Horizontal Dividers
            </Typography>
            <div className="space-y-4">
              <div>
                <Typography variant="caption" className="text-stone-600">
                  Small (default)
                </Typography>
                <Divider />
              </div>
              <div>
                <Typography variant="caption" className="text-stone-600">
                  Medium
                </Typography>
                <Divider size="md" />
              </div>
              <div>
                <Typography variant="caption" className="text-stone-600">
                  Large
                </Typography>
                <Divider size="lg" />
              </div>
            </div>
          </div>

          {/* Variant Styles */}
          <div>
            <Typography variant="body" className="mb-3">
              Variant Styles
            </Typography>
            <div className="space-y-4">
              <div>
                <Typography variant="caption" className="text-stone-600">
                  Solid (default)
                </Typography>
                <Divider variant="solid" />
              </div>
              <div>
                <Typography variant="caption" className="text-stone-600">
                  Dashed
                </Typography>
                <Divider variant="dashed" />
              </div>
              <div>
                <Typography variant="caption" className="text-stone-600">
                  Dotted
                </Typography>
                <Divider variant="dotted" />
              </div>
              <div>
                <Typography variant="caption" className="text-stone-600">
                  Gradient
                </Typography>
                <Divider variant="gradient" />
              </div>
              <div>
                <Typography variant="caption" className="text-stone-600">
                  Fade
                </Typography>
                <Divider variant="fade" />
              </div>
            </div>
          </div>

          {/* Colors */}
          <div>
            <Typography variant="body" className="mb-3">
              Color Options
            </Typography>
            <div className="space-y-4">
              <div>
                <Typography variant="caption" className="text-stone-600">
                  Default
                </Typography>
                <Divider color="default" />
              </div>
              <div>
                <Typography variant="caption" className="text-stone-600">
                  Primary
                </Typography>
                <Divider color="primary" />
              </div>
              <div>
                <Typography variant="caption" className="text-stone-600">
                  Secondary
                </Typography>
                <Divider color="secondary" />
              </div>
              <div>
                <Typography variant="caption" className="text-stone-600">
                  Muted
                </Typography>
                <Divider color="muted" />
              </div>
              <div>
                <Typography variant="caption" className="text-stone-600">
                  Accent
                </Typography>
                <Divider color="accent" />
              </div>
            </div>
          </div>

          {/* Labeled Dividers */}
          <div>
            <Typography variant="body" className="mb-3">
              Labeled Dividers
            </Typography>
            <div className="space-y-4">
              <Divider label="Section Break" />
              <Divider
                label="Or continue with"
                variant="dashed"
                color="muted"
              />
              <Divider label="Important Notice" color="primary" size="md" />
              <Divider label="Settings" variant="dotted" color="secondary" />
            </div>
          </div>

          {/* Dividers with Icons */}
          <div>
            <Typography variant="body" className="mb-3">
              Dividers with Icons
            </Typography>
            <div className="space-y-4">
              <Divider icon="⚙️" label="Settings" />
              <Divider icon="📧" label="Contact Information" color="primary" />
              <Divider
                icon="🔒"
                label="Security Settings"
                variant="dashed"
                color="secondary"
              />
              <Divider icon="✨" />
            </div>
          </div>

          {/* Spacing Options */}
          <div>
            <Typography variant="body" className="mb-3">
              Spacing Options
            </Typography>
            <div className="bg-stone-50 p-4 rounded-lg">
              <Typography variant="caption" className="text-stone-600">
                No spacing
              </Typography>
              <Divider spacing="none" />
              <Typography variant="caption" className="text-stone-600">
                Small spacing
              </Typography>
              <Divider spacing="sm" />
              <Typography variant="caption" className="text-stone-600">
                Medium spacing (default)
              </Typography>
              <Divider spacing="md" />
              <Typography variant="caption" className="text-stone-600">
                Large spacing
              </Typography>
              <Divider spacing="lg" />
              <Typography variant="caption" className="text-stone-600">
                Extra large spacing
              </Typography>
              <Divider spacing="xl" />
              <Typography variant="caption" className="text-stone-600">
                Done
              </Typography>
            </div>
          </div>

          {/* Vertical Dividers */}
          <div>
            <Typography variant="body" className="mb-3">
              Vertical Dividers
            </Typography>
            <div className="space-y-4">
              {/* Basic vertical dividers */}
              <div className="flex items-stretch h-20 bg-stone-50 p-4 rounded-lg">
                <div className="flex-1 flex items-center justify-center">
                  <Typography variant="caption">Left content</Typography>
                </div>
                <Divider orientation="vertical" size="sm" />
                <div className="flex-1 flex items-center justify-center">
                  <Typography variant="caption">Middle content</Typography>
                </div>
                <Divider orientation="vertical" size="md" color="primary" />
                <div className="flex-1 flex items-center justify-center">
                  <Typography variant="caption">Right content</Typography>
                </div>
              </div>

              {/* Vertical dividers with labels */}
              <div className="flex items-stretch h-32 bg-stone-50 p-4 rounded-lg">
                <div className="flex-1 flex items-center justify-center">
                  <Typography variant="caption">Section A</Typography>
                </div>
                <Divider orientation="vertical" label="More" size="md" />
                <div className="flex-1 flex items-center justify-center">
                  <Typography variant="caption">Section B</Typography>
                </div>
                <Divider orientation="vertical" icon="⚙️" color="secondary" />
                <div className="flex-1 flex items-center justify-center">
                  <Typography variant="caption">Settings</Typography>
                </div>
              </div>
            </div>
          </div>

          {/* Complex Examples */}
          <div>
            <Typography variant="body" className="mb-3">
              Complex Examples
            </Typography>
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg border border-stone-200">
                <Typography variant="h5" className="mb-2">
                  User Profile
                </Typography>
                <Typography
                  variant="caption"
                  className="text-stone-600 mb-4 block"
                >
                  Personal information and settings
                </Typography>

                <Divider
                  icon="👤"
                  label="Basic Information"
                  color="primary"
                  spacing="lg"
                />
                <Typography variant="body" className="mb-4">
                  Name, email, and contact details would go here.
                </Typography>

                <Divider
                  icon="🔒"
                  label="Privacy & Security"
                  color="secondary"
                  spacing="lg"
                />
                <Typography variant="body" className="mb-4">
                  Password, two-factor authentication, and privacy settings.
                </Typography>

                <Divider variant="gradient" spacing="lg" />
                <Typography variant="caption" className="text-stone-500">
                  Advanced settings available in the full version.
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section & Panel Components */}
      <div className="mb-12">
        <Typography variant="h3" className="mb-4">
          Sections & Panels
        </Typography>
        <div className="space-y-6">
          <Section
            title="Default Section"
            description="A section with transparent background for organizing content"
          >
            <Typography variant="body">
              This is content within a default section. It has no background but
              provides semantic structure.
            </Typography>
          </Section>

          <Section
            title="Elevated Section"
            description="A section with paper theme styling and elevation"
            variant="elevated"
          >
            <Typography variant="body">
              This elevated section has the paper theme background and subtle
              shadow.
            </Typography>
          </Section>

          <Panel
            header={<Typography variant="h4">Simple Panel</Typography>}
            footer={
              <Typography variant="caption" color="muted">
                Panel footer
              </Typography>
            }
          >
            <Typography variant="body">
              This is a panel with header and footer sections.
            </Typography>
          </Panel>

          <Panel
            header={<Typography variant="h4">Collapsible Panel</Typography>}
            collapsible
            defaultCollapsed={false}
          >
            <Typography variant="body">
              This panel can be collapsed and expanded. Click the header to
              toggle.
            </Typography>
          </Panel>
        </div>
      </div>
    </div>
  )
}
