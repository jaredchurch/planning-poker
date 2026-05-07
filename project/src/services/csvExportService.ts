import type { ExportedItem } from '../types/export'
import { toCsvString } from '../utils/csvFormatter'

export function generateCsv(items: ExportedItem[]): string {
  const header = ['Issue Key', 'Summary', 'Individual Votes', 'Final Consensus']
  const rows = items.map((item) => {
    const votesStr = Object.entries(item.individualVotes)
      .map(([name, value]) => `${name}: ${value}`)
      .join(', ')
    return [item.issueKey, item.summary, votesStr, item.finalConsensus !== null ? String(item.finalConsensus) : '']
  })
  return toCsvString(header, rows)
}

export function downloadCsv(csv: string, filename: string): void {
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

export function detectDuplicateKeys(items: ExportedItem[]): string[] {
  const seen = new Map<string, number>()
  const duplicates: string[] = []
  for (const item of items) {
    const count = (seen.get(item.issueKey) || 0) + 1
    seen.set(item.issueKey, count)
    if (count === 2) duplicates.push(item.issueKey)
  }
  return duplicates
}

export function resolveDuplicates(items: ExportedItem[], _duplicates: string[]): ExportedItem[] {
  const counts = new Map<string, number>()
  return items.map((item) => {
    const count = (counts.get(item.issueKey) || 0) + 1
    counts.set(item.issueKey, count)
    if (count > 1) {
      return { ...item, issueKey: `${item.issueKey}(${count})` }
    }
    return item
  })
}

export function generateFilename(): string {
  const date = new Date().toISOString().split('T')[0]
  return `planning-poker-results-${date}.csv`
}
