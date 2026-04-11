import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

function useIntersection() {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold: 0.15 }
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

const values = [
  {
    icon: '🤝',
    title: 'Integrity First',
    desc: 'Every recommendation, every negotiation — we operate with complete transparency and honesty.',
  },
  {
    icon: '🎯',
    title: 'Results-Driven',
    desc: "Your goals are the goal. Whether it's top dollar for your sale or finding the perfect home, success is the only outcome.",
  },
  {
    icon: '💡',
    title: 'Market Intelligence',
    desc: "Continuous research and local insight to give you an edge in South Florida's competitive real estate market.",
  },
  {
    icon: '❤️',
    title: 'Community Rooted',
    desc: "As South Florida natives, we're deeply invested in the communities we serve — not just the transactions.",
  },
]

const expertise = [
  { area: 'Miami-Dade County', years: '5+ years', specialties: 'Miami Beach, Brickell, Coral Gables, Doral, Aventura, Homestead, Kendall', image: '/counties/county-miami-dade.jpg', slug: 'miami-dade-county' },
  { area: 'Broward County', years: '8+ years', specialties: 'Hollywood, Fort Lauderdale, Hallandale Beach, Pembroke Pines, Weston, Coral Springs, Parkland', image: '/counties/county-broward.jpg', slug: 'broward-county' },
  { area: 'Palm Beach County', years: '6+ years', specialties: 'Boca Raton, West Palm Beach, Delray Beach, Boynton Beach', image: '/counties/county-palm-beach.jpg', slug: 'palm-beach-county' },
  { area: 'St. Lucie County', years: '4+ years', specialties: 'Port St. Lucie, Stuart, Palm City', image: '/counties/county-st-lucie.jpg', slug: 'st-lucie-county' },
]

function toSlug(name) {
  return name.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
}

// Broker — featured at top
const broker = {
  name: 'Alexis Hernandez',
  title: 'Broker',
  titleBadge: 'Broker/Partner',
  photo: '/team/alexis-hernandez.jpg',
  initials: 'AH',
  gradient: 'from-navy-800 to-navy-600',
  badgeGradient: 'from-navy-700 to-navy-900',
  accentColor: 'text-navy-600',
  bio: [
    "Alexis Hernandez is the Broker and Partner at Virtus Realty Group and the driving force behind the company's reputation for excellence in South Florida real estate. With deep roots in the community and years of experience spanning residential sales, investment properties, and luxury real estate, Alexis leads the team with vision and integrity.",
    "Licensed and deeply versed in Florida real estate law, Alexis ensures that every transaction at Virtus Realty Group meets the highest standards of compliance, ethics, and client care. Her leadership has shaped the brokerage into a trusted name across Miami-Dade, Broward, Palm Beach, and St. Lucie counties.",
    'As broker, Alexis mentors agents, oversees all transactions, and personally ensures that every client receives the expert guidance and support they deserve from start to close.',
  ],
  credentials: ['Florida Licensed Real Estate Broker', 'MLS Member', 'NAR Member', 'South Florida Market Expert'],
}

// Agents — 3-column grid below
const agents = [
  {
    name: 'Nicolas Gonzalez',
    title: 'Licensed Realtor Associate/Agent',
    titleBadge: 'Licensed Realtor Associate',
    profilePath: '/team/nicolas-gonzalez',
    photo: '/team/nicolas-gonzalez.jpg',
    initials: 'NG',
    gradient: 'from-gold-600 to-gold-400',
    badgeGradient: 'from-gold-500 to-gold-700',
    accentColor: 'text-gold-600',
    bio: [
      "Nicolas Gonzalez is a Licensed Realtor Associate at Virtus Realty Group and a South Florida native with a passion for connecting people with properties that truly fit their lives. Growing up in the region gave Nicolas an intimate knowledge of every neighborhood, school district, and community nuance that makes South Florida unique.",
      "Nicolas built his reputation one client at a time — listening deeply, advising honestly, and negotiating relentlessly on behalf of every buyer and seller. He doesn't chase volume; he builds relationships. Many of his clients have become repeat customers and lifelong referral sources because the trust is real.",
      "Whether you're a first-time buyer, a seasoned investor, or a seller looking to maximize your return — Nicolas brings the same level of commitment, expertise, and personal attention to every transaction.",
    ],
    credentials: ['Florida Licensed Realtor', 'MLS Member', 'NAR Member', 'First-Time Buyer Specialist'],
  },
  {
    name: 'Christopher Petrillo',
    title: 'Licensed Realtor Associate/Agent',
    titleBadge: 'Licensed Realtor Associate',
    photo: '/team/christopher-petrillo.jpg',
    initials: 'CP',
    gradient: 'from-navy-700 to-gold-600',
    badgeGradient: 'from-navy-600 to-gold-500',
    accentColor: 'text-navy-600',
    bio: [
      "Christopher Petrillo is a Licensed Realtor Associate at Virtus Realty Group and a dedicated South Florida real estate professional committed to helping clients achieve their property goals. His approachable style and deep market knowledge make the buying and selling process clear, confident, and stress-free.",
      "With a client-first mindset, Christopher specializes in guiding both first-time buyers and experienced investors through South Florida's dynamic market. He's known for his responsiveness, attention to detail, and unwavering commitment to getting the best possible outcome for every client he represents.",
    ],
    credentials: ['Florida Licensed Realtor', 'MLS Member', 'NAR Member'],
  },
  {
    name: 'Eva Kuusmann',
    title: 'Licensed Realtor Associate/Agent',
    titleBadge: 'Licensed Realtor Associate',
    initials: 'EK',
    gradient: 'from-gold-400 to-navy-700',
    badgeGradient: 'from-gold-400 to-navy-600',
    accentColor: 'text-gold-600',
    bio: [
      "Eva Kuusmann is a Licensed Realtor Associate at Virtus Realty Group who brings warmth, professionalism, and sharp market instincts to every transaction. Eva is passionate about South Florida real estate and dedicates herself to helping clients navigate the market with clarity and confidence.",
      "Whether you're relocating to the area, upsizing, or searching for your first home, Eva provides the kind of hands-on guidance and honest counsel that turns a complex process into an exciting milestone. Her clients appreciate her thoroughness, communication, and genuine investment in their success.",
    ],
    credentials: ['Florida Licensed Realtor', 'MLS Member', 'NAR Member'],
  },
]

function BrokerCard({ member }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      {/* Photo Card */}
      <div>
        <div className="relative">
          <div className={`relative rounded-2xl overflow-hidden aspect-[4/5] bg-gradient-to-br ${member.gradient} shadow-2xl`}>
            {member.photo ? (
              <img src={member.photo} alt={member.name} className="absolute inset-0 w-full h-full object-cover" />
            ) : (
              <>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white/30">
                  <div className={`w-40 h-40 rounded-full bg-gradient-to-br ${member.badgeGradient} opacity-30 mb-4`} />
                  <svg className="w-32 h-32 absolute" fill="white" viewBox="0 0 24 24" opacity="0.2">
                    <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
                  </svg>
                </div>
                {/* Avatar circle */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <span className="font-display font-bold text-5xl text-white">{member.initials}</span>
                  </div>
                </div>
              </>
            )}
            {/* Bottom overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
              <p className="text-white font-display font-bold text-2xl">{member.name}</p>
              <p className="text-white/80 text-sm mt-1">{member.titleBadge} · Virtus Realty Group</p>
            </div>
          </div>
          {/* Title badge */}
          <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-4 border border-gray-100">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 bg-gradient-to-br ${member.badgeGradient} rounded-xl flex items-center justify-center text-white font-display font-bold text-lg`}>
                {member.initials[0]}
              </div>
              <div>
                <p className="font-bold text-gray-900 text-sm">{member.titleBadge}</p>
                <p className="text-navy-600 text-xs font-medium">Virtus Realty Group</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bio Text */}
      <div>
        <span className={`${member.accentColor} font-semibold text-sm uppercase tracking-wider`}>
          {member.title}
        </span>
        <h2 className="font-display text-4xl font-bold text-gray-900 mt-2 mb-6">
          {member.name}
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          {member.bio.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        {/* Credentials */}
        <div className="mt-6 flex flex-wrap gap-2">
          {member.credentials.map(cred => (
            <span
              key={cred}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-navy-50 border border-navy-100 text-navy-700 text-xs font-semibold"
            >
              <svg className="w-3.5 h-3.5 text-gold-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              {cred}
            </span>
          ))}
        </div>

        <div className="mt-8">
          <Link to="/contact" className="btn-secondary">
            Contact {member.name.split(' ')[0]}
          </Link>
        </div>
      </div>
    </div>
  )
}

function AgentCard({ member, delay = 0 }) {
  const CardWrapper = member.profilePath
    ? ({ children }) => (
        <Link to={member.profilePath} className="block group/card">
          {children}
        </Link>
      )
    : ({ children }) => <div>{children}</div>
  return (
    <AnimateIn delay={delay}>
      <CardWrapper>
      <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
        {/* Avatar area */}
        <div className={`relative h-48 bg-gradient-to-br ${member.gradient} flex items-center justify-center`}>
          <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center ring-4 ring-white/30">
            <span className="font-display font-bold text-4xl text-white">{member.initials}</span>
          </div>
          {/* Bottom gradient */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4">
            <p className="text-white font-display font-semibold text-lg leading-tight">{member.name}</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <span className={`${member.accentColor} font-semibold text-xs uppercase tracking-wider`}>
            {member.titleBadge}
          </span>
          <p className="text-gray-600 text-sm leading-relaxed mt-3">
            {member.bio[0]}
          </p>

          {/* Credentials */}
          <div className="mt-4 flex flex-wrap gap-1.5">
            {member.credentials.map(cred => (
              <span
                key={cred}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-navy-50 border border-navy-100 text-navy-700 text-xs font-medium"
              >
                <svg className="w-3 h-3 text-gold-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                {cred}
              </span>
            ))}
          </div>

          <div className="mt-5 flex items-center gap-3">
            {member.profilePath && (
              <Link to={member.profilePath} className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold-600 hover:text-gold-700 transition-colors duration-200">
                View Profile
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            )}
            <Link to="/contact" className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy-700 hover:text-gold-600 transition-colors duration-200">
              Contact {member.name.split(' ')[0]}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
      </CardWrapper>
    </AnimateIn>
  )
}

export default function About() {
  // SEO Meta Tags
  useEffect(() => {
    document.title = 'About Virtus Realty Group | REO & Investment Property Specialists | South Florida'
    const meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute('content', 'Meet the Virtus Realty team — licensed real estate professionals specializing in bank-owned properties, distressed assets, and Dominican Republic investments. Based in South Florida.')
    // OG tags
    const ogTitle = document.querySelector('meta[property="og:title"]')
    if (ogTitle) ogTitle.setAttribute('content', 'About Virtus Realty Group | REO & Investment Property Specialists | South Florida')
    const ogDesc = document.querySelector('meta[property="og:description"]')
    if (ogDesc) ogDesc.setAttribute('content', 'Meet the Virtus Realty team — licensed real estate professionals specializing in bank-owned properties, distressed assets, and Dominican Republic investments. Based in South Florida.')
    const ogUrl = document.querySelector('meta[property="og:url"]')
    if (ogUrl) ogUrl.setAttribute('content', 'https://virtusrealtygroup.com/about')
  }, [])

  return (
    <div>
      {/* PAGE HERO */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-95" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-navy-400/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 right-0 h-16">
          <svg viewBox="0 0 1200 80" preserveAspectRatio="none" className="w-full h-full">
            <path d="M0,40 C400,80 800,0 1200,40 L1200,80 L0,80 Z" fill="white" />
          </svg>
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block text-gold-300 font-semibold text-sm uppercase tracking-wider mb-4">
            About Virtus Realty Group
          </span>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-6">
            Meet Our Team
          </h1>
          <p className="text-white/80 text-xl max-w-2xl mx-auto leading-relaxed">
            Experienced, dedicated, and deeply rooted in South Florida real estate.
            Brokered by Alexis Hernandez — serving buyers and sellers across the region.
          </p>
        </div>
      </section>

      {/* BROKERAGE CALLOUT */}
      <section className="py-10 bg-navy-50 border-b border-navy-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-navy-700 font-semibold text-lg">
            🏢 <strong>Virtus Realty Group</strong> — Brokered by <strong>Alexis Hernandez</strong>
          </p>
          <p className="text-navy-600 text-sm mt-1">
            Licensed Florida Real Estate Brokerage · Serving Miami-Dade, Broward, Palm Beach &amp; St. Lucie Counties
          </p>
        </div>
      </section>

      {/* BROKER PROFILE — Featured */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateIn>
            <div className="text-center mb-16">
              <span className="text-gold-500 font-semibold text-sm uppercase tracking-wider">Our People</span>
              <h2 className="font-display text-4xl font-bold text-gray-900 mt-2">The Virtus Realty Team</h2>
              <p className="text-gray-600 text-lg mt-3 max-w-xl mx-auto">
                A dedicated team of South Florida real estate professionals committed to your success.
              </p>
            </div>
          </AnimateIn>

          {/* Broker — large featured layout */}
          <AnimateIn>
            <BrokerCard member={broker} />
          </AnimateIn>
        </div>
      </section>

      {/* AGENTS — 3-column grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateIn>
            <div className="text-center mb-12">
              <span className="text-navy-600 font-semibold text-sm uppercase tracking-wider">Our Agents</span>
              <h2 className="font-display text-3xl font-bold text-gray-900 mt-2">Licensed Realtor Associates</h2>
              <p className="text-gray-600 mt-3 max-w-xl mx-auto">
                Each agent brings local expertise, genuine care, and proven results to every client relationship.
              </p>
            </div>
          </AnimateIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {agents.map((agent, idx) => (
              <AgentCard key={agent.name} member={agent} delay={idx * 100} />
            ))}
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateIn>
            <div className="text-center mb-14">
              <span className="text-navy-600 font-semibold text-sm uppercase tracking-wider">What We Stand For</span>
              <h2 className="font-display text-4xl font-bold text-gray-900 mt-2">Our Core Values</h2>
              <p className="text-gray-600 text-lg mt-3 max-w-xl mx-auto">
                These aren't just words on a page — they're the principles that guide every decision and interaction.
              </p>
            </div>
          </AnimateIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <AnimateIn key={v.title} delay={i * 100}>
                <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 text-center border border-gray-100">
                  <div className="text-4xl mb-4">{v.icon}</div>
                  <h3 className="font-display font-bold text-lg text-gray-900 mb-2">{v.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{v.desc}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERTISE BY AREA */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateIn>
            <div className="text-center mb-14">
              <span className="text-gold-600 font-semibold text-sm uppercase tracking-wider">Regional Expertise</span>
              <h2 className="font-display text-4xl font-bold text-gray-900 mt-2">South Florida Coverage</h2>
            </div>
          </AnimateIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {expertise.map((e, i) => (
              <AnimateIn key={e.area} delay={i * 100}>
                <Link
                  to={`/homes-for-sale/${e.slug}`}
                  className="group block rounded-2xl overflow-hidden shadow-md border-2 border-transparent hover:border-gold-400 hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gold-400"
                  style={{ height: '300px' }}
                >
                  <div className="relative w-full h-full bg-navy-800">
                    {/* Background image */}
                    <img
                      src={e.image}
                      alt={e.area}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(ev) => { ev.currentTarget.style.display = 'none' }}
                    />
                    {/* Dark gradient overlay from bottom */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />

                    {/* Years badge — top right */}
                    <div className="absolute top-3 right-3">
                      <span className="inline-block bg-gold-500/90 backdrop-blur-sm text-white text-xs font-bold px-2.5 py-1 rounded-full shadow">
                        {e.years}
                      </span>
                    </div>

                    {/* Bottom content */}
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="font-display font-bold text-xl text-white drop-shadow mb-2">{e.area}</h3>

                      {/* Community pill badges */}
                      <div className="flex flex-wrap gap-1 mb-3">
                        {e.specialties.split(',').map((name) => {
                          const trimmed = name.trim()
                          return (
                            <span
                              key={trimmed}
                              onClick={(ev) => ev.preventDefault()}
                              className="group/pill"
                            >
                              <Link
                                to={`/homes-for-sale/${toSlug(trimmed)}`}
                                onClick={(ev) => ev.stopPropagation()}
                                className="inline-block bg-navy-700/80 hover:bg-gold-500 text-white text-xs font-medium px-2 py-0.5 rounded-full transition-colors duration-200 backdrop-blur-sm"
                              >
                                {trimmed}
                              </Link>
                            </span>
                          )
                        })}
                      </div>

                      {/* CTA */}
                      <span className="inline-flex items-center gap-1.5 bg-white/10 hover:bg-gold-500 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors duration-200 border border-white/20 group-hover:border-gold-400">
                        🏠 View {e.area} Listings →
                      </span>
                    </div>
                  </div>
                </Link>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* MISSION STATEMENT */}
      <section className="py-20 gradient-ocean relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold-300 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimateIn>
            <svg className="w-12 h-12 text-white/40 mx-auto mb-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
            </svg>
            <blockquote className="font-display text-2xl md:text-3xl font-medium text-white leading-relaxed italic mb-8">
              "Our mission is simple: to be the trusted advisors our clients deserve. Not just for this transaction — 
              but for every real estate decision they'll ever make."
            </blockquote>
            <div className="flex items-center justify-center gap-3">
              <div className="flex -space-x-2">
                {['AH', 'NG', 'CP', 'EK'].map(initials => (
                  <div key={initials} className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center border-2 border-white/40">
                    <span className="text-white font-display font-bold text-xs">{initials}</span>
                  </div>
                ))}
              </div>
              <div className="text-left">
                <p className="text-white font-semibold">The Virtus Realty Team</p>
                <p className="text-white/70 text-sm">Virtus Realty Group — South Florida Real Estate</p>
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimateIn>
            <h2 className="font-display text-3xl font-bold text-gray-900 mb-4">Ready to Work Together?</h2>
            <p className="text-gray-600 text-lg mb-8">
              Reach out for a free consultation. No pressure, no obligation — just honest advice from 
              a team that knows South Florida real estate inside and out.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="btn-primary">
                Schedule Free Consultation
              </Link>
              <Link to="/listings" className="btn-secondary">
                Browse Listings
              </Link>
            </div>
          </AnimateIn>
        </div>
      </section>
    </div>
  )
}
