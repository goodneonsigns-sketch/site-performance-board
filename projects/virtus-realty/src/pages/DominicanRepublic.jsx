import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

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

/* ─── Data ───────────────────────────────────────────────────────────────── */
const stats = [
  { icon: '🌡️', value: '77°F', label: 'Year-Round Temperature', sub: 'Perfect tropical climate every day' },
  { icon: '🏖️', value: '800+', label: 'Miles of Pristine Beaches', sub: 'More coastline than you can explore' },
  { icon: '✈️', value: '2.5–3.5h', label: 'Flight from Miami', sub: 'Closer than you think to paradise' },
  { icon: '💰', value: '60–70%', label: 'Less Than US Prices', sub: 'Comparable properties at a fraction of the cost' },
  { icon: '📈', value: '8–12%', label: 'Annual Property Growth', sub: 'In key investment areas' },
  { icon: '🏗️', value: '$0', label: 'Property Tax', sub: 'No tax on primary residence (first 5 years)' },
  { icon: '🇺🇸', value: '100K+', label: 'US Expats in DR', sub: 'Thriving American community already there' },
  { icon: '💵', value: '50–60%', label: 'Lower Cost of Living', sub: 'Your dollar stretches further every day' },
  { icon: '🛂', value: 'Fast', label: 'Investor Visa Programs', sub: 'Easy residency for property owners' },
  { icon: '🏥', value: '1/3', label: 'US Healthcare Cost', sub: 'Modern hospitals, world-class care' },
]

const distressedOpportunities = [
  {
    icon: '🏦',
    title: 'Bank-Owned Foreclosures',
    desc: 'REO properties priced 30–50% below market value. Banks want them gone — your gain.',
    badge: '30–50% Below Market',
    color: '#e74c3c',
  },
  {
    icon: '🏗️',
    title: 'Pre-Construction Deals',
    desc: 'Lock in developer pricing before completion. Flexible payment plans and built-in appreciation.',
    badge: 'Developer Financing',
    color: '#2ecc71',
  },
  {
    icon: '🔨',
    title: 'Fixer-Upper Vacation Homes',
    desc: 'Buy below market, renovate, and watch your investment multiply. Massive upside in resort towns.',
    badge: 'Massive Upside',
    color: '#f39c12',
  },
  {
    icon: '🌴',
    title: 'Vacation Rental Income',
    desc: 'DR vacation rentals average $150–$300/night. High occupancy year-round in tourist zones.',
    badge: '$150–300/Night',
    color: '#b49750',
  },
]

/* ─── Property Sources Data ──────────────────────────────────────────────── */
const bankSources = [
  {
    name: 'Scotiabank DR',
    url: 'https://do.scotiabank.com/acerca-de-scotiabank/bienes-adjudicados.html',
    desc: 'Apartments, houses & land. Direct bank listings.',
    contact: 'bienesadjudicadosdo@scotiabank.com',
  },
  {
    name: 'APAP',
    url: 'https://www.apap.com.do/productos/bienes-adjudicados/',
    desc: 'Active listings with built-in financing calculator. Tel: 809-689-0171 ext. 2412',
    contact: null,
  },
  {
    name: 'Banco Popular',
    url: 'https://popularenlinea.com/Personas/Paginas/ofertas/default.aspx',
    desc: 'Discounts up to 65% off market value. 100% financing available on select properties.',
    contact: null,
    highlight: true,
  },
  {
    name: 'Banco Caribe',
    url: 'https://www.bancocaribe.com.do/bienes-adjudicados',
    desc: 'Multiple property types including commercial and residential.',
    contact: null,
  },
  {
    name: 'Banco Ademi',
    url: 'https://bancoademi.com.do/bienes-adjudicados/',
    desc: 'Houses, lots & vehicles. Updated Feb 2026. Tel: 809-683-0203',
    contact: null,
  },
  {
    name: 'Asociación La Nacional',
    url: 'https://asociacionlanacional.com.do/bienes-adjudicados/',
    desc: 'Savings & loan association listings across the DR.',
    contact: null,
  },
  {
    name: 'BHD Bank',
    url: 'https://bhd.com.do',
    desc: 'Monthly catalog of available adjudicated properties. Search "bienes adjudicados."',
    contact: null,
  },
  {
    name: 'Banreservas',
    url: 'https://banreservas.com/media/bqkbvn4n/catalogo-bienes-adjudicados-banreservas-15-agosto-2025.pdf',
    desc: 'Tourism lots, apartments & more. PDF catalog (Aug 2025).',
    contact: null,
  },
]

const governmentSources = [
  {
    name: 'Superintendencia de Bancos',
    url: 'https://sb.gob.do/publicaciones/bienes-en-venta/',
    desc: 'Official government source for seized bank assets. Verified & transparent.',
    badge: 'Official Govt Source',
  },
  {
    name: 'Banco Central',
    url: 'https://www.bancentral.gov.do/a/d/5583-venta-de-inmuebles',
    desc: 'Central bank property sales. Institutional-grade listings.',
    badge: null,
  },
  {
    name: 'Dir. General de Bienes Nacionales',
    url: 'https://www.facebook.com/DGBNRDO/',
    desc: 'State-owned and abandoned properties. Follow on Facebook for new listings.',
    badge: null,
  },
]

const aggregatorSources = [
  {
    name: 'Inmobiliaria.com.do',
    url: 'https://www.inmobiliaria.com.do/bienes_adjudicados/',
    desc: 'The #1 starting point — aggregates ALL major bank catalogs in one place. Best overall coverage.',
    isMaster: true,
    badge: '⭐ Recommended',
  },
  {
    name: 'HolProp',
    url: 'https://www.holprop.com/sale/pt/property/scr/dominican_republic/k/bank_repo/',
    desc: '1,296+ bank repo listings. English-language platform with market intelligence.',
    isMaster: false,
    badge: '1,296 listings',
  },
  {
    name: 'MercadoLibre DR',
    url: 'https://inmuebles.mercadolibre.com.do/inmuebles-venta-remates-de-propiedades-bancopopular',
    desc: "Dominican Republic's largest marketplace. Searchable by region, price & type.",
    isMaster: false,
    badge: null,
  },
  {
    name: 'Inmohidroxsol',
    url: 'https://inmohidroxsol.com/bienes-adjudicados-en-la-republica-dominicana/',
    desc: 'Specialist in adjudicated assets. Deep catalog with detailed property profiles.',
    isMaster: false,
    badge: 'Specialist',
  },
  {
    name: 'DR Assets',
    url: 'https://drassets.com/',
    desc: 'US Marshals forfeited properties. Unique listings not found on local platforms.',
    isMaster: false,
    badge: 'US Marshals',
  },
  {
    name: 'Tranzon Auctions',
    url: 'https://www.tranzon.com/search.aspx?text=Dominican_Republic',
    desc: 'International auction platform. Transparent bidding with global buyer access.',
    isMaster: false,
    badge: 'Auctions',
  },
  {
    name: 'EveryListing',
    url: 'https://dominican-republic.everylisting.com/',
    desc: 'Global MLS platform with DR listings. Strong for cross-border investor searches.',
    isMaster: false,
    badge: 'Global MLS',
  },
]

/* ─── Sample Listings by Region ──────────────────────────────────────────── */
const sampleListingsByRegion = [
  {
    region: 'North Coast — Sosúa & Cabarete',
    emoji: '🌊',
    color: '#1a6b8a',
    listings: [
      {
        title: 'Ocean View Condo',
        type: 'Condo',
        beds: 2,
        baths: 2,
        price: '~$365K USD',
        priceDOP: 'DOP 23M',
        location: 'Sosúa',
        desc: 'Stunning ocean views, 2BR/2BA, ready to rent or enjoy.',
        image: '/dr-listings/sosua-ocean-condo.jpg',
      },
      {
        title: 'Garden Villa — Sea Horse Ranch',
        type: 'Villa',
        beds: 3,
        baths: null,
        price: '~$780K USD',
        priceDOP: 'DOP 54.6M',
        location: 'Cabarete',
        desc: 'Prestigious gated community, lush gardens, world-class amenities.',
        image: '/dr-listings/cabarete-garden-villa.jpg',
      },
      {
        title: 'Beach Hotel with Owner Apt',
        type: 'Hotel / Commercial',
        beds: null,
        baths: null,
        price: '~$529K USD',
        priceDOP: 'DOP 37M',
        location: 'Cabarete',
        desc: 'Turnkey beach hotel with private owner apartment — income from day one.',
        image: '/dr-listings/cabarete-beach-hotel.jpg',
      },
      {
        title: 'Beachfront Condo',
        type: 'Condo',
        beds: 2,
        baths: null,
        price: 'From $295K USD',
        priceDOP: 'DOP 20.7M+',
        location: 'Cabarete',
        desc: 'Steps from the sand. Strong short-term rental income potential.',
        image: '/dr-listings/cabarete-beachfront-condo.jpg',
      },
      {
        title: 'Luxury Villa — Iris Estate',
        type: 'Villa',
        beds: 5,
        baths: 6,
        price: '~$998K USD',
        priceDOP: 'DOP 69.9M',
        location: 'Cabarete',
        desc: 'Newest villa in Sea Horse Ranch. 5BR/6BA, pool, BBQ gazebo, equestrian center access.',
        image: '/dr-listings/cabarete-luxury-villa.jpg',
      },
      {
        title: 'Oceanfront Development Land',
        type: 'Land',
        beds: null,
        baths: null,
        price: '~$694K USD',
        priceDOP: 'DOP 48.6M',
        location: 'Between Sosúa & Cabarete',
        desc: '20,398m² of prime oceanfront — build your dream home or develop.',
        image: '/dr-listings/cabarete-oceanfront-land.jpg',
      },
    ],
  },
  {
    region: 'Punta Cana & East',
    emoji: '🌴',
    color: '#1a7a4a',
    listings: [
      {
        title: 'Beachfront Development Land',
        type: 'Land',
        beds: null,
        baths: null,
        price: '~$1.4M USD',
        priceDOP: 'DOP 97.3M',
        location: 'Miches / Punta Cana',
        desc: '20 acres of prime beachfront land. Ideal for resort, eco-lodge, or subdivision development.',
        image: '/dr-listings/puntacana-beachfront-land.jpg',
      },
    ],
  },
  {
    region: 'Samaná & Las Terrenas',
    emoji: '🐋',
    color: '#6b3a8a',
    listings: [
      {
        title: 'Hilltop Vacation Home',
        type: 'Villa',
        beds: 5,
        baths: null,
        price: '~$503K USD',
        priceDOP: 'DOP 35.3M',
        location: 'Las Terrenas / Samaná',
        desc: '5BR on 4.94 acres with panoramic views. Private and serene, minutes from the beach.',
        image: '/dr-listings/samana-vacation-home.jpg',
      },
    ],
  },
  {
    region: 'Mountains — Jarabacoa',
    emoji: '⛰️',
    color: '#5a7a2a',
    listings: [
      {
        title: 'Mountain Lodge Home',
        type: 'Home',
        beds: 3,
        baths: 3,
        price: '~$299K USD',
        priceDOP: 'DOP 21M',
        location: 'Jarabacoa',
        desc: '3BR/3BA at 1,000m elevation. Cool climate, lush surroundings, full escape from the heat.',
        image: '/dr-listings/jarabacoa-mountain-home.jpg',
      },
    ],
  },
  {
    region: 'Luperón — La Isabella',
    emoji: '⚓',
    color: '#2a6a5a',
    listings: [
      {
        title: 'Beachfront Resort Land',
        type: 'Land',
        beds: null,
        baths: null,
        price: '~$9.4M USD',
        priceDOP: 'DOP 656M',
        location: 'Luperón / La Isabella',
        desc: '180,000m² beachfront. Permits for 108 hotel rooms, 120 condos, 104 bungalows. Historic Christopher Columbus landing site.',
        image: '/dr-listings/luperon-beachfront.jpg',
      },
    ],
  },
  {
    region: 'North — Cabrera & Río San Juan',
    emoji: '🌅',
    color: '#8a5a1a',
    listings: [
      {
        title: 'Ocean View Lots',
        type: 'Land',
        beds: null,
        baths: null,
        price: 'From $60K USD',
        priceDOP: 'DOP 3.6M+',
        location: 'Cabrera / Río San Juan',
        desc: "Undiscovered north coast. Build your dream home on the DR's most affordable ocean-view land.",
        image: '/dr-listings/cabrera-ocean-lots.jpg',
      },
      {
        title: 'Oceanfront Luxury Land',
        type: 'Land',
        beds: null,
        baths: null,
        price: '~$303K USD',
        priceDOP: 'DOP 21.2M',
        location: 'Río San Juan',
        desc: 'Ultra-luxury plot near Piscina Natural. Minutes from Amanera Hotel.',
        image: '/dr-listings/rio-san-juan-land.jpg',
      },
    ],
  },
]

/* ─── APAP Bank Foreclosure Listings — March 2026 Catalog ───────────────── */
const apapListings = {
  casas: [
    {
      id: '191568',
      title: 'Casa en Higüey',
      location: 'Residencial Sol Brillante, La Malena, La Cabrera, Higüey',
      priceDOP: 'RD$3,079,495.51',
      priceUSD: '~$44K USD',
      size: '180.67',
      beds: 3,
      baths: 2,
      features: ['Galería y marquesina', '3 hab / 2 baños', 'Residencial Sol Brillante'],
      address: 'Calle Tercera, Residencial Sol Brillante, La Malena',
      image: '/dr-listings/apap/higuey-casa.jpg',
    },
    {
      id: '191592',
      title: 'Casa en Higüey',
      location: 'Residencial Sol Brillante, La Malena, La Cabrera, Higüey',
      priceDOP: 'RD$3,009,964.47',
      priceUSD: '~$43K USD',
      size: '153.58',
      beds: 3,
      baths: 2,
      features: ['Galería y marquesina', '3 hab / 2 baños', 'Residencial Sol Brillante'],
      address: 'Calle Tercera, Residencial Sol Brillante, La Malena',
      image: '/dr-listings/apap/higuey-casa.jpg',
    },
    {
      id: '191547',
      title: 'Casa en La Romana',
      location: 'Residencial Vista Catalina, La Romana',
      priceDOP: 'RD$7,159,832.71',
      priceUSD: '~$102K USD',
      size: '345.06',
      beds: 4,
      baths: 4,
      features: ['Dos niveles · 2 balcones', 'Cuarto de servicio · 2 parqueos', 'Residencial Vista Catalina'],
      address: 'Calle Principal de Melissa #250, Residencial Vista Catalina',
      image: '/dr-listings/apap/la-romana-casa.jpg',
    },
    {
      id: '191269',
      title: 'Casa en Santo Domingo Norte',
      location: 'Villa Satélite II, Carretera San Felipe',
      priceDOP: 'RD$7,701,492.68',
      priceUSD: '~$110K USD',
      size: '1,510.87',
      beds: 3,
      baths: 2,
      features: ['3 marquesinas · estar familiar', 'Cuarto de servicio', 'Gran terreno 1,510 M²'],
      address: 'Calle 26 esq Calle 14, Villa Satélite II, Carretera San Felipe',
      image: '/dr-listings/apap/sd-norte-casa.jpg',
    },
    {
      id: '191551',
      title: 'Casa en Santo Domingo Este',
      location: 'Residencial Don Miguel, Cancino Afuera',
      priceDOP: 'RD$5,802,075.00',
      priceUSD: '~$83K USD',
      size: '158.39',
      beds: 4,
      baths: 4,
      features: ['4 hab / 4 baños', 'Patio privado', 'Cancino Afuera'],
      address: 'Calle Idalia Del Este No.24, Residencial Don Miguel',
      image: '/dr-listings/apap/sd-este-casa.jpg',
    },
    {
      id: '191532',
      title: 'Casa en Santo Domingo Este',
      location: 'Urbanización Lucerna',
      priceDOP: 'RD$8,359,739.20',
      priceUSD: '~$119K USD',
      size: '273.76',
      beds: 4,
      baths: 4,
      features: ['Cuarto de servicio con baño', 'Marquesina', 'Urb. Lucerna'],
      address: 'Calle camino esq Calle 10-W No. 01, Urbanización Lucerna',
      image: '/dr-listings/apap/sd-este-casa.jpg',
    },
    {
      id: '191546',
      title: 'Casa en Santo Domingo Este',
      location: 'Prado Oriental',
      priceDOP: 'RD$13,290,469.02',
      priceUSD: '~$190K USD',
      size: '330.63',
      beds: 7,
      baths: 4,
      features: ['7 hab / 4 baños', 'Estar familiar · balcón · marquesina', 'Prado Oriental'],
      address: 'Calle 16 No. 19, Prado Oriental',
      image: '/dr-listings/apap/sd-este-casa-large.jpg',
    },
    {
      id: '191505',
      title: 'Casa en Santo Domingo Este',
      location: 'Urbanización Capotillo, Alma Rosa II',
      priceDOP: 'RD$9,696,389.81',
      priceUSD: '~$139K USD',
      size: '226.61',
      beds: 10,
      baths: 5,
      features: ['10 hab / dos niveles', 'Cuarto de servicio · estar familiar', 'Alma Rosa II'],
      address: 'Calle Activo 20-30 No. 65, Urb. Capotillo, Alma Rosa II',
      image: '/dr-listings/apap/sd-este-casa-large.jpg',
    },
    {
      id: '191535',
      title: 'Casa en Santo Domingo Este',
      location: 'Urbanización El Cachon, Cancino',
      priceDOP: 'RD$7,732,636.03',
      priceUSD: '~$110K USD',
      size: '246.90',
      beds: 4,
      baths: 3,
      features: ['Dos niveles · terraza techada', 'Cuarto de servicio · marquesina', 'Estar familiar'],
      address: 'Calle Paralela Principal No. 21-B, Urb. El Cachon, Cancino',
      image: '/dr-listings/apap/sd-este-casa-large.jpg',
    },
    {
      id: '191567',
      title: 'Casa en Baní',
      location: 'Residencial Costa Sur, Urbanización Valera Guzman, Baní, Peravia',
      priceDOP: 'RD$21,890,263.00',
      priceUSD: '~$313K USD',
      size: '398.81',
      beds: 5,
      baths: 4,
      features: ['Piscina · jacuzzi · dos niveles', '4 galerías/balcones · 2 parqueos', 'Cuarto de servicio · terraza'],
      address: 'Calle 5 esq C, Residencial Costa Sur, Baní',
      image: '/dr-listings/apap/bani-villa.jpg',
    },
  ],
  apartamentos: [
    {
      id: '191580',
      title: 'Apartamento en Santo Domingo Este',
      location: 'Prados Del Cachon',
      priceDOP: 'RD$6,958,861.76',
      priceUSD: '~$99K USD',
      size: '177.57',
      beds: 3,
      baths: 2,
      features: ['Terraza · balcón · 2 parqueos', '3 hab / 2½ baños', 'Prados Del Cachon'],
      address: 'Condominio Residencial de Jesus, Apto 1-B, Prados Del Cachon',
      image: '/dr-listings/apap/sd-este-apto.jpg',
    },
    {
      id: '191561',
      title: 'Apartamento en Santo Domingo Este',
      location: 'Ciudad Juan Bosch',
      priceDOP: 'RD$3,669,500.21',
      priceUSD: '~$52K USD',
      size: '89.50',
      beds: 3,
      baths: 2,
      features: ['3 hab / 2 baños · balcón', '1 parqueo', 'Ciudad Juan Bosch'],
      address: 'Cond. El Sembrador I Sur, Edf.20, Apto 401, Ciudad Juan Bosch',
      image: '/dr-listings/apap/sd-este-apto.jpg',
    },
    {
      id: '191576',
      title: 'Apartamento en Santo Domingo Este',
      location: 'Ciudad Juan Bosch',
      priceDOP: 'RD$4,328,205.50',
      priceUSD: '~$62K USD',
      size: '89.50',
      beds: 3,
      baths: 2,
      features: ['Cuarto nivel · 3 hab / 2 baños', '1 parqueo', 'El Sembrador III M-H'],
      address: 'Condominio el Sembrador III M-H, Ciudad Juan Bosch',
      image: '/dr-listings/apap/sd-este-apto.jpg',
    },
    {
      id: '191574',
      title: 'Apartamento en Santo Domingo Este',
      location: 'Vista Hermosa',
      priceDOP: 'RD$7,245,600.10',
      priceUSD: '~$104K USD',
      size: '168.30',
      beds: 3,
      baths: 2,
      features: ['Balcón · terraza · 2 parqueos', '3 hab / 2½ baños', 'Cond. Enmanuelle IV'],
      address: 'Cond. Residencial Enmanuelle IV, Apto 5-B, Vista Hermosa',
      image: '/dr-listings/apap/sd-este-apto.jpg',
    },
    {
      id: '191575',
      title: 'Apartamento en Santo Domingo Este',
      location: 'Tropical del Este',
      priceDOP: 'RD$6,200,191.42',
      priceUSD: '~$89K USD',
      size: '109.40',
      beds: 3,
      baths: 2,
      features: ['3 hab / 2 baños · balcón', '1 parqueo', 'Residencial Cinthia I'],
      address: 'Residencial Cinthia I, Apto 4-B, Tropical del Este',
      image: '/dr-listings/apap/sd-este-apto.jpg',
    },
    {
      id: '191498',
      title: 'Apartamento en Santo Domingo Este',
      location: 'San Jose de Mendoza',
      priceDOP: 'RD$7,009,038.30',
      priceUSD: '~$100K USD',
      size: '129.34',
      beds: 3,
      baths: 2,
      features: ['Piscina · gym · salón de eventos', 'Cancha de basketball · 2 parqueos', 'Crisfer XIV, Edf. David Ortiz'],
      address: 'Cond. Crisfer XIV, Edf. David Ortiz, Apto 2-604',
      image: '/dr-listings/apap/sd-este-apto-luxury.jpg',
    },
    {
      id: '191550',
      title: 'Penthouse en Santo Domingo Este',
      location: 'El Cachón, Cancino',
      priceDOP: 'RD$14,390,473.68',
      priceUSD: '~$206K USD',
      size: '396.00',
      beds: 3,
      baths: 4,
      features: ['Quinto & sexto nivel', 'Terraza techada · área de BBQ', '2 parqueos · estar familiar'],
      address: 'Cond. Residencial El Taller, El Cachón, Cancino',
      image: '/dr-listings/apap/sd-este-penthouse.jpg',
    },
    {
      id: '191475',
      title: 'Apartamento en Santo Domingo Este',
      location: 'Villa Tropicalia',
      priceDOP: 'RD$3,491,636.86',
      priceUSD: '~$50K USD',
      size: '93.87',
      beds: 3,
      baths: 2,
      features: ['3 hab / 2 baños', '1 parqueo', 'Praderas del Tamarindo'],
      address: 'Condominio Praderas del Tamarindo, Villa Tropicalia',
      image: '/dr-listings/apap/sd-este-apto.jpg',
    },
    {
      id: '191577',
      title: 'Apartamento en Santo Domingo Este',
      location: 'Corales del Sur',
      priceDOP: 'RD$11,775,655.00',
      priceUSD: '~$168K USD',
      size: '258.35',
      beds: 3,
      baths: 2,
      features: ['Terraza · cuarto de servicio', '3 hab / 2½ baños · 1 parqueo', 'Residencial Michael I'],
      address: 'Residencial Michael I, Corales del Sur',
      image: '/dr-listings/apap/sd-este-apto.jpg',
    },
    {
      id: '191519',
      title: 'Apartamento en Santo Domingo Oeste',
      location: 'Hato Nuevo',
      priceDOP: 'RD$2,491,320.04',
      priceUSD: '~$36K USD',
      size: '72.45',
      beds: 3,
      baths: 2,
      features: ['3 hab / 2 baños', '1 parqueo', 'Cond. Vivienda Unifamiliar I'],
      address: 'Cond. Residencial Vivienda Unifamiliar I, Hato Nuevo',
      image: '/dr-listings/apap/sd-oeste-apto.jpg',
    },
  ],
  solares: [
    {
      id: '190434',
      title: 'Solar en Santo Domingo Oeste',
      location: 'Urb. Cristal, Sector Alameda',
      priceDOP: 'RD$6,712,845.20',
      priceUSD: '~$96K USD',
      size: '500.00',
      features: ['500 M² · zona urbana', 'Urb. Cristal, Sector Alameda', 'Calle Isabel Santana'],
      address: 'Calle Isabel Santana, Urb. Cristal, Sector Alameda',
      image: '/dr-listings/apap/sd-oeste-solar.jpg',
    },
    {
      id: '190031',
      title: 'Solar en San Cristóbal',
      location: 'Madre Vieja, San Cristóbal',
      priceDOP: 'RD$3,791,000.00',
      priceUSD: '~$54K USD',
      size: '1,487.00',
      features: ['1,487 M² · zona urbana/sub-urbana', 'Km 2½, Carretera Sánchez', 'Doña Chucha, Madre Vieja'],
      address: 'Km 2½, Carretera Sánchez, Doña Chucha, Madre Vieja',
      image: '/dr-listings/apap/san-cristobal-solar.jpg',
    },
    {
      id: '240017-9',
      title: 'Solar en Villa Altagracia',
      location: 'La Cumbre, Villa Altagracia',
      priceDOP: 'RD$1,490,418.44',
      priceUSD: '~$21K USD',
      size: '1,302.32',
      features: ['1,302 M² · alto potencial', 'Km 61, Autopista Duarte', 'Sub-Activo 9'],
      address: 'Km 61, Autopista Duarte, La Cumbre, Villa Altagracia',
      image: '/dr-listings/apap/villa-altagracia-solar.jpg',
    },
    {
      id: '240017-10',
      title: 'Solar en Villa Altagracia',
      location: 'La Cumbre, Villa Altagracia',
      priceDOP: 'RD$1,269,666.52',
      priceUSD: '~$18K USD',
      size: '1,186.54',
      features: ['1,187 M² · alto potencial', 'Km 61, Autopista Duarte', 'Sub-Activo 10'],
      address: 'Km 61, Autopista Duarte, La Cumbre, Villa Altagracia',
      image: '/dr-listings/apap/villa-altagracia-solar.jpg',
    },
    {
      id: '240017-18',
      title: 'Solar en Villa Altagracia',
      location: 'La Cumbre, Villa Altagracia',
      priceDOP: 'RD$5,837,662.29',
      priceUSD: '~$83K USD',
      size: '6,391.86',
      features: ['6,392 M² · gran extensión', 'Km 61, Autopista Duarte', 'Sub-Activo 18'],
      address: 'Km 61, Autopista Duarte, La Cumbre, Villa Altagracia',
      image: '/dr-listings/apap/villa-altagracia-solar.jpg',
    },
    {
      id: '240017-19',
      title: 'Solar en Villa Altagracia',
      location: 'La Cumbre, Villa Altagracia',
      priceDOP: 'RD$4,509,381.29',
      priceUSD: '~$64K USD',
      size: '5,374.81',
      features: ['5,375 M² · gran extensión', 'Km 61, Autopista Duarte', 'Sub-Activo 19'],
      address: 'Km 61, Autopista Duarte, La Cumbre, Villa Altagracia',
      image: '/dr-listings/apap/villa-altagracia-solar.jpg',
    },
    {
      id: '240017-20',
      title: 'Solar en Villa Altagracia',
      location: 'La Cumbre, Villa Altagracia',
      priceDOP: 'RD$5,301,246.82',
      priceUSD: '~$76K USD',
      size: '6,025.01',
      features: ['6,025 M² · gran extensión', 'Km 61, Autopista Duarte', 'Sub-Activo 20'],
      address: 'Km 61, Autopista Duarte, La Cumbre, Villa Altagracia',
      image: '/dr-listings/apap/villa-altagracia-solar.jpg',
    },
  ],
}

const dueDiligenceResources = [
  {
    name: 'Dominican Certificates',
    url: 'https://dominicancertificates.com/official-dominican-documents/dominican-property-records-and-land-titles',
    desc: 'Official title searches. ~$195 per search, 2–10 day turnaround. Verify ownership before you buy.',
    icon: '📜',
    badge: '$195 · 2–10 Days',
  },
  {
    name: 'DR Property Guys',
    url: 'https://drpropertyguys.com/the-process-and-laws-around-buying-property-in-the-dr/',
    desc: "Comprehensive guide to the DR's buying process and property laws. Essential reading for first-time buyers.",
    icon: '📖',
    badge: 'Free Guide',
  },
  {
    name: 'Legalmondo',
    url: 'https://www.legalmondo.com/product/how-find-real-estate-land-register-information-dominican-republic/',
    desc: 'Cadastral and land registry research. Expert legal network for cross-border real estate transactions.',
    icon: '⚖️',
    badge: 'Legal Research',
  },
]

const regions = [
  {
    id: 'santo-domingo',
    name: 'Santo Domingo',
    tagline: 'Capital City · Urban Luxury · Cultural Hub',
    desc: 'The vibrant capital blends colonial history with modern high-rises. A growing expat professional scene, world-class dining, and luxury condos at South Florida prices from a decade ago.',
    highlight: '🏛️ UNESCO World Heritage Zone',
    priceRange: '$80K – $500K+',
    priceRangeDOP: 'RD$ 5.6M – 35M+',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
  },
  {
    id: 'punta-cana',
    name: 'Punta Cana',
    tagline: 'Resort Paradise · Vacation Rental Goldmine',
    desc: "The DR's most famous destination. Turquoise waters, all-inclusive resorts, and a booming short-term rental market. Your investment works while you vacation.",
    highlight: '✈️ Direct flights from 60+ US cities',
    priceRange: '$120K – $800K+',
    priceRangeDOP: 'RD$ 8.4M – 56M+',
    image: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=800&q=80',
  },
  {
    id: 'las-terrenas',
    name: 'Las Terrenas',
    tagline: 'European Expat Haven · Bohemian Beach Town',
    desc: 'A French and Italian expat community tucked into the Samaná Peninsula. Artisan cafés, boutique hotels, and a laid-back vibe that attracts high-spending tourists year-round.',
    highlight: '🥖 Largest European expat community in DR',
    priceRange: '$100K – $600K',
    priceRangeDOP: 'RD$ 7M – 42M',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
  },
  {
    id: 'cabarete',
    name: 'Cabarete',
    tagline: 'Water Sports Capital · Young & Adventurous',
    desc: "The world's kiteboarding capital. An energetic, young international crowd, beach bars, surf schools, and affordable properties with strong rental demand from adventure travelers.",
    highlight: '🪁 World Kiteboarding Championship host',
    priceRange: '$75K – $350K',
    priceRangeDOP: 'RD$ 5.3M – 24.5M',
    image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&q=80',
  },
  {
    id: 'casa-de-campo',
    name: 'Casa de Campo (La Romana)',
    tagline: 'Ultra-Luxury · Golf Resort Living',
    desc: 'One of the Caribbean\'s most prestigious resort communities. Home to the legendary Teeth of the Dog golf course, a private marina, and polo fields. Ultra-high-net-worth buyers only.',
    highlight: '⛳ Ranked #1 Golf Course in the Caribbean',
    priceRange: '$350K – $5M+',
    priceRangeDOP: 'RD$ 24.5M – 350M+',
    image: 'https://images.unsplash.com/photo-1601979031925-424e53b6caaa?w=800&q=80',
  },
  {
    id: 'samana',
    name: 'Samaná',
    tagline: 'Untouched Beauty · Whale Watching · Nature',
    desc: "The DR's best-kept secret. Humpback whales breach offshore every January–March. Cascading waterfalls, virgin beaches, and a frontier investment landscape with explosive upside.",
    highlight: '🐋 World-class whale watching sanctuary',
    priceRange: '$65K – $400K',
    priceRangeDOP: 'RD$ 4.6M – 28M',
    image: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=800&q=80',
  },
]

const buyingSteps = [
  {
    step: '01',
    title: 'Free Consultation with Virtus',
    desc: 'We learn your goals, budget, and timeline. We explain the DR market, legal framework, and the exact buying process for Americans.',
    icon: '🤝',
  },
  {
    step: '02',
    title: 'Property Search & Virtual Tours',
    desc: 'We curate properties that match your criteria and arrange virtual or in-person tours. No pressure, no rush.',
    icon: '🔍',
  },
  {
    step: '03',
    title: 'Legal Review',
    desc: "We connect you with trusted DR attorneys to verify title, review contracts, and protect your investment. Due diligence is everything.",
    icon: '⚖️',
  },
  {
    step: '04',
    title: 'Title Transfer & Closing',
    desc: 'Sign at a notary, transfer funds securely, and receive your title deed (Certificado de Título). The process typically takes 30–60 days.',
    icon: '📋',
  },
  {
    step: '05',
    title: 'Property Management Setup',
    desc: 'For investment properties, we connect you with local property managers to handle rentals, maintenance, and guest services remotely.',
    icon: '🏠',
  },
]

const lifestyleItems = [
  {
    icon: '🌊',
    title: 'Wake Up to Turquoise Waters',
    desc: 'Step onto your terrace to views that most people only see on screensavers. Crystal-clear Caribbean waters, swaying palms, warm morning sun.',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=700&q=80',
  },
  {
    icon: '⛳',
    title: 'Golf, Diving & Adventure',
    desc: 'World-class golf courses, PADI dive sites, deep-sea fishing, horseback riding on the beach. Every day is an adventure.',
    image: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=700&q=80',
  },
  {
    icon: '🍽️',
    title: 'Dominican Cuisine & Culture',
    desc: 'Sancocho, tostones, fresh seafood, merengue nights. A culture rich in warmth, music, and flavor at a fraction of US restaurant prices.',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=700&q=80',
  },
  {
    icon: '🔐',
    title: 'Gated Communities & Security',
    desc: '24/7 guarded communities, smart home technology, and resort-style amenities. Safety and luxury, together.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=700&q=80',
  },
]

/* ─── Component ──────────────────────────────────────────────────────────── */
export default function DominicanRepublic() {
  const [activeRegion, setActiveRegion] = useState(null)
  const [activeSourceTab, setActiveSourceTab] = useState('banks')

  useEffect(() => {
    document.title = 'Dominican Republic Real Estate | Caribbean Investment Properties | Virtus Realty Group'
    const meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute('content', "Discover investment-ready properties in the Dominican Republic. Bank-owned foreclosures, beachfront villas, and luxury condos — 60–70% less than comparable US properties. Virtus Realty Group.")
  }, [])

  const scrollToProperties = () => {
    document.getElementById('properties')?.scrollIntoView({ behavior: 'smooth' })
  }

  const whatsappMsg = encodeURIComponent("Hi! I'm interested in Dominican Republic properties")
  const whatsappUrl = `https://wa.me/19544983728?text=${whatsappMsg}`

  return (
    <div className="font-sans">

      {/* ═══ 1. HERO ════════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-center bg-cover"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1559494007-9f5847c49d94?w=1800&q=85')",
            transform: 'scale(1.05)',
          }}
        />
        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, rgba(20,30,49,0.75) 0%, rgba(20,30,49,0.55) 50%, rgba(20,30,49,0.85) 100%)' }}
        />

        {/* Floating particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full animate-pulse opacity-30"
              style={{
                left: `${(i * 17 + 5) % 100}%`,
                top: `${(i * 23 + 10) % 80}%`,
                width: 4 + (i % 6),
                height: 4 + (i % 6),
                background: '#b49750',
                animationDelay: `${i * 300}ms`,
                animationDuration: `${2000 + i * 400}ms`,
              }}
            />
          ))}
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
          {/* Flag accent */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-16 opacity-50" style={{ background: '#b49750' }} />
            <span className="text-4xl">🇩🇴</span>
            <div className="h-px w-16 opacity-50" style={{ background: '#b49750' }} />
          </div>

          <div
            className="inline-flex items-center gap-2 border rounded-full px-5 py-2 text-sm font-medium mb-8"
            style={{ background: 'rgba(180,151,80,0.15)', borderColor: 'rgba(180,151,80,0.4)', color: '#d4b96a' }}
          >
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#b49750' }} />
            Dominican Republic · Caribbean Investment Properties
          </div>

          <h1 className="font-display text-5xl md:text-7xl font-extrabold text-white leading-tight mb-6 drop-shadow-2xl">
            Your Dream Home
            <span className="block" style={{ color: '#b49750' }}>in Paradise Awaits</span>
          </h1>

          <p className="text-xl md:text-2xl text-white/85 max-w-3xl mx-auto mb-12 leading-relaxed font-light">
            Discover investment-ready properties in the Dominican Republic —
            <strong className="text-white font-semibold"> the Caribbean's best-kept secret</strong> for American buyers
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={scrollToProperties}
              className="inline-flex items-center justify-center gap-2 px-9 py-4 rounded-xl font-bold text-base shadow-2xl transform hover:-translate-y-1 hover:shadow-yellow-900/40 transition-all duration-200"
              style={{ background: 'linear-gradient(135deg, #b49750, #d4b96a)', color: '#141e31' }}
            >
              🏖️ Explore Properties
            </button>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 px-9 py-4 rounded-xl font-bold text-base border transition-all hover:bg-white/20"
              style={{ background: 'rgba(255,255,255,0.1)', borderColor: 'rgba(255,255,255,0.3)', color: '#fff' }}
            >
              📅 Schedule a Consultation
            </Link>
          </div>

          {/* Quick stats bar */}
          <div className="mt-20 grid grid-cols-3 gap-4 max-w-lg mx-auto">
            {[['800+', 'Miles of Beach'], ['77°F', 'Year-Round'], ['8–12%', 'Annual Growth']].map(([val, label]) => (
              <div key={label} className="text-center">
                <div className="font-display text-2xl md:text-3xl font-bold" style={{ color: '#b49750' }}>{val}</div>
                <div className="text-white/60 text-xs uppercase tracking-wider mt-1">{label}</div>
              </div>
            ))}
          </div>

          {/* Scroll indicator */}
          <div className="mt-12 flex justify-center">
            <button onClick={scrollToProperties} className="flex flex-col items-center gap-2 text-white/40 hover:text-white/70 transition-colors">
              <span className="text-xs uppercase tracking-widest">Scroll to explore</span>
              <div className="w-6 h-10 border-2 border-current rounded-full flex items-start justify-center pt-2">
                <div className="w-1.5 h-3 bg-current rounded-full animate-bounce" />
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* ═══ 2. WHY DR — STATS GRID ════════════════════════════════════════ */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateIn>
            <div className="text-center mb-16">
              <span className="font-semibold text-sm uppercase tracking-widest" style={{ color: '#b49750' }}>The Numbers Don't Lie</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold mt-3" style={{ color: '#141e31' }}>
                Why the Dominican Republic?
              </h2>
              <p className="text-gray-500 text-lg mt-4 max-w-2xl mx-auto">
                The Caribbean's fastest-growing real estate market — and American buyers are discovering it in record numbers.
              </p>
            </div>
          </AnimateIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {stats.map((stat, i) => (
              <AnimateIn key={stat.label} delay={i * 60}>
                <div
                  className="group p-6 rounded-2xl border hover:shadow-xl transition-all duration-300 h-full flex flex-col items-center text-center cursor-default"
                  style={{
                    borderColor: 'rgba(180,151,80,0.2)',
                    background: 'linear-gradient(135deg, #fff 0%, #fdf9f0 100%)',
                  }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = '#b49750'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(180,151,80,0.2)'}
                >
                  <div className="text-4xl mb-3">{stat.icon}</div>
                  <div className="font-display text-2xl font-extrabold mb-1" style={{ color: '#b49750' }}>{stat.value}</div>
                  <div className="font-bold text-sm mb-2" style={{ color: '#141e31' }}>{stat.label}</div>
                  <div className="text-xs text-gray-400 leading-relaxed">{stat.sub}</div>
                </div>
              </AnimateIn>
            ))}
          </div>

          {/* Legal callout */}
          <AnimateIn delay={200}>
            <div
              className="mt-12 p-6 md:p-8 rounded-2xl flex flex-col md:flex-row items-center gap-6 text-center md:text-left"
              style={{ background: 'linear-gradient(135deg, #141e31, #1c2d4a)' }}
            >
              <div className="text-5xl flex-shrink-0">⚖️</div>
              <div>
                <h3 className="font-display text-xl md:text-2xl font-bold text-white mb-2">
                  Foreigners Have the SAME Property Rights as Dominican Citizens
                </h3>
                <p className="text-white/70 leading-relaxed">
                  The Dominican Republic constitution explicitly grants foreign nationals equal property ownership rights. No restrictions, no extra fees, no hoops — own property outright, in your name, fully protected by law.
                </p>
              </div>
              <Link
                to="/contact"
                className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm whitespace-nowrap"
                style={{ background: '#b49750', color: '#141e31' }}
              >
                Learn More →
              </Link>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ═══ 3. DISTRESSED PROPERTIES & INVESTMENT OPPORTUNITIES ═══════════ */}
      <section id="properties" className="py-24" style={{ background: 'linear-gradient(135deg, #0a101d 0%, #141e31 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateIn>
            <div className="text-center mb-16">
              <span className="font-semibold text-sm uppercase tracking-widest" style={{ color: '#b49750' }}>Investment Opportunities</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white mt-3">
                Distressed Properties &<br />
                <span style={{ color: '#b49750' }}>Exceptional Deals</span>
              </h2>
              <p className="text-white/65 text-lg mt-4 max-w-2xl mx-auto">
                The DR market is full of under-the-radar opportunities most buyers never find without local expertise.
              </p>
            </div>
          </AnimateIn>

          {/* Opportunity cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
            {distressedOpportunities.map((opp, i) => (
              <AnimateIn key={opp.title} delay={i * 80}>
                <div
                  className="relative p-7 rounded-2xl border border-white/10 hover:border-yellow-400/40 transition-all duration-300 h-full"
                  style={{ background: 'rgba(255,255,255,0.05)' }}
                >
                  <div
                    className="absolute top-4 right-4 text-xs font-bold px-3 py-1 rounded-full"
                    style={{ background: opp.color + '22', color: opp.color, border: `1px solid ${opp.color}44` }}
                  >
                    {opp.badge}
                  </div>
                  <div className="text-4xl mb-4">{opp.icon}</div>
                  <h3 className="font-display text-lg font-bold text-white mb-3">{opp.title}</h3>
                  <p className="text-white/65 text-sm leading-relaxed">{opp.desc}</p>
                </div>
              </AnimateIn>
            ))}
          </div>

          {/* ── REAL Sample Listings by Region ─────────────────────────────── */}
          <AnimateIn>
            <div className="text-center mb-10">
              <span className="font-semibold text-sm uppercase tracking-widest" style={{ color: '#b49750' }}>Featured Listings</span>
              <h3 className="font-display text-3xl font-bold text-white mt-2">Available Properties by Region</h3>
              <p className="text-white/55 text-sm mt-3 max-w-xl mx-auto">
                Real listings sourced across the Dominican Republic, April 2026. All prices approximate. Inquire via WhatsApp for details.
              </p>
            </div>
          </AnimateIn>

          <div className="space-y-12">
            {sampleListingsByRegion.map((regionGroup, ri) => (
              <AnimateIn key={regionGroup.region} delay={ri * 60}>
                {/* Region header */}
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-2xl">{regionGroup.emoji}</span>
                  <h4 className="font-display text-xl font-bold text-white">{regionGroup.region}</h4>
                  <div className="flex-1 h-px opacity-20" style={{ background: '#b49750' }} />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {regionGroup.listings.map((prop, i) => {
                    const waMsg = encodeURIComponent(`Hi! I'm interested in the ${prop.title} in ${prop.location} listed at ${prop.price}. Can you tell me more?`)
                    const waUrl = `https://wa.me/19544983728?text=${waMsg}`
                    return (
                      <div
                        key={prop.title}
                        className="rounded-2xl overflow-hidden border hover:border-yellow-400/50 hover:shadow-2xl hover:shadow-yellow-900/20 transition-all duration-300 group flex flex-col"
                        style={{ background: 'rgba(255,255,255,0.06)', borderColor: 'rgba(255,255,255,0.12)' }}
                      >
                        {/* Property image with overlay badges */}
                        <div className="relative w-full overflow-hidden" style={{ paddingBottom: '62.5%' /* 16:10 aspect ratio */ }}>
                          <img
                            src={prop.image}
                            alt={prop.title}
                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />
                          {/* Bottom gradient for readability */}
                          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10,16,29,0.75) 0%, rgba(10,16,29,0.1) 50%, transparent 100%)' }} />
                          {/* Location badge — top left */}
                          <span
                            className="absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full backdrop-blur-sm"
                            style={{ background: 'rgba(10,16,29,0.75)', color: '#d4b96a', border: '1px solid rgba(180,151,80,0.4)' }}
                          >
                            📍 {prop.location}
                          </span>
                          {/* Type badge — top right */}
                          <span
                            className="absolute top-3 right-3 text-xs font-bold px-2.5 py-1 rounded-full backdrop-blur-sm"
                            style={{ background: `${regionGroup.color}cc`, color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}
                          >
                            {prop.type}
                          </span>
                          {/* Color accent bar at bottom of image */}
                          <div className="absolute bottom-0 left-0 right-0 h-0.5" style={{ background: `linear-gradient(90deg, ${regionGroup.color}, #b49750)` }} />
                        </div>

                        <div className="p-5 flex flex-col flex-grow">
                          <h4 className="font-bold text-white text-sm mb-2 leading-snug">{prop.title}</h4>

                          {/* Beds/Baths */}
                          {(prop.beds || prop.baths) && (
                            <div className="flex items-center gap-3 text-white/45 text-xs mb-2">
                              {prop.beds && <span>🛏 {prop.beds} Beds</span>}
                              {prop.baths && <span>🚿 {prop.baths} Baths</span>}
                            </div>
                          )}

                          <p className="text-white/60 text-xs leading-relaxed mb-4 flex-grow">{prop.desc}</p>

                          <div className="flex items-end justify-between mt-auto">
                            <div>
                              <div className="font-display text-lg font-bold" style={{ color: '#b49750' }}>{prop.priceDOP}</div>
                              <div className="text-white/50 text-sm mt-0.5">≈ {prop.price}</div>
                            </div>
                            <a
                              href={waUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs px-3 py-2 rounded-lg font-semibold transition-all hover:opacity-90 hover:-translate-y-0.5 flex items-center gap-1.5 whitespace-nowrap"
                              style={{ background: 'linear-gradient(135deg, #25a850, #1db954)', color: '#fff' }}
                            >
                              <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                              </svg>
                              Inquire via WhatsApp 💬
                            </a>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </AnimateIn>
            ))}
          </div>

          <AnimateIn delay={200}>
            <div className="text-center mt-10">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-sm transition-all hover:opacity-90 hover:-translate-y-0.5 shadow-xl"
                style={{ background: 'linear-gradient(135deg, #b49750, #d4b96a)', color: '#141e31' }}
              >
                🏖️ Get Early Access to DR Listings
              </Link>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ═══ 3b. APAP BANK FORECLOSURES CATALOG ════════════════════════════ */}
      <section className="py-24" style={{ background: 'linear-gradient(180deg, #0d1626 0%, #0a101d 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section Header */}
          <AnimateIn>
            <div className="text-center mb-14">
              <span className="font-semibold text-sm uppercase tracking-widest" style={{ color: '#b49750' }}>Bank Foreclosures · Bienes Adjudicados</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white mt-3">
                🏦 APAP Bank Foreclosures
                <span className="block mt-1" style={{ color: '#b49750' }}>March 2026 Catalog</span>
              </h2>
              <p className="text-white/65 text-base mt-5 max-w-2xl mx-auto leading-relaxed">
                Properties from <strong className="text-white">APAP (Asociación Popular de Ahorros y Préstamos)</strong>, one of the Dominican Republic's largest savings &amp; loan associations.
                These bank-adjudicated properties are priced to sell — many 20–40% below market value.
              </p>
              <div
                className="inline-flex items-center gap-2 mt-5 px-5 py-2.5 rounded-full text-sm font-semibold"
                style={{ background: 'rgba(180,151,80,0.15)', border: '1px solid rgba(180,151,80,0.35)', color: '#d4b96a' }}
              >
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#b49750' }} />
                27 Properties Available · Catalog Date: March 23, 2026
              </div>
            </div>
          </AnimateIn>

          {/* ── CASAS ─────────────────────────────────────────────────────── */}
          <AnimateIn delay={60}>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl">🏠</span>
              <h3 className="font-display text-2xl font-bold text-white">Casas</h3>
              <span
                className="text-xs font-bold px-2.5 py-1 rounded-full"
                style={{ background: 'rgba(46,160,67,0.2)', color: '#4ade80', border: '1px solid rgba(46,160,67,0.35)' }}
              >
                {apapListings.casas.length} Propiedades
              </span>
              <div className="flex-1 h-px opacity-20" style={{ background: '#b49750' }} />
            </div>
          </AnimateIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-14">
            {apapListings.casas.map((prop, i) => {
              const waMsg = encodeURIComponent(`Hi! I'm interested in the APAP foreclosure: ${prop.title} at ${prop.priceDOP} (${prop.priceUSD}). Code: ${prop.id}. Can you help me schedule a viewing?`)
              const waUrl = `https://wa.me/19546004976?text=${waMsg}`
              return (
                <AnimateIn key={prop.id} delay={i * 50}>
                  <div
                    className="rounded-2xl border hover:border-green-400/40 hover:shadow-2xl hover:shadow-green-900/10 transition-all duration-300 flex flex-col h-full overflow-hidden group"
                    style={{ background: 'rgba(255,255,255,0.055)', borderColor: 'rgba(255,255,255,0.1)' }}
                  >
                    {/* Property image */}
                    {prop.image && (
                      <div className="relative w-full overflow-hidden flex-shrink-0" style={{ height: '180px' }}>
                        <img
                          src={prop.image}
                          alt={prop.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10,16,29,0.6) 0%, transparent 60%)' }} />
                        <span
                          className="absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full backdrop-blur-sm"
                          style={{ background: 'rgba(46,160,67,0.85)', color: '#fff', border: '1px solid rgba(46,160,67,0.5)' }}
                        >
                          🏠 Casa
                        </span>
                        <span className="absolute top-3 right-3 text-white/60 text-xs font-mono bg-black/40 px-2 py-1 rounded-full">#{prop.id}</span>
                      </div>
                    )}

                    <div className="p-5 flex flex-col flex-grow">
                      {/* Top row: badge + code (shown only if no image) */}
                      {!prop.image && (
                        <div className="flex items-center justify-between mb-3">
                          <span
                            className="text-xs font-bold px-2.5 py-1 rounded-full"
                            style={{ background: 'rgba(46,160,67,0.2)', color: '#4ade80', border: '1px solid rgba(46,160,67,0.3)' }}
                          >
                            🏠 Casa
                          </span>
                          <span className="text-white/30 text-xs font-mono">#{prop.id}</span>
                        </div>
                      )}

                      {/* Title & Location */}
                      <h4 className="font-bold text-white text-sm leading-snug mb-1">{prop.title}</h4>
                      <p className="text-white/45 text-xs mb-3 leading-relaxed">📍 {prop.location}</p>

                      {/* Size + Beds/Baths */}
                      <div className="flex flex-wrap items-center gap-3 text-xs text-white/50 mb-3">
                        <span>📐 {prop.size} M²</span>
                        <span>🛏 {prop.beds} hab</span>
                        <span>🚿 {prop.baths}+ baños</span>
                      </div>

                      {/* Features */}
                      <ul className="space-y-1 mb-4 flex-grow">
                        {prop.features.map((f, fi) => (
                          <li key={fi} className="flex items-start gap-1.5 text-xs text-white/55">
                            <span style={{ color: '#b49750' }} className="mt-0.5 flex-shrink-0">›</span>
                            {f}
                          </li>
                        ))}
                      </ul>

                      {/* Price + CTA */}
                      <div
                        className="pt-3 mt-auto border-t flex items-end justify-between gap-3"
                        style={{ borderColor: 'rgba(255,255,255,0.08)' }}
                      >
                        <div>
                          <div className="font-display text-base font-extrabold leading-tight" style={{ color: '#b49750' }}>{prop.priceDOP}</div>
                          <div className="text-white/40 text-xs mt-0.5">{prop.priceUSD}</div>
                        </div>
                        <a
                          href={waUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-shrink-0 text-xs px-3 py-2 rounded-lg font-semibold flex items-center gap-1.5 transition-all hover:opacity-90 hover:-translate-y-0.5"
                          style={{ background: 'linear-gradient(135deg, #25a850, #1db954)', color: '#fff' }}
                        >
                          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                          </svg>
                          Ver
                        </a>
                      </div>
                    </div>
                  </div>
                </AnimateIn>
              )
            })}
          </div>

          {/* ── APARTAMENTOS ──────────────────────────────────────────────── */}
          <AnimateIn delay={60}>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl">🏢</span>
              <h3 className="font-display text-2xl font-bold text-white">Apartamentos</h3>
              <span
                className="text-xs font-bold px-2.5 py-1 rounded-full"
                style={{ background: 'rgba(59,130,246,0.2)', color: '#60a5fa', border: '1px solid rgba(59,130,246,0.35)' }}
              >
                {apapListings.apartamentos.length} Propiedades
              </span>
              <div className="flex-1 h-px opacity-20" style={{ background: '#b49750' }} />
            </div>
          </AnimateIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-14">
            {apapListings.apartamentos.map((prop, i) => {
              const waMsg = encodeURIComponent(`Hi! I'm interested in the APAP foreclosure: ${prop.title} at ${prop.priceDOP} (${prop.priceUSD}). Code: ${prop.id}. Can you help me schedule a viewing?`)
              const waUrl = `https://wa.me/19546004976?text=${waMsg}`
              const isPenthouse = prop.title.toLowerCase().includes('penthouse')
              return (
                <AnimateIn key={prop.id} delay={i * 50}>
                  <div
                    className="rounded-2xl border hover:border-blue-400/40 hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-300 flex flex-col h-full overflow-hidden group"
                    style={{ background: 'rgba(255,255,255,0.055)', borderColor: 'rgba(255,255,255,0.1)' }}
                  >
                    {/* Property image */}
                    {prop.image && (
                      <div className="relative w-full overflow-hidden flex-shrink-0" style={{ height: '180px' }}>
                        <img
                          src={prop.image}
                          alt={prop.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10,16,29,0.6) 0%, transparent 60%)' }} />
                        <span
                          className="absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full backdrop-blur-sm"
                          style={{
                            background: isPenthouse ? 'rgba(180,151,80,0.9)' : 'rgba(59,130,246,0.85)',
                            color: '#fff',
                            border: '1px solid rgba(255,255,255,0.3)',
                          }}
                        >
                          {isPenthouse ? '✨ Penthouse' : '🏢 Apto'}
                        </span>
                        <span className="absolute top-3 right-3 text-white/60 text-xs font-mono bg-black/40 px-2 py-1 rounded-full">#{prop.id}</span>
                      </div>
                    )}

                    <div className="p-5 flex flex-col flex-grow">
                      {/* Top row: badge + code (shown only if no image) */}
                      {!prop.image && (
                        <div className="flex items-center justify-between mb-3">
                          <span
                            className="text-xs font-bold px-2.5 py-1 rounded-full"
                            style={{
                              background: isPenthouse ? 'rgba(180,151,80,0.2)' : 'rgba(59,130,246,0.2)',
                              color: isPenthouse ? '#d4b96a' : '#60a5fa',
                              border: isPenthouse ? '1px solid rgba(180,151,80,0.3)' : '1px solid rgba(59,130,246,0.3)',
                            }}
                          >
                            {isPenthouse ? '✨ Penthouse' : '🏢 Apto'}
                          </span>
                          <span className="text-white/30 text-xs font-mono">#{prop.id}</span>
                        </div>
                      )}

                      <h4 className="font-bold text-white text-sm leading-snug mb-1">{prop.title}</h4>
                      <p className="text-white/45 text-xs mb-3 leading-relaxed">📍 {prop.location}</p>

                      <div className="flex flex-wrap items-center gap-3 text-xs text-white/50 mb-3">
                        <span>📐 {prop.size} M²</span>
                        <span>🛏 {prop.beds} hab</span>
                        <span>🚿 {prop.baths}+ baños</span>
                      </div>

                      <ul className="space-y-1 mb-4 flex-grow">
                        {prop.features.map((f, fi) => (
                          <li key={fi} className="flex items-start gap-1.5 text-xs text-white/55">
                            <span style={{ color: '#b49750' }} className="mt-0.5 flex-shrink-0">›</span>
                            {f}
                          </li>
                        ))}
                      </ul>

                      <div
                        className="pt-3 mt-auto border-t flex items-end justify-between gap-3"
                        style={{ borderColor: 'rgba(255,255,255,0.08)' }}
                      >
                        <div>
                          <div className="font-display text-base font-extrabold leading-tight" style={{ color: '#b49750' }}>{prop.priceDOP}</div>
                          <div className="text-white/40 text-xs mt-0.5">{prop.priceUSD}</div>
                        </div>
                        <a
                          href={waUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-shrink-0 text-xs px-3 py-2 rounded-lg font-semibold flex items-center gap-1.5 transition-all hover:opacity-90 hover:-translate-y-0.5"
                          style={{ background: 'linear-gradient(135deg, #25a850, #1db954)', color: '#fff' }}
                        >
                          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                          </svg>
                          Ver
                        </a>
                      </div>
                    </div>
                  </div>
                </AnimateIn>
              )
            })}
          </div>

          {/* ── SOLARES ───────────────────────────────────────────────────── */}
          <AnimateIn delay={60}>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl">🌳</span>
              <h3 className="font-display text-2xl font-bold text-white">Solares</h3>
              <span
                className="text-xs font-bold px-2.5 py-1 rounded-full"
                style={{ background: 'rgba(120,80,20,0.35)', color: '#d4a662', border: '1px solid rgba(180,120,40,0.4)' }}
              >
                {apapListings.solares.length} Propiedades
              </span>
              <div className="flex-1 h-px opacity-20" style={{ background: '#b49750' }} />
            </div>
          </AnimateIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-14">
            {apapListings.solares.map((prop, i) => {
              const waMsg = encodeURIComponent(`Hi! I'm interested in the APAP foreclosure land: ${prop.title} at ${prop.priceDOP} (${prop.priceUSD}). Code: ${prop.id}. Can you help me learn more?`)
              const waUrl = `https://wa.me/19546004976?text=${waMsg}`
              return (
                <AnimateIn key={prop.id} delay={i * 50}>
                  <div
                    className="rounded-2xl border hover:border-amber-600/40 hover:shadow-2xl hover:shadow-amber-900/10 transition-all duration-300 flex flex-col h-full overflow-hidden group"
                    style={{ background: 'rgba(255,255,255,0.055)', borderColor: 'rgba(255,255,255,0.1)' }}
                  >
                    {/* Property image */}
                    {prop.image && (
                      <div className="relative w-full overflow-hidden flex-shrink-0" style={{ height: '180px' }}>
                        <img
                          src={prop.image}
                          alt={prop.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10,16,29,0.6) 0%, transparent 60%)' }} />
                        <span
                          className="absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full backdrop-blur-sm"
                          style={{ background: 'rgba(120,80,20,0.85)', color: '#f5d78e', border: '1px solid rgba(180,120,40,0.5)' }}
                        >
                          🌳 Solar
                        </span>
                        <span className="absolute top-3 right-3 text-white/60 text-xs font-mono bg-black/40 px-2 py-1 rounded-full">#{prop.id}</span>
                      </div>
                    )}

                    <div className="p-5 flex flex-col flex-grow">
                      {/* Top row: badge + code (shown only if no image) */}
                      {!prop.image && (
                      <div className="flex items-center justify-between mb-3">
                        <span
                          className="text-xs font-bold px-2.5 py-1 rounded-full"
                          style={{ background: 'rgba(120,80,20,0.35)', color: '#d4a662', border: '1px solid rgba(180,120,40,0.4)' }}
                        >
                          🌳 Solar
                        </span>
                        <span className="text-white/30 text-xs font-mono">#{prop.id}</span>
                      </div>
                      )}

                      <h4 className="font-bold text-white text-sm leading-snug mb-1">{prop.title}</h4>
                      <p className="text-white/45 text-xs mb-3 leading-relaxed">📍 {prop.location}</p>

                      <div className="flex flex-wrap items-center gap-3 text-xs text-white/50 mb-3">
                        <span>📐 {prop.size} M²</span>
                      </div>

                      <ul className="space-y-1 mb-4 flex-grow">
                        {prop.features.map((f, fi) => (
                          <li key={fi} className="flex items-start gap-1.5 text-xs text-white/55">
                            <span style={{ color: '#b49750' }} className="mt-0.5 flex-shrink-0">›</span>
                            {f}
                          </li>
                        ))}
                      </ul>

                      <div
                        className="pt-3 mt-auto border-t flex items-end justify-between gap-3"
                        style={{ borderColor: 'rgba(255,255,255,0.08)' }}
                      >
                        <div>
                          <div className="font-display text-base font-extrabold leading-tight" style={{ color: '#b49750' }}>{prop.priceDOP}</div>
                          <div className="text-white/40 text-xs mt-0.5">{prop.priceUSD}</div>
                        </div>
                        <a
                          href={waUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-shrink-0 text-xs px-3 py-2 rounded-lg font-semibold flex items-center gap-1.5 transition-all hover:opacity-90 hover:-translate-y-0.5"
                          style={{ background: 'linear-gradient(135deg, #25a850, #1db954)', color: '#fff' }}
                        >
                          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                          </svg>
                          Ver
                        </a>
                      </div>
                    </div>
                  </div>
                </AnimateIn>
              )
            })}
          </div>

          {/* ── Bottom CTA ────────────────────────────────────────────────── */}
          <AnimateIn delay={100}>
            <div
              className="rounded-2xl p-8 text-center"
              style={{ background: 'linear-gradient(135deg, rgba(180,151,80,0.12) 0%, rgba(180,151,80,0.05) 100%)', border: '1px solid rgba(180,151,80,0.3)' }}
            >
              <div className="text-4xl mb-4">💬</div>
              <h3 className="font-display text-2xl font-bold text-white mb-2">
                Interested in an APAP Property?
              </h3>
              <p className="text-white/60 text-sm mb-6 max-w-lg mx-auto">
                Contact Virtus Realty to schedule a property viewing or get more details. We coordinate with APAP on your behalf and guide you through the entire purchase process.
              </p>
              <a
                href="https://wa.me/19546004976?text=Hi!%20I%27m%20interested%20in%20the%20APAP%20bank%20foreclosure%20properties%20from%20the%20March%202026%20catalog.%20Can%20you%20help%20me%3F"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-base shadow-xl hover:-translate-y-1 transition-all duration-200"
                style={{ background: '#25D366', color: '#fff' }}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Contact Virtus Realty via WhatsApp
              </a>
              <p className="text-white/35 text-xs mt-6">
                Source: APAP Bienes Adjudicados catalog, March 23, 2026. Contact APAP directly at{' '}
                <span className="text-white/50">bienesadjudicados@apap.com.do</span>{' '}
                or <span className="text-white/50">809-689-0171 ext. 2411/2412</span>
              </p>
            </div>
          </AnimateIn>

        </div>
      </section>

      {/* ═══ 4. POPULAR REGIONS ════════════════════════════════════════════ */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateIn>
            <div className="text-center mb-16">
              <span className="font-semibold text-sm uppercase tracking-widest" style={{ color: '#b49750' }}>Explore the Island</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold mt-3" style={{ color: '#141e31' }}>
                Popular Regions
              </h2>
              <p className="text-gray-500 text-lg mt-4 max-w-2xl mx-auto">
                From ultra-luxury golf resorts to bohemian beach towns — find the DR neighborhood that matches your lifestyle.
              </p>
            </div>
          </AnimateIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regions.map((region, i) => (
              <AnimateIn key={region.id} delay={i * 80}>
                <div
                  id={region.id}
                  className="group rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-400 cursor-pointer border border-transparent hover:border-yellow-400/40 bg-white"
                  onClick={() => setActiveRegion(activeRegion === region.id ? null : region.id)}
                >
                  {/* Image */}
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={region.image}
                      alt={region.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <h3 className="font-display text-xl font-bold text-white">{region.name}</h3>
                      <p className="text-white/75 text-xs mt-1">{region.tagline}</p>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">{region.desc}</p>
                    <div className="flex items-center justify-between">
                      <span
                        className="text-xs px-3 py-1.5 rounded-full font-semibold"
                        style={{ background: 'rgba(180,151,80,0.12)', color: '#8a6f2e' }}
                      >
                        {region.highlight}
                      </span>
                    </div>
                    <div
                      className="mt-4 pt-4 border-t flex items-center justify-between"
                      style={{ borderColor: 'rgba(180,151,80,0.2)' }}
                    >
                      <div>
                        <span className="text-xs text-gray-400 uppercase tracking-wider">Avg. Price Range</span>
                        <div className="font-display font-bold text-base mt-0.5" style={{ color: '#141e31' }}>{region.priceRangeDOP || region.priceRange}</div>
                        <div className="text-xs text-gray-400 mt-0.5">≈ {region.priceRange} USD</div>
                      </div>
                      <a
                        href={`${whatsappUrl}&text=${encodeURIComponent(`Hi! I'm interested in properties in ${region.name}, Dominican Republic`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs px-4 py-2 rounded-lg font-bold transition-all hover:-translate-y-0.5"
                        style={{ background: '#141e31', color: '#b49750' }}
                        onClick={e => e.stopPropagation()}
                      >
                        Explore →
                      </a>
                    </div>
                  </div>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 5. BUYING PROCESS ══════════════════════════════════════════════ */}
      <section className="py-24" style={{ background: 'linear-gradient(135deg, #141e31 0%, #0d1626 100%)' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateIn>
            <div className="text-center mb-16">
              <span className="font-semibold text-sm uppercase tracking-widest" style={{ color: '#b49750' }}>Simple & Transparent</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white mt-3">
                How Americans Buy in the DR
              </h2>
              <p className="text-white/65 text-lg mt-4 max-w-xl mx-auto">
                We guide you through every step. No surprises, no confusion — just a clear path to your Caribbean home.
              </p>
            </div>
          </AnimateIn>

          <div className="relative">
            {/* Vertical line connector */}
            <div
              className="absolute left-7 top-8 bottom-8 w-0.5 hidden md:block"
              style={{ background: 'linear-gradient(to bottom, #b49750, rgba(180,151,80,0.1))' }}
            />

            <div className="space-y-6">
              {buyingSteps.map((step, i) => (
                <AnimateIn key={step.step} delay={i * 100}>
                  <div
                    className="flex gap-6 p-6 rounded-2xl border border-white/10 hover:border-yellow-400/30 transition-all duration-300"
                    style={{ background: 'rgba(255,255,255,0.04)' }}
                  >
                    {/* Step number circle */}
                    <div className="flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center font-display text-lg font-extrabold z-10"
                      style={{ background: 'linear-gradient(135deg, #b49750, #d4b96a)', color: '#141e31' }}>
                      {step.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xs font-bold px-2 py-0.5 rounded" style={{ background: 'rgba(180,151,80,0.2)', color: '#b49750' }}>
                          Step {step.step}
                        </span>
                        <h3 className="font-display text-lg font-bold text-white">{step.title}</h3>
                      </div>
                      <p className="text-white/65 text-sm leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                </AnimateIn>
              ))}
            </div>
          </div>

          {/* Equal rights callout */}
          <AnimateIn delay={200}>
            <div
              className="mt-10 p-6 md:p-8 rounded-2xl text-center"
              style={{ background: 'linear-gradient(135deg, rgba(180,151,80,0.15), rgba(180,151,80,0.05))', border: '1px solid rgba(180,151,80,0.3)' }}
            >
              <div className="text-4xl mb-3">🏛️</div>
              <h3 className="font-display text-xl font-bold mb-2" style={{ color: '#b49750' }}>
                "Foreigners have the SAME property rights as Dominican citizens"
              </h3>
              <p className="text-white/65 text-sm max-w-xl mx-auto">
                DR Law 171-07 grants Americans full property ownership rights — including the ability to own land, receive title deeds, and pass property to heirs. No restrictions.
              </p>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ═══ 6. LIFESTYLE SECTION ══════════════════════════════════════════ */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateIn>
            <div className="text-center mb-16">
              <span className="font-semibold text-sm uppercase tracking-widest" style={{ color: '#b49750' }}>The Life You've Been Dreaming Of</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold mt-3" style={{ color: '#141e31' }}>
                Imagine Your Caribbean Life
              </h2>
              <p className="text-gray-500 text-lg mt-4 max-w-2xl mx-auto">
                This isn't just an investment. It's a lifestyle upgrade — at a price that makes it real.
              </p>
            </div>
          </AnimateIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {lifestyleItems.map((item, i) => (
              <AnimateIn key={item.title} delay={i * 80}>
                <div className="group relative rounded-2xl overflow-hidden h-72 shadow-lg hover:shadow-2xl transition-all duration-400">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(to top, rgba(20,30,49,0.9) 0%, rgba(20,30,49,0.3) 60%, transparent 100%)' }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">{item.icon}</span>
                      <h3 className="font-display text-xl font-bold text-white">{item.title}</h3>
                    </div>
                    <p className="text-white/75 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </AnimateIn>
            ))}
          </div>

          {/* Cost comparison strip */}
          <AnimateIn delay={200}>
            <div
              className="mt-12 p-8 rounded-2xl"
              style={{ background: 'linear-gradient(135deg, #141e31, #1c2d4a)' }}
            >
              <h3 className="font-display text-2xl font-bold text-white text-center mb-8">Your Dollar Goes Further in the DR</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { item: '🍽️ Dinner for Two', us: '$80–120', dr: '$20–40' },
                  { item: '💅 Housekeeper/Week', us: '$200–400', dr: '$60–80' },
                  { item: '🏥 Doctor Visit', us: '$200–400', dr: '$30–60' },
                  { item: '⚡ Monthly Utilities', us: '$200–350', dr: '$60–120' },
                ].map(({ item, us, dr }) => (
                  <div
                    key={item}
                    className="p-4 rounded-xl text-center"
                    style={{ background: 'rgba(255,255,255,0.06)' }}
                  >
                    <div className="text-sm text-white/70 mb-3">{item}</div>
                    <div className="text-red-400 text-xs line-through mb-1">US: {us}</div>
                    <div className="font-display text-lg font-bold" style={{ color: '#b49750' }}>DR: {dr}</div>
                  </div>
                ))}
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ═══ 7. SOCIAL PROOF / TESTIMONIALS ══════════════════════════════ */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateIn>
            <div className="text-center mb-16">
              <span className="font-semibold text-sm uppercase tracking-widest" style={{ color: '#b49750' }}>Real Stories</span>
              <h2 className="font-display text-4xl font-bold mt-3" style={{ color: '#141e31' }}>
                We've Helped Families Find Paradise
              </h2>
            </div>
          </AnimateIn>

          <AnimateIn delay={100}>
            {/* Main social proof banner */}
            <div
              className="p-8 md:p-12 rounded-3xl text-center mb-8 relative overflow-hidden"
              style={{ background: 'linear-gradient(135deg, #141e31, #1c2d4a)' }}
            >
              <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-5" style={{ background: '#b49750', transform: 'translate(30%, -30%)' }} />
              <div className="relative">
                <div className="text-6xl mb-6">🇩🇴</div>
                <div className="font-display text-5xl md:text-6xl font-extrabold mb-4" style={{ color: '#b49750' }}>3</div>
                <h3 className="font-display text-2xl font-bold text-white mb-3">Families Purchased DR Vacation Homes in 2025</h3>
                <p className="text-white/65 max-w-lg mx-auto">
                  We guided each family through every step — from the first WhatsApp call to keys in hand.
                  Their investment? Already appreciating. Their smiles? Priceless.
                </p>
              </div>
            </div>
          </AnimateIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                quote: "We never thought we could afford a beachfront home. Virtus found us a foreclosure in Punta Cana for $189K. We've already made $22K in rental income.",
                name: 'The Martinez Family',
                location: 'Miami, FL → Punta Cana, DR',
                emoji: '🏖️',
              },
              {
                quote: "The process was smoother than buying in the US. Virtus connected us with a DR attorney, handled everything remotely, and we closed in 45 days.",
                name: 'The Johnson Family',
                location: 'Atlanta, GA → Las Terrenas, DR',
                emoji: '🌴',
              },
              {
                quote: "We retired at 58. Our home in Samaná cost $195K. Our US mortgage was $380K. Same quality, half the price, double the lifestyle.",
                name: 'The Williams Family',
                location: 'New York, NY → Samaná, DR',
                emoji: '🌊',
              },
            ].map((t, i) => (
              <AnimateIn key={t.name} delay={i * 80}>
                <div
                  className="p-6 rounded-2xl border h-full flex flex-col"
                  style={{ background: '#fff', borderColor: 'rgba(180,151,80,0.2)' }}
                >
                  <div className="text-3xl mb-4">{t.emoji}</div>
                  <div className="text-4xl font-serif mb-3 leading-none" style={{ color: '#b49750' }}>"</div>
                  <p className="text-gray-600 text-sm leading-relaxed flex-grow italic">{t.quote}</p>
                  <div className="mt-5 pt-4 border-t" style={{ borderColor: 'rgba(180,151,80,0.2)' }}>
                    <div className="font-bold text-sm" style={{ color: '#141e31' }}>{t.name}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{t.location}</div>
                  </div>
                </div>
              </AnimateIn>
            ))}
          </div>

          <AnimateIn delay={200}>
            <p className="text-center text-xs text-gray-400 mt-6 italic">
              * Testimonials represent composite family profiles. Individual results vary. Contact us for verified case studies.
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* ═══ NEW: MARKET STATS BANNER ══════════════════════════════════════ */}
      <section className="py-12" style={{ background: 'linear-gradient(135deg, #0d1a2d 0%, #141e31 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateIn>
            <div
              className="rounded-2xl p-6 md:p-8 border"
              style={{ background: 'linear-gradient(135deg, rgba(180,151,80,0.12) 0%, rgba(180,151,80,0.04) 100%)', borderColor: 'rgba(180,151,80,0.4)' }}
            >
              <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📊</span>
                  <div>
                    <h3 className="font-display text-xl font-bold text-white">DR Market Intelligence</h3>
                    <p className="text-white/50 text-xs">Source: HolProp Market Intelligence, April 2026</p>
                  </div>
                </div>
                <div className="md:ml-auto">
                  <span
                    className="text-xs font-bold px-3 py-1.5 rounded-full"
                    style={{ background: 'rgba(180,151,80,0.2)', color: '#d4b96a', border: '1px solid rgba(180,151,80,0.4)' }}
                  >
                    Live Market Data
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {[
                  { label: 'Avg Price / m²', value: 'RD$ 84K–126K', icon: '💵', sub: '≈ $1,200–$1,800 USD' },
                  { label: 'Annual Growth', value: '5.5%', icon: '📈', sub: 'Year over year' },
                  { label: 'Rental Yield', value: '6–9%', icon: '🏠', sub: 'Short-term rentals' },
                  { label: 'Foreign Ownership', value: '100%', icon: '🌎', sub: 'Same rights as locals' },
                  { label: 'Buyer Demand', value: 'High', icon: '🔥', sub: 'N. American & European' },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="text-center p-4 rounded-xl"
                    style={{ background: 'rgba(255,255,255,0.05)' }}
                  >
                    <div className="text-2xl mb-2">{stat.icon}</div>
                    <div className="font-display text-xl font-extrabold" style={{ color: '#b49750' }}>{stat.value}</div>
                    <div className="text-white/80 text-xs font-semibold mt-1">{stat.label}</div>
                    <div className="text-white/35 text-xs mt-0.5">{stat.sub}</div>
                  </div>
                ))}
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ═══ NEW: DISTRESSED & FORECLOSURE PROPERTY SOURCES ══════════════ */}
      <section id="property-resources" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateIn>
            <div className="text-center mb-12">
              <span className="font-semibold text-sm uppercase tracking-widest" style={{ color: '#b49750' }}>Do Your Own Research</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold mt-3" style={{ color: '#141e31' }}>
                Distressed &amp; Foreclosure
                <span className="block" style={{ color: '#b49750' }}>Property Sources</span>
              </h2>
              <p className="text-gray-500 text-lg mt-4 max-w-2xl mx-auto">
                We believe in full transparency. Here are the real sources where bank-owned and government-seized properties are listed in the Dominican Republic.
              </p>
            </div>
          </AnimateIn>

          {/* Tab navigation */}
          <AnimateIn delay={100}>
            <div className="flex flex-wrap gap-2 mb-8 justify-center">
              {[
                { id: 'banks', label: '🏦 Bank Foreclosures', count: bankSources.length },
                { id: 'government', label: '🏛️ Government Sales', count: governmentSources.length },
                { id: 'aggregators', label: '🔍 Aggregators & Directories', count: aggregatorSources.length },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveSourceTab(tab.id)}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm transition-all duration-200"
                  style={activeSourceTab === tab.id
                    ? { background: '#141e31', color: '#b49750', border: '2px solid #b49750' }
                    : { background: 'rgba(20,30,49,0.06)', color: '#141e31', border: '2px solid transparent' }
                  }
                >
                  {tab.label}
                  <span
                    className="text-xs px-2 py-0.5 rounded-full font-bold"
                    style={activeSourceTab === tab.id
                      ? { background: 'rgba(180,151,80,0.2)', color: '#b49750' }
                      : { background: 'rgba(20,30,49,0.1)', color: '#666' }
                    }
                  >
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>
          </AnimateIn>

          {/* Bank Foreclosures Tab */}
          {activeSourceTab === 'banks' && (
            <AnimateIn>
              <div>
                <div
                  className="flex items-center gap-3 p-4 rounded-xl mb-6"
                  style={{ background: 'linear-gradient(135deg, #141e31, #1c2d4a)' }}
                >
                  <span className="text-2xl">🏦</span>
                  <div>
                    <h3 className="font-display text-lg font-bold text-white">Bienes Adjudicados — Bank-Owned Properties</h3>
                    <p className="text-white/55 text-sm">Direct listings from Dominican banks. Updated regularly. Discounts 30–65% off market value.</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {bankSources.map((bank, i) => (
                    <a
                      key={bank.name}
                      href={bank.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block p-5 rounded-2xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                      style={{
                        borderColor: bank.highlight ? '#b49750' : 'rgba(20,30,49,0.12)',
                        background: bank.highlight
                          ? 'linear-gradient(135deg, #fdf9f0, #fff)'
                          : '#fff',
                      }}
                    >
                      {bank.highlight && (
                        <span
                          className="inline-block text-xs font-bold px-2.5 py-1 rounded-full mb-3"
                          style={{ background: '#141e31', color: '#b49750' }}
                        >
                          ⭐ Best Deal
                        </span>
                      )}
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-xl mb-3"
                        style={{ background: 'rgba(20,30,49,0.07)' }}
                      >
                        🏦
                      </div>
                      <h4 className="font-bold text-sm mb-2" style={{ color: '#141e31' }}>{bank.name}</h4>
                      <p className="text-gray-500 text-xs leading-relaxed mb-3">{bank.desc}</p>
                      <div
                        className="text-xs font-semibold flex items-center gap-1 group-hover:gap-2 transition-all"
                        style={{ color: '#b49750' }}
                      >
                        View Listings ↗
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </AnimateIn>
          )}

          {/* Government Tab */}
          {activeSourceTab === 'government' && (
            <AnimateIn>
              <div>
                <div
                  className="flex items-center gap-3 p-4 rounded-xl mb-6"
                  style={{ background: 'linear-gradient(135deg, #141e31, #1c2d4a)' }}
                >
                  <span className="text-2xl">🏛️</span>
                  <div>
                    <h3 className="font-display text-lg font-bold text-white">Government &amp; Regulatory Property Sales</h3>
                    <p className="text-white/55 text-sm">Official Dominican Republic government sources. Seized, forfeited, and state-owned properties.</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {governmentSources.map((source) => (
                    <a
                      key={source.name}
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block p-6 rounded-2xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-white"
                      style={{ borderColor: 'rgba(20,30,49,0.12)' }}
                    >
                      {source.badge && (
                        <span
                          className="inline-block text-xs font-bold px-2.5 py-1 rounded-full mb-3"
                          style={{ background: '#141e31', color: '#b49750' }}
                        >
                          {source.badge}
                        </span>
                      )}
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4"
                        style={{ background: 'rgba(20,30,49,0.07)' }}
                      >
                        🏛️
                      </div>
                      <h4 className="font-bold text-base mb-2" style={{ color: '#141e31' }}>{source.name}</h4>
                      <p className="text-gray-500 text-sm leading-relaxed mb-4">{source.desc}</p>
                      <div
                        className="text-sm font-semibold flex items-center gap-1"
                        style={{ color: '#b49750' }}
                      >
                        Visit Site ↗
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </AnimateIn>
          )}

          {/* Aggregators Tab */}
          {activeSourceTab === 'aggregators' && (
            <AnimateIn>
              <div>
                <div
                  className="flex items-center gap-3 p-4 rounded-xl mb-6"
                  style={{ background: 'linear-gradient(135deg, #141e31, #1c2d4a)' }}
                >
                  <span className="text-2xl">🔍</span>
                  <div>
                    <h3 className="font-display text-lg font-bold text-white">Property Aggregators &amp; Directories</h3>
                    <p className="text-white/55 text-sm">The easiest way to search across multiple sources at once. Start here for broad market coverage.</p>
                  </div>
                </div>

                {/* Master aggregator — highlighted */}
                {aggregatorSources.filter(s => s.isMaster).map(source => (
                  <a
                    key={source.name}
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col md:flex-row items-start md:items-center gap-5 p-6 rounded-2xl border-2 mb-5 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                    style={{ borderColor: '#b49750', background: 'linear-gradient(135deg, #fdf9f0, #fff9ed)' }}
                  >
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
                      style={{ background: 'linear-gradient(135deg, #141e31, #1c2d4a)' }}
                    >
                      ⭐
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h4 className="font-display text-xl font-bold" style={{ color: '#141e31' }}>{source.name}</h4>
                        <span
                          className="text-xs font-bold px-3 py-1 rounded-full"
                          style={{ background: '#141e31', color: '#b49750' }}
                        >
                          {source.badge}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed">{source.desc}</p>
                    </div>
                    <div
                      className="flex-shrink-0 px-5 py-3 rounded-xl font-bold text-sm flex items-center gap-2 transition-all group-hover:opacity-90"
                      style={{ background: 'linear-gradient(135deg, #b49750, #d4b96a)', color: '#141e31' }}
                    >
                      Browse Now ↗
                    </div>
                  </a>
                ))}

                {/* Other aggregators */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {aggregatorSources.filter(s => !s.isMaster).map((source) => (
                    <a
                      key={source.name}
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block p-5 rounded-2xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-white"
                      style={{ borderColor: 'rgba(20,30,49,0.12)' }}
                    >
                      {source.badge && (
                        <span
                          className="inline-block text-xs font-bold px-2.5 py-1 rounded-full mb-3"
                          style={{ background: 'rgba(180,151,80,0.15)', color: '#8a6f2e', border: '1px solid rgba(180,151,80,0.3)' }}
                        >
                          {source.badge}
                        </span>
                      )}
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-xl mb-3"
                        style={{ background: 'rgba(20,30,49,0.07)' }}
                      >
                        🔍
                      </div>
                      <h4 className="font-bold text-sm mb-2" style={{ color: '#141e31' }}>{source.name}</h4>
                      <p className="text-gray-500 text-xs leading-relaxed mb-3">{source.desc}</p>
                      <div
                        className="text-xs font-semibold flex items-center gap-1 group-hover:gap-2 transition-all"
                        style={{ color: '#b49750' }}
                      >
                        Browse Listings ↗
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </AnimateIn>
          )}

          {/* Disclaimer */}
          <AnimateIn delay={200}>
            <div
              className="mt-8 p-4 rounded-xl text-center"
              style={{ background: 'rgba(20,30,49,0.05)', border: '1px solid rgba(20,30,49,0.1)' }}
            >
              <p className="text-gray-500 text-xs">
                📌 Links open in a new tab. Virtus Realty Group is not affiliated with any of these platforms. Prices and listings change frequently — always verify directly with the source.
                <Link to="/contact" className="ml-1 font-semibold" style={{ color: '#b49750' }}>Need help navigating these? We can guide you. →</Link>
              </p>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ═══ NEW: DUE DILIGENCE & TITLE RESEARCH ════════════════════════ */}
      <section className="py-16" style={{ background: 'linear-gradient(135deg, #f8f5ef 0%, #f4efe3 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateIn>
            <div className="text-center mb-10">
              <span className="font-semibold text-sm uppercase tracking-widest" style={{ color: '#b49750' }}>Before You Buy</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold mt-3" style={{ color: '#141e31' }}>
                Due Diligence &amp; Title Research
              </h2>
              <p className="text-gray-600 text-base mt-3 max-w-xl mx-auto">
                Never skip title research in the DR. These trusted resources make it easy and affordable.
              </p>
            </div>
          </AnimateIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {dueDiligenceResources.map((resource, i) => (
              <AnimateIn key={resource.name} delay={i * 80}>
                <a
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col p-6 rounded-2xl border bg-white transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full"
                  style={{ borderColor: 'rgba(180,151,80,0.3)' }}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                      style={{ background: 'linear-gradient(135deg, #141e31, #1c2d4a)' }}
                    >
                      {resource.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-base" style={{ color: '#141e31' }}>{resource.name}</h4>
                      <span
                        className="text-xs font-bold px-2 py-0.5 rounded-full mt-1 inline-block"
                        style={{ background: 'rgba(180,151,80,0.15)', color: '#8a6f2e', border: '1px solid rgba(180,151,80,0.3)' }}
                      >
                        {resource.badge}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed flex-grow">{resource.desc}</p>
                  <div
                    className="mt-4 pt-4 border-t text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all"
                    style={{ borderColor: 'rgba(180,151,80,0.2)', color: '#b49750' }}
                  >
                    Learn More ↗
                  </div>
                </a>
              </AnimateIn>
            ))}
          </div>

          <AnimateIn delay={200}>
            <div
              className="mt-8 p-5 rounded-xl flex flex-col md:flex-row items-center gap-4"
              style={{ background: 'linear-gradient(135deg, #141e31, #1c2d4a)', border: '1px solid rgba(180,151,80,0.2)' }}
            >
              <div className="text-3xl flex-shrink-0">🔒</div>
              <div className="flex-1 text-center md:text-left">
                <h4 className="font-bold text-white text-sm mb-1">Virtus Realty handles due diligence coordination for you</h4>
                <p className="text-white/55 text-xs">Our team connects you with vetted DR attorneys and notaries who specialize in foreign buyer transactions. We make sure nothing gets missed.</p>
              </div>
              <Link
                to="/contact"
                className="flex-shrink-0 px-5 py-2.5 rounded-lg font-bold text-sm transition-all hover:opacity-90"
                style={{ background: 'linear-gradient(135deg, #b49750, #d4b96a)', color: '#141e31' }}
              >
                Talk to Our Team →
              </Link>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ═══ 8. CTA FOOTER SECTION ════════════════════════════════════════ */}
      <section id="investment" className="py-24 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0a101d 0%, #141e31 60%, #0d1a2d 100%)' }}>
        {/* Background texture */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1400&q=60')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full animate-pulse"
              style={{
                left: `${(i * 13 + 3) % 100}%`,
                top: `${(i * 19 + 7) % 100}%`,
                width: 2 + (i % 5),
                height: 2 + (i % 5),
                background: '#b49750',
                opacity: 0.2,
                animationDelay: `${i * 250}ms`,
                animationDuration: `${2500 + i * 300}ms`,
              }}
            />
          ))}
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimateIn>
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="h-px w-20 opacity-40" style={{ background: '#b49750' }} />
              <span className="text-3xl">🌴</span>
              <div className="h-px w-20 opacity-40" style={{ background: '#b49750' }} />
            </div>

            <h2 className="font-display text-5xl md:text-6xl font-extrabold text-white mb-6">
              Ready to Explore
              <span className="block" style={{ color: '#b49750' }}>Paradise?</span>
            </h2>

            <p className="text-xl text-white/75 max-w-xl mx-auto mb-12 leading-relaxed">
              Your free DR property consultation is one click away. Let's find your perfect piece of the Caribbean — before someone else does.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-8 py-5 rounded-xl font-bold text-base shadow-2xl hover:-translate-y-1 transition-all duration-200 hover:shadow-green-900/50"
                style={{ background: '#25D366', color: '#fff' }}
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp Us Now
              </a>

              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-5 rounded-xl font-bold text-base transition-all hover:bg-white/20 hover:-translate-y-1"
                style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.25)', color: '#fff' }}
              >
                📅 Schedule Your Free DR Consultation
              </Link>
            </div>

            {/* Phone */}
            <a
              href="tel:+19544983728"
              className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors text-lg font-semibold"
            >
              📞 (954) 498-3728
            </a>

            {/* Trust badges */}
            <div className="mt-12 flex flex-wrap justify-center gap-6">
              {[
                '🇩🇴 DR Specialist',
                '⚖️ Legal Network',
                '🏡 Property Management',
                '🇺🇸 US-Based Team',
                '🔒 Secure Transactions',
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

            {/* Gold divider */}
            <div className="mt-12 w-24 h-1 mx-auto rounded-full" style={{ background: 'linear-gradient(90deg, transparent, #b49750, transparent)' }} />
          </AnimateIn>
        </div>
      </section>
    </div>
  )
}
