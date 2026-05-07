export function escapeCsvField(value: string): string {
  if (value.includes(',') || value.includes('"') || value.includes('\n')) {
    return `"${value.replace(/"/g, '""')}"`
  }
  return value
}

export function toCsvRow(fields: string[]): string {
  return fields.map(escapeCsvField).join(',') + '\n'
}

export function toCsvString(header: string[], rows: string[][]): string {
  let csv = toCsvRow(header)
  for (const row of rows) {
    csv += toCsvRow(row)
  }
  return csv
}
