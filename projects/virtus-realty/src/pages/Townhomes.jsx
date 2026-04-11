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

const benefits = [
  { icon: '📐', title: 'More Space', desc: 'Townhomes offer 1,200–3,000+ sq ft — significantly more than most condos, with multi-level living and real storage.' },
  { icon: '🌿', title: 'Outdoor Space', desc: 'Private patios, small yards, or rooftop terraces. A place to grill, garden, or let pets roam — without full-home maintenance.' },
  { icon: '🚗', title: 'Garage Parking', desc: 'Most South Florida townhomes include a 1–2 car garage — a huge advantage in parking-starved neighborhoods.' },
  { icon: '💰', title: 'Lower Price Than a House', desc: 'Get the feel of a home at 20–40% below the cost of a comparable single-family house in the same neighborhood.' },
  { icon: '🔧', title: 'Less Maintenance', desc: 'HOA typically handles exterior maintenance, landscaping, roof, and pest control. Less work than owning a house.' },
  { icon: '🏘️', title: 'Community Feel', desc: 'Townhome communities often include pools, gyms, and playgrounds — plus the security of a gated community.' },
]

const communities = [
  {
    city: 'Fort Lauderdale', slug: 'fort-lauderdale', emoji: '⚓', priceRange: '$450K–$900K',
    highlights: ['Victoria Park townhomes', 'Rio Vista', 'Tarpon River', 'Lauderdale Village'],
    desc: 'Urban townhomes in walkable neighborhoods near beaches and Las Olas. High demand, strong appreciation.'
  },
  {
    city: 'Boca Raton', slug: 'boca-raton', emoji: '🌺', priceRange: '$500K–$1.2M',
    highlights: ['Via Mizner', 'Estancia', 'Tuscany', 'Boca Winds'],
    desc: 'Upscale townhome communities with Mediterranean architecture, A-rated schools, and resort-style amenities.'
  },
  {
    city: 'Pembroke Pines', slug: 'pembroke-pines', emoji: '🏡', priceRange: '$380K–$650K',
    highlights: ['Pembroke Falls', 'Grand Palms', 'Cobblestone Creek', 'Silver Lakes'],
    desc: 'Family-friendly with top-rated schools, plenty of parks, and value pricing relative to neighboring cities.'
  },
  {
    city: 'Hollywood', slug: 'hollywood', emoji: '🎭', priceRange: '$350K–$700K',
    highlights: ['Emerald Hills', 'Dania Beach', 'Young Circle area', 'Ambassador Acres'],
    desc: 'Undervalued market with great beach access and fast-rising property values. Excellent rental potential.'
  },
  {
    city: 'Coral Springs', slug: 'coral-springs', emoji: '🌸', priceRange: '$400K–$750K',
    highlights: ['Ramblewood', 'Eagle Trace', 'Cypress Run', 'The Crossings'],
    desc: 'One of Broward\'s most desirable family cities. Planned community feel, great schools, and tight-knit neighborhoods.'
  },
  {
    city: 'Weston', slug: 'weston', emoji: '🦅', priceRange: '$500K–$1M+',
    highlights: ['Sector 7', 'Bonaventure', 'Weston Hills CC', 'Savanna'],
    desc: 'Master-planned community with country club vibes, top schools, and a safe, suburban feel.'
  },
]

const priceData = [
  { area: 'Fort Lauderdale', low: '$440K', high: '$950K', avg: '$620K', trend: '↑ 8.2%' },
  { area: 'Boca Raton', low: '$490K', high: '$1.3M', avg: '$700K', trend: '↑ 6.8%' },
  { area: 'Pembroke Pines', low: '$360K', high: '$680K', avg: '$490K', trend: '↑ 9.1%' },
  { area: 'Hollywood', low: '$340K', high: '$720K', avg: '$465K', trend: '↑ 11.3%' },
  { area: 'Coral Springs', low: '$395K', high: '$770K', avg: '$530K', trend: '↑ 7.4%' },
  { area: 'Weston', low: '$480K', high: '$1.1M', avg: '$680K', trend: '↑ 5.9%' },
]

const buyingGuide = [
  { icon: '🏛️', title: 'HOA Structure', desc: 'Townhomes have HOAs, but unlike condos, they typically cover only shared/exterior areas — not your unit\'s interior plumbing or electrical.' },
  { icon: '🧱', title: 'Shared Walls', desc: 'Most townhomes share 1–2 walls with neighbors. Ask about soundproofing, construction type, and neighbor history.' },
  { icon: '🌳', title: 'Outdoor Space', desc: 'Confirm what outdoor space is deeded to you vs. shared. Patio, backyard, and front yard ownership varies by community.' },
  { icon: '🚙', title: 'Parking', desc: 'Most include garage + driveway, but guest parking varies. Crucial if you have multiple cars or frequent visitors.' },
  { icon: '📋', title: 'HOA Docs Review', desc: 'Request the HOA budget, rules (pet policy, rental restrictions, modifications), and meeting minutes for the past 2 years.' },
  { icon: '🔑', title: 'Fee-Simple vs. Leasehold', desc: 'Most Florida townhomes are fee-simple (you own the land). Verify you\'re not buying a leasehold, which is far less desirable.' },
]

export default function Townhomes() {
  useEffect(() => {
    document.title = 'Townhomes for Sale Fort Lauderdale, Boca Raton & South Florida | Virtus Realty'
    const meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute('content', 'Find townhomes for sale in Fort Lauderdale, Boca Raton, Pembroke Pines, Hollywood, Coral Springs & Weston. South Florida townhome experts at Virtus Realty Group.')
  }, [])

  return (
    <div className="font-sans">
      {/* HERO */}
      <section className="relative min-h-[65vh] flex items-center justify-center overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0a101d 0%, #141e31 60%, #0d1626 100%)' }}>
        <div className="absolute inset-0 opacity-10">
          {[...Array(16)].map((_, i) => (
            <div key={i} className="absolute rounded-full animate-pulse"
              style={{ left: `${(i*11)%100}%`, top: `${(i*17)%100}%`, width: 3+i%7, height: 3+i%7, background: '#b49750', animationDelay: `${i*250}ms` }} />
          ))}
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-28 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-5 py-2 text-white/90 text-sm font-medium mb-8">
            <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
            Fort Lauderdale · Boca Raton · Hollywood · Coral Springs · Weston
          </div>
          <h1 className="font-display text-5xl md:text-6xl font-extrabold text-white leading-tight mb-6">
            Townhomes for Sale in
            <span className="block" style={{ color: '#b49750' }}>South Florida</span>
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed">
            The best of both worlds — more space than a condo, less maintenance than a house. Find your townhome across the best neighborhoods in South Florida.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/listings" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-sm shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
              style={{ background: 'linear-gradient(135deg, #b49750, #d4b96a)', color: '#141e31' }}>
              🏘️ Find Your Townhome
            </Link>
            <Link to="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-sm bg-white/10 border border-white/25 text-white hover:bg-white/20 transition-all">
              🤝 Talk to an Agent
            </Link>
          </div>
        </div>
      </section>

      {/* WHY TOWNHOMES */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateIn>
            <div className="text-center mb-16">
              <span className="text-yellow-600 font-semibold text-sm uppercase tracking-widest">The Sweet Spot</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold mt-3" style={{ color: '#141e31' }}>
                Why Choose a Townhome?
              </h2>
              <p className="text-gray-500 text-lg mt-4 max-w-2xl mx-auto">
                More space than a condo. Less upkeep than a house. It's the lifestyle upgrade that makes financial sense.
              </p>
            </div>
          </AnimateIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b, i) => (
              <AnimateIn key={b.title} delay={i * 80}>
                <div className="group p-7 rounded-2xl border border-gray-100 hover:border-yellow-300 hover:shadow-xl transition-all duration-300 h-full bg-gradient-to-br from-white to-gray-50/50">
                  <div className="text-4xl mb-4">{b.icon}</div>
                  <h3 className="font-display text-xl font-bold mb-3" style={{ color: '#141e31' }}>{b.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{b.desc}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* COMMUNITIES */}
      <section className="py-24" style={{ background: 'linear-gradient(135deg, #0d1626 0%, #141e31 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateIn>
            <div className="text-center mb-16">
              <span className="font-semibold text-sm uppercase tracking-widest" style={{ color: '#b49750' }}>By City</span>
              <h2 className="font-display text-4xl font-bold text-white mt-3">Top Townhome Communities</h2>
              <p className="text-white/60 text-lg mt-4">Each city has its own character, price range, and vibe.</p>
            </div>
          </AnimateIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {communities.map((c, i) => (
              <AnimateIn key={c.city} delay={i * 90}>
                <Link to={`/homes-for-sale/${c.slug}`}
                  className="relative p-7 rounded-2xl border border-white/10 hover:border-yellow-400/70 hover:scale-[1.02] hover:shadow-xl transition-all duration-300 h-full block cursor-pointer group"
                  style={{ background: 'rgba(255,255,255,0.05)' }}>
                  <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl" style={{ background: 'linear-gradient(90deg, #b49750, #d4b96a)' }} />
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-3xl">{c.emoji}</span>
                    <div>
                      <h3 className="font-display text-xl font-bold text-white group-hover:text-yellow-300 transition-colors duration-200">{c.city}</h3>
                      <div className="text-sm font-semibold" style={{ color: '#b49750' }}>{c.priceRange}</div>
                    </div>
                  </div>
                  <p className="text-white/65 text-sm leading-relaxed mb-4">{c.desc}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {c.highlights.map(h => (
                      <span key={h} className="text-xs px-2 py-1 rounded-full border border-white/20 text-white/60 hover:border-yellow-400/60 hover:text-white/90 transition-all duration-200">{h}</span>
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

      {/* PRICE RANGES */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateIn>
            <div className="text-center mb-16">
              <span className="text-yellow-600 font-semibold text-sm uppercase tracking-widest">Market Data</span>
              <h2 className="font-display text-4xl font-bold mt-3" style={{ color: '#141e31' }}>Townhome Price Ranges by Area</h2>
              <p className="text-gray-500 text-lg mt-4">2026 market data for South Florida townhomes.</p>
            </div>
          </AnimateIn>
          <AnimateIn delay={100}>
            <div className="rounded-2xl border border-gray-200 overflow-hidden shadow-lg bg-white">
              <div className="grid grid-cols-4 text-center text-xs font-bold py-4 px-4"
                style={{ background: '#141e31', color: 'white' }}>
                <div className="text-left text-white/70">Area</div>
                <div style={{ color: '#b49750' }}>Low</div>
                <div className="text-white/70">Average</div>
                <div className="text-white/70">High · YoY</div>
              </div>
              {priceData.map((row, i) => (
                <div key={row.area} className={`grid grid-cols-4 px-4 py-4 text-sm border-b border-gray-100 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                  <div className="font-semibold text-gray-800">{row.area}</div>
                  <div className="text-center text-gray-600">{row.low}</div>
                  <div className="text-center font-bold" style={{ color: '#141e31' }}>{row.avg}</div>
                  <div className="text-center text-green-600 font-semibold">{row.high} · {row.trend}</div>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-400 text-center mt-3">Data reflects current MLS averages. Prices vary by community, condition, and amenities.</p>
          </AnimateIn>
        </div>
      </section>

      {/* BUYING GUIDE */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateIn>
            <div className="text-center mb-16">
              <span className="text-yellow-600 font-semibold text-sm uppercase tracking-widest">Buyer's Guide</span>
              <h2 className="font-display text-4xl font-bold mt-3" style={{ color: '#141e31' }}>What Makes Townhomes Different</h2>
              <p className="text-gray-500 text-lg mt-4 max-w-2xl mx-auto">Key things to understand before buying a townhome in South Florida.</p>
            </div>
          </AnimateIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {buyingGuide.map((item, i) => (
              <AnimateIn key={item.title} delay={i * 80}>
                <div className="p-6 rounded-2xl border border-gray-100 hover:border-yellow-200 hover:shadow-lg transition-all duration-300">
                  <div className="text-3xl mb-3">{item.icon}</div>
                  <h3 className="font-display text-lg font-bold mb-2" style={{ color: '#141e31' }}>{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
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
            <h2 className="font-display text-4xl font-bold text-white mb-4">
              Find Your Perfect <span style={{ color: '#b49750' }}>South Florida Townhome</span>
            </h2>
            <p className="text-white/70 text-lg mb-10 max-w-xl mx-auto">
              Our agents know every townhome community in Broward and Palm Beach County. Tell us what you're looking for and we'll match you with the right home.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/listings" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-sm shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                style={{ background: 'linear-gradient(135deg, #b49750, #d4b96a)', color: '#141e31' }}>
                🏘️ Browse Townhomes
              </Link>
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-sm bg-white/10 border border-white/25 text-white hover:bg-white/20 transition-all">
                🤝 Talk to an Agent
              </Link>
            </div>
            <p className="mt-6 text-white/40 text-sm">Free consultation · No pressure · Local experts</p>
          </AnimateIn>
        </div>
      </section>
    </div>
  )
}
