import type { SessionSettings } from '../../types/session'
import { ToggleSwitch } from './ToggleSwitch'
import { ScaleSelector } from './ScaleSelector'

interface SettingsPanelProps {
  settings: SessionSettings
  onSettingsChange: (updates: Partial<SessionSettings>) => void
}

export function SettingsPanel({ settings, onSettingsChange }: SettingsPanelProps) {
  return (
    <div className="border rounded-lg p-4 space-y-3">
      <h3 className="text-lg font-semibold">Session Settings</h3>

      <ScaleSelector
        value={settings.scaleId}
        onChange={(scaleId) => onSettingsChange({ scaleId })}
      />

      <ToggleSwitch
        label="Auto-Reveal"
        enabled={settings.autoRevealEnabled}
        onChange={(enabled) => onSettingsChange({ autoRevealEnabled: enabled })}
      />

      <ToggleSwitch
        label="Lock Room"
        enabled={settings.isLocked}
        onChange={(enabled) => onSettingsChange({ isLocked: enabled })}
      />

      <div className="py-2">
        <label className="block text-sm font-medium text-gray-700 mb-1">Consensus Algorithm</label>
        <select
          value={settings.consensusAlgorithm}
          onChange={(e) => onSettingsChange({ consensusAlgorithm: e.target.value as SessionSettings['consensusAlgorithm'] })}
          className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="mode">Mode (Most Common)</option>
          <option value="average">Average</option>
          <option value="weighted">Weighted</option>
        </select>
      </div>

      <ToggleSwitch
        label="Show 'More Info Needed' card"
        enabled={settings.showMoreInfoNeeded}
        onChange={(enabled) => onSettingsChange({ showMoreInfoNeeded: enabled })}
      />
    </div>
  )
}
