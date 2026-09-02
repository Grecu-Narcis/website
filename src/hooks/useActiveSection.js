import { useEffect, useState } from 'react'

/**
 * Lightweight scroll-spy: returns the id of the section currently occupying
 * the middle of the viewport, so the nav can highlight where you are.
 *
 * @param {string[]} ids section ids, in document order
 */
export function useActiveSection(ids) {
  const [active, setActive] = useState(null)

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return

    const elements = ids.map((id) => document.getElementById(id)).filter(Boolean)
    if (!elements.length) return

    // Track ratios for every section and pick the most visible one, which is
    // steadier than reacting to whichever entry fired last.
    const ratios = new Map()

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => ratios.set(entry.target.id, entry.intersectionRatio))

        let best = null
        let bestRatio = 0
        ratios.forEach((ratio, id) => {
          if (ratio > bestRatio) {
            bestRatio = ratio
            best = id
          }
        })

        setActive(bestRatio > 0.08 ? best : null)
      },
      { threshold: [0, 0.1, 0.25, 0.5, 0.75, 1], rootMargin: '-88px 0px -35% 0px' },
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [ids])

  return active
}
