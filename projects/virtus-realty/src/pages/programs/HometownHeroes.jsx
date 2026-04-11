import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const occupations = [
  { icon: '👩‍🏫', category: 'Education', roles: ['K-12 Teachers & Paraprofessionals', 'School Counselors', 'Instructional Support Staff', 'Childcare Workers', 'Early Childhood Educators'] },
  { icon: '🏥', category: 'Healthcare', roles: ['Registered Nurses (RN)', 'Licensed Practical Nurses (LPN)', 'Nurse Practitioners', 'Paramedics & EMTs', 'Respiratory Therapists', 'Physical Therapists', 'Mental Health Counselors'] },
  { icon: '🚔', category: 'Law Enforcement', roles: ['Police Officers', 'Deputy Sheriffs', 'Correctional Officers', 'Probation Officers', 'Juvenile Justice Workers'] },
  { icon: '🚒', category: 'Fire & Emergency', roles: ['Firefighters', 'Fire Inspectors', 'Emergency Medical Technicians', 'Volunteer Firefighters (qualifying)'] },
  { icon: '🎖️', category: 'Military', roles: ['Active Duty Military', 'National Guard Members', 'Reserve Members', 'Veterans (within 12 months of separation)'] },
  { icon: '⚖️', category: 'Public Service', roles: ['Child Protective Services', 'Social Workers (government)', 'Public Defenders', 'Government Attorneys', '50+ additional eligible categories'] },
]

export default function HometownHeroes() {
  const [openFaq, setOpenFaq] = useState(null)
  const [openOcc, setOpenOcc] = useState(null)

  useEffect(() => {
    document.title = 'Hometown Heroes Program Florida 2025 | Up to $35,000 Assistance | Virtus Realty Group'
    const meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute('content', 'Florida Hometown Heroes program offers up to $35,000 in down payment assistance for teachers, nurses, police, firefighters, and other community workers. Learn eligibility and apply today.')
  }, [])

  const steps = [
    { num: 1, title: 'Verify Your Occupation', desc: 'Confirm your job is on the FL Housing eligible occupation list. If in doubt, ask your lender or contact Nicolas — the list includes 50+ categories.' },
    { num: 2, title: 'Check Household Income', desc: 'Your household income must be ≤ 150% of Area Median Income (AMI) for your county. Broward/Palm Beach: ~$161,000. Miami-Dade: ~$145,000.' },
    { num: 3, title: 'Complete Homebuyer Education', desc: 'Complete a HUD-approved homebuyer education course. Required for all FL Housing programs. Online options available.' },
    { num: 4, title: 'Find an FL Housing Approved Lender', desc: 'Must use an FL Housing-approved lender. They will process both your first mortgage and Hometown Heroes assistance simultaneously.' },
    { num: 5, title: 'Apply for First Mortgage + HTH Together', desc: 'Your lender submits both applications. Your employer will need to verify your full-time employment in an eligible occupation.' },
    { num: 6, title: 'Close on Your New Home', desc: 'Up to 5% of your loan amount (capped at $35,000) is applied at closing toward down payment and closing costs.' },
  ]

  const faqs = [
    { q: 'How is the Hometown Heroes amount calculated?', a: 'The assistance is up to 5% of your first mortgage loan amount, with a minimum of $10,000 and a maximum of $35,000. On a $300,000 loan, you\'d receive $15,000. On a $700,000 loan, the cap means you still only get $35,000.' },
    { q: 'Does Hometown Heroes need to be repaid?', a: 'Yes — it\'s a deferred second mortgage at 0% interest with no monthly payments. The full amount becomes due when you sell, refinance, transfer the deed, or stop occupying the home as your primary residence.' },
    { q: 'Can I use Hometown Heroes if I\'m a veteran AND a teacher?', a: 'Yes, you qualify under either category. You only need to meet one occupation requirement. Use whichever documentation is easiest for your lender to verify.' },
    { q: 'What if I change jobs after closing?', a: 'Your occupation is verified at the time of closing only. If you change careers after purchasing, your Hometown Heroes assistance is not affected. However, the deferral terms still apply for repayment.' },
    { q: 'Is Hometown Heroes only for first-time buyers?', a: 'The standard requirement is that you haven\'t owned a primary residence in the past 3 years. Active military members and veterans may have additional flexibility — ask your lender.' },
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
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 30% 70%, #b49750 0%, transparent 50%)' }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-white/80 text-xs font-medium mb-6">
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#b49750' }} />
                Florida's Largest Down Payment Assistance Program
              </div>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4">
                Hometown Heroes
              </h1>
              <p className="text-white/70 text-lg mb-8 leading-relaxed">
                Florida's most generous down payment assistance program — designed specifically for the community workers who keep our cities running. Teachers, nurses, police, firefighters, and 50+ other professions qualify for up to $35,000 in assistance.
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
                  { label: 'Maximum Assistance', value: '$35,000', sub: 'or 5% of loan amount' },
                  { label: 'Minimum Assistance', value: '$10,000', sub: 'floor guarantee' },
                  { label: 'Interest Rate', value: '0%', sub: 'deferred, no monthly payments' },
                  { label: 'Minimum Credit Score', value: '640', sub: 'all FL Housing programs' },
                  { label: 'Income Limit (Broward)', value: '~$161K', sub: '150% of AMI' },
                  { label: 'Employment Required', value: '35+ hrs', sub: 'full-time in eligible occupation' },
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

      {/* WHO QUALIFIES — OCCUPATIONS */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#b49750' }}>Occupation Eligibility</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mt-2" style={{ color: '#141e31' }}>Who Qualifies for Hometown Heroes?</h2>
            <p className="text-gray-500 mt-3 max-w-2xl mx-auto">Over 50 occupation categories. If you work in public service, healthcare, education, or emergency services in Florida, you likely qualify.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {occupations.map((occ, i) => (
              <div key={occ.category} className="rounded-2xl border border-gray-100 overflow-hidden hover:border-yellow-200 hover:shadow-lg transition-all duration-300">
                <button onClick={() => setOpenOcc(openOcc === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{occ.icon}</div>
                    <div className="font-display font-bold" style={{ color: '#141e31' }}>{occ.category}</div>
                  </div>
                  <span className="text-gray-400 flex-shrink-0 ml-4">{openOcc === i ? '−' : '+'}</span>
                </button>
                {openOcc === i && (
                  <div className="px-6 pb-6 border-t border-gray-100">
                    <ul className="space-y-2 mt-4">
                      {occ.roles.map(role => (
                        <li key={role} className="flex items-start gap-2 text-sm text-gray-600">
                          <span className="text-yellow-500 mt-0.5 flex-shrink-0">✓</span>
                          {role}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="mt-8 p-5 rounded-xl bg-amber-50 border border-amber-200 text-center">
            <p className="text-amber-800 text-sm">
              <strong>Not listed?</strong> The full list includes 50+ occupation categories. Contact Nicolas or your FL Housing-approved lender to verify your specific role.
            </p>
          </div>
        </div>
      </section>

      {/* ELIGIBILITY */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#b49750' }}>Full Requirements</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mt-2" style={{ color: '#141e31' }}>Hometown Heroes Eligibility</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4 mb-10">
            {[
              { check: true, title: 'Full-Time Employment (35+ hrs/week)', desc: 'Must be currently employed full-time in an eligible Florida occupation at time of application.' },
              { check: true, title: 'First-Time Buyer (or 3-Year Rule)', desc: 'Haven\'t owned a primary residence in the past 3 years. Some exceptions for active military.' },
              { check: true, title: 'Credit Score 640+', desc: 'Minimum 640 FICO for all FL Housing programs.' },
              { check: true, title: 'Income ≤ 150% AMI', desc: 'Household income within county limits. Broward/Palm Beach: ~$161K. Miami-Dade: ~$145K.' },
              { check: true, title: 'Homebuyer Education', desc: 'Must complete a HUD-approved course before closing.' },
              { check: true, title: 'FL Housing Approved Lender', desc: 'Must use an approved FL Housing lender who participates in the HTH program.' },
              { check: true, title: 'Primary Residence in Florida', desc: 'Must be your primary home. No investment properties or vacation homes.' },
              { check: true, title: 'Employer Verification', desc: 'Your employer must provide documentation verifying your full-time employment in an eligible role.' },
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
          <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
            <h3 className="font-display text-xl font-bold mb-6" style={{ color: '#141e31' }}>Income Limits — 150% AMI (Approximate 2025)</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-3 pr-4 font-semibold text-gray-700">County</th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-700">1-2 Person</th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-700">3-4 Person</th>
                    <th className="text-right py-3 font-semibold text-gray-700">5+ Person</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Broward County', '~$161,000', '~$186,000', '~$201,000'],
                    ['Miami-Dade County', '~$145,000', '~$166,500', '~$180,000'],
                    ['Palm Beach County', '~$161,000', '~$186,000', '~$201,000'],
                    ['St. Lucie County', '~$124,000', '~$142,000', '~$154,000'],
                  ].map(([county, two, four, five]) => (
                    <tr key={county} className="border-b border-gray-100">
                      <td className="py-3 pr-4 text-gray-700">{county}</td>
                      <td className="py-3 px-4 text-right font-medium" style={{ color: '#141e31' }}>{two}</td>
                      <td className="py-3 px-4 text-right font-medium" style={{ color: '#141e31' }}>{four}</td>
                      <td className="py-3 text-right font-medium" style={{ color: '#141e31' }}>{five}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-gray-400 text-xs mt-3">Verify current limits at <a href="https://www.floridahousing.org" target="_blank" rel="noopener noreferrer" className="underline hover:text-yellow-700">floridahousing.org</a>.</p>
          </div>
        </div>
      </section>

      {/* HOW TO APPLY */}
      <section className="py-20" style={{ background: 'linear-gradient(135deg, #0d1626 0%, #141e31 100%)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#b49750' }}>The Process</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mt-2">How to Apply for Hometown Heroes</h2>
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
            <h2 className="font-display text-3xl font-bold mt-2" style={{ color: '#141e31' }}>Hometown Heroes Questions Answered</h2>
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
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">You Serve Our Community — Let Us Serve You</h2>
          <p className="text-white/70 text-lg mb-10">Nicolas specializes in helping Florida's community heroes claim every dollar of assistance they've earned.</p>
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
