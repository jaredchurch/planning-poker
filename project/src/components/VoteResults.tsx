interface VoteResult {
  participantId: string
  participantName: string
  value: number | string
}

interface VoteResultsProps {
  votes: VoteResult[]
  consensus: number | string | null
  isRevealed: boolean
}

export function VoteResults({ votes, consensus, isRevealed }: VoteResultsProps) {
  if (!isRevealed) return null

  return (
    <div className="border rounded-lg p-4 mt-4">
      <h3 className="text-lg font-semibold mb-3">Results</h3>
      <ul className="space-y-1">
        {votes.map((v) => (
          <li key={v.participantId} className="text-sm">
            {v.participantName}: <span className="font-bold">{String(v.value)}</span>
          </li>
        ))}
      </ul>
      {consensus !== null && (
        <p className="mt-3 text-green-700 font-semibold">
          Consensus: {String(consensus)}
        </p>
      )}
    </div>
  )
}
