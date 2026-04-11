import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

/* ─── Animation hook ─────────────────────────────────────────────────────── */
function useIntersection(options = {}) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold: 0.1, ...options }
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

/* ─── WhatsApp SVG Icon ──────────────────────────────────────────────────── */
function WhatsAppIcon({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

/* ─── Data ───────────────────────────────────────────────────────────────── */
const drStats = [
  {
    icon: '📈',
    value: '4.8%',
    label: 'GDP Growth',
    sub: 'Highest projected growth in all of Latin America for 2026',
    source: 'IMF, 2026 Outlook',
  },
  {
    icon: '🏗️',
    value: '$5B',
    label: 'Foreign Direct Investment',
    sub: 'Record FDI in 2025 — up year over year',
    source: 'UNCTAD',
  },
  {
    icon: '✈️',
    value: '12.5M',
    label: 'Tourists Projected 2026',
    sub: 'Up from 11.8M in 2025 — 6% increase',
    source: 'MITUR Dominican Republic',
  },
  {
    icon: '🏠',
    value: '10–15%',
    label: 'Property Price Growth',
    sub: 'Rising in high-demand areas due to infrastructure & tourism',
    source: 'HolProp Market Intelligence',
  },
  {
    icon: '🏦',
    value: '+2.4%',
    label: 'Construction Growth',
    sub: 'Real construction output growth in 2026, fueled by FDI and rising loans',
    source: 'Banco Central DR',
  },
  {
    icon: '🌎',
    value: '#1',
    label: 'Caribbean Economy',
    sub: 'Largest and fastest-growing economy in the Caribbean region',
    source: 'IMF / World Bank',
  },
]

const taxAdvantages = [
  {
    icon: '🏛️',
    title: '15-Year Property Tax Exemption',
    desc: 'CONFOTUR-approved projects enjoy zero property tax for 15 full years.',
  },
  {
    icon: '💵',
    title: 'Up to 10 Years Income Tax Exemption',
    desc: 'Rental income tax exemption for up to a decade on qualifying properties.',
  },
  {
    icon: '📦',
    title: 'Zero Import Duties',
    desc: 'No import taxes on construction materials and equipment for approved projects.',
  },
  {
    icon: '📈',
    title: 'No Capital Gains Tax',
    desc: 'CONFOTUR properties during the exemption period are capital gains tax-free.',
  },
  {
    icon: '🤝',
    title: 'Equal Property Rights',
    desc: 'Law 16-95 grants foreigners the same property rights as Dominican citizens. No restrictions.',
  },
  {
    icon: '🌐',
    title: 'Investor-Friendly Framework',
    desc: 'The DR government has created one of the most welcoming investment environments in the hemisphere.',
  },
]

const rentalStats = [
  { icon: '💰', value: '5.5–8%', label: 'Net Rental Yield', sub: 'After expenses, annually' },
  { icon: '🏖️', value: '75%+', label: 'Airbnb Occupancy', sub: 'Peak areas (Dec–Apr, Jul–Aug)' },
  { icon: '💵', value: '$21K/yr', label: 'Avg Punta Cana Airbnb', sub: 'Average annual revenue' },
  { icon: '✈️', value: '12.5M', label: 'Tourists Need Stays', sub: 'Projected 2026 visitors' },
]

const packages = [
  {
    tier: 'Starter',
    range: '$50K–$150K',
    badge: 'Entry Level',
    badgeColor: '#2ecc71',
    icon: '🏠',
    tagline: 'Entry point into one of the fastest-growing markets',
    features: [
      'Bank foreclosure properties (APAP, Banreservas)',
      'Santo Domingo apartments & houses',
      'Best for: First-time international investors',
      'Typical: 3BR apartment in SD Este for ~$50K–$100K',
      'Simple buying process, clear title',
    ],
    highlight: false,
  },
  {
    tier: 'Growth',
    range: '$150K–$500K',
    badge: 'Most Popular',
    badgeColor: '#b49750',
    icon: '🌴',
    tagline: 'The sweet spot — strong cash flow with upside',
    features: [
      'Beachfront condos, multi-unit rentals',
      'Punta Cana, North Coast, Las Terrenas',
      'Best for: Rental income + appreciation',
      'CONFOTUR-eligible projects available',
      '5.5–8% net rental yields in peak areas',
    ],
    highlight: true,
  },
  {
    tier: 'Premium',
    range: '$500K+',
    badge: 'White Glove',
    badgeColor: '#9b59b6',
    icon: '🏝️',
    tagline: 'Trophy assets in the Caribbean\'s premier locations',
    features: [
      'Luxury villas, development land, commercial',
      'Cap Cana, Casa de Campo, custom builds',
      'Best for: High-net-worth investors, developers',
      'Full concierge: legal, management, construction',
      'Off-market access to exclusive pre-construction',
    ],
    highlight: false,
  },
]

const buyingSteps = [
  {
    step: '01',
    icon: '🤝',
    title: 'Free Consultation',
    desc: 'Free call to discuss your investment goals, budget, and timeline. No pressure, just clarity.',
  },
  {
    step: '02',
    icon: '🔍',
    title: 'Property Selection',
    desc: 'We curate properties that match your criteria — from foreclosures to beachfront pre-construction.',
  },
  {
    step: '03',
    icon: '⚖️',
    title: 'Due Diligence',
    desc: 'Title search, legal review, property inspection. We connect you with trusted DR attorneys.',
  },
  {
    step: '04',
    icon: '📋',
    title: 'Purchase',
    desc: 'No restrictions for foreigners. Notary signing, secure fund transfer, title deed in your name.',
  },
  {
    step: '05',
    icon: '🏡',
    title: 'Property Management',
    desc: 'Optional full management for rental income. We handle guests, maintenance, and returns.',
  },
]

const virtusAdvantages = [
  { icon: '🇺🇸', title: 'Florida Licensed', desc: 'Licensed Florida real estate brokerage with US investor protection standards' },
  { icon: '🇩🇴', title: 'DR Connected', desc: 'Deep network of DR agents, attorneys, and property managers' },
  { icon: '🗣️', title: 'Bilingual Team', desc: 'English/Spanish fluent — no language barriers, no miscommunication' },
  { icon: '🏦', title: 'Foreclosure Access', desc: 'Direct access to APAP, Banreservas, and other bank foreclosure catalogs' },
  { icon: '🏗️', title: 'Pre-Construction Deals', desc: 'Off-market access to developer pricing before public launch' },
  { icon: '🔑', title: 'Full-Service', desc: 'From first search to closing to ongoing property management' },
]

/* ─── Parallax Image Break Component ─────────────────────────────────────── */
function ImageBreak({ src, height = '380px', overlayGradient, children }) {
  return (
    <div style={{
      height,
      backgroundImage: `url(${src})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      position: 'relative',
      overflow: 'hidden',
    }}
    className="image-break-section"
    >
      <div style={{
        position: 'absolute',
        inset: 0,
        background: overlayGradient || 'linear-gradient(to right, rgba(20,30,49,0.85), rgba(20,30,49,0.4))',
      }}>
        {children}
      </div>
    </div>
  )
}

/* ─── Component ──────────────────────────────────────────────────────────── */
export default function InvestorPackages() {
  useEffect(() => {
    document.title = 'Investor Packages — Dominican Republic Real Estate | Virtus Realty Group'
    const meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute('content', 'Invest in Dominican Republic real estate. 4.8% GDP growth, Google\'s $500M digital hub, CONFOTUR tax advantages. Packages from $50K. Talk to Virtus Realty today.')
  }, [])

  const scrollToPackages = () => {
    document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' })
  }

  const waBase = 'https://wa.me/19546004976'
  const waAdvisor = `${waBase}?text=${encodeURIComponent("Hi! I'm interested in learning about DR investment opportunities. Can we schedule a free consultation?")}`
  const waGeneral = `${waBase}?text=${encodeURIComponent("Hi Virtus Realty! I'd like to schedule a free investor consultation.")}`

  return (
    <div className="font-sans">

      {/* Mobile parallax fix */}
      <style>{`
        @media (max-width: 768px) {
          .image-break-section {
            background-attachment: scroll !important;
          }
        }
      `}</style>

      {/* ═══ HERO ════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background — AI-generated DR skyline */}
        <div
          className="absolute inset-0 bg-center bg-cover"
          style={{
            backgroundImage: "url('/investor/hero-dr-skyline.jpg')",
            transform: 'scale(1.05)',
          }}
        />
        {/* Overlay */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(135deg, rgba(20,30,49,0.92) 0%, rgba(20,30,49,0.75) 50%, rgba(20,30,49,0.88) 100%)' }}
        />
        {/* Gold accent lines */}
        <div className="absolute top-0 left-0 right-0 h-1" style={{ background: 'linear-gradient(90deg, transparent 0%, #b49750 30%, #d4b96a 50%, #b49750 70%, transparent 100%)' }} />

        {/* Floating particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full animate-pulse opacity-20"
              style={{
                left: `${(i * 17 + 5) % 100}%`,
                top: `${(i * 23 + 10) % 80}%`,
                width: 3 + (i % 5),
                height: 3 + (i % 5),
                background: '#b49750',
                animationDelay: `${i * 300}ms`,
                animationDuration: `${2200 + i * 350}ms`,
              }}
            />
          ))}
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 border rounded-full px-5 py-2 text-sm font-medium mb-8"
            style={{ background: 'rgba(180,151,80,0.15)', borderColor: 'rgba(180,151,80,0.4)', color: '#d4b96a' }}
          >
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#b49750' }} />
            Dominican Republic · Investment Opportunities
          </div>

          <h1 className="font-display text-5xl md:text-7xl font-extrabold text-white leading-tight mb-6 drop-shadow-2xl">
            The Caribbean's Hottest
            <span className="block" style={{ color: '#b49750' }}>Investment Opportunity</span>
          </h1>

          <p className="text-xl md:text-2xl text-white/85 max-w-3xl mx-auto mb-12 leading-relaxed font-light">
            The Dominican Republic is experiencing <strong className="text-white font-semibold">unprecedented growth</strong>. Property values are projected to rise 10–15% in high-demand areas.{' '}
            <strong className="text-white font-semibold">Smart investors are moving now.</strong>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={scrollToPackages}
              className="inline-flex items-center justify-center gap-2 px-9 py-4 rounded-xl font-bold text-base shadow-2xl transform hover:-translate-y-1 transition-all duration-200"
              style={{ background: 'linear-gradient(135deg, #b49750, #d4b96a)', color: '#141e31' }}
            >
              💰 View Investment Packages
            </button>
            <a
              href={waAdvisor}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-9 py-4 rounded-xl font-bold text-base border transition-all hover:bg-white/20 hover:-translate-y-1"
              style={{ background: 'rgba(255,255,255,0.1)', borderColor: 'rgba(255,255,255,0.3)', color: '#fff' }}
            >
              <WhatsAppIcon />
              Talk to an Advisor
            </a>
          </div>

          {/* Quick stats bar */}
          <div className="mt-20 grid grid-cols-3 gap-4 max-w-lg mx-auto">
            {[['4.8%', 'GDP Growth'], ['$500M', 'Google Investment'], ['10–15%', 'Price Growth']].map(([val, label]) => (
              <div key={label} className="text-center">
                <div className="font-display text-2xl md:text-3xl font-bold" style={{ color: '#b49750' }}>{val}</div>
                <div className="text-white/60 text-xs uppercase tracking-wider mt-1">{label}</div>
              </div>
            ))}
          </div>

          {/* Scroll indicator */}
          <div className="mt-12 flex justify-center">
            <button onClick={scrollToPackages} className="flex flex-col items-center gap-2 text-white/40 hover:text-white/70 transition-colors">
              <span className="text-xs uppercase tracking-widest">Explore the opportunity</span>
              <div className="w-6 h-10 border-2 border-current rounded-full flex items-start justify-center pt-2">
                <div className="w-1.5 h-3 bg-current rounded-full animate-bounce" />
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 1: WHY THE DR — STATS ═══════════════════════════════════ */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateIn>
            <div className="text-center mb-16">
              <span className="font-semibold text-sm uppercase tracking-widest" style={{ color: '#b49750' }}>The Numbers Don't Lie</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold mt-3" style={{ color: '#141e31' }}>
                Why the Dominican Republic?
              </h2>
              <p className="text-gray-500 text-lg mt-4 max-w-2xl mx-auto">
                The data is undeniable. The DR is the Caribbean's fastest-growing economy — and the window for early investors is open right now.
              </p>
            </div>
          </AnimateIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {drStats.map((stat, i) => (
              <AnimateIn key={stat.label} delay={i * 80}>
                <div
                  className="group p-7 rounded-2xl border hover:shadow-xl transition-all duration-300 h-full flex flex-col"
                  style={{
                    borderColor: 'rgba(180,151,80,0.2)',
                    background: 'linear-gradient(135deg, #fff 0%, #fdf9f0 100%)',
                  }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = '#b49750'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(180,151,80,0.2)'}
                >
                  <div className="text-4xl mb-4">{stat.icon}</div>
                  <div className="font-display text-3xl font-extrabold mb-1" style={{ color: '#b49750' }}>{stat.value}</div>
                  <div className="font-bold text-base mb-2" style={{ color: '#141e31' }}>{stat.label}</div>
                  <div className="text-sm text-gray-500 leading-relaxed flex-grow">{stat.sub}</div>
                  <div className="text-xs text-gray-300 mt-3 pt-3 border-t border-gray-100">Source: {stat.source}</div>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ IMAGE BREAK 1: BEACH PARADISE ══════════════════════════════════ */}
      <ImageBreak
        src="/investor/beach-paradise.jpg"
        height="400px"
        overlayGradient="linear-gradient(to right, rgba(20,30,49,0.85), rgba(20,30,49,0.35))"
      >
        <div style={{ padding: '80px 40px', maxWidth: '640px' }}>
          <div style={{ color: '#b49750', fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '16px' }}>
            Punta Cana · Dominican Republic
          </div>
          <h3 style={{ color: '#ffffff', fontSize: '36px', fontWeight: 800, lineHeight: 1.2, marginBottom: '16px', fontFamily: 'inherit' }}>
            Paradise Meets Profit
          </h3>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '20px', lineHeight: 1.6, marginBottom: '24px' }}>
            Where other investors see vacation, smart money sees opportunity.
          </p>
          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
            <div>
              <div style={{ color: '#b49750', fontSize: '28px', fontWeight: 800 }}>12.5M</div>
              <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px' }}>tourists/year</div>
            </div>
            <div>
              <div style={{ color: '#b49750', fontSize: '28px', fontWeight: 800 }}>75%+</div>
              <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px' }}>peak occupancy</div>
            </div>
            <div>
              <div style={{ color: '#b49750', fontSize: '28px', fontWeight: 800 }}>$21K</div>
              <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px' }}>avg annual rental</div>
            </div>
          </div>
        </div>
      </ImageBreak>

      {/* ═══ SECTION 2: THE GOOGLE EFFECT ════════════════════════════════════ */}
      <section className="py-24" style={{ background: 'linear-gradient(135deg, #0a101d 0%, #141e31 100%)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateIn>
            <div className="text-center mb-14">
              <span className="font-semibold text-sm uppercase tracking-widest" style={{ color: '#b49750' }}>The Google Effect</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white mt-3">
                $500M Digital Hub
                <span className="block mt-2" style={{ color: '#b49750' }}>Coming to the DR</span>
              </h2>
            </div>
          </AnimateIn>

          <AnimateIn delay={100}>
            <div
              className="rounded-3xl overflow-hidden relative"
              style={{ border: '1px solid rgba(180,151,80,0.4)' }}
            >
              {/* Tech hub image as top banner */}
              <div
                style={{
                  height: '280px',
                  backgroundImage: 'url(/investor/google-tech-hub.jpg)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center 40%',
                  position: 'relative',
                }}
              >
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to bottom, rgba(10,16,29,0.3) 0%, rgba(10,16,29,0.95) 100%)',
                }} />
                <div style={{ position: 'absolute', bottom: '24px', left: '40px', right: '40px' }}>
                  <div
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold mb-3"
                    style={{ background: 'rgba(180,151,80,0.25)', color: '#d4b96a', border: '1px solid rgba(180,151,80,0.5)', backdropFilter: 'blur(8px)' }}
                  >
                    🔴 Construction Started March 2026
                  </div>
                  <h3 className="font-display text-white font-extrabold" style={{ fontSize: '28px', lineHeight: 1.2 }}>
                    Latin America's First International Digital Exchange Port
                  </h3>
                </div>
              </div>

              {/* Content area */}
              <div
                className="p-8 md:p-12 relative"
                style={{ background: 'linear-gradient(135deg, rgba(180,151,80,0.12) 0%, rgba(180,151,80,0.04) 100%)' }}
              >
                {/* Big G logo watermark */}
                <div
                  className="absolute right-6 top-6 text-8xl opacity-10 select-none pointer-events-none"
                  style={{ fontSize: '160px', lineHeight: 1 }}
                >
                  G
                </div>

                <div className="relative grid md:grid-cols-2 gap-10 items-center">
                  <div>
                    <p className="text-white/70 text-lg leading-relaxed mb-6">
                      A <strong className="text-white">$500 million</strong> investment. Declared <strong className="text-white">high national priority</strong> by Presidential Decree 113-26. Completion targeted for early 2027.
                    </p>
                    <p className="text-white/70 leading-relaxed">
                      This positions the Dominican Republic as the regional hub for <strong className="text-white">AI, cloud computing, and data infrastructure</strong> — the same infrastructure that transformed entire real estate markets in places like Northern Virginia.
                    </p>
                  </div>

                  <div className="space-y-4">
                    {[
                      { icon: '💡', stat: '$500M', label: "Google's Investment", desc: 'Largest single tech infrastructure project in Caribbean history' },
                      { icon: '🏗️', stat: 'Mar 2026', label: 'Construction Begun', desc: 'Completion expected early 2027 per Presidential Decree 113-26' },
                      { icon: '🌐', stat: 'Latin America #1', label: 'First Digital Exchange Port', desc: 'No other country in the region has this designation' },
                      { icon: '📊', stat: '↑ Values', label: 'Real Estate Impact', desc: 'Tech hubs historically drive 20–40% property appreciation in surrounding areas' },
                    ].map((item) => (
                      <div
                        key={item.stat}
                        className="flex items-start gap-4 p-4 rounded-xl"
                        style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}
                      >
                        <div className="text-2xl flex-shrink-0">{item.icon}</div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-display font-extrabold text-lg" style={{ color: '#b49750' }}>{item.stat}</span>
                            <span className="text-white font-semibold text-sm">{item.label}</span>
                          </div>
                          <p className="text-white/50 text-xs leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div
                  className="mt-10 pt-8 border-t text-center"
                  style={{ borderColor: 'rgba(180,151,80,0.2)' }}
                >
                  <p className="text-white/80 text-lg font-medium italic">
                    "When Google picks a country, property values follow."
                  </p>
                  <p className="text-white/40 text-xs mt-2">Source: Google LLC announcement, confirmed by Government of Dominican Republic, Presidential Decree 113-26</p>
                </div>
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ═══ SECTION 3: PEDERNALES MEGA-RESORT ═══════════════════════════════ */}
      <section className="py-0 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0d1626 0%, #0a101d 100%)' }}>
        {/* Pedernales beach as full-width top image */}
        <div
          style={{
            height: '420px',
            backgroundImage: 'url(/investor/pedernales-beach.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'relative',
          }}
        >
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, rgba(13,22,38,0.2) 0%, rgba(13,22,38,0.98) 100%)',
          }} />
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '40px',
            textAlign: 'center',
          }}>
            <div style={{ color: '#b49750', fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '12px' }}>
              Mega-Infrastructure
            </div>
            <h2 className="font-display" style={{ color: '#ffffff', fontSize: 'clamp(28px, 5vw, 52px)', fontWeight: 800, lineHeight: 1.1 }}>
              $2.2 Billion
            </h2>
            <h2 className="font-display" style={{ color: '#b49750', fontSize: 'clamp(20px, 3.5vw, 38px)', fontWeight: 700 }}>
              Pedernales-Cabo Rojo Resort
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', marginTop: '12px', fontSize: '16px' }}>
              The untouched paradise about to transform into the Caribbean's next mega-destination
            </p>
          </div>
        </div>

        <div className="py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateIn delay={100}>
            <div
              className="rounded-3xl overflow-hidden"
              style={{ border: '1px solid rgba(255,255,255,0.1)' }}
            >
              {/* Header band */}
              <div
                className="px-8 py-5 flex flex-wrap items-center gap-4"
                style={{ background: 'linear-gradient(135deg, #b49750, #d4b96a)' }}
              >
                <div className="font-display text-4xl font-extrabold text-white">$2.2B</div>
                <div>
                  <div className="font-bold text-white text-lg">Tourism Megaproject</div>
                  <div className="text-white/80 text-sm">Southwest Dominican Republic · Pedernales Province</div>
                </div>
                <div
                  className="ml-auto px-4 py-2 rounded-full text-sm font-bold"
                  style={{ background: 'rgba(20,30,49,0.3)', color: '#fff', border: '1px solid rgba(255,255,255,0.3)' }}
                >
                  🔥 Active Development
                </div>
              </div>

              {/* Content grid */}
              <div className="p-8 md:p-10 grid md:grid-cols-2 gap-10" style={{ background: 'rgba(255,255,255,0.04)' }}>
                <div>
                  <h3 className="font-display text-2xl font-bold text-white mb-5">What's Being Built</h3>
                  <div className="space-y-3">
                    {[
                      { icon: '✈️', label: 'New International Airport', desc: 'Purpose-built airport for the resort zone' },
                      { icon: '⛵', label: 'Full-Service Marina', desc: 'Luxury marina for yachts and water sports' },
                      { icon: '🏨', label: 'World-Class Hotels', desc: 'Multiple international hotel chains committed' },
                      { icon: '🛣️', label: 'Roads & Utilities', desc: 'Complete infrastructure from scratch' },
                      { icon: '💼', label: 'Thousands of Jobs', desc: 'Transforming one of the DR\'s most underdeveloped regions' },
                    ].map((item) => (
                      <div key={item.label} className="flex items-start gap-3">
                        <span className="text-xl flex-shrink-0 mt-0.5">{item.icon}</span>
                        <div>
                          <span className="font-semibold text-white text-sm">{item.label}</span>
                          <span className="text-white/50 text-sm"> — {item.desc}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-display text-2xl font-bold text-white mb-5">The Investment Opportunity</h3>
                  <div
                    className="p-6 rounded-2xl mb-5"
                    style={{ background: 'rgba(180,151,80,0.12)', border: '1px solid rgba(180,151,80,0.3)' }}
                  >
                    <p className="text-white/85 leading-relaxed text-sm">
                      Early investors in surrounding areas of the Pedernales province stand to see <strong className="text-white">massive appreciation</strong> as infrastructure rolls out. Currently an undiscovered region — prices are at ground floor.
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: 'Current Land Price', value: 'Ground Floor' },
                      { label: 'Timeline', value: 'Active Now' },
                      { label: 'Hotel Brands', value: 'International' },
                      { label: 'Upside Potential', value: '🚀 Significant' },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="p-3 rounded-xl text-center"
                        style={{ background: 'rgba(255,255,255,0.05)' }}
                      >
                        <div className="font-bold text-sm" style={{ color: '#b49750' }}>{item.value}</div>
                        <div className="text-white/40 text-xs mt-1">{item.label}</div>
                      </div>
                    ))}
                  </div>
                  <p className="text-white/35 text-xs mt-4">
                    Source: Government of Dominican Republic, Ministry of Tourism; MITUR investment portal
                  </p>
                </div>
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ═══ SECTION 4: CONFOTUR TAX ADVANTAGES ══════════════════════════════ */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateIn>
            <div className="text-center mb-16">
              <span className="font-semibold text-sm uppercase tracking-widest" style={{ color: '#b49750' }}>Tax Advantages</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold mt-3" style={{ color: '#141e31' }}>
                CONFOTUR Law
              </h2>
              <p className="text-gray-500 text-lg mt-4 max-w-2xl mx-auto">
                The DR government <em>wants</em> you to invest. They've created one of the most investor-friendly tax frameworks in the hemisphere.
              </p>
            </div>
          </AnimateIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
            {taxAdvantages.map((tax, i) => (
              <AnimateIn key={tax.title} delay={i * 80}>
                <div
                  className="group p-6 rounded-2xl border hover:shadow-xl transition-all duration-300 h-full"
                  style={{
                    borderColor: 'rgba(180,151,80,0.2)',
                    background: 'linear-gradient(135deg, #fafafa, #fdf9f0)',
                  }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = '#b49750'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(180,151,80,0.2)'}
                >
                  <div className="text-3xl mb-3">{tax.icon}</div>
                  <h3 className="font-bold text-base mb-2" style={{ color: '#141e31' }}>{tax.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{tax.desc}</p>
                </div>
              </AnimateIn>
            ))}
          </div>

          <AnimateIn delay={200}>
            <div
              className="p-8 rounded-2xl text-center"
              style={{ background: 'linear-gradient(135deg, #141e31, #1c2d4a)' }}
            >
              <div className="text-4xl mb-3">🏛️</div>
              <h3 className="font-display text-2xl font-bold text-white mb-3">
                "The DR government WANTS you to invest."
              </h3>
              <p className="text-white/65 max-w-2xl mx-auto leading-relaxed">
                Under CONFOTUR (Law 158-01) and Law 16-95, the Dominican Republic offers one of the most comprehensive investor incentive packages in Latin America. From zero property tax for 15 years to full foreign ownership rights — this is a government rolling out the red carpet.
              </p>
              <p className="text-white/30 text-xs mt-5">
                Source: CONFOTUR Law 158-01 and amendments, DR Ministry of Tourism; Law 16-95 on Foreign Investment
              </p>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ═══ IMAGE BREAK 2: COLONIAL ZONE — CULTURE & LIFESTYLE ═════════════ */}
      <ImageBreak
        src="/investor/colonial-zone.jpg"
        height="380px"
        overlayGradient="linear-gradient(135deg, rgba(20,30,49,0.88) 0%, rgba(20,30,49,0.5) 60%, rgba(20,30,49,0.75) 100%)"
      >
        <div style={{ display: 'flex', alignItems: 'center', height: '100%', padding: '0 40px' }}>
          <div style={{ maxWidth: '580px' }}>
            <div style={{ color: '#b49750', fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '16px' }}>
              Zona Colonial · Santo Domingo · UNESCO World Heritage
            </div>
            <h3 style={{ color: '#ffffff', fontSize: '34px', fontWeight: 800, lineHeight: 1.2, marginBottom: '16px', fontFamily: 'inherit' }}>
              500 Years of History.<br />A Future Being Written Now.
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '18px', lineHeight: 1.6 }}>
              The Dominican Republic isn't just an investment — it's a lifestyle. Colonial charm, Caribbean warmth, and world-class culture await your clients.
            </p>
          </div>
        </div>
      </ImageBreak>

      {/* ═══ SECTION 5: RENTAL INCOME POTENTIAL ══════════════════════════════ */}
      <section className="py-24" style={{ background: 'linear-gradient(135deg, #141e31 0%, #0d1626 100%)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateIn>
            <div className="text-center mb-14">
              <span className="font-semibold text-sm uppercase tracking-widest" style={{ color: '#b49750' }}>Passive Income</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white mt-3">
                Rental Income Potential
              </h2>
              <p className="text-white/65 text-lg mt-4 max-w-xl mx-auto">
                Your investment works for you even when you're not there.
              </p>
            </div>
          </AnimateIn>

          {/* Stat cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-14">
            {rentalStats.map((stat, i) => (
              <AnimateIn key={stat.label} delay={i * 80}>
                <div
                  className="p-6 rounded-2xl text-center border"
                  style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(180,151,80,0.3)' }}
                >
                  <div className="text-3xl mb-3">{stat.icon}</div>
                  <div className="font-display text-2xl font-extrabold mb-1" style={{ color: '#b49750' }}>{stat.value}</div>
                  <div className="font-semibold text-sm text-white mb-1">{stat.label}</div>
                  <div className="text-white/40 text-xs">{stat.sub}</div>
                </div>
              </AnimateIn>
            ))}
          </div>

          {/* Breakdown panel */}
          <AnimateIn delay={200}>
            <div
              className="rounded-2xl p-8 md:p-10 grid md:grid-cols-2 gap-8 items-center"
              style={{ background: 'rgba(180,151,80,0.1)', border: '1px solid rgba(180,151,80,0.3)' }}
            >
              <div>
                <h3 className="font-display text-2xl font-bold text-white mb-5">Why the Numbers Work</h3>
                <div className="space-y-4">
                  {[
                    { label: 'Peak Season Occupancy', value: '75%+', note: 'December–April, July–August' },
                    { label: 'Average Nightly Rate', value: '$80–$200', note: 'Depending on property & location' },
                    { label: 'Annual Gross Revenue', value: '$18K–$45K+', note: 'For a typical 2BR condo' },
                    { label: 'Net Yield (after expenses)', value: '5.5–8%', note: 'Among the highest in the Caribbean' },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center justify-between py-3 border-b"
                      style={{ borderColor: 'rgba(255,255,255,0.08)' }}
                    >
                      <div>
                        <div className="text-white font-semibold text-sm">{item.label}</div>
                        <div className="text-white/40 text-xs">{item.note}</div>
                      </div>
                      <div className="font-display font-extrabold text-lg flex-shrink-0 ml-4" style={{ color: '#b49750' }}>{item.value}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-center">
                <div className="text-6xl mb-4">🏖️</div>
                <div
                  className="inline-flex items-center justify-center w-36 h-36 rounded-full mb-6"
                  style={{ background: 'linear-gradient(135deg, rgba(180,151,80,0.3), rgba(180,151,80,0.1))', border: '3px solid #b49750' }}
                >
                  <div>
                    <div className="font-display text-3xl font-extrabold" style={{ color: '#b49750' }}>$21K</div>
                    <div className="text-white/60 text-xs">avg/year</div>
                    <div className="text-white/40 text-[10px]">Punta Cana</div>
                  </div>
                </div>
                <p className="text-white/65 text-sm leading-relaxed max-w-xs mx-auto">
                  Average annual Airbnb revenue for a Punta Cana property. Tourism is the engine — 12.5M visitors need places to stay.
                </p>
                <p className="text-white/30 text-xs mt-3">Source: AirDNA / Airbnb market data, 2025–2026</p>
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ═══ IMAGE BREAK 3: CONSTRUCTION BOOM ═══════════════════════════════ */}
      <ImageBreak
        src="/investor/construction-boom.jpg"
        height="360px"
        overlayGradient="linear-gradient(to left, rgba(20,30,49,0.88) 0%, rgba(20,30,49,0.45) 50%, rgba(20,30,49,0.75) 100%)"
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', height: '100%', padding: '0 40px' }}>
          <div style={{ maxWidth: '540px', textAlign: 'right' }}>
            <div style={{ color: '#b49750', fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '16px' }}>
              Dominican Republic · Development Boom
            </div>
            <h3 style={{ color: '#ffffff', fontSize: '34px', fontWeight: 800, lineHeight: 1.2, marginBottom: '16px', fontFamily: 'inherit' }}>
              The Cranes Are Up.<br />Prices Are Still Down.
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '18px', lineHeight: 1.6 }}>
              New condos, new hotels, new infrastructure — the DR is building at record pace. Get in before it's priced out.
            </p>
          </div>
        </div>
      </ImageBreak>

      {/* ═══ SECTION 6: INVESTMENT PACKAGES ══════════════════════════════════ */}
      <section id="packages" className="py-24" style={{ background: 'linear-gradient(180deg, #0a101d 0%, #141e31 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateIn>
            <div className="text-center mb-16">
              <span className="font-semibold text-sm uppercase tracking-widest" style={{ color: '#b49750' }}>Investment Packages</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white mt-3">
                Find Your Entry Point
              </h2>
              <p className="text-white/65 text-lg mt-4 max-w-xl mx-auto">
                Three tiers, one goal: building wealth through Dominican Republic real estate.
              </p>
            </div>
          </AnimateIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {packages.map((pkg, i) => {
              const waMsg = encodeURIComponent(`Hi! I'm interested in the ${pkg.tier} Package (${pkg.range}) for DR real estate. Can we schedule a consultation?`)
              const waUrl = `${waBase}?text=${waMsg}`
              return (
                <AnimateIn key={pkg.tier} delay={i * 100}>
                  <div
                    className={`relative rounded-3xl overflow-hidden flex flex-col h-full transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${pkg.highlight ? 'shadow-2xl' : ''}`}
                    style={{
                      background: pkg.highlight
                        ? 'linear-gradient(160deg, #1c2d4a 0%, #141e31 100%)'
                        : 'rgba(255,255,255,0.05)',
                      border: pkg.highlight ? `2px solid ${pkg.badgeColor}` : '1px solid rgba(255,255,255,0.1)',
                    }}
                  >
                    {/* Badge */}
                    {pkg.highlight && (
                      <div
                        className="absolute top-4 right-4 text-xs font-extrabold px-3 py-1.5 rounded-full"
                        style={{ background: pkg.badgeColor, color: '#141e31' }}
                      >
                        ⭐ {pkg.badge}
                      </div>
                    )}
                    {!pkg.highlight && (
                      <div
                        className="absolute top-4 right-4 text-xs font-bold px-3 py-1 rounded-full"
                        style={{ background: `${pkg.badgeColor}22`, color: pkg.badgeColor, border: `1px solid ${pkg.badgeColor}55` }}
                      >
                        {pkg.badge}
                      </div>
                    )}

                    {/* Header */}
                    <div className="p-8 pb-6">
                      <div className="text-4xl mb-4">{pkg.icon}</div>
                      <h3 className="font-display text-2xl font-extrabold text-white mb-2">
                        {pkg.tier} Package
                      </h3>
                      <div
                        className="font-display text-3xl font-extrabold mb-3"
                        style={{ color: pkg.highlight ? pkg.badgeColor : '#b49750' }}
                      >
                        {pkg.range}
                      </div>
                      <p className="text-white/60 text-sm italic">{pkg.tagline}</p>
                    </div>

                    {/* Divider */}
                    <div className="mx-8 h-px" style={{ background: pkg.highlight ? `${pkg.badgeColor}40` : 'rgba(255,255,255,0.08)' }} />

                    {/* Features */}
                    <div className="p-8 flex-grow">
                      <ul className="space-y-3">
                        {pkg.features.map((f) => (
                          <li key={f} className="flex items-start gap-3">
                            <span className="flex-shrink-0 mt-0.5 text-base" style={{ color: pkg.highlight ? pkg.badgeColor : '#b49750' }}>✓</span>
                            <span className="text-white/75 text-sm leading-relaxed">{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* CTA */}
                    <div className="p-8 pt-0">
                      <a
                        href={waUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full py-4 rounded-xl font-bold text-sm transition-all hover:opacity-90 hover:-translate-y-0.5"
                        style={pkg.highlight
                          ? { background: `linear-gradient(135deg, ${pkg.badgeColor}, #d4b96a)`, color: '#141e31' }
                          : { background: 'rgba(255,255,255,0.08)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }
                        }
                      >
                        <WhatsAppIcon className="w-4 h-4" />
                        Schedule a Consultation
                      </a>
                    </div>
                  </div>
                </AnimateIn>
              )
            })}
          </div>

          <AnimateIn delay={300}>
            <p className="text-center text-white/30 text-xs mt-8">
              All packages include: legal guidance, due diligence support, and dedicated Virtus Realty advisor. Pricing in USD. Individual results vary.
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* ═══ IMAGE BREAK 4: LUXURY RESORT POOL — ASPIRATIONAL ═══════════════ */}
      <ImageBreak
        src="/investor/luxury-resort-pool.jpg"
        height="420px"
        overlayGradient="linear-gradient(to bottom, rgba(20,30,49,0.3) 0%, rgba(20,30,49,0.7) 100%)"
      >
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', height: '100%', padding: '0 0 48px 0', textAlign: 'center' }}>
          <div>
            <div style={{ color: '#d4b96a', fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '12px' }}>
              The Life Your Investment Buys
            </div>
            <h3 style={{ color: '#ffffff', fontSize: '38px', fontWeight: 800, lineHeight: 1.2, marginBottom: '12px', fontFamily: 'inherit' }}>
              This Is What Success Looks Like.
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '18px', lineHeight: 1.6, maxWidth: '560px', margin: '0 auto' }}>
              Luxury Caribbean living. Strong rental returns. And a portfolio growing while you relax.
            </p>
          </div>
        </div>
      </ImageBreak>

      {/* ═══ SECTION 7: BUYING PROCESS FOR AMERICANS ════════════════════════ */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateIn>
            <div className="text-center mb-16">
              <span className="font-semibold text-sm uppercase tracking-widest" style={{ color: '#b49750' }}>Simple & Transparent</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold mt-3" style={{ color: '#141e31' }}>
                The Buying Process for Americans
              </h2>
              <p className="text-gray-500 text-lg mt-4 max-w-xl mx-auto">
                We handle everything. You just collect returns.
              </p>
            </div>
          </AnimateIn>

          <div className="relative">
            {/* Vertical connector line */}
            <div
              className="absolute left-7 top-10 bottom-10 w-0.5 hidden md:block"
              style={{ background: 'linear-gradient(to bottom, #b49750, rgba(180,151,80,0.1))' }}
            />

            <div className="space-y-5">
              {buyingSteps.map((step, i) => (
                <AnimateIn key={step.step} delay={i * 100}>
                  <div
                    className="flex gap-6 p-6 rounded-2xl border hover:shadow-xl transition-all duration-300"
                    style={{
                      background: 'linear-gradient(135deg, #fff, #fdf9f0)',
                      borderColor: 'rgba(180,151,80,0.2)',
                    }}
                  >
                    {/* Step circle */}
                    <div
                      className="flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center text-2xl z-10"
                      style={{ background: 'linear-gradient(135deg, #141e31, #1c2d4a)' }}
                    >
                      {step.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span
                          className="text-xs font-bold px-2.5 py-1 rounded-full"
                          style={{ background: 'rgba(180,151,80,0.15)', color: '#8a6f2e' }}
                        >
                          Step {step.step}
                        </span>
                        <h3 className="font-display text-lg font-bold" style={{ color: '#141e31' }}>{step.title}</h3>
                      </div>
                      <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                </AnimateIn>
              ))}
            </div>
          </div>

          <AnimateIn delay={300}>
            <div
              className="mt-10 p-6 md:p-8 rounded-2xl text-center"
              style={{ background: 'linear-gradient(135deg, #141e31, #1c2d4a)' }}
            >
              <div className="text-4xl mb-3">🏛️</div>
              <h3 className="font-display text-xl font-bold mb-2" style={{ color: '#b49750' }}>
                No Restrictions for Foreign Buyers
              </h3>
              <p className="text-white/65 max-w-xl mx-auto text-sm leading-relaxed">
                Law 16-95 and the DR Constitution guarantee foreigners the same property rights as Dominican citizens. Own property outright, in your name, protected by law. No special permits, no extra taxes, no hoops to jump through.
              </p>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ═══ IMAGE BREAK 5: DR PEOPLE & CULTURE ─────────────────────────────── */}
      <ImageBreak
        src="/investor/dr-people-culture.jpg"
        height="360px"
        overlayGradient="linear-gradient(to right, rgba(20,30,49,0.85) 0%, rgba(20,30,49,0.4) 60%, rgba(20,30,49,0.6) 100%)"
      >
        <div style={{ display: 'flex', alignItems: 'center', height: '100%', padding: '0 40px' }}>
          <div style={{ maxWidth: '560px' }}>
            <div style={{ color: '#b49750', fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '16px' }}>
              The Heart of the Dominican Republic
            </div>
            <h3 style={{ color: '#ffffff', fontSize: '34px', fontWeight: 800, lineHeight: 1.2, marginBottom: '16px', fontFamily: 'inherit' }}>
              Warmth, Culture & Community.
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '18px', lineHeight: 1.6 }}>
              The Dominican people are the soul of this country. Vibrant, welcoming, and proud — this is a culture that makes investors feel at home from day one.
            </p>
          </div>
        </div>
      </ImageBreak>

      {/* ═══ SECTION 8: WHY VIRTUS REALTY ═══════════════════════════════════ */}
      <section className="py-24" style={{ background: 'linear-gradient(135deg, #f8f5ef 0%, #f4efe3 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateIn>
            <div className="text-center mb-14">
              <span className="font-semibold text-sm uppercase tracking-widest" style={{ color: '#b49750' }}>Your Partner</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold mt-3" style={{ color: '#141e31' }}>
                Why Virtus Realty?
              </h2>
              <p className="text-gray-600 text-lg mt-4 max-w-xl mx-auto">
                US standards. Caribbean connections. The best of both worlds for your investment.
              </p>
            </div>
          </AnimateIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {virtusAdvantages.map((adv, i) => (
              <AnimateIn key={adv.title} delay={i * 80}>
                <div
                  className="group p-7 rounded-2xl border bg-white hover:shadow-xl transition-all duration-300 h-full"
                  style={{ borderColor: 'rgba(180,151,80,0.2)' }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = '#b49750'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(180,151,80,0.2)'}
                >
                  <div className="text-4xl mb-4">{adv.icon}</div>
                  <h3 className="font-bold text-base mb-2" style={{ color: '#141e31' }}>{adv.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{adv.desc}</p>
                </div>
              </AnimateIn>
            ))}
          </div>

          <AnimateIn delay={200}>
            <div
              className="mt-10 p-8 rounded-2xl flex flex-col md:flex-row items-center gap-6 text-center md:text-left"
              style={{ background: 'linear-gradient(135deg, #141e31, #1c2d4a)' }}
            >
              <div className="text-5xl flex-shrink-0">🇩🇴</div>
              <div className="flex-1">
                <h3 className="font-display text-xl font-bold text-white mb-2">
                  Licensed in Florida. Connected in the Dominican Republic.
                </h3>
                <p className="text-white/65 leading-relaxed text-sm">
                  We bridge the gap between US investor expectations and Dominican market realities. Our bilingual team handles everything — you never have to worry about language barriers, unfamiliar legal systems, or missing a deal because you couldn't act fast enough.
                </p>
              </div>
              <a
                href={waAdvisor}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm whitespace-nowrap transition-all hover:opacity-90"
                style={{ background: '#25D366', color: '#fff' }}
              >
                <WhatsAppIcon className="w-4 h-4" />
                Talk to Our Team
              </a>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ═══ FINAL CTA ═══════════════════════════════════════════════════════ */}
      <section className="py-24 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0a101d 0%, #141e31 60%, #0d1a2d 100%)' }}>
        {/* Background texture */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1400&q=60')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          {[...Array(18)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full animate-pulse"
              style={{
                left: `${(i * 13 + 3) % 100}%`,
                top: `${(i * 19 + 7) % 100}%`,
                width: 2 + (i % 5),
                height: 2 + (i % 5),
                background: '#b49750',
                opacity: 0.2,
                animationDelay: `${i * 250}ms`,
                animationDuration: `${2500 + i * 300}ms`,
              }}
            />
          ))}
        </div>
        {/* Gold top line */}
        <div className="absolute top-0 left-0 right-0 h-1" style={{ background: 'linear-gradient(90deg, transparent 0%, #b49750 30%, #d4b96a 50%, #b49750 70%, transparent 100%)' }} />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimateIn>
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="h-px w-20 opacity-40" style={{ background: '#b49750' }} />
              <span className="text-3xl">💰</span>
              <div className="h-px w-20 opacity-40" style={{ background: '#b49750' }} />
            </div>

            <h2 className="font-display text-5xl md:text-6xl font-extrabold text-white mb-4">
              The Window Is Open.
            </h2>
            <h3 className="font-display text-2xl md:text-3xl font-bold mb-6" style={{ color: '#b49750' }}>
              Don't Miss the Wave.
            </h3>

            <p className="text-xl text-white/75 max-w-2xl mx-auto mb-4 leading-relaxed">
              Property values are still affordable compared to US markets.
            </p>
            <p className="text-lg text-white/60 max-w-xl mx-auto mb-12 leading-relaxed italic">
              "A 3-bedroom apartment in Santo Domingo costs less than a used car in Miami."
            </p>

            {/* Main WhatsApp CTA */}
            <div className="flex flex-col sm:flex-row gap-5 justify-center items-center mb-10">
              <a
                href={waGeneral}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-10 py-5 rounded-2xl font-extrabold text-lg shadow-2xl hover:-translate-y-1 transition-all duration-200 hover:shadow-green-900/50"
                style={{ background: '#25D366', color: '#fff' }}
              >
                <WhatsAppIcon className="w-6 h-6" />
                Start Your Investment Journey
              </a>
            </div>

            {/* Phone */}
            <a
              href="tel:+19546004976"

              className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors text-xl font-semibold mb-6"
            >
              📞 (954) 600-4976
            </a>

            <p className="text-white/40 text-sm mb-12">Schedule a free consultation · No obligation · English & Spanish</p>

            {/* Trust badges */}
            <div className="flex flex-wrap justify-center gap-4 mb-10">
              {[
                '🇺🇸 Florida Licensed',
                '🇩🇴 DR Specialist',
                '💬 Bilingual Team',
                '🏦 Bank Foreclosure Access',
                '🔒 Secure Transactions',
                '🏡 Full-Service',
              ].map(badge => (
                <div
                  key={badge}
                  className="text-sm px-4 py-2 rounded-full font-medium"
                  style={{ background: 'rgba(180,151,80,0.12)', color: '#d4b96a', border: '1px solid rgba(180,151,80,0.25)' }}
                >
                  {badge}
                </div>
              ))}
            </div>

            {/* Also browse Dominican Properties */}
            <div
              className="pt-8 border-t"
              style={{ borderColor: 'rgba(255,255,255,0.1)' }}
            >
              <p className="text-white/40 text-sm mb-4">Also explore</p>
              <Link
                to="/dominican-republic"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm border transition-all hover:bg-white/10"
                style={{ borderColor: 'rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.7)' }}
              >
                🇩🇴 Browse All Dominican Republic Properties →
              </Link>
            </div>

            {/* Gold divider */}
            <div className="mt-12 w-24 h-1 mx-auto rounded-full" style={{ background: 'linear-gradient(90deg, transparent, #b49750, transparent)' }} />

            {/* Disclaimer */}
            <p className="text-white/25 text-xs mt-8 max-w-2xl mx-auto leading-relaxed">
              Investment involves risk. Past performance and market projections do not guarantee future results. Statistics sourced from IMF, UNCTAD, MITUR, Banco Central DR, HolProp, AirDNA, and Government of Dominican Republic official publications. Verify all information before making investment decisions.
            </p>
          </AnimateIn>
        </div>
      </section>
    </div>
  )
}
