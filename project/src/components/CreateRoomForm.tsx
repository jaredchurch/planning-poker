import { useState } from 'react'

interface CreateRoomFormProps {
  onCreateRoom: (name: string) => void
}

export function CreateRoomForm({ onCreateRoom }: CreateRoomFormProps) {
  const [name, setName] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim().length < 2) {
      setError('Name must be at least 2 characters')
      return
    }
    setError('')
    onCreateRoom(name.trim())
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        className="border rounded px-3 py-2"
        type="text"
        placeholder="Your display name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        type="submit"
      >
        Create Room
      </button>
    </form>
  )
}
