import { Palette } from "lucide-react"
import { Paper, Typography, Icon } from "../components/core"

export function CoreComponentsDemo() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
      <Paper variant="elevated" padding="lg">
        <Typography variant="h4" className="mb-4">
          ThemeProvider
        </Typography>
        <Typography variant="bodySmall" color="muted">
          ✅ Context-based theme management with light, dark, and paper modes
        </Typography>
      </Paper>

      <Paper variant="outlined" padding="lg" withTexture>
        <Typography variant="h4" className="mb-4">
          Paper
        </Typography>
        <Typography variant="bodySmall" color="muted">
          ✅ Surface component with elevation, texture, and paper aesthetic
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
  )
}
