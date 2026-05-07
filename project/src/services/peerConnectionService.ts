import Peer from 'peerjs'
import type { DataConnection } from 'peerjs'

export function createPeer(): Peer {
  return new Peer()
}

export function connectToPeer(peer: Peer, peerId: string): Promise<DataConnection> {
  return new Promise((resolve, reject) => {
    const conn = peer.connect(peerId, { reliable: true })
    conn.on('open', () => resolve(conn))
    conn.on('error', (err) => reject(err))
    setTimeout(() => reject(new Error('Connection timeout')), 10000)
  })
}

export function disconnectConnection(conn: DataConnection): void {
  conn.close()
}

export function destroyPeer(peer: Peer): void {
  peer.destroy()
}
