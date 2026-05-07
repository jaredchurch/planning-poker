export interface JiraConfig {
  domain: string
  email: string
  token: string
}

export interface JiraIssue {
  key: string
  summary: string
  selected: boolean
}

export type FetchQueryType = 'jql' | 'sprint' | 'epic'

export interface FetchQuery {
  type: FetchQueryType
  value: string
}
