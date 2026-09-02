/**
 * Single source of truth for every piece of copy, number and image on the page.
 * Editing the site should never require touching a component — change it here.
 *
 * All copy, product names, claims and partner names are original to
 * FlorinFinance. Rates are illustrative placeholders for a demo build.
 */

/* -------------------------------------------------------------------------- */
/* Company & contact                                                          */
/* -------------------------------------------------------------------------- */
export const company = {
  name: 'FlorinFinance',
  tagline: 'Independent credit brokers',
  phones: ['0770 218 340', '0745 902 117'],
  email: 'hello@florinfinance.ro',
  address: 'Bd. Unirii 41, Corp B, Etaj 3 — 300085 Timișoara',
  hours: 'Mon–Fri, 09:00–18:30',
  registration: 'Registered credit intermediary · Reg. no. IC-0421/2019',
}

/* -------------------------------------------------------------------------- */
/* Navigation                                                                 */
/* -------------------------------------------------------------------------- */
export const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Calculator', href: '#calculator' },
  { label: 'How it works', href: '#process' },
  { label: 'Rates', href: '#rates' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'FAQ', href: '#faq' },
]

/* -------------------------------------------------------------------------- */
/* Imagery — Unsplash placeholders, swap freely                               */
/* -------------------------------------------------------------------------- */
const unsplash = (id, w = 1200, h = 1400) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&h=${h}&q=80`

export const images = {
  hero: unsplash('1568605114967-8130f3a36994', 1100, 1300), // lit home at dusk
  advisor: unsplash('1600880292203-757bb62b4baf', 1000, 1100), // advisor meeting
  ctaOffice: unsplash('1521737604893-d14cc237f11d', 1400, 900), // team at a table
  avatars: [
    unsplash('1573497019940-1c28c88b4f3e', 200, 200),
    unsplash('1507003211169-0a1dd7228f2d', 200, 200),
    unsplash('1580489944761-15a19d654956', 200, 200),
    unsplash('1560250097-0b93528c311a', 200, 200),
  ],
}

/* -------------------------------------------------------------------------- */
/* Hero                                                                       */
/* -------------------------------------------------------------------------- */
export const hero = {
  badge: 'Free for you — the lender pays our fee',
  title: 'The loan you deserve,',
  titleAccent: 'not the one you were offered.',
  body: 'One application. Thirty-plus lenders compared side by side. A single, honest recommendation from a broker who negotiates on your side of the table — and never on commission from you.',
  primaryCta: { label: 'Get my free offer', href: '#contact' },
  secondaryCta: { label: 'Estimate my payment', href: '#calculator' },
  bullets: [
    'Answer in 24 hours, no credit-file impact',
    'We handle the paperwork, valuations and lender calls',
    'Turned down elsewhere? We know who says yes',
  ],
  // Floating proof card layered over the hero photo
  proofCard: {
    label: 'Approved this week',
    amount: 'RON 418,000',
    product: 'Mortgage · 27 years · 5.19% APR',
    saved: 'Client saved RON 61,400 vs. their bank’s first offer',
  },
}

/* -------------------------------------------------------------------------- */
/* Social proof                                                               */
/* -------------------------------------------------------------------------- */
export const stats = [
  { value: '1,240+', label: 'Families financed', icon: 'users' },
  { value: 'RON 740M', label: 'Credit intermediated', icon: 'trending' },
  { value: '31', label: 'Lenders in our panel', icon: 'building' },
  { value: '96%', label: 'Approval rate on submitted files', icon: 'shield' },
]

/** Fictional lender panel — placeholder names, no real trademarks. */
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
/* Services                                                                   */
/* -------------------------------------------------------------------------- */
export const services = [
  {
    icon: 'home',
    title: 'Mortgages',
    text: 'First home, second home or a build. We model fixed vs. variable over the full term and show you the real cost of each, not just the headline rate.',
    points: ['Up to 85% LTV', 'Terms to 30 years', 'Pre-approval in 3 days'],
  },
  {
    icon: 'wallet',
    title: 'Personal loans',
    text: 'Renovations, tuition, a wedding or consolidating four expensive debts into one manageable payment with a fixed end date.',
    points: ['RON 5k – 400k', 'No collateral', 'Funds in 48h'],
  },
  {
    icon: 'refresh',
    title: 'Refinancing',
    text: 'If your loan is more than two years old, there is a good chance it is overpriced. We audit it for free and tell you plainly whether moving is worth it.',
    points: ['Free rate audit', 'Break-even analysis', 'Average 1.4pp saved'],
  },
  {
    icon: 'key',
    title: 'First-home programme',
    text: 'State-guaranteed lending for buyers with a small deposit. We keep track of which lenders still have allocation left this quarter.',
    points: ['5% deposit', 'Guarantee handled', 'Eligibility pre-check'],
  },
  {
    icon: 'car',
    title: 'Leasing & vehicles',
    text: 'Operational or financial leasing for cars, vans and equipment — priced for both individuals and companies, with the residual value explained.',
    points: ['New & used', 'Company or personal', 'Balloon options'],
  },
  {
    icon: 'briefcase',
    title: 'Business finance',
    text: 'Working capital, invoice lines, equipment and commercial property for SMEs. We prepare the file the way credit committees want to read it.',
    points: ['SME lines', 'Grant co-funding', 'Cash-flow modelling'],
  },
]

/* -------------------------------------------------------------------------- */
/* Interactive calculator — one config per tab                                */
/* -------------------------------------------------------------------------- */
export const calculatorProducts = [
  {
    id: 'mortgage',
    label: 'Mortgage',
    icon: 'home',
    rate: 5.35,
    amount: { min: 50_000, max: 1_500_000, step: 5_000, default: 420_000 },
    years: { min: 5, max: 30, step: 1, default: 25 },
    note: 'Indicative fixed rate for the first 5 years, then variable at IRCC + 1.9pp.',
  },
  {
    id: 'personal',
    label: 'Personal',
    icon: 'wallet',
    rate: 8.9,
    amount: { min: 5_000, max: 400_000, step: 1_000, default: 60_000 },
    years: { min: 1, max: 10, step: 1, default: 5 },
    note: 'Unsecured lending. Fixed rate for the whole term, no early-repayment penalty.',
  },
  {
    id: 'refinance',
    label: 'Refinance',
    icon: 'refresh',
    rate: 6.15,
    amount: { min: 20_000, max: 1_200_000, step: 5_000, default: 240_000 },
    years: { min: 3, max: 25, step: 1, default: 15 },
    note: 'Consolidate up to six existing facilities into one payment and one due date.',
  },
  {
    id: 'leasing',
    label: 'Leasing',
    icon: 'car',
    rate: 7.4,
    amount: { min: 15_000, max: 600_000, step: 5_000, default: 130_000 },
    years: { min: 1, max: 7, step: 1, default: 5 },
    note: 'Advance from 10%. VAT-deductible structures available for companies.',
  },
]

/* -------------------------------------------------------------------------- */
/* Process                                                                    */
/* -------------------------------------------------------------------------- */
export const processSteps = [
  {
    icon: 'phone',
    title: 'The first conversation',
    text: 'In person, by phone or on video. We map your income, commitments and goal — and tell you straight away if borrowing now is a bad idea.',
  },
  {
    icon: 'search',
    title: 'We shop the panel',
    text: 'Your profile goes to every lender that fits it. You get a one-page comparison of real offers, with total cost over the term next to each one.',
  },
  {
    icon: 'file',
    title: 'File built properly',
    text: 'We assemble and sanity-check every document before submission. Files that go in clean get approved faster and at better pricing.',
  },
  {
    icon: 'percent',
    title: 'We negotiate terms',
    text: 'Rate, fees, insurance, early-repayment clauses. Lenders compete for volume — we use ours to move the numbers in your favour.',
  },
  {
    icon: 'check',
    title: 'Signing and funding',
    text: 'We attend the signing, verify the final contract against the offer, and stay reachable for the life of the loan. Annual review included.',
  },
]

/* -------------------------------------------------------------------------- */
/* Rates / pricing                                                            */
/* -------------------------------------------------------------------------- */
export const rateCards = [
  {
    id: 'personal',
    name: 'Personal',
    blurb: 'Unsecured, fixed, predictable.',
    from: '8.45',
    apr: '9.12',
    amount: 'RON 5,000 – 400,000',
    term: '1 – 10 years',
    features: [
      'No collateral or guarantor',
      'Decision in 24–48 hours',
      'Zero early-repayment penalty',
      'Debt consolidation accepted',
    ],
    featured: false,
  },
  {
    id: 'mortgage',
    name: 'Mortgage',
    blurb: 'Our most negotiated product.',
    from: '4.99',
    apr: '5.41',
    amount: 'RON 50,000 – 1,500,000',
    term: '5 – 30 years',
    features: [
      'Up to 85% loan-to-value',
      '5-year fixed, then IRCC-linked',
      'Valuation & insurance arranged',
      'Free annual rate review, for life',
      'Priority underwriting on our panel',
    ],
    featured: true,
  },
  {
    id: 'refinance',
    name: 'Refinance',
    blurb: 'Repair an expensive old loan.',
    from: '5.75',
    apr: '6.18',
    amount: 'RON 20,000 – 1,200,000',
    term: '3 – 25 years',
    features: [
      'Free break-even analysis',
      'Consolidate up to 6 facilities',
      'Top-up cash available',
      'We handle the payoff letters',
    ],
    featured: false,
  },
]

/** Desktop comparison table; collapses into the cards above on mobile. */
export const comparisonRows = [
  { label: 'Interest from', values: ['8.45%', '4.99%', '5.75%'] },
  { label: 'Representative APR', values: ['9.12%', '5.41%', '6.18%'] },
  { label: 'Maximum term', values: ['10 years', '30 years', '25 years'] },
  { label: 'Collateral required', values: ['No', 'Property', 'Usually property'] },
  { label: 'Typical time to funding', values: ['2–4 days', '3–5 weeks', '3–4 weeks'] },
  { label: 'Our fee to you', values: ['RON 0', 'RON 0', 'RON 0'] },
  { label: 'Early repayment penalty', values: ['None', 'None on fixed exit', 'None'] },
]

export const representativeExample =
  'Representative example: borrowing RON 300,000 over 25 years at 4.99% fixed for 5 years (then IRCC + 1.9pp), you would make 60 monthly payments of RON 1,753 and 240 payments of RON 1,928. Total amount payable RON 567,900. Representative APR 5.41%. Rates are indicative, subject to lender assessment, and not an offer of credit.'

/* -------------------------------------------------------------------------- */
/* Testimonials                                                               */
/* -------------------------------------------------------------------------- */
export const testimonials = [
  {
    quote:
      'Our own bank offered 6.4% and shrugged. FlorinFinance came back in four days with 5.1% at a lender we had never heard of — and did the valuation paperwork while we were at work. That gap is roughly a family holiday every year for the next two decades.',
    name: 'Andreea & Vlad M.',
    role: 'First mortgage · Timișoara',
    avatar: 0,
    metric: 'RON 61,400 saved',
  },
  {
    quote:
      'Three cards, a car loan and an overdraft, all on different dates. Now it is one payment, one date, and I can see the end of it. They also told me to wait two months before applying so a closed dispute would clear my file. That advice cost them nothing and earned my trust.',
    name: 'Cristian D.',
    role: 'Consolidation · RON 96,000',
    avatar: 1,
    metric: 'RON 740/mo lower',
  },
  {
    quote:
      'As a freelancer with variable income I had been refused twice on my own. They restructured how my earnings were presented, told me exactly which lender reads contractor income properly, and it was approved first time.',
    name: 'Ioana P.',
    role: 'Self-employed · Refinance',
    avatar: 2,
    metric: 'Approved first submission',
  },
]

/* -------------------------------------------------------------------------- */
/* FAQ                                                                        */
/* -------------------------------------------------------------------------- */
export const faqs = [
  {
    q: 'What does FlorinFinance actually cost me?',
    a: 'Nothing. We are paid a commission by the lender once your loan is disbursed, and that commission is the same regardless of which lender you choose — so it can never bias our recommendation. If your file does not complete, we are not paid at all. You will never receive an invoice from us.',
  },
  {
    q: 'Will comparing offers damage my credit score?',
    a: 'No. The first stage is a soft assessment based on the documents you give us plus our own scoring model. A formal enquiry is only registered at the Credit Bureau once you have picked an offer and told us to submit it. One application, one footprint.',
  },
  {
    q: 'How long does the whole process take?',
    a: 'A personal loan is typically 2–4 working days from first call to money in your account. A mortgage runs 3–5 weeks, most of which is valuation and the lender’s legal checks. We publish a timeline at the start and tell you the moment anything slips.',
  },
  {
    q: 'I have already been refused by a bank. Is it worth talking?',
    a: 'Usually yes, and often the refusal was procedural rather than final — wrong income documentation, an unreported closed debt, an application to the one lender that does not accept your employment type. We diagnose the actual reason first, then decide whether to submit now or in three months. We will tell you honestly if the answer is "wait".',
  },
  {
    q: 'What documents do I need to start?',
    a: 'For an initial estimate, nothing at all. To build a file: ID, last two payslips or your tax return, an employer certificate, and a recent Credit Bureau extract, which we can request on your behalf. We send a personalised checklist so nothing is collected twice.',
  },
  {
    q: 'Do you work with self-employed and company income?',
    a: 'Extensively. Freelancers, micro-companies, PFA and directors taking dividends are a large share of our book. Different lenders read the same tax return very differently, and knowing which one is generous with your income structure is most of the value we add.',
  },
  {
    q: 'Is my personal data safe with you?',
    a: 'Your file is shared only with the lenders you explicitly approve, one at a time. Documents are stored encrypted, retained for the period the law requires and then deleted. You can request a copy or full erasure at any time in writing, and we answer within 30 days.',
  },
]

/* -------------------------------------------------------------------------- */
/* Footer                                                                     */
/* -------------------------------------------------------------------------- */
export const footerColumns = [
  {
    title: 'Products',
    links: [
      { label: 'Mortgages', href: '#services' },
      { label: 'Personal loans', href: '#services' },
      { label: 'Refinancing', href: '#services' },
      { label: 'First-home programme', href: '#services' },
      { label: 'Leasing', href: '#services' },
      { label: 'Business finance', href: '#services' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'How it works', href: '#process' },
      { label: 'Client reviews', href: '#reviews' },
      { label: 'Indicative rates', href: '#rates' },
      { label: 'Careers', href: '#contact' },
      { label: 'Contact', href: '#contact' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Payment calculator', href: '#calculator' },
      { label: 'Frequently asked questions', href: '#faq' },
      { label: 'Document checklist', href: '#contact' },
      { label: 'Glossary of credit terms', href: '#faq' },
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
  { label: 'Privacy policy', href: '#' },
  { label: 'Cookie policy', href: '#' },
  { label: 'Terms of service', href: '#' },
  { label: 'Complaints & ADR', href: '#' },
]
