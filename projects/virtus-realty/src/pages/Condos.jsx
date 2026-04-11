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

const reasons = [
  { icon: '🌊', title: 'Lifestyle & Location', desc: 'Live steps from the beach, marina, or city center. South Florida condos put the best of life within walking distance.' },
  { icon: '🏊', title: 'Resort Amenities', desc: 'Pools, gyms, rooftop terraces, concierge services, and valet — all without the hassle of maintaining them yourself.' },
  { icon: '📈', title: 'Investment Potential', desc: 'South Florida condos appreciate steadily. Many allow short-term rentals (Airbnb), generating strong returns.' },
  { icon: '🔒', title: 'Security & Peace of Mind', desc: 'Gated buildings, 24/7 security, and secure parking. Lock and leave when you travel.' },
  { icon: '💰', title: 'Lower Entry Price', desc: 'Condos offer lower price points than single-family homes in the same neighborhoods — great for first-time buyers and investors.' },
  { icon: '🌴', title: 'Florida Lifestyle', desc: 'No lawn to mow, no roof to replace. Spend your weekends at the beach, not home-maintaining.' },
]

const markets = [
  {
    city: 'Fort Lauderdale', slug: 'fort-lauderdale', emoji: '⛵', avgPrice: '$485K', priceRange: '$280K–$2.5M+',
    neighborhoods: ['Las Olas Riverfront', 'Galt Mile', 'Victoria Park', 'Wilton Manors'],
    desc: 'Fort Lauderdale offers the best blend of boating lifestyle, walkable neighborhoods, and urban energy. Las Olas is the crown jewel.'
  },
  {
    city: 'Boca Raton', slug: 'boca-raton', emoji: '🌺', avgPrice: '$520K', priceRange: '$300K–$3M+',
    neighborhoods: ['Mizner Park', 'Camino Real', 'Town Center', 'Royal Palm Yacht & Country Club'],
    desc: 'Upscale, manicured, and Mediterranean-inspired. Boca Raton condos offer luxury amenities in a sophisticated setting.'
  },
  {
    city: 'Miami Beach', slug: 'miami-beach', emoji: '🏖️', avgPrice: '$750K', priceRange: '$350K–$10M+',
    neighborhoods: ['South Beach', 'Mid-Beach', 'Bal Harbour', 'Surfside'],
    desc: 'International allure, Art Deco architecture, and world-class beaches. Miami Beach condos are iconic investments.'
  },
  {
    city: 'Hollywood', slug: 'hollywood', emoji: '🎭', avgPrice: '$320K', priceRange: '$180K–$1.5M',
    neighborhoods: ['Hollywood Beach', 'Downtown Hollywood', 'Young Circle', 'Emerald Hills'],
    desc: 'Underrated and up-and-coming. Hollywood Beach boardwalk offers Miami vibes at Broward prices.'
  },
  {
    city: 'West Palm Beach', slug: 'west-palm-beach', emoji: '🌅', avgPrice: '$380K', priceRange: '$200K–$2M+',
    neighborhoods: ['CityPlace/Rosemary Square', 'Flagler Drive', 'El Cid', 'Palm Beach Lakes'],
    desc: 'Cultural hub with the Norton Museum, Kravis Center, and Intracoastal views. A hidden gem with rising values.'
  },
]

const comparison = [
  { feature: 'Maintenance Responsibility', condo: 'Exterior handled by HOA', house: 'All yours — roof, lawn, etc.' },
  { feature: 'Entry Price', condo: 'Generally lower', house: 'Higher — more land value' },
  { feature: 'Amenities', condo: 'Pool, gym, concierge included', house: 'Must build/maintain yourself' },
  { feature: 'HOA Fees', condo: '$300–$1,500+/mo', house: '$0–$400/mo (if any)' },
  { feature: 'Outdoor Space', condo: 'Balcony / shared spaces', house: 'Private yard' },
  { feature: 'Flexibility', condo: 'Rules on pets, rentals, reno', house: 'Full control (zoning permitting)' },
  { feature: 'Security', condo: 'Building security, doorman', house: 'Self-provided' },
  { feature: 'Investment / Rental', condo: 'Short-term possible; rules vary', house: 'More flexible rental options' },
]

const watchFor = [
  { icon: '💳', title: 'HOA Fees & History', desc: 'Ask for 3 years of HOA meeting minutes. Look for deferred maintenance, upcoming special assessments, or budget deficits.' },
  { icon: '🔧', title: 'Special Assessments', desc: 'These surprise bills can be $5K–$50K+. Always ask: "Are there any pending or upcoming special assessments?"' },
  { icon: '🏦', title: 'Reserve Funds', desc: 'A well-funded reserve means the HOA can cover major repairs without special assessments. Underfunded = risk.' },
  { icon: '🐾', title: 'Pet Policies', desc: 'Many condos restrict pet size or breed. Verify before falling in love with a unit.' },
  { icon: '🏠', title: 'Rental Restrictions', desc: 'Some condos require 1–2 year owner-occupancy before renting. Short-term rental rules vary dramatically.' },
  { icon: '📜', title: 'Condo Association Financials', desc: 'Review the most recent budget, reserve study, and any litigation. These tell the true health of the building.' },
]

const neighborhoods = [
  { city: 'Fort Lauderdale', slug: 'fort-lauderdale' },
  { city: 'Hollywood', slug: 'hollywood' },
  { city: 'Boca Raton', slug: 'boca-raton' },
  { city: 'West Palm Beach', slug: 'west-palm-beach' },
  { city: 'Miami Beach', slug: 'miami-beach' },
  { city: 'Brickell', slug: 'brickell' },
]

export default function Condos() {
  useEffect(() => {
    document.title = 'Condos for Sale Fort Lauderdale, Boca Raton & South Florida | Virtus Realty Group'
    const meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute('content', 'Browse condos for sale in Fort Lauderdale, Boca Raton, Miami Beach & all of South Florida. Expert condo buyers guide from Virtus Realty Group.')
  }, [])

  return (
    <div className="font-sans">
      {/* HERO */}
      <section className="relative min-h-[65vh] flex items-center justify-center overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0a101d 0%, #141e31 60%, #0d1626 100%)' }}>
        <div className="absolute inset-0 opacity-10">
          {[...Array(15)].map((_, i) => (
            <div key={i} className="absolute rounded-full animate-pulse"
              style={{ left: `${(i*7)%100}%`, top: `${(i*13)%100}%`, width: 3+i%6, height: 3+i%6, background: '#b49750', animationDelay: `${i*300}ms` }} />
          ))}
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-28 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-5 py-2 text-white/90 text-sm font-medium mb-8">
            <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
            Fort Lauderdale · Boca Raton · Miami Beach · West Palm Beach
          </div>
          <h1 className="font-display text-5xl md:text-6xl font-extrabold text-white leading-tight mb-6">
            South Florida
            <span className="block" style={{ color: '#b49750' }}>Condos for Sale</span>
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed">
            From luxury high-rises on Las Olas to oceanfront towers in Miami Beach — find your perfect South Florida condo with our expert guidance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/listings" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-sm shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
              style={{ background: 'linear-gradient(135deg, #b49750, #d4b96a)', color: '#141e31' }}>
              🏙️ Browse Condos
            </Link>
            <Link to="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-sm bg-white/10 border border-white/25 text-white hover:bg-white/20 transition-all">
              📅 Schedule a Tour
            </Link>
          </div>
        </div>
      </section>

      {/* WHY CONDOS */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateIn>
            <div className="text-center mb-16">
              <span className="text-yellow-600 font-semibold text-sm uppercase tracking-widest">Condo Lifestyle</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold mt-3" style={{ color: '#141e31' }}>
                Why Buy a Condo in South Florida?
              </h2>
              <p className="text-gray-500 text-lg mt-4 max-w-2xl mx-auto">
                The lifestyle, investment value, and amenities that make South Florida condos worth every dollar.
              </p>
            </div>
          </AnimateIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reasons.map((r, i) => (
              <AnimateIn key={r.title} delay={i * 80}>
                <div className="group p-7 rounded-2xl border border-gray-100 hover:border-yellow-300 hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-gray-50/50 h-full">
                  <div className="text-4xl mb-4">{r.icon}</div>
                  <h3 className="font-display text-xl font-bold mb-3" style={{ color: '#141e31' }}>{r.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{r.desc}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* MARKETS */}
      <section className="py-24" style={{ background: 'linear-gradient(135deg, #0d1626 0%, #141e31 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateIn>
            <div className="text-center mb-16">
              <span className="font-semibold text-sm uppercase tracking-widest" style={{ color: '#b49750' }}>By Location</span>
              <h2 className="font-display text-4xl font-bold text-white mt-3">Popular Condo Markets</h2>
              <p className="text-white/60 text-lg mt-4">Each market has its own character, price point, and lifestyle.</p>
            </div>
          </AnimateIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {markets.map((m, i) => (
              <AnimateIn key={m.city} delay={i * 90}>
                <Link to={`/homes-for-sale/${m.slug}`}
                  className="relative p-7 rounded-2xl border border-white/10 hover:border-yellow-400/70 hover:scale-[1.02] hover:shadow-xl transition-all duration-300 h-full block cursor-pointer group"
                  style={{ background: 'rgba(255,255,255,0.05)' }}>
                  <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl" style={{ background: 'linear-gradient(90deg, #b49750, #d4b96a)' }} />
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl">{m.emoji}</span>
                    <div>
                      <h3 className="font-display text-xl font-bold text-white group-hover:text-yellow-300 transition-colors duration-200">{m.city}</h3>
                      <div className="text-sm font-semibold" style={{ color: '#b49750' }}>Avg: {m.avgPrice} · {m.priceRange}</div>
                    </div>
                  </div>
                  <p className="text-white/65 text-sm leading-relaxed mb-4">{m.desc}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {m.neighborhoods.map(n => (
                      <span key={n} className="text-xs px-2 py-1 rounded-full border border-white/20 text-white/60 hover:border-yellow-400/60 hover:text-white/90 transition-all duration-200">{n}</span>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center gap-1 text-xs font-semibold" style={{ color: '#b49750' }}>
                    View listings <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
                  </div>
                </Link>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* CONDO VS HOUSE */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateIn>
            <div className="text-center mb-16">
              <span className="text-yellow-600 font-semibold text-sm uppercase tracking-widest">Comparison</span>
              <h2 className="font-display text-4xl font-bold mt-3" style={{ color: '#141e31' }}>Condo vs. House</h2>
              <p className="text-gray-500 text-lg mt-4">How condos stack up against single-family homes — side by side.</p>
            </div>
          </AnimateIn>
          <AnimateIn delay={100}>
            <div className="rounded-2xl border border-gray-200 overflow-hidden shadow-lg bg-white">
              <div className="grid grid-cols-3 text-center text-sm font-bold py-4 px-4"
                style={{ background: '#141e31', color: 'white' }}>
                <div className="text-left text-white/70">Feature</div>
                <div style={{ color: '#b49750' }}>🏙️ Condo</div>
                <div className="text-white/70">🏡 House</div>
              </div>
              {comparison.map((row, i) => (
                <div key={row.feature} className={`grid grid-cols-3 px-4 py-3.5 text-sm border-b border-gray-100 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                  <div className="font-semibold text-gray-700 pr-2">{row.feature}</div>
                  <div className="text-center text-gray-600 px-2">{row.condo}</div>
                  <div className="text-center text-gray-500 px-2">{row.house}</div>
                </div>
              ))}
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* WHAT TO LOOK FOR */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateIn>
            <div className="text-center mb-16">
              <span className="text-yellow-600 font-semibold text-sm uppercase tracking-widest">Buyer's Checklist</span>
              <h2 className="font-display text-4xl font-bold mt-3" style={{ color: '#141e31' }}>What to Look For in a Condo</h2>
              <p className="text-gray-500 text-lg mt-4 max-w-2xl mx-auto">Avoid costly surprises with these critical condo due diligence items.</p>
            </div>
          </AnimateIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {watchFor.map((item, i) => (
              <AnimateIn key={item.title} delay={i * 80}>
                <div className="p-6 rounded-2xl border border-gray-100 hover:border-yellow-200 hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-gray-50 to-white">
                  <div className="text-3xl mb-3">{item.icon}</div>
                  <h3 className="font-display text-lg font-bold mb-2" style={{ color: '#141e31' }}>{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* NEIGHBORHOOD LINKS */}
      <section className="py-20" style={{ background: 'linear-gradient(135deg, #141e31 0%, #0d1626 100%)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateIn>
            <div className="text-center mb-12">
              <span className="font-semibold text-sm uppercase tracking-widest" style={{ color: '#b49750' }}>Explore by Area</span>
              <h2 className="font-display text-3xl font-bold text-white mt-3">Featured Condo Neighborhoods</h2>
            </div>
          </AnimateIn>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {neighborhoods.map((n, i) => (
              <AnimateIn key={n.slug} delay={i * 70}>
                <Link to={`/homes-for-sale/${n.slug}`}
                  className="group flex items-center justify-between p-4 rounded-xl border border-white/15 hover:border-yellow-400/50 transition-all duration-200"
                  style={{ background: 'rgba(255,255,255,0.05)' }}>
                  <span className="text-sm font-semibold text-white/80 group-hover:text-white">{n.city}</span>
                  <span className="text-yellow-400 text-sm">→</span>
                </Link>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <AnimateIn>
            <div className="w-16 h-1 mx-auto mb-8 rounded-full" style={{ background: 'linear-gradient(90deg, #b49750, #d4b96a)' }} />
            <h2 className="font-display text-4xl font-bold mb-4" style={{ color: '#141e31' }}>
              Ready to Find Your <span style={{ color: '#b49750' }}>South Florida Condo?</span>
            </h2>
            <p className="text-gray-500 text-lg mb-10 max-w-xl mx-auto">
              Our agents specialize in condo transactions — from first-time condo buyers to seasoned investors. Let's find the right building for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/listings" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-sm shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                style={{ background: 'linear-gradient(135deg, #b49750, #d4b96a)', color: '#141e31' }}>
                🏙️ Browse Available Condos
              </Link>
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-sm border-2 hover:bg-gray-50 transition-all"
                style={{ borderColor: '#141e31', color: '#141e31' }}>
                📅 Schedule a Tour
              </Link>
            </div>
          </AnimateIn>
        </div>
      </section>
    </div>
  )
}
