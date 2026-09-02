import Icon from './Icon.jsx'
import Reveal from './ui/Reveal.jsx'
import SectionHeading from './ui/SectionHeading.jsx'
import { services } from '../data/site.js'

/**
 * Grilă de servicii: 1 coloană pe mobil, 2 pe tabletă, 3 pe desktop.
 * Fiecare card se ridică la hover și dezvăluie un indiciu de „explorare”.
 */
export default function Services() {
  return (
    <section id="services" className="section bg-ink-50/60">
      <div className="container-page">
        <SectionHeading
          eyebrow="Ce intermediem"
          eyebrowIcon="sparkles"
          title="Șase tipuri de finanțare,"
          accent="un singur broker dedicat"
          lead="Rămâneți cu același consultant de la primul telefon până la ultima semnătură — și mult timp după aceea. Fără cozi de așteptare în call-center și fără să vă predăm dosarul primei persoane disponibile."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {services.map((service, i) => (
            <Reveal
              key={service.title}
              as="article"
              delay={(i % 3) * 90}
              className="card card-hover group relative flex flex-col overflow-hidden p-7"
            >
              {/* Voal auriu care apare treptat în spatele iconiței la hover */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -top-16 -right-16 size-32 rounded-full bg-gold-100/0 blur-2xl transition-all duration-500 group-hover:bg-gold-200/70"
              />

              <span className="relative grid size-12 place-items-center rounded-xl bg-brand-900 text-gold-300 shadow-soft transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105">
                <Icon name={service.icon} className="size-6" strokeWidth={1.7} />
              </span>

              <h3 className="text-h3 mt-5">{service.title}</h3>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-600">{service.text}</p>

              <ul className="mt-5 flex flex-wrap gap-2">
                {service.points.map((point) => (
                  <li
                    key={point}
                    className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 ring-1 ring-brand-100 ring-inset"
                  >
                    {point}
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                /* mt-auto păstrează CTA-ul pe aceeași linie de bază în cardurile cu
                   înălțime egală, dar conținut inegal. */
                className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold text-brand-700 transition-colors hover:text-brand-900"
              >
                Discutăm despre asta
                <Icon
                  name="arrowRight"
                  className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                  strokeWidth={2}
                />
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
