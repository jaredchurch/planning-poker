import { CreateRoomForm } from './CreateRoomForm'
import { JoinRoomForm } from './JoinRoomForm'
import type { Room } from '../types/room'

interface LandingPageProps {
  onCreateRoom: (name: string) => void
  onJoinRoom: (roomId: string, name: string) => void
  roomIdFromUrl?: string
  connectionStatus?: string
}

export function LandingPage({ onCreateRoom, onJoinRoom, roomIdFromUrl, connectionStatus }: LandingPageProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-8">
      <h1 className="text-3xl font-bold">Planning Poker</h1>
      {connectionStatus && (
        <p className="text-sm text-gray-600 bg-gray-100 px-4 py-2 rounded">{connectionStatus}</p>
      )}
      {roomIdFromUrl ? (
        <div className="w-full max-w-sm">
          <h2 className="text-xl mb-4">Join Room</h2>
          <JoinRoomForm roomId={roomIdFromUrl} onJoin={onJoinRoom} />
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-8 max-w-lg">
          <div>
            <h2 className="text-xl mb-4">Create a Room</h2>
            <CreateRoomForm onCreateRoom={onCreateRoom} />
          </div>
          <div>
            <h2 className="text-xl mb-4">Join a Room</h2>
            <JoinRoomForm onJoin={onJoinRoom} />
          </div>
        </div>
      )}
    </div>
  )
}
