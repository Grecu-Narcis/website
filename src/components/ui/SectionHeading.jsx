import Icon from '../Icon.jsx'
import Reveal from './Reveal.jsx'

/**
 * Shared eyebrow + title + lead block, so every section shares one rhythm.
 *
 * @param {'left'|'center'} align
 * @param {boolean} onDark  invert colours for dark sections
 */
export default function SectionHeading({
  eyebrow,
  eyebrowIcon = 'sparkles',
  title,
  accent,
  lead,
  align = 'center',
  onDark = false,
  className = '',
}) {
  const alignment = align === 'center' ? 'items-center text-center mx-auto' : 'items-start text-left'

  return (
    <Reveal className={`flex max-w-3xl flex-col gap-4 ${alignment} ${className}`}>
      {eyebrow && (
        <span
          className={
            onDark
              ? 'inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-xs font-semibold tracking-[0.14em] text-gold-200 uppercase'
              : 'eyebrow'
          }
        >
          <Icon name={eyebrowIcon} className="size-3.5" strokeWidth={2} />
          {eyebrow}
        </span>
      )}

      <h2 className={`text-h2 ${onDark ? 'text-white' : ''}`}>
        {title}{' '}
        {accent && (
          <span className={onDark ? 'text-gold-300' : 'text-brand-500'}>{accent}</span>
        )}
      </h2>

      {lead && (
        <p className={`text-lead ${onDark ? 'text-brand-100/85' : 'text-ink-600'}`}>{lead}</p>
      )}
    </Reveal>
  )
}
