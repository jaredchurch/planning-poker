import Peer from 'peerjs'
import type { DataConnection } from 'peerjs'

export const PEER_SERVER = {
  host: 'localhost',
  port: 9342,
  path: '/peerjs',
}

export function createPeer(options?: { debug?: number }): Peer {
  const peer = new Peer({
    host: PEER_SERVER.host,
    port: PEER_SERVER.port,
    path: PEER_SERVER.path,
    debug: options?.debug ?? 0,
    config: {
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
        { urls: 'stun:stun1.l.google.com:19302' },
      ],
    },
  })

  peer.on('error', (err) => {
    console.error('[PeerJS] Peer error:', err.type, err.message)
  })

  return peer
}

export function connectToPeer(peer: Peer, peerId: string): Promise<DataConnection> {
  return new Promise((resolve, reject) => {
    const conn = peer.connect(peerId, { reliable: true })

    const timeout = setTimeout(() => {
      console.error('[PeerJS] Connection timeout to', peerId)
      reject(new Error('Connection timeout'))
    }, 15000)

    conn.on('open', () => {
      clearTimeout(timeout)
      resolve(conn)
    })

    conn.on('error', (err) => {
      clearTimeout(timeout)
      console.error('[PeerJS] Connection error:', err)
      reject(err)
    })

    conn.on('close', () => {
      clearTimeout(timeout)
      console.log('[PeerJS] Connection closed to', peerId)
    })
  })
}

export function disconnectConnection(conn: DataConnection): void {
  conn.close()
}

export function destroyPeer(peer: Peer): void {
  peer.destroy()
}
