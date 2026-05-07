import { useState } from 'react'
import type { JiraConfig, JiraIssue, FetchQueryType } from '../types/jira'
import { fetchIssues } from '../services/jiraApiService'
import { JiraIssueList } from './JiraIssueList'

interface JiraFetchFormProps {
  config: JiraConfig
  onAddToSession: (issues: JiraIssue[]) => void
}

export function JiraFetchForm({ config, onAddToSession }: JiraFetchFormProps) {
  const [queryType, setQueryType] = useState<FetchQueryType>('jql')
  const [queryValue, setQueryValue] = useState('')
  const [issues, setIssues] = useState<JiraIssue[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [editingSummary, setEditingSummary] = useState<string | null>(null)
  const [editText, setEditText] = useState('')

  const handleFetch = async () => {
    if (!queryValue.trim()) return
    setLoading(true)
    setError('')
    setIssues([])
    setSelected(new Set())
    try {
      const result = await fetchIssues(config, { type: queryType, value: queryValue.trim() })
      if (result.length === 0) {
        setError('No issues found.')
      } else if (result.length > 100) {
        setError(`Large result set: ${result.length} issues. Consider narrowing your query.`)
      }
      setIssues(result)
    } catch (err: any) {
      setError(err.message || 'Failed to fetch issues. Check your network and CORS settings.')
    }
    setLoading(false)
  }

  const handleSelectAll = () => {
    if (selected.size === issues.length) {
      setSelected(new Set())
    } else {
      setSelected(new Set(issues.map((i) => i.key)))
    }
  }

  const handleToggle = (key: string) => {
    const next = new Set(selected)
    if (next.has(key)) next.delete(key)
    else next.add(key)
    setSelected(next)
  }

  const handleAddToSession = () => {
    const toAdd = issues.filter((i) => selected.has(i.key))
    onAddToSession(toAdd)
  }

  const handleStartEdit = (issue: JiraIssue) => {
    setEditingSummary(issue.key)
    setEditText(issue.summary)
  }

  const handleSaveEdit = (key: string) => {
    setIssues((prev) => prev.map((i) => (i.key === key ? { ...i, summary: editText } : i)))
    setEditingSummary(null)
  }

  return (
    <div className="border rounded-lg p-4 space-y-3">
      <h3 className="text-lg font-semibold">Fetch Jira Issues</h3>

      <div className="flex gap-2">
        <select
          className="border rounded px-2 py-2 text-sm"
          value={queryType}
          onChange={(e) => setQueryType(e.target.value as FetchQueryType)}
        >
          <option value="jql">JQL Query</option>
          <option value="sprint">Sprint ID</option>
          <option value="epic">Epic Key</option>
        </select>
        <input
          className="border rounded px-3 py-2 flex-1"
          type="text"
          placeholder={
            queryType === 'jql' ? 'e.g. project = ABC' :
            queryType === 'sprint' ? 'e.g. 123' :
            'e.g. PROJ-123'
          }
          value={queryValue}
          onChange={(e) => setQueryValue(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') handleFetch() }}
        />
        <button
          className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
          onClick={handleFetch}
          disabled={loading}
        >
          {loading ? 'Fetching...' : 'Fetch'}
        </button>
      </div>

      {loading && <p className="text-sm text-gray-500">Fetching issues...</p>}
      {error && <p className="text-sm text-red-600">{error}</p>}

      {issues.length > 0 && (
        <div className="flex items-center gap-2">
          <label className="text-sm">
            <input type="checkbox" checked={selected.size === issues.length} onChange={handleSelectAll} />
            {' '}Select All ({issues.length})
          </label>
          <button
            className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
            onClick={handleAddToSession}
            disabled={selected.size === 0}
          >
            Add to Session ({selected.size})
          </button>
        </div>
      )}

      <JiraIssueList
        issues={issues}
        selected={selected}
        editingSummary={editingSummary}
        editText={editText}
        onToggle={handleToggle}
        onStartEdit={handleStartEdit}
        onEditTextChange={setEditText}
        onSaveEdit={handleSaveEdit}
      />
    </div>
  )
}
