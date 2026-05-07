interface FocusButtonProps {
  onNextItem: () => void
  onRevote: () => void
}

export function FocusButton({ onNextItem, onRevote }: FocusButtonProps) {
  return (
    <div className="flex gap-2">
      <button
        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
        onClick={onNextItem}
      >
        Next Item
      </button>
      <button
        className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 text-sm"
        onClick={onRevote}
      >
        Re-vote
      </button>
    </div>
  )
}
