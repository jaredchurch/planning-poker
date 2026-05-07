export interface ExportedItem {
  issueKey: string
  summary: string
  individualVotes: Record<string, number | string>
  finalConsensus: number | string | null
}

export interface SessionResult {
  items: ExportedItem[]
}

export interface ExportConfig {
  filename: string
  format: 'rfc4180'
}
