import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

/* ─── Animation hook ─────────────────────────────────────────────────────── */
function useIntersection(options = {}) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold: 0.08, ...options }
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

/* ─── WhatsApp Icon ──────────────────────────────────────────────────────── */
function WhatsAppIcon({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

/* ─── Property Data ──────────────────────────────────────────────────────── */
const casas = [
  { num: 1,  code: '191568', location: 'Higüey — Res. Sol Brillante',       m2: '180.67',   beds: 3,  baths: '2',    features: 'Gallery, Carport',              rdAsk: 'RD$3,079,496',   usdAsk: '$44,000'   },
  { num: 2,  code: '191592', location: 'Higüey — Res. Sol Brillante',       m2: '153.58',   beds: 3,  baths: '2',    features: 'Gallery, Carport',              rdAsk: 'RD$3,009,964',   usdAsk: '$43,000'   },
  { num: 3,  code: '191547', location: 'La Romana — Res. Vista Catalina',   m2: '345.06',   beds: 4,  baths: '4',    features: '2 Floors, 2 Parking',           rdAsk: 'RD$7,159,833',   usdAsk: '$102,300'  },
  { num: 4,  code: '191269', location: 'SD Norte — Villa Satélite II',      m2: '1,510.87', beds: 3,  baths: '2.5',  features: '3 Carports, Family Room',       rdAsk: 'RD$7,701,493',   usdAsk: '$110,000'  },
  { num: 5,  code: '191551', location: 'SD Este — Res. Don Miguel',         m2: '158.39',   beds: 4,  baths: '4',    features: 'Patio',                         rdAsk: 'RD$5,802,075',   usdAsk: '$82,900'   },
  { num: 6,  code: '191532', location: 'SD Este — Urb. Lucerna',            m2: '273.76',   beds: 4,  baths: '4',    features: 'Service Quarter, Carport',      rdAsk: 'RD$8,359,739',   usdAsk: '$119,400'  },
  { num: 7,  code: '191546', location: 'SD Este — Prado Oriental',          m2: '330.63',   beds: 7,  baths: '4',    features: 'Family Room, Balcony',          rdAsk: 'RD$13,290,469',  usdAsk: '$189,900'  },
  { num: 8,  code: '191505', location: 'SD Este — Alma Rosa II',            m2: '226.61',   beds: 10, baths: '5',    features: '2 Floors, Service Quarter',     rdAsk: 'RD$9,696,390',   usdAsk: '$138,500'  },
  { num: 9,  code: '191535', location: 'SD Este — Cancino',                 m2: '246.90',   beds: 4,  baths: '3.5',  features: '2 Floors, Terrace',             rdAsk: 'RD$7,732,636',   usdAsk: '$110,500'  },
  { num: 10, code: '191567', location: 'Baní — Res. Costa Sur',             m2: '398.81',   beds: 5,  baths: '4.75', features: 'Pool, Jacuzzi, 2 Parking',      rdAsk: 'RD$21,890,263',  usdAsk: '$312,700'  },
]

const apartamentos = [
  { num: 11, code: '191580', location: 'SD Este — Prados Del Cachon',       m2: '177.57', beds: 3, baths: '2.5', features: 'Terrace, 2 Parking',                    rdAsk: 'RD$6,958,862',  usdAsk: '$99,400'  },
  { num: 12, code: '191561', location: 'SD Este — Ciudad Juan Bosch',       m2: '89.50',  beds: 3, baths: '2',   features: 'Balcony, 1 Parking',                    rdAsk: 'RD$3,669,500',  usdAsk: '$52,400'  },
  { num: 13, code: '191576', location: 'SD Este — Ciudad Juan Bosch',       m2: '89.50',  beds: 3, baths: '2',   features: '4th Floor, 1 Parking',                  rdAsk: 'RD$4,328,206',  usdAsk: '$61,800'  },
  { num: 14, code: '191574', location: 'SD Este — Vista Hermosa',           m2: '168.30', beds: 3, baths: '2.5', features: 'Terrace, 2 Parking',                    rdAsk: 'RD$7,245,600',  usdAsk: '$103,500' },
  { num: 15, code: '191575', location: 'SD Este — Tropical del Este',       m2: '109.40', beds: 3, baths: '2',   features: 'Balcony, 1 Parking',                    rdAsk: 'RD$6,200,191',  usdAsk: '$88,600'  },
  { num: 16, code: '191498', location: 'SD Este — San Jose de Mendoza',     m2: '129.34', beds: 3, baths: '2',   features: 'Pool, Gym, Basketball, 2 Parking',      rdAsk: 'RD$7,009,038',  usdAsk: '$100,100' },
  { num: 17, code: '191550', location: 'SD Este — El Cachón (PENTHOUSE)',   m2: '396.00', beds: 3, baths: '4',   features: '2 Floors, BBQ Terrace, 2 Parking',      rdAsk: 'RD$14,390,474', usdAsk: '$205,600' },
  { num: 18, code: '191475', location: 'SD Este — Villa Tropicalia',        m2: '93.87',  beds: 3, baths: '2',   features: '1 Parking',                             rdAsk: 'RD$3,491,637',  usdAsk: '$49,900'  },
  { num: 19, code: '191577', location: 'SD Este — Corales del Sur',         m2: '258.35', beds: 3, baths: '2.5', features: 'Terrace, Service Quarter',               rdAsk: 'RD$11,775,655', usdAsk: '$168,200' },
  { num: 20, code: '191519', location: 'SD Oeste — Hato Nuevo',             m2: '72.45',  beds: 3, baths: '2',   features: '1 Parking',                             rdAsk: 'RD$2,491,320',  usdAsk: '$35,600'  },
]

const solares = [
  { num: 21, code: '190434',    location: 'SD Oeste — Sector Alameda',          m2: '500.00',    zone: 'Urban',       rdAsk: 'RD$6,712,845',  usdAsk: '$95,900' },
  { num: 22, code: '190031',    location: 'San Cristóbal — Madre Vieja',        m2: '1,487.00',  zone: 'Semi-Urban',  rdAsk: 'RD$3,791,000',  usdAsk: '$54,200' },
  { num: 23, code: '240017-9',  location: 'Villa Altagracia — La Cumbre',       m2: '1,302.32',  zone: 'Development', rdAsk: 'RD$1,490,418',  usdAsk: '$21,300' },
  { num: 24, code: '240017-10', location: 'Villa Altagracia — La Cumbre',       m2: '1,186.54',  zone: 'Development', rdAsk: 'RD$1,269,667',  usdAsk: '$18,100' },
  { num: 25, code: '240017-18', location: 'Villa Altagracia — La Cumbre',       m2: '6,391.86',  zone: 'Development', rdAsk: 'RD$5,837,662',  usdAsk: '$83,400' },
  { num: 26, code: '240017-19', location: 'Villa Altagracia — La Cumbre',       m2: '5,374.81',  zone: 'Development', rdAsk: 'RD$4,509,381',  usdAsk: '$64,400' },
  { num: 27, code: '240017-20', location: 'Villa Altagracia — La Cumbre',       m2: '6,025.01',  zone: 'Development', rdAsk: 'RD$5,301,247',  usdAsk: '$75,700' },
]

/* ─── Image Mapping ──────────────────────────────────────────────────────── */
function getCasaImage(code) {
  if (code === '191568' || code === '191592') return '/dr-listings/apap/higuey-casa.jpg'
  if (code === '191547') return '/dr-listings/apap/la-romana-casa.jpg'
  if (code === '191269') return '/dr-listings/apap/sd-norte-casa.jpg'
  if (code === '191551' || code === '191532') return '/dr-listings/apap/sd-este-casa.jpg'
  if (code === '191546' || code === '191505' || code === '191535') return '/dr-listings/apap/sd-este-casa-large.jpg'
  if (code === '191567') return '/dr-listings/apap/bani-villa.jpg'
  return '/dr-listings/apap/sd-este-casa.jpg'
}

function getAptoImage(code) {
  if (code === '191498') return '/dr-listings/apap/sd-este-apto-luxury.jpg'
  if (code === '191550') return '/dr-listings/apap/sd-este-penthouse.jpg'
  if (code === '191519') return '/dr-listings/apap/sd-oeste-apto.jpg'
  return '/dr-listings/apap/sd-este-apto.jpg'
}

function getSolarImage(code) {
  if (code === '190434') return '/dr-listings/apap/sd-oeste-solar.jpg'
  if (code === '190031') return '/dr-listings/apap/san-cristobal-solar.jpg'
  if (code.startsWith('240017')) return '/dr-listings/apap/villa-altagracia-solar.jpg'
  return '/dr-listings/apap/villa-altagracia-solar.jpg'
}

/* ─── Card Styles ────────────────────────────────────────────────────────── */
const cardGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '20px',
}

const cardStyle = {
  background: '#141e31',
  border: '1px solid rgba(180,151,80,0.22)',
  borderRadius: '14px',
  overflow: 'hidden',
  transition: 'transform 0.22s ease, box-shadow 0.22s ease',
  cursor: 'default',
}

const subtotalBarStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  gap: '8px',
  padding: '14px 22px',
  borderRadius: '10px',
  marginTop: '20px',
  background: 'linear-gradient(135deg, #141e31, #1c2d4a)',
  border: '1px solid rgba(180,151,80,0.4)',
}

/* ─── Property Card ──────────────────────────────────────────────────────── */
function PropertyCard({ image, badgeLabel, badgeColor, badgeBg, code, location, m2, beds, baths, features, rdAsk, usdAsk }) {
  const [hovered, setHovered] = React.useState(false)
  const featureList = features ? features.split(',').map(f => f.trim()).filter(Boolean) : []

  return (
    <div
      style={{
        ...cardStyle,
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hovered ? '0 12px 36px rgba(0,0,0,0.45), 0 0 0 1px rgba(180,151,80,0.35)' : '0 2px 10px rgba(0,0,0,0.25)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image Hero */}
      <div style={{ position: 'relative', height: '190px', overflow: 'hidden' }}>
        <img
          src={image}
          alt={location}
          loading="lazy"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
        {/* Gradient overlay */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.5) 100%)' }} />

        {/* Type badge — top left */}
        <div style={{
          position: 'absolute', top: 10, left: 10,
          padding: '3px 10px',
          borderRadius: '999px',
          fontSize: '0.7rem',
          fontWeight: 700,
          letterSpacing: '0.05em',
          background: badgeBg,
          color: badgeColor,
          border: `1px solid ${badgeColor}55`,
          textTransform: 'uppercase',
        }}>
          {badgeLabel}
        </div>

        {/* Code — top right */}
        <div style={{
          position: 'absolute', top: 10, right: 10,
          padding: '3px 8px',
          borderRadius: '6px',
          fontSize: '0.65rem',
          fontFamily: 'monospace',
          fontWeight: 600,
          background: 'rgba(0,0,0,0.55)',
          color: 'rgba(255,255,255,0.8)',
          backdropFilter: 'blur(4px)',
        }}>
          #{code}
        </div>
      </div>

      {/* Card Body */}
      <div style={{ padding: '14px 16px 16px' }}>
        {/* Location */}
        <div style={{ fontWeight: 700, fontSize: '0.88rem', color: '#e8dfc8', marginBottom: '10px', lineHeight: 1.3 }}>
          {location}
        </div>

        {/* Stats row */}
        <div style={{ display: 'flex', gap: '14px', marginBottom: '10px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.55)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ color: '#b49750' }}>⬛</span> {m2} m²
          </span>
          {beds !== undefined && (
            <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.55)', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ color: '#b49750' }}>🛏</span> {beds} Beds
            </span>
          )}
          {baths !== undefined && (
            <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.55)', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ color: '#b49750' }}>🚿</span> {baths} Baths
            </span>
          )}
        </div>

        {/* Features */}
        {featureList.length > 0 && (
          <ul style={{ margin: '0 0 12px', padding: 0, listStyle: 'none' }}>
            {featureList.slice(0, 3).map((f, i) => (
              <li key={i} style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.42)', display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '3px' }}>
                <span style={{ color: '#b49750', fontSize: '0.6rem' }}>▸</span> {f}
              </li>
            ))}
          </ul>
        )}

        {/* Price block */}
        <div style={{
          borderTop: '1px solid rgba(180,151,80,0.18)',
          paddingTop: '10px',
          marginTop: featureList.length === 0 ? '4px' : '0',
        }}>
          <div style={{ fontSize: '1rem', fontWeight: 800, color: '#d4b96a', letterSpacing: '-0.01em' }}>{rdAsk}</div>
          <div style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.45)', marginTop: '2px' }}>≈ {usdAsk} USD</div>
        </div>
      </div>
    </div>
  )
}

/* ─── Solar Card (no beds/baths, has zone) ───────────────────────────────── */
function SolarCard({ image, code, location, m2, zone, rdAsk, usdAsk }) {
  const [hovered, setHovered] = React.useState(false)

  const zoneColor = zone === 'Urban' ? '#60a5fa' : zone === 'Semi-Urban' ? '#b49750' : '#4ade80'
  const zoneBg = zone === 'Urban' ? 'rgba(96,165,250,0.18)' : zone === 'Semi-Urban' ? 'rgba(180,151,80,0.18)' : 'rgba(74,222,128,0.15)'

  return (
    <div
      style={{
        ...cardStyle,
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hovered ? '0 12px 36px rgba(0,0,0,0.45), 0 0 0 1px rgba(180,151,80,0.35)' : '0 2px 10px rgba(0,0,0,0.25)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image Hero */}
      <div style={{ position: 'relative', height: '190px', overflow: 'hidden' }}>
        <img
          src={image}
          alt={location}
          loading="lazy"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.5) 100%)' }} />

        {/* Solar badge */}
        <div style={{
          position: 'absolute', top: 10, left: 10,
          padding: '3px 10px',
          borderRadius: '999px',
          fontSize: '0.7rem',
          fontWeight: 700,
          letterSpacing: '0.05em',
          background: 'rgba(161,98,7,0.85)',
          color: '#fcd34d',
          border: '1px solid rgba(252,211,77,0.4)',
          textTransform: 'uppercase',
        }}>
          Solar
        </div>

        {/* Code */}
        <div style={{
          position: 'absolute', top: 10, right: 10,
          padding: '3px 8px',
          borderRadius: '6px',
          fontSize: '0.65rem',
          fontFamily: 'monospace',
          fontWeight: 600,
          background: 'rgba(0,0,0,0.55)',
          color: 'rgba(255,255,255,0.8)',
          backdropFilter: 'blur(4px)',
        }}>
          #{code}
        </div>
      </div>

      {/* Card Body */}
      <div style={{ padding: '14px 16px 16px' }}>
        <div style={{ fontWeight: 700, fontSize: '0.88rem', color: '#e8dfc8', marginBottom: '10px', lineHeight: 1.3 }}>
          {location}
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', gap: '14px', marginBottom: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.55)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ color: '#b49750' }}>⬛</span> {m2} m²
          </span>
          <span style={{
            fontSize: '0.7rem',
            fontWeight: 600,
            padding: '2px 9px',
            borderRadius: '999px',
            background: zoneBg,
            color: zoneColor,
            border: `1px solid ${zoneColor}44`,
          }}>
            {zone}
          </span>
        </div>

        {/* Price block */}
        <div style={{ borderTop: '1px solid rgba(180,151,80,0.18)', paddingTop: '10px', marginTop: '4px' }}>
          <div style={{ fontSize: '1rem', fontWeight: 800, color: '#d4b96a', letterSpacing: '-0.01em' }}>{rdAsk}</div>
          <div style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.45)', marginTop: '2px' }}>≈ {usdAsk} USD</div>
        </div>
      </div>
    </div>
  )
}

/* ─── Responsive Grid Wrapper ────────────────────────────────────────────── */
function PropertyGrid({ children }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
      gap: '20px',
    }}>
      {children}
    </div>
  )
}

/* ─── Subtotal Bar ───────────────────────────────────────────────────────── */
function SubtotalBar({ label, rd, usd }) {
  return (
    <div style={subtotalBarStyle}>
      <span style={{ color: '#b49750', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        {label} Subtotal
      </span>
      <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
        <span style={{ color: '#d4b96a', fontWeight: 800, fontSize: '0.95rem' }}>{rd}</span>
        <span style={{ color: '#d4b96a', fontWeight: 800, fontSize: '0.95rem' }}>— {usd} USD</span>
      </div>
    </div>
  )
}

/* ─── Card Grid Sections ─────────────────────────────────────────────────── */
function CasasGrid() {
  return (
    <div>
      <PropertyGrid>
        {casas.map(p => {
          const isPenthouse = false
          const isBig = ['191546', '191505', '191535'].includes(p.code)
          return (
            <PropertyCard
              key={p.code}
              image={getCasaImage(p.code)}
              badgeLabel="Casa"
              badgeColor="#4ade80"
              badgeBg="rgba(22,163,74,0.8)"
              code={p.code}
              location={p.location}
              m2={p.m2}
              beds={p.beds}
              baths={p.baths}
              features={p.features}
              rdAsk={p.rdAsk}
              usdAsk={p.usdAsk}
            />
          )
        })}
      </PropertyGrid>
      <SubtotalBar label="Casas" rd="RD$87,722,358" usd="$1,253,200" />
    </div>
  )
}

function ApartamentosGrid() {
  return (
    <div>
      <PropertyGrid>
        {apartamentos.map(p => {
          const isPenthouse = p.location.toUpperCase().includes('PENTHOUSE')
          const badgeLabel = isPenthouse ? 'Penthouse' : 'Apto'
          const badgeColor = isPenthouse ? '#d4b96a' : '#60a5fa'
          const badgeBg = isPenthouse ? 'rgba(161,122,30,0.85)' : 'rgba(37,99,235,0.75)'
          return (
            <PropertyCard
              key={p.code}
              image={getAptoImage(p.code)}
              badgeLabel={badgeLabel}
              badgeColor={badgeColor}
              badgeBg={badgeBg}
              code={p.code}
              location={p.location}
              m2={p.m2}
              beds={p.beds}
              baths={p.baths}
              features={p.features}
              rdAsk={p.rdAsk}
              usdAsk={p.usdAsk}
            />
          )
        })}
      </PropertyGrid>
      <SubtotalBar label="Apartamentos" rd="RD$67,560,483" usd="$965,100" />
    </div>
  )
}

function SolaresGrid() {
  return (
    <div>
      <PropertyGrid>
        {solares.map(p => (
          <SolarCard
            key={p.code}
            image={getSolarImage(p.code)}
            code={p.code}
            location={p.location}
            m2={p.m2}
            zone={p.zone}
            rdAsk={p.rdAsk}
            usdAsk={p.usdAsk}
          />
        ))}
      </PropertyGrid>
      <SubtotalBar label="Solares" rd="RD$28,912,220" usd="$413,000" />
    </div>
  )
}

/* ─── Main Component ─────────────────────────────────────────────────────── */
export default function ApapPortfolio() {
  useEffect(() => {
    document.title = 'APAP REO Portfolio — 27 Properties Bulk Deal | Virtus Realty Group'
    const meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute('content', 'Bulk acquisition of 27 APAP bank foreclosure properties in Dominican Republic — 10 houses, 10 apartments, 7 land parcels. Proposed offer: $789K USD (30% of asking). Contact Virtus Realty.')
  }, [])

  const waBase = 'https://wa.me/19546004976'
  const waPortfolio = `${waBase}?text=${encodeURIComponent("I'm interested in the APAP 27-property portfolio at $789K")}`

  return (
    <div className="font-sans">

      {/* ═══ HERO ════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden pt-20">
        {/* Background */}
        <div
          className="absolute inset-0 bg-center bg-cover"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1800&q=80')",
            transform: 'scale(1.05)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(135deg, rgba(20,30,49,0.96) 0%, rgba(20,30,49,0.88) 60%, rgba(20,30,49,0.95) 100%)' }}
        />
        <div className="absolute top-0 left-0 right-0 h-1" style={{ background: 'linear-gradient(90deg, transparent 0%, #b49750 30%, #d4b96a 50%, #b49750 70%, transparent 100%)' }} />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          {/* Catalog badge */}
          <div
            className="inline-flex items-center gap-2 border rounded-full px-5 py-2 text-sm font-bold mb-6"
            style={{ background: 'rgba(180,151,80,0.18)', borderColor: 'rgba(180,151,80,0.5)', color: '#d4b96a' }}
          >
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#b49750' }} />
            March 2026 Catalog
          </div>

          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-4 drop-shadow-2xl">
            APAP REO Portfolio
            <span className="block" style={{ color: '#b49750' }}>27 Properties</span>
          </h1>

          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-4 font-light leading-relaxed">
            Bulk acquisition opportunity from <strong className="text-white">Asociación Popular de Ahorros y Préstamos</strong>
          </p>

          <p className="text-base text-white/60 max-w-xl mx-auto mb-10">
            27 bank-owned properties across Santo Domingo, Higüey, La Romana, Baní, San Cristóbal &amp; Villa Altagracia
          </p>

          {/* Summary stats */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {[
              ['🏠', '10 Houses'],
              ['🏢', '10 Apartments'],
              ['🌳', '7 Land Parcels'],
              ['📍', '6 Regions'],
            ].map(([icon, label]) => (
              <div
                key={label}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold"
                style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff' }}
              >
                <span>{icon}</span>
                <span>{label}</span>
              </div>
            ))}
          </div>

          {/* Three metric cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl mx-auto">
            {/* Card 1: Proposed Bulk Offer */}
            <div
              className="px-6 py-5 rounded-2xl text-center"
              style={{ background: 'linear-gradient(135deg, rgba(180,151,80,0.25), rgba(180,151,80,0.12))', border: '1px solid rgba(180,151,80,0.5)' }}
            >
              <p className="text-white/60 text-xs uppercase tracking-widest mb-2">Proposed Bulk Offer</p>
              <p className="font-display text-3xl md:text-4xl font-extrabold" style={{ color: '#d4b96a' }}>
                $789,400 USD
              </p>
              <p className="text-white/50 text-sm mt-2">30% of total asking price</p>
              <div
                className="inline-block mt-2 px-3 py-1 rounded-full text-xs font-extrabold"
                style={{ background: 'linear-gradient(135deg, #b49750, #d4b96a)', color: '#141e31' }}
              >
                70% SAVINGS
              </div>
            </div>

            {/* Card 2: Total Portfolio Value */}
            <div
              className="px-6 py-5 rounded-2xl text-center"
              style={{ background: 'linear-gradient(135deg, rgba(20,30,49,0.7), rgba(28,45,74,0.5))', border: '1px solid rgba(180,151,80,0.4)' }}
            >
              <p className="text-white/60 text-xs uppercase tracking-widest mb-2">Total Portfolio Value</p>
              <p className="font-display text-3xl md:text-4xl font-extrabold text-white">
                $2,631,300 USD
              </p>
              <p className="text-white/50 text-sm mt-1">RD$184,195,061</p>
              <p className="text-white/35 text-xs mt-2">Bank asking price for all 27 properties</p>
            </div>

            {/* Card 3: Projected Value After Improvement */}
            <div
              className="px-6 py-5 rounded-2xl text-center relative overflow-hidden"
              style={{ background: 'linear-gradient(135deg, rgba(22,101,52,0.3), rgba(20,83,45,0.15))', border: '1px solid rgba(34,197,94,0.45)' }}
            >
              <div
                className="absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-extrabold flex items-center gap-1"
                style={{ background: 'rgba(34,197,94,0.2)', color: '#4ade80', border: '1px solid rgba(34,197,94,0.4)' }}
              >
                ↑ 40%
              </div>
              <p className="text-white/60 text-xs uppercase tracking-widest mb-2">Projected Value After Improvement</p>
              <p className="font-display text-3xl md:text-4xl font-extrabold" style={{ color: '#4ade80' }}>
                $3,683,820 USD
              </p>
              <p className="text-white/50 text-sm mt-1">RD$257,873,085</p>
              <p className="text-white/35 text-xs mt-2">40% appreciation after renovation + 3-year hold</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SUMMARY CARDS ═══════════════════════════════════════════════════ */}
      <section className="py-14" style={{ background: 'linear-gradient(135deg, #f8f5ef 0%, #fff 100%)' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateIn>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {[
                { icon: '🏠', value: '10', label: 'Houses', sub: 'Casas REO' },
                { icon: '🏢', value: '10', label: 'Apartments', sub: 'Apartamentos REO' },
                { icon: '🌳', value: '7',  label: 'Land Parcels', sub: 'Solares REO' },
                { icon: '📍', value: '6',  label: 'Regions', sub: 'Dominican Republic' },
              ].map((card, i) => (
                <AnimateIn key={card.label} delay={i * 70}>
                  <div
                    className="p-6 rounded-2xl text-center border hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                    style={{ borderColor: 'rgba(180,151,80,0.25)', background: '#fff' }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = '#b49750'}
                    onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(180,151,80,0.25)'}
                  >
                    <div className="text-4xl mb-2">{card.icon}</div>
                    <div className="font-display text-4xl font-extrabold mb-0.5" style={{ color: '#b49750' }}>{card.value}</div>
                    <div className="font-bold text-sm" style={{ color: '#141e31' }}>{card.label}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{card.sub}</div>
                  </div>
                </AnimateIn>
              ))}
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ═══ PROPERTY TABLES ═════════════════════════════════════════════════ */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateIn>
            <div className="text-center mb-14">
              <span className="font-semibold text-sm uppercase tracking-widest" style={{ color: '#b49750' }}>Full Property Catalog</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold mt-3" style={{ color: '#141e31' }}>
                APAP REO Inventory
              </h2>
              <p className="text-gray-500 text-base mt-3 max-w-xl mx-auto">
                All 27 bank-owned properties listed below with full details from the APAP Bienes Adjudicados March 2026 catalog.
              </p>
            </div>
          </AnimateIn>

          {/* Grid 1: Casas */}
          <AnimateIn delay={50}>
            <div className="mb-14">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl">🏠</span>
                <div>
                  <h3 className="font-display text-2xl font-bold" style={{ color: '#141e31' }}>Casas (Houses)</h3>
                  <p className="text-sm text-gray-500">10 properties · Subtotal: $1,253,200 USD</p>
                </div>
              </div>
              <CasasGrid />
            </div>
          </AnimateIn>

          {/* Grid 2: Apartamentos */}
          <AnimateIn delay={80}>
            <div className="mb-14">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl">🏢</span>
                <div>
                  <h3 className="font-display text-2xl font-bold" style={{ color: '#141e31' }}>Apartamentos (Apartments)</h3>
                  <p className="text-sm text-gray-500">10 properties · Subtotal: $965,100 USD</p>
                </div>
              </div>
              <ApartamentosGrid />
            </div>
          </AnimateIn>

          {/* Grid 3: Solares */}
          <AnimateIn delay={100}>
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl">🌳</span>
                <div>
                  <h3 className="font-display text-2xl font-bold" style={{ color: '#141e31' }}>Solares (Land Parcels)</h3>
                  <p className="text-sm text-gray-500">7 properties · Subtotal: $413,000 USD</p>
                </div>
              </div>
              <SolaresGrid />
            </div>
          </AnimateIn>

          <AnimateIn delay={120}>
            <p className="text-center text-gray-400 text-xs mt-6">
              USD estimates based on RD$70 per USD exchange rate. Actual prices subject to negotiation. Source: APAP Bienes Adjudicados Catalog, March 23, 2026.
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* ═══ PORTFOLIO VALUATION — THE MONEY SHOT ════════════════════════════ */}
      <section className="py-20 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #090e1a 0%, #0d1626 50%, #0a101d 100%)' }}>
        {/* Gold top accent */}
        <div className="absolute top-0 left-0 right-0 h-1" style={{ background: 'linear-gradient(90deg, transparent 0%, #b49750 30%, #d4b96a 50%, #b49750 70%, transparent 100%)' }} />

        {/* Floating particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full animate-pulse opacity-10"
              style={{
                left: `${(i * 17 + 5) % 100}%`,
                top: `${(i * 23 + 10) % 80}%`,
                width: 2 + (i % 5),
                height: 2 + (i % 5),
                background: '#b49750',
                animationDelay: `${i * 280}ms`,
                animationDuration: `${2000 + i * 300}ms`,
              }}
            />
          ))}
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateIn>
            <div className="text-center mb-12">
              <span className="font-semibold text-sm uppercase tracking-widest" style={{ color: '#b49750' }}>Financial Summary</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white mt-3">Portfolio Valuation</h2>
            </div>
          </AnimateIn>

          <AnimateIn delay={100}>
            <div
              className="rounded-3xl overflow-hidden"
              style={{ border: '1px solid rgba(180,151,80,0.4)', background: 'linear-gradient(160deg, rgba(180,151,80,0.08) 0%, rgba(20,30,49,0.5) 100%)' }}
            >
              {/* Header row */}
              <div
                className="px-8 py-5 text-center"
                style={{ borderBottom: '1px solid rgba(180,151,80,0.25)', background: 'rgba(180,151,80,0.1)' }}
              >
                <div className="font-display text-sm font-bold uppercase tracking-widest" style={{ color: '#b49750' }}>
                  APAP 27-Property REO Portfolio — March 2026
                </div>
              </div>

              <div className="p-8 md:p-12 space-y-8">

                {/* Total asking */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-8" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                  <div>
                    <p className="text-white/50 text-xs uppercase tracking-widest font-semibold mb-2">Total Asking Price (27 properties)</p>
                    <p className="font-display text-3xl md:text-4xl font-bold text-white">RD$ 184,195,061</p>
                  </div>
                  <div className="text-right md:text-right">
                    <p className="text-white/40 text-xs mb-1">≈ USD equivalent</p>
                    <p className="font-display text-2xl font-bold" style={{ color: '#d4b96a' }}>$2,631,300 USD</p>
                  </div>
                </div>

                {/* Breakdown */}
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { label: '🏠 Casas', rd: 'RD$87,722,358', usd: '$1,253,200' },
                    { label: '🏢 Aptos', rd: 'RD$67,560,483', usd: '$965,100' },
                    { label: '🌳 Solares', rd: 'RD$28,912,220', usd: '$413,000' },
                  ].map(item => (
                    <div key={item.label} className="text-center p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
                      <div className="text-white/60 text-xs font-semibold mb-2">{item.label}</div>
                      <div className="text-white/80 text-sm font-bold mb-0.5">{item.rd}</div>
                      <div className="text-xs font-semibold" style={{ color: '#b49750' }}>{item.usd}</div>
                    </div>
                  ))}
                </div>

                {/* THE OFFER — main attraction */}
                <div
                  className="rounded-2xl p-8 md:p-10 relative overflow-hidden text-center"
                  style={{ background: 'linear-gradient(135deg, rgba(180,151,80,0.18) 0%, rgba(180,151,80,0.06) 100%)', border: '2px solid rgba(180,151,80,0.5)' }}
                >
                  {/* 70% OFF badge */}
                  <div
                    className="absolute top-4 right-4 px-4 py-2 rounded-full font-extrabold text-sm"
                    style={{ background: 'linear-gradient(135deg, #b49750, #d4b96a)', color: '#141e31' }}
                  >
                    70% OFF
                  </div>

                  <p className="text-white/60 text-xs uppercase tracking-[0.2em] font-bold mb-3">Our Proposed Offer</p>

                  <div className="font-display font-extrabold text-white mb-2" style={{ fontSize: 'clamp(2.2rem, 6vw, 4rem)', lineHeight: 1.1 }}>
                    RD$ 55,258,518
                  </div>

                  <div
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-extrabold text-xl mb-4"
                    style={{ background: 'rgba(0,0,0,0.3)', color: '#d4b96a' }}
                  >
                    ≈ $789,400 USD
                  </div>

                  <p className="text-white/55 text-sm font-semibold mb-0">30% of total asking price</p>
                </div>

                {/* Savings row */}
                <div className="grid md:grid-cols-2 gap-5">
                  <div className="p-5 rounded-xl text-center" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <p className="text-white/40 text-xs uppercase tracking-widest mb-2">Total Savings</p>
                    <p className="font-display text-2xl font-bold text-white mb-1">RD$ 128,936,543</p>
                    <p className="font-display text-lg font-bold" style={{ color: '#b49750' }}>≈ $1,841,900 USD</p>
                  </div>
                  <div className="p-5 rounded-xl text-center" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <p className="text-white/40 text-xs uppercase tracking-widest mb-2">Per Property Average</p>
                    <p className="font-display text-3xl font-bold text-white mb-1">$29,200</p>
                    <p className="text-white/40 text-sm">USD per property</p>
                  </div>
                </div>

                {/* Projected value & ROI rows */}
                <div className="grid md:grid-cols-2 gap-5">
                  <div className="p-5 rounded-xl text-center" style={{ background: 'rgba(22,101,52,0.12)', border: '1px solid rgba(34,197,94,0.25)' }}>
                    <p className="text-white/40 text-xs uppercase tracking-widest mb-2">Projected Value After Improvement</p>
                    <p className="font-display text-2xl font-bold text-white mb-1">$3,683,820 USD</p>
                    <p className="text-xs font-semibold" style={{ color: '#4ade80' }}>↑ 40% above asking after renovation + 3-year hold</p>
                  </div>
                  <div
                    className="p-5 rounded-xl text-center relative overflow-hidden"
                    style={{ background: 'rgba(22,101,52,0.2)', border: '2px solid rgba(34,197,94,0.45)' }}
                  >
                    {/* Glow effect */}
                    <div className="absolute inset-0 rounded-xl" style={{ background: 'radial-gradient(ellipse at center, rgba(74,222,128,0.08) 0%, transparent 70%)' }} />
                    <p className="text-white/40 text-xs uppercase tracking-widest mb-2 relative">Projected ROI on $789K Investment</p>
                    <p className="font-display text-3xl font-extrabold relative" style={{ color: '#4ade80' }}>$2,894,420 USD</p>
                    <div
                      className="inline-flex items-center gap-1.5 mt-2 px-4 py-1.5 rounded-full font-extrabold text-sm relative"
                      style={{ background: 'linear-gradient(135deg, #16a34a, #22c55e)', color: '#fff' }}
                    >
                      🚀 367% Return
                    </div>
                    <p className="text-white/35 text-xs mt-2 relative">profit on $789K capital deployed</p>
                  </div>
                </div>

              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ═══ RECOMMENDED INVESTMENT STRATEGY ════════════════════════════════ */}
      <section className="py-20 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0d1626 0%, #111827 100%)' }}>
        <div className="absolute top-0 left-0 right-0 h-1" style={{ background: 'linear-gradient(90deg, transparent 0%, #b49750 30%, #d4b96a 50%, #b49750 70%, transparent 100%)' }} />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateIn>
            <div className="text-center mb-14">
              <span className="font-semibold text-sm uppercase tracking-widest" style={{ color: '#b49750' }}>Investment Strategy</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white mt-3">
                📋 Recommended Investment Strategy
              </h2>
              <p className="text-white/50 text-base mt-3 font-semibold tracking-wide">Buy · Improve · Rent · Hold · Sell</p>
            </div>
          </AnimateIn>

          {/* Strategy Steps */}
          <div className="space-y-5 mb-12">
            {[
              {
                step: '01',
                title: 'Acquire',
                timing: 'Month 1',
                color: '#b49750',
                bg: 'rgba(180,151,80,0.1)',
                border: 'rgba(180,151,80,0.35)',
                icon: '🏦',
                points: [
                  'Purchase entire 27-property portfolio at 30% of asking ($789,400)',
                  'Bank-owned properties = motivated seller = maximum negotiation leverage',
                ],
              },
              {
                step: '02',
                title: 'Improve',
                timing: 'Months 2–6',
                color: '#60a5fa',
                bg: 'rgba(96,165,250,0.08)',
                border: 'rgba(96,165,250,0.3)',
                icon: '🔨',
                points: [
                  'Renovate properties to modern rental standards',
                  'Estimated improvement budget: $200K–$300K across portfolio',
                  'Focus on kitchens, bathrooms, paint, flooring, security',
                  'Dominican labor costs are 60–70% lower than US',
                ],
              },
              {
                step: '03',
                title: 'Rent',
                timing: 'Months 6–36',
                color: '#a78bfa',
                bg: 'rgba(167,139,250,0.08)',
                border: 'rgba(167,139,250,0.3)',
                icon: '🏘️',
                points: [
                  'Lease residential units at market rates',
                  'Estimated monthly rental income: $15K–$25K/month portfolio-wide',
                  '3-year rental income: $540K–$900K total',
                  'Cash flow covers improvement costs and generates profit',
                ],
              },
              {
                step: '04',
                title: 'Hold & Appreciate',
                timing: 'Years 1–3',
                color: '#fb923c',
                bg: 'rgba(251,146,60,0.08)',
                border: 'rgba(251,146,60,0.3)',
                icon: '📈',
                points: [
                  'DR property values projected to rise 10–15% annually',
                  "Google's $500M investment + Pedernales mega-resort driving demand",
                  'Infrastructure improvements increasing property values nationwide',
                ],
              },
              {
                step: '05',
                title: 'Sell at 40%+ Above Asking',
                timing: 'Year 3',
                color: '#4ade80',
                bg: 'rgba(74,222,128,0.1)',
                border: 'rgba(74,222,128,0.4)',
                icon: '🚀',
                points: [
                  'Improved + appreciated properties sell at minimum 40% above original bank asking',
                  'Projected portfolio sale value: $3.68M USD',
                  'Total return on $789K investment: $2.89M profit + rental income',
                ],
                highlight: true,
              },
            ].map((item, i) => (
              <AnimateIn key={item.step} delay={i * 80}>
                <div
                  className="rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-5 md:gap-8 items-start"
                  style={{ background: item.bg, border: `1px solid ${item.border}` }}
                >
                  {/* Step number */}
                  <div className="flex-shrink-0 flex flex-col items-center gap-1">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center font-display font-extrabold text-lg"
                      style={{ background: `${item.color}22`, color: item.color, border: `2px solid ${item.color}55` }}
                    >
                      {item.step}
                    </div>
                    <span className="text-xl">{item.icon}</span>
                  </div>
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <h3 className="font-display font-bold text-xl text-white">{item.title}</h3>
                      <span
                        className="px-3 py-0.5 rounded-full text-xs font-bold"
                        style={{ background: `${item.color}22`, color: item.color, border: `1px solid ${item.color}44` }}
                      >
                        {item.timing}
                      </span>
                    </div>
                    <ul className="space-y-2">
                      {item.points.map((pt, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-white/70">
                          <span style={{ color: item.color, marginTop: 3, flexShrink: 0 }}>▸</span>
                          <span className={item.highlight && j === item.points.length - 1 ? 'font-bold text-white' : ''}>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </AnimateIn>
            ))}
          </div>

          {/* Bottom Line Summary Box */}
          <AnimateIn delay={150}>
            <div
              className="rounded-3xl overflow-hidden"
              style={{ border: '2px solid rgba(74,222,128,0.4)', background: 'linear-gradient(160deg, rgba(22,101,52,0.18) 0%, rgba(20,30,49,0.6) 100%)' }}
            >
              <div
                className="px-8 py-5 text-center"
                style={{ borderBottom: '1px solid rgba(74,222,128,0.2)', background: 'rgba(74,222,128,0.08)' }}
              >
                <div className="font-display text-sm font-bold uppercase tracking-widest" style={{ color: '#4ade80' }}>
                  📊 Bottom Line Financial Projection
                </div>
              </div>
              <div className="p-8 md:p-10">
                <div className="max-w-lg mx-auto font-mono text-sm space-y-3">
                  {[
                    { label: 'Investment', value: '$789,400', highlight: false },
                    { label: 'Improvement', value: '~$250,000 (est.)', highlight: false },
                    { label: 'Total Capital', value: '~$1,039,400', highlight: false },
                    { label: '3-Year Rental', value: '~$720,000 (est.)', highlight: false },
                    { label: 'Sale at 40% Above', value: '$3,683,820', highlight: false },
                  ].map(row => (
                    <div key={row.label} className="flex justify-between items-center text-white/70">
                      <span className="text-white/50">{row.label}</span>
                      <span className="font-semibold text-white">{row.value}</span>
                    </div>
                  ))}
                  {/* Divider */}
                  <div className="border-t pt-3" style={{ borderColor: 'rgba(74,222,128,0.3)' }}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-bold text-white uppercase tracking-wide">NET PROFIT</span>
                      <span className="font-display font-extrabold text-2xl" style={{ color: '#4ade80' }}>~$3,364,420</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-white uppercase tracking-wide">ROI</span>
                      <div
                        className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full font-extrabold text-lg"
                        style={{ background: 'linear-gradient(135deg, #16a34a, #22c55e)', color: '#fff' }}
                      >
                        🚀 ~324%
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-center text-white/30 text-xs mt-8 italic">
                  *Projections are estimates based on current market trends. Actual returns may vary. This is not financial advice.*
                </p>
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ═══ WHY BULK WORKS ══════════════════════════════════════════════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateIn>
            <div className="text-center mb-14">
              <span className="font-semibold text-sm uppercase tracking-widest" style={{ color: '#b49750' }}>The Strategy</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold mt-3" style={{ color: '#141e31' }}>Why Bulk Purchases Work</h2>
              <p className="text-gray-500 text-base mt-3 max-w-xl mx-auto">
                Banks don't want to manage 27 individual properties. You're solving their problem — and getting rewarded for it.
              </p>
            </div>
          </AnimateIn>

          <div className="grid sm:grid-cols-2 gap-5">
            {[
              {
                icon: '🏦',
                title: 'Banks Need to Clear Inventory',
                desc: 'APAP and other DR banks carry REO properties as non-performing assets on their books. Every month it sits unsold, it costs them capital. Bulk deals let them wipe the slate clean in one transaction.',
              },
              {
                icon: '💸',
                title: 'Bulk = Reduced Carrying Costs',
                desc: 'Property taxes, insurance, maintenance, legal compliance — the bank pays all of this. A single bulk buyer eliminates all 27 line items at once. That\'s a powerful incentive to discount heavily.',
              },
              {
                icon: '📋',
                title: 'Portfolio Deals Get Priority',
                desc: 'Banks prioritize serious bulk buyers over retail customers. When you present a structured offer for an entire portfolio, you move to the front of the line with bank decision-makers — not just the listing desk.',
              },
              {
                icon: '🔥',
                title: 'APAP Is Motivated Right Now',
                desc: 'The March 2026 catalog release signals active disposition. APAP has allocated resources specifically to move these Bienes Adjudicados this quarter. Timing is favorable for buyers with capital ready.',
              },
            ].map((item, i) => (
              <AnimateIn key={item.title} delay={i * 80}>
                <div
                  className="p-7 rounded-2xl border h-full hover:shadow-xl transition-all duration-300"
                  style={{
                    borderColor: 'rgba(180,151,80,0.2)',
                    background: 'linear-gradient(135deg, #fff 0%, #fdf9f0 100%)',
                  }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = '#b49750'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(180,151,80,0.2)'}
                >
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="font-bold text-base mb-2" style={{ color: '#141e31' }}>{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA SECTION ═════════════════════════════════════════════════════ */}
      <section className="py-24 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0a101d 0%, #141e31 60%, #0d1a2d 100%)' }}>
        <div className="absolute top-0 left-0 right-0 h-1" style={{ background: 'linear-gradient(90deg, transparent 0%, #b49750 30%, #d4b96a 50%, #b49750 70%, transparent 100%)' }} />
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full animate-pulse"
              style={{
                left: `${(i * 13 + 3) % 100}%`,
                top: `${(i * 19 + 7) % 100}%`,
                width: 2 + (i % 4),
                height: 2 + (i % 4),
                background: '#b49750',
                opacity: 0.15,
                animationDelay: `${i * 250}ms`,
                animationDuration: `${2500 + i * 300}ms`,
              }}
            />
          ))}
        </div>

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimateIn>
            <div className="text-5xl mb-6">💼</div>

            <h2 className="font-display text-4xl md:text-5xl font-extrabold text-white mb-4">
              Interested in This Portfolio?
            </h2>

            <p className="text-white/70 text-lg mb-3 leading-relaxed">
              We're presenting this as a <strong className="text-white">structured bulk offer</strong> to APAP. Serious investors only — bring capital ready.
            </p>

            <p className="text-white/45 text-sm mb-10 italic">
              This is a limited-time opportunity. Bank REO catalogs are updated quarterly.
            </p>

            {/* WhatsApp primary CTA */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <a
                href={waPortfolio}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-10 py-5 rounded-2xl font-extrabold text-lg shadow-2xl hover:-translate-y-1 transition-all duration-200"
                style={{ background: '#25D366', color: '#fff' }}
              >
                <WhatsAppIcon className="w-6 h-6" />
                WhatsApp About This Deal
              </a>
              <a
                href="tel:+19546004976"
                className="inline-flex items-center justify-center gap-2 px-8 py-5 rounded-2xl font-bold text-base border transition-all hover:bg-white/10 hover:-translate-y-1"
                style={{ background: 'rgba(255,255,255,0.08)', borderColor: 'rgba(255,255,255,0.25)', color: '#fff' }}
              >
                📞 (954) 600-4976
              </a>
            </div>

            <p className="text-white/35 text-xs mb-10">
              WhatsApp message pre-filled: "I'm interested in the APAP 27-property portfolio at $789K"
            </p>

            {/* Trust signals */}
            <div className="flex flex-wrap justify-center gap-3">
              {[
                '🇩🇴 DR Specialist',
                '🏦 Bank REO Access',
                '💬 Bilingual Team',
                '⚖️ Legal Network',
              ].map(badge => (
                <div
                  key={badge}
                  className="text-sm px-4 py-2 rounded-full font-medium"
                  style={{ background: 'rgba(180,151,80,0.12)', color: '#d4b96a', border: '1px solid rgba(180,151,80,0.25)' }}
                >
                  {badge}
                </div>
              ))}
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ═══ SOURCE ATTRIBUTION ══════════════════════════════════════════════ */}
      <section className="py-12" style={{ background: '#0a101d' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div
            className="p-8 rounded-2xl"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            <p className="text-white/50 text-xs uppercase tracking-widest font-semibold mb-5">Source & Disclaimer</p>
            <div className="space-y-3 text-sm text-white/40 leading-relaxed">
              <p>
                <strong className="text-white/60">Source:</strong> APAP (Asociación Popular de Ahorros y Préstamos) Bienes Adjudicados Catalog, March 23, 2026.
              </p>
              <p>
                <strong className="text-white/60">Contact APAP directly:</strong>{' '}
                <a href="mailto:bienesadjudicados@apap.com.do" className="text-white/55 hover:text-white/80 transition-colors underline">
                  bienesadjudicados@apap.com.do
                </a>{' '}
                · 809-689-0171 ext. 2411/2412
              </p>
              <p>
                <strong className="text-white/60">Exchange rate:</strong> USD estimates based on RD$70 per USD. Actual prices subject to negotiation and current market rates.
              </p>
              <p className="text-white/25 text-xs mt-5">
                Virtus Realty Group presents this portfolio as a representative analysis. Offer amounts are proposals and do not constitute a binding agreement. All transactions subject to legal due diligence.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
