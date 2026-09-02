import { company } from '../data/site.js'

/**
 * Wordmark + coin mark. The glyph is a stylised "f" struck like a florin coin.
 * `onDark` flips the type colours for the footer and dark sections.
 */
export default function Logo({ onDark = false, className = '' }) {
  return (
    <a
      href="#top"
      className={`group flex items-center gap-2.5 rounded-lg ${className}`}
      aria-label={`${company.name} — home`}
    >
      <span className="relative grid size-10 shrink-0 place-items-center rounded-xl bg-brand-900 shadow-soft transition-transform duration-300 group-hover:-rotate-6">
        <svg viewBox="0 0 32 32" className="size-6" aria-hidden="true">
          <path
            d="M12 24V12.5A4.5 4.5 0 0 1 16.5 8H21"
            fill="none"
            stroke="currentColor"
            className="text-gold-400"
            strokeWidth="2.8"
            strokeLinecap="round"
          />
          <path
            d="M10.5 17.5h9"
            fill="none"
            stroke="currentColor"
            className="text-gold-400"
            strokeWidth="2.8"
            strokeLinecap="round"
          />
        </svg>
        {/* Soft gold halo on hover */}
        <span className="pointer-events-none absolute inset-0 rounded-xl ring-2 ring-gold-400/0 transition group-hover:ring-gold-400/40" />
      </span>

      <span className="flex flex-col leading-none">
        <span
          className={`font-display text-[1.15rem] font-bold tracking-tight ${
            onDark ? 'text-white' : 'text-brand-950'
          }`}
        >
          Florin<span className="text-brand-500">Finance</span>
        </span>
        <span
          className={`mt-1 text-[0.62rem] font-semibold tracking-[0.2em] uppercase ${
            onDark ? 'text-brand-200/70' : 'text-ink-400'
          }`}
        >
          Credit brokers
        </span>
      </span>
    </a>
  )
}
