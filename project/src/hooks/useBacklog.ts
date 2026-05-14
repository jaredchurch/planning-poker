import { useState, useCallback } from 'react'
import type { BacklogItem, ItemSource } from '../types/item'
import { addItem as addItemService, updateItem as updateItemService, deleteItem as deleteItemService, moveItemUp, moveItemDown } from '../services/itemService'

export function useBacklog(initialItems: BacklogItem[] = []) {
  const [items, setItems] = useState<BacklogItem[]>(initialItems)

  const addItem = useCallback((summary: string, key: string, source: ItemSource = 'manual') => {
    setItems((prev) => addItemService(prev, summary, key, source))
  }, [])

  const updateItem = useCallback((itemId: string, updates: Partial<Pick<BacklogItem, 'summary' | 'key'>>) => {
    setItems((prev) => updateItemService(prev, itemId, updates))
  }, [])

  const deleteItem = useCallback((itemId: string) => {
    setItems((prev) => deleteItemService(prev, itemId))
  }, [])

  const moveUp = useCallback((itemId: string) => {
    setItems((prev) => moveItemUp(prev, itemId))
  }, [])

  const moveDown = useCallback((itemId: string) => {
    setItems((prev) => moveItemDown(prev, itemId))
  }, [])

  const replaceItems = useCallback((newItems: BacklogItem[]) => {
    setItems(newItems)
  }, [])

  return { items, addItem, updateItem, deleteItem, moveUp, moveDown, replaceItems }
}
