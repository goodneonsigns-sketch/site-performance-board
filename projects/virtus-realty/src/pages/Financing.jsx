import React, { useState, useEffect, useRef } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

/* ─────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────────*/

function formatCurrency(value) {
  if (!value && value !== 0) return ''
  return Number(value).toLocaleString('en-US')
}

function parseCurrency(str) {
  if (!str && str !== 0) return ''
  return str.toString().replace(/[^0-9]/g, '')
}

/* ─────────────────────────────────────────────
   LENDER ROUTING LOGIC
───────────────────────────────────────────────*/
function routeLender(data) {
  const ltv = data.property.purchase_price / data.property.arv
  const ltarv = (data.property.purchase_price + data.property.rehab_budget) / data.property.arv

  let tier = ''
  let reason = ''
  let notes = []

  if (ltv > 0.85) {
    tier = 'Hard Money'
    reason = 'High leverage deal (LTV above 85%) — hard money is the most flexible option.'
  } else if (data.deal.exit_strategy === 'fix_flip' || data.deal.close_timeline === 'under_2_weeks') {
    tier = 'Hard Money'
    reason = 'Fast close timeline or fix & flip strategy — hard money lenders like Kiavi and RCN Capital specialize in this.'
  } else if (data.deal.exit_strategy === 'buy_hold' && data.property.rehab_budget === 0) {
    tier = 'DSCR'
    reason = 'Stabilized buy & hold with no rehab — DSCR loan is ideal (Visio, Kiavi Rental).'
  } else if (
    data.deal.exit_strategy === 'buy_hold' &&
    ['680-719', '720+'].includes(data.borrower.credit_score_range)
  ) {
    tier = 'DSCR'
    reason = 'Buy & hold with strong credit — DSCR lenders like Visio and Kiavi Rental offer competitive rates.'
  } else if (data.deal.exit_strategy === 'buy_hold') {
    tier = 'Hard Money Bridge → DSCR Refi'
    reason = 'Buy & hold with credit below 680 — start with a hard money bridge loan, then refinance to DSCR after stabilization.'
  } else {
    tier = 'Hard Money'
    reason = 'Based on your deal profile, hard money provides the most flexibility to close quickly.'
  }

  if (data.borrower.experience === '0') {
    notes.push('First-time investor — lender may require larger down payment or co-borrower.')
  }

  return {
    tier,
    reason,
    notes,
    ltv: Math.round(ltv * 1000) / 10,
    ltarv: Math.round(ltarv * 1000) / 10,
  }
}

/* ─────────────────────────────────────────────
   FLOATING PARTICLES
───────────────────────────────────────────────*/
function FloatingParticles() {
  const particles = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    size: 2 + Math.random() * 4,
    x: Math.random() * 100,
    delay: Math.random() * 6,
    duration: 6 + Math.random() * 8,
    opacity: 0.2 + Math.random() * 0.5,
  }))

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            bottom: '-10px',
            background: `rgba(212,188,126,${p.opacity})`,
            animation: `floatUp ${p.duration}s ${p.delay}s ease-in infinite`,
            boxShadow: `0 0 ${p.size * 2}px rgba(212,188,126,0.6)`,
          }}
        />
      ))}
    </div>
  )
}

/* ─────────────────────────────────────────────
   DEAL CALCULATOR PREVIEW
───────────────────────────────────────────────*/
function DealCalculatorPreview() {
  return (
    <div
      className="relative rounded-2xl overflow-hidden mb-8"
      style={{
        background: 'linear-gradient(135deg, rgba(20,30,49,0.95) 0%, rgba(26,37,63,0.95) 100%)',
        border: '1px solid rgba(180,151,80,0.35)',
        backdropFilter: 'blur(12px)',
      }}
    >
      {/* Gold top accent */}
      <div className="absolute top-0 left-0 right-0 h-0.5"
        style={{ background: 'linear-gradient(90deg, transparent, #b49750, #d4bc7e, #b49750, transparent)' }} />

      <div className="p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-2xl">🏠</span>
          <h3 className="font-display text-white font-bold text-lg">How Investment Financing Works</h3>
        </div>

        {/* Deal flow */}
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-0 mb-6">
          {[
            { label: 'Buy', value: '$350K', icon: '🏚️', color: '#60a5fa' },
            null,
            { label: 'Rehab', value: '+$50K', icon: '🔨', color: '#fbbf24' },
            null,
            { label: 'Sell', value: '$450K', icon: '🏡', color: '#34d399' },
          ].map((item, i) =>
            item === null ? (
              <div key={i} className="hidden sm:flex items-center">
                <div className="h-0.5 w-8" style={{ background: 'linear-gradient(90deg, #b49750, #d4bc7e)' }} />
                <span className="text-xs font-bold" style={{ color: '#d4bc7e' }}>→</span>
              </div>
            ) : (
              <div key={i} className="flex-1 text-center sm:text-left">
                <div
                  className="inline-flex flex-col items-center sm:items-start px-4 py-3 rounded-xl w-full sm:w-auto"
                  style={{ background: 'rgba(255,255,255,0.06)', border: `1px solid ${item.color}30` }}
                >
                  <span className="text-xl mb-1">{item.icon}</span>
                  <span className="text-xs font-medium text-white/50 uppercase tracking-wide">{item.label}</span>
                  <span className="text-lg font-bold" style={{ color: item.color }}>{item.value}</span>
                </div>
              </div>
            )
          )}
        </div>

        {/* Divider */}
        <div className="h-px mb-5" style={{ background: 'linear-gradient(90deg, transparent, rgba(180,151,80,0.4), transparent)' }} />

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-5">
          <div>
            <p className="text-white/50 text-xs uppercase tracking-wide mb-1">Your Investment</p>
            <p className="text-white font-bold text-lg">$80K <span className="text-white/40 font-normal text-sm">(20% down + rehab)</span></p>
          </div>
          <div>
            <p className="text-white/50 text-xs uppercase tracking-wide mb-1">Potential Profit</p>
            <p className="font-bold text-lg" style={{ color: '#34d399' }}>$50K+ 💰</p>
          </div>
        </div>

        <div
          className="rounded-xl px-4 py-3 flex items-center gap-3"
          style={{ background: 'rgba(180,151,80,0.12)', border: '1px solid rgba(180,151,80,0.25)' }}
        >
          <span className="text-xl">⚡</span>
          <p className="text-sm" style={{ color: '#d4bc7e' }}>
            <strong>We match you with the right lender in minutes, not days.</strong> Fill out the form below to get started.
          </p>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   SOCIAL PROOF STRIP
───────────────────────────────────────────────*/
function SocialProofStrip() {
  const lenders = ['Kiavi', 'RCN Capital', 'Visio Lending', 'Lima One', 'Velocity']
  return (
    <div
      className="py-4 px-6 mb-8 rounded-2xl flex flex-col sm:flex-row items-center gap-4 sm:gap-6"
      style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(180,151,80,0.18)',
        backdropFilter: 'blur(8px)',
      }}
    >
      <p className="text-white/60 text-sm font-medium whitespace-nowrap">
        🤝 Trusted by <span className="text-white font-bold">500+</span> South Florida Investors
      </p>
      <div className="hidden sm:block h-4 w-px bg-white/20" />
      <div className="flex flex-wrap justify-center gap-2">
        {lenders.map((l) => (
          <span
            key={l}
            className="px-3 py-1 rounded-full text-xs font-semibold"
            style={{
              background: 'rgba(180,151,80,0.15)',
              color: '#d4bc7e',
              border: '1px solid rgba(180,151,80,0.25)',
            }}
          >
            {l}
          </span>
        ))}
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   PROGRESS INDICATOR
───────────────────────────────────────────────*/
function ProgressIndicator({ sections }) {
  return (
    <div className="flex items-center justify-between mb-8 px-2">
      {sections.map((section, i) => (
        <React.Fragment key={section.id}>
          <div className="flex flex-col items-center gap-1.5">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-500"
              style={
                section.complete
                  ? {
                      background: 'linear-gradient(135deg, #b49750, #d4bc7e)',
                      color: '#0e1524',
                      boxShadow: '0 0 16px rgba(180,151,80,0.5)',
                    }
                  : {
                      background: 'rgba(255,255,255,0.08)',
                      color: 'rgba(255,255,255,0.4)',
                      border: '1.5px solid rgba(255,255,255,0.15)',
                    }
              }
            >
              {section.complete ? '✓' : section.num}
            </div>
            <span
              className="text-xs font-medium hidden sm:block transition-colors duration-300"
              style={{ color: section.complete ? '#d4bc7e' : 'rgba(255,255,255,0.35)' }}
            >
              {section.label}
            </span>
          </div>
          {i < sections.length - 1 && (
            <div
              className="flex-1 h-0.5 mx-2 rounded-full transition-all duration-500"
              style={{
                background: section.complete
                  ? 'linear-gradient(90deg, #b49750, #d4bc7e)'
                  : 'rgba(255,255,255,0.1)',
              }}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  )
}

/* ─────────────────────────────────────────────
   PILL BUTTON COMPONENT
───────────────────────────────────────────────*/
function PillGroup({ options, value, onChange, name, error }) {
  return (
    <div>
      <div className="flex flex-wrap gap-2 mt-1">
        {options.map((opt) => {
          const isActive = value === opt.value
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange(name, opt.value)}
              className={`financing-pill ${isActive ? 'financing-pill-active' : 'financing-pill-inactive'}`}
            >
              {opt.label}
            </button>
          )
        })}
      </div>
      {error && <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1"><span>⚠</span>{error}</p>}
    </div>
  )
}

/* ─────────────────────────────────────────────
   CURRENCY INPUT COMPONENT
───────────────────────────────────────────────*/
function CurrencyInput({ name, value, onChange, placeholder, error }) {
  const [display, setDisplay] = useState(value !== '' ? formatCurrency(value) : '')
  const [focused, setFocused] = useState(false)

  useEffect(() => {
    if (value === '' || value === null || value === undefined) {
      setDisplay('')
    } else {
      setDisplay(formatCurrency(value))
    }
  }, [value])

  const handleChange = (e) => {
    const raw = parseCurrency(e.target.value)
    setDisplay(raw === '' ? '' : formatCurrency(raw))
    onChange(name, raw === '' ? '' : Number(raw))
  }

  return (
    <div>
      <div
        className="relative rounded-xl overflow-hidden transition-all duration-200"
        style={
          focused && !error
            ? { boxShadow: '0 0 0 2px #b49750, 0 4px 16px rgba(180,151,80,0.15)' }
            : error
            ? { boxShadow: '0 0 0 2px rgba(248,113,113,0.6)' }
            : { boxShadow: '0 0 0 1px rgba(255,255,255,0.1)' }
        }
      >
        <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold select-none text-lg"
          style={{ color: focused ? '#b49750' : '#6b7280' }}>$</span>
        <input
          type="text"
          inputMode="numeric"
          value={display}
          onChange={handleChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder || '0'}
          className="w-full pl-9 pr-4 py-3.5 bg-white/8 text-white text-xl font-bold focus:outline-none transition-all placeholder-white/25"
          style={{
            background: focused ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.06)',
            borderBottom: focused ? '2px solid #b49750' : '2px solid transparent',
          }}
        />
      </div>
      {error && <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1"><span>⚠</span>{error}</p>}
    </div>
  )
}

/* ─────────────────────────────────────────────
   SSN LAST 4 INPUT
───────────────────────────────────────────────*/
function SSNInput({ value, onChange, error }) {
  const [focused, setFocused] = useState(false)
  const inputRef = useRef(null)

  const handleChange = (e) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 4)
    onChange('ssn_last4', raw)
  }

  return (
    <div>
      <div
        className="relative rounded-xl overflow-hidden transition-all duration-200"
        style={
          focused && !error
            ? { boxShadow: '0 0 0 2px #b49750, 0 4px 16px rgba(180,151,80,0.15)' }
            : error
            ? { boxShadow: '0 0 0 2px rgba(248,113,113,0.6)' }
            : { boxShadow: '0 0 0 1px rgba(255,255,255,0.1)' }
        }
      >
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg select-none">🔒</span>
        <input
          ref={inputRef}
          type="password"
          inputMode="numeric"
          maxLength={4}
          value={value}
          onChange={handleChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="••••"
          className="w-full pl-11 pr-4 py-3.5 text-white text-xl font-bold tracking-[0.35em] focus:outline-none transition-all placeholder-white/25"
          style={{
            background: focused ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.06)',
            borderBottom: focused ? '2px solid #b49750' : '2px solid transparent',
          }}
        />
        {value.length > 0 && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-1">
            {Array.from({ length: 4 }, (_, i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full transition-all duration-200"
                style={{ background: i < value.length ? '#b49750' : 'rgba(255,255,255,0.2)' }}
              />
            ))}
          </div>
        )}
      </div>
      <p className="text-xs mt-2 flex items-center gap-1.5" style={{ color: 'rgba(255,255,255,0.4)' }}>
        <span>🔒</span>
        <span>Used for identity verification only. Your full SSN is never collected.</span>
      </p>
      {error && <p className="text-red-400 text-xs mt-1 flex items-center gap-1"><span>⚠</span>{error}</p>}
    </div>
  )
}

/* ─────────────────────────────────────────────
   TEXT INPUT COMPONENT (dark glassmorphism)
───────────────────────────────────────────────*/
function GlassInput({ type = 'text', name, value, onChange, placeholder, error, inputMode }) {
  const [focused, setFocused] = useState(false)
  return (
    <div>
      <div
        className="relative rounded-xl overflow-hidden transition-all duration-200"
        style={
          focused && !error
            ? { boxShadow: '0 0 0 2px #b49750, 0 4px 16px rgba(180,151,80,0.15)' }
            : error
            ? { boxShadow: '0 0 0 2px rgba(248,113,113,0.6)' }
            : { boxShadow: '0 0 0 1px rgba(255,255,255,0.1)' }
        }
      >
        <input
          type={type}
          name={name}
          inputMode={inputMode}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          className="w-full px-4 py-3.5 text-white text-sm font-medium focus:outline-none transition-all placeholder-white/25"
          style={{
            background: focused ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.06)',
            borderBottom: focused ? '2px solid #b49750' : '2px solid transparent',
          }}
        />
      </div>
      {error && <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1"><span>⚠</span>{error}</p>}
    </div>
  )
}

/* ─────────────────────────────────────────────
   LTV METER
───────────────────────────────────────────────*/
function LTVMeter({ ltv, label }) {
  const clampedLtv = Math.min(ltv, 100)
  const color = ltv <= 65 ? '#34d399' : ltv <= 80 ? '#fbbf24' : '#f87171'
  const zone = ltv <= 65 ? 'Conservative' : ltv <= 80 ? 'Moderate' : 'High Leverage'

  return (
    <div>
      <div className="flex justify-between items-baseline mb-2">
        <span className="text-xs font-semibold uppercase tracking-wide text-white/50">{label}</span>
        <span className="font-bold text-xl" style={{ color }}>{ltv}%</span>
      </div>
      <div className="h-3 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.1)' }}>
        <div
          className="h-full rounded-full transition-all duration-1000"
          style={{
            width: `${clampedLtv}%`,
            background: `linear-gradient(90deg, #34d399 0%, #fbbf24 60%, #f87171 100%)`,
            clipPath: `inset(0 ${100 - clampedLtv}% 0 0 round 9999px)`,
          }}
        />
      </div>
      <div className="flex justify-between text-xs mt-1 text-white/30">
        <span>0%</span>
        <span style={{ color }}>{zone}</span>
        <span>100%</span>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   SPARKLE ANIMATION
───────────────────────────────────────────────*/
function SparkleRing() {
  const sparks = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    angle: (i / 12) * 360,
    delay: i * 0.05,
    size: 4 + Math.random() * 4,
  }))

  return (
    <div className="relative w-24 h-24 mx-auto mb-6">
      <div
        className="absolute inset-0 rounded-full flex items-center justify-center"
        style={{
          background: 'linear-gradient(135deg, #b49750 0%, #d4bc7e 100%)',
          boxShadow: '0 0 40px rgba(180,151,80,0.6), 0 0 80px rgba(180,151,80,0.3)',
          animation: 'sparkleGlow 2s ease-in-out infinite',
        }}
      >
        <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
      </div>
      {sparks.map((s) => (
        <div
          key={s.id}
          className="absolute rounded-full"
          style={{
            width: s.size,
            height: s.size,
            background: '#d4bc7e',
            top: '50%',
            left: '50%',
            transform: `rotate(${s.angle}deg) translateX(44px) translateY(-50%)`,
            animation: `sparkleOut 1.2s ${s.delay}s ease-out forwards`,
            boxShadow: '0 0 6px #d4bc7e',
          }}
        />
      ))}
    </div>
  )
}

/* ─────────────────────────────────────────────
   CONFIRMATION CARD
───────────────────────────────────────────────*/
function ConfirmationCard({ result, borrowerName, onReset }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100)
    return () => clearTimeout(t)
  }, [])

  const tierIcons = {
    'DSCR': '🏦',
    'Hard Money': '⚡',
    'Hard Money Bridge → DSCR Refi': '🔁',
  }

  return (
    <div
      className="max-w-2xl mx-auto transition-all duration-700"
      style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(24px)' }}
    >
      {/* Celebration header */}
      <div className="text-center mb-8">
        <SparkleRing />
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-3" style={{ textShadow: '0 0 40px rgba(180,151,80,0.3)' }}>
          🎉 Pre-Qualification Submitted!
        </h2>
        <p className="text-white/60 text-lg">
          {borrowerName ? `Amazing work, ${borrowerName.split(' ')[0]}!` : 'Amazing work!'} Here's your lender match.
        </p>
      </div>

      {/* Main result card */}
      <div
        className="rounded-3xl p-8 text-white mb-6 relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #141e31 0%, #1a253f 60%, #0e1524 100%)',
          border: '1px solid rgba(180,151,80,0.3)',
          boxShadow: '0 24px 64px rgba(0,0,0,0.4), 0 0 0 1px rgba(180,151,80,0.1)',
        }}
      >
        {/* Animated shimmer overlay */}
        <div
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            background: 'linear-gradient(105deg, transparent 30%, rgba(212,188,126,0.5) 50%, transparent 70%)',
            backgroundSize: '200% 100%',
            animation: 'goldShimmer 3s ease-in-out infinite',
          }}
        />
        {/* Gold top line */}
        <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-3xl"
          style={{ background: 'linear-gradient(90deg, #b49750, #d4bc7e, #b49750)' }} />

        <div className="relative">
          <p className="text-white/50 text-xs font-bold uppercase tracking-widest mb-3">
            Recommended Lender Tier
          </p>

          <div className="flex items-start justify-between gap-4 mb-2">
            <h3 className="font-display text-3xl sm:text-4xl font-bold text-white leading-tight">
              {tierIcons[result.routing.recommended_lender_tier] || '🏦'}{' '}
              {result.routing.recommended_lender_tier}
            </h3>
            <span
              className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide text-navy-900"
              style={{ background: 'linear-gradient(135deg, #b49750, #d4bc7e)' }}
            >
              Best Match
            </span>
          </div>

          <p className="text-white/80 text-base leading-relaxed mb-6 border-l-4 pl-4 py-1"
            style={{ borderColor: '#b49750' }}>
            {result.routing.reason}
          </p>

          {/* LTV Meters */}
          <div className="space-y-4 mb-6 p-4 rounded-2xl" style={{ background: 'rgba(255,255,255,0.05)' }}>
            <LTVMeter ltv={result.deal.ltv} label="LTV — Loan to Value" />
            <LTVMeter ltv={result.deal.ltarv} label="LT/ARV — Loan to After Repair Value" />
          </div>

          {/* Warning notes */}
          {result.routing.notes && result.routing.notes.length > 0 && (
            <div className="space-y-2 mb-5">
              {result.routing.notes.map((note, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2 rounded-xl px-4 py-3"
                  style={{ background: 'rgba(251,191,36,0.15)', border: '1px solid rgba(251,191,36,0.3)' }}
                >
                  <span className="text-amber-300 text-lg flex-shrink-0">⚠️</span>
                  <p className="text-amber-200 text-sm font-medium">{note}</p>
                </div>
              ))}
            </div>
          )}

          {/* Next steps */}
          <div
            className="flex items-center gap-3 rounded-xl px-4 py-4 mb-4"
            style={{ background: 'rgba(180,151,80,0.12)', border: '1px solid rgba(180,151,80,0.25)' }}
          >
            <span className="text-2xl">📞</span>
            <p className="text-sm" style={{ color: '#d4bc7e' }}>
              <strong className="text-white">Expect a call within 24 hours</strong> from our financing team to discuss your options and connect you with the right lender.
            </p>
          </div>

          {/* Share */}
          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({ title: 'My Virtus Realty Pre-Qualification', text: `I just pre-qualified for investment financing — matched with ${result.routing.recommended_lender_tier}!`, url: window.location.href })
              } else {
                navigator.clipboard?.writeText(window.location.href)
              }
            }}
            className="w-full py-3 rounded-xl text-sm font-semibold transition-all duration-200 hover:opacity-80"
            style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.12)' }}
          >
            📤 Share This Pre-Qualification
          </button>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          to="/listings"
          className="flex-1 text-center py-4 px-6 rounded-xl font-semibold text-sm transition-all duration-200 hover:opacity-80"
          style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.12)' }}
        >
          ← Back to Listings
        </Link>
        <button
          onClick={onReset}
          className="flex-1 py-4 px-6 rounded-xl font-bold text-sm transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
          style={{
            background: 'linear-gradient(135deg, #b49750 0%, #c4a35a 50%, #d4bc7e 100%)',
            color: '#0e1524',
            boxShadow: '0 8px 24px rgba(180,151,80,0.35)',
          }}
        >
          🚀 Submit Another
        </button>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   FORM SECTION — GLASSMORPHISM CARD
───────────────────────────────────────────────*/
function FormSection({ number, title, icon, children, complete }) {
  return (
    <div
      className="rounded-2xl overflow-hidden transition-all duration-500 relative"
      style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.03) 100%)',
        backdropFilter: 'blur(16px)',
        border: complete
          ? '1px solid rgba(180,151,80,0.5)'
          : '1px solid rgba(255,255,255,0.1)',
        boxShadow: complete
          ? '0 0 24px rgba(180,151,80,0.15), 0 8px 32px rgba(0,0,0,0.2)'
          : '0 8px 32px rgba(0,0,0,0.2)',
      }}
    >
      {/* Completion glow strip */}
      {complete && (
        <div
          className="absolute top-0 left-0 right-0 h-0.5"
          style={{ background: 'linear-gradient(90deg, transparent, #b49750, #d4bc7e, #b49750, transparent)' }}
        />
      )}

      {/* Header */}
      <div
        className="px-6 py-4 flex items-center gap-3 border-b"
        style={{ borderColor: 'rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)' }}
      >
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold transition-all duration-500"
          style={
            complete
              ? {
                  background: 'linear-gradient(135deg, #b49750, #d4bc7e)',
                  color: '#0e1524',
                  boxShadow: '0 0 16px rgba(180,151,80,0.5)',
                }
              : {
                  background: 'rgba(180,151,80,0.25)',
                  color: '#d4bc7e',
                  border: '1.5px solid rgba(180,151,80,0.4)',
                }
          }
        >
          {complete ? '✓' : number}
        </div>
        <span className="text-xl">{icon}</span>
        <h2 className="font-display font-bold text-white text-lg">{title}</h2>
        {complete && (
          <span
            className="ml-auto text-xs font-semibold px-2.5 py-1 rounded-full"
            style={{ background: 'rgba(180,151,80,0.2)', color: '#d4bc7e', border: '1px solid rgba(180,151,80,0.3)' }}
          >
            ✓ Complete
          </span>
        )}
      </div>

      <div className="px-6 py-6 space-y-5">{children}</div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   FIELD WRAPPER
───────────────────────────────────────────────*/
function Field({ label, required, hint, children }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2" style={{ color: 'rgba(255,255,255,0.75)' }}>
        {label}
        {required && <span className="ml-1" style={{ color: '#d4bc7e' }}>*</span>}
        {hint && <span className="ml-1 text-xs font-normal" style={{ color: 'rgba(255,255,255,0.35)' }}>({hint})</span>}
      </label>
      {children}
    </div>
  )
}

/* ─────────────────────────────────────────────
   MAIN FINANCING PAGE
───────────────────────────────────────────────*/
export default function Financing() {
  // SEO Meta Tags
  useEffect(() => {
    document.title = 'Investment Property Financing | REO & Foreclosure Loans | Virtus Realty Group'
    const meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute('content', 'Explore financing options for REO properties, bank foreclosures, and investment real estate. FHA, VA, conventional, and hard money loan guidance for South Florida buyers.')
    // OG tags
    const ogTitle = document.querySelector('meta[property="og:title"]')
    if (ogTitle) ogTitle.setAttribute('content', 'Investment Property Financing | REO & Foreclosure Loans | Virtus Realty Group')
    const ogDesc = document.querySelector('meta[property="og:description"]')
    if (ogDesc) ogDesc.setAttribute('content', 'Explore financing options for REO properties, bank foreclosures, and investment real estate. FHA, VA, conventional, and hard money loan guidance for South Florida buyers.')
    const ogUrl = document.querySelector('meta[property="og:url"]')
    if (ogUrl) ogUrl.setAttribute('content', 'https://virtusrealtygroup.com/financing')
  }, [])

  const [searchParams] = useSearchParams()
  const formRef = useRef(null)

  const urlAddress = searchParams.get('address') || ''
  const urlPrice = searchParams.get('price') ? Number(searchParams.get('price')) : ''
  const urlArv = searchParams.get('arv') ? Number(searchParams.get('arv')) : ''

  const [formData, setFormData] = useState({
    address: urlAddress,
    purchase_price: urlPrice,
    arv: urlArv,
    rehab_budget: '',
    exit_strategy: '',
    close_timeline: '',
    name: '',
    email: '',
    phone: '',
    ssn_last4: '',
    credit_score_range: '',
    entity: '',
    experience: '',
    consent: false,
  })

  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [result, setResult] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const handleTextChange = (e) => handleChange(e.target.name, e.target.value)

  const handleCheckbox = (e) => {
    handleChange('consent', e.target.checked)
    if (errors.consent) setErrors((prev) => ({ ...prev, consent: '' }))
  }

  /* ── Section completion detection ── */
  const section1Complete =
    formData.address.trim() !== '' &&
    formData.purchase_price !== '' &&
    formData.arv !== '' &&
    formData.rehab_budget !== ''

  const section2Complete =
    formData.exit_strategy !== '' && formData.close_timeline !== ''

  const section3Complete =
    formData.name.trim() !== '' &&
    formData.email.trim() !== '' &&
    formData.phone.trim() !== '' &&
    formData.credit_score_range !== '' &&
    formData.entity !== '' &&
    formData.experience !== ''

  const section4Complete = formData.consent

  const progressSections = [
    { id: 1, num: '1', label: 'Property', complete: section1Complete },
    { id: 2, num: '2', label: 'Deal', complete: section2Complete },
    { id: 3, num: '3', label: 'Borrower', complete: section3Complete },
    { id: 4, num: '4', label: 'Consent', complete: section4Complete },
  ]

  const validate = () => {
    const errs = {}
    if (!formData.address.trim()) errs.address = 'Property address is required'
    if (formData.purchase_price === '' || formData.purchase_price === null) errs.purchase_price = 'Purchase price is required'
    if (!formData.arv && formData.arv !== 0) errs.arv = 'ARV is required'
    if (formData.rehab_budget === '' || formData.rehab_budget === null) errs.rehab_budget = 'Rehab budget is required ($0 is valid)'
    if (!formData.exit_strategy) errs.exit_strategy = 'Please select an exit strategy'
    if (!formData.close_timeline) errs.close_timeline = 'Please select a close timeline'
    if (!formData.name.trim()) errs.name = 'Name is required'
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) errs.email = 'Valid email is required'
    if (!formData.phone.trim()) errs.phone = 'Phone number is required'
    if (!formData.credit_score_range) errs.credit_score_range = 'Please select a credit score range'
    if (!formData.entity) errs.entity = 'Please select yes or no'
    if (!formData.experience) errs.experience = 'Please select your experience level'
    if (!formData.consent) errs.consent = 'You must agree to continue'
    return errs
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      const firstErrorKey = Object.keys(errs)[0]
      const el = document.querySelector(`[data-field="${firstErrorKey}"]`)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }

    setIsSubmitting(true)

    // Simulated async delay for UX
    await new Promise((r) => setTimeout(r, 1200))

    const purchasePrice = Number(formData.purchase_price)
    const arv = Number(formData.arv)
    const rehabBudget = formData.rehab_budget === '' ? 0 : Number(formData.rehab_budget)

    const data = {
      borrower: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        ssn_last4: formData.ssn_last4 || null,
        credit_score_range: formData.credit_score_range,
        entity: formData.entity === 'yes',
        experience: formData.experience,
      },
      property: {
        address: formData.address,
        purchase_price: purchasePrice,
        arv,
        rehab_budget: rehabBudget,
      },
      deal: {
        exit_strategy: formData.exit_strategy,
        close_timeline: formData.close_timeline,
      },
    }

    const routing = routeLender(data)

    const payload = {
      borrower: data.borrower,
      property: data.property,
      deal: { ...data.deal, ltv: routing.ltv, ltarv: routing.ltarv },
      routing: {
        recommended_lender_tier: routing.tier,
        reason: routing.reason,
        notes: routing.notes,
      },
    }

    console.log('Prequalification Payload:', JSON.stringify(payload, null, 2))

    setIsSubmitting(false)
    setResult(payload)
    setSubmitted(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleReset = () => {
    setFormData({
      address: '',
      purchase_price: '',
      arv: '',
      rehab_budget: '',
      exit_strategy: '',
      close_timeline: '',
      name: '',
      email: '',
      phone: '',
      ssn_last4: '',
      credit_score_range: '',
      entity: '',
      experience: '',
      consent: false,
    })
    setErrors({})
    setResult(null)
    setSubmitted(false)
    setIsSubmitting(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  /* ── Pill option sets ── */
  const exitStrategyOptions = [
    { value: 'fix_flip', label: '🔨 Fix & Flip' },
    { value: 'buy_hold', label: '🏠 Buy & Hold' },
    { value: 'wholesale', label: '📦 Wholesale' },
    { value: 'undecided', label: '🤔 Undecided' },
  ]

  const timelineOptions = [
    { value: 'under_2_weeks', label: '⚡ Under 2 Weeks' },
    { value: '2-4_weeks', label: '📅 2–4 Weeks' },
    { value: '30+_days', label: '🗓️ 30+ Days' },
  ]

  const creditScoreOptions = [
    { value: 'below_620', label: 'Below 620' },
    { value: '620-679', label: '620–679' },
    { value: '680-719', label: '680–719' },
    { value: '720+', label: '720+' },
  ]

  const entityOptions = [
    { value: 'yes', label: '✅ Yes' },
    { value: 'no', label: '❌ No' },
  ]

  const experienceOptions = [
    { value: '0', label: '0' },
    { value: '1-3', label: '1–3' },
    { value: '4-10', label: '4–10' },
    { value: '10+', label: '10+' },
  ]

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(180deg, #0e1524 0%, #0d1420 60%, #0a1019 100%)' }}>

      {/* ── GLOBAL CSS ── */}
      <style>{`
        /* ── Pill buttons ── */
        .financing-pill {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 12px 20px;
          min-height: 48px;
          border-radius: 999px;
          font-size: 0.9rem;
          font-weight: 600;
          border: 1.5px solid;
          cursor: pointer;
          transition: all 0.18s cubic-bezier(0.34, 1.56, 0.64, 1);
          user-select: none;
          white-space: nowrap;
          letter-spacing: 0.01em;
        }
        .financing-pill-inactive {
          background: rgba(255,255,255,0.06);
          border-color: rgba(255,255,255,0.14);
          color: rgba(255,255,255,0.65);
        }
        .financing-pill-inactive:hover {
          border-color: rgba(180,151,80,0.6);
          color: #d4bc7e;
          background: rgba(180,151,80,0.1);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(180,151,80,0.15);
        }
        .financing-pill-active {
          background: linear-gradient(135deg, #b49750 0%, #c4a35a 50%, #d4bc7e 100%);
          border-color: #d4bc7e;
          color: #0e1524;
          transform: scale(1.05);
          box-shadow: 0 0 0 3px rgba(180,151,80,0.3), 0 6px 20px rgba(180,151,80,0.4);
        }
        .financing-pill-active:hover {
          box-shadow: 0 0 0 4px rgba(180,151,80,0.35), 0 8px 24px rgba(180,151,80,0.45);
          transform: scale(1.05) translateY(-1px);
        }

        /* ── Animations ── */
        @keyframes goldShimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        @keyframes heroSlideUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes floatUp {
          0% { opacity: 0; transform: translateY(0) scale(0.5); }
          10% { opacity: 1; }
          90% { opacity: 0.5; }
          100% { opacity: 0; transform: translateY(-100vh) scale(1.2); }
        }
        @keyframes sparkleGlow {
          0%, 100% { box-shadow: 0 0 40px rgba(180,151,80,0.6), 0 0 80px rgba(180,151,80,0.3); }
          50% { box-shadow: 0 0 60px rgba(180,151,80,0.9), 0 0 120px rgba(180,151,80,0.5); }
        }
        @keyframes sparkleOut {
          0% { opacity: 1; transform: rotate(var(--r, 0deg)) translateX(44px) translateY(-50%) scale(1); }
          100% { opacity: 0; transform: rotate(var(--r, 0deg)) translateX(70px) translateY(-50%) scale(0); }
        }
        @keyframes shimmerSweep {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        @keyframes pulse-gold {
          0%, 100% { box-shadow: 0 8px 24px rgba(180,151,80,0.35); }
          50% { box-shadow: 0 8px 40px rgba(180,151,80,0.65), 0 0 0 6px rgba(180,151,80,0.15); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .hero-animate {
          animation: heroSlideUp 0.7s ease-out forwards;
        }
        .hero-animate-d1 {
          opacity: 0;
          animation: heroSlideUp 0.7s ease-out 0.15s forwards;
        }
        .hero-animate-d2 {
          opacity: 0;
          animation: heroSlideUp 0.7s ease-out 0.3s forwards;
        }
        .hero-animate-d3 {
          opacity: 0;
          animation: heroSlideUp 0.7s ease-out 0.45s forwards;
        }

        /* Submit button shimmer */
        .submit-btn {
          position: relative;
          overflow: hidden;
        }
        .submit-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.35) 50%, transparent 70%);
          transform: translateX(-100%);
          animation: shimmerSweep 2.5s ease-in-out infinite;
        }
        .submit-btn:hover {
          animation: pulse-gold 1.5s ease-in-out infinite;
          transform: translateY(-2px);
        }

        /* Mobile sticky submit */
        @media (max-width: 640px) {
          .sticky-submit-wrap {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            z-index: 50;
            padding: 12px 16px 24px;
            background: linear-gradient(to top, #0a1019 60%, transparent);
          }
        }
        @media (min-width: 641px) {
          .sticky-submit-wrap {
            position: static;
            background: none;
            padding: 0;
          }
        }
      `}</style>

      {/* ── HERO SECTION ── */}
      <section className="relative pt-28 pb-24 overflow-hidden">
        {/* Particle field */}
        <FloatingParticles />

        {/* Gold orbs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(180,151,80,0.18) 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(180,151,80,0.12) 0%, transparent 70%)' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(180,151,80,0.05) 0%, transparent 70%)' }} />

        {/* Wave transition */}
        <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none">
          <svg viewBox="0 0 1200 80" preserveAspectRatio="none" className="w-full h-full">
            <path d="M0,40 C400,80 800,0 1200,40 L1200,80 L0,80 Z"
              fill="rgba(13,20,32,0.9)" />
          </svg>
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Badge */}
          <div className="hero-animate flex justify-center mb-5">
            <span
              className="inline-block text-xs font-bold uppercase tracking-widest px-5 py-2 rounded-full"
              style={{ color: '#d4bc7e', background: 'rgba(180,151,80,0.15)', border: '1px solid rgba(180,151,80,0.35)' }}
            >
              💎 Investment Financing
            </span>
          </div>

          {/* Headline */}
          <h1 className="hero-animate-d1 font-display font-black text-white mb-4 leading-none tracking-tight"
            style={{ fontSize: 'clamp(2.8rem, 7vw, 5rem)' }}>
            Close Deals Faster.<br />
            <span
              style={{
                background: 'linear-gradient(135deg, #b49750 0%, #d4bc7e 50%, #b49750 100%)',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                animation: 'goldShimmer 4s linear infinite',
              }}
            >
              Fund Smarter.
            </span>
          </h1>

          {/* Subheadline */}
          <p className="hero-animate-d2 text-white/65 text-xl max-w-2xl mx-auto leading-relaxed mb-8">
            Get pre-qualified in 2 minutes. We match you with South Florida's top investment lenders — instantly.
          </p>

          {/* Trust badges */}
          <div className="hero-animate-d3 flex flex-wrap justify-center gap-3 mb-10">
            {[
              { icon: '🏦', label: '$2B+ in investor loans closed' },
              { icon: '⚡', label: 'Pre-qualify in 2 minutes' },
              { icon: '🔒', label: 'Bank-level encryption' },
            ].map(({ icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold"
                style={{
                  background: 'rgba(255,255,255,0.07)',
                  color: 'rgba(255,255,255,0.85)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <span>{icon}</span>
                <span>{label}</span>
              </div>
            ))}
          </div>

          {/* Process steps */}
          <div className="hero-animate-d3 flex flex-col sm:flex-row items-center justify-center gap-0 sm:gap-0">
            {[
              { step: '01', label: 'Fill the Form', sub: '~2 min', icon: '📝' },
              { step: '02', label: 'Get Matched', sub: 'Instant', icon: '⚡' },
              { step: '03', label: 'Lender Calls', sub: 'Within 24h', icon: '📞' },
            ].map((s, i) => (
              <React.Fragment key={s.step}>
                <div className="flex flex-col items-center px-4 sm:px-6 py-3">
                  <span className="text-2xl mb-1">{s.icon}</span>
                  <span className="text-xs font-bold uppercase tracking-widest mb-0.5" style={{ color: '#b49750' }}>{s.step}</span>
                  <span className="text-white font-semibold text-sm">{s.label}</span>
                  <span className="text-white/40 text-xs">{s.sub}</span>
                </div>
                {i < 2 && (
                  <div className="hidden sm:block h-8 w-px" style={{ background: 'rgba(180,151,80,0.3)' }} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 pb-32 sm:pb-12">

        {submitted && result ? (
          <ConfirmationCard
            result={result}
            borrowerName={formData.name}
            onReset={handleReset}
          />
        ) : (
          <>
            {/* Social Proof */}
            <SocialProofStrip />

            {/* Deal Calculator */}
            <DealCalculatorPreview />

            {/* Progress indicator */}
            <ProgressIndicator sections={progressSections} />

            <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-5">

              {/* ── SECTION 1: Property Info ── */}
              <FormSection number="1" title="Property Info" icon="🏠" complete={section1Complete}>

                <Field label="Property Address" required>
                  <div data-field="address">
                    <GlassInput
                      name="address"
                      value={formData.address}
                      onChange={handleTextChange}
                      placeholder="123 Ocean Dr, Pompano Beach FL 33062"
                      error={errors.address}
                    />
                  </div>
                </Field>

                <Field label="Estimated Purchase Price" required>
                  <div data-field="purchase_price">
                    <CurrencyInput
                      name="purchase_price"
                      value={formData.purchase_price}
                      onChange={handleChange}
                      placeholder="350,000"
                      error={errors.purchase_price}
                    />
                  </div>
                </Field>

                <Field label="Estimated ARV (After Repair Value)" required>
                  <div data-field="arv">
                    <CurrencyInput
                      name="arv"
                      value={formData.arv}
                      onChange={handleChange}
                      placeholder="450,000"
                      error={errors.arv}
                    />
                  </div>
                </Field>

                <Field label="Estimated Rehab Budget" required hint="$0 is valid">
                  <div data-field="rehab_budget">
                    <CurrencyInput
                      name="rehab_budget"
                      value={formData.rehab_budget}
                      onChange={handleChange}
                      placeholder="0"
                      error={errors.rehab_budget}
                    />
                  </div>
                </Field>

              </FormSection>

              {/* ── SECTION 2: Deal Intent ── */}
              <FormSection number="2" title="Deal Intent" icon="🎯" complete={section2Complete}>

                <Field label="Exit Strategy" required>
                  <div data-field="exit_strategy">
                    <PillGroup
                      name="exit_strategy"
                      options={exitStrategyOptions}
                      value={formData.exit_strategy}
                      onChange={handleChange}
                      error={errors.exit_strategy}
                    />
                  </div>
                </Field>

                <Field label="Desired Close Timeline" required>
                  <div data-field="close_timeline">
                    <PillGroup
                      name="close_timeline"
                      options={timelineOptions}
                      value={formData.close_timeline}
                      onChange={handleChange}
                      error={errors.close_timeline}
                    />
                  </div>
                </Field>

              </FormSection>

              {/* ── SECTION 3: Borrower Profile ── */}
              <FormSection number="3" title="Borrower Profile" icon="👤" complete={section3Complete}>

                <Field label="Full Name" required>
                  <div data-field="name">
                    <GlassInput
                      name="name"
                      value={formData.name}
                      onChange={handleTextChange}
                      placeholder="John Doe"
                      error={errors.name}
                    />
                  </div>
                </Field>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Email Address" required>
                    <div data-field="email">
                      <GlassInput
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleTextChange}
                        placeholder="john@example.com"
                        error={errors.email}
                      />
                    </div>
                  </Field>

                  <Field label="Phone Number" required>
                    <div data-field="phone">
                      <GlassInput
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleTextChange}
                        placeholder="(954) 555-1234"
                        error={errors.phone}
                      />
                    </div>
                  </Field>
                </div>

                {/* SSN Last 4 */}
                <Field label="Last 4 of SSN" hint="optional">
                  <div data-field="ssn_last4">
                    <SSNInput
                      value={formData.ssn_last4}
                      onChange={handleChange}
                      error={errors.ssn_last4}
                    />
                  </div>
                </Field>

                <Field label="Estimated Credit Score Range" required>
                  <div data-field="credit_score_range">
                    <PillGroup
                      name="credit_score_range"
                      options={creditScoreOptions}
                      value={formData.credit_score_range}
                      onChange={handleChange}
                      error={errors.credit_score_range}
                    />
                  </div>
                </Field>

                <Field label="Active LLC or Entity?" required>
                  <div data-field="entity">
                    <PillGroup
                      name="entity"
                      options={entityOptions}
                      value={formData.entity}
                      onChange={handleChange}
                      error={errors.entity}
                    />
                  </div>
                </Field>

                <Field label="Investment Properties Purchased (Last 24 Months)" required>
                  <div data-field="experience">
                    <PillGroup
                      name="experience"
                      options={experienceOptions}
                      value={formData.experience}
                      onChange={handleChange}
                      error={errors.experience}
                    />
                  </div>
                </Field>

              </FormSection>

              {/* ── SECTION 4: Consent ── */}
              <FormSection number="4" title="Consent" icon="📋" complete={section4Complete}>
                <div data-field="consent">
                  <label
                    className="flex items-start gap-4 p-4 rounded-xl cursor-pointer transition-all duration-200"
                    style={{
                      background: errors.consent
                        ? 'rgba(248,113,113,0.08)'
                        : formData.consent
                        ? 'rgba(180,151,80,0.1)'
                        : 'rgba(255,255,255,0.04)',
                      border: errors.consent
                        ? '1px solid rgba(248,113,113,0.4)'
                        : formData.consent
                        ? '1px solid rgba(180,151,80,0.4)'
                        : '1px solid rgba(255,255,255,0.08)',
                    }}
                  >
                    <div className="relative flex-shrink-0 mt-0.5">
                      <input
                        type="checkbox"
                        checked={formData.consent}
                        onChange={handleCheckbox}
                        className="sr-only"
                      />
                      <div
                        className="w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200"
                        style={
                          formData.consent
                            ? { background: 'linear-gradient(135deg, #b49750, #d4bc7e)', borderColor: '#d4bc7e' }
                            : errors.consent
                            ? { background: 'transparent', borderColor: '#f87171' }
                            : { background: 'transparent', borderColor: 'rgba(255,255,255,0.3)' }
                        }
                      >
                        {formData.consent && (
                          <svg className="w-3 h-3 text-navy-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)' }}>
                      I agree my information may be shared with Virtus Realty Group's lending partners for the purpose of financing this property.
                    </p>
                  </label>
                  {errors.consent && <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1"><span>⚠</span>{errors.consent}</p>}
                </div>
              </FormSection>

              {/* ── SUBMIT BUTTON ── */}
              <div className="sticky-submit-wrap pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="submit-btn w-full py-5 rounded-2xl text-lg font-black text-navy-900 shadow-xl transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                  style={{
                    background: 'linear-gradient(135deg, #b49750 0%, #c4a35a 40%, #d4bc7e 70%, #b49750 100%)',
                    backgroundSize: '200% auto',
                    boxShadow: '0 8px 32px rgba(180,151,80,0.4)',
                    letterSpacing: '0.01em',
                  }}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-3">
                      <span
                        className="w-5 h-5 border-2 border-navy-900/30 border-t-navy-900 rounded-full"
                        style={{ animation: 'spin 0.8s linear infinite' }}
                      />
                      Matching You with Lenders…
                    </span>
                  ) : (
                    '🚀 Get My Lender Match'
                  )}
                </button>

                <p className="text-center text-xs mt-3" style={{ color: 'rgba(255,255,255,0.3)' }}>
                  🔒 Your information is kept confidential and only shared with verified lending partners.
                </p>
              </div>

            </form>
          </>
        )}
      </div>
    </div>
  )
}
