import { CloseSessionButton } from './CloseSessionButton'
import { RevealButton } from './RevealButton'
import { VoteResults } from './VoteResults'
import { ItemList } from './ItemList'
import { FocusButton } from './FocusButton'
import { ParticipantList } from './ParticipantList'
import { CopyLinkButton } from './CopyLinkButton'
import { ExportButton } from './ExportButton'
import { ConsensusEditor } from './ConsensusEditor'
import type { VoteScaleId, Item, VotingRound } from '../types/voting'
import type { RoomParticipant } from '../types/room'
import type { ExportedItem } from '../types/export'

interface VoteResult {
  participantId: string
  participantName: string
  value: number | string
}

interface HostDashboardProps {
  onCloseSession: () => void
  roomId: string
  participants: RoomParticipant[]
  scaleId: VoteScaleId
  isRevealed: boolean
  revealedVotes: VoteResult[]
  consensus: number | string | null
  items: Item[]
  activeItemId: string | null
  allVoted: boolean
  onReveal: () => void
  onFocusItem: (itemId: string) => void
  onNextItem: () => void
  onRevote: () => void
  exportItems: ExportedItem[]
  onConsensusChange: (value: number | string | null) => void
}

export function HostDashboard({
  onCloseSession,
  roomId,
  participants,
  scaleId,
  isRevealed,
  revealedVotes,
  consensus,
  items,
  activeItemId,
  allVoted,
  onReveal,
  onFocusItem,
  onNextItem,
  onRevote,
  exportItems,
  onConsensusChange,
}: HostDashboardProps) {
  return (
    <div className="p-4 max-w-lg mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Host Dashboard</h2>
        <CopyLinkButton roomId={roomId} />
      </div>

      <ParticipantList participants={participants} />

      <div className="flex items-center gap-2 mt-4 mb-4 flex-wrap">
        <RevealButton onReveal={onReveal} disabled={!allVoted || isRevealed} />
        <FocusButton onNextItem={onNextItem} onRevote={onRevote} />
        <CloseSessionButton onCloseSession={onCloseSession} />
        <ExportButton items={exportItems} />
      </div>

      <div className="mb-4 p-3 bg-gray-50 rounded">
        <span className="text-sm text-gray-600 mr-2">Consensus:</span>
        <ConsensusEditor value={consensus} onChange={onConsensusChange} />
      </div>

      <ItemList
        items={items}
        activeItemId={activeItemId}
        onFocusItem={onFocusItem}
      />

      <VoteResults
        votes={revealedVotes}
        consensus={consensus}
        isRevealed={isRevealed}
      />
    </div>
  )
}
