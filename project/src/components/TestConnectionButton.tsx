import { useState } from 'react'
import type { JiraConfig } from '../types/jira'
import { testConnection } from '../services/jiraApiService'

interface TestConnectionButtonProps {
  config: JiraConfig
}

export function TestConnectionButton({ config }: TestConnectionButtonProps) {
  const [status, setStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleTest = async () => {
    if (!config.domain || !config.email || !config.token) {
      setStatus('error')
      setMessage('Please fill in all fields')
      return
    }
    setStatus('testing')
    setMessage('Testing connection...')
    try {
      await testConnection(config)
      setStatus('success')
      setMessage('Connection successful!')
    } catch (err: any) {
      setStatus('error')
      setMessage(err.message || 'Connection failed')
    }
  }

  return (
    <div>
      <button
        className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 text-sm"
        onClick={handleTest}
        disabled={status === 'testing'}
      >
        {status === 'testing' ? 'Testing...' : 'Test Connection'}
      </button>
      {message && (
        <p className={`text-sm mt-1 ${status === 'success' ? 'text-green-600' : 'text-red-600'}`}>
          {message}
        </p>
      )}
    </div>
  )
}
