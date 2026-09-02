import Icon from './Icon.jsx'
import Reveal from './ui/Reveal.jsx'
import { lenders, stats } from '../data/site.js'

/** Maps the data-layer icon keys onto the icon set. */
const STAT_ICONS = { users: 'users', trending: 'trending', building: 'building', shield: 'shield' }

/**
 * Social-proof band directly under the hero: hard numbers, then a looping
 * marquee of the lender panel.
 *
 * The marquee renders the list twice and translates -50%, which loops with no
 * visible seam; `mask-edges` fades both ends instead of clipping abruptly.
 */
export default function TrustStrip() {
  return (
    <section aria-label="Track record" className="relative border-y border-ink-100 bg-white py-12 sm:py-14">
      <div className="container-page">
        {/* ---------- Stats ---------- */}
        <dl className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 90} className="flex flex-col items-center text-center">
              <span className="grid size-11 place-items-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-brand-100">
                <Icon name={STAT_ICONS[stat.icon]} className="size-5" strokeWidth={1.9} />
              </span>
              <dd className="mt-4 font-display text-3xl font-bold tracking-tight text-brand-950 sm:text-4xl">
                {stat.value}
              </dd>
              <dt className="mt-1.5 max-w-[16ch] text-sm text-ink-500">{stat.label}</dt>
            </Reveal>
          ))}
        </dl>

        {/* ---------- Lender marquee ---------- */}
        <Reveal delay={120} className="mt-12 sm:mt-14">
          <p className="text-center text-xs font-semibold tracking-[0.18em] text-ink-400 uppercase">
            We negotiate across a panel of 31 banks, IFNs and leasing houses
          </p>

          <div className="group mask-edges relative mt-6 overflow-hidden">
            <ul
              className="flex w-max animate-marquee items-center gap-3 group-hover:[animation-play-state:paused]"
              aria-hidden="true"
            >
              {/* Duplicated track — keep both copies identical for a clean loop. */}
              {[...lenders, ...lenders].map((name, i) => (
                <li
                  key={`${name}-${i}`}
                  className="flex shrink-0 items-center gap-2.5 rounded-xl border border-ink-200/70 bg-ink-50/60 px-5 py-3 transition hover:border-brand-200 hover:bg-white"
                >
                  <span className="grid size-6 place-items-center rounded-md bg-brand-800 font-display text-[0.65rem] font-bold text-gold-300">
                    {name.charAt(0)}
                  </span>
                  <span className="font-display text-sm font-semibold whitespace-nowrap text-ink-700">
                    {name}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Screen readers get the plain list once, without the visual duplication. */}
          <p className="sr-only">Lender panel: {lenders.join(', ')}.</p>
        </Reveal>
      </div>
    </section>
  )
}
