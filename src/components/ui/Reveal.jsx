import { useReveal } from '../../hooks/useReveal.js'

/**
 * Încadrează elementele copil într-un container care apare gradual la derulare.
 * `delay` decalează elementele învecinate (de ex. cardurile dintr-o grilă), fără CSS suplimentar.
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
