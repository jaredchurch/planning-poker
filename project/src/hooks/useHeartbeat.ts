import { useEffect, useRef } from 'react'
import { sendMessage } from '../services/messageProtocol'

const PING_INTERVAL = 3000
const TIMEOUT_MS = 10000

interface UseHeartbeatOptions {
  conn: { send: (data: string) => void } | null
  onTimeout: () => void
  role: 'host' | 'peer'
}

export function useHeartbeat({ conn, onTimeout, role }: UseHeartbeatOptions) {
  const lastPongRef = useRef<number>(Date.now())
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (!conn) return

    if (role === 'host') {
      intervalRef.current = setInterval(() => {
        sendMessage(conn, { type: 'ping' })
        if (Date.now() - lastPongRef.current > TIMEOUT_MS) {
          onTimeout()
        }
      }, PING_INTERVAL)
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [conn, onTimeout, role])

  const handlePong = () => {
    lastPongRef.current = Date.now()
  }

  const handlePing = () => {
    if (conn && role === 'peer') {
      sendMessage(conn, { type: 'pong' })
    }
  }

  return { handlePong, handlePing }
}
