import type { RoomParticipant } from '../types/room'

interface ParticipantListProps {
  participants: RoomParticipant[]
}

export function ParticipantList({ participants }: ParticipantListProps) {
  return (
    <div className="border rounded-lg p-4">
      <h3 className="text-lg font-semibold mb-3">Participants ({participants.length})</h3>
      <ul className="space-y-2">
        {participants.map((p) => (
          <li key={p.id} className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-400" />
            <span>
              {p.name}
              {p.role === 'host' && (
                <span className="text-xs text-gray-500 ml-1">(Host)</span>
              )}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
