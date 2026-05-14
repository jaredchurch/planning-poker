import { useBreakpoint } from '../../hooks/useBreakpoint'

interface ResponsiveGridProps {
  leftPanel?: React.ReactNode
  centerPanel: React.ReactNode
  rightPanel?: React.ReactNode
  variant: 'host' | 'peer'
}

export function ResponsiveGrid({
  leftPanel,
  centerPanel,
  rightPanel,
  variant,
}: ResponsiveGridProps) {
  const { deviceType } = useBreakpoint()

  if (variant === 'peer') {
    return (
      <div className="flex-1 flex flex-col">
        <div className="flex-1">
          {centerPanel}
        </div>
      </div>
    )
  }

  if (deviceType === 'mobile') {
    return (
      <div className="flex-1 flex flex-col">
        <div className="flex-1">
          {centerPanel}
        </div>
      </div>
    )
  }

  if (deviceType === 'tablet') {
    return (
      <div className="flex-1 grid grid-cols-2 gap-4 p-4">
        <div className="min-w-0 overflow-auto">
          {leftPanel}
        </div>
        <div className="min-w-0 overflow-auto">
          {centerPanel}
        </div>
        {rightPanel && (
          <div className="col-span-2 min-w-0 overflow-auto border-t pt-4 mt-2">
            <div className="sticky top-0">
              {rightPanel}
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="flex-1 grid grid-cols-3 gap-4 p-4">
      {leftPanel && (
        <aside className="min-w-0 overflow-auto">
          {leftPanel}
        </aside>
      )}
      <section className={`min-w-0 overflow-auto ${leftPanel ? '' : 'col-span-2'}`}>
        {centerPanel}
      </section>
      {rightPanel && (
        <aside className="min-w-0 overflow-auto">
          {rightPanel}
        </aside>
      )}
    </div>
  )
}
