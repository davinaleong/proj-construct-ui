import { Typography } from "../components/core"
import {
  Grid,
  Stack,
  Flex,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from "../components/layout"

export function LayoutShowcase() {
  return (
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
                This card demonstrates the Stack layout with proper spacing.
              </Typography>
            </CardBody>
          </Card>
          <Card variant="outlined" padding="md">
            <CardBody>
              <Typography variant="body">Second card in the stack</Typography>
            </CardBody>
          </Card>
        </Stack>
      </div>

      {/* Flex Example */}
      <div className="mb-12">
        <Typography variant="h3" className="mb-4">
          Flex Layout
        </Typography>
        <Flex justify="between" align="center" gap="md" className="mb-4">
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
  )
}
