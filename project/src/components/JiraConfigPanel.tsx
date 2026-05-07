import { useState, useEffect } from 'react'
import { TestConnectionButton } from './TestConnectionButton'
import { getStoredDomain, getStoredEmail, storeCredentials, clearCredentials } from '../services/jiraAuthService'
import type { JiraConfig } from '../types/jira'

interface JiraConfigPanelProps {
  onConfigChange: (config: JiraConfig | null) => void
}

export function JiraConfigPanel({ onConfigChange }: JiraConfigPanelProps) {
  const [domain, setDomain] = useState(getStoredDomain())
  const [email, setEmail] = useState(getStoredEmail())
  const [token, setToken] = useState('')
  const [showToken, setShowToken] = useState(false)

  useEffect(() => {
    if (domain && email && token) {
      onConfigChange({ domain, email, token })
    } else {
      onConfigChange(null)
    }
  }, [domain, email, token, onConfigChange])

  const handleSave = () => {
    storeCredentials(domain, email)
  }

  const handleClear = () => {
    clearCredentials()
    setDomain('')
    setEmail('')
    setToken('')
    onConfigChange(null)
  }

  const config: JiraConfig = { domain, email, token }

  return (
    <div className="border rounded-lg p-4 space-y-3">
      <h3 className="text-lg font-semibold">Jira Configuration</h3>

      <div>
        <label className="block text-sm text-gray-600">Domain</label>
        <input
          className="border rounded px-3 py-2 w-full"
          type="text"
          placeholder="company.atlassian.net"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm text-gray-600">Email</label>
        <input
          className="border rounded px-3 py-2 w-full"
          type="email"
          placeholder="you@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm text-gray-600">
          API Token
          <span className="text-xs text-gray-400 ml-1">(session only — re-enter on refresh)</span>
        </label>
        <div className="flex gap-2">
          <input
            className="border rounded px-3 py-2 flex-1"
            type={showToken ? 'text' : 'password'}
            placeholder="Your API token"
            value={token}
            onChange={(e) => setToken(e.target.value)}
          />
          <button
            className="px-2 py-1 text-xs bg-gray-200 rounded hover:bg-gray-300"
            onClick={() => setShowToken(!showToken)}
          >
            {showToken ? 'Hide' : 'Show'}
          </button>
        </div>
      </div>

      <div className="flex gap-2 items-center">
        <button
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
          onClick={handleSave}
        >
          Save
        </button>
        <button
          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
          onClick={handleClear}
        >
          Clear Credentials
        </button>
        <TestConnectionButton config={config} />
      </div>
    </div>
  )
}
