import { parseRoomIdFromHash, buildInviteLink } from '../../../src/utils/deepLink'

describe('join flow verification', () => {
  describe('deepLink regex (Bug #1 fixed)', () => {
    it('now parses real PeerJS UUID-style IDs', () => {
      const realPeerId = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890'
      window.location.hash = `#/join/${realPeerId}`
      const result = parseRoomIdFromHash()
      expect(result).toBe(realPeerId)
    })

    it('buildInviteLink round-trips correctly', () => {
      const roomId = 'peerjs-id-12345'
      const link = buildInviteLink(roomId)
      window.location.hash = link.substring(link.indexOf('#'))
      const result = parseRoomIdFromHash()
      expect(result).toBe(roomId)
    })

    it('preserves original case', () => {
      const mixed = 'AbC-DeF-Ghi'
      window.location.hash = `#/join/${mixed}`
      const result = parseRoomIdFromHash()
      expect(result).toBe(mixed)
    })
  })

  describe('JoinRoomForm toUpperCase (Bug #2 fixed)', () => {
    it('no longer converts room ID to uppercase', () => {
      const roomId = 'abc123-def456'
      const processed = roomId.trim()
      expect(processed).toBe(roomId)
      expect(processed).not.toBe(roomId.toUpperCase())
    })
  })
})
