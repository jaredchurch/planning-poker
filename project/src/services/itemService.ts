import type { BacklogItem, ItemSource } from '../types/item'
import { generateId } from '../utils/uuid'

const STORAGE_KEY_PREFIX = 'planning-poker-backlog-'

function storageKey(roomId: string): string {
  return `${STORAGE_KEY_PREFIX}${roomId}`
}

export function loadItems(roomId: string): BacklogItem[] {
  try {
    const raw = localStorage.getItem(storageKey(roomId))
    if (!raw) return []
    return JSON.parse(raw) as BacklogItem[]
  } catch {
    return []
  }
}

export function saveItems(roomId: string, items: BacklogItem[]): void {
  localStorage.setItem(storageKey(roomId), JSON.stringify(items))
}

export function createItem(summary: string, key: string, source: ItemSource = 'manual', orderIndex: number): BacklogItem {
  return {
    id: generateId(),
    key: key || `MANUAL-${orderIndex + 1}`,
    summary,
    source,
    orderIndex,
  }
}

export function addItem(items: BacklogItem[], summary: string, key: string, source: ItemSource = 'manual'): BacklogItem[] {
  const newItem = createItem(summary, key, source, items.length)
  return [...items, newItem]
}

export function updateItem(items: BacklogItem[], itemId: string, updates: Partial<Pick<BacklogItem, 'summary' | 'key'>>): BacklogItem[] {
  return items.map((item) =>
    item.id === itemId ? { ...item, ...updates } : item
  )
}

export function deleteItem(items: BacklogItem[], itemId: string): BacklogItem[] {
  return items.filter((item) => item.id !== itemId)
}

export function moveItemUp(items: BacklogItem[], itemId: string): BacklogItem[] {
  const idx = items.findIndex((i) => i.id === itemId)
  if (idx <= 0) return items
  const swapped = [...items]
  ;[swapped[idx - 1], swapped[idx]] = [swapped[idx], swapped[idx - 1]]
  return reindex(swapped)
}

export function moveItemDown(items: BacklogItem[], itemId: string): BacklogItem[] {
  const idx = items.findIndex((i) => i.id === itemId)
  if (idx === -1 || idx >= items.length - 1) return items
  const swapped = [...items]
  ;[swapped[idx], swapped[idx + 1]] = [swapped[idx + 1], swapped[idx]]
  return reindex(swapped)
}

function reindex(items: BacklogItem[]): BacklogItem[] {
  return items.map((item, i) => ({ ...item, orderIndex: i }))
}

export function clearBacklog(roomId: string): void {
  localStorage.removeItem(storageKey(roomId))
}
