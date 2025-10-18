import { DescriptionList } from "./DescriptionList"
import type { DescriptionListItem } from "./types"

// Sample data for showcasing
const basicItems: DescriptionListItem[] = [
  {
    id: "name",
    term: "Full Name",
    description: "Sarah Johnson",
  },
  {
    id: "email",
    term: "Email Address",
    description: "sarah.johnson@example.com",
  },
  {
    id: "phone",
    term: "Phone Number",
    description: "+1 (555) 123-4567",
  },
  {
    id: "location",
    term: "Location",
    description: "San Francisco, CA",
  },
]

const colorVariantItems: DescriptionListItem[] = [
  {
    id: "status",
    term: "Status",
    description: "Active",
    colorVariant: "success",
  },
  {
    id: "priority",
    term: "Priority",
    description: "High",
    colorVariant: "warning",
  },
  {
    id: "errors",
    term: "Errors",
    description: "2 issues found",
    colorVariant: "danger",
  },
  {
    id: "info",
    term: "Information",
    description: "System updated",
    colorVariant: "info",
  },
]

const detailedItems: DescriptionListItem[] = [
  {
    id: "project",
    term: "Project Name",
    description: "E-commerce Platform Redesign",
  },
  {
    id: "client",
    term: "Client",
    description: "TechCorp Solutions Inc.",
  },
  {
    id: "duration",
    term: "Project Duration",
    description: "6 months (Jan 2024 - Jun 2024)",
  },
  {
    id: "team",
    term: "Team Size",
    description: "8 developers, 2 designers, 1 project manager",
  },
  {
    id: "budget",
    term: "Budget",
    description: "$150,000 USD",
  },
  {
    id: "technologies",
    term: "Technologies",
    description: "React, TypeScript, Node.js, PostgreSQL, AWS",
  },
]

const systemInfoItems: DescriptionListItem[] = [
  {
    id: "os",
    term: "Operating System",
    description: (
      <span className="font-mono text-blue-600">Ubuntu 22.04 LTS</span>
    ),
  },
  {
    id: "cpu",
    term: "CPU",
    description: "Intel Core i7-12700K @ 3.60GHz",
  },
  {
    id: "memory",
    term: "Memory",
    description: (
      <span className="text-green-600 font-semibold">32 GB DDR4</span>
    ),
  },
  {
    id: "storage",
    term: "Storage",
    description: "1TB NVMe SSD + 2TB HDD",
  },
]

export function DescriptionListShowcase() {
  return (
    <div className="space-y-8 p-6">
      <div>
        <h2 className="text-2xl font-bold text-stone-900 mb-4">
          Description List Component Showcase
        </h2>
        <p className="text-stone-600 mb-6">
          A flexible component for displaying key-value pairs in various layouts
          and styles.
        </p>
      </div>

      {/* Basic Usage */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold text-stone-800">Basic Usage</h3>
        <div>
          <h4 className="text-lg font-medium text-stone-700 mb-3">
            Vertical Layout
          </h4>
          <DescriptionList items={basicItems} layout="vertical" />
        </div>
        <div>
          <h4 className="text-lg font-medium text-stone-700 mb-3">
            Horizontal Layout
          </h4>
          <DescriptionList items={basicItems} layout="horizontal" />
        </div>
      </section>

      {/* Size Variants */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold text-stone-800">Size Variants</h3>
        <div className="grid gap-6 lg:grid-cols-3">
          <div>
            <h4 className="text-lg font-medium text-stone-700 mb-3">Small</h4>
            <DescriptionList
              items={basicItems.slice(0, 3)}
              size="sm"
              bordered
            />
          </div>
          <div>
            <h4 className="text-lg font-medium text-stone-700 mb-3">
              Medium (Default)
            </h4>
            <DescriptionList
              items={basicItems.slice(0, 3)}
              size="md"
              bordered
            />
          </div>
          <div>
            <h4 className="text-lg font-medium text-stone-700 mb-3">Large</h4>
            <DescriptionList
              items={basicItems.slice(0, 3)}
              size="lg"
              bordered
            />
          </div>
        </div>
      </section>

      {/* Color Variants */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold text-stone-800">Color Variants</h3>
        <div>
          <h4 className="text-lg font-medium text-stone-700 mb-3">
            Overall Color Variant
          </h4>
          <DescriptionList
            items={basicItems.slice(0, 3)}
            colorVariant="primary"
            bordered
          />
        </div>
        <div>
          <h4 className="text-lg font-medium text-stone-700 mb-3">
            Item-specific Colors
          </h4>
          <DescriptionList items={colorVariantItems} bordered />
        </div>
      </section>

      {/* Styling Options */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold text-stone-800">
          Styling Options
        </h3>
        <div>
          <h4 className="text-lg font-medium text-stone-700 mb-3">Bordered</h4>
          <DescriptionList items={basicItems.slice(0, 4)} bordered />
        </div>
        <div>
          <h4 className="text-lg font-medium text-stone-700 mb-3">Striped</h4>
          <DescriptionList items={basicItems.slice(0, 4)} striped bordered />
        </div>
      </section>

      {/* Horizontal Layout with Custom Term Width */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold text-stone-800">
          Horizontal Layout with Custom Term Width
        </h3>
        <div className="max-w-2xl">
          <DescriptionList
            items={detailedItems}
            layout="horizontal"
            termWidth="200px"
            bordered
            striped
          />
        </div>
      </section>

      {/* Rich Content */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold text-stone-800">
          Rich Content Support
        </h3>
        <div className="max-w-xl">
          <DescriptionList
            items={systemInfoItems}
            layout="horizontal"
            bordered
            colorVariant="accent"
          />
        </div>
      </section>

      {/* Custom Render Functions */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold text-stone-800">
          Custom Render Functions
        </h3>
        <div className="max-w-2xl">
          <DescriptionList
            items={basicItems}
            layout="horizontal"
            bordered
            renderTerm={(term, _item, index) => (
              <span className="inline-flex items-center gap-2">
                <span className="w-6 h-6 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center text-xs font-bold">
                  {index + 1}
                </span>
                {term}
              </span>
            )}
            renderDescription={(description) => (
              <span className="font-mono text-sm bg-stone-100 px-2 py-1 rounded">
                {description}
              </span>
            )}
          />
        </div>
      </section>

      {/* All Color Variants */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold text-stone-800">
          All Color Variants
        </h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {(
            [
              "default",
              "primary",
              "secondary",
              "success",
              "warning",
              "danger",
              "info",
              "accent",
              "muted",
            ] as const
          ).map((variant) => (
            <div key={variant}>
              <h4 className="text-sm font-medium text-stone-600 mb-2 capitalize">
                {variant}
              </h4>
              <DescriptionList
                items={basicItems.slice(0, 2)}
                colorVariant={variant}
                size="sm"
                bordered
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
