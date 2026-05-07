# Quickstart: Exit-Quit Session

## Key Flows

### Peer Exits Gracefully
1. Peer clicks "Exit" button
2. Confirmation dialog appears: "Are you sure you want to leave?"
3. Peer confirms → Peer sends `exit` message to Host
4. Host removes Peer from participant list → broadcasts updated list
5. Peer closes PeerJS connection → redirects to home screen

### Host Closes Session
1. Host clicks "Close Session" button
2. Confirmation dialog appears: "End the session for everyone?"
3. Host confirms → Host broadcasts `session-closed` message to all Peers
4. Each Peer shows "The Host has ended the session" → redirects to home screen
5. Host terminates all connections → redirects to home screen

### Unexpected Disconnection
1. Peer's tab closes or network drops
2. Host detects missing heartbeat pings after 10s timeout
3. Host marks Peer as disconnected → removes from participant list
4. Remaining Peers receive updated participant list

## Message Protocol (P2P)

| Direction | Message | Payload | Description |
|-----------|---------|---------|-------------|
| Peer → Host | `exit` | `{ type: "exit" }` | Peer wants to leave |
| Host → All | `session-closed` | `{ type: "session-closed" }` | Host ended session |
| Host → All | `participant-update` | `{ type: "participant-update", participants: [...] }` | Participant list changed |
| Host → Peer | `ping` | `{ type: "ping" }` | Heartbeat check |
| Peer → Host | `pong` | `{ type: "pong" }` | Heartbeat response |
