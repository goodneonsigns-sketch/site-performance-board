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
  { icon: '⚡', title: 'Energy Efficiency', desc: 'New builds meet current building codes with impact-resistant windows, improved insulation, high-SEER AC systems, and often smart home tech — saving $200–$600/month on utilities.' },
  { icon: '🛡️', title: 'Structural Warranty', desc: '10-year builder structural warranty (required by Florida law) plus 1-year workmanship and 2-year systems warranty. Major peace of mind vs. buying resale.' },
  { icon: '✨', title: 'Modern Design', desc: 'Open floor plans, 9–12 ft ceilings, quartz counters, tile throughout, and designer finishes that would cost $100K+ to add to a resale home.' },
  { icon: '🎨', title: 'Customization', desc: 'In early-stage communities, choose your lot, floor plan, elevation, cabinet colors, flooring, and upgrades. Make it yours before the first nail is driven.' },
  { icon: '🚰', title: 'No Hidden Problems', desc: 'No aging plumbing, no old roof, no mystery electrical. Everything is brand new and under warranty. No inspection surprises.' },
  { icon: '🏘️', title: 'Community Amenities', desc: 'New construction communities typically include resort-style pools, fitness centers, dog parks, and playgrounds — all new and maintained by the HOA.' },
]

const areas = [
  {
    area: 'Miami-Dade County', slug: 'miami-beach', emoji: '🌆', priceRange: '$550K–$2.5M+',
    developments: ['Brickell City Centre', 'Edgewater towers', 'Coral Gables infill', 'Doral master-planned communities'],
    builders: ['Lennar', 'Toll Brothers', 'Related Group'],
    desc: 'High-rise luxury condos, gated master-planned communities in Doral and Homestead, and infill development throughout the urban core.'
  },
  {
    area: 'Broward County', slug: 'fort-lauderdale', emoji: '⛵', priceRange: '$450K–$1.5M',
    developments: ['Parkland', 'Coral Springs', 'Pembroke Pines', 'Davie', 'Miramar'],
    builders: ['GL Homes', 'Maronda Homes', 'Century Complete'],
    desc: 'Family-oriented communities with A-rated schools, new master-planned neighborhoods, and townhome developments in urban infill areas.'
  },
  {
    area: 'Palm Beach County', slug: 'boca-raton', emoji: '🌺', priceRange: '$500K–$3M+',
    developments: ['Boca Raton', 'Delray Beach', 'Lake Worth', 'Wellington'],
    builders: ['GL Homes', 'DiVosta', 'Toll Brothers', 'John B. Kee'],
    desc: 'Luxury estate homes, 55+ active adult communities, and resort-style golf communities. Some of Florida\'s most prestigious new neighborhoods.'
  },
  {
    area: 'St. Lucie County', slug: 'west-palm-beach', emoji: '🌊', priceRange: '$300K–$700K',
    developments: ['Port St. Lucie', 'Tradition', 'Verano', 'Southern Grove'],
    builders: ['Mattamy Homes', 'Adams Homes', 'LGI Homes'],
    desc: 'The most affordable entry point for South Florida new construction. Massive planned communities with modern amenities at value prices.'
  },
]

const processSteps = [
  { num: '01', icon: '🏗️', title: 'Select Your Builder', desc: 'Research builder reputation, warranty, and financial stability. Read reviews. Ask about cancellation policies and price escalation clauses.' },
  { num: '02', icon: '📍', title: 'Choose Your Lot', desc: 'Premium lots command 5–15% premiums. Corner lots, cul-de-sacs, lake/preserve views — choose wisely. This impacts resale value.' },
  { num: '03', icon: '🎨', title: 'Design Center', desc: 'Select finishes, upgrades, and structural options. This is exciting — but budget carefully. Upgrades add up fast at builder markup prices.' },
  { num: '04', icon: '🔨', title: 'Construction Phase', desc: 'Typical timeline is 6–18 months. Visit the site periodically. Request your own inspector at framing, pre-drywall, and pre-closing stages.' },
  { num: '05', icon: '🔬', title: 'Independent Inspection', desc: 'Always hire your own inspector — even for new construction. Builder quality varies significantly. Your inspector works for you, not the builder.' },
  { num: '06', icon: '🔑', title: 'Final Walkthrough & Close', desc: 'Document every item that needs correction (punch list). Don\'t close until agreed items are complete or escrowed. Then enjoy your new home!' },
]

const comparison = [
  { feature: 'Customization', newBuild: 'High — choose finishes & options', resale: 'Limited — inherit prior owner\'s choices' },
  { feature: 'Move-in Timeline', newBuild: '6–18 months to completion', resale: '30–60 days after contract' },
  { feature: 'Condition', newBuild: 'Brand new, no deferred maintenance', resale: 'Unknown — requires thorough inspection' },
  { feature: 'Warranty', newBuild: '10-year structural, 1-2yr systems', resale: 'As-is (or limited seller warranty)' },
  { feature: 'Price Negotiation', newBuild: 'Limited — builders have fixed pricing', resale: 'Flexible — market-driven negotiation' },
  { feature: 'Upgrades', newBuild: 'Available (at builder markup)', resale: 'May already be included in price' },
  { feature: 'HOA', newBuild: 'New — often lower initial fees', resale: 'Established with history to review' },
  { feature: 'Energy Efficiency', newBuild: 'Modern codes, high efficiency', resale: 'Varies — may need updates' },
]

const watchFor = [
  { icon: '⭐', title: 'Builder Reputation', desc: 'Research complaints with DBPR (Florida Dept of Business), Google reviews, and HOA history. A builder with a pattern of shoddy work is a serious red flag.' },
  { icon: '📋', title: 'Contract Terms', desc: 'New construction contracts strongly favor builders. Have a real estate attorney review before signing. Focus on price escalation, completion date, and cancellation clauses.' },
  { icon: '💰', title: 'Upgrade Costs', desc: 'The model home is fully upgraded — your base price is not. Upgrades are typically marked up 50–100% above retail. Prioritize structural options over cosmetic ones.' },
  { icon: '🛡️', title: 'Warranty Coverage', desc: 'Understand exactly what\'s covered. Builder warranties don\'t cover everything. Register all appliances directly with manufacturers.' },
  { icon: '⏰', title: 'Completion Timeline', desc: 'Build timelines frequently slip due to supply chain, labor, or permitting issues. Don\'t lock in a lease end date that\'s too tight.' },
  { icon: '🏘️', title: 'HOA Transition', desc: 'During early development, the builder controls the HOA. As the community fills, control transitions to homeowners. Ask about planned HOA fees.' },
]

const popularBuilders = [
  { name: 'GL Homes', specialty: 'Luxury master-planned', counties: 'Palm Beach, Broward' },
  { name: 'Lennar', specialty: 'Everything\'s Included® approach', counties: 'All South FL counties' },
  { name: 'Toll Brothers', specialty: 'Premium luxury', counties: 'Palm Beach, Broward, Miami-Dade' },
  { name: 'DiVosta (PulteGroup)', specialty: '55+ / Active Adult', counties: 'Palm Beach, St. Lucie' },
  { name: 'Mattamy Homes', specialty: 'Family-focused communities', counties: 'St. Lucie, Palm Beach' },
  { name: 'Related Group', specialty: 'Luxury high-rise condos', counties: 'Miami-Dade, Broward' },
]

export default function NewConstruction() {
  useEffect(() => {
    document.title = 'New Construction Homes South Florida | Miami-Dade, Boca Raton & Broward | Virtus Realty'
    const meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute('content', 'New construction homes in South Florida including Miami-Dade, Boca Raton, Broward and Palm Beach. GL Homes, Lennar, Toll Brothers experts at Virtus Realty Group.')
  }, [])

  return (
    <div className="font-sans">
      {/* HERO */}
      <section className="relative min-h-[65vh] flex items-center justify-center overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0a101d 0%, #141e31 60%, #0d1626 100%)' }}>
        <div className="absolute inset-0 opacity-10">
          {[...Array(18)].map((_, i) => (
            <div key={i} className="absolute rounded-full animate-pulse"
              style={{ left: `${(i*13)%100}%`, top: `${(i*11)%100}%`, width: 3+i%7, height: 3+i%7, background: '#b49750', animationDelay: `${i*270}ms` }} />
          ))}
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-28 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-5 py-2 text-white/90 text-sm font-medium mb-8">
            <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
            Miami-Dade · Broward · Palm Beach · St. Lucie County
          </div>
          <h1 className="font-display text-5xl md:text-6xl font-extrabold text-white leading-tight mb-6">
            New Construction Homes
            <span className="block" style={{ color: '#b49750' }}>in South Florida</span>
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed">
            Customize your dream home with modern design, energy efficiency, and a full builder's warranty. South Florida's top new communities — with expert buyer representation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/listings" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-sm shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
              style={{ background: 'linear-gradient(135deg, #b49750, #d4b96a)', color: '#141e31' }}>
              🏗️ Explore New Builds
            </Link>
            <Link to="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-sm bg-white/10 border border-white/25 text-white hover:bg-white/20 transition-all">
              🤝 Get Expert Guidance
            </Link>
          </div>
          <p className="mt-6 text-white/40 text-sm">Buyer representation is FREE — builder pays your agent's commission</p>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateIn>
            <div className="text-center mb-16">
              <span className="text-yellow-600 font-semibold text-sm uppercase tracking-widest">Why Buy New</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold mt-3" style={{ color: '#141e31' }}>
                Benefits of Buying New Construction
              </h2>
              <p className="text-gray-500 text-lg mt-4 max-w-2xl mx-auto">
                New builds aren't just about newness — they're about long-term value, efficiency, and peace of mind.
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

      {/* BY AREA */}
      <section className="py-24" style={{ background: 'linear-gradient(135deg, #0d1626 0%, #141e31 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateIn>
            <div className="text-center mb-16">
              <span className="font-semibold text-sm uppercase tracking-widest" style={{ color: '#b49750' }}>By County</span>
              <h2 className="font-display text-4xl font-bold text-white mt-3">New Construction by Area</h2>
              <p className="text-white/60 text-lg mt-4">Active new development communities across all of South Florida.</p>
            </div>
          </AnimateIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {areas.map((area, i) => (
              <AnimateIn key={area.area} delay={i * 90}>
                <Link to={`/homes-for-sale/${area.slug}`}
                  className="relative p-7 rounded-2xl border border-white/10 hover:border-yellow-400/70 hover:scale-[1.02] hover:shadow-xl transition-all duration-300 h-full block cursor-pointer group"
                  style={{ background: 'rgba(255,255,255,0.05)' }}>
                  <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl" style={{ background: 'linear-gradient(90deg, #b49750, #d4b96a)' }} />
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl">{area.emoji}</span>
                    <div>
                      <h3 className="font-display text-xl font-bold text-white group-hover:text-yellow-300 transition-colors duration-200">{area.area}</h3>
                      <div className="text-sm font-semibold" style={{ color: '#b49750' }}>{area.priceRange}</div>
                    </div>
                  </div>
                  <p className="text-white/65 text-sm leading-relaxed mb-4">{area.desc}</p>
                  <div className="mb-3">
                    <p className="text-xs text-white/40 uppercase tracking-wider mb-1.5">Active Developments</p>
                    <div className="flex flex-wrap gap-1.5">
                      {area.developments.map(d => (
                        <span key={d} className="text-xs px-2 py-1 rounded-full border border-white/20 text-white/60 hover:border-yellow-400/60 hover:text-white/90 transition-all duration-200">{d}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-white/40 uppercase tracking-wider mb-1.5">Active Builders</p>
                    <div className="flex flex-wrap gap-1.5">
                      {area.builders.map(b => (
                        <span key={b} className="text-xs px-2 py-1 rounded-full text-xs font-semibold" style={{ background: '#b49750', color: '#141e31' }}>{b}</span>
                      ))}
                    </div>
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

      {/* PROCESS */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateIn>
            <div className="text-center mb-16">
              <span className="text-yellow-600 font-semibold text-sm uppercase tracking-widest">The Timeline</span>
              <h2 className="font-display text-4xl font-bold mt-3" style={{ color: '#141e31' }}>The New Construction Process</h2>
              <p className="text-gray-500 text-lg mt-4">From selecting a builder to getting your keys — what to expect.</p>
            </div>
          </AnimateIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {processSteps.map((step, i) => (
              <AnimateIn key={step.num} delay={i * 90}>
                <div className="relative p-6 rounded-2xl bg-white border border-gray-100 hover:border-yellow-200 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                      style={{ background: '#141e31', color: '#b49750' }}>{step.num}</div>
                    <div className="text-2xl">{step.icon}</div>
                  </div>
                  <h3 className="font-display text-lg font-bold mb-2" style={{ color: '#141e31' }}>{step.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* BUILDER VS RESALE */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateIn>
            <div className="text-center mb-16">
              <span className="text-yellow-600 font-semibold text-sm uppercase tracking-widest">Comparison</span>
              <h2 className="font-display text-4xl font-bold mt-3" style={{ color: '#141e31' }}>New Construction vs. Resale</h2>
              <p className="text-gray-500 text-lg mt-4">Every buyer's big question — side by side.</p>
            </div>
          </AnimateIn>
          <AnimateIn delay={100}>
            <div className="rounded-2xl border border-gray-200 overflow-hidden shadow-lg bg-white">
              <div className="grid grid-cols-3 text-center text-sm font-bold py-4 px-4"
                style={{ background: '#141e31', color: 'white' }}>
                <div className="text-left text-white/70">Feature</div>
                <div style={{ color: '#b49750' }}>🏗️ New Construction</div>
                <div className="text-white/70">🏡 Resale</div>
              </div>
              {comparison.map((row, i) => (
                <div key={row.feature} className={`grid grid-cols-3 px-4 py-3.5 text-sm border-b border-gray-100 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                  <div className="font-semibold text-gray-700 pr-2">{row.feature}</div>
                  <div className="text-center text-gray-600 px-2">{row.newBuild}</div>
                  <div className="text-center text-gray-500 px-2">{row.resale}</div>
                </div>
              ))}
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* WHAT TO WATCH FOR */}
      <section className="py-24" style={{ background: 'linear-gradient(135deg, #0d1626 0%, #141e31 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateIn>
            <div className="text-center mb-16">
              <span className="font-semibold text-sm uppercase tracking-widest" style={{ color: '#b49750' }}>Due Diligence</span>
              <h2 className="font-display text-4xl font-bold text-white mt-3">What to Watch For</h2>
              <p className="text-white/60 text-lg mt-4 max-w-2xl mx-auto">New construction isn't always simple. Know these pitfalls before you sign.</p>
            </div>
          </AnimateIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {watchFor.map((item, i) => (
              <AnimateIn key={item.title} delay={i * 80}>
                <div className="p-6 rounded-2xl border border-white/10 hover:border-yellow-400/40 transition-all duration-300"
                  style={{ background: 'rgba(255,255,255,0.05)' }}>
                  <div className="text-3xl mb-3">{item.icon}</div>
                  <h3 className="font-display text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* BUILDERS */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateIn>
            <div className="text-center mb-16">
              <span className="text-yellow-600 font-semibold text-sm uppercase tracking-widest">Who's Building</span>
              <h2 className="font-display text-4xl font-bold mt-3" style={{ color: '#141e31' }}>Popular Builders in South Florida</h2>
              <p className="text-gray-500 text-lg mt-4">These builders have active communities across the region right now.</p>
            </div>
          </AnimateIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {popularBuilders.map((builder, i) => (
              <AnimateIn key={builder.name} delay={i * 70}>
                <div className="p-5 rounded-xl bg-white border border-gray-100 hover:border-yellow-200 hover:shadow-md transition-all duration-300">
                  <h3 className="font-display text-lg font-bold mb-1" style={{ color: '#141e31' }}>{builder.name}</h3>
                  <div className="text-sm text-gray-500 mb-1">{builder.specialty}</div>
                  <div className="text-xs font-semibold" style={{ color: '#b49750' }}>{builder.counties}</div>
                </div>
              </AnimateIn>
            ))}
          </div>
          <AnimateIn delay={200}>
            <div className="mt-8 p-6 rounded-xl border border-yellow-200 bg-yellow-50 text-center">
              <p className="text-sm text-gray-700">
                <strong style={{ color: '#141e31' }}>💡 Pro Tip:</strong> Builder sales reps work for the builder. Having your own buyer's agent costs you nothing — the builder pays their commission — and ensures someone is negotiating on your behalf.
              </p>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20" style={{ background: 'linear-gradient(135deg, #141e31 0%, #0d1626 100%)' }}>
        <div className="max-w-3xl mx-auto px-4 text-center">
          <AnimateIn>
            <div className="w-16 h-1 mx-auto mb-8 rounded-full" style={{ background: 'linear-gradient(90deg, #b49750, #d4b96a)' }} />
            <h2 className="font-display text-4xl font-bold text-white mb-4">
              Ready to Buy <span style={{ color: '#b49750' }}>New Construction?</span>
            </h2>
            <p className="text-white/70 text-lg mb-10 max-w-xl mx-auto">
              We've worked with every major builder in South Florida. We know which communities are delivering, which builders to avoid, and how to get the best deal at closing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/listings" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-sm shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                style={{ background: 'linear-gradient(135deg, #b49750, #d4b96a)', color: '#141e31' }}>
                🏗️ Explore New Builds
              </Link>
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-sm bg-white/10 border border-white/25 text-white hover:bg-white/20 transition-all">
                🤝 Get Expert Guidance (Free)
              </Link>
            </div>
            <p className="mt-6 text-white/40 text-sm">Builder pays your agent's commission · No cost to you · Expert advocacy</p>
          </AnimateIn>
        </div>
      </section>
    </div>
  )
}
