import { render, screen, fireEvent, act } from '@testing-library/react'
import { ItemForm } from '../../src/components/backlog/ItemForm'
import { BacklogPanel } from '../../src/components/backlog/BacklogPanel'
import { createItem } from '../../src/services/itemService'
import type { BacklogItem } from '../../src/types/item'

describe('ItemForm', () => {
  it('renders form fields and submits', () => {
    const onSave = jest.fn()
    render(<ItemForm onSave={onSave} onCancel={jest.fn()} />)

    fireEvent.change(screen.getByPlaceholderText('What needs to be estimated?'), {
      target: { value: 'New feature' },
    })
    fireEvent.click(screen.getByText('Save'))

    expect(onSave).toHaveBeenCalledWith('New feature', '')
  })

  it('shows error on empty summary', () => {
    render(<ItemForm onSave={jest.fn()} onCancel={jest.fn()} />)
    fireEvent.click(screen.getByText('Save'))
    expect(screen.getByText('Summary is required')).toBeInTheDocument()
  })

  it('pre-fills values in edit mode', () => {
    render(<ItemForm onSave={jest.fn()} onCancel={jest.fn()} initialSummary="Edit me" initialKey="KEY-1" />)
    expect(screen.getByDisplayValue('Edit me')).toBeInTheDocument()
    expect(screen.getByDisplayValue('KEY-1')).toBeInTheDocument()
  })

  it('calls onCancel when cancel button clicked', () => {
    const onCancel = jest.fn()
    render(<ItemForm onSave={jest.fn()} onCancel={onCancel} />)
    fireEvent.click(screen.getByText('Cancel'))
    expect(onCancel).toHaveBeenCalled()
  })
})

describe('BacklogPanel', () => {
  const items: BacklogItem[] = [
    createItem('Item 1', 'K-1', 'manual', 0),
    createItem('Item 2', 'K-2', 'manual', 1),
  ]

  it('renders items list', () => {
    render(
      <BacklogPanel
        items={items}
        activeItemId={null}
        onAddItem={jest.fn()}
        onUpdateItem={jest.fn()}
        onDeleteItem={jest.fn()}
        onMoveUp={jest.fn()}
        onMoveDown={jest.fn()}
        onFocusItem={jest.fn()}
      />
    )
    expect(screen.getByText('Item 1')).toBeInTheDocument()
    expect(screen.getByText('Item 2')).toBeInTheDocument()
  })

  it('shows empty state when no items', () => {
    render(
      <BacklogPanel
        items={[]}
        activeItemId={null}
        onAddItem={jest.fn()}
        onUpdateItem={jest.fn()}
        onDeleteItem={jest.fn()}
        onMoveUp={jest.fn()}
        onMoveDown={jest.fn()}
        onFocusItem={jest.fn()}
      />
    )
    expect(screen.getByText('No items yet. Add one to get started.')).toBeInTheDocument()
  })

  it('opens add form on + Add Item click', () => {
    render(
      <BacklogPanel
        items={items}
        activeItemId={null}
        onAddItem={jest.fn()}
        onUpdateItem={jest.fn()}
        onDeleteItem={jest.fn()}
        onMoveUp={jest.fn()}
        onMoveDown={jest.fn()}
        onFocusItem={jest.fn()}
      />
    )
    fireEvent.click(screen.getByText('+ Add Item'))
    expect(screen.getByPlaceholderText('What needs to be estimated?')).toBeInTheDocument()
  })
})
