import React, { useState, useEffect, useRef } from 'react'
import listingsData from '../../zona-colonial-listings.json'

/* ─── Animation hook ─────────────────────────────────────────────────────── */
function useIntersection(options = {}) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold: 0.1, ...options }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])
  return [ref, isVisible]
}

function AnimateIn({ children, delay = 0, className = '' }) {
  const [ref, isVisible] = useIntersection()
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}
    >
      {children}
    </div>
  )
}

/* ─── Lightbox Component ─────────────────────────────────────────────────── */
function Lightbox({ isOpen, onClose, images, currentIndex, onIndexChange }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onIndexChange((currentIndex - 1 + images.length) % images.length)
      if (e.key === 'ArrowRight') onIndexChange((currentIndex + 1) % images.length)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, currentIndex, images.length, onClose, onIndexChange])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm">
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-white text-3xl hover:text-gold-500 transition-colors z-10"
        aria-label="Close lightbox"
      >
        ✕
      </button>
      
      <button
        onClick={() => onIndexChange((currentIndex - 1 + images.length) % images.length)}
        className="absolute left-6 top-1/2 -translate-y-1/2 text-white text-3xl hover:text-gold-500 transition-colors z-10"
        aria-label="Previous image"
      >
        ‹
      </button>
      
      <button
        onClick={() => onIndexChange((currentIndex + 1) % images.length)}
        className="absolute right-6 top-1/2 -translate-y-1/2 text-white text-3xl hover:text-gold-500 transition-colors z-10"
        aria-label="Next image"
      >
        ›
      </button>
      
      <div className="relative max-w-6xl max-h-[90vh] w-full mx-4">
        <img
          src={images[currentIndex]}
          alt={`Property photo ${currentIndex + 1}`}
          className="w-full h-full object-contain max-h-[80vh] rounded-lg"
        />
        <div className="absolute bottom-4 left-0 right-0 text-center text-white">
          <span className="bg-black/50 px-3 py-1 rounded-full text-sm">
            {currentIndex + 1} / {images.length}
          </span>
        </div>
      </div>
    </div>
  )
}

/* ─── Listing Card Component ────────────────────────────────────────────── */
function ListingCard({ listing, onViewDetails }) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const images = listing.photos.map(photo => `${listing.photoDir}/${photo}`)

  const openLightbox = (index = 0) => {
    setCurrentImageIndex(index)
    setLightboxOpen(true)
  }

  const getBadgeColor = (type) => {
    switch (type) {
      case 'investment': return 'bg-teal-600'
      case 'sale': return 'bg-blue-600'
      case 'business': return 'bg-purple-600'
      case 'lease': return 'bg-amber-600'
      default: return 'bg-navy-700'
    }
  }

  return (
    <>
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300">
        {/* Hero image with badge */}
        <div className="relative h-64 overflow-hidden">
          <img
            src={`${listing.photoDir}/${listing.photos[0]}`}
            alt={listing.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          />
          <div className={`absolute top-4 left-4 ${getBadgeColor(listing.type)} text-white px-3 py-1 rounded-full text-sm font-semibold`}>
            {listing.badge}
          </div>
          <button
            onClick={() => openLightbox(0)}
            className="absolute top-4 right-4 bg-white/90 hover:bg-white text-navy-800 p-2 rounded-full shadow-lg transition-colors"
            aria-label="View all photos"
          >
            📸
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="text-xl font-bold text-navy-800">{listing.title}</h3>
              <p className="text-gray-600">{listing.subtitle}</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gold-600">{listing.price}</div>
              {listing.priceNote && (
                <div className="text-sm text-gray-500">{listing.priceNote}</div>
              )}
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-wrap gap-3 mb-4 text-sm">
            {listing.size && (
              <span className="flex items-center gap-1 text-gray-700">
                📏 {listing.size}
              </span>
            )}
            {listing.beds && (
              <span className="flex items-center gap-1 text-gray-700">
                🛏️ {listing.beds} bed{listing.beds > 1 ? 's' : ''}
              </span>
            )}
            {listing.baths && (
              <span className="flex items-center gap-1 text-gray-700">
                🚿 {listing.baths} bath{listing.baths > 1 ? 's' : ''}
              </span>
            )}
            {listing.units && (
              <span className="flex items-center gap-1 text-gray-700">
                🏢 {listing.units} unit{listing.units > 1 ? 's' : ''}
              </span>
            )}
            {listing.rent && (
              <span className="flex items-center gap-1 text-gray-700">
                💰 {listing.rent}
              </span>
            )}
          </div>

          {/* Highlights */}
          <ul className="space-y-2 mb-6">
            {listing.highlights.slice(0, 4).map((highlight, idx) => (
              <li key={idx} className="flex items-start gap-2 text-gray-700">
                <span className="text-gold-500 mt-1">✓</span>
                <span>{highlight}</span>
              </li>
            ))}
          </ul>

          {/* Photo thumbnails */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            {listing.photos.slice(0, 5).map((photo, idx) => (
              <button
                key={idx}
                onClick={() => openLightbox(idx)}
                className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 border-transparent hover:border-gold-500 transition-colors"
              >
                <img
                  src={`${listing.photoDir}/${photo}`}
                  alt={`Thumbnail ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
            {listing.photos.length > 5 && (
              <button
                onClick={() => openLightbox(5)}
                className="flex-shrink-0 w-16 h-16 rounded-lg bg-navy-100 flex items-center justify-center text-navy-600 hover:bg-navy-200 transition-colors"
              >
                +{listing.photos.length - 5}
              </button>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={() => onViewDetails(listing)}
              className="flex-1 bg-navy-700 hover:bg-navy-800 text-white py-3 rounded-lg font-semibold transition-colors"
            >
              View Details
            </button>
            <a
              href={`https://wa.me/19544983728?text=I'm interested in ${encodeURIComponent(listing.title)} in Zona Colonial`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition-colors text-center"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      <Lightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={images}
        currentIndex={currentImageIndex}
        onIndexChange={setCurrentImageIndex}
      />
    </>
  )
}

/* ─── Listing Modal Component ───────────────────────────────────────────── */
function ListingModal({ listing, isOpen, onClose }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const images = listing.photos.map(photo => `${listing.photoDir}/${photo}`)

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
      if (e.key === 'ArrowRight') setCurrentImageIndex((prev) => (prev + 1) % images.length)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, images.length, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-w-6xl max-h-[90vh] w-full overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <div>
            <h2 className="text-2xl font-bold text-navy-800">{listing.title}</h2>
            <p className="text-gray-600">{listing.subtitle} • {listing.location}</p>
          </div>
          <button
            onClick={onClose}
            className="text-2xl text-gray-500 hover:text-gray-700"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left column - Gallery */}
            <div>
              <div className="mb-4">
                <img
                  src={images[currentImageIndex]}
                  alt={`Property photo ${currentImageIndex + 1}`}
                  className="w-full h-80 object-cover rounded-lg"
                />
                <div className="flex justify-between items-center mt-4">
                  <button
                    onClick={() => setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)}
                    className="px-4 py-2 bg-navy-100 hover:bg-navy-200 rounded-lg"
                  >
                    ‹ Previous
                  </button>
                  <span className="text-gray-600">
                    {currentImageIndex + 1} / {images.length}
                  </span>
                  <button
                    onClick={() => setCurrentImageIndex((prev) => (prev + 1) % images.length)}
                    className="px-4 py-2 bg-navy-100 hover:bg-navy-200 rounded-lg"
                  >
                    Next ›
                  </button>
                </div>
              </div>
              
              {/* Thumbnails */}
              <div className="flex gap-2 overflow-x-auto pb-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${currentImageIndex === idx ? 'border-gold-500' : 'border-transparent'}`}
                  >
                    <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Right column - Details */}
            <div>
              {/* Price */}
              <div className="mb-6 p-4 bg-gold-50 rounded-xl">
                <div className="text-3xl font-bold text-gold-700">{listing.price}</div>
                {listing.priceNote && (
                  <div className="text-gray-600 mt-1">{listing.priceNote}</div>
                )}
                {listing.rent && (
                  <div className="text-lg font-semibold text-gray-700 mt-2">Rent: {listing.rent}</div>
                )}
              </div>

              {/* Highlights */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-navy-800 mb-4">Property Highlights</h3>
                <ul className="space-y-3">
                  {listing.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-gold-500 mt-1">✓</span>
                      <span className="text-gray-700">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Details */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {listing.size && (
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-sm text-gray-500">Size</div>
                    <div className="font-semibold">{listing.size}</div>
                  </div>
                )}
                {listing.beds && (
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-sm text-gray-500">Bedrooms</div>
                    <div className="font-semibold">{listing.beds}</div>
                  </div>
                )}
                {listing.baths && (
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-sm text-gray-500">Bathrooms</div>
                    <div className="font-semibold">{listing.baths}</div>
                  </div>
                )}
                {listing.units && (
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-sm text-gray-500">Units</div>
                    <div className="font-semibold">{listing.units}</div>
                  </div>
                )}
                {listing.floor && (
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-sm text-gray-500">Floor</div>
                    <div className="font-semibold">{listing.floor}</div>
                  </div>
                )}
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="text-sm text-gray-500">Location</div>
                  <div className="font-semibold">{listing.location}</div>
                </div>
              </div>

              {/* WhatsApp CTA */}
              <a
                href={`https://wa.me/19544983728?text=I'm interested in ${encodeURIComponent(listing.title)} in Zona Colonial`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-green-600 hover:bg-green-700 text-white text-center py-4 rounded-xl font-bold text-lg transition-colors mb-4"
              >
                📱 Contact via WhatsApp
              </a>
              
              <div className="text-center text-gray-600">
                Or call: <a href="tel:19544983728" className="text-navy-700 font-semibold">(954) 498-3728</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─── Main Page Component ───────────────────────────────────────────────── */
export default function ZonaColonial() {
  const [selectedListing, setSelectedListing] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)

  // Group listings by type
  const investmentListings = listingsData.filter(l => l.type === 'investment')
  const residentialListings = listingsData.filter(l => l.type === 'sale')
  const commercialListings = listingsData.filter(l => ['business', 'lease'].includes(l.type))

  const handleViewDetails = (listing) => {
    setSelectedListing(listing)
    setModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('/zona-colonial/8-unit-building/courtyard-tree.jpg')] bg-cover bg-center opacity-20"></div>
        <div className="relative container mx-auto px-4 py-24 md:py-32">
          <AnimateIn delay={100}>
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 text-center">
              Zona Colonial
            </h1>
          </AnimateIn>
          <AnimateIn delay={200}>
            <p className="text-2xl md:text-3xl text-center mb-8 text-gold-200">
              Santo Domingo's UNESCO World Heritage District
            </p>
          </AnimateIn>
          <AnimateIn delay={300}>
            <p className="text-xl text-center mb-12 max-w-3xl mx-auto text-gray-300">
              The oldest European settlement in the Americas — where 500 years of history meets modern Caribbean living
            </p>
          </AnimateIn>
          <AnimateIn delay={400}>
            <div className="flex flex-wrap justify-center gap-6 md:gap-12 bg-white/10 backdrop-blur-sm rounded-2xl p-6 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold">🏛️</div>
                <div className="font-semibold">UNESCO Since 1990</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">📍</div>
                <div className="font-semibold">1.06 km² Historic Center</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">🏖️</div>
                <div className="font-semibold">25 min to Beach</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">💰</div>
                <div className="font-semibold">7.6% Rental Yield</div>
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* Area Overview */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <AnimateIn>
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-navy-800 mb-8 text-center">
                The Heart of Santo Domingo
              </h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 mb-6">
                  Founded in 1498 by Bartholomew Columbus, Zona Colonial is the oldest continuously inhabited European settlement in the Americas. Designated a UNESCO World Heritage Site in 1990, this historic district is where the New World began.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h3 className="text-xl font-bold text-navy-800 mb-4">Historic Firsts</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li>🏛️ First cathedral in the Americas</li>
                      <li>🎓 First university in the Americas</li>
                      <li>🛣️ First paved street in the Americas</li>
                      <li>🏰 First fortress in the Americas</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-navy-800 mb-4">Key Landmarks</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li>Catedral Primada de América</li>
                      <li>Alcázar de Colón</li>
                      <li>Fortaleza Ozama</li>
                      <li>Calle Las Damas</li>
                      <li>Parque Colón</li>
                      <li>Puerta del Conde</li>
                    </ul>
                  </div>
                </div>
                <p className="text-gray-700">
                  Today, Zona Colonial blends 500 years of history with vibrant modern life. Cobblestone streets lead to outdoor cafes, art galleries, and dynamic nightlife. A growing expat and digital nomad community has discovered this unique neighborhood, driving property prices up 10%+ annually. With 11.8 million tourists visiting the Dominican Republic in 2025, demand for authentic colonial experiences has never been higher.
                </p>
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* Investment Stats Banner */}
      <section className="py-16 bg-navy-800 text-white">
        <div className="container mx-auto px-4">
          <AnimateIn>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-12 text-center">
              Investment Metrics
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
                <div className="text-4xl font-bold text-gold-400 mb-2">$65-85</div>
                <div className="text-lg font-semibold">Average Airbnb Nightly Rate</div>
                <div className="text-gray-300 mt-2">Premium colonial experience commands premium rates</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
                <div className="text-4xl font-bold text-gold-400 mb-2">7.63%</div>
                <div className="text-lg font-semibold">Gross Rental Yield</div>
                <div className="text-gray-300 mt-2">Strong returns in historic district</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
                <div className="text-4xl font-bold text-gold-400 mb-2">11.8M</div>
                <div className="text-lg font-semibold">Tourists (2025 Record)</div>
                <div className="text-gray-300 mt-2">Record-breaking tourism to Dominican Republic</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
                <div className="text-4xl font-bold text-gold-400 mb-2">10%+</div>
                <div className="text-lg font-semibold">Annual Price Appreciation</div>
                <div className="text-gray-300 mt-2">Historic properties gaining value rapidly</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
                <div className="text-4xl font-bold text-gold-400 mb-2">100%</div>
                <div className="text-lg font-semibold">Same Property Rights</div>
                <div className="text-gray-300 mt-2">Foreigners have same rights as Dominican citizens</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
                <div className="text-4xl font-bold text-gold-400 mb-2">15 Years</div>
                <div className="text-lg font-semibold">CONFOTUR Tax Exemptions</div>
                <div className="text-gray-300 mt-2">Available for qualifying tourism investments</div>
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* Featured Listings */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          {/* Investment Properties */}
          <AnimateIn>
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-8">
                <div className="text-3xl">🏗️</div>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-navy-800">
                  Investment Properties
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {investmentListings.map((listing) => (
                  <ListingCard
                    key={listing.id}
                    listing={listing}
                    onViewDetails={handleViewDetails}
                  />
                ))}
              </div>
            </div>
          </AnimateIn>

          {/* Residential */}
          <AnimateIn delay={100}>
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-8">
                <div className="text-3xl">🏠</div>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-navy-800">
                  Residential
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {residentialListings.map((listing) => (
                  <ListingCard
                    key={listing.id}
                    listing={listing}
                    onViewDetails={handleViewDetails}
                  />
                ))}
              </div>
            </div>
          </AnimateIn>

          {/* Commercial */}
          <AnimateIn delay={200}>
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="text-3xl">☕</div>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-navy-800">
                  Commercial
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {commercialListings.map((listing) => (
                  <ListingCard
                    key={listing.id}
                    listing={listing}
                    onViewDetails={handleViewDetails}
                  />
                ))}
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* Why Invest */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <AnimateIn>
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-navy-800 mb-12 text-center">
                Why Invest in Zona Colonial
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded-2xl shadow-lg">
                  <div className="text-3xl mb-4">🏛️</div>
                  <h3 className="text-xl font-bold text-navy-800 mb-3">UNESCO Protection</h3>
                  <p className="text-gray-700">World Heritage status ensures preservation and maintains historic character, protecting your investment.</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-lg">
                  <div className="text-3xl mb-4">🌴</div>
                  <h3 className="text-xl font-bold text-navy-800 mb-3">Year-Round Tourism</h3>
                  <p className="text-gray-700">11.8 million tourists in 2025 create constant demand for authentic colonial accommodations.</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-lg">
                  <div className="text-3xl mb-4">💻</div>
                  <h3 className="text-xl font-bold text-navy-800 mb-3">Digital Nomad Hub</h3>
                  <p className="text-gray-700">Growing community of remote workers seeking historic charm with modern amenities.</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-lg">
                  <div className="text-3xl mb-4">💰</div>
                  <h3 className="text-xl font-bold text-navy-800 mb-3">Tax Exemptions</h3>
                  <p className="text-gray-700">CONFOTUR program offers up to 15 years of tax exemptions for tourism investments.</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-lg">
                  <div className="text-3xl mb-4">⚖️</div>
                  <h3 className="text-xl font-bold text-navy-800 mb-3">Equal Rights</h3>
                  <p className="text-gray-700">Foreigners enjoy the same property ownership rights as Dominican citizens.</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-lg">
                  <div className="text-3xl mb-4">🏖️</div>
                  <h3 className="text-xl font-bold text-navy-800 mb-3">Beach Proximity</h3>
                  <p className="text-gray-700">Just 25 minutes to Boca Chica Beach, 2 hours to Punta Cana's world-class resorts.</p>
                </div>
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* WhatsApp CTA */}
      <section className="py-16 bg-gradient-to-r from-navy-800 to-navy-900 text-white">
        <div className="container mx-auto px-4">
          <AnimateIn>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                Ready to Invest in Zona Colonial?
              </h2>
              <p className="text-xl mb-8 text-gray-300">
                Contact Nicolas Gonzalez — your connection to Dominican Republic real estate
              </p>
              <a
                href="https://wa.me/19544983728?text=I'm interested in Zona Colonial properties in Santo Domingo"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-green-600 hover:bg-green-700 text-white text-2xl font-bold py-6 px-12 rounded-2xl transition-all duration-300 transform hover:scale-105 mb-6"
              >
                📱 Chat on WhatsApp
              </a>
              <div className="text-2xl font-semibold">
                Or call: <a href="tel:19544983728" className="text-gold-400 hover:text-gold-300">(954) 498-3728</a>
              </div>
              <p className="mt-8 text-gray-400">
                English & Spanish spoken • 24/7 availability for international investors
              </p>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* Listing Modal */}
      {selectedListing && (
        <ListingModal
          listing={selectedListing}
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  )
}