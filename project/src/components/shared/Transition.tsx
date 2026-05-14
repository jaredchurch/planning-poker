import { useState, useEffect, useRef } from 'react'

interface TransitionProps {
  children: React.ReactNode
  type?: 'fade' | 'slide' | 'none'
  duration?: number
}

export function Transition({
  children,
  type = 'fade',
  duration = 300,
}: TransitionProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [content, setContent] = useState(children)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  useEffect(() => {
    setIsVisible(false)
    timeoutRef.current = setTimeout(() => {
      setContent(children)
      setIsVisible(true)
    }, duration)
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [children, duration])

  const transitionClass =
    type === 'fade'
      ? `transition-opacity duration-${duration}`
      : type === 'slide'
        ? `transition-all duration-${duration}`
        : ''

  const visibilityClass = isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'

  return (
    <div
      className={`${transitionClass} ${visibilityClass} flex-1 flex flex-col`}
      style={{ transitionDuration: `${duration}ms` }}
    >
      {content}
    </div>
  )
}
