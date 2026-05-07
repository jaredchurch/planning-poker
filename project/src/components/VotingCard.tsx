interface VotingCardProps {
  value: number | string
  selected: boolean
  revealed: boolean
  onClick: () => void
}

export function VotingCard({ value, selected, revealed, onClick }: VotingCardProps) {
  return (
    <button
      className={`w-16 h-24 rounded-lg border-2 flex items-center justify-center text-lg font-bold transition-all
        ${selected && !revealed ? 'border-blue-500 bg-blue-50 shadow-md' : 'border-gray-300 bg-white hover:border-gray-400'}
        ${revealed ? 'bg-white' : ''}`}
      onClick={onClick}
    >
      {revealed ? value : selected ? '✓' : '?'}
    </button>
  )
}
