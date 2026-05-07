# Implementation Plan: Core Voting Loop

**Branch**: `002-voting-loop` | **Date**: 2026-05-07 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/specs/002-voting-loop/spec.md`

## Summary

Implement the core planning poker voting loop: Peers cast votes (Fibonacci, T-Shirt, Integers scales), Host manages reveal (manual + auto-reveal), votes are hidden until reveal, consensus is calculated, and Host can focus the team on a specific item.

## Technical Context

**Language/Version**: JavaScript (ES2022+), React 18  
**Primary Dependencies**: React, PeerJS, Tailwind CSS  
**Storage**: Host in-memory (vote state per round)  
**Testing**: Jest + React Testing Library  
**Target Platform**: Modern browsers (Chrome, Firefox, Safari, Edge)  
**Project Type**: Web application (Single Page Application, client-side only)  
**Performance Goals**: Vote sync <500ms; reveal sync <1s; focus sync <1s  
**Constraints**: No backend server; P2P via PeerJS data channels; hidden votes until Host reveals  
**Scale/Scope**: Single session, 10-15 peers, up to 50 items

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

**Principle I (Serverless & P2P First)**: ✅ Vote data flows over existing P2P data channels. No server.

**Principle II (Host-Centric Data Sovereignty)**: ✅ Host maintains vote state and reveal status. Peers only send their vote.

**Principle III (Zero-Trust Jira)**: ✅ Not applicable.

**Principle IV (Functional Minimalism)**: ✅ Core planning poker flow. Card-based voting, reveal, and focus are essential.

**Principle V (Exportable Results)**: ✅ Voting results feed into CSV export feature (003). Data is not locked in.

**Gate Result**: PASS — No violations.

## Project Structure

```text
specs/002-voting-loop/
├── plan.md              # This file
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
└── tasks.md
```

```text
src/
├── components/
│   ├── VotingCard.tsx
│   ├── VotingBoard.tsx
│   ├── RevealButton.tsx
│   ├── VoteResults.tsx
│   ├── ItemList.tsx
│   └── FocusButton.tsx
├── services/
│   ├── votingService.ts
│   └── consensusService.ts
├── types/
│   └── voting.ts
└── utils/
    └── scales.ts

tests/
├── unit/
└── integration/
```

**Structure Decision**: Single-project SPA layout. Story-specific components in `src/components/`, voting logic in `src/services/`, shared types in `src/types/`.
