import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

/* ─── slug helpers ─── */
function toSlug(name) {
  return name
    .toLowerCase()
    .replace(/['.]/g, '')          // remove apostrophes & dots
    .replace(/\s+/g, '-')          // spaces → dashes
    .replace(/-+/g, '-')           // collapse multiple dashes
    .trim()
}

function countySlug(name) {
  // "Broward County" → "broward-county"
  return toSlug(name)
}

function useIntersection() {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])
  return [ref, isVisible]
}

function AnimateIn({ children, delay = 0, className = '' }) {
  const [ref, isVisible] = useIntersection()
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}
    >
      {children}
    </div>
  )
}

const counties = [
  {
    name: 'Broward County',
    emoji: '🌊',
    gradient: 'from-navy-500 to-navy-700',
    description: 'The heart of South Florida — from the beach communities to the western suburbs. Broward offers incredible diversity in lifestyle and price points.',
    highlights: ['Year-round beach access', 'Strong rental market', 'Thriving job market', 'Top-rated schools'],
    areas: [
      { name: 'Hollywood', desc: 'Beachfront charm meets urban energy', vibe: '🏖️' },
      { name: 'Hallandale Beach', desc: 'Casino buzz, waterfront condos, great value', vibe: '🎰' },
      { name: 'Fort Lauderdale', desc: 'The Venice of America — yachts, culture, nightlife', vibe: '⛵' },
      { name: 'Pembroke Pines', desc: 'Family-friendly suburbs with top schools', vibe: '🏫' },
      { name: 'Weston', desc: 'Master-planned luxury in the western suburbs', vibe: '🌳' },
      { name: 'Coral Springs', desc: 'Vibrant community with excellent amenities', vibe: '🌸' },
      { name: 'Parkland', desc: 'Exclusive, peaceful, and highly sought-after', vibe: '🦋' },
    ],
  },
  {
    name: 'Miami-Dade County',
    emoji: '🌆',
    gradient: 'from-navy-600 to-gold-600',
    description: 'The gateway to the Americas. From the glamour of Miami Beach to the family-friendly suburbs of Kendall and Homestead — Miami-Dade is South Florida\'s powerhouse market.',
    highlights: ['International investment hub', 'Luxury high-rise condos', 'Booming tech & finance scene', 'World-class dining & nightlife'],
    areas: [
      { name: 'Miami Beach', desc: 'Iconic oceanfront living — art deco, nightlife, luxury', vibe: '🌴' },
      { name: 'Brickell', desc: 'The "Manhattan of the South" — finance, condos, energy', vibe: '🏙️' },
      { name: 'Coral Gables', desc: 'Old-money elegance with tree-lined boulevards', vibe: '🏛️' },
      { name: 'Doral', desc: 'Fast-growing family hub with top-tier golf', vibe: '⛳' },
      { name: 'Aventura', desc: 'Luxury towers, world-class mall, waterfront views', vibe: '🛍️' },
      { name: 'Homestead', desc: 'Affordable entry point with rapid appreciation', vibe: '🏡' },
      { name: 'Kendall', desc: 'Suburban charm with excellent schools', vibe: '🏫' },
    ],
  },
  {
    name: 'Palm Beach County',
    emoji: '🌴',
    gradient: 'from-gold-500 to-navy-800',
    description: 'Where luxury meets lifestyle. From the historic grandeur of Palm Beach island to the vibrant energy of West Palm Beach and the upscale charm of Boca Raton.',
    highlights: ['Luxury waterfront estates', 'World-class golf courses', 'Upscale dining & shopping', 'Growing tech scene'],
    areas: [
      { name: 'Boca Raton', desc: 'Affluent, polished, and exceptionally beautiful', vibe: '💎' },
      { name: 'West Palm Beach', desc: 'Rapidly growing urban core with arts and culture', vibe: '🎭' },
      { name: 'Delray Beach', desc: 'Atlantic Avenue energy — chic, walkable, vibrant', vibe: '☀️' },
      { name: 'Boynton Beach', desc: 'Affordable waterfront living with great value', vibe: '🐬' },
    ],
  },
  {
    name: 'St. Lucie County',
    emoji: '🌅',
    gradient: 'from-gold-500 to-gold-500',
    description: 'South Florida\'s best-kept secret. Rapidly growing, more affordable, and offering incredible quality of life with the same tropical beauty at a fraction of the price.',
    highlights: ['Fastest growing market in FL', 'Affordable price points', 'New construction boom', 'Nature & waterways'],
    areas: [
      { name: 'Port St. Lucie', desc: 'Booming growth with exceptional affordability', vibe: '🚀' },
      { name: 'Stuart', desc: '"Sailfish Capital of the World" — waterfront paradise', vibe: '⚓' },
      { name: 'Palm City', desc: 'Quiet, upscale enclave with waterway access', vibe: '🎣' },
    ],
  },
]

const marketData = [
  { label: 'Avg Days on Market', miamidade: '35', broward: '28', palmbeach: '32', stlucie: '22', icon: '📅' },
  { label: 'Median Home Price', miamidade: '$580K', broward: '$485K', palmbeach: '$590K', stlucie: '$340K', icon: '💰' },
  { label: 'YoY Price Growth', miamidade: '+7.5%', broward: '+8.2%', palmbeach: '+9.1%', stlucie: '+12.4%', icon: '📈' },
  { label: 'Active Listings', miamidade: '12,000+', broward: '4,200+', palmbeach: '5,800+', stlucie: '1,900+', icon: '🏠' },
]

export default function Areas() {
  // SEO Meta Tags
  useEffect(() => {
    document.title = 'South Florida Real Estate by Area | Broward, Palm Beach & Miami-Dade | Virtus Realty'
    const meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute('content', 'Explore real estate in South Florida\'s top neighborhoods. From Hollywood to Boca Raton, find homes, investment properties, and REO deals in your preferred area.')
    // OG tags
    const ogTitle = document.querySelector('meta[property="og:title"]')
    if (ogTitle) ogTitle.setAttribute('content', 'South Florida Real Estate by Area | Broward, Palm Beach & Miami-Dade | Virtus Realty')
    const ogDesc = document.querySelector('meta[property="og:description"]')
    if (ogDesc) ogDesc.setAttribute('content', 'Explore real estate in South Florida\'s top neighborhoods. From Hollywood to Boca Raton, find homes, investment properties, and REO deals in your preferred area.')
    const ogUrl = document.querySelector('meta[property="og:url"]')
    if (ogUrl) ogUrl.setAttribute('content', 'https://virtusrealtygroup.com/areas')
  }, [])

  return (
    <div>
      {/* HERO */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-800 via-navy-700 to-navy-900" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-navy-400/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold-300/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 right-0 h-16">
          <svg viewBox="0 0 1200 80" preserveAspectRatio="none" className="w-full h-full">
            <path d="M0,40 C400,80 800,0 1200,40 L1200,80 L0,80 Z" fill="white" />
          </svg>
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block text-gold-300 font-semibold text-sm uppercase tracking-wider mb-4">Coverage Area</span>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-6">Areas We Serve</h1>
          <p className="text-white/80 text-xl max-w-2xl mx-auto leading-relaxed">
            From the high-rises of Miami to the waterways of Port St. Lucie — Nicolas knows South Florida like no one else.
          </p>
        </div>
      </section>

      {/* MARKET SNAPSHOT */}
      <section className="py-14 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateIn>
            <h2 className="font-display text-2xl font-bold text-gray-900 text-center mb-8">Market Snapshot</h2>
          </AnimateIn>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm text-gray-500 font-medium"></th>
                  <th className="py-3 px-4 text-center text-sm font-semibold text-navy-700">Miami-Dade</th>
                  <th className="py-3 px-4 text-center text-sm font-semibold text-navy-700">Broward</th>
                  <th className="py-3 px-4 text-center text-sm font-semibold text-navy-800">Palm Beach</th>
                  <th className="py-3 px-4 text-center text-sm font-semibold text-gold-700">St. Lucie</th>
                </tr>
              </thead>
              <tbody>
                {marketData.map((row, i) => (
                  <tr key={row.label} className={`border-b border-gray-50 ${i % 2 === 0 ? 'bg-gray-50/50' : ''}`}>
                    <td className="py-3 px-4 text-sm font-medium text-gray-700">
                      <span className="mr-2">{row.icon}</span>{row.label}
                    </td>
                    <td className="py-3 px-4 text-center text-sm font-bold text-navy-700">{row.miamidade}</td>
                    <td className="py-3 px-4 text-center text-sm font-bold text-navy-700">{row.broward}</td>
                    <td className="py-3 px-4 text-center text-sm font-bold text-navy-800">{row.palmbeach}</td>
                    <td className="py-3 px-4 text-center text-sm font-bold text-gold-600">{row.stlucie}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="text-xs text-gray-400 mt-3 text-right">*Approximate data for illustrative purposes. Contact Nicolas for current figures.</p>
          </div>
        </div>
      </section>

      {/* COUNTY SECTIONS */}
      {counties.map((county, ci) => (
        <section key={county.name} className={`py-20 ${ci % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimateIn>
              <div className={`rounded-3xl overflow-hidden bg-gradient-to-br ${county.gradient} p-8 md:p-12 mb-12 relative`}>
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-xl" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-xl" />
                <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-5xl">{county.emoji}</span>
                      <h2 className="font-display text-4xl font-bold text-white">{county.name}</h2>
                    </div>
                    <p className="text-white/85 text-lg leading-relaxed mb-6">{county.description}</p>
                    <Link
                      to={`/homes-for-sale/${countySlug(county.name)}`}
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-navy-900 text-sm transition-all duration-200 hover:-translate-y-0.5"
                      style={{
                        background: 'linear-gradient(135deg, #D4AF37 0%, #F0C040 50%, #D4AF37 100%)',
                        boxShadow: '0 4px 16px rgba(212,175,55,0.4)',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.boxShadow = '0 8px 28px rgba(212,175,55,0.65)'
                        e.currentTarget.style.transform = 'translateY(-2px)'
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.boxShadow = '0 4px 16px rgba(212,175,55,0.4)'
                        e.currentTarget.style.transform = 'translateY(0)'
                      }}
                    >
                      View All {county.name} Listings →
                    </Link>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {county.highlights.map((h) => (
                      <div key={h} className="flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-xl px-4 py-2.5">
                        <svg className="w-4 h-4 text-white/80 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                        <span className="text-white text-sm font-medium">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </AnimateIn>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {county.areas.map((area, ai) => (
                <AnimateIn key={area.name} delay={ai * 80}>
                  <div className="card p-5 hover:shadow-lg group transition-all duration-300 cursor-pointer border border-gray-100 hover:border-navy-200 flex flex-col">
                    <div className="text-3xl mb-3">{area.vibe}</div>
                    <h3 className="font-display font-semibold text-lg text-gray-900 mb-1 group-hover:text-navy-700 transition-colors">
                      {area.name}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed flex-1">{area.desc}</p>
                    <Link
                      to={`/homes-for-sale/${toSlug(area.name)}`}
                      className="area-cta-btn mt-4 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white w-full transition-all duration-200"
                      style={{
                        background: 'linear-gradient(135deg, #C49A0A 0%, #D4AF37 50%, #C49A0A 100%)',
                        backgroundSize: '200% 100%',
                        boxShadow: '0 2px 8px rgba(212,175,55,0.35)',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.transform = 'translateY(-2px)'
                        e.currentTarget.style.boxShadow = '0 6px 20px rgba(212,175,55,0.55)'
                        e.currentTarget.style.backgroundPosition = '100% 0'
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.transform = 'translateY(0)'
                        e.currentTarget.style.boxShadow = '0 2px 8px rgba(212,175,55,0.35)'
                        e.currentTarget.style.backgroundPosition = '0% 0'
                      }}
                    >
                      🏠 View Homes in {area.name}
                    </Link>
                  </div>
                </AnimateIn>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="py-16 gradient-ocean">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimateIn>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
              Looking in a Specific Area?
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
              Nicolas has deep knowledge of every market he serves. Tell him where you're looking and he'll find the best options for your goals.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-navy-700 font-bold rounded-xl hover:bg-gold-50 hover:text-gold-600 transition-all duration-200 shadow-xl text-lg"
            >
              Let's Find Your Home →
            </Link>
          </AnimateIn>
        </div>
      </section>
    </div>
  )
}
