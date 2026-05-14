interface ConnectionLostModalProps {
  isOpen: boolean
  onDismiss?: () => void
}

export function ConnectionLostModal({ isOpen, onDismiss }: ConnectionLostModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-sm w-full text-center space-y-4">
        <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636a9 9 0 11-12.728 0 9 9 0 0112.728 0zM12 8v4m0 4h.01" />
          </svg>
        </div>
        <h2 className="text-xl font-semibold">Connection Lost</h2>
        <p className="text-gray-600 text-sm">
          The connection to the Host has been lost. Please check your network connection and try again.
        </p>
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            style={{ minWidth: 'var(--touch-target, 44px)', minHeight: 'var(--touch-target, 44px)' }}
          >
            Back to Home
          </button>
        )}
      </div>
    </div>
  )
}
