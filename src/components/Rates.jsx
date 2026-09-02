import Icon from './Icon.jsx'
import Button from './ui/Button.jsx'
import Reveal from './ui/Reveal.jsx'
import SectionHeading from './ui/SectionHeading.jsx'
import { comparisonRows, rateCards, representativeExample } from '../data/site.js'

/**
 * Pricing block, in two coordinated forms:
 *  • three product cards (all breakpoints) — the middle one is featured
 *  • a full comparison table (lg+ only), which would be unreadable on mobile
 *    where the cards already carry the same information
 */
export default function Rates() {
  return (
    <section id="rates" className="section bg-ink-50/60">
      <div className="container-page">
        <SectionHeading
          eyebrow="Indicative rates"
          eyebrowIcon="percent"
          title="Today's best pricing on"
          accent="our panel"
          lead="Updated weekly. These are the rates our clients are actually being offered this month — not a shop-window number reserved for perfect files."
        />

        {/* ---------- Product cards ---------- */}
        <div className="mt-14 grid items-start gap-6 lg:grid-cols-3">
          {rateCards.map((card, i) => (
            <Reveal
              key={card.id}
              delay={i * 100}
              className={`relative flex h-full flex-col rounded-3xl p-7 transition-all duration-300 sm:p-8 ${
                card.featured
                  ? 'bg-brand-950 text-white shadow-lift ring-1 ring-brand-800 lg:-mt-4 lg:pb-10'
                  : 'card card-hover'
              }`}
            >
              {card.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gold-400 px-3.5 py-1 text-[0.7rem] font-bold tracking-wide text-brand-950 uppercase shadow-glow">
                  Most requested
                </span>
              )}

              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3
                    className={`font-display text-xl font-bold ${card.featured ? 'text-white' : 'text-brand-950'}`}
                  >
                    {card.name}
                  </h3>
                  <p className={`mt-1 text-sm ${card.featured ? 'text-brand-200' : 'text-ink-500'}`}>
                    {card.blurb}
                  </p>
                </div>
                <span
                  className={`grid size-10 shrink-0 place-items-center rounded-xl ${
                    card.featured ? 'bg-white/10 text-gold-300' : 'bg-brand-50 text-brand-600'
                  }`}
                >
                  <Icon name={card.id === 'mortgage' ? 'home' : card.id === 'personal' ? 'wallet' : 'refresh'} className="size-5" strokeWidth={1.8} />
                </span>
              </div>

              {/* Headline rate */}
              <div className="mt-7 flex items-end gap-2">
                <span className={`text-sm font-semibold ${card.featured ? 'text-brand-200' : 'text-ink-400'}`}>
                  from
                </span>
                <span
                  className={`font-display text-[clamp(2.5rem,5vw,3.25rem)] leading-none font-bold tabular-nums ${
                    card.featured ? 'text-gold-300' : 'text-brand-800'
                  }`}
                >
                  {card.from}%
                </span>
              </div>
              <p className={`mt-2 text-xs ${card.featured ? 'text-brand-200/80' : 'text-ink-500'}`}>
                Representative APR {card.apr}% · fixed period pricing
              </p>

              {/* Key facts */}
              <dl
                className={`mt-6 grid gap-2 border-t pt-6 text-sm ${
                  card.featured ? 'border-white/10' : 'border-ink-100'
                }`}
              >
                <div className="flex justify-between gap-3">
                  <dt className={card.featured ? 'text-brand-200' : 'text-ink-500'}>Amount</dt>
                  <dd className={`text-right font-semibold ${card.featured ? 'text-white' : 'text-ink-800'}`}>
                    {card.amount}
                  </dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className={card.featured ? 'text-brand-200' : 'text-ink-500'}>Term</dt>
                  <dd className={`text-right font-semibold ${card.featured ? 'text-white' : 'text-ink-800'}`}>
                    {card.term}
                  </dd>
                </div>
              </dl>

              <ul className="mt-6 flex-1 space-y-3">
                {card.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm">
                    <span
                      className={`mt-0.5 grid size-5 shrink-0 place-items-center rounded-full ${
                        card.featured ? 'bg-gold-400/20 text-gold-300' : 'bg-brand-100 text-brand-700'
                      }`}
                    >
                      <Icon name="check" className="size-3.5" strokeWidth={2.6} />
                    </span>
                    <span className={card.featured ? 'text-brand-100' : 'text-ink-700'}>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                href="#contact"
                variant={card.featured ? 'primary' : 'outline'}
                size="md"
                icon="arrowRight"
                className="mt-8 w-full"
              >
                Check my eligibility
              </Button>
            </Reveal>
          ))}
        </div>

        {/* ---------- Comparison table (desktop only) ---------- */}
        <Reveal delay={120} className="mt-14 hidden lg:block">
          <div className="overflow-hidden rounded-3xl border border-ink-200/70 bg-white shadow-soft">
            <table className="w-full text-left text-sm">
              <caption className="sr-only">Side-by-side comparison of FlorinFinance loan products</caption>
              <thead>
                <tr className="border-b border-ink-200 bg-ink-50/70">
                  <th scope="col" className="px-6 py-4 font-display text-xs tracking-[0.14em] text-ink-500 uppercase">
                    Compare
                  </th>
                  {rateCards.map((card) => (
                    <th
                      key={card.id}
                      scope="col"
                      className={`px-6 py-4 font-display text-base font-bold ${
                        card.featured ? 'text-brand-700' : 'text-brand-950'
                      }`}
                    >
                      {card.name}
                      {card.featured && (
                        <span className="ml-2 rounded-full bg-gold-100 px-2 py-0.5 text-[0.65rem] font-bold tracking-wide text-gold-800 uppercase">
                          Popular
                        </span>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr
                    key={row.label}
                    className={`border-b border-ink-100 transition-colors last:border-0 hover:bg-brand-50/40 ${
                      i % 2 ? 'bg-ink-50/30' : ''
                    }`}
                  >
                    <th scope="row" className="px-6 py-4 font-medium text-ink-600">
                      {row.label}
                    </th>
                    {row.values.map((value, j) => (
                      <td
                        key={`${row.label}-${j}`}
                        className={`px-6 py-4 font-semibold tabular-nums ${
                          rateCards[j].featured ? 'bg-brand-50/40 text-brand-900' : 'text-ink-800'
                        }`}
                      >
                        {value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>

        {/* ---------- Compliance note ---------- */}
        <Reveal delay={160} className="mt-8">
          <p className="mx-auto max-w-4xl rounded-2xl bg-white px-5 py-4 text-xs leading-relaxed text-ink-500 ring-1 ring-ink-200/70 ring-inset">
            <Icon name="file" className="mr-2 inline-block size-3.5 -translate-y-px" strokeWidth={2} />
            {representativeExample}
          </p>
        </Reveal>
      </div>
    </section>
  )
}
