import type { Message } from '../types/messages'

export function sendMessage(conn: { send: (data: string) => void }, message: Message): void {
  conn.send(JSON.stringify(message))
}

export function parseMessage(data: string): Message | null {
  try {
    const parsed = JSON.parse(data)
    if (parsed && typeof parsed.type === 'string') {
      return parsed as Message
    }
    return null
  } catch {
    return null
  }
}
