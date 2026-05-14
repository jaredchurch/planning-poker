export type Role = 'host' | 'peer'
export type ConnectionStatus = 'connected' | 'disconnected'
export type VoteStatus = 'none' | 'voted'
export type SessionStatus = 'active' | 'closed'
export type ConsensusAlgorithm = 'mode' | 'average' | 'weighted'

export interface Participant {
  id: string
  name: string
  role: Role
  connectionStatus: ConnectionStatus
  voteStatus: VoteStatus
}

export interface Session {
  roomId: string
  hostId: string
  status: SessionStatus
  participants: Participant[]
}

export interface SessionSettings {
  scaleId: string
  autoRevealEnabled: boolean
  isLocked: boolean
  consensusAlgorithm: ConsensusAlgorithm
  showMoreInfoNeeded: boolean
}
