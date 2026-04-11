import React, { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import logo from '../assets/logo.svg'
import { usePropertyContext } from '../context/PropertyContext'

// ─── Menu Structure ───────────────────────────────────────────────────────────

const menuStructure = [
  {
    label: 'Buy',
    items: [
      { icon: '🏠', label: 'Browse Listings',          to: '/listings' },
      { icon: '🏙️', label: 'Condos for Sale',          to: '/condos' },
      { icon: '🏘️', label: 'Townhomes for Sale',       to: '/townhomes' },
      { icon: '🏗️', label: 'New Construction',         to: '/new-construction' },
      { icon: '📈', label: 'Investment Properties',    to: '/investment' },
      { icon: '📖', label: 'First-Time Buyer Guide',   to: '/first-time-buyer' },
      { icon: '🧮', label: 'Mortgage Calculator',      to: '/mortgage-calculator' },
      { icon: '✅', label: 'Get Pre-Approved',          to: '/financing' },
    ],
  },
  {
    label: 'Sell',
    items: [
      { icon: '💰', label: 'Free Home Valuation',     to: '/sell' },
      { icon: '🤝', label: 'Why Sell With Us',         to: '/sell' },
      { icon: '📊', label: 'Market Insights',          to: '/blog' },
    ],
  },
  {
    label: '🇩🇴 Dominican Properties',
    items: [
      { icon: '🏝️', label: 'Dominican Republic',      to: '/dominican-republic' },
      { icon: '🏛️', label: 'Zona Colonial',           to: '/zona-colonial' },
      { icon: '🏖️', label: 'Santo Domingo',           to: '/dominican-republic#santo-domingo' },
      { icon: '🌴', label: 'Punta Cana',               to: '/dominican-republic#punta-cana' },
      { icon: '💰', label: 'Investment Opportunities', to: '/dominican-republic#investment' },
    ],
  },
  {
    label: '💰 Investor Packages',
    items: [
      { icon: '📈', label: 'Investment Overview',              to: '/investor-packages' },
      { icon: '🏠', label: 'Starter ($50K–$150K)',             to: '/investor-packages#packages' },
      { icon: '🌴', label: 'Growth ($150K–$500K)',             to: '/investor-packages#packages' },
      { icon: '🏝️', label: 'Premium ($500K+)',                 to: '/investor-packages#packages' },
      { icon: '🏛️', label: 'CONFOTUR Tax Benefits',            to: '/investor-packages' },
      { icon: '🏦', label: 'APAP Portfolio — 27 Properties',   to: '/investor-packages/apap-portfolio' },
    ],
  },
  {
    label: '🔍 Research',
    items: [
      { icon: '🔬', label: 'Distressed Property Intelligence', to: '/research' },
      { icon: '📊', label: 'Distress Score Model',             to: '/research#the-model' },
      { icon: '🤖', label: 'Jackie AI',                        to: '/research#jackie-ai' },
      { icon: '📝', label: 'Get Early Access',                 to: '/research#apply' },
    ],
  },
  {
    label: 'About',
    items: [
      { icon: '🏢', label: 'About Us',       to: '/about' },
      { icon: '👥', label: 'Our Team',       to: '/about#team' },
      { icon: '✍️',  label: 'Blog',           to: '/blog' },
      { icon: '📬', label: 'Contact',        to: '/contact' },
      { icon: '📋', label: 'Title & Escrow', to: '/title-escrow' },
    ],
  },
  {
    label: 'Areas',
    isAreas: true,
    counties: [
      {
        label: 'Miami-Dade County',
        slug: 'miami-dade-county',
        neighborhoods: [
          { label: 'Miami Beach',  slug: 'miami-beach' },
          { label: 'Brickell',     slug: 'brickell' },
          { label: 'Coral Gables', slug: 'coral-gables' },
        ],
      },
      {
        label: 'Broward County',
        slug: 'broward-county',
        neighborhoods: [
          { label: 'Fort Lauderdale', slug: 'fort-lauderdale' },
          { label: 'Hollywood',       slug: 'hollywood' },
          { label: 'Weston',          slug: 'weston' },
        ],
      },
      {
        label: 'Palm Beach County',
        slug: 'palm-beach-county',
        neighborhoods: [
          { label: 'Boca Raton',      slug: 'boca-raton' },
          { label: 'West Palm Beach', slug: 'west-palm-beach' },
          { label: 'Delray Beach',    slug: 'delray-beach' },
        ],
      },
      {
        label: 'St. Lucie County',
        slug: 'st-lucie-county',
        neighborhoods: [
          { label: 'Port St. Lucie', slug: 'port-st-lucie' },
          { label: 'Stuart',         slug: 'stuart' },
        ],
      },
    ],
  },
]

// ─── Dropdown Panel (desktop) ─────────────────────────────────────────────────

function DropdownPanel({ menu, solid, onClose }) {
  if (menu.isAreas) {
    return (
      <div
        className="absolute top-full left-0 mt-0 w-[560px] bg-navy-800 text-white rounded-b-xl shadow-2xl border-t-2 border-gold-500 animate-fade-in z-50"
        style={{ animation: 'megaSlideDown 0.2s ease-out both' }}
      >
        <div className="p-5 grid grid-cols-2 gap-4">
          {menu.counties.map((county) => (
            <div key={county.slug}>
              <Link
                to={`/homes-for-sale/${county.slug}`}
                onClick={onClose}
                className="flex items-center gap-2 text-sm font-semibold text-white hover:text-gold-400 transition-colors duration-150 mb-1.5"
              >
                <span className="text-gold-500">📍</span>
                {county.label}
              </Link>
              <div className="flex flex-wrap gap-x-2 gap-y-0.5 pl-6">
                {county.neighborhoods.map((n, i) => (
                  <React.Fragment key={n.slug}>
                    <Link
                      to={`/homes-for-sale/${n.slug}`}
                      onClick={onClose}
                      className="text-xs text-white/60 hover:text-gold-400 transition-colors duration-150"
                    >
                      {n.label}
                    </Link>
                    {i < county.neighborhoods.length - 1 && (
                      <span className="text-white/30 text-xs">·</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div
      className="absolute top-full left-0 mt-0 w-64 bg-navy-800 text-white rounded-b-xl shadow-2xl border-t-2 border-gold-500 z-50"
      style={{ animation: 'megaSlideDown 0.2s ease-out both' }}
    >
      <ul className="py-2">
        {menu.items.map((item) => (
          <li key={item.to + item.label}>
            <Link
              to={item.to}
              onClick={onClose}
              className="flex items-center gap-3 px-4 py-2.5 text-sm text-white/90 hover:text-white hover:bg-white/10 hover:pl-5 transition-all duration-150"
            >
              <span className="text-base leading-none w-5 flex-shrink-0">{item.icon}</span>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

// ─── Desktop Menu Item ────────────────────────────────────────────────────────

function DesktopMenuItem({ menu, solid }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const timerRef = useRef(null)

  const handleMouseEnter = () => {
    clearTimeout(timerRef.current)
    setOpen(true)
  }

  const handleMouseLeave = () => {
    timerRef.current = setTimeout(() => setOpen(false), 120)
  }

  // Close on outside click
  useEffect(() => {
    if (!open) return
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
          open
            ? solid
              ? 'bg-navy-100 text-navy-800'
              : 'bg-white/20 text-white'
            : solid
              ? 'text-gray-600 hover:text-navy-800 hover:bg-navy-50'
              : 'text-white/90 hover:text-white hover:bg-white/10'
        }`}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        {menu.label}
        <svg
          className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <DropdownPanel
          menu={menu}
          solid={solid}
          onClose={() => setOpen(false)}
        />
      )}
    </div>
  )
}

// ─── Mobile Accordion Item ────────────────────────────────────────────────────

function MobileMenuItem({ menu, onClose }) {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center justify-between w-full px-4 py-3 rounded-lg text-sm font-semibold text-navy-800 hover:bg-navy-50 transition-colors duration-150"
        aria-expanded={open}
      >
        {menu.label}
        <svg
          className={`w-4 h-4 text-navy-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <div className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-screen' : 'max-h-0'}`}>
        {menu.isAreas ? (
          <div className="pl-4 pb-2 space-y-3">
            {menu.counties.map((county) => (
              <div key={county.slug} className="pl-2 border-l-2 border-gold-200">
                <Link
                  to={`/homes-for-sale/${county.slug}`}
                  onClick={onClose}
                  className="flex items-center gap-1.5 py-1 text-sm font-semibold text-navy-800 hover:text-gold-600 transition-colors"
                >
                  <span className="text-gold-500">📍</span>
                  {county.label}
                </Link>
                <div className="flex flex-wrap gap-x-1.5 gap-y-0.5 pl-5 pb-0.5">
                  {county.neighborhoods.map((n, i) => (
                    <React.Fragment key={n.slug}>
                      <Link
                        to={`/homes-for-sale/${n.slug}`}
                        onClick={onClose}
                        className="text-xs text-gray-500 hover:text-gold-600 transition-colors"
                      >
                        {n.label}
                      </Link>
                      {i < county.neighborhoods.length - 1 && (
                        <span className="text-gray-300 text-xs">·</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <ul className="pl-4 pb-2 space-y-0.5">
            {menu.items.map((item) => (
              <li key={item.to + item.label}>
                <Link
                  to={item.to}
                  onClick={onClose}
                  className="flex items-center gap-2.5 px-3 py-2 text-sm text-gray-600 hover:text-navy-800 hover:bg-navy-50 rounded-lg transition-colors duration-150"
                >
                  <span className="text-sm leading-none">{item.icon}</span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

// ─── Main Navbar ──────────────────────────────────────────────────────────────

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'
  const { selectedProperties } = usePropertyContext()
  const compareCount = selectedProperties.length

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on navigation
  useEffect(() => {
    setMobileOpen(false)
  }, [location])

  const solid = scrolled || !isHome

  return (
    <>
      {/* Keyframe injection via inline style tag */}
      <style>{`
        @keyframes megaSlideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          solid ? 'bg-white shadow-md' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">

            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-3 group flex-shrink-0"
              aria-label="Virtus Realty Group — Home"
            >
              <img
                src={logo}
                alt="Virtus Realty Group"
                className="h-10 w-auto transition-all duration-300"
                style={solid ? {} : { filter: 'brightness(0) invert(1)' }}
              />
              <div className="flex flex-col">
                <span
                  className={`font-display font-bold text-lg leading-none transition-colors duration-300 ${
                    solid ? 'text-navy-800' : 'text-white'
                  }`}
                >
                  Virtus Realty Group
                </span>
                <span
                  className={`text-xs font-medium leading-tight transition-colors duration-300 ${
                    solid ? 'text-gold-500' : 'text-white/80'
                  }`}
                >
                  South Florida Real Estate
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-0.5">
              {menuStructure.map((menu) => (
                <DesktopMenuItem key={menu.label} menu={menu} solid={solid} />
              ))}

              {/* Compare badge */}
              {compareCount > 0 && (
                <NavLink
                  to="/compare"
                  className={({ isActive }) =>
                    `relative px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ml-1 ${
                      isActive
                        ? solid
                          ? 'bg-gold-100 text-gold-700'
                          : 'bg-gold-400/20 text-gold-200'
                        : solid
                          ? 'text-gold-600 hover:text-gold-700 hover:bg-gold-50'
                          : 'text-gold-200 hover:text-gold-100 hover:bg-gold-400/10'
                    }`
                  }
                >
                  Compare
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-gold-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center leading-none">
                    {compareCount}
                  </span>
                </NavLink>
              )}

              {/* Free Valuation CTA */}
              <Link
                to="/sell"
                className="ml-3 px-5 py-2 bg-gold-500 text-navy-900 text-sm font-semibold rounded-lg hover:bg-gold-600 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                Free Valuation
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className={`md:hidden p-2 rounded-lg transition-colors duration-200 ${
                solid ? 'text-navy-800 hover:bg-navy-50' : 'text-white hover:bg-white/10'
              }`}
              aria-label="Toggle menu"
            >
              <div className="w-6 h-5 flex flex-col justify-between">
                <span
                  className={`block h-0.5 w-full transition-all duration-300 ${
                    solid ? 'bg-navy-800' : 'bg-white'
                  } ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`}
                />
                <span
                  className={`block h-0.5 transition-all duration-300 ${
                    solid ? 'bg-navy-800' : 'bg-white'
                  } ${mobileOpen ? 'opacity-0 w-0' : 'w-full'}`}
                />
                <span
                  className={`block h-0.5 w-full transition-all duration-300 ${
                    solid ? 'bg-navy-800' : 'bg-white'
                  } ${mobileOpen ? '-rotate-45 -translate-y-3' : ''}`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-300 overflow-hidden ${
            mobileOpen ? 'max-h-[80vh] overflow-y-auto' : 'max-h-0'
          }`}
        >
          <div className="bg-white border-t border-gray-100 px-4 py-4 space-y-1 shadow-lg">
            {menuStructure.map((menu) => (
              <MobileMenuItem
                key={menu.label}
                menu={menu}
                onClose={() => setMobileOpen(false)}
              />
            ))}

            {/* Compare in mobile */}
            {compareCount > 0 && (
              <NavLink
                to="/compare"
                className={({ isActive }) =>
                  `flex items-center justify-between px-4 py-3 rounded-lg text-sm font-semibold transition-colors duration-200 ${
                    isActive ? 'bg-gold-100 text-gold-700' : 'text-gold-600 hover:bg-gold-50'
                  }`
                }
              >
                <span>Compare Properties</span>
                <span className="w-5 h-5 bg-gold-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {compareCount}
                </span>
              </NavLink>
            )}

            <Link
              to="/sell"
              onClick={() => setMobileOpen(false)}
              className="block mt-3 px-4 py-3 bg-gold-500 text-navy-900 text-sm font-semibold rounded-lg text-center hover:bg-gold-600 transition-colors duration-200"
            >
              Get Free Home Valuation
            </Link>
          </div>
        </div>
      </nav>
    </>
  )
}
