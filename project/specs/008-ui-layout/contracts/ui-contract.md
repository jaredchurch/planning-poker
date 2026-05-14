# UI Contract: App Shell Components

## Navigation Interface
The `Navigation` component must expose a consistent interface for session metadata.

```typescript
interface NavigationProps {
  roomCode?: string;
  userName?: string;
  isHost: boolean;
  connectionStatus: 'connecting' | 'connected' | 'disconnected';
  onExit: () => void;
  onCopyLink?: () => void;
}
```

## Responsive Grid Interface
The `ResponsiveGrid` serves as the primary orchestrator for the 3-panel system.

```typescript
interface ResponsiveGridProps {
  leftPanel?: React.ReactNode;   // Usually Backlog
  centerPanel: React.ReactNode; // Always Voting Board
  rightPanel?: React.ReactNode;  // Usually Participants
  variant: 'host' | 'peer';
}
```

## Mobile Drawer Interface
Used to overlay secondary panels on small viewports.

```typescript
interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}
```

## CSS Variable Contract
The application shell will use standard CSS variables for theme-consistent spacing and sizing.

| Variable | Default Value | Description |
|----------|---------------|-------------|
| `--header-height` | `64px` | Height of the global navigation bar. |
| `--sidebar-width` | `300px` | Width of the fixed side panels on desktop. |
| `--touch-target` | `44px` | Minimum size for interactive mobile elements. |
