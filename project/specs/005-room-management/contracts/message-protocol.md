# Message Protocol: Room Management & Presence

## Common Format

```typescript
interface Message {
  type: string;
  [key: string]: unknown;
}
```

## Messages

### `join` (Peer → Host)

Peer requests to join the room.

```json
{ "type": "join", "name": "Alice" }
```

**Host behavior**: Check for duplicate name (append suffix if needed). Add peer to presence list. Send `joined` response. Broadcast `presence-update` to all.

### `joined` (Host → Peer)

Confirms the peer has joined, provides initial state.

```json
{ "type": "joined", "roomId": "ABC123", "participants": [...] }
```

**Peer behavior**: Store room ID and participant list. Render dashboard with presence list.

### `presence-update` (Host → All)

Broadcast whenever a participant joins or leaves.

```json
{ "type": "presence-update", "participants": [...] }
```

**Peer behavior**: Update local participant list display.

### `leave` (Peer → Host) — shared with 001-exit-quit

```json
{ "type": "leave" }
```

**Host behavior**: Remove peer from presence list. Broadcast `presence-update`.
