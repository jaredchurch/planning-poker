# Feature Specification: Room Management & Presence

**Feature Branch**: `005-room-management`  
**Created**: 2026-05-07  
**Status**: Draft  
**Input**: Completion of Phase 1 requirements: "Room Management & Presence"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Host Creates a Room (Priority: P1)

As a Host, I want to start a new planning poker session and get a shareable link so that I can invite my team to join.

**Why this priority**: The entry point for the entire application.

**Independent Test**: Click "Create Room" on the landing page. Verify a unique Room ID is generated and a "Copy Link" button appears with a URL containing that ID.

**Acceptance Scenarios**:

1. **Given** I am on the landing page, **When** I click "Create Room" and enter my display name, **Then** I am redirected to the Host Dashboard with a unique Room ID.
2. **Given** I am the Host, **When** I click "Copy Invite Link", **Then** a URL (e.g., `https://domain.com/#/join/[RoomID]`) is copied to my clipboard.

---

### User Story 2 - Peer Joins a Room (Priority: P1)

As a Peer, I want to join an existing session using a link or Room ID so that I can participate in the voting process.

**Why this priority**: Required for collaboration.

**Independent Test**: Open the application via an invite link. Verify the Room ID is pre-filled. Enter a name and click "Join". Verify the Peer is admitted to the room and sees the Host's name.

**Acceptance Scenarios**:

1. **Given** I have an invite link, **When** I open it, **Then** the "Join Room" form is displayed with the Room ID already populated.
2. **Given** I enter my name and click "Join", **When** the connection is established, **Then** I see the session dashboard and the list of active participants.

---

### User Story 3 - Live Participant List (Priority: P1)

As a participant, I want to see a real-time list of everyone currently in the room so that I know who is present and ready to vote.

**Why this priority**: Essential for session awareness and coordination.

**Independent Test**: Open one Host and two Peer windows. Verify that as each Peer joins, their name appears on all three screens within 1 second.

**Acceptance Scenarios**:

1. **Given** an active session, **When** a new Peer joins, **Then** their name is immediately added to the "Participants" sidebar for everyone.
2. **Given** a Peer closes their browser tab, **When** the Host detects the disconnection, **Then** the name is removed from the participant list for everyone.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST provide a landing page with "Create Room" (Host) and "Join Room" (Peer) options.
- **FR-002**: Room IDs MUST be unique and sufficiently random to prevent guessing (e.g., UUID or short-code).
- **FR-003**: System MUST support deep-linking via URL hash or query parameter for joining.
- **FR-004**: Host MUST be the signaling hub for the room. Peers MUST connect directly to the Host ID.
- **FR-005**: System MUST maintain a "Presence" list of all connected Peer IDs and names.
- **FR-006**: Host MUST synchronize the participant list to all Peers whenever a join/leave event occurs.
- **FR-007**: System MUST require a Display Name (min 2 characters) before allowing a user to join or create a room.

### Key Entities

- **Room**: The logical container for the session. Attributes: RoomID, HostName.
- **PresenceList**: An array of Participant objects `{ name, id, role }`.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Room creation takes < 2 seconds from button click to Dashboard display.
- **SC-002**: Joining a room via link takes < 3 seconds (signaling + WebRTC handshake).
- **SC-003**: Participant list updates reflect join/leave events in < 1 second.

## Edge Cases

- **Duplicate Names**: If a Peer joins with the same name as someone already in the room, the system SHOULD append a numeric suffix (e.g., "Alice (2)").
- **Invalid Room ID**: If a Peer attempts to join a non-existent or closed Room ID, show a clear "Room Not Found" error.
- **Slow Connection**: Show a "Connecting..." state while the WebRTC handshake is in progress.

## Assumptions

- We assume PeerJS servers are available for the initial signaling handshake.
- We assume users are using modern browsers with WebRTC support.
