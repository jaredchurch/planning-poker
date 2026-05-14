import type { Session, Participant, SessionStatus, SessionSettings } from '../types/session'

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

export function addParticipantToSession(session: Session, participant: Participant): Participant[] {
  const updated = [...session.participants, participant]
  session.participants = updated
  return updated
}

export function removeParticipantFromSession(session: Session, participantId: string): Participant[] {
  const updated = session.participants.filter((p) => p.id !== participantId)
  session.participants = updated
  return updated
}

export function setSessionStatus(session: Session, status: SessionStatus): void {
  session.status = status
}

export function closeSession(session: Session): void {
  session.status = 'closed'
  session.participants = []
}

export function clearSessionState(): void {
  localStorage.removeItem('roomId')
}

const SETTINGS_KEY = 'planning-poker-settings'

export const DEFAULT_SETTINGS: SessionSettings = {
  scaleId: 'fibonacci',
  autoRevealEnabled: false,
  isLocked: false,
  consensusAlgorithm: 'mode',
  showMoreInfoNeeded: true,
}

export function loadSettings(): SessionSettings {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY)
    if (!raw) return { ...DEFAULT_SETTINGS }
    return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) }
  } catch {
    return { ...DEFAULT_SETTINGS }
  }
}

export function saveSettings(settings: SessionSettings): void {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings))
}

export function updateSettings(current: SessionSettings, updates: Partial<SessionSettings>): SessionSettings {
  return { ...current, ...updates }
}
