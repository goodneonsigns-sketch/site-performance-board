import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SelectionBar from './components/SelectionBar'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Areas from './pages/Areas'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import Contact from './pages/Contact'
import Listings from './pages/Listings'
import PropertyDetail from './pages/PropertyDetail'
import Compare from './pages/Compare'
import ScheduleShowing from './pages/ScheduleShowing'
import Financing from './pages/Financing'
import NeighborhoodListings from './pages/NeighborhoodListings'
import Sell from './pages/Sell'
import MortgageCalculator from './pages/MortgageCalculator'
import FirstTimeBuyer from './pages/FirstTimeBuyer'
import FhaLoans from './pages/programs/FhaLoans'
import FlHlp from './pages/programs/FlHlp'
import FloridaAssist from './pages/programs/FloridaAssist'
import HometownHeroes from './pages/programs/HometownHeroes'
import VaLoans from './pages/programs/VaLoans'
import UsdaLoans from './pages/programs/UsdaLoans'
import Condos from './pages/Condos'
import Townhomes from './pages/Townhomes'
import Investment from './pages/Investment'
import NewConstruction from './pages/NewConstruction'
import AgentNicolas from './pages/AgentNicolas'
import DominicanRepublic from './pages/DominicanRepublic'
import ZonaColonial from './pages/ZonaColonial'
import InvestorPackages from './pages/InvestorPackages'
import ApapPortfolio from './pages/ApapPortfolio'
import TitleEscrow from './pages/TitleEscrow'
import ResearchGroup from './pages/ResearchGroup'
import ScrollToTop from './components/ScrollToTop'
import { PropertyProvider } from './context/PropertyContext'

function App() {
  const location = useLocation()
  const isResearchPage = location.pathname === '/research'

  return (
    <PropertyProvider>
      <div className="min-h-screen flex flex-col">
        <ScrollToTop />
        {!isResearchPage && <Navbar />}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/areas" element={<Areas />} />
            <Route path="/listings" element={<Listings />} />
            <Route path="/listings/:listingKey" element={<PropertyDetail />} />
            <Route path="/compare" element={<Compare />} />
            <Route path="/schedule-showing" element={<ScheduleShowing />} />
            <Route path="/financing" element={<Financing />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/homes-for-sale/:slug" element={<NeighborhoodListings />} />
            <Route path="/sell" element={<Sell />} />
            <Route path="/mortgage-calculator" element={<MortgageCalculator />} />
            <Route path="/first-time-buyer" element={<FirstTimeBuyer />} />
            <Route path="/programs/fha-loans" element={<FhaLoans />} />
            <Route path="/programs/fl-hlp" element={<FlHlp />} />
            <Route path="/programs/florida-assist" element={<FloridaAssist />} />
            <Route path="/programs/hometown-heroes" element={<HometownHeroes />} />
            <Route path="/programs/va-loans" element={<VaLoans />} />
            <Route path="/programs/usda-loans" element={<UsdaLoans />} />
            <Route path="/condos" element={<Condos />} />
            <Route path="/townhomes" element={<Townhomes />} />
            <Route path="/investment" element={<Investment />} />
            <Route path="/new-construction" element={<NewConstruction />} />
            <Route path="/team/nicolas-gonzalez" element={<AgentNicolas />} />
            <Route path="/dominican-republic" element={<DominicanRepublic />} />
            <Route path="/zona-colonial" element={<ZonaColonial />} />
            <Route path="/investor-packages" element={<InvestorPackages />} />
            <Route path="/investor-packages/apap-portfolio" element={<ApapPortfolio />} />
            <Route path="/title-escrow" element={<TitleEscrow />} />
            <Route path="/research" element={<ResearchGroup />} />
          </Routes>
        </main>
        {!isResearchPage && <Footer />}
        {!isResearchPage && <SelectionBar />}
        {/* WhatsApp Floating Button */}
        {!isResearchPage && (
          <a
            href="https://wa.me/19546004976?text=Hi%20Virtus%20Realty!%20I'm%20interested%20in%20learning%20more%20about%20your%20services."
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-200 group"
            style={{ boxShadow: '0 4px 15px rgba(37, 211, 102, 0.4)' }}
          >
            <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-pulse" />
          </a>
        )}
      </div>
    </PropertyProvider>
  )
}

export default App
