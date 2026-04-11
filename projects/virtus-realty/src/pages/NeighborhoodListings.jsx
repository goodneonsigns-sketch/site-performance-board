import React, { useState, useRef, useCallback, useEffect, useMemo } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useSparkListings, formatPrice } from '../hooks/useSparkListings'
import PropertyCard from '../components/PropertyCard'

/* ═══════════════════════════════════════════════════════════
   NEIGHBORHOOD DATA MAP
════════════════════════════════════════════════════════════ */

export const NEIGHBORHOODS = {
  // Miami-Dade Cities
  'miami-beach': {
    name: 'Miami Beach',
    county: 'Miami-Dade',
    countySlug: 'miami-dade-county',
    emoji: '🌴',
    vibe: '🌊 Oceanfront Living',
    desc: 'Miami Beach homes for sale range from iconic Art Deco condos on Ocean Drive to luxury waterfront estates on the Venetian Islands, with median home prices around $600K. Buyers love the world-famous beaches, vibrant South Beach nightlife, and walkable Lincoln Road dining scene. From family-friendly Mid-Beach to the exclusive enclaves of La Gorce and Sunset Islands, Miami Beach offers an unmatched oceanfront lifestyle in Miami-Dade County.',
    seoTitle: 'Miami Beach Homes for Sale | Virtus Realty Group',
    apiCity: 'Miami Beach',
    apiCounty: null,
    isCounty: false,
  },
  'brickell': {
    name: 'Brickell',
    county: 'Miami-Dade',
    countySlug: 'miami-dade-county',
    emoji: '🏙️',
    vibe: '🏙️ Urban Energy',
    desc: 'Known as the "Manhattan of the South," Brickell is Miami\'s premier urban neighborhood featuring luxury high-rise condos with stunning Biscayne Bay views and median prices starting in the mid-$400Ks. The area is home to Miami\'s financial district, Brickell City Centre, and some of the best dining and nightlife in South Florida. Young professionals and international buyers are drawn to Brickell\'s walkable lifestyle, world-class amenities, and easy access to downtown Miami and Key Biscayne.',
    seoTitle: 'Brickell Homes for Sale | Virtus Realty Group',
    apiCity: 'Miami',
    apiCounty: null,
    isCounty: false,
  },
  'coral-gables': {
    name: 'Coral Gables',
    county: 'Miami-Dade',
    countySlug: 'miami-dade-county',
    emoji: '🏛️',
    vibe: '🌳 Mediterranean Elegance',
    desc: 'Coral Gables is one of South Florida\'s most prestigious neighborhoods, featuring tree-lined boulevards, Mediterranean Revival architecture, and homes with median prices around $1.1M. The "City Beautiful" is home to the University of Miami, the historic Biltmore Hotel, and the upscale shops and restaurants of Miracle Mile. Families and executives choose Coral Gables for its top-rated schools, lush canopy roads, and timeless old-money elegance just minutes from downtown Miami.',
    seoTitle: 'Coral Gables Homes for Sale | Virtus Realty Group',
    apiCity: 'Coral Gables',
    apiCounty: null,
    isCounty: false,
  },
  'doral': {
    name: 'Doral',
    county: 'Miami-Dade',
    countySlug: 'miami-dade-county',
    emoji: '⛳',
    vibe: '⛳ Golf & Family',
    desc: 'Doral is one of Miami-Dade\'s fastest-growing cities, offering homes for sale from the mid-$400Ks in master-planned communities with A-rated schools and world-class golf courses including Trump National Doral. The city is a major business hub with proximity to Miami International Airport and a thriving Latin American community. Families love Doral for its newer construction, gated neighborhoods like Doral Isles and Canarias at Downtown Doral, and excellent parks and recreation facilities.',
    seoTitle: 'Doral Homes for Sale | Virtus Realty Group',
    apiCity: 'Doral',
    apiCounty: null,
    isCounty: false,
  },
  'aventura': {
    name: 'Aventura',
    county: 'Miami-Dade',
    countySlug: 'miami-dade-county',
    emoji: '🛍️',
    vibe: '💎 Luxury Waterfront',
    desc: 'Aventura is a luxury waterfront enclave in northeast Miami-Dade, best known for the world-renowned Aventura Mall and stunning high-rise condos along the Intracoastal Waterway with prices ranging from $350K to $5M+. The city offers an upscale, resort-style lifestyle with top-rated charter schools, beautiful parks, and easy access to Sunny Isles Beach. Buyers seeking modern luxury living with panoramic water views and proximity to both Miami and Fort Lauderdale find Aventura the perfect fit.',
    seoTitle: 'Aventura Homes for Sale | Virtus Realty Group',
    apiCity: 'Aventura',
    apiCounty: null,
    isCounty: false,
  },
  'homestead': {
    name: 'Homestead',
    county: 'Miami-Dade',
    countySlug: 'miami-dade-county',
    emoji: '🏡',
    vibe: '🌱 Affordable Growth',
    desc: 'Homestead is Miami-Dade County\'s most affordable gateway, with median home prices around $400K and abundant new construction making it ideal for first-time home buyers and growing families. Located near the gateway to the Florida Keys and Everglades National Park, Homestead offers a quieter pace of life with spacious single-family homes and modern planned communities. The city has seen rapid appreciation and development, making it one of South Florida\'s best value markets for buyers seeking space and affordability.',
    seoTitle: 'Homestead Homes for Sale | Virtus Realty Group',
    apiCity: 'Homestead',
    apiCounty: null,
    isCounty: false,
  },
  'kendall': {
    name: 'Kendall',
    county: 'Miami-Dade',
    countySlug: 'miami-dade-county',
    emoji: '🏫',
    vibe: '🏡 Suburban Charm',
    desc: 'Kendall is a sprawling suburban community in southwest Miami-Dade offering family-friendly homes for sale with median prices around $550K and some of the area\'s best public and private schools. The neighborhood features a mix of single-family homes, townhomes, and condos near major shopping centers like Dadeland Mall and The Falls. Buyers love Kendall for its established neighborhoods, easy access to the Palmetto Expressway and US-1, and a strong sense of community throughout its diverse residential enclaves.',
    seoTitle: 'Kendall Homes for Sale | Virtus Realty Group',
    apiCity: 'Kendall',
    apiCounty: null,
    isCounty: false,
  },
  'miami-dade-county': {
    name: 'Miami-Dade County',
    county: 'Miami-Dade',
    countySlug: 'miami-dade-county',
    emoji: '🌆',
    vibe: '🌎 Gateway to the Americas',
    desc: 'Miami-Dade County is South Florida\'s largest and most dynamic real estate market, offering homes for sale from affordable Homestead properties to ultra-luxury Miami Beach estates across 34 municipalities. As the "Gateway to the Americas," the county attracts international buyers, major corporations, and a diverse population of 2.7 million residents. From the glamour of Brickell\'s skyline to the family suburbs of Kendall and Doral, Miami-Dade offers world-class culture, no state income tax, and year-round tropical living that drives consistent demand and appreciation.',
    seoTitle: 'Miami-Dade County Homes for Sale | Virtus Realty Group',
    apiCity: null,
    apiCounty: 'Miami-Dade',
    isCounty: true,
  },

  // Broward Cities
  'hollywood': {
    name: 'Hollywood',
    county: 'Broward',
    countySlug: 'broward-county',
    emoji: '🏖️',
    vibe: '🌊 Beachfront Charm',
    desc: 'Hollywood, Florida homes for sale offer beachfront charm at prices well below neighboring Fort Lauderdale and Miami Beach, with median home prices around $420K and oceanfront condos starting in the $200Ks. The 2.5-mile Hollywood Broadwalk is one of the best beach boardwalks in the country, lined with cafes, shops, and live entertainment. Buyers love Hollywood for its eclectic arts district along Hollywood Boulevard, diverse dining scene, and unbeatable proximity to both Fort Lauderdale and Miami.',
    seoTitle: 'Hollywood FL Homes for Sale | Virtus Realty Group',
    apiCity: 'Hollywood',
    apiCounty: null,
    isCounty: false,
  },
  'hallandale-beach': {
    name: 'Hallandale Beach',
    county: 'Broward',
    countySlug: 'broward-county',
    emoji: '🎰',
    vibe: '💫 Casino & Waterfront',
    desc: 'Hallandale Beach sits at the coveted border of Broward and Miami-Dade counties, offering waterfront condos and single-family homes with median prices around $350K and stunning Intracoastal and ocean views. Home to the Gulfstream Park Racing and Casino entertainment complex, Hallandale Beach delivers a vibrant lifestyle with beautiful beaches and easy access to Aventura Mall. Value-conscious buyers choose Hallandale Beach for its lower price point compared to neighboring Sunny Isles and Bal Harbour while enjoying the same tropical waterfront living.',
    seoTitle: 'Hallandale Beach Homes for Sale | Virtus Realty Group',
    apiCity: 'Hallandale Beach',
    apiCounty: null,
    isCounty: false,
  },
  'fort-lauderdale': {
    name: 'Fort Lauderdale',
    county: 'Broward',
    countySlug: 'broward-county',
    emoji: '⛵',
    vibe: '⚓ Venice of America',
    desc: 'Fort Lauderdale is the "Venice of America" with over 300 miles of navigable waterways, making it a paradise for boaters and waterfront home buyers with median prices around $500K. The city\'s real estate market spans luxury Las Olas Isles estates, beachfront condos on Fort Lauderdale Beach, and charming single-family homes in Victoria Park, Wilton Manors, and Flagler Village. With a booming downtown, world-class yachting culture, Fort Lauderdale-Hollywood International Airport, and year-round sunshine, Fort Lauderdale remains one of Broward County\'s most sought-after real estate markets.',
    seoTitle: 'Fort Lauderdale Homes for Sale | Virtus Realty Group',
    apiCity: 'Fort Lauderdale',
    apiCounty: null,
    isCounty: false,
  },
  'pembroke-pines': {
    name: 'Pembroke Pines',
    county: 'Broward',
    countySlug: 'broward-county',
    emoji: '🏫',
    vibe: '🏡 Family Community',
    desc: 'Pembroke Pines is one of Broward County\'s most popular family communities, offering spacious single-family homes and townhomes with median prices around $480K in well-maintained planned developments. The city boasts top-rated A-graded public schools, including several charter schools consistently ranked among Florida\'s best, plus excellent parks, recreation centers, and the Pembroke Lakes Mall. Buyers seeking a safe, suburban lifestyle with easy commuter access to Miami, Fort Lauderdale, and the Sawgrass Expressway find exceptional value in Pembroke Pines.',
    seoTitle: 'Pembroke Pines Homes for Sale | Virtus Realty Group',
    apiCity: 'Pembroke Pines',
    apiCounty: null,
    isCounty: false,
  },
  'weston': {
    name: 'Weston',
    county: 'Broward',
    countySlug: 'broward-county',
    emoji: '🌳',
    vibe: '🌿 Planned Luxury',
    desc: 'Weston is a master-planned community in western Broward County known for its luxury gated neighborhoods, top-rated A+ schools, and median home prices around $600K. Popular communities like Weston Hills Country Club, The Ridges, Savanna, and Bonaventure feature spacious pool homes with lush landscaping and resort-style amenities. Families and professionals choose Weston for its exceptionally low crime rate, beautifully maintained common areas, and a strong sense of community — all while being just 30 minutes from Fort Lauderdale\'s beaches.',
    seoTitle: 'Weston FL Homes for Sale | Virtus Realty Group',
    apiCity: 'Weston',
    apiCounty: null,
    isCounty: false,
  },
  'coral-springs': {
    name: 'Coral Springs',
    county: 'Broward',
    countySlug: 'broward-county',
    emoji: '🌸',
    vibe: '🌺 Vibrant Community',
    desc: 'Coral Springs is a vibrant, award-winning city in northwest Broward County offering homes for sale with median prices around $500K across diverse neighborhoods ranging from starter homes to luxury estates. The city is renowned for its A-rated schools, beautifully maintained parks, and strong community programming that has earned it multiple "All-America City" awards. Buyers love Coral Springs for its family-first culture, proximity to the Sawgrass Mills outlet mall, and easy access to both Parkland\'s exclusivity and Fort Lauderdale\'s urban energy.',
    seoTitle: 'Coral Springs Homes for Sale | Virtus Realty Group',
    apiCity: 'Coral Springs',
    apiCounty: null,
    isCounty: false,
  },
  'parkland': {
    name: 'Parkland',
    county: 'Broward',
    countySlug: 'broward-county',
    emoji: '🦋',
    vibe: '✨ Exclusive & Peaceful',
    desc: 'Parkland is one of Broward County\'s most exclusive and sought-after communities, featuring luxury single-family estates with median prices around $850K on spacious lots surrounded by nature preserves. The city is home to top-rated Marjory Stoneman Douglas High School and highly regarded elementary and middle schools that consistently rank among Florida\'s best. With its equestrian trails, serene natural beauty, low density, and gated communities like Heron Bay and Parkland Golf & Country Club, Parkland attracts affluent families seeking privacy, safety, and an upscale suburban lifestyle.',
    seoTitle: 'Parkland Homes for Sale | Virtus Realty Group',
    apiCity: 'Parkland',
    apiCounty: null,
    isCounty: false,
  },
  'broward-county': {
    name: 'Broward County',
    county: 'Broward',
    countySlug: 'broward-county',
    emoji: '🌊',
    vibe: '🏖️ Heart of South Florida',
    desc: 'Broward County is the heart of South Florida real estate, offering homes for sale across 31 municipalities from pristine Fort Lauderdale beach communities to thriving western suburbs like Weston and Parkland. With a population of nearly 2 million, Broward provides incredible diversity in lifestyle and price points — from oceanfront condos in the $200Ks to multimillion-dollar waterfront estates on the Intracoastal. Year-round beach access, no state income tax, a strong rental market, and proximity to both Miami and Palm Beach make Broward County one of Florida\'s most desirable real estate markets for buyers, investors, and families alike.',
    seoTitle: 'Broward County Homes for Sale | Virtus Realty Group',
    apiCity: null,
    apiCounty: 'Broward',
    isCounty: true,
  },

  // Palm Beach Cities
  'boca-raton': {
    name: 'Boca Raton',
    county: 'Palm Beach',
    countySlug: 'palm-beach-county',
    emoji: '💎',
    vibe: '💎 Affluent & Polished',
    desc: 'Boca Raton is one of South Florida\'s most affluent and polished communities, featuring homes for sale from luxury waterfront estates in Royal Palm Yacht & Country Club to modern condos near Mizner Park, with median prices around $600K. The city is renowned for its world-class golf courses, pristine beaches, A-rated schools, and upscale shopping along Town Center at Boca Raton. Buyers choose Boca Raton for its exceptional quality of life, gated communities like The Oaks, Broken Sound, and Boca Bridges, and a vibrant cultural scene anchored by the Boca Raton Museum of Art and FAU.',
    seoTitle: 'Boca Raton Homes for Sale | Virtus Realty Group',
    apiCity: 'Boca Raton',
    apiCounty: null,
    isCounty: false,
  },
  'west-palm-beach': {
    name: 'West Palm Beach',
    county: 'Palm Beach',
    countySlug: 'palm-beach-county',
    emoji: '🎭',
    vibe: '🎨 Arts & Culture',
    desc: 'West Palm Beach is Palm Beach County\'s rapidly growing urban core, offering homes for sale from historic Flamingo Park bungalows to modern downtown condos with median prices around $450K. The city\'s thriving arts and culture scene features the Norton Museum of Art, Kravis Center, and the walkable Clematis Street waterfront dining district. With major employers relocating to the area, a booming downtown real estate market, and stunning Intracoastal views, West Palm Beach has become one of South Florida\'s hottest markets for young professionals and investors alike.',
    seoTitle: 'West Palm Beach Homes for Sale | Virtus Realty Group',
    apiCity: 'West Palm Beach',
    apiCounty: null,
    isCounty: false,
  },
  'delray-beach': {
    name: 'Delray Beach',
    county: 'Palm Beach',
    countySlug: 'palm-beach-county',
    emoji: '☀️',
    vibe: '☀️ Chic & Walkable',
    desc: 'Delray Beach is South Florida\'s most walkable beach town, anchored by the vibrant Atlantic Avenue strip with its chic boutiques, award-winning restaurants, and lively gallery scene — homes for sale have median prices around $480K. Named one of America\'s "Most Fun Small Towns," Delray Beach offers a unique blend of sophisticated coastal living with a laid-back beach vibe and a thriving year-round events calendar. Buyers love the charming mix of historic cottages, modern townhomes, and oceanfront condos, all within biking distance of one of Palm Beach County\'s best beaches.',
    seoTitle: 'Delray Beach Homes for Sale | Virtus Realty Group',
    apiCity: 'Delray Beach',
    apiCounty: null,
    isCounty: false,
  },
  'boynton-beach': {
    name: 'Boynton Beach',
    county: 'Palm Beach',
    countySlug: 'palm-beach-county',
    emoji: '🐬',
    vibe: '🌊 Waterfront Value',
    desc: 'Boynton Beach offers some of Palm Beach County\'s best value in waterfront living, with median home prices around $380K and direct access to the Intracoastal Waterway and the Atlantic Ocean via the Boynton Inlet. The city features a welcoming mix of single-family homes, active adult communities like Valencia and Canyon Lakes, and newer townhome developments with modern amenities. Families and retirees choose Boynton Beach for its marina access, beautiful Oceanfront Park, affordable price point compared to neighboring Delray Beach, and a downtown that is undergoing exciting revitalization.',
    seoTitle: 'Boynton Beach Homes for Sale | Virtus Realty Group',
    apiCity: 'Boynton Beach',
    apiCounty: null,
    isCounty: false,
  },
  'palm-beach-county': {
    name: 'Palm Beach County',
    county: 'Palm Beach',
    countySlug: 'palm-beach-county',
    emoji: '🌴',
    vibe: '🌴 Where Luxury Meets Lifestyle',
    desc: 'Palm Beach County is where luxury meets lifestyle across South Florida\'s largest county, offering homes for sale from the historic grandeur of Palm Beach Island estates to the vibrant energy of West Palm Beach and the upscale charm of Boca Raton. With 47 miles of Atlantic coastline, world-class golf at over 160 courses, and a growing tech and finance sector attracting major corporations, the county serves both ultra-luxury and value-conscious buyers. Home to 1.5 million residents, Palm Beach County delivers no state income tax, top-rated schools, and a real estate market that consistently ranks among Florida\'s strongest for long-term appreciation and investment returns.',
    seoTitle: 'Palm Beach County Homes for Sale | Virtus Realty Group',
    apiCity: null,
    apiCounty: 'Palm Beach',
    isCounty: true,
  },

  // St. Lucie Cities
  'port-st-lucie': {
    name: 'Port St. Lucie',
    county: 'St. Lucie',
    countySlug: 'st-lucie-county',
    emoji: '🚀',
    vibe: '🚀 Booming Growth',
    desc: 'Port St. Lucie is one of Florida\'s fastest-growing cities and a top destination for buyers seeking affordable new construction homes, with median prices around $380K — nearly half the cost of comparable properties in Palm Beach or Broward counties. The city offers an exceptional quality of life with the Tradition development, Clover Park (spring training home of the New York Mets), and the beautiful St. Lucie River. First-time home buyers, young families, and retirees are flocking to Port St. Lucie for its brand-new master-planned communities, low crime rates, and a cost of living that makes South Florida homeownership accessible.',
    seoTitle: 'Port St. Lucie Homes for Sale | Virtus Realty Group',
    apiCity: 'Port St. Lucie',
    apiCounty: null,
    isCounty: false,
  },
  'stuart': {
    name: 'Stuart',
    county: 'St. Lucie',
    countySlug: 'st-lucie-county',
    emoji: '⚓',
    vibe: '🎣 Sailfish Capital',
    desc: 'Stuart is the "Sailfish Capital of the World" and one of the Treasure Coast\'s most charming waterfront towns, offering homes for sale with median prices around $450K and unparalleled access to the St. Lucie River and Indian River Lagoon. The historic downtown features locally-owned boutiques, waterfront restaurants, and a thriving arts community centered around the Lyric Theatre. Boating enthusiasts and nature lovers choose Stuart for its world-class deep-sea fishing, proximity to pristine Hutchinson Island beaches, and a small-town coastal lifestyle that feels a world away from the hustle of South Florida\'s larger metros.',
    seoTitle: 'Stuart FL Homes for Sale | Virtus Realty Group',
    apiCity: 'Stuart',
    apiCounty: null,
    isCounty: false,
  },
  'palm-city': {
    name: 'Palm City',
    county: 'St. Lucie',
    countySlug: 'st-lucie-county',
    emoji: '🎣',
    vibe: '🌿 Quiet Waterway Enclave',
    desc: 'Palm City is a quiet, upscale enclave on the Treasure Coast offering spacious homes for sale on large lots with median prices around $520K, many featuring direct waterway access to the St. Lucie River. The community is known for its excellent golf communities including The Hammocks and Osprey Cove, top-rated Martin County schools, and a peaceful semi-rural atmosphere with lush tropical landscaping. Buyers seeking a serene Florida lifestyle with boating, fishing, and nature at their doorstep — without the premium pricing of Palm Beach County — find Palm City to be an ideal hidden gem.',
    seoTitle: 'Palm City FL Homes for Sale | Virtus Realty Group',
    apiCity: 'Palm City',
    apiCounty: null,
    isCounty: false,
  },
  'st-lucie-county': {
    name: 'St. Lucie County',
    county: 'St. Lucie',
    countySlug: 'st-lucie-county',
    emoji: '🌅',
    vibe: "🌅 South Florida's Best-Kept Secret",
    desc: "St. Lucie County is South Florida's best-kept secret for homebuyers, offering the same tropical beauty and year-round sunshine at a fraction of the price — with median home prices around $370K compared to $550K+ in Broward and Palm Beach. The county is experiencing a massive new construction boom with builders like Lennar, GL Homes, and Kolter Homes delivering modern master-planned communities, while established areas like Stuart and Palm City offer waterfront charm and natural beauty along the Indian River Lagoon. With rapidly improving infrastructure, new shopping and dining destinations, and a quality of life that rivals anywhere in Florida, St. Lucie County is where smart buyers are investing today for tomorrow's appreciation.",
    seoTitle: 'St. Lucie County Homes for Sale | Virtus Realty Group',
    apiCity: null,
    apiCounty: 'St. Lucie',
    isCounty: true,
  },
}

/* ═══════════════════════════════════════════════════════════
   CONSTANTS (shared with Listings)
════════════════════════════════════════════════════════════ */

const PRICE_MIN_ABS = 0
const PRICE_MAX_ABS = 10_000_000

const PRICE_PRESETS = [
  { label: 'Any Price',   min: null, max: null },
  { label: 'Under $200K', min: null, max: 200_000 },
  { label: '$200K–$500K', min: 200_000, max: 500_000 },
  { label: '$500K–$1M',   min: 500_000, max: 1_000_000 },
  { label: '$1M–$2M',     min: 1_000_000, max: 2_000_000 },
  { label: '$2M–$5M',     min: 2_000_000, max: 5_000_000 },
  { label: '$5M+',        min: 5_000_000, max: null },
]

const BED_OPTIONS  = [0,1,2,3,4,5]
const BATH_OPTIONS = [0,1,2,3,4]

const PROPERTY_TYPES = [
  { label: 'All Types',           value: 'all' },
  { label: 'Residential',         value: 'Residential' },
  { label: 'Commercial Sale',     value: 'Commercial Sale' },
  { label: 'Land & Docks',        value: 'Land' },
  { label: 'Residential Lease',   value: 'Residential Lease' },
  { label: 'Residential Income',  value: 'Residential Income' },
]

const SORT_OPTIONS = [
  { label: 'Newest',          value: 'newest' },
  { label: 'Price: High→Low', value: 'price_desc' },
  { label: 'Price: Low→High', value: 'price_asc' },
  { label: 'Most Beds',       value: 'beds' },
  { label: 'Most SqFt',       value: 'sqft' },
  { label: 'Most Photos',     value: 'photos' },
]

const LIMIT = 24

const DEFAULT_FILTERS = {
  listingType: 'buy',
  minPrice: null,
  maxPrice: null,
  beds: 0,
  baths: 0,
  propType: 'all',
  waterfront: null,
  pool: null,
}

/* ═══════════════════════════════════════════════════════════
   HELPERS
════════════════════════════════════════════════════════════ */

function fmtPriceShort(n) {
  if (n == null) return ''
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(n % 1_000_000 === 0 ? 0 : 1)}M`
  if (n >= 1_000)     return `$${(n / 1_000).toFixed(0)}K`
  return `$${n}`
}

function clamp(v, lo, hi) { return Math.min(Math.max(v, lo), hi) }

/* ═══════════════════════════════════════════════════════════
   ANIMATED COUNTER
════════════════════════════════════════════════════════════ */

function AnimatedCount({ target, duration = 900 }) {
  const [display, setDisplay] = useState(0)
  const frameRef = useRef(null)

  useEffect(() => {
    if (!target) { setDisplay(0); return }
    const start = Date.now()
    const from = display
    const tick = () => {
      const elapsed = Date.now() - start
      const progress = Math.min(elapsed / duration, 1)
      const ease = 1 - Math.pow(1 - progress, 3)
      setDisplay(Math.round(from + (target - from) * ease))
      if (progress < 1) frameRef.current = requestAnimationFrame(tick)
    }
    frameRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frameRef.current)
  }, [target]) // eslint-disable-line

  return <>{display.toLocaleString()}</>
}

/* ═══════════════════════════════════════════════════════════
   PRICE SLIDER
════════════════════════════════════════════════════════════ */

function PriceSlider({ minVal, maxVal, onChange }) {
  const trackRef = useRef(null)
  const dragging = useRef(null)

  const toPercent = (v) => ((v - PRICE_MIN_ABS) / (PRICE_MAX_ABS - PRICE_MIN_ABS)) * 100

  const getValFromMouse = useCallback((clientX) => {
    const rect = trackRef.current.getBoundingClientRect()
    const ratio = clamp((clientX - rect.left) / rect.width, 0, 1)
    const raw = ratio * (PRICE_MAX_ABS - PRICE_MIN_ABS) + PRICE_MIN_ABS
    return Math.round(raw / 10_000) * 10_000
  }, [])

  const startDrag = useCallback((handle, e) => {
    e.preventDefault()
    dragging.current = handle
    const up = () => {
      dragging.current = null
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseup', up)
      window.removeEventListener('touchmove', move)
      window.removeEventListener('touchend', up)
    }
    const move = (ev) => {
      const clientX = ev.touches ? ev.touches[0].clientX : ev.clientX
      const v = getValFromMouse(clientX)
      if (dragging.current === 'min') {
        onChange(clamp(v, PRICE_MIN_ABS, maxVal - 10_000), maxVal)
      } else {
        onChange(minVal, clamp(v, minVal + 10_000, PRICE_MAX_ABS))
      }
    }
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseup', up)
    window.addEventListener('touchmove', move, { passive: false })
    window.addEventListener('touchend', up)
  }, [minVal, maxVal, onChange, getValFromMouse])

  const minPct = toPercent(minVal)
  const maxPct = toPercent(maxVal)

  return (
    <div className="px-2 pt-6 pb-2">
      <div className="price-track" ref={trackRef}>
        <div className="price-track-fill" style={{ left: `${minPct}%`, right: `${100 - maxPct}%` }} />
        <div className="price-handle" style={{ left: `${minPct}%` }} onMouseDown={(e) => startDrag('min', e)} onTouchStart={(e) => startDrag('min', e)}>
          <div className="price-label">{fmtPriceShort(minVal) || 'Any'}</div>
        </div>
        <div className="price-handle" style={{ left: `${maxPct}%` }} onMouseDown={(e) => startDrag('max', e)} onTouchStart={(e) => startDrag('max', e)}>
          <div className="price-label">{maxVal >= PRICE_MAX_ABS ? '$10M+' : fmtPriceShort(maxVal)}</div>
        </div>
      </div>
      <div className="flex justify-between mt-4 text-xs text-gray-500 font-medium">
        <span>{minVal > PRICE_MIN_ABS ? fmtPriceShort(minVal) : 'Any min'}</span>
        <span>{maxVal < PRICE_MAX_ABS ? fmtPriceShort(maxVal) : 'Any max'}</span>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════
   SKELETON LOADER
════════════════════════════════════════════════════════════ */

function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden">
      <div className="skeleton h-52 w-full" />
      <div className="p-5 space-y-3">
        <div className="skeleton h-5 rounded-lg w-3/4" />
        <div className="skeleton h-3.5 rounded w-1/2" />
        <div className="flex gap-2 mt-3">
          <div className="skeleton h-6 rounded-full w-16" />
          <div className="skeleton h-6 rounded-full w-16" />
          <div className="skeleton h-6 rounded-full w-20" />
        </div>
        <div className="skeleton h-9 rounded-lg mt-4 w-full" />
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════
   PAGINATION
════════════════════════════════════════════════════════════ */

function Pagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null
  const pages = []
  const delta = 2
  const lo = Math.max(1, page - delta)
  const hi = Math.min(totalPages, page + delta)
  if (lo > 1) { pages.push(1); if (lo > 2) pages.push('...') }
  for (let i = lo; i <= hi; i++) pages.push(i)
  if (hi < totalPages) { if (hi < totalPages - 1) pages.push('...'); pages.push(totalPages) }
  const btnBase = 'w-9 h-9 rounded-lg flex items-center justify-center text-sm font-medium transition-all duration-150'
  return (
    <div className="flex items-center justify-center gap-1 mt-12 flex-wrap">
      <button onClick={() => onChange(page - 1)} disabled={page === 1} className={`${btnBase} ${page === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-navy-50 hover:text-navy-700'}`}>
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
      </button>
      {pages.map((p, i) => p === '...'
        ? <span key={`e-${i}`} className="w-9 h-9 flex items-center justify-center text-gray-400">…</span>
        : <button key={p} onClick={() => onChange(p)} className={`${btnBase} ${p === page ? 'bg-navy-600 text-white shadow-sm' : 'text-gray-600 hover:bg-navy-50 hover:text-navy-700'}`}>{p}</button>
      )}
      <button onClick={() => onChange(page + 1)} disabled={page === totalPages} className={`${btnBase} ${page === totalPages ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-navy-50 hover:text-navy-700'}`}>
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
      </button>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════
   FILTER TAG
════════════════════════════════════════════════════════════ */

function FilterTag({ label, onRemove }) {
  const [removing, setRemoving] = useState(false)
  const remove = () => { setRemoving(true); setTimeout(onRemove, 160) }
  return (
    <span className={`active-tag inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-navy-100 text-navy-800 text-xs font-semibold border border-navy-200 ${removing ? 'active-tag-exit' : ''}`}>
      {label}
      <button onClick={remove} className="ml-0.5 text-navy-500 hover:text-navy-800 transition-colors leading-none">
        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
      </button>
    </span>
  )
}

/* ═══════════════════════════════════════════════════════════
   NEIGHBORHOOD LISTINGS PAGE
════════════════════════════════════════════════════════════ */

export default function NeighborhoodListings() {
  const { slug } = useParams()
  const navigate = useNavigate()

  const neighborhood = NEIGHBORHOODS[slug]

  const [filters, setFilters] = useState(DEFAULT_FILTERS)
  const [sort, setSort] = useState('newest')
  const [page, setPage] = useState(1)
  const [view, setView] = useState('grid')
  const [filterOpen, setFilterOpen] = useState(false)

  // Reset page on filter/sort change
  const prevFilters = useRef(filters)
  useEffect(() => {
    if (prevFilters.current !== filters) { setPage(1); prevFilters.current = filters }
  }, [filters])

  // SEO meta tags
  useEffect(() => {
    if (!neighborhood) return
    const title = neighborhood.seoTitle
      ? neighborhood.seoTitle
      : neighborhood.isCounty
        ? `Homes for Sale in ${neighborhood.name}, FL | Virtus Realty Group`
        : `Homes for Sale in ${neighborhood.name}, Florida | Virtus Realty Group`
    document.title = title

    // Update meta description
    let metaDesc = document.querySelector('meta[name="description"]')
    if (!metaDesc) {
      metaDesc = document.createElement('meta')
      metaDesc.name = 'description'
      document.head.appendChild(metaDesc)
    }
    metaDesc.content = `Browse active listings in ${neighborhood.name}, Florida. Find your dream home with Virtus Realty Group — South Florida's premier real estate team.`

    return () => {
      document.title = 'Virtus Realty Group | South Florida Real Estate'
    }
  }, [neighborhood, slug])

  const { listings, loading, error, totalCount } = useSparkListings({
    limit: LIMIT,
    page,
    city: neighborhood?.apiCity ?? null,
    county: neighborhood?.apiCounty ?? null,
    minPrice: filters.minPrice,
    maxPrice: filters.maxPrice,
    beds: filters.beds || null,
    baths: filters.baths || null,
    propType: filters.propType !== 'all' ? filters.propType : null,
    waterfront: filters.waterfront,
    pool: filters.pool,
    listingType: filters.listingType !== 'all' ? filters.listingType : null,
    sort,
  })

  const totalPages = Math.ceil(totalCount / LIMIT)

  const set = (key) => (val) => setFilters(f => ({ ...f, [key]: val }))

  const activeTags = useMemo(() => {
    const tags = []
    if (filters.minPrice && filters.maxPrice) tags.push({ key: 'price', label: `${fmtPriceShort(filters.minPrice)}–${fmtPriceShort(filters.maxPrice)}`, clear: () => setFilters(f => ({ ...f, minPrice: null, maxPrice: null })) })
    else if (filters.minPrice) tags.push({ key: 'minprice', label: `From ${fmtPriceShort(filters.minPrice)}`, clear: () => setFilters(f => ({ ...f, minPrice: null })) })
    else if (filters.maxPrice) tags.push({ key: 'maxprice', label: `Up to ${fmtPriceShort(filters.maxPrice)}`, clear: () => setFilters(f => ({ ...f, maxPrice: null })) })
    if (filters.beds)       tags.push({ key: 'beds',   label: `${filters.beds}+ beds`,  clear: () => setFilters(f => ({ ...f, beds: 0 })) })
    if (filters.baths)      tags.push({ key: 'baths',  label: `${filters.baths}+ baths`, clear: () => setFilters(f => ({ ...f, baths: 0 })) })
    if (filters.propType && filters.propType !== 'all') tags.push({ key: 'type', label: filters.propType, clear: () => setFilters(f => ({ ...f, propType: 'all' })) })
    if (filters.waterfront) tags.push({ key: 'wf',    label: `Waterfront: ${filters.waterfront}`, clear: () => setFilters(f => ({ ...f, waterfront: null })) })
    if (filters.pool)       tags.push({ key: 'pool',  label: `Pool: ${filters.pool}`,   clear: () => setFilters(f => ({ ...f, pool: null })) })
    return tags
  }, [filters])

  const clearAll = () => { setFilters(DEFAULT_FILTERS); setPage(1) }

  // 404 state
  if (!neighborhood) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md px-4">
          <div className="text-6xl mb-6">🏠</div>
          <h1 className="font-display text-3xl font-bold text-gray-900 mb-4">Area Not Found</h1>
          <p className="text-gray-500 mb-8">We couldn't find listings for "{slug}". Browse all available areas below.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/areas" className="px-6 py-3 bg-navy-700 text-white font-semibold rounded-xl hover:bg-navy-800 transition-colors">
              Browse All Areas
            </Link>
            <Link to="/listings" className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:border-navy-400 transition-colors">
              All Listings
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const priceSliderMin = filters.minPrice ?? PRICE_MIN_ABS
  const priceSliderMax = filters.maxPrice ?? PRICE_MAX_ABS

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ══ HERO ══ */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900" />

        {/* Giant emoji background */}
        <div className="absolute inset-0 flex items-center justify-end pr-16 pointer-events-none select-none overflow-hidden">
          <span className="text-[18rem] opacity-[0.07] leading-none">{neighborhood.emoji}</span>
        </div>

        {/* Gold glow orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-gold-300/15 rounded-full blur-3xl pointer-events-none" />

        {/* Wave bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-16">
          <svg viewBox="0 0 1200 80" preserveAspectRatio="none" className="w-full h-full">
            <path d="M0,40 C400,80 800,0 1200,40 L1200,80 L0,80 Z" fill="#f9fafb" />
          </svg>
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm mb-8 flex-wrap">
            <Link to="/" className="text-gold-400 hover:text-gold-300 font-medium transition-colors">Home</Link>
            <span className="text-white/30">›</span>
            <Link to="/areas" className="text-gold-400 hover:text-gold-300 font-medium transition-colors">Areas</Link>
            <span className="text-white/30">›</span>
            {!neighborhood.isCounty && (
              <>
                <Link to={`/homes-for-sale/${neighborhood.countySlug}`} className="text-gold-400 hover:text-gold-300 font-medium transition-colors">
                  {neighborhood.county} County
                </Link>
                <span className="text-white/30">›</span>
              </>
            )}
            <span className="text-white/70">{neighborhood.name}</span>
          </nav>

          {/* County badge */}
          {!neighborhood.isCounty && (
            <div className="mb-4">
              <Link
                to={`/homes-for-sale/${neighborhood.countySlug}`}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200"
                style={{
                  background: 'rgba(212,175,55,0.15)',
                  border: '1px solid rgba(212,175,55,0.4)',
                  color: 'rgba(212,175,55,0.9)',
                }}
              >
                <span>{neighborhood.county} County</span>
                <span className="opacity-60">→</span>
              </Link>
            </div>
          )}

          {/* Vibe tag */}
          <div className="mb-4">
            <span className="text-white/60 text-sm font-medium">{neighborhood.vibe}</span>
          </div>

          {/* H1 */}
          <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
            Homes for Sale in
            <span className="block text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, #D4AF37, #F0C040)' }}>
              {neighborhood.name}
            </span>
            <span className="block text-2xl md:text-3xl font-normal text-white/70 mt-1">Florida</span>
          </h1>

          <p className="text-white/75 text-lg max-w-2xl mb-8 leading-relaxed">
            {neighborhood.desc}
          </p>

          {/* Live count */}
          <div className="flex items-center gap-6 flex-wrap">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-white font-semibold text-xl">
                {loading ? (
                  <span className="text-white/50">Loading…</span>
                ) : (
                  <>
                    <span className="font-bold text-2xl" style={{ color: '#F0C040' }}>
                      <AnimatedCount target={totalCount} />
                    </span>
                    <span className="text-white/80 ml-2 text-lg">homes available</span>
                  </>
                )}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FILTER BAR ══ */}
      <div className="glass-bar sticky top-16 md:top-20 z-40 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 flex-wrap">

            {/* Mobile filter toggle */}
            <button
              onClick={() => setFilterOpen(o => !o)}
              className="md:hidden flex items-center gap-2 px-4 py-2 bg-navy-600 text-white rounded-xl text-sm font-semibold shadow-sm"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              Filters {activeTags.length > 0 && `(${activeTags.length})`}
            </button>

            {/* Desktop quick filters */}
            <div className="hidden md:flex items-center gap-2 flex-1 flex-wrap">
              <select
                value={filters.propType || 'all'}
                onChange={(e) => setFilters(f => ({ ...f, propType: e.target.value }))}
                className="appearance-none pl-3 pr-7 py-1.5 border border-gray-200 rounded-lg text-xs text-gray-700 bg-white hover:border-navy-400 focus:border-navy-500 outline-none cursor-pointer"
              >
                {PROPERTY_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
              </select>

              {activeTags.length > 0 && (
                <button onClick={clearAll} className="text-xs text-gold-600 hover:text-gold-800 font-semibold flex items-center gap-1 transition-colors">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                  Clear filters
                </button>
              )}
            </div>

            {/* Right: count + sort + view */}
            <div className="flex items-center gap-2 ml-auto">
              <span className="hidden sm:block text-xs text-gray-500 whitespace-nowrap">
                {!loading && (
                  <><span className="font-bold text-gray-800"><AnimatedCount target={listings.length} /></span>{' '}of{' '}<span className="font-bold text-gray-800"><AnimatedCount target={totalCount} /></span></>
                )}
              </span>

              <div className="relative">
                <select
                  value={sort}
                  onChange={(e) => { setSort(e.target.value); setPage(1) }}
                  className="appearance-none pl-3 pr-7 py-2 border border-gray-200 rounded-xl text-xs text-gray-700 bg-white hover:border-navy-400 focus:border-navy-500 outline-none cursor-pointer shadow-sm"
                >
                  {SORT_OPTIONS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                </select>
                <svg className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
              </div>

              {/* View toggle */}
              <div className="flex rounded-xl border border-gray-200 overflow-hidden bg-white shadow-sm">
                {[
                  { id: 'grid', icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg> },
                  { id: 'list', icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg> },
                ].map(({ id, icon }) => (
                  <button key={id} onClick={() => setView(id)} className={`flex items-center gap-1 px-3 py-2 text-sm transition-all duration-150 ${view === id ? 'bg-navy-600 text-white' : 'text-gray-500 hover:bg-gray-50'}`}>
                    {icon}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Active filter tags */}
          {activeTags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-2.5 pt-2.5 border-t border-gray-100">
              {/* Always-present location tag */}
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold border" style={{ background: 'rgba(212,175,55,0.12)', borderColor: 'rgba(212,175,55,0.4)', color: '#92700e' }}>
                📍 {neighborhood.name}
              </span>
              {activeTags.map(tag => <FilterTag key={tag.key} label={tag.label} onRemove={tag.clear} />)}
            </div>
          )}
        </div>
      </div>

      {/* ══ CONTENT ══ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">

          {/* ── SIDEBAR ── */}
          <aside className="hidden lg:block w-72 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-md sticky top-44 max-h-[calc(100vh-12rem)] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="font-display font-bold text-lg text-gray-900">Filters</h2>
                  {activeTags.length > 0 && (
                    <button onClick={clearAll} className="text-xs text-gold-600 hover:text-gold-800 font-semibold transition-colors">Clear all</button>
                  )}
                </div>

                {/* Fixed location badge */}
                <div className="mb-5 p-3 rounded-xl flex items-center gap-3" style={{ background: 'rgba(212,175,55,0.08)', border: '1px solid rgba(212,175,55,0.25)' }}>
                  <span className="text-2xl">{neighborhood.emoji}</span>
                  <div>
                    <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">Location</div>
                    <div className="font-semibold text-gray-900 text-sm">{neighborhood.name}</div>
                    <div className="text-xs text-gray-400">{neighborhood.county} County</div>
                  </div>
                </div>

                {/* Buy / Rent */}
                <div className="mb-5">
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">I'm looking to</label>
                  <div className="flex gap-2">
                    {[{ value: 'buy', label: '🏠 Buy' }, { value: 'rent', label: '🔑 Rent' }, { value: 'all', label: '⊙ All' }].map(({ value, label }) => {
                      const active = (filters.listingType || 'buy') === value
                      return (
                        <button key={value} onClick={() => set('listingType')(value)}
                          className={`flex-1 py-2 px-1 rounded-xl text-xs font-bold border-2 transition-all duration-150 ${active ? 'bg-navy-700 border-navy-700 text-white shadow-md' : 'bg-white border-gray-200 text-gray-600 hover:border-navy-400'}`}>
                          {label}
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Price Range */}
                <div className="mb-5">
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Price Range</label>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {PRICE_PRESETS.map(preset => {
                      const active = filters.minPrice === preset.min && filters.maxPrice === preset.max
                      return (
                        <button key={preset.label} onClick={() => setFilters(f => ({ ...f, minPrice: preset.min, maxPrice: preset.max }))}
                          className={`px-2.5 py-1 rounded-full text-xs font-medium border transition-all duration-150 ${active ? 'bg-navy-600 border-navy-600 text-white' : 'bg-white border-gray-200 text-gray-600 hover:border-navy-400 hover:text-navy-700'}`}>
                          {preset.label}
                        </button>
                      )
                    })}
                  </div>
                  <PriceSlider
                    minVal={priceSliderMin}
                    maxVal={priceSliderMax}
                    onChange={(min, max) => setFilters(f => ({ ...f, minPrice: min > PRICE_MIN_ABS ? min : null, maxPrice: max < PRICE_MAX_ABS ? max : null }))}
                  />
                </div>

                {/* Beds */}
                <div className="mb-5">
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Bedrooms</label>
                  <div className="flex gap-1.5">
                    {BED_OPTIONS.map(n => {
                      const active = filters.beds === n
                      return (
                        <button key={n} onClick={() => set('beds')(active ? 0 : n)}
                          className={`flex-1 py-1.5 rounded-full text-sm font-medium border transition-all duration-150 ${active ? 'bg-navy-600 border-navy-600 text-white' : 'bg-white border-gray-200 text-gray-600 hover:border-navy-400 hover:text-navy-700'}`}>
                          {n === 0 ? 'Any' : `${n}+`}
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Baths */}
                <div className="mb-5">
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Bathrooms</label>
                  <div className="flex gap-1.5">
                    {BATH_OPTIONS.map(n => {
                      const active = filters.baths === n
                      return (
                        <button key={n} onClick={() => set('baths')(active ? 0 : n)}
                          className={`flex-1 py-1.5 rounded-full text-sm font-medium border transition-all duration-150 ${active ? 'bg-navy-600 border-navy-600 text-white' : 'bg-white border-gray-200 text-gray-600 hover:border-navy-400 hover:text-navy-700'}`}>
                          {n === 0 ? 'Any' : `${n}+`}
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Property Type */}
                <div className="mb-5">
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Property Type</label>
                  <div className="relative">
                    <select
                      value={filters.propType || 'all'}
                      onChange={(e) => set('propType')(e.target.value)}
                      className="w-full appearance-none pl-3 pr-8 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 bg-white hover:border-navy-400 focus:border-navy-500 focus:ring-1 focus:ring-navy-500 outline-none cursor-pointer"
                    >
                      {PROPERTY_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                    </select>
                    <svg className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                  </div>
                </div>

                {/* Waterfront / Pool */}
                <div className="space-y-3">
                  {[{ key: 'waterfront', label: 'Waterfront' }, { key: 'pool', label: 'Pool' }].map(({ key, label }) => (
                    <div key={key} className="flex items-center justify-between">
                      <span className="text-sm text-gray-700 font-medium">{label}</span>
                      <div className="flex rounded-lg overflow-hidden border border-gray-200">
                        {[null, 'yes', 'no'].map((opt) => (
                          <button
                            key={String(opt)}
                            onClick={() => set(key)(opt)}
                            className={`px-3 py-1.5 text-xs font-medium transition-all duration-150 ${filters[key] === opt ? 'bg-navy-600 text-white' : 'bg-white text-gray-600 hover:bg-navy-50'}`}
                          >
                            {opt === null ? 'Any' : opt === 'yes' ? 'Yes' : 'No'}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Nearby areas */}
                {!neighborhood.isCounty && (
                  <div className="mt-6 pt-5 border-t border-gray-100">
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Browse {neighborhood.county} County</label>
                    <div className="space-y-1">
                      {Object.entries(NEIGHBORHOODS)
                        .filter(([s, n]) => n.county === neighborhood.county && s !== slug)
                        .slice(0, 6)
                        .map(([s, n]) => (
                          <Link key={s} to={`/homes-for-sale/${s}`}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm text-gray-600 hover:bg-navy-50 hover:text-navy-700 transition-colors">
                            <span>{n.emoji}</span>
                            <span>{n.name}</span>
                          </Link>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </aside>

          {/* ── RESULTS ── */}
          <div className="flex-1 min-w-0">

            {/* Mobile filters */}
            {filterOpen && (
              <div className="lg:hidden mb-6 bg-white rounded-2xl shadow-md p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display font-bold text-gray-900">Filters</h3>
                  <button onClick={() => setFilterOpen(false)} className="text-gray-400 hover:text-gray-700">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </div>
                {/* Buy/Rent */}
                <div className="mb-4">
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">I'm looking to</label>
                  <div className="flex gap-2">
                    {[{ value: 'buy', label: '🏠 Buy' }, { value: 'rent', label: '🔑 Rent' }, { value: 'all', label: '⊙ All' }].map(({ value, label }) => {
                      const active = (filters.listingType || 'buy') === value
                      return (
                        <button key={value} onClick={() => set('listingType')(value)}
                          className={`flex-1 py-2 px-1 rounded-xl text-xs font-bold border-2 transition-all ${active ? 'bg-navy-700 border-navy-700 text-white' : 'bg-white border-gray-200 text-gray-600'}`}>
                          {label}
                        </button>
                      )
                    })}
                  </div>
                </div>
                {/* Beds */}
                <div className="mb-4">
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Beds</label>
                  <div className="flex gap-1">
                    {BED_OPTIONS.map(n => {
                      const active = filters.beds === n
                      return <button key={n} onClick={() => set('beds')(active ? 0 : n)} className={`flex-1 py-1.5 rounded-full text-xs font-medium border ${active ? 'bg-navy-600 border-navy-600 text-white' : 'bg-white border-gray-200 text-gray-600'}`}>{n === 0 ? 'Any' : `${n}+`}</button>
                    })}
                  </div>
                </div>
                {/* Baths */}
                <div className="mb-4">
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Baths</label>
                  <div className="flex gap-1">
                    {BATH_OPTIONS.map(n => {
                      const active = filters.baths === n
                      return <button key={n} onClick={() => set('baths')(active ? 0 : n)} className={`flex-1 py-1.5 rounded-full text-xs font-medium border ${active ? 'bg-navy-600 border-navy-600 text-white' : 'bg-white border-gray-200 text-gray-600'}`}>{n === 0 ? 'Any' : `${n}+`}</button>
                    })}
                  </div>
                </div>
                <button onClick={() => setFilterOpen(false)} className="w-full py-2.5 bg-navy-600 text-white font-bold rounded-xl mt-2">Apply Filters</button>
              </div>
            )}

            {/* Page info */}
            {!loading && listings.length > 0 && (
              <div className="flex items-center justify-between mb-6">
                <p className="text-sm text-gray-500">
                  Showing <span className="font-semibold text-gray-900">{listings.length}</span> of{' '}
                  <span className="font-semibold text-gray-900"><AnimatedCount target={totalCount} /></span> homes in {neighborhood.name}
                </p>
                <span className="text-sm text-gray-500">Page {page} of {totalPages || 1}</span>
              </div>
            )}

            {/* Loading */}
            {loading && (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
              </div>
            )}

            {/* Error */}
            {error && !loading && (
              <div className="text-center py-20">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                </div>
                <h3 className="font-display text-xl font-bold text-gray-900 mb-2">Unable to Load Listings</h3>
                <p className="text-gray-500 mb-6 max-w-md mx-auto text-sm">{error}</p>
                <Link to="/contact" className="btn-primary">Contact Us for Available Properties</Link>
              </div>
            )}

            {/* Empty */}
            {!loading && !error && listings.length === 0 && (
              <div className="text-center py-20">
                <div className="text-5xl mb-4">{neighborhood.emoji}</div>
                <h3 className="font-display text-xl font-bold text-gray-900 mb-2">No Listings Match Your Filters</h3>
                <p className="text-gray-500 mb-6 text-sm">Try adjusting your filters, or browse all {neighborhood.name} listings.</p>
                <button onClick={clearAll} className="btn-primary">Clear Filters</button>
              </div>
            )}

            {/* Grid */}
            {!loading && !error && listings.length > 0 && (
              <>
                <div className={view === 'list' ? 'flex flex-col gap-4' : 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6'}>
                  {listings.map((listing, i) => (
                    <PropertyCard
                      key={listing.ListingKey || listing.ListingId || i}
                      listing={listing}
                      index={i}
                      view={view}
                    />
                  ))}
                </div>
                <Pagination page={page} totalPages={totalPages} onChange={(p) => { setPage(p); window.scrollTo({ top: 0, behavior: 'smooth' }) }} />
              </>
            )}
          </div>
        </div>
      </div>

      {/* ══ CTA SECTION ══ */}
      <section className="py-16 bg-gradient-to-r from-navy-700 via-navy-600 to-navy-700 relative overflow-hidden mt-8">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-gold-300 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-4xl mb-4">{neighborhood.emoji}</div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Call {neighborhood.name} Home?
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
            Nicolas has deep knowledge of {neighborhood.name} and can help you find the perfect property. Let's start your journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gold-500 text-white font-bold rounded-xl hover:bg-gold-600 transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 text-lg">
              Contact Nicolas →
            </Link>
            <a href="tel:9546004976" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 border border-white/30 text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-200 text-lg">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              (954) 600-4976
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
