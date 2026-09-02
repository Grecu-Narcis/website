import Icon from './Icon.jsx'
import Button from './ui/Button.jsx'
import Reveal from './ui/Reveal.jsx'
import SectionHeading from './ui/SectionHeading.jsx'
import { images, processSteps } from '../data/site.js'

/**
 * Five-step timeline.
 * Mobile: vertical rail on the left. Desktop (lg+): horizontal rail across
 * five equal columns. One markup, two rails toggled by breakpoint.
 */
export default function Process() {
  return (
    <section id="process" className="section bg-white">
      <div className="container-page">
        <SectionHeading
          eyebrow="How it works"
          eyebrowIcon="check"
          title="Five steps, and we do"
          accent="four of them"
          lead="You have a conversation and you sign. Everything between those two points is our job — including the phone calls nobody enjoys making."
        />

        <ol className="relative mt-14 grid gap-9 lg:mt-20 lg:grid-cols-5 lg:gap-6">
          {/* Rail — mobile (vertical) */}
          <span
            aria-hidden="true"
            className="absolute top-3 bottom-6 left-6 w-px bg-gradient-to-b from-brand-200 via-brand-200 to-transparent lg:hidden"
          />
          {/* Rail — desktop (horizontal) */}
          <span
            aria-hidden="true"
            className="absolute top-6 right-6 left-6 hidden h-px bg-gradient-to-r from-transparent via-brand-200 to-transparent lg:block"
          />

          {processSteps.map((step, i) => (
            <Reveal
              key={step.title}
              as="li"
              delay={i * 90}
              className="group relative flex gap-5 lg:flex-col lg:gap-5"
            >
              {/* Marker */}
              <span className="relative z-10 grid size-12 shrink-0 place-items-center rounded-full border border-brand-200 bg-white text-brand-700 shadow-soft transition-all duration-300 group-hover:border-gold-300 group-hover:bg-brand-900 group-hover:text-gold-300">
                <Icon name={step.icon} className="size-5" strokeWidth={1.9} />
                <span className="absolute -top-1.5 -right-1.5 grid size-5 place-items-center rounded-full bg-gold-400 font-display text-[0.65rem] font-bold text-brand-950">
                  {i + 1}
                </span>
              </span>

              <div className="pb-1">
                <h3 className="font-display text-base font-bold text-brand-950 sm:text-lg">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">{step.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>

        {/* ---------- Advisor promise panel ---------- */}
        <Reveal
          delay={140}
          className="mt-16 grid overflow-hidden rounded-3xl border border-ink-200/70 bg-ink-50/70 lg:mt-20 lg:grid-cols-12"
        >
          <div className="relative min-h-56 lg:col-span-5 lg:min-h-full">
            <img
              src={images.advisor}
              alt="A FlorinFinance advisor reviewing documents with clients"
              loading="lazy"
              className="absolute inset-0 size-full object-cover"
            />
          </div>

          <div className="p-7 sm:p-10 lg:col-span-7">
            <span className="eyebrow">
              <Icon name="shield" className="size-3.5" strokeWidth={2} />
              Our promise
            </span>
            <h3 className="text-h3 mt-5">
              If borrowing now is the wrong move, we will tell you — and we will lose the commission.
            </h3>
            <p className="mt-4 text-[0.95rem] leading-relaxed text-ink-600">
              Roughly one in seven people who contact us are advised to wait: to clear a dispute from
              their credit file, to finish a probation period, or simply because the numbers do not
              work yet. We would rather have your file in three months than a loan you resent for
              twenty years.
            </p>

            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                'Same advisor, start to finish',
                'Every offer shown, not just the best-paying',
                'Written comparison you can keep',
                'Free annual review after funding',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-ink-700">
                  <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-brand-100 text-brand-700">
                    <Icon name="check" className="size-3.5" strokeWidth={2.6} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            <Button href="#contact" variant="dark" size="md" icon="arrowRight" className="mt-8">
              Book a 20-minute call
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
