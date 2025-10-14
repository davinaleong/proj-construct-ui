import { useState } from "react"
import { Moon, Sun, Palette } from "lucide-react"
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
} from "./components/layout"
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
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

            <div className="mt-12">
              <Typography variant="body" color="muted" className="mb-4">
                Phase 2.1 Layout Components: ✅ Complete
              </Typography>
              <Typography variant="body" color="muted" className="mb-4">
                Next up: Form & Input components (Button, Input, Select, etc.)
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
