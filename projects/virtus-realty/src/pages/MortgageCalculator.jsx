import React, { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatCurrency(n) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)
}

function formatCurrencyFull(n) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n)
}

function parseCurrency(str) {
  const n = parseFloat(String(str).replace(/[^0-9.]/g, ''))
  return isNaN(n) ? 0 : n
}

// ─── Pie Chart (CSS conic-gradient) ───────────────────────────────────────────

function PieChart({ segments }) {
  // segments: [{ color, pct, label, amount }]
  const total = segments.reduce((s, seg) => s + seg.pct, 0)
  if (total === 0) return null

  let cumulative = 0
  const conicStops = segments.map(({ color, pct }) => {
    const from = cumulative
    cumulative += pct
    return `${color} ${from.toFixed(2)}% ${cumulative.toFixed(2)}%`
  })

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        className="w-36 h-36 rounded-full shadow-inner"
        style={{ background: `conic-gradient(${conicStops.join(', ')})` }}
        aria-hidden="true"
      />
      <ul className="space-y-1.5 w-full">
        {segments.map((seg) => (
          <li key={seg.label} className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-sm flex-shrink-0" style={{ backgroundColor: seg.color }} />
              <span className="text-gray-600">{seg.label}</span>
            </span>
            <span className="font-semibold text-navy-800">{formatCurrencyFull(seg.amount)}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

// ─── Input helpers ────────────────────────────────────────────────────────────

function Label({ children, htmlFor }) {
  return (
    <label htmlFor={htmlFor} className="block text-sm font-semibold text-navy-800 mb-1">
      {children}
    </label>
  )
}

function CurrencyInput({ id, value, onChange, min = 0, max }) {
  const [focused, setFocused] = useState(false)
  const raw = focused ? String(value) : formatCurrency(value).replace('$', '')

  return (
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-medium text-sm">$</span>
      <input
        id={id}
        type={focused ? 'number' : 'text'}
        value={focused ? value : raw}
        onChange={(e) => {
          const n = parseFloat(e.target.value)
          if (!isNaN(n)) onChange(Math.max(min, max !== undefined ? Math.min(max, n) : n))
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full pl-7 pr-3 py-2.5 border border-gray-200 rounded-lg text-sm text-navy-800 focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent"
      />
    </div>
  )
}

function GoldSlider({ id, value, min, max, step = 0.1, onChange }) {
  return (
    <input
      id={id}
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(parseFloat(e.target.value))}
      className="w-full h-2 rounded-full appearance-none cursor-pointer"
      style={{
        background: `linear-gradient(to right, #b49750 0%, #b49750 ${((value - min) / (max - min)) * 100}%, #e5e7eb ${((value - min) / (max - min)) * 100}%, #e5e7eb 100%)`,
        accentColor: '#b49750',
      }}
    />
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function MortgageCalculator() {
  // SEO Meta Tags
  useEffect(() => {
    document.title = 'Mortgage Calculator | Estimate Payments for Investment Properties | Virtus Realty'
    const meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute('content', 'Calculate monthly mortgage payments for homes, investment properties, and REO acquisitions. Free tool from Virtus Realty Group — South Florida real estate experts.')
    // OG tags
    const ogTitle = document.querySelector('meta[property="og:title"]')
    if (ogTitle) ogTitle.setAttribute('content', 'Mortgage Calculator | Estimate Payments for Investment Properties | Virtus Realty')
    const ogDesc = document.querySelector('meta[property="og:description"]')
    if (ogDesc) ogDesc.setAttribute('content', 'Calculate monthly mortgage payments for homes, investment properties, and REO acquisitions. Free tool from Virtus Realty Group — South Florida real estate experts.')
    const ogUrl = document.querySelector('meta[property="og:url"]')
    if (ogUrl) ogUrl.setAttribute('content', 'https://virtusrealtygroup.com/mortgage-calculator')
  }, [])

  // Inputs
  const [homePrice, setHomePrice] = useState(400000)
  const [downPct, setDownPct] = useState(20)            // percent
  const [interestRate, setInterestRate] = useState(7.0) // annual %
  const [loanTerm, setLoanTerm] = useState(30)          // years
  const [annualTaxPct, setAnnualTaxPct] = useState(1.1) // % of home price
  const [annualInsurance, setAnnualInsurance] = useState(2400) // $/yr
  const [monthlyHoa, setMonthlyHoa] = useState(0)

  // Derived: down payment $ ↔ %
  const downAmount = useMemo(() => (homePrice * downPct) / 100, [homePrice, downPct])

  const handleDownAmountChange = (val) => {
    const clamped = Math.min(val, homePrice)
    setDownPct(homePrice > 0 ? (clamped / homePrice) * 100 : 0)
  }

  // ── Calculations ──────────────────────────────────────────────────────────

  const loanAmount = Math.max(0, homePrice - downAmount)
  const monthlyRate = interestRate / 100 / 12
  const numPayments = loanTerm * 12

  const monthlyPI = useMemo(() => {
    if (monthlyRate === 0) return loanAmount / numPayments
    const factor = Math.pow(1 + monthlyRate, numPayments)
    return (loanAmount * monthlyRate * factor) / (factor - 1)
  }, [loanAmount, monthlyRate, numPayments])

  const monthlyTax = (homePrice * annualTaxPct) / 100 / 12
  const monthlyInsurance = annualInsurance / 12
  const totalMonthly = monthlyPI + monthlyTax + monthlyInsurance + monthlyHoa

  const totalPaid = monthlyPI * numPayments
  const totalInterest = totalPaid - loanAmount
  const totalCostOfHome = totalPaid + downAmount + (monthlyTax + monthlyInsurance + monthlyHoa) * numPayments

  // ── Pie chart segments ────────────────────────────────────────────────────

  const pieSegments = useMemo(() => {
    const items = [
      { label: 'Principal & Interest', color: '#141e31', amount: monthlyPI },
      { label: 'Property Tax',          color: '#b49750', amount: monthlyTax },
      { label: 'Home Insurance',        color: '#4a90d9', amount: monthlyInsurance },
    ]
    if (monthlyHoa > 0) items.push({ label: 'HOA', color: '#6b7280', amount: monthlyHoa })
    const total = items.reduce((s, i) => s + i.amount, 0)
    return items.map((i) => ({ ...i, pct: total > 0 ? (i.amount / total) * 100 : 0 }))
  }, [monthlyPI, monthlyTax, monthlyInsurance, monthlyHoa])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Header */}
      <div className="bg-navy-800 pt-28 pb-14 px-4 text-center">
        <p className="text-gold-400 text-sm font-semibold tracking-widest uppercase mb-2">Planning Tools</p>
        <h1 className="font-display text-3xl md:text-5xl font-bold text-white mb-3">
          Mortgage Calculator
        </h1>
        <p className="text-white/70 text-base md:text-lg max-w-xl mx-auto">
          Estimate your monthly payment and explore financing options for South Florida homes.
        </p>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-8 items-start">

          {/* ── LEFT: Inputs ─────────────────────────────────────────────── */}
          <div className="w-full lg:w-1/2 space-y-6">

            {/* Home Price */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="font-display text-lg font-bold text-navy-800 mb-4">Loan Details</h2>

              <div className="space-y-5">
                {/* Home Price */}
                <div>
                  <Label htmlFor="homePrice">Home Price</Label>
                  <CurrencyInput id="homePrice" value={homePrice} onChange={setHomePrice} min={50000} />
                  <GoldSlider
                    id="homePriceSlider"
                    value={homePrice}
                    min={50000}
                    max={5000000}
                    step={5000}
                    onChange={setHomePrice}
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-0.5">
                    <span>$50K</span><span>$5M</span>
                  </div>
                </div>

                {/* Down Payment */}
                <div>
                  <Label htmlFor="downAmount">Down Payment</Label>
                  <div className="grid grid-cols-2 gap-3 mb-2">
                    <CurrencyInput
                      id="downAmount"
                      value={Math.round(downAmount)}
                      onChange={handleDownAmountChange}
                      min={0}
                      max={homePrice}
                    />
                    <div className="relative">
                      <input
                        type="number"
                        min={0}
                        max={100}
                        step={0.5}
                        value={parseFloat(downPct.toFixed(1))}
                        onChange={(e) => {
                          const n = parseFloat(e.target.value)
                          if (!isNaN(n)) setDownPct(Math.min(100, Math.max(0, n)))
                        }}
                        className="w-full pl-3 pr-7 py-2.5 border border-gray-200 rounded-lg text-sm text-navy-800 focus:outline-none focus:ring-2 focus:ring-gold-400"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">%</span>
                    </div>
                  </div>
                  <GoldSlider
                    id="downPctSlider"
                    value={downPct}
                    min={0}
                    max={60}
                    step={0.5}
                    onChange={setDownPct}
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-0.5">
                    <span>0%</span><span>60%</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Loan amount: <span className="font-semibold text-navy-700">{formatCurrency(loanAmount)}</span>
                    {downPct < 20 && (
                      <span className="ml-2 text-amber-600">⚠ PMI may apply (&lt;20% down)</span>
                    )}
                  </p>
                </div>

                {/* Interest Rate */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <Label htmlFor="interestRate">Interest Rate</Label>
                    <span className="text-sm font-bold text-gold-600">{interestRate.toFixed(2)}%</span>
                  </div>
                  <GoldSlider
                    id="interestRate"
                    value={interestRate}
                    min={3}
                    max={12}
                    step={0.05}
                    onChange={setInterestRate}
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-0.5">
                    <span>3%</span><span>12%</span>
                  </div>
                </div>

                {/* Loan Term */}
                <div>
                  <Label>Loan Term</Label>
                  <div className="flex rounded-lg border border-gray-200 overflow-hidden">
                    {[15, 20, 30].map((yr) => (
                      <button
                        key={yr}
                        onClick={() => setLoanTerm(yr)}
                        className={`flex-1 py-2.5 text-sm font-semibold transition-all duration-150 ${
                          loanTerm === yr
                            ? 'bg-navy-800 text-white'
                            : 'bg-white text-gray-600 hover:bg-navy-50 hover:text-navy-800'
                        }`}
                      >
                        {yr} yr
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Costs */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="font-display text-lg font-bold text-navy-800 mb-4">Monthly Costs</h2>
              <div className="space-y-5">

                {/* Property Tax */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <Label htmlFor="taxRate">Property Tax Rate</Label>
                    <span className="text-sm font-bold text-gold-600">{annualTaxPct.toFixed(2)}% / yr</span>
                  </div>
                  <GoldSlider
                    id="taxRate"
                    value={annualTaxPct}
                    min={0.5}
                    max={3}
                    step={0.05}
                    onChange={setAnnualTaxPct}
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-0.5">
                    <span>0.5%</span>
                    <span className="text-center text-blue-500">FL avg: 1.1%</span>
                    <span>3%</span>
                  </div>
                </div>

                {/* Home Insurance */}
                <div>
                  <Label htmlFor="insurance">Home Insurance (annual)</Label>
                  <CurrencyInput
                    id="insurance"
                    value={annualInsurance}
                    onChange={setAnnualInsurance}
                    min={0}
                  />
                </div>

                {/* HOA */}
                <div>
                  <Label htmlFor="hoa">HOA Fees (monthly)</Label>
                  <CurrencyInput
                    id="hoa"
                    value={monthlyHoa}
                    onChange={setMonthlyHoa}
                    min={0}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ── RIGHT: Results (sticky) ───────────────────────────────────── */}
          <div className="w-full lg:w-1/2 lg:sticky lg:top-24 space-y-6">

            {/* Total Monthly Payment */}
            <div className="bg-navy-800 rounded-2xl shadow-lg p-7 text-center">
              <p className="text-white/60 text-sm font-medium uppercase tracking-wider mb-1">
                Estimated Monthly Payment
              </p>
              <p className="font-display text-5xl md:text-6xl font-bold text-white mb-1">
                {formatCurrencyFull(totalMonthly)}
              </p>
              <p className="text-gold-400 text-sm">
                {loanTerm}-year fixed · {interestRate.toFixed(2)}% rate
              </p>

              {/* Breakdown rows */}
              <div className="mt-5 space-y-2 text-left border-t border-white/10 pt-5">
                {[
                  { label: 'Principal & Interest', value: monthlyPI },
                  { label: 'Property Tax',          value: monthlyTax },
                  { label: 'Home Insurance',        value: monthlyInsurance },
                  ...(monthlyHoa > 0 ? [{ label: 'HOA', value: monthlyHoa }] : []),
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between text-sm">
                    <span className="text-white/70">{label}</span>
                    <span className="text-white font-medium">{formatCurrencyFull(value)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pie Chart */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-display text-base font-bold text-navy-800 mb-4 text-center">
                Payment Breakdown
              </h3>
              <PieChart segments={pieSegments} />
            </div>

            {/* Amortization Summary */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-display text-base font-bold text-navy-800 mb-4">
                {loanTerm}-Year Loan Summary
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-600">Loan Amount</span>
                  <span className="font-semibold text-navy-800">{formatCurrency(loanAmount)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-600">Down Payment</span>
                  <span className="font-semibold text-navy-800">
                    {formatCurrency(downAmount)}
                    <span className="text-gray-400 text-xs ml-1">({downPct.toFixed(1)}%)</span>
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-600">Total Principal Paid</span>
                  <span className="font-semibold text-navy-800">{formatCurrency(loanAmount)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-600">Total Interest Paid</span>
                  <span className="font-semibold text-red-500">{formatCurrency(totalInterest)}</span>
                </div>
                <div className="flex justify-between items-center py-2 bg-navy-50 rounded-lg px-3 -mx-1">
                  <span className="text-sm font-bold text-navy-800">Total Cost of Home</span>
                  <span className="font-bold text-navy-800 text-lg">{formatCurrency(totalCostOfHome)}</span>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link
                to="/financing"
                className="flex items-center justify-center gap-2 px-5 py-3.5 bg-gold-500 text-navy-900 font-semibold rounded-xl hover:bg-gold-600 transition-all duration-200 shadow-sm hover:shadow-md text-sm"
              >
                <span>✅</span>
                Get Pre-Approved
              </Link>
              <Link
                to="/contact"
                className="flex items-center justify-center gap-2 px-5 py-3.5 bg-navy-800 text-white font-semibold rounded-xl hover:bg-navy-700 transition-all duration-200 shadow-sm hover:shadow-md text-sm"
              >
                <span>💬</span>
                Talk to an Agent
              </Link>
            </div>

            <p className="text-xs text-gray-400 text-center leading-relaxed">
              This calculator provides estimates for informational purposes only and does not constitute financial advice. Contact a licensed mortgage professional for precise figures.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
