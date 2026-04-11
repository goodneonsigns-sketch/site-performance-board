import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function FlHlp() {
  const [openFaq, setOpenFaq] = useState(null)

  useEffect(() => {
    document.title = 'FL HLP Program Florida 2025 | $10,000 Down Payment Assistance | Virtus Realty Group'
    const meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute('content', 'Florida Homeownership Loan Program (FL HLP) offers $10,000 at 3% interest for down payment and closing costs. Eligibility, income limits, and how to apply. Virtus Realty Group.')
  }, [])

  const steps = [
    { num: 1, title: 'Check Income Eligibility', desc: 'Visit floridahousing.org to verify your household income is within your county\'s limits. Broward 1-2 person: ~$113,000.' },
    { num: 2, title: 'Complete Homebuyer Education', desc: 'Complete a HUD-approved homebuyer education course online or in person. Framework, eHome America, or a local HUD agency all qualify.' },
    { num: 3, title: 'Find an FL Housing Approved Lender', desc: 'Only Florida Housing Finance Corporation-approved lenders can offer the FL HLP. Ask Nicolas for a referral to a trusted approved lender.' },
    { num: 4, title: 'Apply for Both Loans Together', desc: 'Your lender submits your application for the first mortgage AND the FL HLP second mortgage simultaneously.' },
    { num: 5, title: 'Close on Your New Home', desc: 'At closing, your $10,000 in assistance is applied to down payment and/or closing costs. Your 15-year repayment begins.' },
  ]

  const faqs = [
    { q: 'What happens if I sell or refinance before the 15 years are up?', a: 'The remaining balance on the $10,000 FL HLP loan becomes due in full when you sell, refinance, or stop using the home as your primary residence. There is no prepayment penalty — you can pay it off early.' },
    { q: 'Can FL HLP be combined with other Florida Housing programs?', a: 'The FL HLP can be stacked with Florida Housing\'s first mortgage programs. It cannot be combined with FL Assist simultaneously — choose one second mortgage program.' },
    { q: 'Is the homebuyer education course required?', a: 'Yes, all FL Housing programs require completion of a HUD-approved homebuyer education course before closing. Online courses through Framework or eHome America typically cost $75-99 and take 6-8 hours.' },
    { q: 'What first mortgage do I need to qualify?', a: 'You must use a Florida Housing first mortgage product — typically the HFA Preferred or HFA Advantage loan. These are 30-year fixed-rate mortgages. Your FL Housing-approved lender will handle this.' },
    { q: 'What purchase price limits apply?', a: 'Purchase price limits vary by county and change annually. In South Florida, limits are generally $680,000-$750,000+ for most programs. Your lender will confirm current limits for your target county.' },
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
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #b49750 0%, transparent 50%)' }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-white/80 text-xs font-medium mb-6">
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#b49750' }} />
                Florida State Program
              </div>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4">
                FL HLP Program
              </h1>
              <p className="text-white/70 text-lg mb-8 leading-relaxed">
                The Florida Homeownership Loan Program (FL HLP), offered by the Florida Housing Finance Corporation, provides $10,000 toward your down payment and closing costs at just 3% interest — with affordable monthly payments spread over 15 years.
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
                  { label: 'Assistance Amount', value: '$10,000', sub: 'down payment + closing costs' },
                  { label: 'Interest Rate', value: '3%', sub: 'fixed rate' },
                  { label: 'Repayment Term', value: '15 Years', sub: '~$69/month' },
                  { label: 'Minimum Credit Score', value: '640', sub: 'all FL Housing programs' },
                  { label: 'Income Limit (Broward)', value: '~$113K', sub: '1-2 person household' },
                  { label: 'Program Type', value: '2nd Mortgage', sub: 'monthly payments required' },
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

      {/* HOW IT WORKS */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#b49750' }}>Understanding the Program</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mt-2" style={{ color: '#141e31' }}>How FL HLP Works</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="text-center p-8 rounded-2xl border border-gray-100 hover:border-yellow-200 hover:shadow-lg transition-all duration-300">
              <div className="text-4xl mb-4">💵</div>
              <div className="font-display text-3xl font-bold mb-2" style={{ color: '#b49750' }}>$10,000</div>
              <div className="font-semibold mb-2" style={{ color: '#141e31' }}>You Receive</div>
              <p className="text-gray-500 text-sm">Applied directly to your down payment and/or closing costs at closing.</p>
            </div>
            <div className="text-center p-8 rounded-2xl border border-gray-100 hover:border-yellow-200 hover:shadow-lg transition-all duration-300">
              <div className="text-4xl mb-4">📊</div>
              <div className="font-display text-3xl font-bold mb-2" style={{ color: '#b49750' }}>3% Fixed</div>
              <div className="font-semibold mb-2" style={{ color: '#141e31' }}>Interest Rate</div>
              <p className="text-gray-500 text-sm">Below market rate on your second mortgage. Payments begin after closing.</p>
            </div>
            <div className="text-center p-8 rounded-2xl border border-gray-100 hover:border-yellow-200 hover:shadow-lg transition-all duration-300">
              <div className="text-4xl mb-4">🗓️</div>
              <div className="font-display text-3xl font-bold mb-2" style={{ color: '#b49750' }}>~$69/mo</div>
              <div className="font-semibold mb-2" style={{ color: '#141e31' }}>Monthly Payment</div>
              <p className="text-gray-500 text-sm">15-year repayment. Due in full if you sell, refinance, or move out.</p>
            </div>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
            <div className="flex gap-4">
              <div className="text-2xl flex-shrink-0">⚠️</div>
              <div>
                <div className="font-semibold text-amber-800 mb-1">Important: Repayment Trigger</div>
                <p className="text-amber-700 text-sm leading-relaxed">
                  The FL HLP is a second mortgage — not a grant. If you <strong>sell</strong>, <strong>refinance</strong>, or <strong>no longer use the home as your primary residence</strong>, the full remaining balance becomes due immediately. Plan accordingly if you expect to move within 15 years.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ELIGIBILITY */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#b49750' }}>Do You Qualify?</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mt-2" style={{ color: '#141e31' }}>FL HLP Eligibility Requirements</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { check: true, title: 'First-Time Homebuyer', desc: 'Haven\'t owned a primary residence in the last 3 years. This is the standard definition for FL Housing programs.' },
              { check: true, title: 'Credit Score 640+', desc: 'Minimum 640 FICO score required for all Florida Housing Finance Corporation programs.' },
              { check: true, title: 'Income Within Limits', desc: 'Household income must be ≤ county limit. Broward: ~$113,000 (1-2 person), varies by family size.' },
              { check: true, title: 'Purchase Price Limits', desc: 'Home purchase price must be within county limits. Limits vary and are updated annually by FL Housing.' },
              { check: true, title: 'Primary Residence in Florida', desc: 'Must be your primary residence. Investment properties and vacation homes do not qualify.' },
              { check: true, title: 'Homebuyer Education Course', desc: 'Must complete a HUD-approved homebuyer education course before closing.' },
              { check: true, title: 'FL Housing Approved Lender', desc: 'Must obtain your first mortgage from a Florida Housing-approved lender.' },
              { check: false, title: 'Cannot Own Other Real Estate', desc: 'Cannot own other residential property at the time of closing. Investment properties are evaluated case by case.' },
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

          {/* Income Limits Table */}
          <div className="mt-10 bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
            <h3 className="font-display text-xl font-bold mb-6" style={{ color: '#141e31' }}>South Florida Income Limits (Approximate 2025)</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-3 pr-4 font-semibold text-gray-700">County</th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-700">1-2 Person</th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-700">3+ Person</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Broward County', '~$113,000', '~$130,000'],
                    ['Miami-Dade County', '~$110,000', '~$127,000'],
                    ['Palm Beach County', '~$113,000', '~$130,000'],
                    ['St. Lucie County', '~$93,000', '~$107,000'],
                  ].map(([county, two, three]) => (
                    <tr key={county} className="border-b border-gray-100">
                      <td className="py-3 pr-4 text-gray-700">{county}</td>
                      <td className="py-3 px-4 text-right font-medium" style={{ color: '#141e31' }}>{two}</td>
                      <td className="py-3 px-4 text-right font-medium" style={{ color: '#141e31' }}>{three}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-gray-400 text-xs mt-3">Limits are approximate and change annually. Verify current limits at <a href="https://www.floridahousing.org" target="_blank" rel="noopener noreferrer" className="underline hover:text-yellow-700">floridahousing.org</a>.</p>
          </div>
        </div>
      </section>

      {/* HOW TO APPLY */}
      <section className="py-20" style={{ background: 'linear-gradient(135deg, #0d1626 0%, #141e31 100%)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#b49750' }}>The Process</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mt-2">How to Apply for FL HLP</h2>
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
            <h2 className="font-display text-3xl font-bold mt-2" style={{ color: '#141e31' }}>FL HLP Questions Answered</h2>
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
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">Ready to Apply?</h2>
          <p className="text-white/70 text-lg mb-10">Nicolas will walk you through every step and connect you with an FL Housing-approved lender.</p>
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
