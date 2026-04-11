import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'

function useIntersection(options = {}) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold: 0.12, ...options }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])
  return [ref, isVisible]
}

function AnimateIn({ children, delay = 0, className = '' }) {
  const [ref, isVisible] = useIntersection()
  return (
    <div ref={ref} style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}>
      {children}
    </div>
  )
}

const programs = [
  { icon: '🏦', title: 'FHA Loans', down: '3.5% Down', desc: 'Federal Housing Administration loans accept credit scores as low as 580 with just 3.5% down. Perfect for buyers with limited savings.', tag: 'Most Popular', slug: '/programs/fha-loans' },
  { icon: '🌴', title: 'FL HLP Program', down: '$10,000 Assistance', desc: 'The Florida Housing First Time Homebuyer Loan Program offers a 30-year fixed mortgage combined with down payment assistance at below-market rates.', tag: 'State Program', slug: '/programs/fl-hlp' },
  { icon: '💵', title: 'Florida Assist', down: 'Up to $10,000', desc: 'A 0% interest, deferred second mortgage to cover down payment and closing costs. No monthly payments — repaid only when you sell or refinance.', tag: 'Down Payment Help', slug: '/programs/florida-assist' },
  { icon: '🦸', title: 'Hometown Heroes', down: 'Up to $35,000', desc: 'For teachers, nurses, police, firefighters, and other community workers. Offers up to $35,000 in down payment and closing cost assistance.', tag: 'Community Workers', slug: '/programs/hometown-heroes' },
  { icon: '🎖️', title: 'VA Loans', down: '0% Down', desc: 'Veterans and active-duty military members can buy with absolutely no down payment, no PMI, and competitive interest rates.', tag: 'Veterans Only', slug: '/programs/va-loans' },
  { icon: '🌾', title: 'USDA Loans', down: '0% Down', desc: 'For rural and semi-rural areas of Florida. Zero down payment required with income limits that accommodate most first-time buyers.', tag: 'Rural Areas', slug: '/programs/usda-loans' },
]

const processSteps = [
  { num: '01', icon: '✅', title: 'Get Pre-Approved', desc: 'Lenders review your income, credit, and assets to determine your max loan amount. This gives you a real budget and makes offers credible.' },
  { num: '02', icon: '🤝', title: 'Find Your Agent', desc: 'Partner with a buyer\'s agent (free for you — seller pays). They guide you, negotiate on your behalf, and protect your interests.' },
  { num: '03', icon: '🔍', title: 'House Hunt', desc: 'Tour homes that fit your pre-approved budget and wishlist. Don\'t fall in love with the first one — compare at least 3–5.' },
  { num: '04', icon: '📝', title: 'Make an Offer', desc: 'Your agent writes a competitive offer with contingencies that protect you — inspection, appraisal, and financing.' },
  { num: '05', icon: '🔬', title: 'Inspection & Appraisal', desc: 'A licensed inspector checks the property. Your lender orders an appraisal. Either result can trigger renegotiation.' },
  { num: '06', icon: '🔑', title: 'Close & Move In', desc: 'Sign final documents, pay closing costs (2–5%), receive your keys. You\'re a homeowner!' },
]

const mistakes = [
  { icon: '💳', title: 'Opening New Credit Lines', desc: 'Never open new credit cards or take auto loans between pre-approval and closing — it changes your debt-to-income ratio.' },
  { icon: '💼', title: 'Changing Jobs', desc: 'Lenders want 2 years of employment stability. A job change mid-process can delay or kill your loan.' },
  { icon: '🏃', title: 'Skipping Pre-Approval', desc: 'Shopping without pre-approval wastes time. Sellers won\'t take you seriously, and you might fall for homes you can\'t afford.' },
  { icon: '🔧', title: 'Waiving the Inspection', desc: 'Never waive a home inspection to win a bidding war. A $400 inspection can save you $40,000 in surprises.' },
  { icon: '💰', title: 'Forgetting Closing Costs', desc: 'Buyers often budget only the down payment. Closing costs are an additional 2–5% of the purchase price.' },
  { icon: '📊', title: 'Ignoring Total Cost', desc: 'Monthly payment isn\'t just principal + interest. Add taxes, insurance, HOA fees, and maintenance to know the real cost.' },
  { icon: '🏠', title: 'Buying Too Much House', desc: 'Just because the bank approves $500K doesn\'t mean you should spend it. Leave room in your budget for life.' },
  { icon: '⏰', title: 'Rushing the Decision', desc: 'FOMO is real in hot markets, but impulsive offers on wrong homes cost far more than waiting for the right one.' },
]

const faqs = [
  { q: 'What credit score do I need to buy a home in Florida?', a: 'FHA loans accept scores as low as 580 (3.5% down) or even 500 (10% down). Conventional loans typically require 620+. The higher your score, the better your interest rate.' },
  { q: 'How much do I need for a down payment?', a: 'It depends on your loan type. FHA: 3.5%, VA and USDA: 0%, Conventional: 3–20%. Florida assistance programs can help cover some or all of the down payment.' },
  { q: 'What are closing costs in Florida?', a: 'Typically 2–5% of the purchase price. On a $350,000 home, expect $7,000–$17,500 in closing costs including title insurance, lender fees, taxes, and prepaid items.' },
  { q: 'How long does it take to buy a home?', a: 'From pre-approval to close typically takes 30–60 days once you\'re under contract. Finding the right home can take 1–6 months depending on the market.' },
  { q: 'Do I need a real estate agent as a buyer?', a: 'In Florida, buyer\'s agent commissions are typically paid by the seller — so representation costs you nothing. Having an expert negotiate on your behalf is always wise.' },
  { q: 'What is the Hometown Heroes program?', a: 'A Florida-specific program offering up to $35,000 in down payment assistance for teachers, nurses, police, firefighters, EMTs, and other community workers. Income and purchase price limits apply.' },
]

const checklist = [
  { text: 'I have been employed for at least 2 years', key: 'employed' },
  { text: 'My credit score is 580 or higher', key: 'credit' },
  { text: 'I have 3–5% saved for a down payment', key: 'downpayment' },
  { text: 'I have 2–5% extra for closing costs', key: 'closing' },
  { text: 'My monthly debt payments are under 43% of income', key: 'debt' },
  { text: 'I plan to stay in this home for at least 3–5 years', key: 'timeline' },
  { text: 'I have 3 months of expenses as emergency savings', key: 'emergency' },
]

export default function FirstTimeBuyer() {
  const [checked, setChecked] = useState({})
  const [openFaq, setOpenFaq] = useState(null)

  useEffect(() => {
    document.title = 'First-Time Home Buyer Guide Florida | Programs & Grants | Virtus Realty Group'
    const meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute('content', 'Complete guide to first-time home buyer programs in Florida including FHA, Hometown Heroes, Florida Assist, and VA loans. Get expert help from Virtus Realty Group.')
  }, [])

  const checkedCount = Object.values(checked).filter(Boolean).length
  const readyScore = Math.round((checkedCount / checklist.length) * 100)

  return (
    <div className="font-sans">
      {/* HERO */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0a101d 0%, #141e31 50%, #0d1626 100%)' }}>
        <div className="absolute inset-0 opacity-10">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="absolute rounded-full animate-pulse"
              style={{ left: `${Math.random()*100}%`, top: `${Math.random()*100}%`, width: 4+i%8, height: 4+i%8, background: '#b49750', animationDelay: `${i*200}ms` }} />
          ))}
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-28 text-center">
          {/* Breadcrumb */}
          <nav className="flex items-center justify-center gap-2 text-sm text-white/60 mb-8">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>›</span>
            <Link to="/listings" className="hover:text-white transition-colors">Buy</Link>
            <span>›</span>
            <span className="text-white/90 font-medium">First-Time Buyer Guide</span>
          </nav>
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-5 py-2 text-white/90 text-sm font-medium mb-8">
            <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
            Florida First-Time Buyer Programs · Down Payment Assistance Available
          </div>
          <h1 className="font-display text-5xl md:text-6xl font-extrabold text-white leading-tight mb-6">
            Your Guide to Buying Your
            <span className="block" style={{ color: '#b49750' }}>First Home in Florida</span>
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed">
            We make homeownership accessible. From 0% down VA loans to $35,000 in assistance for community heroes — discover every program available to you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-sm shadow-xl hover:shadow-yellow-500/30 transform hover:-translate-y-0.5 transition-all duration-200"
              style={{ background: 'linear-gradient(135deg, #b49750, #d4b96a)', color: '#141e31' }}>
              🏠 Talk to Our Team
            </Link>
            <Link to="/mortgage-calculator" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-sm bg-white/10 border border-white/25 text-white hover:bg-white/20 transition-all duration-200">
              🧮 Calculate Your Payment
            </Link>
          </div>
          <div className="mt-12 flex flex-wrap justify-center gap-8">
            {[['6,600+', 'Monthly Searches'], ['$35K', 'Max Assistance'], ['0%', 'Down (VA/USDA)']].map(([val, label]) => (
              <div key={label} className="text-center">
                <div className="font-display text-3xl font-bold" style={{ color: '#b49750' }}>{val}</div>
                <div className="text-white/60 text-xs uppercase tracking-wider mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROGRAMS */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateIn>
            <div className="text-center mb-16">
              <span className="text-yellow-600 font-semibold text-sm uppercase tracking-widest">Florida Programs</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold mt-3" style={{ color: '#141e31' }}>
                First-Time Buyer Programs in Florida
              </h2>
              <p className="text-gray-500 text-lg mt-4 max-w-2xl mx-auto">
                Florida offers more assistance than most states. Here are the programs that could save you tens of thousands.
              </p>
            </div>
          </AnimateIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.map((p, i) => (
              <AnimateIn key={p.title} delay={i * 80}>
                <Link to={p.slug} className="group relative p-7 rounded-2xl border border-gray-100 hover:border-yellow-300 hover:shadow-xl transition-all duration-300 bg-white h-full flex flex-col">
                  <div className="absolute top-4 right-4">
                    <span className="text-xs font-semibold px-2 py-1 rounded-full" style={{ background: '#141e31', color: '#b49750' }}>{p.tag}</span>
                  </div>
                  <div className="text-4xl mb-4">{p.icon}</div>
                  <h3 className="font-display text-xl font-bold mb-1" style={{ color: '#141e31' }}>{p.title}</h3>
                  <div className="text-sm font-semibold mb-3" style={{ color: '#b49750' }}>{p.down}</div>
                  <p className="text-gray-600 text-sm leading-relaxed flex-grow">{p.desc}</p>
                  <div className="mt-4 text-xs font-semibold flex items-center gap-1 group-hover:gap-2 transition-all" style={{ color: '#b49750' }}>
                    Learn More →
                  </div>
                </Link>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-24" style={{ background: 'linear-gradient(135deg, #0d1626 0%, #141e31 100%)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateIn>
            <div className="text-center mb-16">
              <span className="font-semibold text-sm uppercase tracking-widest" style={{ color: '#b49750' }}>Step-by-Step</span>
              <h2 className="font-display text-4xl font-bold text-white mt-3">Your Path to Homeownership</h2>
              <p className="text-white/60 text-lg mt-4">Six clear steps from renter to homeowner.</p>
            </div>
          </AnimateIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {processSteps.map((step, i) => (
              <AnimateIn key={step.num} delay={i * 100}>
                <div className="relative p-6 rounded-2xl border border-white/10 hover:border-yellow-400/40 transition-all duration-300"
                  style={{ background: 'rgba(255,255,255,0.05)' }}>
                  <div className="absolute top-4 right-4">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                      style={{ background: '#b49750', color: '#141e31' }}>{step.num}</div>
                  </div>
                  <div className="text-3xl mb-3">{step.icon}</div>
                  <h3 className="font-display text-lg font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* COST BREAKDOWN */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateIn>
            <div className="text-center mb-16">
              <span className="text-yellow-600 font-semibold text-sm uppercase tracking-widest">Financial Planning</span>
              <h2 className="font-display text-4xl font-bold mt-3" style={{ color: '#141e31' }}>What to Budget For</h2>
              <p className="text-gray-500 text-lg mt-4">No surprises — here's the full cost picture for a $350,000 home in Florida.</p>
            </div>
          </AnimateIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { icon: '🏦', title: 'Down Payment', range: '$0 – $70,000', detail: '0% (VA/USDA) · 3.5% FHA · 5–20% Conventional. On a $350K home, 3.5% = $12,250.', accent: true },
              { icon: '📋', title: 'Closing Costs', range: '$7,000 – $17,500', detail: '2–5% of purchase price. Includes title insurance, lender fees, prepaid taxes/insurance, and more.' },
              { icon: '🏡', title: 'Property Taxes', range: '$3,500 – $7,000/yr', detail: 'Florida averages about 1% of assessed value. Homestead exemption can reduce your taxable value by up to $50,000.' },
              { icon: '🛡️', title: 'Homeowners Insurance', range: '$2,400 – $5,000/yr', detail: 'Florida rates are higher due to hurricane risk. Shop multiple carriers. Flood insurance may be required separately.' },
              { icon: '🏘️', title: 'HOA Fees', range: '$0 – $800/mo', detail: 'Condos and planned communities often have HOA fees. Confirm these BEFORE making an offer.' },
              { icon: '🔧', title: 'Maintenance Reserve', range: '1% of value/yr', detail: 'Budget 1% of your home\'s value per year for maintenance — about $3,500/yr on a $350K home.' },
            ].map((item, i) => (
              <AnimateIn key={item.title} delay={i * 70}>
                <div className={`p-6 rounded-2xl border transition-all duration-300 ${item.accent ? 'border-yellow-300 shadow-lg' : 'border-gray-200'} bg-white`}>
                  <div className="flex items-start gap-4">
                    <div className="text-3xl">{item.icon}</div>
                    <div>
                      <h3 className="font-display text-lg font-bold" style={{ color: '#141e31' }}>{item.title}</h3>
                      <div className="text-lg font-bold my-1" style={{ color: '#b49750' }}>{item.range}</div>
                      <p className="text-gray-600 text-sm leading-relaxed">{item.detail}</p>
                    </div>
                  </div>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* AM I READY CHECKLIST */}
      <section className="py-24 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateIn>
            <div className="text-center mb-12">
              <span className="text-yellow-600 font-semibold text-sm uppercase tracking-widest">Readiness Check</span>
              <h2 className="font-display text-4xl font-bold mt-3" style={{ color: '#141e31' }}>Am I Ready to Buy?</h2>
              <p className="text-gray-500 text-lg mt-4">Check off what applies to you and see your readiness score.</p>
            </div>
          </AnimateIn>
          <AnimateIn delay={100}>
            <div className="p-8 rounded-2xl border border-gray-200 shadow-lg bg-white">
              <div className="space-y-4 mb-8">
                {checklist.map((item) => (
                  <label key={item.key} className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 hover:border-yellow-200 cursor-pointer transition-all duration-200 group">
                    <div onClick={() => setChecked(c => ({ ...c, [item.key]: !c[item.key] }))}
                      className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center flex-shrink-0 transition-all duration-200 ${checked[item.key] ? 'border-transparent' : 'border-gray-300'}`}
                      style={checked[item.key] ? { background: '#b49750', borderColor: '#b49750' } : {}}>
                      {checked[item.key] && <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
                    </div>
                    <span className={`text-sm font-medium transition-colors ${checked[item.key] ? 'text-gray-800' : 'text-gray-600'}`}>{item.text}</span>
                  </label>
                ))}
              </div>
              <div className="p-6 rounded-xl text-center" style={{ background: readyScore >= 70 ? 'linear-gradient(135deg, #141e31, #1a253f)' : 'linear-gradient(135deg, #f9f9f9, #f0f0f0)' }}>
                <div className="font-display text-5xl font-bold mb-2" style={{ color: '#b49750' }}>{readyScore}%</div>
                <div className={`text-sm font-semibold ${readyScore >= 70 ? 'text-white' : 'text-gray-600'}`}>
                  {readyScore >= 86 ? '🎉 You\'re ready! Let\'s find your home.' : readyScore >= 57 ? '👍 Getting close — a few things to address.' : '📋 Let\'s build a plan to get you there.'}
                </div>
                {readyScore >= 57 && (
                  <Link to="/contact" className="inline-block mt-4 px-6 py-2 rounded-lg text-sm font-bold transition-all"
                    style={{ background: '#b49750', color: '#141e31' }}>
                    Talk to an Agent →
                  </Link>
                )}
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* COMMON MISTAKES */}
      <section className="py-24" style={{ background: 'linear-gradient(135deg, #0d1626 0%, #141e31 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateIn>
            <div className="text-center mb-16">
              <span className="font-semibold text-sm uppercase tracking-widest" style={{ color: '#b49750' }}>Avoid These</span>
              <h2 className="font-display text-4xl font-bold text-white mt-3">Common First-Time Buyer Mistakes</h2>
            </div>
          </AnimateIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {mistakes.map((m, i) => (
              <AnimateIn key={m.title} delay={i * 70}>
                <div className="p-6 rounded-2xl border border-white/10 hover:border-red-400/40 transition-all duration-300"
                  style={{ background: 'rgba(255,255,255,0.04)' }}>
                  <div className="text-3xl mb-3">{m.icon}</div>
                  <h3 className="font-semibold text-white mb-2 text-sm">{m.title}</h3>
                  <p className="text-white/55 text-xs leading-relaxed">{m.desc}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateIn>
            <div className="text-center mb-16">
              <span className="text-yellow-600 font-semibold text-sm uppercase tracking-widest">FAQ</span>
              <h2 className="font-display text-4xl font-bold mt-3" style={{ color: '#141e31' }}>Frequently Asked Questions</h2>
            </div>
          </AnimateIn>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
            '@context': 'https://schema.org', '@type': 'FAQPage',
            mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } }))
          }) }} />
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <AnimateIn key={i} delay={i * 60}>
                <div className="rounded-xl border border-gray-200 overflow-hidden bg-white">
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors">
                    <span className="font-semibold text-sm" style={{ color: '#141e31' }}>{faq.q}</span>
                    <span className="ml-4 flex-shrink-0 text-gray-400">{openFaq === i ? '−' : '+'}</span>
                  </button>
                  {openFaq === i && (
                    <div className="px-5 pb-5 text-gray-600 text-sm leading-relaxed border-t border-gray-100">{faq.a}</div>
                  )}
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20" style={{ background: 'linear-gradient(135deg, #141e31 0%, #0d1626 100%)' }}>
        <div className="max-w-3xl mx-auto px-4 text-center">
          <AnimateIn>
            <div className="w-16 h-1 mx-auto mb-8 rounded-full" style={{ background: 'linear-gradient(90deg, #b49750, #d4b96a)' }} />
            <h2 className="font-display text-4xl font-bold text-white mb-4">Ready to Start Your Journey?</h2>
            <p className="text-white/70 text-lg mb-10 max-w-xl mx-auto">
              Our team specializes in first-time buyers. We'll walk you through every program, every step, and every option — completely free.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-sm shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                style={{ background: 'linear-gradient(135deg, #b49750, #d4b96a)', color: '#141e31' }}>
                🏠 Talk to Our Team
              </Link>
              <Link to="/mortgage-calculator" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-sm bg-white/10 border border-white/25 text-white hover:bg-white/20 transition-all">
                🧮 Calculate Your Payment
              </Link>
            </div>
            <p className="mt-6 text-white/40 text-sm">Free consultation · No pressure · Florida experts</p>
          </AnimateIn>
        </div>
      </section>
    </div>
  )
}
