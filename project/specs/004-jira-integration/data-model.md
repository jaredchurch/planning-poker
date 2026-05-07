# Data Model: Jira Integration

## JiraConfig

| Field | Type | Persists? | Description |
|-------|------|-----------|-------------|
| domain | string | Yes (localStorage) | e.g., "company.atlassian.net" |
| email | string | Yes (localStorage) | Atlassian account email |
| token | string | No (session only) | API token — never persisted to disk |

## JiraIssue

| Field | Type | Description |
|-------|------|-------------|
| key | string | e.g., "PROJ-123" |
| summary | string | Issue title from Jira |
| selected | boolean | Whether Host selected it for the session |

## FetchQuery

| Field | Type | Description |
|-------|------|-------------|
| type | "jql" \| "sprint" \| "epic" | Query type |
| value | string | The query string |

## Validation Rules

- `domain`: Must match `[subdomain].atlassian.net` pattern
- `email`: Must be valid email format
- `token`: Must not be empty
- `FetchQuery.value`: Must not be empty
