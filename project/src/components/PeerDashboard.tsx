import { ExitButton } from './ExitButton'
import { VotingBoard } from './VotingBoard'
import { VoteResults } from './VoteResults'
import { BacklogPanel } from './backlog/BacklogPanel'
import type { VoteScaleId } from '../types/voting'
import type { BacklogItem } from '../types/item'

interface VoteResult {
  participantId: string
  participantName: string
  value: number | string
}

interface PeerDashboardProps {
  onExit: () => void
  scaleId: VoteScaleId
  selectedValue: number | string | null
  isRevealed: boolean
  revealedVotes: VoteResult[]
  consensus: number | string | null
  activeItemKey?: string
  activeItemSummary?: string
  onVote: (value: number | string) => void
  items?: BacklogItem[]
  activeItemId?: string | null
}

export function PeerDashboard({
  onExit,
  scaleId,
  selectedValue,
  isRevealed,
  revealedVotes,
  consensus,
  activeItemKey,
  activeItemSummary,
  onVote,
  items = [],
  activeItemId = null,
}: PeerDashboardProps) {
  return (
    <div className="p-4 max-w-lg mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Session</h2>
        <ExitButton onExit={onExit} />
      </div>

      {activeItemKey && (
        <div className="bg-gray-100 rounded p-3 mb-4">
          <span className="font-mono text-sm text-gray-500">{activeItemKey}</span>
          <p className="font-medium">{activeItemSummary}</p>
        </div>
      )}

      <VotingBoard
        scaleId={scaleId}
        selectedValue={selectedValue}
        revealed={isRevealed}
        onVote={onVote}
      />

      <VoteResults
        votes={revealedVotes}
        consensus={consensus}
        isRevealed={isRevealed}
      />

      <div className="mt-6">
        <BacklogPanel
          items={items}
          activeItemId={activeItemId}
          onAddItem={() => {}}
          onUpdateItem={() => {}}
          onDeleteItem={() => {}}
          onMoveUp={() => {}}
          onMoveDown={() => {}}
          onFocusItem={() => {}}
        />
      </div>
    </div>
  )
}
