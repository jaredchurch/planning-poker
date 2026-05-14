import { useState } from 'react'
import type { BacklogItem as BacklogItemType } from '../../types/item'
import { BacklogItemRow } from './BacklogItem'
import { ItemForm } from './ItemForm'

interface BacklogPanelProps {
  items: BacklogItemType[]
  activeItemId: string | null
  onAddItem: (summary: string, key: string) => void
  onUpdateItem: (itemId: string, summary: string, key: string) => void
  onDeleteItem: (itemId: string) => void
  onMoveUp: (itemId: string) => void
  onMoveDown: (itemId: string) => void
  onFocusItem: (itemId: string) => void
}

export function BacklogPanel({
  items,
  activeItemId,
  onAddItem,
  onUpdateItem,
  onDeleteItem,
  onMoveUp,
  onMoveDown,
  onFocusItem,
}: BacklogPanelProps) {
  const [showForm, setShowForm] = useState(false)
  const [editingItem, setEditingItem] = useState<BacklogItemType | null>(null)

  const sorted = [...items].sort((a, b) => a.orderIndex - b.orderIndex)

  const handleSave = (summary: string, key: string) => {
    if (editingItem) {
      onUpdateItem(editingItem.id, summary, key)
      setEditingItem(null)
    } else {
      onAddItem(summary, key)
      setShowForm(false)
    }
  }

  const handleCancel = () => {
    setShowForm(false)
    setEditingItem(null)
  }

  const handleEdit = (item: BacklogItemType) => {
    setEditingItem(item)
    setShowForm(true)
  }

  return (
    <div className="border rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold">Backlog</h3>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="text-sm px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
          >
            + Add Item
          </button>
        )}
      </div>

      {showForm && (
        <div className="mb-4 p-3 bg-gray-50 rounded">
          <ItemForm
            onSave={handleSave}
            onCancel={handleCancel}
            initialSummary={editingItem?.summary || ''}
            initialKey={editingItem?.key || ''}
          />
        </div>
      )}

      {sorted.length === 0 && !showForm && (
        <p className="text-sm text-gray-400 text-center py-4">No items yet. Add one to get started.</p>
      )}

      <ul className="space-y-2">
        {sorted.map((item, idx) => (
          <div key={item.id} onClick={() => onFocusItem(item.id)} className="cursor-pointer">
            <BacklogItemRow
              item={item}
              isActive={item.id === activeItemId}
              onEdit={handleEdit}
              onDelete={onDeleteItem}
              onMoveUp={onMoveUp}
              onMoveDown={onMoveDown}
              isFirst={idx === 0}
              isLast={idx === sorted.length - 1}
            />
          </div>
        ))}
      </ul>
    </div>
  )
}
