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

import type { BacklogItem } from './item'

export interface Item extends BacklogItem {
  isActive: boolean
}
