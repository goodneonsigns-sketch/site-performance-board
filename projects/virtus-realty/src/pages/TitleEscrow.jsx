import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

/* ─── Animation hooks ────────────────────────────────────────────────────── */
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

/* ─── Data ───────────────────────────────────────────────────────────────── */

const services = [
  {
    icon: '🔍',
    title: 'Title Search & Examination',
    desc: 'Comprehensive research to verify clear chain of ownership and identify any potential issues before closing.',
    color: '#0e7490',
  },
  {
    icon: '🛡️',
    title: 'Title Insurance',
    desc: 'One-time protection against hidden claims, liens, fraud, and defects — covering you for as long as you own the property.',
    color: '#0369a1',
  },
  {
    icon: '🏦',
    title: 'Escrow Services',
    desc: 'Secure, neutral handling of all funds throughout the transaction — ensuring money moves safely from buyer to seller.',
    color: '#0e7490',
  },
  {
    icon: '🔑',
    title: 'Closing Coordination',
    desc: "From contract to keys, every detail managed with precision. One point of contact. Zero confusion.",
    color: '#0369a1',
  },
  {
    icon: '🔎',
    title: 'Lien Searches',
    desc: 'Identify and resolve any outstanding obligations, municipal liens, code violations, or unpaid assessments.',
    color: '#0e7490',
  },
  {
    icon: '📄',
    title: 'Document Preparation',
    desc: 'All closing documents prepared accurately and reviewed thoroughly — nothing gets missed.',
    color: '#0369a1',
  },
  {
    icon: '🏢',
    title: 'Commercial Closings',
    desc: 'Office buildings, hotels, multi-family, retail shopping centers — complex commercial closings handled expertly.',
    color: '#0e7490',
  },
  {
    icon: '🌐',
    title: 'After-Hours & Remote Closings',
    desc: 'Flexible scheduling, available nationwide. Close on your timeline — not just 9-to-5.',
    color: '#0369a1',
  },
]

const whyChoose = [
  { icon: '💰', title: 'Most Competitive Fees', desc: 'Industry-leading pricing with no hidden costs or surprise charges at closing.' },
  { icon: '📞', title: 'Single Point of Contact', desc: "One dedicated specialist on every transaction — you'll always know who to call." },
  { icon: '🌙', title: 'After-Hours & Remote', desc: 'Evening, weekend, and remote closings available. We work around your schedule.' },
  { icon: '🏆', title: '75+ Years Combined Experience', desc: 'A seasoned team that has seen every scenario and knows how to handle it.' },
  { icon: '📈', title: 'Thousands of Closings', desc: 'Successfully closed thousands of transactions since our founding in 2009.' },
  { icon: '🏗️', title: 'Residential & Commercial', desc: 'From a first home to a multi-million dollar commercial complex — we do it all.' },
]

const underwriters = [
  { name: 'Fidelity National Title Insurance', abbr: 'Fidelity National' },
  { name: 'First American Title', abbr: 'First American' },
  { name: 'Old Republic Title', abbr: 'Old Republic' },
  { name: 'AmTrust Title', abbr: 'AmTrust' },
  { name: 'Stewart Title', abbr: 'Stewart' },
]

const whoWeServe = [
  {
    icon: '🏠',
    label: 'Buyers',
    desc: 'Protect your new home with a thorough title search and insurance from day one. Know exactly what you own — and that no one can take it from you.',
  },
  {
    icon: '💰',
    label: 'Sellers',
    desc: 'Clear liens, satisfy mortgages, and close with confidence. Competitive rates make the process smooth for both sides of the table.',
  },
  {
    icon: '🤝',
    label: 'Realtors',
    desc: 'Dedicated support and after-hours availability. Fast turnaround on title commitments keeps your deals moving.',
  },
  {
    icon: '🏗️',
    label: 'Builders',
    desc: 'New construction closings require specialized expertise. Nu World Title handles the complexity so you can focus on building.',
  },
  {
    icon: '🏦',
    label: 'Lenders',
    desc: 'Reliable title commitments and loan policy issuance. Accurate, timely, and fully compliant with lender requirements.',
  },
  {
    icon: '📈',
    label: 'Investors',
    desc: 'Multi-property portfolios, commercial closings, and after-hours availability. We scale with your investment strategy.',
  },
]

/* ─── Component ──────────────────────────────────────────────────────────── */
export default function TitleEscrow() {
  const [activeTab, setActiveTab] = useState('Buyers')

  useEffect(() => {
    document.title = 'Title & Escrow Services | Nu World Title Partner | Virtus Realty Group'
    const meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute('content', 'Virtus Realty Group partners with Nu World Title — South Florida\'s trusted full-service title insurance and settlement agency. Smooth closings, clear titles, peace of mind.')
  }, [])

  const scrollToContact = () => {
    document.getElementById('title-contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  const whatsappMsg = encodeURIComponent("Hi! I'd like to request a free title quote through Virtus Realty Group.")
  const whatsappUrl = `https://wa.me/19542588379?text=${whatsappMsg}`

  const activeServe = whoWeServe.find(s => s.label === activeTab) || whoWeServe[0]

  return (
    <div className="font-sans">

      {/* ═══ 1. HERO ════════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-center bg-cover"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1800&q=85')",
            transform: 'scale(1.05)',
          }}
        />
        {/* Dark gradient overlay */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(135deg, rgba(14,30,53,0.88) 0%, rgba(14,30,53,0.70) 50%, rgba(14,30,53,0.90) 100%)' }}
        />
        {/* Teal accent line */}
        <div
          className="absolute bottom-0 left-0 right-0 h-1"
          style={{ background: 'linear-gradient(90deg, transparent, #0e7490, #06b6d4, #0e7490, transparent)' }}
        />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
          {/* Nu World Title logo badge */}
          <div className="flex justify-center mb-8">
            <div
              className="inline-flex items-center gap-4 px-6 py-4 rounded-2xl border"
              style={{ background: 'rgba(255,255,255,0.08)', borderColor: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)' }}
            >
              <img
                src="/partners/nu-world-title-logo.jpg"
                alt="Nu World Title"
                className="h-12 w-auto object-contain rounded-lg"
              />
              <div className="text-left">
                <div className="text-white/60 text-xs uppercase tracking-widest font-medium">Partner Services</div>
                <div className="text-white font-bold text-sm">Nu World Title</div>
              </div>
            </div>
          </div>

          <div
            className="inline-flex items-center gap-2 border rounded-full px-5 py-2 text-sm font-medium mb-8"
            style={{ background: 'rgba(14,116,144,0.18)', borderColor: 'rgba(6,182,212,0.4)', color: '#67e8f9' }}
          >
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#06b6d4' }} />
            Title Insurance & Settlement Services · Doral, FL
          </div>

          <h1 className="font-display text-5xl md:text-7xl font-extrabold text-white leading-tight mb-6 drop-shadow-2xl">
            Smooth Closings.
            <span className="block" style={{ color: '#22d3ee' }}>Clear Titles.</span>
            <span className="block text-white">Peace of Mind.</span>
          </h1>

          <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto mb-12 leading-relaxed font-light">
            Virtus Realty Group partners with Nu World Title to ensure
            <strong className="text-white font-semibold"> every transaction closes with confidence.</strong>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={scrollToContact}
              className="inline-flex items-center justify-center gap-2 px-9 py-4 rounded-xl font-bold text-base shadow-2xl transform hover:-translate-y-1 transition-all duration-200"
              style={{ background: 'linear-gradient(135deg, #0e7490, #06b6d4)', color: '#fff' }}
            >
              🏠 Get a Title Quote
            </button>
            <button
              onClick={() => document.getElementById('title-about')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center justify-center gap-2 px-9 py-4 rounded-xl font-bold text-base border transition-all hover:bg-white/20"
              style={{ background: 'rgba(255,255,255,0.1)', borderColor: 'rgba(255,255,255,0.3)', color: '#fff' }}
            >
              Learn More ↓
            </button>
          </div>

          {/* Quick trust stats */}
          <div className="mt-20 grid grid-cols-3 gap-4 max-w-lg mx-auto">
            {[['2009', 'Founded'], ['75+', 'Years Experience'], ['1000s', 'Closings Done']].map(([val, label]) => (
              <div key={label} className="text-center">
                <div className="font-display text-2xl md:text-3xl font-bold" style={{ color: '#22d3ee' }}>{val}</div>
                <div className="text-white/60 text-xs uppercase tracking-wider mt-1">{label}</div>
              </div>
            ))}
          </div>

          {/* Scroll indicator */}
          <div className="mt-12 flex justify-center">
            <button
              onClick={() => document.getElementById('title-about')?.scrollIntoView({ behavior: 'smooth' })}
              className="flex flex-col items-center gap-2 text-white/40 hover:text-white/70 transition-colors"
            >
              <span className="text-xs uppercase tracking-widest">Scroll to explore</span>
              <div className="w-6 h-10 border-2 border-current rounded-full flex items-start justify-center pt-2">
                <div className="w-1.5 h-3 bg-current rounded-full animate-bounce" />
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* ═══ 2. PARTNERSHIP INTRODUCTION ════════════════════════════════════ */}
      <section id="title-about" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left: Text */}
            <AnimateIn>
              <span className="font-semibold text-sm uppercase tracking-widest" style={{ color: '#0e7490' }}>A Trusted Partnership</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold mt-3 mb-6" style={{ color: '#141e31' }}>
                Your Transaction,
                <span className="block" style={{ color: '#0e7490' }}>Backed by the Best</span>
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-5">
                When you buy or sell with Virtus Realty Group, you get the backing of one of South Florida's most trusted title companies.
              </p>
              <p className="text-gray-500 text-base leading-relaxed mb-6">
                Nu World Title has been handling title searches, insurance, and closings since 2009 — with a team carrying 75+ years of combined experience and thousands of successful closings. Together, we make the process seamless from contract to keys.
              </p>
              <blockquote
                className="pl-5 border-l-4 py-2 mb-8 italic text-gray-600"
                style={{ borderColor: '#0e7490' }}
              >
                "Before you officially claim your new property, there's one critical step — ensuring the title is 100% clear."
              </blockquote>
              <button
                onClick={scrollToContact}
                className="inline-flex items-center gap-2 px-7 py-3 rounded-xl font-bold text-sm transition-all hover:-translate-y-0.5 shadow-lg"
                style={{ background: 'linear-gradient(135deg, #0e7490, #06b6d4)', color: '#fff' }}
              >
                Request a Free Title Quote →
              </button>
            </AnimateIn>

            {/* Right: Partner logos */}
            <AnimateIn delay={150}>
              <div
                className="rounded-3xl p-8 md:p-12 flex flex-col items-center gap-8 text-center"
                style={{ background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)', border: '1px solid rgba(14,116,144,0.15)' }}
              >
                <div className="text-sm font-semibold uppercase tracking-widest text-gray-400 mb-2">In Partnership With</div>

                {/* Nu World Title logo */}
                <div className="flex items-center justify-center p-6 bg-white rounded-2xl shadow-md w-full max-w-xs">
                  <img
                    src="/partners/nu-world-title-logo.jpg"
                    alt="Nu World Title"
                    className="h-20 w-auto object-contain"
                  />
                </div>

                <div className="flex items-center gap-4 w-full">
                  <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(14,116,144,0.3))' }} />
                  <span className="text-2xl">🤝</span>
                  <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, rgba(14,116,144,0.3), transparent)' }} />
                </div>

                {/* Virtus branding */}
                <div
                  className="flex items-center gap-3 px-6 py-4 rounded-2xl shadow-md w-full max-w-xs justify-center"
                  style={{ background: '#141e31' }}
                >
                  <div>
                    <div className="font-display font-bold text-white text-lg">Virtus Realty Group</div>
                    <div className="text-xs font-medium" style={{ color: '#b49750' }}>South Florida Real Estate</div>
                  </div>
                </div>

                <p className="text-sm text-gray-500 max-w-xs leading-relaxed">
                  Together delivering seamless real estate transactions across South Florida and beyond.
                </p>
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* ═══ 3. WHAT IS TITLE INSURANCE ═════════════════════════════════════ */}
      <section className="py-24" style={{ background: 'linear-gradient(135deg, #0a1628 0%, #141e31 100%)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateIn>
            <div className="text-center mb-16">
              <span className="font-semibold text-sm uppercase tracking-widest" style={{ color: '#22d3ee' }}>Know Before You Close</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white mt-3">
                What Is Title Insurance?
              </h2>
              <p className="text-white/65 text-lg mt-4 max-w-2xl mx-auto">
                Most buyers don't fully understand it — but it's one of the most important protections you'll ever have.
              </p>
            </div>
          </AnimateIn>

          {/* Main explainer */}
          <AnimateIn delay={100}>
            <div
              className="rounded-3xl p-8 md:p-12 mb-12 text-center"
              style={{ background: 'linear-gradient(135deg, rgba(14,116,144,0.2), rgba(6,182,212,0.1))', border: '1px solid rgba(6,182,212,0.3)' }}
            >
              <div className="text-6xl mb-6">🏡</div>
              <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-4">
                One-Time Payment. Lifetime Protection. No Renewals, No Expiration.
              </h3>
              <p className="text-white/70 text-lg leading-relaxed max-w-2xl mx-auto">
                Title insurance protects your ownership from hidden claims, liens, fraud, and defects that may surface <em>after</em> you've bought the property. Unlike other insurance, you pay once — and you're protected for as long as you own the property.
              </p>
            </div>
          </AnimateIn>

          {/* Key points grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: '🏛️',
                title: 'Protects Against Past Events',
                desc: 'Unpaid taxes, forged documents, errors in public records, unknown heirs — title insurance covers risks that existed before you bought the home.',
              },
              {
                icon: '⚖️',
                title: 'Covers Legal Defense',
                desc: 'If someone challenges your ownership, your title insurance policy covers the legal costs to defend your title in court.',
              },
              {
                icon: '💵',
                title: 'Pays Out If You Lose',
                desc: 'In the unlikely event a claim is valid and you lose ownership rights, title insurance compensates you for your covered losses.',
              },
            ].map((point, i) => (
              <AnimateIn key={point.title} delay={i * 100}>
                <div
                  className="p-7 rounded-2xl border h-full"
                  style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)' }}
                >
                  <div className="text-4xl mb-4">{point.icon}</div>
                  <h3 className="font-display text-lg font-bold text-white mb-3">{point.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{point.desc}</p>
                </div>
              </AnimateIn>
            ))}
          </div>

          {/* Simple callout */}
          <AnimateIn delay={200}>
            <div
              className="mt-10 p-6 rounded-2xl flex flex-col md:flex-row items-center gap-4 text-center md:text-left"
              style={{ background: 'rgba(180,151,80,0.12)', border: '1px solid rgba(180,151,80,0.3)' }}
            >
              <div className="text-4xl flex-shrink-0">💡</div>
              <div className="flex-1">
                <h4 className="font-bold text-white text-base mb-1">The Bottom Line</h4>
                <p className="text-white/65 text-sm">
                  For a one-time fee at closing, you protect the single largest investment of your life — forever. It's not optional, it's essential.
                </p>
              </div>
              <button
                onClick={scrollToContact}
                className="flex-shrink-0 px-5 py-2.5 rounded-xl font-bold text-sm transition-all hover:opacity-90 whitespace-nowrap"
                style={{ background: 'linear-gradient(135deg, #b49750, #d4b96a)', color: '#141e31' }}
              >
                Get a Free Quote →
              </button>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ═══ 4. SERVICES GRID ═══════════════════════════════════════════════ */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateIn>
            <div className="text-center mb-16">
              <span className="font-semibold text-sm uppercase tracking-widest" style={{ color: '#0e7490' }}>Full-Service Title Agency</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold mt-3" style={{ color: '#141e31' }}>
                What Nu World Title Offers
              </h2>
              <p className="text-gray-500 text-lg mt-4 max-w-2xl mx-auto">
                From first search to final signature — every service you need for a smooth closing.
              </p>
            </div>
          </AnimateIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map((svc, i) => (
              <AnimateIn key={svc.title} delay={i * 60}>
                <div
                  className="group p-6 rounded-2xl border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full flex flex-col"
                  style={{ borderColor: 'rgba(14,116,144,0.15)', background: '#fff' }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = '#0e7490'
                    e.currentTarget.style.background = 'linear-gradient(135deg, #f0f9ff, #fff)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'rgba(14,116,144,0.15)'
                    e.currentTarget.style.background = '#fff'
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4 flex-shrink-0"
                    style={{ background: `${svc.color}18` }}
                  >
                    {svc.icon}
                  </div>
                  <h3 className="font-display font-bold text-base mb-2 flex-shrink-0" style={{ color: '#141e31' }}>
                    {svc.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed flex-grow">{svc.desc}</p>
                  <div
                    className="mt-4 pt-4 border-t text-xs font-semibold flex items-center gap-1"
                    style={{ borderColor: `${svc.color}20`, color: svc.color }}
                  >
                    Learn More →
                  </div>
                </div>
              </AnimateIn>
            ))}
          </div>

          {/* CTA strip below services */}
          <AnimateIn delay={200}>
            <div
              className="mt-10 p-6 md:p-8 rounded-2xl flex flex-col md:flex-row items-center gap-6 text-center md:text-left"
              style={{ background: 'linear-gradient(135deg, #141e31, #1c2d4a)' }}
            >
              <div className="flex-1">
                <h3 className="font-display text-xl font-bold text-white mb-1">
                  Need a service not listed?
                </h3>
                <p className="text-white/60 text-sm">
                  Nu World Title handles virtually every title and closing need — residential or commercial. Contact Ingrid directly.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
                <a
                  href="tel:+19542588379"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm border border-white/20 text-white hover:bg-white/10 transition-all"
                >
                  📞 (954) 258-8379
                </a>
                <a
                  href="mailto:ingrid@nuworldtitle.com"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm transition-all hover:opacity-90"
                  style={{ background: 'linear-gradient(135deg, #0e7490, #06b6d4)', color: '#fff' }}
                >
                  ✉️ Email Ingrid
                </a>
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ═══ 5. UNDERWRITERS ════════════════════════════════════════════════ */}
      <section className="py-16" style={{ background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateIn>
            <div className="text-center mb-10">
              <span className="font-semibold text-sm uppercase tracking-widest" style={{ color: '#0e7490' }}>Backed by National Leaders</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold mt-3" style={{ color: '#141e31' }}>
                Trusted Underwriters
              </h2>
              <p className="text-gray-500 text-base mt-3 max-w-xl mx-auto">
                Nu World Title is backed by the nation's most trusted title insurance underwriters.
              </p>
            </div>
          </AnimateIn>

          <div className="flex flex-wrap justify-center gap-4">
            {underwriters.map((uw, i) => (
              <AnimateIn key={uw.name} delay={i * 60}>
                <div
                  className="flex flex-col items-center gap-2 px-8 py-5 rounded-2xl bg-white shadow-sm border transition-all hover:shadow-md hover:-translate-y-0.5 duration-200 min-w-[160px]"
                  style={{ borderColor: 'rgba(14,116,144,0.15)' }}
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold"
                    style={{ background: 'linear-gradient(135deg, #0e7490, #06b6d4)', color: '#fff' }}
                  >
                    {uw.abbr.charAt(0)}
                  </div>
                  <div className="font-bold text-xs text-center leading-tight" style={{ color: '#141e31' }}>
                    {uw.abbr}
                  </div>
                  <div className="text-xs text-center text-gray-400 leading-tight hidden sm:block">
                    {uw.name}
                  </div>
                </div>
              </AnimateIn>
            ))}
          </div>

          <AnimateIn delay={200}>
            <p className="text-center text-xs text-gray-400 mt-8">
              These are among the most financially stable and reputable title insurance underwriters in the United States.
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* ═══ 6. WHY NU WORLD TITLE ══════════════════════════════════════════ */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateIn>
            <div className="text-center mb-16">
              <span className="font-semibold text-sm uppercase tracking-widest" style={{ color: '#0e7490' }}>Why We Trust Them</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold mt-3" style={{ color: '#141e31' }}>
                Why Nu World Title?
              </h2>
              <p className="text-gray-500 text-lg mt-4 max-w-xl mx-auto">
                There are many title companies in South Florida. Here's what sets Nu World Title apart.
              </p>
            </div>
          </AnimateIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChoose.map((item, i) => (
              <AnimateIn key={item.title} delay={i * 80}>
                <div
                  className="flex gap-4 p-6 rounded-2xl border transition-all hover:shadow-lg duration-300"
                  style={{ borderColor: 'rgba(14,116,144,0.15)', background: 'linear-gradient(135deg, #f0f9ff 0%, #fff 100%)' }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                    style={{ background: 'linear-gradient(135deg, #0e7490, #06b6d4)', color: '#fff' }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-base mb-1.5" style={{ color: '#141e31' }}>{item.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 6b. AWARDS & RECOGNITION ════════════════════════════════════════ */}
      <section className="py-16" style={{ background: 'linear-gradient(135deg, #0a1628 0%, #141e31 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateIn>
            <div className="text-center mb-12">
              <span className="font-semibold text-sm uppercase tracking-widest" style={{ color: '#06b6d4' }}>Industry Recognition</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold mt-3 text-white">
                Award-Winning Excellence
              </h2>
            </div>
          </AnimateIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { icon: '🏆', title: 'Fidelity National Top 10', desc: 'Recognized among the top 10 title agencies by Fidelity National Title Insurance' },
              { icon: '🌎', title: 'North American Top 10', desc: 'Ranked in the top 10 title companies across North America' },
              { icon: '⭐', title: 'Florida Statewide Top 3', desc: 'Consistently ranked among the top 3 title companies in the state of Florida' },
            ].map((award, i) => (
              <AnimateIn key={award.title} delay={i * 100}>
                <div className="text-center p-6 rounded-2xl" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(6,182,212,0.2)' }}>
                  <div className="text-4xl mb-3">{award.icon}</div>
                  <h3 className="font-bold text-white text-base mb-2">{award.title}</h3>
                  <p className="text-white/50 text-sm">{award.desc}</p>
                </div>
              </AnimateIn>
            ))}
          </div>

          <AnimateIn delay={300}>
            <div className="flex flex-wrap justify-center gap-8 mt-12 pt-8 border-t" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
              {[
                { value: '16+', label: 'Years in Business' },
                { value: '14+', label: 'Partner Brokerages' },
                { value: '1000s', label: 'Closings Completed' },
                { value: '50', label: 'States Served' },
              ].map(stat => (
                <div key={stat.label} className="text-center">
                  <div className="font-display text-2xl font-extrabold" style={{ color: '#06b6d4' }}>{stat.value}</div>
                  <div className="text-white/40 text-xs mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ═══ 6c. LEADERSHIP TEAM ═══════════════════════════════════════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateIn>
            <div className="text-center mb-14">
              <span className="font-semibold text-sm uppercase tracking-widest" style={{ color: '#0e7490' }}>The Team Behind Your Closing</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold mt-3" style={{ color: '#141e31' }}>
                Leadership You Can Trust
              </h2>
            </div>
          </AnimateIn>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { name: 'Rudy Hernandez', role: 'CEO & Founder', icon: '👔' },
              { name: 'Josh Santos', role: 'President', icon: '🏛️' },
              { name: 'Genesis Gonzalez', role: 'Operations', icon: '⚙️' },
              { name: 'Yeni Rojas', role: 'Human Resources', icon: '🤝' },
              { name: 'Meyling Montelongo', role: 'Sales & Marketing', icon: '📈' },
              { name: 'Bridgette Alvarez', role: 'In-House Counsel', icon: '⚖️' },
            ].map((person, i) => (
              <AnimateIn key={person.name} delay={i * 60}>
                <div className="text-center p-4">
                  <div
                    className="w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center text-2xl"
                    style={{ background: 'linear-gradient(135deg, #e0f2fe, #cffafe)' }}
                  >
                    {person.icon}
                  </div>
                  <h3 className="font-bold text-sm" style={{ color: '#141e31' }}>{person.name}</h3>
                  <p className="text-gray-400 text-xs mt-0.5">{person.role}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 7. WHO WE SERVE ════════════════════════════════════════════════ */}
      <section className="py-24" style={{ background: 'linear-gradient(135deg, #0a1628 0%, #141e31 100%)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateIn>
            <div className="text-center mb-12">
              <span className="font-semibold text-sm uppercase tracking-widest" style={{ color: '#22d3ee' }}>For Every Party in the Transaction</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white mt-3">
                Who We Serve
              </h2>
            </div>
          </AnimateIn>

          {/* Tab row */}
          <AnimateIn delay={100}>
            <div className="flex flex-wrap justify-center gap-2 mb-10">
              {whoWeServe.map((item) => (
                <button
                  key={item.label}
                  onClick={() => setActiveTab(item.label)}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm transition-all duration-200"
                  style={
                    activeTab === item.label
                      ? { background: 'linear-gradient(135deg, #0e7490, #06b6d4)', color: '#fff', border: '2px solid #06b6d4' }
                      : { background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.7)', border: '2px solid transparent' }
                  }
                >
                  <span>{item.icon}</span>
                  {item.label}
                </button>
              ))}
            </div>
          </AnimateIn>

          {/* Active tab content */}
          <AnimateIn key={activeTab} delay={0}>
            <div
              className="max-w-2xl mx-auto p-8 rounded-3xl text-center"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}
            >
              <div className="text-6xl mb-6">{activeServe.icon}</div>
              <h3 className="font-display text-2xl font-bold text-white mb-4">{activeServe.label}</h3>
              <p className="text-white/70 text-lg leading-relaxed">{activeServe.desc}</p>
              <button
                onClick={scrollToContact}
                className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all hover:opacity-90"
                style={{ background: 'linear-gradient(135deg, #0e7490, #06b6d4)', color: '#fff' }}
              >
                Get Started → Contact Ingrid
              </button>
            </div>
          </AnimateIn>

          {/* All cards — compact grid below */}
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {whoWeServe.map((item, i) => (
              <AnimateIn key={item.label} delay={i * 60}>
                <button
                  onClick={() => setActiveTab(item.label)}
                  className="p-4 rounded-2xl text-center transition-all duration-200 w-full"
                  style={
                    activeTab === item.label
                      ? { background: 'linear-gradient(135deg, #0e7490, #06b6d4)', color: '#fff' }
                      : { background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.65)' }
                  }
                >
                  <div className="text-2xl mb-1">{item.icon}</div>
                  <div className="text-xs font-semibold">{item.label}</div>
                </button>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 8. CONTACT / CTA ═══════════════════════════════════════════════ */}
      <section id="title-contact" className="py-24 relative overflow-hidden" style={{ background: '#fff' }}>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1400&q=60')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.04,
          }}
        />
        {/* Teal top border */}
        <div className="absolute top-0 left-0 right-0 h-1" style={{ background: 'linear-gradient(90deg, transparent, #0e7490, #06b6d4, #0e7490, transparent)' }} />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateIn>
            <div className="text-center mb-16">
              <span className="font-semibold text-sm uppercase tracking-widest" style={{ color: '#0e7490' }}>Your Dedicated Closing Specialist</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold mt-3" style={{ color: '#141e31' }}>
                Ready to Close?
                <span className="block" style={{ color: '#0e7490' }}>Contact Ingrid Today.</span>
              </h2>
              <p className="text-gray-500 text-lg mt-4 max-w-xl mx-auto">
                Request a free title quote, ask a question, or get started on your next closing — Ingrid Morales is your single point of contact.
              </p>
            </div>
          </AnimateIn>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

            {/* Left: Contact card */}
            <AnimateIn>
              <div
                className="rounded-3xl p-8 text-center"
                style={{ background: 'linear-gradient(135deg, #0a1628, #141e31)' }}
              >
                {/* Nu World Title logo */}
                <div className="flex justify-center mb-6">
                  <div className="bg-white rounded-2xl px-6 py-4 inline-flex items-center">
                    <img
                      src="/partners/nu-world-title-logo-small.png"
                      alt="Nu World Title"
                      className="h-14 w-auto object-contain"
                    />
                  </div>
                </div>

                <h3 className="font-display text-2xl font-bold text-white mb-1">Ingrid Morales</h3>
                <p className="text-sm font-medium mb-6" style={{ color: '#22d3ee' }}>Closing Specialist · Nu World Title</p>

                <div className="space-y-4">
                  {/* Phone */}
                  <a
                    href="tel:+19542588379"
                    className="flex items-center justify-center gap-3 w-full py-4 rounded-xl font-bold text-base transition-all hover:opacity-90"
                    style={{ background: 'linear-gradient(135deg, #0e7490, #06b6d4)', color: '#fff' }}
                  >
                    📞 (954) 258-8379
                  </a>

                  {/* Email */}
                  <a
                    href="mailto:ingrid@nuworldtitle.com"
                    className="flex items-center justify-center gap-3 w-full py-4 rounded-xl font-bold text-base border border-white/20 text-white hover:bg-white/10 transition-all"
                  >
                    ✉️ ingrid@nuworldtitle.com
                  </a>

                  {/* WhatsApp */}
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 w-full py-4 rounded-xl font-bold text-base transition-all hover:opacity-90"
                    style={{ background: '#25D366', color: '#fff' }}
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    WhatsApp Ingrid
                  </a>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10 text-center">
                  <p className="text-white/40 text-xs">📍 Doral, FL · Available Nationwide</p>
                  <a
                    href="https://nuworldtitle.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs mt-1 block hover:underline"
                    style={{ color: '#22d3ee' }}
                  >
                    nuworldtitle.com ↗
                  </a>
                </div>
              </div>
            </AnimateIn>

            {/* Right: CTA + trust points */}
            <AnimateIn delay={150}>
              <div className="space-y-6">
                {/* Large CTA */}
                <div
                  className="p-8 rounded-3xl text-center"
                  style={{ background: 'linear-gradient(135deg, #f0f9ff, #e0f2fe)', border: '2px solid rgba(14,116,144,0.2)' }}
                >
                  <div className="text-5xl mb-4">🏠</div>
                  <h3 className="font-display text-2xl font-bold mb-3" style={{ color: '#141e31' }}>
                    Request a Free Title Quote
                  </h3>
                  <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                    No obligation. Get a quick, competitive quote for your title search and insurance needs — residential or commercial.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <a
                      href="tel:+19542588379"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all hover:-translate-y-0.5"
                      style={{ background: 'linear-gradient(135deg, #0e7490, #06b6d4)', color: '#fff' }}
                    >
                      📞 Call Now
                    </a>
                    <a
                      href="mailto:ingrid@nuworldtitle.com"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm border transition-all hover:-translate-y-0.5"
                      style={{ borderColor: '#0e7490', color: '#0e7490' }}
                    >
                      ✉️ Send Email
                    </a>
                  </div>
                </div>

                {/* Trust list */}
                <div className="space-y-3">
                  {[
                    '✅ Full-service title insurance and settlement agency',
                    '✅ Founded 2009 · Doral, FL',
                    '✅ Residential & commercial closings',
                    '✅ After-hours and remote closings available nationwide',
                    '✅ Backed by Fidelity National, First American, Old Republic, AmTrust & Stewart',
                    '✅ Most competitive fees in the industry',
                  ].map((point) => (
                    <div
                      key={point}
                      className="flex items-center gap-3 p-3 rounded-xl text-sm text-gray-700"
                      style={{ background: 'rgba(14,116,144,0.05)' }}
                    >
                      {point}
                    </div>
                  ))}
                </div>

                {/* Side-by-side logos */}
                <div
                  className="p-5 rounded-2xl flex items-center justify-center gap-6 flex-wrap"
                  style={{ background: '#141e31' }}
                >
                  <img
                    src="/partners/nu-world-title-logo-small.png"
                    alt="Nu World Title"
                    className="h-10 object-contain"
                    style={{ filter: 'brightness(1.1)' }}
                  />
                  <div className="w-px h-10 bg-white/20" />
                  <div className="text-center">
                    <div className="font-display font-bold text-white text-sm">Virtus Realty Group</div>
                    <div className="text-xs" style={{ color: '#b49750' }}>South Florida Real Estate</div>
                  </div>
                </div>
              </div>
            </AnimateIn>
          </div>

          {/* Virtus CTA link */}
          <AnimateIn delay={200}>
            <div className="mt-16 text-center">
              <p className="text-gray-400 text-sm mb-4">
                Buying or selling with Virtus Realty Group? Your agent will coordinate directly with Nu World Title on your behalf.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-sm transition-all hover:-translate-y-0.5 shadow-md"
                style={{ background: 'linear-gradient(135deg, #b49750, #d4b96a)', color: '#141e31' }}
              >
                Contact Virtus Realty Group →
              </Link>
            </div>
          </AnimateIn>
        </div>
      </section>

    </div>
  )
}
