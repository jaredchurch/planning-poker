export function parseRoomIdFromHash(): string | null {
  const match = window.location.hash.match(/^#\/join\/([A-Za-z0-9]{6})$/)
  return match ? match[1].toUpperCase() : null
}

export function buildInviteLink(roomId: string): string {
  return `${window.location.origin}${window.location.pathname}#/join/${roomId}`
}
