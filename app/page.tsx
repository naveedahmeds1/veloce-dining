'use client';

import React, { useState, useEffect, JSX } from 'react';

// === INTERNATIONAL MULTI-CURRENCY CONVERTOR ===
type Currency = 'USD' | 'EUR' | 'GBP' | 'PKR';

const CURRENCY_RATES: Record<Currency, { symbol: string; rate: number }> = {
  USD: { symbol: '$', rate: 1 },  EUR: { symbol: '€', rate: 0.92 },
  GBP: { symbol: '£', rate: 0.78 },
  PKR: { symbol: 'Rs ', rate: 278 }
};

// === PREMIUM DATA LAYERS FOR E-COMMERCE ===
const PREMIUM_PRODUCTS = [
  { 
    id: "p1", 
    name: "Apex Quantum Dropper v4", 
    tagline: "The speed of light. Now enterprise grade.", 
    priceUSD: 1299, 
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=600&q=80",
    description: "Our most advanced automated high-frequency liquidity router. Engineered with surgical precision for flawless financial telemetry, quantum-safe data encryption pipelines, and zero-friction execution matrices.", 
    specs: ["99.999% Guaranteed Network Uptime", "Zero-Latency Custom Fiber Routing Cluster", "Multi-Layer Silicon-Level Cryptographic Vault"], 
    badge: "Pro Edition" 
  },
  { 
    id: "p2", 
    name: "Matrix Core Node Pro", 
    tagline: "Neural computing. Decentralized.", 
    priceUSD: 2450, 
    image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=600&q=80",
    description: "A liquid-cooled hardware computation stack built explicitly for deep learning arrays, local artificial intelligence neural nodes, and complex autonomous algorithmic clustering.", 
    specs: ["256 Terahashes/s Neural Network Core", "Sintered Ceramic Liquid-Cooled Enclosure", "Instant Out-of-the-Box Native API Gateway"], 
    badge: "Limited Drop" 
  }
];

// === ENHANCED VELOCE RESTAURANT DISHES & PLATTERS ===
const MENU_ITEMS = [
  { id: 'm1', name: 'Truffle Glazed Prime Burger', category: 'Main', priceUSD: 24.00, tag: 'CHEF SPECIAL', image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=80", desc: "Aged Wagyu patty with black truffle aioli & caramelized shallots." },
  { id: 'm2', name: 'Smoked Salmon Avocado Crisp', category: 'Starters', priceUSD: 18.50, tag: 'ORGANIC', image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80", desc: "Fresh Norwegian salmon on sourdough sourdough crisp." },
  { id: 'm3', name: 'Saffron Infused Risotto Sphere', category: 'Main', priceUSD: 29.00, tag: 'BESTSELLER', image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=500&q=80", desc: "Wild mushroom risotto spheres laced with gold leaf flakes." },
  { id: 'm4', name: 'Artisanal Matcha Espresso Tart', category: 'Desserts', priceUSD: 12.00, tag: 'SWEET SELECTION', image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=500&q=80", desc: "Uji matcha cream paired with dark espresso crust." },
  { id: 'm5', name: 'Royal Grand Seafood Platter', category: 'Platters', priceUSD: 85.00, tag: 'SPECIAL OFFER', image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=500&q=80", desc: "Lobster tail, jumbo tiger prawns, grilled octopus & caviar." },
  { id: 'm6', name: 'Sizzling Smoked BBQ Feast Platter', category: 'Platters', priceUSD: 65.00, tag: 'SPECIAL OFFER', image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=500&q=80", desc: "Slow-roasted ribs, beef brisket, artisanal sausages & sides." }
];

export default function IntegratedPortfolio(): JSX.Element {
  const [activeApp, setActiveApp] = useState<'portfolio' | 'dining' | 'ecommerce'>('portfolio');
  const [currency, setCurrency] = useState<Currency>('USD');
  
  // Dining State Engine
  const [diningTab, setDiningTab] = useState<'home' | 'menu' | 'reservation' | 'calculator' | 'tracking' | 'events'>('home');
  const [diningFilter, setDiningFilter] = useState<string>('All');
  const [diningManifest, setDiningManifest] = useState<{ id: string; name: string; priceUSD: number; qty: number }[]>([]);
  const [diningTrackingActive, setDiningTrackingActive] = useState<boolean>(false);
  const [deliveryMode, setDeliveryMode] = useState<'pod' | 'drone'>('pod');
  const [countdown, setCountdown] = useState<number>(840); // 14 mins in seconds
  const [diningLogs, setDiningLogs] = useState<string[]>([]);
  
  // Reservation Form State
  const [resData, setResData] = useState({ name: '', classTier: 'business', date: '', time: '', guests: '2' });

  // Storefront & General State
  const [cartCount, setCartCount] = useState<number>(0);
  const [ecomTab, setEcomTab] = useState<'shop' | 'checkout' | 'tracking'>('shop');
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const [notification, setNotification] = useState<string | null>(null);

  const formatPrice = (priceInUSD: number) => {
    const { symbol, rate } = CURRENCY_RATES[currency];
    const converted = (priceInUSD * rate).toFixed(currency === 'PKR' ? 0 : 2);
    return `${symbol}${converted}`;
  };

  const triggerNotification = (msg: string): void => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  const handleNavigation = (target: 'portfolio' | 'dining' | 'ecommerce') => {
    setActiveApp(target);
    window.history.pushState({ app: target }, '', '');
  };

  // Delivery Timer Effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (diningTrackingActive && countdown > 0) {
      interval = setInterval(() => setCountdown(prev => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [diningTrackingActive, countdown]);

  // Telemetry logs for Veloce Tracking
  useEffect(() => {
    if (diningTrackingActive) {
      setDiningLogs(["Order dispatched from Kitchen Node A...", "Thermal freshness lock verified."]);
      const phrases = [
        "Veloce Courier assigned: Captain Tariq Khan (Pod #EL-904).",
        "Route optimization cleared via Smart Fiber Traffic Layer.",
        "Proximity sensor engaged: 2.1 km to coordinates.",
        "Drone Auto-Pilot Lock: Target Pad Landing Clearance Approved."
      ];
      const timers = phrases.map((phrase, index) => 
        setTimeout(() => setDiningLogs(prev => [...prev, phrase]), (index + 1) * 2000)
      );
      return () => timers.forEach(clearTimeout);
    }
  }, [diningTrackingActive]);

  // Ecom Telemetry
  useEffect(() => {
    if (activeApp === 'ecommerce' && ecomTab === 'tracking') {
      setTerminalLogs(["Connecting to global infrastructure telemetry secure layers...", "Handshake validation cleared via Frankfurt-4 Node Core..."]);
      const phrases = ["Hardware node serialization key parsed.", "Secure transaction hash submitted to main terminal network.", "Autonomous vector courier cleared for drone pad takeoff.", "Laser path trajectory initialized."];
      const timers = phrases.map((phrase, index) => setTimeout(() => setTerminalLogs(prev => [...prev, phrase]), (index + 1) * 1200));
      return () => timers.forEach(clearTimeout);
    }
  }, [activeApp, ecomTab]);

  // Platter Calculator Totals
  const calcSubtotal = diningManifest.reduce((acc, item) => acc + (item.priceUSD * item.qty), 0);
  const calcTax = calcSubtotal * 0.08;
  const calcDelivery = calcSubtotal > 0 ? 5.00 : 0;
  const calcGrandTotal = calcSubtotal + calcTax + calcDelivery;

  const filteredDining = diningFilter === 'All' ? MENU_ITEMS : MENU_ITEMS.filter(item => item.category === diningFilter);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-[#030712] text-white relative font-sans antialiased selection:bg-yellow-500/30">
      
      {/* GLOBAL NOTIFICATION BAR */}
      {notification && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-zinc-900/90 backdrop-blur-xl border border-yellow-500/40 text-white px-6 py-3 rounded-full text-xs font-medium tracking-wide shadow-2xl flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></span>
          <span>{notification}</span>
        </div>
      )}

      {/* ================= MAIN PORTFOLIO DASHBOARD ================= */}
      {activeApp === 'portfolio' && (
        <div className="max-w-6xl mx-auto px-6 py-12 relative z-10">
          <header className="flex flex-wrap justify-between items-center pb-12 border-b border-zinc-900 gap-4">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-white">Full-Stack Digital Systems</h1>
              <p className="text-zinc-500 text-xs mt-1 font-mono uppercase tracking-widest">Enterprise Web Applications & Architecture</p>
            </div>
            
            {/* Currency Selector */}
            <div className="flex items-center gap-2 bg-zinc-900/80 p-1 rounded-xl border border-zinc-800">
              {(['USD', 'EUR', 'GBP', 'PKR'] as Currency[]).map((curr) => (
                <button key={curr} onClick={() => setCurrency(curr)} className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all ${currency === curr ? 'bg-yellow-500 text-black shadow-md' : 'text-zinc-400 hover:text-white'}`}>{curr}</button>
              ))}
            </div>
          </header>

          <main className="py-12 space-y-12">
            <section>
              <h2 className="text-sm font-mono text-yellow-500 uppercase tracking-widest mb-6">// Active Deployment Showcase</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* CARD 1: VELOCE DINING DEMO (CONSOLE ONLY) */}
                <div className="p-6 sm:p-8 backdrop-blur-xl bg-zinc-900/30 border border-zinc-800/80 hover:border-yellow-500/30 hover:shadow-[0_0_40px_rgba(234,179,8,0.04)] rounded-3xl transition-all duration-300 flex flex-col justify-between gap-6 group shadow-2xl">
                  <div>
                    <div className="flex justify-between items-start">
                      <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-yellow-400 transition-colors">Veloce Dining Systems</h3>
                      <span className="text-[10px] font-mono bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 px-2.5 py-1 rounded">INTERACTIVE CONSOLE</span>
                    </div>
                    <p className="text-sm text-zinc-400 mt-3 font-light leading-relaxed">Autonomous luxury culinary web app featuring real-time telemetry tracking, driver details, live countdowns, tier-based reservations & platter calculators.</p>
                  </div>
                  <button onClick={() => handleNavigation('dining')} className="w-fit bg-yellow-500 hover:bg-yellow-400 text-black text-xs font-semibold px-5 py-2.5 rounded-xl transition-all block shadow-md">
                    Launch Interactive Demo →
                  </button>
                </div>

                {/* CARD 2: VELOCE DINING LIVE PLATFORM PORTAL */}
                <div className="p-6 sm:p-8 backdrop-blur-xl bg-zinc-900/30 border border-zinc-800/80 hover:border-yellow-500/30 hover:shadow-[0_0_40px_rgba(234,179,8,0.04)] rounded-3xl transition-all duration-300 flex flex-col justify-between gap-6 group shadow-2xl">
                  <div>
                    <div className="flex justify-between items-start">
                      <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-yellow-400 transition-colors">Veloce Dining Live Portal</h3>
                      <span className="text-[10px] font-mono bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-2.5 py-1 rounded">PRODUCTION LIVE</span>
                    </div>
                    <p className="text-sm text-zinc-400 mt-3 font-light leading-relaxed">Production-ready environment deployed on Vercel infrastructure with responsive UX assets and modular architecture.</p>
                  </div>
                  <a href="https://veloce-dining.vercel.app" target="_blank" rel="noopener noreferrer" className="w-fit bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-xs font-semibold px-5 py-2.5 rounded-xl text-yellow-500 text-center transition-all block shadow-md">
                    Visit Live Site ↗
                  </a>
                </div>

                {/* CARD 3: APEX MATRIX STOREFRONT (CONSOLE ONLY - NO EXTERNAL LINK) */}
                <div className="p-6 sm:p-8 backdrop-blur-xl bg-zinc-900/30 border border-zinc-800/80 hover:border-yellow-500/30 hover:shadow-[0_0_40px_rgba(234,179,8,0.04)] rounded-3xl transition-all duration-300 flex flex-col justify-between gap-6 group shadow-2xl">
                  <div>
                    <div className="flex justify-between items-start">
                      <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-yellow-400 transition-colors">Apex Hardware Storefront</h3>
                      <span className="text-[10px] font-mono bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 px-2.5 py-1 rounded">INTERACTIVE CONSOLE</span>
                    </div>
                    <p className="text-sm text-zinc-400 mt-3 font-light leading-relaxed">Surgically engineered luxury tech storefront with live hardware allocation pipelines, currency switching, and encrypted telemetry logs.</p>
                  </div>
                  <button onClick={() => handleNavigation('ecommerce')} className="w-fit bg-yellow-500 hover:bg-yellow-400 text-black text-xs font-semibold px-5 py-2.5 rounded-xl transition-all block shadow-md">
                    Explore Platform Console →
                  </button>
                </div>

                {/* CARD 4: AI BLOG WRITER */}
                <div className="p-6 sm:p-8 backdrop-blur-xl bg-zinc-900/30 border border-zinc-800/80 hover:border-yellow-500/30 hover:shadow-[0_0_40px_rgba(234,179,8,0.04)] rounded-3xl transition-all duration-300 flex flex-col justify-between gap-6 group shadow-2xl">
                  <div>
                    <div className="flex justify-between items-start">
                      <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-yellow-400 transition-colors">AI Blog Writer</h3>
                      <span className="text-[10px] font-mono bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 px-2.5 py-1 rounded">AI CORE PLATFORM</span>
                    </div>
                    <p className="text-sm text-zinc-400 mt-3 font-light leading-relaxed">An autonomous artificial intelligence platform engineered to parse text data streams and build technical layouts seamlessly.</p>
                  </div>
                  <a href="https://aiblogwriter.vercel.app" target="_blank" rel="noopener noreferrer" className="w-fit bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-xs font-semibold px-5 py-2.5 rounded-xl text-yellow-500 text-center transition-all block shadow-md">
                    Launch AI App ↗
                  </a>
                </div>

              </div>
            </section>
          </main>
        </div>
      )}

      {/* ================= VELOCE RESTAURANT & DINING SYSTEM ================= */}
      {activeApp === 'dining' && (
        <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans relative z-10">
          <header className="sticky top-0 z-40 bg-black/80 backdrop-blur-md border-b border-zinc-900/80 px-6 py-3 flex flex-wrap items-center justify-between gap-4">
            <button onClick={() => { handleNavigation('portfolio'); setDiningTrackingActive(false); }} className="text-xs font-bold uppercase tracking-wider text-yellow-500 hover:text-yellow-400 transition-all">← Back To Console Deck</button>
            <nav className="flex items-center space-x-1 bg-zinc-900/80 p-1 rounded-xl border border-zinc-800/80">
              {(['home', 'menu', 'calculator', 'reservation', 'tracking', 'events'] as const).map((tab) => (
                <button key={tab} onClick={() => setDiningTab(tab)} className={`px-3 py-1.5 rounded-lg text-xs capitalize font-medium transition-all ${diningTab === tab ? 'bg-yellow-500 text-black font-bold shadow' : 'text-zinc-400 hover:text-zinc-200'}`}>{tab}</button>
              ))}
            </nav>
            <span className="text-[10px] bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 px-2.5 py-1 rounded-full font-mono uppercase tracking-widest">Veloce Suite v4.0</span>
          </header>

          <main className="max-w-6xl mx-auto px-6 py-10 relative z-10">
            {/* TAB: HOME */}
            {diningTab === 'home' && (
              <div className="space-y-12">
                <div className="relative h-[450px] rounded-[2.5rem] overflow-hidden bg-cover bg-center flex items-center p-8 sm:p-12 border border-zinc-900 shadow-2xl" style={{ backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.95), rgba(0,0,0,0.3)), url('https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&q=80')` }}>
                  <div className="max-w-xl space-y-4">
                    <span className="text-yellow-500 font-mono text-[10px] tracking-widest uppercase bg-yellow-500/10 border border-yellow-500/20 px-3 py-1 rounded-full">Autonomous Gourmet Systems</span>
                    <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white leading-tight">Culinary Perfection.<br />Delivered at Speed.</h1>
                    <p className="text-zinc-400 text-sm font-light leading-relaxed">Experience precision-engineered gastronomy with real-time autonomous drone tracking, live order calculations, and multi-tier room reservations.</p>
                    <div className="pt-2 flex flex-wrap gap-3">
                      <button onClick={() => setDiningTab('menu')} className="bg-yellow-500 hover:bg-yellow-400 text-black font-semibold text-xs px-5 py-3 rounded-xl shadow-lg transition-all">Explore Menu & Platters</button>
                      <button onClick={() => setDiningTab('reservation')} className="backdrop-blur-md bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 text-xs px-5 py-3 rounded-xl font-medium transition-all">Reserve Table Tier</button>
                    </div>
                  </div>
                </div>

                {/* SPECIAL MEALS & PLATTER HIGHLIGHTS */}
                <div>
                  <h3 className="text-xs font-mono text-yellow-500 uppercase tracking-widest mb-4">// Featured Chef Special Platters</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {MENU_ITEMS.filter(i => i.category === 'Platters').map((platter) => (
                      <div key={platter.id} className="bg-zinc-900/40 border border-zinc-800/80 rounded-3xl overflow-hidden flex flex-col sm:flex-row group hover:border-yellow-500/30 transition-all">
                        <img src={platter.image} alt={platter.name} className="sm:w-1/2 h-48 sm:h-auto object-cover opacity-80 group-hover:opacity-100 transition-all" />
                        <div className="p-6 flex flex-col justify-between">
                          <div>
                            <span className="text-[9px] font-mono text-yellow-500 bg-yellow-500/10 border border-yellow-500/20 px-2 py-0.5 rounded">{platter.tag}</span>
                            <h4 className="text-lg font-bold text-white mt-2">{platter.name}</h4>
                            <p className="text-xs text-zinc-400 mt-1">{platter.desc}</p>
                          </div>
                          <div className="mt-4 flex items-center justify-between">
                            <span className="text-sm font-mono font-bold text-yellow-500">{formatPrice(platter.priceUSD)}</span>
                           <button onClick={() => { setDiningManifest([...diningManifest, { id: platter.id, name: platter.name, priceUSD: platter.priceUSD, qty: 1 }]); triggerNotification(`Added ${platter.name} to calculator manifest.`); }} className="bg-yellow-500 hover:bg-yellow-400 text-black text-[10px] font-bold px-3 py-1.5 rounded-lg transition-all">+ Add To Order</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB: MENU & MEALS */}
            {diningTab === 'menu' && (
              <div className="space-y-6">
                <div className="flex flex-wrap items-center justify-between bg-zinc-900/40 backdrop-blur-md border border-zinc-800 p-4 rounded-2xl gap-4">
                  <div>
                    <h2 className="text-xl font-bold">Gourmet Selection</h2>
                    <p className="text-xs text-zinc-500">Filter by category or select dishes to build your platter</p>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {['All', 'Main', 'Starters', 'Platters', 'Desserts'].map((cat) => (
                      <button key={cat} onClick={() => setDiningFilter(cat)} className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${diningFilter === cat ? 'bg-yellow-500 text-black font-bold' : 'bg-zinc-900 border border-zinc-800 text-zinc-400'}`}>{cat}</button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredDining.map((item) => (
                    <div key={item.id} className="bg-zinc-900/30 border border-zinc-800/80 rounded-2xl overflow-hidden hover:border-yellow-500/30 transition-all duration-300 flex flex-col justify-between group shadow-lg">
                      <div className="overflow-hidden h-44 w-full relative">
                        <img src={item.image} alt={item.name} className="h-full w-full object-cover group-hover:scale-105 transition-all duration-500" />
                        <span className="absolute top-3 left-3 text-[9px] font-mono text-yellow-500 bg-black/80 backdrop-blur-md border border-yellow-500/30 px-2 py-0.5 rounded">{item.tag}</span>
                      </div>
                      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                        <div>
                          <h3 className="text-base font-bold text-white group-hover:text-yellow-400 transition-colors">{item.name}</h3>
                          <p className="text-xs text-zinc-400 mt-1 font-light leading-relaxed">{item.desc}</p>
                        </div>
                        <div className="flex items-center justify-between pt-3 border-t border-zinc-800/60">
                          <span className="text-sm font-mono font-bold text-yellow-500">{formatPrice(item.priceUSD)}</span>
                          <button onClick={() => { 
                            setDiningManifest(prev => {
                              const exists = prev.find(i => i.id === item.id);
                              if (exists) return prev.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i);
                              return [...prev, { id: item.id, name: item.name, priceUSD: item.priceUSD, qty: 1 }];
                            });
                            triggerNotification(`Added ${item.name} to calculator queue.`); 
                          }} className="bg-zinc-800 hover:bg-yellow-500 hover:text-black text-zinc-300 text-[10px] font-bold px-3 py-2 rounded-xl border border-zinc-700 transition-all">+ Add Dish</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: PLATTER & BILL CALCULATOR */}
            {diningTab === 'calculator' && (
              <div className="max-w-3xl mx-auto bg-zinc-900/30 border border-zinc-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
                <div className="flex justify-between items-center pb-4 border-b border-zinc-800 mb-6">
                  <div>
                    <h2 className="text-xl font-bold">Platter & Order Calculator</h2>
                    <p className="text-xs text-zinc-500 mt-0.5">Live cost estimation with automated tax & drone delivery logistics</p>
                  </div>
                  <span className="text-xs font-mono bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 px-3 py-1 rounded-full">{diningManifest.length} Items</span>
                </div>

                {diningManifest.length === 0 ? (
                  <div className="text-center py-12 text-zinc-500 text-xs font-mono space-y-3">
                    <p>No dishes or platters added to the calculator queue yet.</p>
                    <button onClick={() => setDiningTab('menu')} className="bg-yellow-500 text-black font-bold px-4 py-2 rounded-xl text-xs">Browse Menu & Add Platters</button>
                  </div>
                ) : (
                  <div className="space-y-6">        
                    <div className="space-y-3">
                      {diningManifest.map((item) => (
                        <div key={item.id} className="flex items-center justify-between bg-black/40 p-3.5 rounded-2xl border border-zinc-800 text-xs">
                          <div>
                            <p className="font-bold text-white">{item.name}</p>
                            <p className="text-[10px] text-zinc-500 font-mono">{formatPrice(item.priceUSD)} each</p>
                          </div>
                          <div className="flex items-center gap-3 font-mono">
                            <div className="flex items-center border border-zinc-700 rounded-lg overflow-hidden">
                              <button onClick={() => setDiningManifest(prev => prev.map(i => i.id === item.id && i.qty > 1 ? { ...i, qty: i.qty - 1 } : i))} className="px-2 py-1 bg-zinc-800 hover:bg-zinc-700 text-white">-</button>
                              <span className="px-3 py-1 font-bold">{item.qty}</span>
                              <button onClick={() => setDiningManifest(prev => prev.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i))} className="px-2 py-1 bg-zinc-800 hover:bg-zinc-700 text-white">+</button>
                            </div>
                            <span className="text-yellow-500 font-bold min-w-[60px] text-right">{formatPrice(item.priceUSD * item.qty)}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-zinc-800 pt-4 space-y-2 font-mono text-xs text-zinc-400">
                      <div className="flex justify-between"><span>Subtotal:</span><span>{formatPrice(calcSubtotal)}</span></div>
                      <div className="flex justify-between"><span>Taxes & Service Fee (8%):</span><span>{formatPrice(calcTax)}</span></div>
                      <div className="flex justify-between"><span>Express Autonomous Delivery:</span><span>{formatPrice(calcDelivery)}</span></div>
                      <div className="flex justify-between text-base font-bold text-white pt-3 border-t border-zinc-800">
                        <span>Grand Total Estimate:</span>
                        <span className="text-yellow-500">{formatPrice(calcGrandTotal)}</span>
                      </div>
                    </div>

                    <button onClick={() => { setDiningTrackingActive(true); setDiningTab('tracking'); triggerNotification("🚀 Order Authorized & Dispatched to Courier Fleet!"); }} className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold text-xs py-4 rounded-xl shadow-lg transition-all uppercase tracking-wider">Proceed to Delivery Telemetry →</button>
                  </div>
                )}
              </div>
            )}

            {/* TAB: RESERVATIONS WITH TIERS */}
            {diningTab === 'reservation' && (
              <div className="max-w-2xl mx-auto bg-zinc-900/30 border border-zinc-800 rounded-3xl p-8 backdrop-blur-xl shadow-2xl">
                <div className="mb-6">
                  <h2 className="text-xl font-bold">Veloce Dining Room Reservation</h2>
                  <p className="text-xs text-zinc-500 mt-1">Choose between Ordinary, Business, or High-Tier VIP Lounge experiences.</p>
                </div>

                <form onSubmit={(e) => { e.preventDefault(); triggerNotification(`🎯 ${resData.classTier.toUpperCase()} Table Reserved for ${resData.name}!`); setDiningTab('home'); }} className="space-y-4">
                  <div>
                    <label className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block mb-1.5">Select Seating Tier Class</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        { id: 'ordinary', label: 'Ordinary', desc: 'Standard Seating' },
                        { id: 'economy', label: 'Economy', desc: 'Main Dining Floor' },
                        { id: 'business', label: 'Business', desc: 'Quiet Private Booth' },
                        { id: 'vip', label: 'VIP Lounge', desc: 'Private Service + Bar' }
                      ].map((tier) => (
                        <button key={tier.id} type="button" onClick={() => setResData({...resData, classTier: tier.id})} className={`p-3 rounded-xl border text-left transition-all ${resData.classTier === tier.id ? 'bg-yellow-500/10 border-yellow-500 text-white' : 'bg-black/40 border-zinc-800 text-zinc-400'}`}>
                          <p className="text-xs font-bold">{tier.label}</p>
                          <p className="text-[9px] text-zinc-500 mt-0.5">{tier.desc}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <input type="date" required className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-xs text-zinc-200 focus:outline-none focus:border-yellow-500" value={resData.date} onChange={(e) => setResData({...resData, date: e.target.value})} />
                    <input type="time" required className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-xs text-zinc-200 focus:outline-none focus:border-yellow-500" value={resData.time} onChange={(e) => setResData({...resData, time: e.target.value})} />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" required placeholder="Guest Authorized Name" className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-xs text-zinc-200 focus:outline-none focus:border-yellow-500" value={resData.name} onChange={(e) => setResData({...resData, name: e.target.value})} />
                    <select className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-xs text-zinc-200 focus:outline-none font-mono" value={resData.guests} onChange={(e) => setResData({...resData, guests: e.target.value})}>
                      <option value="1">1 Person</option>
                      <option value="2">2 Persons</option>
                      <option value="4">4 Persons (Family)</option>
                      <option value="8">8+ Persons (VIP Event)</option>
                    </select>
                  </div>

                  <button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold text-xs py-3.5 rounded-xl transition-all shadow-lg">Confirm Room Booking →</button>
                </form>
              </div>
            )}

            {/* TAB: LIVE TRACKING, COURIER & DRONE */}
            {diningTab === 'tracking' && (
              <div className="max-w-3xl mx-auto space-y-6">
                
                {/* LIVE COURIER & DRONE TELEMETRY HEADER */}
                <div className="bg-zinc-900/40 border border-zinc-800 rounded-3xl p-6 backdrop-blur-xl shadow-2xl">
                  <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-zinc-800">
                    <div>
                      <span className="text-[10px] font-mono text-yellow-500 bg-yellow-500/10 px-2.5 py-1 rounded border border-yellow-500/20 uppercase">Live Delivery Telemetry</span>
                      <h3 className="text-xl font-bold text-white mt-1">Active Dispatch Status</h3>
                    </div>

                    {/* Mode Switcher */}
                    <div className="flex bg-black p-1 rounded-xl border border-zinc-800 text-xs">
                      <button onClick={() => setDeliveryMode('pod')} className={`px-3 py-1 rounded-lg transition-all ${deliveryMode === 'pod' ? 'bg-yellow-500 text-black font-bold' : 'text-zinc-400'}`}>Electric Pod</button>
                      <button onClick={() => setDeliveryMode('drone')} className={`px-3 py-1 rounded-lg transition-all ${deliveryMode === 'drone' ? 'bg-yellow-500 text-black font-bold' : 'text-zinc-400'}`}>Aerial Drone</button>
                    </div>
                  </div>

                  {/* COURIER / DRONE CARRIER DETAILS */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6">
                    <div className="bg-black/50 p-4 rounded-2xl border border-zinc-800 font-mono text-xs">
                      <p className="text-zinc-500 text-[10px] uppercase">{deliveryMode === 'pod' ? 'Driver In-Charge' : 'Drone Operator'}</p>
                      <p className="text-white font-bold text-sm mt-0.5">{deliveryMode === 'pod' ? 'Capt. Tariq Khan' : 'AI Flight Vector-X'}</p>
                      <p className="text-yellow-500 text-[10px] mt-1">★ 4.98 Rating</p>
                    </div>
                    <div className="bg-black/50 p-4 rounded-2xl border border-zinc-800 font-mono text-xs">
                      <p className="text-zinc-500 text-[10px] uppercase">{deliveryMode === 'pod' ? 'Vehicle Number' : 'Flight Identifier'}</p>
                      <p className="text-white font-bold text-sm mt-0.5">{deliveryMode === 'pod' ? 'POD-EL-904-PK' : 'DRONE-X1-AERO'}</p>
                      <p className="text-emerald-400 text-[10px] mt-1">Active GPS Signal</p>
                    </div>

                    <div className="bg-black/50 p-4 rounded-2xl border border-zinc-800 font-mono text-xs">
                      <p className="text-zinc-500 text-[10px] uppercase">Estimated Time of Arrival</p>
                      <p className="text-yellow-500 font-bold text-lg mt-0.5">{formatTime(countdown)}</p>
                      <p className="text-zinc-500 text-[9px]">Live Countdown</p>
                    </div>
                  </div>

                  {/* LIVE LOG TERMINAL */}
                  <div className="space-y-2 bg-black/80 p-4 rounded-2xl border border-zinc-800 font-mono text-xs max-h-[180px] overflow-y-auto text-zinc-400">
                    {diningLogs.map((log, idx) => (
                      <p key={idx} className="leading-relaxed">&gt; [TELEMETRY] {log}</p>
                    ))}
                    <div className="w-1.5 h-3.5 bg-yellow-500 animate-pulse inline-block align-middle"></div>
                  </div>
                </div>

                {/* SIMULATED MAP INTERFACE */}
                <div className="bg-zinc-900/30 border border-zinc-800 p-2 rounded-3xl overflow-hidden relative shadow-2xl">
                  <iframe title="Map Core" width="100%" height="240" frameBorder="0" src="https://www.openstreetmap.org/export/embed.html?bbox=66.9000%2C24.8000%2C67.1000%2C24.9500&amp;layer=mapnik" className="opacity-40 invert-[0.92] hue-rotate-[180deg] saturate-[0.3] rounded-2xl" />
                </div>
              </div>
            )}

            {/* TAB: EVENTS & BANQUETS */}
            {diningTab === 'events' && (
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-zinc-900/30 backdrop-blur-xl border border-zinc-800 rounded-3xl overflow-hidden p-6 flex flex-col justify-between shadow-xl group">
                  <div>
                    <img src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=600&q=80" alt="Private Banquet" className="w-full h-48 object-cover rounded-2xl mb-4 group-hover:scale-105 transition-all duration-500" />
                    <h3 className="text-lg font-bold text-white">Quantum Corporate Banquets</h3>
                    <p className="text-xs text-zinc-400 mt-2 font-light leading-relaxed">Custom spatial layouts configured for enterprise teams, corporate announcements, and high-profile tech networking dinners.</p>
                  </div>
                  <button onClick={() => triggerNotification("📬 Event Query Logged. Management team will contact you.")} className="w-full bg-zinc-800 hover:bg-yellow-500 hover:text-black text-white text-xs font-bold py-3 rounded-xl border border-zinc-700 mt-6 transition-all">Request Event Booking →</button>
                </div>

                <div className="bg-zinc-900/30 backdrop-blur-xl border border-zinc-800 rounded-3xl overflow-hidden p-6 flex flex-col justify-between shadow-xl group">
                  <div>
                    <img src="https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=600&q=80" alt="VIP Deck" className="w-full h-48 object-cover rounded-2xl mb-4 group-hover:scale-105 transition-all duration-500" />
                    <h3 className="text-lg font-bold text-white">VIP Soundproof Secret Lounges</h3>
                    <p className="text-xs text-zinc-400 mt-2 font-light leading-relaxed">Isolated private spaces featuring personalized custom menus, dedicated server nodes, and premium acoustic insulation.</p>
                  </div>
                  <button onClick={() => triggerNotification("📬 VIP Lounge Request Logged.")} className="w-full bg-zinc-800 hover:bg-yellow-500 hover:text-black text-white text-xs font-bold py-3 rounded-xl border border-zinc-700 mt-6 transition-all">Request VIP Lounge →</button>
                </div>
              </div>
            )}
          </main>
        </div>
      )}
      {/* ================= APEX MATRIX LUXURY STOREFRONT PLATFORM ================= */}
      {activeApp === 'ecommerce' && (
        <div className="min-h-screen bg-black text-[#f5f5f7] font-sans relative z-10">
          <header className="sticky top-0 z-40 bg-black/80 backdrop-blur-xl border-b border-zinc-900 px-6 py-4 flex items-center justify-between">
            <button onClick={() => handleNavigation('portfolio')} className="text-xs font-bold uppercase tracking-wider text-zinc-400 hover:text-white transition-all">← Return to Console Deck</button>
            <nav className="flex bg-zinc-900/50 border border-zinc-800 p-1 rounded-full">
              <button onClick={() => setEcomTab('shop')} className={`px-4 py-1.5 rounded-full text-xs transition-all ${ecomTab === 'shop' ? 'bg-yellow-500 text-black font-semibold' : 'text-zinc-400'}`}>Store Grid</button>
              <button onClick={() => setEcomTab('checkout')} className={`px-4 py-1.5 rounded-full text-xs transition-all ${ecomTab === 'checkout' ? 'bg-yellow-500 text-black font-semibold' : 'text-zinc-400'}`}>Authorization</button>
              <button onClick={() => setEcomTab('tracking')} className={`px-4 py-1.5 rounded-full text-xs transition-all ${ecomTab === 'tracking' ? 'bg-yellow-500 text-black font-semibold' : 'text-zinc-400'}`}>Telemetry Logs</button>
            </nav>
            <div className="relative bg-zinc-900 border border-zinc-800 w-9 h-9 rounded-full flex items-center justify-center text-xs">
              <span>⚡</span>
              {cartCount > 0 && <span className="absolute -top-1 -right-1 bg-yellow-500 text-black font-mono text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center">{cartCount}</span>}
            </div>
          </header>

          <main className="max-w-5xl mx-auto px-6 py-12">
            {ecomTab === 'shop' && (
              <div className="space-y-12">
                <div className="text-center max-w-2xl mx-auto">
                  <h1 className="text-4xl font-semibold tracking-tight text-white mb-3">Tomorrow's Hardware Tech.</h1>
                  <p className="text-zinc-500 text-xs">Surgically engineered computing devices configured for decentralized neural networks.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  {PREMIUM_PRODUCTS.map((product) => (
                    <div key={product.id} className="bg-zinc-950 border border-zinc-900 hover:border-yellow-500/20 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl transition-all">
                      <div>
                        <img src={product.image} alt={product.name} className="w-full h-52 object-cover rounded-2xl mb-6 opacity-70" />
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-[9px] font-mono text-zinc-400 bg-zinc-900 px-3 py-1 rounded-full border border-zinc-800">{product.badge}</span>
                          <span className="text-sm font-mono font-bold text-yellow-500">{formatPrice(product.priceUSD)}</span>
                        </div>
                        <h3 className="text-xl font-medium text-white">{product.name}</h3>
                        <p className="text-xs text-zinc-500 font-mono mt-1">{product.tagline}</p>
                        <p className="text-zinc-400 text-xs leading-relaxed mt-3 font-light">{product.description}</p>
                      </div>
                      <button onClick={() => { setCartCount(c => c + 1); triggerNotification(`Allocated ${product.name} to bundle.`); }} className="w-full bg-[#f5f5f7] hover:bg-white text-black font-semibold text-xs py-3.5 rounded-xl mt-6 transition-all">Request Hardware Allocation</button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {ecomTab === 'checkout' && (
              <div className="max-w-md mx-auto bg-zinc-950 border border-zinc-900 rounded-3xl p-8 shadow-2xl">
                <h2 className="text-xl font-bold text-white mb-4">Hardware Initialization</h2>
                <form onSubmit={(e) => { e.preventDefault(); triggerNotification("Routing encrypted telemetry package..."); setEcomTab('tracking'); }} className="space-y-4">
                  <input type="text" required placeholder="Authorized Identity Name" className="w-full bg-zinc-900/40 border border-zinc-800 rounded-xl px-4 py-3 text-xs text-zinc-200 focus:outline-none" />
                  <input type="email" required placeholder="Encrypted Email Address" className="w-full bg-zinc-900/40 border border-zinc-800 rounded-xl px-4 py-3 text-xs text-zinc-200 focus:outline-none" />
                  <button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-semibold text-xs py-3.5 rounded-xl transition-all">Confirm Order Dispatch</button>
                </form>
              </div>
            )}
            {ecomTab === 'checkout' && (
              <div className="max-w-md mx-auto bg-zinc-950 border border-zinc-900 rounded-3xl p-8 shadow-2xl">
                <h2 className="text-xl font-bold text-white mb-4">Hardware Initialization</h2>
                <form onSubmit={(e) => { e.preventDefault(); triggerNotification("Routing encrypted telemetry package..."); setEcomTab('tracking'); }} className="space-y-4">
                  <input type="text" required placeholder="Authorized Identity Name" className="w-full bg-zinc-900/40 border border-zinc-800 rounded-xl px-4 py-3 text-xs text-zinc-200 focus:outline-none" />
                  <input type="email" required placeholder="Encrypted Email Address" className="w-full bg-zinc-900/40 border border-zinc-800 rounded-xl px-4 py-3 text-xs text-zinc-200 focus:outline-none" />
                  <button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-semibold text-xs py-3.5 rounded-xl transition-all">Confirm Order Dispatch</button>
                </form>
              </div>
            )}

            {ecomTab === 'tracking' && (
              <div className="max-w-xl mx-auto space-y-4">
                <div className="bg-zinc-950 border border-zinc-900 rounded-3xl p-6 font-mono text-xs shadow-2xl">
                  <p className="text-yellow-500 font-bold mb-4">// Hardware Transit Telemetry</p>
                  <div className="space-y-2.5 bg-black p-4 rounded-xl border border-zinc-900 max-h-[220px] overflow-y-auto text-zinc-400">
                    {terminalLogs.map((log, index) => (<p key={index}>&gt; [TELEMETRY] {log}</p>))}
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      )}
    </div>
  );
      }
