# Data Model: Responsive App Shell

## Viewport State

| Field | Type | Description |
|-------|------|-------------|
| `currentBreakpoint` | `'sm' \| 'md' \| 'lg' \| 'xl'` | Current Tailwind breakpoint category. |
| `deviceType` | `'mobile' \| 'tablet' \| 'desktop'` | Simplified category for layout decisions. |
| `isDrawerOpen` | `boolean` | State of the mobile participant drawer. |
| `activeScreen` | `'landing' \| 'join' \| 'dashboard'` | The currently rendered top-level view. |

## Layout Entities

### AppShell
The root layout component that persists across all views.
- **Properties**:
  - `showNavigation`: boolean
  - `roomInfo`: `{ id, hostName, status }`
  - `user`: `{ name, role }`

### ResponsiveGrid
A component that dynamically adjusts column count.
- **Configuration**:
  - Desktop: 3 columns (Backlog, Voting, Participants)
  - Tablet: 2 columns (Backlog/Voting, Participants)
  - Mobile: 1 column (Voting/Item Focus)

## State Transitions

1. **Initial Load**: Landing Page (Default Shell).
2. **Create/Join Action**: Transition to Join Form or direct to Dashboard.
3. **Session Termination**: Transition back to Landing with notification.
4. **Window Resize**: Update `ViewportState` and reflow columns.
