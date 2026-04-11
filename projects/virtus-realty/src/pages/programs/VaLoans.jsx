import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function VaLoans() {
  const [openFaq, setOpenFaq] = useState(null)

  useEffect(() => {
    document.title = 'VA Loans Florida 2025 | 0% Down for Veterans | Virtus Realty Group'
    const meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute('content', 'VA loans offer 0% down payment, no PMI, and competitive rates for veterans and active military in Florida. Learn eligibility, funding fees, and how to apply. Virtus Realty Group.')
  }, [])

  const steps = [
    { num: 1, title: 'Get Your Certificate of Eligibility (COE)', desc: 'Apply online at VA.gov, through your lender\'s VA portal, or by mail (VA Form 26-1880). Your lender can often pull it instantly online.' },
    { num: 2, title: 'Find a VA-Approved Lender', desc: 'Most major lenders participate in the VA program. Ask Nicolas for a referral to lenders with strong VA experience in Florida.' },
    { num: 3, title: 'Get Pre-Approved', desc: 'Your lender reviews income, credit, and COE to determine your purchasing power. Most want 620+ credit score (VA has no official minimum).' },
    { num: 4, title: 'Find Your Home', desc: 'Work with your agent to find a home that meets VA standards. Must be your primary residence — no investment properties.' },
    { num: 5, title: 'VA Appraisal', desc: 'A VA-assigned appraiser determines value AND inspects for Minimum Property Requirements (MPRs). More thorough than conventional appraisals.' },
    { num: 6, title: 'Close on Your Home', desc: 'Sign documents and receive your keys. The VA funding fee (if applicable) is typically rolled into the loan.' },
  ]

  const faqs = [
    { q: 'Can I use a VA loan more than once?', a: 'Yes. You can use your VA loan benefit multiple times. After paying off a previous VA loan, your entitlement is restored. You can also have multiple VA loans simultaneously if you have remaining entitlement. The funding fee is higher (3.3%) for subsequent uses.' },
    { q: 'What is the VA funding fee and who pays it?', a: 'The funding fee supports the VA loan program. First use: 2.15% for 0% down. Subsequent use: 3.3%. Disabled veterans (10%+ service-connected disability), Purple Heart recipients, and surviving spouses of veterans are EXEMPT from the funding fee.' },
    { q: 'Is there a maximum VA loan amount in Florida?', a: 'For borrowers with full entitlement (no active VA loans), there is NO loan limit. You can borrow as much as a lender will approve — and still make no down payment. If you have reduced entitlement (active VA loan), limits apply to the remaining entitlement.' },
    { q: 'What are VA Minimum Property Requirements (MPRs)?', a: 'The VA requires the home to be safe, structurally sound, and sanitary. Issues like significant roof damage, exposed wiring, lack of working utilities, or major structural problems can disqualify a property. The seller can be required to fix these before closing.' },
    { q: 'Can surviving spouses use VA loan benefits?', a: 'Yes. Un-remarried surviving spouses of service members who died in the line of duty or from a service-connected disability are eligible for the VA home loan benefit — and are also exempt from the funding fee.' },
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
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 70% 30%, #b49750 0%, transparent 45%)' }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-white/80 text-xs font-medium mb-6">
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#b49750' }} />
                For Veterans, Active Military & Surviving Spouses
              </div>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4">
                VA Loans
              </h1>
              <p className="text-white/70 text-lg mb-8 leading-relaxed">
                Guaranteed by the U.S. Department of Veterans Affairs, VA loans are the most powerful home loan benefit available — zero down payment, no private mortgage insurance, and rates typically 0.5–1% lower than conventional loans. A thank-you for your service.
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
                  { label: 'PMI Required', value: 'None', sub: 'ever — a major savings' },
                  { label: 'Rate Advantage', value: '0.5–1%', sub: 'lower than conventional' },
                  { label: 'VA Minimum Credit', value: 'None', sub: 'lenders typically want 620+' },
                  { label: 'Funding Fee (1st use)', value: '2.15%', sub: 'can be rolled into loan' },
                  { label: 'Loan Limit (FL)', value: 'Unlimited', sub: 'for full entitlement borrowers' },
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

      {/* WHO QUALIFIES */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#b49750' }}>Service Requirements</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mt-2" style={{ color: '#141e31' }}>Who Is Eligible for a VA Loan?</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: '⚔️', title: 'Active Duty', reqs: ['90+ consecutive days during wartime', '181+ days during peacetime', 'Currently serving is fine'] },
              { icon: '🎖️', title: 'Veterans', reqs: ['Met minimum service requirements', 'Honorable or other than honorable discharge', 'Served in any branch'] },
              { icon: '🛡️', title: 'National Guard & Reserves', reqs: ['6+ years of service', 'OR 90+ days active duty', 'Honorable discharge or still serving'] },
              { icon: '🕊️', title: 'Surviving Spouses', reqs: ['Spouse died in service', 'OR from service-connected disability', 'Un-remarried (some exceptions)'] },
            ].map(cat => (
              <div key={cat.title} className="p-6 rounded-2xl border border-gray-100 hover:border-yellow-200 hover:shadow-lg transition-all duration-300">
                <div className="text-4xl mb-4">{cat.icon}</div>
                <h3 className="font-display font-bold text-lg mb-4" style={{ color: '#141e31' }}>{cat.title}</h3>
                <ul className="space-y-2">
                  {cat.reqs.map(req => (
                    <li key={req} className="flex gap-2 text-sm text-gray-600">
                      <span className="text-yellow-500 flex-shrink-0 mt-0.5">✓</span>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ELIGIBILITY & FUNDING FEE */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-10">
            {/* Eligibility Requirements */}
            <div>
              <div className="mb-8">
                <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#b49750' }}>Requirements</span>
                <h2 className="font-display text-2xl md:text-3xl font-bold mt-2" style={{ color: '#141e31' }}>Eligibility Requirements</h2>
              </div>
              <div className="space-y-4">
                {[
                  { check: true, title: 'Certificate of Eligibility (COE)', desc: 'Obtain from VA.gov, through your lender, or by mail. Most lenders can pull it online in minutes.' },
                  { check: true, title: 'Credit Score (Lender Requirement)', desc: 'VA has no official minimum, but most lenders require 620+. Some VA specialists accept 580.' },
                  { check: true, title: 'Sufficient Income', desc: 'Must have enough income to cover the mortgage plus living expenses. VA uses a residual income test.' },
                  { check: true, title: 'Primary Residence', desc: 'Must be your primary home. Cannot use VA loans for investment properties or vacation homes.' },
                  { check: true, title: 'VA Appraisal', desc: 'Required and stricter than conventional — checks both value and Minimum Property Requirements.' },
                  { check: false, title: 'Occupancy Required', desc: 'Must occupy within 60 days of closing in most cases. Extensions possible for active duty.' },
                ].map(item => (
                  <div key={item.title} className="flex gap-3 p-4 rounded-xl border border-gray-200 bg-white">
                    <div className="text-lg mt-0.5 flex-shrink-0">{item.check ? '✅' : '⚠️'}</div>
                    <div>
                      <div className="font-semibold text-sm mb-1" style={{ color: '#141e31' }}>{item.title}</div>
                      <div className="text-gray-500 text-xs leading-relaxed">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Funding Fee */}
            <div>
              <div className="mb-8">
                <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#b49750' }}>VA Funding Fee</span>
                <h2 className="font-display text-2xl md:text-3xl font-bold mt-2" style={{ color: '#141e31' }}>VA Funding Fee Breakdown</h2>
              </div>
              <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ background: '#141e31' }}>
                      <th className="text-left py-3 px-5 text-white font-semibold">Scenario</th>
                      <th className="text-right py-3 px-5 font-bold" style={{ color: '#b49750' }}>Fee</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['First use, 0% down', '2.15%'],
                      ['First use, 5–9.99% down', '1.50%'],
                      ['First use, 10%+ down', '1.25%'],
                      ['Subsequent use, 0% down', '3.30%'],
                      ['Subsequent use, 5%+ down', '1.50–1.25%'],
                    ].map(([scenario, fee], i) => (
                      <tr key={scenario} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="py-3 px-5 text-gray-700">{scenario}</td>
                        <td className="py-3 px-5 text-right font-bold" style={{ color: '#141e31' }}>{fee}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 p-4 rounded-xl bg-green-50 border border-green-200">
                <div className="font-semibold text-green-800 text-sm mb-1">🎖️ Funding Fee Exemptions</div>
                <ul className="space-y-1">
                  {[
                    'Veterans with 10%+ service-connected disability',
                    'Purple Heart recipients (active duty)',
                    'Surviving spouses receiving DIC',
                    'Retired service members with service-connected disability',
                  ].map(item => (
                    <li key={item} className="text-green-700 text-xs flex gap-2">
                      <span className="flex-shrink-0">✓</span>{item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-4 p-4 rounded-xl bg-blue-50 border border-blue-200">
                <p className="text-blue-700 text-xs leading-relaxed">
                  <strong>Good news:</strong> The funding fee can be rolled into your loan amount — no out-of-pocket payment at closing required.
                </p>
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
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mt-2">How to Apply for a VA Loan</h2>
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
            <h2 className="font-display text-3xl font-bold mt-2" style={{ color: '#141e31' }}>VA Loan Questions Answered</h2>
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
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">You've Earned This Benefit — Use It</h2>
          <p className="text-white/70 text-lg mb-10">Nicolas has extensive experience helping veterans navigate the VA loan process in South Florida.</p>
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
