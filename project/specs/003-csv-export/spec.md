# Feature Specification: CSV Export

**Feature Branch**: `003-csv-export`  
**Created**: 2026-05-07  
**Status**: Finalized  
**Input**: Item 3 from user request: "CSV Export"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Host Exports Results (Priority: P1)

As a Host, I want to export the results of our planning session to a CSV file so that I can easily import the estimates back into Jira or share them with stakeholders.

**Why this priority**: Core value for post-session workflow.

**Independent Test**: Complete a session with 3 items and various votes. Host clicks "Export to CSV". Verify a `.csv` file is downloaded with correct data.

**Acceptance Scenarios**:

1. **Given** I am the Host of a session with completed votes, **When** I click "Export CSV", **Then** my browser triggers a download of a file named `planning-poker-results-[date].csv`.
2. **Given** an exported CSV, **When** I open it in a spreadsheet tool, **Then** I see the following columns: `Issue Key`, `Summary`, `Individual Votes`, `Final Consensus`.
3. **Given** an item where "More Info Needed" was voted, **When** I export the CSV, **Then** that value is correctly represented in the `Individual Votes` column.

### Edge Cases

- **Mid-Session Export**: The Host MUST be able to export results at any point during a session. Subsequent exports will include all items voted on up to that point.
- **Duplicate Issue Keys**: If the Host attempts to add or export items with duplicate Issue Keys, the system MUST generate an error message. The Host MUST then choose to either:
    1. Ignore/Remove one of the duplicates.
    2. Have the system generate an additional unique suffix for the keys to differentiate them.

### Functional Requirements

- **FR-001**: Only the Host MUST have the ability to trigger the CSV export.
- **FR-002**: CSV MUST include all items that were voted on during the current session up to the moment of export.
- **FR-003**: The `Individual Votes` column MUST list all participants' names and their respective votes (e.g., "Alice: 5, Bob: 8").
- **FR-004**: The `Final Consensus` column MUST be editable by the Host within the UI before export, or defaulted to the most frequent vote.
- **FR-005**: Export MUST handle special characters in the Issue Summary (e.g., commas, quotes) to ensure CSV integrity.
- **FR-006**: System MUST use a standard RFC 4180 compliant CSV format.
- **FR-007**: System MUST provide a conflict resolution UI for duplicate Issue Keys as described in Edge Cases.

### Key Entities

- **SessionResult**: The collection of items, votes, and consensus values for the current room.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Export file is generated and download starts in < 2 seconds.
- **SC-002**: 100% of items with at least one vote are included in the export.
- **SC-003**: CSV is readable by standard tools (Excel, Google Sheets, Jira Import).

## Assumptions

- We assume the Host's browser supports the `Blob` and `URL.createObjectURL` APIs for client-side file generation.
- We assume the session history is kept in the Host's local state during the session.
