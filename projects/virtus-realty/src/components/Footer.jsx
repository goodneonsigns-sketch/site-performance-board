import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.svg'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-navy-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              {/* Logo — inverted to gold/white on dark background */}
              <img
                src={logo}
                alt="Virtus Realty Group"
                className="h-10 w-auto"
                style={{ filter: 'brightness(0) saturate(100%) invert(70%) sepia(40%) saturate(600%) hue-rotate(5deg) brightness(95%)' }}
              />
              <div>
                <div className="font-display font-bold text-white text-lg leading-tight">Virtus Realty Group</div>
                <div className="text-gold-400 text-xs font-medium">South Florida Real Estate</div>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-4">
              South Florida's trusted real estate experts. Serving Miami-Dade, Broward, Palm Beach, and St. Lucie counties with integrity and excellence.
            </p>
            <div className="flex gap-3">
              <a href="#" aria-label="Facebook" className="w-9 h-9 rounded-lg bg-navy-800 flex items-center justify-center text-gray-400 hover:bg-gold-500 hover:text-navy-900 transition-all duration-200">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
              </a>
              <a href="#" aria-label="Instagram" className="w-9 h-9 rounded-lg bg-navy-800 flex items-center justify-center text-gray-400 hover:bg-gold-500 hover:text-navy-900 transition-all duration-200">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" fill="none" stroke="currentColor" strokeWidth="2"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
              </a>
              <a href="#" aria-label="LinkedIn" className="w-9 h-9 rounded-lg bg-navy-800 flex items-center justify-center text-gray-400 hover:bg-gold-500 hover:text-navy-900 transition-all duration-200">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { to: '/', label: 'Home' },
                { to: '/about', label: 'About Our Team' },
                { to: '/services', label: 'Services' },
                { to: '/listings', label: 'Property Listings' },
                { to: '/areas', label: 'Areas We Serve' },
                { to: '/blog', label: 'Blog & Market News' },
                { to: '/contact', label: 'Contact' },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="text-sm text-gray-400 hover:text-gold-400 transition-colors duration-200 flex items-center gap-1.5">
                    <span className="text-gold-500">›</span> {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Services</h3>
            <ul className="space-y-2">
              {[
                { label: 'Residential Sales', to: '/services' },
                { label: 'Investment Properties', to: '/services' },
                { label: 'Luxury Real Estate', to: '/services' },
                { label: 'First-Time Home Buyers', to: '/first-time-buyer' },
                { label: 'Free Home Valuation', to: '/sell' },
                { label: 'Market Analysis', to: '/blog' },
                { label: 'Title & Escrow', to: '/title-escrow' },
              ].map(({ label, to }) => (
                <li key={label}>
                  <Link to={to} className="text-sm text-gray-400 hover:text-gold-400 transition-colors duration-200 flex items-center gap-1.5">
                    <span className="text-gold-500">›</span> {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Contact</h3>
            <ul className="space-y-3">
              <li>
                <a href="tel:9546004976" className="text-sm text-gray-400 hover:text-white transition-colors flex items-start gap-2">
                  <svg className="w-4 h-4 text-gold-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  (954) 600-4976
                </a>
              </li>
              <li>
                <a href="mailto:info@virtusrealtygroup.com" className="text-sm text-gray-400 hover:text-white transition-colors flex items-start gap-2">
                  <svg className="w-4 h-4 text-gold-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  info@virtusrealtygroup.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 text-gold-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-sm text-gray-400">Miami-Dade · Broward · Palm Beach · St. Lucie</span>
              </li>
            </ul>
            <Link
              to="/contact"
              className="mt-5 inline-block px-5 py-2.5 bg-gold-500 text-navy-900 text-sm font-semibold rounded-lg hover:bg-gold-600 transition-colors duration-200"
            >
              Free Consultation →
            </Link>
          </div>
        </div>

        {/* Trust & Credentials Strip */}
        <div className="mt-12 pt-8 border-t border-navy-800">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            {/* Logos: NAR + BeachesMLS */}
            <div className="flex items-center gap-6">
              <img
                src="/logos/nar-realtor-white.png"
                alt="REALTOR® — National Association of Realtors Member"
                className="h-10 w-auto"
                style={{ opacity: 0.7 }}
                title="Licensed REALTOR® — NAR Member"
              />
              <div className="w-px h-8 bg-navy-700" />
              <img
                src="/logos/beaches-mls-logo.png"
                alt="BeachesMLS Member"
                className="h-8 w-auto"
                style={{ filter: 'brightness(0) invert(1)', opacity: 0.7 }}
                title="BeachesMLS Member"
              />
            </div>

            {/* Flags: Markets Served */}
            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-600 uppercase tracking-wider mr-1 hidden sm:inline">Markets</span>
              <img
                src="/flags/us-flag.svg"
                alt="United States"
                className="h-5 w-auto rounded-sm opacity-80 hover:opacity-100 transition-opacity"
                title="United States"
              />
              <img
                src="/flags/florida-flag.svg"
                alt="Florida"
                className="h-5 w-auto rounded-sm opacity-80 hover:opacity-100 transition-opacity"
                title="Florida"
              />
              <img
                src="/flags/dr-flag.svg"
                alt="Dominican Republic"
                className="h-5 w-auto rounded-sm opacity-80 hover:opacity-100 transition-opacity"
                title="Dominican Republic"
              />
              <img
                src="/flags/cuba-flag.svg"
                alt="Cuba"
                className="h-5 w-auto rounded-sm opacity-80 hover:opacity-100 transition-opacity"
                title="Cuba"
              />
              <img
                src="/flags/ecuador-flag.svg"
                alt="Ecuador"
                className="h-5 w-auto rounded-sm opacity-80 hover:opacity-100 transition-opacity"
                title="Ecuador"
              />
            </div>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="mt-6 pt-6 border-t border-navy-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-center sm:text-left">
            <p className="text-sm text-white font-semibold">
              Virtus Realty Group — Brokered by Alexis Hernandez
            </p>
            <p className="text-xs text-gray-500 mt-1">
              © {currentYear} Virtus Realty Group · Nicolas Gonzalez, Licensed Realtor · All rights reserved.
            </p>
          </div>
          <p className="text-xs text-gray-600">
            Serving South Florida with integrity since day one.
          </p>
        </div>
      </div>
    </footer>
  )
}
