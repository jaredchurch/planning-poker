# Quickstart: Session Configuration

## Updating Settings
All settings changes should be initiated by the Host through the `useRoomSettings` hook.

```typescript
import { useRoomSettings } from './hooks/useRoomSettings';

const { updateSettings } = useRoomSettings();

// Example: Toggling Auto-Reveal
updateSettings({ autoRevealEnabled: true });
```

## Listening for Changes
Peers automatically receive setting updates via the P2P data channel. The `RoomProvider` should handle the `SETTINGS_UPDATED` message and update the global context.

## Scale Definitions
When adding a new scale, update `src/utils/scales.ts`:
1. Add the scale key to the `ScaleType` union.
2. Define the labels and values in the `SCALES` constant.
3. Update the `ScaleSelector` component.

## Persistence
Settings are automatically saved to `localStorage` whenever the Host calls `updateSettings`.
