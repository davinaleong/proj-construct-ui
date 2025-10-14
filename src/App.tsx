import { useState } from "react"
import {
  Moon,
  Sun,
  Palette,
  Search,
  Mail,
  Lock,
  Settings,
  Heart,
  Download,
} from "lucide-react"
import {
  ThemeProvider,
  Paper,
  Typography,
  Icon,
  Container,
} from "./components/core"
import {
  Grid,
  Stack,
  Flex,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar,
  AvatarGroup,
  Badge,
  Divider,
  Section,
  Panel,
} from "./components/layout"
import {
  Button,
  IconButton,
  Input,
  Textarea,
  Checkbox,
} from "./components/forms"
import "./App.css"

function App() {
  return (
    <ThemeProvider defaultTheme={{ mode: "paper" }}>
      <AppContent />
    </ThemeProvider>
  )
}

function AppContent() {
  const [currentTheme, setCurrentTheme] = useState<"light" | "dark" | "paper">(
    "paper"
  )

  return (
    <div className="min-h-screen bg-[#faf9f6] dark:bg-gray-900">
      {/* Header */}
      <Paper
        variant="elevated"
        padding="md"
        className="sticky top-0 z-50 backdrop-blur-md"
      >
        <Container>
          <header className="flex items-center justify-between">
            <div className="w-full">
              <Typography variant="title" className="font-playfair">
                Paper Design System
              </Typography>
              <Typography variant="bodySmall" color="muted" className="mt-1">
                A warm, tactile component library
              </Typography>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setCurrentTheme("light")}
                className={`p-2 rounded-lg transition-colors ${
                  currentTheme === "light"
                    ? "bg-blue-100 text-blue-700"
                    : "hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                <Icon icon={Sun} size="sm" aria-label="Light theme" />
              </button>

              <button
                onClick={() => setCurrentTheme("paper")}
                className={`p-2 rounded-lg transition-colors ${
                  currentTheme === "paper"
                    ? "bg-teal-100 text-teal-700"
                    : "hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                <Icon icon={Palette} size="sm" aria-label="Paper theme" />
              </button>

              <button
                onClick={() => setCurrentTheme("dark")}
                className={`p-2 rounded-lg transition-colors ${
                  currentTheme === "dark"
                    ? "bg-gray-700 text-white"
                    : "hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                <Icon icon={Moon} size="sm" aria-label="Dark theme" />
              </button>
            </div>
          </header>
        </Container>
      </Paper>

      {/* Main Content */}
      <main className="py-12">
        <Container>
          <div className="text-center max-w-4xl mx-auto">
            <Typography variant="h1" className="mb-6">
              Welcome to Paper Design
            </Typography>

            <Typography variant="subtitle" className="mb-8">
              Experience the warmth and elegance of our paper-inspired design
              system. Built with React, TypeScript, and Tailwind CSS.
            </Typography>

            {/* Core Components Demo */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
              <Paper variant="elevated" padding="lg">
                <Typography variant="h4" className="mb-4">
                  ThemeProvider
                </Typography>
                <Typography variant="bodySmall" color="muted">
                  ✅ Context-based theme management with light, dark, and paper
                  modes
                </Typography>
              </Paper>

              <Paper variant="outlined" padding="lg" withTexture>
                <Typography variant="h4" className="mb-4">
                  Paper
                </Typography>
                <Typography variant="bodySmall" color="muted">
                  ✅ Surface component with elevation, texture, and paper
                  aesthetic
                </Typography>
              </Paper>

              <Paper variant="flat" padding="lg" background="accent">
                <Typography variant="h4" className="mb-4" color="paper">
                  Typography
                </Typography>
                <Typography variant="bodySmall" color="paper" intensity="soft">
                  ✅ Complete text hierarchy with three beautiful font families
                </Typography>
              </Paper>

              <Paper variant="elevated" padding="lg">
                <div className="flex items-center gap-3 mb-4">
                  <Icon icon={Palette} size="lg" color="primary" />
                  <Typography variant="h4">Icon</Typography>
                </div>
                <Typography variant="bodySmall" color="muted">
                  ✅ Lucide React integration with consistent sizing and theming
                </Typography>
              </Paper>

              <Paper variant="outlined" padding="lg">
                <Typography variant="h4" className="mb-4">
                  Container
                </Typography>
                <Typography variant="bodySmall" color="muted">
                  ✅ Responsive width management with consistent padding system
                </Typography>
              </Paper>

              <Paper variant="elevated" padding="lg" background="success">
                <Typography variant="h4" className="mb-4" color="paper">
                  Phase 1.1 Complete!
                </Typography>
                <Typography variant="bodySmall" color="paper" intensity="soft">
                  🎉 All core foundation components are ready for use
                </Typography>
              </Paper>
            </div>

            {/* Container-Based Typography Showcase */}
            <div className="mt-16">
              <Typography variant="h2" className="mb-8">
                Container-Based Typography
              </Typography>
              <Typography variant="body" className="mb-8 text-stone-600">
                Typography that scales based on container width rather than
                viewport size. Each container adapts its text size based on its
                own available space, providing perfect scaling for
                component-based layouts.
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
                      This text scales from base size on mobile to lg on larger
                      screens, ensuring optimal readability across all devices.
                      Perfect for lead paragraphs and important content.
                    </Typography>
                  </Paper>

                  <Paper variant="outlined" padding="lg">
                    <Typography variant="body" className="mb-4">
                      Regular Body Text
                    </Typography>
                    <Typography variant="body" color="muted">
                      Standard body text that scales from sm on mobile to lg on
                      desktop. This provides the perfect reading experience for
                      most content and maintains excellent legibility.
                    </Typography>
                  </Paper>

                  <Paper variant="outlined" padding="lg">
                    <Typography variant="bodySmall" className="mb-4">
                      Small Body Text
                    </Typography>
                    <Typography variant="bodySmall" color="muted">
                      Smaller text that scales responsively for captions,
                      metadata, and secondary information. Maintains readability
                      while saving space on smaller screens.
                    </Typography>
                  </Paper>

                  <Paper variant="outlined" padding="lg">
                    <Typography variant="caption" className="mb-4">
                      Caption Text
                    </Typography>
                    <Typography variant="caption" color="muted">
                      The smallest text size for fine print, labels, and
                      annotations. Scales minimally to ensure it remains
                      readable across all device sizes.
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
                    />
                    <Input
                      label="Medium Input"
                      placeholder="Medium size"
                      size="md"
                      helperText="Medium input text"
                    />
                    <Input
                      label="Large Input"
                      placeholder="Large size"
                      size="lg"
                      helperText="Large input text"
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
                  <br />✅ Optimized for readability on mobile, tablet, and
                  desktop
                </Typography>
              </Paper>
            </div>

            {/* Layout Components Showcase */}
            <div className="mt-16">
              <Typography variant="h2" className="mb-8">
                Layout Components
              </Typography>

              {/* Grid Example */}
              <div className="mb-12">
                <Typography variant="h3" className="mb-4">
                  Grid System
                </Typography>
                <Grid columns={3} gap="md" className="mb-4">
                  <Card variant="elevated" padding="md" hoverable>
                    <CardBody>
                      <Typography variant="body">Grid Item 1</Typography>
                    </CardBody>
                  </Card>
                  <Card variant="outlined" padding="md" hoverable>
                    <CardBody>
                      <Typography variant="body">Grid Item 2</Typography>
                    </CardBody>
                  </Card>
                  <Card variant="filled" padding="md" hoverable>
                    <CardBody>
                      <Typography variant="body">Grid Item 3</Typography>
                    </CardBody>
                  </Card>
                </Grid>
              </div>

              {/* Stack Example */}
              <div className="mb-12">
                <Typography variant="h3" className="mb-4">
                  Stack Layout
                </Typography>
                <Stack gap="md">
                  <Card variant="elevated" padding="md">
                    <CardHeader>
                      <Typography variant="h4">Card with Header</Typography>
                    </CardHeader>
                    <CardBody>
                      <Typography variant="body">
                        This card demonstrates the Stack layout with proper
                        spacing.
                      </Typography>
                    </CardBody>
                  </Card>
                  <Card variant="outlined" padding="md">
                    <CardBody>
                      <Typography variant="body">
                        Second card in the stack
                      </Typography>
                    </CardBody>
                  </Card>
                </Stack>
              </div>

              {/* Flex Example */}
              <div className="mb-12">
                <Typography variant="h3" className="mb-4">
                  Flex Layout
                </Typography>
                <Flex
                  justify="between"
                  align="center"
                  gap="md"
                  className="mb-4"
                >
                  <Card variant="elevated" padding="sm">
                    <CardBody>
                      <Typography variant="caption">Start</Typography>
                    </CardBody>
                  </Card>
                  <Card variant="elevated" padding="sm">
                    <CardBody>
                      <Typography variant="caption">Center</Typography>
                    </CardBody>
                  </Card>
                  <Card variant="elevated" padding="sm">
                    <CardBody>
                      <Typography variant="caption">End</Typography>
                    </CardBody>
                  </Card>
                </Flex>
              </div>

              {/* Card Variants */}
              <div className="mb-12">
                <Typography variant="h3" className="mb-4">
                  Card Components
                </Typography>
                <Grid columns={3} gap="md">
                  <Card variant="elevated" padding="md" hoverable>
                    <CardHeader>
                      <Typography variant="h4">Elevated Card</Typography>
                    </CardHeader>
                    <CardBody>
                      <Typography variant="body">
                        A card with subtle shadow and paper texture
                      </Typography>
                    </CardBody>
                    <CardFooter>
                      <Typography variant="caption" color="muted">
                        Footer content
                      </Typography>
                    </CardFooter>
                  </Card>

                  <Card variant="outlined" padding="md" hoverable>
                    <CardHeader>
                      <Typography variant="h4">Outlined Card</Typography>
                    </CardHeader>
                    <CardBody>
                      <Typography variant="body">
                        A card with bold border styling
                      </Typography>
                    </CardBody>
                  </Card>

                  <Card variant="filled" padding="md" hoverable>
                    <CardHeader>
                      <Typography variant="h4">Filled Card</Typography>
                    </CardHeader>
                    <CardBody>
                      <Typography variant="body">
                        A card with filled background and inner shadow
                      </Typography>
                    </CardBody>
                  </Card>
                </Grid>
              </div>
            </div>

            {/* Phase 2.2 UI Primitives Showcase */}
            <div className="mt-16">
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
                <div className="space-y-6">
                  <div>
                    <Typography variant="body" className="mb-3">
                      Simple Horizontal Divider
                    </Typography>
                    <div>
                      <Typography variant="caption">Content above</Typography>
                      <Divider className="my-4" />
                      <Typography variant="caption">Content below</Typography>
                    </div>
                  </div>

                  <div>
                    <Typography variant="body" className="mb-3">
                      Labeled Dividers
                    </Typography>
                    <div className="space-y-4">
                      <Divider label="Section Break" />
                      <Divider label="Or continue with" variant="dashed" />
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
                      This is content within a default section. It has no
                      background but provides semantic structure.
                    </Typography>
                  </Section>

                  <Section
                    title="Elevated Section"
                    description="A section with paper theme styling and elevation"
                    variant="elevated"
                  >
                    <Typography variant="body">
                      This elevated section has the paper theme background and
                      subtle shadow.
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
                    header={
                      <Typography variant="h4">Collapsible Panel</Typography>
                    }
                    collapsible
                    defaultCollapsed={false}
                  >
                    <Typography variant="body">
                      This panel can be collapsed and expanded. Click the header
                      to toggle.
                    </Typography>
                  </Panel>
                </div>
              </div>
            </div>

            {/* Phase 3.1 Form Controls Showcase */}
            <div className="mt-16">
              <Typography variant="h2" className="mb-8">
                Form Controls
              </Typography>

              {/* Button Components */}
              <div className="mb-12">
                <Typography variant="h3" className="mb-4">
                  Buttons
                </Typography>
                <div className="space-y-6">
                  <div>
                    <Typography variant="body" className="mb-3">
                      Button Variants
                    </Typography>
                    <Flex gap="md" wrap="wrap">
                      <Button variant="solid" color="primary">
                        Solid Button
                      </Button>
                      <Button variant="outline" color="primary">
                        Outline Button
                      </Button>
                      <Button variant="ghost" color="primary">
                        Ghost Button
                      </Button>
                      <Button variant="link" color="primary">
                        Link Button
                      </Button>
                    </Flex>
                  </div>

                  <div>
                    <Typography variant="body" className="mb-3">
                      Button Sizes
                    </Typography>
                    <Flex gap="md" align="center" wrap="wrap">
                      <Button size="xs">Extra Small</Button>
                      <Button size="sm">Small</Button>
                      <Button size="md">Medium</Button>
                      <Button size="lg">Large</Button>
                      <Button size="xl">Extra Large</Button>
                    </Flex>
                  </div>

                  <div>
                    <Typography variant="body" className="mb-3">
                      Button States
                    </Typography>
                    <Flex gap="md" wrap="wrap">
                      <Button color="primary">Normal</Button>
                      <Button color="primary" loading>
                        Loading
                      </Button>
                      <Button color="primary" disabled>
                        Disabled
                      </Button>
                      <Button color="primary" icon={Heart} iconPosition="left">
                        With Icon
                      </Button>
                    </Flex>
                  </div>

                  <div>
                    <Typography variant="body" className="mb-3">
                      Icon Buttons
                    </Typography>
                    <Flex gap="md" align="center" wrap="wrap">
                      <IconButton icon={Search} aria-label="Search" size="sm" />
                      <IconButton
                        icon={Settings}
                        aria-label="Settings"
                        size="md"
                      />
                      <IconButton
                        icon={Heart}
                        aria-label="Favorite"
                        size="lg"
                        variant="outline"
                        color="danger"
                      />
                      <IconButton
                        icon={Download}
                        aria-label="Download"
                        variant="ghost"
                      />
                      <IconButton icon={Mail} aria-label="Email" loading />
                    </Flex>
                  </div>
                </div>
              </div>

              {/* Button Min Width and Truncation Showcase */}
              <div className="mb-12">
                <Typography variant="h3" className="mb-4">
                  Button Min Width & Text Truncation
                </Typography>
                <Typography variant="body" className="mb-6 text-stone-600">
                  Control button minimum width and handle long text with
                  truncation for consistent layouts.
                </Typography>

                <div className="space-y-8">
                  {/* Minimum Width Examples */}
                  <div>
                    <Typography variant="h4" className="mb-4">
                      Minimum Width
                    </Typography>
                    <Typography variant="body" className="mb-4 text-stone-600">
                      Ensures buttons maintain consistent width even with short
                      text.
                    </Typography>

                    <div className="space-y-4">
                      <div>
                        <Typography
                          variant="bodySmall"
                          className="mb-2 text-stone-500"
                        >
                          Without minWidth (default)
                        </Typography>
                        <Flex gap="sm" align="center" wrap="wrap">
                          <Button size="sm" variant="solid">
                            Yes
                          </Button>
                          <Button size="sm" variant="solid">
                            No
                          </Button>
                          <Button size="sm" variant="solid">
                            Cancel
                          </Button>
                          <Button size="sm" variant="solid">
                            OK
                          </Button>
                        </Flex>
                      </div>

                      <div>
                        <Typography
                          variant="bodySmall"
                          className="mb-2 text-stone-500"
                        >
                          With minWidth enabled
                        </Typography>
                        <Flex gap="sm" align="center" wrap="wrap">
                          <Button size="sm" variant="solid" minWidth>
                            Yes
                          </Button>
                          <Button size="sm" variant="solid" minWidth>
                            No
                          </Button>
                          <Button size="sm" variant="solid" minWidth>
                            Cancel
                          </Button>
                          <Button size="sm" variant="solid" minWidth>
                            OK
                          </Button>
                        </Flex>
                      </div>
                    </div>
                  </div>

                  {/* Text Truncation Examples */}
                  <div>
                    <Typography variant="h4" className="mb-4">
                      Text Truncation
                    </Typography>
                    <Typography variant="body" className="mb-4 text-stone-600">
                      Handles long text gracefully with ellipsis truncation.
                    </Typography>

                    <div className="space-y-4">
                      <div>
                        <Typography
                          variant="bodySmall"
                          className="mb-2 text-stone-500"
                        >
                          Without truncation (text wraps or overflows)
                        </Typography>
                        <div className="w-64">
                          <Button variant="solid" className="w-full">
                            This is a very long button text that might cause
                            layout issues
                          </Button>
                        </div>
                      </div>

                      <div>
                        <Typography
                          variant="bodySmall"
                          className="mb-2 text-stone-500"
                        >
                          With truncation enabled
                        </Typography>
                        <div className="w-64">
                          <Button variant="solid" truncate className="w-full">
                            This is a very long button text that might cause
                            layout issues
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Combined Examples */}
                  <div>
                    <Typography variant="h4" className="mb-4">
                      Combined: MinWidth + Truncation
                    </Typography>
                    <Typography variant="body" className="mb-4 text-stone-600">
                      Perfect for consistent button layouts with varying text
                      lengths.
                    </Typography>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Typography
                          variant="bodySmall"
                          className="mb-3 text-stone-500"
                        >
                          Action buttons with consistent width
                        </Typography>
                        <div className="space-y-2">
                          <Button
                            variant="outline"
                            minWidth
                            truncate
                            className="w-full"
                          >
                            Save
                          </Button>
                          <Button
                            variant="outline"
                            minWidth
                            truncate
                            className="w-full"
                          >
                            Save and Continue
                          </Button>
                          <Button
                            variant="outline"
                            minWidth
                            truncate
                            className="w-full"
                          >
                            Save as Draft and Send for Review
                          </Button>
                          <Button
                            variant="outline"
                            minWidth
                            truncate
                            className="w-full"
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>

                      <div>
                        <Typography
                          variant="bodySmall"
                          className="mb-3 text-stone-500"
                        >
                          Navigation buttons
                        </Typography>
                        <Flex gap="sm" wrap="wrap">
                          <Button variant="ghost" minWidth truncate>
                            Home
                          </Button>
                          <Button variant="ghost" minWidth truncate>
                            Dashboard
                          </Button>
                          <Button variant="ghost" minWidth truncate>
                            User Profile Settings
                          </Button>
                          <Button variant="ghost" minWidth truncate>
                            Logout
                          </Button>
                        </Flex>
                      </div>
                    </div>
                  </div>

                  {/* Different Sizes */}
                  <div>
                    <Typography variant="h4" className="mb-4">
                      Size Variations
                    </Typography>
                    <div className="space-y-4">
                      {(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
                        <div key={size} className="space-y-2">
                          <Typography
                            variant="bodySmall"
                            className="text-stone-500"
                          >
                            Size: {size}
                          </Typography>
                          <Flex gap="sm" align="center" wrap="wrap">
                            <Button size={size} variant="solid" minWidth>
                              Short
                            </Button>
                            <Button
                              size={size}
                              variant="solid"
                              minWidth
                              truncate
                            >
                              Medium length text
                            </Button>
                            <div className="w-32">
                              <Button
                                size={size}
                                variant="solid"
                                minWidth
                                truncate
                                className="w-full"
                              >
                                Very long button text that demonstrates
                                truncation
                              </Button>
                            </div>
                          </Flex>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <Paper
                  variant="elevated"
                  padding="lg"
                  background="success"
                  className="mt-8"
                >
                  <Typography variant="h4" className="mb-4" color="paper">
                    🎯 Button Enhancements Complete!
                  </Typography>
                  <Typography variant="body" color="paper" intensity="soft">
                    ✅ Minimum width prevents buttons from being too narrow
                    <br />
                    ✅ Text truncation handles long text gracefully
                    <br />
                    ✅ Consistent layouts with varying text lengths
                    <br />✅ Works across all button sizes and variants
                  </Typography>
                </Paper>
              </div>

              {/* Input Components */}
              <div className="mb-12">
                <Typography variant="h3" className="mb-4">
                  Input Fields
                </Typography>
                <div className="space-y-6 max-w-md">
                  <Input
                    label="Basic Input"
                    placeholder="Enter some text..."
                    helperText="This is a basic input field"
                  />

                  <Input
                    label="Email Input"
                    type="email"
                    placeholder="john@example.com"
                    leftIcon={Mail}
                    required
                  />

                  <Input
                    label="Password Input"
                    type="password"
                    placeholder="Enter password"
                    leftIcon={Lock}
                    variant="filled"
                  />

                  <Input
                    label="Search Input"
                    type="search"
                    placeholder="Search..."
                    leftIcon={Search}
                    variant="outlined"
                    size="lg"
                  />

                  <Input
                    label="Error State"
                    placeholder="This field has an error"
                    error
                    errorMessage="This field is required"
                  />

                  <Input
                    label="Disabled Input"
                    placeholder="This input is disabled"
                    disabled
                    defaultValue="Cannot edit this"
                  />

                  <Input
                    label="Readonly Input"
                    placeholder="This input is readonly"
                    readonly
                    defaultValue="Read-only value"
                    helperText="This field is readonly and cannot be edited"
                  />
                </div>
              </div>

              {/* Text Alignment Showcase */}
              <div className="mb-12">
                <Typography variant="h3" className="mb-4">
                  Label & Message Alignment
                </Typography>
                <Typography variant="body" className="mb-6 text-stone-600">
                  Customize the text alignment of input labels and helper
                  messages for different layouts.
                </Typography>

                <div className="space-y-8">
                  {/* Label Alignment Examples */}
                  <div>
                    <Typography variant="h4" className="mb-4">
                      Label Alignment Options
                    </Typography>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <Input
                          label="Left Aligned Label (Default)"
                          placeholder="Standard left alignment"
                          labelAlign="left"
                          helperText="Label aligned to the left"
                        />

                        <Input
                          label="Center Aligned Label"
                          placeholder="Centered label text"
                          labelAlign="center"
                          helperText="Label centered above input"
                        />
                      </div>

                      <div className="space-y-4">
                        <Input
                          label="Right Aligned Label"
                          placeholder="Right-aligned label"
                          labelAlign="right"
                          helperText="Label aligned to the right"
                        />

                        <Input
                          label="Justified Label Text"
                          placeholder="Justified alignment"
                          labelAlign="justify"
                          helperText="Label with justified alignment"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Message Alignment Examples */}
                  <div>
                    <Typography variant="h4" className="mb-4">
                      Message Alignment Options
                    </Typography>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <Input
                          label="Left Message Alignment"
                          placeholder="Default message alignment"
                          messageAlign="left"
                          helperText="Helper text aligned to the left side"
                        />

                        <Input
                          label="Center Message Alignment"
                          placeholder="Centered messages"
                          messageAlign="center"
                          helperText="Helper text centered below input"
                        />
                      </div>

                      <div className="space-y-4">
                        <Input
                          label="Right Message Alignment"
                          placeholder="Right-aligned messages"
                          messageAlign="right"
                          helperText="Helper text aligned to the right side"
                        />

                        <Input
                          label="Error with Right Alignment"
                          placeholder="Error message alignment"
                          messageAlign="right"
                          error
                          errorMessage="Error messages also respect alignment"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Combined Alignment Examples */}
                  <div>
                    <Typography variant="h4" className="mb-4">
                      Combined Label & Message Alignment
                    </Typography>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <Input
                          label="Center Label, Left Message"
                          placeholder="Mixed alignment example"
                          labelAlign="center"
                          messageAlign="left"
                          helperText="Different alignments for label and message"
                        />

                        <Textarea
                          label="Right Label, Center Message"
                          placeholder="Textarea alignment example..."
                          labelAlign="right"
                          messageAlign="center"
                          helperText="Textarea also supports alignment options"
                          rows={3}
                        />
                      </div>

                      <div className="space-y-4">
                        <Input
                          label="Left Label, Right Message"
                          placeholder="Professional form layout"
                          labelAlign="left"
                          messageAlign="right"
                          helperText="Great for professional forms"
                        />

                        <Textarea
                          label="Center Everything"
                          placeholder="Fully centered layout..."
                          labelAlign="center"
                          messageAlign="center"
                          helperText="Perfect for centered form designs"
                          rows={3}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <Paper
                  variant="elevated"
                  padding="lg"
                  background="primary"
                  className="mt-8"
                >
                  <Typography variant="h4" className="mb-4" color="paper">
                    🎯 Text Alignment Complete!
                  </Typography>
                  <Typography variant="body" color="paper" intensity="soft">
                    ✅ Label alignment: left, center, right, justify
                    <br />
                    ✅ Message alignment: left, center, right, justify
                    <br />
                    ✅ Independent control for labels and messages
                    <br />✅ Works with Input and Textarea components
                  </Typography>
                </Paper>
              </div>

              {/* Textarea Components */}
              <div className="mb-12">
                <Typography variant="h3" className="mb-4">
                  Textarea Fields
                </Typography>
                <div className="space-y-6 max-w-md">
                  <Textarea
                    label="Basic Textarea"
                    placeholder="Enter your message..."
                    helperText="Share your thoughts here"
                    rows={3}
                  />

                  <Textarea
                    label="Character Limited"
                    placeholder="Limited to 100 characters..."
                    maxLength={100}
                    showCharCount
                    rows={2}
                    variant="filled"
                  />

                  <Textarea
                    label="Non-resizable"
                    placeholder="This textarea cannot be resized"
                    resize="none"
                    rows={2}
                    variant="outlined"
                  />

                  <Textarea
                    label="Error State"
                    placeholder="This textarea has an error"
                    error
                    errorMessage="Message is too short"
                    rows={2}
                  />
                </div>
              </div>

              {/* Checkbox Showcase - Phase 3.2 */}
              <div className="mb-12">
                <Typography variant="h3" className="mb-4">
                  Checkbox Selection
                </Typography>
                <Typography variant="body" className="mb-6 text-stone-600">
                  Checkbox controls for single or multiple selections with
                  indeterminate state support.
                </Typography>

                <div className="space-y-8">
                  {/* Basic Checkboxes */}
                  <div>
                    <Typography variant="h4" className="mb-4">
                      Basic Checkboxes
                    </Typography>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Checkbox defaultChecked>
                          I agree to the terms and conditions
                        </Checkbox>
                        <Checkbox>Subscribe to newsletter</Checkbox>
                        <Checkbox disabled>
                          This option is currently unavailable
                        </Checkbox>
                        <Checkbox defaultChecked disabled>
                          Pre-selected and disabled
                        </Checkbox>
                      </div>
                    </div>
                  </div>

                  {/* Sizes */}
                  <div>
                    <Typography variant="h4" className="mb-4">
                      Sizes
                    </Typography>
                    <div className="space-y-3">
                      <Checkbox size="sm" defaultChecked>
                        Small checkbox
                      </Checkbox>
                      <Checkbox size="md" defaultChecked>
                        Medium checkbox (default)
                      </Checkbox>
                      <Checkbox size="lg" defaultChecked>
                        Large checkbox
                      </Checkbox>
                    </div>
                  </div>

                  {/* States */}
                  <div>
                    <Typography variant="h4" className="mb-4">
                      States
                    </Typography>
                    <div className="space-y-3">
                      <Checkbox>Unchecked</Checkbox>
                      <Checkbox defaultChecked>Checked</Checkbox>
                      <Checkbox indeterminate>
                        Indeterminate (partial selection)
                      </Checkbox>
                      <Checkbox
                        error
                        errorMessage="Please accept the terms to continue"
                      >
                        Required field with error
                      </Checkbox>
                    </div>
                  </div>

                  {/* Form Examples */}
                  <div>
                    <Typography variant="h4" className="mb-4">
                      Form Examples
                    </Typography>
                    <div className="space-y-4">
                      <div>
                        <Typography
                          variant="bodySmall"
                          className="mb-3 text-stone-600"
                        >
                          User Preferences
                        </Typography>
                        <div className="space-y-2">
                          <Checkbox defaultChecked>
                            Email notifications
                          </Checkbox>
                          <Checkbox>Push notifications</Checkbox>
                          <Checkbox defaultChecked>Marketing updates</Checkbox>
                        </div>
                      </div>

                      <div>
                        <Typography
                          variant="bodySmall"
                          className="mb-3 text-stone-600"
                        >
                          Required Agreement
                        </Typography>
                        <Checkbox
                          required
                          helperText="You must agree to continue"
                        >
                          I have read and agree to the Privacy Policy
                        </Checkbox>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <footer className="mt-12">
              <Typography variant="body" color="muted" className="mb-4">
                Phase 2.1 Layout Components: ✅ Complete
              </Typography>
              <Typography variant="body" color="muted" className="mb-4">
                Phase 2.2 UI Primitives: ✅ Complete
              </Typography>
              <Typography variant="body" color="muted" className="mb-4">
                Phase 3.1 Form Controls: ✅ Complete
              </Typography>
              <Typography variant="body" color="muted" className="mb-4">
                Phase 3.2 Selection Controls: 🔄 In Progress (Checkbox ✅)
              </Typography>
              <Typography variant="body" color="muted" className="mb-4">
                Next up: Select, Radio, Switch, Slider components
              </Typography>

              <Typography variant="caption" color="muted">
                Built with ❤️ using the Paper Design System
              </Typography>
            </footer>
          </div>
        </Container>
      </main>
    </div>
  )
}

export default App
