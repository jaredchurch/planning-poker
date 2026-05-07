# Data Model: Core Voting Loop

## VoteScale

| Field | Type | Description |
|-------|------|-------------|
| id | "fibonacci" \| "tshirt" \| "integers" | Scale identifier |
| values | (number \| string)[] | Available card values |
| label | string | Display name |

**Predefined scales**:
- Fibonacci: `[1, 2, 3, 5, 8, 13, 21, "More Info Needed"]`
- T-Shirt: `["XS", "S", "M", "L", "XL", "?", "More Info Needed"]`
- Integers: `[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, "More Info Needed"]`

## Vote

| Field | Type | Description |
|-------|------|-------------|
| participantId | string | Who cast the vote |
| value | number \| string | The selected card value |
| roundId | string | Which voting round this belongs to |

## VotingRound

| Field | Type | Description |
|-------|------|-------------|
| itemId | string | The item being voted on |
| scaleId | string | Which scale is active |
| isRevealed | boolean | Whether votes are visible |
| votes | Vote[] | Cast votes |
| autoReveal | boolean | Auto-reveal toggle |
| consensus | number \| string \| null | Calculated consensus value |

## Item

| Field | Type | Description |
|-------|------|-------------|
| id | string | Unique item identifier |
| key | string | Issue key (e.g., "PROJ-123") |
| summary | string | Issue summary/title |
| isActive | boolean | Whether this is the current focus item |

## State Transitions

- VotingRound: `isRevealed: false` → `isRevealed: true` (Host reveals or auto-reveal triggers)
- VotingRound: `isRevealed: true` → reset via re-vote (Host triggers FR-011)
- Item: any item → `isActive: true` (Host focuses, FR-007). Only one item active at a time.
