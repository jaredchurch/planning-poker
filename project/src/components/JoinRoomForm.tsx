import { useState } from 'react'

interface JoinRoomFormProps {
  onJoin: (roomId: string, name: string) => void
  roomId?: string
}

export function JoinRoomForm({ onJoin, roomId: initialRoomId }: JoinRoomFormProps) {
  const [roomId, setRoomId] = useState(initialRoomId || '')
  const [name, setName] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!roomId.trim()) {
      setError('Room ID is required')
      return
    }
    if (name.trim().length < 2) {
      setError('Name must be at least 2 characters')
      return
    }
    setError('')
    onJoin(roomId.trim().toUpperCase(), name.trim())
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        className="border rounded px-3 py-2"
        type="text"
        placeholder="Room ID"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
      />
      <input
        className="border rounded px-3 py-2"
        type="text"
        placeholder="Your display name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        type="submit"
      >
        Join
      </button>
    </form>
  )
}
