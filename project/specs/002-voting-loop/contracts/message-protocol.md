# Message Protocol: Core Voting Loop

## Common Format

```typescript
interface Message {
  type: string;
  [key: string]: unknown;
}
```

## Messages

### `vote` (Peer → Host)

```json
{ "type": "vote", "value": 5 }
```

**Host behavior**: Record vote, update participant's voteStatus to "voted", broadcast `vote-update`. If auto-reveal enabled and all voted, trigger reveal.

### `vote-update` (Host → All)

```json
{ "type": "vote-update", "participantId": "peerjs-id", "voteStatus": "voted" }
```

**Peer behavior**: Update participant list to show who has voted (no value).

### `reveal` (Host → All)

```json
{ "type": "reveal", "votes": [{"participantId": "...", "value": 5}, ...], "consensus": 5 }
```

**Peer behavior**: Display all votes with values and consensus indicator.

### `focus-item` (Host → All)

```json
{ "type": "focus-item", "itemId": "item-123" }
```

**Peer behavior**: Switch active item display, clear voting UI for new round.

### `re-vote` (Host → All)

```json
{ "type": "re-vote" }
```

**Peer behavior**: Clear local vote state, return to hidden state for current item.

### `next-item` (Host → All)

```json
{ "type": "next-item" }
```

**Peer behavior**: Clear votes, show next item in hidden state.
