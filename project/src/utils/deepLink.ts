export function parseRoomIdFromHash(): string | null {
  const match = window.location.hash.match(/^#\/join\/(.+)$/)
  return match ? match[1] : null
}

export function buildInviteLink(roomId: string): string {
  return `${window.location.origin}${window.location.pathname}#/join/${roomId}`
}
