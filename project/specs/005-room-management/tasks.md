# Tasks: Room Management & Presence

**Input**: Design documents from `/specs/005-room-management/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

---

## Phase 1: Setup

**Purpose**: Project initialization

- [x] T001 Initialize React project with Vite at project root
- [x] T002 [P] Install and configure Tailwind CSS
- [x] T003 [P] Install PeerJS dependency
- [x] T004 [P] Install and configure Jest + React Testing Library
- [x] T005 [P] Create project directory structure per plan.md

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core room types and PeerJS connection infrastructure

- [x] T006 Create room types (Room, Participant, PresenceList) in src/types/room.ts
- [x] T007 Create message types for room protocol in src/types/messages.ts
- [x] T008 Implement roomIdGenerator (6-char alphanumeric) in src/utils/roomIdGenerator.ts
- [x] T009 Implement peerConnectionService (PeerJS init, connect, disconnect) in src/services/peerConnectionService.ts
- [x] T010 Implement roomService (create, join, leave, presence broadcast) in src/services/roomService.ts
- [x] T011 Implement useRoom hook (React integration for room state) in src/hooks/useRoom.ts
- [x] T012 [P] Implement usePresence hook (React integration for presence list) in src/hooks/usePresence.ts

**Checkpoint**: Foundation ready — room creation and PeerJS connections work

---

## Phase 3: User Story 1 - Host Creates a Room (Priority: P1) 🎯 MVP

**Goal**: Host can create a room, get a shareable link, and see their dashboard.

**Independent Test**: Click "Create Room" on landing page. Verify unique Room ID generated and "Copy Link" button appears with URL containing that ID.

### Implementation

- [x] T013 [P] [US1] Create LandingPage component in src/components/LandingPage.tsx
- [x] T014 [P] [US1] Create CreateRoomForm component in src/components/CreateRoomForm.tsx
- [x] T015 [US1] Create CopyLinkButton component in src/components/CopyLinkButton.tsx
- [x] T016 [US1] Wire Host room creation flow (create Peer, link to roomService)
- [x] T017 [US1] Implement clipboard copy for invite link
- [x] T018 [US1] Add display name validation (min 2 chars, FR-007)

**Checkpoint**: Host can create room and share invite link

---

## Phase 4: User Story 2 - Peer Joins a Room (Priority: P1)

**Goal**: Peer can join an existing room via invite link or Room ID.

**Independent Test**: Open app via invite link. Room ID pre-filled. Enter name and click "Join". Verify Peer sees Host name and dashboard.

### Implementation

- [x] T019 [P] [US2] Create JoinRoomForm component in src/components/JoinRoomForm.tsx
- [x] T020 [US2] Implement deep-link parsing (read roomId from URL hash)
- [x] T021 [US2] Wire Peer join flow (connect to Host PeerJS ID, send join message)
- [x] T022 [US2] Implement Host-side join handler (add to presence, send joined response)
- [x] T023 [US2] Handle duplicate names (append suffix " (2)" etc.)

**Checkpoint**: Peer can join existing room

---

## Phase 5: User Story 3 - Live Participant List (Priority: P1)

**Goal**: All participants see real-time presence updates when someone joins or leaves.

**Independent Test**: Open Host + 2 Peer windows. Verify each join adds name to all screens within 1s.

**Note**: Tab close → name removal (US3 AS2) depends on the heartbeat mechanism from feature 001-exit-quit. Implement after that feature is complete.

### Implementation

- [x] T024 [P] [US3] Create ParticipantList component in src/components/ParticipantList.tsx
- [x] T025 [US3] Implement presence-update broadcast on join/leave in roomService
- [x] T026 [US3] Wire ParticipantList into Host and Peer dashboards
- [x] T027 [US3] Implement connection state display ("Connecting...", "Room Not Found")

**Checkpoint**: All participants see live presence updates

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Edge cases and error handling

- [x] T028 Handle invalid Room ID (show "Room Not Found" error)
- [x] T029 Handle slow connection (show "Connecting..." state during WebRTC handshake)
- [x] T030 Add session recovery (Host refreshes → reconnect with same roomId)
- [x] T031 Implement Peer leave handler in roomService (remove from presence, broadcast update)

---

## Dependencies

- **Setup**: No dependencies
- **Foundational**: Depends on Setup — BLOCKS all stories
- **US1**: Depends on Foundational
- **US2**: Depends on Foundational + US1 (room must exist to join)
- **US3**: Depends on US1 + US2 (need participants to show presence)
- **Polish**: Depends on all stories

### Parallel Opportunities

- T002, T003, T004, T005 (Setup) can run in parallel
- T013, T014 (US1 components) can run in parallel
- T024 (US3 component) is independent — can start after Foundational

### Implementation Strategy

**MVP**: Phase 1 → Phase 2 → Phase 3 (US1: create room). Validate with ID generation + copy link.
