import type { VotingRound, Vote, VoteScaleId } from '../types/voting'
import { getScale } from '../utils/scales'

let currentRound: VotingRound | null = null

export function getCurrentRound(): VotingRound | null {
  return currentRound
}

export function startNewRound(itemId: string, scaleId: VoteScaleId): VotingRound {
  currentRound = {
    itemId,
    scaleId,
    isRevealed: false,
    votes: [],
    autoReveal: false,
    consensus: null,
  }
  return currentRound
}

export function castVote(participantId: string, value: number | string): Vote | null {
  if (!currentRound || currentRound.isRevealed) return null

  const scale = getScale(currentRound.scaleId)
  if (!scale) return null

  if (!scale.values.includes(value)) return null

  const existing = currentRound.votes.find((v) => v.participantId === participantId)
  if (existing) {
    existing.value = value
    return existing
  }

  const vote: Vote = { participantId, value, roundId: currentRound.itemId }
  currentRound.votes.push(vote)
  return vote
}

export function removeVote(participantId: string): void {
  if (!currentRound) return
  currentRound.votes = currentRound.votes.filter((v) => v.participantId !== participantId)
}

export function setRevealed(revealed: boolean): void {
  if (!currentRound) return
  currentRound.isRevealed = revealed
}

export function setAutoReveal(enabled: boolean): void {
  if (!currentRound) return
  currentRound.autoReveal = enabled
}

export function allVoted(participantCount: number): boolean {
  if (!currentRound) return false
  return currentRound.votes.length >= participantCount
}

export function clearRound(): void {
  if (!currentRound) return
  currentRound.votes = []
  currentRound.isRevealed = false
  currentRound.consensus = null
}

export function setConsensus(value: number | string | null): void {
  if (!currentRound) return
  currentRound.consensus = value
}
