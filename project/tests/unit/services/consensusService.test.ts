import { calculateConsensus } from '../../../src/services/consensusService'
import type { Vote } from '../../../src/types/voting'

describe('consensusService', () => {
  const votes: Vote[] = [
    { participantId: 'p1', value: 3, roundId: 'r1' },
    { participantId: 'p2', value: 5, roundId: 'r1' },
    { participantId: 'p3', value: 8, roundId: 'r1' },
  ]

  describe('mode algorithm (default)', () => {
    it('returns null consensus when spread > 1', () => {
      const result = calculateConsensus(votes, 'fibonacci')
      expect(result.consensus).toBeNull()
      expect(result.spread).toBe(2)
      expect(result.needsDiscussion).toBe(true)
    })

    it('returns mode when spread <= 1', () => {
      const closeVotes: Vote[] = [
        { participantId: 'p1', value: 3, roundId: 'r1' },
        { participantId: 'p2', value: 3, roundId: 'r1' },
        { participantId: 'p3', value: 5, roundId: 'r1' },
      ]
      const result = calculateConsensus(closeVotes, 'fibonacci')
      expect(result.consensus).toBe(3)
    })

    it('detects unanimity', () => {
      const unanimous: Vote[] = [
        { participantId: 'p1', value: 5, roundId: 'r1' },
        { participantId: 'p2', value: 5, roundId: 'r1' },
      ]
      const result = calculateConsensus(unanimous, 'fibonacci')
      expect(result.isUnanimous).toBe(true)
      expect(result.consensus).toBe(5)
    })
  })

  describe('average algorithm', () => {
    it('calculates average of numeric votes', () => {
      const result = calculateConsensus(votes, 'fibonacci', 'average')
      expect(result.consensus).toBeCloseTo(5.3, 1)
    })

    it('returns exact number for unanimous votes', () => {
      const unanimous: Vote[] = [
        { participantId: 'p1', value: 5, roundId: 'r1' },
        { participantId: 'p2', value: 5, roundId: 'r1' },
      ]
      const result = calculateConsensus(unanimous, 'fibonacci', 'average')
      expect(result.consensus).toBe(5)
    })
  })

  describe('weighted algorithm', () => {
    it('returns closest scale value to average', () => {
      const result = calculateConsensus(votes, 'fibonacci', 'weighted')
      expect(result.consensus).toBe(5)
    })

    it('returns exact for unanimous', () => {
      const unanimous: Vote[] = [
        { participantId: 'p1', value: 8, roundId: 'r1' },
        { participantId: 'p2', value: 8, roundId: 'r1' },
      ]
      const result = calculateConsensus(unanimous, 'fibonacci', 'weighted')
      expect(result.consensus).toBe(8)
    })
  })

  it('returns null consensus for empty votes', () => {
    const result = calculateConsensus([], 'fibonacci')
    expect(result.consensus).toBeNull()
  })
})
