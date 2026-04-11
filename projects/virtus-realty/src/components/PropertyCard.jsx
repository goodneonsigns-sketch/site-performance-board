import React, { useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import {
  formatAddress,
  formatCityStateZip,
  formatPrice,
  formatSqft,
  getPropertyTypeLabel,
  getAllPhotoUrls,
  getBeds,
  getBaths,
  getTypeColor,
} from '../hooks/useSparkListings'
import { usePropertyContext } from '../context/PropertyContext'

/* ─── Icons ─── */
function BedIcon() {
  return (
    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  )
}
function BathIcon() {
  return (
    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>
  )
}
function SqftIcon() {
  return (
    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
    </svg>
  )
}
function HeartIcon({ filled }) {
  return filled
    ? <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
    : <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
}

/* ─── Type badge color map ─── */
const TYPE_BADGE = {
  ocean:  'bg-navy-600/90 text-white',
  teal:   'bg-navy-700/90 text-white',
  coral:  'bg-gold-500/90 text-white',
  sunset: 'bg-gold-500/90 text-white',
  sand:   'bg-sand-500/90 text-white',
}
const TYPE_ACCENT = {
  ocean:  'border-l-navy-500',
  teal:   'border-l-gold-500',
  coral:  'border-l-gold-500',
  sunset: 'border-l-gold-500',
  sand:   'border-l-sand-500',
}

function NoImagePlaceholder() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 gap-2">
      <svg className="w-12 h-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
      <span className="text-xs font-medium text-gray-400 tracking-wide">No Image Available</span>
    </div>
  )
}

/* ─── Photo Carousel ─── */
function PhotoCarousel({ photos, address }) {
  const [current, setCurrent] = useState(0)
  const [imgErrors, setImgErrors] = useState({})

  const go = useCallback((dir, e) => {
    e.preventDefault()
    e.stopPropagation()
    setCurrent(c => (c + dir + photos.length) % photos.length)
  }, [photos.length])

  const handleError = (idx) => setImgErrors(prev => ({ ...prev, [idx]: true }))

  if (photos.length === 0) return <NoImagePlaceholder />

  return (
    <div className="relative w-full h-full select-none">
      {photos.map((url, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-300 ${i === current ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
        >
          {imgErrors[i] ? (
            <NoImagePlaceholder />
          ) : (
            <img
              src={url}
              alt={`${address} - photo ${i + 1}`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              onError={() => handleError(i)}
              loading="lazy"
            />
          )}
        </div>
      ))}

      {/* Navigation arrows — only if multiple photos */}
      {photos.length > 1 && (
        <>
          <button
            onClick={(e) => go(-1, e)}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full bg-black/40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-black/60"
            aria-label="Previous photo"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={(e) => go(1, e)}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full bg-black/40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-black/60"
            aria-label="Next photo"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Dots */}
          <div className="absolute bottom-14 left-0 right-0 z-20 flex items-center justify-center gap-1">
            {photos.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); setCurrent(i) }}
                className={`carousel-dot ${i === current ? 'carousel-dot-active' : ''}`}
                aria-label={`Photo ${i + 1}`}
              />
            ))}
          </div>

          {/* Photo count badge */}
          <div className="absolute top-3 left-3 z-20 bg-black/50 backdrop-blur-sm text-white text-xs font-medium px-2 py-0.5 rounded-full">
            {current + 1}/{photos.length}
          </div>
        </>
      )}
    </div>
  )
}

/* ─── Add to Compare Button ─── */
function CompareButton({ listing, compact = false }) {
  const { isSelected, addProperty, removeProperty, selectedProperties } = usePropertyContext()
  const key = listing.ListingKey || listing.ListingId
  const selected = isSelected(key)
  const atMax = selectedProperties.length >= 4 && !selected

  const handleClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (selected) {
      removeProperty(key)
    } else if (!atMax) {
      addProperty(listing)
    }
  }

  if (compact) {
    // Small badge for list view
    return (
      <button
        onClick={handleClick}
        disabled={atMax}
        title={atMax ? 'Max 4 properties for comparison' : selected ? 'Remove from comparison' : 'Add to Compare'}
        className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold border transition-all duration-200 ${
          selected
            ? 'bg-gold-500 border-gold-500 text-white'
            : atMax
            ? 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed'
            : 'bg-white border-gray-200 text-gray-600 hover:border-gold-400 hover:text-gold-600'
        }`}
      >
        {selected ? (
          <>
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            Added
          </>
        ) : (
          <>＋ Compare</>
        )}
      </button>
    )
  }

  // Full button for grid top-right overlay
  return (
    <button
      onClick={handleClick}
      disabled={atMax}
      title={atMax ? 'Max 4 properties for comparison' : selected ? 'Remove from comparison' : 'Add to Compare'}
      className={`absolute top-3 left-3 z-30 flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-bold backdrop-blur-sm shadow-md border transition-all duration-200 ${
        selected
          ? 'bg-gold-500/95 border-gold-400 text-white scale-105'
          : atMax
          ? 'bg-white/50 border-white/40 text-gray-400 cursor-not-allowed'
          : 'bg-black/40 border-white/20 text-white hover:bg-gold-500/90 hover:border-gold-400'
      }`}
    >
      {selected ? (
        <>
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          Added
        </>
      ) : (
        <>＋ Compare</>
      )}
    </button>
  )
}

/* ─── Price Reduced Badge (for cards) ─── */
function PriceReducedBadge({ listing, size = 'sm' }) {
  const orig = listing.OriginalListPrice
  const curr = listing.ListPrice
  if (!orig || !curr || orig <= curr) return null
  return (
    <span
      className={`inline-flex items-center gap-1 font-bold rounded-full ${
        size === 'xs'
          ? 'text-xs px-2 py-0.5'
          : 'text-xs px-2.5 py-1'
      }`}
      style={{
        background: 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)',
        color: '#166534',
        border: '1px solid #86efac',
      }}
    >
      📉 Reduced
    </span>
  )
}

/* ─── Grid Card (default) ─── */
export default function PropertyCard({ listing, featured = false, index = 0, view = 'grid' }) {
  const [saved, setSaved] = useState(false)
  const { isSelected } = usePropertyContext()
  const photos = getAllPhotoUrls(listing)
  const listingKey = listing.ListingKey || listing.ListingId
  const compareSelected = isSelected(listingKey)

  const address = formatAddress(listing)
  const cityStateZip = formatCityStateZip(listing)
  const price = formatPrice(listing.ListPrice)
  const sqft = formatSqft(listing.LivingArea)
  const typeLabel = getPropertyTypeLabel(listing.PropertyType)
  const beds = getBeds(listing)
  const baths = getBaths(listing)
  const typeColor = getTypeColor(listing.PropertyType)
  const badgeClass = TYPE_BADGE[typeColor] || TYPE_BADGE.navy
  const accentClass = TYPE_ACCENT[typeColor] || TYPE_ACCENT.navy

  const delay = Math.min(index % 12, 11) * 50
  const cardStyle = { animationDelay: `${delay}ms` }

  const detailPath = listing.ListingKey ? `/listings/${listing.ListingKey}` : null

  /* ── LIST VIEW ── */
  if (view === 'list') {
    const ListWrapper = detailPath
      ? ({ children }) => <Link to={detailPath} className={`animate-card-in bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex border-l-4 ${accentClass} ${compareSelected ? 'ring-2 ring-gold-400 ring-offset-1' : ''} group no-underline`} style={cardStyle}>{children}</Link>
      : ({ children }) => <div className={`animate-card-in bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex border-l-4 ${accentClass} ${compareSelected ? 'ring-2 ring-gold-400 ring-offset-1' : ''} group`} style={cardStyle}>{children}</div>
    return (
      <ListWrapper>
        {/* Photo */}
        <div className="relative w-52 flex-shrink-0 overflow-hidden">
          <PhotoCarousel photos={photos} address={address} />
          <button
            onClick={() => setSaved(s => !s)}
            className={`absolute top-2 right-2 z-30 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 shadow-md ${saved ? 'bg-gold-500 text-white' : 'bg-white/90 text-gray-400 hover:text-gold-500'}`}
            aria-label={saved ? 'Unsave' : 'Save'}
          >
            <HeartIcon filled={saved} />
          </button>
        </div>

        {/* Info */}
        <div className="flex flex-col flex-grow p-4 gap-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <div className="flex items-center flex-wrap gap-2">
                <p className="animate-price-pulse font-display font-bold text-xl text-gray-900">{price}</p>
                <PriceReducedBadge listing={listing} size="xs" />
              </div>
              {listing.OriginalListPrice && listing.ListPrice && listing.OriginalListPrice > listing.ListPrice && (
                <p className="text-xs text-gray-400">
                  Was <span className="line-through">{formatPrice(listing.OriginalListPrice)}</span>
                </p>
              )}
              <h3 className="text-sm font-semibold text-gray-800 truncate">{address}</h3>
              <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                <svg className="w-3 h-3 text-navy-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {cityStateZip}
              </p>
            </div>
            <span className={`flex-shrink-0 text-xs font-semibold px-2 py-0.5 rounded-full ${badgeClass}`}>
              {typeLabel}
            </span>
          </div>

          <div className="flex flex-wrap gap-2 mt-2">
            {beds != null && (
              <span className="flex items-center gap-1 text-xs text-gray-700 bg-navy-50 px-2 py-0.5 rounded-full">
                <BedIcon /><span className="font-semibold">{beds}</span> bd
              </span>
            )}
            {baths != null && (
              <span className="flex items-center gap-1 text-xs text-gray-700 bg-gold-50 px-2 py-0.5 rounded-full">
                <BathIcon /><span className="font-semibold">{baths}</span> ba
              </span>
            )}
            {sqft && (
              <span className="flex items-center gap-1 text-xs text-gray-700 bg-gray-50 px-2 py-0.5 rounded-full">
                <SqftIcon /><span className="font-semibold">{sqft}</span> sqft
              </span>
            )}
            {listing.YearBuilt && (
              <span className="text-xs text-gray-500 bg-gray-50 px-2 py-0.5 rounded-full">
                Built {listing.YearBuilt}
              </span>
            )}
            {listing.CountyOrParish && (
              <span className="text-xs text-gray-500 bg-gray-50 px-2 py-0.5 rounded-full">
                {listing.CountyOrParish}
              </span>
            )}
          </div>

          {listing.PublicRemarks && (
            <p className="text-xs text-gray-500 mt-1 leading-relaxed line-clamp-2 flex-grow">{listing.PublicRemarks}</p>
          )}

          <div className="flex items-center gap-2 mt-2">
            <Link
              to={detailPath || '/contact'}
              onClick={detailPath ? undefined : undefined}
              className="text-xs text-navy-700 font-semibold border border-navy-300 px-3 py-1.5 rounded-lg hover:bg-navy-600 hover:text-white hover:border-navy-600 transition-all duration-200"
            >
              {detailPath ? 'View Details →' : 'Schedule Tour →'}
            </Link>
            <CompareButton listing={listing} compact />
          </div>
        </div>
      </ListWrapper>
    )
  }

  /* ── GRID VIEW (default) ── */
  const GridOuter = detailPath
    ? ({ children }) => (
        <Link
          to={detailPath}
          className={`animate-card-in card overflow-hidden group flex flex-col h-full border-t-4 ${accentClass.replace('border-l-', 'border-t-')} ${compareSelected ? 'ring-2 ring-gold-400 ring-offset-1' : ''} no-underline`}
          style={cardStyle}
        >
          {children}
        </Link>
      )
    : ({ children }) => (
        <div
          className={`animate-card-in card overflow-hidden group flex flex-col h-full border-t-4 ${accentClass.replace('border-l-', 'border-t-')} ${compareSelected ? 'ring-2 ring-gold-400 ring-offset-1' : ''}`}
          style={cardStyle}
        >
          {children}
        </div>
      )
  return (
    <GridOuter>
      {/* Photo carousel */}
      <div className="relative h-52 overflow-hidden flex-shrink-0">
        <PhotoCarousel photos={photos} address={address} />

        {/* Price badge */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/65 to-transparent p-4 z-20">
          <div className="flex items-end gap-2 flex-wrap">
            <span className="animate-price-pulse text-white font-display font-bold text-xl drop-shadow">{price}</span>
            {listing.OriginalListPrice && listing.ListPrice && listing.OriginalListPrice > listing.ListPrice && (
              <span className="text-white/60 text-sm line-through drop-shadow">{formatPrice(listing.OriginalListPrice)}</span>
            )}
          </div>
        </div>

        {/* Price reduced overlay badge — bottom-left of photo area */}
        {listing.OriginalListPrice && listing.ListPrice && listing.OriginalListPrice > listing.ListPrice && (
          <div className="absolute top-3 left-3 z-25" style={{ zIndex: 25 }}>
            {!featured && (
              <span
                className="inline-flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full shadow"
                style={{
                  background: 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)',
                  color: '#166534',
                  border: '1px solid #86efac',
                }}
              >
                📉 Reduced
              </span>
            )}
          </div>
        )}

        {/* Type badge */}
        <div className="absolute top-3 right-3 z-20">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full backdrop-blur-sm ${badgeClass}`}>
            {typeLabel}
          </span>
        </div>

        {/* Compare button (top-left, slides over featured badge when not featured) */}
        {!featured && <CompareButton listing={listing} />}

        {featured && (
          <div className="absolute top-3 left-3 z-20">
            <span className="bg-gold-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">⭐ Featured</span>
          </div>
        )}

        {/* Save button */}
        <button
          onClick={() => setSaved(s => !s)}
          className={`absolute bottom-3 right-3 z-30 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 shadow-md ${saved ? 'bg-gold-500 text-white' : 'bg-white/90 text-gray-400 hover:text-gold-500'}`}
          aria-label={saved ? 'Unsave listing' : 'Save listing'}
        >
          <HeartIcon filled={saved} />
        </button>
      </div>

      {/* Card Body */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex-grow">
          <h3 className="font-semibold text-gray-900 text-base leading-snug">
            {address || 'Address Not Available'}
          </h3>
          <p className="text-sm text-gray-500 mt-0.5 flex items-center gap-1">
            <svg className="w-3.5 h-3.5 text-navy-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {cityStateZip || 'Location N/A'}
          </p>

          {/* Stats */}
          <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-gray-100">
            {beds != null && (
              <span className="flex items-center gap-1.5 text-sm text-gray-700 bg-navy-50 px-2.5 py-1 rounded-full">
                <BedIcon /><span className="font-semibold">{beds}</span> bd
              </span>
            )}
            {baths != null && (
              <span className="flex items-center gap-1.5 text-sm text-gray-700 bg-gold-50 px-2.5 py-1 rounded-full">
                <BathIcon /><span className="font-semibold">{baths}</span> ba
              </span>
            )}
            {sqft && (
              <span className="flex items-center gap-1.5 text-sm text-gray-700 bg-gray-50 px-2.5 py-1 rounded-full">
                <SqftIcon /><span className="font-semibold">{sqft}</span> sqft
              </span>
            )}
          </div>

          {listing.PublicRemarks && (
            <p className="text-xs text-gray-500 mt-3 leading-relaxed line-clamp-2">{listing.PublicRemarks}</p>
          )}
        </div>

        <div className="flex gap-2 mt-4">
          <Link
            to={detailPath || '/contact'}
            className="flex-1 block text-center py-2.5 border-2 border-navy-600 text-navy-700 text-sm font-semibold rounded-lg hover:bg-navy-600 hover:text-white transition-all duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {detailPath ? 'View Details' : 'Schedule a Tour'}
          </Link>
          <CompareButton listing={listing} compact />
        </div>
      </div>
    </GridOuter>
  )
}
