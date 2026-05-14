import { useState, useCallback } from 'react'
import type { SessionSettings } from '../types/session'
import { loadSettings, saveSettings, updateSettings, DEFAULT_SETTINGS } from '../services/sessionManager'

export function useRoomSettings() {
  const [settings, setSettings] = useState<SessionSettings>(loadSettings)

  const updateSetting = useCallback((updates: Partial<SessionSettings>) => {
    setSettings((prev) => {
      const next = updateSettings(prev, updates)
      saveSettings(next)
      return next
    })
  }, [])

  const resetSettings = useCallback(() => {
    setSettings({ ...DEFAULT_SETTINGS })
    saveSettings(DEFAULT_SETTINGS)
  }, [])

  return { settings, updateSetting, resetSettings }
}
