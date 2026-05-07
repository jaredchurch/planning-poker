const ROOM_ID_KEY = 'roomId'
const HOST_PEER_ID_KEY = 'hostPeerId'

export function getStoredRoomId(): string | null {
  return localStorage.getItem(ROOM_ID_KEY)
}

export function storeRoomId(roomId: string): void {
  localStorage.setItem(ROOM_ID_KEY, roomId)
}

export function clearRoomId(): void {
  localStorage.removeItem(ROOM_ID_KEY)
}

export function getStoredHostPeerId(): string | null {
  return localStorage.getItem(HOST_PEER_ID_KEY)
}

export function storeHostPeerId(peerId: string): void {
  localStorage.setItem(HOST_PEER_ID_KEY, peerId)
}

export function clearHostPeerId(): void {
  localStorage.removeItem(HOST_PEER_ID_KEY)
}

export function clearAllSession(): void {
  clearRoomId()
  clearHostPeerId()
}
