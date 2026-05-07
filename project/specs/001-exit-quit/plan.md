# Implementation Plan: Exit-Quit Session

**Branch**: `001-exit-quit` | **Date**: 2026-05-07 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/specs/001-exit-quit/spec.md`

## Summary

Enable Peers to gracefully exit a planning poker session and Hosts to close sessions for all participants. Handle unexpected disconnections (tab close, network loss) with heartbeat-based timeout cleanup. Implement confirmation dialogs, real-time participant list updates, and redirect-to-home behavior.

## Technical Context

**Language/Version**: JavaScript (ES2022+), React 18  
**Primary Dependencies**: React, PeerJS, Tailwind CSS  
**Storage**: localStorage (Host browser only, for session recovery)  
**Testing**: Jest + React Testing Library  
**Target Platform**: Modern browsers (Chrome, Firefox, Safari, Edge)  
**Project Type**: Web application (Single Page Application, client-side only)  
**Performance Goals**: Participant list updates <1s; session close notification reaches all Peers within 2s  
**Constraints**: No backend server; fully client-side P2P via WebRTC; browser localStorage only  
**Scale/Scope**: Single session, 10-15 peers per room

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

**Principle I (Serverless & P2P First)**: ✅ All exit/close/disconnect logic operates over existing P2P data channels. No server needed.

**Principle II (Host-Centric Data Sovereignty)**: ✅ Host maintains the participant list and session state in-memory during the session. Peer state is cleared on exit (FR-008).

**Principle III (Zero-Trust Jira Integration)**: ✅ Not applicable to this feature (no Jira interaction).

**Principle IV (Functional Minimalism)**: ✅ Exit/Close/Disconnect are core planning poker flows. Confirmation dialogs add minimal friction for safety.

**Principle V (Exportable Results)**: ✅ Not applicable to this feature (no data export).

**Gate Result**: PASS — No violations. Proceed to Phase 0.

## Project Structure

### Documentation (this feature)

```text
specs/001-exit-quit/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command)
```

### Source Code (repository root)

```text
src/
├── components/
│   ├── ExitButton.tsx
│   ├── CloseSessionButton.tsx
│   ├── ConfirmDialog.tsx
│   └── HomeScreen.tsx
├── hooks/
│   ├── usePeerConnection.ts
│   └── useHeartbeat.ts
├── services/
│   ├── sessionManager.ts
│   └── messageProtocol.ts
├── types/
│   └── session.ts
└── utils/
    └── storage.ts

tests/
├── unit/
│   ├── ExitButton.test.tsx
│   ├── CloseSessionButton.test.tsx
│   ├── ConfirmDialog.test.tsx
│   ├── sessionManager.test.ts
│   └── messageProtocol.test.ts
└── integration/
    └── exit-flow.test.ts
```

**Structure Decision**: Single-project layout for a client-only SPA. Components in `src/components/`, shared logic in `src/services/`, custom hooks in `src/hooks/`. Tests colocated under `tests/` mirroring the source tree.

## Complexity Tracking

No constitution violations requiring justification.
