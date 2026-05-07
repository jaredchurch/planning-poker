# Planning Poker Project Constitution

## Core Principles

### I. Serverless & P2P First
The application must remain entirely serverless. Real-time collaboration is achieved strictly via browser-to-browser Peer-to-Peer (P2P) communication (WebRTC). A "Host" browser coordinates the session; no central backend or database server is allowed.

### II. Host-Centric Data Sovereignty
The Host's browser is the single source of truth. All session state, item lists, and voting results must be stored exclusively in the Host's local storage (LocalStorage or IndexedDB). Peers do not persist session data.

### III. Zero-Trust Jira Integration
Jira authentication and API interaction must happen entirely client-side. API tokens and domains are stored only in the user's local browser storage. No proxy or intermediate server may touch Jira credentials or data.

### IV. Functional Minimalism
The UI should be focused on the core "Planning Poker" experience: selecting items, voting with cards, and revealing results. Secondary features (like stats or complex issue management) should not compromise the simplicity of the main loop.

### V. Exportable Results
The system must never "lock in" data. The Host must always have the ability to export session results to a standard CSV format for use in other tools.

## Governance
This constitution supersedes all implementation decisions. Any deviation from these principles (e.g., adding a backend) requires a formal amendment to this document.

**Version**: 1.0.0 | **Ratified**: 2026-05-07
