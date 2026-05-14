# Research: Item Management (Backlog CRUD)

## Unknowns & Investigations

| Unknown | Investigation Task | Findings |
|---------|-------------------|----------|
| Drag-and-Drop Reordering | Evaluate simple libraries for React 19. | `dnd-kit` is the modern choice for React 19. However, for a "minimalist" approach, simple "Move Up/Down" buttons or native HTML5 DnD are also viable. Decision: Start with simple buttons for accessibility and minimalism; add `dnd-kit` only if the UX feels sluggish. |
| P2P Reorder Sync | Strategy for syncing list order efficiently. | Instead of sending the full list on every move, send a `REORDER_ITEM` message with `{ itemId, newIndex }`. The Host's state remains the source of truth. |
| Persistence Strategy | How to merge Jira items with manual items in LocalStorage. | Use a unified `sessionItems` array in LocalStorage. Store the source (Jira/Manual) on each item object. |

## Technology Decisions

### Decision 1: `uuid` for Manual Items
- **Rationale**: Manual items need unique IDs that don't collide with Jira keys.
- **Approach**: Use a small utility like `crypto.randomUUID()` to generate IDs for manual items.

### Decision 2: Optimistic UI Updates
- **Rationale**: Host should see changes immediately.
- **Approach**: Update the Host's state immediately upon CRUD action, then fire the P2P broadcast. If broadcast fails (rare in P2P), the Host still has the updated state locally.

### Decision 3: "Active Item" Logic
- **Rationale**: Deleting an item currently being voted on is a critical edge case.
- **Approach**: If the item with `id === activeItemId` is deleted, trigger a `CLEAR_ACTIVE_ITEM` broadcast to all Peers.

## Alternatives Considered
- **IndexedDB**: Rejected for LocalStorage as the backlog size is small enough to fit in the 5MB limit and LocalStorage is easier to implement.
- **Full List Sync**: Sending the entire list on every edit. Rejected in favor of delta-updates (CREATE/UPDATE/DELETE/MOVE) to minimize P2P traffic.
