import { useEffect, useMemo, useState } from 'react'
import Icon from './Icon.jsx'
import Logo from './Logo.jsx'
import Button from './ui/Button.jsx'
import { company, navLinks, socials } from '../data/site.js'
import { useScrolled } from '../hooks/useScrolled.js'
import { useActiveSection } from '../hooks/useActiveSection.js'
import { useBodyScrollLock } from '../hooks/useBodyScrollLock.js'

/**
 * Sticky header with:
 *  • a utility bar (phone / hours / email) that folds away on scroll
 *  • desktop nav with an animated underline and scroll-spy highlighting
 *  • a slide-in mobile drawer (burger toggle, Esc to close, backdrop click,
 *    body-scroll lock, and auto-close on navigation)
 */
export default function Navbar() {
  const [open, setOpen] = useState(false)
  const scrolled = useScrolled(20)

  // Memoised so the observer inside the hook isn't rebuilt on every render.
  const sectionIds = useMemo(() => navLinks.map((l) => l.href.slice(1)), [])
  const active = useActiveSection(sectionIds)

  useBodyScrollLock(open)

  // Escape closes the drawer — expected behaviour for any overlay.
  useEffect(() => {
    if (!open) return
    const onKeyDown = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open])

  // Close automatically if the viewport grows past the mobile breakpoint.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const onChange = (e) => e.matches && setOpen(false)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* ---------- Utility bar: collapses to 0 height once scrolled ---------- */}
      <div
        className={`hidden overflow-hidden bg-brand-950 text-brand-100 transition-[max-height,opacity] duration-500 md:block ${
          scrolled ? 'max-h-0 opacity-0' : 'max-h-12 opacity-100'
        }`}
      >
        <div className="container-page flex h-10 items-center justify-between text-[0.8rem]">
          <div className="flex items-center gap-6">
            <a
              href={`tel:${company.phones[0].replace(/\s/g, '')}`}
              className="inline-flex items-center gap-2 rounded transition hover:text-gold-300"
            >
              <Icon name="phone" className="size-3.5" strokeWidth={2} />
              {company.phones[0]}
            </a>
            <a
              href={`mailto:${company.email}`}
              className="hidden items-center gap-2 rounded transition hover:text-gold-300 lg:inline-flex"
            >
              <Icon name="mail" className="size-3.5" strokeWidth={2} />
              {company.email}
            </a>
            <span className="hidden items-center gap-2 text-brand-200/70 lg:inline-flex">
              <Icon name="clock" className="size-3.5" strokeWidth={2} />
              {company.hours}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden text-brand-200/70 xl:inline">{company.registration}</span>
            <span className="hidden h-3 w-px bg-white/20 xl:block" />
            <ul className="flex items-center gap-1">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    aria-label={s.label}
                    className="grid size-7 place-items-center rounded-md text-brand-200 transition hover:bg-white/10 hover:text-gold-300"
                  >
                    <Icon name={s.icon} className="size-4" strokeWidth={1.8} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ---------- Main bar ---------- */}
      <div
        className={`border-b transition-all duration-300 ${
          scrolled
            ? 'border-ink-200/70 bg-white/85 shadow-soft backdrop-blur-xl'
            : 'border-transparent bg-white/70 backdrop-blur-md'
        }`}
      >
        <nav
          aria-label="Main"
          className={`container-page flex items-center justify-between gap-4 transition-all duration-300 ${
            scrolled ? 'h-16' : 'h-20'
          }`}
        >
          <Logo />

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => {
              const isActive = active === link.href.slice(1)
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    aria-current={isActive ? 'location' : undefined}
                    className={`group relative rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
                      isActive ? 'text-brand-700' : 'text-ink-600 hover:text-brand-800'
                    }`}
                  >
                    {link.label}
                    {/* Underline grows from the centre on hover / when active */}
                    <span
                      className={`pointer-events-none absolute inset-x-3 -bottom-0.5 h-0.5 origin-center rounded-full bg-gold-400 transition-transform duration-300 ${
                        isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                      }`}
                    />
                  </a>
                </li>
              )
            })}
          </ul>

          {/* Desktop actions */}
          <div className="hidden items-center gap-3 lg:flex">
            <Button
              href={`tel:${company.phones[0].replace(/\s/g, '')}`}
              variant="ghost"
              size="sm"
              icon="phone"
              iconRight={false}
            >
              {company.phones[0]}
            </Button>
            <Button href="#contact" variant="primary" size="sm" icon="arrowRight">
              Free assessment
            </Button>
          </div>

          {/* Burger */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-drawer"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="grid size-11 place-items-center rounded-xl border border-ink-200 bg-white text-brand-900 transition hover:border-brand-300 hover:bg-brand-50 lg:hidden"
          >
            <Icon name={open ? 'close' : 'menu'} className="size-5" strokeWidth={2} />
          </button>
        </nav>
      </div>

      {/* ---------- Mobile drawer ---------- */}
      {/* Backdrop */}
      <div
        onClick={() => setOpen(false)}
        aria-hidden="true"
        className={`fixed inset-0 bg-brand-950/50 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />

      {/* Panel */}
      <aside
        id="mobile-drawer"
        aria-label="Mobile navigation"
        aria-hidden={!open}
        /* `inert` keeps the closed drawer out of the tab order — it is only
           translated off-screen, not display:none. */
        inert={!open}
        className={`fixed inset-y-0 right-0 z-10 flex w-[min(21rem,88vw)] flex-col bg-white shadow-lift transition-transform duration-400 ease-out lg:hidden ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-ink-100 px-5 py-4">
          <Logo />
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="grid size-10 place-items-center rounded-xl border border-ink-200 text-brand-900 transition hover:bg-brand-50"
          >
            <Icon name="close" className="size-5" strokeWidth={2} />
          </button>
        </div>

        <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-3 py-4">
          <ul className="flex flex-col gap-1">
            {navLinks.map((link, i) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  style={{ transitionDelay: open ? `${80 + i * 45}ms` : '0ms' }}
                  className={`flex items-center justify-between rounded-xl px-4 py-3.5 text-base font-semibold text-brand-900 transition-all duration-300 hover:bg-brand-50 active:bg-brand-100 ${
                    open ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
                  }`}
                >
                  {link.label}
                  <Icon name="arrowRight" className="size-4 text-ink-300" strokeWidth={2} />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="space-y-3 border-t border-ink-100 bg-ink-50/70 px-5 py-5">
          <Button href="#contact" onClick={() => setOpen(false)} className="w-full" size="lg" icon="arrowRight">
            Get my free offer
          </Button>
          <a
            href={`tel:${company.phones[0].replace(/\s/g, '')}`}
            className="flex items-center justify-center gap-2 rounded-xl border border-ink-200 bg-white px-4 py-3 text-sm font-semibold text-brand-800 transition hover:border-brand-300"
          >
            <Icon name="phone" className="size-4" strokeWidth={2} />
            {company.phones[0]}
          </a>
          <p className="pt-1 text-center text-xs text-ink-500">{company.hours}</p>
        </div>
      </aside>
    </header>
  )
}
