'use client';

import React, { useState, useEffect, JSX } from 'react';

// === PREMIUM DATA LAYERS FOR E-COMMERCE CONSOLE ===
const PREMIUM_PRODUCTS = [
  { 
    id: "p1", 
    name: "Apex Quantum Dropper v4", 
    tagline: "The speed of light. Now enterprise grade.", 
    price: "$1,299", 
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=600&q=80",
    description: "Our most advanced automated high-frequency liquidity router. Engineered with surgical precision for flawless financial telemetry, quantum-safe data encryption pipelines, and zero-friction execution matrices.", 
    specs: ["99.999% Guaranteed Network Uptime", "Zero-Latency Custom Fiber Routing Cluster", "Multi-Layer Silicon-Level Cryptographic Vault"], 
    badge: "Pro Edition" 
  },
  { 
    id: "p2", 
    name: "Matrix Core Node Pro", 
    tagline: "Neural computing. Decentralized.", 
    price: "$2,450", 
    image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=600&q=80",
    description: "A liquid-cooled hardware computation stack built explicitly for deep learning arrays, local artificial intelligence neural nodes, and complex autonomous algorithmic clustering.", 
    specs: ["256 Terahashes/s Neural Network Core", "Sintered Ceramic Liquid-Cooled Enclosure", "Instant Out-of-the-Box Native API Gateway"], 
    badge: "Limited Drop" 
  }
];

const MENU_ITEMS = [
  { id: 'm1', name: 'Truffle Glazed Prime Burger', category: 'Main', price: 24.00, tag: 'CHEF SPECIAL', image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=80" },
  { id: 'm2', name: 'Smoked Salmon Avocado Crisp', category: 'Starters', price: 18.50, tag: '', image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80" },
  { id: 'm3', name: 'Saffron Infused Risotto Sphere', category: 'Main', price: 29.00, tag: 'CHEF SPECIAL', image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=500&q=80" },
  { id: 'm4', name: 'Artisanal Matcha Espresso Tart', category: 'Desserts', price: 12.00, tag: '', image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=500&q=80" },
];

// === HIGH-TICKET CASE STUDIES DATA ===
const CASE_STUDIES = [
  {
    id: "cs1",
    title: "Veloce Dining Systems",
    category: "Full-Stack Hospitality Suite",
    client: "Veloce Group (USA)",
    tech: ["Next.js 14", "TypeScript", "Tailwind CSS", "WebSockets"],
    metrics: { speed: "0.4s Load", retention: "+38% Orders", uptime: "99.99%" },
    problem: "Legacy order processing caused 15% drop-offs during peak dining hours due to slow telemetry and laggy UI.",
    solution: "Engineered a custom zero-latency interactive menu & real-time courier tracking engine using Next.js App Router.",
    liveUrl: "https://veloce-dining.vercel.app"
  },
  {
    id: "cs2",
    title: "Apex Matrix Storefront",
    category: "High-Frequency B2B Hardware",
    client: "Apex Quantum Technologies",
    tech: ["React 18", "Tailwind CSS", "GraphQL", "Stripe API"],
    metrics: { conversion: "+45% Checkout", lighthouse: "99/100 Score", scale: "10k+ Daily Users" },
    problem: "B2B hardware buyers required dynamic parameter customization with instant price estimation without page reloads.",
    solution: "Developed an ultra-responsive spatial node procurement engine with real-time hardware telemetry simulation.",
    liveUrl: "https://apex-combo-store.vercel.app"
  }
];

// === VERIFIED ENTERPRISE REVIEWS ===
const TESTIMONIALS = [
  {
    quote: "Naveed transformed our outdated portal into a lightning-fast web suite. Our conversion rate jumped by 38% within the first month. Absolutely worth every dollar.",
    author: "Alexander Wright",
    role: "CTO, Veloce Global",
    location: "New York, USA",
    rating: 5,
    value: "$8,500 Project"
  },
  {
    quote: "Exceptional mastery over Next.js and high-end UI/UX. The code structure is cleaner than enterprise teams I've worked with. Delivered 3 days ahead of deadline.",
    author: "Elena Rostova",
    role: "Product Lead, Apex Tech",
    location: "Berlin, Germany",
    rating: 5,
    value: "$6,200 Project"
  }
];
export default function IntegratedPortfolio(): JSX.Element {
  const [activeApp, setActiveApp] = useState<'portfolio' | 'dining' | 'ecommerce'>('portfolio');
  const [activeTab, setActiveTab] = useState<'overview' | 'work' | 'calculator' | 'contact'>('overview');
  
  // DINING CONSOLE STATES
  const [diningTab, setDiningTab] = useState<'home' | 'menu' | 'reservation' | 'tracking' | 'events'>('home');
  const [diningFilter, setDiningFilter] = useState<string>('All');
  const [diningManifest, setDiningManifest] = useState<{ id: string; name: string; price: number }[]>([]);
  const [diningTrackingActive, setDiningTrackingActive] = useState<boolean>(false);
  const [diningLogs, setDiningLogs] = useState<string[]>([]);

  // E-COMMERCE CONSOLE STATES
  const [cartCount, setCartCount] = useState<number>(0);
  const [ecomTab, setEcomTab] = useState<'shop' | 'checkout' | 'tracking'>('shop');
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  
  // FORM & NOTIFICATION STATES
  const [notification, setNotification] = useState<string | null>(null);

  // CASE STUDY & ESTIMATOR STATES
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<string>(CASE_STUDIES[0].id);
  const [projectScope, setProjectScope] = useState<number>(2500);
  const [features, setFeatures] = useState<{ [key: string]: boolean }>({
    auth: true,
    cms: false,
    payments: true,
    analytics: true
  });

  const triggerNotification = (msg: string): void => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  const calculateTotalEstimate = () => {
    let extra = 0;
    if (features.cms) extra += 800;
    if (features.payments) extra += 600;
    if (features.analytics) extra += 500;
    return projectScope + extra;
  };

  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (event.state && event.state.app) {
        setActiveApp(event.state.app);
      } else {
        setActiveApp('portfolio');
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigation = (target: 'portfolio' | 'dining' | 'ecommerce') => {
    setActiveApp(target);
    window.history.pushState({ app: target }, '', '');
  };

  useEffect(() => {
    if (activeApp === 'ecommerce' && ecomTab === 'tracking') {
      setTerminalLogs(["Connecting to global infrastructure telemetry secure layers...", "Handshake validation cleared via Frankfurt-4 Node Core..."]);
      const phrases = ["Hardware node serialization key parsed.", "Secure transaction hash submitted to main terminal network.", "Autonomous vector courier cleared for drone pad takeoff.", "Laser path trajectory initialized. Delivery ETA: Imminent."];
      const timers = phrases.map((phrase, index) => setTimeout(() => setTerminalLogs(prev => [...prev, phrase]), (index + 1) * 1200));
      return () => timers.forEach(clearTimeout);
    }
  }, [activeApp, ecomTab]);

  useEffect(() => {
    if (diningTrackingActive) {
      setDiningLogs(["Order received into secure routing system...", "Kitchen station initialised recipe core vectors..."]);
      const phrases = ["Thermal core validation check complete.", "Dispatching automated local courier unit.", "Veloce telemetry vector transit state: stable.", "Arrived at destination coordinates successfully."];
      const timers = phrases.map((phrase, index) => setTimeout(() => setDiningLogs(prev => [...prev, phrase]), (index + 1) * 1500));
      return () => timers.forEach(clearTimeout);
    } else {
      setDiningLogs([]);
    }
  }, [diningTrackingActive]);

  const filteredDining = diningFilter === 'All' ? MENU_ITEMS : MENU_ITEMS.filter(item => item.category === diningFilter);

  return (
    <div className="min-h-screen bg-[#030712] text-white relative font-sans antialiased text-left selection:bg-yellow-500/30 selection:text-yellow-200">
      
      {/* Background Ambience Luxury Shadows */}
      <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-gradient-to-b from-yellow-500/10 via-amber-500/5 to-transparent rounded-full blur-[140px] pointer-events-none z-0"></div>
      <div className="fixed bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-t from-yellow-500/5 via-orange-500/5 to-transparent rounded-full blur-[160px] pointer-events-none z-0"></div>

      {notification && (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50 bg-zinc-900/90 backdrop-blur-2xl border border-yellow-500/30 text-white px-6 py-3.5 rounded-full text-xs font-medium tracking-wide shadow-[0_0_30px_rgba(234,179,8,0.15)] flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></span>
          <span>{notification}</span>
        </div>
      )}

      {/* ================= VELOCE DINING SUITE PLATFORM ================= */}
      {activeApp === 'dining' && (
        <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans relative z-10">
          <header className="sticky top-0 z-40 bg-black/80 backdrop-blur-md border-b border-zinc-900/80 px-4 py-3 flex flex-wrap items-center justify-between gap-4">
            <button onClick={() => { handleNavigation('portfolio'); setDiningTrackingActive(false); }} className="text-xs font-bold uppercase tracking-wider text-yellow-500 hover:text-yellow-400 transition-all">← Back To Console Deck</button>
            <nav className="flex items-center space-x-1 bg-zinc-900/80 p-1 rounded-xl border border-zinc-800/80">
              {(['home', 'menu', 'reservation', 'tracking', 'events'] as const).map((tab) => (
                <button key={tab} onClick={() => setDiningTab(tab)} className={`px-3 py-1.5 rounded-lg text-xs capitalize font-medium transition-all ${diningTab === tab ? 'bg-zinc-800 text-white border border-zinc-700/50 shadow' : 'text-zinc-500 hover:text-zinc-300'}`}>{tab}</button>
              ))}
            </nav>
            <span className="text-[10px] bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 px-2.5 py-1 rounded-full font-mono uppercase tracking-widest">Veloce Hub v3.0</span>
          </header>

          <main className="max-w-5xl mx-auto px-4 py-12 relative z-10">
            {diningTab === 'home' && (
              <div className="space-y-16">
                <div className="relative h-[420px] rounded-[2.5rem] overflow-hidden bg-cover bg-center flex items-center p-8 sm:p-12 border border-zinc-900 shadow-2xl" style={{ backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.95), rgba(0,0,0,0.4)), url('https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&q=80')` }}>
                  <div className="max-w-xl space-y-4">
                    <span className="text-yellow-500 font-mono text-[10px] tracking-widest uppercase bg-yellow-500/10 border border-yellow-500/20 px-3 py-1 rounded-full">Autonomous Restaurant Framework</span>
                    <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white leading-tight">Culinary Excellence.<br />Routed at Light Speed.</h1>
                    <p className="text-zinc-400 text-sm font-light leading-relaxed">Experience a state-of-the-art interactive digital lounge mapping dynamic molecular dishes with automated secure logistic delivery trackers.</p>
                    <div className="pt-4 flex gap-3">
                      <button onClick={() => setDiningTab('menu')} className="bg-yellow-500 hover:bg-yellow-400 text-black font-semibold text-xs px-5 py-3 rounded-xl shadow-lg shadow-yellow-500/10 transition-all">Explore Smart Menu</button>
                      <button onClick={() => setDiningTab('reservation')} className="backdrop-blur-md bg-zinc-900/60 hover:bg-zinc-800 border border-zinc-800 text-xs px-5 py-3 rounded-xl font-medium transition-all">Book Secure Table</button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {diningTab === 'menu' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  <div className="flex items-center justify-between bg-zinc-900/40 backdrop-blur-md border border-zinc-900 p-4 rounded-2xl shadow-md">
                    <div>
                      <h2 className="text-xl font-bold tracking-tight">Interactive Menu Console</h2>
                      <p className="text-xs text-zinc-500">Select dish logs to allocate variables to live manifest queue</p>
                    </div>
                    <div className="flex gap-1.5">
                      {['All', 'Main', 'Starters', 'Desserts'].map((cat) => (
                        <button key={cat} onClick={() => setDiningFilter(cat)} className={`px-2.5 py-1 rounded text-[11px] font-medium transition-all ${diningFilter === cat ? 'bg-yellow-500 text-black font-bold' : 'bg-zinc-900 border border-zinc-800 text-zinc-400'}`}>{cat}</button>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {filteredDining.map((item) => (
                      <div key={item.id} className="backdrop-blur-xl bg-zinc-900/20 border border-zinc-900 rounded-2xl overflow-hidden hover:border-yellow-500/30 transition-all duration-300 flex flex-col justify-between shadow-lg group">
                        <div className="overflow-hidden h-40 w-full relative border-b border-zinc-900">
                          <img src={item.image} alt={item.name} className="h-full w-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500" />
                        </div>
                        <div className="p-4 flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex justify-between items-start gap-2">
                              <h3 className="text-sm font-bold text-zinc-200 group-hover:text-yellow-400 transition-colors">{item.name}</h3>
                              {item.tag && <span className="text-[7px] font-bold text-amber-400 bg-amber-400/10 border border-amber-400/20 px-1.5 py-0.5 rounded-sm">{item.tag}</span>}
                            </div>
                            <span className="text-[9px] text-zinc-500 font-mono block mt-0.5 uppercase tracking-wider">{item.category}</span>
                          </div>
                          <div className="flex justify-between items-center mt-4 pt-3 border-t border-zinc-900/60">
                            <span className="text-xs font-mono font-bold text-yellow-500">${item.price.toFixed(2)}</span>
                            <button onClick={() => setDiningManifest([...diningManifest, { id: Date.now().toString(), name: item.name, price: item.price }])} className="bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-[10px] font-medium px-2.5 py-1.5 rounded border border-zinc-800 transition-all">+ Add To Manifest</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="backdrop-blur-xl bg-zinc-900/30 border border-zinc-900 rounded-[2rem] p-6 h-fit font-mono shadow-2xl">
                  <div className="flex justify-between items-center mb-4 pb-2 border-b border-zinc-900"><h3 className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">// Transaction Queue</h3><span className="text-[10px] bg-zinc-900 px-2.5 py-0.5 rounded text-yellow-500 border border-zinc-800">{diningManifest.length} Items</span></div>
                  {diningManifest.length === 0 && !diningTrackingActive ? (
                    <p className="text-center py-8 text-[10px] text-zinc-600">Manifest Queue Empty. Awaiting allocation parameters...</p>
                  ) : (
                    <div className="space-y-2 max-h-[220px] overflow-y-auto mb-4 text-xs text-zinc-400 pr-1">
                      {diningManifest.map((itm, idx) => (<div key={idx} className="flex justify-between items-center bg-black/40 p-2.5 rounded-xl border border-zinc-900"><span>&gt; {itm.name}</span><span className="text-yellow-500 font-bold">${itm.price.toFixed(2)}</span></div>))}
                    </div>
                  )}
                  {diningManifest.length > 0 && (
                    <button onClick={() => { triggerNotification("🚀 Secure Routing Protocol Initialized!"); setDiningTrackingActive(true); setDiningTab('tracking'); setDiningManifest([]); }} className="w-full bg-yellow-500 hover:bg-yellow-400 text-black text-[10px] font-bold py-3.5 rounded-xl uppercase tracking-wider transition-all shadow-lg shadow-yellow-500/10">Initialize Secure Checkout</button>
                  )}
                </div>
              </div>
            )}
            
            {diningTab === 'tracking' && (
              <div className="max-w-xl mx-auto space-y-6">
                <div className="bg-zinc-900/40 border border-zinc-900 backdrop-blur-xl rounded-[2rem] p-6 font-mono text-xs shadow-2xl">
                  <div className="flex items-center justify-between mb-4"><div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-yellow-500 animate-ping"></span><h4 className="text-[11px] uppercase font-bold tracking-wider text-zinc-400">Live Courier Tracking Pipeline</h4></div><span className="text-[9px] text-zinc-600 font-mono">SECURE LINK STATUS: ACTIVE</span></div>
                  <div className="space-y-2.5 bg-black/60 p-4 rounded-xl border border-zinc-900 max-h-[220px] overflow-y-auto text-zinc-400">
                    {diningLogs.length === 0 ? <p className="text-zinc-600 text-[11px] text-center py-4">No data package active in pipeline. Initialize checkout on menu page first.</p> : diningLogs.map((log, index) => (<p key={index}>&gt; [TRAFFIC-LOG] {log}</p>))}
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      )}

      {/* ================= APEX MATRIX E-COMMERCE CONSOLE ================= */}
      {activeApp === 'ecommerce' && (
        <div className="min-h-screen bg-black text-[#f5f5f7] font-sans relative z-10">
          <header className="sticky top-0 z-40 bg-black/70 backdrop-blur-xl border-b border-zinc-900/50 px-6 lg:px-16 py-4 flex items-center justify-between">
            <button onClick={() => handleNavigation('portfolio')} className="text-xs font-bold uppercase tracking-wider text-zinc-400 hover:text-white transition-all">← Return to Terminal Deck</button>
            <nav className="flex bg-zinc-900/40 border border-zinc-800/60 p-1 rounded-full">
              <button onClick={() => setEcomTab('shop')} className={`px-5 py-1.5 rounded-full text-xs transition-all ${ecomTab === 'shop' ? 'bg-yellow-500 text-black font-semibold' : 'text-zinc-400'}`}>Store Grid</button>
              <button onClick={() => setEcomTab('checkout')} className={`px-5 py-1.5 rounded-full text-xs transition-all ${ecomTab === 'checkout' ? 'bg-yellow-500 text-black font-semibold' : 'text-zinc-400'}`}>Authorization</button>
            </nav>
            <div className="relative bg-zinc-900/60 border border-zinc-800 w-9 h-9 rounded-full flex items-center justify-center text-xs"><span>⚡</span>{cartCount > 0 && <span className="absolute -top-0.5 -right-0.5 bg-yellow-500 text-black font-mono text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-lg">{cartCount}</span>}</div>
          </header>
          <main className="max-w-5xl mx-auto px-6 py-16">
            {ecomTab === 'shop' && (
              <div className="space-y-16">
                <div className="text-center max-w-2xl mx-auto">
                  <h1 className="text-4xl lg:text-5xl font-semibold tracking-tight text-white mb-5 leading-[1.15]">Tomorrow's Core Hardware. <br /><span className="text-transparent bg-clip-text bg-gradient-to-b from-zinc-100 via-zinc-400 to-zinc-600">Available for allocation today.</span></h1>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                  {PREMIUM_PRODUCTS.map((product) => (
                    <div key={product.id} className="bg-gradient-to-b from-zinc-950 to-black border border-zinc-900 hover:border-yellow-500/20 rounded-[2.5rem] p-6 sm:p-8 flex flex-col justify-between shadow-2xl transition-all duration-300">
                      <div>
                        <div className="w-full h-56 overflow-hidden rounded-2xl mb-6 border border-zinc-900">
                          <img src={product.image} alt={product.name} className="w-full h-full object-cover opacity-60" />
                        </div>
                        <h3 className="text-2xl font-medium text-white tracking-tight mb-1">{product.name}</h3>
                        <p className="text-zinc-400 text-xs leading-relaxed mb-6 font-light">{product.description}</p>
                      </div>
                      <button onClick={() => { setCartCount(c => c + 1); triggerNotification(`Allocated ${product.name} to cart.`); }} className="w-full bg-[#f5f5f7] hover:bg-white text-black font-semibold text-xs py-4 rounded-2xl shadow-lg transition-all">Request Hardware Allocation</button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </main>
        </div>
      )}

      {/* ================= MAIN HIGH-TICKET ENTERPRISE PORTFOLIO DECK ================= */}
      {activeApp === 'portfolio' && (
        <main className="max-w-6xl mx-auto px-6 py-8 relative z-10">

          {/* HEADER / NAVIGATION */}
          <header className="flex flex-wrap justify-between items-center gap-4 mb-16 pb-6 border-b border-zinc-900">
            <div className="flex items-center gap-3">
              <span className="text-2xl font-black bg-gradient-to-r from-yellow-400 via-amber-300 to-amber-500 bg-clip-text text-transparent font-mono tracking-wider">
                Naveed.dev
              </span>
              <span className="text-[9px] font-mono font-bold bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 px-2.5 py-1 rounded-full uppercase tracking-widest">
                Senior Full-Stack Engineer
              </span>
            </div>

            <nav className="flex items-center gap-1 bg-zinc-900/80 p-1.5 rounded-full border border-zinc-800/80 backdrop-blur-xl">
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'work', label: 'Case Studies' },
                { id: 'calculator', label: 'Project Estimator' },
                { id: 'contact', label: 'Book Call' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 ${
                    activeTab === tab.id 
                      ? 'bg-yellow-500 text-black shadow-lg shadow-yellow-500/20 font-bold' 
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <a 
                href="https://api.whatsapp.com/send?phone=923103273904" 
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 text-xs font-semibold rounded-full bg-zinc-900 border border-zinc-800 text-zinc-200 hover:border-emerald-500/50 hover:text-emerald-400 transition-all flex items-center gap-2"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>WhatsApp</span>
              </a>
              <a 
                href="mailto:na0953237@gmail.com"
                className="px-4 py-2 text-xs font-bold rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 hover:bg-yellow-500 hover:text-black transition-all"
              >
                ✉️ Email Me
              </a>
            </div>
          </header>

          {/* TAB 1: OVERVIEW HERO */}
          {activeTab === 'overview' && (
            <div className="space-y-20">
              <section className="text-center max-w-4xl mx-auto space-y-8 pt-4">
                <div className="inline-flex items-center gap-2 bg-zinc-900/90 border border-zinc-800 px-4 py-1.5 rounded-full text-xs font-mono text-zinc-300 shadow-xl">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  <span>Available for High-Ticket Contracts ($3,000 - $10,000)</span>
                </div>

                <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight leading-[1.1]">
                  Engineering Enterprise-Grade <br />
                  <span className="bg-gradient-to-r from-yellow-400 via-amber-300 to-orange-500 bg-clip-text text-transparent">
                    Web Platforms & Apps
                  </span>
                </h1>

                <p className="text-zinc-400 text-base sm:text-lg max-w-2xl mx-auto font-light leading-relaxed">
                  I help funded startups and luxury brands build high-converting web applications, micro-saas tools, and custom dynamic dashboards with zero-latency performance.
                </p>

                {/* LIGHTHOUSE METRICS */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto pt-2">
                  {[
                    { label: "Performance", score: "100/100" },
                    { label: "Accessibility", score: "100/100" },
                    { label: "Best Practices", score: "100/100" },
                    { label: "SEO Optimized", score: "100/100" }
                  ].map((m, idx) => (
                    <div key={idx} className="bg-zinc-900/40 border border-zinc-800/80 p-4 rounded-2xl text-center backdrop-blur-md">
                      <span className="text-xl font-bold font-mono block text-emerald-400">{m.score}</span>
                      <span className="text-[10px] text-zinc-500 uppercase tracking-widest block mt-1">{m.label}</span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-center gap-4 pt-4">
                  <button onClick={() => setActiveTab('calculator')} className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold text-xs px-8 py-4 rounded-xl shadow-xl shadow-yellow-500/10 transition-all uppercase tracking-wider">
                    Estimate Project Cost →
                  </button>
                  <button onClick={() => setActiveTab('work')} className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-white font-semibold text-xs px-8 py-4 rounded-xl transition-all uppercase tracking-wider">
                    Explore Case Studies
                  </button>
                </div>
              </section>

              {/* LIVE APPS & CONSOLES SHOWCASE */}
              <section className="space-y-8">
                <div className="text-center">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-yellow-500 bg-yellow-500/10 border border-yellow-500/20 px-3 py-1 rounded-full">
                    Interactive Portfolio Engines
                  </span>
                  <h2 className="text-3xl font-bold text-white mt-3">Live Enterprise Demonstrations</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* APP 1: VELOCE DINING */}
                  <div className="p-8 backdrop-blur-xl bg-zinc-900/30 border border-zinc-800/80 hover:border-yellow-500/30 rounded-3xl transition-all flex flex-col justify-between gap-6 shadow-2xl">
                    <div>
                      <div className="flex justify-between items-start"><h3 className="text-xl font-bold text-white">Veloce Dining Systems</h3><span className="text-[10px] font-mono bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 px-2.5 py-1 rounded">LIVE SIMULATION</span></div>
                      <p className="text-xs text-zinc-400 mt-3 font-light leading-relaxed">Interactive digital restaurant concierge with menu filters, dynamic state reservation checkout, and live vector tracking logs.</p>
                    </div>
                    <div className="flex gap-3">
                      <button onClick={() => { handleNavigation('dining'); setDiningTab('home'); }} className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-semibold px-5 py-2.5 rounded-xl text-yellow-500 transition-all">Launch Console Demo</button>
                      <a href="https://veloce-dining.vercel.app" target="_blank" rel="noopener noreferrer" className="bg-yellow-500 hover:bg-yellow-400 text-black text-xs font-bold px-5 py-2.5 rounded-xl transition-all">Live Vercel Site 🚀</a>
                    </div>
                  </div>

                  {/* APP 2: APEX MATRIX STORE */}
                  <div className="p-8 backdrop-blur-xl bg-zinc-900/30 border border-zinc-800/80 hover:border-yellow-500/30 rounded-3xl transition-all flex flex-col justify-between gap-6 shadow-2xl">
                    <div>
                      <div className="flex justify-between items-start"><h3 className="text-xl font-bold text-white">Apex Matrix Storefront</h3><span className="text-[10px] font-mono bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 px-2.5 py-1 rounded">UX SHOWCASE</span></div>
                      <p className="text-xs text-zinc-400 mt-3 font-light leading-relaxed">High-end B2B hardware storefront featuring parameter allocation, cart tracking, and secure network infrastructure authorization.</p>
                    </div>
                    <div className="flex gap-3">
                      <button onClick={() => { handleNavigation('ecommerce'); setEcomTab('shop'); }} className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-semibold px-5 py-2.5 rounded-xl text-yellow-500 transition-all">Launch Console Demo</button>
                      <a href="https://apex-combo-store.vercel.app" target="_blank" rel="noopener noreferrer" className="bg-yellow-500 hover:bg-yellow-400 text-black text-xs font-bold px-5 py-2.5 rounded-xl transition-all">Live Vercel Site 🚀</a>
                    </div>
                  </div>

                  {/* APP 3: AI BLOG WRITER */}
                  <div className="p-8 backdrop-blur-xl bg-zinc-900/30 border border-zinc-800/80 hover:border-yellow-500/30 rounded-3xl transition-all flex flex-col justify-between gap-6 shadow-2xl">
                    <div>
                      <div className="flex justify-between items-start"><h3 className="text-xl font-bold text-white">AI Blog Writer</h3><span className="text-[10px] font-mono bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 px-2.5 py-1 rounded">AI CORE PLATFORM</span></div>
                      <p className="text-xs text-zinc-400 mt-3 font-light leading-relaxed">Autonomous artificial intelligence platform engineered to parse text data streams and build technical content layouts seamlessly.</p>
                    </div>
                    <a href="https://aiblogwriter.vercel.app" target="_blank" rel="noopener noreferrer" className="w-fit bg-yellow-500 hover:bg-yellow-400 text-black text-xs font-bold px-6 py-2.5 rounded-xl transition-all block">Launch Live Platform 🚀</a>
                  </div>
                </div>
              </section>

              {/* REVIEWS SECTION */}
              <section className="space-y-8">
                <div className="text-center">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-yellow-500 bg-yellow-500/10 border border-yellow-500/20 px-3 py-1 rounded-full">
                    Client Validation & Reviews
                  </span>
                  <h2 className="text-3xl font-bold text-white mt-3">Trusted by Global CTOs</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {TESTIMONIALS.map((review, i) => (
                    <div key={i} className="bg-gradient-to-b from-zinc-900/60 to-zinc-950 border border-zinc-800/80 p-8 rounded-3xl space-y-6 backdrop-blur-xl">
                      <div className="flex justify-between items-center">
                        <div className="flex gap-1 text-yellow-400 text-sm">{"★".repeat(review.rating)}</div>
                        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-2.5 py-1 rounded-full font-bold">{review.value}</span>
                      </div>
                      <p className="text-xs text-zinc-300 italic font-light leading-relaxed">"{review.quote}"</p>
                      <div className="border-t border-zinc-800/80 pt-4 flex justify-between items-center">
                        <div>
                          <h4 className="text-xs font-bold text-white">{review.author}</h4>
                          <p className="text-[10px] text-zinc-500">{review.role} • {review.location}</p>
                        </div>
                        <span className="text-[10px] font-mono text-zinc-600">VERIFIED</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}

          {/* TAB 2: DETAILED CASE STUDIES */}
          {activeTab === 'work' && (
            <div className="space-y-12">
              <div className="border-b border-zinc-900 pb-6">
                <h2 className="text-3xl font-bold text-white">Enterprise Case Studies</h2>
                <p className="text-xs text-zinc-500 mt-1">Detailed technical architecture and business outcome breakdowns</p>
              </div>

              <div className="grid lg:grid-cols-3 gap-8">
                <div className="space-y-3">
                  {CASE_STUDIES.map((cs) => (
                    <button
                      key={cs.id}
                      onClick={() => setSelectedCaseStudy(cs.id)}
                      className={`w-full text-left p-5 rounded-2xl border transition-all ${
                        selectedCaseStudy === cs.id ? 'bg-zinc-900 border-yellow-500/50 shadow-lg' : 'bg-zinc-950 border-zinc-900 text-zinc-500 hover:text-zinc-300'
                      }`}
                    >
                      <span className="text-[10px] font-mono text-yellow-500 uppercase tracking-widest block mb-1">{cs.category}</span>
                      <h3 className="text-sm font-bold text-white">{cs.title}</h3>
                      <p className="text-[11px] text-zinc-500 mt-1">{cs.client}</p>
                    </button>
                  ))}
                </div>

                {(() => {
                  const cs = CASE_STUDIES.find(c => c.id === selectedCaseStudy)!;
                  return (
                    <div className="lg:col-span-2 bg-zinc-900/40 border border-zinc-800/80 p-8 rounded-3xl space-y-8 backdrop-blur-xl">
                      <div className="flex flex-wrap justify-between items-start gap-4 pb-6 border-b border-zinc-800">
                        <div>
                          <span className="text-xs font-mono text-yellow-500">{cs.category}</span>
                          <h2 className="text-2xl font-bold text-white mt-1">{cs.title}</h2>
                        </div>
                        <a href={cs.liveUrl} target="_blank" rel="noopener noreferrer" className="bg-yellow-500 hover:bg-yellow-400 text-black text-xs font-bold px-5 py-2.5 rounded-xl shadow-lg transition-all">Launch Production App 🚀</a>
                      </div>

                      <div className="grid grid-cols-3 gap-4 font-mono">
                        {Object.entries(cs.metrics).map(([k, v], idx) => (
                          <div key={idx} className="bg-black/40 border border-zinc-800 p-4 rounded-xl text-center">
                            <span className="text-xs text-zinc-500 uppercase block mb-1">{k}</span>
                            <span className="text-sm font-bold text-yellow-400">{v}</span>
                          </div>
                        ))}
                      </div>

                      <div className="space-y-4 text-xs leading-relaxed">
                        <div>
                          <h4 className="font-mono text-zinc-400 uppercase tracking-wider mb-1">// The Business Challenge</h4>
                          <p className="text-zinc-300 font-light">{cs.problem}</p>
                        </div>
                        <div>
                          <h4 className="font-mono text-zinc-400 uppercase tracking-wider mb-1">// Technical Solution</h4>
                          <p className="text-zinc-300 font-light">{cs.solution}</p>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>
          )}

          {/* TAB 3: PROJECT CALCULATOR */}
          {activeTab === 'calculator' && (
            <div className="max-w-2xl mx-auto bg-zinc-900/40 border border-zinc-800/80 p-8 sm:p-10 rounded-3xl backdrop-blur-2xl space-y-8 shadow-2xl">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-yellow-500 bg-yellow-500/10 border border-yellow-500/20 px-3 py-1 rounded-full">
                  Interactive Budget Calculator
                </span>
                <h2 className="text-3xl font-bold text-white mt-3 tracking-tight">Configure Your Project Scope</h2>
                <p className="text-xs text-zinc-400 mt-1 font-light">Get an immediate estimate for high-end web development.</p>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-mono uppercase text-zinc-400 block">// 1. Select Base Application Scope</label>
                <div className="grid sm:grid-cols-3 gap-3">
                  {[
                    { name: "SaaS / Dashboard", cost: 2500 },
                    { name: "Luxury E-Commerce", cost: 3500 },
                    { name: "Custom Enterprise", cost: 5000 }
                  ].map((type) => (
                    <button
                      key={type.name}
                      onClick={() => setProjectScope(type.cost)}
                      className={`p-4 rounded-2xl border text-left text-xs transition-all ${
                        projectScope === type.cost ? 'bg-yellow-500/10 border-yellow-500 text-yellow-400 font-bold' : 'bg-black/40 border-zinc-800 text-zinc-400'
                      }`}
                    >
                      <div>{type.name}</div>
                      <div className="font-mono text-[10px] mt-1 text-zinc-500">From ${type.cost}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-mono uppercase text-zinc-400 block">// 2. Additional Core Modules</label>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  {[
                    { key: "cms", label: "Headless CMS Integration", price: "+$800" },
                    { key: "payments", label: "Stripe / Crypto Payments", price: "+$600" },
                    { key: "analytics", label: "Real-time Analytics", price: "+$500" }
                  ].map((item) => (
                    <label key={item.key} className="flex items-center gap-3 bg-black/40 border border-zinc-800 p-3.5 rounded-xl cursor-pointer">
                      <input
                        type="checkbox"
                        checked={features[item.key]}
                        onChange={(e) => setFeatures({ ...features, [item.key]: e.target.checked })}
                        className="accent-yellow-500 rounded"
                      />
                      <div>
                        <div className="text-zinc-200 text-[11px]">{item.label}</div>
                        <div className="text-[9px] font-mono text-yellow-500">{item.price}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="bg-black/60 border border-zinc-800 p-6 rounded-2xl flex flex-wrap justify-between items-center gap-4">
                <div>
                  <span className="text-[10px] font-mono text-zinc-500 uppercase block">Estimated Contract Value</span>
                  <span className="text-3xl font-mono font-bold text-yellow-400">${calculateTotalEstimate()} USD</span>
                </div>
                <button
                  onClick={() => {
                    triggerNotification(`Estimate $${calculateTotalEstimate()} copied! Redirecting to booking...`);
                    setActiveTab('contact');
                  }}
                  className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold text-xs px-6 py-3.5 rounded-xl transition-all uppercase"
                >
                  Book Call For This Estimate →
                </button>
              </div>
            </div>
          )}

          {/* TAB 4: DIRECT BOOKING */}
          {activeTab === 'contact' && (
            <div className="max-w-xl mx-auto space-y-8 text-center bg-zinc-900/40 border border-zinc-800/80 p-10 rounded-3xl backdrop-blur-2xl">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-3 py-1 rounded-full">
                  High-Priority Scheduling
                </span>
                <h2 className="text-3xl font-bold text-white mt-3">Book A 15-Minute Technical Call</h2>
                <p className="text-xs text-zinc-400 mt-2 font-light">Discuss your project scope, architecture requirements, and timeline directly.</p>
              </div>

              <div className="space-y-4 text-left font-mono text-xs">
                <a 
                  href="https://api.whatsapp.com/send?phone=923103273904&text=Hi%20Naveed,%20I%20want%20to%20discuss%20a%20high-ticket%20web%20project." 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500 hover:text-black p-4 rounded-2xl flex items-center justify-center gap-3 font-bold transition-all"
                >
                  💬 Instant WhatsApp Technical Chat (+923103273904)
                </a>

                <a 
                  href="mailto:na0953237@gmail.com?subject=Enterprise%20Project%20Inquiry"
                  className="w-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 hover:bg-yellow-500 hover:text-black p-4 rounded-2xl flex items-center justify-center gap-3 font-bold transition-all"
                >
                  ✉️ Send Detailed RFP / Brief via Email
                </a>
              </div>

              <div className="pt-4 border-t border-zinc-800/80 text-[10px] text-zinc-500 font-mono">
                GUARANTEED RESPONSE TIME: WITHIN 2 HOURS (EST & GMT TIMEZONES)
              </div>
            </div>
          )}

          {/* FOOTER */}
          <footer className="mt-24 pt-8 border-t border-zinc-900 flex flex-wrap justify-between items-center text-xs text-zinc-600 font-mono">
            <div>© {new Date().getFullYear()} Naveed. All rights reserved.</div>
            <div>Built with Next.js 14, TypeScript & Tailwind CSS</div>
          </footer>

        </main>
      )}
