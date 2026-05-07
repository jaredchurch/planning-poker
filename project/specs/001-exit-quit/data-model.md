# Data Model: Exit-Quit Session

## Session

| Field | Type | Description |
|-------|------|-------------|
| roomId | string | Unique identifier for the room |
| hostId | string | PeerJS ID of the Host |
| status | "active" \| "closed" | Whether the session is live |
| participants | Participant[] | Active participants in the session |

**State transitions**: `active` → `closed` (Host closes session)

## Participant

| Field | Type | Description |
|-------|------|-------------|
| id | string | PeerJS connection ID |
| name | string | Display name |
| role | "host" \| "peer" | Whether this user is the Host or a Peer |
| connectionStatus | "connected" \| "disconnected" | Current connection state |
| voteStatus | "none" \| "voted" | Whether the participant has cast a vote |

**State transitions**: 
- `connected` → `disconnected` (graceful exit, tab close, or heartbeat timeout)
- `none` → `voted` (Peer casts vote - handled by voting-loop feature)

## Validation Rules

- `roomId`: Must be non-empty, unique per session
- `name`: Must be at least 2 characters
- Session can only have one Host
- `connectionStatus` transitions to `disconnected` must trigger participant list sync
