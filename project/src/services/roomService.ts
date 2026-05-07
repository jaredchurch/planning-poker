import type { Room, RoomParticipant, RoomStatus } from '../types/room'
import { generateRoomId } from '../utils/roomIdGenerator'
import { sendMessage } from './messageProtocol'
import type { RoomMessage } from '../types/messages'
import type { DataConnection } from 'peerjs'

export function createRoom(hostPeerId: string, hostName: string): Room {
  const roomId = generateRoomId()
  return {
    roomId,
    hostPeerId,
    status: 'waiting',
    participants: [
      { id: hostPeerId, name: hostName, role: 'host', joinedAt: Date.now() },
    ],
  }
}

export function addParticipant(room: Room, id: string, name: string): RoomParticipant {
  const dedupedName = deduplicateName(name, room.participants)
  const participant: RoomParticipant = { id, name: dedupedName, role: 'peer', joinedAt: Date.now() }
  room.participants.push(participant)
  return participant
}

export function removeParticipant(room: Room, participantId: string): void {
  room.participants = room.participants.filter((p) => p.id !== participantId)
}

export function setRoomStatus(room: Room, status: RoomStatus): void {
  room.status = status
}

export function broadcastPresenceUpdate(
  connections: DataConnection[],
  participants: RoomParticipant[],
): void {
  const message: RoomMessage = { type: 'presence-update', participants }
  connections.forEach((conn) => {
    if (conn.open) {
      sendMessage(conn, message)
    }
  })
}

function deduplicateName(name: string, existing: RoomParticipant[]): string {
  const sameName = existing.filter((p) => p.name === name || p.name.startsWith(name + ' ('))
  if (sameName.length === 0) return name
  return `${name} (${sameName.length + 1})`
}
