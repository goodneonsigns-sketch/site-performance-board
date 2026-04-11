import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function FhaLoans() {
  const [openFaq, setOpenFaq] = useState(null)

  useEffect(() => {
    document.title = 'FHA Loans Florida 2025 | 3.5% Down Payment | Virtus Realty Group'
    const meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute('content', 'Complete guide to FHA loans in Florida. Learn eligibility requirements, down payment options, mortgage insurance costs, and how to apply. Expert guidance from Virtus Realty Group.')
  }, [])

  const steps = [
    { num: 1, title: 'Check Your Credit Score', desc: 'Pull your free credit report at AnnualCreditReport.com. You need at least 580 for 3.5% down or 500 for 10% down.' },
    { num: 2, title: 'Gather Your Documents', desc: 'Collect W-2s (2 years), pay stubs (30 days), tax returns (2 years), bank statements (2-3 months), and ID.' },
    { num: 3, title: 'Find an FHA-Approved Lender', desc: 'Not all lenders offer FHA loans. Search HUD\'s lender database or ask Nicolas for a trusted referral.' },
    { num: 4, title: 'Get Pre-Approved', desc: 'Submit your documents for review. You\'ll receive a pre-approval letter showing your maximum loan amount.' },
    { num: 5, title: 'Find Your Home', desc: 'Work with your agent to find a property that meets FHA standards — must be your primary residence.' },
    { num: 6, title: 'FHA Appraisal', desc: 'An FHA-approved appraiser assesses both value and condition. The home must meet HUD\'s minimum property standards.' },
    { num: 7, title: 'Close on Your Home', desc: 'Sign final documents, pay closing costs, and receive your keys. Upfront MIP (1.75%) is typically rolled into the loan.' },
  ]

  const pros = [
    'Low 3.5% down payment requirement',
    'Accepts credit scores as low as 580',
    'Gift funds allowed for down payment',
    'Flexible debt-to-income ratios',
    'Competitive interest rates',
    'Assumable loans (buyer can take over your rate)',
  ]

  const cons = [
    'Mortgage insurance required for life of loan (>10% LTV)',
    'Upfront MIP adds 1.75% to loan amount',
    'Property must pass FHA inspection standards',
    'Loan limits cap the purchase price',
    'Only for primary residences',
    'Annual MIP increases total monthly payment',
  ]

  const faqs = [
    { q: 'Can I use an FHA loan to buy any home in Florida?', a: 'The home must be your primary residence and pass an FHA appraisal. It must meet HUD\'s minimum property standards — major structural issues, roof problems, or health/safety hazards can disqualify a property.' },
    { q: 'How long do I pay FHA mortgage insurance?', a: 'For loans with less than 10% down, you pay annual MIP for the entire life of the loan. With 10% or more down, MIP drops off after 11 years. This is a key difference from conventional PMI, which drops at 80% LTV.' },
    { q: 'Can I combine an FHA loan with Florida down payment assistance?', a: 'Yes! FHA loans work with Florida Housing programs like FL Assist and Hometown Heroes. This can dramatically reduce your out-of-pocket costs.' },
    { q: 'What is the FHA loan limit in South Florida for 2025?', a: 'In Broward, Miami-Dade, and Palm Beach counties, the 2025 FHA loan limit is $621,000 for a single-family home. Limits vary by county — check HUD\'s website for the most current figures.' },
    { q: 'Can I get an FHA loan after bankruptcy or foreclosure?', a: 'Yes, but there\'s a waiting period. Chapter 7 bankruptcy: 2 years. Chapter 13: 1 year with court permission. Foreclosure: 3 years. Extenuating circumstances may allow shorter periods.' },
  ]

  return (
    <div className="font-sans pt-20">
      {/* BACK BUTTON */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Link to="/first-time-buyer" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 hover:-translate-x-1" style={{ background: "#f0ebe0", color: "#141e31" }}>
          <span className="text-lg">←</span> Back to First-Time Buyer Guide
        </Link>
      </div>

      {/* HERO */}
      <section className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0a101d 0%, #141e31 60%, #0d1626 100%)' }}>
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #b49750 0%, transparent 50%), radial-gradient(circle at 80% 20%, #b49750 0%, transparent 40%)' }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-white/80 text-xs font-medium mb-6">
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#b49750' }} />
                Most Popular First-Time Buyer Loan
              </div>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4">
                FHA Loans
              </h1>
              <p className="text-white/70 text-lg mb-8 leading-relaxed">
                Insured by the Federal Housing Administration, FHA loans make homeownership possible with a lower bar for credit and down payment — the most popular choice for first-time buyers nationwide.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link to="/financing" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm shadow-lg transition-all duration-200 hover:-translate-y-0.5"
                  style={{ background: 'linear-gradient(135deg, #b49750, #d4b96a)', color: '#141e31' }}>
                  Get Pre-Approved
                </Link>
                <Link to="/contact" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm bg-white/10 border border-white/25 text-white hover:bg-white/20 transition-all duration-200">
                  Talk to Nicolas
                </Link>
              </div>
            </div>
            {/* Quick Facts Card */}
            <div className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-8">
              <h2 className="font-display text-lg font-bold text-white mb-6">Quick Facts</h2>
              <div className="space-y-4">
                {[
                  { label: 'Minimum Down Payment', value: '3.5%', sub: '(580+ credit score)' },
                  { label: 'Minimum Credit Score', value: '500', sub: '(10% down required)' },
                  { label: 'Upfront MIP', value: '1.75%', sub: 'of loan amount' },
                  { label: 'Annual MIP', value: '0.55%', sub: '30yr loan >95% LTV' },
                  { label: 'Max Loan (S. FL)', value: '$621,000', sub: 'Broward/Miami-Dade/Palm Beach 2025' },
                  { label: 'Max Back-End DTI', value: '43%', sub: 'exceptions up to 57%' },
                ].map(item => (
                  <div key={item.label} className="flex items-center justify-between py-3 border-b border-white/10 last:border-0">
                    <div>
                      <div className="text-white/70 text-xs">{item.label}</div>
                      <div className="text-white/50 text-xs mt-0.5">{item.sub}</div>
                    </div>
                    <div className="font-display text-2xl font-bold" style={{ color: '#b49750' }}>{item.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ELIGIBILITY */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#b49750' }}>Do You Qualify?</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mt-2" style={{ color: '#141e31' }}>FHA Loan Eligibility Requirements</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {[
              { check: true, title: 'Credit Score 580+', desc: 'Qualify for 3.5% down payment. Score of 500-579 requires 10% down.' },
              { check: true, title: '2-Year Employment History', desc: 'Steady employment in the same field for at least 2 years.' },
              { check: true, title: 'Primary Residence Only', desc: 'You must live in the home as your primary residence.' },
              { check: true, title: 'Debt-to-Income Ratio', desc: 'Front-end ≤31%, back-end ≤43%. Compensating factors can push to 57%.' },
              { check: true, title: 'FHA Appraisal', desc: 'Property must pass HUD minimum property standards — value and condition.' },
              { check: false, title: 'No Recent Bankruptcy', desc: 'Chapter 7: must be 2+ years ago. Chapter 13: 1 year with court approval.' },
              { check: false, title: 'No Recent Foreclosure', desc: 'Must be at least 3 years since any foreclosure.' },
              { check: true, title: 'Valid SSN', desc: 'Must have a Social Security number and be a lawful US resident.' },
            ].map(item => (
              <div key={item.title} className="flex gap-3 p-5 rounded-xl border border-gray-100 hover:border-yellow-200 hover:shadow-md transition-all duration-200">
                <div className={`text-xl mt-0.5 flex-shrink-0`}>{item.check ? '✅' : '⚠️'}</div>
                <div>
                  <div className="font-semibold text-sm mb-1" style={{ color: '#141e31' }}>{item.title}</div>
                  <div className="text-gray-500 text-xs leading-relaxed">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COSTS */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#b49750' }}>What It Costs</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mt-2" style={{ color: '#141e31' }}>FHA Mortgage Insurance Costs</h2>
            <p className="text-gray-500 mt-3 max-w-2xl mx-auto">FHA loans require mortgage insurance regardless of down payment. Here's exactly what you'll pay.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
              <div className="text-3xl mb-4">💰</div>
              <h3 className="font-display text-xl font-bold mb-2" style={{ color: '#141e31' }}>Upfront MIP (UFMIP)</h3>
              <div className="text-4xl font-bold my-3" style={{ color: '#b49750' }}>1.75%</div>
              <p className="text-gray-600 text-sm leading-relaxed">Of the base loan amount. On a $300,000 loan, that's $5,250. The good news: this is almost always rolled into your loan, so you don't pay it out of pocket at closing.</p>
              <div className="mt-4 p-3 rounded-lg bg-blue-50 text-blue-700 text-xs">
                Example: $300,000 loan → UFMIP = $5,250 → new loan amount = $305,250
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
              <div className="text-3xl mb-4">📅</div>
              <h3 className="font-display text-xl font-bold mb-2" style={{ color: '#141e31' }}>Annual MIP</h3>
              <div className="text-4xl font-bold my-3" style={{ color: '#b49750' }}>0.55%</div>
              <p className="text-gray-600 text-sm leading-relaxed">For 30-year loans with less than 10% down. Paid monthly as part of your payment. On a $300,000 loan, that's about $137.50/month added to your payment.</p>
              <div className="mt-4 p-3 rounded-lg bg-amber-50 text-amber-700 text-xs">
                ⚠️ With &lt;10% down, MIP lasts the LIFE of the loan. Consider refinancing once you reach 20% equity.
              </div>
            </div>
          </div>
          {/* Florida Loan Limits */}
          <div className="mt-8 bg-white rounded-2xl border border-yellow-200 p-8 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="text-3xl">🌴</div>
              <div>
                <h3 className="font-display text-xl font-bold mb-2" style={{ color: '#141e31' }}>Florida FHA Loan Limits (2025)</h3>
                <p className="text-gray-600 text-sm mb-4">FHA loan limits vary by county. South Florida has higher limits due to local home values.</p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-2 pr-4 font-semibold text-gray-700">County</th>
                        <th className="text-right py-2 font-semibold text-gray-700">1-Unit Limit</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['Broward County', '$621,000'],
                        ['Miami-Dade County', '$621,000'],
                        ['Palm Beach County', '$621,000'],
                        ['Hillsborough County', '$498,257'],
                        ['Orange County', '$498,257'],
                        ['Most Other FL Counties', '$498,257'],
                      ].map(([county, limit]) => (
                        <tr key={county} className="border-b border-gray-100">
                          <td className="py-2.5 pr-4 text-gray-700">{county}</td>
                          <td className="py-2.5 text-right font-semibold" style={{ color: '#141e31' }}>{limit}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-gray-400 text-xs mt-3">Check <a href="https://www.hud.gov" target="_blank" rel="noopener noreferrer" className="underline hover:text-yellow-700">HUD.gov</a> for current limits — they update annually.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW TO APPLY */}
      <section className="py-20" style={{ background: 'linear-gradient(135deg, #0d1626 0%, #141e31 100%)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#b49750' }}>The Process</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mt-2">How to Apply for an FHA Loan</h2>
            <p className="text-white/60 mt-3">7 steps from start to homeownership.</p>
          </div>
          <div className="space-y-4">
            {steps.map((step, i) => (
              <div key={step.num} className="flex gap-5 p-6 rounded-2xl border border-white/10 hover:border-yellow-400/30 transition-all duration-200" style={{ background: 'rgba(255,255,255,0.05)' }}>
                <div className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center font-bold text-sm" style={{ background: '#b49750', color: '#141e31' }}>
                  {step.num}
                </div>
                <div>
                  <div className="font-display font-bold text-white mb-1">{step.title}</div>
                  <div className="text-white/60 text-sm leading-relaxed">{step.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROS & CONS */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#b49750' }}>Weigh Your Options</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mt-2" style={{ color: '#141e31' }}>FHA Loan Pros & Cons</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-50 rounded-2xl border border-green-200 p-8">
              <h3 className="font-display text-xl font-bold text-green-800 mb-6 flex items-center gap-2">✅ Advantages</h3>
              <ul className="space-y-3">
                {pros.map(pro => (
                  <li key={pro} className="flex gap-3 text-sm text-green-800">
                    <span className="mt-0.5 flex-shrink-0">→</span>
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-red-50 rounded-2xl border border-red-200 p-8">
              <h3 className="font-display text-xl font-bold text-red-800 mb-6 flex items-center gap-2">⚠️ Disadvantages</h3>
              <ul className="space-y-3">
                {cons.map(con => (
                  <li key={con} className="flex gap-3 text-sm text-red-800">
                    <span className="mt-0.5 flex-shrink-0">→</span>
                    <span>{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#b49750' }}>FAQ</span>
            <h2 className="font-display text-3xl font-bold mt-2" style={{ color: '#141e31' }}>FHA Loan Questions Answered</h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="rounded-xl border border-gray-200 overflow-hidden bg-white">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors">
                  <span className="font-semibold text-sm pr-4" style={{ color: '#141e31' }}>{faq.q}</span>
                  <span className="flex-shrink-0 text-gray-400 text-lg">{openFaq === i ? '−' : '+'}</span>
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-4">{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20" style={{ background: 'linear-gradient(135deg, #141e31 0%, #0d1626 100%)' }}>
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="w-12 h-1 mx-auto mb-8 rounded-full" style={{ background: 'linear-gradient(90deg, #b49750, #d4b96a)' }} />
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">Ready to Get Pre-Approved?</h2>
          <p className="text-white/70 text-lg mb-10">Nicolas will connect you with the right FHA-approved lender and guide you through every step.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/financing" className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-bold text-sm shadow-xl transition-all duration-200 hover:-translate-y-0.5"
              style={{ background: 'linear-gradient(135deg, #b49750, #d4b96a)', color: '#141e31' }}>
              Get Pre-Approved
            </Link>
            <Link to="/contact" className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-bold text-sm bg-white/10 border border-white/25 text-white hover:bg-white/20 transition-all">
              Talk to Nicolas
            </Link>
            <Link to="/first-time-buyer" className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-bold text-sm bg-white/5 border border-white/15 text-white/70 hover:bg-white/10 transition-all">
              ← All Programs
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
