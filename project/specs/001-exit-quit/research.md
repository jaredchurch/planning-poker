# Research: Exit-Quit Session

## Peer Disconnection Detection

**Decision**: Use PeerJS `close` event for graceful exits; supplement with custom heartbeat pings for unexpected disconnections.

**Rationale**: PeerJS fires `close` when a peer intentionally disconnects, but tab closes or network drops may not trigger it reliably. A heartbeat mechanism (Peer sends `ping` every 3s, Host expects within 10s) covers the gap.

**Alternatives considered**:
- Rely solely on PeerJS `close` event — unreliable for unexpected disconnects
- Browser `beforeunload` event — catches tab close but not network loss

## Heartbeat Timing

**Decision**: Host sends `ping` every 3s; Peer responds with `pong`. If Host receives no `pong` within 10s, Peer is marked disconnected.

**Rationale**: Aligns with SC-004 (10s timeout). 3s interval provides 3 missed pings before timeout, avoiding false positives from transient lag.

## Rejoining Strategy

**Decision**: Peer that quits and rejoins with the same name is treated as a new connection. The Host reassigns a new connection ID.

**Rationale**: The spec's Rejoining edge case asks for clarification. Treating as new is simplest — the old session state (votes, etc.) was already cleaned up on exit per FR-008 and US1-AS3.

## Last User Reveal Edge Case

**Decision**: If a Peer exits while they were the last needed vote for auto-reveal, the system should NOT auto-reveal. The voting round remains open; the Host must manually manage.

**Rationale**: Exiting is an explicit action. Treating it the same as "voted" would be confusing. The peer's vote was already removed (US1-AS3).

## Browser Confirmation Dialog

**Decision**: Use `beforeunload` event for Host refresh/close prevention (per spec edge case). Not applied to Peers — their unexpected disconnect is handled by heartbeat.

**Rationale**: Host termination affects all participants; Peer tab close is just a single disconnect.
