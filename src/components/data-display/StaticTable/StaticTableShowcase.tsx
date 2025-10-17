import { StaticTable } from "./StaticTable"
import type { StaticTableColumn, StaticTableRow } from "./types"

// Sample data for demonstrations
const basicColumns: StaticTableColumn[] = [
  { key: "id", label: "ID", align: "center", width: "80px" },
  { key: "name", label: "Name", align: "left" },
  { key: "email", label: "Email", align: "left" },
  { key: "role", label: "Role", align: "center" },
  { key: "status", label: "Status", align: "center" },
]

const basicRows: StaticTableRow[] = [
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
]

// Color variant examples
const colorVariantColumns: StaticTableColumn[] = [
  { key: "id", label: "ID", align: "center", width: "80px" },
  { key: "name", label: "Name", align: "left", colorVariant: "primary" },
  {
    key: "department",
    label: "Department",
    align: "left",
    colorVariant: "secondary",
  },
  { key: "salary", label: "Salary", align: "right", colorVariant: "success" },
  { key: "status", label: "Status", align: "center", colorVariant: "info" },
]

const colorVariantRows: StaticTableRow[] = [
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
    colorVariant: "error",
  },
]

// Custom render function examples
const customRenderColumns: StaticTableColumn[] = [
  { key: "id", label: "ID", align: "center", width: "80px" },
  {
    key: "name",
    label: "Name",
    align: "left",
    render: (value) => (
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-pp-blue-100 rounded-full flex items-center justify-center text-pp-blue-800 font-medium text-sm">
          {String(value).charAt(0)}
        </div>
        <span className="font-medium">{String(value)}</span>
      </div>
    ),
  },
  {
    key: "email",
    label: "Email",
    align: "left",
    render: (value) => (
      <a
        href={`mailto:${value}`}
        className="text-pp-blue-600 hover:text-pp-blue-800 underline"
      >
        {String(value)}
      </a>
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
          <span className="text-sm text-pp-gray-600">{progress}%</span>
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
]

const customRenderRows: StaticTableRow[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    progress: 85,
    actions: "",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    progress: 92,
    actions: "",
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob@example.com",
    progress: 67,
    actions: "",
  },
  {
    id: 4,
    name: "Alice Brown",
    email: "alice@example.com",
    progress: 78,
    actions: "",
  },
]

export const StaticTableShowcase = () => {
  return (
    <div className="space-y-8 p-6 bg-pp-paper-50 min-h-screen">
      <div className="max-w-6xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-pp-gray-900 mb-8">
          StaticTable Component Showcase
        </h1>

        {/* Basic Table */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-pp-gray-800">
            Basic Table
          </h2>
          <p className="text-pp-gray-600">
            A simple table with default styling and basic column configuration.
          </p>
          <StaticTable columns={basicColumns} rows={basicRows} />
        </section>

        {/* Striped Table */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-pp-gray-800">
            Striped Table
          </h2>
          <p className="text-pp-gray-600">
            Table with alternating row backgrounds for better readability.
          </p>
          <StaticTable columns={basicColumns} rows={basicRows} striped />
        </section>

        {/* Different Sizes */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-pp-gray-800">
            Table Sizes
          </h2>
          <p className="text-pp-gray-600">
            Tables in different sizes: small, medium, and large.
          </p>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-2">Small Size</h3>
              <StaticTable
                columns={basicColumns}
                rows={basicRows.slice(0, 2)}
                size="sm"
              />
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">
                Medium Size (Default)
              </h3>
              <StaticTable
                columns={basicColumns}
                rows={basicRows.slice(0, 2)}
                size="md"
              />
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">Large Size</h3>
              <StaticTable
                columns={basicColumns}
                rows={basicRows.slice(0, 2)}
                size="lg"
              />
            </div>
          </div>
        </section>

        {/* Color Variants */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-pp-gray-800">
            Color Variants
          </h2>
          <p className="text-pp-gray-600">
            Tables with color-coded columns and rows. Row colors override column
            colors when both are specified.
          </p>
          <StaticTable columns={colorVariantColumns} rows={colorVariantRows} />
        </section>

        {/* Custom Render Functions */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-pp-gray-800">
            Custom Render Functions
          </h2>
          <p className="text-pp-gray-600">
            Custom rendering for complex content like avatars, links, progress
            bars, and action buttons.
          </p>
          <StaticTable columns={customRenderColumns} rows={customRenderRows} />
        </section>

        {/* Bordered and Compact Variants */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-pp-gray-800">
            Table Variants
          </h2>
          <p className="text-pp-gray-600">
            Different visual styles for various use cases.
          </p>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-2">Bordered</h3>
              <StaticTable
                columns={basicColumns}
                rows={basicRows.slice(0, 3)}
                variant="bordered"
              />
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">Compact</h3>
              <StaticTable
                columns={basicColumns}
                rows={basicRows.slice(0, 3)}
                variant="compact"
              />
            </div>
          </div>
        </section>

        {/* Loading State */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-pp-gray-800">
            Loading State
          </h2>
          <p className="text-pp-gray-600">
            Table showing loading spinner when data is being fetched.
          </p>
          <StaticTable columns={basicColumns} rows={basicRows} loading />
        </section>

        {/* Empty State */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-pp-gray-800">
            Empty State
          </h2>
          <p className="text-pp-gray-600">
            Default and custom empty states when no data is available.
          </p>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-2">Default Empty State</h3>
              <StaticTable columns={basicColumns} rows={[]} />
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">Custom Empty State</h3>
              <StaticTable
                columns={basicColumns}
                rows={[]}
                emptyState={
                  <div className="text-center py-8">
                    <svg
                      className="w-16 h-16 mx-auto text-pp-gray-300 mb-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    <h3 className="text-lg font-medium text-pp-gray-900 mb-2">
                      No users found
                    </h3>
                    <p className="text-pp-gray-500">
                      Try adjusting your search criteria or add some users.
                    </p>
                    <button className="mt-4 px-4 py-2 bg-pp-blue-600 text-white rounded-lg hover:bg-pp-blue-700">
                      Add User
                    </button>
                  </div>
                }
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
