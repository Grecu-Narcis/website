import { useEffect, useState } from 'react'

/**
 * True once the page has scrolled past `offset` pixels.
 * Used to compact the sticky header and to reveal the back-to-top button.
 *
 * The listener is passive and only re-renders on an actual state flip.
 */
export function useScrolled(offset = 24) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > offset)

    onScroll() // capture the position on mount (e.g. restored scroll)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [offset])

  return scrolled
}
