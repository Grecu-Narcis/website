import { useEffect, useRef, useState } from 'react'

/**
 * Adds the `is-visible` class the first time an element scrolls into view,
 * driving the CSS fade-up defined in index.css.
 *
 * Uses IntersectionObserver (no scroll listener, no layout thrash) and
 * disconnects after firing so the animation never replays.
 *
 * @param {{threshold?: number, rootMargin?: string}} options
 * @returns {[React.RefObject, boolean]} ref to attach, and the visible flag
 */
export function useReveal({ threshold = 0.15, rootMargin = '0px 0px -8% 0px' } = {}) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Environments without IntersectionObserver simply start visible.
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold, rootMargin },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, rootMargin])

  return [ref, visible]
}
