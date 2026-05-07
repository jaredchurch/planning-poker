# Data Model: CSV Export

## SessionResult

| Field | Type | Description |
|-------|------|-------------|
| items | ExportedItem[] | All items that have been voted on |

## ExportedItem

| Field | Type | Description |
|-------|------|-------------|
| issueKey | string | Issue identifier (e.g., "PROJ-123") |
| summary | string | Issue title |
| individualVotes | Record<string, number \| string> | Map of participant name → vote value |
| finalConsensus | number \| string \| null | Editable consensus value (defaults to mode) |

## ExportConfig

| Field | Type | Description |
|-------|------|-------------|
| filename | string | Generated filename with date |
| format | "rfc4180" | Always RFC 4180 |
