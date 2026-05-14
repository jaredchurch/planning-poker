# Implementation Plan: Session Configuration & Host Settings

**Branch**: `007-session-config` | **Date**: 2026-05-14 | **Spec**: [specs/007-session-config/spec.md](spec.md)
**Input**: Feature specification from `/specs/007-session-config/spec.md`

## Summary

Implement the Host's control panel for session rules and configuration. This includes the ability to switch voting scales, toggle auto-reveal, lock the room, and configure consensus rules. A critical part of this feature is ensuring that these preferences are persisted in the Host's `localStorage` for continuity across sessions and synchronized to all connected Peers in real-time.

## Technical Context

**Language/Version**: TypeScript / React 19  
**Primary Dependencies**: React, Tailwind CSS, Vite  
**Storage**: Host's LocalStorage (via `storage.ts`)  
**Testing**: Jest, React Testing Library  
**Target Platform**: Web Browsers
**Project Type**: Web Application (P2P)  
**Performance Goals**: <500ms sync for configuration changes across all peers  
**Constraints**: Settings changes must be atomic; scale changes must handle existing votes gracefully.  
**Scale/Scope**: Session-wide configuration state.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **I. Serverless & P2P First**: PASS. Settings are broadcast via P2P data channels.
- **II. Host-Centric Data Sovereignty**: PASS. Only the Host can change settings; Host's `localStorage` is the persistence layer.
- **III. Zero-Trust Jira Integration**: PASS. Session settings are independent of Jira credentials.
- **IV. Functional Minimalism**: PASS. Focused on essential controls (Scale, Auto-Reveal, Lock).
- **V. Exportable Results**: PASS. Export service will respect the active scale and consensus rules.

## Project Structure

### Documentation (this feature)

```text
specs/007-session-config/
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
│   ├── settings/
│   │   ├── SettingsPanel.tsx    # Main Host configuration UI
│   │   ├── ScaleSelector.tsx    # Dropdown/Toggle for voting scales
│   │   └── ToggleSwitch.tsx     # Reusable UI component for Booleans
├── services/
│   └── sessionManager.ts        # Orchestrates settings sync and persistence
├── hooks/
│   └── useRoomSettings.ts       # Hook for accessing/modifying settings
└── types/
    └── session.ts               # SessionSettings type definition
```

**Structure Decision**: Settings components will be grouped in `src/components/settings/`. Core logic will reside in `sessionManager.ts`.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| None | N/A | N/A |
