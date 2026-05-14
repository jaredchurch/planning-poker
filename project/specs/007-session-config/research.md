# Research: Session Configuration & Host Settings

## Unknowns & Investigations

| Unknown | Investigation Task | Findings |
|---------|-------------------|----------|
| Scale Mapping | How to map votes when the scale changes. | Create a mapping utility that attempts to match values (e.g., "5" in Fibonacci to "5" in Integers) or identifies incompatible types (e.g., "M" in T-Shirt to Integers). Decision: Prompt the Host for "Clear" vs "Map". If "Map" is chosen, use a best-effort matching logic. |
| Persistence Pattern | Efficiently loading settings on room creation. | On app init, check `localStorage` for `pp_host_config`. If present, merge with default `SessionSettings` before broadcasting the first room state. |
| Room Locking | Enforcement logic in a P2P environment. | When `isLocked` is true, the Host's signaling handler should immediately close any incoming PeerJS connections with a specific "Locked" error code/message. |

## Technology Decisions

### Decision 1: Predefined Scales Utility
- **Rationale**: Ensure consistency between Host cards and Peer cards.
- **Approach**: Move scale definitions (Fibonacci, T-Shirt, Integers) to `src/utils/scales.ts` for reuse across the application.

### Decision 2: Sync Event `SETTINGS_UPDATED`
- **Rationale**: Lightweight synchronization.
- **Approach**: Broadcast a single `SETTINGS_UPDATED` message with the full `SessionSettings` object whenever any property changes.

### Decision 3: Atomic LocalStorage Updates
- **Rationale**: Prevent partial config corruption.
- **Approach**: Always write the full configuration object to `localStorage` as a single JSON string.

## Alternatives Considered
- **Cookie-based storage**: Rejected in favor of LocalStorage for simplicity and better capacity for structured data.
- **Peer-to-Peer configuration request**: Peers asking for settings. Rejected in favor of "Host Broadcasts on Change" to minimize P2P messages and maintain the Host as the authoritative source.
