# Feature Specification: Session Configuration & Host Settings

**Feature Branch**: `007-session-config`  
**Created**: 2026-05-14  
**Status**: Finalized  
**Input**: User description: "Session Configuration & Host Settings: Allow the Host to manage session rules, including voting scales, auto-reveal toggles, consensus rules, and room privacy/locking."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Host Selects Voting Scale (Priority: P1)

As a Host, I want to choose the voting scale (e.g., Fibonacci, T-Shirt, Integers) for the session so that the team uses the estimation method best suited for our workflow.

**Why this priority**: Core configuration that determines what cards participants see.

**Independent Test**: Change the scale from "Fibonacci" to "T-Shirt" in the settings. Verify all Peers immediately see the new set of cards on their voting board.

**Acceptance Scenarios**:

1. **Given** a session is active, **When** I (the Host) select "T-Shirt" from the Voting Scale dropdown, **Then** my voting board updates to show XS, S, M, L, XL cards.
2. **Given** I have changed the scale, **When** I check a Peer's screen, **Then** their voting board has also updated to the new scale in real-time.
3. **Given** a voting round was in progress, **When** I change the scale, **Then** the system MUST ask if I want to clear current votes or attempt to retain them (mapped to the new scale where possible).

---

### User Story 2 - Host Toggles Auto-Reveal (Priority: P2)

As a Host, I want to enable or disable "Auto-Reveal" so that I can choose between an automated flow or a more controlled discussion pace.

**Why this priority**: Enhances the flow of the meeting based on the team's preference.

**Independent Test**: Enable "Auto-Reveal". Have all participants vote. Verify the votes flip automatically. Disable it and verify the Host must click "Reveal" manually.

**Acceptance Scenarios**:

1. **Given** "Auto-Reveal" is ON, **When** the last participant casts their vote, **Then** the results are immediately revealed to everyone.
2. **Given** "Auto-Reveal" is OFF, **When** all participants have voted, **Then** the Host must manually click the "Reveal" button for results to be seen.

---

### User Story 3 - Host Locks the Room (Priority: P2)

As a Host, I want to lock the room once the meeting has started so that new participants cannot join and disrupt the session.

**Why this priority**: Provides session security and management.

**Independent Test**: Toggle "Lock Room" to ON. Attempt to join the room with the Room ID from another tab. Verify the user is shown a "Room is Locked" message.

**Acceptance Scenarios**:

1. **Given** "Room Locked" is enabled, **When** a new user attempts to join using the correct Room ID, **Then** they receive a notification that the session is no longer accepting new participants.
2. **Given** the room is locked, **When** I toggle it back to OFF, **Then** new users can join normally.

---

### User Story 4 - Host Configures Consensus Rules (Priority: P3)

As a Host, I want to choose how "Consensus" is calculated (e.g., Majority vs. Average) so that the system's suggestion aligns with our team's decision-making policy.

**Why this priority**: Provides flexibility for different team cultures.

**Independent Test**: Change consensus rule to "Average". Reveal votes (e.g., 3, 5, 8). Verify the suggested consensus is "5.3" (or the nearest scale value if configured).

**Acceptance Scenarios**:

1. **Given** multiple consensus algorithms are available, **When** I select one in the settings, **Then** the "Suggested Consensus" value shown after a reveal is updated based on that logic.

### Edge Cases

- **Scale Change mid-vote**: If the Host changes the scale while people are voting, the system SHOULD prompt the Host to either clear or retain votes. If retained, the system MUST notify Peers of the update.
- **Auto-Reveal with Disconnected Users**: If a user disconnects while "Auto-Reveal" is on, the system MUST recalculate if 100% of *active* participants have voted and trigger the reveal if they have.
- **Locking with Pending Joins**: Users who were in the "Joining/Connecting" state when the room was locked should still be allowed to complete their connection.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST provide a "Session Settings" panel accessible only to the Host.
- **FR-002**: Host MUST be able to switch between predefined scales: Fibonacci, T-Shirt, and Integers (1-10).
- **FR-003**: System MUST support a toggle for "Auto-Reveal" functionality.
- **FR-004**: System MUST support a toggle for "Lock Room" functionality.
- **FR-005**: All settings changes MUST be synchronized to all connected Peers via the P2P data channel.
- **FR-006**: Changing the voting scale SHOULD prompt the Host to either clear all current votes or retain them. If retained, the system MUST attempt to map existing votes to the closest equivalent in the new scale (or mark as "Invalid/Cleared" if no mapping exists).
- **FR-007**: Host MUST be able to configure "More Info Needed" as an optional card for any scale.
- **FR-008**: System MUST persist the Host's session configurations (scale, auto-reveal, consensus rules) in `localStorage` so they are remembered across different rooms and browser sessions.

### Key Entities

- **SessionSettings**: The configuration object for the current room. Attributes: `scaleType`, `autoRevealEnabled`, `isLocked`, `consensusAlgorithm`.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Settings changes propagate to all Peers in < 500ms.
- **SC-002**: 100% of Peers see the correct card set immediately after a scale change.
- **SC-003**: "Auto-Reveal" triggers within 200ms of the final vote being registered.
- **SC-004**: Host's preferred settings are automatically loaded from `localStorage` upon creating a new room.

## Assumptions

- We assume the Host's browser is the source of truth for all session settings.
- We assume Peers do not have access to modify these settings.
- We assume the Host uses the same browser/device to benefit from `localStorage` persistence.

