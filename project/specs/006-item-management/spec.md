# Feature Specification: Item Management (Backlog CRUD)

**Feature Branch**: `006-item-management`  
**Created**: 2026-05-14  
**Status**: Finalized  
**Input**: User description: "Item Management (Backlog CRUD): Allow the Host to manually add, edit, delete, and reorder items in the session list, including non-Jira items."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Host Adds Manual Item (Priority: P1)

As a Host, I want to manually add an item to the voting backlog so that our team can estimate tasks that are not currently in Jira.

**Why this priority**: Essential for sessions that don't use Jira or for ad-hoc items identified during the meeting.

**Independent Test**: Click "Add Item". Enter a title and description. Verify the item appears in the Host's backlog and is synchronized to all connected Peers.

**Acceptance Scenarios**:

1. **Given** I am the Host on the Dashboard, **When** I click "Add Item", **Then** a form appears asking for the item's Key (optional) and Summary.
2. **Given** I enter "Refactor Button Component" as the summary, **When** I save, **Then** the item is added to the bottom of the list and marked as a "Manual" item.
3. **Given** a new manual item is added, **When** I check a Peer's screen, **Then** they see the new item in their list immediately.

---

### User Story 2 - Host Edits/Updates Item (Priority: P1)

As a Host, I want to edit the summary or key of an existing item so that I can clarify the scope before voting begins.

**Why this priority**: Corrects typos or incorporates feedback from the team during the pre-voting discussion.

**Independent Test**: Click "Edit" on an item. Change the text. Save. Verify the updated text appears for both Host and Peers.

**Acceptance Scenarios**:

1. **Given** an item exists in the list, **When** I click the "Edit" icon, **Then** the text becomes an editable input field.
2. **Given** I have modified an item's summary, **When** I click "Save", **Then** the update is reflected in real-time on all participants' screens.

---

### User Story 3 - Host Deletes Item (Priority: P2)

As a Host, I want to remove an item from the backlog so that we don't spend time estimating tasks that are no longer relevant.

**Why this priority**: Keeps the session focused on the necessary items.

**Independent Test**: Click "Delete" on an item. Confirm. Verify the item is removed from the list for all participants.

**Acceptance Scenarios**:

1. **Given** an item in the backlog, **When** I click "Delete", **Then** the system prompts for confirmation.
2. **Given** I confirm the deletion, **When** the action completes, **Then** the item disappears from both Host and Peer dashboards.

---

### User Story 4 - Host Reorders Backlog (Priority: P2)

As a Host, I want to change the order of items in the backlog so that we can vote on them in priority order.

**Why this priority**: Optimizes the session flow by ensuring critical items are estimated first.

**Independent Test**: Move Item C above Item A. Verify the list order updates for the Host and all connected Peers.

**Acceptance Scenarios**:

1. **Given** multiple items in the list, **When** I drag an item to a new position, **Then** the list reflects the new order.
2. **Given** a reordered list, **When** a new Peer joins, **Then** they see the items in the current custom order.

### Edge Cases

- **Duplicate Keys**: If the Host manually enters a Key that already exists (e.g., from Jira), the system SHOULD highlight the conflict but allow it, as manual items might use placeholder keys.
- **Deleting the Active Item**: If the Host deletes the item currently being voted on, the system MUST clear the active item status and notify Peers.
- **Empty Summary**: The system MUST prevent saving an item with an empty summary.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST provide a "Manual Add" form for creating items without an external integration.
- **FR-002**: System MUST allow the Host to edit the summary of any item (manual or imported).
- **FR-003**: System MUST provide a deletion mechanism with a confirmation step to prevent accidental loss.
- **FR-004**: Host MUST be able to reorder items in the list (e.g., via drag-and-drop or "Move Up/Down" buttons).
- **FR-005**: All CRUD actions performed by the Host MUST be synchronized to all connected Peers in real-time.
- **FR-006**: Manual items MUST be persisted in the Host's local storage for the duration of the session.
- **FR-007**: System MUST allow adding items even if a voting round is currently in progress.

### Key Entities

- **BacklogItem**: The core data structure. Attributes: `id` (unique), `key` (optional), `summary`, `source` (Jira/Manual), `orderIndex`.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Adding a manual item takes < 1 second to appear on the Host's screen after clicking "Save".
- **SC-002**: Deletion or reordering updates are reflected on all Peers' screens in < 500ms.
- **SC-003**: 100% of backlog items are preserved if the Host refreshes their browser (via LocalStorage).

## Assumptions

- We assume the Host is the source of truth for the item list and order.
- We assume standard drag-and-drop libraries or simple button-based reordering are acceptable for the initial implementation.
