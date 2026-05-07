import { useEffect, useRef, useState } from 'react'
import Peer from 'peerjs'

interface UsePeerConnectionOptions {
  onData: (data: unknown) => void
  onDisconnect?: () => void
}

export function usePeerConnection({ onData, onDisconnect }: UsePeerConnectionOptions) {
  const peerRef = useRef<Peer | null>(null)
  const [peerId, setPeerId] = useState<string | null>(null)

  useEffect(() => {
    const peer = new Peer()
    peerRef.current = peer

    peer.on('open', (id) => {
      setPeerId(id)
    })

    peer.on('connection', (conn) => {
      conn.on('data', onData)
      conn.on('close', () => onDisconnect?.())
    })

    peer.on('disconnected', () => {
      onDisconnect?.()
    })

    return () => {
      peer.destroy()
    }
  }, [])

  return { peer: peerRef.current, peerId }
}
