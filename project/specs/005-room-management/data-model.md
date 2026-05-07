# Data Model: Room Management & Presence

## Room

| Field | Type | Description |
|-------|------|-------------|
| roomId | string | Unique room identifier (6-char alphanumeric) |
| hostPeerId | string | Host's PeerJS ID |
| status | "waiting" \| "active" \| "closed" | Room lifecycle state |
| participants | Participant[] | Active participants |

## Participant

| Field | Type | Description |
|-------|------|-------------|
| id | string | PeerJS connection ID |
| name | string | Display name (deduplicated with suffix) |
| role | "host" \| "peer" | Role in the room |
| joinedAt | timestamp | When the participant connected |

## PresenceList

| Field | Type | Description |
|-------|------|-------------|
| participants | Participant[] | Current participants (synchronized to all) |
| hostId | string | The Host's participant ID |

## Validation Rules

- `name`: Must be >= 2 characters (FR-007)
- `roomId`: Must be 6 alphanumeric characters
- `status`: Only one room per Host session
