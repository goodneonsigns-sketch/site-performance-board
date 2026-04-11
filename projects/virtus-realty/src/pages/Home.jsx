import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSparkListings } from '../hooks/useSparkListings'
import PropertyCard from '../components/PropertyCard'

// Animation hook
function useIntersection(options = {}) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold: 0.15, ...options }
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

const stats = [
  { label: 'Homes Sold', value: '150+', icon: '🏠' },
  { label: 'Years Experience', value: '8+', icon: '⭐' },
  { label: 'Statewide Coverage', value: 'FL', icon: '🌴' },
  { label: 'Client Satisfaction', value: '98%', icon: '💎' },
]

const whyUs = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
      </svg>
    ),
    title: 'Local Market Expert',
    desc: 'Deep knowledge of Miami-Dade, Broward, Palm Beach, and St. Lucie counties — from neighborhood trends to school districts.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Maximum Value',
    desc: 'Whether buying or selling, our team negotiates hard to ensure you get the best possible outcome.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
    title: 'Personal Attention',
    desc: 'You work directly with our team — not a call center. Every client gets white-glove, hands-on service.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
    title: 'Data-Driven Strategy',
    desc: 'Real-time market analysis and comparative data so you always make informed, confident decisions.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Always Available',
    desc: "Real estate doesn't wait for business hours. We're available when you need us — evenings, weekends, and beyond.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    ),
    title: 'South Florida Native',
    desc: 'Born and raised in South Florida. We know every neighborhood, street, and hidden gem in the region.',
  },
]

const testimonials = [
  {
    name: 'Maria & Carlos R.',
    location: 'Hollywood, FL',
    text: 'Virtus Realty Group made buying our first home an incredible experience. Nicolas was patient, knowledgeable, and found us a gem we never would have discovered on our own. Highly recommend!',
    rating: 5,
  },
  {
    name: 'Jennifer T.',
    location: 'Boca Raton, FL',
    text: "Sold my home in just 12 days for above asking price. Nicolas's marketing strategy and negotiation skills are top-notch. He truly goes above and beyond.",
    rating: 5,
  },
  {
    name: 'David M.',
    location: 'Fort Lauderdale, FL',
    text: "As an investor, I've worked with many agents. Nicolas stands out for his market insight and responsiveness. He helped me acquire two excellent investment properties this year.",
    rating: 5,
  },
]

function FeaturedListingsSection() {
  const { listings, loading, error } = useSparkListings({ limit: 6 })

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="card overflow-hidden animate-pulse">
            <div className="h-52 bg-gray-200" />
            <div className="p-5 space-y-3">
              <div className="h-4 bg-gray-200 rounded w-3/4" />
              <div className="h-3 bg-gray-200 rounded w-1/2" />
              <div className="flex gap-2 mt-3">
                <div className="h-6 bg-gray-200 rounded-full w-14" />
                <div className="h-6 bg-gray-200 rounded-full w-14" />
                <div className="h-6 bg-gray-200 rounded-full w-18" />
              </div>
              <div className="h-10 bg-gray-200 rounded-lg mt-4" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (error || listings.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="inline-flex flex-col items-center gap-4">
          <svg
            className="w-14 h-14 text-gray-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
            />
          </svg>
          <p className="text-gray-500 text-lg font-medium">Listings loading...</p>
          <p className="text-gray-400 text-sm max-w-xs">
            Contact us for available properties.
          </p>
          <Link
            to="/contact"
            className="mt-2 inline-flex items-center gap-2 px-6 py-3 bg-navy-800 text-white text-sm font-semibold rounded-lg hover:bg-navy-900 transition-colors duration-200"
          >
            Contact Us for Available Properties
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {listings.slice(0, 6).map((listing, i) => (
        <AnimateIn key={listing.ListingKey || listing.ListingId || i} delay={i * 80}>
          <PropertyCard listing={listing} featured={i < 2} index={i} />
        </AnimateIn>
      ))}
    </div>
  )
}

export default function Home() {
  // SEO Meta Tags
  useEffect(() => {
    document.title = 'Virtus Realty Group | South Florida & Dominican Republic Real Estate Investment'
    const meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute('content', 'South Florida\'s trusted real estate experts specializing in REO properties, bank foreclosures, and Caribbean investment opportunities. Serving Broward, Palm Beach, Miami-Dade counties and the Dominican Republic.')
    // OG tags
    const ogTitle = document.querySelector('meta[property="og:title"]')
    if (ogTitle) ogTitle.setAttribute('content', 'Virtus Realty Group | South Florida & Dominican Republic Real Estate Investment')
    const ogDesc = document.querySelector('meta[property="og:description"]')
    if (ogDesc) ogDesc.setAttribute('content', 'South Florida\'s trusted real estate experts specializing in REO properties, bank foreclosures, and Caribbean investment opportunities. Serving Broward, Palm Beach, Miami-Dade counties and the Dominican Republic.')
    const ogUrl = document.querySelector('meta[property="og:url"]')
    if (ogUrl) ogUrl.setAttribute('content', 'https://virtusrealtygroup.com/')
  }, [])

  return (
    <div>
      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Waterfront background image */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/hero-waterfront.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />

        {/* Navy gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-navy-900/70 via-navy-900/50 to-navy-900/40" />

        {/* Subtle bottom vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 via-transparent to-transparent" />
        
        {/* Wave pattern */}
        <div className="absolute bottom-0 left-0 right-0 h-24 overflow-hidden">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="absolute bottom-0 w-full h-full">
            <path d="M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z" fill="white" />
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-white/90 text-sm font-medium mb-8">
            <span className="w-2 h-2 bg-gold-400 rounded-full animate-pulse" />
            Virtus Realty Group — South Florida Real Estate
          </div>
          
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 animate-fade-in">
            South Florida Real Estate
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-gold-300 to-gold-500 mt-2">
              Find Your Dream Home
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/85 max-w-2xl mx-auto mb-10 leading-relaxed">
            Virtus Realty Group brings expert local knowledge, personal service, and proven results 
            to every real estate transaction across South Florida.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/listings"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gold-500 text-navy-900 font-bold rounded-xl hover:bg-gold-600 transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 text-lg"
            >
              Browse Listings
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              to="/sell"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-navy-900 font-bold rounded-xl hover:bg-gold-50 transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 text-lg"
            >
              Get Free Valuation
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/40 text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-200 text-lg"
            >
              Meet Our Team
            </Link>
          </div>

          {/* Trust badges */}
          <div className="mt-14 flex flex-wrap justify-center gap-6">
            {[
              { icon: '🏆', label: 'Licensed Realtors' },
              { icon: '📍', label: 'South Florida Experts' },
              { icon: '⚡', label: 'Fast Response' },
              { icon: '🔒', label: 'Confidential & Trusted' },
            ].map(({ icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-white/80 text-sm">
                <span className="text-base">{icon}</span>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <AnimateIn key={stat.label} delay={i * 100}>
                <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-navy-50 to-gold-50 border border-navy-100">
                  <div className="text-3xl mb-2">{stat.icon}</div>
                  <div className="font-display text-4xl font-bold text-navy-800 mb-1">{stat.value}</div>
                  <div className="text-gray-500 text-sm font-medium">{stat.label}</div>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED LISTINGS — Spark API */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateIn>
            <div className="text-center mb-12">
              <span className="text-navy-600 font-semibold text-sm uppercase tracking-wider">Featured Properties</span>
              <h2 className="section-title mt-2">Current Listings</h2>
              <p className="section-subtitle mx-auto mt-3">
                Browse our latest available properties. Updated directly from our MLS database.
              </p>
            </div>
          </AnimateIn>

          <FeaturedListingsSection />

          <AnimateIn>
            <div className="text-center mt-10">
              <Link to="/listings" className="btn-primary text-lg px-8 py-4">
                View All Listings →
              </Link>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateIn>
            <div className="text-center mb-14">
              <span className="text-gold-500 font-semibold text-sm uppercase tracking-wider">Why Virtus Realty</span>
              <h2 className="section-title mt-2">The Virtus Difference</h2>
              <p className="section-subtitle mx-auto mt-3">
                We combine deep market expertise with genuine care for every client's success.
              </p>
            </div>
          </AnimateIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyUs.map((item, i) => (
              <AnimateIn key={item.title} delay={i * 80}>
                <div className="p-6 rounded-2xl border border-gray-100 hover:border-navy-200 hover:shadow-lg transition-all duration-300 group">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-navy-100 to-gold-100 flex items-center justify-center text-navy-700 mb-4 group-hover:from-navy-800 group-hover:to-navy-600 group-hover:text-white transition-all duration-300">
                    {item.icon}
                  </div>
                  <h3 className="font-display font-semibold text-lg text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-16 bg-gradient-to-r from-navy-900 via-navy-800 to-navy-700 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-gold-300 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimateIn>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
              What's Your Home Worth Today?
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
              Get a free, no-obligation home valuation. Accurate, data-driven, and delivered fast.
            </p>
            <Link
              to="/sell"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gold-500 text-navy-900 font-bold rounded-xl hover:bg-gold-400 transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 text-lg"
            >
              Get Your Free Valuation
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </AnimateIn>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateIn>
            <div className="text-center mb-12">
              <span className="text-gold-600 font-semibold text-sm uppercase tracking-wider">Client Stories</span>
              <h2 className="section-title mt-2">What Our Clients Say</h2>
            </div>
          </AnimateIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <AnimateIn key={t.name} delay={i * 120}>
                <div className="card p-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(t.rating)].map((_, si) => (
                      <svg key={si} className="w-5 h-5 text-gold-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-600 leading-relaxed mb-5 italic">"{t.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-navy-700 to-gold-500 flex items-center justify-center text-white font-bold text-sm">
                      {t.name[0]}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                      <p className="text-gray-400 text-xs">{t.location}</p>
                    </div>
                  </div>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* AREAS PREVIEW */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateIn>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
              <div>
                <span className="text-navy-600 font-semibold text-sm uppercase tracking-wider">Where We Work</span>
                <h2 className="section-title mt-2">South Florida Coverage</h2>
              </div>
              <Link to="/areas" className="text-navy-700 font-semibold hover:text-gold-600 flex items-center gap-1 transition-colors">
                View All Areas <span>→</span>
              </Link>
            </div>
          </AnimateIn>

          <div className="flex flex-wrap gap-3">
            {[
              'Hollywood', 'Hallandale Beach', 'Fort Lauderdale', 'Aventura',
              'Boca Raton', 'West Palm Beach', 'Port St. Lucie', 'Pembroke Pines',
              'Weston', 'Coral Springs', 'Parkland', 'Plantation',
            ].map((area, i) => (
              <AnimateIn key={area} delay={i * 40}>
                <Link
                  to="/areas"
                  className="px-5 py-2.5 bg-gradient-to-r from-navy-50 to-gold-50 border border-navy-200 text-navy-700 rounded-full text-sm font-medium hover:from-navy-800 hover:to-navy-700 hover:text-white hover:border-transparent transition-all duration-200 hover:shadow-md"
                >
                  📍 {area}
                </Link>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 bg-gradient-to-br from-navy-900 to-navy-800 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-72 h-72 bg-navy-700/30 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-72 h-72 bg-gold-500/10 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimateIn>
            <span className="inline-block text-gold-400 font-semibold text-sm uppercase tracking-wider mb-4">Ready to Start?</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
              Let's Find Your Perfect
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-gold-300 to-gold-500">
                South Florida Home
              </span>
            </h2>
            <p className="text-white/70 text-lg max-w-xl mx-auto mb-10">
              Whether you're buying, selling, or investing — our team is ready to guide you every step of the way. 
              The consultation is free, the results are real.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/sell"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gold-500 text-navy-900 font-bold rounded-xl hover:bg-gold-400 transition-all duration-200 shadow-xl text-lg"
              >
                Schedule a Free Consultation
              </Link>
              <a
                href="tel:9546004976"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 border border-white/30 text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-200 text-lg"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                (954) 600-4976
              </a>
            </div>
          </AnimateIn>
        </div>
      </section>
    </div>
  )
}
