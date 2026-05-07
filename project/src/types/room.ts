export type RoomStatus = 'waiting' | 'active' | 'closed'

export interface RoomParticipant {
  id: string
  name: string
  role: 'host' | 'peer'
  joinedAt: number
}

export interface Room {
  roomId: string
  hostPeerId: string
  status: RoomStatus
  participants: RoomParticipant[]
}

export interface PresenceList {
  participants: RoomParticipant[]
  hostId: string
}
