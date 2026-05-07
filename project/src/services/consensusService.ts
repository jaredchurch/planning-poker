import type { Vote, VoteScale } from '../types/voting'
import { SCALES } from '../utils/scales'

export interface ConsensusResult {
  consensus: number | string | null
  spread: number
  minVoters: string[]
  maxVoters: string[]
  isUnanimous: boolean
  needsDiscussion: boolean
}

export function calculateConsensus(votes: Vote[], scaleId: string): ConsensusResult {
  const scale = SCALES.find((s) => s.id === scaleId)

  const numericVotes = votes
    .filter((v) => typeof v.value === 'number')
    .map((v) => ({ participantId: v.participantId, numValue: v.value as number }))

  if (numericVotes.length === 0) {
    return {
      consensus: null,
      spread: 0,
      minVoters: [],
      maxVoters: [],
      isUnanimous: false,
      needsDiscussion: false,
    }
  }

  const values = numericVotes.map((v) => v.numValue)
  const min = Math.min(...values)
  const max = Math.max(...values)
  const spread = scale ? indexDistance(min, max, scale) : max - min

  const counts: Record<number, number> = {}
  values.forEach((v) => { counts[v] = (counts[v] || 0) + 1 })
  const mode = Number(Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0])

  const minVoters = numericVotes.filter((v) => v.numValue === min).map((v) => v.participantId)
  const maxVoters = numericVotes.filter((v) => v.numValue === max).map((v) => v.participantId)

  const unique = new Set(values)
  const isUnanimous = unique.size === 1
  const needsDiscussion = spread > 1

  return {
    consensus: isUnanimous ? mode : spread <= 1 ? mode : null,
    spread,
    minVoters,
    maxVoters,
    isUnanimous,
    needsDiscussion,
  }
}

function indexDistance(a: number, b: number, scale: VoteScale): number {
  const aIdx = scale.values.indexOf(a)
  const bIdx = scale.values.indexOf(b)
  if (aIdx === -1 || bIdx === -1) return Math.abs(b - a)
  return Math.abs(bIdx - aIdx)
}
