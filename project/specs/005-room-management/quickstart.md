# Quickstart: Room Management & Presence

## Key Flows

### Host Creates Room
1. Host lands on landing page
2. Enters display name → clicks "Create Room"
3. Redirected to Host Dashboard with unique Room ID
4. "Copy Invite Link" button copies `https://domain.com/#/join/ABC123` to clipboard

### Peer Joins Room
1. Peer opens invite link → Join form with pre-filled Room ID
2. Peer enters display name → clicks "Join"
3. Connection established → Peer sees Host's name and participant list

### Live Participant List
1. As Peers join, their names appear on all screens within 1 second
2. When a Peer disconnects, their name is removed

## Message Protocol

| Direction | Message | Payload | Description |
|-----------|---------|---------|-------------|
| Peer → Host | `join` | `{ type: "join", name: "Alice" }` | Peer requests to join |
| Host → Peer | `joined` | `{ type: "joined", roomId, participants }` | Confirm join with state |
| Host → All | `presence-update` | `{ type: "presence-update", participants }` | Participant list changed |

## Edge Cases
- **Duplicate names**: Appended with "(2)", "(3)" etc.
- **Invalid Room ID**: "Room Not Found" error on Peer side
- **Slow connection**: "Connecting..." state during handshake
