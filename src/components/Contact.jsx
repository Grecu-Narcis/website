import { useEffect, useRef, useState } from 'react'
import Icon from './Icon.jsx'
import Button from './ui/Button.jsx'
import Reveal from './ui/Reveal.jsx'
import { company, images, services, socials } from '../data/site.js'

/** Fields that must be filled, with the message shown when they are not. */
const REQUIRED = {
  name: 'Please tell us your name.',
  phone: 'We need a phone number to call you back.',
  email: 'Please add an email so we can send the comparison.',
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i
const PHONE_RE = /^[+\d][\d\s().-]{7,}$/

const EMPTY_FORM = { name: '', phone: '', email: '', product: services[0].title, amount: '', consent: false }

/**
 * Closing CTA + lead form.
 *
 * Fully client-side: validates on submit, reports field-level errors with
 * aria-invalid/aria-describedby, then swaps to a success panel. There is no
 * network call — wire `submit()` to your CRM or an API route.
 */
export default function Contact() {
  const [form, setForm] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | sent
  const timer = useRef(null)

  // Clear the fake-network timer if the component unmounts mid-submit.
  useEffect(() => () => clearTimeout(timer.current), [])

  const update = (field) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setForm((prev) => ({ ...prev, [field]: value }))
    // Clearing the error as the user types is friendlier than waiting for resubmit.
    setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev))
  }

  const validate = () => {
    const next = {}

    Object.entries(REQUIRED).forEach(([field, message]) => {
      if (!String(form[field]).trim()) next[field] = message
    })

    if (!next.email && !EMAIL_RE.test(form.email)) next.email = 'That email address looks incomplete.'
    if (!next.phone && !PHONE_RE.test(form.phone)) next.phone = 'Please use a reachable phone number.'
    if (!form.consent) next.consent = 'We need your consent before contacting you.'

    return next
  }

  const submit = (e) => {
    e.preventDefault()

    const found = validate()
    setErrors(found)
    if (Object.keys(found).length) {
      // Move focus to the first problem so keyboard and screen-reader users land on it.
      document.getElementById(`field-${Object.keys(found)[0]}`)?.focus()
      return
    }

    setStatus('sending')
    timer.current = setTimeout(() => setStatus('sent'), 900) // replace with a real POST
  }

  const reset = () => {
    setForm(EMPTY_FORM)
    setErrors({})
    setStatus('idle')
  }

  /** Shared input classes; red ring when the field is in error. */
  const fieldClass = (field) =>
    `w-full rounded-xl border bg-white px-4 py-3 text-sm text-ink-800 transition placeholder:text-ink-400 ${
      errors[field]
        ? 'border-rose-300 ring-2 ring-rose-100'
        : 'border-ink-200 hover:border-ink-300 focus:border-brand-500'
    }`

  return (
    <section id="contact" className="section bg-white">
      <div className="container-page">
        <div className="grid overflow-hidden rounded-3xl bg-brand-950 shadow-lift lg:grid-cols-12">
          {/* ---------- Left: pitch + contact details ---------- */}
          <div className="relative isolate flex flex-col justify-between gap-10 p-7 sm:p-10 lg:col-span-5 lg:p-12">
            {/* Background photo, heavily tinted so text stays readable */}
            <div aria-hidden="true" className="absolute inset-0 -z-10">
              <img src={images.ctaOffice} alt="" loading="lazy" className="size-full object-cover opacity-25" />
              <div className="absolute inset-0 bg-gradient-to-br from-brand-950 via-brand-950/95 to-brand-900/85" />
            </div>

            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-xs font-semibold tracking-[0.14em] text-gold-200 uppercase">
                <Icon name="sparkles" className="size-3.5" strokeWidth={2} />
                Free, no obligation
              </span>

              <h2 className="text-h2 mt-6 text-white">
                Find out what you could <span className="text-gold-300">actually</span> be paying.
              </h2>
              <p className="mt-4 text-[0.98rem] leading-relaxed text-brand-100/85">
                Send us the basics. Within one working day you will have a written comparison of the
                real offers available to you, with the total cost of each over the full term.
              </p>

              <ul className="mt-7 space-y-3">
                {[
                  'A reply within one working day',
                  'No credit-file enquiry at this stage',
                  'Your data is never sold or shared',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-brand-100">
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-gold-400/20 text-gold-300">
                      <Icon name="check" className="size-3.5" strokeWidth={2.6} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact block */}
            <div className="space-y-4 border-t border-white/10 pt-8 text-sm">
              <a
                href={`tel:${company.phones[0].replace(/\s/g, '')}`}
                className="group flex items-center gap-3 text-white transition hover:text-gold-300"
              >
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white/10 text-gold-300 transition group-hover:bg-white/20">
                  <Icon name="phone" className="size-4.5" strokeWidth={1.9} />
                </span>
                <span>
                  <span className="block font-semibold">{company.phones[0]}</span>
                  <span className="block text-xs text-brand-200/70">{company.phones[1]}</span>
                </span>
              </a>

              <a
                href={`mailto:${company.email}`}
                className="group flex items-center gap-3 text-white transition hover:text-gold-300"
              >
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white/10 text-gold-300 transition group-hover:bg-white/20">
                  <Icon name="mail" className="size-4.5" strokeWidth={1.9} />
                </span>
                <span className="font-semibold break-all">{company.email}</span>
              </a>

              <p className="flex items-start gap-3 text-brand-100">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white/10 text-gold-300">
                  <Icon name="pin" className="size-4.5" strokeWidth={1.9} />
                </span>
                <span>
                  <span className="block">{company.address}</span>
                  <span className="mt-0.5 block text-xs text-brand-200/70">{company.hours}</span>
                </span>
              </p>

              <ul className="flex items-center gap-2 pt-2">
                {socials.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      aria-label={s.label}
                      className="grid size-9 place-items-center rounded-xl border border-white/15 text-brand-100 transition hover:border-gold-300/60 hover:bg-white/10 hover:text-gold-300"
                    >
                      <Icon name={s.icon} className="size-4" strokeWidth={1.8} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ---------- Right: form ---------- */}
          <div className="flex flex-col bg-white p-7 sm:p-10 lg:col-span-7 lg:p-12">
            {status === 'sent' ? (
              /* Success state */
              <div className="flex h-full flex-col items-start justify-center py-6">
                <span className="grid size-14 place-items-center rounded-2xl bg-brand-100 text-brand-700">
                  <Icon name="check" className="size-7" strokeWidth={2.6} />
                </span>
                <h3 className="text-h3 mt-6">Request received — thank you.</h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-600">
                  An advisor will call you on <strong className="text-brand-800">{form.phone}</strong>{' '}
                  within one working day, and your written comparison will follow by email. If it is
                  urgent, call us directly on {company.phones[0]}.
                </p>
                <Button onClick={reset} variant="outline" size="md" className="mt-8" icon="refresh" iconRight={false}>
                  Send another request
                </Button>
              </div>
            ) : (
              <>
              <form onSubmit={submit} noValidate>
                <h3 className="text-h3">Request your free comparison</h3>
                <p className="mt-2 text-sm text-ink-500">
                  Five fields. No documents needed yet.
                </p>

                <div className="mt-7 grid gap-5 sm:grid-cols-2">
                  {/* Name */}
                  <div className="sm:col-span-2">
                    <label htmlFor="field-name" className="mb-1.5 block text-sm font-semibold text-ink-800">
                      Full name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="field-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      placeholder="Ana Ionescu"
                      value={form.name}
                      onChange={update('name')}
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? 'error-name' : undefined}
                      className={fieldClass('name')}
                    />
                    <FieldError id="error-name" message={errors.name} />
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="field-phone" className="mb-1.5 block text-sm font-semibold text-ink-800">
                      Phone <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="field-phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      placeholder="07xx xxx xxx"
                      value={form.phone}
                      onChange={update('phone')}
                      aria-invalid={Boolean(errors.phone)}
                      aria-describedby={errors.phone ? 'error-phone' : undefined}
                      className={fieldClass('phone')}
                    />
                    <FieldError id="error-phone" message={errors.phone} />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="field-email" className="mb-1.5 block text-sm font-semibold text-ink-800">
                      Email <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="field-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="ana@email.com"
                      value={form.email}
                      onChange={update('email')}
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? 'error-email' : undefined}
                      className={fieldClass('email')}
                    />
                    <FieldError id="error-email" message={errors.email} />
                  </div>

                  {/* Product */}
                  <div>
                    <label htmlFor="field-product" className="mb-1.5 block text-sm font-semibold text-ink-800">
                      What do you need?
                    </label>
                    <select
                      id="field-product"
                      name="product"
                      value={form.product}
                      onChange={update('product')}
                      className={`${fieldClass('product')} appearance-none bg-[length:1rem] bg-[right_1rem_center] bg-no-repeat pr-10`}
                      style={{
                        backgroundImage:
                          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2363767a' stroke-width='2.2' stroke-linecap='round'%3E%3Cpath d='m6 9.5 6 6 6-6'/%3E%3C/svg%3E\")",
                      }}
                    >
                      {services.map((service) => (
                        <option key={service.title} value={service.title}>
                          {service.title}
                        </option>
                      ))}
                      <option value="Not sure yet">Not sure yet — advise me</option>
                    </select>
                  </div>

                  {/* Amount */}
                  <div>
                    <label htmlFor="field-amount" className="mb-1.5 block text-sm font-semibold text-ink-800">
                      Approximate amount{' '}
                      <span className="font-normal text-ink-400">(optional)</span>
                    </label>
                    <div className="relative">
                      <input
                        id="field-amount"
                        name="amount"
                        type="number"
                        inputMode="numeric"
                        min="0"
                        step="1000"
                        placeholder="250000"
                        value={form.amount}
                        onChange={update('amount')}
                        className={`${fieldClass('amount')} pr-16`}
                      />
                      <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-sm font-semibold text-ink-400">
                        RON
                      </span>
                    </div>
                  </div>
                </div>

                {/* Consent */}
                <div className="mt-6">
                  <label
                    htmlFor="field-consent"
                    className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition ${
                      errors.consent ? 'border-rose-300 bg-rose-50/50' : 'border-ink-200 hover:border-brand-300 hover:bg-brand-50/40'
                    }`}
                  >
                    <input
                      id="field-consent"
                      name="consent"
                      type="checkbox"
                      checked={form.consent}
                      onChange={update('consent')}
                      aria-invalid={Boolean(errors.consent)}
                      aria-describedby={errors.consent ? 'error-consent' : undefined}
                      className="mt-0.5 size-4.5 shrink-0 rounded border-ink-300 accent-brand-700"
                    />
                    <span className="text-xs leading-relaxed text-ink-600">
                      I agree to be contacted about my request and I have read the privacy policy. My
                      details will not be shared with any lender until I approve it. <span className="text-rose-500">*</span>
                    </span>
                  </label>
                  <FieldError id="error-consent" message={errors.consent} />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="mt-7 w-full sm:w-auto"
                  icon={status === 'sending' ? undefined : 'arrowRight'}
                  disabled={status === 'sending'}
                >
                  {status === 'sending' ? 'Sending…' : 'Send my request'}
                </Button>

                <p className="mt-4 flex items-start gap-2 text-xs text-ink-400">
                  <Icon name="lock" className="mt-0.5 size-3.5 shrink-0" strokeWidth={2} />
                  Encrypted in transit. Deleted on request. Never used for marketing lists.
                </p>
              </form>

              {/* `mt-auto` pins this to the bottom so the column has no dead space
                  next to the taller dark panel on desktop. */}
              <div className="mt-auto flex flex-col gap-3 border-t border-ink-100 pt-7 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-ink-500">
                  Prefer to talk it through first?
                </p>
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
                  <a
                    href={`tel:${company.phones[0].replace(/\s/g, '')}`}
                    className="inline-flex items-center gap-2 font-semibold text-brand-800 transition hover:text-brand-600"
                  >
                    <Icon name="phone" className="size-4" strokeWidth={2} />
                    {company.phones[0]}
                  </a>
                  <span className="inline-flex items-center gap-2 text-ink-500">
                    <Icon name="clock" className="size-4" strokeWidth={2} />
                    {company.hours}
                  </span>
                </div>
              </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

/** Inline, screen-reader-announced field error. */
function FieldError({ id, message }) {
  if (!message) return null

  return (
    <p id={id} role="alert" className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-rose-600">
      <Icon name="close" className="size-3.5" strokeWidth={2.6} />
      {message}
    </p>
  )
}
