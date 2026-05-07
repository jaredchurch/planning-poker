# Feature Specification: Jira Integration

**Feature Branch**: `004-jira-integration`  
**Created**: 2026-05-07  
**Status**: Draft  
**Input**: User request: "Jira integration"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Host Configures Jira (Priority: P1)

As a Host, I want to securely provide my Jira credentials so that the application can fetch issues on my behalf without exposing my token to a middleman, and ensure they are secured on my device for the duration of the session.

**Why this priority**: Prerequisite for all Jira-related functionality and provides a high security posture.

**Independent Test**: Host enters Jira details. Verify the credentials are stored securely and are not visible in plain text. Refresh the page; verify the application requires the Host to re-enter their Jira Token because the stored credentials are no longer accessible after the session ends.

**Acceptance Scenarios**:

1. **Given** I am the Host, **When** I enter my Jira details, **Then** the system stores them securely so they are not readable in plain text.
2. **Given** my credentials are stored, **When** I close the tab or refresh the page, **Then** the application requires me to re-enter my Jira Token before I can use the integration again.
3. **Given** I have entered my Jira Token in a previous session, **When** I return to the page, **Then** my Domain and Email are still filled in, but I must re-enter my Token.
4. **Given** I want to remove my credentials, **When** I click "Clear Credentials", **Then** all Jira data is removed from the application.

---

### User Story 2 - Host Fetches Issues (Priority: P1)

As a Host, I want to fetch a specific set of issues from Jira using a Sprint ID, Epic Key, or JQL query so that I can quickly populate the voting list for the session.

**Why this priority**: Core workflow for starting a planning session.

**Independent Test**: Enter a valid JQL query (e.g., `project = "ABC" AND sprint = 123`). Verify a list of issues with their keys and summaries is returned and displayed in the "Items to Vote" panel.

**Acceptance Scenarios**:

1. **Given** valid credentials, **When** I enter a JQL query, **Then** the system fetches and displays the key and summary for each matching issue.
2. **Given** I fetch issues by Epic Key, **When** the fetch completes, **Then** all issues linked to that Epic are added to the potential voting list.
3. **Given** a fetch is in progress, **When** I look at the UI, **Then** I see a loading indicator.

---

### User Story 3 - Adding Issues to Session (Priority: P2)

As a Host, I want to select specific issues from the fetched results to add to the active session so that we only vote on the items relevant to today's goal.

**Why this priority**: Allows for curation of the voting backlog.

**Independent Test**: Fetch 10 issues. Select 5 checkboxes. Click "Add to Session". Verify only those 5 issues appear in the active "Items to Vote" list for the Host and Peers.

**Acceptance Scenarios**:

1. **Given** a list of fetched Jira issues, **When** I select a subset and click "Add to Session", **Then** those items are synchronized to all connected Peers.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST store Jira credentials (Domain, Email, API Token) exclusively on the Host's device and not transmit them to any third party.
- **FR-002**: All Jira API requests MUST be made directly from the Host's browser to the Jira API.
- **FR-003**: System MUST support fetching issues via:
    - **JQL Query** (text input).
    - **Sprint ID** (numeric input).
    - **Epic Key** (text input, e.g., "PROJ-123").
- **FR-004**: System MUST map the Jira issue key and summary to the internal item list.
- **FR-005**: System MUST handle communication restrictions between the browser and Jira's API (e.g., cross-origin policies).
- **FR-006**: System MUST allow the Host to edit the Issue Summary locally after fetching if needed (without syncing back to Jira).
- **FR-007**: System MUST provide a "Test Connection" feature that validates the credentials before saving.

### Key Entities

- **JiraConfig**: The Host's Jira connection details including Domain, Email, and Token.
- **JiraIssue**: A Jira issue consisting of an issue key and summary, displayed for selection.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Jira API fetches for fewer than 50 items complete in less than 3 seconds (on standard broadband).
- **SC-002**: Zero Jira credentials are sent to any destination other than the Jira API.
- **SC-003**: Stored credentials are not readable without the Host re-authenticating in the current session.
- **SC-004**: All Jira issues with a valid key and summary are correctly rendered in the selection list.

## Edge Cases

- **Session Expiry**: Upon page refresh, the Host is prompted to re-enter their Jira Token. The Domain and Email remain persisted for convenience.
- **Invalid Credentials**: If the API rejects the credentials, the system MUST prompt the Host to check their Email or Token.
- **Access Denied**: If the API indicates the user lacks permissions for the requested project or filter, the system MUST inform the Host.
- **Empty Results**: If a query returns no issues, the system MUST display a clear "No issues found" message.
- **Large Result Sets**: If a query returns more than 100 issues, the system SHOULD warn the Host that the result set is large.
- **Connection Failures**: If the browser is unable to reach the Jira API, provide a help link explaining how to check network connectivity or permissions.

## Assumptions

- We assume the Host has an Atlassian API Token (not their Jira password).
- We assume the Jira Domain follows the format `[company].atlassian.net`.
- We assume Jira Cloud is the target; Jira Data Center/Server (on-prem) is out of scope for the initial implementation.
