import type { JiraConfig, JiraIssue, FetchQuery } from '../types/jira'

function authHeader(config: JiraConfig): string {
  return 'Basic ' + btoa(`${config.email}:${config.token}`)
}

async function jiraFetch(config: JiraConfig, path: string): Promise<unknown> {
  const res = await fetch(`https://${config.domain}${path}`, {
    headers: {
      Authorization: authHeader(config),
      Accept: 'application/json',
    },
  })
  if (!res.ok) {
    if (res.status === 401) throw new Error('Invalid credentials. Check your email or API token.')
    if (res.status === 403) throw new Error('Access denied. You may lack permissions for this resource.')
    throw new Error(`Jira API error (${res.status})`)
  }
  return res.json()
}

export async function testConnection(config: JiraConfig): Promise<boolean> {
  await jiraFetch(config, '/rest/api/3/myself')
  return true
}

export async function fetchByJql(config: JiraConfig, jql: string): Promise<JiraIssue[]> {
  const data: any = await jiraFetch(config, `/rest/agile/1.0/issue/search?jql=${encodeURIComponent(jql)}`)
  return mapIssues(data)
}

export async function fetchBySprint(config: JiraConfig, sprintId: string): Promise<JiraIssue[]> {
  const data: any = await jiraFetch(config, `/rest/agile/1.0/sprint/${sprintId}/issue`)
  return mapIssues(data)
}

export async function fetchByEpic(config: JiraConfig, epicKey: string): Promise<JiraIssue[]> {
  const data: any = await jiraFetch(config, `/rest/agile/1.0/epic/${epicKey}/issue`)
  return mapIssues(data)
}

export async function fetchIssues(config: JiraConfig, query: FetchQuery): Promise<JiraIssue[]> {
  switch (query.type) {
    case 'jql':
      return fetchByJql(config, query.value)
    case 'sprint':
      return fetchBySprint(config, query.value)
    case 'epic':
      return fetchByEpic(config, query.value)
  }
}

function mapIssues(data: any): JiraIssue[] {
  if (!data?.issues) return []
  return data.issues.map((issue: any) => ({
    key: issue.key || '',
    summary: issue.fields?.summary || '',
    selected: false,
  }))
}
