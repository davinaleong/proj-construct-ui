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
import { Flex } from "./components/layout"
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
  FormField,
  FormGroup,
} from "./components/forms"
import { FloatingNavbar } from "./components/navigation"
import { StaticTable } from "./components/data-display/StaticTable"
import {
  CoreComponentsDemo,
  TypographyShowcase,
  LayoutShowcase,
  UIPrimitivesShowcase,
} from "./demo"
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
    { id: "data-display", label: "Data Display", href: "#data-display" },
    { id: "navigation", label: "Navigation", href: "#navigation" },
  ]

  return (
    <div className="min-h-screen bg-[#faf9f6] dark:bg-gray-900">
      {/* Floating Navbar Examples - Individual X/Y Offsets */}
      <FloatingNavbar
        items={navItems}
        position="top-right"
        offset={{ x: 20, y: 120 }}
      />
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

            <CoreComponentsDemo />

            <TypographyShowcase />

            <LayoutShowcase />

            <UIPrimitivesShowcase />

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
                <div className="space-y-6">
                  <Input
                    label="Basic Input"
                    placeholder="Enter some text..."
                    helperText="This is a basic input field"
                    labelAlign="left"
                    messageAlign="left"
                  />

                  <Input
                    label="Email Input"
                    type="email"
                    placeholder="john@example.com"
                    leftIcon={Mail}
                    required
                    labelAlign="left"
                    messageAlign="left"
                  />

                  <Input
                    label="Password Input"
                    type="password"
                    placeholder="Enter password"
                    leftIcon={Lock}
                    variant="filled"
                    labelAlign="left"
                    messageAlign="left"
                  />

                  <Input
                    label="Search Input"
                    type="search"
                    placeholder="Search..."
                    leftIcon={Search}
                    variant="outlined"
                    size="lg"
                    labelAlign="left"
                    messageAlign="left"
                  />

                  <Input
                    label="Error State"
                    placeholder="This field has an error"
                    error
                    errorMessage="This field is required"
                    labelAlign="left"
                    messageAlign="left"
                  />

                  <Input
                    label="Disabled Input"
                    placeholder="This input is disabled"
                    disabled
                    defaultValue="Cannot edit this"
                    labelAlign="left"
                    messageAlign="left"
                  />

                  <Input
                    label="Readonly Input"
                    placeholder="This input is readonly"
                    readonly
                    defaultValue="Read-only value"
                    helperText="This field is readonly and cannot be edited"
                    labelAlign="left"
                    messageAlign="left"
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
                <div className="space-y-6">
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
                    <div className="space-y-4">
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
                    <div className="space-y-4">
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
                    <div className="space-y-4">
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
                    <div className="space-y-4">
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
                    <div className="space-y-4">
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
                    <div className="space-y-4">
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
                    <div className="space-y-4">
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
                    <div className="space-y-4">
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
                    <div className="space-y-4">
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
                    <div className="space-y-4">
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
                      <div className="space-y-4">
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

                      <div className="space-y-4">
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
                    <div className="space-y-4">
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
                    <div className="space-y-4">
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
                    <div className="space-y-4">
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
                    <div className="space-y-4">
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
                      <div className="space-y-4">
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

                      <div className="space-y-4">
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

              {/* FormField and FormGroup Showcase - Phase 3.4 */}
              <div className="mb-12">
                <Typography variant="h3" className="mb-4">
                  Form Organization
                </Typography>
                <Typography variant="body" className="mb-6 text-stone-600">
                  FormField and FormGroup components provide structured form
                  layouts with proper labeling, descriptions, error handling,
                  and accessibility support.
                </Typography>

                {/* FormField Examples */}
                <div className="mb-12">
                  <Typography variant="h4" className="mb-6">
                    FormField Component
                  </Typography>
                  <Typography variant="body" className="mb-6 text-stone-600">
                    FormField wraps form inputs with consistent labeling, error
                    handling, and layout options.
                  </Typography>

                  <div className="space-y-8">
                    {/* Basic FormField Examples */}
                    <div>
                      <Typography variant="h5" className="mb-4">
                        Basic Usage
                      </Typography>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <FormField
                            label="Full Name"
                            description="Enter your complete legal name"
                            required
                            className="text-left"
                          >
                            <Input
                              placeholder="John Doe"
                              labelAlign="left"
                              messageAlign="left"
                            />
                          </FormField>

                          <FormField
                            label="Email Address"
                            description="We'll use this to send you updates"
                            required
                            className="text-left"
                          >
                            <Input
                              type="email"
                              placeholder="john@example.com"
                              leftIcon={Mail}
                              labelAlign="left"
                              messageAlign="left"
                            />
                          </FormField>
                        </div>

                        <div className="space-y-4">
                          <FormField
                            label="Password"
                            description="At least 8 characters"
                            required
                            className="text-left"
                          >
                            <Input
                              type="password"
                              placeholder="Enter password"
                              leftIcon={Lock}
                              labelAlign="left"
                              messageAlign="left"
                            />
                          </FormField>

                          <FormField
                            label="Bio"
                            description="Tell us a bit about yourself"
                            className="text-left"
                          >
                            <Textarea
                              placeholder="Write your bio here..."
                              rows={3}
                              labelAlign="left"
                              messageAlign="left"
                            />
                          </FormField>
                        </div>
                      </div>
                    </div>

                    {/* Layout Orientations */}
                    <div>
                      <Typography variant="h5" className="mb-4">
                        Layout Orientations
                      </Typography>
                      <div className="space-y-6">
                        <div>
                          <Typography
                            variant="bodySmall"
                            className="mb-3 text-stone-500"
                          >
                            Vertical Layout (Default)
                          </Typography>
                          <div className="max-w-md">
                            <FormField
                              label="Vertical Layout"
                              description="Label and description appear above the input"
                              orientation="vertical"
                              className="text-left"
                            >
                              <Input
                                placeholder="This uses vertical layout"
                                labelAlign="left"
                                messageAlign="left"
                              />
                            </FormField>
                          </div>
                        </div>

                        <div>
                          <Typography
                            variant="bodySmall"
                            className="mb-3 text-stone-500"
                          >
                            Horizontal Layout
                          </Typography>
                          <FormField
                            label="Horizontal Layout"
                            description="Label appears beside the input"
                            orientation="horizontal"
                            className="text-left"
                          >
                            <Input
                              placeholder="This uses horizontal layout"
                              labelAlign="left"
                              messageAlign="left"
                            />
                          </FormField>
                        </div>
                      </div>
                    </div>

                    {/* Size Variants */}
                    <div>
                      <Typography variant="h5" className="mb-4">
                        Size Variants
                      </Typography>
                      <div className="space-y-4">
                        {(["sm", "md", "lg"] as const).map((size) => (
                          <div key={size}>
                            <Typography
                              variant="bodySmall"
                              className="mb-2 text-stone-500"
                            >
                              Size: {size}
                            </Typography>
                            <div className="max-w-md">
                              <FormField
                                label={`${size.toUpperCase()} Field`}
                                description={`This field uses ${size} sizing`}
                                size={size}
                              >
                                <Input
                                  placeholder={`${size} sized input`}
                                  labelAlign="left"
                                  messageAlign="left"
                                />
                              </FormField>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Error States */}
                    <div>
                      <Typography variant="h5" className="mb-4">
                        Error Handling
                      </Typography>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <FormField
                            label="Field with Error"
                            description="This field has a validation error"
                            error="This field is required"
                            className="text-left"
                          >
                            <Input
                              placeholder="Required field"
                              labelAlign="left"
                              messageAlign="left"
                            />
                          </FormField>

                          <FormField
                            label="Custom Error Styling"
                            description="Custom error message styling"
                            error="Please enter a valid email address"
                            className="text-left"
                          >
                            <Input
                              type="email"
                              placeholder="invalid-email"
                              leftIcon={Mail}
                              labelAlign="left"
                              messageAlign="left"
                            />
                          </FormField>
                        </div>

                        <div className="space-y-4">
                          <FormField
                            label="Multiple Validation"
                            description="Multiple error conditions"
                            error="Password must be at least 8 characters and contain special characters"
                            className="text-left"
                          >
                            <Input
                              type="password"
                              placeholder="weak"
                              leftIcon={Lock}
                              labelAlign="left"
                              messageAlign="left"
                            />
                          </FormField>

                          <FormField
                            label="Success State"
                            description="This field is valid"
                            className="text-left"
                          >
                            <Input
                              placeholder="Valid input"
                              defaultValue="john@example.com"
                              leftIcon={Mail}
                              labelAlign="left"
                              messageAlign="left"
                            />
                          </FormField>
                        </div>
                      </div>
                    </div>

                    {/* Different Form Elements */}
                    <div>
                      <Typography variant="h5" className="mb-4">
                        Various Form Elements
                      </Typography>
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <FormField
                              label="Newsletter Subscription"
                              description="Get updates about new features"
                              className="text-left"
                            >
                              <Checkbox labelAlign="left" helperAlign="left">
                                Subscribe to newsletter
                              </Checkbox>
                            </FormField>

                            <FormField
                              label="Account Type"
                              description="Choose your account type"
                              className="text-left"
                            >
                              <RadioGroup
                                name="account-type"
                                options={[
                                  { value: "personal", label: "Personal" },
                                  { value: "business", label: "Business" },
                                  { value: "enterprise", label: "Enterprise" },
                                ]}
                              />
                            </FormField>
                          </div>

                          <div className="space-y-4">
                            <FormField
                              label="Country"
                              description="Select your country"
                              className="text-left"
                            >
                              <Select
                                placeholder="Choose country"
                                labelAlign="left"
                                messageAlign="left"
                                options={[
                                  { value: "us", label: "United States" },
                                  { value: "uk", label: "United Kingdom" },
                                  { value: "ca", label: "Canada" },
                                  { value: "au", label: "Australia" },
                                ]}
                              />
                            </FormField>

                            <FormField
                              label="Notifications"
                              description="Enable push notifications"
                              className="text-left"
                            >
                              <Switch />
                            </FormField>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* FormGroup Examples */}
                <div className="mb-12">
                  <Typography variant="h4" className="mb-6">
                    FormGroup Component
                  </Typography>
                  <Typography variant="body" className="mb-6 text-stone-600">
                    FormGroup organizes related form fields with consistent
                    spacing and optional grouping semantics.
                  </Typography>

                  <div className="space-y-8">
                    {/* Basic FormGroup */}
                    <div>
                      <Typography variant="h5" className="mb-4">
                        Basic Form Group
                      </Typography>
                      <FormGroup
                        title="Personal Information"
                        description="Please provide your basic details"
                        className="text-left"
                      >
                        <FormField
                          label="First Name"
                          description="Your given name"
                          required
                          className="text-left"
                        >
                          <Input
                            placeholder="John"
                            labelAlign="left"
                            messageAlign="left"
                          />
                        </FormField>

                        <FormField
                          label="Last Name"
                          description="Your family name"
                          required
                          className="text-left"
                        >
                          <Input
                            placeholder="Doe"
                            labelAlign="left"
                            messageAlign="left"
                          />
                        </FormField>

                        <FormField
                          label="Date of Birth"
                          description="When were you born?"
                          className="text-left"
                        >
                          <Input
                            placeholder="YYYY-MM-DD"
                            labelAlign="left"
                            messageAlign="left"
                          />
                        </FormField>
                      </FormGroup>
                    </div>

                    {/* Fieldset Semantic */}
                    <div>
                      <Typography variant="h5" className="mb-4">
                        Semantic Fieldset Group
                      </Typography>
                      <Typography
                        variant="body"
                        className="mb-4 text-stone-600"
                      >
                        Uses fieldset/legend for better accessibility when
                        fields are related.
                      </Typography>
                      <FormGroup
                        title="Contact Preferences"
                        description="How would you like us to contact you?"
                        fieldset={true}
                      >
                        <FormField
                          label="Email Notifications"
                          description="Receive updates via email"
                        >
                          <Checkbox labelAlign="left" helperAlign="left">
                            Send me email updates
                          </Checkbox>
                        </FormField>

                        <FormField
                          label="SMS Notifications"
                          description="Receive updates via SMS"
                        >
                          <Checkbox labelAlign="left" helperAlign="left">
                            Send me SMS updates
                          </Checkbox>
                        </FormField>

                        <FormField
                          label="Phone Notifications"
                          description="Receive updates via phone"
                        >
                          <Checkbox labelAlign="left" helperAlign="left">
                            Call me with updates
                          </Checkbox>
                        </FormField>
                      </FormGroup>
                    </div>

                    {/* Horizontal Layout */}
                    <div>
                      <Typography variant="h5" className="mb-4">
                        Horizontal Layout
                      </Typography>
                      <FormGroup
                        title="Quick Settings"
                        description="Adjust your preferences"
                        orientation="horizontal"
                      >
                        <FormField label="Theme" size="sm">
                          <Select
                            placeholder="Choose theme"
                            labelAlign="left"
                            messageAlign="left"
                            options={[
                              { value: "light", label: "Light" },
                              { value: "dark", label: "Dark" },
                              { value: "auto", label: "Auto" },
                            ]}
                          />
                        </FormField>

                        <FormField label="Language" size="sm">
                          <Select
                            placeholder="Choose language"
                            labelAlign="left"
                            messageAlign="left"
                            options={[
                              { value: "en", label: "English" },
                              { value: "es", label: "Spanish" },
                              { value: "fr", label: "French" },
                            ]}
                          />
                        </FormField>

                        <FormField label="Timezone" size="sm">
                          <Select
                            placeholder="Choose timezone"
                            labelAlign="left"
                            messageAlign="left"
                            options={[
                              { value: "pst", label: "PST" },
                              { value: "est", label: "EST" },
                              { value: "utc", label: "UTC" },
                            ]}
                          />
                        </FormField>
                      </FormGroup>
                    </div>

                    {/* Different Sizes */}
                    <div>
                      <Typography variant="h5" className="mb-4">
                        Size Variants
                      </Typography>
                      <div className="space-y-6">
                        {(["sm", "md", "lg"] as const).map((size) => (
                          <FormGroup
                            key={size}
                            title={`${size.toUpperCase()} Size Group`}
                            description={`Form group using ${size} sizing`}
                            size={size}
                          >
                            <FormField label="Field 1" size={size}>
                              <Input
                                placeholder={`${size} input`}
                                labelAlign="left"
                                messageAlign="left"
                              />
                            </FormField>
                            <FormField label="Field 2" size={size}>
                              <Input
                                placeholder={`Another ${size} input`}
                                labelAlign="left"
                                messageAlign="left"
                              />
                            </FormField>
                          </FormGroup>
                        ))}
                      </div>
                    </div>

                    {/* Complex Form Example */}
                    <div>
                      <Typography variant="h5" className="mb-4">
                        Complex Form Example
                      </Typography>
                      <Typography
                        variant="body"
                        className="mb-6 text-stone-600"
                      >
                        A complete form using multiple FormGroups to organize
                        different sections.
                      </Typography>

                      <div className="space-y-8">
                        <FormGroup
                          title="Account Information"
                          description="Basic account details"
                          fieldset={true}
                        >
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField label="Username" required>
                              <Input
                                placeholder="Choose a username"
                                labelAlign="left"
                                messageAlign="left"
                              />
                            </FormField>

                            <FormField label="Email" required>
                              <Input
                                type="email"
                                placeholder="your.email@example.com"
                                leftIcon={Mail}
                                labelAlign="left"
                                messageAlign="left"
                              />
                            </FormField>
                          </div>

                          <FormField label="Password" required>
                            <Input
                              type="password"
                              placeholder="Create a strong password"
                              leftIcon={Lock}
                              labelAlign="left"
                              messageAlign="left"
                            />
                          </FormField>
                        </FormGroup>

                        <FormGroup
                          title="Profile Details"
                          description="Tell us more about yourself"
                        >
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField label="First Name" required>
                              <Input
                                placeholder="John"
                                labelAlign="left"
                                messageAlign="left"
                              />
                            </FormField>

                            <FormField label="Last Name" required>
                              <Input
                                placeholder="Doe"
                                labelAlign="left"
                                messageAlign="left"
                              />
                            </FormField>
                          </div>

                          <FormField label="Bio">
                            <Textarea
                              placeholder="Tell us about yourself..."
                              rows={4}
                              labelAlign="left"
                              messageAlign="left"
                            />
                          </FormField>

                          <FormField label="Website">
                            <Input
                              type="url"
                              placeholder="https://yourwebsite.com"
                              labelAlign="left"
                              messageAlign="left"
                            />
                          </FormField>
                        </FormGroup>

                        <FormGroup
                          title="Preferences"
                          description="Customize your experience"
                          fieldset={true}
                        >
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField label="Preferred Language">
                              <Select
                                placeholder="Choose language"
                                options={[
                                  { value: "en", label: "English" },
                                  { value: "es", label: "Español" },
                                  { value: "fr", label: "Français" },
                                  { value: "de", label: "Deutsch" },
                                ]}
                              />
                            </FormField>

                            <FormField label="Time Zone">
                              <Select
                                placeholder="Select timezone"
                                options={[
                                  { value: "pst", label: "Pacific Time" },
                                  { value: "mst", label: "Mountain Time" },
                                  { value: "cst", label: "Central Time" },
                                  { value: "est", label: "Eastern Time" },
                                ]}
                              />
                            </FormField>
                          </div>

                          <FormField label="Newsletter Subscription">
                            <Checkbox>
                              I want to receive updates about new features and
                              improvements
                            </Checkbox>
                          </FormField>

                          <FormField label="Marketing Communications">
                            <Checkbox>
                              I want to receive promotional emails and special
                              offers
                            </Checkbox>
                          </FormField>
                        </FormGroup>

                        <div className="flex gap-4">
                          <Button variant="solid" color="primary">
                            Create Account
                          </Button>
                          <Button variant="outline">Cancel</Button>
                        </div>
                      </div>
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
                    🎯 Form Organization Complete!
                  </Typography>
                  <Typography variant="body" color="paper" intensity="soft">
                    ✅ FormField provides consistent input labeling and error
                    handling
                    <br />
                    ✅ FormGroup organizes related fields with proper spacing
                    <br />
                    ✅ Support for horizontal and vertical layouts
                    <br />
                    ✅ Multiple size variants for different contexts
                    <br />
                    ✅ Full accessibility with ARIA attributes and semantic HTML
                    <br />✅ Intelligent error message handling prevents
                    duplication
                  </Typography>
                </Paper>
              </div>
            </div>

            {/* Data Display Components Showcase */}
            <div className="mt-16" id="data-display">
              <Typography variant="h2" className="mb-8">
                Data Display Components
              </Typography>
              <Typography variant="body" className="mb-8 text-stone-600">
                Data display components present information in structured,
                readable formats. Tables, lists, and other display elements help
                users consume data effectively.
              </Typography>

              {/* StaticTable Component */}
              <div className="mb-12">
                <Paper variant="elevated" padding="lg" className="bg-white">
                  <Typography variant="h3" className="mb-6">
                    Static Table
                  </Typography>
                  <Typography variant="body" className="mb-6 text-stone-600">
                    A comprehensive data presentation table with color variants,
                    custom rendering, and responsive design. Perfect for
                    displaying structured data with enhanced visual hierarchy.
                  </Typography>

                  {/* Basic Table Example */}
                  <div className="mb-8">
                    <Typography variant="h4" className="mb-4">
                      Basic Table
                    </Typography>
                    <StaticTable
                      columns={[
                        {
                          key: "id",
                          label: "ID",
                          align: "center",
                          width: "80px",
                        },
                        { key: "name", label: "Name", align: "left" },
                        { key: "email", label: "Email", align: "left" },
                        { key: "role", label: "Role", align: "center" },
                        { key: "status", label: "Status", align: "center" },
                      ]}
                      rows={[
                        {
                          id: 1,
                          name: "John Doe",
                          email: "john@example.com",
                          role: "Admin",
                          status: "Active",
                        },
                        {
                          id: 2,
                          name: "Jane Smith",
                          email: "jane@example.com",
                          role: "Editor",
                          status: "Active",
                        },
                        {
                          id: 3,
                          name: "Bob Johnson",
                          email: "bob@example.com",
                          role: "User",
                          status: "Inactive",
                        },
                        {
                          id: 4,
                          name: "Alice Brown",
                          email: "alice@example.com",
                          role: "Moderator",
                          status: "Pending",
                        },
                      ]}
                    />
                  </div>

                  {/* Color Variants Example */}
                  <div className="mb-8">
                    <Typography variant="h4" className="mb-4">
                      Color Variants
                    </Typography>
                    <Typography variant="body" className="mb-4 text-stone-600">
                      Columns and rows can have independent color variants with
                      priority hierarchy.
                    </Typography>
                    <StaticTable
                      columns={[
                        {
                          key: "id",
                          label: "ID",
                          align: "center",
                          width: "80px",
                        },
                        {
                          key: "name",
                          label: "Name",
                          align: "left",
                          colorVariant: "primary",
                        },
                        {
                          key: "department",
                          label: "Department",
                          align: "left",
                          colorVariant: "secondary",
                        },
                        {
                          key: "salary",
                          label: "Salary",
                          align: "right",
                          colorVariant: "success",
                        },
                        {
                          key: "status",
                          label: "Status",
                          align: "center",
                          colorVariant: "info",
                        },
                      ]}
                      rows={[
                        {
                          id: 1,
                          name: "John Doe",
                          department: "Engineering",
                          salary: "$75,000",
                          status: "Active",
                          colorVariant: "success",
                        },
                        {
                          id: 2,
                          name: "Jane Smith",
                          department: "Marketing",
                          salary: "$65,000",
                          status: "Active",
                        },
                        {
                          id: 3,
                          name: "Bob Johnson",
                          department: "Sales",
                          salary: "$55,000",
                          status: "Warning",
                          colorVariant: "warning",
                        },
                        {
                          id: 4,
                          name: "Alice Brown",
                          department: "HR",
                          salary: "$60,000",
                          status: "Inactive",
                          colorVariant: "danger",
                        },
                      ]}
                    />
                  </div>

                  {/* Whole Table Color Variants */}
                  <div className="mb-8">
                    <Typography variant="h4" className="mb-4">
                      Whole Table Color Variants
                    </Typography>
                    <Typography variant="body" className="mb-4 text-stone-600">
                      Apply color variants to the entire table for themed
                      styling.
                    </Typography>
                    <div className="space-y-6">
                      <div>
                        <Typography variant="h5" className="mb-2">
                          Primary Theme
                        </Typography>
                        <StaticTable
                          columns={[
                            {
                              key: "id",
                              label: "ID",
                              align: "center",
                              width: "80px",
                            },
                            { key: "name", label: "Name", align: "left" },
                            { key: "status", label: "Status", align: "center" },
                          ]}
                          rows={[
                            { id: 1, name: "John Doe", status: "Active" },
                            { id: 2, name: "Jane Smith", status: "Active" },
                            { id: 3, name: "Bob Johnson", status: "Inactive" },
                          ]}
                          colorVariant="primary"
                          striped
                        />
                      </div>

                      <div>
                        <Typography variant="h5" className="mb-2">
                          Success Theme
                        </Typography>
                        <StaticTable
                          columns={[
                            {
                              key: "id",
                              label: "ID",
                              align: "center",
                              width: "80px",
                            },
                            { key: "name", label: "Name", align: "left" },
                            { key: "status", label: "Status", align: "center" },
                          ]}
                          rows={[
                            { id: 1, name: "Task A", status: "Completed" },
                            { id: 2, name: "Task B", status: "Completed" },
                            { id: 3, name: "Task C", status: "In Progress" },
                          ]}
                          colorVariant="success"
                        />
                      </div>

                      <div>
                        <Typography variant="h5" className="mb-2">
                          Warning Theme
                        </Typography>
                        <StaticTable
                          columns={[
                            {
                              key: "id",
                              label: "ID",
                              align: "center",
                              width: "80px",
                            },
                            { key: "alert", label: "Alert", align: "left" },
                            {
                              key: "severity",
                              label: "Severity",
                              align: "center",
                            },
                          ]}
                          rows={[
                            {
                              id: 1,
                              alert: "High CPU Usage",
                              severity: "Medium",
                            },
                            {
                              id: 2,
                              alert: "Low Disk Space",
                              severity: "High",
                            },
                            { id: 3, alert: "Memory Warning", severity: "Low" },
                          ]}
                          colorVariant="warning"
                          striped
                        />
                      </div>

                      <div>
                        <Typography variant="h5" className="mb-2">
                          Danger Theme
                        </Typography>
                        <StaticTable
                          columns={[
                            {
                              key: "id",
                              label: "ID",
                              align: "center",
                              width: "80px",
                            },
                            { key: "error", label: "Error", align: "left" },
                            { key: "impact", label: "Impact", align: "center" },
                          ]}
                          rows={[
                            {
                              id: 1,
                              error: "Database Connection Failed",
                              impact: "Critical",
                            },
                            { id: 2, error: "Service Timeout", impact: "High" },
                            {
                              id: 3,
                              error: "Authentication Error",
                              impact: "Medium",
                            },
                          ]}
                          colorVariant="danger"
                        />
                      </div>

                      <div>
                        <Typography variant="h5" className="mb-2">
                          Extended Palette Examples
                        </Typography>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Typography variant="h6" className="mb-2 text-sm">
                              Violet Theme
                            </Typography>
                            <StaticTable
                              columns={[
                                {
                                  key: "feature",
                                  label: "Feature",
                                  align: "left",
                                },
                                {
                                  key: "status",
                                  label: "Status",
                                  align: "center",
                                },
                              ]}
                              rows={[
                                {
                                  id: 1,
                                  feature: "Authentication",
                                  status: "Ready",
                                },
                                {
                                  id: 2,
                                  feature: "Dashboard",
                                  status: "In Progress",
                                },
                              ]}
                              colorVariant="violet"
                              size="sm"
                            />
                          </div>
                          <div>
                            <Typography variant="h6" className="mb-2 text-sm">
                              Emerald Theme
                            </Typography>
                            <StaticTable
                              columns={[
                                {
                                  key: "metric",
                                  label: "Metric",
                                  align: "left",
                                },
                                {
                                  key: "value",
                                  label: "Value",
                                  align: "right",
                                },
                              ]}
                              rows={[
                                { id: 1, metric: "Revenue", value: "$125K" },
                                { id: 2, metric: "Growth", value: "+23%" },
                              ]}
                              colorVariant="emerald"
                              size="sm"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Table Variants */}
                  <div className="mb-8">
                    <Typography variant="h4" className="mb-4">
                      Table Variants
                    </Typography>
                    <div className="space-y-6">
                      <div>
                        <Typography variant="h5" className="mb-2">
                          Striped Table
                        </Typography>
                        <StaticTable
                          columns={[
                            {
                              key: "id",
                              label: "ID",
                              align: "center",
                              width: "80px",
                            },
                            { key: "name", label: "Name", align: "left" },
                            { key: "status", label: "Status", align: "center" },
                          ]}
                          rows={[
                            { id: 1, name: "John Doe", status: "Active" },
                            { id: 2, name: "Jane Smith", status: "Active" },
                            { id: 3, name: "Bob Johnson", status: "Inactive" },
                          ]}
                          striped
                        />
                      </div>

                      <div>
                        <Typography variant="h5" className="mb-2">
                          Compact Table
                        </Typography>
                        <StaticTable
                          columns={[
                            {
                              key: "id",
                              label: "ID",
                              align: "center",
                              width: "80px",
                            },
                            { key: "name", label: "Name", align: "left" },
                            { key: "status", label: "Status", align: "center" },
                          ]}
                          rows={[
                            { id: 1, name: "John Doe", status: "Active" },
                            { id: 2, name: "Jane Smith", status: "Active" },
                            { id: 3, name: "Bob Johnson", status: "Inactive" },
                          ]}
                          variant="compact"
                          size="sm"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Custom Render Functions */}
                  <div className="mb-8">
                    <Typography variant="h4" className="mb-4">
                      Custom Render Functions
                    </Typography>
                    <Typography variant="body" className="mb-4 text-stone-600">
                      Create complex cell content with custom render functions.
                    </Typography>
                    <StaticTable
                      columns={[
                        {
                          key: "id",
                          label: "ID",
                          align: "center",
                          width: "80px",
                        },
                        {
                          key: "name",
                          label: "User",
                          align: "left",
                          render: (value) => (
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 bg-pp-blue-100 rounded-full flex items-center justify-center text-pp-blue-800 font-medium text-sm">
                                {String(value).charAt(0)}
                              </div>
                              <span className="font-medium">
                                {String(value)}
                              </span>
                            </div>
                          ),
                        },
                        {
                          key: "progress",
                          label: "Progress",
                          align: "center",
                          render: (value) => {
                            const progress = Number(value) || 0
                            return (
                              <div className="flex items-center gap-2">
                                <div className="w-16 bg-pp-gray-200 rounded-full h-2">
                                  <div
                                    className="bg-pp-blue-600 h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${progress}%` }}
                                  ></div>
                                </div>
                                <span className="text-sm text-pp-gray-600">
                                  {progress}%
                                </span>
                              </div>
                            )
                          },
                        },
                        {
                          key: "actions",
                          label: "Actions",
                          align: "center",
                          render: () => (
                            <div className="flex gap-1">
                              <button className="px-2 py-1 text-xs bg-pp-blue-100 text-pp-blue-800 rounded hover:bg-pp-blue-200">
                                Edit
                              </button>
                              <button className="px-2 py-1 text-xs bg-pp-red-100 text-pp-red-800 rounded hover:bg-pp-red-200">
                                Delete
                              </button>
                            </div>
                          ),
                        },
                      ]}
                      rows={[
                        { id: 1, name: "John Doe", progress: 85, actions: "" },
                        {
                          id: 2,
                          name: "Jane Smith",
                          progress: 92,
                          actions: "",
                        },
                        {
                          id: 3,
                          name: "Bob Johnson",
                          progress: 67,
                          actions: "",
                        },
                      ]}
                    />
                  </div>

                  {/* Features Summary */}
                  <Typography variant="body" className="text-stone-600">
                    ✅ Whole-table color variants with 42 color options
                    <br />
                    ✅ Color variants for rows and columns with priority
                    hierarchy
                    <br />
                    ✅ Table variants: striped, bordered, compact
                    <br />
                    ✅ Size options: small, medium, large
                    <br />
                    ✅ Custom render functions for complex content
                    <br />
                    ✅ Loading states and customizable empty states
                    <br />
                    ✅ Full accessibility with proper table semantics
                    <br />
                    ✅ Responsive design with horizontal scroll on mobile
                    <br />✅ Paper theme integration with consistent styling
                  </Typography>
                </Paper>
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
                      Usage Examples
                    </Typography>
                    <div className="space-y-4">
                      <div>
                        <Typography variant="body" className="mb-2 font-medium">
                          Basic Usage (uniform offset):
                        </Typography>
                        <pre className="bg-stone-100 p-4 rounded text-sm overflow-x-auto">
                          {`<FloatingNavbar 
  items={navItems}
  position="top-right"
  offset={20}
/>`}
                        </pre>
                      </div>
                      <div>
                        <Typography variant="body" className="mb-2 font-medium">
                          Individual X/Y Offsets:
                        </Typography>
                        <pre className="bg-stone-100 p-4 rounded text-sm overflow-x-auto">
                          {`<FloatingNavbar 
  items={navItems}
  position="bottom-left"
  offset={{ x: 40, y: 60 }}
/>`}
                        </pre>
                      </div>
                    </div>
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
                Phase 3.4 Form Organization: ✅ FormField & FormGroup Complete
              </Typography>
              <Typography variant="body" color="muted" className="mb-4">
                Phase 4.1 Data Display: ✅ StaticTable Complete
              </Typography>
              <Typography variant="body" color="muted" className="mb-4">
                Navigation Components: ✅ FloatingNavbar Complete
              </Typography>
              <Typography variant="body" color="muted" className="mb-4">
                Next up: Advanced data display components and feedback systems
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
