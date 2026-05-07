# Tasks: Room Management & Presence

**Input**: Design documents from `/specs/005-room-management/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

---

## Phase 1: Setup

**Purpose**: Project initialization

- [ ] T001 Initialize React project with Vite at project root
- [ ] T002 [P] Install and configure Tailwind CSS
- [ ] T003 [P] Install PeerJS dependency
- [ ] T004 [P] Install and configure Jest + React Testing Library
- [ ] T005 [P] Create project directory structure per plan.md

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core room types and PeerJS connection infrastructure

- [ ] T006 Create room types (Room, Participant, PresenceList) in src/types/room.ts
- [ ] T007 Create message types for room protocol in src/types/messages.ts
- [ ] T008 Implement roomIdGenerator (6-char alphanumeric) in src/utils/roomIdGenerator.ts
- [ ] T009 Implement peerConnectionService (PeerJS init, connect, disconnect) in src/services/peerConnectionService.ts
- [ ] T010 Implement roomService (create, join, leave, presence broadcast) in src/services/roomService.ts
- [ ] T011 Implement useRoom hook (React integration for room state) in src/hooks/useRoom.ts
- [ ] T011 Implement usePresence hook (React integration for presence list) in src/hooks/usePresence.ts

**Checkpoint**: Foundation ready — room creation and PeerJS connections work

---

## Phase 3: User Story 1 - Host Creates a Room (Priority: P1) 🎯 MVP

**Goal**: Host can create a room, get a shareable link, and see their dashboard.

**Independent Test**: Click "Create Room" on landing page. Verify unique Room ID generated and "Copy Link" button appears with URL containing that ID.

### Implementation

- [ ] T012 [P] [US1] Create LandingPage component in src/components/LandingPage.tsx
- [ ] T013 [P] [US1] Create CreateRoomForm component in src/components/CreateRoomForm.tsx
- [ ] T014 [US1] Create CopyLinkButton component in src/components/CopyLinkButton.tsx
- [ ] T015 [US1] Wire Host room creation flow (create Peer, link to roomService)
- [ ] T016 [US1] Implement clipboard copy for invite link
- [ ] T017 [US1] Add display name validation (min 2 chars, FR-007)

**Checkpoint**: Host can create room and share invite link

---

## Phase 4: User Story 2 - Peer Joins a Room (Priority: P1)

**Goal**: Peer can join an existing room via invite link or Room ID.

**Independent Test**: Open app via invite link. Room ID pre-filled. Enter name and click "Join". Verify Peer sees Host name and dashboard.

### Implementation

- [ ] T018 [P] [US2] Create JoinRoomForm component in src/components/JoinRoomForm.tsx
- [ ] T019 [US2] Implement deep-link parsing (read roomId from URL hash)
- [ ] T020 [US2] Wire Peer join flow (connect to Host PeerJS ID, send join message)
- [ ] T021 [US2] Implement Host-side join handler (add to presence, send joined response)
- [ ] T022 [US2] Handle duplicate names (append suffix " (2)" etc.)

**Checkpoint**: Peer can join existing room

---

## Phase 5: User Story 3 - Live Participant List (Priority: P1)

**Goal**: All participants see real-time presence updates when someone joins or leaves.

**Independent Test**: Open Host + 2 Peer windows. Verify each join adds name to all screens within 1s.

### Implementation

- [ ] T023 [P] [US3] Create ParticipantList component in src/components/ParticipantList.tsx
- [ ] T024 [US3] Implement presence-update broadcast on join/leave in roomService
- [ ] T025 [US3] Wire ParticipantList into Host and Peer dashboards
- [ ] T026 [US3] Implement connection state display ("Connecting...", "Room Not Found")

**Checkpoint**: All participants see live presence updates

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Edge cases and error handling

- [ ] T027 Handle invalid Room ID (show "Room Not Found" error)
- [ ] T028 Handle slow connection (show "Connecting..." state during WebRTC handshake)
- [ ] T029 Add session recovery (Host refreshes → reconnect with same roomId)

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
- T012, T013 (US1 components) can run in parallel
- T023 (US3 component) is independent — can start after Foundational

### Implementation Strategy

**MVP**: Phase 1 → Phase 2 → Phase 3 (US1: create room). Validate with ID generation + copy link.
