import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePropertyContext } from '../context/PropertyContext'
import { getAllPhotoUrls, formatAddress } from '../hooks/useSparkListings'

function getFirstPhoto(listing) {
  const photos = getAllPhotoUrls(listing)
  return photos[0] || null
}

export default function SelectionBar() {
  const { selectedProperties, clearAll } = usePropertyContext()
  const navigate = useNavigate()
  const [visible, setVisible] = useState(false)

  // Animate in/out
  useEffect(() => {
    if (selectedProperties.length > 0) {
      setVisible(true)
    } else {
      const t = setTimeout(() => setVisible(false), 350)
      return () => clearTimeout(t)
    }
  }, [selectedProperties.length])

  if (!visible) return null

  const count = selectedProperties.length
  const showing = count > 0

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
        showing ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
      }`}
    >
      {/* Glassmorphism bar */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-4">
        <div
          className="rounded-2xl border border-white/20 shadow-2xl overflow-hidden"
          style={{
            background: 'rgba(10, 25, 60, 0.85)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
          }}
        >
          <div className="flex items-center gap-3 px-4 py-3 sm:px-6 flex-wrap sm:flex-nowrap">

            {/* Icon + count */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <div className="w-8 h-8 bg-gold-400/20 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-gold-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <span className="text-white font-bold text-sm sm:text-base whitespace-nowrap">
                <span className="text-gold-300">{count}</span> Propert{count === 1 ? 'y' : 'ies'} Selected
              </span>
            </div>

            {/* Mini thumbnails */}
            <div className="flex items-center gap-1.5 flex-grow overflow-hidden">
              {selectedProperties.slice(0, 4).map((listing, i) => {
                const photo = getFirstPhoto(listing)
                const address = formatAddress(listing)
                return (
                  <div
                    key={listing.ListingKey || listing.ListingId || i}
                    className="w-9 h-9 rounded-lg overflow-hidden border-2 border-white/20 flex-shrink-0 bg-navy-700"
                    title={address}
                  >
                    {photo ? (
                      <img
                        src={photo}
                        alt={address}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                        </svg>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-2 flex-shrink-0 ml-auto">
              {/* Compare */}
              <button
                onClick={() => navigate('/compare')}
                className="flex items-center gap-1.5 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm font-semibold rounded-xl transition-all duration-200"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                </svg>
                <span className="hidden sm:inline">Compare</span>
              </button>

              {/* Schedule */}
              <button
                onClick={() => navigate('/schedule-showing')}
                className="flex items-center gap-1.5 px-4 py-2 bg-gold-500 hover:bg-gold-600 text-navy-900 text-sm font-bold rounded-xl transition-all duration-200 shadow-lg"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="hidden sm:inline">Schedule Showing</span>
              </button>

              {/* Clear */}
              <button
                onClick={clearAll}
                className="w-8 h-8 flex items-center justify-center text-white/40 hover:text-white transition-colors"
                title="Clear selection"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
