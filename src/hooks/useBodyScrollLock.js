import { useEffect } from 'react'

/**
 * Freezes background scrolling while a drawer/modal is open, and compensates
 * for the vanishing scrollbar so the layout does not jump on desktop.
 */
export function useBodyScrollLock(locked) {
  useEffect(() => {
    if (!locked) return

    const { body } = document
    const previousOverflow = body.style.overflow
    const previousPadding = body.style.paddingRight
    const scrollbar = window.innerWidth - document.documentElement.clientWidth

    body.style.overflow = 'hidden'
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`

    return () => {
      body.style.overflow = previousOverflow
      body.style.paddingRight = previousPadding
    }
  }, [locked])
}
