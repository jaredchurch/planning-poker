# Tasks: Responsive App Shell & UI Layout

**Input**: Design documents from `/specs/008-ui-layout/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [ ] T001 Create directory structure for layout components in `src/components/layout/`
- [ ] T002 [P] Define `ViewportState` and `DeviceType` types in `src/types/layout.ts`
- [ ] T003 Configure Tailwind CSS custom breakpoints if necessary in `tailwind.config.js` (referencing research.md)

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure for viewport detection and global shell

- [ ] T004 Implement `useBreakpoint` hook in `src/hooks/useBreakpoint.ts` for real-time viewport tracking
- [ ] T005 Implement base `AppShell.tsx` in `src/components/layout/AppShell.tsx` as the root container
- [ ] T006 Implement `Navigation.tsx` in `src/components/layout/Navigation.tsx` with session metadata (UI Contract)

**Checkpoint**: Foundation ready - application shell is established and responsive state is available.

---

## Phase 3: User Story 1 - Unified Mobile Experience (Priority: P1) 🎯 MVP

**Goal**: Prioritize voting UI on mobile and hide participants list.

**Independent Test**: Resize browser to <768px; verify participants list disappears and is accessible via drawer.

### Implementation for User Story 1

- [ ] T007 [US1] Implement `MobileDrawer.tsx` in `src/components/layout/MobileDrawer.tsx`
- [ ] T008 [US1] Update `AppShell.tsx` to conditionally render the `MobileDrawer` for participants on small screens
- [ ] T009 [US1] Implement "Participants" count toggle in `Navigation.tsx` to trigger the drawer
- [ ] T010 [US1] Ensure all buttons and cards in `VotingBoard.tsx` meet the 44x44px touch target requirement
- [ ] T011 [US1] Add responsive unit tests for `useBreakpoint` in `tests/unit/hooks/useBreakpoint.test.ts`

**Checkpoint**: User Story 1 (Mobile) fully functional.

---

## Phase 4: User Story 3 - Adaptive Host Dashboard (Priority: P2)

**Goal**: Multi-column desktop layout for efficiency.

**Independent Test**: Open Host Dashboard on desktop (>1200px); verify Backlog, Voting, and Participants are all visible.

### Implementation for User Story 3

- [ ] T012 [US3] Implement `ResponsiveGrid.tsx` in `src/components/layout/ResponsiveGrid.tsx` with adaptive column counts
- [ ] T013 [US3] Configure `ResponsiveGrid` in the Host Dashboard to use 3 columns on Desktop and 2 on Tablet
- [ ] T014 [US3] Implement sidebar behaviors for Backlog and Participants on desktop resolutions
- [ ] T015 [US3] Add "Large Backlog Title" truncation logic in `BacklogItem.tsx`

---

## Phase 5: User Story 2 - Smooth Screen Transitions (Priority: P2)

**Goal**: Clear visual cues between application states.

**Independent Test**: Join a room; verify smooth fade/slide transition into the dashboard.

### Implementation for User Story 2

- [ ] T016 [US2] Create `Transition.tsx` wrapper in `src/components/shared/Transition.tsx` using Tailwind transitions
- [ ] T017 [US2] Wrap screen-level components (Landing, Join, Dashboard) in `Transition` within `AppShell.tsx`
- [ ] T018 [US2] Implement session termination overlay/notification in `AppShell.tsx`

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final refinements and cross-browser verification.

- [ ] T019 [P] Implement "Connection Lost" modal overlay in `src/components/layout/AppShell.tsx`
- [ ] T020 [P] Optimize re-renders on window resize within the `useBreakpoint` hook
- [ ] T021 [P] Verify 60fps performance for transitions on lower-end mobile devices
- [ ] T022 [P] Create responsive layout integration tests in `tests/integration/responsive-layout.spec.ts`

---

## Dependency Graph & Parallel Execution

### Story Dependencies
1. **Foundation (P2)**: Required for all.
2. **US1 (P1)**: Independent after foundation.
3. **US3 (P2)**: Independent after foundation.
4. **US2 (P2)**: Depends on US1/US3 existence for state transition testing.

### Parallel Opportunities
- **Setup**: T002, T003
- **Components**: T006, T007, T012 can be developed concurrently
- **Polish**: T019, T020, T021

## Implementation Strategy
- **MVP First**: Focus on the Mobile Shell (US1) as it's the most constrained and critical for Peers.
- **Hook-Driven**: Ensure `useBreakpoint` is robust and handles orientation changes before building complex grid logic.
- **Visual Polish**: Add transitions (US2) last to avoid complicating the initial layout debugging.
