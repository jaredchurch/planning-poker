import type { Item } from '../types/voting'

interface ItemListProps {
  items: Item[]
  activeItemId: string | null
  onFocusItem: (itemId: string) => void
}

export function ItemList({ items, activeItemId, onFocusItem }: ItemListProps) {
  return (
    <div className="border rounded-lg p-4">
      <h3 className="text-lg font-semibold mb-3">Items</h3>
      <ul className="space-y-2">
        {items.map((item) => (
          <li
            key={item.id}
            className={`p-2 rounded cursor-pointer flex justify-between items-center
              ${item.id === activeItemId ? 'bg-blue-100 border border-blue-300' : 'hover:bg-gray-50'}`}
            onClick={() => onFocusItem(item.id)}
          >
            <span className="min-w-0">
              <span className="font-mono text-sm text-gray-500">{item.key}</span>{' '}
              <span className="truncate inline-block align-bottom max-w-[200px] lg:max-w-[300px]" title={item.summary}>
                {item.summary}
              </span>
            </span>
            {item.id === activeItemId && (
              <span className="text-xs bg-blue-500 text-white px-2 py-0.5 rounded">
                Active
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
