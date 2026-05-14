export type DeviceType = 'mobile' | 'tablet' | 'desktop'

export type Breakpoint = 'sm' | 'md' | 'lg' | 'xl'

export interface ViewportState {
  currentBreakpoint: Breakpoint
  deviceType: DeviceType
  width: number
  height: number
}

export interface LayoutState {
  isDrawerOpen: boolean
  activeScreen: 'landing' | 'join' | 'dashboard'
}
