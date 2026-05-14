# Implementation Plan: Responsive App Shell & UI Layout

**Branch**: `008-ui-layout` | **Date**: 2026-05-14 | **Spec**: [specs/008-ui-layout/spec.md](spec.md)
**Input**: Feature specification from `/specs/008-ui-layout/spec.md`

## Summary

Implement a responsive application shell that provides a consistent and polished user experience across mobile, tablet, and desktop devices. The solution will use a multi-column layout on desktop to maximize efficiency for the Host, while collapsing into a mobile-first "voting-centric" view for Peers. Screen transitions and touch accessibility are prioritized to ensure the P2P session feels integrated and high-quality.

## Technical Context

**Language/Version**: TypeScript / React 19  
**Primary Dependencies**: React, Tailwind CSS, Vite  
**Storage**: N/A (UI-only feature, uses state from RoomService)  
**Testing**: Jest, React Testing Library, Playwright (for responsive checks)  
**Target Platform**: Modern Web Browsers (Chrome, Safari, Firefox, Edge)
**Project Type**: Web Application (P2P)  
**Performance Goals**: 60fps animations, <100ms layout reflow on resize  
**Constraints**: Support breakpoints for mobile (320px+), tablet, and desktop (1200px+)  
**Scale/Scope**: Global shell for all session screens (Landing, Join, Dashboard)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **I. Serverless & P2P First**: PASS. The shell will include status indicators for WebRTC connectivity.
- **II. Host-Centric Data Sovereignty**: PASS. The layout will differentiate between Host and Peer dashboards via conditional rendering.
- **III. Zero-Trust Jira Integration**: PASS. Jira configuration panels will be integrated into the Host-specific desktop columns.
- **IV. Functional Minimalism**: PASS. Mobile layout strips secondary info to focus on voting cards.
- **V. Exportable Results**: PASS. The global navigation will provide clear access to session actions like Export.

## Project Structure

### Documentation (this feature)

```text
specs/008-ui-layout/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output
└── checklists/          # Quality validation
```

### Source Code (repository root)

```text
src/
├── components/
│   ├── layout/
│   │   ├── AppShell.tsx       # Main container
│   │   ├── Navigation.tsx     # Header/Room info
│   │   ├── ResponsiveGrid.tsx # Adaptive columns
│   │   └── MobileDrawer.tsx   # Participant list for mobile
│   └── shared/
│       └── Transition.tsx     # Animation wrapper
├── hooks/
│   └── useBreakpoint.ts       # Viewport detection
└── types/
    └── layout.ts              # Breakpoint definitions
```

**Structure Decision**: Single project structure within the existing `src/` directory. New components will be grouped in `components/layout/` to maintain modularity.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| None | N/A | N/A |
