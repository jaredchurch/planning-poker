import type { Participant } from './session'
import type { RoomParticipant } from './room'

export type RoomMessage =
  | { type: 'join'; name: string }
  | { type: 'joined'; roomId: string; participants: RoomParticipant[] }
  | { type: 'presence-update'; participants: RoomParticipant[] }
  | { type: 'leave' }
  | { type: 'room-not-found' }

export type VotingMessage =
  | { type: 'vote'; value: number | string }
  | { type: 'vote-update'; participantId: string; voteStatus: string }
  | { type: 'reveal'; votes: { participantId: string; value: number | string }[]; consensus: number | string | null }
  | { type: 'focus-item'; itemId: string }
  | { type: 're-vote' }
  | { type: 'next-item' }

export type Message =
  | { type: 'exit' }
  | { type: 'session-closed' }
  | { type: 'participant-update'; participants: Participant[] }
  | { type: 'ping' }
  | { type: 'pong' }
  | RoomMessage
  | VotingMessage
