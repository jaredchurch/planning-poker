# Feature Specification: Core Voting Loop

**Feature Branch**: `002-voting-loop`  
**Created**: 2026-05-07  
**Status**: Draft  
**Input**: Items 1 from user request: "Core Voting Loop"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Peer Casts a Vote (Priority: P1)

As a participant (Peer), I want to select a voting card that represents my estimate so that my contribution is recorded for the current item.

**Why this priority**: Fundamental action of the application.

**Independent Test**: Connect a Peer. Display voting cards. Click a card. Verify the UI indicates the vote is "cast" and the Host sees that this Peer has voted (without seeing the value).

**Acceptance Scenarios**:

1. **Given** I am a Peer in a session with an active item, **When** I click on a voting card (e.g., "5"), **Then** the card is highlighted as my selection, and my status in the participant list changes to "Voted".
2. **Given** I have cast a vote, **When** I click a different card before the reveal, **Then** my vote is updated to the new selection.
3. **Given** the voting mode is "Fibonacci", **When** I view the voting board, **Then** I see cards for 1, 2, 3, 5, 8, 13, 21, and "More Info Needed".

---

### User Story 2 - Host Manages Reveal (Priority: P1)

As a Host, I want to control when votes are revealed so that the team can discuss the results simultaneously without being biased by others' votes.

**Why this priority**: Ensures the "blind" voting mechanic is preserved.

**Independent Test**: Host sees multiple Peers have voted (shown as card backs). Host clicks "Reveal". Verify all participants (Host and Peers) now see the numerical/text values of all cast votes.

**Acceptance Scenarios**:

1. **Given** all votes have been cast but not revealed, **When** I (the Host) click "Reveal Votes", **Then** all participants' cards flip to show their values.
2. **Given** "Auto-Reveal" is enabled, **When** the last participant casts their vote, **Then** the results are automatically revealed to everyone.
3. **Given** votes are revealed, **When** I click "Next Item", **Then** the votes are cleared, and the UI returns to the hidden state for the new item.

---

### User Story 3 - Host Focuses Item (Priority: P2)

As a Host, I want to force all Peers to focus on a specific item so that the entire team is looking at the same ticket during the discussion.

**Why this priority**: Orchestrates the team's workflow and prevents confusion.

**Independent Test**: Host selects Item B from the list. Verify all connected Peers' UIs immediately update to show Item B as the "Active Item".

**Acceptance Scenarios**:

1. **Given** multiple items are in the session list, **When** I (the Host) click "Focus" on a specific issue, **Then** all Peers see that issue's key and summary prominently in their voting view.

### Edge Cases

- **Late Joiner**: If a Peer joins while a voting round is already in progress, they should be able to see the active item and vote immediately.
- **Voter Disconnects**: If a Peer disconnects after voting but before the reveal, does their vote still count towards the total?
- **Unanimous Vote**: If all votes are the same value, should the system provide a visual indicator of consensus?
- **Zero/Negative Estimates**: Ensure that "Integers (1-10)" strictly enforces positive values, while "More Info Needed" handles the non-numeric case.

### Functional Requirements

- **FR-001**: System MUST support three voting scales: Fibonacci, T-Shirt, and Integers (1-10).
- **FR-002**: Every voting scale MUST include a "More Info Needed" option.
- **FR-003**: System MUST display cast votes as "card backs" to all participants until the Reveal action is triggered.
- **FR-004**: Host MUST have a manual "Reveal" button.
- **FR-005**: System SHOULD support an "Auto-Reveal" toggle that triggers when 100% of participants have voted.
- **FR-006**: System MUST allow participants to change their vote anytime before the Reveal.
- **FR-007**: Host MUST be able to designate an "Active Item" from the session's item list.
- **FR-008**: System MUST synchronize the "Active Item" across all connected Peers in real-time.
- **FR-009**: System MUST calculate the "Consensus" upon reveal. If all votes are within a distance of $\pm1$ option on the selected scale, the consensus MUST default to the most common vote (mode).
- **FR-010**: If votes have a spread $>1$ option on the scale, the system MUST flag the item for discussion, specifically identifying the participants with the smallest and largest votes.
- **FR-011**: Host MUST be able to trigger a "Re-vote" for the current item, which clears all current votes and returns the item to the hidden state.
- **FR-012**: Host MUST have the right to override any system-calculated consensus and manually set the final value at any time.

### Key Entities

- **VoteScale**: Definition of the available card values.
- **Vote**: A value cast by a Participant for the current Active Item.
- **RevealStatus**: Boolean state (Hidden/Visible) for the current voting round.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Vote updates are reflected on the Host's "Who has voted" list in < 500ms.
- **SC-002**: Reveal action synchronizes across all participants in < 1 second.
- **SC-003**: 100% of Peers' UIs are forced to the Active Item when the Host changes focus.

