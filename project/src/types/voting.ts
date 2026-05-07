export type VoteScaleId = 'fibonacci' | 'tshirt' | 'integers'

export interface VoteScale {
  id: VoteScaleId
  label: string
  values: (number | string)[]
}

export interface Vote {
  participantId: string
  value: number | string
  roundId: string
}

export interface VotingRound {
  itemId: string
  scaleId: VoteScaleId
  isRevealed: boolean
  votes: Vote[]
  autoReveal: boolean
  consensus: number | string | null
}

export interface Item {
  id: string
  key: string
  summary: string
  isActive: boolean
}
