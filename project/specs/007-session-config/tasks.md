# Tasks: Session Configuration & Host Settings

**Input**: Design documents from `/specs/007-session-config/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, quickstart.md

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Create directory structure for settings components in `src/components/settings/`
- [x] T002 [P] Define `SessionSettings` and `ScaleType` types in `src/types/session.ts`
- [x] T003 [P] Extract scale definitions (Fibonacci, T-Shirt, Integers) to `src/utils/scales.ts`

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

- [x] T004 Implement basic `sessionManager.ts` in `src/services/` with `SETTINGS_UPDATED` message handling
- [x] T005 [P] Create `useRoomSettings` hook in `src/hooks/useRoomSettings.ts` for accessing and updating session state
- [x] T006 [P] Create reusable `ToggleSwitch.tsx` component in `src/components/settings/ToggleSwitch.tsx`

**Checkpoint**: Foundation ready - user story implementation can now begin

---

## Phase 3: User Story 1 - Host Selects Voting Scale (Priority: P1) 🎯 MVP

**Goal**: Allow the Host to change the voting cards for all participants.

**Independent Test**: Change scale to "T-Shirt" in Host settings; verify Peer board updates to XS-XL cards.

### Implementation for User Story 1

- [x] T007 [US1] Create `ScaleSelector.tsx` in `src/components/settings/ScaleSelector.tsx`
- [x] T008 [US1] Implement scale change logic in `sessionManager.ts` including vote clearing/mapping prompt
- [x] T009 [US1] Integrate `ScaleSelector` into a temporary `SettingsPanel.tsx` in `src/components/settings/SettingsPanel.tsx`
- [x] T010 [US1] Update `VotingBoard.tsx` to render cards based on the `scaleType` from session settings
- [x] T011 [US1] Add unit tests for scale mapping logic in `tests/unit/services/sessionManager.test.ts`

**Checkpoint**: User Story 1 fully functional and testable.

---

## Phase 4: User Story 2 - Host Toggles Auto-Reveal (Priority: P2)

**Goal**: Toggle whether votes flip automatically or require manual action.

**Independent Test**: Enable Auto-Reveal; verify cards flip when the last peer votes.

### Implementation for User Story 2

- [x] T012 [US2] Add `autoRevealEnabled` toggle to `SettingsPanel.tsx`
- [x] T013 [US2] Update `votingService.ts` to trigger reveal automatically if `autoRevealEnabled` is true and all have voted
- [x] T014 [US2] Add unit test for auto-reveal logic in `tests/unit/services/votingService.test.ts`

---

## Phase 5: User Story 3 - Host Locks the Room (Priority: P2)

**Goal**: Prevent new participants from joining the session.

**Independent Test**: Enable Room Lock; verify a new browser tab attempting to join receives a "Locked" error.

### Implementation for User Story 3

- [x] T015 [US3] Add `isLocked` toggle to `SettingsPanel.tsx`
- [x] T016 [US3] Update `peerConnectionService.ts` to reject incoming connections when `isLocked` is true
- [x] T017 [US3] Implement "Room is Locked" error message UI in `JoinRoomForm.tsx`

---

## Phase 6: User Story 4 - Host Configures Consensus Rules (Priority: P3)

**Goal**: Choose how the suggested consensus is calculated.

**Independent Test**: Set consensus to "Average"; verify revealed votes (3, 5, 8) suggest "5.3".

### Implementation for User Story 4

- [x] T018 [US4] Add `consensusAlgorithm` selector to `SettingsPanel.tsx`
- [x] T019 [US4] Implement "Average" and "Weighted" algorithms in `consensusService.ts`
- [x] T020 [US4] Update `VoteResults.tsx` to display consensus based on the selected algorithm
- [x] T021 [US4] Add unit tests for consensus algorithms in `tests/unit/services/consensusService.test.ts`

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Final touches, persistence, and UI refinement.

- [x] T022 Implement `localStorage` persistence for Host settings in `src/services/sessionManager.ts`
- [x] T023 [P] Add "More Info Needed" card toggle to `SettingsPanel.tsx` and `scales.ts` logic
- [x] T024 [P] Finalize layout and styling of `SettingsPanel.tsx` using Tailwind CSS
- [x] T025 [P] Add integration test for end-to-end settings synchronization in `tests/integration/session-config.test.ts`

---

## Dependency Graph & Parallel Execution

### Story Dependencies
1. **US1 (P1)**: Independent foundation.
2. **US2 (P2)**: Independent.
3. **US3 (P2)**: Independent.
4. **US4 (P3)**: Depends on US1 (Scale context).

### Parallel Opportunities
- **Setup**: T002, T003
- **Foundational**: T005, T006
- **US2/US3**: Can be implemented concurrently after US1 foundation.
- **Polish**: T023, T024, T025

## Implementation Strategy
- **MVP First**: Focus on US1 (Scale Selection) as it defines the core cards for the session.
- **Incremental Delivery**: Deliver US1, then US2/US3, and finally US4.
- **Persistence Last**: Add `localStorage` after core functional logic is verified.
