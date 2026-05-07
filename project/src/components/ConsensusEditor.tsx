import { useState } from 'react'

interface ConsensusEditorProps {
  value: number | string | null
  onChange: (value: number | string | null) => void
}

export function ConsensusEditor({ value, onChange }: ConsensusEditorProps) {
  const [editing, setEditing] = useState(false)
  const [text, setText] = useState(value !== null ? String(value) : '')

  const handleSave = () => {
    const parsed = text.trim()
    if (parsed === '') {
      onChange(null)
    } else {
      const num = Number(parsed)
      onChange(Number.isNaN(num) ? parsed : num)
    }
    setEditing(false)
  }

  if (editing) {
    return (
      <input
        className="border rounded px-2 py-1 w-20 text-sm"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onBlur={handleSave}
        onKeyDown={(e) => { if (e.key === 'Enter') handleSave() }}
        autoFocus
      />
    )
  }

  return (
    <span
      className="cursor-pointer border-b border-dashed border-gray-400 hover:border-gray-600"
      onClick={() => setEditing(true)}
    >
      {value !== null ? String(value) : '—'}
    </span>
  )
}
