'use client';

import React, { useState, useEffect, JSX } from 'react';

// === PREMIUM DATA LAYERS WITH HIGH-END LUXURY IMAGES ===
const PREMIUM_PRODUCTS = [
  { 
    id: "p1", 
    name: "Apex Quantum Dropper v4", 
    tagline: "The speed of light. Now enterprise grade.", 
    price: "$1,299", 
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=600&q=80",
    description: "Our most advanced automated high-frequency liquidity router. Engineered with surgical precision for flawless financial telemetry.", 
    specs: ["99.999% Guaranteed Network Uptime", "Zero-Latency Custom Fiber Routing", "Multi-Layer Silicon-Level Encryption"], 
    badge: "Pro Edition" 
  },
  { 
    id: "p2", 
    name: "Matrix Core Node Pro", 
    tagline: "Neural computing. Decentralized.", 
    price: "$2,450", 
    image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=600&q=80",
    description: "A liquid-cooled hardware computation stack built explicitly for deep learning, local artificial intelligence nodes, and complex clustering.", 
    specs: ["256 Terahashes/s Neural Processor", "Sintered Ceramic Liquid-Cooled Chassis", "Instant Out-of-the-Box API Integration"], 
    badge: "Limited Drop" 
  }
];

const MENU_ITEMS = [
  { id: 'm1', name: 'Truffle Glazed Prime Burger', category: 'Main', price: 24.00, tag: 'CHEF SPECIAL', image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=80" },
  { id: 'm2', name: 'Smoked Salmon Avocado Crisp', category: 'Starters', price: 18.50, tag: '', image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80" },
  { id: 'm3', name: 'Saffron Infused Risotto Sphere', category: 'Main', price: 29.00, tag: 'CHEF SPECIAL', image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=500&q=80" },
  { id: 'm4', name: 'Artisanal Matcha Espresso Tart', category: 'Desserts', price: 12.00, tag: '', image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=500&q=80" },
];

export default function IntegratedPortfolio(): JSX.Element {
  const [activeApp, setActiveApp] = useState<'portfolio' | 'dining' | 'ecommerce'>('portfolio');
  
  // Dining Core Sub-Routing Navigation System
  const [diningTab, setDiningTab] = useState<'home' | 'menu' | 'reservation' | 'tracking' | 'events'>('home');
  const [diningFilter, setDiningFilter] = useState<string>('All');
  const [diningManifest, setDiningManifest] = useState<{ id: string; name: string; price: number }[]>([]);
  
  const [cartCount, setCartCount] = useState<number>(0);
  const [ecomTab, setEcomTab] = useState<'shop' | 'checkout' | 'tracking'>('shop');
  const [diningTrackingActive, setDiningTrackingActive] = useState<boolean>(false);
  const [diningLogs, setDiningLogs] = useState<string[]>([]);
  const [formData, setFormData] = useState({ name: '', email: '', address: '', date: '', time: '', guests: '2' });
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const [notification, setNotification] = useState<string | null>(null);

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

  const triggerNotification = (msg: string): void => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  useEffect(() => {
    if (activeApp === 'ecommerce' && ecomTab === 'tracking') {
      setTerminalLogs(["Connecting to global logistics telemetry...", "Secure handshake established via Dublin-1 Node."]);
      const phrases = ["Package verified at primary distribution hub.", "Custom authorization cleared successfully.", "Dispatching autonomous delivery drone vector.", "Telemetry link stable. Estimated drop imminent."];
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
    <div className="min-h-screen bg-black text-white relative font-sans antialiased text-left selection:bg-zinc-800">
      {notification && (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50 bg-zinc-900/90 backdrop-blur-xl border border-zinc-800 text-white px-6 py-3 rounded-full text-xs font-medium tracking-wide shadow-2xl flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
          <span>{notification}</span>
        </div>
      )}

      {/* ================= VELOCE DINING SUITE PLATFORM ================= */}
      {activeApp === 'dining' && (
        <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans">
          {/* PROFESSIONAL APP SUB HEADER NAVIGATION */}
          <header className="sticky top-0 z-40 bg-black/80 backdrop-blur-md border-b border-zinc-900 px-4 py-3 flex flex-wrap items-center justify-between gap-4">
            <button onClick={() => { handleNavigation('portfolio'); setDiningTrackingActive(false); }} className="text-xs font-bold uppercase tracking-wider text-purple-400 hover:text-purple-300 transition-all">← Exit To Deck</button>
            <nav className="flex items-center space-x-1 bg-zinc-900/80 p-1 rounded-xl border border-zinc-800">
              {(['home', 'menu', 'reservation', 'tracking', 'events'] as const).map((tab) => (
                <button key={tab} onClick={() => setDiningTab(tab)} className={`px-3 py-1.5 rounded-lg text-xs capitalize font-medium transition-all ${diningTab === tab ? 'bg-zinc-800 text-white border border-zinc-700/50 shadow' : 'text-zinc-500 hover:text-zinc-300'}`}>{tab}</button>
              ))}
            </nav>
            <span className="text-[10px] bg-purple-500/10 border border-purple-500/20 text-purple-400 px-2.5 py-1 rounded-full font-mono uppercase tracking-widest">Veloce Hub v2.1</span>
          </header>

          <main className="max-w-5xl mx-auto px-4 py-12">
            {/* VIEW 1: HOME PAGE / LANDING PAGE */}
            {diningTab === 'home' && (
              <div className="space-y-16 animate-fadeIn">
                <div className="relative h-[420px] rounded-[2.5rem] overflow-hidden bg-cover bg-center flex items-center p-8 sm:p-12 border border-zinc-900" style={{ backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.95), rgba(0,0,0,0.4)), url('https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&q=80')` }}>
                  <div className="max-w-xl space-y-4">
                    <span className="text-purple-400 font-mono text-[10px] tracking-widest uppercase bg-purple-500/10 border border-purple-500/20 px-3 py-1 rounded-full">Autonomous Restaurant Framework</span>
                    <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white leading-tight">Culinary Excellence. <br />Routed at Light Speed.</h1>
                    <p className="text-zinc-400 text-sm font-light leading-relaxed">Experience a state-of-the-art interactive digital lounge mapping dynamic molecular dishes with automated secure logistic delivery trackers.</p>
                    <div className="pt-4 flex gap-3"><button onClick={() => setDiningTab('menu')} className="bg-white hover:bg-zinc-200 text-black font-semibold text-xs px-5 py-3 rounded-xl transition-all">Explore Smart Menu</button><button onClick={() => setDiningTab('reservation')} className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs px-5 py-3 rounded-xl font-medium transition-all">Book Secure Table</button></div>
                  </div>
                </div>
                {/* METRICS ROW */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { val: "12,400+", label: "Dispatched Telemetry" },
                    { val: "99.8%", label: "Thermal Freshness Rate" },
                    { val: "< 14 Mins", label: "Average Drone Vector" },
                    { val: "4.9 Stars", label: "Client Execution Rating" }
                  ].map((stat, i) => (
                    <div key={i} className="bg-zinc-900/40 border border-zinc-900 p-5 rounded-2xl text-center"><h3 className="text-xl font-bold text-white font-mono">{stat.val}</h3><p className="text-[10px] text-zinc-500 uppercase mt-1 tracking-wider">{stat.label}</p></div>
                  ))}
                </div>
              </div>
            )}

            {/* VIEW 2: SMART DIGITAL MENU */}
            {diningTab === 'menu' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fadeIn">
                <div className="lg:col-span-2 space-y-6">
                  <div className="flex items-center justify-between bg-zinc-900/30 border border-zinc-900 p-4 rounded-2xl"><div><h2 className="text-xl font-bold tracking-tight">Interactive Menu Console</h2><p className="text-xs text-zinc-500">Select dish logs to allocate variables to live manifest queue</p></div><div className="flex gap-1.5">{['All', 'Main', 'Starters', 'Desserts'].map((cat) => (<button key={cat} onClick={() => setDiningFilter(cat)} className={`px-2.5 py-1 rounded text-[11px] font-medium transition-all ${diningFilter === cat ? 'bg-white text-black font-bold' : 'bg-zinc-900 border border-zinc-800 text-zinc-400'}`}>{cat}</button>))}</div></div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {filteredDining.map((item) => (
                      <div key={item.id} className="bg-zinc-900/20 border border-zinc-900 rounded-2xl overflow-hidden hover:border-zinc-800 transition-all flex flex-col justify-between">
                        <img src={item.image} alt={item.name} className="h-40 w-full object-cover grayscale opacity-60 hover:grayscale-0 hover:opacity-90 transition-all duration-300" />
                        <div className="p-4 flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex justify-between items-start gap-2"><h3 className="text-sm font-bold text-zinc-200">{item.name}</h3>{item.tag && <span className="text-[7px] font-bold text-amber-400 bg-amber-400/10 border border-amber-400/20 px-1.5 py-0.5 rounded-sm">{item.tag}</span>}</div>
                            <span className="text-[9px] text-zinc-500 font-mono block mt-0.5 uppercase tracking-wider">{item.category}</span>
                          </div>
                          <div className="flex justify-between items-center mt-4 pt-3 border-t border-zinc-900">
                            <span className="text-xs font-mono font-bold text-purple-400">${item.price.toFixed(2)}</span>
                            <button onClick={() => { setDiningManifest([...diningManifest, { id: Date.now().toString(), name: item.name, price: item.price }]); }} className="bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-[10px] font-medium px-2.5 py-1.5 rounded border border-zinc-800 transition-all">+ Add To Manifest</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                {/* INTERACTIVE SIDEBAR MANIFEST QUEUE */}
                <div className="bg-zinc-900/20 border border-zinc-900 rounded-[2rem] p-6 h-fit font-mono">
                  <div className="flex justify-between items-center mb-4 pb-2 border-b border-zinc-900"><h3 className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">// Transaction Queue</h3><span className="text-[10px] bg-zinc-900 px-2.5 py-0.5 rounded text-purple-400 border border-zinc-800">{diningManifest.length} Items</span></div>
                  {diningManifest.length === 0 && !diningTrackingActive ? (<p className="text-center py-8 text-[10px] text-zinc-600">Manifest Queue Empty. Awaiting allocation parameters...</p>) : (
                    <div className="space-y-2 max-h-[220px] overflow-y-auto mb-4 text-xs text-zinc-400 pr-1">
                      {diningManifest.map((itm, idx) => (<div key={idx} className="flex justify-between items-center bg-black/40 p-2.5 rounded-xl border border-zinc-900"><span>&gt; {itm.name}</span><span className="text-purple-400 font-bold">${itm.price.toFixed(2)}</span></div>))}
                    </div>
                  )}
                  {diningManifest.length > 0 && (
                    <button onClick={() => { triggerNotification("🚀 Secure Routing Protocol Initialized! Pipeline Tracking active."); setDiningTrackingActive(true); setDiningTab('tracking'); setDiningManifest([]); }} className="w-full bg-purple-600 hover:bg-purple-500 text-white text-[10px] font-bold py-3.5 rounded-xl uppercase tracking-wider transition-all shadow-lg shadow-purple-600/10">Initialize Secure Checkout</button>
                  )}
                </div>
              </div>
            )}
            {/* VIEW 3: SMART TABLE RESERVATION CONCIERGE */}
            {diningTab === 'reservation' && (
              <div className="max-w-md mx-auto bg-zinc-900/30 border border-zinc-900 rounded-[2rem] p-8 shadow-2xl animate-fadeIn">
                <div className="mb-6"><h2 className="text-xl font-bold text-white tracking-tight">Concierge Table Allocation</h2><p className="text-xs text-zinc-500 mt-1">Acquire secure network parameters for spatial room validation.</p></div>
                <form onSubmit={(e) => { e.preventDefault(); triggerNotification("🎯 Table Reservation Blocked & Cleared Successfully!"); setDiningTab('home'); }} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <input type="date" required className="w-full bg-black border border-zinc-900 focus:border-purple-500/50 rounded-xl px-4 py-3 text-xs text-zinc-300 focus:outline-none" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} />
                    <input type="time" required className="w-full bg-black border border-zinc-900 focus:border-purple-500/50 rounded-xl px-4 py-3 text-xs text-zinc-300 focus:outline-none" value={formData.time} onChange={(e) => setFormData({...formData, time: e.target.value})} />
                  </div>
                  <select className="w-full bg-black border border-zinc-900 focus:border-purple-500/50 rounded-xl px-4 py-3 text-xs text-zinc-300 focus:outline-none font-mono" value={formData.guests} onChange={(e) => setFormData({...formData, guests: e.target.value})}>
                    <option value="2">2 Allocation Nodes (Guests)</option>
                    <option value="4">4 Allocation Nodes (Guests)</option>
                    <option value="8">8 Enterprise Lounge Pack</option>
                  </select>
                  <input type="text" required placeholder="Authorized Client Name" className="w-full bg-black border border-zinc-900 focus:border-purple-500/50 rounded-xl px-4 py-3 text-xs text-zinc-300 focus:outline-none" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                  <button type="submit" className="w-full bg-white hover:bg-zinc-200 text-black font-bold text-xs py-3.5 rounded-xl mt-2 transition-all">Authorize Spatial Table</button>
                </form>
              </div>
            )}

            {/* VIEW 4: LIVE COURIER TELEMETRY PIPELINE */}
            {diningTab === 'tracking' && (
              <div className="max-w-xl mx-auto space-y-6 animate-fadeIn">
                <div className="bg-zinc-900/30 border border-zinc-900 rounded-[2rem] p-6 font-mono text-xs">
                  <div className="flex items-center justify-between mb-4"><div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-purple-500 animate-ping"></span><h4 className="text-[11px] uppercase font-bold tracking-wider text-zinc-400">Live Courier Tracking Pipeline</h4></div><span className="text-[9px] text-zinc-600 font-mono">SECURE LINK STATUS: ACTIVE</span></div>
                  <div className="space-y-2.5 bg-black/60 p-4 rounded-xl border border-zinc-900 max-h-[220px] overflow-y-auto text-zinc-400">
                    {diningLogs.length === 0 ? <p className="text-zinc-600 text-[11px] text-center py-4">No data package active in pipeline. Initialize checkout on menu page first.</p> : diningLogs.map((log, index) => (<p key={index}>&gt; [TRAFFIC-LOG] {log}</p>))}
                    {diningTrackingActive && <div className="w-1.5 h-3.5 bg-purple-500 animate-pulse inline-block align-middle"></div>}
                  </div>
                </div>
                <div className="w-full bg-zinc-900/30 border border-zinc-900 p-4 rounded-2xl">
                  <iframe title="Map Core" width="100%" height="220" frameBorder="0" src="https://www.openstreetmap.org/export/embed.html?bbox=66.9000%2C24.8000%2C67.1000%2C24.9500&amp;layer=mapnik" className="opacity-40 invert-[0.92] hue-rotate-[180deg] saturate-[0.5] border-0 rounded-xl" />
                </div>
              </div>
            )}

            {/* VIEW 5: CORPORATE EVENTS & PRIVATE LOUNGES */}
            {diningTab === 'events' && (
              <div className="grid md:grid-cols-2 gap-8 animate-fadeIn">
                <div className="bg-zinc-900/20 border border-zinc-900 rounded-[2.5rem] overflow-hidden p-6 flex flex-col justify-between border-b-4 border-b-purple-600/30">
                  <div>
                    <img src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=600&q=80" alt="Private Banquet" className="w-full h-44 object-cover rounded-2xl grayscale mb-4" />
                    <h3 className="text-lg font-bold text-white tracking-tight">Quantum Corporate Banquets</h3>
                    <p className="text-xs text-zinc-400 mt-2 leading-relaxed font-light">Custom spatial architecture mappings configured for enterprise teams, high-profile product announcements, and modular tech networks dinners.</p>
                  </div>
                  <button onClick={() => triggerNotification("📬 Event Query Logged. Corporate relations manager will uplink.")} className="w-full bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-[10px] font-bold py-3 rounded-xl border border-zinc-800 mt-6 uppercase tracking-wider">Request Allocation Brief</button>
                </div>
                <div className="bg-zinc-900/20 border border-zinc-900 rounded-[2.5rem] overflow-hidden p-6 flex flex-col justify-between border-b-4 border-b-purple-600/30">
                  <div>
                    <img src="https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=600&q=80" alt="VIP Deck" className="w-full h-44 object-cover rounded-2xl grayscale mb-4" />
                    <h3 className="text-lg font-bold text-white tracking-tight">VIP High-Tier Secret Lounges</h3>
                    <p className="text-xs text-zinc-400 mt-2 leading-relaxed font-light">Absolute isolated soundproof private spaces. Features high-end custom semantic menu curation layers and individual server node assignments.</p>
                  </div>
                  <button onClick={() => triggerNotification("📬 Event Query Logged. Corporate relations manager will uplink.")} className="w-full bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-[10px] font-bold py-3 rounded-xl border border-zinc-800 mt-6 uppercase tracking-wider">Request Allocation Brief</button>
                </div>
              </div>
            )}
          </main>
        </div>
      )}

      {/* ================= LUXURY APPLE-STYLE E-COMMERCE HUB ================= */}
      {activeApp === 'ecommerce' && (
        <div className="min-h-screen bg-black text-[#f5f5f7]">
          <header className="sticky top-0 z-40 bg-black/70 backdrop-blur-xl border-b border-zinc-900/50 px-6 lg:px-16 py-4 flex items-center justify-between">
            <button onClick={() => handleNavigation('portfolio')} className="text-xs font-bold uppercase tracking-wider text-zinc-400 hover:text-white">← Return to Deck</button>
            <nav className="flex bg-zinc-900/40 border border-zinc-800/60 p-1 rounded-full">
              <button onClick={() => setEcomTab('shop')} className={`px-5 py-1.5 rounded-full text-xs transition-all ${ecomTab === 'shop' ? 'bg-white text-black font-semibold' : 'text-zinc-400'}`}>Store</button>
              <button onClick={() => setEcomTab('checkout')} className={`px-5 py-1.5 rounded-full text-xs transition-all ${ecomTab === 'checkout' ? 'bg-white text-black font-semibold' : 'text-zinc-400'}`}>Checkout</button>
              <button onClick={() => setEcomTab('tracking')} className={`px-5 py-1.5 rounded-full text-xs transition-all ${ecomTab === 'tracking' ? 'bg-white text-black font-semibold' : 'text-zinc-400'}`}>Telemetry</button>
            </nav>
            <div className="relative bg-zinc-900/60 border border-zinc-800 w-9 h-9 rounded-full flex items-center justify-center"><span>⚡</span>{cartCount > 0 && <span className="absolute -top-0.5 -right-0.5 bg-white text-black font-mono text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center">{cartCount}</span>}</div>
          </header>
          <main className="max-w-5xl mx-auto px-6 py-16">
            {ecomTab === 'shop' && (
              <div>
                <div className="text-center max-w-2xl mx-auto mb-16">
                  <h1 className="text-4xl lg:text-5xl font-semibold tracking-tight text-white mb-6 leading-[1.1]">Tomorrow's Hardware. <br /><span className="text-transparent bg-clip-text bg-gradient-to-b from-zinc-100 via-zinc-400 to-zinc-600">Available for allocation today.</span></h1>
                  <p className="text-zinc-500 text-xs max-w-md mx-auto leading-relaxed">Surgically built computing devices designed for high-performance networks, continuous operation, and absolute luxury interfaces.</p>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                  {PREMIUM_PRODUCTS.map((product) => (
                    <div key={product.id} className="bg-gradient-to-b from-zinc-950 to-black border border-zinc-900 rounded-[2.5rem] p-6 flex flex-col justify-between shadow-2xl overflow-hidden">
                      <div>
                        <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-2xl mb-6 grayscale opacity-70" />
                        <div className="flex items-center justify-between mb-4"><span className="text-[9px] font-mono font-semibold tracking-widest uppercase text-zinc-400 bg-zinc-900 px-3 py-1 rounded-full border border-zinc-800/50">{product.badge}</span><span className="text-sm font-mono text-zinc-400">{product.price}</span></div>
                        <h3 className="text-2xl font-medium text-white tracking-tight mb-1">{product.name}</h3>
                        <p className="text-xs text-zinc-500 font-mono tracking-wide mb-4 uppercase">{product.tagline}</p>
                        <p className="text-zinc-400 text-sm leading-relaxed mb-6 font-light">{product.description}</p>
                        <div className="border-t border-zinc-900 pt-4 mb-6">
                          <ul className="space-y-2.5">
                            {product.specs.map((spec, idx) => (<li key={idx} className="text-xs text-zinc-500 flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-zinc-700"></span>{spec}</li>))}
                          </ul>
                        </div>
                      </div>
                      <button onClick={() => { setCartCount(c => c + 1); triggerNotification(`Added ${product.name} to secure allocation.`); }} className="w-full bg-[#f5f5f7] hover:bg-white text-black font-medium text-xs py-4 rounded-2xl transition-all">Request Allocation</button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {ecomTab === 'checkout' && (
              <div className="max-w-md mx-auto bg-zinc-950 border border-zinc-900 rounded-[2rem] p-8 shadow-2xl">
                <div className="mb-8"><h2 className="text-2xl font-normal text-white tracking-tight">System Initialization</h2><p className="text-xs text-zinc-500 mt-1">Provide secure terminal data for logistics pipeline clearance.</p></div>
                <form onSubmit={(e) => { e.preventDefault(); triggerNotification("Routing telemetry package..."); setEcomTab('tracking'); }} className="space-y-4">
                  <input type="text" required placeholder="Full Name" className="w-full bg-zinc-900/30 border border-zinc-900 focus:border-zinc-700 rounded-2xl px-4 py-3.5 text-xs text-zinc-200 focus:outline-none" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                  <input type="email" required placeholder="Network Routing Email" className="w-full bg-zinc-900/30 border border-zinc-900 focus:border-zinc-700 rounded-2xl px-4 py-3.5 text-xs text-zinc-200 focus:outline-none" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                  <textarea required rows={3} placeholder="Terminal Delivery Coordinates" className="w-full bg-zinc-900/30 border border-zinc-900 focus:border-zinc-700 rounded-2xl px-4 py-3.5 text-xs text-zinc-200 focus:outline-none resize-none" value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} />
                  <button type="submit" className="w-full bg-white hover:bg-[#f5f5f7] text-black font-semibold text-xs py-4 rounded-2xl mt-2 transition-all">Authorize Secure Link</button>
                </form>
              </div>
            )}
            {ecomTab === 'tracking' && (
              <div className="max-w-xl mx-auto">
                <div className="flex items-center justify-between mb-5 px-1"><div className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span><h2 className="text-xs font-mono tracking-widest text-zinc-400 uppercase">Live Pipeline Telemetry</h2></div><span className="text-[10px] font-mono text-zinc-600">UPLINK ENCRYPTED</span></div>
                <div className="bg-zinc-950 border border-zinc-900 rounded-2xl p-6 font-mono text-xs text-zinc-300 min-h-[250px] shadow-2xl">
                  <div className="space-y-3.5">
                    {terminalLogs.map((log, index) => (<p key={index} className="text-zinc-400">&gt; [SYS-LOG] {log}</p>))}
                    <div className="w-1.5 h-3.5 bg-zinc-500 animate-pulse inline-block align-middle"></div>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      )}

      {/* ================= MAIN PORTFOLIO DECK LAYOUT ================= */}
      {activeApp === 'portfolio' && (
        <main className="max-w-4xl mx-auto px-6 py-12">
          <nav className="flex justify-between items-center mb-24 border-b border-zinc-800/50 pb-6"><span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent tracking-tight">Naveed.dev</span><span className="px-4 py-1.5 text-xs font-semibold rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400">Available for Hire</span></nav>
          <section className="mb-24">
            <span className="text-xs font-semibold tracking-widest text-purple-400 uppercase bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">Expert Custom Code & Core Architect</span>
            <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight mt-6 mb-6 leading-tight">I craft high-performance <br /><span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent">digital experiences.</span></h1>
            <p className="text-base sm:text-lg text-zinc-400 max-w-2xl leading-relaxed font-light">Specializing in building clean, fast, and bespoke frontend systems using <strong>Next.js</strong> and <strong>Tailwind CSS</strong>.</p>
          </section>
          
          <section className="mb-32 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { icon: "✦", title: "Next-Gen AI Integration", desc: "Developing advanced semantic cognitive models, prompt structures, and sleek modular dashboard solutions." },
              { icon: "🛍️", title: "Luxury E-Commerce Systems", desc: "High-converting digital storefronts with dynamic hardware grids, secure layers, and micro-animations." },
              { icon: "💻", title: "Custom Web Frameworks", desc: "Bespoke frontend apps engineered completely from scratch using clean code tailored to continuous scales." }
            ].map((cap, i) => (
              <div key={i} className="p-6 bg-zinc-900/30 border border-zinc-800/60 rounded-2xl hover:border-purple-500/20 transition-all"><div className="text-xl mb-3 text-purple-400">{cap.icon}</div><h3 className="font-bold text-zinc-100 mb-1">{cap.title}</h3><p className="text-sm text-zinc-500 leading-relaxed font-light">{cap.desc}</p></div>
            ))}
          </section>

          <section className="mb-32">
            <h2 className="text-2xl font-bold text-zinc-100 mb-10 tracking-tight flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-purple-500 inline-block animate-pulse"></span>Featured Production Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-6 sm:p-8 bg-zinc-900/20 border border-zinc-800/80 rounded-3xl hover:border-purple-500/30 transition-all flex flex-col justify-between gap-6">
                <div>
                  <div className="flex justify-between items-start"><h3 className="text-xl font-bold text-white tracking-tight">Veloce Dining Systems</h3><span className="text-[10px] font-mono bg-purple-500/10 border border-purple-500/20 text-purple-400 px-2.5 py-1 rounded">LIVE SIMULATION</span></div>
                  <p className="text-sm text-zinc-400 mt-3 font-light leading-relaxed">An interactive digital restaurant concierge and multi-page workflow system. Implements responsive framework filters and live courier analytics pipelines.</p>
                </div>
                <button onClick={() => { handleNavigation('dining'); setDiningTab('home'); setDiningTrackingActive(false); }} className="w-fit bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-semibold px-5 py-2.5 rounded-xl text-purple-400 transition-all">Launch Console App →</button>
              </div>

              <div className="p-6 sm:p-8 bg-zinc-900/20 border border-zinc-800/80 rounded-3xl hover:border-blue-500/30 transition-all flex flex-col justify-between gap-6">
                <div>
                  <div className="flex justify-between items-start"><h3 className="text-xl font-bold text-white tracking-tight">Apex Matrix Storefront</h3><span className="text-[10px] font-mono bg-blue-500/10 border border-blue-500/20 text-blue-400 px-2.5 py-1 rounded">UX SHOWCASE</span></div>
                  <p className="text-sm text-zinc-400 mt-3 font-light leading-relaxed">An ultra-premium, high-end B2B enterprise hardware storefront and automated logistics telemetry dashboard. Built to simulate elite procurement workflows.</p>
                </div>
                <button onClick={() => { handleNavigation('ecommerce'); setEcomTab('shop'); }} className="w-fit bg-white text-black text-xs font-bold px-5 py-2.5 rounded-xl hover:bg-zinc-200 transition-all">Launch Enterprise Portal →</button>
              </div>

              <div className="p-6 sm:p-8 bg-zinc-900/20 border border-zinc-800/80 rounded-3xl hover:border-purple-500/30 transition-all flex flex-col justify-between gap-6 md:col-span-2">
                <div>
                  <div className="flex justify-between items-start"><div className="flex items-center gap-3"><h3 className="text-xl font-bold text-white tracking-tight">AI Blog Writer</h3></div><span className="text-[10px] font-mono bg-purple-500/10 border border-purple-500/20 text-purple-400 px-2.5 py-1 rounded">AI CORE PLATFORM</span></div>
                  <p className="text-sm text-zinc-400 mt-3 font-light leading-relaxed">An autonomous artificial intelligence platform engineered to parse text data streams and build technical layout layouts seamlessly.</p>
                </div>
                <a href="https://aiblogwriter.vercel.app" target="_blank" rel="noopener noreferrer" className="w-fit bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold px-6 py-2.5 rounded-xl text-center shadow-md shadow-purple-600/10 transition-all block">Launch AI Writer Engine 🚀</a>
              </div>
            </div>
          </section>
        </main>
      )}
    </div>
  );
                      }
