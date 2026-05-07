# Implementation Plan: P2P Planning Poker

## Phase 1: Foundation (The P2P Bridge)
1. Initialize React project with Tailwind CSS.
2. Implement PeerJS signaling logic.
3. Build "Create Room" (Host) and "Join Room" (Peer) workflows.
4. Establish a basic JSON-based protocol for state sync (Host -> Peers).

## Phase 2: The Poker Room (Core Loop)
1. Build the Item List component (Manual entry + placeholder for Jira).
2. Implement the Voting Card component with support for Fibonacci/T-Shirt/Integer.
3. Develop the hidden/reveal state logic.
4. Implement the "More Info Needed" special vote type.

## Phase 3: External Integrations
1. Build the Jira Configuration panel for the Host.
2. Implement the Jira REST API client for fetching issues.
3. Create the CSV Export utility.
4. Add LocalStorage persistence for the Host's Jira settings and session history.

## Phase 4: Polish & Deployment
1. Add card reveal animations and sound effects (optional).
2. Implement "Host Focus" mode (syncing active item).
3. Final UI cleanup for mobile responsiveness.
4. Deploy to GitHub Pages via GitHub Actions.

## Verification & Testing Strategy
- **P2P Testing**: Test with two browser windows (one Host, one Peer) locally.
- **Mock Jira**: Create a mock Jira API response to test fetching logic without requiring a live token initially.
- **Data Integrity**: Verify CSV export correctly handles special characters and comma-separated vote lists.
