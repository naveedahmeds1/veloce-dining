'use client';

import React, { useState, useEffect, JSX } from 'react';

// === MASTER SYSTEM DATA LAYER ===
const PROJECTS = [
  {
    id: 'dining',
    title: 'Veloce Dining Systems',
    desc: 'An elite, full-stack responsive digital concierge and real-time order tracking platform built with Next.js 15+ and Tailwind CSS. Features an enterprise dark-grid matrix UI, dynamic micro-state transaction simulation, and sub-14ms simulated edge diagnostics telemetry.',
    tags: ['Next.js 15', 'Tailwind CSS', 'TypeScript', 'Vercel'],
    icon: '🛍️'
  },
  {
    id: 'blog',
    title: 'AI Blog Writer Pro',
    desc: 'A premium SaaS landing page powered by Next.js and Tailwind CSS. Features an intuitive glassmorphic UI, responsive layouts, and live AI content generation stream capability.',
    tags: ['Next.js', 'Tailwind CSS', 'TypeScript'],
    icon: '✦'
  },
  {
    id: 'apex',
    title: 'Custom E-Commerce Store',
    desc: 'A lightning-fast digital storefront built from scratch. Highly optimized for conversion with zero bloated dependencies, clean architecture, and fluid native animations.',
    tags: ['React', 'Next.js', 'Node.js'],
    icon: '🛍️'
  },
  {
    id: 'zeta',
    title: 'Zeta-Nexus Marketplace',
    desc: 'A high-level decentralized talent marketplace (Fiverr/Upwork Style) with real-time job boards, secure escrow ledgers, and automated workspace telemetry.',
    tags: ['SaaS', 'Marketplace', 'Fintech'],
    icon: '💎'
  }
];

const VELOCE_MENU = [
  { id: 'm1', name: 'Truffle Glazed Burger', category: 'Main', price: 24.00, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=80" },
  { id: 'm2', name: 'Saffron Risotto Sphere', category: 'Main', price: 29.00, image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=500&q=80" }
];

const APEX_PRODUCTS = [
  { id: "p1", name: "Apex Quantum Dropper v4", tagline: "Quantum-safe data encryption.", price: "$1,299", image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=600&q=80", badge: "Pro Edition" },
  { id: "p2", name: "Matrix Core Node Pro", tagline: "Neural computing stack.", price: "$2,450", image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=600&q=80", badge: "Limited Drop" }
];

export default function UltimateEcosystemMaster(): JSX.Element {
  const [activeApp, setActiveApp] = useState<'portfolio' | 'dining' | 'apex' | 'zeta'>('portfolio');
  const [zetaTab, setZetaTab] = useState<'browse' | 'orders' | 'earnings'>('browse');
  const [notify, setNotify] = useState<string | null>(null);
  const [diningTab, setDiningTab] = useState('home');

  const triggerNotify = (msg: string) => {
    setNotify(msg);
    setTimeout(() => setNotify(null), 3000);
  };

  const navigate = (app: any) => {
    setActiveApp(app);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-[#000000] text-white selection:bg-zinc-800 antialiased font-sans">
      {/* Toast Notification Notification System */}
      {notify && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] bg-zinc-900 border border-zinc-800 text-[11px] px-5 py-2.5 rounded-full shadow-2xl flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse"></span>
          {notify}
        </div>
      )}

      {/* ================= PORTFOLIO HOME (EXACT UI MATCH FROM SCREENSHOT) ================= */}
      {activeApp === 'portfolio' && (
        <main className="max-w-[1200px] mx-auto px-6 py-8 animate-fadeIn">
          {/* Header */}
          <header className="flex justify-between items-center mb-20">
            <span className="text-sm font-bold text-[#6366f1] tracking-tight">Naveed.dev</span>
            <button className="bg-zinc-900/50 border border-zinc-800 text-[10px] font-bold text-zinc-300 px-4 py-1.5 rounded-full">
              Available for Hire
            </button>
          </header>

          {/* Hero Section */}
          <section className="mb-24">
            <span className="inline-block bg-[#1e1b4b] text-[#c084fc] text-[9px] font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-6">
              Expert Custom Code & CMS Developer
            </span>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-[1.1]">
              I craft high-performance <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                digital experiences.
              </span>
            </h1>
            <p className="text-zinc-400 text-lg max-w-3xl leading-relaxed mb-16 font-light">
              Specializing in building clean, fast, and bespoke frontend systems using <strong>Next.js</strong> and <strong>Tailwind CSS</strong>. I also design high-converting, scalable websites using <strong>WordPress, Shopify, and modern CMS tools</strong>—giving you the perfect balance of pure custom code and flexible platform management.
            </p>

            {/* Services Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-32">
              {[
                { title: 'Custom Web Apps', icon: '💻', desc: 'Bespoke websites built completely from scratch using clean code tailored perfectly to your business needs.' },
                { title: 'E-Commerce Ecosystems', icon: '🛍️', desc: 'High-converting digital stores with fast product grids, secure layouts, and seamless shopping experiences.' },
                { title: 'CMS & No-Code Tools', icon: '🛠️', desc: 'Expert development using WordPress, Shopify, and page builders for fast deployment and easy management.' }
              ].map((s, i) => (
                <div key={i} className="bg-[#0c0c0e] border border-zinc-900 p-8 rounded-2xl">
                  <div className="text-2xl mb-4">{s.icon}</div>
                  <h3 className="font-bold text-white mb-2">{s.title}</h3>
                  <p className="text-xs text-zinc-500 leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Production Featured Work Grid */}
          <section className="mb-20">
            <div className="flex items-center gap-2 mb-10">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
              <h2 className="text-sm font-bold text-zinc-100 uppercase tracking-widest">Featured Production Works</h2>
            </div>

            <div className="space-y-6">
              {PROJECTS.map((p) => (
                <div key={p.id} className="bg-[#09090b] border border-zinc-900 p-8 rounded-3xl hover:border-zinc-700 transition-all group">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-zinc-900 rounded-lg flex items-center justify-center text-xl border border-zinc-800">
                        {p.icon}
                      </div>
                      <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">{p.title}</h3>
                    </div>
                    <button 
                      onClick={() => p.id === 'blog' ? window.open('https://aiblogwriter.vercel.app', '_blank') : navigate(p.id)}
                      className="text-[10px] font-bold text-purple-400 hover:text-white transition-all uppercase flex items-center gap-1"
                    >
                      View Live Project <span className="text-xs">↗</span>
                    </button>
                  </div>
                  <p className="text-sm text-zinc-500 font-light leading-relaxed mb-6 max-w-4xl">
                    {p.desc}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {p.tags.map((tag, i) => (
                      <span key={i} className="bg-zinc-900/50 border border-zinc-800 text-[9px] text-zinc-500 px-3 py-1 rounded-md font-mono">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      )}
      {/* ================= ZETA-NEXUS (FULL FIVERR/UPWORK HIGH LEVEL MARKETPLACE) ================= */}
      {activeApp === 'zeta' && (
        <div className="min-h-screen bg-[#050505] animate-fadeIn text-left">
          <header className="border-b border-zinc-900 bg-black/80 backdrop-blur-xl sticky top-0 z-50">
            <div className="max-w-[1200px] mx-auto px-6 py-4 flex justify-between items-center">
              <div className="flex items-center gap-8">
                <span onClick={() => navigate('portfolio')} className="text-lg font-black text-emerald-500 cursor-pointer tracking-tighter">ZETA-NEXUS</span>
                <div className="hidden md:flex items-center bg-zinc-900 border border-zinc-800 rounded-full px-4 py-1.5 w-80">
                  <span className="text-xs text-zinc-500">🔍 Search for tech gigs & services...</span>
                </div>
              </div>
              <nav className="flex gap-6 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                <button onClick={() => setZetaTab('browse')} className={zetaTab === 'browse' ? 'text-white border-b border-emerald-500 pb-1' : ''}>Browse Talent</button>
                <button onClick={() => setZetaTab('orders')} className={zetaTab === 'orders' ? 'text-white border-b border-emerald-500 pb-1' : ''}>Workspace Orders</button>
                <button onClick={() => setZetaTab('earnings')} className={zetaTab === 'earnings' ? 'text-white border-b border-emerald-500 pb-1' : ''}>Financial Ledger</button>
              </nav>
            </div>
          </header>

          <main className="max-w-[1200px] mx-auto px-6 py-12">
            {zetaTab === 'browse' && (
              <div>
                <h2 className="text-3xl font-bold mb-2">Hire Expert Nodes</h2>
                <p className="text-zinc-500 text-sm mb-10">Access high-tier global developer contracts immediately.</p>
                <div className="grid md:grid-cols-4 gap-6">
                  {[
                    { name: 'Alex Vane', role: 'AI Core Engineer', price: '$80/hr', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400' },
                    { name: 'Sarah Connor', role: 'Smart Contract dev', price: '$120/hr', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400' },
                    { name: 'Node 042', role: 'Cyber Security Expert', price: '$95/hr', img: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=400' },
                    { name: 'Devon Lane', role: 'UI System Architect', price: '$70/hr', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400' }
                  ].map((dev, i) => (
                    <div key={i} className="bg-zinc-900/30 border border-zinc-900 rounded-2xl overflow-hidden group">
                      <img src={dev.img} className="h-40 w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" alt="" />
                      <div className="p-4">
                        <div className="flex justify-between items-center mb-1">
                          <h4 className="font-bold text-sm">{dev.name}</h4>
                          <span className="text-emerald-400 font-mono text-[11px] font-bold">{dev.price}</span>
                        </div>
                        <p className="text-[10px] text-zinc-500 mb-4">{dev.role}</p>
                        <button onClick={() => { setZetaTab('orders'); triggerNotify(`Contract with ${dev.name} deployed to Workspace!`); }} className="w-full bg-zinc-800 hover:bg-emerald-600 text-white py-2 rounded-lg text-[10px] font-bold transition-all">Request Contract Allocation</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {zetaTab === 'orders' && (
              <div className="max-w-2xl mx-auto font-mono text-left">
                <div className="bg-zinc-900/40 border border-zinc-900 rounded-2xl p-6">
                  <div className="flex justify-between items-center mb-6 border-b border-zinc-800 pb-4">
                    <span className="text-xs text-zinc-400 uppercase">// Active Pipeline Milestone</span>
                    <span className="text-[9px] bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded">Execution Active</span>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-xs text-zinc-400"><span className="text-emerald-500">✓</span> Initial Handshake Architecture Clear</div>
                    <div className="flex items-center gap-3 text-xs text-zinc-400"><span className="text-emerald-500">✓</span> Repository Webhook Syncing Completed</div>
                    <div className="flex items-center gap-3 text-xs text-zinc-100"><span className="animate-pulse text-purple-400">●</span> Compiling Asset Core Parameters...</div>
                  </div>
                </div>
              </div>
            )}

            {zetaTab === 'earnings' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-left">
                <div className="bg-zinc-900/30 border border-zinc-900 p-6 rounded-2xl">
                  <p className="text-[10px] text-zinc-500 uppercase mb-1">// Total Funds Swapped</p>
                  <h3 className="text-2xl font-bold text-white">$14,250.00</h3>
                </div>
                <div className="bg-zinc-900/30 border border-zinc-900 p-6 rounded-2xl">
                  <p className="text-[10px] text-zinc-500 uppercase mb-1">// Escrow Allocation Protection</p>
                  <h3 className="text-2xl font-bold text-emerald-400">$3,500.00</h3>
                </div>
                <div className="bg-zinc-900/30 border border-zinc-900 p-6 rounded-2xl">
                  <p className="text-[10px] text-zinc-500 uppercase mb-1">// Processing Network Fee</p>
                  <h3 className="text-2xl font-bold text-zinc-600">$0.00</h3>
                </div>
              </div>
            )}
          </main>
        </div>
      )}

      {/* ================= VELOCE DINING VIEW ================= */}
      {activeApp === 'dining' && (
        <div className="min-h-screen bg-zinc-950 animate-fadeIn text-left">
          <header className="p-4 border-b border-zinc-900 flex justify-between items-center bg-black/50 backdrop-blur-md sticky top-0">
            <button onClick={() => navigate('portfolio')} className="text-[10px] font-bold text-purple-400 uppercase">← Return to Deck</button>
            <span className="text-[10px] font-mono text-purple-500 uppercase tracking-widest">Veloce Terminal Sync</span>
          </header>
          <main className="max-w-4xl mx-auto py-16 px-6">
            <h2 className="text-3xl font-bold tracking-tight mb-8">Culinary Precision Modules</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {VELOCE_MENU.map(item => (
                <div key={item.id} className="bg-zinc-900/30 border border-zinc-900 rounded-2xl overflow-hidden p-4">
                  <img src={item.image} className="h-44 w-full object-cover rounded-xl mb-4 grayscale" alt="" />
                  <div className="flex justify-between items-center mb-4"><h3 className="font-bold">{item.name}</h3><span className="text-purple-400 font-mono">${item.price}</span></div>
                  <button onClick={() => triggerNotify("Order added to manifest queue.")} className="w-full bg-zinc-800 hover:bg-zinc-700 py-2.5 rounded-xl text-xs font-bold transition-all">Add to Queue</button>
                </div>
              ))}
            </div>
          </main>
        </div>
      )}

      {/* ================= APEX MATRIX VIEW ================= */}
      {activeApp === 'apex' && (
        <div className="min-h-screen bg-black animate-fadeIn text-left">
          <header className="p-4 border-b border-zinc-900 flex justify-between items-center bg-black sticky top-0">
            <button onClick={() => navigate('portfolio')} className="text-[10px] font-bold text-zinc-500 uppercase">← Exit Portal</button>
            <span className="text-xs font-mono text-zinc-500">// APEX CORE METRICS</span>
          </header>
          <main className="max-w-4xl mx-auto py-16 px-6">
            <h2 className="text-3xl font-bold tracking-tight mb-8 text-center">Tomorrow's Core Hardware Grid</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {APEX_PRODUCTS.map(p => (
                <div key={p.id} className="bg-zinc-950 border border-zinc-900 rounded-[2rem] p-6 flex flex-col justify-between">
                  <div>
                    <img src={p.image} className="w-full h-48 object-cover rounded-xl mb-4 grayscale" alt="" />
                    <div className="flex justify-between items-center mb-2"><span className="text-[9px] bg-zinc-900 text-zinc-400 px-2 py-0.5 rounded-full">{p.badge}</span><span className="font-mono text-zinc-300">{p.price}</span></div>
                    <h3 className="text-xl font-bold mb-1">{p.name}</h3>
                    <p className="text-xs text-zinc-500 mb-6">{p.tagline}</p>
                  </div>
                  <button onClick={() => triggerNotify(`Allocation requested for ${p.name}`)} className="w-full bg-white text-black py-3 rounded-xl font-bold text-xs hover:bg-zinc-200 transition-all">Request Allocation Link</button>
                </div>
              ))}
            </div>
          </main>
        </div>
      )}
    </div>
  );
                      }
