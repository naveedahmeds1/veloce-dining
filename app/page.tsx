'use client';

import React, { useState, useEffect } from 'react';

// === INTERNATIONAL MULTI-CURRENCY CONVERTOR ===
type Currency = 'USD' | 'EUR' | 'GBP' | 'PKR';

const CURRENCY_RATES: Record<Currency, { symbol: string; rate: number }> = {
  USD: { symbol: '$', rate: 1 },
  EUR: { symbol: '€', rate: 0.92 },
  GBP: { symbol: '£', rate: 0.78 },
  PKR: { symbol: 'Rs ', rate: 278 }
};

// === PREMIUM DATA LAYERS ===
const PREMIUM_PRODUCTS = [
  { 
    id: "p1", 
    name: "Apex Quantum Dropper v4", 
    tagline: "High-frequency liquid routing module.", 
    priceUSD: 1299, 
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=600&q=80",
    description: "Automated high-frequency liquidity router engineered for telemetry, encryption pipelines, and smooth execution matrices.", 
    specs: ["Guaranteed High Network Uptime", "Low-Latency Custom Fiber Routing", "Multi-Layer Security Vault"], 
    badge: "Pro Edition" 
  },
  { 
    id: "p2", 
    name: "Matrix Core Node Pro", 
    tagline: "Neural computing stack.", 
    priceUSD: 2450, 
    image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=600&q=80",
    description: "Liquid-cooled hardware computation stack built explicitly for deep learning arrays, neural nodes, and algorithmic clustering.", 
    specs: ["High-Performance Neural Core", "Liquid-Cooled Enclosure", "Native API Gateway Integration"], 
    badge: "Standard Drop" 
  }
];

const MENU_ITEMS = [
  { id: 'm1', name: 'Truffle Glazed Prime Burger', category: 'Main', priceUSD: 24.00, tag: 'CHEF SPECIAL', image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=80" },
  { id: 'm2', name: 'Smoked Salmon Avocado Crisp', category: 'Starters', priceUSD: 18.50, tag: 'ORGANIC', image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80" },
  { id: 'm3', name: 'Saffron Infused Risotto Sphere', category: 'Main', priceUSD: 29.00, tag: 'CHEF SPECIAL', image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=500&q=80" },
  { id: 'm4', name: 'Artisanal Matcha Espresso Tart', category: 'Desserts', priceUSD: 12.00, tag: 'POPULAR', image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=500&q=80" },
];

const CASE_STUDIES = [
  {
    id: "cs1",
    title: "Veloce Dining Systems",
    category: "Full-Stack Hospitality Suite",
    client: "Veloce Group International",
    tech: ["Next.js 14", "TypeScript", "Tailwind CSS", "WebSockets"],
    problem: "Outdated legacy booking created delays during peak hours and lost high-value bookings.",
    solution: "Built an ultra-low-latency dynamic ordering engine with live table reservations and instant courier telemetry.",
    liveUrl: "https://veloce-dining.vercel.app"
  },
  {
    id: "cs2",
    title: "Apex Combo Store",
    category: "E-Commerce Hardware Suite",
    client: "Apex Enterprise Global",
    tech: ["React 18", "Tailwind CSS", "REST API", "State Management"],
    problem: "Complex hardware configuration needed real-time parameter feedback without page reloads.",
    solution: "Engineered high-speed dynamic cart preview engine with multi-currency dynamic calculations.",
    liveUrl: "https://apex-combo-store.vercel.app"
  },
  {
    id: "cs3",
    title: "Apex Matrix Storefront",
    category: "Enterprise Corporate Portal",
    client: "Matrix Tech Alliance",
    tech: ["Next.js", "Tailwind CSS", "Framer Motion"],
    problem: "Needed minimalist luxury branding for high-net-worth international enterprise hardware clients.",
    solution: "Designed ultra-sleek, dark-mode corporate dashboard with instant page transitions.",
    liveUrl: "https://apex-combo-store.vercel.app"
  },
  {
    id: "cs4",
    title: "AI Blog Writer",
    category: "Autonomous Content Engine",
    client: "SaaS Enterprise Core",
    tech: ["Next.js", "OpenAI API", "Tailwind CSS"],
    problem: "Content creators needed rapid technical docs generation with customizable tone matrices.",
    solution: "Created full AI streaming interface generating structured markdown articles in seconds.",
    liveUrl: "https://aiblogwriter.vercel.app"
  }
];

const TESTIMONIALS = [
  {
    quote: "Naveed delivered our enterprise hospitality suite with military-grade precision. The loading times and UI aesthetics are unmatched.",
    author: "Alexander Wright",
    role: "VP of Engineering",
    company: "Veloce Group USA",
    location: "San Francisco, USA"
  },
  {
    quote: "Working with Naveed was seamless. He converted our complex business requirements into an intuitive Next.js application in record time.",
    author: "Hamza Sheikh",
    role: "Managing Director",
    company: "TechNova Agency",
    location: "Lahore, Pakistan"
  }
];

export default function IntegratedPortfolio(): React.JSX.Element {
  // === ALL STATE DECLARATIONS ===
  const [activeApp, setActiveApp] = useState<'portfolio' | 'dining' | 'ecommerce'>('portfolio');
  const [activeTab, setActiveTab] = useState<'overview' | 'work' | 'custom_offer' | 'contact'>('overview');
  const [currency, setCurrency] = useState<Currency>('USD');

  // DINING CONSOLE STATES
  const [diningTab, setDiningTab] = useState<'home' | 'menu' | 'reservation' | 'tracking'>('home');
  const [diningFilter, setDiningFilter] = useState<string>('All');
  const [diningManifest, setDiningManifest] = useState<{ id: string; name: string; priceUSD: number }[]>([]);
  const [diningLogs, setDiningLogs] = useState<string[]>([]);
  const [diningTrackingActive, setDiningTrackingActive] = useState<boolean>(false);
  
  // RESERVATION STATES
  const [resGuests, setResGuests] = useState<number>(2);
  const [resDate, setResDate] = useState<string>('2026-08-15');
  const [resTime, setResTime] = useState<string>('19:30');

  // E-COMMERCE CONSOLE STATES
  const [cartCount, setCartCount] = useState<number>(0);
  
  // GLOBAL NOTIFICATION & CASE STUDY
  const [notification, setNotification] = useState<string | null>(null);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<string>(CASE_STUDIES[0].id);

  // CUSTOM OFFER GENERATOR STATES
  const [customBudget, setCustomBudget] = useState<number | ''>(450);
  const [selectedPreset, setSelectedPreset] = useState<string>('pro');
  const [offerNotes, setOfferNotes] = useState<string>('');
  const [additions, setAdditions] = useState<Record<string, boolean>>({
    responsive: true,
    cms: true,
    seo: true,
    database: true,
    speed: true
  });

  const triggerNotification = (msg: string): void => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  useEffect(() => {
    if (diningTrackingActive) {
      setDiningLogs([
        "Order #7892 Verified by Automated Gateway...",
        "Executive Kitchen Station Preparing Meal...",
        "Temperature-Controlled Delivery Vehicle En Route..."
      ]);
    }
  }, [diningTrackingActive]);

  // CURRENCY HELPER
  const formatPrice = (usdVal: number): string => {
    const cur = CURRENCY_RATES[currency];
    const converted = usdVal * cur.rate;
    return `${cur.symbol}${converted.toLocaleString(undefined, { minimumFractionDigits: cur.rate > 50 ? 0 : 2, maximumFractionDigits: 2 })}`;
  };

  const filteredDining = diningFilter === 'All' ? MENU_ITEMS : MENU_ITEMS.filter(item => item.category === diningFilter);

  // WHATSAPP ROUTER
  const getWhatsAppOfferLink = () => {
    const budgetVal = customBudget ? `$${customBudget} USD` : 'Custom Scope';
    const textMsg = `Hi Naveed! I generated a Custom Offer on your International Portfolio:\n- Tier: ${selectedPreset.toUpperCase()}\n- Budget Target: ${budgetVal}\n- Project Details: ${offerNotes || 'Standard Enterprise Scope'}`;
    return `https://api.whatsapp.com/send?phone=923103273904&text=${encodeURIComponent(textMsg)}`;
  };

  return (
    <div className="min-h-screen bg-[#030712] text-white relative font-sans antialiased text-left selection:bg-yellow-500/30 selection:text-yellow-200">
      
      {/* Background Ambience */}
      <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-yellow-500/5 rounded-full blur-[150px] pointer-events-none z-0"></div>

      {/* Global Toast Notification */}
      {notification && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-zinc-900/90 border border-yellow-500/40 text-white px-6 py-3 rounded-full text-xs font-medium shadow-2xl flex items-center gap-3 backdrop-blur-md">
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 animate-ping"></span>
          <span>{notification}</span>
        </div>
      )}

      {/* ================= 1. VELOCE DINING INTERNATIONAL RESTAURANT CONSOLE ================= */}
      {activeApp === 'dining' && (
        <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans relative z-10">
          <header className="sticky top-0 z-40 bg-black/90 backdrop-blur-md border-b border-zinc-900 px-6 py-4 flex flex-wrap items-center justify-between gap-4">
            <button 
              onClick={() => setActiveApp('portfolio')} 
              className="text-xs font-bold text-yellow-500 hover:text-yellow-400 flex items-center gap-2 bg-yellow-500/10 px-4 py-2 rounded-xl border border-yellow-500/20 transition-all"
            >
              ← Back To Portfolio Deck
            </button>
            
            <nav className="flex items-center space-x-1 bg-zinc-900 p-1.5 rounded-xl border border-zinc-800">
              {(['home', 'menu', 'reservation', 'tracking'] as const).map((tab) => (
                <button 
                  key={tab} 
                  onClick={() => setDiningTab(tab)} 
                  className={`px-4 py-1.5 rounded-lg text-xs capitalize transition-all ${diningTab === tab ? 'bg-yellow-500 text-black font-bold' : 'text-zinc-400 hover:text-white'}`}
                >
                  {tab}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <a 
                href="https://veloce-dining.vercel.app" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-[10px] bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-3.5 py-1.5 rounded-xl transition-all"
              >
                Live Vercel Host 🚀
              </a>
            </div>
          </header>

          <main className="max-w-5xl mx-auto px-6 py-12 relative z-10">
            {diningTab === 'home' && (
              <div className="space-y-8 text-center max-w-3xl mx-auto py-12">
                <span className="text-yellow-500 font-mono text-xs uppercase tracking-widest bg-yellow-500/10 px-4 py-1.5 rounded-full border border-yellow-500/20">
                  Luxury Dining & Hospitality Platform
                </span>
                <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight">
                  Veloce Enterprise <br />
                  <span className="bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
                    Interactive Concierge
                  </span>
                </h1>
                <p className="text-zinc-400 text-sm max-w-xl mx-auto font-light leading-relaxed">
                  Engineered with real-time dynamic menu routing, instant seat reservations, multi-currency support, and zero-latency order telemetry.
                </p>
                <div className="flex justify-center gap-4 pt-4">
                  <button onClick={() => setDiningTab('menu')} className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold text-xs px-8 py-3.5 rounded-xl transition-all shadow-lg">
                    Explore Interactive Menu
                  </button>
                  <button onClick={() => setDiningTab('reservation')} className="bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-white text-xs font-semibold px-8 py-3.5 rounded-xl transition-all">
                    Book VIP Table
                  </button>
                </div>
              </div>
            )}

            {diningTab === 'menu' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  <div className="flex flex-wrap items-center justify-between bg-zinc-900/60 p-4 rounded-2xl border border-zinc-800 gap-4">
                    <h2 className="text-base font-bold text-white">Smart Menu Engine</h2>
                    <div className="flex gap-1.5">
                      {['All', 'Main', 'Starters', 'Desserts'].map((cat) => (
                        <button 
                          key={cat} 
                          onClick={() => setDiningFilter(cat)} 
                          className={`px-3 py-1 rounded-lg text-xs transition-all ${diningFilter === cat ? 'bg-yellow-500 text-black font-bold' : 'bg-zinc-800 text-zinc-400'}`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {filteredDining.map((item) => (
                      <div key={item.id} className="bg-zinc-900/40 border border-zinc-800 p-5 rounded-2xl flex flex-col justify-between space-y-4 hover:border-yellow-500/30 transition-all">
                        <div className="space-y-2">
                          <div className="flex justify-between items-start">
                            <h3 className="text-sm font-bold text-white">{item.name}</h3>
                            <span className="text-[9px] font-mono bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 px-2 py-0.5 rounded">{item.tag}</span>
                          </div>
                          <span className="text-[10px] font-mono text-zinc-500 uppercase block">{item.category}</span>
                        </div>
                        <div className="flex justify-between items-center pt-3 border-t border-zinc-800/80">
                          <span className="text-sm font-mono font-bold text-yellow-400">{formatPrice(item.priceUSD)}</span>
                          <button 
                            onClick={() => {
                              setDiningManifest([...diningManifest, { id: Date.now().toString(), name: item.name, priceUSD: item.priceUSD }]);
                              triggerNotification(`${item.name} added to cart`);
                            }} 
                            className="bg-zinc-800 hover:bg-yellow-500 hover:text-black text-zinc-200 text-xs font-semibold px-3 py-1.5 rounded-lg border border-zinc-700 transition-all"
                          >
                            + Add Item
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-zinc-900/60 border border-zinc-800 p-6 rounded-2xl font-mono space-y-4 h-fit sticky top-24">
                  <h3 className="text-xs font-bold uppercase text-zinc-400 border-b border-zinc-800 pb-3">Order Manifest ({diningManifest.length})</h3>
                  {diningManifest.length === 0 ? (
                    <p className="text-xs text-zinc-600 py-6 text-center">No luxury items added yet.</p>
                  ) : (
                    <div className="space-y-2.5 text-xs text-zinc-300 max-h-60 overflow-y-auto pr-1">
                      {diningManifest.map((itm, idx) => (
                        <div key={idx} className="flex justify-between bg-black/40 p-2.5 rounded-lg border border-zinc-800/60">
                          <span>{itm.name}</span>
                          <span className="text-yellow-400 font-bold">{formatPrice(itm.priceUSD)}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {diningManifest.length > 0 && (
                    <div className="pt-2 border-t border-zinc-800 space-y-3">
                      <div className="flex justify-between text-xs font-bold text-white">
                        <span>Total:</span>
                        <span className="text-yellow-400">{formatPrice(diningManifest.reduce((acc, curr) => acc + curr.priceUSD, 0))}</span>
                      </div>
                      <button 
                        onClick={() => { 
                          triggerNotification("Order Confirmed & Telemetry Initialized!"); 
                          setDiningTrackingActive(true); 
                          setDiningTab('tracking'); 
                          setDiningManifest([]); 
                        }} 
                        className="w-full bg-yellow-500 hover:bg-yellow-400 text-black text-xs font-bold py-3.5 rounded-xl transition-all shadow-lg"
                      >
                        Place Executive Order
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {diningTab === 'reservation' && (
              <div className="max-w-lg mx-auto bg-zinc-900/60 border border-zinc-800 p-8 rounded-3xl space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-white">VIP Table Booking</h3>
                  <p className="text-xs text-zinc-400 mt-1">Reserve private dining lounge seats with instant confirmation.</p>
                </div>
                <div className="space-y-4 text-xs font-mono">
                  <div>
                    <label className="text-zinc-400 block mb-1">Guests Count</label>
                    <select value={resGuests} onChange={(e) => setResGuests(Number(e.target.value))} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-white">
                      {[1, 2, 4, 6, 8, 12].map(num => <option key={num} value={num}>{num} Guests Lounge</option>)}
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-zinc-400 block mb-1">Date</label>
                      <input type="date" value={resDate} onChange={(e) => setResDate(e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-white" />
                    </div>
                    <div>
                      <label className="text-zinc-400 block mb-1">Time Slot</label>
                      <input type="time" value={resTime} onChange={(e) => setResTime(e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-white" />
                    </div>
                  </div>
                  <button 
                    onClick={() => triggerNotification(`VIP Table Reserved for ${resGuests} Guests on ${resDate} at ${resTime}`)} 
                    className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3.5 rounded-xl transition-all"
                  >
                    Confirm VIP Reservation
                  </button>
                </div>
              </div>
            )}

            {diningTab === 'tracking' && (
              <div className="max-w-md mx-auto bg-zinc-900/60 border border-zinc-800 p-8 rounded-3xl font-mono space-y-6">
                <div className="flex justify-between items-center border-b border-zinc-800 pb-3">
                  <h4 className="text-xs font-bold uppercase text-yellow-400">// Live Order Telemetry</h4>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                </div>
                <div className="space-y-3 text-xs text-zinc-300 bg-black/60 p-4 rounded-xl border border-zinc-800/80">
                  {diningLogs.length === 0 ? (
                    <p className="text-zinc-600 text-center py-4">No active telemetry stream.</p>
                  ) : (
                    diningLogs.map((log, i) => <p key={i} className="leading-relaxed">&gt; {log}</p>)
                  )}
                </div>
              </div>
            )}
          </main>
        </div>
      )}

      {/* ================= 2. APEX COMBO E-COMMERCE CONSOLE ================= */}
      {activeApp === 'ecommerce' && (
        <div className="min-h-screen bg-black text-white font-sans relative z-10">
          <header className="sticky top-0 z-40 bg-zinc-950 border-b border-zinc-900 px-6 py-4 flex items-center justify-between">
            <button onClick={() => setActiveApp('portfolio')} className="text-xs font-bold text-yellow-500 hover:text-yellow-400">
              ← Return To Portfolio Deck
            </button>
            <span className="text-xs font-bold text-white font-mono">Apex Combo Hardware Console</span>
            <div className="text-xs font-mono bg-zinc-900 px-3 py-1 rounded-full border border-zinc-800 text-yellow-400">
              Cart Items ({cartCount})
            </div>
          </header>
          <main className="max-w-5xl mx-auto px-6 py-12 space-y-8">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <h1 className="text-3xl font-bold">Apex Enterprise Products</h1>
              <p className="text-xs text-zinc-400">Explore high-frequency hardware stacks with live cart integration.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {PREMIUM_PRODUCTS.map((product) => (
                <div key={product.id} className="bg-zinc-950 border border-zinc-900 p-6 rounded-3xl space-y-4 hover:border-zinc-800 transition-all">
                  <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-2xl opacity-80" />
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-bold text-white">{product.name}</h3>
                    <span className="text-xs font-mono text-yellow-400 font-bold">{formatPrice(product.priceUSD)}</span>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed">{product.description}</p>
                  <button onClick={() => { setCartCount(c => c + 1); triggerNotification(`${product.name} added to cart`); }} className="w-full bg-white text-black font-bold text-xs py-3 rounded-xl hover:bg-yellow-400 transition-all">
                    Add To Cart
                  </button>
                </div>
              ))}
            </div>
          </main>
        </div>
      )}

      {/* ================= 3. MAIN INTERNATIONAL PORTFOLIO DECK ================= */}
      {activeApp === 'portfolio' && (
        <main className="max-w-6xl mx-auto px-6 py-8 relative z-10">

          {/* GLOBAL HEADER */}
          <header className="flex flex-wrap justify-between items-center gap-4 mb-16 pb-6 border-b border-zinc-900">
            <div className="flex items-center gap-3">
              <span className="text-2xl font-black bg-gradient-to-r from-yellow-400 via-amber-300 to-orange-400 bg-clip-text text-transparent font-mono tracking-wider">
                Naveed.dev
              </span>
              <span className="text-[10px] font-mono bg-zinc-900 border border-zinc-800 text-zinc-300 px-3 py-1 rounded-full uppercase">
                Full-Stack SaaS Architect
              </span>
            </div>

            <nav className="flex items-center gap-1 bg-zinc-900/80 p-1.5 rounded-full border border-zinc-800">
              {[
          { id: 'overview', label: 'Overview' },
                { id: 'work', label: 'Projects' },
                { id: 'custom_offer', label: 'Custom Offer ⚡' },
                { id: 'contact', label: 'Contact' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                    activeTab === tab.id 
                      ? 'bg-yellow-500 text-black font-bold shadow-lg' 
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>

            {/* MULTI-CURRENCY TOGGLE */}
            <div className="flex items-center gap-2">
              <div className="bg-zinc-900 border border-zinc-800 p-1 rounded-xl flex gap-1 text-[10px] font-mono">
                {(['USD', 'EUR', 'GBP', 'PKR'] as Currency[]).map((c) => (
                  <button
                    key={c}
                    onClick={() => setCurrency(c)}
                    className={`px-2 py-1 rounded-lg transition-all ${currency === c ? 'bg-yellow-500 text-black font-bold' : 'text-zinc-400'}`}
                  >
                    {c}
                  </button>
                ))}
              </div>

              <a 
                href="https://api.whatsapp.com/send?phone=923103273904" 
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 text-xs font-bold rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500 hover:text-black transition-all flex items-center gap-2"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>WhatsApp</span>
              </a>
            </div>
          </header>

          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-20">
              <section className="text-center max-w-3xl mx-auto space-y-6 pt-4">
                <div className="inline-flex items-center gap-2 bg-zinc-900 border border-zinc-800 px-4 py-1.5 rounded-full text-xs text-zinc-300">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>Available for Global Remote Contracts & High-Scale Freelance</span>
                </div>

                <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight">
                  Crafting High-Performance <br />
                  <span className="bg-gradient-to-r from-yellow-400 via-amber-300 to-orange-400 bg-clip-text text-transparent">
                    Web Platforms & SaaS Engines
                  </span>
                </h1>

                <p className="text-zinc-400 text-sm sm:text-base max-w-xl mx-auto font-light leading-relaxed">
                  Specializing in React, Next.js 14, TypeScript, and modern web architectures for clients across the US, Europe, and Asia.
                </p>
                
                {/* TRUST METRICS */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto pt-4">
                  {[
                    { metric: "$2.4M+", label: "Transaction Volume" },
                    { metric: "99.99%", label: "System Uptime" },
                    { metric: "4.9 ★", label: "Client Rating" },
                    { metric: "100%", label: "On-Time Delivery" }
                  ].map((m, idx) => (
                    <div key={idx} className="bg-zinc-900/40 border border-zinc-800 p-4 rounded-2xl text-center">
                      <span className="text-lg font-bold font-mono text-yellow-400 block">{m.metric}</span>
                      <span className="text-[10px] text-zinc-500 uppercase font-mono block mt-1">{m.label}</span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-center gap-4 pt-4">
                  <button onClick={() => setActiveTab('custom_offer')} className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold text-xs px-8 py-3.5 rounded-xl transition-all shadow-lg">
                    Build Custom Offer ⚡
                  </button>
                  <button onClick={() => setActiveTab('work')} className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-white font-semibold text-xs px-8 py-3.5 rounded-xl transition-all">
                    Browse All Projects
                  </button>
                </div>
              </section>

              {/* ALL 4 PROJECTS GRID */}
              <section className="space-y-8">
                <div className="text-center">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-yellow-500 bg-yellow-500/10 border border-yellow-500/20 px-3 py-1 rounded-full">
                    Featured Work Portfolio
                  </span>
                  <h2 className="text-2xl font-bold text-white mt-3">Live Production Applications</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* PROJECT 1: VELOCE DINING */}
                  <div className="p-6 bg-zinc-900/40 border border-zinc-800 rounded-3xl space-y-4 hover:border-yellow-500/30 transition-all flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex justify-between items-start">
                        <h3 className="text-lg font-bold text-white">Veloce Dining Platform</h3>
                        <span className="text-[10px] font-mono bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 px-2.5 py-1 rounded">Hospitality SaaS</span>
                      </div>
                      <p className="text-xs text-zinc-400 leading-relaxed font-light">
                        Full-stack luxury restaurant application with live order tracking, menu filters, and table reservation engines.
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-4">
                      <button 
                        onClick={() => { setActiveApp('dining'); setDiningTab('home'); }} 
                        className="bg-yellow-500 hover:bg-yellow-400 text-black text-xs font-bold px-5 py-2.5 rounded-xl transition-all shadow-md"
                      >
                        Launch Interactive Console ⚡
                      </button>
                      <a 
                        href="https://veloce-dining.vercel.app" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="bg-zinc-900 border border-zinc-800 hover:border-yellow-500 text-yellow-400 text-xs font-semibold px-4 py-2.5 rounded-xl transition-all"
                      >
                        Vercel Link 🚀
                      </a>
                    </div>
                  </div>
                  {/* PROJECT 2: APEX COMBO STORE */}
                  <div className="p-6 bg-zinc-900/40 border border-zinc-800 rounded-3xl space-y-4 hover:border-yellow-500/30 transition-all flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex justify-between items-start">
                        <h3 className="text-lg font-bold text-white">Apex Combo Hardware Store</h3>
                        <span className="text-[10px] font-mono bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 px-2.5 py-1 rounded">E-Commerce</span>
                      </div>
                      <p className="text-xs text-zinc-400 leading-relaxed font-light">
                        Modern hardware storefront featuring multi-currency dynamic calculations and instant state synchronization.
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-4">
                      <button 
                        onClick={() => setActiveApp('ecommerce')} 
                        className="bg-zinc-900 border border-zinc-800 hover:border-yellow-500 text-yellow-400 text-xs font-semibold px-5 py-2.5 rounded-xl transition-all"
                      >
                        Launch Demo Console
                      </button>
                      <a 
                        href="https://apex-combo-store.vercel.app" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="bg-yellow-500 hover:bg-yellow-400 text-black text-xs font-bold px-5 py-2.5 rounded-xl transition-all"
                      >
                        Live Vercel Site 🚀
                      </a>
                    </div>
                  </div>

                  {/* PROJECT 3: APEX MATRIX STOREFRONT */}
                  <div className="p-6 bg-zinc-900/40 border border-zinc-800 rounded-3xl space-y-4 hover:border-yellow-500/30 transition-all flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex justify-between items-start">
                        <h3 className="text-lg font-bold text-white">Apex Matrix Storefront</h3>
                        <span className="text-[10px] font-mono bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 px-2.5 py-1 rounded">Enterprise Portal</span>
                      </div>
                      <p className="text-xs text-zinc-400 leading-relaxed font-light">
                        High-end corporate website layout designed for tech brands with smooth animation effects and minimal typography.
                      </p>
                    </div>
                    <a href="https://apex-combo-store.vercel.app" target="_blank" rel="noopener noreferrer" className="w-fit bg-yellow-500 hover:bg-yellow-400 text-black text-xs font-bold px-5 py-2.5 rounded-xl transition-all">
                      Launch Enterprise Portal 🚀
                    </a>
                  </div>

                  {/* PROJECT 4: AI BLOG WRITER */}
                  <div className="p-6 bg-zinc-900/40 border border-zinc-800 rounded-3xl space-y-4 hover:border-yellow-500/30 transition-all flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex justify-between items-start">
                        <h3 className="text-lg font-bold text-white">AI Blog Writer Platform</h3>
                        <span className="text-[10px] font-mono bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 px-2.5 py-1 rounded">AI SaaS App</span>
                      </div>
                      <p className="text-xs text-zinc-400 leading-relaxed font-light">
                        Autonomous artificial intelligence app that parses prompt streams to generate formatted markdown blog posts.
                      </p>
                    </div>
                    <a href="https://aiblogwriter.vercel.app" target="_blank" rel="noopener noreferrer" className="w-fit bg-yellow-500 hover:bg-yellow-400 text-black text-xs font-bold px-5 py-2.5 rounded-xl transition-all">
                      Launch AI Platform 🚀
                    </a>
                  </div>

                </div>
              </section>

              {/* REVIEWS */}
              <section className="space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-white">Client Testimonials</h2>
                  <p className="text-xs text-zinc-500 mt-1">Endorsements from international engineering leaders and founders</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {TESTIMONIALS.map((review, i) => (
                    <div key={i} className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-2xl space-y-4">
                      <p className="text-xs text-zinc-300 italic font-light leading-relaxed">"{review.quote}"</p>
                      <div className="border-t border-zinc-800/80 pt-3 flex justify-between items-center">
                        <div>
                          <h4 className="text-xs font-bold text-white">{review.author}</h4>
                          <p className="text-[10px] text-zinc-500">{review.role} • {review.company}</p>
                        </div>
                        <span className="text-[10px] font-mono bg-zinc-800 text-zinc-400 px-2 py-1 rounded">{review.location}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}

          {/* TAB 2: DETAILED CASE STUDIES */}
          {activeTab === 'work' && (
            <div className="space-y-8">
              <div className="border-b border-zinc-900 pb-4">
                <h2 className="text-2xl font-bold text-white">Technical Case Studies</h2>
                <p className="text-xs text-zinc-500 mt-1">Architecture breakdowns for all 4 enterprise web applications</p>
              </div>

              <div className="grid lg:grid-cols-3 gap-6">
                <div className="space-y-2">
                  {CASE_STUDIES.map((cs) => (
                    <button
                      key={cs.id}
                      onClick={() => setSelectedCaseStudy(cs.id)}
                      className={`w-full text-left p-4 rounded-2xl border transition-all ${
                        selectedCaseStudy === cs.id ? 'bg-zinc-900 border-yellow-500/50 text-white font-bold' : 'bg-zinc-950 border-zinc-900 text-zinc-500'
                      }`}
                    >
                      <span className="text-[10px] font-mono text-yellow-500 uppercase block mb-1">{cs.category}</span>
                      <h3 className="text-xs font-bold">{cs.title}</h3>
                    </button>
                  ))}
                </div>

                {(() => {
                  const cs = CASE_STUDIES.find(c => c.id === selectedCaseStudy)!;
                  return (
                    <div className="lg:col-span-2 bg-zinc-900/40 border border-zinc-800 p-8 rounded-3xl space-y-6">
                      <div className="flex justify-between items-start pb-4 border-b border-zinc-800">
                        <div>
                          <span className="text-xs font-mono text-yellow-500">{cs.category}</span>
                          <h2 className="text-xl font-bold text-white mt-1">{cs.title}</h2>
                          <p className="text-xs text-zinc-500 mt-1">Client: {cs.client}</p>
                        </div>
                        <a href={cs.liveUrl} target="_blank" rel="noopener noreferrer" className="bg-yellow-500 text-black text-xs font-bold px-5 py-2.5 rounded-xl">
                          Open Live Project 🚀
                        </a>
                      </div>
                      <div className="space-y-4 text-xs leading-relaxed">
                        <div>
                          <h4 className="font-mono text-zinc-400 uppercase mb-1">// Challenge Statement</h4>
                          <p className="text-zinc-300 font-light">{cs.problem}</p>
                        </div>
                        <div>
                          <h4 className="font-mono text-zinc-400 uppercase mb-1">// Engineering Solution</h4>
                          <p className="text-zinc-300 font-light">{cs.solution}</p>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-mono text-[10px] text-zinc-500 uppercase mb-2">Tech Stack Architecture:</h4>
                        <div className="flex flex-wrap gap-2">
                          {cs.tech.map((t, idx) => (
                            <span key={idx} className="text-[10px] font-mono bg-zinc-800 text-zinc-300 px-3 py-1 rounded-full">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>
          )}

          {/* TAB 3: ADVANCED CUSTOM OFFER GENERATOR */}
          {activeTab === 'custom_offer' && (
            <div className="max-w-3xl mx-auto bg-zinc-900/40 border border-zinc-800/80 p-8 rounded-3xl space-y-8 backdrop-blur-2xl shadow-2xl">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-yellow-500 bg-yellow-500/10 border border-yellow-500/20 px-3 py-1 rounded-full">
                  Interactive Scope & Budget Engine
                </span>
                <h2 className="text-3xl font-bold text-white mt-3 tracking-tight">Generate Custom Offer</h2>
                <p className="text-xs text-zinc-400 mt-1 font-light">
                  Select recommended tiers or input your target project budget in your preferred currency.
                </p>
              </div>

              {/* 1. RECOMMENDED PRESETS */}
              <div className="space-y-3">
                <label className="text-xs font-mono uppercase text-zinc-400 block">// 1. Select Recommended Tier</label>
                <div className="grid sm:grid-cols-3 gap-3">
                  {[
                    { id: "starter", title: "Starter / Basic", priceUSD: 250, badge: "Budget Friendly", desc: "Landing Page, Clean Design" },
                    { id: "pro", title: "Professional", priceUSD: 750, badge: "Recommended", desc: "E-Commerce, Web SaaS Engine" },
                    { id: "enterprise", title: "Enterprise Custom", priceUSD: 2000, badge: "Full Suite", desc: "High Scale Mobile & Web SaaS" }
                  ].map((preset) => (
                    <button
                      key={preset.id}
                      onClick={() => {
                        setSelectedPreset(preset.id);
                        setCustomBudget(preset.priceUSD);
                      }}
                      className={`p-4 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                        selectedPreset === preset.id 
                          ? 'bg-yellow-500/10 border-yellow-500 shadow-lg' 
                          : 'bg-black/40 border-zinc-800 hover:border-zinc-700'
                      }`}
                    >
                      <div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-bold text-white">{preset.title}</span>
                          <span className="text-[8px] font-mono bg-yellow-500/20 text-yellow-400 px-1.5 py-0.5 rounded">{preset.badge}</span>
                        </div>
                        <p className="text-[10px] text-zinc-400 mt-2 font-light">{preset.desc}</p>
                      </div>
                      <div className="text-xs font-mono font-bold text-yellow-400 mt-4">{formatPrice(preset.priceUSD)}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. CUSTOM BUDGET INPUT FIELD */}
              <div className="space-y-3 bg-black/40 border border-zinc-800 p-5 rounded-2xl">
                <label className="text-xs font-mono uppercase text-zinc-400 block">// 2. Or Enter Custom Target Budget ({currency})</label>
                <div className="flex items-center gap-3">
                  <span className="text-xl font-bold font-mono text-yellow-500">{CURRENCY_RATES[currency].symbol}</span>
                  <input
                    type="number"
                    value={customBudget}
                    onChange={(e) => {
                      const val = e.target.value === '' ? '' : Number(e.target.value);
                      setCustomBudget(val);
                      setSelectedPreset('custom');
                    }}
                    placeholder="Enter budget target"
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm font-mono text-white focus:outline-none focus:border-yellow-500 transition-all"
                  />
                </div>
              </div>

              {/* 3. OPTIONAL FEATURES */}
              <div className="space-y-3">
                <label className="text-xs font-mono uppercase text-zinc-400 block">// 3. Required Capabilities</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
                  {[
                    { key: "responsive", label: "Mobile Responsive" },
                    { key: "cms", label: "Content Admin Panel" },
                    { key: "seo", label: "Basic SEO Setup" },
                    { key: "database", label: "Database / Backend" },
                    { key: "speed", label: "Page Speed Optimization" }
                  ].map((item) => (
                    <label key={item.key} className="flex items-center gap-2.5 bg-black/40 border border-zinc-800 p-3 rounded-xl cursor-pointer hover:border-zinc-700">
                      <input
                        type="checkbox"
                        checked={additions[item.key] || false}
                        onChange={(e) => setAdditions({ ...additions, [item.key]: e.target.checked })}
                        className="accent-yellow-500 rounded"
                      />
                      <span className="text-zinc-300 text-[11px]">{item.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* 4. BRIEF NOTES */}
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase text-zinc-400 block">// 4. Short Requirements Summary</label>
                <textarea
                  rows={2}
                  value={offerNotes}
                  onChange={(e) => setOfferNotes(e.target.value)}
                  placeholder="Tell me a bit about what you want to build..."
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-yellow-500"
                />
              </div>

              {/* SUMMARY */}
              {/* SUMMARY */}
              <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl flex flex-wrap justify-between items-center gap-4">
                <div>
                  <span className="text-[10px] font-mono text-zinc-500 uppercase block">Total Offered Value</span>
                  <span className="text-2xl font-mono font-bold text-yellow-400">
                    {customBudget ? formatPrice(Number(customBudget)) : 'Negotiable Scope'}
                  </span>
                </div>
                <a
                  href={getWhatsAppOfferLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs px-6 py-3.5 rounded-xl transition-all flex items-center gap-2 shadow-lg"
                >
                  💬 Submit Offer via WhatsApp →
                </a>
              </div>
            </div>
          )}

          {/* TAB 4: CONTACT */}
          {activeTab === 'contact' && (
            <div className="max-w-md mx-auto space-y-6 text-center bg-zinc-900/40 border border-zinc-800 p-8 rounded-3xl">
              <div>
                <h2 className="text-2xl font-bold text-white">Start A Project</h2>
                <p className="text-xs text-zinc-400 mt-1">Direct communication channels for international & local business inquiries.</p>
              </div>

              <div className="space-y-3 font-mono text-xs">
                <a 
                  href="https://api.whatsapp.com/send?phone=923103273904&text=Hi%20Naveed,%20I%20want%20to%20discuss%20a%20project." 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500 hover:text-black p-3.5 rounded-xl flex items-center justify-center gap-2 font-bold transition-all"
                >
                  💬 Chat On WhatsApp (+923103273904)
                </a>

                <a 
                  href="mailto:na0953237@gmail.com"
                  className="w-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 hover:bg-yellow-500 hover:text-black p-3.5 rounded-xl flex items-center justify-center gap-2 font-bold transition-all"
                >
                  ✉️ Send Direct Email
                </a>
              </div>
            </div>
          )}

          {/* FOOTER */}
          <footer className="mt-20 pt-6 border-t border-zinc-900 flex flex-wrap justify-between items-center text-xs text-zinc-600 font-mono">
            <div>© {new Date().getFullYear()} Naveed. Enterprise Web Architect.</div>
            <div>Built with Next.js 14 & Tailwind CSS</div>
          </footer>

        </main>
      )}

    </div>
  );
                  }
              
