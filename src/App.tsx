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
  Brand,
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
  Radio,
  RadioGroup,
  Select,
  Switch,
  Slider,
  FileUpload,
} from "./components/forms"
import { FloatingNavbar } from "./components/navigation"
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

  const navItems = [
    { id: "overview", label: "Overview", href: "#overview" },
    { id: "typography", label: "Typography", href: "#typography" },
    { id: "layout", label: "Layout", href: "#layout" },
    { id: "ui-primitives", label: "UI Primitives", href: "#ui-primitives" },
    { id: "form-controls", label: "Form Controls", href: "#form-controls" },
    { id: "navigation", label: "Navigation", href: "#navigation" },
  ]

  return (
    <div className="min-h-screen bg-[#faf9f6] dark:bg-gray-900">
      {/* Floating Navbar */}
      <FloatingNavbar items={navItems} position="top-right" offset={120} />
      {/* Header */}
      <Paper
        variant="elevated"
        padding="md"
        className="sticky top-0 z-50 backdrop-blur-md"
      >
        <Container maxWidth="xl">
          <header className="flex items-center justify-between">
            <div className="flex-1">
              <Brand />
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
        <Container maxWidth="xl">
          <div className="text-center max-w-4xl mx-auto" id="overview">
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
            <div className="mt-16" id="typography">
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
            <div className="mt-16" id="layout">
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
            <div className="mt-16" id="form-controls">
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

                  {/* Text Alignment */}
                  <div>
                    <Typography variant="h4" className="mb-4">
                      Text Alignment
                    </Typography>
                    <div className="space-y-4">
                      <div>
                        <Typography
                          variant="bodySmall"
                          className="mb-3 text-stone-600"
                        >
                          Label Alignment Options
                        </Typography>
                        <div className="space-y-3">
                          <Checkbox
                            labelAlign="left"
                            helperText="Left aligned label and helper text"
                          >
                            Left aligned label (default)
                          </Checkbox>
                          <Checkbox
                            labelAlign="center"
                            helperAlign="center"
                            helperText="Center aligned label and helper text"
                          >
                            Center aligned label
                          </Checkbox>
                          <Checkbox
                            labelAlign="right"
                            helperAlign="right"
                            helperText="Right aligned label and helper text"
                          >
                            Right aligned label
                          </Checkbox>
                        </div>
                      </div>

                      <div>
                        <Typography
                          variant="bodySmall"
                          className="mb-3 text-stone-600"
                        >
                          Mixed Alignment (Label vs Helper)
                        </Typography>
                        <div className="space-y-3">
                          <Checkbox
                            labelAlign="left"
                            helperAlign="center"
                            helperText="Left label, center helper text"
                          >
                            Left aligned label
                          </Checkbox>
                          <Checkbox
                            labelAlign="center"
                            helperAlign="right"
                            helperText="Center label, right helper text"
                          >
                            Center aligned label
                          </Checkbox>
                          <Checkbox
                            labelAlign="right"
                            helperAlign="left"
                            errorMessage="Right label, left error message"
                            error
                          >
                            Right aligned label with error
                          </Checkbox>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Radio Showcase - Phase 3.2 */}
              <div className="mb-12">
                <Typography variant="h3" className="mb-4">
                  Radio Selection
                </Typography>
                <Typography variant="body" className="mb-6 text-stone-600">
                  Radio buttons for single selection from a group of options
                  with support for form validation and accessibility.
                </Typography>

                <div className="space-y-8">
                  {/* Basic Radios */}
                  <div>
                    <Typography variant="h4" className="mb-4">
                      Individual Radio Buttons
                    </Typography>
                    <div className="space-y-3">
                      <Radio name="basic-demo" value="option1" defaultChecked>
                        First option (pre-selected)
                      </Radio>
                      <Radio name="basic-demo" value="option2">
                        Second option
                      </Radio>
                      <Radio name="basic-demo" value="option3">
                        Third option
                      </Radio>
                      <Radio name="basic-demo" value="option4" disabled>
                        Disabled option
                      </Radio>
                    </div>
                  </div>

                  {/* Radio Sizes */}
                  <div>
                    <Typography variant="h4" className="mb-4">
                      Radio Sizes
                    </Typography>
                    <div className="space-y-3">
                      <Radio
                        name="size-demo-sm"
                        value="small"
                        size="sm"
                        defaultChecked
                      >
                        Small radio button
                      </Radio>
                      <Radio
                        name="size-demo-md"
                        value="medium"
                        size="md"
                        defaultChecked
                      >
                        Medium radio button (default)
                      </Radio>
                      <Radio
                        name="size-demo-lg"
                        value="large"
                        size="lg"
                        defaultChecked
                      >
                        Large radio button
                      </Radio>
                    </div>
                  </div>

                  {/* Radio Groups */}
                  <div>
                    <Typography variant="h4" className="mb-4">
                      Radio Groups
                    </Typography>
                    <div className="space-y-6">
                      <RadioGroup
                        name="subscription-plan"
                        label="Choose your subscription plan"
                        defaultValue="pro"
                        options={[
                          {
                            value: "basic",
                            label: "Basic Plan",
                            helperText: "For individual use - $9/month",
                          },
                          {
                            value: "pro",
                            label: "Pro Plan",
                            helperText: "For small teams - $29/month",
                          },
                          {
                            value: "enterprise",
                            label: "Enterprise Plan",
                            helperText: "For large organizations - $99/month",
                          },
                        ]}
                        helperText="Select the plan that best fits your needs"
                      />

                      <RadioGroup
                        name="notification-frequency"
                        label="Email notification frequency"
                        defaultValue="weekly"
                        options={[
                          { value: "daily", label: "Daily" },
                          { value: "weekly", label: "Weekly" },
                          { value: "monthly", label: "Monthly" },
                          { value: "never", label: "Never" },
                        ]}
                        size="sm"
                        orientation="horizontal"
                      />

                      <RadioGroup
                        name="payment-method"
                        label="Payment method"
                        required
                        options={[
                          { value: "credit-card", label: "Credit Card" },
                          { value: "paypal", label: "PayPal" },
                          {
                            value: "bank-transfer",
                            label: "Bank Transfer",
                            disabled: true,
                          },
                        ]}
                        helperText="Choose your preferred payment method"
                      />

                      <RadioGroup
                        name="error-demo"
                        label="Required selection"
                        error
                        errorMessage="Please select an option to continue"
                        options={[
                          { value: "yes", label: "Yes, I agree" },
                          { value: "no", label: "No, I decline" },
                        ]}
                      />
                    </div>
                  </div>

                  {/* Form Examples */}
                  <div>
                    <Typography variant="h4" className="mb-4">
                      Form Integration Examples
                    </Typography>
                    <div className="space-y-6 max-w-lg">
                      <div>
                        <Typography
                          variant="bodySmall"
                          className="mb-3 text-stone-600"
                        >
                          User Profile Settings
                        </Typography>
                        <RadioGroup
                          name="profile-visibility"
                          label="Profile visibility"
                          defaultValue="friends"
                          options={[
                            {
                              value: "public",
                              label: "Public",
                              helperText: "Anyone can see your profile",
                            },
                            {
                              value: "friends",
                              label: "Friends only",
                              helperText:
                                "Only your friends can see your profile",
                            },
                            {
                              value: "private",
                              label: "Private",
                              helperText: "Only you can see your profile",
                            },
                          ]}
                        />
                      </div>

                      <div>
                        <Typography
                          variant="bodySmall"
                          className="mb-3 text-stone-600"
                        >
                          Delivery Options
                        </Typography>
                        <RadioGroup
                          name="delivery-speed"
                          label="Delivery speed"
                          defaultValue="standard"
                          options={[
                            {
                              value: "express",
                              label: "Express Delivery",
                              helperText: "1-2 business days - $15.99",
                            },
                            {
                              value: "standard",
                              label: "Standard Delivery",
                              helperText: "3-5 business days - $5.99",
                            },
                            {
                              value: "economy",
                              label: "Economy Delivery",
                              helperText: "7-10 business days - Free",
                            },
                          ]}
                          orientation="horizontal"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Radio Text Alignment */}
                  <div>
                    <Typography variant="h4" className="mb-4">
                      Text Alignment
                    </Typography>
                    <div className="space-y-6">
                      <div>
                        <Typography
                          variant="bodySmall"
                          className="mb-3 text-stone-600"
                        >
                          Individual Radio Alignment
                        </Typography>
                        <div className="space-y-3">
                          <Radio
                            name="radio-align-demo"
                            value="left"
                            labelAlign="left"
                            helperText="Left aligned label and helper text"
                          >
                            Left aligned label (default)
                          </Radio>
                          <Radio
                            name="radio-align-demo"
                            value="center"
                            labelAlign="center"
                            helperAlign="center"
                            helperText="Center aligned label and helper text"
                          >
                            Center aligned label
                          </Radio>
                          <Radio
                            name="radio-align-demo"
                            value="right"
                            labelAlign="right"
                            helperAlign="right"
                            helperText="Right aligned label and helper text"
                          >
                            Right aligned label
                          </Radio>
                        </div>
                      </div>

                      <div>
                        <Typography
                          variant="bodySmall"
                          className="mb-3 text-stone-600"
                        >
                          RadioGroup with Alignment
                        </Typography>
                        <RadioGroup
                          name="group-align-demo"
                          label="Text Alignment Options"
                          labelAlign="center"
                          helperAlign="right"
                          helperText="Group helper text aligned right"
                          defaultValue="center"
                          options={[
                            {
                              value: "left",
                              label: "Left aligned content",
                              helperText: "This helper text is right-aligned",
                            },
                            {
                              value: "center",
                              label: "Center aligned content",
                              helperText: "This helper text is right-aligned",
                            },
                            {
                              value: "right",
                              label: "Right aligned content",
                              helperText: "This helper text is right-aligned",
                            },
                          ]}
                        />
                      </div>

                      <div>
                        <Typography
                          variant="bodySmall"
                          className="mb-3 text-stone-600"
                        >
                          Mixed Alignment Example
                        </Typography>
                        <RadioGroup
                          name="mixed-align-demo"
                          label="Mixed Alignment Demo"
                          labelAlign="right"
                          helperAlign="left"
                          errorMessage="Left-aligned error message with right-aligned labels"
                          error
                          options={[
                            {
                              value: "option1",
                              label: "Right-aligned label",
                              helperText: "Left-aligned helper",
                            },
                            {
                              value: "option2",
                              label: "Another right-aligned label",
                              helperText: "Another left-aligned helper",
                            },
                          ]}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Select Showcase - Phase 3.2 */}
              <div className="mb-12">
                <Typography variant="h3" className="mb-4">
                  Select Dropdown
                </Typography>
                <Typography variant="body" className="mb-6 text-stone-600">
                  Dropdown selection controls with single and multiple selection
                  support, search functionality, and custom rendering.
                </Typography>

                <div className="space-y-8">
                  {/* Basic Select */}
                  <div>
                    <Typography variant="h4" className="mb-4">
                      Basic Select
                    </Typography>
                    <div className="space-y-4 max-w-md">
                      <Select
                        label="Country"
                        placeholder="Choose your country"
                        options={[
                          { value: "us", label: "United States" },
                          { value: "ca", label: "Canada" },
                          { value: "uk", label: "United Kingdom" },
                          { value: "de", label: "Germany" },
                          { value: "fr", label: "France" },
                        ]}
                        helperText="Select your country of residence"
                      />

                      <Select
                        label="Priority Level"
                        defaultValue="medium"
                        options={[
                          { value: "low", label: "Low Priority" },
                          { value: "medium", label: "Medium Priority" },
                          { value: "high", label: "High Priority" },
                          { value: "urgent", label: "Urgent" },
                        ]}
                        variant="filled"
                      />

                      <Select
                        label="Status"
                        options={[
                          { value: "draft", label: "Draft" },
                          { value: "review", label: "In Review" },
                          { value: "approved", label: "Approved" },
                          { value: "published", label: "Published" },
                        ]}
                        variant="outlined"
                        disabled
                      />
                    </div>
                  </div>

                  {/* Sizes */}
                  <div>
                    <Typography variant="h4" className="mb-4">
                      Sizes
                    </Typography>
                    <div className="space-y-4 max-w-md">
                      <Select
                        size="sm"
                        placeholder="Small select"
                        options={[
                          { value: "1", label: "Option 1" },
                          { value: "2", label: "Option 2" },
                        ]}
                      />
                      <Select
                        size="md"
                        placeholder="Medium select (default)"
                        options={[
                          { value: "1", label: "Option 1" },
                          { value: "2", label: "Option 2" },
                        ]}
                      />
                      <Select
                        size="lg"
                        placeholder="Large select"
                        options={[
                          { value: "1", label: "Option 1" },
                          { value: "2", label: "Option 2" },
                        ]}
                      />
                    </div>
                  </div>

                  {/* Multiple Selection */}
                  <div>
                    <Typography variant="h4" className="mb-4">
                      Multiple Selection
                    </Typography>
                    <div className="space-y-4 max-w-md">
                      <Select
                        label="Skills"
                        placeholder="Select your skills"
                        multiple
                        options={[
                          { value: "js", label: "JavaScript" },
                          { value: "ts", label: "TypeScript" },
                          { value: "react", label: "React" },
                          { value: "vue", label: "Vue.js" },
                          { value: "angular", label: "Angular" },
                          { value: "node", label: "Node.js" },
                          { value: "python", label: "Python" },
                        ]}
                        helperText="You can select multiple skills"
                      />
                    </div>
                  </div>

                  {/* Searchable Select */}
                  <div>
                    <Typography variant="h4" className="mb-4">
                      Searchable Select
                    </Typography>
                    <div className="space-y-4 max-w-md">
                      <Select
                        label="City"
                        placeholder="Search for a city"
                        searchable
                        options={[
                          { value: "nyc", label: "New York City" },
                          { value: "la", label: "Los Angeles" },
                          { value: "chicago", label: "Chicago" },
                          { value: "houston", label: "Houston" },
                          { value: "phoenix", label: "Phoenix" },
                          { value: "philadelphia", label: "Philadelphia" },
                          { value: "san-antonio", label: "San Antonio" },
                          { value: "san-diego", label: "San Diego" },
                          { value: "dallas", label: "Dallas" },
                          { value: "san-jose", label: "San Jose" },
                        ]}
                        helperText="Type to search for cities"
                      />
                    </div>
                  </div>

                  {/* Error State */}
                  <div>
                    <Typography variant="h4" className="mb-4">
                      Error State
                    </Typography>
                    <div className="space-y-4 max-w-md">
                      <Select
                        label="Required Field"
                        placeholder="Please select an option"
                        options={[
                          { value: "1", label: "Option 1" },
                          { value: "2", label: "Option 2" },
                        ]}
                        required
                        error
                        errorMessage="This field is required"
                      />
                    </div>
                  </div>

                  {/* Custom Options */}
                  <div>
                    <Typography variant="h4" className="mb-4">
                      With Disabled Options
                    </Typography>
                    <div className="space-y-4 max-w-md">
                      <Select
                        label="Plan Selection"
                        placeholder="Choose your plan"
                        options={[
                          { value: "free", label: "Free Plan" },
                          { value: "basic", label: "Basic Plan - $9/month" },
                          {
                            value: "pro",
                            label: "Pro Plan - $29/month",
                            disabled: true,
                          },
                          {
                            value: "enterprise",
                            label: "Enterprise Plan - Contact us",
                            disabled: true,
                          },
                        ]}
                        helperText="Some plans may not be available"
                      />
                    </div>
                  </div>

                  {/* Optgroups */}
                  <div>
                    <Typography variant="h4" className="mb-4">
                      Option Groups
                    </Typography>
                    <div className="space-y-4 max-w-md">
                      <Select
                        label="Technology Stack"
                        placeholder="Choose technologies"
                        multiple
                        searchable
                        options={[
                          {
                            label: "Frontend",
                            options: [
                              { value: "react", label: "React" },
                              { value: "vue", label: "Vue.js" },
                              { value: "angular", label: "Angular" },
                              { value: "svelte", label: "Svelte" },
                            ],
                          },
                          {
                            label: "Backend",
                            options: [
                              { value: "node", label: "Node.js" },
                              { value: "python", label: "Python" },
                              { value: "java", label: "Java" },
                              { value: "go", label: "Go" },
                            ],
                          },
                          {
                            label: "Database",
                            options: [
                              { value: "postgresql", label: "PostgreSQL" },
                              { value: "mysql", label: "MySQL" },
                              { value: "mongodb", label: "MongoDB" },
                              { value: "redis", label: "Redis" },
                            ],
                          },
                          {
                            label: "Cloud Services",
                            disabled: true,
                            options: [
                              { value: "aws", label: "AWS" },
                              { value: "azure", label: "Azure" },
                              { value: "gcp", label: "Google Cloud" },
                            ],
                          },
                        ]}
                        helperText="Select from organized technology categories"
                      />

                      <Select
                        label="Country & Region"
                        placeholder="Select location"
                        options={[
                          {
                            label: "North America",
                            options: [
                              { value: "us", label: "United States" },
                              { value: "ca", label: "Canada" },
                              { value: "mx", label: "Mexico" },
                            ],
                          },
                          {
                            label: "Europe",
                            options: [
                              { value: "uk", label: "United Kingdom" },
                              { value: "de", label: "Germany" },
                              { value: "fr", label: "France" },
                              { value: "es", label: "Spain" },
                              { value: "it", label: "Italy" },
                            ],
                          },
                          {
                            label: "Asia Pacific",
                            options: [
                              { value: "jp", label: "Japan" },
                              { value: "kr", label: "South Korea" },
                              { value: "au", label: "Australia" },
                              { value: "sg", label: "Singapore" },
                            ],
                          },
                        ]}
                        variant="filled"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Switch Showcase - Phase 3.2 */}
              <div className="mb-12">
                <Typography variant="h3" className="mb-4">
                  Switch Toggle
                </Typography>
                <Typography variant="body" className="mb-6 text-stone-600">
                  Toggle switches for on/off states with smooth animations,
                  different sizes, and alignment options.
                </Typography>

                <div className="space-y-8">
                  {/* Basic Switches */}
                  <div>
                    <Typography variant="h4" className="mb-4">
                      Basic Switches
                    </Typography>
                    <div className="space-y-4 max-w-md">
                      <Switch defaultChecked>Enable notifications</Switch>
                      <Switch>Dark mode</Switch>
                      <Switch disabled>Disabled option</Switch>
                      <Switch defaultChecked disabled>
                        Pre-enabled disabled
                      </Switch>
                    </div>
                  </div>

                  {/* Sizes */}
                  <div>
                    <Typography variant="h4" className="mb-4">
                      Sizes
                    </Typography>
                    <div className="space-y-4 max-w-md">
                      <Switch size="sm" defaultChecked>
                        Small switch
                      </Switch>
                      <Switch size="md" defaultChecked>
                        Medium switch (default)
                      </Switch>
                      <Switch size="lg" defaultChecked>
                        Large switch
                      </Switch>
                    </div>
                  </div>

                  {/* Switch States */}
                  <div>
                    <Typography variant="h4" className="mb-4">
                      States & Helper Text
                    </Typography>
                    <div className="space-y-4 max-w-md">
                      <Switch
                        helperText="Receive email notifications for important updates"
                        defaultChecked
                      >
                        Email notifications
                      </Switch>
                      <Switch
                        required
                        helperText="Required for account security"
                      >
                        Two-factor authentication
                      </Switch>
                      <Switch
                        error
                        errorMessage="This setting conflicts with your privacy preferences"
                      >
                        Data sharing
                      </Switch>
                    </div>
                  </div>

                  {/* Text Alignment */}
                  <div>
                    <Typography variant="h4" className="mb-4">
                      Text Alignment
                    </Typography>
                    <div className="space-y-6">
                      <div className="space-y-4 max-w-md">
                        <Typography variant="body" className="font-medium">
                          Label Alignment
                        </Typography>
                        <Switch labelAlign="left" defaultChecked>
                          Left aligned label
                        </Switch>
                        <Switch labelAlign="center" defaultChecked>
                          Center aligned label
                        </Switch>
                        <Switch labelAlign="right" defaultChecked>
                          Right aligned label
                        </Switch>
                      </div>

                      <div className="space-y-4 max-w-md">
                        <Typography variant="body" className="font-medium">
                          Helper Text Alignment
                        </Typography>
                        <Switch
                          helperAlign="left"
                          helperText="Left aligned helper text"
                          defaultChecked
                        >
                          Setting with helper
                        </Switch>
                        <Switch
                          helperAlign="center"
                          helperText="Center aligned helper text"
                          defaultChecked
                        >
                          Setting with helper
                        </Switch>
                        <Switch
                          helperAlign="right"
                          helperText="Right aligned helper text"
                          defaultChecked
                        >
                          Setting with helper
                        </Switch>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Slider Showcase - Phase 3.2 */}
              <div className="mb-12">
                <Typography variant="h3" className="mb-4">
                  Slider Controls
                </Typography>
                <Typography variant="body" className="mb-6 text-stone-600">
                  Range sliders for numeric input with value display, different
                  orientations, and custom formatting.
                </Typography>

                <div className="space-y-8">
                  {/* Basic Sliders */}
                  <div>
                    <Typography variant="h4" className="mb-4">
                      Basic Sliders
                    </Typography>
                    <div className="space-y-4 max-w-md">
                      <Slider defaultValue={25}>Volume</Slider>
                      <Slider min={0} max={100} step={10} defaultValue={50}>
                        Brightness (10% steps)
                      </Slider>
                      <Slider disabled defaultValue={75}>
                        Disabled slider
                      </Slider>
                    </div>
                  </div>

                  {/* Sizes */}
                  <div>
                    <Typography variant="h4" className="mb-4">
                      Sizes
                    </Typography>
                    <div className="space-y-4 max-w-md">
                      <Slider size="sm" defaultValue={30}>
                        Small slider
                      </Slider>
                      <Slider size="md" defaultValue={50}>
                        Medium slider (default)
                      </Slider>
                      <Slider size="lg" defaultValue={70}>
                        Large slider
                      </Slider>
                    </div>
                  </div>

                  {/* Value Display */}
                  <div>
                    <Typography variant="h4" className="mb-4">
                      Value Display & Formatting
                    </Typography>
                    <div className="space-y-4 max-w-md">
                      <Slider showValue defaultValue={42}>
                        Progress
                      </Slider>
                      <Slider
                        showValue
                        defaultValue={75}
                        valueFormatter={(value) => `${value}%`}
                      >
                        Percentage
                      </Slider>
                      <Slider
                        showValue
                        min={0}
                        max={1000}
                        step={50}
                        defaultValue={250}
                        valueFormatter={(value) => `$${value}`}
                      >
                        Budget
                      </Slider>
                    </div>
                  </div>

                  {/* Orientation */}
                  <div>
                    <Typography variant="h4" className="mb-4">
                      Orientation
                    </Typography>
                    <div className="space-y-6">
                      <div className="max-w-md">
                        <Typography variant="body" className="mb-4 font-medium">
                          Horizontal (Default)
                        </Typography>
                        <Slider showValue defaultValue={60}>
                          Horizontal slider
                        </Slider>
                      </div>

                      <div className="flex items-start gap-8">
                        <div>
                          <Typography
                            variant="body"
                            className="mb-4 font-medium"
                          >
                            Vertical
                          </Typography>
                          <Slider
                            orientation="vertical"
                            showValue
                            defaultValue={40}
                          >
                            Vertical slider
                          </Slider>
                        </div>
                        <div>
                          <Typography
                            variant="body"
                            className="mb-4 font-medium"
                          >
                            Vertical with formatting
                          </Typography>
                          <Slider
                            orientation="vertical"
                            showValue
                            min={-20}
                            max={40}
                            defaultValue={22}
                            valueFormatter={(value) => `${value}°C`}
                          >
                            Temperature
                          </Slider>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Slider States */}
                  <div>
                    <Typography variant="h4" className="mb-4">
                      States & Helper Text
                    </Typography>
                    <div className="space-y-4 max-w-md">
                      <Slider
                        helperText="Adjust the audio volume level"
                        showValue
                        defaultValue={65}
                      >
                        Master volume
                      </Slider>
                      <Slider
                        required
                        helperText="Quality setting affects file size"
                        min={1}
                        max={10}
                        defaultValue={7}
                        showValue
                      >
                        Image quality
                      </Slider>
                      <Slider
                        error
                        errorMessage="Value must be between 10 and 90"
                        defaultValue={5}
                        showValue
                      >
                        Invalid range
                      </Slider>
                    </div>
                  </div>

                  {/* Text Alignment */}
                  <div>
                    <Typography variant="h4" className="mb-4">
                      Text Alignment
                    </Typography>
                    <div className="space-y-6">
                      <div className="space-y-4 max-w-md">
                        <Typography variant="body" className="font-medium">
                          Label Alignment
                        </Typography>
                        <Slider labelAlign="left" showValue defaultValue={25}>
                          Left aligned
                        </Slider>
                        <Slider labelAlign="center" showValue defaultValue={50}>
                          Center aligned
                        </Slider>
                        <Slider labelAlign="right" showValue defaultValue={75}>
                          Right aligned
                        </Slider>
                      </div>

                      <div className="space-y-4 max-w-md">
                        <Typography variant="body" className="font-medium">
                          Helper Text Alignment
                        </Typography>
                        <Slider
                          helperAlign="left"
                          helperText="Left aligned helper"
                          showValue
                          defaultValue={30}
                        >
                          Setting
                        </Slider>
                        <Slider
                          helperAlign="center"
                          helperText="Center aligned helper"
                          showValue
                          defaultValue={60}
                        >
                          Setting
                        </Slider>
                        <Slider
                          helperAlign="right"
                          helperText="Right aligned helper"
                          showValue
                          defaultValue={90}
                        >
                          Setting
                        </Slider>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* FileUpload Showcase - Phase 3.3 */}
              <div className="mb-12">
                <Typography variant="h3" className="mb-4">
                  File Upload
                </Typography>
                <Typography variant="body" className="mb-6 text-stone-600">
                  File upload components with validation, progress tracking, and
                  multiple variants for different use cases.
                </Typography>

                <div className="space-y-8">
                  {/* Simple File Upload */}
                  <div>
                    <Typography variant="h4" className="mb-4">
                      Simple File Upload
                    </Typography>
                    <div className="space-y-4">
                      <FileUpload
                        label="Upload Documents"
                        helperText="Select files to upload"
                      />

                      <FileUpload
                        label="Profile Picture"
                        validation={{
                          allowedTypes: ["image/*"],
                          maxSize: 2097152, // 2MB
                        }}
                        helperText="Upload your profile picture"
                      />

                      <FileUpload
                        multiple
                        label="Project Files"
                        validation={{
                          allowedTypes: [".pdf", ".docx", ".txt"],
                          maxFiles: 3,
                          maxSize: 5242880, // 5MB
                        }}
                        helperText="Upload up to 3 project files"
                      />
                    </div>
                  </div>

                  {/* Popup File Upload */}
                  <div>
                    <Typography variant="h4" className="mb-4">
                      Popup File Upload
                    </Typography>
                    <div className="space-y-4">
                      <FileUpload
                        variant="popup"
                        label="Bulk Upload"
                        multiple
                        validation={{
                          maxFiles: 10,
                        }}
                        helperText="Upload multiple files in a separate dialog"
                      />

                      <FileUpload
                        variant="popup"
                        label="Media Upload"
                        multiple
                        validation={{
                          allowedTypes: ["image/*", "video/*"],
                          maxSize: 10485760, // 10MB
                        }}
                        helperText="Upload images and videos"
                      />
                    </div>
                  </div>

                  {/* File Upload with Progress */}
                  <div>
                    <Typography variant="h4" className="mb-4">
                      Upload with Progress
                    </Typography>
                    <div className="space-y-4">
                      <FileUpload
                        label="Documents with Progress"
                        multiple
                        validation={{
                          allowedTypes: [".pdf", ".doc", ".docx"],
                          maxSize: 5242880, // 5MB
                        }}
                        onUpload={async () => {
                          // Simulate upload delay
                          await new Promise((resolve) =>
                            setTimeout(resolve, 2000)
                          )
                        }}
                        helperText="Files will show upload progress"
                      />
                    </div>
                  </div>

                  {/* Error States */}
                  <div>
                    <Typography variant="h4" className="mb-4">
                      Error States
                    </Typography>
                    <div className="space-y-4">
                      <FileUpload
                        label="Upload Required"
                        error
                        errorMessage="Please select at least one file"
                      />

                      <FileUpload
                        disabled
                        label="Disabled Upload"
                        helperText="Upload is currently disabled"
                      />
                    </div>
                  </div>

                  {/* Validation Examples */}
                  <div>
                    <Typography variant="h4" className="mb-4">
                      Validation Examples
                    </Typography>
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <Typography variant="body" className="font-medium">
                          Image Files Only
                        </Typography>
                        <FileUpload
                          validation={{
                            allowedTypes: [
                              "image/jpeg",
                              "image/png",
                              "image/gif",
                            ],
                            maxSize: 2097152, // 2MB
                          }}
                          helperText="JPEG, PNG, or GIF under 2MB"
                        />
                      </div>

                      <div className="space-y-4">
                        <Typography variant="body" className="font-medium">
                          Document Files with Size Limits
                        </Typography>
                        <FileUpload
                          validation={{
                            allowedTypes: [".pdf", ".doc", ".docx", ".txt"],
                            minSize: 1024, // 1KB
                            maxSize: 10485760, // 10MB
                          }}
                          helperText="Documents between 1KB and 10MB"
                        />
                      </div>

                      <div className="space-y-4">
                        <Typography variant="body" className="font-medium">
                          Multiple Files with Count Limit
                        </Typography>
                        <FileUpload
                          multiple
                          validation={{
                            maxFiles: 5,
                            maxSize: 1048576, // 1MB per file
                          }}
                          helperText="Up to 5 files, 1MB each"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Components Showcase */}
            <div className="mt-16" id="navigation">
              <Typography variant="h2" className="mb-8">
                Navigation Components
              </Typography>
              <Typography variant="body" className="mb-8 text-stone-600">
                Navigation components help users move through your application.
                The floating navbar provides quick access to page sections.
              </Typography>

              {/* Floating Navbar Info */}
              <div className="mb-12">
                <Typography variant="h3" className="mb-4">
                  Floating Navbar
                </Typography>
                <Typography variant="body" className="mb-6 text-stone-600">
                  The floating navbar you see in the top-right corner
                  demonstrates our navigation component. It automatically
                  highlights the current section as you scroll and provides
                  smooth scrolling navigation.
                </Typography>

                <div className="space-y-6">
                  <Paper variant="outlined" padding="lg">
                    <Typography variant="h4" className="mb-4">
                      Features
                    </Typography>
                    <ul className="space-y-2 text-stone-700">
                      <li>
                        • Automatic section highlighting based on scroll
                        position
                      </li>
                      <li>• Smooth scrolling to sections when clicked</li>
                      <li>• Configurable positioning (corners of screen)</li>
                      <li>• Responsive design with backdrop blur</li>
                      <li>• Customizable offset and styling</li>
                    </ul>
                  </Paper>

                  <Paper variant="outlined" padding="lg">
                    <Typography variant="h4" className="mb-4">
                      Usage Example
                    </Typography>
                    <pre className="bg-stone-100 p-4 rounded text-sm overflow-x-auto">
                      {`<FloatingNavbar 
  items={[
    { id: "overview", label: "Overview", href: "#overview" },
    { id: "features", label: "Features", href: "#features" },
    { id: "examples", label: "Examples", href: "#examples" }
  ]}
  position="top-right"
  offset={20}
/>`}
                    </pre>
                  </Paper>
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
                Phase 3.2 Selection Controls: ✅ Complete (Checkbox ✅, Radio
                ✅, Select ✅, Switch ✅, Slider ✅)
              </Typography>
              <Typography variant="body" color="muted" className="mb-4">
                Phase 3.3 Advanced Form Controls: ✅ FileUpload Complete
              </Typography>
              <Typography variant="body" color="muted" className="mb-4">
                Navigation Components: ✅ FloatingNavbar Complete
              </Typography>
              <Typography variant="body" color="muted" className="mb-4">
                Next up: Data display components and advanced validation
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
