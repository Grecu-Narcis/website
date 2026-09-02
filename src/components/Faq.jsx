import { useState } from 'react'
import Icon from './Icon.jsx'
import Button from './ui/Button.jsx'
import Reveal from './ui/Reveal.jsx'
import SectionHeading from './ui/SectionHeading.jsx'
import { company, faqs } from '../data/site.js'

/**
 * Întrebări frecvente în acordeon — un singur panou deschis la un moment dat
 * (un clic pe elementul deschis îl închide).
 *
 * Animația de deschidere/închidere folosește tehnica `grid-rows-[0fr] → [1fr]`, care
 * tranziționează către înălțimea naturală a conținutului, fără a fixa o max-height.
 * Butoanele au aria-expanded/aria-controls, ca cititoarele de ecran să urmărească starea.
 */
export default function Faq() {
  const [openIndex, setOpenIndex] = useState(0)

  const toggle = (index) => setOpenIndex((current) => (current === index ? -1 : index))

  return (
    <section id="faq" className="section bg-ink-50/60">
      <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-16">
        {/* ---------- Introducere fixă (sticky) ---------- */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <SectionHeading
              align="left"
              eyebrow="Răspunsuri directe"
              eyebrowIcon="file"
              title="Întrebări pe care le primim"
              accent="săptămână de săptămână"
              lead="Dacă întrebarea dumneavoastră nu se află aici, scrieți-ne direct — vă răspunde un om, de obicei în mai puțin de o oră."
              className="lg:mx-0"
            />

            <Reveal delay={140} className="card mt-8 p-6">
              <p className="font-display text-base font-bold text-brand-950">Încă aveți dubii?</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-600">
                O primă discuție nu costă nimic și nu vă obligă la nimic. În cel mai rău caz, plecați
                știind exact unde vă situați.
              </p>

              <div className="mt-5 flex flex-col gap-2.5">
                <Button href="#contact" size="md" icon="arrowRight" className="w-full">
                  Pune o întrebare
                </Button>
                <a
                  href={`tel:${company.phones[0].replace(/\s/g, '')}`}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-ink-200 bg-white px-4 py-2.5 text-sm font-semibold text-brand-800 transition hover:border-brand-300 hover:bg-brand-50"
                >
                  <Icon name="phone" className="size-4" strokeWidth={2} />
                  {company.phones[0]}
                </a>
              </div>
            </Reveal>
          </div>
        </div>

        {/* ---------- Acordeon ---------- */}
        <div className="lg:col-span-7">
          <ul className="flex flex-col gap-3">
            {faqs.map((faq, i) => {
              const isOpen = openIndex === i
              return (
                <Reveal
                  key={faq.q}
                  as="li"
                  delay={Math.min(i, 4) * 70}
                  className={`overflow-hidden rounded-2xl border bg-white transition-all duration-300 ${
                    isOpen ? 'border-brand-200 shadow-card' : 'border-ink-200/70 hover:border-brand-200'
                  }`}
                >
                  <h3>
                    <button
                      type="button"
                      onClick={() => toggle(i)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${i}`}
                      id={`faq-trigger-${i}`}
                      className="flex w-full items-start justify-between gap-4 px-5 py-5 text-left sm:px-6"
                    >
                      <span
                        className={`font-display text-[0.98rem] font-bold transition-colors sm:text-base ${
                          isOpen ? 'text-brand-700' : 'text-brand-950'
                        }`}
                      >
                        {faq.q}
                      </span>
                      <span
                        className={`mt-0.5 grid size-7 shrink-0 place-items-center rounded-full transition-all duration-300 ${
                          isOpen
                            ? 'rotate-180 bg-brand-900 text-gold-300'
                            : 'bg-ink-100 text-ink-500'
                        }`}
                      >
                        <Icon name="chevron" className="size-4" strokeWidth={2.4} />
                      </span>
                    </button>
                  </h3>

                  {/* grid-rows 0fr → 1fr animează până la înălțimea naturală a conținutului */}
                  <div
                    id={`faq-panel-${i}`}
                    role="region"
                    aria-labelledby={`faq-trigger-${i}`}
                    className={`grid transition-all duration-400 ease-out ${
                      isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-5 pb-6 text-sm leading-relaxed text-ink-600 sm:px-6">{faq.a}</p>
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
