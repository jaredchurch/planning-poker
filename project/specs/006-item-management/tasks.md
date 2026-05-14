# Tasks: Item Management (Backlog CRUD)

**Input**: Design documents from `/specs/006-item-management/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, quickstart.md

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [ ] T001 Create directory structure for backlog components in `src/components/backlog/`
- [ ] T002 [P] Define `BacklogItem` type in `src/types/item.ts`
- [ ] T003 [P] Add UUID utility for manual item IDs in `src/utils/uuid.ts`

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

- [ ] T004 Implement core backlog logic in `src/services/itemService.ts` with LocalStorage integration
- [ ] T005 [P] Implement `ITEM_CREATE`, `ITEM_UPDATE`, `ITEM_DELETE`, and `ITEM_REORDER` P2P message handlers in `src/services/itemService.ts`
- [ ] T006 Create `useBacklog` hook in `src/hooks/useBacklog.ts` to expose item state and actions

**Checkpoint**: Foundation ready - user story implementation can now begin

---

## Phase 3: User Story 1 - Host Adds Manual Item (Priority: P1) 🎯 MVP

**Goal**: Allow Host to add tasks that are not in Jira.

**Independent Test**: Use "Add Item" button; verify item appears on Host and Peer screens.

### Implementation for User Story 1

- [ ] T007 [US1] Create `ItemForm.tsx` in `src/components/backlog/ItemForm.tsx` for adding/editing items
- [ ] T008 [US1] Create `BacklogItem.tsx` in `src/components/backlog/BacklogItem.tsx` to display individual items
- [ ] T009 [US1] Create `BacklogPanel.tsx` in `src/components/backlog/BacklogPanel.tsx` to containerize the list
- [ ] T010 [US1] Integrate `BacklogPanel` into the Host and Peer dashboards
- [ ] T011 [US1] Add unit tests for item creation and sync in `tests/unit/services/itemService.test.ts`

**Checkpoint**: User Story 1 fully functional and testable.

---

## Phase 4: User Story 2 - Host Edits/Updates Item (Priority: P1)

**Goal**: Allow Host to fix typos or clarify item scope.

**Independent Test**: Click "Edit" on an item; change summary; verify update reflects on all screens.

### Implementation for User Story 2

- [ ] T012 [US2] Update `ItemForm.tsx` to support edit mode
- [ ] T013 [US2] Implement edit action in `BacklogItem.tsx`
- [ ] T014 [US2] Ensure `ITEM_UPDATE` P2P broadcast triggers on save

---

## Phase 5: User Story 3 - Host Deletes Item (Priority: P2)

**Goal**: Remove irrelevant items from the session.

**Independent Test**: Delete an item; verify it disappears for everyone.

### Implementation for User Story 3

- [ ] T015 [US3] Implement delete action in `BacklogItem.tsx` with a confirmation dialog
- [ ] T016 [US3] Add "Active Item" check: if deleted item is active, trigger `CLEAR_ACTIVE_ITEM` in `itemService.ts`
- [ ] T017 [US3] Add unit test for deletion and active item cleanup in `tests/unit/services/itemService.test.ts`

---

## Phase 6: User Story 4 - Host Reorders Backlog (Priority: P2)

**Goal**: Estimate items in priority order.

**Independent Test**: Drag an item (or use move buttons) to a new position; verify order syncs to Peers.

### Implementation for User Story 4

- [ ] T018 [US4] Implement reordering UI in `BacklogItem.tsx` (Move Up/Down buttons)
- [ ] T019 [US4] Implement `ITEM_REORDER` logic in `itemService.ts` using `arrayMove` pattern
- [ ] T020 [US4] Add unit tests for reordering logic and index updates in `tests/unit/services/itemService.test.ts`

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Final touches and UI refinement.

- [ ] T021 [P] Implement optimistic UI updates for Host actions in `useBacklog.ts`
- [ ] T022 [P] Add loading states and error handling for item sync
- [ ] T023 [P] Finalize Tailwind styling for backlog components
- [ ] T024 [P] Add integration test for end-to-end item management in `tests/integration/item-management.test.ts`

---

## Dependency Graph & Parallel Execution

### Story Dependencies
1. **US1 (P1)**: Foundation for all item interactions.
2. **US2 (P1)**: Depends on US1 (Item existence).
3. **US3 (P2)**: Depends on US1.
4. **US4 (P2)**: Depends on US1 (Multiple items existence).

### Parallel Opportunities
- **Setup**: T002, T003
- **Foundational**: T005
- **Polish**: T021, T022, T023, T024

## Implementation Strategy
- **MVP First**: Focus on US1 (Creating manual items).
- **Service Layer First**: Ensure `itemService.ts` correctly handles LocalStorage and P2P before building complex UI.
- **P2P Verification**: Always test with two browser windows to confirm real-time sync.
