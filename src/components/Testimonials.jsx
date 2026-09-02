import Icon from './Icon.jsx'
import Reveal from './ui/Reveal.jsx'
import SectionHeading from './ui/SectionHeading.jsx'
import { images, testimonials } from '../data/site.js'

/**
 * Grilă de recenzii. Se stivuiește pe mobil, trei pe rând de la `lg`.
 * Fiecare card poartă o etichetă cu un rezultat măsurabil — detaliul care face o
 * recenzie convingătoare, nu doar decorativă.
 */
export default function Testimonials() {
  return (
    <section id="reviews" className="section bg-white">
      <div className="container-page">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            align="left"
            eyebrow="Rezultate ale clienților"
            eyebrowIcon="star"
            title="Citiți cifrele,"
            accent="nu adjectivele"
            lead="Fiecare recenzie de mai jos corespunde unui dosar finalizat. Publicăm rezultatul, produsul și orașul."
            className="lg:mx-0"
          />

          {/* Insignă cu ratingul general */}
          <Reveal delay={100} className="shrink-0">
            <div className="flex items-center gap-4 rounded-2xl border border-ink-200/70 bg-ink-50/70 px-5 py-4">
              <div>
                <div className="flex items-center gap-1 text-gold-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Icon key={i} name="star" className="size-4" />
                  ))}
                </div>
                <p className="mt-1.5 text-sm font-bold text-brand-950">4,9 din 5</p>
                <p className="text-xs text-ink-500">380 de recenzii verificate</p>
              </div>

              {/* Avatarurile clienților, suprapuse */}
              <ul className="flex -space-x-3">
                {images.avatars.map((src, i) => (
                  <li key={src}>
                    <img
                      src={src}
                      alt=""
                      loading="lazy"
                      className="size-9 rounded-full border-2 border-white bg-brand-100 object-cover shadow-sm transition hover:-translate-y-1"
                      style={{ zIndex: images.avatars.length - i }}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <ul className="mt-14 grid gap-6 lg:grid-cols-3">
          {testimonials.map((item, i) => (
            <Reveal
              key={item.name}
              as="li"
              delay={i * 110}
              className="card card-hover group flex flex-col p-7"
            >
              {/* Ghilimele supradimensionate */}
              <span
                aria-hidden="true"
                className="font-display text-5xl leading-none text-brand-200 transition-colors duration-300 group-hover:text-gold-300"
              >
                &bdquo;
              </span>

              <blockquote className="mt-2 flex-1 text-[0.95rem] leading-relaxed text-ink-700">
                {item.quote}
              </blockquote>

              <p className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-brand-50 px-3.5 py-1.5 text-xs font-bold text-brand-800 ring-1 ring-brand-100 ring-inset">
                <Icon name="trending" className="size-3.5" strokeWidth={2.2} />
                {item.metric}
              </p>

              <div className="mt-6 flex items-center gap-3 border-t border-ink-100 pt-5">
                <img
                  src={images.avatars[item.avatar]}
                  alt=""
                  loading="lazy"
                  className="size-11 rounded-full bg-brand-100 object-cover"
                />
                <div>
                  <p className="text-sm font-bold text-brand-950">{item.name}</p>
                  <p className="text-xs text-ink-500">{item.role}</p>
                </div>
                <div className="ml-auto flex items-center gap-0.5 text-gold-400">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Icon key={s} name="star" className="size-3.5" />
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
