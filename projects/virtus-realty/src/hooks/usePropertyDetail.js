import { useState, useEffect } from 'react'

export function usePropertyDetail(listingKey) {
  const [listing, setListing] = useState(null)
  const [photos, setPhotos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!listingKey) return
    let cancelled = false

    async function fetchDetail() {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch(`/api/listings?_id=${encodeURIComponent(listingKey)}`)
        if (!response.ok) {
          throw new Error(`API error: ${response.status} ${response.statusText}`)
        }

        const data = await response.json()
        if (!cancelled) {
          // Proxy wraps single entity in { value: [...] }
          const result = data?.value?.[0] ?? data
          setListing(result)

          // Extract + sort photos from Media expansion
          const media = Array.isArray(result?.Media) ? result.Media : []
          const sorted = [...media].sort(
            (a, b) => (a.Order ?? a.MediaModificationTimestamp ?? 0) - (b.Order ?? b.MediaModificationTimestamp ?? 0)
          )
          const urls = sorted.map(m => m.MediaURL).filter(Boolean)
          setPhotos(urls)
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message)
          setListing(null)
          setPhotos([])
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchDetail()
    return () => { cancelled = true }
  }, [listingKey])

  return { listing, photos, loading, error }
}
