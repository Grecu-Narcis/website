import Icon from './Icon.jsx'
import { company } from '../data/site.js'
import { useScrolled } from '../hooks/useScrolled.js'

/**
 * Două elemente persistente, ambele apărând doar după ce utilizatorul a derulat
 * dincolo de zona hero:
 *  • mobil/tabletă: o bară de acțiuni jos (sună · cere ofertă) — cele două lucruri
 *    pe care un vizitator al unui site de brokeraj vrea de fapt să le facă
 *  • desktop: un buton de revenire în partea de sus
 */
export default function FloatingActions() {
  const visible = useScrolled(680)
  const tel = `tel:${company.phones[0].replace(/\s/g, '')}`

  const toTop = () => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' })
  }

  return (
    <>
      {/* ---------- Bară de acțiuni pentru mobil ---------- */}
      <div
        className={`fixed inset-x-0 bottom-0 z-40 border-t border-ink-200/80 bg-white/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-xl transition-all duration-400 lg:hidden ${
          visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-full opacity-0'
        }`}
      >
        <div className="flex items-center gap-2.5">
          <a
            href={tel}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-brand-200 bg-white px-4 py-3 text-sm font-semibold text-brand-800 transition active:scale-[0.98]"
          >
            <Icon name="phone" className="size-4" strokeWidth={2.2} />
            Sună-ne
          </a>
          <a
            href="#contact"
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gold-400 px-4 py-3 text-sm font-bold text-brand-950 shadow-glow transition active:scale-[0.98]"
          >
            Ofertă gratuită
            <Icon name="arrowRight" className="size-4" strokeWidth={2.2} />
          </a>
          <button
            type="button"
            onClick={toTop}
            aria-label="Înapoi sus"
            className="grid size-11 shrink-0 place-items-center rounded-xl border border-ink-200 text-ink-600 transition active:scale-95"
          >
            <Icon name="arrowUp" className="size-4.5" strokeWidth={2.2} />
          </button>
        </div>
      </div>

      {/* ---------- Buton „înapoi sus” pentru desktop ---------- */}
      <button
        type="button"
        onClick={toTop}
        aria-label="Înapoi sus"
        className={`fixed right-6 bottom-6 z-40 hidden size-12 place-items-center rounded-full bg-brand-900 text-gold-300 shadow-lift transition-all duration-400 hover:-translate-y-1 hover:bg-brand-800 lg:grid ${
          visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
        }`}
      >
        <Icon name="arrowUp" className="size-5" strokeWidth={2.2} />
      </button>
    </>
  )
}
