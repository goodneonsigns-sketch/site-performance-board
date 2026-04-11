import React, { useEffect, useRef, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'

// ─── Intersection observer hook ───────────────────────────────────────────────
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

// ─── Animated count-up hook ───────────────────────────────────────────────────
function useCountUp(target, duration = 2000, startOnVisible = true) {
  const [count, setCount] = useState(0)
  const [ref, isVisible] = useIntersection({ threshold: 0.3 })
  const started = useRef(false)

  useEffect(() => {
    if (!isVisible || started.current) return
    started.current = true
    const numericTarget = parseFloat(target.replace(/[^0-9.]/g, ''))
    const start = performance.now()
    const step = (timestamp) => {
      const progress = Math.min((timestamp - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * numericTarget))
      if (progress < 1) requestAnimationFrame(step)
      else setCount(numericTarget)
    }
    requestAnimationFrame(step)
  }, [isVisible, target, duration])

  return [ref, count]
}

// ─── Sparkle animation ────────────────────────────────────────────────────────
function Sparkles() {
  const [sparks, setSparks] = useState([])

  useEffect(() => {
    const items = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 8 + 4,
      delay: Math.random() * 800,
      duration: Math.random() * 600 + 600,
    }))
    setSparks(items)
  }, [])

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {sparks.map((s) => (
        <div
          key={s.id}
          className="absolute animate-ping rounded-full"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            backgroundColor: '#D4AF37',
            opacity: 0.7,
            animationDelay: `${s.delay}ms`,
            animationDuration: `${s.duration}ms`,
          }}
        />
      ))}
    </div>
  )
}

// ─── Stat counter card ────────────────────────────────────────────────────────
function StatCard({ value, label, prefix = '', suffix = '' }) {
  const numericStr = value.replace(/[^0-9.]/g, '')
  const hasPlus = value.includes('+')
  const hasPct = value.includes('%')
  const [ref, count] = useCountUp(value)

  return (
    <div ref={ref} className="text-center">
      <div
        className="font-display text-5xl md:text-6xl font-extrabold mb-2"
        style={{ color: '#D4AF37' }}
      >
        {prefix}{count}{hasPct ? '%' : ''}{hasPlus ? '+' : ''}
      </div>
      <div className="text-white/70 text-sm font-medium uppercase tracking-wider">{label}</div>
    </div>
  )
}

// ─── Why-Sell advantages ──────────────────────────────────────────────────────
const advantages = [
  {
    icon: '📈',
    title: 'Data-Driven Pricing',
    desc: "We don't guess — we analyze. Using live MLS data, recent comps, and market trends, we price your home to sell fast AND for top dollar.",
  },
  {
    icon: '📸',
    title: 'Premium Marketing',
    desc: 'Professional photography, 3D virtual tours, drone footage, targeted social media ads, and syndication to 500+ listing sites.',
  },
  {
    icon: '🤝',
    title: 'Expert Negotiation',
    desc: "Nicolas has closed $200M+ in transactions. His negotiation skills mean more money in your pocket and fewer headaches at the table.",
  },
  {
    icon: '⚡',
    title: 'Fast Results',
    desc: 'Our listings sell 18% faster than the market average. Less time on market = more money saved.',
  },
  {
    icon: '🌐',
    title: 'Global Reach',
    desc: 'South Florida attracts international buyers. We market your property to qualified buyers across Latin America, Europe, and beyond.',
  },
  {
    icon: '🔑',
    title: 'Full Service',
    desc: 'From staging advice to closing coordination — we handle everything. You focus on your next chapter.',
  },
]

// ─── Process steps ────────────────────────────────────────────────────────────
const steps = [
  {
    num: '01',
    icon: '📋',
    title: 'Request Your Free Valuation',
    desc: 'Fill out the quick form below. It takes 60 seconds.',
  },
  {
    num: '02',
    icon: '📊',
    title: 'Receive Your Market Analysis',
    desc: "Within 24 hours, you'll get a comprehensive report with comparable sales, market trends, and our recommended list price.",
  },
  {
    num: '03',
    icon: '🚀',
    title: 'List With Confidence',
    desc: "Ready to sell? We'll handle the marketing, showings, negotiations, and closing. You just pack.",
  },
]

// ─── Testimonials ─────────────────────────────────────────────────────────────
const testimonials = [
  {
    quote: 'Nicolas sold our condo in 11 days, $15K over asking. His market knowledge is unmatched.',
    name: 'Maria & Jose R.',
    location: 'Fort Lauderdale, FL',
  },
  {
    quote: 'We interviewed 3 agents. Nicolas was the only one who showed us actual data on why his pricing strategy would work. He was right — we got full asking price in 2 weeks.',
    name: 'David Chen',
    location: 'Boca Raton, FL',
  },
]

// ─── Pill selector ────────────────────────────────────────────────────────────
function PillGroup({ options, value, onChange, name }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => onChange(opt)}
          className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all duration-200 ${
            value === opt
              ? 'bg-gradient-to-r from-yellow-500 to-yellow-400 border-yellow-400 text-navy-900 shadow-md'
              : 'bg-white/10 border-white/30 text-white/80 hover:border-yellow-400/60 hover:text-white'
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  )
}

// ─── Main Sell page ───────────────────────────────────────────────────────────
export default function Sell() {
  // SEO Meta Tags
  useEffect(() => {
    document.title = 'Sell Your Property | Free Home Valuation | Virtus Realty Group'
    const meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute('content', 'Sell your South Florida home with Virtus Realty Group. Free property valuation, expert marketing, and fast closings. Specializing in all property types including distressed sales.')
    // OG tags
    const ogTitle = document.querySelector('meta[property="og:title"]')
    if (ogTitle) ogTitle.setAttribute('content', 'Sell Your Property | Free Home Valuation | Virtus Realty Group')
    const ogDesc = document.querySelector('meta[property="og:description"]')
    if (ogDesc) ogDesc.setAttribute('content', 'Sell your South Florida home with Virtus Realty Group. Free property valuation, expert marketing, and fast closings. Specializing in all property types including distressed sales.')
    const ogUrl = document.querySelector('meta[property="og:url"]')
    if (ogUrl) ogUrl.setAttribute('content', 'https://virtusrealtygroup.com/sell')
  }, [])

  const formRef = useRef(null)
  const [submitted, setSubmitted] = useState(false)

  // Form state
  const [form, setForm] = useState({
    address: '',
    city: '',
    beds: '',
    baths: '',
    sqft: '',
    timeline: '',
    name: '',
    email: '',
    phone: '',
  })
  const [errors, setErrors] = useState({})

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))
  const setPill = (field) => (val) => setForm((f) => ({ ...f, [field]: val }))

  const validate = () => {
    const e = {}
    if (!form.address.trim()) e.address = 'Address is required'
    if (!form.city.trim()) e.city = 'City is required'
    if (!form.beds) e.beds = 'Select bedrooms'
    if (!form.baths) e.baths = 'Select bathrooms'
    if (!form.timeline) e.timeline = 'Select your timeline'
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required'
    if (!form.phone.trim()) e.phone = 'Phone is required'
    return e
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) {
      setErrors(errs)
      // Scroll to first error
      const firstErr = Object.keys(errs)[0]
      document.querySelector(`[data-field="${firstErr}"]`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }
    const payload = {
      propertyAddress: form.address,
      city: form.city,
      bedrooms: form.beds,
      bathrooms: form.baths,
      sqft: form.sqft,
      timeline: form.timeline,
      ownerName: form.name,
      email: form.email,
      phone: form.phone,
      submittedAt: new Date().toISOString(),
    }
    console.log('Seller Lead:', JSON.stringify(payload, null, 2))
    setSubmitted(true)
    window.scrollTo({ top: formRef.current?.offsetTop - 100, behavior: 'smooth' })
  }

  const inputClass = (field) =>
    `w-full px-4 py-3 rounded-xl bg-white/10 border ${
      errors[field] ? 'border-red-400' : 'border-white/25'
    } text-white placeholder-white/40 focus:outline-none focus:border-yellow-400 focus:bg-white/15 transition-all duration-200 text-sm`

  return (
    <div className="font-sans">

      {/* ═══════════════════════════════════════════════════════
          HERO
      ═══════════════════════════════════════════════════════ */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/services/residential.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center 30%',
          }}
        />
        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-navy-900/80 via-navy-900/65 to-navy-900/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-900/40 via-transparent to-navy-900/40" />

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0 h-20 overflow-hidden">
          <svg viewBox="0 0 1200 80" preserveAspectRatio="none" className="absolute bottom-0 w-full h-full">
            <path d="M0,40 C400,80 800,0 1200,40 L1200,80 L0,80 Z" fill="white" />
          </svg>
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2 text-white/90 text-sm font-medium mb-8">
            <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
            Free Market Analysis · No Obligation · 24-Hour Delivery
          </div>

          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-6">
            What's Your Home
            <span
              className="block"
              style={{ color: '#D4AF37' }}
            >
              Really Worth?
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-white/85 max-w-2xl mx-auto mb-10 leading-relaxed">
            Get a free, no-obligation market analysis from South Florida's most data-driven real estate team.
            We'll show you exactly how to <strong className="text-white">maximize your sale price.</strong>
          </p>

          {/* Hero CTA */}
          <button
            onClick={scrollToForm}
            className="inline-flex items-center gap-3 px-10 py-5 font-bold rounded-2xl text-navy-900 text-lg shadow-2xl transform hover:-translate-y-1 transition-all duration-200 hover:shadow-yellow-500/30 relative overflow-hidden group"
            style={{
              background: 'linear-gradient(135deg, #D4AF37 0%, #F5CC50 50%, #D4AF37 100%)',
              backgroundSize: '200% 200%',
            }}
          >
            <span className="text-2xl">🏠</span>
            Get Your Free Valuation
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Animated counter */}
          <div className="mt-12 inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-8 py-4">
            <span className="text-3xl font-extrabold" style={{ color: '#D4AF37' }}>$200M+</span>
            <span className="text-white/80 text-sm">in South Florida properties sold by our team</span>
          </div>

          {/* Trust badges */}
          <div className="mt-8 flex flex-wrap justify-center gap-6">
            {[
              { icon: '⚡', label: 'Report in 24 Hours' },
              { icon: '🔒', label: 'No Obligation' },
              { icon: '📊', label: 'MLS Data-Backed' },
            ].map(({ icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-white/80 text-sm font-medium">
                <span>{icon}</span>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          WHY SELL WITH VIRTUS
      ═══════════════════════════════════════════════════════ */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateIn>
            <div className="text-center mb-16">
              <span className="text-yellow-600 font-semibold text-sm uppercase tracking-widest">Why Virtus Realty</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold mt-3" style={{ color: '#141e31' }}>
                Why Sell With Us?
              </h2>
              <p className="text-gray-500 text-lg mt-4 max-w-2xl mx-auto">
                Every advantage designed to put more money in your pocket and less stress in your life.
              </p>
            </div>
          </AnimateIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {advantages.map((adv, i) => (
              <AnimateIn key={adv.title} delay={i * 80}>
                <div className="group p-8 rounded-2xl border border-gray-100 hover:border-yellow-300 hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-gray-50/50 h-full">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-5 transition-all duration-300 group-hover:scale-110"
                    style={{ background: 'linear-gradient(135deg, #EDF2FF 0%, #FFF9E6 100%)' }}
                  >
                    {adv.icon}
                  </div>
                  <h3 className="font-display text-xl font-bold mb-3" style={{ color: '#141e31' }}>
                    {adv.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm">{adv.desc}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          STATS — animated count-up on scroll
      ═══════════════════════════════════════════════════════ */}
      <section className="py-20" style={{ background: 'linear-gradient(135deg, #0d1626 0%, #141e31 50%, #0d1626 100%)' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateIn>
            <div className="text-center mb-14">
              <span className="font-semibold text-sm uppercase tracking-widest" style={{ color: '#D4AF37' }}>
                By The Numbers
              </span>
              <h2 className="font-display text-4xl font-bold text-white mt-3">
                Results That Speak For Themselves
              </h2>
            </div>
          </AnimateIn>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
            <StatCard value="200" prefix="$" suffix="M+" label="Total Sales" />
            <StatCard value="500" suffix="+" label="Homes Sold" />
            <StatCard value="18" suffix="%" label="Faster Sales" />
            <StatCard value="98" suffix="%" label="Client Satisfaction" />
          </div>

          <AnimateIn>
            <p className="text-center text-white/40 text-xs mt-12 uppercase tracking-wider">
              Verified results across South Florida · Miami-Dade · Broward · Palm Beach · St. Lucie
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          HOW IT WORKS
      ═══════════════════════════════════════════════════════ */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateIn>
            <div className="text-center mb-16">
              <span className="text-yellow-600 font-semibold text-sm uppercase tracking-widest">Simple Process</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold mt-3" style={{ color: '#141e31' }}>
                How It Works
              </h2>
              <p className="text-gray-500 text-lg mt-4">Three easy steps to know exactly what your home is worth.</p>
            </div>
          </AnimateIn>

          <div className="relative">
            {/* Connector line (desktop) */}
            <div
              className="hidden lg:block absolute top-12 left-1/6 right-1/6 h-0.5"
              style={{
                background: 'linear-gradient(90deg, #D4AF37 0%, #F5CC50 50%, #D4AF37 100%)',
                left: '16.67%',
                right: '16.67%',
              }}
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {steps.map((step, i) => (
                <AnimateIn key={step.num} delay={i * 150}>
                  <div className="relative text-center">
                    {/* Step number circle */}
                    <div className="relative inline-flex items-center justify-center mb-6">
                      <div
                        className="w-24 h-24 rounded-full flex flex-col items-center justify-center shadow-lg"
                        style={{
                          background: 'linear-gradient(135deg, #141e31 0%, #1a253f 100%)',
                          border: '3px solid #D4AF37',
                        }}
                      >
                        <span className="text-2xl">{step.icon}</span>
                        <span className="text-xs font-bold" style={{ color: '#D4AF37' }}>STEP {step.num}</span>
                      </div>
                    </div>
                    <h3 className="font-display text-xl font-bold mb-3" style={{ color: '#141e31' }}>
                      {step.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed max-w-xs mx-auto">{step.desc}</p>
                  </div>
                </AnimateIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          TESTIMONIALS
      ═══════════════════════════════════════════════════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateIn>
            <div className="text-center mb-14">
              <span className="text-yellow-600 font-semibold text-sm uppercase tracking-widest">Social Proof</span>
              <h2 className="font-display text-4xl font-bold mt-3" style={{ color: '#141e31' }}>
                Real Results. Real Clients.
              </h2>
            </div>
          </AnimateIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((t, i) => (
              <AnimateIn key={t.name} delay={i * 120}>
                <div
                  className="relative p-8 rounded-2xl shadow-lg overflow-hidden"
                  style={{ background: 'linear-gradient(135deg, #0d1626 0%, #141e31 100%)' }}
                >
                  {/* Gold accent line */}
                  <div className="absolute top-0 left-0 right-0 h-1" style={{ background: 'linear-gradient(90deg, #D4AF37, #F5CC50, #D4AF37)' }} />

                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, si) => (
                      <svg key={si} className="w-5 h-5" fill="#D4AF37" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>

                  {/* Quote mark */}
                  <div className="text-6xl leading-none mb-2 font-serif" style={{ color: '#D4AF37', opacity: 0.4 }}>"</div>

                  <p className="text-white/90 leading-relaxed mb-6 italic text-sm">
                    {t.quote}
                  </p>

                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
                      style={{ background: 'linear-gradient(135deg, #D4AF37, #F5CC50)' }}
                      style2={{ color: '#141e31' }}
                    >
                      <span style={{ color: '#141e31' }}>{t.name[0]}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-white text-sm">{t.name}</p>
                      <p className="text-white/50 text-xs">{t.location}</p>
                    </div>
                  </div>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          VALUATION FORM
      ═══════════════════════════════════════════════════════ */}
      <section
        ref={formRef}
        id="valuation-form"
        className="py-24 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0d1626 0%, #141e31 60%, #0a101d 100%)' }}
      >
        {/* Decorative blobs */}
        <div className="absolute top-0 left-0 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none"
          style={{ background: '#D4AF37', transform: 'translate(-50%, -50%)' }} />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-10 pointer-events-none"
          style={{ background: '#4A90E2', transform: 'translate(50%, 50%)' }} />

        <div className="relative max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          {submitted ? (
            /* ── Confirmation Screen ── */
            <div className="relative text-center">
              <Sparkles />
              <AnimateIn>
                <div
                  className="relative p-10 rounded-3xl shadow-2xl overflow-hidden"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(212,175,55,0.3)',
                  }}
                >
                  {/* Gold top border */}
                  <div className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl"
                    style={{ background: 'linear-gradient(90deg, #D4AF37, #F5CC50, #D4AF37)' }} />

                  <div className="text-6xl mb-6">✅</div>
                  <h2 className="font-display text-3xl font-bold text-white mb-4">
                    Your Valuation Request Has Been Received!
                  </h2>
                  <p className="text-white/70 leading-relaxed mb-6">
                    We'll deliver your comprehensive market analysis within 24 hours.
                    Nicolas will personally review the data and reach out to discuss your options.
                  </p>
                  <a
                    href="tel:9546004976"
                    className="inline-flex items-center gap-2 text-sm font-semibold mb-8"
                    style={{ color: '#D4AF37' }}
                  >
                    <span>📞</span>
                    Need to talk sooner? Call (954) 600-4976
                  </a>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center mt-4">
                    <Link
                      to="/"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/10 text-white font-semibold border border-white/20 hover:bg-white/20 transition-all text-sm"
                    >
                      ← Back to Home
                    </Link>
                    <Link
                      to="/listings"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-navy-900 text-sm transition-all"
                      style={{ background: 'linear-gradient(135deg, #D4AF37, #F5CC50)' }}
                    >
                      Browse Listings →
                    </Link>
                  </div>
                </div>
              </AnimateIn>
            </div>
          ) : (
            /* ── Valuation Form ── */
            <AnimateIn>
              <div
                className="relative p-8 md:p-10 rounded-3xl shadow-2xl overflow-hidden"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  backdropFilter: 'blur(24px)',
                  WebkitBackdropFilter: 'blur(24px)',
                  border: '1px solid rgba(212,175,55,0.25)',
                }}
              >
                {/* Gold top border */}
                <div
                  className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl"
                  style={{ background: 'linear-gradient(90deg, #D4AF37, #F5CC50, #D4AF37)' }}
                />

                {/* Header */}
                <div className="text-center mb-8">
                  <div className="text-4xl mb-3">🏠</div>
                  <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-2">
                    Get Your Free Home Valuation
                  </h2>
                  <p className="text-white/60 text-sm">
                    Takes 60 seconds · Comprehensive report in 24 hours
                  </p>
                </div>

                <form onSubmit={handleSubmit} noValidate className="space-y-6">
                  {/* Property Address */}
                  <div data-field="address">
                    <label className="block text-white/70 text-xs font-semibold uppercase tracking-wider mb-2">
                      Property Address <span style={{ color: '#D4AF37' }}>*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="123 Ocean Drive"
                      value={form.address}
                      onChange={set('address')}
                      className={inputClass('address')}
                    />
                    {errors.address && <p className="text-red-400 text-xs mt-1">{errors.address}</p>}
                  </div>

                  {/* City */}
                  <div data-field="city">
                    <label className="block text-white/70 text-xs font-semibold uppercase tracking-wider mb-2">
                      City <span style={{ color: '#D4AF37' }}>*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Fort Lauderdale"
                      value={form.city}
                      onChange={set('city')}
                      className={inputClass('city')}
                    />
                    {errors.city && <p className="text-red-400 text-xs mt-1">{errors.city}</p>}
                  </div>

                  {/* Beds & Baths */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div data-field="beds">
                      <label className="block text-white/70 text-xs font-semibold uppercase tracking-wider mb-2">
                        Bedrooms <span style={{ color: '#D4AF37' }}>*</span>
                      </label>
                      <PillGroup
                        options={['1', '2', '3', '4', '5+']}
                        value={form.beds}
                        onChange={setPill('beds')}
                      />
                      {errors.beds && <p className="text-red-400 text-xs mt-1">{errors.beds}</p>}
                    </div>
                    <div data-field="baths">
                      <label className="block text-white/70 text-xs font-semibold uppercase tracking-wider mb-2">
                        Bathrooms <span style={{ color: '#D4AF37' }}>*</span>
                      </label>
                      <PillGroup
                        options={['1', '2', '3', '4+']}
                        value={form.baths}
                        onChange={setPill('baths')}
                      />
                      {errors.baths && <p className="text-red-400 text-xs mt-1">{errors.baths}</p>}
                    </div>
                  </div>

                  {/* Square Footage */}
                  <div>
                    <label className="block text-white/70 text-xs font-semibold uppercase tracking-wider mb-2">
                      Approx. Square Footage
                    </label>
                    <input
                      type="number"
                      placeholder="e.g. 1800"
                      value={form.sqft}
                      onChange={set('sqft')}
                      min="100"
                      className={inputClass('sqft')}
                    />
                  </div>

                  {/* Timeline */}
                  <div data-field="timeline">
                    <label className="block text-white/70 text-xs font-semibold uppercase tracking-wider mb-2">
                      When Are You Looking to Sell? <span style={{ color: '#D4AF37' }}>*</span>
                    </label>
                    <PillGroup
                      options={['ASAP', '1-3 Months', '3-6 Months', 'Just Curious']}
                      value={form.timeline}
                      onChange={setPill('timeline')}
                    />
                    {errors.timeline && <p className="text-red-400 text-xs mt-1">{errors.timeline}</p>}
                  </div>

                  {/* Divider */}
                  <div className="border-t border-white/10 pt-2">
                    <p className="text-white/40 text-xs uppercase tracking-wider">Your Contact Info</p>
                  </div>

                  {/* Name */}
                  <div data-field="name">
                    <label className="block text-white/70 text-xs font-semibold uppercase tracking-wider mb-2">
                      Your Name <span style={{ color: '#D4AF37' }}>*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Jane Smith"
                      value={form.name}
                      onChange={set('name')}
                      className={inputClass('name')}
                    />
                    {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                  </div>

                  {/* Email */}
                  <div data-field="email">
                    <label className="block text-white/70 text-xs font-semibold uppercase tracking-wider mb-2">
                      Email Address <span style={{ color: '#D4AF37' }}>*</span>
                    </label>
                    <input
                      type="email"
                      placeholder="jane@email.com"
                      value={form.email}
                      onChange={set('email')}
                      className={inputClass('email')}
                    />
                    {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                  </div>

                  {/* Phone */}
                  <div data-field="phone">
                    <label className="block text-white/70 text-xs font-semibold uppercase tracking-wider mb-2">
                      Phone Number <span style={{ color: '#D4AF37' }}>*</span>
                    </label>
                    <input
                      type="tel"
                      placeholder="(954) 555-0000"
                      value={form.phone}
                      onChange={set('phone')}
                      className={inputClass('phone')}
                    />
                    {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="w-full py-5 rounded-2xl font-bold text-navy-900 text-lg shadow-xl hover:shadow-yellow-500/30 transform hover:-translate-y-0.5 transition-all duration-200 relative overflow-hidden group"
                    style={{
                      background: 'linear-gradient(135deg, #D4AF37 0%, #F5CC50 50%, #D4AF37 100%)',
                      backgroundSize: '200% 200%',
                    }}
                  >
                    <span className="relative z-10 flex items-center justify-center gap-3">
                      <span className="text-xl">🚀</span>
                      Get My Free Valuation
                    </span>
                    {/* Shimmer */}
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                  </button>

                  {/* Privacy note */}
                  <p className="text-center text-white/40 text-xs flex items-center justify-center gap-2">
                    <span>🔒</span>
                    Your information is private and never shared with third parties.
                  </p>
                </form>
              </div>
            </AnimateIn>
          )}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          BOTTOM CTA
      ═══════════════════════════════════════════════════════ */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full blur-3xl opacity-5"
            style={{ background: '#D4AF37' }} />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full blur-3xl opacity-5"
            style={{ background: '#141e31' }} />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <AnimateIn>
            <div
              className="w-16 h-1 mx-auto mb-8 rounded-full"
              style={{ background: 'linear-gradient(90deg, #D4AF37, #F5CC50)' }}
            />
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-5" style={{ color: '#141e31' }}>
              Every Day You Wait<br />
              <span style={{ color: '#D4AF37' }}>Could Cost You Money.</span>
            </h2>
            <p className="text-gray-500 text-lg mb-10 max-w-xl mx-auto">
              South Florida's market is moving fast. Get your free valuation today and stay ahead of the curve.
            </p>
            <button
              onClick={scrollToForm}
              className="inline-flex items-center gap-3 px-10 py-5 font-bold rounded-2xl text-navy-900 text-lg shadow-xl hover:shadow-yellow-400/30 transform hover:-translate-y-1 transition-all duration-200 relative overflow-hidden group"
              style={{ background: 'linear-gradient(135deg, #D4AF37 0%, #F5CC50 50%, #D4AF37 100%)' }}
            >
              <span className="text-2xl">🏠</span>
              Get My Free Valuation
              {/* Shimmer */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/25 to-transparent" />
            </button>

            <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-gray-400">
              {[
                '⚡ 24-Hour Report',
                '🔒 No Obligation',
                '📊 MLS Data-Backed',
                '📞 (954) 600-4976',
              ].map((b) => (
                <span key={b}>{b}</span>
              ))}
            </div>
          </AnimateIn>
        </div>
      </section>
    </div>
  )
}
