import { renderHook, act } from '@testing-library/react'
import { useBreakpoint } from '../../../src/hooks/useBreakpoint'

describe('useBreakpoint', () => {
  const originalRAF = window.requestAnimationFrame
  const originalInnerWidth = window.innerWidth
  const originalInnerHeight = window.innerHeight

  beforeAll(() => {
    window.requestAnimationFrame = (cb: FrameRequestCallback) => {
      cb(0)
      return 0
    }
  })

  afterAll(() => {
    window.requestAnimationFrame = originalRAF
  })

  afterEach(() => {
    window.innerWidth = originalInnerWidth
    window.innerHeight = originalInnerHeight
  })

  function setWindowWidth(width: number) {
    window.innerWidth = width
    window.dispatchEvent(new Event('resize'))
  }

  it('returns mobile device type for small screens', () => {
    setWindowWidth(375)
    const { result } = renderHook(() => useBreakpoint())
    expect(result.current.deviceType).toBe('mobile')
    expect(result.current.currentBreakpoint).toBe('sm')
  })

  it('returns tablet device type for medium screens', () => {
    setWindowWidth(800)
    const { result } = renderHook(() => useBreakpoint())
    expect(result.current.deviceType).toBe('tablet')
    expect(result.current.currentBreakpoint).toBe('md')
  })

  it('returns desktop device type for large screens', () => {
    setWindowWidth(1280)
    const { result } = renderHook(() => useBreakpoint())
    expect(result.current.deviceType).toBe('desktop')
    expect(result.current.currentBreakpoint).toBe('xl')
  })

  it('updates on window resize', () => {
    setWindowWidth(375)
    const { result } = renderHook(() => useBreakpoint())
    expect(result.current.deviceType).toBe('mobile')

    act(() => {
      setWindowWidth(800)
    })

    expect(result.current.deviceType).toBe('tablet')
    expect(result.current.currentBreakpoint).toBe('md')
  })

  it('returns current width and height', () => {
    setWindowWidth(1024)
    window.innerHeight = 768
    const { result } = renderHook(() => useBreakpoint())
    expect(result.current.width).toBe(1024)
    expect(result.current.height).toBe(768)
  })
})
