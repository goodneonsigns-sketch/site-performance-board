import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { usePropertyContext } from '../context/PropertyContext'
import {
  formatAddress,
  formatCityStateZip,
  formatPrice,
  getAllPhotoUrls,
} from '../hooks/useSparkListings'

/* ─── Helpers ─── */
function getFirstPhoto(listing) {
  const photos = getAllPhotoUrls(listing)
  return photos[0] || null
}

function formatDateDisplay(dateStr) {
  if (!dateStr) return ''
  const d = new Date(dateStr + 'T12:00:00')
  return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })
}

/* ─── Sub-components ─── */
function PropertyPill({ listing, onRemove }) {
  const photo = getFirstPhoto(listing)
  const address = formatAddress(listing)
  const price = formatPrice(listing.ListPrice)
  const key = listing.ListingKey || listing.ListingId

  return (
    <div className="flex items-center gap-3 p-3 bg-navy-50 border border-navy-100 rounded-xl group">
      {/* Thumbnail */}
      <div className="w-12 h-12 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
        {photo ? (
          <img src={photo} alt={address} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg className="w-6 h-6 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            </svg>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-grow min-w-0">
        <p className="text-sm font-semibold text-gray-900 truncate">{address}</p>
        <p className="text-xs text-navy-600 font-bold">{price}</p>
      </div>

      {/* Remove */}
      <button
        type="button"
        onClick={() => onRemove(key)}
        className="flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all duration-200 opacity-0 group-hover:opacity-100"
        title="Remove from request"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  )
}

/* ─── Success Screen ─── */
function SuccessScreen({ formData, properties, navigate }) {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        {/* Success card */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          {/* Top banner */}
          <div className="bg-gradient-to-r from-navy-700 to-navy-600 px-8 py-10 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-48 h-48 bg-gold-300 rounded-full blur-3xl" />
            </div>
            <div className="relative">
              <div className="w-16 h-16 bg-gold-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="font-display text-2xl font-bold text-white mb-2">
                Showing Request Sent! 🎉
              </h2>
              <p className="text-white/80 text-sm">
                We'll contact you within 2 hours to confirm your showings.
              </p>
            </div>
          </div>

          {/* Details */}
          <div className="p-8 space-y-6">
            {/* Contact info */}
            <div>
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Your Information</h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-gray-500">Name</span>
                  <p className="font-semibold text-gray-900">{formData.name}</p>
                </div>
                <div>
                  <span className="text-gray-500">Phone</span>
                  <p className="font-semibold text-gray-900">{formData.phone || '—'}</p>
                </div>
                <div className="col-span-2">
                  <span className="text-gray-500">Email</span>
                  <p className="font-semibold text-gray-900">{formData.email}</p>
                </div>
              </div>
            </div>

            {/* Requested dates */}
            {formData.dates.filter(d => d.date).length > 0 && (
              <div>
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Preferred Showing Dates</h3>
                <div className="space-y-2">
                  {formData.dates.filter(d => d.date).map((d, i) => (
                    <div key={i} className="flex items-center gap-3 py-2 px-3 bg-gold-50 rounded-lg">
                      <svg className="w-4 h-4 text-gold-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="text-sm font-semibold text-gray-800">{formatDateDisplay(d.date)}</span>
                      <span className="text-xs text-gray-500 bg-white border border-gray-100 px-2 py-0.5 rounded-full">{d.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Properties */}
            <div>
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                {properties.length} Properties Requested
              </h3>
              <div className="space-y-2">
                {properties.map((listing) => {
                  const key = listing.ListingKey || listing.ListingId
                  return (
                    <div key={key} className="flex items-center gap-3 py-2.5 px-3 border border-gray-100 rounded-xl">
                      <svg className="w-5 h-5 text-navy-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                      </svg>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-gray-900 truncate">{formatAddress(listing)}</p>
                        <p className="text-xs text-navy-600">{formatPrice(listing.ListPrice)}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Pre-qual */}
            {formData.preQual && (
              <div className="p-3 bg-navy-50 rounded-xl text-sm">
                <span className="text-navy-600 font-medium">Pre-qualification: </span>
                <span className="text-navy-800 font-semibold">{formData.preQual}</span>
              </div>
            )}

            {/* Privacy note */}
            <div className="flex items-center gap-2 text-xs text-gray-400 pt-2 border-t border-gray-100">
              <svg className="w-4 h-4 flex-shrink-0 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Your information is private and will only be used to schedule your showings.
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link
                to="/listings"
                className="flex-1 text-center py-3 bg-navy-600 hover:bg-navy-700 text-white font-semibold rounded-xl transition-colors duration-200"
              >
                Browse More Listings
              </Link>
              <Link
                to="/compare"
                className="flex-1 text-center py-3 border-2 border-navy-200 text-navy-700 font-semibold rounded-xl hover:bg-navy-50 transition-colors duration-200"
              >
                Back to Compare
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─── Empty State ─── */
function EmptyShowing() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-32">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-gold-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <h2 className="font-display text-2xl font-bold text-gray-900 mb-3">No Properties Selected</h2>
        <p className="text-gray-500 mb-8 leading-relaxed">
          Select properties from the listings page to schedule showings, or browse listings to get started.
        </p>
        <Link
          to="/listings"
          className="inline-flex items-center gap-2 px-6 py-3 bg-navy-600 text-white font-semibold rounded-xl hover:bg-navy-700 transition-colors duration-200 shadow-md"
        >
          Browse Listings
        </Link>
      </div>
    </div>
  )
}

/* ─── Main Page ─── */
export default function ScheduleShowing() {
  // SEO Meta Tags
  useEffect(() => {
    document.title = 'Schedule a Showing | View Properties in Person | Virtus Realty Group'
    const meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute('content', 'Book a private showing of any South Florida property. Tour homes, condos, investment properties, and REO listings with a Virtus Realty agent.')
    // OG tags
    const ogTitle = document.querySelector('meta[property="og:title"]')
    if (ogTitle) ogTitle.setAttribute('content', 'Schedule a Showing | View Properties in Person | Virtus Realty Group')
    const ogDesc = document.querySelector('meta[property="og:description"]')
    if (ogDesc) ogDesc.setAttribute('content', 'Book a private showing of any South Florida property. Tour homes, condos, investment properties, and REO listings with a Virtus Realty agent.')
    const ogUrl = document.querySelector('meta[property="og:url"]')
    if (ogUrl) ogUrl.setAttribute('content', 'https://virtusrealtygroup.com/schedule-showing')
  }, [])

  const { selectedProperties, removeProperty } = usePropertyContext()
  const navigate = useNavigate()

  const [submitted, setSubmitted] = useState(false)
  const [submittedData, setSubmittedData] = useState(null)
  const [submittedProps, setSubmittedProps] = useState([])

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [dates, setDates] = useState([
    { date: '', time: 'Morning' },
    { date: '', time: 'Afternoon' },
  ])
  const [preQual, setPreQual] = useState('')
  const [notes, setNotes] = useState('')
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  if (selectedProperties.length === 0 && !submitted) return <EmptyShowing />

  if (submitted) {
    return (
      <SuccessScreen
        formData={submittedData}
        properties={submittedProps}
        navigate={navigate}
      />
    )
  }

  const addDate = () => {
    setDates(prev => [...prev, { date: '', time: 'Morning' }])
  }

  const removeDate = (idx) => {
    setDates(prev => prev.filter((_, i) => i !== idx))
  }

  const updateDate = (idx, field, value) => {
    setDates(prev => prev.map((d, i) => i === idx ? { ...d, [field]: value } : d))
  }

  const validate = () => {
    const errs = {}
    if (!name.trim()) errs.name = 'Name is required'
    if (!email.trim()) errs.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(email)) errs.email = 'Enter a valid email'
    if (dates.filter(d => d.date).length === 0) errs.dates = 'Please select at least one date'
    return errs
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    setSubmitting(true)
    // Simulate API call
    setTimeout(() => {
      setSubmittedData({ name, email, phone, dates, preQual, notes })
      setSubmittedProps([...selectedProperties])
      setSubmitted(true)
      setSubmitting(false)
    }, 800)
  }

  const propCount = selectedProperties.length

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">

        {/* Back */}
        <Link
          to="/compare"
          className="flex items-center gap-1.5 text-sm text-navy-600 hover:text-navy-800 font-medium mb-6 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Compare
        </Link>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-navy-800 to-navy-600 px-8 py-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-gold-400/20 rounded-full blur-3xl" />
            <div className="relative">
              <div className="flex items-center gap-3 mb-1">
                <svg className="w-6 h-6 text-gold-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <h1 className="font-display text-2xl font-bold text-white">Schedule Property Showings</h1>
              </div>
              <p className="text-white/70 text-sm">
                Request showings for {propCount} selected propert{propCount === 1 ? 'y' : 'ies'} in one easy step
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-8">

            {/* ── Selected Properties ── */}
            <div>
              <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                Selected Properties ({propCount})
              </h2>
              <div className="space-y-2">
                {selectedProperties.map((listing) => (
                  <PropertyPill
                    key={listing.ListingKey || listing.ListingId}
                    listing={listing}
                    onRemove={removeProperty}
                  />
                ))}
              </div>
              {propCount === 0 && (
                <p className="text-sm text-red-500 mt-2">
                  Please add at least one property.{' '}
                  <Link to="/listings" className="text-navy-600 font-semibold hover:underline">Browse listings →</Link>
                </p>
              )}
            </div>

            {/* ── Your Information ── */}
            <div>
              <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Your Information</h2>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Full Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => { setName(e.target.value); setErrors(p => ({ ...p, name: undefined })) }}
                    placeholder="John Smith"
                    className={`w-full px-4 py-2.5 border rounded-xl text-sm outline-none transition-all duration-200 ${
                      errors.name
                        ? 'border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-100'
                        : 'border-gray-200 focus:border-navy-500 focus:ring-2 focus:ring-navy-100'
                    }`}
                  />
                  {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Email <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setErrors(p => ({ ...p, email: undefined })) }}
                    placeholder="john@example.com"
                    className={`w-full px-4 py-2.5 border rounded-xl text-sm outline-none transition-all duration-200 ${
                      errors.email
                        ? 'border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-100'
                        : 'border-gray-200 focus:border-navy-500 focus:ring-2 focus:ring-navy-100'
                    }`}
                  />
                  {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(555) 000-0000"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-navy-500 focus:ring-2 focus:ring-navy-100 transition-all duration-200"
                  />
                </div>
              </div>
            </div>

            {/* ── Preferred Dates ── */}
            <div>
              <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                Preferred Dates
              </h2>
              <div className="space-y-2">
                {dates.map((d, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="flex-1 flex gap-2">
                      <input
                        type="date"
                        value={d.date}
                        min={new Date().toISOString().split('T')[0]}
                        onChange={(e) => { updateDate(i, 'date', e.target.value); setErrors(p => ({ ...p, dates: undefined })) }}
                        className="flex-1 px-3 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-navy-500 focus:ring-2 focus:ring-navy-100 transition-all duration-200"
                      />
                      <select
                        value={d.time}
                        onChange={(e) => updateDate(i, 'time', e.target.value)}
                        className="px-3 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-navy-500 focus:ring-2 focus:ring-navy-100 transition-all duration-200 bg-white appearance-none pr-8 cursor-pointer"
                        style={{ minWidth: '130px' }}
                      >
                        <option>Morning</option>
                        <option>Afternoon</option>
                        <option>Evening</option>
                      </select>
                    </div>
                    {dates.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeDate(i)}
                        className="w-8 h-8 flex items-center justify-center text-gray-300 hover:text-red-400 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    )}
                  </div>
                ))}
              </div>
              {errors.dates && <p className="text-xs text-red-500 mt-1">{errors.dates}</p>}
              <button
                type="button"
                onClick={addDate}
                className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-navy-600 hover:text-navy-800 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                Add another date
              </button>
            </div>

            {/* ── Pre-Qualification ── */}
            <div>
              <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Pre-Qualification</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {['Pre-approved', 'Working with lender', 'Just looking'].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setPreQual(preQual === opt ? '' : opt)}
                    className={`py-2.5 px-3 rounded-xl text-sm font-medium border-2 transition-all duration-200 text-center ${
                      preQual === opt
                        ? 'bg-navy-600 border-navy-600 text-white shadow-sm'
                        : 'bg-white border-gray-200 text-gray-600 hover:border-navy-300 hover:text-navy-700'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* ── Notes ── */}
            <div>
              <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Additional Notes</h2>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
                placeholder="Anything else you'd like us to know? Special requirements, questions about the properties, etc."
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-navy-500 focus:ring-2 focus:ring-navy-100 transition-all duration-200 resize-none"
              />
            </div>

            {/* ── Submit ── */}
            <div>
              <button
                type="submit"
                disabled={submitting || propCount === 0}
                className={`w-full py-4 rounded-xl font-bold text-base transition-all duration-200 flex items-center justify-center gap-2 shadow-lg ${
                  submitting || propCount === 0
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-gold-500 hover:bg-gold-600 text-navy-900 hover:shadow-xl transform hover:-translate-y-0.5'
                }`}
              >
                {submitting ? (
                  <>
                    <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Sending Request…
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Request Showings — {propCount} Propert{propCount === 1 ? 'y' : 'ies'}
                  </>
                )}
              </button>

              {/* Privacy note */}
              <div className="flex items-center justify-center gap-2 mt-3 text-xs text-gray-400">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Your info is private. We'll confirm within 2 hours.
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
