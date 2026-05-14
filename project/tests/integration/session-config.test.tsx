import { render, screen, fireEvent } from '@testing-library/react'
import { SettingsPanel } from '../../src/components/settings/SettingsPanel'
import { ToggleSwitch } from '../../src/components/settings/ToggleSwitch'
import { ScaleSelector } from '../../src/components/settings/ScaleSelector'
import { DEFAULT_SETTINGS } from '../../src/services/sessionManager'

describe('SettingsPanel', () => {
  it('renders all controls', () => {
    render(<SettingsPanel settings={DEFAULT_SETTINGS} onSettingsChange={jest.fn()} />)
    expect(screen.getByText('Session Settings')).toBeInTheDocument()
    expect(screen.getByText('Voting Scale')).toBeInTheDocument()
    expect(screen.getByText('Auto-Reveal')).toBeInTheDocument()
    expect(screen.getByText('Lock Room')).toBeInTheDocument()
    expect(screen.getByText('Consensus Algorithm')).toBeInTheDocument()
    expect(screen.getByText("Show 'More Info Needed' card")).toBeInTheDocument()
  })

  it('calls onSettingsChange when scale changes', () => {
    const onChange = jest.fn()
    render(<SettingsPanel settings={DEFAULT_SETTINGS} onSettingsChange={onChange} />)
    const selects = screen.getAllByRole('combobox')
    fireEvent.change(selects[0], { target: { value: 'tshirt' } })
    expect(onChange).toHaveBeenCalledWith({ scaleId: 'tshirt' })
  })
})

describe('ToggleSwitch', () => {
  it('renders with correct state', () => {
    const onChange = jest.fn()
    const { rerender } = render(<ToggleSwitch label="Test" enabled={false} onChange={onChange} />)
    expect(screen.getByText('Test')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('switch'))
    expect(onChange).toHaveBeenCalledWith(true)
  })
})

describe('ScaleSelector', () => {
  it('renders scale options', () => {
    render(<ScaleSelector value="fibonacci" onChange={jest.fn()} />)
    expect(screen.getByDisplayValue('Fibonacci')).toBeInTheDocument()
  })
})
