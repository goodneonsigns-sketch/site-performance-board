import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { usePropertyContext } from '../context/PropertyContext'
import {
  formatAddress,
  formatCityStateZip,
  formatPrice,
  formatSqft,
  getPropertyTypeLabel,
  getAllPhotoUrls,
  getBeds,
  getBaths,
} from '../hooks/useSparkListings'

/* ─── Helpers ─── */
function getFirstPhoto(listing) {
  const photos = getAllPhotoUrls(listing)
  return photos[0] || null
}

function getPricePerSqft(listing) {
  if (!listing.ListPrice || !listing.LivingArea) return null
  return Math.round(listing.ListPrice / listing.LivingArea)
}

function formatHOA(listing) {
  const fee = listing.AssociationFee || listing['Association_sp_Information_co_Assoc_sp_Fee'] || null
  if (!fee || fee === 0) return 'None'
  return `$${Number(fee).toLocaleString()}/mo`
}

function formatTax(listing) {
  const tax = listing.TaxAnnualAmount || null
  if (!tax) return '—'
  return `$${Number(tax).toLocaleString()}/yr`
}

function formatGarage(listing) {
  const spaces = listing.GarageSpaces
  if (!spaces) return '—'
  return String(spaces)
}

function formatDOM(listing) {
  const dom = listing.DaysOnMarket || listing.CumulativeDaysOnMarket
  if (!dom && dom !== 0) return '—'
  return `${dom} days`
}

function formatPool(listing) {
  if (listing.PoolPrivateYN === true || listing.PoolPrivateYN === 'true' || listing.PoolPrivateYN === 1) return 'Yes'
  if (listing.PoolPrivateYN === false || listing.PoolPrivateYN === 'false' || listing.PoolPrivateYN === 0) return 'No'
  if (listing.PoolFeatures && listing.PoolFeatures.length > 0) return 'Yes'
  return '—'
}

function formatWaterfront(listing) {
  if (listing.WaterfrontYN === true || listing.WaterfrontYN === 'true' || listing.WaterfrontYN === 1) return 'Yes'
  if (listing.WaterfrontYN === false || listing.WaterfrontYN === 'false' || listing.WaterfrontYN === 0) return 'No'
  return '—'
}

/* Row definition: { label, getValue, highlight: 'lowest'|'highest'|'newest'|'none', format } */
const ROWS = [
  {
    label: 'Price',
    getValue: (l) => l.ListPrice,
    format: (v) => v ? formatPrice(v) : '—',
    highlight: 'lowest',
    numeric: true,
  },
  {
    label: 'Beds',
    getValue: (l) => getBeds(l),
    format: (v) => v != null ? `${v} bed${v !== 1 ? 's' : ''}` : '—',
    highlight: 'highest',
    numeric: true,
  },
  {
    label: 'Baths',
    getValue: (l) => getBaths(l),
    format: (v) => v != null ? `${v} bath${v !== 1 ? 's' : ''}` : '—',
    highlight: 'highest',
    numeric: true,
  },
  {
    label: 'Sq Ft',
    getValue: (l) => l.LivingArea,
    format: (v) => v ? `${formatSqft(v)} sqft` : '—',
    highlight: 'highest',
    numeric: true,
  },
  {
    label: 'Year Built',
    getValue: (l) => l.YearBuilt,
    format: (v) => v || '—',
    highlight: 'highest',
    numeric: true,
  },
  {
    label: 'Price/SqFt',
    getValue: getPricePerSqft,
    format: (v) => v ? `$${v.toLocaleString()}` : '—',
    highlight: 'lowest',
    numeric: true,
  },
  {
    label: 'HOA',
    getValue: (l) => {
      const fee = l.AssociationFee || l['Association_sp_Information_co_Assoc_sp_Fee'] || null
      return fee ? Number(fee) : null
    },
    format: (v, l) => formatHOA(l),
    highlight: 'lowest',
    numeric: true,
  },
  {
    label: 'Property Type',
    getValue: (l) => l.PropertySubType || getPropertyTypeLabel(l.PropertyType),
    format: (v) => v || '—',
    highlight: 'none',
  },
  {
    label: 'Days on Market',
    getValue: (l) => l.DaysOnMarket ?? l.CumulativeDaysOnMarket ?? null,
    format: (v, l) => formatDOM(l),
    highlight: 'lowest',
    numeric: true,
  },
  {
    label: 'Pool',
    getValue: (l) => formatPool(l),
    format: (v) => v,
    highlight: 'none',
  },
  {
    label: 'Waterfront',
    getValue: (l) => formatWaterfront(l),
    format: (v) => v,
    highlight: 'none',
  },
  {
    label: 'Garage',
    getValue: (l) => l.GarageSpaces ?? null,
    format: (v, l) => formatGarage(l),
    highlight: 'highest',
    numeric: true,
  },
  {
    label: 'Annual Tax',
    getValue: (l) => l.TaxAnnualAmount ?? null,
    format: (v, l) => formatTax(l),
    highlight: 'lowest',
    numeric: true,
  },
  {
    label: 'County',
    getValue: (l) => l.CountyOrParish,
    format: (v) => v || '—',
    highlight: 'none',
  },
]

function getBestIdx(row, listings) {
  if (row.highlight === 'none') return -1
  const values = listings.map(l => row.getValue(l))
  const nums = values.map(v => (typeof v === 'number' ? v : null))
  const validNums = nums.filter(v => v !== null)
  if (validNums.length < 2) return -1

  let best
  if (row.highlight === 'lowest') best = Math.min(...validNums)
  else best = Math.max(...validNums)

  const idx = nums.findIndex(v => v === best)
  return idx
}

/* ─── No Properties State ─── */
function EmptyCompare() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-32">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 bg-navy-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-navy-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
          </svg>
        </div>
        <h2 className="font-display text-2xl font-bold text-gray-900 mb-3">No Properties to Compare</h2>
        <p className="text-gray-500 mb-8 leading-relaxed">
          Browse listings and click "Add to Compare" on properties you're interested in. Then come back here to see them side-by-side.
        </p>
        <Link
          to="/listings"
          className="inline-flex items-center gap-2 px-6 py-3 bg-navy-600 text-white font-semibold rounded-xl hover:bg-navy-700 transition-colors duration-200 shadow-md"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          Browse Listings
        </Link>
      </div>
    </div>
  )
}

/* ─── Property Column Header ─── */
function PropertyHeader({ listing, onRemove }) {
  const photo = getFirstPhoto(listing)
  const address = formatAddress(listing)
  const cityState = formatCityStateZip(listing)
  const price = formatPrice(listing.ListPrice)
  const detailPath = listing.ListingKey ? `/listings/${listing.ListingKey}` : null

  return (
    <div className="relative bg-white">
      {/* Remove button */}
      <button
        onClick={onRemove}
        className="absolute top-2 right-2 z-10 w-7 h-7 bg-gray-100 hover:bg-red-100 hover:text-red-600 text-gray-500 rounded-full flex items-center justify-center transition-all duration-200"
        title="Remove from comparison"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Photo */}
      <div className="h-40 bg-gray-100 overflow-hidden">
        {photo ? (
          <img
            src={photo}
            alt={address}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
            <svg className="w-10 h-10 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            </svg>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-3 border-b border-gray-100">
        <p className="font-display font-bold text-lg text-navy-800">{price}</p>
        <p className="text-sm font-semibold text-gray-800 leading-snug mt-0.5 line-clamp-2">{address}</p>
        <p className="text-xs text-gray-500 mt-0.5">{cityState}</p>
        {detailPath && (
          <Link
            to={detailPath}
            className="inline-block mt-2 text-xs text-navy-600 font-semibold hover:text-navy-800 transition-colors"
          >
            View Details →
          </Link>
        )}
      </div>
    </div>
  )
}

export default function Compare() {
  // SEO Meta Tags
  useEffect(() => {
    document.title = 'Compare Properties | Side-by-Side Analysis | Virtus Realty Group'
    const meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute('content', 'Compare South Florida properties side by side — pricing, features, investment potential. Make informed decisions on your next real estate purchase with Virtus Realty.')
    // OG tags
    const ogTitle = document.querySelector('meta[property="og:title"]')
    if (ogTitle) ogTitle.setAttribute('content', 'Compare Properties | Side-by-Side Analysis | Virtus Realty Group')
    const ogDesc = document.querySelector('meta[property="og:description"]')
    if (ogDesc) ogDesc.setAttribute('content', 'Compare South Florida properties side by side — pricing, features, investment potential. Make informed decisions on your next real estate purchase with Virtus Realty.')
    const ogUrl = document.querySelector('meta[property="og:url"]')
    if (ogUrl) ogUrl.setAttribute('content', 'https://virtusrealtygroup.com/compare')
  }, [])

  const { selectedProperties, removeProperty, clearAll } = usePropertyContext()
  const navigate = useNavigate()

  if (selectedProperties.length === 0) return <EmptyCompare />

  const colCount = selectedProperties.length

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      {/* ── Header ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <Link
              to="/listings"
              className="flex items-center gap-1.5 text-sm text-navy-600 hover:text-navy-800 font-medium mb-3 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Back to Listings
            </Link>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-navy-900">
              Compare Properties
            </h1>
            <p className="text-gray-500 mt-1">
              Comparing <span className="font-semibold text-navy-700">{colCount}</span> propert{colCount === 1 ? 'y' : 'ies'} side-by-side
            </p>
          </div>

          <div className="flex gap-3 flex-wrap">
            <button
              onClick={clearAll}
              className="px-4 py-2 text-sm font-semibold text-gray-600 border border-gray-200 rounded-xl hover:border-red-300 hover:text-red-600 hover:bg-red-50 transition-all duration-200"
            >
              Clear All
            </button>
            <button
              onClick={() => navigate('/schedule-showing')}
              className="px-5 py-2 bg-gold-500 hover:bg-gold-600 text-navy-900 text-sm font-bold rounded-xl transition-colors duration-200 shadow-md flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Schedule Showings
            </button>
          </div>
        </div>
      </div>

      {/* ── Comparison Table ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="overflow-x-auto rounded-2xl shadow-lg border border-gray-100">
          <table className="w-full min-w-[640px] bg-white border-collapse">
            <thead>
              <tr className="border-b-2 border-navy-100">
                {/* Label column */}
                <th className="w-32 sm:w-40 bg-navy-50 p-0 border-r border-gray-100" />
                {/* Property columns */}
                {selectedProperties.map((listing) => {
                  const key = listing.ListingKey || listing.ListingId
                  return (
                    <th
                      key={key}
                      className={`p-0 border-r border-gray-100 last:border-r-0 align-top`}
                      style={{ minWidth: '220px' }}
                    >
                      <PropertyHeader
                        listing={listing}
                        onRemove={() => removeProperty(key)}
                      />
                    </th>
                  )
                })}

                {/* Add More slot (only if < 4) */}
                {selectedProperties.length < 4 && (
                  <th className="p-4 align-middle border-r border-gray-100 last:border-r-0" style={{ minWidth: '180px' }}>
                    <Link
                      to="/listings"
                      className="flex flex-col items-center gap-2 text-navy-400 hover:text-navy-600 transition-colors group p-4"
                    >
                      <div className="w-12 h-12 rounded-full border-2 border-dashed border-navy-200 group-hover:border-navy-400 flex items-center justify-center transition-colors">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                        </svg>
                      </div>
                      <span className="text-xs font-semibold text-center">Add Property</span>
                    </Link>
                  </th>
                )}
              </tr>
            </thead>

            <tbody>
              {ROWS.map((row, rowIdx) => {
                const bestIdx = getBestIdx(row, selectedProperties)
                const isEven = rowIdx % 2 === 0

                return (
                  <tr
                    key={row.label}
                    className={`border-b border-gray-50 ${isEven ? 'bg-white' : 'bg-gray-50/50'}`}
                  >
                    {/* Label */}
                    <td className="px-4 py-3.5 bg-navy-50/80 border-r border-gray-100 text-xs font-bold text-navy-700 uppercase tracking-wide whitespace-nowrap">
                      {row.label}
                    </td>

                    {/* Values */}
                    {selectedProperties.map((listing, colIdx) => {
                      const key = listing.ListingKey || listing.ListingId
                      const rawVal = row.getValue(listing)
                      const displayVal = row.format(rawVal, listing)
                      const isBest = bestIdx === colIdx && bestIdx !== -1

                      return (
                        <td
                          key={key}
                          className={`px-4 py-3.5 text-sm border-r border-gray-100 last:border-r-0 transition-colors ${
                            isBest
                              ? 'bg-gold-50 font-semibold text-gold-800'
                              : 'text-gray-700'
                          }`}
                        >
                          <span className="flex items-center gap-1.5">
                            {isBest && (
                              <span className="inline-flex w-4 h-4 bg-gold-400 text-white rounded-full items-center justify-center flex-shrink-0">
                                <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                              </span>
                            )}
                            {displayVal}
                          </span>
                        </td>
                      )
                    })}

                    {/* Empty cell if < 4 cols */}
                    {selectedProperties.length < 4 && (
                      <td className="border-r border-gray-100 last:border-r-0" />
                    )}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* ── Gold Key ── */}
        <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
          <span className="inline-flex w-4 h-4 bg-gold-400 text-white rounded-full items-center justify-center flex-shrink-0">
            <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </span>
          <span>Highlighted in gold = best value in that category</span>
        </div>

        {/* ── Bottom CTA ── */}
        <div className="mt-10 bg-gradient-to-r from-navy-700 via-navy-600 to-navy-700 rounded-2xl p-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-1/4 w-40 h-40 bg-white rounded-full blur-3xl" />
          </div>
          <div className="relative">
            <h3 className="font-display text-2xl font-bold text-white mb-2">
              Ready to See These Homes?
            </h3>
            <p className="text-white/75 mb-6">
              Schedule showings for all {colCount} selected properties in one easy request.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => navigate('/schedule-showing')}
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-gold-500 hover:bg-gold-600 text-navy-900 font-bold rounded-xl transition-colors duration-200 shadow-lg text-base"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Schedule Showings for All {colCount} Properties
              </button>
              <Link
                to="/listings"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white/10 border border-white/20 text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-200 text-base"
              >
                Browse More Listings
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
