# Research: Jira Integration

## Authentication Flow

**Decision**: Host enters Domain, Email, API Token. Token is stored only in memory (session-scoped). Domain and Email persist in localStorage for convenience.

**Rationale**: Per FR-001/FR-002 and constitution P3 (Zero-Trust). Session-scoped token means page refresh requires re-entry. Domain and Email persist to reduce friction.

## Jira API Endpoints

**Decision**: Use Jira Cloud REST API v3.

| Fetch Type | Endpoint |
|------------|----------|
| JQL | `GET /rest/agile/1.0/issue/search?jql={query}` |
| Sprint ID | `GET /rest/agile/1.0/sprint/{id}/issue` |
| Epic Key | `GET /rest/agile/1.0/epic/{epicKey}/issue` |

**Rationale**: Standard Jira Cloud APIs. The Agile endpoints provide structured results suitable for sprint planning workflows.

## Issue Mapping

**Decision**: Map `key` and `fields.summary` from Jira response to internal `{ id, key, summary }` format.

**Rationale**: FR-004. Simple mapping, discards fields not needed for planning poker.

## CORS Handling

**Decision**: Jira Cloud supports CORS for browser-based API calls. No special handling needed beyond standard `fetch`.

**Rationale**: Atlassian's API documentation confirms CORS support for Jira Cloud. If issues arise, provide user guidance (per spec Edge Cases).

## Test Connection

**Decision**: Call `GET /rest/api/3/myself` with provided credentials. If 200 → valid. If 401/403 → show appropriate error.

**Rationale**: Minimal API call that validates both connectivity and credentials. Per FR-007.
