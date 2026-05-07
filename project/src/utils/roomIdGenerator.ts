const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
const ID_LENGTH = 6

export function generateRoomId(): string {
  let id = ''
  for (let i = 0; i < ID_LENGTH; i++) {
    id += CHARS[Math.floor(Math.random() * CHARS.length)]
  }
  return id
}
