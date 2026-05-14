import { useState } from 'react'

interface ItemFormProps {
  onSave: (summary: string, key: string) => void
  onCancel: () => void
  initialSummary?: string
  initialKey?: string
}

export function ItemForm({ onSave, onCancel, initialSummary = '', initialKey = '' }: ItemFormProps) {
  const [summary, setSummary] = useState(initialSummary)
  const [key, setKey] = useState(initialKey)
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!summary.trim()) {
      setError('Summary is required')
      return
    }
    setError('')
    onSave(summary.trim(), key.trim())
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Key (optional)</label>
        <input
          type="text"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          placeholder="e.g. PROJ-123"
          className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Summary</label>
        <input
          type="text"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          placeholder="What needs to be estimated?"
          className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          autoFocus
        />
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      </div>
      <div className="flex gap-2 justify-end">
        <button
          type="button"
          onClick={onCancel}
          className="px-3 py-1.5 text-sm bg-gray-200 rounded hover:bg-gray-300"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-3 py-1.5 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Save
        </button>
      </div>
    </form>
  )
}
