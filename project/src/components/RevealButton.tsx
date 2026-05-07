interface RevealButtonProps {
  onReveal: () => void
  disabled: boolean
}

export function RevealButton({ onReveal, disabled }: RevealButtonProps) {
  return (
    <button
      className={`px-4 py-2 rounded font-semibold ${
        disabled
          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
          : 'bg-purple-500 text-white hover:bg-purple-600'
      }`}
      onClick={onReveal}
      disabled={disabled}
    >
      Reveal Votes
    </button>
  )
}
