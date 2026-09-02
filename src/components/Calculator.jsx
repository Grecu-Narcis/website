import { useMemo, useRef, useState } from 'react'
import Icon from './Icon.jsx'
import Button from './ui/Button.jsx'
import Reveal from './ui/Reveal.jsx'
import SectionHeading from './ui/SectionHeading.jsx'
import { calculatorProducts } from '../data/site.js'
import { affordability, amortisation, formatCompact, formatRON } from '../lib/loan.js'

/**
 * Acordul numeralului în română: „de” apare atunci când ultimele două cifre nu
 * sunt între 1 și 19 (1 an, 12 rate, 25 de ani, 300 de rate).
 */
function plural(count, singular, pluralForm) {
  if (count === 1) return `${count} ${singular}`
  const tail = count % 100
  return `${count} ${tail >= 1 && tail <= 19 ? '' : 'de '}${pluralForm}`
}

/**
 * Element interactiv de prezentare — un calculator de rate organizat pe file.
 *
 * Logica de stare:
 *  • schimbarea filei reîncarcă suma/perioada implicite și dobânda produsului
 *  • glisoarele recalculează rata (anuitatea) la fiecare eveniment de input
 *  • câmpul opțional de venit transformă rezultatul într-un verdict de îndatorare
 *
 * Accesibilitate: o structură corectă tablist/tab/tabpanel, cu navigare între
 * file folosind tastele săgeți, Home și End.
 */
export default function Calculator() {
  const [activeId, setActiveId] = useState(calculatorProducts[0].id)
  const product = calculatorProducts.find((p) => p.id === activeId) ?? calculatorProducts[0]

  const [amount, setAmount] = useState(product.amount.default)
  const [years, setYears] = useState(product.years.default)
  const [income, setIncome] = useState('')

  const tabRefs = useRef([])

  /** Schimbă produsul și readuce glisoarele în intervalul acestuia. */
  const selectProduct = (id) => {
    const next = calculatorProducts.find((p) => p.id === id)
    if (!next) return
    setActiveId(id)
    setAmount(next.amount.default)
    setYears(next.years.default)
  }

  /** Navigare cu tastatura (roving tabindex) în lista de file. */
  const onTabKeyDown = (e, index) => {
    const last = calculatorProducts.length - 1
    const moves = {
      ArrowRight: index === last ? 0 : index + 1,
      ArrowLeft: index === 0 ? last : index - 1,
      Home: 0,
      End: last,
    }
    const target = moves[e.key]
    if (target === undefined) return

    e.preventDefault()
    selectProduct(calculatorProducts[target].id)
    tabRefs.current[target]?.focus()
  }

  const result = useMemo(() => amortisation(amount, product.rate, years), [amount, product.rate, years])
  const verdict = useMemo(() => affordability(result.payment, Number(income)), [result.payment, income])

  const TONES = {
    good: 'bg-brand-50 text-brand-800 ring-brand-200',
    ok: 'bg-gold-50 text-gold-800 ring-gold-200',
    tight: 'bg-rose-50 text-rose-800 ring-rose-200',
  }

  return (
    <section id="calculator" className="section relative overflow-hidden bg-brand-950">
      {/* Lumină ambientală, ca secțiunea închisă la culoare să nu pară un bloc plat */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-0">
        <div className="absolute -top-40 left-1/4 size-[32rem] rounded-full bg-brand-700/40 blur-3xl" />
        <div className="absolute -bottom-52 right-0 size-[30rem] rounded-full bg-gold-600/15 blur-3xl" />
      </div>

      <div className="container-page relative">
        <SectionHeading
          onDark
          eyebrow="Estimare instant"
          eyebrowIcon="calculator"
          title="Vedeți costul lunar real"
          accent="înainte să discutați cu cineva"
          lead="Mișcați glisoarele. Calculul folosește exact aceeași formulă de anuitate pe care o aplică orice finanțator — deci este o estimare reală, nu un truc de colectare a datelor."
        />

        <Reveal delay={100} className="mt-12">
          {/* ---------- File ---------- */}
          <div
            role="tablist"
            aria-label="Tipul de credit"
            className="mx-auto flex max-w-3xl flex-wrap justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 p-2 backdrop-blur-sm"
          >
            {calculatorProducts.map((p, i) => {
              const selected = p.id === activeId
              return (
                <button
                  key={p.id}
                  // Acoladele contează: în React 19, un callback ref nu trebuie să returneze o valoare.
                  ref={(el) => {
                    tabRefs.current[i] = el
                  }}
                  role="tab"
                  type="button"
                  id={`tab-${p.id}`}
                  aria-selected={selected}
                  aria-controls="calc-panel"
                  tabIndex={selected ? 0 : -1}
                  onClick={() => selectProduct(p.id)}
                  onKeyDown={(e) => onTabKeyDown(e, i)}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-300 ${
                    selected
                      ? 'bg-gold-400 text-brand-950 shadow-glow'
                      : 'text-brand-100 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon name={p.icon} className="size-4" strokeWidth={2} />
                  {p.label}
                </button>
              )
            })}
          </div>

          {/* ---------- Panou ---------- */}
          <div
            role="tabpanel"
            id="calc-panel"
            aria-labelledby={`tab-${product.id}`}
            className="mt-6 grid gap-6 lg:grid-cols-12"
          >
            {/* Comenzi */}
            <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur-md sm:p-8 lg:col-span-7">
              {/* Suma */}
              <div>
                <div className="flex flex-wrap items-end justify-between gap-2">
                  <label htmlFor="calc-amount" className="text-sm font-semibold text-brand-100">
                    De ce sumă aveți nevoie?
                  </label>
                  <output
                    htmlFor="calc-amount"
                    className="font-display text-2xl font-bold text-white tabular-nums"
                  >
                    {formatRON(amount)}
                  </output>
                </div>
                {/* aria-valuetext: altfel cititoarele de ecran anunță „420000”, nu suma formatată */}
                <input
                  id="calc-amount"
                  type="range"
                  className="range-brand mt-4"
                  min={product.amount.min}
                  max={product.amount.max}
                  step={product.amount.step}
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  aria-valuetext={formatRON(amount)}
                />
                <div className="mt-2 flex justify-between text-xs text-brand-200/70">
                  <span>{formatCompact(product.amount.min)}</span>
                  <span>{formatCompact(product.amount.max)}</span>
                </div>
              </div>

              {/* Perioada */}
              <div className="mt-8">
                <div className="flex flex-wrap items-end justify-between gap-2">
                  <label htmlFor="calc-years" className="text-sm font-semibold text-brand-100">
                    Pe câți ani?
                  </label>
                  <output
                    htmlFor="calc-years"
                    className="font-display text-2xl font-bold text-white tabular-nums"
                  >
                    {plural(years, 'an', 'ani')}
                  </output>
                </div>
                <input
                  id="calc-years"
                  type="range"
                  className="range-brand mt-4"
                  min={product.years.min}
                  max={product.years.max}
                  step={product.years.step}
                  value={years}
                  onChange={(e) => setYears(Number(e.target.value))}
                  aria-valuetext={plural(years, 'an', 'ani')}
                />
                <div className="mt-2 flex justify-between text-xs text-brand-200/70">
                  <span>{plural(product.years.min, 'an', 'ani')}</span>
                  <span>{plural(product.years.max, 'an', 'ani')}</span>
                </div>
              </div>

              {/* Venit opțional → verdict de îndatorare */}
              <div className="mt-8 border-t border-white/10 pt-6">
                <label htmlFor="calc-income" className="text-sm font-semibold text-brand-100">
                  Venit net lunar al familiei{' '}
                  <span className="font-normal text-brand-200/60">(opțional)</span>
                </label>
                <div className="mt-3 flex flex-col gap-3 sm:flex-row">
                  <div className="relative flex-1">
                    <input
                      id="calc-income"
                      type="number"
                      inputMode="numeric"
                      min="0"
                      step="500"
                      placeholder="ex. 9500"
                      value={income}
                      onChange={(e) => setIncome(e.target.value)}
                      className="w-full rounded-xl border border-white/15 bg-brand-900/60 py-3 pr-16 pl-4 text-white placeholder:text-brand-200/40 transition focus:border-gold-400 focus:bg-brand-900"
                    />
                    <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-sm font-semibold text-brand-200/60">
                      RON
                    </span>
                  </div>
                </div>

                {verdict && (
                  <div className={`mt-4 rounded-xl px-4 py-3 ring-1 ring-inset ${TONES[verdict.tone]}`}>
                    <div className="flex items-center justify-between gap-3 text-sm font-bold">
                      <span>{verdict.title}</span>
                      <span className="tabular-nums">
                        {Math.round(verdict.ratio * 100)}% din venit
                      </span>
                    </div>
                    <p className="mt-1 text-xs opacity-90">{verdict.detail}</p>
                    {/* Indicator: plafonul de 40% impus de finanțatori este marcat pe bară */}
                    <div className="relative mt-3 h-1.5 w-full overflow-hidden rounded-full bg-black/10">
                      <div
                        className="h-full rounded-full bg-current transition-all duration-500"
                        style={{ width: `${Math.min(100, verdict.ratio * 100)}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              <p className="mt-6 flex items-start gap-2 text-xs leading-relaxed text-brand-200/70">
                <Icon name="lock" className="mt-0.5 size-3.5 shrink-0" strokeWidth={2} />
                Nimic din ce introduceți aici nu este trimis nicăieri — calculul se face integral în
                browserul dumneavoastră.
              </p>
            </div>

            {/* Rezultat */}
            <div className="flex flex-col overflow-hidden rounded-3xl bg-white p-6 shadow-lift sm:p-8 lg:col-span-5">
              <p className="text-xs font-semibold tracking-[0.16em] text-ink-400 uppercase">
                Rată lunară estimată
              </p>
              <p className="mt-2 font-display text-[clamp(2.25rem,5vw,3.25rem)] leading-none font-bold text-brand-950 tabular-nums">
                {formatRON(result.payment)}
              </p>
              <p className="mt-2 text-sm text-ink-500">
                la{' '}
                <strong className="font-semibold text-brand-700">
                  {/* Zecimalele se scriu cu virgulă în română: 5.35 → 5,35 */}
                  {String(product.rate).replace('.', ',')}%
                </strong>{' '}
                pe {plural(result.months, 'rată', 'rate')}
              </p>

              <dl className="mt-7 space-y-3 border-t border-ink-100 pt-6 text-sm">
                {[
                  ['Sumă împrumutată', formatRON(amount)],
                  ['Total dobândă', formatRON(result.totalInterest)],
                  ['Total de rambursat', formatRON(result.totalPaid)],
                ].map(([label, value], i) => (
                  <div key={label} className="flex items-baseline justify-between gap-4">
                    <dt className="text-ink-500">{label}</dt>
                    <dd
                      className={`font-semibold tabular-nums ${
                        i === 2 ? 'text-brand-950' : 'text-ink-800'
                      }`}
                    >
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>

              {/* Repartizarea între principal și dobândă */}
              <div className="mt-6">
                <div className="flex h-2.5 overflow-hidden rounded-full bg-ink-100">
                  <div
                    className="bg-brand-600 transition-all duration-500"
                    style={{ width: `${(1 - result.interestShare) * 100}%` }}
                  />
                  <div
                    className="bg-gold-400 transition-all duration-500"
                    style={{ width: `${result.interestShare * 100}%` }}
                  />
                </div>
                <div className="mt-2.5 flex justify-between text-xs text-ink-500">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="size-2 rounded-full bg-brand-600" /> Principal
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <span className="size-2 rounded-full bg-gold-400" /> Dobândă{' '}
                    {Math.round(result.interestShare * 100)}%
                  </span>
                </div>
              </div>

              <p className="mt-6 rounded-xl bg-ink-50 px-4 py-3 text-xs leading-relaxed text-ink-600">
                {product.note}
              </p>

              <div className="mt-auto pt-6">
                <Button href="#contact" size="lg" className="w-full" icon="arrowRight">
                  Solicită o ofertă reală
                </Button>
                <p className="mt-3 text-center text-xs text-ink-400">
                  Valori strict indicative. Nu reprezintă o ofertă de creditare — dobânda finală
                  depinde de analiza finanțatorului.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
