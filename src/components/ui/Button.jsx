import Icon from '../Icon.jsx'

/**
 * Un singur buton, patru aspecte. Randează un <a> atunci când este furnizat `href`,
 * altfel un <button> — astfel semantica rămâne corectă fără un al doilea component.
 *
 * Variante: primary (CTA auriu) · dark (fundal de brand) · outline · ghost
 */

const BASE =
  'group inline-flex items-center justify-center gap-2 rounded-xl font-semibold ' +
  'transition-all duration-300 ease-out select-none whitespace-nowrap ' +
  'disabled:cursor-not-allowed disabled:opacity-60 active:translate-y-px'

const VARIANTS = {
  primary:
    'bg-gold-400 text-brand-950 shadow-[0_10px_28px_-12px_rgba(250,176,36,0.9)] ' +
    'hover:bg-gold-300 hover:shadow-glow hover:-translate-y-0.5',
  dark: 'bg-brand-800 text-white hover:bg-brand-700 hover:-translate-y-0.5 hover:shadow-card',
  outline:
    'border border-brand-200 bg-white/80 text-brand-800 backdrop-blur ' +
    'hover:border-brand-400 hover:bg-white hover:text-brand-900 hover:-translate-y-0.5',
  ghost: 'text-brand-800 hover:bg-brand-50 hover:text-brand-900',
  onDark:
    'border border-white/25 bg-white/10 text-white backdrop-blur ' +
    'hover:border-white/50 hover:bg-white/20 hover:-translate-y-0.5',
}

const SIZES = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-5 py-2.5 text-sm sm:text-[0.95rem]',
  lg: 'px-6 py-3.5 text-base',
}

export default function Button({
  as,
  href,
  variant = 'primary',
  size = 'md',
  icon,
  iconRight = true,
  className = '',
  children,
  ...rest
}) {
  const Tag = as ?? (href ? 'a' : 'button')
  const classes = `${BASE} ${VARIANTS[variant] ?? VARIANTS.primary} ${SIZES[size] ?? SIZES.md} ${className}`

  // Săgeata se deplasează ușor la hover — un indiciu vizual discret care sugerează „înainte”.
  const glyph = icon ? (
    <Icon
      name={icon}
      className={`size-[1.05em] shrink-0 transition-transform duration-300 ${
        iconRight ? 'group-hover:translate-x-0.5' : 'group-hover:-translate-x-0.5'
      }`}
    />
  ) : null

  return (
    <Tag href={href} className={classes} {...rest}>
      {!iconRight && glyph}
      {children}
      {iconRight && glyph}
    </Tag>
  )
}
