import type { Session, Participant, SessionStatus } from '../types/session'

export function createSession(roomId: string, hostId: string, hostName: string): Session {
  return {
    roomId,
    hostId,
    status: 'active',
    participants: [
      { id: hostId, name: hostName, role: 'host', connectionStatus: 'connected', voteStatus: 'none' },
    ],
  }
}

export function addParticipant(session: Session, participant: Participant): Participant[] {
  const updated = [...session.participants, participant]
  session.participants = updated
  return updated
}

export function removeParticipant(session: Session, participantId: string): Participant[] {
  const updated = session.participants.filter((p) => p.id !== participantId)
  session.participants = updated
  return updated
}

export function setSessionStatus(session: Session, status: SessionStatus): void {
  session.status = status
}

export function clearSessionState(): void {
  localStorage.removeItem('roomId')
}

export function closeSession(session: Session): void {
  session.status = 'closed'
  session.participants = []
}

export function clearVoteStatus(session: Session, participantId: string): void {
  const participant = session.participants.find((p) => p.id === participantId)
  if (participant) {
    participant.voteStatus = 'none'
  }
}
