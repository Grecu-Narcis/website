import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import TrustStrip from './components/TrustStrip.jsx'
import Services from './components/Services.jsx'
import Calculator from './components/Calculator.jsx'
import Process from './components/Process.jsx'
import Rates from './components/Rates.jsx'
import Testimonials from './components/Testimonials.jsx'
import Faq from './components/Faq.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import FloatingActions from './components/FloatingActions.jsx'

/**
 * FlorinFinance — compoziția paginii unice.
 *
 * Ordinea secțiunilor urmează traseul de conversie: promisiune → dovezi → ofertă →
 * interacțiune → proces → preț → recenzii → obiecții → solicitare.
 * Fiecare secțiune își gestionează propriul id, spațierea și banda de fundal.
 */
export default function App() {
  return (
    <>
      {/* Utilizatorii de tastatură pot sări direct peste meniul de navigare. */}
      <a
        href="#services"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:rounded-xl focus:bg-brand-900 focus:px-4 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-white"
      >
        Sari la conținut
      </a>

      <Navbar />

      <main>
        <Hero />
        <TrustStrip />
        <Services />
        <Calculator />
        <Process />
        <Rates />
        <Testimonials />
        <Faq />
        <Contact />
      </main>

      <Footer />
      <FloatingActions />
    </>
  )
}
