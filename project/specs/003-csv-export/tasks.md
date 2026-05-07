# Tasks: CSV Export

**Input**: Design documents from `/specs/003-csv-export/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md

**Tests**: Not explicitly requested in spec.

---

## Phase 1: Setup

- [x] T001 Initialize React project with Vite at project root
- [x] T002 [P] Install and configure Jest + React Testing Library

---

## Phase 2: Foundational

**Purpose**: CSV generation utilities

- [x] T003 Create export types (SessionResult, ExportedItem, ExportConfig) in src/types/export.ts
- [x] T004 Implement RFC 4180 CSV formatter (escape commas, quotes, newlines) in src/utils/csvFormatter.ts

**Checkpoint**: CSV formatting utility ready

---

## Phase 3: User Story 1 - Host Exports Results (Priority: P1) 🎯 MVP

**Goal**: Host can export session results to a downloadable CSV file with all columns and proper formatting.

**Independent Test**: Complete a session with 3 items and votes. Click "Export CSV". Verify `.csv` file downloads with correct data.

### Implementation

- [x] T005 [P] [US1] Create ExportButton component in src/components/ExportButton.tsx
- [x] T006 [P] [US1] Create ConsensusEditor component in src/components/ConsensusEditor.tsx
- [x] T007 [US1] Implement csvExportService (collect data, format, trigger download) in src/services/csvExportService.ts
- [x] T008 [US1] Implement file download via Blob in csvExportService
- [x] T009 [US1] Wire ExportButton into Host dashboard
- [x] T010 [US1] Add duplicate issue key detection and conflict resolution dialog
- [x] T011 [US1] Add mid-session export support (include all voted items up to now)

**Checkpoint**: Host can export CSV at any point during or after session

---

## Dependencies

- **Setup**: No dependencies
- **Foundational**: Depends on Setup
- **US1**: Depends on Foundational

### Parallel Opportunities

- T005, T006 (US1 components) can run in parallel

### Implementation Strategy

**MVP**: Phase 1 → Phase 2 → Phase 3 (US1). Validate with a test session → file download.
