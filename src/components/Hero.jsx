import Icon from './Icon.jsx'
import Button from './ui/Button.jsx'
import Reveal from './ui/Reveal.jsx'
import { hero, images, company } from '../data/site.js'

/**
 * Zona de deasupra pliului: propunerea de valoare, două CTA, argumente de
 * încredere și o fotografie peste care sunt suprapuse două carduri plutitoare
 * (dovada aprobării + ratingul).
 *
 * Layout: o singură coloană pe mobil, împărțire pe 12 coloane de la `lg` în sus.
 */
export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-28 pb-16 sm:pt-32 lg:pt-40 lg:pb-24">
      {/* ---------- Fundal: câmp de gradient difuz + grilă discretă ---------- */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-50 via-white to-white" />
        <div className="absolute -top-32 -left-40 size-[34rem] rounded-full bg-brand-200/40 blur-3xl" />
        <div className="absolute top-24 -right-32 size-[28rem] rounded-full bg-gold-200/40 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.5]"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(20,94,94,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(20,94,94,0.06) 1px, transparent 1px)',
            backgroundSize: '56px 56px',
            maskImage: 'radial-gradient(ellipse 70% 55% at 50% 0%, black, transparent)',
          }}
        />
      </div>

      <div className="container-page grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
        {/* ---------- Coloana cu text ---------- */}
        <div className="lg:col-span-6 xl:col-span-6">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-gold-200 bg-gold-50 px-4 py-2 text-xs font-semibold tracking-wide text-gold-800 sm:text-sm">
              <span className="relative grid size-2 place-items-center">
                <span className="absolute size-2 animate-ping rounded-full bg-gold-400" />
                <span className="size-2 rounded-full bg-gold-500" />
              </span>
              {hero.badge}
            </span>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="text-display mt-6">
              {hero.title}{' '}
              <span className="relative inline-block">
                <span className="relative z-10 text-brand-600">{hero.titleAccent}</span>
                {/* Subliniere în stil desenat manual, în spatele sintagmei accentuate */}
                <svg
                  viewBox="0 0 300 12"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                  className="absolute -bottom-1 left-0 h-3 w-full text-gold-300"
                >
                  <path
                    d="M2 8c60-5 130-7 296-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>
          </Reveal>

          <Reveal delay={150}>
            <p className="text-lead mt-6 max-w-xl text-ink-600">{hero.body}</p>
          </Reveal>

          <Reveal delay={220}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button href={hero.primaryCta.href} size="lg" icon="arrowRight">
                {hero.primaryCta.label}
              </Button>
              <Button href={hero.secondaryCta.href} variant="outline" size="lg" icon="calculator" iconRight={false}>
                {hero.secondaryCta.label}
              </Button>
            </div>
          </Reveal>

          <Reveal delay={300}>
            <ul className="mt-9 grid gap-3 sm:grid-cols-1">
              {hero.bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-3 text-sm text-ink-700 sm:text-[0.95rem]">
                  <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-brand-100 text-brand-700">
                    <Icon name="check" className="size-3.5" strokeWidth={2.6} />
                  </span>
                  {bullet}
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Linie de contact compactă — utilă pe mobil, unde bara de sus este ascunsă */}
          <Reveal delay={360}>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-ink-100 pt-6 text-sm text-ink-500 md:hidden">
              <a
                href={`tel:${company.phones[0].replace(/\s/g, '')}`}
                className="inline-flex items-center gap-2 font-semibold text-brand-800"
              >
                <Icon name="phone" className="size-4" strokeWidth={2} />
                {company.phones[0]}
              </a>
              <span className="inline-flex items-center gap-2">
                <Icon name="clock" className="size-4" strokeWidth={2} />
                {company.hours}
              </span>
            </div>
          </Reveal>
        </div>

        {/* ---------- Coloana media ---------- */}
        <div className="lg:col-span-6 xl:col-span-6">
          <Reveal delay={180} className="relative mx-auto max-w-lg lg:max-w-none">
            {/* Fotografie */}
            <div className="relative aspect-4/5 overflow-hidden rounded-[2rem] bg-brand-100 shadow-lift sm:aspect-square lg:aspect-4/5">
              <img
                src={images.hero}
                alt="O casă de familie luminată din interior, la apus"
                loading="eager"
                fetchPriority="high"
                className="size-full object-cover"
              />
              {/* Voal colorat, pentru ca cardurile albe să rămână lizibile peste orice fotografie */}
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-950/45 via-brand-950/5 to-transparent" />
            </div>

            {/* Card plutitor: dovada aprobării */}
            <div className="absolute -bottom-6 -left-3 w-[min(19rem,86%)] rounded-2xl border border-white/60 bg-white/95 p-5 shadow-card backdrop-blur-xl sm:-left-6 lg:animate-float">
              <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.12em] text-brand-600 uppercase">
                <span className="grid size-6 place-items-center rounded-full bg-brand-100">
                  <Icon name="check" className="size-3.5" strokeWidth={3} />
                </span>
                {hero.proofCard.label}
              </div>
              <p className="mt-3 font-display text-2xl font-bold text-brand-950">{hero.proofCard.amount}</p>
              <p className="mt-1 text-sm text-ink-500">{hero.proofCard.product}</p>
              <p className="mt-3 rounded-lg bg-gold-50 px-3 py-2 text-xs font-semibold text-gold-800">
                {hero.proofCard.saved}
              </p>
            </div>

            {/* Card plutitor: pastila cu rating */}
            <div className="absolute -top-4 right-2 rounded-2xl border border-white/60 bg-white/95 px-4 py-3 shadow-card backdrop-blur-xl sm:right-0">
              <div className="flex items-center gap-1 text-gold-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Icon key={i} name="star" className="size-4" />
                ))}
              </div>
              <p className="mt-1.5 text-xs font-semibold text-brand-950">
                4,9 / 5 <span className="font-normal text-ink-500">· 380 de recenzii</span>
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
