# FlorinFinance

A single-page marketing site for an independent **credit brokerage**, built with
**React 19 + Tailwind CSS 4 + Vite**. Structurally inspired by redfinance.ro —
same section rhythm and conversion path — but with an original visual system,
original copy and original components.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production bundle in dist/
npm run preview  # serve the built bundle
```

Requires Node 20.19+ (Vite 8).

## Design system

Everything lives in the `@theme` block of [`src/index.css`](src/index.css), so a
rebrand is a handful of CSS variables — no component edits.

| Token family | Role | Notes |
| --- | --- | --- |
| `brand-50…950` | Deep harbour teal | Surfaces, nav, footer, dark sections. Institutional and calm. |
| `gold-50…900` | Florin gold | CTAs, highlights, "value" moments. Used sparingly on purpose. |
| `ink-50…950` | Teal-tinted neutrals | Text, borders, soft grey bands. |
| `--text-display / h2 / h3 / lead` | Fluid type | `clamp()`-based, so type scales with the viewport instead of stepping at breakpoints. |
| `--shadow-soft / card / lift / glow` | Elevation ladder | Four levels, consistently applied. |

Type: **Sora** for display, **Inter** for UI and body (loaded in `index.html`,
with system-font fallbacks if the network is unavailable).

The palette is deliberately unrelated to the reference site's red — the accent
is drawn from the *florin*, a gold coin, against a teal that reads as
"financial institution" rather than "sale".

## Structure

```
src/
├─ App.jsx                 Section composition + skip link
├─ index.css               Design tokens, base layer, composition classes
├─ data/site.js            ALL copy, numbers, images, links — one file to edit
├─ lib/loan.js             Annuity maths, RON formatting, affordability bands
├─ hooks/
│  ├─ useReveal.js         IntersectionObserver fade-up (fires once)
│  ├─ useScrolled.js       Passive scroll flag for the header + FABs
│  ├─ useActiveSection.js  Scroll-spy for nav highlighting
│  └─ useBodyScrollLock.js Drawer scroll lock, scrollbar-jump compensated
└─ components/
   ├─ Navbar.jsx           Sticky header, folding utility bar, mobile drawer
   ├─ Hero.jsx             Value prop, dual CTA, floating proof cards
   ├─ TrustStrip.jsx       Stats + looping lender marquee
   ├─ Services.jsx         Six-card feature grid
   ├─ Calculator.jsx       Tabbed repayment calculator (the interactive showcase)
   ├─ Process.jsx          Five-step timeline + advisor promise panel
   ├─ Rates.jsx            Pricing cards + desktop comparison table
   ├─ Testimonials.jsx     Review grid with outcome chips
   ├─ Faq.jsx              Accordion with a sticky intro column
   ├─ Contact.jsx          Lead form with validation + success state
   ├─ Footer.jsx           Link columns, rate-alert signup, legal bar
   ├─ FloatingActions.jsx  Mobile action bar / desktop back-to-top
   ├─ Icon.jsx             Inline SVG icon set (no icon dependency)
   ├─ Logo.jsx             Coin mark + wordmark
   └─ ui/                  Button, Reveal, SectionHeading primitives
```

## Responsive behaviour

Mobile-first throughout; every grid starts at one column.

| Breakpoint | Key changes |
| --- | --- |
| `< 640px` | Single column. Utility bar hidden, burger drawer, calculator tabs wrap 2×2, comparison table replaced by cards, sticky bottom action bar (call / free offer). |
| `640–1023px` | Two-column service, rate and form grids. Hero photo goes square. |
| `≥ 1024px` | 12-column hero and split sections, horizontal process rail, desktop nav with scroll-spy, comparison table appears, back-to-top button replaces the action bar. |

Verified free of horizontal overflow at 390 / 414 / 820 / 1440 px — the only
element outside the viewport is the closed drawer, which is `inert`.

## Interactions & state

- **Mobile drawer** — burger toggle, Escape to close, backdrop click, body-scroll
  lock, staggered link entrance, auto-close on navigation and on resize past `lg`.
- **Calculator** — tab switching (with `ArrowLeft/Right/Home/End` keyboard
  support), two sliders and an optional income field. Recomputes the annuity
  payment, total interest, principal/interest split and a debt-to-income verdict
  banded against the ~40% lender ceiling. Runs entirely client-side.
- **FAQ** — single-open accordion animated with `grid-rows-[0fr] → [1fr]`, so it
  transitions to natural content height without a hard-coded max-height.
- **Contact form** — validates on submit, focuses the first invalid field, reports
  errors via `aria-invalid` / `aria-describedby`, then swaps to a success panel.
- **Scroll** — header compacts and its utility bar folds away; sections fade up
  once via IntersectionObserver; floating actions appear past the hero.

## Accessibility

Skip link, semantic landmarks, real `tablist`/`tab`/`tabpanel` and accordion
semantics, `aria-expanded`/`aria-controls` on every toggle, labelled form fields
with inline `role="alert"` errors, a single visible `:focus-visible` outline
style, `aria-current="location"` nav state, decorative images with empty `alt`,
and a `prefers-reduced-motion` block that disables transforms and animation.

## Wiring it up

`Contact.jsx`'s `submit()` currently fakes the network with a timeout — replace
that line with a `fetch()` to your CRM or API route. The footer rate-alert form
is likewise a no-op. All content is in `src/data/site.js`.

> Demo project. FlorinFinance, its figures, reviews and the lender names shown
> are fictional, and the rates are illustrative — not financial advice.
