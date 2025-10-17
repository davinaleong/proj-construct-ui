# Components

## Status Legend

- ✅ **Complete** - Fully implemented and tested
- 📋 **Planned** - In backlog, not yet implemented

---

## 🧱 1. Core Foundation

| Component         | Status | Description                                                     | Key Props                                                       |
| ----------------- | ------ | --------------------------------------------------------------- | --------------------------------------------------------------- |
| **ThemeProvider** | ✅     | Provides light/dark/paper mode theme context                    | `theme`, `accentColor`, `radius`, `elevation`                   |
| **Paper**         | ✅     | Core surface element with elevation, border, and subtle texture | `variant` ("flat", "elevated", "outlined"), `padding`, `radius` |
| **Typography**    | ✅     | Handles consistent text hierarchy                               | `variant` ("h1", "h2", "body", "caption"), `weight`, `color`    |
| **Icon**          | ✅     | Wrapper around Lucide or Material icons                         | `name`, `size`, `color`                                         |
| **Container**     | ✅     | Constrains width of sections or pages                           | `maxWidth`, `padding`, `center`                                 |
| **Brand**         | ✅     | Logo and brand text component for headers                       | `size`, `showLogo`, `showText`, `title`, `subtitle`, `onClick`  |

---

## 🧭 2. Layout & Structure

| Component                | Status | Description                                             | Key Props                                                                            |
| ------------------------ | ------ | ------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| **Grid**                 | ✅     | Responsive CSS Grid layout with auto-fit support        | `columns`, `gap`, `align`, `justify`, `autoFit`, `minColumnWidth`, `className`, `as` |
| **Stack / Flex**         | ✅     | Utility layout wrappers (direction, gap, alignment)     | `direction`, `gap`, `align`, `justify`                                               |
| **Card**                 | ✅     | Used for sections, summaries, or dashboard widgets      | `title`, `subtitle`, `actions`, `variant`                                            |
| **Section / Panel**      | ✅     | Reusable content section with header/footer             | `title`, `footer`, `padding`                                                         |
| **Divider / Separator**  | ✅     | Content divider with labels, icons, and styling options | `orientation`, `variant`, `size`, `color`, `spacing`, `label`, `icon`, `decorative`  |
| **Avatar / AvatarGroup** | ✅     | Rounded profile pictures                                | `src`, `alt`, `size`, `status`                                                       |
| **Badge**                | ✅     | Small status indicator                                  | `color`, `variant`, `icon`, `text`                                                   |

---

## 🧰 3. Form Controls

| Component                 | Status | Description                          | Key Props                                                                   |
| ------------------------- | ------ | ------------------------------------ | --------------------------------------------------------------------------- |
| **Button**                | ✅     | Primary action trigger               | `variant` ("solid", "outline", "ghost", "link"), `color`, `icon`, `loading` |
| **IconButton**            | ✅     | Square/round button for icons        | `icon`, `ariaLabel`, `size`, `variant`                                      |
| **Input**                 | ✅     | Text input field                     | `label`, `placeholder`, `error`, `helperText`, `iconLeft`, `iconRight`      |
| **Textarea**              | ✅     | Multiline text input                 | `rows`, `label`, `error`, `resize`                                          |
| **Select / Dropdown**     | ✅     | Choose from list                     | `label`, `options`, `value`, `onChange`, `searchable`                       |
| **Checkbox**              | ✅     | Binary toggle with label             | `checked`, `label`, `disabled`                                              |
| **Radio / RadioGroup**    | ✅     | Select one option from a group       | `name`, `value`, `options`, `orientation`, `size`, `error`, `onChange`      |
| **Switch / Toggle**       | ✅     | On/off switch                        | `checked`, `size`, `color`                                                  |
| **Slider**                | ✅     | Range selector                       | `min`, `max`, `step`, `value`, `onChange`                                   |
| **FileUpload**            | ✅     | Styled upload dropzone               | `multiple`, `accept`, `onUpload`, `preview`                                 |
| **FormField / FormGroup** | ✅     | Wrapper for field label + error text | `label`, `required`, `hint`, `error`                                        |

---

## 📊 4. Data Display

| Component                        | Status | Description                                 | Key Props                                                                                |
| -------------------------------- | ------ | ------------------------------------------- | ---------------------------------------------------------------------------------------- |
| **Static Table**                 | ✅     | Data presentation table with color variants | `columns`, `rows`, `variant`, `size`, `striped`, `colorVariant`, `loading`, `emptyState` |
| **Table**                        | 📋     | Sortable, responsive data grid              | `columns`, `rows`, `sortable`, `onSort`, `pagination`                                    |
| **DataList / DescriptionList**   | 📋     | Key-value pairs (e.g., details page)        | `items`, `dense`                                                                         |
| **Tag / Chip**                   | 📋     | Compact labels                              | `text`, `color`, `removable`, `icon`                                                     |
| **Tooltip**                      | 📋     | Hover info box                              | `content`, `placement`                                                                   |
| **ProgressBar / ProgressCircle** | 📋     | Visual progress indicators                  | `value`, `max`, `color`, `label`                                                         |
| **EmptyState**                   | 📋     | Placeholder for empty views                 | `icon`, `title`, `description`, `action`                                                 |
| **Statistic / KPI**              | 📋     | Large numeric display                       | `label`, `value`, `trend`                                                                |
| **Timeline**                     | 📋     | Sequential events                           | `items`, `orientation`                                                                   |

---

## 🧭 5. Navigation

| Component            | Status | Description                            | Key Props                               |
| -------------------- | ------ | -------------------------------------- | --------------------------------------- |
| **FloatingNavbar**   | ✅     | Floating navigation with positioning   | `items`, `position`, `offset`           |
| **Navbar / Topbar**  | 📋     | App-wide header with brand and actions | `logo`, `links`, `actions`, `userMenu`  |
| **Sidebar / Drawer** | 📋     | Collapsible navigation menu            | `items`, `collapsed`, `onToggle`        |
| **Breadcrumbs**      | 📋     | Navigation trail                       | `items`, `separator`                    |
| **Tabs**             | 📋     | Horizontal or vertical tab control     | `tabs`, `active`, `onChange`, `variant` |
| **Pagination**       | 📋     | Page navigation control                | `page`, `total`, `onChange`             |
| **Stepper**          | 📋     | For multi-step forms                   | `steps`, `current`, `onStepChange`      |
| **CommandPalette**   | 📋     | Keyboard-searchable command list       | `commands`, `onSelect`                  |

---

## 💬 6. Feedback & Alerts

| Component                   | Status | Description                                   | Key Props                                            |
| --------------------------- | ------ | --------------------------------------------- | ---------------------------------------------------- |
| **Alert / Banner**          | 📋     | Inline notice (info, warning, error, success) | `variant`, `icon`, `title`, `message`, `dismissible` |
| **Toast / Snackbar**        | 📋     | Temporary popup notification                  | `type`, `message`, `duration`, `action`              |
| **Modal / Dialog**          | 📋     | Centered overlay for confirmations            | `title`, `open`, `onClose`, `actions`                |
| **ConfirmDialog**           | 📋     | Reusable yes/no prompt                        | `title`, `message`, `onConfirm`, `onCancel`          |
| **LoadingSpinner / Loader** | 📋     | Paper-style animated loader                   | `size`, `variant`, `text`                            |
| **Skeleton**                | 📋     | Placeholder for loading content               | `variant`, `height`, `width`                         |

---

## 🪟 7. Overlays & Interactive Elements

| Component                   | Status | Description                  | Key Props                         |
| --------------------------- | ------ | ---------------------------- | --------------------------------- |
| **Popover**                 | 📋     | Floating info box            | `trigger`, `content`, `placement` |
| **DropdownMenu**            | 📋     | Contextual menu              | `items`, `align`, `onSelect`      |
| **ContextMenu**             | 📋     | Right-click actions          | `items`, `onSelect`               |
| **Drawer (SlideOver)**      | 📋     | Panel that slides from side  | `open`, `onClose`, `position`     |
| **Backdrop / Overlay**      | 📋     | Dim background behind modals | `visible`, `onClick`              |
| **Lightbox / ImagePreview** | 📋     | Fullscreen image viewer      | `images`, `startIndex`, `onClose` |

---

## ⚙️ 8. Utilities / Special

| Component                        | Status | Description                           | Key Props                            |
| -------------------------------- | ------ | ------------------------------------- | ------------------------------------ |
| **SearchBar / SearchInput**      | 📋     | Unified search field                  | `placeholder`, `onSearch`, `loading` |
| **FilterBar / SortMenu**         | 📋     | Filter/sort controls                  | `filters`, `onFilter`, `onSort`      |
| **DatePicker / DateRangePicker** | 📋     | Calendar input                        | `value`, `onChange`, `range`         |
| **BreadcrumbHeader**             | 📋     | Combined heading + breadcrumb pattern | `title`, `path`, `actions`           |
| **ThemeToggle**                  | 📋     | Switch between light/paper/dark       | `theme`, `onToggle`                  |
| **ScrollArea / ScrollToTop**     | 📋     | Custom scroll behavior                | `autoHide`, `smooth`                 |
| **ErrorBoundary**                | 📋     | Fallback UI for crashes               | `fallback`, `onRetry`                |
| **ClipboardButton**              | 📋     | Copy-to-clipboard                     | `text`, `tooltip`, `onCopy`          |

---

## 🌿 Optional Premium / UX Extras (for polish)

| Component              | Status | Description                             | Key Props                        |
| ---------------------- | ------ | --------------------------------------- | -------------------------------- |
| **CommandBar**         | 📋     | Contextual toolbar with grouped actions | `groups`, `onAction`             |
| **ActivityItem**       | 📋     | For recent activity feeds               | `icon`, `title`, `timestamp`     |
| **NotificationCenter** | 📋     | Aggregated notifications                | `items`, `onRead`, `onClear`     |
| **UserMenu**           | 📋     | Profile dropdown with avatar            | `user`, `menuItems`              |
| **ThemePreview**       | 📋     | Show paper theme samples                | `themes`, `selected`, `onSelect` |

---

## 🔧 Component Spotlight: Recent Enhancements

### Grid Component ✅ **ENHANCED**

The Grid component has been significantly enhanced with comprehensive functionality:

#### **Responsive Grid System**

```tsx
<Grid columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}>
  {/* Content automatically adjusts across breakpoints */}
</Grid>
```

#### **Auto-fit Functionality**

```tsx
<Grid autoFit minColumnWidth={20}>
  {/* Columns automatically fit based on content and min width */}
</Grid>
```

#### **Advanced Configuration**

```tsx
<Grid
  columns={{ md: 2, lg: 3 }}
  gap="lg"
  align="center"
  justify="between"
  className="custom-grid"
>
  {/* Fully customizable layout */}
</Grid>
```

#### **Key Features**

- **TypeScript Integration**: Full type safety with HTMLAttributes forwarding
- **Responsive Logic**: Intelligent base column detection from responsive configurations
- **Edge Case Handling**: Graceful defaults for empty configs and missing breakpoints
- **Comprehensive Testing**: 21 test cases covering all functionality and edge cases
- **Accessibility**: Proper semantic markup and ARIA attribute support

### StaticTable Component ✅ **NEW**

The StaticTable component provides a comprehensive data presentation solution with color variants and flexible customization:

#### **Basic Data Table**

```tsx
<StaticTable
  columns={[
    { key: "id", label: "ID", align: "center" },
    { key: "name", label: "Name", align: "left" },
    { key: "status", label: "Status", align: "center" },
  ]}
  rows={[
    { id: 1, name: "John Doe", status: "Active" },
    { id: 2, name: "Jane Smith", status: "Inactive" },
  ]}
/>
```

#### **Color Variants for Rows and Columns**

```tsx
<StaticTable
  columns={[
    { key: "name", label: "Name", colorVariant: "primary" },
    { key: "status", label: "Status", colorVariant: "success" },
  ]}
  rows={[
    { id: 1, name: "John", status: "Active", colorVariant: "success" },
    { id: 2, name: "Jane", status: "Warning", colorVariant: "warning" },
  ]}
  striped
/>
```

#### **Custom Render Functions**

```tsx
<StaticTable
  columns={[
    {
      key: "progress",
      label: "Progress",
      render: (value) => (
        <div className="flex items-center">
          <div className="w-16 bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full"
              style={{ width: `${value}%` }}
            />
          </div>
          <span className="ml-2">{value}%</span>
        </div>
      ),
    },
  ]}
  rows={[{ id: 1, progress: 75 }]}
/>
```

#### **Key Features**

- **Color Variants**: 8 built-in color themes (default, primary, secondary, success, warning, error, info, neutral)
- **Flexible Styling**: Multiple table variants (default, striped, bordered, compact) and sizes (sm, md, lg)
- **Custom Renderers**: Full control over cell content with render functions
- **Loading & Empty States**: Built-in loading spinner and customizable empty state messages
- **Accessibility**: Proper table semantics, ARIA attributes, and screen reader support
- **TypeScript Support**: Full type safety with comprehensive interfaces
- **Comprehensive Testing**: 15+ test suites covering all functionality and edge cases

---

### 🎨 Theming & Style Notes (Paper Theme)

- Use **off-white base** (`#faf9f6` or `pp-paper-50`)
- Subtle **grain or texture** background (optional CSS `background-image`)
- **Soft shadows** (`shadow-sm` to `shadow-md` in Tailwind)
- **Rounded corners** (`rounded-2xl`)
- Use **desaturated accent colors** (e.g., `pp-teal-600`, `pp-gray-800`)
- Maintain **consistent spacing scale** (4/8/16 px system)
- Keep **interactive states tactile**: light press effect + hover depth
