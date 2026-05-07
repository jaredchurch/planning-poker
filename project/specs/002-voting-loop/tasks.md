# Tasks: Core Voting Loop

**Input**: Design documents from `/specs/002-voting-loop/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

**Tests**: Not explicitly requested in spec — spec acceptance scenarios serve as test criteria.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel
- **[Story]**: User story this task belongs to (US1, US2, US3)

---

## Phase 1: Setup

**Purpose**: Project initialization

- [x] T001 Initialize React project with Vite at project root
- [x] T002 [P] Install and configure Tailwind CSS
- [x] T003 [P] Install PeerJS dependency
- [x] T004 [P] Install and configure Jest + React Testing Library

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core voting types and services shared across all stories

- [x] T005 Create voting types (VoteScale, Vote, VotingRound, Item) in src/types/voting.ts
- [x] T006 Create message types for voting protocol in src/types/messages.ts
- [x] T007 Define voting scale configurations (Fibonacci, T-Shirt, Integers) in src/utils/scales.ts
- [x] T008 Implement votingService (vote recording, reveal toggle, round management) in src/services/votingService.ts
- [x] T009 Implement consensusService (mode calc, spread detection, override) in src/services/consensusService.ts

**Checkpoint**: Foundation ready — voting types and services exist

---

## Phase 3: User Story 1 - Peer Casts a Vote (Priority: P1) 🎯 MVP

**Goal**: Peer can select a voting card, see it highlighted, change vote before reveal, and Host sees "Voted" status.

**Independent Test**: Connect Peer. Display voting cards. Click a card. Verify UI shows vote as "cast". Host sees "Voted" status without value.

### Implementation

- [x] T010 [P] [US1] Create VotingCard component in src/components/VotingCard.tsx
- [x] T011 [P] [US1] Create VotingBoard component (card layout per scale) in src/components/VotingBoard.tsx
- [x] T012 [US1] Implement vote handler in votingService (record vote, broadcast vote-update)
- [x] T013 [US1] Wire VotingBoard into Peer dashboard view
- [x] T014 [US1] Implement vote-change (re-click different card before reveal)

**Checkpoint**: Peer can cast and change votes — Host sees status updates

---

## Phase 4: User Story 2 - Host Manages Reveal (Priority: P1)

**Goal**: Host controls vote reveal (manual + auto-reveal). All participants see results simultaneously.

**Independent Test**: Multiple Peers voted. Host clicks "Reveal". Verify all see vote values. Enable auto-reveal, last Peer votes → automatic reveal.

### Implementation

- [x] T015 [P] [US2] Create RevealButton component in src/components/RevealButton.tsx
- [x] T016 [P] [US2] Create VoteResults component (card flip display) in src/components/VoteResults.tsx
- [x] T017 [US2] Implement reveal handler in votingService (set isRevealed, broadcast reveal)
- [x] T018 [US2] Implement auto-reveal toggle and trigger logic in votingService
- [x] T019 [US2] Implement consensus display in VoteResults
- [x] T020 [US2] Implement "Next Item" handler (clear votes, new round)
- [x] T021 [US2] Implement "Re-vote" handler (clear round, return to hidden)

**Checkpoint**: Host can reveal votes, auto-reveal works, consensus displayed

---

## Phase 5: User Story 3 - Host Focuses Item (Priority: P2)

**Goal**: Host can force all Peers to focus on a specific item.

**Independent Test**: Host selects Item B from list. Verify all Peers' UIs show Item B as active.

### Implementation

- [x] T022 [P] [US3] Create ItemList component in src/components/ItemList.tsx
- [x] T023 [P] [US3] Create FocusButton component in src/components/FocusButton.tsx
- [x] T024 [US3] Implement focus-item handler in votingService (set active item, broadcast focus-item)
- [x] T025 [US3] Wire ItemList and FocusButton into Host dashboard
- [x] T026 [US3] Implement Peer-side focus-item handler (switch active item display)

**Checkpoint**: Host can change active item — all Peers follow in real-time

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Edge cases, late joiners, zero/negative enforcement

- [x] T027 Handle late joiner edge case (show active item and voting board on join)
- [x] T028 Handle voter disconnect during voting (remove vote from tally per 001-exit-quit contract)
- [x] T029 Enforce positive integers for Integers scale (FR-001 constraint)
- [x] T030 Add unanimous vote visual indicator (all votes same value)
- [x] T031 [US2] Implement consensus override control in Host dashboard (FR-012)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies
- **Foundational (Phase 2)**: Depends on Setup — BLOCKS all user stories
- **US1 (Phase 3)**: Depends on Foundational
- **US2 (Phase 4)**: Depends on Foundational + US1 (reveal needs vote data flow)
- **US3 (Phase 5)**: Depends on Foundational — independent of US1/US2
- **Polish (Phase 6)**: Depends on all user stories

### Parallel Opportunities

- T002, T003, T004 (Setup) can run in parallel
- T010, T011 (US1 components) can run in parallel
- T015, T016 (US2 components) can run in parallel
- T022, T023 (US3 components) can run in parallel

### Implementation Strategy

**MVP**: Phase 1 → Phase 2 → Phase 3 (US1: Peer casts vote). Validate with card click → status update.

**Incremental**: US1 → US2 (reveal adds visibility) → US3 (focus adds orchestration).
