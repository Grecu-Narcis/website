/**
 * Sursa unică de adevăr pentru fiecare text, cifră și imagine din pagină.
 * Modificarea site-ului nu ar trebui să necesite niciodată editarea unui
 * component — schimbați totul aici.
 *
 * Toate textele, denumirile de produse, afirmațiile și numele partenerilor
 * sunt originale FlorinFinance. Dobânzile sunt valori ilustrative, folosite
 * pentru o versiune demonstrativă.
 */

/* -------------------------------------------------------------------------- */
/* Companie și contact                                                        */
/* -------------------------------------------------------------------------- */
export const company = {
  name: 'FlorinFinance',
  tagline: 'Brokeri de credite independenți',
  phones: ['0770 218 340', '0745 902 117'],
  email: 'hello@florinfinance.ro',
  address: 'Bd. Unirii 41, Corp B, Etaj 3 — 300085 Timișoara',
  hours: 'Luni–Vineri, 09:00–18:30',
  registration: 'Intermediar de credit înregistrat · Nr. reg. IC-0421/2019',
}

/* -------------------------------------------------------------------------- */
/* Navigare                                                                   */
/* -------------------------------------------------------------------------- */
export const navLinks = [
  { label: 'Servicii', href: '#services' },
  { label: 'Calculator', href: '#calculator' },
  { label: 'Cum funcționează', href: '#process' },
  { label: 'Dobânzi', href: '#rates' },
  { label: 'Recenzii', href: '#reviews' },
  { label: 'Întrebări frecvente', href: '#faq' },
]

/* -------------------------------------------------------------------------- */
/* Imagini — substituenți Unsplash, se pot schimba liber                      */
/* -------------------------------------------------------------------------- */
const unsplash = (id, w = 1200, h = 1400) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&h=${h}&q=80`

export const images = {
  hero: unsplash('1568605114967-8130f3a36994', 1100, 1300), // casă luminată în crepuscul
  advisor: unsplash('1600880292203-757bb62b4baf', 1000, 1100), // întâlnire cu un consultant
  ctaOffice: unsplash('1521737604893-d14cc237f11d', 1400, 900), // echipă la masă
  avatars: [
    unsplash('1573497019940-1c28c88b4f3e', 200, 200),
    unsplash('1507003211169-0a1dd7228f2d', 200, 200),
    unsplash('1580489944761-15a19d654956', 200, 200),
    unsplash('1560250097-0b93528c311a', 200, 200),
  ],
}

/* -------------------------------------------------------------------------- */
/* Secțiunea principală (hero)                                                */
/* -------------------------------------------------------------------------- */
export const hero = {
  badge: 'Gratuit pentru dumneavoastră — comisionul nostru este plătit de finanțator',
  title: 'Creditul pe care îl meritați,',
  titleAccent: 'nu cel care vi s-a oferit.',
  body: 'O singură cerere. Peste treizeci de finanțatori comparați unul lângă altul. O singură recomandare, onestă, de la un broker care negociază de partea dumneavoastră a mesei — și care nu încasează niciodată comision de la dumneavoastră.',
  primaryCta: { label: 'Vreau oferta mea gratuită', href: '#contact' },
  secondaryCta: { label: 'Calculează-mi rata', href: '#calculator' },
  bullets: [
    'Răspuns în 24 de ore, fără impact în Biroul de Credit',
    'Ne ocupăm de acte, de evaluarea imobiliară și de discuțiile cu finanțatorii',
    'Ați fost refuzat în altă parte? Știm cine spune „da”',
  ],
  // Card de dovadă suprapus peste fotografia principală
  proofCard: {
    label: 'Aprobat săptămâna aceasta',
    amount: '418.000 RON',
    product: 'Credit ipotecar · 27 de ani · DAE 5,19%',
    saved: 'Clientul a economisit 61.400 RON față de prima ofertă a băncii sale',
  },
}

/* -------------------------------------------------------------------------- */
/* Dovezi sociale                                                             */
/* -------------------------------------------------------------------------- */
export const stats = [
  { value: '1.240+', label: 'Familii finanțate', icon: 'users' },
  { value: '740 mil. RON', label: 'Credite intermediate', icon: 'trending' },
  { value: '31', label: 'Finanțatori în portofoliul nostru', icon: 'building' },
  { value: '96%', label: 'Rată de aprobare a dosarelor depuse', icon: 'shield' },
]

/** Portofoliu fictiv de finanțatori — nume-substituent, fără mărci reale. */
export const lenders = [
  'Banca Aurora',
  'NordCredit',
  'Vertis Bank',
  'Lumina IFN',
  'Meridian Leasing',
  'Casa Prima Bank',
  'Orion Financial',
  'Trivent Capital',
  'Danube Mutual',
  'Argos Credit Union',
]

/* -------------------------------------------------------------------------- */
/* Servicii                                                                   */
/* -------------------------------------------------------------------------- */
export const services = [
  {
    icon: 'home',
    title: 'Credite ipotecare',
    text: 'Prima casă, a doua casă sau o construcție. Modelăm dobânda fixă față de cea variabilă pe toată perioada și vă arătăm costul real al fiecărei variante, nu doar dobânda afișată.',
    points: ['Grad de finanțare (LTV) până la 85%', 'Perioade până la 30 de ani', 'Preaprobare în 3 zile'],
  },
  {
    icon: 'wallet',
    title: 'Credite de nevoi personale',
    text: 'Renovări, taxe de studii, o nuntă sau consolidarea a patru datorii scumpe într-o singură rată gestionabilă, cu o dată de final clară.',
    points: ['5.000 – 400.000 RON', 'Fără garanții', 'Bani în 48 de ore'],
  },
  {
    icon: 'refresh',
    title: 'Refinanțare',
    text: 'Dacă creditul dumneavoastră are mai mult de doi ani, sunt șanse mari să fie prea scump. Îl analizăm gratuit și vă spunem pe față dacă merită să îl mutați.',
    points: ['Audit gratuit al dobânzii', 'Analiză a pragului de rentabilitate', 'În medie, 1,4 pp economisiți'],
  },
  {
    icon: 'key',
    title: 'Programul „Noua Casă”',
    text: 'Creditare cu garanție de stat pentru cumpărătorii cu avans mic. Urmărim care finanțatori mai au plafon disponibil în trimestrul acesta.',
    points: ['Avans de 5%', 'Ne ocupăm de garanție', 'Preverificare a eligibilității'],
  },
  {
    icon: 'car',
    title: 'Leasing și vehicule',
    text: 'Leasing operațional sau financiar pentru autoturisme, autoutilitare și echipamente — cu prețuri atât pentru persoane fizice, cât și pentru companii, și cu valoarea reziduală explicată.',
    points: ['Nou și rulat', 'Pe firmă sau pe persoană fizică', 'Opțiuni cu valoare reziduală'],
  },
  {
    icon: 'briefcase',
    title: 'Finanțări pentru companii',
    text: 'Capital de lucru, linii de factoring, echipamente și spații comerciale pentru IMM-uri. Pregătim dosarul exact așa cum vor să îl citească comitetele de credit.',
    points: ['Linii pentru IMM', 'Cofinanțare fonduri europene', 'Modelare cash-flow'],
  },
]

/* -------------------------------------------------------------------------- */
/* Calculator interactiv — o configurație pentru fiecare tab                  */
/* -------------------------------------------------------------------------- */
export const calculatorProducts = [
  {
    id: 'mortgage',
    label: 'Ipotecar',
    icon: 'home',
    rate: 5.35,
    amount: { min: 50_000, max: 1_500_000, step: 5_000, default: 420_000 },
    years: { min: 5, max: 30, step: 1, default: 25 },
    note: 'Dobândă fixă indicativă în primii 5 ani, apoi variabilă la IRCC + 1,9 pp.',
  },
  {
    id: 'personal',
    label: 'Nevoi personale',
    icon: 'wallet',
    rate: 8.9,
    amount: { min: 5_000, max: 400_000, step: 1_000, default: 60_000 },
    years: { min: 1, max: 10, step: 1, default: 5 },
    note: 'Creditare fără garanții. Dobândă fixă pe toată perioada, fără comision de rambursare anticipată.',
  },
  {
    id: 'refinance',
    label: 'Refinanțare',
    icon: 'refresh',
    rate: 6.15,
    amount: { min: 20_000, max: 1_200_000, step: 5_000, default: 240_000 },
    years: { min: 3, max: 25, step: 1, default: 15 },
    note: 'Consolidați până la șase credite existente într-o singură rată, cu o singură dată de plată.',
  },
  {
    id: 'leasing',
    label: 'Leasing',
    icon: 'car',
    rate: 7.4,
    amount: { min: 15_000, max: 600_000, step: 5_000, default: 130_000 },
    years: { min: 1, max: 7, step: 1, default: 5 },
    note: 'Avans de la 10%. Pentru companii sunt disponibile structuri cu TVA deductibil.',
  },
]

/* -------------------------------------------------------------------------- */
/* Proces                                                                     */
/* -------------------------------------------------------------------------- */
export const processSteps = [
  {
    icon: 'phone',
    title: 'Prima discuție',
    text: 'Față în față, la telefon sau pe video. Vă analizăm veniturile, obligațiile și obiectivul — și vă spunem pe loc dacă un credit acum este o idee proastă.',
  },
  {
    icon: 'search',
    title: 'Comparăm tot portofoliul',
    text: 'Profilul dumneavoastră ajunge la fiecare finanțator care i se potrivește. Primiți o comparație de o singură pagină, cu oferte reale și cu costul total pe toată perioada alături de fiecare.',
  },
  {
    icon: 'file',
    title: 'Dosar construit corect',
    text: 'Pregătim și verificăm fiecare document înainte de depunere. Dosarele care intră curate se aprobă mai repede și la un preț mai bun.',
  },
  {
    icon: 'percent',
    title: 'Negociem condițiile',
    text: 'Dobândă, comisioane, asigurări, clauze de rambursare anticipată. Finanțatorii concurează pentru volum — pe al nostru îl folosim ca să mișcăm cifrele în favoarea dumneavoastră.',
  },
  {
    icon: 'check',
    title: 'Semnare și virarea banilor',
    text: 'Participăm la semnare, verificăm contractul final față de ofertă și rămânem la dispoziția dumneavoastră pe toată durata creditului. Analiza anuală este inclusă.',
  },
]

/* -------------------------------------------------------------------------- */
/* Dobânzi / prețuri                                                          */
/* -------------------------------------------------------------------------- */
export const rateCards = [
  {
    id: 'personal',
    name: 'Nevoi personale',
    blurb: 'Fără garanții, cu dobândă fixă, previzibil.',
    from: '8,45',
    apr: '9,12',
    amount: '5.000 – 400.000 RON',
    term: '1 – 10 ani',
    features: [
      'Fără garanții și fără codebitor',
      'Decizie în 24–48 de ore',
      'Zero comision de rambursare anticipată',
      'Acceptăm consolidarea datoriilor',
    ],
    featured: false,
  },
  {
    id: 'mortgage',
    name: 'Ipotecar',
    blurb: 'Produsul pe care îl negociem cel mai des.',
    from: '4,99',
    apr: '5,41',
    amount: '50.000 – 1.500.000 RON',
    term: '5 – 30 ani',
    features: [
      'Grad de finanțare (LTV) până la 85%',
      'Dobândă fixă 5 ani, apoi indexată la IRCC',
      'Ne ocupăm de evaluarea imobiliară și de asigurări',
      'Analiză anuală gratuită a dobânzii, pe viață',
      'Analiză de risc prioritară în portofoliul nostru',
    ],
    featured: true,
  },
  {
    id: 'refinance',
    name: 'Refinanțare',
    blurb: 'Reparați un credit vechi și scump.',
    from: '5,75',
    apr: '6,18',
    amount: '20.000 – 1.200.000 RON',
    term: '3 – 25 ani',
    features: [
      'Analiză gratuită a pragului de rentabilitate',
      'Consolidați până la 6 credite',
      'Sumă suplimentară de bani disponibilă',
      'Ne ocupăm de adresele de refinanțare (sold restant)',
    ],
    featured: false,
  },
]

/** Tabel comparativ pentru desktop; pe mobil se restrânge în cardurile de mai sus. */
export const comparisonRows = [
  { label: 'Dobândă de la', values: ['8,45%', '4,99%', '5,75%'] },
  { label: 'DAE reprezentativă', values: ['9,12%', '5,41%', '6,18%'] },
  { label: 'Perioadă maximă', values: ['10 ani', '30 de ani', '25 de ani'] },
  { label: 'Garanție necesară', values: ['Nu', 'Imobil', 'De regulă un imobil'] },
  { label: 'Timp obișnuit până la virarea banilor', values: ['2–4 zile', '3–5 săptămâni', '3–4 săptămâni'] },
  { label: 'Comisionul nostru pentru dumneavoastră', values: ['0 RON', '0 RON', '0 RON'] },
  { label: 'Comision de rambursare anticipată', values: ['Niciunul', 'Niciunul la ieșirea din perioada fixă', 'Niciunul'] },
]

export const representativeExample =
  'Exemplu reprezentativ: pentru o sumă împrumutată de 300.000 RON pe 25 de ani, cu dobândă fixă de 4,99% în primii 5 ani (ulterior IRCC + 1,9 pp), plătiți 60 de rate lunare de 1.753 RON și 240 de rate lunare de 1.928 RON. Total de rambursat 567.900 RON. DAE reprezentativă 5,41%. Dobânzile sunt indicative, depind de analiza finanțatorului și nu reprezintă o ofertă de creditare.'

/* -------------------------------------------------------------------------- */
/* Testimoniale                                                               */
/* -------------------------------------------------------------------------- */
export const testimonials = [
  {
    quote:
      'Banca noastră ne-a oferit 6,4% și a ridicat din umeri. FlorinFinance a revenit în patru zile cu 5,1%, la un finanțator de care nu auzisem niciodată — și au făcut actele pentru evaluare cât timp noi eram la muncă. Diferența înseamnă cam o vacanță în familie pe an, în următoarele două decenii.',
    name: 'Andreea & Vlad M.',
    role: 'Primul credit ipotecar · Timișoara',
    avatar: 0,
    metric: '61.400 RON economisiți',
  },
  {
    quote:
      'Trei carduri, un credit auto și un descoperit de cont, toate cu scadențe diferite. Acum am o singură rată, o singură dată de plată și văd unde se termină. Mi-au spus și să mai aștept două luni înainte de a depune dosarul, ca să se curețe în Biroul de Credit un litigiu deja închis. Sfatul acela nu i-a costat nimic și mi-a câștigat încrederea.',
    name: 'Cristian D.',
    role: 'Consolidare · 96.000 RON',
    avatar: 1,
    metric: 'Rata mai mică cu 740 RON/lună',
  },
  {
    quote:
      'Ca liber-profesionist cu venituri variabile, fusesem refuzată de două ori pe cont propriu. Au restructurat modul în care erau prezentate veniturile mele, mi-au spus exact care finanțator citește corect veniturile din activități independente, iar creditul a fost aprobat din prima.',
    name: 'Ioana P.',
    role: 'PFA · Refinanțare',
    avatar: 2,
    metric: 'Aprobat din prima depunere',
  },
]

/* -------------------------------------------------------------------------- */
/* Întrebări frecvente                                                        */
/* -------------------------------------------------------------------------- */
export const faqs = [
  {
    q: 'Cât mă costă, de fapt, FlorinFinance?',
    a: 'Nimic. Primim un comision de la finanțator după ce creditul dumneavoastră este tras, iar acest comision este identic indiferent de finanțatorul pe care îl alegeți — așa că nu poate influența niciodată recomandarea noastră. Dacă dosarul nu se finalizează, nu suntem plătiți deloc. Nu veți primi niciodată o factură de la noi.',
  },
  {
    q: 'Compararea ofertelor îmi afectează scorul de credit?',
    a: 'Nu. Prima etapă este o analiză preliminară, bazată pe documentele pe care ni le puneți la dispoziție și pe modelul nostru de scoring. O interogare oficială se înregistrează la Biroul de Credit abia după ce ați ales o ofertă și ne-ați cerut să depunem dosarul. O singură cerere, o singură urmă.',
  },
  {
    q: 'Cât durează întregul proces?',
    a: 'Un credit de nevoi personale durează de obicei 2–4 zile lucrătoare, de la primul telefon până la banii în cont. Un credit ipotecar durează 3–5 săptămâni, cea mai mare parte fiind evaluarea imobiliară și verificările juridice ale finanțatorului. Vă punem la dispoziție un calendar de la început și vă anunțăm în clipa în care ceva întârzie.',
  },
  {
    q: 'Am fost deja refuzat de o bancă. Merită să discutăm?',
    a: 'De obicei da, iar deseori refuzul a fost mai degrabă unul de procedură decât unul definitiv — documente de venit greșite, o datorie închisă neraportată, o cerere depusă exact la singurul finanțator care nu acceptă tipul dumneavoastră de contract. Diagnosticăm mai întâi motivul real, apoi decidem dacă depunem dosarul acum sau în trei luni. Vă vom spune cinstit dacă răspunsul este „mai așteptați”.',
  },
  {
    q: 'De ce documente am nevoie ca să încep?',
    a: 'Pentru o estimare inițială, de absolut nimic. Pentru construirea dosarului: carte de identitate, ultimii doi fluturași de salariu sau Declarația Unică, o adeverință de salariu și un extras recent din Biroul de Credit, pe care îl putem solicita în numele dumneavoastră. Vă trimitem o listă personalizată de documente, ca să nu strângeți același act de două ori.',
  },
  {
    q: 'Lucrați și cu liber-profesioniști sau cu venituri din firmă?',
    a: 'Pe scară largă. Liber-profesioniștii, micro-întreprinderile, PFA-urile și administratorii care își iau dividende reprezintă o parte importantă din portofoliul nostru. Finanțatori diferiți citesc foarte diferit aceeași Declarație Unică, iar faptul că știm care dintre ei este generos cu structura veniturilor dumneavoastră reprezintă cea mai mare parte din valoarea pe care o aducem.',
  },
  {
    q: 'Datele mele personale sunt în siguranță la dumneavoastră?',
    a: 'Dosarul dumneavoastră este transmis numai finanțatorilor pe care îi aprobați explicit, unul câte unul. Documentele sunt stocate criptat, păstrate pe perioada impusă de lege și apoi șterse. Vă puteți exercita oricând, printr-o solicitare scrisă, dreptul de acces la date sau dreptul la ștergerea acestora, iar noi vă răspundem în termen de 30 de zile.',
  },
]

/* -------------------------------------------------------------------------- */
/* Subsolul paginii                                                           */
/* -------------------------------------------------------------------------- */
export const footerColumns = [
  {
    title: 'Produse',
    links: [
      { label: 'Credite ipotecare', href: '#services' },
      { label: 'Credite de nevoi personale', href: '#services' },
      { label: 'Refinanțare', href: '#services' },
      { label: 'Programul „Noua Casă”', href: '#services' },
      { label: 'Leasing', href: '#services' },
      { label: 'Finanțări pentru companii', href: '#services' },
    ],
  },
  {
    title: 'Companie',
    links: [
      { label: 'Cum funcționează', href: '#process' },
      { label: 'Recenzii ale clienților', href: '#reviews' },
      { label: 'Dobânzi indicative', href: '#rates' },
      { label: 'Cariere', href: '#contact' },
      { label: 'Contact', href: '#contact' },
    ],
  },
  {
    title: 'Resurse',
    links: [
      { label: 'Calculator de rate', href: '#calculator' },
      { label: 'Întrebări frecvente', href: '#faq' },
      { label: 'Listă de documente', href: '#contact' },
      { label: 'Glosar de termeni de credit', href: '#faq' },
    ],
  },
]

export const socials = [
  { icon: 'facebook', label: 'Facebook', href: '#' },
  { icon: 'instagram', label: 'Instagram', href: '#' },
  { icon: 'linkedin', label: 'LinkedIn', href: '#' },
  { icon: 'youtube', label: 'YouTube', href: '#' },
]

export const legalLinks = [
  { label: 'Politica de confidențialitate', href: '#' },
  { label: 'Politica de cookie-uri', href: '#' },
  { label: 'Termeni și condiții', href: '#' },
  { label: 'Reclamații și SAL (CSALB)', href: '#' },
]
