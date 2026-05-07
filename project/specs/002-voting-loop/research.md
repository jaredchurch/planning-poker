# Research: Core Voting Loop

## Voting Scales

**Decision**: Define scales as static config arrays. Support three modes:

| Scale | Values |
|-------|--------|
| Fibonacci | 1, 2, 3, 5, 8, 13, 21, More Info Needed |
| T-Shirt | XS, S, M, L, XL, ?, More Info Needed |
| Integers | 1-10, More Info Needed |

**Rationale**: Spec FR-001 and FR-002 require these explicitly. Static arrays are simple and testable.

## Hidden/Reveal State

**Decision**: Boolean `isRevealed` flag on the current voting round. Host toggles it.

**Rationale**: PeerJS broadcasts the flag. All clients render cards as back (hidden) or front (revealed) based on this flag. Simple state machine.

## Auto-Reveal

**Decision**: Host checks after each vote: if all connected Peers have voted AND auto-reveal is toggled ON, trigger reveal automatically.

**Rationale**: FR-005. Should be optional per FR-005 (SHOULD, not MUST). Host-controlled toggle in settings.

## Consensus Calculation

**Decision**: On reveal, compute per FR-009/FR-010:
- If all votes within ±1 step on the scale → consensus defaults to mode (most common value)
- If spread >1 step → flag item for discussion, highlight min and max voters
- Host can override (FR-012)

## Re-vote

**Decision**: Host triggers re-vote (FR-011). Clears all votes from current round, sets `isRevealed = false`, broadcasts reset.

## Voter Disconnect Edge Case

**Decision**: Per spec edge case — if a Peer disconnects after voting but before reveal, their vote is removed from the tally (consistent with 001-exit-quit US1-AS3).
