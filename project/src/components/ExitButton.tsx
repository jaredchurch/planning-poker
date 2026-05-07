import { useState } from 'react'
import { ConfirmDialog } from './ConfirmDialog'

interface ExitButtonProps {
  onExit: () => void
}

export function ExitButton({ onExit }: ExitButtonProps) {
  const [showConfirm, setShowConfirm] = useState(false)

  return (
    <>
      <button
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        onClick={() => setShowConfirm(true)}
      >
        Exit
      </button>
      {showConfirm && (
        <ConfirmDialog
          message="Are you sure you want to leave?"
          onConfirm={() => {
            setShowConfirm(false)
            onExit()
          }}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </>
  )
}
