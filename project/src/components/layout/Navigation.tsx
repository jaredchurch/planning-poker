import type { DeviceType } from '../../types/layout'

interface NavigationProps {
  roomCode?: string
  userName?: string
  isHost: boolean
  connectionStatus: 'connecting' | 'connected' | 'disconnected'
  onExit: () => void
  onCopyLink?: () => void
  participantCount?: number
  deviceType?: DeviceType
  onToggleDrawer?: () => void
}

export function Navigation({
  roomCode,
  userName,
  isHost,
  connectionStatus,
  onExit,
  onCopyLink,
  participantCount,
  deviceType,
  onToggleDrawer,
}: NavigationProps) {
  const statusColor =
    connectionStatus === 'connected'
      ? 'bg-green-500'
      : connectionStatus === 'connecting'
        ? 'bg-yellow-500'
        : 'bg-red-500'

  return (
    <header
      className="flex items-center justify-between px-4 bg-white border-b border-gray-200"
      style={{ height: 'var(--header-height, 64px)' }}
    >
      <div className="flex items-center gap-3">
        <span className="font-semibold text-lg">Planning Poker</span>
        {roomCode && (
          <span className="text-sm font-mono text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
            {roomCode}
          </span>
        )}
      </div>

      <div className="flex items-center gap-3">
        {userName && (
          <span className="text-sm text-gray-600 hidden sm:inline">{userName}</span>
        )}

        <span className="flex items-center gap-1.5 text-xs text-gray-500">
          <span className={`w-2 h-2 rounded-full ${statusColor}`} />
          {connectionStatus}
        </span>

        {deviceType === 'mobile' && participantCount !== undefined && onToggleDrawer && (
          <button
            onClick={onToggleDrawer}
            className="flex items-center gap-1 px-3 py-2 text-sm bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            style={{ minWidth: 'var(--touch-target, 44px)', minHeight: 'var(--touch-target, 44px)' }}
            aria-label="Toggle participants list"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
            </svg>
            <span>{participantCount}</span>
          </button>
        )}

        {onCopyLink && roomCode && (
          <button
            onClick={onCopyLink}
            className="text-sm text-blue-600 hover:text-blue-800 transition-colors hidden sm:inline"
            style={{ minWidth: 'var(--touch-target, 44px)', minHeight: 'var(--touch-target, 44px)' }}
          >
            Copy Link
          </button>
        )}

        <button
          onClick={onExit}
          className="text-sm text-red-600 hover:text-red-800 transition-colors"
          style={{ minWidth: 'var(--touch-target, 44px)', minHeight: 'var(--touch-target, 44px)' }}
        >
          {isHost ? 'Close' : 'Exit'}
        </button>
      </div>
    </header>
  )
}
