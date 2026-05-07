import { useState } from 'react'
import { ConfirmDialog } from './ConfirmDialog'

interface CloseSessionButtonProps {
  onCloseSession: () => void
}

export function CloseSessionButton({ onCloseSession }: CloseSessionButtonProps) {
  const [showConfirm, setShowConfirm] = useState(false)

  return (
    <>
      <button
        className="px-4 py-2 bg-red-700 text-white rounded hover:bg-red-800"
        onClick={() => setShowConfirm(true)}
      >
        Close Session
      </button>
      {showConfirm && (
        <ConfirmDialog
          message="End the session for everyone?"
          onConfirm={() => {
            setShowConfirm(false)
            onCloseSession()
          }}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </>
  )
}
