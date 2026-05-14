# Implementation Plan: Item Management (Backlog CRUD)

**Branch**: `006-item-management` | **Date**: 2026-05-14 | **Spec**: [specs/006-item-management/spec.md](spec.md)
**Input**: Feature specification from `/specs/006-item-management/spec.md`

## Summary

Implement the logic and UI for manual backlog management, allowing the Host to create, edit, delete, and reorder items in the session. This feature complements the Jira integration by providing a way to estimate ad-hoc tasks and ensuring that all participants see a synchronized, ordered list of items in real-time.

## Technical Context

**Language/Version**: TypeScript / React 19  
**Primary Dependencies**: React, Tailwind CSS, Vite, `lucide-react` (for icons)  
**Storage**: Host's LocalStorage (via `storage.ts`)  
**Testing**: Jest, React Testing Library  
**Target Platform**: Web Browsers
**Project Type**: Web Application (P2P)  
**Performance Goals**: <500ms sync for reordering across 10+ peers  
**Constraints**: Must sync custom order even if items were originally imported from Jira  
**Scale/Scope**: Session-level backlog (typically 5-50 items)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **I. Serverless & P2P First**: PASS. All CRUD actions are broadcast via the existing P2P data channels.
- **II. Host-Centric Data Sovereignty**: PASS. The Host is the only role with write access to the backlog; state is persisted in the Host's LocalStorage.
- **III. Zero-Trust Jira Integration**: PASS. Manual edits to Jira-imported items remain local and do not push back to Jira.
- **IV. Functional Minimalism**: PASS. Simple forms and drag-and-drop/button reordering keep the experience focused.
- **V. Exportable Results**: PASS. The data model for manual items will be compatible with the existing CSV export service.

## Project Structure

### Documentation (this feature)

```text
specs/006-item-management/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
└── checklists/
```

### Source Code (repository root)

```text
src/
├── components/
│   ├── backlog/
│   │   ├── BacklogPanel.tsx     # Container for the item list
│   │   ├── BacklogItem.tsx      # Individual item with CRUD actions
│   │   └── ItemForm.tsx         # Add/Edit modal/form
├── services/
│   └── itemService.ts           # Business logic for CRUD and sync
├── hooks/
│   └── useBacklog.ts            # State management for the backlog
└── types/
    └── item.ts                  # BacklogItem type definition
```

**Structure Decision**: New components will be placed in `src/components/backlog/`. The logic will be encapsulated in `itemService.ts` and exposed via the `useBacklog` hook.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| None | N/A | N/A |
