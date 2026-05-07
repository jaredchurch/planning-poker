# Quickstart: Core Voting Loop

## Key Flows

### Peer Casts Vote
1. Peer sees active item and voting cards for the selected scale
2. Peer clicks a card → card highlights, status changes to "Voted"
3. Peer can click a different card to change vote before reveal
4. Host sees Peer's status as "Voted" but not the value

### Host Reveals Votes
1. Host clicks "Reveal Votes" → `isRevealed` broadcast to all
2. All participants see card values flip from backs to fronts
3. Consensus is calculated and displayed
4. Host clicks "Next Item" → votes cleared, new round begins

### Auto-Reveal
1. Host enables auto-reveal toggle
2. When last Peer votes, reveal triggers automatically

### Host Focuses Item
1. Host clicks "Focus" on an item → item becomes active
2. All Peers' UIs immediately show that item

## Message Protocol

| Direction | Message | Payload | Description |
|-----------|---------|---------|-------------|
| Peer → Host | `vote` | `{ type: "vote", value: 5 }` | Peer casts/changes vote |
| Host → All | `vote-update` | `{ type: "vote-update", participantId, voteStatus }` | Vote status changed |
| Host → All | `reveal` | `{ type: "reveal", votes: [...], consensus }` | Reveal all votes |
| Host → All | `focus-item` | `{ type: "focus-item", itemId }` | Set active item |
| Host → All | `re-vote` | `{ type: "re-vote" }` | Clear and restart round |
| Host → All | `next-item` | `{ type: "next-item" }` | Advance to next item |
