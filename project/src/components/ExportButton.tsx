import { useState } from 'react'
import type { ExportedItem } from '../types/export'
import { generateCsv, downloadCsv, generateFilename, detectDuplicateKeys, resolveDuplicates } from '../services/csvExportService'

interface ExportButtonProps {
  items: ExportedItem[]
}

export function ExportButton({ items }: ExportButtonProps) {
  const [showConflictDialog, setShowConflictDialog] = useState(false)
  const [conflictKeys, setConflictKeys] = useState<string[]>([])

  const handleExport = () => {
    const duplicates = detectDuplicateKeys(items)
    if (duplicates.length > 0) {
      setConflictKeys(duplicates)
      setShowConflictDialog(true)
      return
    }
    doExport(items)
  }

  const doExport = (exportItems: ExportedItem[]) => {
    const csv = generateCsv(exportItems)
    const filename = generateFilename()
    downloadCsv(csv, filename)
  }

  const handleResolveAndExport = () => {
    const resolved = resolveDuplicates(items, conflictKeys)
    setShowConflictDialog(false)
    doExport(resolved)
  }

  const handleRemoveDuplicates = () => {
    const seen = new Set<string>()
    const deduped = items.filter((item) => {
      if (seen.has(item.issueKey)) return false
      seen.add(item.issueKey)
      return true
    })
    setShowConflictDialog(false)
    doExport(deduped)
  }

  return (
    <>
      <button
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 font-semibold"
        onClick={handleExport}
      >
        Export CSV
      </button>

      {showConflictDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg p-6 shadow-xl max-w-sm">
            <h3 className="text-lg font-semibold mb-2">Duplicate Issue Keys</h3>
            <p className="text-sm text-gray-600 mb-4">
              The following keys appear more than once: {conflictKeys.join(', ')}.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 text-sm"
                onClick={handleRemoveDuplicates}
              >
                Remove Duplicates
              </button>
              <button
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                onClick={handleResolveAndExport}
              >
                Auto-Suffix
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
