# Planning Poker Project Setup: Constitution & Specifications

## Objective
To define the architectural principles, functional requirements, and technical specifications for a serverless, P2P-based Planning Poker application hosted on GitHub Pages.

---

## 1. Project Constitution

### I. Peer-to-Peer (P2P) First
The application must operate without a dedicated backend. Real-time collaboration is achieved via WebRTC (PeerJS). One user acts as the "Host," serving as the signaling coordinator and state manager for the session.

### II. Host-Centric Data Sovereignty
The Host's browser is the single source of truth for session data. All session state, including the list of items to vote on and the results, is stored in the Host's `localStorage` or `IndexedDB`. No external database is permitted.

### III. Privacy & Security
Jira credentials and API tokens must never be sent to any third-party server. All API calls to Jira must occur directly from the user's browser to the Jira REST API.

### IV. Interoperability
The system must support standard data exchange formats. Specifically, it must be able to export session results to CSV and import issues from Jira via JQL or Sprint/Epic filters.

---

## 2. Technical Specification

### Functional Requirements
1. **Session Management**:
   - Create a session (Host generates a unique ID/link).
   - Join a session (Peers connect to the Host using the ID).
2. **Jira Integration**:
   - Host provides Jira Domain, Email, and API Token.
   - Fetch issues by Sprint ID, Epic Key, or JQL.
   - Populate the "To-Vote" list with issue keys and summaries.
3. **Voting Mechanics**:
   - Support for: Fibonacci (1, 2, 3, 5, 8, 13, 21), T-Shirt (XS, S, M, L, XL, ?), Integer (1-10), and a special "More Info Needed" option.
   - All numeric voting options must result in integers >= 1.
   - UI: Voting options presented as selectable playing cards.
   - Hidden votes: Results are masked until all participants have voted or the Host manually reveals them.
   - Host-controlled flow: Host can force all users to focus on a single active item.
4. **Data Export**:
   - Host can trigger a CSV export containing: Issue Key, Summary, Individual Votes, and Final Consensus (if determined).

### Technical Stack (Proposed)
- **Frontend**: React (Single Page Application).
- **Styling**: Tailwind CSS for a modern, responsive card-based UI.
- **Real-time**: PeerJS for simplified WebRTC implementation.
- **Storage**: Browser LocalStorage/IndexedDB (Zustand or Redux with persistence).
- **Hosting**: GitHub Pages.

---

## 3. Implementation Roadmap (Planning)

### Phase 1: Core P2P Infrastructure
- Set up React project with PeerJS.
- Implement Host/Peer connection logic.
- Basic state synchronization (heartbeat, user list).

### Phase 2: Voting & Session UI
- Implement the voting card components.
- Create the Host control panel (Item selection, Reveal results).
- Build the Peer view (Active item display, Voting interface).

### Phase 3: Data & Integrations
- Implement the Jira REST API client.
- Add CSV export functionality.
- Persist Host session data to LocalStorage.

### Phase 4: Refinement & Polishing
- Add animations for card reveals.
- Implement T-Shirt and Integer voting modes.
- Final testing on GitHub Pages.
