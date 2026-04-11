import React, { createContext, useContext, useState, useEffect } from 'react'

const PropertyContext = createContext(null)

export function PropertyProvider({ children }) {
  const [selectedProperties, setSelectedProperties] = useState(() => {
    try {
      const saved = localStorage.getItem('virtus-selected-properties')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem('virtus-selected-properties', JSON.stringify(selectedProperties))
    } catch {
      // localStorage unavailable
    }
  }, [selectedProperties])

  const addProperty = (listing) => {
    setSelectedProperties(prev => {
      const key = listing.ListingKey || listing.ListingId
      if (prev.find(p => (p.ListingKey || p.ListingId) === key)) return prev
      if (prev.length >= 4) return prev // max 4 for comparison
      return [...prev, listing]
    })
  }

  const removeProperty = (listingKey) => {
    setSelectedProperties(prev =>
      prev.filter(p => (p.ListingKey || p.ListingId) !== listingKey)
    )
  }

  const clearAll = () => setSelectedProperties([])

  const isSelected = (listingKey) =>
    selectedProperties.some(p => (p.ListingKey || p.ListingId) === listingKey)

  return (
    <PropertyContext.Provider value={{
      selectedProperties,
      addProperty,
      removeProperty,
      clearAll,
      isSelected,
    }}>
      {children}
    </PropertyContext.Provider>
  )
}

export function usePropertyContext() {
  const ctx = useContext(PropertyContext)
  if (!ctx) throw new Error('usePropertyContext must be used within PropertyProvider')
  return ctx
}

export default PropertyContext
