import { createItem, addItem, updateItem, deleteItem, moveItemUp, moveItemDown } from '../../../src/services/itemService'
import type { BacklogItem } from '../../../src/types/item'

describe('itemService', () => {
  describe('createItem', () => {
    it('creates an item with given fields', () => {
      const item = createItem('Test summary', 'KEY-1', 'manual', 0)
      expect(item.summary).toBe('Test summary')
      expect(item.key).toBe('KEY-1')
      expect(item.source).toBe('manual')
      expect(item.orderIndex).toBe(0)
      expect(item.id).toBeTruthy()
    })

    it('generates a key when none provided', () => {
      const item = createItem('Test', '', 'manual', 0)
      expect(item.key).toBe('MANUAL-1')
    })

    it('accepts jira source', () => {
      const item = createItem('Test', 'JIRA-1', 'jira', 0)
      expect(item.source).toBe('jira')
    })
  })

  describe('addItem', () => {
    it('adds new item to the end of the list', () => {
      const existing: BacklogItem[] = [
        createItem('Item 1', 'K-1', 'manual', 0),
      ]
      const result = addItem(existing, 'Item 2', 'K-2')
      expect(result).toHaveLength(2)
      expect(result[1].summary).toBe('Item 2')
      expect(result[1].orderIndex).toBe(1)
    })

    it('does not mutate the original array', () => {
      const existing: BacklogItem[] = [
        createItem('Item 1', 'K-1', 'manual', 0),
      ]
      const result = addItem(existing, 'Item 2', 'K-2')
      expect(existing).toHaveLength(1)
      expect(result).toHaveLength(2)
    })
  })

  describe('updateItem', () => {
    it('updates summary and key of existing item', () => {
      const items: BacklogItem[] = [
        createItem('Original', 'KEY-1', 'manual', 0),
      ]
      const result = updateItem(items, items[0].id, { summary: 'Updated', key: 'KEY-NEW' })
      expect(result[0].summary).toBe('Updated')
      expect(result[0].key).toBe('KEY-NEW')
    })
  })

  describe('deleteItem', () => {
    it('removes item by id', () => {
      const items: BacklogItem[] = [
        createItem('Item 1', 'K-1', 'manual', 0),
        createItem('Item 2', 'K-2', 'manual', 1),
      ]
      const result = deleteItem(items, items[0].id)
      expect(result).toHaveLength(1)
      expect(result[0].key).toBe('K-2')
    })
  })

  describe('moveItemUp', () => {
    it('swaps item with the one above it', () => {
      const items: BacklogItem[] = [
        createItem('First', 'K-1', 'manual', 0),
        createItem('Second', 'K-2', 'manual', 1),
        createItem('Third', 'K-3', 'manual', 2),
      ]
      const result = moveItemUp(items, items[1].id)
      expect(result[0].summary).toBe('Second')
      expect(result[1].summary).toBe('First')
      expect(result[2].summary).toBe('Third')
    })

    it('does nothing for first item', () => {
      const items: BacklogItem[] = [
        createItem('First', 'K-1', 'manual', 0),
        createItem('Second', 'K-2', 'manual', 1),
      ]
      const result = moveItemUp(items, items[0].id)
      expect(result[0].summary).toBe('First')
      expect(result[1].summary).toBe('Second')
    })
  })

  describe('moveItemDown', () => {
    it('swaps item with the one below it', () => {
      const items: BacklogItem[] = [
        createItem('First', 'K-1', 'manual', 0),
        createItem('Second', 'K-2', 'manual', 1),
        createItem('Third', 'K-3', 'manual', 2),
      ]
      const result = moveItemDown(items, items[0].id)
      expect(result[0].summary).toBe('Second')
      expect(result[1].summary).toBe('First')
      expect(result[2].summary).toBe('Third')
    })

    it('does nothing for last item', () => {
      const items: BacklogItem[] = [
        createItem('First', 'K-1', 'manual', 0),
        createItem('Second', 'K-2', 'manual', 1),
      ]
      const result = moveItemDown(items, items[1].id)
      expect(result[0].summary).toBe('First')
      expect(result[1].summary).toBe('Second')
    })
  })
})
