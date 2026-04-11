import React, { useEffect, useRef, useState } from 'react'
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

const whyInvest = [
  { icon: '📈', title: 'Consistent Appreciation', desc: 'South Florida home values have appreciated 40%+ over 5 years. Limited land, endless demand from domestic and international buyers.' },
  { icon: '🚫', title: 'No State Income Tax', desc: 'Florida has no state income tax. Keep more of your rental income and capital gains — a massive advantage over other states.' },
  { icon: '✈️', title: 'Tourism & Short-Term Rentals', desc: 'South Florida draws 60M+ visitors annually. STR properties in Fort Lauderdale, Miami Beach, and Boca Raton generate premium nightly rates.' },
  { icon: '🌎', title: 'International Demand', desc: 'Latin America, Canada, and Europe drive constant buyer demand — especially in Miami-Dade, Broward, and Palm Beach counties.' },
  { icon: '🏗️', title: 'Population Growth', desc: 'Florida added 365,000+ residents in 2023. New businesses, remote workers, and retirees keep driving housing demand year after year.' },
  { icon: '💼', title: 'Business-Friendly Climate', desc: 'HQ relocations to South Florida (Citadel, Blackstone, etc.) are bringing high-earning professionals who need housing. Now.' },
]

const propertyTypes = [
  { icon: '🏠', title: 'Single-Family Rentals', tag: 'Stable Cash Flow', desc: 'The bedrock of real estate investing. Long-term tenants, predictable cash flow, and full control over the property. Best for first-time investors.' },
  { icon: '🏢', title: 'Multi-Family / Duplexes', tag: 'Max Cash Flow', desc: 'Own one property with 2–4 units. Live in one, rent the others — or rent all units. Miami-Dade duplexes are particularly in-demand (1,300 monthly searches).' },
  { icon: '🏙️', title: 'Condos (STR)', tag: 'High Yield', desc: 'Select condos allow short-term rentals. Fort Lauderdale Beach and Miami Beach condos can generate $4K–$10K/month in peak season.' },
  { icon: '🔨', title: 'Fix & Flip', tag: 'Quick Returns', desc: 'Buy distressed properties, renovate, and sell at a premium. Broward County\'s aging housing stock offers consistent flip opportunities.' },
  { icon: '🏗️', title: 'New Construction', tag: 'Appreciation Play', desc: 'Buy pre-construction or new builds with builders\' warranties, modern finishes, and appreciation built in before completion.' },
  { icon: '🏬', title: 'Commercial / Mixed-Use', tag: 'Diversification', desc: 'Strip centers, office conversions, and mixed-use properties for the more experienced investor looking to diversify beyond residential.' },
]

const stats = [
  { value: '$620K', label: 'Median SF Home Price', sub: 'Miami-Dade County 2026' },
  { value: '6.8%', label: 'Avg Cap Rate', sub: 'Class B/C SFR portfolios' },
  { value: '$2,800', label: 'Avg Monthly Rent', sub: 'Broward County 3BR' },
  { value: '4.2%', label: 'Annual Appreciation', sub: '5-year average, South FL' },
  { value: '95%', label: 'Occupancy Rate', sub: 'Long-term rental market' },
  { value: '0%', label: 'State Income Tax', sub: 'Florida advantage' },
]

const financing = [
  { icon: '🏦', title: 'Conventional (20–25% Down)', desc: 'Standard investment property loans. Rates slightly above primary residence. Best credit and lowest costs for stable assets.' },
  { icon: '📊', title: 'DSCR Loans', desc: 'Debt Service Coverage Ratio loans qualify based on rental income — not personal income. Perfect for self-employed investors or those with complex financials.' },
  { icon: '💼', title: 'Portfolio Lending', desc: 'Banks hold these loans in-house, offering more flexibility for investors with multiple properties or non-standard deals.' },
  { icon: '⚡', title: 'Hard Money / Bridge', desc: 'Short-term, fast-close loans for fix-and-flip or time-sensitive acquisitions. Higher rates, but speed and flexibility are the point.' },
]

const hotAreas = [
  { area: 'Miami Beach / Surfside', slug: 'miami-beach', yield: '5–8% STR yield', why: 'Global tourism, premium nightly rates, strong appreciation' },
  { area: 'Fort Lauderdale Beach', slug: 'fort-lauderdale', yield: '6–9% STR yield', why: 'Boating capital of the world, spring break, year-round demand' },
  { area: 'Hollywood / Hallandale', slug: 'hollywood', yield: '6–8% gross yield', why: 'Undervalued with rapid appreciation, near two airports' },
  { area: 'Brickell / Edgewater', slug: 'brickell', yield: '4–6% cap rate', why: 'Tech & finance hub, institutional demand, global renters' },
  { area: 'West Palm Beach', slug: 'west-palm-beach', yield: '5–7% cap rate', why: 'Rapid population growth, Palm Beach spillover demand' },
  { area: 'Homestead / SW Dade', slug: 'homestead', yield: '7–9% cap rate', why: 'Workforce housing demand, lower entry prices, strong yields' },
]

export default function Investment() {
  const [price, setPrice] = useState(400000)
  const [rent, setRent] = useState(2800)
  const [expenses, setExpenses] = useState(800)
  const [downPct, setDownPct] = useState(25)

  const downAmt = price * (downPct / 100)
  const monthlyNet = rent - expenses
  const annualNOI = monthlyNet * 12
  const capRate = ((annualNOI / price) * 100).toFixed(2)
  const cashFlow = annualNOI
  const coc = ((cashFlow / downAmt) * 100).toFixed(2)

  useEffect(() => {
    document.title = 'Investment Properties South Florida | Duplexes, Rentals & ROI | Virtus Realty Group'
    const meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute('content', 'South Florida investment properties including duplexes, single-family rentals, condos and new construction. ROI calculator + expert investor guidance from Virtus Realty.')
  }, [])

  return (
    <div className="font-sans">
      {/* HERO */}
      <section className="relative min-h-[65vh] flex items-center justify-center overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0a101d 0%, #141e31 60%, #0d1626 100%)' }}>
        <div className="absolute inset-0 opacity-10">
          {[...Array(18)].map((_, i) => (
            <div key={i} className="absolute rounded-full animate-pulse"
              style={{ left: `${(i*9)%100}%`, top: `${(i*14)%100}%`, width: 3+i%8, height: 3+i%8, background: '#b49750', animationDelay: `${i*220}ms` }} />
          ))}
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-28 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-5 py-2 text-white/90 text-sm font-medium mb-8">
            <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
            Miami-Dade · Broward · Palm Beach · No State Income Tax
          </div>
          <h1 className="font-display text-5xl md:text-6xl font-extrabold text-white leading-tight mb-6">
            South Florida
            <span className="block" style={{ color: '#b49750' }}>Investment Properties</span>
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed">
            Build wealth in one of America's most dynamic real estate markets. No state income tax, strong rental demand, and consistent appreciation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/financing" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-sm shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
              style={{ background: 'linear-gradient(135deg, #b49750, #d4b96a)', color: '#141e31' }}>
              💼 Get Pre-Qualified for Investing
            </Link>
            <Link to="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-sm bg-white/10 border border-white/25 text-white hover:bg-white/20 transition-all">
              🤝 Talk to Our Investment Team
            </Link>
          </div>
          <div className="mt-12 flex flex-wrap justify-center gap-8">
            {[['6.8%', 'Avg Cap Rate'], ['95%', 'Occupancy Rate'], ['0%', 'State Income Tax']].map(([val, label]) => (
              <div key={label} className="text-center">
                <div className="font-display text-3xl font-bold" style={{ color: '#b49750' }}>{val}</div>
                <div className="text-white/60 text-xs uppercase tracking-wider mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY SOUTH FLORIDA */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateIn>
            <div className="text-center mb-16">
              <span className="text-yellow-600 font-semibold text-sm uppercase tracking-widest">The Case for South Florida</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold mt-3" style={{ color: '#141e31' }}>
                Why Invest in South Florida?
              </h2>
              <p className="text-gray-500 text-lg mt-4 max-w-2xl mx-auto">
                Strong fundamentals. Tax advantages. Endless demand. Here's why smart investors keep buying here.
              </p>
            </div>
          </AnimateIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyInvest.map((item, i) => (
              <AnimateIn key={item.title} delay={i * 80}>
                <div className="group p-7 rounded-2xl border border-gray-100 hover:border-yellow-300 hover:shadow-xl transition-all duration-300 h-full bg-gradient-to-br from-white to-gray-50/50">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="font-display text-xl font-bold mb-3" style={{ color: '#141e31' }}>{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* PROPERTY TYPES */}
      <section className="py-24" style={{ background: 'linear-gradient(135deg, #0d1626 0%, #141e31 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateIn>
            <div className="text-center mb-16">
              <span className="font-semibold text-sm uppercase tracking-widest" style={{ color: '#b49750' }}>Investment Types</span>
              <h2 className="font-display text-4xl font-bold text-white mt-3">Investment Property Types</h2>
              <p className="text-white/60 text-lg mt-4">Choose the strategy that matches your goals and risk tolerance.</p>
            </div>
          </AnimateIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {propertyTypes.map((p, i) => (
              <AnimateIn key={p.title} delay={i * 80}>
                <div className="relative p-7 rounded-2xl border border-white/10 hover:border-yellow-400/50 transition-all duration-300 h-full"
                  style={{ background: 'rgba(255,255,255,0.05)' }}>
                  <div className="absolute top-4 right-4">
                    <span className="text-xs font-semibold px-2 py-1 rounded-full" style={{ background: '#b49750', color: '#141e31' }}>{p.tag}</span>
                  </div>
                  <div className="text-4xl mb-4">{p.icon}</div>
                  <h3 className="font-display text-xl font-bold text-white mb-3">{p.title}</h3>
                  <p className="text-white/65 text-sm leading-relaxed">{p.desc}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* MARKET STATS */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateIn>
            <div className="text-center mb-16">
              <span className="text-yellow-600 font-semibold text-sm uppercase tracking-widest">Market Data</span>
              <h2 className="font-display text-4xl font-bold mt-3" style={{ color: '#141e31' }}>Key Market Statistics</h2>
              <p className="text-gray-500 text-lg mt-4">Current numbers for South Florida real estate investors.</p>
            </div>
          </AnimateIn>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {stats.map((s, i) => (
              <AnimateIn key={s.label} delay={i * 70}>
                <div className="text-center p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-lg hover:border-yellow-200 transition-all duration-300">
                  <div className="font-display text-3xl font-bold mb-1" style={{ color: '#b49750' }}>{s.value}</div>
                  <div className="text-sm font-semibold mb-1" style={{ color: '#141e31' }}>{s.label}</div>
                  <div className="text-xs text-gray-400">{s.sub}</div>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ROI CALCULATOR */}
      <section id="roi-calculator" className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateIn>
            <div className="text-center mb-12">
              <span className="text-yellow-600 font-semibold text-sm uppercase tracking-widest">ROI Calculator</span>
              <h2 className="font-display text-4xl font-bold mt-3" style={{ color: '#141e31' }}>Calculate Your Returns</h2>
              <p className="text-gray-500 text-lg mt-4">Estimate cap rate and cash-on-cash return for any investment property.</p>
            </div>
          </AnimateIn>
          <AnimateIn delay={100}>
            <div className="p-8 rounded-2xl border border-gray-200 shadow-lg bg-white">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                {[
                  { label: 'Purchase Price', value: price, set: setPrice, min: 100000, max: 3000000, step: 10000, prefix: '$', format: (v) => `$${v.toLocaleString()}` },
                  { label: 'Monthly Rent', value: rent, set: setRent, min: 500, max: 20000, step: 100, format: (v) => `$${v.toLocaleString()}/mo` },
                  { label: 'Monthly Expenses (PITI+)', value: expenses, set: setExpenses, min: 0, max: 8000, step: 50, format: (v) => `$${v.toLocaleString()}/mo` },
                  { label: 'Down Payment', value: downPct, set: setDownPct, min: 5, max: 100, step: 5, format: (v) => `${v}% ($${Math.round(price*(v/100)).toLocaleString()})` },
                ].map((field) => (
                  <div key={field.label}>
                    <label className="block text-sm font-semibold mb-2" style={{ color: '#141e31' }}>{field.label}</label>
                    <div className="text-lg font-bold mb-2" style={{ color: '#b49750' }}>{field.format(field.value)}</div>
                    <input type="range" min={field.min} max={field.max} step={field.step} value={field.value}
                      onChange={e => field.set(Number(e.target.value))}
                      className="w-full h-2 rounded-full appearance-none cursor-pointer"
                      style={{ accentColor: '#b49750' }} />
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-4 p-6 rounded-xl" style={{ background: '#141e31' }}>
                {[
                  { label: 'Cap Rate', value: `${capRate}%`, good: parseFloat(capRate) >= 5 },
                  { label: 'Annual Cash Flow', value: `$${cashFlow.toLocaleString()}`, good: cashFlow > 0 },
                  { label: 'Cash-on-Cash Return', value: `${coc}%`, good: parseFloat(coc) >= 8 },
                ].map((result) => (
                  <div key={result.label} className="text-center">
                    <div className="font-display text-2xl font-bold mb-1" style={{ color: result.good ? '#b49750' : '#ff6b6b' }}>{result.value}</div>
                    <div className="text-white/60 text-xs uppercase tracking-wider">{result.label}</div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-400 text-center mt-3">Estimates only. Consult a licensed financial advisor for investment decisions.</p>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* FINANCING */}
      <section className="py-24" style={{ background: 'linear-gradient(135deg, #0d1626 0%, #141e31 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateIn>
            <div className="text-center mb-16">
              <span className="font-semibold text-sm uppercase tracking-widest" style={{ color: '#b49750' }}>Financing</span>
              <h2 className="font-display text-4xl font-bold text-white mt-3">Investment Financing Options</h2>
              <p className="text-white/60 text-lg mt-4">The right loan structure can make or break your return.</p>
            </div>
          </AnimateIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {financing.map((f, i) => (
              <AnimateIn key={f.title} delay={i * 80}>
                <div className="p-7 rounded-2xl border border-white/10 hover:border-yellow-400/40 transition-all duration-300"
                  style={{ background: 'rgba(255,255,255,0.05)' }}>
                  <div className="text-3xl mb-3">{f.icon}</div>
                  <h3 className="font-display text-xl font-bold text-white mb-3">{f.title}</h3>
                  <p className="text-white/65 text-sm leading-relaxed">{f.desc}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* HOT AREAS */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateIn>
            <div className="text-center mb-16">
              <span className="text-yellow-600 font-semibold text-sm uppercase tracking-widest">Where to Buy</span>
              <h2 className="font-display text-4xl font-bold mt-3" style={{ color: '#141e31' }}>Hot Investment Areas</h2>
              <p className="text-gray-500 text-lg mt-4">Neighborhoods with the strongest rental yields and appreciation outlook.</p>
            </div>
          </AnimateIn>
          <div className="space-y-4">
            {hotAreas.map((area, i) => (
              <AnimateIn key={area.area} delay={i * 70}>
                <Link to={`/homes-for-sale/${area.slug}`}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-xl bg-white border border-gray-100 hover:border-yellow-400/70 hover:shadow-xl hover:scale-[1.01] transition-all duration-300 cursor-pointer group block">
                  <div>
                    <span className="font-display text-lg font-bold group-hover:text-yellow-700 transition-colors duration-200" style={{ color: '#141e31' }}>{area.area}</span>
                    <p className="text-gray-500 text-sm mt-1">{area.why}</p>
                  </div>
                  <div className="mt-3 sm:mt-0 flex-shrink-0 flex items-center gap-3">
                    <span className="inline-block px-4 py-1.5 rounded-full text-sm font-bold" style={{ background: '#141e31', color: '#b49750' }}>{area.yield}</span>
                    <span className="text-yellow-600 text-sm font-semibold group-hover:translate-x-1 transition-transform duration-200">→</span>
                  </div>
                </Link>
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
            <h2 className="font-display text-4xl font-bold text-white mb-4">
              Ready to <span style={{ color: '#b49750' }}>Build Wealth in South Florida?</span>
            </h2>
            <p className="text-white/70 text-lg mb-10 max-w-xl mx-auto">
              Our investment specialists know every zip code, every cap rate, and every financing option. Let's find the right deal for your portfolio.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/financing" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-sm shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                style={{ background: 'linear-gradient(135deg, #b49750, #d4b96a)', color: '#141e31' }}>
                💼 Get Pre-Qualified for Investment Financing
              </Link>
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-sm bg-white/10 border border-white/25 text-white hover:bg-white/20 transition-all">
                🤝 Talk to Our Investment Team
              </Link>
            </div>
          </AnimateIn>
        </div>
      </section>
    </div>
  )
}
