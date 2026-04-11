import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

// ─── Inline styles & keyframes ────────────────────────────────────────────────

const globalStyles = `
  @keyframes rgGlowPulse {
    0%, 100% { opacity: 0.06; transform: scale(1); }
    50%       { opacity: 0.10; transform: scale(1.08); }
  }
  @keyframes rgGlowPulse2 {
    0%, 100% { opacity: 0.05; transform: scale(1); }
    50%       { opacity: 0.08; transform: scale(1.1); }
  }
  @keyframes rgShimmer {
    0%   { background-position: 200% center; }
    100% { background-position: -200% center; }
  }
  @keyframes rgFadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes rgSlideIn {
    from { opacity: 0; transform: translateX(-20px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes rgTyping {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0; }
  }
  @keyframes rgCountUp {
    from { opacity: 0; transform: translateY(12px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes rgSpin {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }

  .rg-btn-primary {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 14px 28px;
    background: #C9A84C;
    color: #0A1628;
    font-weight: 600;
    font-size: 15px;
    border-radius: 10px;
    border: none;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
    text-decoration: none;
    font-family: 'Inter', system-ui, sans-serif;
    white-space: nowrap;
  }
  .rg-btn-primary::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(255,255,255,0.35) 50%,
      transparent 100%
    );
    background-size: 200% 100%;
    opacity: 0;
    transition: opacity 0.2s;
    animation: rgShimmer 1.4s infinite;
  }
  .rg-btn-primary:hover {
    background: #E8C56A;
    transform: translateY(-1px);
    box-shadow: 0 8px 24px rgba(201,168,76,0.40);
  }
  .rg-btn-primary:hover::after { opacity: 1; }

  .rg-btn-secondary {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 14px 28px;
    background: transparent;
    color: #C9A84C;
    font-weight: 600;
    font-size: 15px;
    border-radius: 10px;
    border: 1px solid #C9A84C;
    cursor: pointer;
    transition: background 0.2s, transform 0.15s;
    text-decoration: none;
    font-family: 'Inter', system-ui, sans-serif;
    white-space: nowrap;
  }
  .rg-btn-secondary:hover {
    background: rgba(201,168,76,0.10);
    transform: translateY(-1px);
  }

  .rg-glass {
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-radius: 16px;
  }

  .rg-glass-input {
    width: 100%;
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.12);
    border-radius: 10px;
    padding: 12px 16px;
    color: #ffffff;
    font-size: 15px;
    font-family: 'Inter', system-ui, sans-serif;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  .rg-glass-input::placeholder { color: rgba(255,255,255,0.35); }
  .rg-glass-input:focus {
    border-color: rgba(201,168,76,0.6);
    box-shadow: 0 0 0 3px rgba(201,168,76,0.12);
  }
  .rg-glass-input option {
    background: #112240;
    color: #ffffff;
  }

  .rg-label {
    display: block;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.05em;
    color: rgba(255,255,255,0.55);
    margin-bottom: 6px;
    text-transform: uppercase;
  }
`

// ─── Colors ───────────────────────────────────────────────────────────────────

const C = {
  pageBg: '#0A1628',
  cardBg: '#112240',
  border: '#1A3358',
  gold: '#C9A84C',
  goldLight: '#E8C56A',
  goldMuted: '#8B6914',
  white: '#FFFFFF',
  muted: 'rgba(255,255,255,0.55)',
  red: '#E24B4A',
}

// ─── Scroll-triggered count-up hook ──────────────────────────────────────────

function useCountUp(target, duration = 1400) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true)
          observer.disconnect()
        }
      },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [started])

  useEffect(() => {
    if (!started || isNaN(target)) return
    let start = null
    const step = (ts) => {
      if (!start) start = ts
      const progress = Math.min((ts - start) / duration, 1)
      setCount(Math.floor(progress * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [started, target, duration])

  return { ref, count }
}

// ─── Stat Counter ─────────────────────────────────────────────────────────────

function StatCounter({ value, label, numeric }) {
  const { ref, count } = useCountUp(numeric ? parseInt(value) : 0, 1200)

  return (
    <div ref={ref} style={{ textAlign: 'center', flex: 1 }}>
      <div
        style={{
          fontFamily: 'Playfair Display, Georgia, serif',
          fontSize: '48px',
          fontWeight: 700,
          color: C.gold,
          lineHeight: 1,
          animation: 'rgCountUp 0.6s ease-out both',
        }}
      >
        {numeric ? count : value}
      </div>
      <div
        style={{
          fontFamily: 'Inter, system-ui, sans-serif',
          fontSize: '13px',
          color: C.muted,
          marginTop: '6px',
          fontWeight: 500,
        }}
      >
        {label}
      </div>
    </div>
  )
}

// ─── Section Label ────────────────────────────────────────────────────────────

function SectionLabel({ text }) {
  return (
    <p
      style={{
        fontFamily: 'Inter, system-ui, sans-serif',
        fontSize: '11px',
        fontWeight: 700,
        letterSpacing: '0.2em',
        color: C.gold,
        textTransform: 'uppercase',
        marginBottom: '16px',
      }}
    >
      {text}
    </p>
  )
}

// ─── Section Title ────────────────────────────────────────────────────────────

function SectionTitle({ children }) {
  return (
    <h2
      style={{
        fontFamily: 'Playfair Display, Georgia, serif',
        fontSize: 'clamp(28px, 4vw, 40px)',
        fontWeight: 700,
        color: C.white,
        lineHeight: 1.2,
        marginBottom: '48px',
      }}
    >
      {children}
    </h2>
  )
}

// ─── Scroll-reveal wrapper ────────────────────────────────────────────────────

function Reveal({ children, delay = 0, style = {} }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); observer.disconnect() }
      },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  )
}

// ─── SECTION 1: HERO ─────────────────────────────────────────────────────────

function HeroSection() {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      style={{
        minHeight: '100vh',
        background: C.pageBg,
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Animated gold glow top-right */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '-10%',
          right: '-5%',
          width: '60vw',
          height: '60vw',
          maxWidth: '700px',
          maxHeight: '700px',
          background: `radial-gradient(circle, ${C.gold} 0%, transparent 65%)`,
          animation: 'rgGlowPulse 6s ease-in-out infinite',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Custom Nav */}
      <nav
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '20px 40px',
          position: 'relative',
          zIndex: 10,
          maxWidth: '1280px',
          margin: '0 auto',
          width: '100%',
          boxSizing: 'border-box',
        }}
      >
        <span
          style={{
            fontFamily: 'Playfair Display, Georgia, serif',
            fontSize: '20px',
            fontWeight: 700,
            color: C.white,
            letterSpacing: '-0.01em',
          }}
        >
          Virtus Research Group
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <a
            href="#"
            style={{
              fontFamily: 'Inter, system-ui, sans-serif',
              fontSize: '14px',
              color: 'rgba(255,255,255,0.7)',
              textDecoration: 'none',
              fontWeight: 500,
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => (e.target.style.color = '#fff')}
            onMouseLeave={(e) => (e.target.style.color = 'rgba(255,255,255,0.7)')}
          >
            Login
          </a>
          <button
            onClick={() => scrollTo('apply')}
            className="rg-btn-primary"
            style={{ padding: '10px 20px', fontSize: '14px' }}
          >
            Get Early Access
          </button>
        </div>
      </nav>

      {/* Hero content */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '40px 24px 80px',
          position: 'relative',
          zIndex: 5,
        }}
      >
        <div style={{ maxWidth: '720px', width: '100%' }}>
          {/* Eyebrow badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 20px',
              background: 'rgba(201,168,76,0.12)',
              border: `1px solid rgba(201,168,76,0.3)`,
              borderRadius: '100px',
              marginBottom: '32px',
              animation: 'rgFadeUp 0.6s ease both',
            }}
          >
            <span
              style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                fontSize: '13px',
                fontWeight: 600,
                color: C.gold,
                letterSpacing: '0.03em',
              }}
            >
              South Florida · Miami-Dade · Broward · Palm Beach
            </span>
          </div>

          {/* Headline */}
          <h1
            style={{
              fontFamily: 'Playfair Display, Georgia, serif',
              fontSize: 'clamp(36px, 6vw, 64px)',
              fontWeight: 700,
              color: C.white,
              lineHeight: 1.1,
              marginBottom: '24px',
              animation: 'rgFadeUp 0.7s ease 0.1s both',
            }}
          >
            South Florida's Most Distressed Properties. Found First.
          </h1>

          {/* Subheadline */}
          <p
            style={{
              fontFamily: 'Inter, system-ui, sans-serif',
              fontSize: '18px',
              color: 'rgba(255,255,255,0.65)',
              lineHeight: 1.7,
              marginBottom: '40px',
              animation: 'rgFadeUp 0.7s ease 0.2s both',
            }}
          >
            Virtus Research Group aggregates foreclosures, bankruptcies, tax delinquencies,
            code violations, liens, probate filings, and MLS behavioral signals into a single
            scored deal feed — refreshed daily across all three South Florida counties.
          </p>

          {/* CTAs */}
          <div
            style={{
              display: 'flex',
              gap: '16px',
              justifyContent: 'center',
              flexWrap: 'wrap',
              marginBottom: '24px',
              animation: 'rgFadeUp 0.7s ease 0.3s both',
            }}
          >
            <button onClick={() => scrollTo('apply')} className="rg-btn-primary">
              Get Early Access →
            </button>
            <button onClick={() => scrollTo('how-it-works')} className="rg-btn-secondary">
              See How It Works
            </button>
          </div>

          {/* Trust line */}
          <p
            style={{
              fontFamily: 'Inter, system-ui, sans-serif',
              fontSize: '13px',
              color: C.muted,
              marginBottom: '72px',
              animation: 'rgFadeUp 0.7s ease 0.35s both',
            }}
          >
            Vetted members only. Currently accepting applications from wholesalers, investors,
            lenders, realtors, and real estate attorneys.
          </p>

          {/* Stat counters */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0',
              flexWrap: 'wrap',
              padding: '32px',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '16px',
              animation: 'rgFadeUp 0.7s ease 0.45s both',
            }}
          >
            <StatCounter value="3" label="Counties Covered" numeric />
            <div style={{ width: '1px', height: '48px', background: 'rgba(255,255,255,0.12)', margin: '0 24px', flexShrink: 0 }} />
            <StatCounter value="8" label="Distress Signal Types" numeric />
            <div style={{ width: '1px', height: '48px', background: 'rgba(255,255,255,0.12)', margin: '0 24px', flexShrink: 0 }} />
            <StatCounter value="Daily" label="Data Refresh" numeric={false} />
            <div style={{ width: '1px', height: '48px', background: 'rgba(255,255,255,0.12)', margin: '0 24px', flexShrink: 0 }} />
            <StatCounter value="1" label="Scored Deal Feed" numeric />
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── SECTION 2: THE PROBLEM ───────────────────────────────────────────────────

function ProblemSection() {
  return (
    <section
      style={{
        background: C.pageBg,
        padding: '100px 24px',
      }}
    >
      <div style={{ maxWidth: '760px', margin: '0 auto' }}>
        <Reveal>
          <div
            className="rg-glass"
            style={{ padding: '56px 48px' }}
          >
            <h2
              style={{
                fontFamily: 'Playfair Display, Georgia, serif',
                fontSize: 'clamp(28px, 4vw, 36px)',
                fontWeight: 700,
                color: C.white,
                lineHeight: 1.2,
                marginBottom: '32px',
              }}
            >
              Everyone is looking at the same MLS listings.
            </h2>

            <p style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '16px', color: 'rgba(255,255,255,0.75)', lineHeight: 1.8, marginBottom: '20px' }}>
              The public MLS shows you what has already been found. By the time a distressed property
              appears in an active listing, it has already been seen by every agent, wholesaler, and
              investor in your market.
            </p>
            <p style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '16px', color: 'rgba(255,255,255,0.75)', lineHeight: 1.8, marginBottom: '20px' }}>
              Real motivated sellers rarely list. They show up in bankruptcy courts, county clerk
              official records, code enforcement case files, IRS lien registries, and tax delinquency
              rolls — databases that most investors never check and most platforms never aggregate.
            </p>
            <p style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '16px', color: 'rgba(255,255,255,0.75)', lineHeight: 1.8, marginBottom: '40px' }}>
              Virtus Research Group was built to close that gap. We pull from the sources others
              ignore, score every property against a multi-signal distress model, and deliver the
              results to a vetted deal feed before the market has any idea the opportunity exists.
            </p>

            {/* Pull quote */}
            <blockquote
              style={{
                borderLeft: `3px solid ${C.gold}`,
                paddingLeft: '24px',
                margin: 0,
              }}
            >
              <p
                style={{
                  fontFamily: 'Playfair Display, Georgia, serif',
                  fontSize: '20px',
                  fontStyle: 'italic',
                  color: C.white,
                  lineHeight: 1.5,
                }}
              >
                "The deal is in the data most investors never look at."
              </p>
            </blockquote>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// ─── SECTION 3: HOW IT WORKS ──────────────────────────────────────────────────

function HowItWorksSection() {
  const steps = [
    {
      num: '01',
      title: "We pull from sources most investors can't access",
      body: 'BeachesMLS via Spark Platform. Miami-Dade ArcGIS property API. Palm Beach County bulk parcel exports. Broward County via BatchData enrichment. PACER federal court filings for the Southern District of Florida. Florida Sunbiz UCC registry. All three county clerk official records systems. Municipal code enforcement portals across Miami-Dade, Broward, and Palm Beach. IRS federal tax lien databases. All ingested into a single intelligence layer and refreshed daily.',
    },
    {
      num: '02',
      title: 'Every property receives a distress score from 1 to 10',
      body: 'Our scoring model weights equity position as the primary driver — a property must clear 40% equity to qualify. Layered on top are legal and financial distress signals including foreclosure filings, active bankruptcies, tax delinquency, IRS liens, judgment liens, and UCC filings. Property condition signals — code violations, unsafe structure orders, and failed permits — add further weight. Owner behavior signals including absentee ownership, vacancy, probate status, and multiple distressed holdings complete the picture. Properties with three or more simultaneous signals receive a stack multiplier that can push a borderline deal into priority territory.',
    },
    {
      num: '03',
      title: 'Hot deals reach your feed before the market knows',
      body: 'Properties scoring 8 to 10 are classified Hot — direct mail outreach triggers automatically via Lob, SMS notification goes to the owner via Twilio, and the property surfaces at the top of the investor deal feed immediately. Warm deals scoring 5 to 7 enter the feed and are flagged for manual review. The hotsheet refreshes every morning at 6am — before agents open their email.',
    },
  ]

  return (
    <section
      id="how-it-works"
      style={{
        background: '#080e1c',
        padding: '100px 24px',
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <Reveal>
          <SectionLabel text="THE PROCESS" />
          <SectionTitle>How Virtus Research Group Finds What Others Miss</SectionTitle>
        </Reveal>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
          }}
        >
          {steps.map((step, i) => (
            <Reveal key={step.num} delay={i * 0.12}>
              <div
                className="rg-glass"
                style={{
                  padding: '36px 32px',
                  height: '100%',
                  boxSizing: 'border-box',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '20px',
                }}
              >
                {/* Step number circle */}
                <div
                  style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: '50%',
                    border: `2px solid ${C.gold}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'Playfair Display, Georgia, serif',
                      fontSize: '18px',
                      fontWeight: 700,
                      color: C.gold,
                    }}
                  >
                    {step.num}
                  </span>
                </div>
                <h3
                  style={{
                    fontFamily: 'Playfair Display, Georgia, serif',
                    fontSize: '20px',
                    fontWeight: 700,
                    color: C.white,
                    lineHeight: 1.3,
                  }}
                >
                  {step.title}
                </h3>
                <p
                  style={{
                    fontFamily: 'Inter, system-ui, sans-serif',
                    fontSize: '14px',
                    color: 'rgba(255,255,255,0.65)',
                    lineHeight: 1.75,
                    flex: 1,
                  }}
                >
                  {step.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── SECTION 4: SIGNAL TYPES ─────────────────────────────────────────────────

function SignalTypesSection() {
  const signals = [
    { icon: '⚖️', name: 'Foreclosure / Lis Pendens', desc: 'Active filings pulled daily from all three county clerk official records systems', badge: 'County Clerk ORS' },
    { icon: '📄', name: 'Bankruptcy Filings', desc: 'Chapter 7, 11, and 13 cases from PACER Southern District of Florida', badge: 'Federal Court / PACER' },
    { icon: '⚠️', name: 'Tax Delinquency', desc: 'Two or more years delinquent from Miami-Dade, Broward, and Palm Beach tax collectors', badge: 'County Tax Collector' },
    { icon: '🛡️', name: 'Code Violations', desc: 'Open enforcement cases from county portals and municipal code enforcement systems', badge: 'Code Enforcement' },
    { icon: '🔗', name: 'IRS & Judgment Liens', desc: 'Federal tax liens and civil judgment liens cross-referenced by parcel ID', badge: 'IRS / Clerk ORS' },
    { icon: '💼', name: 'UCC Filings', desc: 'Owner-level UCC-1 financing statements from the Florida Sunbiz bulk registry', badge: 'Florida DOS / Sunbiz' },
    { icon: '👥', name: 'Probate & Divorce', desc: 'Estate proceedings and dissolution cases flagged and matched to parcel ownership', badge: 'County Probate Court' },
    { icon: '📉', name: 'MLS Behavioral Signals', desc: 'Days on market anomalies, price cut velocity, as-is remarks, and expired listing history', badge: 'BeachesMLS / Spark' },
  ]

  return (
    <section
      style={{
        background: C.pageBg,
        padding: '100px 24px',
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <Reveal style={{ textAlign: 'center', marginBottom: '0' }}>
          <SectionLabel text="INTELLIGENCE SOURCES" />
          <SectionTitle>Every Distress Signal. One Platform.</SectionTitle>
        </Reveal>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
            gap: '20px',
          }}
        >
          {signals.map((signal, i) => (
            <Reveal key={signal.name} delay={i * 0.07}>
              <div
                className="rg-glass"
                style={{
                  padding: '28px 24px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  height: '100%',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.2s, transform 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(201,168,76,0.3)'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                <div style={{ fontSize: '28px', lineHeight: 1 }}>{signal.icon}</div>
                <h3
                  style={{
                    fontFamily: 'Inter, system-ui, sans-serif',
                    fontSize: '15px',
                    fontWeight: 700,
                    color: C.white,
                    lineHeight: 1.3,
                  }}
                >
                  {signal.name}
                </h3>
                <p
                  style={{
                    fontFamily: 'Inter, system-ui, sans-serif',
                    fontSize: '13px',
                    color: 'rgba(255,255,255,0.60)',
                    lineHeight: 1.65,
                    flex: 1,
                  }}
                >
                  {signal.desc}
                </p>
                <div
                  style={{
                    display: 'inline-flex',
                    alignSelf: 'flex-start',
                    padding: '4px 10px',
                    background: 'rgba(201,168,76,0.10)',
                    border: '1px solid rgba(201,168,76,0.20)',
                    borderRadius: '6px',
                    fontFamily: 'Inter, system-ui, sans-serif',
                    fontSize: '11px',
                    fontWeight: 600,
                    color: C.gold,
                    letterSpacing: '0.02em',
                  }}
                >
                  {signal.badge}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── SECTION 5: WHO IT'S FOR ─────────────────────────────────────────────────

function WhoItsForSection() {
  const members = [
    {
      title: 'Wholesalers',
      desc: 'Get to motivated sellers before they list. Virtus Research Group surfaces pre-foreclosure, tax delinquent, and vacancy-confirmed properties in your target zip codes every morning — the majority of them will never appear on the MLS.',
      pill: 'Daily hotsheet by zip code',
    },
    {
      title: 'Capital Investors',
      desc: 'Make faster decisions with deeper data. Every deal on the Virtus feed is pre-scored with equity position, stacked distress signals, and source verification — so you underwrite faster, move quicker, and bid with confidence before the competition catches up.',
      pill: '1–10 distress score per property',
    },
    {
      title: 'Hard Money Lenders',
      desc: 'See the deal quality before the borrower calls you. Virtus gives lenders early visibility into the distressed property pipeline so you can pre-position capital and identify borrowers most likely to need bridge financing — before they start shopping.',
      pill: 'Signal-verified deal pipeline',
    },
    {
      title: 'Realtors',
      desc: 'List properties before they hit the market. Cross-reference your farm area against Virtus distress intelligence to identify owners who need to sell and reach them before another agent knocks on the door. MLS signals are cross-referenced against county distress data so you see the full picture.',
      pill: 'MLS + distress signal crosswalk',
    },
    {
      title: 'Real Estate Attorneys',
      desc: 'Early visibility into probate, foreclosure, and bankruptcy timelines gives you a referral advantage at the earliest possible stage. Identify prospective clients and estate situations before the case reaches the court calendar.',
      pill: 'Probate & bankruptcy monitoring',
    },
  ]

  return (
    <section
      style={{
        background: '#080e1c',
        padding: '100px 24px',
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <Reveal style={{ textAlign: 'center' }}>
          <SectionLabel text="MEMBERSHIP" />
          <SectionTitle>Built for the Professionals Who Move First</SectionTitle>
        </Reveal>

        {/* Top row: 3 cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '20px',
            marginBottom: '20px',
          }}
        >
          {members.slice(0, 3).map((m, i) => (
            <Reveal key={m.title} delay={i * 0.1}>
              <MemberCard member={m} />
            </Reveal>
          ))}
        </div>

        {/* Bottom row: 2 cards centered */}
        <div
          style={{
            display: 'flex',
            gap: '20px',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          {members.slice(3).map((m, i) => (
            <Reveal key={m.title} delay={(i + 3) * 0.1} style={{ flex: '1 1 300px', maxWidth: '420px' }}>
              <MemberCard member={m} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function MemberCard({ member }) {
  return (
    <div
      className="rg-glass"
      style={{
        padding: '32px 28px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        height: '100%',
        boxSizing: 'border-box',
        transition: 'border-color 0.2s, transform 0.2s',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'rgba(201,168,76,0.25)'
        e.currentTarget.style.transform = 'translateY(-3px)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
        e.currentTarget.style.transform = 'translateY(0)'
      }}
    >
      <h3
        style={{
          fontFamily: 'Playfair Display, Georgia, serif',
          fontSize: '22px',
          fontWeight: 700,
          color: C.white,
        }}
      >
        {member.title}
      </h3>
      <p
        style={{
          fontFamily: 'Inter, system-ui, sans-serif',
          fontSize: '14px',
          color: 'rgba(255,255,255,0.65)',
          lineHeight: 1.75,
          flex: 1,
        }}
      >
        {member.desc}
      </p>
      <div
        style={{
          display: 'inline-flex',
          alignSelf: 'flex-start',
          padding: '6px 14px',
          background: 'rgba(201,168,76,0.10)',
          border: '1px solid rgba(201,168,76,0.25)',
          borderRadius: '100px',
          fontFamily: 'Inter, system-ui, sans-serif',
          fontSize: '12px',
          fontWeight: 600,
          color: C.gold,
        }}
      >
        {member.pill}
      </div>
    </div>
  )
}

// ─── SECTION 6: THE SCORE ─────────────────────────────────────────────────────

function TheScoreSection() {
  const tiers = [
    { range: '8–10 · Hot', desc: 'Lob mailer + Twilio SMS triggered. Surfaces top of deal feed immediately.', color: C.gold },
    { range: '5–7 · Warm', desc: 'Added to deal feed. Flagged for manual review before outreach.', color: '#B89040' },
    { range: '1–4 · Cold', desc: 'Placed on watch list. No outreach triggered yet.', color: 'rgba(255,255,255,0.45)' },
    { range: 'DQ · Disqualified', desc: 'Equity below 40% threshold. Excluded from all deal feeds.', color: C.red },
  ]

  const signals = [
    { label: 'Lis Pendens', detail: '34 days', color: '#E24B4A' },
    { label: 'Ch13 Bankruptcy', detail: 'Active', color: '#E24B4A' },
    { label: 'Tax Delinquency', detail: '3 years', color: '#E24B4A' },
    { label: 'Code Violations', detail: '× 2', color: '#F59E0B' },
    { label: 'Absentee Owner', detail: 'Confirmed', color: '#F59E0B' },
  ]

  return (
    <section
      id="the-model"
      style={{
        background: C.pageBg,
        padding: '100px 24px',
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <Reveal style={{ textAlign: 'center' }}>
          <SectionLabel text="THE MODEL" />
          <SectionTitle>One Score. Every Signal. Zero Guesswork.</SectionTitle>
        </Reveal>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '40px',
            alignItems: 'start',
          }}
        >
          {/* Left column */}
          <Reveal delay={0.1}>
            <div>
              <p
                style={{
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontSize: '14px',
                  color: 'rgba(255,255,255,0.55)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  fontWeight: 600,
                  marginBottom: '24px',
                }}
              >
                How the distress score works
              </p>
              <p
                style={{
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontSize: '15px',
                  color: 'rgba(255,255,255,0.70)',
                  lineHeight: 1.7,
                  marginBottom: '32px',
                }}
              >
                Every property entering the Virtus pipeline receives a composite distress score
                from 1 to 10. Equity position is the primary qualifier. Signal stacking drives
                the final number. Three or more simultaneous signals trigger a multiplier.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {tiers.map((tier) => (
                  <div
                    key={tier.range}
                    className="rg-glass"
                    style={{
                      padding: '20px 24px',
                      borderLeft: `3px solid ${tier.color}`,
                      borderRadius: '12px',
                    }}
                  >
                    <div
                      style={{
                        fontFamily: 'Playfair Display, Georgia, serif',
                        fontSize: '18px',
                        fontWeight: 700,
                        color: tier.color,
                        marginBottom: '6px',
                      }}
                    >
                      {tier.range}
                    </div>
                    <div
                      style={{
                        fontFamily: 'Inter, system-ui, sans-serif',
                        fontSize: '13px',
                        color: 'rgba(255,255,255,0.60)',
                        lineHeight: 1.6,
                      }}
                    >
                      {tier.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Right column — mock property card */}
          <Reveal delay={0.2}>
            <div
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: `1px solid ${C.gold}`,
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                borderRadius: '16px',
                padding: '32px',
                maxWidth: '420px',
                margin: '0 auto',
              }}
            >
              {/* Address */}
              <div style={{ marginBottom: '20px' }}>
                <div
                  style={{
                    fontFamily: 'Playfair Display, Georgia, serif',
                    fontSize: '18px',
                    fontWeight: 700,
                    color: C.white,
                    marginBottom: '4px',
                  }}
                >
                  123 NW 14th Ave, Miami, FL 33125
                </div>
                <div
                  style={{
                    fontFamily: 'Inter, system-ui, sans-serif',
                    fontSize: '13px',
                    color: C.muted,
                  }}
                >
                  Single Family · 1,240 sq ft
                </div>
              </div>

              {/* Score */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  padding: '20px',
                  background: 'rgba(201,168,76,0.08)',
                  border: '1px solid rgba(201,168,76,0.20)',
                  borderRadius: '12px',
                  marginBottom: '24px',
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: 'Playfair Display, Georgia, serif',
                      fontSize: '56px',
                      fontWeight: 700,
                      color: C.gold,
                      lineHeight: 1,
                    }}
                  >
                    9.1
                  </div>
                  <div
                    style={{
                      fontFamily: 'Inter, system-ui, sans-serif',
                      fontSize: '11px',
                      color: C.muted,
                      letterSpacing: '0.05em',
                    }}
                  >
                    DISTRESS SCORE
                  </div>
                </div>
                <div
                  style={{
                    display: 'inline-flex',
                    padding: '6px 16px',
                    background: 'rgba(34,197,94,0.15)',
                    border: '1px solid rgba(34,197,94,0.30)',
                    borderRadius: '8px',
                    fontFamily: 'Inter, system-ui, sans-serif',
                    fontSize: '14px',
                    fontWeight: 700,
                    color: '#22C55E',
                    letterSpacing: '0.08em',
                  }}
                >
                  HOT
                </div>
              </div>

              {/* Signals */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
                {signals.map((sig) => (
                  <div
                    key={sig.label}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '10px 14px',
                      background: 'rgba(255,255,255,0.03)',
                      borderRadius: '8px',
                      border: '1px solid rgba(255,255,255,0.06)',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div
                        style={{
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          background: sig.color,
                          flexShrink: 0,
                        }}
                      />
                      <span
                        style={{
                          fontFamily: 'Inter, system-ui, sans-serif',
                          fontSize: '13px',
                          color: 'rgba(255,255,255,0.80)',
                        }}
                      >
                        {sig.label}
                      </span>
                    </div>
                    <span
                      style={{
                        fontFamily: 'Inter, system-ui, sans-serif',
                        fontSize: '12px',
                        fontWeight: 600,
                        color: sig.color,
                      }}
                    >
                      {sig.detail}
                    </span>
                  </div>
                ))}
              </div>

              {/* Equity */}
              <div
                style={{
                  padding: '14px',
                  background: 'rgba(201,168,76,0.06)',
                  borderRadius: '10px',
                  textAlign: 'center',
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontSize: '14px',
                  fontWeight: 600,
                  color: C.gold,
                }}
              >
                Equity: 67% · Est. Value: $385,000
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

// ─── SECTION 7: JACKIE AI ─────────────────────────────────────────────────────

function JackieAISection() {
  const features = [
    'Draft a Letter of Intent in under 60 seconds',
    'Analyze any property\'s full distress signal stack',
    'Query your deal feed in plain English',
  ]

  return (
    <section
      id="jackie-ai"
      style={{
        background: '#080e1c',
        padding: '100px 24px',
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '60px',
            alignItems: 'center',
          }}
        >
          {/* Left */}
          <Reveal delay={0.05}>
            <div>
              <SectionLabel text="AI-POWERED" />
              <h2
                style={{
                  fontFamily: 'Playfair Display, Georgia, serif',
                  fontSize: 'clamp(28px, 4vw, 40px)',
                  fontWeight: 700,
                  color: C.white,
                  lineHeight: 1.2,
                  marginBottom: '24px',
                }}
              >
                Meet Jackie — Your Virtus AI
              </h2>
              <p
                style={{
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontSize: '15px',
                  color: 'rgba(255,255,255,0.65)',
                  lineHeight: 1.75,
                  marginBottom: '32px',
                }}
              >
                Jackie is the AI intelligence layer built directly into Virtus Research Group.
                She reads every property in your feed, understands the full distress signal stack,
                and can take action on your behalf — drafting outreach, analyzing deals, and
                answering complex questions in plain English.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
                {features.map((f) => (
                  <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                    <div
                      style={{
                        width: '22px',
                        height: '22px',
                        borderRadius: '50%',
                        background: 'rgba(201,168,76,0.15)',
                        border: `1px solid ${C.gold}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        marginTop: '1px',
                      }}
                    >
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                        <path d="M1 4L3.5 6.5L9 1" stroke={C.gold} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <span
                      style={{
                        fontFamily: 'Inter, system-ui, sans-serif',
                        fontSize: '15px',
                        color: 'rgba(255,255,255,0.80)',
                        lineHeight: 1.5,
                      }}
                    >
                      {f}
                    </span>
                  </div>
                ))}
              </div>

              <p
                style={{
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontSize: '14px',
                  color: 'rgba(255,255,255,0.50)',
                  lineHeight: 1.75,
                }}
              >
                Jackie learns your preferences over time — she knows which zip codes you target,
                which deal types you prioritize, and which signals matter most to your strategy.
                The more you use her, the sharper she gets.
              </p>
            </div>
          </Reveal>

          {/* Right — Chat mockup */}
          <Reveal delay={0.15}>
            <div
              className="rg-glass"
              style={{
                maxWidth: '380px',
                margin: '0 auto',
                padding: '0',
                overflow: 'hidden',
                border: '1px solid rgba(201,168,76,0.20)',
              }}
            >
              {/* Chat header */}
              <div
                style={{
                  padding: '16px 20px',
                  borderBottom: '1px solid rgba(255,255,255,0.07)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  background: 'rgba(255,255,255,0.03)',
                }}
              >
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: `linear-gradient(135deg, ${C.gold}, #8B6914)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '16px',
                  }}
                >
                  ⚡
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: 'Inter, system-ui, sans-serif',
                      fontSize: '14px',
                      fontWeight: 700,
                      color: C.white,
                    }}
                  >
                    Jackie
                  </div>
                  <div
                    style={{
                      fontFamily: 'Inter, system-ui, sans-serif',
                      fontSize: '12px',
                      color: C.muted,
                    }}
                  >
                    Virtus AI
                  </div>
                </div>
                <div
                  style={{
                    marginLeft: 'auto',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <div
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: '#22C55E',
                      boxShadow: '0 0 6px rgba(34,197,94,0.6)',
                    }}
                  />
                  <span
                    style={{
                      fontFamily: 'Inter, system-ui, sans-serif',
                      fontSize: '11px',
                      color: '#22C55E',
                      fontWeight: 600,
                    }}
                  >
                    Online
                  </span>
                </div>
              </div>

              {/* Chat body */}
              <div style={{ padding: '20px', minHeight: '180px' }}>
                <div
                  style={{
                    background: 'rgba(201,168,76,0.10)',
                    border: '1px solid rgba(201,168,76,0.15)',
                    borderRadius: '12px 12px 12px 4px',
                    padding: '16px 18px',
                  }}
                >
                  <p
                    style={{
                      fontFamily: 'Inter, system-ui, sans-serif',
                      fontSize: '14px',
                      color: 'rgba(255,255,255,0.85)',
                      lineHeight: 1.7,
                      margin: 0,
                    }}
                  >
                    This property has a lis pendens filed 34 days ago, Chapter 13 bankruptcy
                    active, and 3 years of tax delinquency stacked. Two open code violations on
                    record with Miami-Dade. Equity position is 67%. Distress score: 9.1. Want
                    me to draft an LOI?
                  </p>
                </div>
              </div>

              {/* Input bar */}
              <div
                style={{
                  padding: '12px 16px',
                  borderTop: '1px solid rgba(255,255,255,0.07)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  background: 'rgba(255,255,255,0.02)',
                }}
              >
                <div
                  style={{
                    flex: 1,
                    padding: '10px 14px',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.10)',
                    borderRadius: '8px',
                    fontFamily: 'Inter, system-ui, sans-serif',
                    fontSize: '13px',
                    color: 'rgba(255,255,255,0.30)',
                  }}
                >
                  Ask Jackie anything...
                </div>
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    background: C.gold,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    cursor: 'default',
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M1 7H13M8 2L13 7L8 12" stroke="#0A1628" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

// ─── SECTION 8: EARLY ACCESS FORM ────────────────────────────────────────────

function EarlyAccessSection() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    role: '',
    company: '',
    message: '',
  })
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('')
  const [errors, setErrors] = useState({})

  const validate = () => {
    const e = {}
    if (!form.firstName.trim()) e.firstName = 'Required'
    if (!form.lastName.trim()) e.lastName = 'Required'
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required'
    if (!form.role) e.role = 'Required'
    return e
  }

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }))
    setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    setStatus('loading')
    setErrorMsg('')
    try {
      const res = await fetch('/api/research-apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          phone: form.phone,
          role: form.role,
          company: form.company,
          message: form.message,
        }),
      })
      const data = await res.json()
      if (!res.ok || data.error) throw new Error(data.error || 'Submission failed')
      setStatus('success')
    } catch (err) {
      setStatus('error')
      setErrorMsg(err.message || 'Something went wrong. Please try again.')
    }
  }

  const inputStyle = (field) => ({
    ...{},
    width: '100%',
    background: errors[field] ? 'rgba(226,75,74,0.08)' : 'rgba(255,255,255,0.06)',
    border: errors[field] ? '1px solid rgba(226,75,74,0.5)' : '1px solid rgba(255,255,255,0.12)',
    borderRadius: '10px',
    padding: '13px 16px',
    color: '#ffffff',
    fontSize: '15px',
    fontFamily: 'Inter, system-ui, sans-serif',
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s, box-shadow 0.2s',
  })

  return (
    <section
      id="apply"
      style={{
        background: C.pageBg,
        padding: '100px 24px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Gold glow */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '-20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '60vw',
          height: '60vw',
          maxWidth: '600px',
          maxHeight: '600px',
          background: `radial-gradient(circle, ${C.gold} 0%, transparent 65%)`,
          animation: 'rgGlowPulse2 8s ease-in-out infinite',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div style={{ maxWidth: '640px', margin: '0 auto', position: 'relative', zIndex: 5 }}>
        <Reveal style={{ textAlign: 'center', marginBottom: '48px' }}>
          <SectionLabel text="ACCESS" />
          <h2
            style={{
              fontFamily: 'Playfair Display, Georgia, serif',
              fontSize: 'clamp(32px, 5vw, 48px)',
              fontWeight: 700,
              color: C.white,
              lineHeight: 1.15,
              marginBottom: '20px',
            }}
          >
            Get Early Access
          </h2>
          <p
            style={{
              fontFamily: 'Inter, system-ui, sans-serif',
              fontSize: '16px',
              color: 'rgba(255,255,255,0.60)',
              lineHeight: 1.7,
            }}
          >
            Virtus Research Group is a vetted platform. We review every application to ensure
            the deal feed stays exclusive and the data stays actionable for serious professionals.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div
            className="rg-glass"
            style={{ padding: '48px 40px' }}
          >
            {status === 'success' ? (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <div
                  style={{
                    width: '72px',
                    height: '72px',
                    borderRadius: '50%',
                    background: 'rgba(34,197,94,0.12)',
                    border: '2px solid rgba(34,197,94,0.40)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 24px',
                  }}
                >
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <path d="M6 16L12.5 22.5L26 9" stroke="#22C55E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3
                  style={{
                    fontFamily: 'Playfair Display, Georgia, serif',
                    fontSize: '24px',
                    fontWeight: 700,
                    color: C.white,
                    marginBottom: '12px',
                  }}
                >
                  Application Received
                </h3>
                <p
                  style={{
                    fontFamily: 'Inter, system-ui, sans-serif',
                    fontSize: '15px',
                    color: 'rgba(255,255,255,0.65)',
                  }}
                >
                  We'll be in touch within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '16px',
                    marginBottom: '16px',
                  }}
                >
                  <div>
                    <label className="rg-label">First Name *</label>
                    <input
                      type="text"
                      value={form.firstName}
                      onChange={handleChange('firstName')}
                      placeholder="Nicolas"
                      style={inputStyle('firstName')}
                      onFocus={(e) => { e.target.style.borderColor = 'rgba(201,168,76,0.6)'; e.target.style.boxShadow = '0 0 0 3px rgba(201,168,76,0.12)' }}
                      onBlur={(e) => { e.target.style.borderColor = errors.firstName ? 'rgba(226,75,74,0.5)' : 'rgba(255,255,255,0.12)'; e.target.style.boxShadow = 'none' }}
                    />
                    {errors.firstName && <p style={{ fontFamily: 'Inter', fontSize: '12px', color: C.red, marginTop: '4px' }}>{errors.firstName}</p>}
                  </div>
                  <div>
                    <label className="rg-label">Last Name *</label>
                    <input
                      type="text"
                      value={form.lastName}
                      onChange={handleChange('lastName')}
                      placeholder="Gonzalez"
                      style={inputStyle('lastName')}
                      onFocus={(e) => { e.target.style.borderColor = 'rgba(201,168,76,0.6)'; e.target.style.boxShadow = '0 0 0 3px rgba(201,168,76,0.12)' }}
                      onBlur={(e) => { e.target.style.borderColor = errors.lastName ? 'rgba(226,75,74,0.5)' : 'rgba(255,255,255,0.12)'; e.target.style.boxShadow = 'none' }}
                    />
                    {errors.lastName && <p style={{ fontFamily: 'Inter', fontSize: '12px', color: C.red, marginTop: '4px' }}>{errors.lastName}</p>}
                  </div>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label className="rg-label">Email Address *</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={handleChange('email')}
                    placeholder="you@example.com"
                    style={inputStyle('email')}
                    onFocus={(e) => { e.target.style.borderColor = 'rgba(201,168,76,0.6)'; e.target.style.boxShadow = '0 0 0 3px rgba(201,168,76,0.12)' }}
                    onBlur={(e) => { e.target.style.borderColor = errors.email ? 'rgba(226,75,74,0.5)' : 'rgba(255,255,255,0.12)'; e.target.style.boxShadow = 'none' }}
                  />
                  {errors.email && <p style={{ fontFamily: 'Inter', fontSize: '12px', color: C.red, marginTop: '4px' }}>{errors.email}</p>}
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label className="rg-label">Phone (optional)</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={handleChange('phone')}
                    placeholder="+1 (954) 600-4976"
                    style={inputStyle('phone')}
                    onFocus={(e) => { e.target.style.borderColor = 'rgba(201,168,76,0.6)'; e.target.style.boxShadow = '0 0 0 3px rgba(201,168,76,0.12)' }}
                    onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.12)'; e.target.style.boxShadow = 'none' }}
                  />
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label className="rg-label">Your Role *</label>
                  <select
                    value={form.role}
                    onChange={handleChange('role')}
                    style={{ ...inputStyle('role'), cursor: 'pointer' }}
                    onFocus={(e) => { e.target.style.borderColor = 'rgba(201,168,76,0.6)'; e.target.style.boxShadow = '0 0 0 3px rgba(201,168,76,0.12)' }}
                    onBlur={(e) => { e.target.style.borderColor = errors.role ? 'rgba(226,75,74,0.5)' : 'rgba(255,255,255,0.12)'; e.target.style.boxShadow = 'none' }}
                  >
                    <option value="" disabled>Select your role...</option>
                    <option value="Wholesaler">Wholesaler</option>
                    <option value="Capital Investor">Capital Investor</option>
                    <option value="Hard Money Lender">Hard Money Lender</option>
                    <option value="Realtor">Realtor</option>
                    <option value="Real Estate Attorney">Real Estate Attorney</option>
                  </select>
                  {errors.role && <p style={{ fontFamily: 'Inter', fontSize: '12px', color: C.red, marginTop: '4px' }}>{errors.role}</p>}
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label className="rg-label">Company Name (optional)</label>
                  <input
                    type="text"
                    value={form.company}
                    onChange={handleChange('company')}
                    placeholder="Virtus Realty Group"
                    style={inputStyle('company')}
                    onFocus={(e) => { e.target.style.borderColor = 'rgba(201,168,76,0.6)'; e.target.style.boxShadow = '0 0 0 3px rgba(201,168,76,0.12)' }}
                    onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.12)'; e.target.style.boxShadow = 'none' }}
                  />
                </div>

                <div style={{ marginBottom: '32px' }}>
                  <label className="rg-label">Message / Notes (optional)</label>
                  <textarea
                    value={form.message}
                    onChange={handleChange('message')}
                    placeholder="Tell us about your investment focus, target areas, or how you heard about Virtus Research Group..."
                    rows={4}
                    style={{ ...inputStyle('message'), resize: 'vertical' }}
                    onFocus={(e) => { e.target.style.borderColor = 'rgba(201,168,76,0.6)'; e.target.style.boxShadow = '0 0 0 3px rgba(201,168,76,0.12)' }}
                    onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.12)'; e.target.style.boxShadow = 'none' }}
                  />
                </div>

                {status === 'error' && (
                  <div
                    style={{
                      padding: '12px 16px',
                      background: 'rgba(226,75,74,0.10)',
                      border: '1px solid rgba(226,75,74,0.30)',
                      borderRadius: '10px',
                      fontFamily: 'Inter, system-ui, sans-serif',
                      fontSize: '14px',
                      color: '#FF7875',
                      marginBottom: '20px',
                    }}
                  >
                    {errorMsg}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="rg-btn-primary"
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    padding: '16px',
                    fontSize: '16px',
                    opacity: status === 'loading' ? 0.8 : 1,
                    cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                  }}
                >
                  {status === 'loading' ? (
                    <>
                      <span
                        style={{
                          display: 'inline-block',
                          width: '16px',
                          height: '16px',
                          border: '2px solid rgba(10,22,40,0.3)',
                          borderTopColor: '#0A1628',
                          borderRadius: '50%',
                          animation: 'rgSpin 0.7s linear infinite',
                        }}
                      />
                      Submitting...
                    </>
                  ) : (
                    'Apply for Access →'
                  )}
                </button>

                {/* Trust signals */}
                <p
                  style={{
                    fontFamily: 'Inter, system-ui, sans-serif',
                    fontSize: '12px',
                    color: 'rgba(255,255,255,0.35)',
                    textAlign: 'center',
                    marginTop: '20px',
                    lineHeight: 1.6,
                  }}
                >
                  No MLS subscription required · All three South Florida counties · New deals added every morning at 6am
                </p>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// ─── SECTION 9: FOOTER ────────────────────────────────────────────────────────

function ResearchFooter() {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer
      style={{
        background: '#06101e',
        borderTop: `1px solid ${C.border}`,
        padding: '60px 24px 32px',
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '40px',
            marginBottom: '48px',
          }}
        >
          {/* Left */}
          <div>
            <div
              style={{
                fontFamily: 'Playfair Display, Georgia, serif',
                fontSize: '18px',
                fontWeight: 700,
                color: C.white,
                marginBottom: '8px',
              }}
            >
              Virtus Research Group
            </div>
            <div
              style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                fontSize: '14px',
                color: C.muted,
                marginBottom: '4px',
              }}
            >
              South Florida Distressed Property Intelligence
            </div>
            <div
              style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                fontSize: '13px',
                color: 'rgba(255,255,255,0.35)',
              }}
            >
              Hollywood, FL · Broward County
            </div>
          </div>

          {/* Center */}
          <div>
            <div
              style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.15em',
                color: C.muted,
                textTransform: 'uppercase',
                marginBottom: '16px',
              }}
            >
              Navigation
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { label: 'How It Works', id: 'how-it-works' },
                { label: 'Apply', id: 'apply' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    fontFamily: 'Inter, system-ui, sans-serif',
                    fontSize: '14px',
                    color: 'rgba(255,255,255,0.60)',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={(e) => (e.target.style.color = C.gold)}
                  onMouseLeave={(e) => (e.target.style.color = 'rgba(255,255,255,0.60)')}
                >
                  {item.label}
                </button>
              ))}
              <a
                href="#"
                style={{
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontSize: '14px',
                  color: 'rgba(255,255,255,0.60)',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => (e.target.style.color = C.gold)}
                onMouseLeave={(e) => (e.target.style.color = 'rgba(255,255,255,0.60)')}
              >
                Login
              </a>
            </div>
          </div>

          {/* Right */}
          <div>
            <div
              style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.15em',
                color: C.muted,
                textTransform: 'uppercase',
                marginBottom: '16px',
              }}
            >
              Parent Company
            </div>
            <div
              style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                fontSize: '14px',
                fontWeight: 600,
                color: 'rgba(255,255,255,0.70)',
                marginBottom: '4px',
              }}
            >
              Virtus Realty Group
            </div>
            <div
              style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                fontSize: '13px',
                color: 'rgba(255,255,255,0.40)',
                marginBottom: '4px',
              }}
            >
              Licensed Florida Real Estate Brokerage
            </div>
            <div
              style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                fontSize: '13px',
                color: 'rgba(255,255,255,0.40)',
              }}
            >
              Active NAR Member
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: '1px solid rgba(255,255,255,0.07)',
            paddingTop: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <p
            style={{
              fontFamily: 'Inter, system-ui, sans-serif',
              fontSize: '13px',
              color: 'rgba(255,255,255,0.30)',
              margin: 0,
            }}
          >
            © 2026 Virtus Research Group. All rights reserved.
          </p>
          <a
            href="https://virtusrealtygroup.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: 'Inter, system-ui, sans-serif',
              fontSize: '13px',
              color: 'rgba(255,255,255,0.40)',
              textDecoration: 'none',
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => (e.target.style.color = C.gold)}
            onMouseLeave={(e) => (e.target.style.color = 'rgba(255,255,255,0.40)')}
          >
            virtusrealtygroup.com
          </a>
        </div>
      </div>
    </footer>
  )
}

// ─── MAIN PAGE COMPONENT ──────────────────────────────────────────────────────

export default function ResearchGroup() {
  // Inject global styles
  useEffect(() => {
    const id = 'rg-styles'
    if (!document.getElementById(id)) {
      const style = document.createElement('style')
      style.id = id
      style.textContent = globalStyles
      document.head.appendChild(style)
    }
    return () => {
      // Leave styles if navigating within research page (SPA)
    }
  }, [])

  // SEO Meta Tags
  useEffect(() => {
    document.title = 'Virtus Research Group | Distressed Property Intelligence & REO Analytics'
    const meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute('content', 'Premium distressed property intelligence — bank foreclosure data, REO analytics, market research, and investment opportunity identification across the Dominican Republic and South Florida.')
    // OG tags
    const ogTitle = document.querySelector('meta[property="og:title"]')
    if (ogTitle) ogTitle.setAttribute('content', 'Virtus Research Group | Distressed Property Intelligence & REO Analytics')
    const ogDesc = document.querySelector('meta[property="og:description"]')
    if (ogDesc) ogDesc.setAttribute('content', 'Premium distressed property intelligence — bank foreclosure data, REO analytics, market research, and investment opportunity identification across the Dominican Republic and South Florida.')
    const ogUrl = document.querySelector('meta[property="og:url"]')
    if (ogUrl) ogUrl.setAttribute('content', 'https://virtusrealtygroup.com/research')
  }, [])

  return (
    <div
      style={{
        background: C.pageBg,
        minHeight: '100vh',
        color: C.white,
      }}
    >
      <HeroSection />
      <ProblemSection />
      <HowItWorksSection />
      <SignalTypesSection />
      <WhoItsForSection />
      <TheScoreSection />
      <JackieAISection />
      <EarlyAccessSection />
      <ResearchFooter />
    </div>
  )
}
