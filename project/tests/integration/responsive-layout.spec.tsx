import { render, screen } from '@testing-library/react'
import { AppShell } from '../../src/components/layout/AppShell'
import { ResponsiveGrid } from '../../src/components/layout/ResponsiveGrid'
import { MobileDrawer } from '../../src/components/layout/MobileDrawer'

describe('Responsive Layout Integration', () => {
  describe('AppShell', () => {
    it('renders children within the shell', () => {
      render(
        <AppShell>
          <div data-testid="content">Hello</div>
        </AppShell>
      )
      expect(screen.getByTestId('content')).toBeInTheDocument()
    })

    it('renders navigation when showNavigation is true', () => {
      render(
        <AppShell showNavigation>
          <div>Content</div>
        </AppShell>
      )
      expect(screen.getByText('Planning Poker')).toBeInTheDocument()
    })

    it('does not render navigation when showNavigation is false', () => {
      render(
        <AppShell showNavigation={false}>
          <div>Content</div>
        </AppShell>
      )
      expect(screen.queryByText('Planning Poker')).not.toBeInTheDocument()
    })
  })

  describe('ResponsiveGrid', () => {
    it('renders center panel for peer variant', () => {
      render(
        <ResponsiveGrid
          variant="peer"
          centerPanel={<div data-testid="center">Center</div>}
        />
      )
      expect(screen.getByTestId('center')).toBeInTheDocument()
    })

    it('renders all three panels for host variant', () => {
      render(
        <ResponsiveGrid
          variant="host"
          leftPanel={<div data-testid="left">Left</div>}
          centerPanel={<div data-testid="center">Center</div>}
          rightPanel={<div data-testid="right">Right</div>}
        />
      )
      expect(screen.getByTestId('left')).toBeInTheDocument()
      expect(screen.getByTestId('center')).toBeInTheDocument()
      expect(screen.getByTestId('right')).toBeInTheDocument()
    })

    it('handles missing optional panels', () => {
      render(
        <ResponsiveGrid
          variant="host"
          centerPanel={<div data-testid="center">Center</div>}
        />
      )
      expect(screen.getByTestId('center')).toBeInTheDocument()
    })
  })

  describe('MobileDrawer', () => {
    it('renders content when open', () => {
      render(
        <MobileDrawer isOpen={true} onClose={() => {}} title="Test">
          <div data-testid="drawer-content">Drawer Content</div>
        </MobileDrawer>
      )
      expect(screen.getByTestId('drawer-content')).toBeInTheDocument()
    })

    it('drawer is visually hidden when closed', () => {
      render(
        <MobileDrawer isOpen={false} onClose={() => {}} title="Test">
          <div data-testid="drawer-content">Drawer Content</div>
        </MobileDrawer>
      )
      const overlay = document.querySelector('.fixed.inset-0')
      expect(overlay).not.toBeInTheDocument()
    })
  })
})
