'use client';

import React, { useState, useEffect, JSX } from 'react';

// === PREMIUM DATA LAYERS FOR E-COMMERCE CONSOLE ===
const PREMIUM_PRODUCTS = [
  { 
    id: "p1", 
    name: "Apex Quantum Dropper v4", 
    tagline: "High-frequency liquid routing module.", 
    price: "Custom Quote", 
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=600&q=80",
    description: "Automated high-frequency liquidity router engineered for telemetry, encryption pipelines, and smooth execution matrices.", 
    specs: ["Guaranteed High Network Uptime", "Low-Latency Custom Fiber Routing", "Multi-Layer Security Vault"], 
    badge: "Pro Edition" 
  },
  { 
    id: "p2", 
    name: "Matrix Core Node Pro", 
    tagline: "Neural computing stack.", 
    price: "Custom Quote", 
    image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=600&q=80",
    description: "Liquid-cooled hardware computation stack built explicitly for deep learning arrays, neural nodes, and algorithmic clustering.", 
    specs: ["High-Performance Neural Core", "Liquid-Cooled Enclosure", "Native API Gateway Integration"], 
    badge: "Standard Drop" 
  }
];

const MENU_ITEMS = [
  { id: 'm1', name: 'Truffle Glazed Prime Burger', category: 'Main', price: 24.00, tag: 'CHEF SPECIAL', image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=80" },
  { id: 'm2', name: 'Smoked Salmon Avocado Crisp', category: 'Starters', price: 18.50, tag: '', image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80" },
  { id: 'm3', name: 'Saffron Infused Risotto Sphere', category: 'Main', price: 29.00, tag: 'CHEF SPECIAL', image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=500&q=80" },
  { id: 'm4', name: 'Artisanal Matcha Espresso Tart', category: 'Desserts', price: 12.00, tag: '', image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=500&q=80" },
];

// === REALISTIC CASE STUDIES ===
const CASE_STUDIES = [
  {
    id: "cs1",
    title: "Veloce Dining Systems",
    category: "Full-Stack Hospitality Suite",
    client: "Veloce Group",
    tech: ["Next.js 14", "TypeScript", "Tailwind CSS", "WebSockets"],
    problem: "Outdated order booking led to slow loading during peak dining hours and poor mobile user engagement.",
    solution: "Engineered a real-time dynamic menu engine with instant order tracking and smooth mobile-first UI.",
    liveUrl: "https://veloce-dining.vercel.app"
  },
  {
    id: "cs2",
    title: "Apex Combo Store",
    category: "E-Commerce & Digital Hardware",
    client: "Apex Systems",
    tech: ["React 18", "Tailwind CSS", "REST API", "State Management"],
    problem: "Complex hardware products required transparent parameter selection and instant cart updates without page refreshes.",
    solution: "Built an interactive storefront with live state synchronization and fluid animations.",
    liveUrl: "https://apex-combo-store.vercel.app"
  },
  {
    id: "cs3",
    title: "Apex Matrix Storefront",
    category: "Corporate Enterprise Portal",
    client: "Matrix Global",
    tech: ["Next.js", "Tailwind CSS", "Framer Motion"],
    problem: "Needed a clean, modern digital presence to display tech hardware with high-grade aesthetics.",
    solution: "Designed and developed a minimalist, ultra-fast web layout tailored for corporate brand positioning.",
    liveUrl: "https://apex-combo-store.vercel.app"
  },
  {
    id: "cs4",
    title: "AI Blog Writer",
    category: "AI Content Automation Tool",
    client: "SaaS Product",
    tech: ["Next.js", "OpenAI API", "Tailwind CSS"],
    problem: "Content creators needed an automated workflow to draft formatted technical articles efficiently.",
    solution: "Created an intuitive AI web app that generates structured blog posts with custom tone settings.",
    liveUrl: "https://aiblogwriter.vercel.app"
  }
];

// === REALISTIC CLIENT REVIEWS ===
const TESTIMONIALS = [
  {
    quote: "Naveed delivered our platform on time with exceptional UI precision. Communication was seamless and the code quality is top-notch.",
    author: "Alex Wright",
    role: "Product Lead",
    location: "United States"
  },
  {
    quote: "Bohot achha kaam kiya Naveed ne. Hamari website ka fast load time aur clean layout hamare local clients ko bohot pasand aya.",
    author: "Hamza Sheikh",
    role: "Agency Founder",
    location: "Pakistan"
  }
];

export default function IntegratedPortfolio(): JSX.Element {
  const [activeApp, setActiveApp] = useState<'portfolio' | 'dining' | 'ecommerce'>('portfolio');
  const [activeTab, setActiveTab] = useState<'overview' | 'work' | 'custom_offer' | 'contact'>('overview');
  
  // DINING CONSOLE STATES
  const [diningTab, setDiningTab] = useState<'home' | 'menu' | 'reservation' | 'tracking'>('home');
  const [diningFilter, setDiningFilter] = useState<string>('All');
  const [diningManifest, setDiningManifest] = useState<{ id: string; name: string; price: number }[]>([]);
  const [diningLogs, setDiningLogs] = useState<string[]>([]);
  const [diningTrackingActive, setDiningTrackingActive] = useState<boolean>(false);

  // E-COMMERCE CONSOLE STATES
  const [cartCount, setCartCount] = useState<number>(0);
  
  // FORM & NOTIFICATION STATES
  const [notification, setNotification] = useState<string | null>(null);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<string>(CASE_STUDIES[0].id);

  // CUSTOM OFFER ENGINE STATES
  const [customBudget, setCustomBudget] = useState<number | ''>(350);
  const [selectedPreset, setSelectedPreset] = useState<string>('starter');
  const [offerNotes, setOfferNotes] = useState<string>('');
  const [additions, setAdditions] = useState<{ [key: string]: boolean }>({
    responsive: true,
    cms: false,
    seo: true,
    database: false,
    speed: true
  });

  const triggerNotification = (msg: string): void => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  useEffect(() => {
    if (diningTrackingActive) {
      setDiningLogs(["Order received in queue...", "Kitchen station preparing order...", "Courier assigned for delivery."]);
    }
  }, [diningTrackingActive]);

  const filteredDining = diningFilter === 'All' ? MENU_ITEMS : MENU_ITEMS.filter(item => item.category === diningFilter);

  // WHATSAPP CUSTOM OFFER LINK BUILDER
  const getWhatsAppOfferLink = () => {
    const budgetVal = customBudget ? `$${customBudget}` : 'Custom Budget';
    const textMsg = `Hi Naveed! I generated a Custom Offer on your portfolio:\n- Selected Preset: ${selectedPreset.toUpperCase()}\n- Offered Budget: ${budgetVal}\n- Project Details: ${offerNotes || 'Standard Project Scope'}`;
    return `https://api.whatsapp.com/send?phone=923103273904&text=${encodeURIComponent(textMsg)}`;
  };

  return (
    <div className="min-h-screen bg-[#030712] text-white relative font-sans antialiased text-left selection:bg-yellow-500/30 selection:text-yellow-200">
      
      {/* Background Ambience */}
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-yellow-500/5 rounded-full blur-[140px] pointer-events-none z-0"></div>

      {notification && (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50 bg-zinc-900 border border-yellow-500/30 text-white px-6 py-3 rounded-full text-xs font-medium shadow-xl flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></span>
          <span>{notification}</span>
        </div>
      )}

      {/* ================= 1. VELOCE DINING RESTAURANT CONSOLE ================= */}
      {activeApp === 'dining' && (
        <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans relative z-10">
          <header className="sticky top-0 z-40 bg-black/80 backdrop-blur-md border-b border-zinc-900 px-6 py-3 flex flex-wrap items-center justify-between gap-4">
            <button onClick={() => setActiveApp('portfolio')} className="text-xs font-bold text-yellow-500 hover:text-yellow-400 transition-all">
              ← Return To Portfolio Deck
            </button>
            <nav className="flex items-center space-x-1 bg-zinc-900 p-1 rounded-xl border border-zinc-800">
              {(['home', 'menu', 'reservation', 'tracking'] as const).map((tab) => (
                <button key={tab} onClick={() => setDiningTab(tab)} className={`px-3 py-1.5 rounded-lg text-xs capitalize transition-all ${diningTab === tab ? 'bg-zinc-800 text-white font-bold' : 'text-zinc-500'}`}>{tab}</button>
              ))}
            </nav>
            <span className="text-[10px] bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 px-2.5 py-1 rounded-full font-mono">Veloce Dining App</span>
          </header>

          <main className="max-w-5xl mx-auto px-4 py-12 relative z-10">
            {diningTab === 'home' && (
              <div className="space-y-8 text-center max-w-2xl mx-auto py-12">
                <span className="text-yellow-500 font-mono text-xs uppercase tracking-widest bg-yellow-500/10 px-3 py-1 rounded-full border border-yellow-500/20">Restaurant Web Solution</span>
                <h1 className="text-4xl font-extrabold text-white">Veloce Dining Interactive Concierge</h1>
                <p className="text-zinc-400 text-sm">A full-featured restaurant web application featuring instant menu ordering, table reservation, and live order tracking capabilities.</p>
                <div className="flex justify-center gap-4 pt-4">
                  <button onClick={() => setDiningTab('menu')} className="bg-yellow-500 text-black font-bold text-xs px-6 py-3 rounded-xl">View Smart Menu</button>
                  <button onClick={() => setDiningTab('reservation')} className="bg-zinc-900 border border-zinc-800 text-white text-xs px-6 py-3 rounded-xl">Book A Table</button>
                </div>
              </div>
            )}

            {diningTab === 'menu' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  <div className="flex items-center justify-between bg-zinc-900/60 p-4 rounded-2xl border border-zinc-800">
                    <h2 className="text-base font-bold">Interactive Menu</h2>
                    <div className="flex gap-1">
                      {['All', 'Main', 'Starters', 'Desserts'].map((cat) => (
                        <button key={cat} onClick={() => setDiningFilter(cat)} className={`px-3 py-1 rounded text-xs transition-all ${diningFilter === cat ? 'bg-yellow-500 text-black font-bold' : 'bg-zinc-800 text-zinc-400'}`}>{cat}</button>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {filteredDining.map((item) => (
                      <div key={item.id} className="bg-zinc-900/40 border border-zinc-800 p-4 rounded-2xl flex flex-col justify-between space-y-4">
                        <div>
                          <h3 className="text-sm font-bold text-white">{item.name}</h3>
                          <span className="text-[10px] font-mono text-zinc-500 uppercase">{item.category}</span>
                        </div>
                        <div className="flex justify-between items-center pt-2 border-t border-zinc-800/80">
                          <span className="text-xs font-mono font-bold text-yellow-500">${item.price.toFixed(2)}</span>
                          <button onClick={() => setDiningManifest([...diningManifest, { id: Date.now().toString(), name: item.name, price: item.price }])} className="bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-[10px] px-3 py-1.5 rounded-lg border border-zinc-700">+ Add Item</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-zinc-900/60 border border-zinc-800 p-6 rounded-2xl font-mono space-y-4 h-fit">
                  <h3 className="text-xs font-bold uppercase text-zinc-400 border-b border-zinc-800 pb-2">Order Summary ({diningManifest.length})</h3>
                  {diningManifest.length === 0 ? (
                    <p className="text-xs text-zinc-600 py-4 text-center">No items added to order yet.</p>
                  ) : (
                    <div className="space-y-2 text-xs text-zinc-300">
                      {diningManifest.map((itm, idx) => (
                        <div key={idx} className="flex justify-between bg-black/40 p-2 rounded-lg">
                          <span>{itm.name}</span>
                          <span className="text-yellow-500 font-bold">${itm.price.toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {diningManifest.length > 0 && (
                    <button onClick={() => { triggerNotification("Order Placed Successfully!"); setDiningTrackingActive(true); setDiningTab('tracking'); setDiningManifest([]); }} className="w-full bg-yellow-500 hover:bg-yellow-400 text-black text-xs font-bold py-3 rounded-xl transition-all">Proceed To Checkout</button>
                  )}
                </div>
              </div>
            )}

            {diningTab === 'tracking' && (
              <div className="max-w-md mx-auto bg-zinc-900/60 border border-zinc-800 p-6 rounded-2xl font-mono space-y-4">
                <h4 className="text-xs font-bold uppercase text-yellow-500">// Order Status Updates</h4>
                <div className="space-y-2 text-xs text-zinc-300 bg-black/50 p-4 rounded-xl border border-zinc-800">
                  {diningLogs.length === 0 ? <p className="text-zinc-600 text-center">No active order to track.</p> : diningLogs.map((log, i) => <p key={i}>&gt; {log}</p>)}
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
            <button onClick={() => setActiveApp('portfolio')} className="text-xs font-bold text-zinc-400 hover:text-white">← Return To Portfolio Deck</button>
            <span className="text-xs font-bold text-yellow-500">Apex Combo Store Console</span>
            <div className="text-xs font-mono bg-zinc-900 px-3 py-1 rounded-full border border-zinc-800">Cart ({cartCount})</div>
          </header>
          <main className="max-w-5xl mx-auto px-6 py-12 space-y-8">
            <div className="text-center max-w-xl mx-auto">
              <h1 className="text-3xl font-bold">Apex Enterprise Products</h1>
              <p className="text-xs text-zinc-400 mt-2">Explore custom hardware modules with dynamic interactive specification previews.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {PREMIUM_PRODUCTS.map((product) => (
                <div key={product.id} className="bg-zinc-950 border border-zinc-900 p-6 rounded-3xl space-y-4">
                  <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-2xl opacity-80" />
                  <h3 className="text-lg font-bold text-white">{product.name}</h3>
                  <p className="text-xs text-zinc-400">{product.description}</p>
                  <button onClick={() => { setCartCount(c => c + 1); triggerNotification("Item added to cart!"); }} className="w-full bg-white text-black font-bold text-xs py-3 rounded-xl">Add To Cart</button>
                </div>
              ))}
            </div>
          </main>
        </div>
      )}

      {/* ================= 3. MAIN PROFESSIONAL PORTFOLIO DECK ================= */}
      {activeApp === 'portfolio' && (
        <main className="max-w-6xl mx-auto px-6 py-8 relative z-10">

          {/* HEADER NAVIGATION */}
          <header className="flex flex-wrap justify-between items-center gap-4 mb-16 pb-6 border-b border-zinc-900">
            <div className="flex items-center gap-3">
              <span className="text-2xl font-black bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent font-mono tracking-wider">
                Naveed.dev
              </span>
              <span className="text-[10px] font-mono bg-zinc-900 border border-zinc-800 text-zinc-300 px-3 py-1 rounded-full uppercase">
                Full-Stack Developer
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
                      ? 'bg-yellow-500 text-black font-bold shadow' 
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

          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-20">
              <section className="text-center max-w-3xl mx-auto space-y-6 pt-4">
                <div className="inline-flex items-center gap-2 bg-zinc-900 border border-zinc-800 px-4 py-1 rounded-full text-xs text-zinc-300">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  <span>Available for Freelance Projects & Remote Contracts</span>
                </div>

                <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight">
                  Building High-Performance <br />
                  <span className="bg-gradient-to-r from-yellow-400 via-amber-300 to-orange-400 bg-clip-text text-transparent">
                    Web Applications & APIs
                  </span>
                </h1>

                <p className="text-zinc-400 text-sm sm:text-base max-w-xl mx-auto font-light leading-relaxed">
                  I specialize in developing modern Next.js websites, custom e-commerce stores, SaaS dashboards, and automated web platforms for both local and international clients.
                </p>

                {/* REAL CORE PILLARS */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto pt-4">
                  {[
                    { title: "Clean Code", desc: "TypeScript & Next.js" },
                    { title: "Fast UI/UX", desc: "Tailwind & Framer" },
                    { title: "SEO Ready", desc: "Structured Metadata" },
                    { title: "Scalable APIs", desc: "REST & WebSockets" }
                  ].map((p, idx) => (
                    <div key={idx} className="bg-zinc-900/40 border border-zinc-800 p-4 rounded-2xl text-center">
                      <span className="text-xs font-bold text-white block">{p.title}</span>
                      <span className="text-[10px] text-zinc-500 block mt-1">{p.desc}</span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-center gap-4 pt-4">
                  <button onClick={() => setActiveTab('custom_offer')} className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold text-xs px-6 py-3.5 rounded-xl transition-all">
                    Create Custom Offer ⚡
                    </button>
                  <button onClick={() => setActiveTab('work')} className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-white font-semibold text-xs px-6 py-3.5 rounded-xl transition-all">
                    View All 4 Projects
                  </button>
                </div>
              </section>

              {/* ALL 4 PROJECTS GRID */}
              <section className="space-y-8">
                <div className="text-center">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-yellow-500 bg-yellow-500/10 border border-yellow-500/20 px-3 py-1 rounded-full">
                    Featured Portfolio Works
                  </span>
                  <h2 className="text-2xl font-bold text-white mt-3">Live Interactive Applications</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* PROJECT 1: VELOCE DINING */}
                  <div className="p-6 bg-zinc-900/40 border border-zinc-800 rounded-3xl space-y-4 hover:border-yellow-500/30 transition-all">
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-bold text-white">Veloce Dining Systems</h3>
                      <span className="text-[10px] font-mono bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 px-2 py-0.5 rounded">Restaurant Suite</span>
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed font-light">
                      Complete restaurant web application featuring dynamic menu selection, reservation forms, and real-time order tracking.
                    </p>
                    <div className="flex flex-wrap gap-2 pt-2">
                      <button onClick={() => { setActiveApp('dining'); setDiningTab('home'); }} className="bg-zinc-900 border border-zinc-800 hover:border-yellow-500 text-yellow-400 text-xs font-semibold px-4 py-2 rounded-xl transition-all">
                        Launch Local Demo Console
                      </button>
                      <a href="https://veloce-dining.vercel.app" target="_blank" rel="noopener noreferrer" className="bg-yellow-500 hover:bg-yellow-400 text-black text-xs font-bold px-4 py-2 rounded-xl transition-all">
                        Live Vercel Site 🚀
                      </a>
                    </div>
                  </div>

                  {/* PROJECT 2: APEX COMBO STORE */}
                  <div className="p-6 bg-zinc-900/40 border border-zinc-800 rounded-3xl space-y-4 hover:border-yellow-500/30 transition-all">
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-bold text-white">Apex Combo Store</h3>
                      <span className="text-[10px] font-mono bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 px-2 py-0.5 rounded">E-Commerce</span>
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed font-light">
                      Modern online hardware store layout with live cart management, specification previews, and responsive product grids.
                    </p>
                    <div className="flex flex-wrap gap-2 pt-2">
                      <button onClick={() => { setActiveApp('ecommerce'); }} className="bg-zinc-900 border border-zinc-800 hover:border-yellow-500 text-yellow-400 text-xs font-semibold px-4 py-2 rounded-xl transition-all">
                        Launch Store Demo
                      </button>
                      <a href="https://apex-combo-store.vercel.app" target="_blank" rel="noopener noreferrer" className="bg-yellow-500 hover:bg-yellow-400 text-black text-xs font-bold px-4 py-2 rounded-xl transition-all">
                        Live Vercel Site 🚀
                      </a>
                    </div>
                  </div>

                  {/* PROJECT 3: APEX MATRIX STOREFRONT */}
                  <div className="p-6 bg-zinc-900/40 border border-zinc-800 rounded-3xl space-y-4 hover:border-yellow-500/30 transition-all">
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-bold text-white">Apex Matrix Storefront</h3>
                      <span className="text-[10px] font-mono bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 px-2 py-0.5 rounded">Enterprise Portal</span>
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed font-light">
                      High-end corporate website layout designed for tech brands with smooth animation effects and minimal typography.
                    </p>
                    <a href="https://apex-combo-store.vercel.app" target="_blank" rel="noopener noreferrer" className="inline-block bg-yellow-500 hover:bg-yellow-400 text-black text-xs font-bold px-5 py-2 rounded-xl transition-all">
                      Launch Live Portal 🚀
                    </a>
                  </div>
                  {/* PROJECT 4: AI BLOG WRITER */}
                  <div className="p-6 bg-zinc-900/40 border border-zinc-800 rounded-3xl space-y-4 hover:border-yellow-500/30 transition-all">
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-bold text-white">AI Blog Writer</h3>
                      <span className="text-[10px] font-mono bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 px-2 py-0.5 rounded">AI SaaS App</span>
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed font-light">
                      Autonomous artificial intelligence app that parses prompt streams to generate formatted markdown blog posts.
                    </p>
                    <a href="https://aiblogwriter.vercel.app" target="_blank" rel="noopener noreferrer" className="inline-block bg-yellow-500 hover:bg-yellow-400 text-black text-xs font-bold px-5 py-2 rounded-xl transition-all">
                      Launch Live Platform 🚀
                    </a>
                  </div>

                </div>
              </section>

              {/* REALISTIC REVIEWS */}
              <section className="space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-white">Client Feedback</h2>
                  <p className="text-xs text-zinc-500 mt-1">Real experiences from founders and agency partners</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {TESTIMONIALS.map((review, i) => (
                    <div key={i} className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-2xl space-y-4">
                      <p className="text-xs text-zinc-300 italic font-light">"{review.quote}"</p>
                      <div className="border-t border-zinc-800 pt-3">
                        <h4 className="text-xs font-bold text-white">{review.author}</h4>
                        <p className="text-[10px] text-zinc-500">{review.role} • {review.location}</p>
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
                <h2 className="text-2xl font-bold text-white">Project Case Studies</h2>
                <p className="text-xs text-zinc-500 mt-1">Technical details and project breakdowns for all 4 applications</p>
              </div>

              <div className="grid lg:grid-cols-3 gap-6">
                <div className="space-y-2">
                  {CASE_STUDIES.map((cs) => (
                    <button
                      key={cs.id}
                      onClick={() => setSelectedCaseStudy(cs.id)}
                      className={`w-full text-left p-4 rounded-xl border transition-all ${
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
                    <div className="lg:col-span-2 bg-zinc-900/40 border border-zinc-800 p-6 rounded-2xl space-y-6">
                      <div className="flex justify-between items-start pb-4 border-b border-zinc-800">
                        <div>
                          <span className="text-xs font-mono text-yellow-500">{cs.category}</span>
                          <h2 className="text-xl font-bold text-white mt-1">{cs.title}</h2>
                        </div>
                        <a href={cs.liveUrl} target="_blank" rel="noopener noreferrer" className="bg-yellow-500 text-black text-xs font-bold px-4 py-2 rounded-xl">Open Project 🚀</a>
                      </div>
                      <div className="space-y-3 text-xs leading-relaxed">
                        <div>
                          <h4 className="font-mono text-zinc-400 uppercase mb-1">// Challenge</h4>
                          <p className="text-zinc-300 font-light">{cs.problem}</p>
                        </div>
                        <div>
                          <h4 className="font-mono text-zinc-400 uppercase mb-1">// Solution</h4>
                          <p className="text-zinc-300 font-light">{cs.solution}</p>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-mono text-[10px] text-zinc-500 uppercase mb-2">Tech Stack Used:</h4>
                        <div className="flex flex-wrap gap-2">
                          {cs.tech.map((t, idx) => (
                            <span key={idx} className="text-[10px] font-mono bg-zinc-800 text-zinc-300 px-2.5 py-1 rounded-full">
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
                  Interactive Offer Generator
                </span>
                <h2 className="text-3xl font-bold text-white mt-3 tracking-tight">Create Your Custom Project Offer</h2>
                <p className="text-xs text-zinc-400 mt-1 font-light">
                  Select a recommended package or enter your exact custom budget. Works for local & international clients.
                </p>
              </div>

              {/* 1. RECOMMENDED PRESETS */}
              <div className="space-y-3">
                <label className="text-xs font-mono uppercase text-zinc-400 block">// 1. Recommended Tiers (Or Choose Custom Below)</label>
                <div className="grid sm:grid-cols-3 gap-3">
                  {[
                    { id: "starter", title: "Starter / Basic", price: 250, badge: "Budget Friendly", desc: "Landing page, Portfolio, Clean Design" },
                    { id: "pro", title: "Professional", price: 750, badge: "Recommended", desc: "E-Commerce, Business Web, API Integrations" },
                    { id: "enterprise", title: "Custom Enterprise", price: 2000, badge: "Full Scale", desc: "Full SaaS, Mobile Web App, Multi-page" }
                  ].map((preset) => (
                    <button
                      key={preset.id}
                      onClick={() => {
                        setSelectedPreset(preset.id);
                        setCustomBudget(preset.price);
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
                      <div className="text-xs font-mono font-bold text-yellow-400 mt-4">${preset.price} USD</div>
                    </button>
                  ))}
                </div>
              </div>
              {/* 2. CUSTOM BUDGET INPUT FIELD */}
              <div className="space-y-3 bg-black/40 border border-zinc-800 p-5 rounded-2xl">
                <label className="text-xs font-mono uppercase text-zinc-400 block">// 2. Or Enter Your Own Custom Budget ($ USD or PKR equivalent)</label>
                <div className="flex items-center gap-3">
                  <span className="text-xl font-bold font-mono text-yellow-500">$</span>
                  <input
                    type="number"
                    value={customBudget}
                    onChange={(e) => {
                      const val = e.target.value === '' ? '' : Number(e.target.value);
                      setCustomBudget(val);
                      setSelectedPreset('custom');
                    }}
                    placeholder="Enter your target budget (e.g. 300)"
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm font-mono text-white focus:outline-none focus:border-yellow-500 transition-all"
                  />
                </div>
              </div>

              {/* 3. OPTIONAL FEATURES / REQUIREMENTS */}
              <div className="space-y-3">
                <label className="text-xs font-mono uppercase text-zinc-400 block">// 3. Select Desired Capabilities</label>
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
                        checked={additions[item.key]}
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
                <label className="text-xs font-mono uppercase text-zinc-400 block">// 4. Short Project Description (Optional)</label>
                <textarea
                  rows={2}
                  value={offerNotes}
                  onChange={(e) => setOfferNotes(e.target.value)}
                  placeholder="Describe what kind of website/app you want to build..."
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-yellow-500"
                />
              </div>

              {/* ACTION SUMMARY BOX */}
              <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl flex flex-wrap justify-between items-center gap-4">
                <div>
                  <span className="text-[10px] font-mono text-zinc-500 uppercase block">Total Offered Value</span>
                  <span className="text-2xl font-mono font-bold text-yellow-400">
                    {customBudget ? `$${customBudget} USD` : 'Negotiable Offer'}
                  </span>
                </div>
                <a
                  href={getWhatsAppOfferLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs px-6 py-3.5 rounded-xl transition-all flex items-center gap-2 shadow-lg"
                >
                  💬 Send Custom Offer via WhatsApp →
                </a>
              </div>
            </div>
          )}

          {/* TAB 4: CONTACT */}
          {activeTab === 'contact' && (
          <div className="max-w-md mx-auto space-y-6 text-center bg-zinc-900/40 border border-zinc-800 p-8 rounded-3xl">
              <div>
                <h2 className="text-2xl font-bold text-white">Let's Work Together</h2>
                <p className="text-xs text-zinc-400 mt-1">Available for both local Pakistani projects & international client work.</p>
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
                  ✉️ Send Email Brief
                </a>
              </div>
            </div>
          )}

          {/* FOOTER */}
          <footer className="mt-20 pt-6 border-t border-zinc-900 flex flex-wrap justify-between items-center text-xs text-zinc-600 font-mono">
            <div>© {new Date().getFullYear()} Naveed. Developer Portfolio.</div>
            <div>Built with Next.js & Tailwind CSS</div>
          </footer>

        </main>
      )}

    </div>
  );
}
