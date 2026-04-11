import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

function useIntersection() {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold: 0.12 }
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

// Real listings from homes.com — MLS ID: 3443634
// https://www.homes.com/real-estate-agents/nicolas-gonzalez/2jl0m9b/
// Showing recent highlights (19 total listings on Homes.com)

const activeListings = [
  {
    address: '3950 Fieldview Way',
    price: '$2,599,000',
    beds: 5,
    baths: '3',
    sqft: '2,892',
    status: 'FOR SALE',
    role: 'Represented Seller',
    newConstruction: false,
    isLand: false,
    image: '/listings/fieldview.jpg',
  },
  {
    address: '48th Avenue',
    price: '$1,250,000',
    beds: 4,
    baths: '3.5',
    sqft: '3,400',
    status: 'FOR SALE',
    role: 'Represented Seller',
    newConstruction: true,
    isLand: false,
    image: '/listings/48th-ave.jpg',
  },
  {
    address: '12882 Granite Mountain Pass',
    price: '$1,225,000',
    beds: 3,
    baths: '3',
    sqft: '2,685',
    status: 'FOR SALE',
    role: 'Represented Seller',
    newConstruction: false,
    isLand: false,
    image: '/listings/granite-mountain.jpg',
  },
]

const pendingListings = [
  {
    address: '18853 42nd Rd N',
    price: '$875,000',
    beds: 4,
    baths: '3',
    sqft: '2,770',
    status: 'PENDING',
    role: 'Represented Seller',
    newConstruction: true,
    isLand: false,
    image: '/listings/18853-42nd.jpg',
  },
]

const soldListings = [
  {
    address: '15352 88th Place N',
    price: '$860,000',
    beds: 4,
    baths: '3',
    sqft: '2,612',
    status: 'SOLD',
    role: 'Represented Seller',
    newConstruction: true,
    isLand: false,
    image: '/listings/15352-88th-pl.jpg',
  },
  {
    address: '18099 N 49th St',
    price: '$834,900',
    beds: 4,
    baths: '3',
    sqft: '2,450',
    status: 'SOLD',
    role: 'Represented Buyer & Seller',
    newConstruction: true,
    isLand: false,
    image: '/listings/18099-n-49th.jpg',
  },
  {
    address: '0 73rd St N',
    price: '$250,000',
    acres: '1.29',
    status: 'SOLD',
    role: 'Represented Buyer',
    newConstruction: false,
    isLand: true,
    image: '/listings/73rd-st.jpg',
  },
  {
    address: '0000 N 49th St',
    price: '$235,000',
    acres: '1.15',
    status: 'SOLD',
    role: 'Represented Buyer',
    newConstruction: false,
    isLand: true,
    image: '/listings/0000-n-49th.jpg',
  },
]

const stats = [
  {
    label: 'Languages',
    value: 'English & Spanish',
    icon: '🌐',
  },
  {
    label: 'Specialties',
    value: 'Residential Sales, Investment Properties',
    icon: '🏡',
  },
  {
    label: 'Markets Served',
    value: 'Broward · Miami-Dade · Palm Beach · St. Lucie',
    icon: '📍',
  },
  {
    label: 'Co-Founder',
    value: 'Virtus Realty Group',
    icon: '🏢',
  },
]

const statusStyles = {
  'FOR SALE': {
    badge: 'bg-emerald-100 text-emerald-700',
    dot: 'bg-emerald-500',
    bar: 'from-emerald-500 to-emerald-400',
  },
  PENDING: {
    badge: 'bg-amber-100 text-amber-700',
    dot: 'bg-amber-500',
    bar: 'from-amber-500 to-amber-400',
  },
  SOLD: {
    badge: 'bg-navy-100 text-navy-700',
    dot: 'bg-navy-600',
    bar: 'from-navy-700 to-gold-500',
  },
}

function ListingCard({ tx, delay = 0 }) {
  const style = statusStyles[tx.status] || statusStyles['SOLD']
  return (
    <AnimateIn delay={delay}>
      <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group h-full flex flex-col">
        {/* Photo header */}
        {tx.image ? (
          <div className="relative w-full overflow-hidden rounded-t-2xl" style={{ aspectRatio: '3/2' }}>
            <img
              src={tx.image}
              alt={tx.address}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {/* Status badge overlay */}
            <div className="absolute top-3 left-3">
              <span className={`inline-flex items-center gap-1.5 ${style.badge} text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide shadow-sm`}>
                <span className={`w-1.5 h-1.5 rounded-full ${style.dot} inline-block`} />
                {tx.status}
              </span>
            </div>
            {tx.newConstruction && (
              <div className="absolute top-3 right-3">
                <span className="inline-flex items-center gap-1 bg-gold-50 text-gold-700 border border-gold-200 text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm">
                  🏗️ New
                </span>
              </div>
            )}
          </div>
        ) : (
          /* Placeholder when no image */
          <div className="relative w-full bg-gray-100 rounded-t-2xl flex items-center justify-center" style={{ aspectRatio: '3/2' }}>
            <svg className="w-12 h-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <div className="absolute top-3 left-3">
              <span className={`inline-flex items-center gap-1.5 ${style.badge} text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide shadow-sm`}>
                <span className={`w-1.5 h-1.5 rounded-full ${style.dot} inline-block`} />
                {tx.status}
              </span>
            </div>
            {tx.newConstruction && (
              <div className="absolute top-3 right-3">
                <span className="inline-flex items-center gap-1 bg-gold-50 text-gold-700 border border-gold-200 text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm">
                  🏗️ New
                </span>
              </div>
            )}
          </div>
        )}

        <div className="p-6 flex flex-col flex-1">
          {/* Address */}
          <h3 className="font-display font-bold text-gray-900 text-lg leading-tight group-hover:text-navy-700 transition-colors">
            {tx.address}
          </h3>

          {/* Price */}
          <p className="text-gold-600 font-bold text-2xl mt-3 font-display">{tx.price}</p>

          {/* Property details */}
          <div className="flex items-center flex-wrap gap-3 mt-4 pt-4 border-t border-gray-100">
            {tx.isLand ? (
              <span className="flex items-center gap-1.5 text-sm text-gray-600 font-medium">
                <svg className="w-4 h-4 text-navy-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {tx.acres} Acres · Vacant Land
              </span>
            ) : (
              <>
                <span className="flex items-center gap-1.5 text-sm text-gray-600 font-medium">
                  <svg className="w-4 h-4 text-navy-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  {tx.beds} bd
                </span>
                <span className="flex items-center gap-1.5 text-sm text-gray-600 font-medium">
                  <svg className="w-4 h-4 text-navy-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {tx.baths} ba
                </span>
                <span className="flex items-center gap-1.5 text-sm text-gray-600 font-medium">
                  <svg className="w-4 h-4 text-navy-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  </svg>
                  {tx.sqft} sqft
                </span>
              </>
            )}
          </div>

          {/* Role */}
          <div className="mt-4 pt-3 border-t border-gray-50">
            <span className="text-xs text-gray-500 font-medium">
              👤 {tx.role}
            </span>
          </div>
        </div>
      </div>
    </AnimateIn>
  )
}

function SectionHeading({ label, count }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <h3 className="font-display font-bold text-xl text-gray-900">{label}</h3>
      <span className="bg-gray-100 text-gray-600 text-xs font-bold px-2.5 py-1 rounded-full">{count}</span>
      <div className="flex-1 h-px bg-gray-100" />
    </div>
  )
}

export default function AgentNicolas() {
  // SEO Meta Tags
  useEffect(() => {
    document.title = 'Nicolas Gonzalez | Licensed Realtor | REO & Dominican Republic Property Specialist'
    const meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute('content', 'Nicolas Gonzalez — South Florida licensed realtor specializing in REO properties, bank foreclosures, and Dominican Republic real estate investments. Direct: (954) 498-3728.')
    // OG tags
    const ogTitle = document.querySelector('meta[property="og:title"]')
    if (ogTitle) ogTitle.setAttribute('content', 'Nicolas Gonzalez | Licensed Realtor | REO & Dominican Republic Property Specialist')
    const ogDesc = document.querySelector('meta[property="og:description"]')
    if (ogDesc) ogDesc.setAttribute('content', 'Nicolas Gonzalez — South Florida licensed realtor specializing in REO properties, bank foreclosures, and Dominican Republic real estate investments. Direct: (954) 498-3728.')
    const ogUrl = document.querySelector('meta[property="og:url"]')
    if (ogUrl) ogUrl.setAttribute('content', 'https://virtusrealtygroup.com/team/nicolas-gonzalez')
  }, [])

  return (
    <div>
      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-97" />
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-0 w-72 h-72 bg-navy-400/20 rounded-full blur-3xl" />
        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0 h-16">
          <svg viewBox="0 0 1200 80" preserveAspectRatio="none" className="w-full h-full">
            <path d="M0,40 C400,80 800,0 1200,40 L1200,80 L0,80 Z" fill="white" />
          </svg>
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12">
            {/* Avatar */}
            <div className="flex-shrink-0">
              <div className="relative">
                <div className="w-40 h-40 lg:w-52 lg:h-52 rounded-full bg-gradient-to-br from-gold-500 to-gold-400 flex items-center justify-center shadow-2xl ring-4 ring-white/20">
                  <span className="font-display font-bold text-6xl lg:text-7xl text-white select-none">NG</span>
                </div>
                {/* Badge */}
                <div className="absolute -bottom-3 -right-3 bg-white rounded-2xl shadow-xl px-3 py-2 border border-gray-100">
                  <p className="text-xs font-bold text-navy-700 leading-tight">REALTOR®</p>
                  <p className="text-xs text-gold-600 font-medium">Co-Founder</p>
                </div>
              </div>
            </div>

            {/* Name + contact */}
            <div className="text-center lg:text-left">
              <span className="inline-block text-gold-300 font-semibold text-sm uppercase tracking-wider mb-3">
                Virtus Realty Group
              </span>
              <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-3">
                Nicolas Gonzalez
              </h1>
              <p className="text-white/70 text-xl mb-8 font-medium">
                Licensed REALTOR® | Co-Founder
              </p>

              {/* Contact buttons */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                <a
                  href="tel:9544983728"
                  className="flex items-center gap-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white font-semibold px-5 py-3 rounded-xl transition-all duration-200"
                >
                  <svg className="w-5 h-5 text-gold-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  (954) 498-3728
                </a>
                <a
                  href="mailto:info@virtusrealtygroup.com"
                  className="flex items-center gap-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white font-semibold px-5 py-3 rounded-xl transition-all duration-200"
                >
                  <svg className="w-5 h-5 text-gold-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Email Nicolas
                </a>
                <a
                  href="https://wa.me/19544983728"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 bg-[#25D366]/80 hover:bg-[#25D366] border border-[#25D366]/40 text-white font-semibold px-5 py-3 rounded-xl transition-all duration-200"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  WhatsApp
                </a>
              </div>

              {/* Homes.com link */}
              <div className="mt-5">
                <a
                  href="https://www.homes.com/real-estate-agents/nicolas-gonzalez/2jl0m9b/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-white/60 hover:text-gold-300 text-sm font-medium transition-colors duration-200 underline underline-offset-4"
                >
                  View full profile on Homes.com →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── BIO ──────────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            {/* Bio text */}
            <div className="lg:col-span-2">
              <AnimateIn>
                <span className="text-gold-500 font-semibold text-sm uppercase tracking-wider">About Nicolas</span>
                <h2 className="font-display text-4xl font-bold text-gray-900 mt-2 mb-6">
                  South Florida Real Estate, Done Right
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Nicolas Gonzalez is a licensed Florida REALTOR® and the co-founder of Virtus Realty Group. A serial
                  entrepreneur, dedicated father, and lifelong South Florida resident, Nicolas brings the same drive and
                  discipline he applies to building successful businesses to every real estate transaction.
                </p>
                <p className="text-gray-600 text-lg leading-relaxed mt-5">
                  Fluent in English and Spanish, he specializes in residential properties across Broward, Miami-Dade,
                  and Palm Beach counties — helping buyers find their perfect home and sellers maximize their return.
                  Whether you're a first-time buyer navigating the process or an investor building a portfolio, Nicolas
                  provides honest, no-pressure guidance backed by deep local market knowledge.
                </p>

                {/* Credentials */}
                <div className="mt-8 flex flex-wrap gap-2">
                  {[
                    'Florida Licensed REALTOR®',
                    'Co-Founder, Virtus Realty Group',
                    'MLS ID: 3443634',
                    'NAR Member',
                    'First-Time Buyer Specialist',
                    'Bilingual — English / Spanish',
                  ].map(cred => (
                    <span
                      key={cred}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-navy-50 border border-navy-100 text-navy-700 text-xs font-semibold"
                    >
                      <svg className="w-3.5 h-3.5 text-gold-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      {cred}
                    </span>
                  ))}
                </div>
              </AnimateIn>
            </div>

            {/* Sidebar contact card */}
            <AnimateIn delay={100}>
              <div className="bg-gradient-to-br from-navy-700 to-navy-900 rounded-2xl p-6 text-white shadow-xl">
                <h3 className="font-display font-bold text-lg mb-5">Ready to Work Together?</h3>
                <div className="space-y-3">
                  <a
                    href="tel:9544983728"
                    className="flex items-center gap-3 p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-colors"
                  >
                    <svg className="w-5 h-5 text-gold-300 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <div>
                      <p className="text-white/60 text-xs">Call or Text</p>
                      <p className="font-semibold text-sm">(954) 498-3728</p>
                    </div>
                  </a>
                  <a
                    href="mailto:info@virtusrealtygroup.com"
                    className="flex items-center gap-3 p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-colors"
                  >
                    <svg className="w-5 h-5 text-gold-300 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <div>
                      <p className="text-white/60 text-xs">Email</p>
                      <p className="font-semibold text-sm">info@virtusrealtygroup.com</p>
                    </div>
                  </a>
                </div>
                <div className="mt-5 space-y-2.5">
                  <a
                    href="https://wa.me/19544983728"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center bg-[#25D366] hover:bg-[#1eb857] text-white font-bold py-3 rounded-xl transition-colors duration-200"
                  >
                    Message on WhatsApp
                  </a>
                  <Link
                    to="/contact"
                    className="block text-center bg-gold-500 hover:bg-gold-600 text-navy-900 font-bold py-3 rounded-xl transition-colors duration-200"
                  >
                    Send a Message
                  </Link>
                </div>
                <p className="text-white/50 text-xs text-center mt-4">
                  Typically responds within 2–4 hours · 7 days a week
                </p>
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* ── QUICK STATS ──────────────────────────────────────────── */}
      <section className="py-16 bg-gray-50 border-y border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateIn>
            <div className="text-center mb-10">
              <span className="text-navy-600 font-semibold text-sm uppercase tracking-wider">At a Glance</span>
              <h2 className="font-display text-3xl font-bold text-gray-900 mt-2">Quick Stats</h2>
            </div>
          </AnimateIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <AnimateIn key={stat.label} delay={i * 80}>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 text-center">
                  <div className="text-3xl mb-3">{stat.icon}</div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">{stat.label}</p>
                  <p className="font-semibold text-gray-900 text-sm leading-snug">{stat.value}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── LISTINGS & TRANSACTIONS ───────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateIn>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-6 gap-4">
              <div>
                <span className="text-gold-500 font-semibold text-sm uppercase tracking-wider">Track Record</span>
                <h2 className="font-display text-4xl font-bold text-gray-900 mt-2">Listings &amp; Transactions</h2>
                <p className="text-gray-500 mt-2 text-sm">
                  Showing recent highlights — 19 total listings on Homes.com · MLS ID: 3443634
                </p>
              </div>
              <a
                href="https://www.homes.com/real-estate-agents/nicolas-gonzalez/2jl0m9b/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-navy-600 hover:text-gold-600 font-semibold text-sm transition-colors duration-200 whitespace-nowrap"
              >
                View all on Homes.com →
              </a>
            </div>

            {/* Volume stat */}
            <div className="inline-flex items-center gap-3 bg-navy-50 border border-navy-100 rounded-xl px-5 py-3 mb-12">
              <span className="text-2xl">📊</span>
              <div>
                <p className="text-xs text-navy-500 font-semibold uppercase tracking-wider">Total Transaction Volume</p>
                <p className="font-display font-bold text-navy-900 text-xl">$6.9M+</p>
              </div>
            </div>
          </AnimateIn>

          {/* Active Listings */}
          <AnimateIn delay={80}>
            <SectionHeading label="Active Listings" count={activeListings.length} />
          </AnimateIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
            {activeListings.map((tx, i) => (
              <ListingCard key={tx.address + tx.price} tx={tx} delay={100 + i * 80} />
            ))}
          </div>

          {/* Under Contract */}
          <AnimateIn delay={80}>
            <SectionHeading label="Under Contract" count={pendingListings.length} />
          </AnimateIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
            {pendingListings.map((tx, i) => (
              <ListingCard key={tx.address + tx.price} tx={tx} delay={100 + i * 80} />
            ))}
          </div>

          {/* Recent Sales */}
          <AnimateIn delay={80}>
            <SectionHeading label="Recent Sales" count={soldListings.length} />
          </AnimateIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {soldListings.map((tx, i) => (
              <ListingCard key={tx.address + tx.price} tx={tx} delay={100 + i * 80} />
            ))}
          </div>

          <AnimateIn delay={400}>
            <div className="mt-10 text-center">
              <a
                href="https://www.homes.com/real-estate-agents/nicolas-gonzalez/2jl0m9b/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-navy-600 hover:text-gold-600 font-semibold text-sm transition-colors duration-200 border border-navy-200 hover:border-gold-400 px-6 py-3 rounded-xl"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                View All 19 Listings on Homes.com
              </a>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ── WORK WITH NICOLAS CTA ─────────────────────────────────── */}
      <section className="py-20 gradient-ocean relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold-300 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimateIn>
            <span className="inline-block text-gold-300 font-semibold text-sm uppercase tracking-wider mb-4">
              Let's Make It Happen
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-5">
              Work With Nicolas
            </h2>
            <p className="text-white/75 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
              Buying, selling, or investing — Nicolas brings honest guidance, deep local knowledge,
              and zero pressure to every conversation. Reach out today.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/19544983728?text=Hi%20Nicolas!%20I%20saw%20your%20profile%20on%20Virtus%20Realty%20and%20would%20love%20to%20chat."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#1eb857] text-white font-bold px-8 py-4 rounded-xl text-lg transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Message on WhatsApp
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 bg-white/15 hover:bg-white/25 backdrop-blur-sm border-2 border-white/30 text-white font-bold px-8 py-4 rounded-xl text-lg transition-all duration-200"
              >
                Send a Message →
              </Link>
            </div>

            <p className="text-white/50 text-sm mt-8">
              Licensed REALTOR® · Fluent in English &amp; Spanish · Serving all of South Florida
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* ── BACK TO TEAM ─────────────────────────────────────────── */}
      <section className="py-10 bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link
            to="/about"
            className="inline-flex items-center gap-1.5 text-navy-600 hover:text-gold-600 font-medium text-sm transition-colors duration-200"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Our Team
          </Link>
          <a
            href="https://www.homes.com/real-estate-agents/nicolas-gonzalez/2jl0m9b/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-navy-500 hover:text-gold-600 font-medium text-sm transition-colors duration-200"
          >
            View full profile on Homes.com →
          </a>
        </div>
      </section>
    </div>
  )
}
