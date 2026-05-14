import { useState } from 'react'
import type { BacklogItem as BacklogItemType } from '../../types/item'
import { ConfirmDialog } from '../ConfirmDialog'

interface BacklogItemProps {
  item: BacklogItemType
  isActive: boolean
  onEdit: (item: BacklogItemType) => void
  onDelete: (itemId: string) => void
  onMoveUp: (itemId: string) => void
  onMoveDown: (itemId: string) => void
  isFirst: boolean
  isLast: boolean
}

export function BacklogItemRow({ item, isActive, onEdit, onDelete, onMoveUp, onMoveDown, isFirst, isLast }: BacklogItemProps) {
  const [showConfirm, setShowConfirm] = useState(false)

  return (
    <li
      className={`p-3 rounded border ${
        isActive ? 'bg-blue-50 border-blue-300' : 'bg-white border-gray-200'
      }`}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="min-w-0 flex-1">
          <span className="font-mono text-xs text-gray-500">{item.key}</span>
          <p className="text-sm truncate">{item.summary}</p>
          {item.source === 'manual' && (
            <span className="text-xs text-gray-400 italic">Manual</span>
          )}
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={() => onMoveUp(item.id)}
            disabled={isFirst}
            className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed"
            title="Move up"
          >
            ▲
          </button>
          <button
            onClick={() => onMoveDown(item.id)}
            disabled={isLast}
            className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed"
            title="Move down"
          >
            ▼
          </button>
          <button
            onClick={() => onEdit(item)}
            className="p-1 text-blue-500 hover:text-blue-700 text-sm"
            title="Edit"
          >
            Edit
          </button>
          <button
            onClick={() => setShowConfirm(true)}
            className="p-1 text-red-400 hover:text-red-600 text-sm"
            title="Delete"
          >
            Del
          </button>
        </div>
      </div>

      {isActive && (
        <span className="inline-block mt-1 text-xs bg-blue-500 text-white px-2 py-0.5 rounded">
          Active
        </span>
      )}

      {showConfirm && (
        <ConfirmDialog
          message={`Delete "${item.summary}"?`}
          onConfirm={() => { setShowConfirm(false); onDelete(item.id) }}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </li>
  )
}
