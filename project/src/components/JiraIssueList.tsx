import type { JiraIssue } from '../types/jira'

interface JiraIssueListProps {
  issues: JiraIssue[]
  selected: Set<string>
  editingSummary: string | null
  editText: string
  onToggle: (key: string) => void
  onStartEdit: (issue: JiraIssue) => void
  onEditTextChange: (text: string) => void
  onSaveEdit: (key: string) => void
}

export function JiraIssueList({
  issues,
  selected,
  editingSummary,
  editText,
  onToggle,
  onStartEdit,
  onEditTextChange,
  onSaveEdit,
}: JiraIssueListProps) {
  return (
    <ul className="space-y-2 max-h-64 overflow-y-auto">
      {issues.map((issue) => (
        <li key={issue.key} className="flex items-start gap-2 p-2 hover:bg-gray-50 rounded">
          <input
            type="checkbox"
            checked={selected.has(issue.key)}
            onChange={() => onToggle(issue.key)}
            className="mt-1"
          />
          <div className="flex-1 min-w-0">
            <span className="font-mono text-sm text-gray-500">{issue.key}</span>
            {editingSummary === issue.key ? (
              <input
                className="border rounded px-2 py-1 w-full text-sm mt-1"
                value={editText}
                onChange={(e) => onEditTextChange(e.target.value)}
                onBlur={() => onSaveEdit(issue.key)}
                onKeyDown={(e) => { if (e.key === 'Enter') onSaveEdit(issue.key) }}
                autoFocus
              />
            ) : (
              <p
                className="text-sm cursor-pointer hover:text-blue-600"
                onClick={() => onStartEdit(issue)}
              >
                {issue.summary || '(no summary)'}
              </p>
            )}
          </div>
        </li>
      ))}
    </ul>
  )
}
