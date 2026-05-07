# Quickstart: CSV Export

## Key Flow

1. Host has completed voting rounds with revealed results
2. Host reviews consensus values in the item list (can edit inline)
3. Host clicks "Export CSV"
4. If duplicate issue keys detected → conflict resolution dialog appears
5. Browser downloads `planning-poker-results-YYYY-MM-DD.csv`

## CSV Columns

| Column | Content |
|--------|---------|
| Issue Key | e.g., PROJ-123 |
| Summary | Issue title (RFC 4180 escaped) |
| Individual Votes | e.g., "Alice: 5, Bob: 8" |
| Final Consensus | e.g., 5 (editable by Host) |

## Edge Cases Handled

- Special characters in summaries → proper CSV escaping
- Duplicate issue keys → conflict resolution dialog
- Mid-session export → includes all voted items up to that point
