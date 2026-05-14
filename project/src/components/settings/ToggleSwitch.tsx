interface ToggleSwitchProps {
  label: string
  enabled: boolean
  onChange: (enabled: boolean) => void
}

export function ToggleSwitch({ label, enabled, onChange }: ToggleSwitchProps) {
  return (
    <label className="flex items-center justify-between py-2 cursor-pointer">
      <span className="text-sm font-medium text-gray-700">{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={enabled}
        onClick={() => onChange(!enabled)}
        className={`relative inline-flex h-5 w-9 shrink-0 rounded-full border-2 border-transparent transition-colors ${
          enabled ? 'bg-blue-500' : 'bg-gray-300'
        }`}
      >
        <span
          className={`pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow transform transition-transform ${
            enabled ? 'translate-x-4' : 'translate-x-0'
          }`}
        />
      </button>
    </label>
  )
}
