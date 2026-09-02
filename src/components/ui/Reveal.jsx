import { useReveal } from '../../hooks/useReveal.js'

/**
 * Wraps children in a fade-up-on-scroll container.
 * `delay` staggers siblings (e.g. cards in a grid) without extra CSS.
 */
export default function Reveal({ as: Tag = 'div', delay = 0, className = '', children, ...rest }) {
  const [ref, visible] = useReveal()

  return (
    <Tag
      ref={ref}
      style={{ '--reveal-delay': `${delay}ms` }}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  )
}
