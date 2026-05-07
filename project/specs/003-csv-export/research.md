# Research: CSV Export

## CSV Format

**Decision**: Use RFC 4180 compliance. Columns:

```
Issue Key,Summary,Individual Votes,Final Consensus
PROJ-123,Add login page,"Alice: 5, Bob: 8",5
```

**Rationale**: FR-006 requires RFC 4180. Individual votes column uses `Name: Value` pairs comma-separated within quoted fields. Special characters (commas, quotes) in summaries are properly escaped per RFC 4180.

## File Naming

**Decision**: `planning-poker-results-YYYY-MM-DD.csv`

**Rationale**: Spec US1-AS1 requires date in filename. ISO date format is unambiguous.

## Consensus Editing

**Decision**: Inline editable field in UI before export (FR-004). Host can click the consensus value and type a replacement.

**Rationale**: FR-004 explicitly requires Host editing capability before export.

## Duplicate Issue Keys

**Decision**: Before export, scan for duplicate keys. If found, show a dialog asking Host to:
1. Remove one of the duplicates
2. Auto-generate unique suffix

**Rationale**: Spec edge case requires this handling.

## Mid-Session Export

**Decision**: Export all items that have at least one vote at time of export. No restriction on timing.

**Rationale**: Spec edge case explicitly allows mid-session export.
