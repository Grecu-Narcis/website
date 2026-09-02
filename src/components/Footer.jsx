import Icon from './Icon.jsx'
import Logo from './Logo.jsx'
import { company, footerColumns, legalLinks, socials } from '../data/site.js'

/**
 * Footer: brand column + three link columns, then a legal bar.
 * 1 column on mobile → 2 on tablet → 12-col grid on desktop.
 */
export default function Footer() {
  const year = 2026 // build-time constant; swap for new Date().getFullYear() if preferred

  return (
    <footer className="bg-brand-950 text-brand-100">
      <div className="container-page py-14 lg:py-18">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* ---------- Brand column ---------- */}
          <div className="sm:col-span-2 lg:col-span-4">
            <Logo onDark />

            <p className="mt-5 max-w-sm text-sm leading-relaxed text-brand-200/80">
              An independent credit brokerage. We are paid by lenders, never by you — and the same
              commission from every lender on our panel, so our recommendation stays yours to trust.
            </p>

            <ul className="mt-6 space-y-3 text-sm">
              <li>
                <a
                  href={`tel:${company.phones[0].replace(/\s/g, '')}`}
                  className="inline-flex items-center gap-2.5 font-semibold text-white transition hover:text-gold-300"
                >
                  <Icon name="phone" className="size-4 text-gold-300" strokeWidth={2} />
                  {company.phones[0]}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${company.email}`}
                  className="inline-flex items-center gap-2.5 transition hover:text-gold-300"
                >
                  <Icon name="mail" className="size-4 text-gold-300" strokeWidth={2} />
                  {company.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-brand-200/80">
                <Icon name="pin" className="mt-0.5 size-4 shrink-0 text-gold-300" strokeWidth={2} />
                {company.address}
              </li>
              <li className="flex items-start gap-2.5 text-brand-200/80">
                <Icon name="clock" className="mt-0.5 size-4 shrink-0 text-gold-300" strokeWidth={2} />
                {company.hours}
              </li>
            </ul>

            <ul className="mt-7 flex items-center gap-2">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    aria-label={s.label}
                    className="grid size-10 place-items-center rounded-xl border border-white/12 text-brand-100 transition hover:-translate-y-0.5 hover:border-gold-300/60 hover:bg-white/10 hover:text-gold-300"
                  >
                    <Icon name={s.icon} className="size-4.5" strokeWidth={1.8} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ---------- Link columns ---------- */}
          {footerColumns.map((column) => (
            <nav key={column.title} aria-label={column.title} className="lg:col-span-2">
              <h2 className="font-display text-xs font-bold tracking-[0.16em] text-white uppercase">
                {column.title}
              </h2>
              <ul className="mt-4 space-y-2.5 text-sm">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="group inline-flex items-center gap-1.5 text-brand-200/80 transition hover:text-gold-300"
                    >
                      <span className="h-px w-0 bg-gold-300 transition-all duration-300 group-hover:w-3" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* ---------- Newsletter ---------- */}
          <div className="sm:col-span-2 lg:col-span-2">
            <h2 className="font-display text-xs font-bold tracking-[0.16em] text-white uppercase">
              Rate alerts
            </h2>
            <p className="mt-4 text-sm text-brand-200/80">
              A short monthly note when panel rates move enough to matter.
            </p>

            <form
              className="mt-4 flex flex-col gap-2"
              onSubmit={(e) => e.preventDefault()} /* demo only */
            >
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                required
                placeholder="you@email.com"
                className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-brand-200/40 transition focus:border-gold-400 focus:bg-white/10"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-gold-400 px-4 py-2.5 text-sm font-semibold text-brand-950 transition hover:bg-gold-300"
              >
                Subscribe
                <Icon name="arrowRight" className="size-4" strokeWidth={2.2} />
              </button>
            </form>
          </div>
        </div>

        {/* ---------- Regulatory note ---------- */}
        <p className="mt-12 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 text-xs leading-relaxed text-brand-200/70">
          <strong className="font-semibold text-brand-100">Important.</strong> FlorinFinance is a credit
          intermediary, not a lender, and does not grant credit in its own name. All applications are
          subject to lender assessment and approval. Rates shown on this site are indicative, may change
          without notice and do not constitute an offer of credit. Borrowing money costs money —
          consider the total cost over the full term before committing. This is a demonstration site:
          the company, figures, reviews and lender names are fictional.
        </p>
      </div>

      {/* ---------- Legal bar ---------- */}
      <div className="border-t border-white/10">
        <div className="container-page flex flex-col items-center justify-between gap-4 py-6 text-xs text-brand-200/70 sm:flex-row">
          <p>
            © {year} {company.name}. {company.registration}
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {legalLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="transition hover:text-gold-300">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
