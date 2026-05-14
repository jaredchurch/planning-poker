# Data Model: Session Configuration

## SessionSettings

| Field | Type | Description |
|-------|------|-------------|
| `scaleType` | `'fibonacci' \| 'tshirt' \| 'integers'` | The active voting scale. |
| `autoRevealEnabled` | `boolean` | Whether results are revealed automatically when all have voted. |
| `isLocked` | `boolean` | Whether the room is currently rejecting new Peer connections. |
| `consensusAlgorithm` | `'majority' \| 'average' \| 'weighted'` | Logic used for the suggested consensus. |
| `includeMoreInfo` | `boolean` | Whether to show the "More Info Needed" card. |

## P2P Messages (Settings Updates)

### `SETTINGS_UPDATED`
- **Payload**: `{ settings: SessionSettings }`
- **Action**: Overwrite the local settings state for all participants.

## LocalStorage Schema

- **Key**: `pp_host_config`
- **Value**: `SessionSettings` (JSON string)
