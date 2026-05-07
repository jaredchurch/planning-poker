import { useState, useCallback } from 'react'
import type { Room, RoomParticipant, RoomStatus } from '../types/room'
import { createRoom, addParticipant, removeParticipant, setRoomStatus, broadcastPresenceUpdate } from '../services/roomService'
import type { DataConnection } from 'peerjs'

export function useRoom() {
  const [room, setRoom] = useState<Room | null>(null)

  const initRoom = useCallback((hostPeerId: string, hostName: string) => {
    const newRoom = createRoom(hostPeerId, hostName)
    setRoom(newRoom)
    return newRoom
  }, [])

  const joinRoom = useCallback((participant: RoomParticipant) => {
    setRoom((prev) => {
      if (!prev) return prev
      const updated = { ...prev, participants: [...prev.participants, participant] }
      return updated
    })
  }, [])

  const leaveRoom = useCallback((participantId: string) => {
    setRoom((prev) => {
      if (!prev) return prev
      const updated = { ...prev, participants: prev.participants.filter((p) => p.id !== participantId) }
      return updated
    })
  }, [])

  const setStatus = useCallback((status: RoomStatus) => {
    setRoom((prev) => {
      if (!prev) return prev
      return { ...prev, status }
    })
  }, [])

  return { room, initRoom, joinRoom, leaveRoom, setStatus }
}
