export type ItemSource = 'jira' | 'manual'

export interface BacklogItem {
  id: string
  key: string
  summary: string
  source: ItemSource
  orderIndex: number
}
