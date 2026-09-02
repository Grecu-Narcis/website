/** Formatting + loan maths helpers. Pure functions, no React. */

const currency = new Intl.NumberFormat('ro-RO', {
  style: 'currency',
  currency: 'RON',
  maximumFractionDigits: 0,
})

const compact = new Intl.NumberFormat('ro-RO', {
  notation: 'compact',
  maximumFractionDigits: 1,
})

/** 420000 -> "420.000 RON" */
export const formatRON = (value) => currency.format(Math.round(value))

/** 420000 -> "420 K" — used on slider end-labels where space is tight. */
export const formatCompact = (value) => compact.format(value)

/**
 * Standard annuity (equal-instalment) payment.
 *
 *            r
 *   M = P × ─────────────
 *           1 − (1 + r)⁻ⁿ
 *
 * @param {number} principal  amount borrowed
 * @param {number} annualRate nominal annual rate, in percent (e.g. 5.35)
 * @param {number} years      term in years
 */
export function monthlyPayment(principal, annualRate, years) {
  const n = Math.max(1, Math.round(years * 12))
  const r = annualRate / 100 / 12

  // Guard the zero-interest edge case, where the formula divides by zero.
  if (r === 0) return principal / n

  return (principal * r) / (1 - Math.pow(1 + r, -n))
}

/** Payment plus the derived totals a borrower actually wants to see. */
export function amortisation(principal, annualRate, years) {
  const months = Math.max(1, Math.round(years * 12))
  const payment = monthlyPayment(principal, annualRate, years)
  const totalPaid = payment * months

  return {
    months,
    payment,
    totalPaid,
    totalInterest: totalPaid - principal,
    interestShare: totalPaid > 0 ? (totalPaid - principal) / totalPaid : 0,
  }
}

/**
 * Debt-to-income verdict. Romanian lenders cap total instalments at roughly
 * 40% of net income, so we band the result and let the UI colour it.
 */
export function affordability(payment, netIncome) {
  if (!netIncome || netIncome <= 0) return null

  const ratio = payment / netIncome

  if (ratio <= 0.3)
    return {
      ratio,
      tone: 'good',
      title: 'Comfortably within lender limits',
      detail: 'Most of our panel would consider this profile straight away.',
    }

  if (ratio <= 0.4)
    return {
      ratio,
      tone: 'ok',
      title: 'Close to the usual 40% ceiling',
      detail: 'Workable, but the term or amount may need a small adjustment.',
    }

  return {
    ratio,
    tone: 'tight',
    title: 'Above the typical 40% ceiling',
    detail: 'Lengthen the term, lower the amount, or add a co-borrower.',
  }
}
