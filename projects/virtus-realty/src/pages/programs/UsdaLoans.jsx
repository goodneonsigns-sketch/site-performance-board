import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function UsdaLoans() {
  const [openFaq, setOpenFaq] = useState(null)

  useEffect(() => {
    document.title = 'USDA Loans Florida 2025 | 0% Down Rural Home Loans | Virtus Realty Group'
    const meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute('content', 'USDA loans offer 0% down payment for eligible rural and suburban areas of Florida. Learn which areas qualify, income limits, and how to apply. Virtus Realty Group.')
  }, [])

  const steps = [
    { num: 1, title: 'Check Property Eligibility', desc: 'Use the USDA eligibility map at eligibility.sc.egov.usda.gov. Enter the property address to instantly see if it qualifies. Many suburban areas you might not expect will qualify.' },
    { num: 2, title: 'Check Household Income', desc: 'Your total household income must be ≤ 115% of the Area Median Income (AMI) for your county. Include ALL household members\' income, not just borrowers.' },
    { num: 3, title: 'Find a USDA-Approved Lender', desc: 'Not all lenders offer USDA loans. Ask Nicolas for a referral to lenders experienced with USDA in South and Central Florida.' },
    { num: 4, title: 'Submit Your Application', desc: 'Apply through your lender. USDA loans require USDA Rural Development approval in addition to lender underwriting — budget extra time.' },
    { num: 5, title: 'USDA Appraisal & Underwriting', desc: 'A USDA-approved appraiser evaluates the home. The file then goes to USDA Rural Development for final approval (can add 1-2 weeks).' },
    { num: 6, title: 'Close on Your Home', desc: 'Sign documents and receive your keys. The 1% guarantee fee is typically rolled into your loan — no large upfront payment needed.' },
  ]

  const faqs = [
    { q: 'How do I know if a property is in a USDA-eligible area?', a: 'Use the USDA\'s eligibility map at eligibility.sc.egov.usda.gov/eligibility/. Type in the address and it will instantly tell you if the property is in an eligible area. The boundaries are updated periodically — an area that didn\'t qualify before may qualify now.' },
    { q: 'Does "rural" mean I have to live in the middle of nowhere?', a: 'Not at all! USDA-eligible areas include many suburban communities. In Florida, western portions of Broward and Palm Beach counties, much of St. Lucie County, Okeechobee, and many areas around larger cities all qualify. Over 97% of US land area is USDA-eligible.' },
    { q: 'What income counts toward the USDA income limit?', a: 'ALL household income counts — not just the borrowers. That includes income from any adult living in the home (even if they\'re not on the loan), part-time jobs, alimony, child support, rental income, etc. This is different from most other loan programs.' },
    { q: 'Can I use a USDA loan to buy a home that needs repairs?', a: 'The standard USDA Guaranteed loan requires the home to be in decent condition. However, USDA also offers a Section 504 Home Repair program and renovation loan options. Ask your lender about USDA construction/renovation products.' },
    { q: 'How long does USDA loan approval take?', a: 'Longer than conventional loans. After lender approval, the file goes to USDA Rural Development for final sign-off — this typically adds 1-2 weeks. Budget 45-60 days total from application to close, sometimes longer in high-volume periods.' },
  ]

  const eligibleAreas = [
    { area: 'Western Broward County', examples: 'Parts of Weston, Southwest Ranches, Dade City outskirts' },
    { area: 'Western Palm Beach County', examples: 'Belle Glade, Pahokee, South Bay, Loxahatchee' },
    { area: 'St. Lucie County', examples: 'Port St. Lucie western areas, Fort Pierce suburban/rural' },
    { area: 'Okeechobee County', examples: 'Most of Okeechobee County qualifies' },
    { area: 'Martin County', examples: 'Many areas outside Stuart metro' },
    { area: 'Highlands County', examples: 'Sebring and surrounding communities' },
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
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 60% 60%, #b49750 0%, transparent 50%)' }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-white/80 text-xs font-medium mb-6">
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#b49750' }} />
                Rural & Suburban Areas of Florida
              </div>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4">
                USDA Loans
              </h1>
              <p className="text-white/70 text-lg mb-8 leading-relaxed">
                Backed by the U.S. Department of Agriculture, USDA loans offer zero down payment for eligible rural and suburban properties in Florida. Many people are surprised how many Florida areas qualify — including suburbs of major cities.
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
                  { label: 'Down Payment', value: '0%', sub: 'no down payment required' },
                  { label: 'Upfront Guarantee Fee', value: '1%', sub: 'can be rolled into loan' },
                  { label: 'Annual Fee', value: '0.35%', sub: 'of outstanding balance' },
                  { label: 'Preferred Credit Score', value: '640+', sub: 'some lenders accept 580' },
                  { label: 'Income Limit', value: '115% AMI', sub: 'all household income counts' },
                  { label: 'Area Requirement', value: 'USDA Zone', sub: 'check USDA eligibility map' },
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

      {/* ELIGIBLE AREAS */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#b49750' }}>Where You Can Buy</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mt-2" style={{ color: '#141e31' }}>USDA-Eligible Areas in Florida</h2>
            <p className="text-gray-500 mt-3 max-w-2xl mx-auto">Eligible areas aren't just farmland. Many suburban communities around major Florida cities qualify — you may be surprised.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {eligibleAreas.map(area => (
              <div key={area.area} className="p-5 rounded-xl border border-gray-100 hover:border-yellow-200 hover:shadow-md transition-all duration-200">
                <div className="text-xl mb-2">📍</div>
                <div className="font-semibold text-sm mb-1" style={{ color: '#141e31' }}>{area.area}</div>
                <div className="text-gray-500 text-xs leading-relaxed">{area.examples}</div>
              </div>
            ))}
          </div>
          {/* USDA Map CTA */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-8 text-center">
            <div className="text-4xl mb-4">🗺️</div>
            <h3 className="font-display text-xl font-bold mb-3" style={{ color: '#141e31' }}>Check Your Property's Eligibility</h3>
            <p className="text-gray-600 text-sm mb-5 max-w-md mx-auto">Use the official USDA eligibility map to check any Florida address instantly. Just enter the address and get an immediate answer.</p>
            <a href="https://eligibility.sc.egov.usda.gov/eligibility/" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-xl font-bold text-sm text-white shadow-lg transition-all hover:-translate-y-0.5"
              style={{ background: '#141e31' }}>
              🌐 Open USDA Eligibility Map
            </a>
          </div>
        </div>
      </section>

      {/* ELIGIBILITY */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#b49750' }}>Do You Qualify?</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mt-2" style={{ color: '#141e31' }}>USDA Loan Eligibility Requirements</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4 mb-10">
            {[
              { check: true, title: 'Property in USDA-Eligible Area', desc: 'The most important qualifier. Check USDA\'s map before falling in love with a property.' },
              { check: true, title: 'Household Income ≤ 115% AMI', desc: 'ALL household member income counts — not just loan borrowers. This is a key distinction.' },
              { check: true, title: 'Primary Residence Only', desc: 'Must be your primary home. No investment or vacation properties.' },
              { check: true, title: 'US Citizen or Permanent Resident', desc: 'Must be a US citizen, US non-citizen national, or qualified alien.' },
              { check: true, title: 'Credit Score 640+', desc: 'Preferred by most USDA-approved lenders. Some accept 580 with compensating factors.' },
              { check: true, title: 'Stable Income & Employment', desc: 'Consistent employment history. Self-employed borrowers need 2 years of tax returns.' },
              { check: false, title: 'Cannot Own Adequate Housing', desc: 'Cannot currently own a home that is adequate, sanitary, or safely habitable.' },
              { check: true, title: 'Ability to Afford Payments', desc: 'Monthly housing costs should not exceed 29% of gross income (total debt ≤ 41%).' },
            ].map(item => (
              <div key={item.title} className="flex gap-3 p-5 rounded-xl border border-gray-200 bg-white hover:border-yellow-200 hover:shadow-md transition-all duration-200">
                <div className="text-xl mt-0.5 flex-shrink-0">{item.check ? '✅' : '⚠️'}</div>
                <div>
                  <div className="font-semibold text-sm mb-1" style={{ color: '#141e31' }}>{item.title}</div>
                  <div className="text-gray-500 text-xs leading-relaxed">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Income Limits */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
            <h3 className="font-display text-xl font-bold mb-2" style={{ color: '#141e31' }}>Income Limits — 115% AMI (Approximate 2025)</h3>
            <p className="text-gray-500 text-sm mb-6">Remember: ALL household income counts, not just borrower income.</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-3 pr-4 font-semibold text-gray-700">County</th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-700">1-4 Person</th>
                    <th className="text-right py-3 font-semibold text-gray-700">5-8 Person</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Broward County', '~$110,650', '~$146,050'],
                    ['Miami-Dade County', '~$103,350', '~$136,400'],
                    ['Palm Beach County', '~$110,650', '~$146,050'],
                    ['St. Lucie County', '~$89,700', '~$118,400'],
                    ['Okeechobee County', '~$82,600', '~$109,050'],
                    ['Highlands County', '~$82,600', '~$109,050'],
                  ].map(([county, four, eight]) => (
                    <tr key={county} className="border-b border-gray-100">
                      <td className="py-3 pr-4 text-gray-700">{county}</td>
                      <td className="py-3 px-4 text-right font-medium" style={{ color: '#141e31' }}>{four}</td>
                      <td className="py-3 text-right font-medium" style={{ color: '#141e31' }}>{eight}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-gray-400 text-xs mt-3">Verify at <a href="https://www.rd.usda.gov/programs-services/single-family-housing-programs" target="_blank" rel="noopener noreferrer" className="underline hover:text-yellow-700">USDA Rural Development</a>. Limits update annually.</p>
          </div>

          {/* USDA Fees */}
          <div className="mt-8 grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <div className="text-3xl mb-3">💰</div>
              <h3 className="font-display text-lg font-bold mb-2" style={{ color: '#141e31' }}>Upfront Guarantee Fee</h3>
              <div className="text-4xl font-bold my-2" style={{ color: '#b49750' }}>1%</div>
              <p className="text-gray-600 text-sm">Of the loan amount. On a $300,000 loan = $3,000. Typically rolled into your loan — no out-of-pocket cost.</p>
            </div>
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <div className="text-3xl mb-3">📅</div>
              <h3 className="font-display text-lg font-bold mb-2" style={{ color: '#141e31' }}>Annual Fee</h3>
              <div className="text-4xl font-bold my-2" style={{ color: '#b49750' }}>0.35%</div>
              <p className="text-gray-600 text-sm">Of outstanding loan balance, paid monthly. On a $300,000 loan ≈ $87.50/month. Much lower than FHA or conventional PMI.</p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW TO APPLY */}
      <section className="py-20" style={{ background: 'linear-gradient(135deg, #0d1626 0%, #141e31 100%)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#b49750' }}>The Process</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mt-2">How to Apply for a USDA Loan</h2>
          </div>
          <div className="space-y-4">
            {steps.map(step => (
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

      {/* FAQ */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#b49750' }}>FAQ</span>
            <h2 className="font-display text-3xl font-bold mt-2" style={{ color: '#141e31' }}>USDA Loan Questions Answered</h2>
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
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">Check If Your Area Qualifies Today</h2>
          <p className="text-white/70 text-lg mb-10">Nicolas can quickly verify USDA eligibility for any Florida property you're considering.</p>
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
