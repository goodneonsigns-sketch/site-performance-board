import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function FloridaAssist() {
  const [openFaq, setOpenFaq] = useState(null)

  useEffect(() => {
    document.title = 'Florida Assist Program 2025 | $10,000 Zero Interest Deferred | Virtus Realty Group'
    const meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute('content', 'Florida Assist offers $10,000 at 0% interest with no monthly payments — a deferred second mortgage for first-time buyers. Learn eligibility and how to apply with Virtus Realty Group.')
  }, [])

  const steps = [
    { num: 1, title: 'Check Income Eligibility', desc: 'Visit floridahousing.org to verify your household income falls within your county limits.' },
    { num: 2, title: 'Complete Homebuyer Education', desc: 'Complete a HUD-approved homebuyer education course (online or in person) before applying.' },
    { num: 3, title: 'Find an FL Housing Approved Lender', desc: 'Only FL Housing-approved lenders offer this program. Ask Nicolas for a trusted referral in South Florida.' },
    { num: 4, title: 'Apply for First Mortgage + FL Assist Together', desc: 'Your lender submits both loan applications simultaneously. FL Assist is a second mortgage tied to your first.' },
    { num: 5, title: 'Close on Your Home', desc: '$10,000 is applied at closing. No monthly payments ever — but remember the full balance is due if you sell or refinance.' },
  ]

  const faqs = [
    { q: 'Is Florida Assist a grant? Is it forgivable?', a: 'No. Florida Assist is NOT a grant and is NOT forgivable. It\'s a deferred second mortgage — you will need to repay the full $10,000 when you sell, refinance, transfer the deed, or stop occupying the home as your primary residence.' },
    { q: 'What\'s the difference between FL Assist and FL HLP?', a: 'Both provide $10,000. FL Assist: 0% interest, NO monthly payments, deferred until sale/refi. FL HLP: 3% interest, ~$69/month payments over 15 years. FL Assist is generally better if you plan to stay long-term; FL HLP means smaller balance shock if you sell early.' },
    { q: 'Does FL Assist have a time limit or forgiveness schedule?', a: 'No forgiveness schedule. The full $10,000 is due whenever a repayment trigger occurs — there is no gradual forgiveness like some other programs offer. This makes it truly "deferred" rather than forgivable.' },
    { q: 'Can FL Assist be combined with Hometown Heroes?', a: 'No — FL Assist and Hometown Heroes cannot be combined. However, FL Assist can be paired with other Florida Housing first mortgage products. Ask your lender about the best combination for your situation.' },
    { q: 'What purchase price limits apply?', a: 'Purchase price limits apply and vary by county. In South Florida, limits are generally $680,000+. Your FL Housing-approved lender will confirm current limits for your specific county.' },
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
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 80% 30%, #b49750 0%, transparent 50%)' }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-white/80 text-xs font-medium mb-6">
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#b49750' }} />
                Down Payment Help · No Monthly Payments
              </div>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4">
                Florida Assist
              </h1>
              <p className="text-white/70 text-lg mb-8 leading-relaxed">
                Florida Assist provides $10,000 toward your down payment and closing costs at 0% interest — with absolutely no monthly payments. It's a silent second mortgage that sits quietly behind your first mortgage until you sell or refinance.
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
                  { label: 'Interest Rate', value: '0%', sub: 'no interest ever' },
                  { label: 'Monthly Payments', value: 'None', sub: 'fully deferred' },
                  { label: 'Minimum Credit Score', value: '640', sub: 'all FL Housing programs' },
                  { label: 'Repayment Trigger', value: 'Sale/Refi', sub: 'full $10K due' },
                  { label: 'Program Type', value: 'Silent 2nd', sub: 'deferred second mortgage' },
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

      {/* COMPARISON: FL ASSIST vs FL HLP */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#b49750' }}>Compare Programs</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mt-2" style={{ color: '#141e31' }}>FL Assist vs FL HLP — Which Is Right for You?</h2>
            <p className="text-gray-500 mt-3 max-w-2xl mx-auto">Both programs offer $10,000 but work very differently. Here's the breakdown.</p>
          </div>
          <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: '#141e31' }}>
                  <th className="text-left py-4 px-6 text-white font-semibold">Feature</th>
                  <th className="text-center py-4 px-6 font-bold" style={{ color: '#b49750' }}>FL Assist ✨</th>
                  <th className="text-center py-4 px-6 text-white/80 font-semibold">FL HLP</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Assistance Amount', '$10,000', '$10,000'],
                  ['Interest Rate', '0%', '3% Fixed'],
                  ['Monthly Payments', 'None', '~$69/month'],
                  ['Repayment Term', 'Deferred', '15 years'],
                  ['Due When?', 'Sale, refi, or move out', 'Monthly + on sale/refi'],
                  ['Forgivable?', 'No', 'No'],
                  ['Best For', 'Long-term homeowners', 'Buyers who may sell sooner'],
                  ['Credit Score Min', '640', '640'],
                ].map(([feature, assist, hlp], i) => (
                  <tr key={feature} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="py-4 px-6 font-medium text-gray-700">{feature}</td>
                    <td className="py-4 px-6 text-center">
                      <span className="font-semibold" style={{ color: feature === 'Monthly Payments' ? '#16a34a' : '#141e31' }}>{assist}</span>
                    </td>
                    <td className="py-4 px-6 text-center text-gray-600">{hlp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6 p-5 rounded-xl bg-blue-50 border border-blue-200">
            <div className="flex gap-3">
              <div className="text-xl flex-shrink-0">💡</div>
              <p className="text-blue-700 text-sm leading-relaxed">
                <strong>Bottom line:</strong> If you plan to stay in your home for many years, FL Assist is often the better choice — no monthly payment means lower carrying costs. If you think you might sell within 5-10 years, FL HLP spreads out repayment more gradually.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ELIGIBILITY */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#b49750' }}>Do You Qualify?</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mt-2" style={{ color: '#141e31' }}>Florida Assist Eligibility</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { check: true, title: 'First-Time Homebuyer', desc: 'Haven\'t owned a primary residence in the past 3 years.' },
              { check: true, title: 'Credit Score 640+', desc: 'Minimum 640 FICO for all Florida Housing Finance Corporation programs.' },
              { check: true, title: 'Income Within County Limits', desc: 'Household income must be within your county\'s limits. Varies by family size.' },
              { check: true, title: 'FL Housing First Mortgage Required', desc: 'Must use a Florida Housing first mortgage product — HFA Preferred or HFA Advantage.' },
              { check: true, title: 'Homebuyer Education Course', desc: 'Must complete a HUD-approved course before closing.' },
              { check: true, title: 'FL Housing Approved Lender', desc: 'Application submitted through an approved FL Housing lender.' },
              { check: true, title: 'Primary Residence Only', desc: 'Property must be your primary residence in Florida.' },
              { check: false, title: 'Not a Grant — Repayment Required', desc: 'Full $10,000 due upon sale, refinance, deed transfer, or no longer occupying as primary residence.' },
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
        </div>
      </section>

      {/* HOW TO APPLY */}
      <section className="py-20" style={{ background: 'linear-gradient(135deg, #0d1626 0%, #141e31 100%)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#b49750' }}>The Process</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mt-2">How to Apply for Florida Assist</h2>
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
            <h2 className="font-display text-3xl font-bold mt-2" style={{ color: '#141e31' }}>Florida Assist Questions Answered</h2>
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
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">Ready to Claim Your $10,000?</h2>
          <p className="text-white/70 text-lg mb-10">Let Nicolas walk you through the FL Assist application and connect you with an approved lender.</p>
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
