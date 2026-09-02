/** Utilitare de formatare + calcule de credit. Funcții pure, fără React. */

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

/**
 * 420000 -> "420 mii", 1500000 -> "1,5 mil." — folosit pe etichetele de capăt
 * ale glisoarelor, unde spațiul este limitat.
 *
 * Formatul compact „ro-RO” livrează „K” pentru mii (420 K), abreviere care nu se
 * folosește în română, așa că o înlocuim cu „mii”. Sufixul „mil.” vine corect
 * din locală și rămâne neatins.
 */
export const formatCompact = (value) => compact.format(value).replace('K', 'mii')

/**
 * Rata standard de tip anuitate (rate egale).
 *
 *            r
 *   M = P × ─────────────
 *           1 − (1 + r)⁻ⁿ
 *
 * @param {number} principal  suma împrumutată
 * @param {number} annualRate rata nominală anuală, în procente (ex. 5.35)
 * @param {number} years      perioada, în ani
 */
export function monthlyPayment(principal, annualRate, years) {
  const n = Math.max(1, Math.round(years * 12))
  const r = annualRate / 100 / 12

  // Tratăm cazul-limită al dobânzii zero, în care formula ar împărți la zero.
  if (r === 0) return principal / n

  return (principal * r) / (1 - Math.pow(1 + r, -n))
}

/** Rata lunară, plus totalurile care îl interesează efectiv pe client. */
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
 * Verdictul de grad de îndatorare. Finanțatorii din România limitează totalul
 * ratelor la aproximativ 40% din venitul net, așa că încadrăm rezultatul pe
 * intervale și lăsăm interfața să îl coloreze.
 */
export function affordability(payment, netIncome) {
  if (!netIncome || netIncome <= 0) return null

  const ratio = payment / netIncome

  if (ratio <= 0.3)
    return {
      ratio,
      tone: 'good',
      title: 'Confortabil, în limitele finanțatorilor',
      detail:
        'Majoritatea finanțatorilor din portofoliul nostru ar analiza acest profil imediat.',
    }

  if (ratio <= 0.4)
    return {
      ratio,
      tone: 'ok',
      title: 'Aproape de plafonul obișnuit de 40%',
      detail: 'Fezabil, însă perioada sau suma ar putea necesita o mică ajustare.',
    }

  return {
    ratio,
    tone: 'tight',
    title: 'Peste plafonul obișnuit de 40%',
    detail: 'Prelungiți perioada, reduceți suma sau adăugați un codebitor.',
  }
}
