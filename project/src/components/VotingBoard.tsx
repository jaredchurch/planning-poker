import type { VoteScaleId } from '../types/voting'
import { getScale } from '../utils/scales'
import { VotingCard } from './VotingCard'

interface VotingBoardProps {
  scaleId: VoteScaleId
  selectedValue: number | string | null
  revealed: boolean
  onVote: (value: number | string) => void
}

export function VotingBoard({ scaleId, selectedValue, revealed, onVote }: VotingBoardProps) {
  const scale = getScale(scaleId)
  if (!scale) return <p>Unknown scale</p>

  return (
    <div className="flex flex-wrap gap-2 justify-center p-4">
      {scale.values.map((value) => (
        <VotingCard
          key={String(value)}
          value={value}
          selected={selectedValue === value}
          revealed={revealed}
          onClick={() => onVote(value)}
        />
      ))}
    </div>
  )
}
