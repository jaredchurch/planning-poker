# Tasks: Jira Integration

**Input**: Design documents from `/specs/004-jira-integration/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md

---

## Phase 1: Setup

- [x] T001 Initialize React project with Vite at project root
- [x] T002 [P] Install and configure Jest + React Testing Library

---

## Phase 2: Foundational

**Purpose**: Jira API client and auth services

- [x] T003 Create Jira types (JiraConfig, JiraIssue, FetchQuery) in src/types/jira.ts
- [x] T004 Implement jiraAuthService (store/retrieve Domain+Email in localStorage) in src/services/jiraAuthService.ts
- [x] T005 Implement jiraApiService (JQL, Sprint, Epic fetches via fetch) in src/services/jiraApiService.ts
- [x] T006 Implement Test Connection endpoint call in jiraApiService

**Checkpoint**: Jira API client ready — can authenticate and fetch

---

## Phase 3: User Story 1 - Host Configures Jira (Priority: P1) 🎯 MVP

**Goal**: Host can securely enter Jira credentials and validate them.

**Independent Test**: Host enters Jira details. Verify credentials stored (Domain/Email persist, Token session-only). Refresh page → Token requires re-entry.

### Implementation

- [x] T007 [P] [US1] Create JiraConfigPanel component in src/components/JiraConfigPanel.tsx
- [x] T008 [P] [US1] Create TestConnectionButton component in src/components/TestConnectionButton.tsx
- [x] T009 [US1] Wire credential persistence in JiraConfigPanel (Domain/Email → localStorage, Token → session)
- [x] T010 [US1] Implement "Clear Credentials" action (remove all Jira data)
- [x] T011 [US1] Add session-scoped token handling (require re-entry on page refresh with pre-filled Domain/Email)

**Checkpoint**: Host can configure and validate Jira credentials securely

---

## Phase 4: User Story 2 - Host Fetches Issues (Priority: P1)

**Goal**: Host can fetch Jira issues via JQL, Sprint ID, or Epic Key and see results.

**Independent Test**: Enter valid JQL. Verify list of keys and summaries returned and displayed.

### Implementation

- [x] T012 [P] [US2] Create JiraFetchForm component in src/components/JiraFetchForm.tsx
- [x] T013 [P] [US2] Create JiraIssueList component in src/components/JiraIssueList.tsx
- [x] T014 [US2] Wire fetch handlers (JQL, Sprint, Epic) in JiraFetchForm
- [x] T015 [US2] Implement loading indicator during fetch
- [x] T016 [US2] Handle errors (401, 403, empty results, CORS failures, large result sets >100, connection failures) with user-friendly messages

**Checkpoint**: Host can fetch and browse Jira issues

---

## Phase 5: User Story 3 - Adding Issues to Session (Priority: P2)

**Goal**: Host can select fetched issues and add them to the active session.

**Independent Test**: Fetch 10 issues, select 5 checkboxes, click "Add to Session". Verify only 5 appear in Items to Vote for Host and Peers.

### Implementation

- [x] T017 [US3] Add checkbox selection to JiraIssueList
- [x] T018 [US3] Implement "Add to Session" handler (convert selected JiraIssues → Items, sync to Peers)
- [x] T019 [US3] Wire "Add to Session" into session state manager (from 001-exit-quit feature)
- [x] T020 [US3] Handle duplicate issue keys with conflict resolution dialog
- [x] T021 [US2] Implement local Issue Summary editing in JiraIssueList (FR-006)

**Checkpoint**: Host can select and add Jira issues to the voting session

---

## Dependencies

- **Setup**: No dependencies
- **Foundational**: Depends on Setup — BLOCKS all stories
- **US1**: Depends on Foundational
- **US2**: Depends on Foundational + US1 (needs credentials to fetch)
- **US3**: Depends on US2 (needs fetched issues to add)

### Parallel Opportunities

- T002 (Setup) independent
- T007, T008 (US1 components) can run in parallel
- T012, T013 (US2 components) can run in parallel

### Implementation Strategy

**MVP**: Phase 1 → Phase 2 → Phase 3 (US1: configure + test connection). Validate with Test Connection button.
