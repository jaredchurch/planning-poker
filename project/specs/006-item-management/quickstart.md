# Quickstart: Item Management

## Adding a Manual Item
1. Open the Host Dashboard.
2. Click the "+" or "Add Item" button in the Backlog panel.
3. Fill in the summary and save.
4. Verify the item is broadcast to all Peers.

## Syncing Changes
All item updates should flow through the `itemService.ts`.

```typescript
// Example: Creating an item
import { createItem } from './services/itemService';

const newItem = await createItem({ summary: "New Task" });
// This will update local state, save to LocalStorage, and broadcast to Peers.
```

## Reordering Logic
The reorder logic should use the `arrayMove` pattern:
```typescript
const reorderedList = arrayMove(items, oldIndex, newIndex);
updateIndices(reorderedList); // Ensure orderIndex is updated
```
