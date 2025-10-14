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
import { Button, IconButton, Input, Textarea } from "./components/forms"
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
          <div className="flex items-center justify-between">
            <div>
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
          </div>
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

              {/* Input Positioning Showcase */}
              <div className="mb-12">
                <Typography variant="h3" className="mb-4">
                  Input Label & Message Positioning
                </Typography>
                <div className="space-y-8">
                  <div>
                    <Typography variant="body" className="mb-3">
                      Label Positions
                    </Typography>
                    <div className="space-y-4 max-w-lg">
                      <Input
                        label="Top Label (Default)"
                        placeholder="Standard top label"
                        labelPosition="top"
                        helperText="Label appears above input"
                      />

                      <Input
                        label="Left Label"
                        placeholder="Side-by-side layout"
                        labelPosition="left"
                        helperText="Label appears to the left"
                      />

                      <Input
                        label="Inside Label"
                        placeholder="Overlaid label"
                        labelPosition="inside"
                        helperText="Label appears inside the input"
                      />

                      <Input
                        label="Floating Label"
                        placeholder="Animated label"
                        labelPosition="floating"
                        helperText="Label floats above when focused"
                      />
                    </div>
                  </div>

                  <div>
                    <Typography variant="body" className="mb-3">
                      Message Positions
                    </Typography>
                    <div className="space-y-4 max-w-lg">
                      <Input
                        label="Bottom Message (Default)"
                        placeholder="Standard bottom message"
                        messagePosition="bottom"
                        helperText="Message appears below input"
                      />

                      <Input
                        label="Right Message"
                        placeholder="Side message"
                        messagePosition="right"
                        helperText="Message on the right"
                      />

                      <Input
                        label="Inline Message"
                        placeholder="Inline message"
                        messagePosition="inline"
                        helperText="Inline message"
                      />
                    </div>
                  </div>
                </div>
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
            </div>

            <div className="mt-12">
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
                Next up: Phase 3.2 Selection Controls (Select, Checkbox, Radio,
                etc.)
              </Typography>

              <Typography variant="caption" color="muted">
                Built with ❤️ using the Paper Design System
              </Typography>
            </div>
          </div>
        </Container>
      </main>
    </div>
  )
}

export default App
