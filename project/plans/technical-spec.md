# Technical Specifications: P2P Planning Poker

## 1. System Architecture
- **Protocol**: WebRTC (via PeerJS) for P2P data channels.
- **Role Assignment**:
    - **Host**: Manages the `roomID`, acts as the signaling hub, maintains the master state, and handles Jira/CSV operations.
    - **Peer**: Connects to the Host, receives state updates, and sends voting actions.

## 2. Functional Requirements

### 2.1 Session Management
- **Room Creation**: Host generates a unique URL/ID.
- **Joining**: Peers enter the room via URL. No registration/login required.
- **User Identity**: Users provide a simple display name upon joining.

### 2.2 Jira Integration (Host Only)
- **Configuration**: Host inputs Jira Domain, Email, and API Token.
- **Fetching**: Ability to fetch issues from Jira via:
    - Sprint ID
    - Epic Key
    - JQL Query
- **Mapping**: Fetch `key` and `summary` for each issue.

### 2.3 Voting Engine
- **Voting Modes**:
    - **Fibonacci**: [1, 2, 3, 5, 8, 13, 21, "More Info Needed"]
    - **T-Shirt**: [XS, S, M, L, XL, ?, "More Info Needed"]
    - **Integers**: [1-10, "More Info Needed"]
- **Constraints**: All numeric options must be integers $\ge 1$.
- **Reveal Logic**: Votes are hidden (shown as card backs) until:
    - All connected peers have voted.
    - OR the Host manually clicks "Reveal".
- **Focus Control**: Host can set a specific item as "Active", forcing all Peers' UI to focus on that item.

### 2.4 Data Persistence & Export
- **Storage**: Use `localStorage` on the Host for configuration and active session state.
- **Export**: Generate a CSV with columns: `Issue Key`, `Summary`, `Individual Votes`, `Final Consensus`.

## 3. UI/UX Requirements
- **Card-Based Interface**: Voting options must be presented as a row of interactive playing cards.
- **Responsive Design**: Must work on desktop and mobile browsers.
- **Real-time Indicators**: Show who has voted (without showing their value) and who is still "thinking".

## 4. Security & Privacy
- **Direct Jira API**: All Jira requests use `fetch` directly to the Jira REST API.
- **No Analytics**: No tracking pixels or external telemetry.
