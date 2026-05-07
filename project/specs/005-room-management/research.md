# Research: Room Management & Presence

## Room ID Generation

**Decision**: Use a short, human-readable code (6 alphanumeric characters, e.g., `ABC123`) rather than a full UUID.

**Rationale**: FR-002 requires unique and sufficiently random IDs. Short codes are easier to share verbally. 36^6 = ~2.2 billion combinations is sufficient for a client-side app.

## PeerJS Signaling

**Decision**: Use PeerJS free signaling server by default. Host creates a Peer with a new PeerJS ID. Room ID is the Host's PeerJS ID.

**Rationale**: Simplest approach. PeerJS handles WebRTC negotiation. The Host's PeerJS ID becomes the room identifier — Peers connect to it.

## Deep Linking

**Decision**: Use URL hash fragment: `https://domain.com/#/join/{roomId}`

**Rationale**: FR-003. Hash routing works with GitHub Pages (SPA-friendly). No server-side URL rewriting needed.

## Duplicate Name Handling

**Decision**: On join, check if name exists in presence list. If duplicate, append numeric suffix: "Alice (2)".

**Rationale**: Spec edge case requires this. Minimal change, clear to users.

## Connection States

**Decision**: Show "Connecting..." state during WebRTC handshake. On failure, show "Room Not Found" for invalid IDs.

**Rationale**: Spec edge cases for slow connection and invalid room ID require user feedback.
