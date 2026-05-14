import { useState, useEffect, useRef } from 'react'
import type { DeviceType, Breakpoint, ViewportState } from '../types/layout'

const BREAKPOINTS: Record<Breakpoint, number> = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
}

function getBreakpoint(width: number): Breakpoint {
  if (width < BREAKPOINTS.md) return 'sm'
  if (width < BREAKPOINTS.lg) return 'md'
  if (width < BREAKPOINTS.xl) return 'lg'
  return 'xl'
}

function getDeviceType(width: number): DeviceType {
  if (width < BREAKPOINTS.md) return 'mobile'
  if (width < BREAKPOINTS.lg) return 'tablet'
  return 'desktop'
}

function getViewportState(): ViewportState {
  const width = window.innerWidth
  const height = window.innerHeight
  return {
    currentBreakpoint: getBreakpoint(width),
    deviceType: getDeviceType(width),
    width,
    height,
  }
}

export function useBreakpoint(): ViewportState {
  const [state, setState] = useState<ViewportState>(getViewportState)
  const rafRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    const handleResize = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(() => {
        setState(getViewportState())
      })
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return state
}
