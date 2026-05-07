# Quickstart: Jira Integration

## Key Flows

### Configure Jira
1. Host opens Jira Configuration panel
2. Enters Domain (e.g., `company.atlassian.net`), Email, API Token
3. Clicks "Test Connection" → validates credentials
4. Credentials saved (Domain/Email persisted, Token session-scoped)

### Fetch Issues
1. Host enters a JQL query, Sprint ID, or Epic Key
2. Loading indicator shown during fetch
3. Results displayed as a list with checkbox selection
4. Host selects desired issues → clicks "Add to Session"

### Add to Session
1. Selected issues appear in the "Items to Vote" list
2. All connected Peers see the new items

## Edge Cases
- **Page refresh**: Token must be re-entered; Domain/Email pre-filled
- **Invalid credentials**: Clear error message shown
- **Empty results**: "No issues found" message
- **Large results**: Warning if >100 issues returned
