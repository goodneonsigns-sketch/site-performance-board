import { useState, useEffect } from 'react'

export function useSparkListings({
  limit = 24,
  city = null,
  minPrice = null,
  maxPrice = null,
  beds = null,
  baths = null,
  propType = null,
  subtype = null,
  minSqft = null,
  maxSqft = null,
  minYear = null,
  maxYear = null,
  county = null,
  waterfront = null,   // 'yes' | 'no' | null
  pool = null,         // 'yes' | 'no' | null
  listingType = null,  // 'buy' | 'rent' | null (overrides propType when set)
  sort = 'newest',
  page = 1,
} = {}) {
  const [listings, setListings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [totalCount, setTotalCount] = useState(0)

  useEffect(() => {
    let cancelled = false

    async function fetchListings() {
      try {
        setLoading(true)
        setError(null)

        const params = new URLSearchParams()
        params.set('_limit', String(limit))
        if (page > 1) params.set('_skip', String((page - 1) * limit))
        if (city)                         params.set('_city', city)
        if (minPrice)                     params.set('_minprice', String(minPrice))
        if (maxPrice)                     params.set('_maxprice', String(maxPrice))
        if (beds && beds !== 0)           params.set('_beds', String(beds))
        if (baths && baths !== 0)         params.set('_baths', String(baths))
        if (propType && propType !== 'all') params.set('_type', propType)
        if (subtype)                      params.set('_subtype', subtype)
        if (minSqft)                      params.set('_minsqft', String(minSqft))
        if (maxSqft)                      params.set('_maxsqft', String(maxSqft))
        if (minYear)                      params.set('_minyear', String(minYear))
        if (maxYear)                      params.set('_maxyear', String(maxYear))
        if (county)                       params.set('_county', county)
        if (waterfront)                   params.set('_waterfront', waterfront)
        if (pool)                         params.set('_pool', pool)
        if (listingType && listingType !== 'all') params.set('_listingType', listingType)
        if (sort)                         params.set('_sort', sort)

        const response = await fetch(`/api/listings?${params.toString()}`)

        if (!response.ok) {
          throw new Error(`API error: ${response.status} ${response.statusText}`)
        }

        const data = await response.json()
        if (!cancelled) {
          const results = data?.value ?? []
          const count = data?.['@odata.count'] ?? results.length
          setListings(results)
          setTotalCount(count)
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message)
          setListings([])
          setTotalCount(0)
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchListings()
    return () => { cancelled = true }
  }, [limit, page, city, minPrice, maxPrice, beds, baths, propType, subtype,
      minSqft, maxSqft, minYear, maxYear, county, waterfront, pool, listingType, sort])

  return { listings, loading, error, totalCount }
}

/* ─── Formatting Helpers ─── */

export function formatAddress(listing) {
  if (listing.UnparsedAddress) return listing.UnparsedAddress
  const parts = [
    listing.StreetNumberNumeric,
    listing.StreetName,
    listing.StreetSuffix,
  ].filter(Boolean)
  return parts.join(' ') || 'Address Not Available'
}

export function formatCityStateZip(listing) {
  const parts = [listing.City, listing.StateOrProvince].filter(Boolean)
  const cityState = parts.join(', ')
  return listing.PostalCode ? `${cityState} ${listing.PostalCode}` : cityState
}

export function formatPrice(price) {
  if (!price && price !== 0) return 'Price N/A'
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(price)
}

export function formatSqft(sqft) {
  if (!sqft) return null
  return new Intl.NumberFormat('en-US').format(Math.round(sqft))
}

export function getPropertyTypeLabel(type) {
  if (!type) return 'Property'
  return type
}

export function getPhotoUrl(listing) {
  const media = listing.Media
  if (media && media.length > 0) {
    return media[0].MediaURL || null
  }
  return null
}

export function getAllPhotoUrls(listing) {
  const media = listing.Media
  if (!media || media.length === 0) return []
  return media.slice(0, 8).map(m => m.MediaURL).filter(Boolean)
}

export function getBeds(listing) {
  return listing.BedroomsTotal ?? null
}

export function getBaths(listing) {
  return listing.BathroomsTotalInteger ?? null
}

/** Return a color class prefix for a property type */
export function getTypeColor(type) {
  if (!type) return 'ocean'
  const t = type.toLowerCase()
  if (t.includes('residential income'))         return 'sand'
  if (t.includes('residential lease'))          return 'sunset'
  if (t.includes('residential'))               return 'ocean'
  if (t.includes('commercial') || t.includes('business')) return 'teal'
  if (t.includes('land') || t.includes('dock')) return 'coral'
  if (t.includes('lease'))                      return 'sunset'
  return 'ocean'
}
