import { useState, useCallback } from 'react'
import type { RoomParticipant } from '../types/room'

export function usePresence() {
  const [participants, setParticipants] = useState<RoomParticipant[]>([])

  const updateParticipants = useCallback((updated: RoomParticipant[]) => {
    setParticipants(updated)
  }, [])

  return { participants, updateParticipants }
}
