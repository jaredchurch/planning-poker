import { useState } from 'react'
import { useBreakpoint } from '../../hooks/useBreakpoint'
import { Navigation } from './Navigation'
import { MobileDrawer } from './MobileDrawer'
import { Transition } from '../shared/Transition'
import { SessionTerminatedOverlay } from './SessionTerminatedOverlay'
import { ConnectionLostModal } from './ConnectionLostModal'

interface RoomInfo {
  id: string
  hostName: string
  status: string
}

interface UserInfo {
  name: string
  role: 'host' | 'peer'
}

interface AppShellProps {
  showNavigation?: boolean
  roomInfo?: RoomInfo
  user?: UserInfo
  connectionStatus?: 'connecting' | 'connected' | 'disconnected'
  onExit?: () => void
  onCopyLink?: () => void
  drawerContent?: React.ReactNode
  drawerTitle?: string
  sessionTerminated?: boolean
  onSessionTerminatedDismiss?: () => void
  showConnectionLost?: boolean
  onConnectionLostDismiss?: () => void
  children: React.ReactNode
}

export function AppShell({
  showNavigation = true,
  roomInfo,
  user,
  connectionStatus = 'disconnected',
  onExit,
  onCopyLink,
  drawerContent,
  drawerTitle = 'Participants',
  sessionTerminated = false,
  onSessionTerminatedDismiss,
  showConnectionLost = false,
  onConnectionLostDismiss,
  children,
}: AppShellProps) {
  const { deviceType } = useBreakpoint()
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {showNavigation && (
        <Navigation
          roomCode={roomInfo?.id}
          userName={user?.name}
          isHost={user?.role === 'host'}
          connectionStatus={connectionStatus}
          onExit={onExit || (() => {})}
          onCopyLink={onCopyLink}
          deviceType={deviceType}
          onToggleDrawer={() => setIsDrawerOpen((prev) => !prev)}
        />
      )}
      <main className="flex-1 flex flex-col">
        <Transition>
          {children}
        </Transition>
      </main>

      {deviceType === 'mobile' && drawerContent && (
        <MobileDrawer
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          title={drawerTitle}
        >
          {drawerContent}
        </MobileDrawer>
      )}

      <SessionTerminatedOverlay
        isOpen={sessionTerminated}
        onDismiss={onSessionTerminatedDismiss || (() => {})}
      />

      <ConnectionLostModal
        isOpen={showConnectionLost}
        onDismiss={onConnectionLostDismiss}
      />
    </div>
  )
}
