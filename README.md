# FlorinFinance

Un site de prezentare de tip single-page pentru un **broker de credite**
independent, construit cu **React 19 + Tailwind CSS 4 + Vite**. Structura este
inspirată de redfinance.ro — același ritm al secțiunilor și același traseu de
conversie — dar cu un sistem vizual original, texte originale și componente
originale.

## Cum îl rulezi

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production bundle in dist/
npm run preview  # serve the built bundle
```

Necesită Node 20.19+ (Vite 8).

## Sistem de design

Totul se află în blocul `@theme` din [`src/index.css`](src/index.css), așa că un
rebranding înseamnă câteva variabile CSS — fără modificări în componente.

| Familie de tokenuri | Rol | Observații |
| --- | --- | --- |
| `brand-50…950` | Verde-petrol profund | Suprafețe, navigație, footer, secțiuni întunecate. Instituțional și calm. |
| `gold-50…900` | Auriu de florin | CTA-uri, evidențieri, momentele de „valoare”. Folosit intenționat cu măsură. |
| `ink-50…950` | Neutre cu nuanță de verde-petrol | Text, borduri, benzi gri discrete. |
| `--text-display / h2 / h3 / lead` | Tipografie fluidă | Bazată pe `clamp()`, deci dimensiunea textului se scalează cu viewportul, în loc să sară de la un breakpoint la altul. |
| `--shadow-soft / card / lift / glow` | Scară de elevație | Patru niveluri, aplicate consecvent. |

Tipografie: **Sora** pentru titluri, **Inter** pentru interfață și text curent
(încărcate în `index.html`, cu fonturi de sistem ca rezervă atunci când rețeaua
nu este disponibilă).

Paleta este în mod deliberat diferită de roșul site-ului de referință — accentul
este preluat de la *florin*, o monedă de aur, pe un verde-petrol care se citește
ca „instituție financiară”, nu ca „reducere”.

## Structură

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

## Comportament responsive

Abordare mobile-first peste tot; fiecare grilă pornește de la o singură coloană.

| Breakpoint | Modificări principale |
| --- | --- |
| `< 640px` | O singură coloană. Bara utilitară ascunsă, sertar deschis din meniul burger, taburile calculatorului se aranjează 2×2, tabelul comparativ este înlocuit de carduri, bară de acțiuni fixă în partea de jos (apel / ofertă gratuită). |
| `640–1023px` | Grile pe două coloane pentru servicii, dobânzi și formular. Fotografia din hero devine pătrată. |
| `≥ 1024px` | Hero și secțiuni divizate pe 12 coloane, bandă orizontală pentru proces, navigație desktop cu scroll-spy, apare tabelul comparativ, butonul „înapoi sus” înlocuiește bara de acțiuni. |

Verificat fără scroll orizontal la 390 / 414 / 820 / 1440 px — singurul element
aflat în afara viewportului este sertarul închis, care este `inert`.

## Interacțiuni și stare

- **Sertar pe mobil** — comutare din butonul burger, închidere cu Escape, clic pe
  fundal, blocarea scroll-ului pe body, intrarea etapizată a linkurilor,
  închidere automată la navigare și la redimensionare peste `lg`.
- **Calculator** — schimbarea taburilor (cu suport de tastatură pentru
  `ArrowLeft/Right/Home/End`), două slidere și un câmp opțional pentru venit.
  Recalculează rata lunară în anuități, totalul dobânzii, împărțirea
  principal/dobândă și un verdict privind gradul de îndatorare, raportat la
  plafonul de ~40% al finanțatorilor. Rulează integral în browser.
- **Întrebări frecvente** — acordeon cu o singură secțiune deschisă, animat cu
  `grid-rows-[0fr] → [1fr]`, așa că trece la înălțimea naturală a conținutului
  fără un max-height fix.
- **Formular de contact** — validează la trimitere, focalizează primul câmp
  invalid, raportează erorile prin `aria-invalid` / `aria-describedby`, apoi
  comută pe un panou de confirmare.
- **Scroll** — headerul se compactează și bara utilitară se pliază; secțiunile
  apar cu fade o singură dată, prin IntersectionObserver; acțiunile flotante
  apar după hero.

## Accesibilitate

Link de salt la conținut, repere semantice, semantică reală de
`tablist`/`tab`/`tabpanel` și de acordeon, `aria-expanded`/`aria-controls` pe
fiecare comutator, câmpuri de formular etichetate, cu erori `role="alert"`
afișate inline, un singur stil vizibil de contur `:focus-visible`, stare de
navigare `aria-current="location"`, imagini decorative cu `alt` gol și un bloc
`prefers-reduced-motion` care dezactivează transformările și animațiile.

## Conectarea la backend

Funcția `submit()` din `Contact.jsx` simulează momentan apelul de rețea cu un
timeout — înlocuiți acea linie cu un `fetch()` către CRM-ul sau ruta de API
proprie. Formularul de alerte de dobândă din footer este, la fel, fără efect.
Tot conținutul se află în `src/data/site.js` — editați acel fișier pentru a
schimba textele.

> Proiect demonstrativ. FlorinFinance, cifrele, recenziile și numele de
> finanțatori afișate sunt fictive, iar dobânzile sunt ilustrative — nu
> constituie consultanță financiară.
