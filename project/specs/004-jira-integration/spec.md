# Feature Specification: Jira Integration

**Feature Branch**: `004-jira-integration`  
**Created**: 2026-05-07  
**Status**: Draft  
**Input**: User request: "Jira integration"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Host Configures Jira (Priority: P1)

As a Host, I want to securely provide my Jira credentials so that the application can fetch issues on my behalf without exposing my token to a middleman, and ensure they are encrypted at rest on my device using a session-based key.

**Why this priority**: Prerequisite for all Jira-related functionality and provides a high security posture.

**Independent Test**: Host enters Jira details. Verify the API Token stored in `localStorage` is an encrypted string. Refresh the page; verify the application requires the Host to re-enter their Jira Token because the session-based encryption key was wiped from memory.

**Acceptance Scenarios**:

1. **Given** I am the Host, **When** I enter my Jira details, **Then** the system generates a high-quality random encryption key in memory (never written to disk).
2. **Given** a session key is generated, **When** the Jira API Token is saved, **Then** it is encrypted using that key and stored in `localStorage`.
3. **Given** I have saved credentials, **When** I refresh the browser or close the tab, **Then** the session key is lost, and the application requires me to re-enter my Jira Token to re-enable integration.
4. **Given** I re-enter my token, **When** it matches the original encrypted form (or replaces it), **Then** Jira fetching is restored for the current session.
5. **Given** I want to remove my credentials, **When** I click "Clear Credentials", **Then** all Jira data is deleted from `localStorage`.

---

### User Story 2 - Host Fetches Issues (Priority: P1)

As a Host, I want to fetch a specific set of issues from Jira using a Sprint ID, Epic Key, or JQL query so that I can quickly populate the voting list for the session.

**Why this priority**: Core workflow for starting a planning session.

**Independent Test**: Enter a valid JQL query (e.g., `project = "ABC" AND sprint = 123`). Verify a list of issues with their keys and summaries is returned and displayed in the "Items to Vote" panel.

**Acceptance Scenarios**:

1. **Given** valid credentials, **When** I enter a JQL query, **Then** the system fetches and displays the `key` and `summary` for each matching issue.
2. **Given** I fetch issues by "Epic Key", **When** the fetch completes, **Then** all issues linked to that Epic are added to the potential voting list.
3. **Given** a fetch is in progress, **When** I look at the UI, **Then** I see a loading spinner or progress indicator.

---

### User Story 3 - Adding Issues to Session (Priority: P2)

As a Host, I want to select specific issues from the fetched results to add to the active session so that we only vote on the items relevant to today's goal.

**Why this priority**: Allows for curation of the voting backlog.

**Independent Test**: Fetch 10 issues. Select 5 checkboxes. Click "Add to Session". Verify only those 5 issues appear in the active "Items to Vote" list for the Host and Peers.

**Acceptance Scenarios**:

1. **Given** a list of fetched Jira issues, **When** I select a subset and click "Add to Session", **Then** those items are synchronized to all connected Peers.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST store Jira credentials (Domain, Email, API Token) exclusively in the Host's `localStorage`.
- **FR-002**: All Jira API requests MUST be made directly from the Host's browser to the Jira REST API using `fetch`.
- **FR-003**: System MUST support fetching issues via:
    - **JQL Query** (text input).
    - **Sprint ID** (numeric input).
    - **Epic Key** (text input, e.g., "PROJ-123").
- **FR-004**: System MUST map the Jira `key` and `fields.summary` to the internal item list.
- **FR-005**: System MUST handle CORS preflight requirements for Jira's REST API.
- **FR-006**: System MUST allow the Host to edit the Issue Summary locally after fetching if needed (without syncing back to Jira).
- **FR-007**: System MUST provide a "Test Connection" feature that validates the credentials before saving.

### Key Entities

- **JiraConfig**: Object containing Domain, Email, and Token.
- **JiraIssue**: Temporary object representing the raw Jira response before it's converted to a session item.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Jira API fetches for < 50 items complete in < 3 seconds (on standard broadband).
- **SC-002**: 0% of Jira credentials leave the Host's browser for any destination other than `atlassian.net`.
- **SC-003**: The Jira API Token is unreadable in its stored form without the in-memory session key.
- **SC-004**: 100% of Jira issues with valid Key and Summary are correctly rendered in the selection list.

## Edge Cases

- **Session Key Loss**: Upon page refresh, the Host is prompted to re-enter their Jira Token. The Domain and Email remain persisted for convenience.
- **Invalid Token (401)**: If the API returns a 401 Unauthorized, the system MUST prompt the Host to check their Email/Token.
- **Forbidden (403)**: If the API returns a 403 Forbidden, the system MUST inform the Host they lack permissions for the requested project/filter.
- **Empty Results**: If a JQL query returns 0 issues, the system MUST display a clear "No issues found" message.
- **Large Result Sets**: If a query returns > 100 issues, the system SHOULD warn the Host or implement basic pagination (fetching the first 100).
- **CORS Failures**: If the browser blocks the request due to CORS, provide a help link explaining how to check Atlassian API permissions or browser settings.

## Assumptions

- We assume the Host has an Atlassian API Token (not their Jira password).
- We assume the Jira Domain follows the format `[company].atlassian.net`.
- We assume Jira Cloud is the target; Jira Data Center/Server (on-prem) is out of scope for the initial implementation.
mentation.
