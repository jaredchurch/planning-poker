# Feature Specification: Exit-Quit Session

**Feature Branch**: `001-exit-quit`  
**Created**: 2026-05-07  
**Status**: Finalized  
**Input**: User description: "exitquit"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Peer Leaves Session (Priority: P1)

As a participant (Peer), I want to gracefully exit the planning poker session so that the Host and other participants know I am no longer part of the game.

**Why this priority**: Core functionality for session management. Essential for maintaining an accurate list of active voters.

**Independent Test**: Connect a Peer to a Host. Use the "Exit" action on the Peer's side. Verify the Peer is removed from the Host's participant list and the Peer is returned to the landing page.

**Acceptance Scenarios**:

1. **Given** I am connected to a session as a Peer, **When** I click the "Exit" button and confirm, **Then** my connection to the Host is closed and I am redirected to the home screen.
2. **Given** I have exited a session, **When** the Host looks at the participant list, **Then** my name is no longer displayed.
3. **Given** I am a Peer who has voted but not revealed, **When** I exit the session, **Then** my vote is removed from the current item's tally.

---

### User Story 2 - Host Closes Session (Priority: P1)

As a Host, I want to end the session for everyone so that I can conclude the planning meeting and ensure no further voting occurs.

**Why this priority**: Essential for the Host to control the lifecycle of the P2P session.

**Independent Test**: Host triggers "Close Session". Verify all connected Peers receive a notification and are redirected to their respective landing pages.

**Acceptance Scenarios**:

1. **Given** I am the Host of an active session with Peers connected, **When** I click "Close Session" and confirm, **Then** the signaling and P2P connections are terminated for all participants.
2. **Given** the Host has closed the session, **When** a Peer is in the middle of voting, **Then** they see a message stating "The Host has ended the session" before being redirected.

---

### User Story 3 - Unexpected Disconnection (Priority: P2)

As a participant, I want the system to handle unexpected disconnections (e.g., closing the tab or network loss) so that the session state remains consistent for remaining users.

**Why this priority**: Ensures robustness in a P2P environment where users may not always use the explicit "Exit" button.

**Independent Test**: Peer closes browser tab. Verify the Host detects the disconnection within a reasonable timeframe (heartbeat/timeout) and removes the Peer.

**Acceptance Scenarios**:

1. **Given** I am a Peer in a session, **When** I close my browser tab without clicking "Exit", **Then** the Host detects the Peer has left and updates the participant list.
2. **Given** the Host's browser crashes or closes, **When** a Peer attempts to interact, **Then** the Peer is notified that the connection to the Host has been lost.

### Edge Cases

- **Host Refresh**: If the Host attempts to refresh or close the page, the browser MUST display a confirmation dialog ("Leave site?") to prevent accidental session termination. If the Host proceeds, the session is terminated for all Peers.
- **Last User Reveal**: If a Peer exits while they were the last person needed to vote for an auto-reveal, does the system reveal the results?
- **Rejoining**: If a Peer quits and immediately joins again with the same name, are they treated as a new user or a returning one?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST provide a visible "Exit" or "Leave Session" button for all participants.
- **FR-002**: System MUST prompt for confirmation before a user exits an active session.
- **FR-003**: Host MUST have a "Close Session" option that terminates the session for all connected Peers.
- **FR-004**: System MUST notify Peers if the Host disconnects or ends the session.
- **FR-005**: System MUST remove a Peer from the Host's active participant list immediately upon graceful exit.
- **FR-006**: System MUST handle Peer disconnection timeouts to clean up the participant list in case of non-graceful exits.
- **FR-007**: System MUST redirect users to the application's landing page after exiting.
- **FR-008**: System MUST clear transient session state (e.g., current room ID) from the Peer's local storage upon exit.

### Key Entities *(include if feature involves data)*

- **Session**: Represents the active P2P room. Attributes: RoomID, HostID, Status (Active/Closed).
- **Participant**: Represents a user in the session. Attributes: UserID, Role (Host/Peer), ConnectionStatus, VoteStatus.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can exit a session in 2 clicks (Exit button -> Confirm).
- **SC-002**: Host's participant list updates within 1 second of a Peer's graceful exit.
- **SC-003**: 100% of Peers are notified and redirected when a Host closes a session.
- **SC-004**: Disconnected Peers (non-graceful) are removed from the active list within 10 seconds (heartbeat timeout).

## Assumptions

- We assume PeerJS provides reliable connection "close" events for graceful exits.
- We assume the application has a clear "landing page" or "home screen" to redirect to.
- We assume that "Closing the session" does not necessarily delete the Host's local history of the session, only the active P2P connections.
