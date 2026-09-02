import Icon from './Icon.jsx'
import Button from './ui/Button.jsx'
import Reveal from './ui/Reveal.jsx'
import SectionHeading from './ui/SectionHeading.jsx'
import { images, processSteps } from '../data/site.js'

/**
 * Cronologie în cinci pași.
 * Pe mobil: linie verticală în stânga. Pe desktop (lg+): linie orizontală de-a lungul
 * a cinci coloane egale. Un singur markup, două linii comutate în funcție de breakpoint.
 */
export default function Process() {
  return (
    <section id="process" className="section bg-white">
      <div className="container-page">
        <SectionHeading
          eyebrow="Cum funcționează"
          eyebrowIcon="check"
          title="Cinci pași, iar noi facem"
          accent="patru dintre ei"
          lead="Dumneavoastră discutați cu noi și semnați. Tot ce se întâmplă între aceste două momente este treaba noastră — inclusiv telefoanele pe care nimeni nu are chef să le dea."
        />

        <ol className="relative mt-14 grid gap-9 lg:mt-20 lg:grid-cols-5 lg:gap-6">
          {/* Linie — mobil (verticală) */}
          <span
            aria-hidden="true"
            className="absolute top-3 bottom-6 left-6 w-px bg-gradient-to-b from-brand-200 via-brand-200 to-transparent lg:hidden"
          />
          {/* Linie — desktop (orizontală) */}
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
              {/* Marcaj */}
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

        {/* ---------- Panoul cu promisiunea consultantului ---------- */}
        <Reveal
          delay={140}
          className="mt-16 grid overflow-hidden rounded-3xl border border-ink-200/70 bg-ink-50/70 lg:mt-20 lg:grid-cols-12"
        >
          <div className="relative min-h-56 lg:col-span-5 lg:min-h-full">
            <img
              src={images.advisor}
              alt="Un consultant FlorinFinance analizează documente împreună cu clienții"
              loading="lazy"
              className="absolute inset-0 size-full object-cover"
            />
          </div>

          <div className="p-7 sm:p-10 lg:col-span-7">
            <span className="eyebrow">
              <Icon name="shield" className="size-3.5" strokeWidth={2} />
              Promisiunea noastră
            </span>
            <h3 className="text-h3 mt-5">
              Dacă un credit nu este acum decizia potrivită, vă spunem — chiar dacă pierdem comisionul.
            </h3>
            <p className="mt-4 text-[0.95rem] leading-relaxed text-ink-600">
              Aproximativ una din șapte persoane care ne contactează primesc recomandarea de a
              aștepta: până se clarifică o restanță din Biroul de Credit, până se încheie perioada de
              probă sau, pur și simplu, pentru că cifrele nu funcționează încă. Preferăm să vă
              preluăm dosarul peste trei luni decât să vă vindem un credit pe care îl veți regreta
              douăzeci de ani.
            </p>

            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                'Același consultant, de la început până la final',
                'Vă arătăm toate ofertele, nu doar pe cele mai bine comisionate',
                'Comparație scrisă, pe care o păstrați',
                'Analiză anuală gratuită după virarea banilor',
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
              Programează o discuție de 20 de minute
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
