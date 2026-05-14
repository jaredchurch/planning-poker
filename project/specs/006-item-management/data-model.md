# Data Model: Item Management

## BacklogItem

| Field | Type | Description |
|-------|------|-------------|
| `id` | `string` | Unique identifier (UUID for manual, Jira Key for imported). |
| `key` | `string?` | Display key (e.g., "PROJ-123"). |
| `summary` | `string` | The title/description of the task. |
| `source` | `'manual' \| 'jira'` | The origin of the item. |
| `orderIndex` | `number` | Position in the backlog for custom sorting. |
| `status` | `'backlog' \| 'voting' \| 'voted'` | Current state of the item. |

## P2P Messages (Item Updates)

### `ITEM_CREATE`
- **Payload**: `{ item: BacklogItem }`
- **Action**: Add item to the list.

### `ITEM_UPDATE`
- **Payload**: `{ id: string, updates: Partial<BacklogItem> }`
- **Action**: Find item by ID and apply changes.

### `ITEM_DELETE`
- **Payload**: `{ id: string }`
- **Action**: Remove item and clear active state if it matches.

### `ITEM_REORDER`
- **Payload**: `{ id: string, newIndex: number }`
- **Action**: Move item to new position and shift others.
