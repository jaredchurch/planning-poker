import { SCALES } from '../../utils/scales'

interface ScaleSelectorProps {
  value: string
  onChange: (scaleId: string) => void
}

export function ScaleSelector({ value, onChange }: ScaleSelectorProps) {
  return (
    <div className="py-2">
      <label htmlFor="voting-scale" className="block text-sm font-medium text-gray-700 mb-1">Voting Scale</label>
      <select
        id="voting-scale"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        {SCALES.map((scale) => (
          <option key={scale.id} value={scale.id}>
            {scale.label}
          </option>
        ))}
      </select>
    </div>
  )
}
