import { StaticTable } from "./components/data-display/StaticTable"
import { StaticTableShowcase } from "./components/data-display/StaticTable/StaticTableShowcase"

// Quick integration test component
export const StaticTableDemo = () => {
  const sampleColumns = [
    { key: "id", label: "ID", align: "center" as const, width: "80px" },
    {
      key: "name",
      label: "Name",
      align: "left" as const,
      colorVariant: "primary" as const,
    },
    {
      key: "status",
      label: "Status",
      align: "center" as const,
      colorVariant: "success" as const,
    },
  ]

  const sampleRows = [
    { id: 1, name: "John Doe", status: "Active" },
    {
      id: 2,
      name: "Jane Smith",
      status: "Inactive",
      colorVariant: "warning" as const,
    },
    {
      id: 3,
      name: "Bob Johnson",
      status: "Pending",
      colorVariant: "info" as const,
    },
  ]

  return (
    <div className="p-8 bg-pp-paper-50 min-h-screen">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-pp-gray-900">
          StaticTable Integration Test
        </h1>

        <section>
          <h2 className="text-xl font-semibold mb-4">Basic Table</h2>
          <StaticTable columns={sampleColumns} rows={sampleRows} />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Striped Table</h2>
          <StaticTable columns={sampleColumns} rows={sampleRows} striped />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Complete Showcase</h2>
          <StaticTableShowcase />
        </section>
      </div>
    </div>
  )
}
