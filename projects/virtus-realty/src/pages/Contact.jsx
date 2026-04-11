import React, { useEffect, useRef, useState } from 'react'

function useIntersection() {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold: 0.1 }
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

const inquiryTypes = [
  'I want to buy a home',
  'I want to sell my home',
  'I want a free home valuation',
  'I\'m looking for investment properties',
  'I\'m a first-time buyer',
  'I have a general question',
  'Other',
]

export default function Contact() {
  // SEO Meta Tags
  useEffect(() => {
    document.title = 'Contact Virtus Realty Group | REO & Investment Property Inquiries'
    const meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute('content', 'Get in touch with Virtus Realty Group for REO properties, bank foreclosures, and Dominican Republic investment opportunities. Call (954) 600-4976 or WhatsApp.')
    // OG tags
    const ogTitle = document.querySelector('meta[property="og:title"]')
    if (ogTitle) ogTitle.setAttribute('content', 'Contact Virtus Realty Group | REO & Investment Property Inquiries')
    const ogDesc = document.querySelector('meta[property="og:description"]')
    if (ogDesc) ogDesc.setAttribute('content', 'Get in touch with Virtus Realty Group for REO properties, bank foreclosures, and Dominican Republic investment opportunities. Call (954) 600-4976 or WhatsApp.')
    const ogUrl = document.querySelector('meta[property="og:url"]')
    if (ogUrl) ogUrl.setAttribute('content', 'https://virtusrealtygroup.com/contact')
  }, [])

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: '',
    area: '',
    message: '',
    budget: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState({})

  const validate = () => {
    const errs = {}
    if (!formData.name.trim()) errs.name = 'Name is required'
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) errs.email = 'Valid email is required'
    if (!formData.inquiryType) errs.inquiryType = 'Please select an inquiry type'
    if (!formData.message.trim()) errs.message = 'Please add a message'
    return errs
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    setErrors({})
    // In a real implementation, this would submit to a backend/Formspree/EmailJS
    setSubmitted(true)
  }

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    if (errors[e.target.name]) {
      setErrors(prev => ({ ...prev, [e.target.name]: '' }))
    }
  }

  return (
    <div>
      {/* HERO */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-700 via-navy-600 to-navy-700" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold-400/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold-400/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 right-0 h-16">
          <svg viewBox="0 0 1200 80" preserveAspectRatio="none" className="w-full h-full">
            <path d="M0,40 C400,80 800,0 1200,40 L1200,80 L0,80 Z" fill="white" />
          </svg>
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block text-gold-300 font-semibold text-sm uppercase tracking-wider mb-4">Let's Connect</span>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-6">Get in Touch</h1>
          <p className="text-white/80 text-xl max-w-2xl mx-auto leading-relaxed">
            Ready to take the next step? Nicolas responds personally to every inquiry — usually within a few hours.
          </p>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Sidebar */}
            <AnimateIn className="lg:col-span-2">
              <div className="space-y-8">
                {/* Contact info */}
                <div>
                  <h2 className="font-display text-2xl font-bold text-gray-900 mb-6">Contact Nicolas</h2>
                  <div className="space-y-4">
                    <a href="tel:9546004976" className="flex items-center gap-4 p-4 rounded-2xl bg-navy-50 hover:bg-navy-100 transition-colors group">
                      <div className="w-12 h-12 bg-navy-600 rounded-xl flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Phone / Text</p>
                        <p className="font-semibold text-gray-900 group-hover:text-navy-700 transition-colors">(954) 600-4976</p>
                      </div>
                    </a>

                    <a href="mailto:info@virtusrealtygroup.com" className="flex items-center gap-4 p-4 rounded-2xl bg-gold-50 hover:bg-gold-100 transition-colors group">
                      <div className="w-12 h-12 bg-navy-700 rounded-xl flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Email</p>
                        <p className="font-semibold text-gray-900 text-sm group-hover:text-navy-800 transition-colors">info@virtusrealtygroup.com</p>
                      </div>
                    </a>

                    <div className="flex items-center gap-4 p-4 rounded-2xl bg-gold-50">
                      <div className="w-12 h-12 bg-gold-500 rounded-xl flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Service Area</p>
                        <p className="font-semibold text-gray-900 text-sm">Miami-Dade · Broward · Palm Beach · St. Lucie</p>
                        <p className="text-xs text-gray-500 mt-0.5">Mobile — meets clients anywhere</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50">
                      <div className="w-12 h-12 bg-gray-700 rounded-xl flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Response Time</p>
                        <p className="font-semibold text-gray-900 text-sm">Usually within 2-4 hours</p>
                        <p className="text-xs text-gray-500 mt-0.5">7 days a week</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Social */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Follow Nicolas</h3>
                  <div className="flex gap-3">
                    {[
                      { icon: 'f', label: 'Facebook', color: 'hover:bg-blue-600', bg: 'bg-blue-50', text: 'text-blue-700' },
                      { icon: '📷', label: 'Instagram', color: 'hover:bg-pink-600', bg: 'bg-pink-50', text: 'text-pink-600' },
                      { icon: 'in', label: 'LinkedIn', color: 'hover:bg-blue-800', bg: 'bg-blue-50', text: 'text-blue-800' },
                    ].map(({ icon, label, color, bg, text }) => (
                      <a
                        key={label}
                        href="#"
                        aria-label={label}
                        className={`w-12 h-12 ${bg} ${text} rounded-xl flex items-center justify-center font-bold text-sm hover:text-white ${color} transition-all duration-200`}
                      >
                        {icon}
                      </a>
                    ))}
                  </div>
                </div>

                {/* Quick value props */}
                <div className="bg-gradient-to-br from-navy-600 to-navy-700 rounded-2xl p-6 text-white">
                  <h3 className="font-display font-bold text-lg mb-4">Free Services</h3>
                  <ul className="space-y-2">
                    {[
                      '✓ Free home valuation',
                      '✓ Free buyer consultation',
                      '✓ Free market analysis',
                      '✓ No upfront costs',
                    ].map(item => (
                      <li key={item} className="text-white/90 text-sm font-medium">{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </AnimateIn>

            {/* FORM */}
            <AnimateIn delay={100} className="lg:col-span-3">
              {submitted ? (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center p-12">
                    <div className="w-20 h-20 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg className="w-10 h-10 text-navy-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </div>
                    <h2 className="font-display text-3xl font-bold text-gray-900 mb-3">Message Received! 🙌</h2>
                    <p className="text-gray-600 text-lg mb-2">
                      Thanks for reaching out, <strong>{formData.name.split(' ')[0]}</strong>!
                    </p>
                    <p className="text-gray-500 mb-8">
                      Nicolas will review your message and get back to you personally within a few hours. 
                      In the meantime, feel free to call or text at (954) 600-4976.
                    </p>
                    <button
                      onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', phone: '', inquiryType: '', area: '', message: '', budget: '' }) }}
                      className="btn-primary"
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-50 rounded-3xl p-8 md:p-10 border border-gray-100">
                  <h2 className="font-display text-2xl font-bold text-gray-900 mb-2">Send a Message</h2>
                  <p className="text-gray-500 text-sm mb-8">All fields marked * are required.</p>

                  <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                    {/* Name + Email row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name *</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Jane Smith"
                          className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 transition-all bg-white ${
                            errors.name ? 'border-red-400 focus:ring-red-300' : 'border-gray-200 focus:ring-navy-400 focus:border-navy-400'
                          }`}
                        />
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address *</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="jane@example.com"
                          className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 transition-all bg-white ${
                            errors.email ? 'border-red-400 focus:ring-red-300' : 'border-gray-200 focus:ring-navy-400 focus:border-navy-400'
                          }`}
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                      </div>
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone Number <span className="text-gray-400 font-normal">(optional)</span></label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="(954) 600-4976"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-navy-400 focus:border-navy-400 transition-all bg-white"
                      />
                    </div>

                    {/* Inquiry Type */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">How Can Nicolas Help? *</label>
                      <select
                        name="inquiryType"
                        value={formData.inquiryType}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 transition-all bg-white ${
                          errors.inquiryType ? 'border-red-400 focus:ring-red-300' : 'border-gray-200 focus:ring-navy-400 focus:border-navy-400'
                        }`}
                      >
                        <option value="">Select one...</option>
                        {inquiryTypes.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                      {errors.inquiryType && <p className="text-red-500 text-xs mt-1">{errors.inquiryType}</p>}
                    </div>

                    {/* Area + Budget row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Area of Interest <span className="text-gray-400 font-normal">(optional)</span></label>
                        <input
                          type="text"
                          name="area"
                          value={formData.area}
                          onChange={handleChange}
                          placeholder="e.g., Hollywood, Boca Raton"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-navy-400 focus:border-navy-400 transition-all bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Budget Range <span className="text-gray-400 font-normal">(optional)</span></label>
                        <select
                          name="budget"
                          value={formData.budget}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-navy-400 focus:border-navy-400 transition-all bg-white"
                        >
                          <option value="">Select range...</option>
                          <option>Under $300K</option>
                          <option>$300K – $500K</option>
                          <option>$500K – $750K</option>
                          <option>$750K – $1M</option>
                          <option>$1M – $2M</option>
                          <option>$2M+</option>
                        </select>
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Your Message *</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={5}
                        placeholder="Tell Nicolas about your situation, goals, timeline, or any questions you have..."
                        className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 transition-all resize-none bg-white ${
                          errors.message ? 'border-red-400 focus:ring-red-300' : 'border-gray-200 focus:ring-navy-400 focus:border-navy-400'
                        }`}
                      />
                      {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 bg-gradient-to-r from-navy-600 to-navy-700 text-white font-bold rounded-xl hover:from-navy-700 hover:to-navy-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-lg"
                    >
                      Send Message to Nicolas →
                    </button>

                    <p className="text-xs text-gray-400 text-center">
                      Your information is kept 100% confidential. Nicolas will reach out personally.
                    </p>
                  </form>
                </div>
              )}
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* QUICK ACTIONS */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateIn>
            <h2 className="font-display text-2xl font-bold text-gray-900 text-center mb-10">Quick Actions</h2>
          </AnimateIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: '🏡',
                title: 'Get Your Free Home Valuation',
                desc: 'Find out what your home is worth in today\'s South Florida market — no obligation, delivered fast.',
                action: 'Request Valuation',
                gradient: 'from-navy-500 to-navy-700',
              },
              {
                icon: '📅',
                title: 'Schedule a Consultation',
                desc: 'Book a free, no-pressure meeting with Nicolas — in person, video call, or phone.',
                action: 'Book Time with Nicolas',
                gradient: 'from-gold-500 to-navy-800',
              },
              {
                icon: '📊',
                title: 'Get Market Analysis',
                desc: 'Receive a customized market report for any neighborhood in South Florida.',
                action: 'Request Report',
                gradient: 'from-gold-500 to-gold-500',
              },
            ].map((item, i) => (
              <AnimateIn key={item.title} delay={i * 100}>
                <div className={`rounded-2xl bg-gradient-to-br ${item.gradient} p-8 text-white relative overflow-hidden group hover:shadow-2xl transition-shadow duration-300`}>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-xl" />
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="font-display font-bold text-xl mb-3">{item.title}</h3>
                  <p className="text-white/80 text-sm leading-relaxed mb-6">{item.desc}</p>
                  <a
                    href="mailto:info@virtusrealtygroup.com"
                    className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-sm border border-white/30 text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-white/30 transition-all duration-200"
                  >
                    {item.action} →
                  </a>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
