import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

/* ─── Intersection observer hook ──────────────────────────────────────── */
function useIntersection(threshold = 0.15) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [threshold])
  return [ref, isVisible]
}

/* ─── Animate-in wrapper ──────────────────────────────────────────────── */
function AnimateIn({ children, delay = 0, className = '', direction = 'up' }) {
  const [ref, isVisible] = useIntersection()
  const hidden =
    direction === 'left'  ? 'opacity-0 -translate-x-10' :
    direction === 'right' ? 'opacity-0 translate-x-10'  :
                            'opacity-0 translate-y-10'
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-x-0 translate-y-0' : hidden} ${className}`}
    >
      {children}
    </div>
  )
}

/* ─── Animated count-up number ────────────────────────────────────────── */
function CountUp({ target, suffix = '', duration = 1800 }) {
  const [count, setCount] = useState(0)
  const [ref, isVisible] = useIntersection(0.3)
  const started = useRef(false)

  useEffect(() => {
    if (!isVisible || started.current) return
    started.current = true
    const start = performance.now()
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [isVisible, target, duration])

  return (
    <span ref={ref}>
      {count.toLocaleString()}{suffix}
    </span>
  )
}

/* ─── Service data ────────────────────────────────────────────────────── */
const services = [
  {
    id: 'residential',
    image: '/services/residential.jpg',
    title: 'Residential Sales',
    subtitle: 'Buying & Selling Homes',
    badge: '🏠 500+ Homes Sold',
    description:
      "Whether you're looking to buy your dream home or sell your current property for top dollar, Nicolas provides expert guidance through every step of the residential real estate process.",
    features: [
      'Personalized home search tailored to your lifestyle',
      'Comprehensive comparative market analysis',
      'Professional photography & listing marketing',
      'Expert negotiation to protect your interests',
      'Full transaction management from offer to closing',
      'Pre-listing home evaluation and staging advice',
    ],
    ctaLabel: '🏠 Start Your Home Search',
    ctaLink: '/listings',
    bg: 'bg-white',
    textDark: true,
    imageLeft: true,
  },
  {
    id: 'investment',
    image: '/services/investment.jpg',
    title: 'Investment Properties',
    subtitle: 'Build Wealth Through Real Estate',
    badge: '📈 12% Avg ROI',
    description:
      "South Florida's real estate market offers exceptional investment opportunities. Nicolas helps investors identify, analyze, and acquire properties that deliver strong returns.",
    features: [
      'Investment property identification and evaluation',
      'Cash flow analysis and ROI projections',
      'Market trend analysis for optimal timing',
      'Off-market property sourcing',
      'Multi-family and income property expertise',
      'Portfolio growth strategy consultation',
    ],
    ctaLabel: '📊 Explore Investment Opportunities',
    ctaLink: '/listings?type=investment',
    bg: 'bg-gray-50',
    textDark: true,
    imageLeft: false,
  },
  {
    id: 'luxury',
    image: '/services/luxury.jpg',
    title: 'Luxury Real Estate',
    subtitle: "South Florida's Finest Properties",
    badge: '💎 $1M+ Listings',
    description:
      'The luxury market demands a different level of service, discretion, and market expertise. Nicolas provides the white-glove experience that premium properties and discerning clients require.',
    features: [
      'Access to exclusive luxury and waterfront listings',
      'Discreet, confidential buying and selling process',
      'High-net-worth client representation',
      'Premium marketing with professional media packages',
      'International buyer network connections',
      'Luxury condo and estate specialization',
    ],
    ctaLabel: '✨ Discover Luxury Properties',
    ctaLink: '/listings',
    bg: 'bg-white',
    textDark: true,
    imageLeft: true,
  },
  {
    id: 'first-time',
    image: '/services/first-time.jpg',
    title: 'First-Time Home Buyers',
    subtitle: 'Your Journey Starts Here',
    badge: '🔑 200+ First-Time Buyers Helped',
    description:
      "Buying your first home can feel overwhelming — but it doesn't have to. Nicolas walks first-time buyers through every step with patience, clarity, and unwavering support.",
    features: [
      'Step-by-step guidance through the entire process',
      'Pre-approval assistance and lender connections',
      'First-time buyer programs and incentive identification',
      'Neighborhood matching based on your priorities',
      'Plain-English explanation of all contracts and disclosures',
      'Post-closing support and homeowner resources',
    ],
    ctaLabel: '🔑 Begin Your Journey',
    ctaLink: '/contact',
    bg: 'bg-navy-800',
    textDark: false,
    imageLeft: false,
  },
]

/* ─── Gold gradient CTA button ───────────────────────────────────────── */
function GoldButton({ to, children, fullWidth = false }) {
  return (
    <Link
      to={to}
      className={`inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-navy-900 text-sm md:text-base
        bg-gradient-to-r from-gold-400 to-gold-500 shadow-lg
        hover:shadow-gold-400/50 hover:shadow-xl hover:from-gold-300 hover:to-gold-400
        transition-all duration-300 ${fullWidth ? 'w-full' : ''}`}
    >
      {children}
    </Link>
  )
}

/* ─── Service section ─────────────────────────────────────────────────── */
function ServiceSection({ service, index }) {
  const { id, image, title, subtitle, badge, description, features, ctaLabel, ctaLink, bg, textDark, imageLeft } = service

  /* gradient overlay direction on the image — fades toward the text side */
  const overlayGradient = imageLeft
    ? 'bg-gradient-to-r from-transparent via-transparent to-black/30'
    : 'bg-gradient-to-l from-transparent via-transparent to-black/30'

  /* gold edge bleed on the image side */
  const goldEdge = imageLeft
    ? 'after:absolute after:inset-y-0 after:right-0 after:w-16 after:bg-gradient-to-r after:from-transparent after:to-gold-400/20'
    : 'after:absolute after:inset-y-0 after:left-0 after:w-16 after:bg-gradient-to-l after:from-transparent after:to-gold-400/20'

  const textColor = textDark ? 'text-navy-800' : 'text-white'
  const subColor  = textDark ? 'text-gold-500'  : 'text-gold-300'
  const descColor = textDark ? 'text-gray-600'  : 'text-white/80'
  const featColor = textDark ? 'text-gray-700'  : 'text-white/90'

  return (
    <section id={id} className={`relative w-full overflow-hidden ${bg}`}>
      <div className="flex flex-col lg:flex-row min-h-[600px]">

        {/* ── IMAGE SIDE ── */}
        <div
          className={`relative w-full lg:w-1/2 h-72 lg:h-auto overflow-hidden group
            ${imageLeft ? 'lg:order-1' : 'lg:order-2'}
            ${goldEdge} after:pointer-events-none`}
        >
          {/* main photo */}
          <img
            src={image}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />

          {/* dark tint */}
          <div className="absolute inset-0 bg-navy-800/20" />

          {/* direction-aware overlay */}
          <div className={`absolute inset-0 ${overlayGradient}`} />

          {/* gold hover glow border */}
          <div className="absolute inset-0 border-4 border-transparent group-hover:border-gold-400/60 transition-all duration-500 pointer-events-none" />

          {/* stat badge */}
          <AnimateIn delay={300} direction={imageLeft ? 'left' : 'right'}>
            <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm text-navy-800 px-4 py-2 rounded-full text-sm font-bold shadow-xl flex items-center gap-2">
              {badge}
            </div>
          </AnimateIn>
        </div>

        {/* ── TEXT SIDE ── */}
        <div
          className={`relative w-full lg:w-1/2 flex items-center
            ${imageLeft ? 'lg:order-2' : 'lg:order-1'}
            px-8 md:px-12 lg:px-16 py-14 lg:py-20`}
        >
          <AnimateIn delay={100} direction={imageLeft ? 'right' : 'left'} className="max-w-lg">
            {/* accent line + subtitle */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-0.5 bg-gold-400 rounded-full" />
              <span className={`text-xs uppercase tracking-widest font-semibold ${subColor}`}>{subtitle}</span>
            </div>

            {/* title */}
            <h2 className={`font-display text-4xl md:text-5xl font-bold leading-tight mb-5 ${textColor}`}>
              {title}
            </h2>

            {/* description */}
            <p className={`text-base md:text-lg leading-relaxed mb-7 ${descColor}`}>
              {description}
            </p>

            {/* feature list */}
            <ul className="space-y-3 mb-9">
              {features.map((feat) => (
                <li key={feat} className="flex items-start gap-3">
                  <span className="text-gold-400 text-base mt-0.5 flex-shrink-0">✅</span>
                  <span className={`text-sm leading-relaxed ${featColor}`}>{feat}</span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <div className="block md:inline-block">
              <GoldButton to={ctaLink}>{ctaLabel}</GoldButton>
            </div>
          </AnimateIn>
        </div>
      </div>
    </section>
  )
}

/* ─── Main export ─────────────────────────────────────────────────────── */
export default function Services() {
  // SEO Meta Tags
  useEffect(() => {
    document.title = 'Real Estate Services | REO, Foreclosures & Investment Properties | Virtus Realty'
    const meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute('content', 'Full-service real estate: REO acquisition, bank foreclosure consulting, investment property analysis, Dominican Republic property sourcing, buyer/seller representation across South Florida.')
    // OG tags
    const ogTitle = document.querySelector('meta[property="og:title"]')
    if (ogTitle) ogTitle.setAttribute('content', 'Real Estate Services | REO, Foreclosures & Investment Properties | Virtus Realty')
    const ogDesc = document.querySelector('meta[property="og:description"]')
    if (ogDesc) ogDesc.setAttribute('content', 'Full-service real estate: REO acquisition, bank foreclosure consulting, investment property analysis, Dominican Republic property sourcing, buyer/seller representation across South Florida.')
    const ogUrl = document.querySelector('meta[property="og:url"]')
    if (ogUrl) ogUrl.setAttribute('content', 'https://virtusrealtygroup.com/services')
  }, [])

  return (
    <div>

      {/* ══════════════════════ HERO ════════════════════════════════════ */}
      <section className="relative pt-32 pb-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900" />

        {/* ambient glows */}
        <div className="absolute top-10 right-10 w-96 h-96 bg-gold-400/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-20 left-10 w-64 h-64 bg-gold-400/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pb-16">
          <AnimateIn delay={0}>
            <span className="inline-block text-gold-300 font-semibold text-xs uppercase tracking-widest mb-5">
              What We Offer
            </span>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Our Services
            </h1>
            <p className="text-white/70 text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed mb-2">
              We don't just list homes — <span className="text-gold-300 font-semibold">we build futures.</span>
            </p>
            <p className="text-white/60 text-lg max-w-2xl mx-auto leading-relaxed">
              From first-time buyers to seasoned investors, Virtus provides the expertise and
              market intelligence to win in South Florida.
            </p>
          </AnimateIn>
        </div>

        {/* ── Stats Strip ── */}
        <div className="relative border-t border-white/10 bg-navy-900/60 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x md:divide-white/10">
              {[
                { count: 500, suffix: '+', label: 'Homes Sold' },
                { count: 200, suffix: 'M+', label: 'In Transactions', prefix: '$' },
                { count: 67,  suffix: '',   label: 'Florida Counties' },
                { count: 15,  suffix: '+',  label: 'Years Experience' },
              ].map(({ count, suffix, label, prefix }) => (
                <AnimateIn key={label} delay={100} className="text-center md:px-8">
                  <div className="text-3xl md:text-4xl font-bold text-gold-400 mb-1">
                    {prefix && <span>{prefix}</span>}
                    <CountUp target={count} suffix={suffix} />
                  </div>
                  <div className="text-white/60 text-sm uppercase tracking-wide">{label}</div>
                </AnimateIn>
              ))}
            </div>
          </div>
        </div>

        {/* wave into first section */}
        <div className="relative h-12 overflow-hidden">
          <svg viewBox="0 0 1200 50" preserveAspectRatio="none" className="w-full h-full">
            <path d="M0,25 C400,50 800,0 1200,25 L1200,50 L0,50 Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* ══════════════════════ SERVICE SECTIONS ════════════════════════ */}
      {services.map((service, i) => (
        <ServiceSection key={service.id} service={service} index={i} />
      ))}

      {/* ══════════════════════ BOTTOM CTA ══════════════════════════════ */}
      <section className="py-24 bg-gradient-to-br from-navy-800 via-navy-700 to-navy-800 relative overflow-hidden">
        {/* ambient */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-gold-400/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-60 h-60 bg-gold-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimateIn>
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-0.5 bg-gold-400/60 rounded-full" />
              <span className="text-gold-300 text-xs uppercase tracking-widest font-semibold">Let's Connect</span>
              <div className="w-12 h-0.5 bg-gold-400/60 rounded-full" />
            </div>

            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-5">
              Ready to Get Started?
            </h2>
            <p className="text-white/70 text-lg md:text-xl leading-relaxed mb-10 max-w-xl mx-auto">
              Whether you're buying your first home or building a portfolio, Nicolas is ready to
              help you navigate the South Florida market.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+19546004976"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-bold text-navy-900
                  bg-gradient-to-r from-gold-400 to-gold-500 shadow-lg
                  hover:shadow-gold-400/50 hover:shadow-xl hover:from-gold-300 hover:to-gold-400
                  transition-all duration-300 text-base"
              >
                📞 Call (954) 600-4976
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-bold text-white
                  border-2 border-white/30 bg-white/10 backdrop-blur-sm
                  hover:border-gold-400 hover:bg-gold-400/10 hover:text-gold-300
                  transition-all duration-300 text-base"
              >
                📧 Send a Message
              </Link>
            </div>
          </AnimateIn>
        </div>
      </section>
    </div>
  )
}
