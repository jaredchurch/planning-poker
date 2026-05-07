# Message Protocol: Session Management

## Overview

All messages are serialized as JSON strings and sent over PeerJS data channels. The Host maintains the authoritative state.

## Common Format

```typescript
interface Message {
  type: string;
  [key: string]: unknown;
}
```

## Messages

### `exit` (Peer → Host)

Peer signals intention to leave the session.

```json
{ "type": "exit" }
```

**Host behavior**: Remove Peer from participant list, broadcast `participant-update`, close the Peer connection.

### `session-closed` (Host → All Peers)

Host terminates the entire session.

```json
{ "type": "session-closed" }
```

**Peer behavior**: Display "The Host has ended the session" message, redirect to home screen, close connection.

### `participant-update` (Host → All Peers)

Broadcast the current participant list whenever a join/leave/exit event occurs.

```json
{
  "type": "participant-update",
  "participants": [
    { "id": "peerjs-id-1", "name": "Alice", "role": "host", "connectionStatus": "connected", "voteStatus": "none" },
    { "id": "peerjs-id-2", "name": "Bob", "role": "peer", "connectionStatus": "connected", "voteStatus": "none" }
  ]
}
```

### `ping` / `pong` (Host ↔ Peer)

Heartbeat mechanism for unexpected disconnection detection.

```json
{ "type": "ping" }
```
```json
{ "type": "pong" }
```

**Host behavior**: Send `ping` every 3s. Expect `pong` within 10s. If timeout, mark Peer as disconnected, broadcast `participant-update`.

## Error Handling

- Malformed messages: Silently drop, no retry
- Connection closed unexpectedly: Treat as disconnection, trigger heartbeat timeout cleanup
