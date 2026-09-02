import { useMemo, useRef, useState } from 'react'
import Icon from './Icon.jsx'
import Button from './ui/Button.jsx'
import Reveal from './ui/Reveal.jsx'
import SectionHeading from './ui/SectionHeading.jsx'
import { calculatorProducts } from '../data/site.js'
import { affordability, amortisation, formatCompact, formatRON } from '../lib/loan.js'

/**
 * Interactive showcase — a tabbed repayment calculator.
 *
 * State logic:
 *  • switching tab reloads that product's default amount/term and rate
 *  • sliders recompute the annuity payment on every input event
 *  • the optional income field turns the result into a debt-to-income verdict
 *
 * Accessibility: a proper tablist/tab/tabpanel triad with arrow-key,
 * Home and End navigation between tabs.
 */
export default function Calculator() {
  const [activeId, setActiveId] = useState(calculatorProducts[0].id)
  const product = calculatorProducts.find((p) => p.id === activeId) ?? calculatorProducts[0]

  const [amount, setAmount] = useState(product.amount.default)
  const [years, setYears] = useState(product.years.default)
  const [income, setIncome] = useState('')

  const tabRefs = useRef([])

  /** Switch product and clamp the sliders back into that product's range. */
  const selectProduct = (id) => {
    const next = calculatorProducts.find((p) => p.id === id)
    if (!next) return
    setActiveId(id)
    setAmount(next.amount.default)
    setYears(next.years.default)
  }

  /** Roving-tabindex keyboard support for the tablist. */
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
      {/* Ambient light so the dark section doesn't read as a flat block */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-0">
        <div className="absolute -top-40 left-1/4 size-[32rem] rounded-full bg-brand-700/40 blur-3xl" />
        <div className="absolute -bottom-52 right-0 size-[30rem] rounded-full bg-gold-600/15 blur-3xl" />
      </div>

      <div className="container-page relative">
        <SectionHeading
          onDark
          eyebrow="Instant estimate"
          eyebrowIcon="calculator"
          title="See the real monthly cost"
          accent="before you talk to anyone"
          lead="Move the sliders. The maths is the same annuity formula every lender uses — so this is a genuine estimate, not a lead-capture trick."
        />

        <Reveal delay={100} className="mt-12">
          {/* ---------- Tabs ---------- */}
          <div
            role="tablist"
            aria-label="Loan type"
            className="mx-auto flex max-w-3xl flex-wrap justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 p-2 backdrop-blur-sm"
          >
            {calculatorProducts.map((p, i) => {
              const selected = p.id === activeId
              return (
                <button
                  key={p.id}
                  // Braces matter: a callback ref must not return a value in React 19.
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

          {/* ---------- Panel ---------- */}
          <div
            role="tabpanel"
            id="calc-panel"
            aria-labelledby={`tab-${product.id}`}
            className="mt-6 grid gap-6 lg:grid-cols-12"
          >
            {/* Controls */}
            <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur-md sm:p-8 lg:col-span-7">
              {/* Amount */}
              <div>
                <div className="flex flex-wrap items-end justify-between gap-2">
                  <label htmlFor="calc-amount" className="text-sm font-semibold text-brand-100">
                    How much do you need?
                  </label>
                  <output
                    htmlFor="calc-amount"
                    className="font-display text-2xl font-bold text-white tabular-nums"
                  >
                    {formatRON(amount)}
                  </output>
                </div>
                <input
                  id="calc-amount"
                  type="range"
                  className="range-brand mt-4"
                  min={product.amount.min}
                  max={product.amount.max}
                  step={product.amount.step}
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                />
                <div className="mt-2 flex justify-between text-xs text-brand-200/70">
                  <span>{formatCompact(product.amount.min)}</span>
                  <span>{formatCompact(product.amount.max)}</span>
                </div>
              </div>

              {/* Term */}
              <div className="mt-8">
                <div className="flex flex-wrap items-end justify-between gap-2">
                  <label htmlFor="calc-years" className="text-sm font-semibold text-brand-100">
                    Over how many years?
                  </label>
                  <output
                    htmlFor="calc-years"
                    className="font-display text-2xl font-bold text-white tabular-nums"
                  >
                    {years} {years === 1 ? 'year' : 'years'}
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
                />
                <div className="mt-2 flex justify-between text-xs text-brand-200/70">
                  <span>{product.years.min} yr</span>
                  <span>{product.years.max} yr</span>
                </div>
              </div>

              {/* Optional income → affordability verdict */}
              <div className="mt-8 border-t border-white/10 pt-6">
                <label htmlFor="calc-income" className="text-sm font-semibold text-brand-100">
                  Monthly net household income{' '}
                  <span className="font-normal text-brand-200/60">(optional)</span>
                </label>
                <div className="mt-3 flex flex-col gap-3 sm:flex-row">
                  <div className="relative flex-1">
                    <input
                      id="calc-income"
                      type="number"
                      inputMode="numeric"
                      min="0"
                      step="500"
                      placeholder="e.g. 9500"
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
                      <span className="tabular-nums">{Math.round(verdict.ratio * 100)}% of income</span>
                    </div>
                    <p className="mt-1 text-xs opacity-90">{verdict.detail}</p>
                    {/* Meter: the 40% lender ceiling is marked on the track */}
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
                Nothing you type here is sent anywhere — the calculation runs entirely in your browser.
              </p>
            </div>

            {/* Result */}
            <div className="flex flex-col overflow-hidden rounded-3xl bg-white p-6 shadow-lift sm:p-8 lg:col-span-5">
              <p className="text-xs font-semibold tracking-[0.16em] text-ink-400 uppercase">
                Estimated monthly payment
              </p>
              <p className="mt-2 font-display text-[clamp(2.25rem,5vw,3.25rem)] leading-none font-bold text-brand-950 tabular-nums">
                {formatRON(result.payment)}
              </p>
              <p className="mt-2 text-sm text-ink-500">
                at <strong className="font-semibold text-brand-700">{product.rate}%</strong> over{' '}
                {result.months} instalments
              </p>

              <dl className="mt-7 space-y-3 border-t border-ink-100 pt-6 text-sm">
                {[
                  ['Amount borrowed', formatRON(amount)],
                  ['Total interest', formatRON(result.totalInterest)],
                  ['Total repayable', formatRON(result.totalPaid)],
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

              {/* Principal vs. interest split */}
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
                    <span className="size-2 rounded-full bg-gold-400" /> Interest{' '}
                    {Math.round(result.interestShare * 100)}%
                  </span>
                </div>
              </div>

              <p className="mt-6 rounded-xl bg-ink-50 px-4 py-3 text-xs leading-relaxed text-ink-600">
                {product.note}
              </p>

              <div className="mt-auto pt-6">
                <Button href="#contact" size="lg" className="w-full" icon="arrowRight">
                  Get this priced properly
                </Button>
                <p className="mt-3 text-center text-xs text-ink-400">
                  Estimate only. Your final rate depends on lender assessment.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
