# Tasks: Exit-Quit Session

**Input**: Design documents from `/specs/001-exit-quit/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Tests are not explicitly requested in the spec — test tasks are omitted from this breakdown. Spec acceptance scenarios serve as test criteria.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Single project**: `src/`, `tests/` at repository root

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [ ] T001 Initialize React project with Vite at project root
- [ ] T002 [P] Install and configure Tailwind CSS
- [ ] T003 [P] Install PeerJS dependency
- [ ] T004 [P] Install and configure Jest + React Testing Library
- [ ] T005 [P] Create project directory structure per plan.md

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core types and shared services that MUST be complete before any user story

- [ ] T006 Create session types (Session, Participant) in src/types/session.ts
- [ ] T007 Create message protocol types from contracts/message-protocol.md in src/types/messages.ts
- [ ] T008 Implement PeerJS connection hook (usePeerConnection) in src/hooks/usePeerConnection.ts
- [ ] T009 Implement session state manager (sessionManager) in src/services/sessionManager.ts
- [ ] T010 Implement message protocol helpers in src/services/messageProtocol.ts

**Checkpoint**: Foundation ready — user story implementation can begin

---

## Phase 3: User Story 1 - Peer Leaves Session (Priority: P1) 🎯 MVP

**Goal**: A Peer can gracefully exit the session, and the Host and other participants see the updated participant list.

**Independent Test**: Connect a Peer to a Host. Click "Exit" on the Peer, confirm. Verify the Peer is removed from the Host's participant list and redirected to the landing page.

### Implementation for User Story 1

- [ ] T011 [P] [US1] Create ConfirmDialog component in src/components/ConfirmDialog.tsx
- [ ] T012 [P] [US1] Create ExitButton component in src/components/ExitButton.tsx
- [ ] T013 [US1] Implement exit handler in sessionManager (remove Peer, broadcast participant-update)
- [ ] T014 [US1] Wire ExitButton into Peer dashboard view
- [ ] T015 [US1] Implement redirect-to-home behavior on Peer exit
- [ ] T016 [US1] Handle exit message protocol (Peer sends `exit`, Host processes, removes vote)

**Checkpoint**: Peer can exit independently — participant list updates and Peer is redirected

---

## Phase 4: User Story 2 - Host Closes Session (Priority: P1)

**Goal**: The Host can end the session for all participants at once.

**Independent Test**: Host triggers "Close Session" with connected Peers. Verify all Peers see "The Host has ended the session" and are redirected.

### Implementation for User Story 2

- [ ] T017 [P] [US2] Create CloseSessionButton component in src/components/CloseSessionButton.tsx
- [ ] T018 [US2] Implement session-closed broadcast handler in sessionManager
- [ ] T019 [US2] Implement Peer-side session-closed message handler (show notification, redirect)
- [ ] T020 [US2] Wire CloseSessionButton into Host dashboard view
- [ ] T021 [US2] Implement Host-side cleanup (terminate all connections, clear local state, set session.status to "closed")

**Checkpoint**: Host can close session — all Peers notified and redirected

---

## Phase 5: User Story 3 - Unexpected Disconnection (Priority: P2)

**Goal**: The system handles tab closes and network loss gracefully, keeping session state consistent.

**Independent Test**: Close a Peer's browser tab. Verify Host detects disconnection within 10 seconds and removes the Peer from the participant list.

### Implementation for User Story 3

- [ ] T022 [US3] Implement heartbeat (ping/pong) mechanism in src/hooks/useHeartbeat.ts
- [ ] T023 [US3] Wire heartbeat into Peer connection lifecycle
- [ ] T024 [US3] Implement Host-side timeout detection (remove Peer after 10s no pong)
- [ ] T025 [US3] Implement Host-side disconnect detection (detect connection loss locally, show "Connection lost" notification)
- [ ] T026 [US3] Implement Peer-side Host-disconnect notification ("Connection to Host lost")
- [ ] T027 [US3] Add beforeunload handler for Host (prevent accidental close with confirmation dialog)

**Checkpoint**: Unexpected disconnections are handled — participant list stays consistent

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Edge cases, error handling, and cleanup

- [ ] T028 Handle rejoining edge case (Peer rejoins as new connection per research.md)
- [ ] T029 Handle last-user-reveal edge case (exit does not trigger auto-reveal per research.md)
- [ ] T030 Clean up transient session state from Peer local storage on exit (FR-008)
- [ ] T031 Create stub HomeScreen component in src/components/HomeScreen.tsx (redirect target for T015, T019)
- [ ] T032 Create storage utility in src/utils/storage.ts (session state helpers for T030)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies
- **Foundational (Phase 2)**: Depends on Setup — BLOCKS all user stories
- **User Stories (Phase 3-5)**: All depend on Foundational completion
  - US1 and US2 can proceed in parallel (independent concerns)
  - US3 has minor overlap with US1 (both touch sessionManager)
- **Polish (Phase 6)**: Depends on all user stories complete

### User Story Dependencies

- **US1 (Peer Leaves)**: Can start after Foundational — no dependency on other stories
- **US2 (Host Closes)**: Can start after Foundational — independent from US1
- **US3 (Disconnection)**: Can start after Foundational — independent from US1/US2

### Within Each User Story

- Types before implementations
- Components before wiring
- Core logic before integration
- Story complete before moving to next

### Parallel Opportunities

- T002, T003, T004, T005 (Setup) can run in parallel
- T011, T012 (US1 components) can run in parallel
- T017 (US2 button) is independent — parallel with T012
- US1, US2, US3 can be implemented in parallel by different developers after Foundational

---

## Parallel Example: User Story 1

```bash
# Launch all independent US1 components together:
Task: "Create ConfirmDialog component in src/components/ConfirmDialog.tsx"
Task: "Create ExitButton component in src/components/ExitButton.tsx"
```

---

## Implementation Strategy

### MVP First (US1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (BLOCKS all stories)
3. Complete Phase 3: User Story 1 (Peer exit)
4. **STOP and VALIDATE**: Test US1 independently
5. Deploy/demo if ready

### Incremental Delivery

1. Setup + Foundational → Foundation ready
2. Add US1 (Peer exit) → Test independently → MVP ready
3. Add US2 (Host close) → Test independently → Full close lifecycle
4. Add US3 (Disconnect) → Test independently → Robustness complete

### Parallel Team Strategy

1. Team completes Setup + Foundational together
2. Once Foundational done:
   - Developer A: US1 (Peer exit)
   - Developer B: US2 (Host close)
   - Developer C: US3 (Disconnection)
3. Stories are independent — no merge conflicts expected
