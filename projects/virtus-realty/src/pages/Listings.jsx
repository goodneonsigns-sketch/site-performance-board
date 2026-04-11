import React, { useState, useRef, useCallback, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useSparkListings, formatPrice, getPropertyTypeLabel } from '../hooks/useSparkListings'
import PropertyCard from '../components/PropertyCard'

/* ═══════════════════════════════════════════════════════════
   CONSTANTS
════════════════════════════════════════════════════════════ */

const PRICE_MIN_ABS = 0
const PRICE_MAX_ABS = 10_000_000

const PRICE_PRESETS = [
  { label: 'Any Price',   min: null, max: null },
  { label: 'Under $200K', min: null, max: 200_000 },
  { label: '$200K–$500K', min: 200_000, max: 500_000 },
  { label: '$500K–$1M',   min: 500_000, max: 1_000_000 },
  { label: '$1M–$2M',     min: 1_000_000, max: 2_000_000 },
  { label: '$2M–$5M',     min: 2_000_000, max: 5_000_000 },
  { label: '$5M+',        min: 5_000_000, max: null },
]

const BED_OPTIONS  = [0,1,2,3,4,5]
const BATH_OPTIONS = [0,1,2,3,4]

const PROPERTY_TYPES = [
  { label: 'All Types',           value: 'all' },
  { label: 'Residential',         value: 'Residential' },
  { label: 'Commercial Sale',     value: 'Commercial Sale' },
  { label: 'Commercial Lease',    value: 'Commercial Lease' },
  { label: 'Land & Docks',        value: 'Land' },
  { label: 'Residential Lease',   value: 'Residential Lease' },
  { label: 'Residential Income',  value: 'Residential Income' },
  { label: 'Business Opportunity',value: 'Business Opportunity' },
]

const SUBTYPES = [
  'Single Family Residence','Condominium','Townhouse','Villa',
  'Multi Family','Manufactured Home','Mobile Home','Duplex',
  'Triplex','Quadruplex','Half Duplex','Stock Cooperative',
]

const COUNTIES = ['Broward','Palm Beach','St. Lucie','Miami-Dade']

const SORT_OPTIONS = [
  { label: 'Newest',         value: 'newest' },
  { label: 'Price: High→Low',value: 'price_desc' },
  { label: 'Price: Low→High',value: 'price_asc' },
  { label: 'Most Beds',      value: 'beds' },
  { label: 'Most SqFt',      value: 'sqft' },
  { label: 'Most Photos',    value: 'photos' },
]

/* South Florida cities grouped by county */
const CITIES_BY_COUNTY = {
  'Broward': [
    'Coconut Creek','Coral Springs','Dania Beach','Davie','Deerfield Beach',
    'Fort Lauderdale','Hallandale Beach','Hillsboro Beach','Hollywood',
    'Lauderdale Lakes','Lauderdale-By-The-Sea','Lauderhill','Lighthouse Point',
    'Margate','North Lauderdale','Oakland Park','Pembroke Pines','Plantation',
    'Pompano Beach','Sea Ranch Lakes','Southwest Ranches','Sunrise','Surfside',
    'Tamarac','Weston','Wilton Manors',
  ],
  'Palm Beach': [
    'Atlantis','Boca Raton','Boynton Beach','Delray Beach','Golden Beach',
    'Greenacres','Gulf Stream','Highland Beach','Hypoluxo','Juno Beach',
    'Jupiter','Lake Worth','Lake Worth Beach','Lantana','Loxahatchee',
    'Loxahatchee Groves','Manalapan','North Palm Beach','Pahokee','Palm Beach',
    'Palm Beach Gardens','Riviera Beach','Royal Palm Beach','Singer Island',
    'South Bay','South Palm Beach','Tequesta','The Acreage','Wellington',
    'West Palm Beach',
  ],
  'St. Lucie': [
    'Fort Pierce','Hutchinson Island','Jensen Beach','Port St. Lucie',
  ],
  'Miami-Dade': [
    'Aventura','Hialeah','Miami','Miami Beach','Miami Gardens',
    'North Miami','North Miami Beach','Sunny Isles Beach',
  ],
}

const ALL_CITIES = Object.values(CITIES_BY_COUNTY).flat()

/* ═══════════════════════════════════════════════════════════
   HELPERS
════════════════════════════════════════════════════════════ */

function fmtPriceShort(n) {
  if (n == null) return ''
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(n % 1_000_000 === 0 ? 0 : 1)}M`
  if (n >= 1_000)     return `$${(n / 1_000).toFixed(0)}K`
  return `$${n}`
}

function clamp(v, lo, hi) { return Math.min(Math.max(v, lo), hi) }

/* ═══════════════════════════════════════════════════════════
   DUAL-HANDLE PRICE SLIDER
════════════════════════════════════════════════════════════ */

function PriceSlider({ minVal, maxVal, onChange }) {
  const trackRef = useRef(null)
  const dragging = useRef(null) // 'min' | 'max' | null

  const toPercent = (v) => ((v - PRICE_MIN_ABS) / (PRICE_MAX_ABS - PRICE_MIN_ABS)) * 100

  const getValFromMouse = useCallback((clientX) => {
    const rect = trackRef.current.getBoundingClientRect()
    const ratio = clamp((clientX - rect.left) / rect.width, 0, 1)
    const raw = ratio * (PRICE_MAX_ABS - PRICE_MIN_ABS) + PRICE_MIN_ABS
    // Snap to nearest 10K
    return Math.round(raw / 10_000) * 10_000
  }, [])

  const startDrag = useCallback((handle, e) => {
    e.preventDefault()
    dragging.current = handle
    const up = () => { dragging.current = null; window.removeEventListener('mousemove', move); window.removeEventListener('mouseup', up); window.removeEventListener('touchmove', move); window.removeEventListener('touchend', up) }
    const move = (ev) => {
      const clientX = ev.touches ? ev.touches[0].clientX : ev.clientX
      const v = getValFromMouse(clientX)
      if (dragging.current === 'min') {
        onChange(clamp(v, PRICE_MIN_ABS, maxVal - 10_000), maxVal)
      } else {
        onChange(minVal, clamp(v, minVal + 10_000, PRICE_MAX_ABS))
      }
    }
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseup', up)
    window.addEventListener('touchmove', move, { passive: false })
    window.addEventListener('touchend', up)
  }, [minVal, maxVal, onChange, getValFromMouse])

  const minPct = toPercent(minVal)
  const maxPct = toPercent(maxVal)

  return (
    <div className="px-2 pt-6 pb-2">
      <div className="price-track" ref={trackRef}>
        <div className="price-track-fill" style={{ left: `${minPct}%`, right: `${100 - maxPct}%` }} />

        {/* Min handle */}
        <div
          className="price-handle"
          style={{ left: `${minPct}%` }}
          onMouseDown={(e) => startDrag('min', e)}
          onTouchStart={(e) => startDrag('min', e)}
        >
          <div className="price-label">{fmtPriceShort(minVal) || 'Any'}</div>
        </div>

        {/* Max handle */}
        <div
          className="price-handle"
          style={{ left: `${maxPct}%` }}
          onMouseDown={(e) => startDrag('max', e)}
          onTouchStart={(e) => startDrag('max', e)}
        >
          <div className="price-label">{maxVal >= PRICE_MAX_ABS ? '$10M+' : fmtPriceShort(maxVal)}</div>
        </div>
      </div>
      <div className="flex justify-between mt-4 text-xs text-gray-500 font-medium">
        <span>{minVal > PRICE_MIN_ABS ? fmtPriceShort(minVal) : 'Any min'}</span>
        <span>{maxVal < PRICE_MAX_ABS ? fmtPriceShort(maxVal) : 'Any max'}</span>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════
   CITY AUTOCOMPLETE
════════════════════════════════════════════════════════════ */

function CitySearch({ value, onChange }) {
  const [query, setQuery] = useState(value || '')
  const [open, setOpen] = useState(false)
  const [focused, setFocused] = useState(false)
  const inputRef = useRef(null)
  const dropRef = useRef(null)

  // Filter cities
  const filtered = useMemo(() => {
    if (!query.trim()) return null
    const q = query.toLowerCase()
    const result = {}
    Object.entries(CITIES_BY_COUNTY).forEach(([county, cities]) => {
      const matches = cities.filter(c => c.toLowerCase().includes(q))
      if (matches.length) result[county] = matches
    })
    return Object.keys(result).length ? result : null
  }, [query])

  const select = (city) => {
    setQuery(city)
    onChange(city)
    setOpen(false)
    inputRef.current?.blur()
  }
  const clear = () => {
    setQuery('')
    onChange('')
    setOpen(false)
    inputRef.current?.focus()
  }

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (!dropRef.current?.contains(e.target) && !inputRef.current?.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div className="relative flex-1 min-w-0">
      <div className={`search-glow relative flex items-center rounded-xl border-2 transition-all duration-200 ${focused ? 'border-navy-500 bg-white' : 'border-gray-200 bg-white'}`}>
        <svg className="absolute left-3.5 w-4 h-4 text-navy-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <input
          ref={inputRef}
          type="text"
          placeholder="Search city, neighborhood…"
          value={query}
          onChange={(e) => { setQuery(e.target.value); setOpen(true) }}
          onFocus={() => { setFocused(true); setOpen(true) }}
          onBlur={() => setFocused(false)}
          className="w-full pl-10 pr-8 py-2.5 text-sm bg-transparent outline-none text-gray-800 placeholder-gray-400"
        />
        {query && (
          <button onClick={clear} className="absolute right-3 text-gray-400 hover:text-gray-600 transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Dropdown */}
      {open && filtered && (
        <div
          ref={dropRef}
          className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-100 rounded-xl shadow-xl z-50 overflow-hidden max-h-72 overflow-y-auto"
        >
          {Object.entries(filtered).map(([county, cities]) => (
            <div key={county}>
              <div className="px-3 py-1.5 text-xs font-bold text-gray-400 uppercase tracking-wider bg-gray-50 sticky top-0">
                {county} County
              </div>
              {cities.map(city => (
                <button
                  key={city}
                  onMouseDown={() => select(city)}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-navy-50 hover:text-navy-700 flex items-center gap-2 transition-colors"
                >
                  <svg className="w-3 h-3 text-navy-300 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  {city}
                </button>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════
   ACTIVE FILTER TAGS
════════════════════════════════════════════════════════════ */

function FilterTag({ label, onRemove }) {
  const [removing, setRemoving] = useState(false)
  const remove = () => {
    setRemoving(true)
    setTimeout(onRemove, 160)
  }
  return (
    <span className={`active-tag inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-navy-100 text-navy-800 text-xs font-semibold border border-navy-200 ${removing ? 'active-tag-exit' : ''}`}>
      {label}
      <button onClick={remove} className="ml-0.5 text-navy-500 hover:text-navy-800 transition-colors leading-none">
        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </span>
  )
}

/* ═══════════════════════════════════════════════════════════
   SKELETON LOADER
════════════════════════════════════════════════════════════ */

function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden">
      <div className="skeleton h-52 w-full" />
      <div className="p-5 space-y-3">
        <div className="skeleton h-5 rounded-lg w-3/4" />
        <div className="skeleton h-3.5 rounded w-1/2" />
        <div className="flex gap-2 mt-3">
          <div className="skeleton h-6 rounded-full w-16" />
          <div className="skeleton h-6 rounded-full w-16" />
          <div className="skeleton h-6 rounded-full w-20" />
        </div>
        <div className="skeleton h-9 rounded-lg mt-4 w-full" />
      </div>
    </div>
  )
}

function SkeletonList() {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden flex border-l-4 border-l-gray-200 h-36">
      <div className="skeleton w-52 flex-shrink-0" />
      <div className="flex-grow p-4 space-y-2">
        <div className="skeleton h-5 rounded w-1/3" />
        <div className="skeleton h-3.5 rounded w-1/2" />
        <div className="flex gap-2 mt-2">
          <div className="skeleton h-5 rounded-full w-14" />
          <div className="skeleton h-5 rounded-full w-14" />
        </div>
        <div className="skeleton h-8 rounded-lg w-28 mt-2" />
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════
   ANIMATED COUNTER
════════════════════════════════════════════════════════════ */

function AnimatedCount({ target, duration = 900 }) {
  const [display, setDisplay] = useState(0)
  const frameRef = useRef(null)

  useEffect(() => {
    if (!target) { setDisplay(0); return }
    const start = Date.now()
    const from = display
    const tick = () => {
      const elapsed = Date.now() - start
      const progress = Math.min(elapsed / duration, 1)
      // Ease-out cubic
      const ease = 1 - Math.pow(1 - progress, 3)
      setDisplay(Math.round(from + (target - from) * ease))
      if (progress < 1) frameRef.current = requestAnimationFrame(tick)
    }
    frameRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frameRef.current)
  }, [target]) // eslint-disable-line

  return <>{display.toLocaleString()}</>
}

/* ═══════════════════════════════════════════════════════════
   TOGGLE BUTTON GROUP
════════════════════════════════════════════════════════════ */

function ToggleGroup({ value, options, onChange, labelFn }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {options.map((opt) => {
        const active = value === opt
        return (
          <button
            key={opt}
            onClick={() => onChange(active ? null : opt)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-all duration-150 ${active ? 'bg-navy-600 border-navy-600 text-white shadow-sm' : 'bg-white border-gray-200 text-gray-600 hover:border-navy-400 hover:text-navy-700'}`}
          >
            {labelFn ? labelFn(opt) : opt}
          </button>
        )
      })}
    </div>
  )
}

function YesNoAny({ label, value, onChange }) {
  const opts = [null, 'yes', 'no']
  const labels = { null: 'Any', yes: 'Yes', no: 'No' }
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-gray-700 font-medium">{label}</span>
      <div className="flex rounded-lg overflow-hidden border border-gray-200">
        {opts.map((opt) => {
          const active = value === opt
          return (
            <button
              key={String(opt)}
              onClick={() => onChange(opt)}
              className={`px-3 py-1.5 text-sm font-medium transition-all duration-150 ${active ? 'bg-navy-600 text-white' : 'bg-white text-gray-600 hover:bg-navy-50'}`}
            >
              {labels[opt]}
            </button>
          )
        })}
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════
   VIEW SWITCHER
════════════════════════════════════════════════════════════ */

function ViewSwitcher({ view, onChange }) {
  const opts = [
    { id: 'grid', icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    )},
    { id: 'list', icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
      </svg>
    )},
    { id: 'map', icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    )},
  ]
  return (
    <div className="flex rounded-xl border border-gray-200 overflow-hidden bg-white shadow-sm">
      {opts.map(({ id, icon }) => (
        <button
          key={id}
          onClick={() => onChange(id)}
          title={id.charAt(0).toUpperCase() + id.slice(1)}
          className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium transition-all duration-150 ${view === id ? 'bg-navy-600 text-white' : 'text-gray-500 hover:bg-gray-50'}`}
        >
          {icon}
          <span className="hidden sm:inline capitalize">{id}</span>
        </button>
      ))}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════
   PAGINATION
════════════════════════════════════════════════════════════ */

function Pagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null

  const pages = []
  const delta = 2
  const lo = Math.max(1, page - delta)
  const hi = Math.min(totalPages, page + delta)

  if (lo > 1) { pages.push(1); if (lo > 2) pages.push('...') }
  for (let i = lo; i <= hi; i++) pages.push(i)
  if (hi < totalPages) { if (hi < totalPages - 1) pages.push('...'); pages.push(totalPages) }

  const btnBase = 'w-9 h-9 rounded-lg flex items-center justify-center text-sm font-medium transition-all duration-150'

  return (
    <div className="flex items-center justify-center gap-1 mt-12 flex-wrap">
      <button
        onClick={() => onChange(1)}
        disabled={page === 1}
        className={`${btnBase} ${page === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-navy-50 hover:text-navy-700'}`}
        aria-label="First page"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" /></svg>
      </button>
      <button
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        className={`${btnBase} ${page === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-navy-50 hover:text-navy-700'}`}
        aria-label="Previous page"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
      </button>

      {pages.map((p, i) => p === '...'
        ? <span key={`ellipsis-${i}`} className="w-9 h-9 flex items-center justify-center text-gray-400">…</span>
        : (
          <button
            key={p}
            onClick={() => onChange(p)}
            className={`${btnBase} ${p === page ? 'bg-navy-600 text-white shadow-sm' : 'text-gray-600 hover:bg-navy-50 hover:text-navy-700'}`}
          >
            {p}
          </button>
        )
      )}

      <button
        onClick={() => onChange(page + 1)}
        disabled={page === totalPages}
        className={`${btnBase} ${page === totalPages ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-navy-50 hover:text-navy-700'}`}
        aria-label="Next page"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
      </button>
      <button
        onClick={() => onChange(totalPages)}
        disabled={page === totalPages}
        className={`${btnBase} ${page === totalPages ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-navy-50 hover:text-navy-700'}`}
        aria-label="Last page"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7" /></svg>
      </button>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════
   FILTER PANEL (shared between sidebar and drawer)
════════════════════════════════════════════════════════════ */

function FilterPanel({ filters, setFilters, compact = false }) {
  const [moreOpen, setMoreOpen] = useState(false)

  const set = (key) => (val) => setFilters(f => ({ ...f, [key]: val }))

  const priceSliderMin = filters.minPrice ?? PRICE_MIN_ABS
  const priceSliderMax = filters.maxPrice ?? PRICE_MAX_ABS

  return (
    <div className={`space-y-5 ${compact ? 'text-sm' : ''}`}>

      {/* ── Buy / Rent Toggle ── */}
      <div>
        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">I'm looking to</label>
        <div className="flex gap-2">
          {[
            { value: 'buy',  label: '🏠 Buy',  title: 'For Sale' },
            { value: 'rent', label: '🔑 Rent', title: 'For Rent' },
            { value: 'all',  label: '⊙ All',   title: 'All Listings' },
          ].map(({ value, label, title }) => {
            const active = (filters.listingType || 'buy') === value
            return (
              <button
                key={value}
                title={title}
                onClick={() => set('listingType')(value)}
                className={`flex-1 py-2.5 px-2 rounded-xl text-sm font-bold border-2 transition-all duration-150 ${
                  active
                    ? 'bg-navy-700 border-navy-700 text-white shadow-md'
                    : 'bg-white border-gray-200 text-gray-600 hover:border-navy-400 hover:text-navy-700'
                }`}
              >
                {label}
              </button>
            )
          })}
        </div>
      </div>

      {/* ── Price Range ── */}
      <div>
        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Price Range</label>
        <div className="flex flex-wrap gap-1.5 mb-3">
          {PRICE_PRESETS.map(preset => {
            const active = filters.minPrice === preset.min && filters.maxPrice === preset.max
            return (
              <button
                key={preset.label}
                onClick={() => setFilters(f => ({ ...f, minPrice: preset.min, maxPrice: preset.max }))}
                className={`px-2.5 py-1 rounded-full text-xs font-medium border transition-all duration-150 ${active ? 'bg-navy-600 border-navy-600 text-white' : 'bg-white border-gray-200 text-gray-600 hover:border-navy-400 hover:text-navy-700'}`}
              >
                {preset.label}
              </button>
            )
          })}
        </div>
        <PriceSlider
          minVal={priceSliderMin}
          maxVal={priceSliderMax}
          onChange={(min, max) => setFilters(f => ({
            ...f,
            minPrice: min > PRICE_MIN_ABS ? min : null,
            maxPrice: max < PRICE_MAX_ABS ? max : null,
          }))}
        />
      </div>

      {/* Beds */}
      <div>
        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Bedrooms</label>
        <div className="flex gap-1.5">
          {BED_OPTIONS.map(n => {
            const active = filters.beds === n
            return (
              <button
                key={n}
                onClick={() => set('beds')(active ? 0 : n)}
                className={`flex-1 py-1.5 rounded-full text-sm font-medium border transition-all duration-150 ${active ? 'bg-navy-600 border-navy-600 text-white' : 'bg-white border-gray-200 text-gray-600 hover:border-navy-400 hover:text-navy-700'}`}
              >
                {n === 0 ? 'Any' : `${n}+`}
              </button>
            )
          })}
        </div>
      </div>

      {/* Baths */}
      <div>
        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Bathrooms</label>
        <div className="flex gap-1.5">
          {BATH_OPTIONS.map(n => {
            const active = filters.baths === n
            return (
              <button
                key={n}
                onClick={() => set('baths')(active ? 0 : n)}
                className={`flex-1 py-1.5 rounded-full text-sm font-medium border transition-all duration-150 ${active ? 'bg-navy-600 border-navy-600 text-white' : 'bg-white border-gray-200 text-gray-600 hover:border-navy-400 hover:text-navy-700'}`}
              >
                {n === 0 ? 'Any' : `${n}+`}
              </button>
            )
          })}
        </div>
      </div>

      {/* Property Type */}
      <div>
        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Property Type</label>
        <div className="relative">
          <select
            value={filters.propType || 'all'}
            onChange={(e) => set('propType')(e.target.value)}
            className="w-full appearance-none pl-3 pr-8 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 bg-white hover:border-navy-400 focus:border-navy-500 focus:ring-1 focus:ring-navy-500 outline-none cursor-pointer"
          >
            {PROPERTY_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
          </select>
          <svg className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* ── More Filters toggle ── */}
      <button
        onClick={() => setMoreOpen(o => !o)}
        className="flex items-center gap-2 text-navy-600 hover:text-navy-800 text-sm font-semibold transition-colors"
      >
        <svg className={`w-4 h-4 transition-transform duration-200 ${moreOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
        {moreOpen ? 'Less Filters' : 'More Filters'}
        {[filters.subtype, filters.minSqft, filters.maxSqft, filters.minYear, filters.maxYear, filters.county, filters.waterfront, filters.pool].filter(Boolean).length > 0 && (
          <span className="ml-1 bg-navy-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            {[filters.subtype, filters.minSqft, filters.maxSqft, filters.minYear, filters.maxYear, filters.county, filters.waterfront, filters.pool].filter(Boolean).length}
          </span>
        )}
      </button>

      {/* ── Expandable section ── */}
      {moreOpen && (
        <div className="space-y-5 pt-2 border-t border-gray-100 animate-fade-in">

          {/* Property Sub Type */}
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Property Sub-Type</label>
            <div className="flex flex-wrap gap-1.5">
              {SUBTYPES.map(st => {
                const active = filters.subtype === st
                return (
                  <button
                    key={st}
                    onClick={() => set('subtype')(active ? null : st)}
                    className={`px-2.5 py-1 rounded-full text-xs font-medium border transition-all duration-150 ${active ? 'bg-navy-600 border-navy-600 text-white' : 'bg-white border-gray-200 text-gray-600 hover:border-navy-400 hover:text-navy-700'}`}
                  >
                    {st}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Square Feet */}
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Square Feet</label>
            <div className="flex gap-2">
              <input
                type="number" placeholder="Min sqft"
                value={filters.minSqft || ''}
                onChange={(e) => set('minSqft')(e.target.value ? Number(e.target.value) : null)}
                className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-navy-500 focus:ring-1 focus:ring-navy-500"
              />
              <input
                type="number" placeholder="Max sqft"
                value={filters.maxSqft || ''}
                onChange={(e) => set('maxSqft')(e.target.value ? Number(e.target.value) : null)}
                className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-navy-500 focus:ring-1 focus:ring-navy-500"
              />
            </div>
          </div>

          {/* Year Built */}
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Year Built</label>
            <div className="flex gap-2">
              <input
                type="number" placeholder="From year" min="1900" max="2025"
                value={filters.minYear || ''}
                onChange={(e) => set('minYear')(e.target.value ? Number(e.target.value) : null)}
                className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-navy-500 focus:ring-1 focus:ring-navy-500"
              />
              <input
                type="number" placeholder="To year" min="1900" max="2025"
                value={filters.maxYear || ''}
                onChange={(e) => set('maxYear')(e.target.value ? Number(e.target.value) : null)}
                className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-navy-500 focus:ring-1 focus:ring-navy-500"
              />
            </div>
          </div>

          {/* County */}
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">County</label>
            <div className="relative">
              <select
                value={filters.county || ''}
                onChange={(e) => set('county')(e.target.value || null)}
                className="w-full appearance-none pl-3 pr-8 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 bg-white hover:border-navy-400 focus:border-navy-500 focus:ring-1 focus:ring-navy-500 outline-none cursor-pointer"
              >
                <option value="">All Counties</option>
                {COUNTIES.map(c => <option key={c} value={c}>{c} County</option>)}
              </select>
              <svg className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Waterfront / Pool / HOA toggles */}
          <div className="space-y-3">
            <YesNoAny label="Waterfront" value={filters.waterfront} onChange={set('waterfront')} />
            <YesNoAny label="Pool"       value={filters.pool}       onChange={set('pool')} />
          </div>
        </div>
      )}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════
   MOBILE DRAWER
════════════════════════════════════════════════════════════ */

function MobileFilterDrawer({ open, onClose, filters, setFilters, onClear, activeCount }) {
  const [closing, setClosing] = useState(false)

  const close = () => {
    setClosing(true)
    setTimeout(() => { setClosing(false); onClose() }, 240)
  }

  if (!open && !closing) return null

  return (
    <>
      <div className="drawer-overlay" onClick={close} />
      <div className={`drawer-panel flex flex-col ${closing ? 'drawer-panel-close' : ''}`}>
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-2 flex-shrink-0">
          <div className="w-10 h-1 rounded-full bg-gray-300" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100 flex-shrink-0">
          <h2 className="font-display font-bold text-lg text-gray-900">
            Filters {activeCount > 0 && <span className="text-navy-600">({activeCount} active)</span>}
          </h2>
          <div className="flex gap-3">
            {activeCount > 0 && (
              <button onClick={onClear} className="text-sm text-gold-600 font-semibold hover:text-gold-800 transition-colors">
                Clear all
              </button>
            )}
            <button onClick={close} className="text-gray-400 hover:text-gray-700 transition-colors">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Body — scrollable */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          <FilterPanel filters={filters} setFilters={setFilters} compact />
        </div>

        {/* Apply button — sticky at bottom */}
        <div className="flex-shrink-0 px-5 py-4 bg-white border-t border-gray-100">
          <button
            onClick={close}
            className="w-full py-3 bg-navy-600 hover:bg-navy-700 text-white font-bold rounded-xl transition-colors duration-200 shadow-lg"
          >
            Show Results
          </button>
        </div>
      </div>
    </>
  )
}

/* ═══════════════════════════════════════════════════════════
   QUICK STATS BANNER
════════════════════════════════════════════════════════════ */

function QuickStats({ listings, totalCount, loading }) {
  const stats = useMemo(() => {
    if (!listings.length) return null
    const prices = listings.map(l => l.ListPrice).filter(Boolean)
    if (!prices.length) return null
    const avg = Math.round(prices.reduce((a, b) => a + b, 0) / prices.length)
    const sorted = [...prices].sort((a, b) => a - b)
    const median = sorted[Math.floor(sorted.length / 2)]
    const today = new Date(); today.setHours(0, 0, 0, 0)
    const newToday = listings.filter(l => {
      if (!l.ListingContractDate) return false
      return new Date(l.ListingContractDate) >= today
    }).length
    return { avg, median, newToday }
  }, [listings])

  if (!stats || loading) return null

  return (
    <div className="flex flex-wrap gap-4 items-center text-sm text-gray-600">
      <span>
        <span className="font-semibold text-gray-900">{formatPrice(stats.avg)}</span>{' '}
        avg price
      </span>
      <span className="text-gray-300">|</span>
      <span>
        <span className="font-semibold text-gray-900">{formatPrice(stats.median)}</span>{' '}
        median
      </span>
      <span className="text-gray-300">|</span>
      <span>
        <span className="font-semibold text-green-600">+{stats.newToday}</span>{' '}
        new today
      </span>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════
   MAIN LISTINGS PAGE
════════════════════════════════════════════════════════════ */

const LIMIT = 24

const DEFAULT_FILTERS = {
  listingType: 'buy',
  city: null,
  minPrice: null,
  maxPrice: null,
  beds: 0,
  baths: 0,
  propType: 'all',
  subtype: null,
  minSqft: null,
  maxSqft: null,
  minYear: null,
  maxYear: null,
  county: null,
  waterfront: null,
  pool: null,
}

export default function Listings() {
  // SEO Meta Tags
  useEffect(() => {
    document.title = 'Property Listings | South Florida Homes, Condos & Investment Properties | Virtus Realty'
    const meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute('content', 'Browse South Florida real estate listings — homes, condos, investment properties, and REO opportunities across Broward, Palm Beach, and Miami-Dade counties.')
    // OG tags
    const ogTitle = document.querySelector('meta[property="og:title"]')
    if (ogTitle) ogTitle.setAttribute('content', 'Property Listings | South Florida Homes, Condos & Investment Properties | Virtus Realty')
    const ogDesc = document.querySelector('meta[property="og:description"]')
    if (ogDesc) ogDesc.setAttribute('content', 'Browse South Florida real estate listings — homes, condos, investment properties, and REO opportunities across Broward, Palm Beach, and Miami-Dade counties.')
    const ogUrl = document.querySelector('meta[property="og:url"]')
    if (ogUrl) ogUrl.setAttribute('content', 'https://virtusrealtygroup.com/listings')
  }, [])

  const [filters, setFilters] = useState(DEFAULT_FILTERS)
  const [sort, setSort] = useState('newest')
  const [page, setPage] = useState(1)
  const [view, setView] = useState('grid')
  const [drawerOpen, setDrawerOpen] = useState(false)

  // Reset page on filter/sort change
  const prevFilters = useRef(filters)
  useEffect(() => {
    if (prevFilters.current !== filters) { setPage(1); prevFilters.current = filters }
  }, [filters])

  const { listings, loading, error, totalCount } = useSparkListings({
    limit: LIMIT,
    page,
    city: filters.city || null,
    minPrice: filters.minPrice,
    maxPrice: filters.maxPrice,
    beds: filters.beds || null,
    baths: filters.baths || null,
    propType: filters.propType !== 'all' ? filters.propType : null,
    subtype: filters.subtype,
    minSqft: filters.minSqft,
    maxSqft: filters.maxSqft,
    minYear: filters.minYear,
    maxYear: filters.maxYear,
    county: filters.county,
    waterfront: filters.waterfront,
    pool: filters.pool,
    listingType: filters.listingType !== 'all' ? filters.listingType : null,
    sort,
  })

  const totalPages = Math.ceil(totalCount / LIMIT)

  /* ── Active filter tags ── */
  const activeTags = useMemo(() => {
    const tags = []
    if (filters.city)       tags.push({ key: 'city',       label: `📍 ${filters.city}`, clear: () => setFilters(f => ({ ...f, city: null })) })
    if (filters.minPrice && filters.maxPrice) tags.push({ key: 'price', label: `${fmtPriceShort(filters.minPrice)}–${fmtPriceShort(filters.maxPrice)}`, clear: () => setFilters(f => ({ ...f, minPrice: null, maxPrice: null })) })
    else if (filters.minPrice) tags.push({ key: 'minprice', label: `From ${fmtPriceShort(filters.minPrice)}`, clear: () => setFilters(f => ({ ...f, minPrice: null })) })
    else if (filters.maxPrice) tags.push({ key: 'maxprice', label: `Up to ${fmtPriceShort(filters.maxPrice)}`, clear: () => setFilters(f => ({ ...f, maxPrice: null })) })
    if (filters.beds)       tags.push({ key: 'beds',      label: `${filters.beds}+ beds`,        clear: () => setFilters(f => ({ ...f, beds: 0 })) })
    if (filters.baths)      tags.push({ key: 'baths',     label: `${filters.baths}+ baths`,       clear: () => setFilters(f => ({ ...f, baths: 0 })) })
    if (filters.propType && filters.propType !== 'all') tags.push({ key: 'type', label: filters.propType, clear: () => setFilters(f => ({ ...f, propType: 'all' })) })
    if (filters.subtype)    tags.push({ key: 'subtype',   label: filters.subtype,               clear: () => setFilters(f => ({ ...f, subtype: null })) })
    if (filters.county)     tags.push({ key: 'county',    label: `${filters.county} Co.`,         clear: () => setFilters(f => ({ ...f, county: null })) })
    if (filters.waterfront) tags.push({ key: 'waterfront',label: `Waterfront: ${filters.waterfront}`,clear: () => setFilters(f => ({ ...f, waterfront: null })) })
    if (filters.pool)       tags.push({ key: 'pool',      label: `Pool: ${filters.pool}`,          clear: () => setFilters(f => ({ ...f, pool: null })) })
    if (filters.minSqft || filters.maxSqft) tags.push({ key: 'sqft', label: `${filters.minSqft || '0'}–${filters.maxSqft || '∞'} sqft`, clear: () => setFilters(f => ({ ...f, minSqft: null, maxSqft: null })) })
    if (filters.minYear || filters.maxYear) tags.push({ key: 'year', label: `Built ${filters.minYear || ''}–${filters.maxYear || 'now'}`, clear: () => setFilters(f => ({ ...f, minYear: null, maxYear: null })) })
    return tags
  }, [filters])

  const activeCount = activeTags.length
  const hasFilters = activeCount > 0

  const clearAll = () => { setFilters(DEFAULT_FILTERS); setPage(1) }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ══ PAGE HERO ══ */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-95" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold-400/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold-400/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 right-0 h-16">
          <svg viewBox="0 0 1200 80" preserveAspectRatio="none" className="w-full h-full">
            <path d="M0,40 C400,80 800,0 1200,40 L1200,80 L0,80 Z" fill="#f9fafb" />
          </svg>
        </div>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block text-gold-300 font-semibold text-sm uppercase tracking-wider mb-4 animate-fade-in">
            South Florida MLS Listings
          </span>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-4 animate-slide-up">
            Find Your Dream Home
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-gold-300 to-gold-300 mt-2">
              Browse Available Properties
            </span>
          </h1>
          {/* Hero count */}
          <p className="text-white/80 text-xl max-w-xl mx-auto leading-relaxed mb-8 animate-fade-in">
            <span className="font-bold text-white text-2xl animate-count-up">
              <AnimatedCount target={totalCount} />
            </span>
            {' '}active listings in South Florida
          </p>

          {/* ── Hero Search Bar ── */}
          <div className="animate-slide-up max-w-2xl mx-auto">
            <CitySearch
              value={filters.city || ''}
              onChange={(city) => setFilters(f => ({ ...f, city: city || null }))}
            />
          </div>

          {/* ── Hero Quick Filters ── */}
          <div className="animate-slide-up mt-4 max-w-3xl mx-auto">
            <div className="relative rounded-2xl px-5 py-4"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.05) 100%)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: '1px solid rgba(212,175,55,0.35)',
                boxShadow: '0 4px 32px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.12), 0 0 0 1px rgba(212,175,55,0.10)',
              }}
            >
              {/* Gold shimmer top edge */}
              <div className="absolute top-0 left-8 right-8 h-px rounded-full"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.7), transparent)' }}
              />

              <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-0">

                {/* Buy / Rent */}
                <div className="flex gap-1.5 flex-shrink-0">
                  {[
                    { value: 'buy',  label: '🏠', text: 'Buy' },
                    { value: 'rent', label: '🔑', text: 'Rent' },
                    { value: 'all',  label: '✦',  text: 'All' },
                  ].map(({ value, label, text }) => {
                    const active = (filters.listingType || 'buy') === value
                    return (
                      <button
                        key={value}
                        onClick={() => setFilters(f => ({ ...f, listingType: value }))}
                        className="relative px-4 py-2 rounded-full text-sm font-bold transition-all duration-200"
                        style={active ? {
                          background: 'linear-gradient(135deg, #D4AF37 0%, #F0C040 50%, #D4AF37 100%)',
                          color: '#0d1b35',
                          boxShadow: '0 0 18px rgba(212,175,55,0.55), 0 2px 8px rgba(0,0,0,0.3)',
                          border: '1px solid rgba(212,175,55,0.8)',
                          transform: 'translateY(-1px)',
                        } : {
                          background: 'rgba(255,255,255,0.08)',
                          color: 'rgba(255,255,255,0.75)',
                          border: '1px solid rgba(255,255,255,0.15)',
                        }}
                        onMouseEnter={e => { if (!active) { e.currentTarget.style.background='rgba(212,175,55,0.18)'; e.currentTarget.style.color='rgba(255,255,255,1)'; e.currentTarget.style.border='1px solid rgba(212,175,55,0.4)'; e.currentTarget.style.boxShadow='0 0 10px rgba(212,175,55,0.2)' }}}
                        onMouseLeave={e => { if (!active) { e.currentTarget.style.background='rgba(255,255,255,0.08)'; e.currentTarget.style.color='rgba(255,255,255,0.75)'; e.currentTarget.style.border='1px solid rgba(255,255,255,0.15)'; e.currentTarget.style.boxShadow='none' }}}
                      >
                        <span className="mr-1">{label}</span>{text}
                      </button>
                    )
                  })}
                </div>

                {/* Divider */}
                <div className="hidden sm:block w-px self-stretch mx-4 flex-shrink-0"
                  style={{ background: 'linear-gradient(to bottom, transparent, rgba(212,175,55,0.4), transparent)' }}
                />
                <div className="sm:hidden h-px w-full"
                  style={{ background: 'linear-gradient(to right, transparent, rgba(212,175,55,0.4), transparent)' }}
                />

                {/* Beds + Baths column */}
                <div className="flex flex-col gap-2 flex-1 min-w-0">

                  {/* Beds row */}
                  <div className="flex items-center gap-2 flex-wrap justify-center sm:justify-start">
                    <span className="text-xs font-bold uppercase tracking-widest flex-shrink-0"
                      style={{ color: 'rgba(212,175,55,0.8)', minWidth: '2.5rem' }}>
                      Bed
                    </span>
                    <div className="flex gap-1 flex-wrap">
                      {BED_OPTIONS.map(n => {
                        const active = filters.beds === n
                        return (
                          <button
                            key={n}
                            onClick={() => setFilters(f => ({ ...f, beds: active ? 0 : n }))}
                            className="px-2.5 py-1 rounded-full text-xs font-semibold transition-all duration-200"
                            style={active ? {
                              background: 'rgba(255,255,255,0.95)',
                              color: '#0d1b35',
                              fontWeight: 700,
                              boxShadow: '0 0 12px rgba(212,175,55,0.4), 0 2px 6px rgba(0,0,0,0.2)',
                              border: '1px solid rgba(212,175,55,0.6)',
                              transform: 'translateY(-1px) scale(1.05)',
                            } : {
                              background: 'rgba(255,255,255,0.08)',
                              color: 'rgba(255,255,255,0.70)',
                              border: '1px solid rgba(255,255,255,0.15)',
                            }}
                            onMouseEnter={e => { if (!active) { e.currentTarget.style.background='rgba(255,255,255,0.16)'; e.currentTarget.style.color='rgba(255,255,255,1)'; e.currentTarget.style.borderColor='rgba(212,175,55,0.35)'; e.currentTarget.style.boxShadow='0 0 8px rgba(212,175,55,0.15)' }}}
                            onMouseLeave={e => { if (!active) { e.currentTarget.style.background='rgba(255,255,255,0.08)'; e.currentTarget.style.color='rgba(255,255,255,0.70)'; e.currentTarget.style.borderColor='rgba(255,255,255,0.15)'; e.currentTarget.style.boxShadow='none' }}}
                          >
                            {n === 0 ? 'Any' : `${n}+`}
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  {/* Baths row */}
                  <div className="flex items-center gap-2 flex-wrap justify-center sm:justify-start">
                    <span className="text-xs font-bold uppercase tracking-widest flex-shrink-0"
                      style={{ color: 'rgba(212,175,55,0.8)', minWidth: '2.5rem' }}>
                      Bath
                    </span>
                    <div className="flex gap-1 flex-wrap">
                      {BATH_OPTIONS.map(n => {
                        const active = filters.baths === n
                        return (
                          <button
                            key={n}
                            onClick={() => setFilters(f => ({ ...f, baths: active ? 0 : n }))}
                            className="px-2.5 py-1 rounded-full text-xs font-semibold transition-all duration-200"
                            style={active ? {
                              background: 'rgba(255,255,255,0.95)',
                              color: '#0d1b35',
                              fontWeight: 700,
                              boxShadow: '0 0 12px rgba(212,175,55,0.4), 0 2px 6px rgba(0,0,0,0.2)',
                              border: '1px solid rgba(212,175,55,0.6)',
                              transform: 'translateY(-1px) scale(1.05)',
                            } : {
                              background: 'rgba(255,255,255,0.08)',
                              color: 'rgba(255,255,255,0.70)',
                              border: '1px solid rgba(255,255,255,0.15)',
                            }}
                            onMouseEnter={e => { if (!active) { e.currentTarget.style.background='rgba(255,255,255,0.16)'; e.currentTarget.style.color='rgba(255,255,255,1)'; e.currentTarget.style.borderColor='rgba(212,175,55,0.35)'; e.currentTarget.style.boxShadow='0 0 8px rgba(212,175,55,0.15)' }}}
                            onMouseLeave={e => { if (!active) { e.currentTarget.style.background='rgba(255,255,255,0.08)'; e.currentTarget.style.color='rgba(255,255,255,0.70)'; e.currentTarget.style.borderColor='rgba(255,255,255,0.15)'; e.currentTarget.style.boxShadow='none' }}}
                          >
                            {n === 0 ? 'Any' : `${n}+`}
                          </button>
                        )
                      })}
                    </div>
                  </div>

                </div>
              </div>

              {/* Gold shimmer bottom edge */}
              <div className="absolute bottom-0 left-8 right-8 h-px rounded-full"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.3), transparent)' }}
              />
            </div>
          </div>

        </div>
      </section>

      {/* ══ STICKY GLASS FILTER BAR ══ */}
      <div className="glass-bar sticky top-16 md:top-20 z-40 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Top row: controls */}
          <div className="flex items-center gap-3 flex-wrap">

            {/* Mobile: filter drawer button */}
            <button
              onClick={() => setDrawerOpen(true)}
              className="md:hidden flex items-center gap-2 px-4 py-2 bg-navy-600 text-white rounded-xl text-sm font-semibold shadow-sm"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              Filters {activeCount > 0 && `(${activeCount})`}
            </button>

            {/* Desktop: compact secondary controls */}
            <div className="hidden md:flex items-center gap-2 flex-wrap flex-1">

              {/* Property Type */}
              <div className="relative">
                <select
                  value={filters.propType || 'all'}
                  onChange={(e) => setFilters(f => ({ ...f, propType: e.target.value }))}
                  className="appearance-none pl-3 pr-7 py-1.5 border border-gray-200 rounded-lg text-xs text-gray-700 bg-white hover:border-navy-400 focus:border-navy-500 outline-none cursor-pointer"
                >
                  {PROPERTY_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                </select>
                <svg className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>

              {/* Clear */}
              {hasFilters && (
                <button
                  onClick={clearAll}
                  className="text-xs text-gold-600 hover:text-gold-800 font-semibold flex items-center gap-1 transition-colors"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                  Clear all
                </button>
              )}
            </div>

            {/* Right: Sort + View */}
            <div className="flex items-center gap-2 ml-auto">
              {/* Results count */}
              <span className="hidden sm:block text-xs text-gray-500 whitespace-nowrap">
                {loading ? 'Loading…' : (
                  <><span className="font-bold text-gray-800"><AnimatedCount target={listings.length} /></span>{' '}of{' '}<span className="font-bold text-gray-800"><AnimatedCount target={totalCount} /></span> listings</>
                )}
              </span>

              {/* Sort */}
              <div className="relative">
                <select
                  value={sort}
                  onChange={(e) => { setSort(e.target.value); setPage(1) }}
                  className="appearance-none pl-3 pr-7 py-2 border border-gray-200 rounded-xl text-xs text-gray-700 bg-white hover:border-navy-400 focus:border-navy-500 outline-none cursor-pointer shadow-sm"
                >
                  {SORT_OPTIONS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                </select>
                <svg className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>

              {/* View switcher */}
              <ViewSwitcher view={view} onChange={setView} />
            </div>
          </div>

          {/* Active filter tags row */}
          {activeTags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-2.5 pt-2.5 border-t border-gray-100">
              {activeTags.map(tag => (
                <FilterTag key={tag.key} label={tag.label} onRemove={tag.clear} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ══ MAIN CONTENT AREA ══ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">

          {/* ── DESKTOP SIDEBAR FILTERS ── */}
          <aside className="hidden lg:block w-72 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-md sticky top-44 max-h-[calc(100vh-12rem)] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="font-display font-bold text-lg text-gray-900">Filters</h2>
                  {hasFilters && (
                    <button onClick={clearAll} className="text-xs text-gold-600 hover:text-gold-800 font-semibold transition-colors">
                      Clear all
                    </button>
                  )}
                </div>

                {/* City search in sidebar */}
                <div className="mb-5">
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Location</label>
                  <CitySearch
                    value={filters.city || ''}
                    onChange={(city) => setFilters(f => ({ ...f, city: city || null }))}
                  />
                </div>

                <FilterPanel filters={filters} setFilters={setFilters} />
              </div>
            </div>
          </aside>

          {/* ── RESULTS AREA ── */}
          <div className="flex-1 min-w-0">

            {/* Stats bar */}
            {!loading && listings.length > 0 && (
              <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
                <QuickStats listings={listings} totalCount={totalCount} loading={loading} />
                <span className="text-sm text-gray-500">
                  Page <span className="font-semibold text-gray-700">{page}</span> of <span className="font-semibold text-gray-700">{totalPages || 1}</span>
                </span>
              </div>
            )}

            {/* Map placeholder */}
            {view === 'map' && (
              <div className="rounded-2xl overflow-hidden shadow-lg mb-8 h-96 bg-gradient-to-br from-navy-100 to-gold-100 flex flex-col items-center justify-center gap-4 border border-navy-200">
                <svg className="w-16 h-16 text-navy-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                <div className="text-center">
                  <p className="font-display font-bold text-xl text-navy-700">Map View</p>
                  <p className="text-navy-600/70 text-sm mt-1">Interactive map coming soon</p>
                </div>
                <button onClick={() => setView('grid')} className="px-5 py-2 bg-navy-600 text-white rounded-xl text-sm font-semibold hover:bg-navy-700 transition-colors">
                  Back to Grid
                </button>
              </div>
            )}

            {/* Loading skeletons */}
            {loading && (
              <div className={view === 'list' ? 'flex flex-col gap-4' : 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6'}>
                {[...Array(6)].map((_, i) =>
                  view === 'list' ? <SkeletonList key={i} /> : <SkeletonCard key={i} />
                )}
              </div>
            )}

            {/* Error */}
            {error && !loading && (
              <div className="text-center py-20">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h3 className="font-display text-xl font-bold text-gray-900 mb-2">Unable to Load Listings</h3>
                <p className="text-gray-500 mb-6 max-w-md mx-auto text-sm">{error}</p>
                <Link to="/contact" className="btn-primary">Contact Us for Available Properties</Link>
              </div>
            )}

            {/* Empty state */}
            {!loading && !error && listings.length === 0 && (
              <div className="text-center py-20">
                <div className="w-16 h-16 bg-navy-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-navy-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <h3 className="font-display text-xl font-bold text-gray-900 mb-2">No Listings Match Your Filters</h3>
                <p className="text-gray-500 mb-6 text-sm">Try adjusting or clearing some of your search criteria.</p>
                <button onClick={clearAll} className="btn-primary">Clear All Filters</button>
              </div>
            )}

            {/* Results grid / list */}
            {!loading && !error && listings.length > 0 && (
              <>
                <div className={view === 'list'
                  ? 'flex flex-col gap-4'
                  : 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6'
                }>
                  {listings.map((listing, i) => (
                    <PropertyCard
                      key={listing.ListingKey || listing.ListingId || i}
                      listing={listing}
                      index={i}
                      view={view === 'map' ? 'grid' : view}
                    />
                  ))}
                </div>

                <Pagination page={page} totalPages={totalPages} onChange={(p) => { setPage(p); window.scrollTo({ top: 0, behavior: 'smooth' }) }} />
              </>
            )}
          </div>
        </div>
      </div>

      {/* ══ MOBILE FILTER DRAWER ══ */}
      <MobileFilterDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        filters={filters}
        setFilters={setFilters}
        onClear={clearAll}
        activeCount={activeCount}
      />

      {/* ══ CTA ══ */}
      <section className="py-16 bg-gradient-to-r from-navy-700 via-navy-600 to-navy-700 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-gold-300 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
            Don't See What You're Looking For?
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
            We have access to listings not yet on the market. Contact us and tell us exactly what you need.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gold-500 text-white font-bold rounded-xl hover:bg-gold-600 transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 text-lg"
            >
              Contact Us Now
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
        </div>
      </section>
    </div>
  )
}
