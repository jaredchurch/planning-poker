# Implementation Plan: Room Management & Presence

**Branch**: `005-room-management` | **Date**: 2026-05-07 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/specs/005-room-management/spec.md`

## Summary

Implement the foundation of the P2P planning poker application: Host creates a room with a unique ID, Peers join via invite link, and all participants see a real-time presence list. This is the entry point for all other features.

## Technical Context

**Language/Version**: JavaScript (ES2022+), React 18  
**Primary Dependencies**: React, PeerJS, Tailwind CSS  
**Storage**: Host in-memory (participant list, room state)  
**Testing**: Jest + React Testing Library  
**Target Platform**: Modern browsers (Chrome, Firefox, Safari, Edge)  
**Project Type**: Web application (Single Page Application, client-side only)  
**Performance Goals**: Room creation <2s; join via link <3s; presence updates <1s  
**Constraints**: No backend; P2P via PeerJS signaling; WebRTC handshake required; unique room IDs  
**Scale/Scope**: Single room, 10-15 peers

## Constitution Check

**Principle I (Serverless & P2P First)**: ✅ Room creation and joining use PeerJS signaling and WebRTC. No server.

**Principle II (Host-Centric Data Sovereignty)**: ✅ Host maintains presence list. Peers connect directly to Host.

**Principle III (Zero-Trust Jira)**: ✅ Not applicable.

**Principle IV (Functional Minimalism)**: ✅ Core room management is essential — Create, Join, Presence list.

**Principle V (Exportable Results)**: ✅ Not applicable.

**Gate Result**: PASS — No violations.

## Project Structure

```text
specs/005-room-management/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
└── tasks.md
```

```text
src/
├── components/
│   ├── LandingPage.tsx
│   ├── CreateRoomForm.tsx
│   ├── JoinRoomForm.tsx
│   ├── ParticipantList.tsx
│   └── CopyLinkButton.tsx
├── hooks/
│   ├── useRoom.ts
│   └── usePresence.ts
├── services/
│   ├── roomService.ts
│   └── peerConnectionService.ts
├── types/
│   └── room.ts
└── utils/
    └── roomIdGenerator.ts
```
