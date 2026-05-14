import { loadSettings, saveSettings, updateSettings, DEFAULT_SETTINGS } from '../../../src/services/sessionManager'

describe('sessionManager', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  describe('loadSettings', () => {
    it('returns default settings when nothing stored', () => {
      const settings = loadSettings()
      expect(settings.scaleId).toBe('fibonacci')
      expect(settings.autoRevealEnabled).toBe(false)
      expect(settings.isLocked).toBe(false)
      expect(settings.consensusAlgorithm).toBe('mode')
    })

    it('returns saved settings from localStorage', () => {
      const custom = { ...DEFAULT_SETTINGS, scaleId: 'tshirt', autoRevealEnabled: true }
      saveSettings(custom)
      const loaded = loadSettings()
      expect(loaded.scaleId).toBe('tshirt')
      expect(loaded.autoRevealEnabled).toBe(true)
    })
  })

  describe('updateSettings', () => {
    it('merges partial updates', () => {
      const result = updateSettings(DEFAULT_SETTINGS, { scaleId: 'integers', isLocked: true })
      expect(result.scaleId).toBe('integers')
      expect(result.isLocked).toBe(true)
      expect(result.autoRevealEnabled).toBe(false)
    })
  })
})
