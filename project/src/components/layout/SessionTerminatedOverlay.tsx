interface SessionTerminatedOverlayProps {
  isOpen: boolean
  onDismiss: () => void
}

export function SessionTerminatedOverlay({ isOpen, onDismiss }: SessionTerminatedOverlayProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-sm w-full text-center space-y-4">
        <div className="w-16 h-16 mx-auto bg-yellow-100 rounded-full flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <h2 className="text-xl font-semibold">Session Terminated</h2>
        <p className="text-gray-600 text-sm">
          The host has ended this session. You will be returned to the home screen.
        </p>
        <button
          onClick={onDismiss}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          style={{ minWidth: 'var(--touch-target, 44px)', minHeight: 'var(--touch-target, 44px)' }}
        >
          OK
        </button>
      </div>
    </div>
  )
}
