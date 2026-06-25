'use client';

import React, { useState, useEffect, JSX } from 'react';

// === MASTER DATA LAYER (COMBINED FOR ALL APPS) ===
const APEX_PRODUCTS = [
  { id: "p1", name: "Apex Quantum Dropper v4", tagline: "Quantum-safe data encryption.", price: "$1,299", image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=600&q=80", badge: "Pro Edition" },
  { id: "p2", name: "Matrix Core Node Pro", tagline: "Neural computing stack.", price: "$2,450", image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=600&q=80", badge: "Limited Drop" }
];

const VELOCE_MENU = [
  { id: 'm1', name: 'Truffle Glazed Burger', category: 'Main', price: 24.00, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=80" },
  { id: 'm2', name: 'Saffron Risotto Sphere', category: 'Main', price: 29.00, image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=500&q=80" }
];

const ZETA_TALENT = [
  { id: "t1", name: "Alex Vane", role: "AI Engineer", rate: "$120/hr", stack: ["Next.js", "Python"], rating: "5.0", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80" },
  { id: "t2", name: "Sarah Connor", role: "Cyber Architect", rate: "$145/hr", stack: ["Rust", "WASM"], rating: "4.9", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80" }
];

export default function GlobalMasterProject(): JSX.Element {
  // Navigation State: 'portfolio' | 'dining' | 'apex' | 'zeta'
  const [activeApp, setActiveApp] = useState<'portfolio' | 'dining' | 'apex' | 'zeta'>('portfolio');
  const [notify, setNotify] = useState<string | null>(null);
  
  // App-Specific States
  const [diningTab, setDiningTab] = useState('home');
  const [ecomTab, setEcomTab] = useState('shop');
  const [zetaTab, setZetaTab] = useState('dashboard');
  const [logs, setLogs] = useState<string[]>([]);

  const triggerNotify = (msg: string) => {
    setNotify(msg);
    setTimeout(() => setNotify(null), 3000);
  };

  const navigate = (app: any) => {
    setActiveApp(app);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-zinc-800 antialiased">
      {notify && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] bg-zinc-900 border border-zinc-800 text-xs px-5 py-2.5 rounded-full shadow-2xl flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          {notify}
        </div>
      )}
      {/* 1. VELOCE DINING VIEW */}
      {activeApp === 'dining' && (
        <div className="min-h-screen bg-zinc-950 animate-fadeIn">
          <header className="p-4 border-b border-zinc-900 flex justify-between items-center sticky top-0 bg-black/50 backdrop-blur-md">
            <button onClick={() => navigate('portfolio')} className="text-[10px] font-bold text-purple-400 uppercase">← Return to Deck</button>
            <div className="flex gap-2 bg-zinc-900 p-1 rounded-lg">
              {['home', 'menu'].map(t => <button key={t} onClick={() => setDiningTab(t)} className={`px-3 py-1 rounded text-[10px] capitalize ${diningTab === t ? 'bg-zinc-800 text-white' : 'text-zinc-500'}`}>{t}</button>)}
            </div>
            <span className="text-[10px] font-mono text-purple-500">VELOCE_v2.1</span>
          </header>
          <main className="max-w-4xl mx-auto py-12 px-6">
            <h2 className="text-4xl font-bold mb-8">Culinary Precision.</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {VELOCE_MENU.map(item => (
                <div key={item.id} className="bg-zinc-900/40 border border-zinc-900 rounded-2xl overflow-hidden p-4">
                  <img src={item.image} className="h-48 w-full object-cover rounded-xl mb-4 grayscale hover:grayscale-0 transition-all" alt={item.name} />
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold">{item.name}</h3>
                    <span className="text-purple-400 font-mono">${item.price}</span>
                  </div>
                  <button onClick={() => triggerNotify("Order added to telemetry manifest.")} className="w-full mt-4 bg-zinc-800 py-2 rounded-lg text-xs font-bold hover:bg-zinc-700">Add to Queue</button>
                </div>
              ))}
            </div>
          </main>
        </div>
      )}

      {/* 2. APEX MATRIX VIEW */}
      {activeApp === 'apex' && (
        <div className="min-h-screen bg-black animate-fadeIn">
          <header className="p-4 border-b border-zinc-800 flex justify-between items-center sticky top-0 bg-black">
            <button onClick={() => navigate('portfolio')} className="text-[10px] font-bold text-zinc-500 uppercase">← Exit Portal</button>
            <nav className="flex bg-zinc-900 p-1 rounded-full px-4 text-[10px] gap-4">
              <span className="text-white font-bold">STORE_GRID</span>
              <span className="text-zinc-600">AUTHORIZATION</span>
            </nav>
            <span className="text-xs">⚡ {APEX_PRODUCTS.length} Nodes</span>
          </header>
          <main className="max-w-5xl mx-auto py-16 px-6">
            <div className="text-center mb-16">
              <h1 className="text-5xl font-bold text-white mb-4">Tomorrow's Core Hardware.</h1>
              <p className="text-zinc-500 text-sm">Surgically engineered computing devices for decentralized networks.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {APEX_PRODUCTS.map(p => (
                <div key={p.id} className="bg-zinc-950 border border-zinc-900 rounded-[2.5rem] p-8 group">
                  <img src={p.image} className="w-full h-56 object-cover rounded-2xl mb-6 grayscale group-hover:grayscale-0 transition-all" alt={p.name} />
                  <div className="flex justify-between mb-4">
                    <span className="text-[10px] bg-zinc-900 px-3 py-1 rounded-full text-zinc-400">{p.badge}</span>
                    <span className="font-mono text-white">{p.price}</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{p.name}</h3>
                  <p className="text-xs text-zinc-500 mb-6">{p.tagline}</p>
                  <button onClick={() => triggerNotify(`Requested allocation for ${p.name}`)} className="w-full bg-white text-black py-4 rounded-2xl font-bold text-xs">Request Hardware Allocation</button>
                </div>
              ))}
            </div>
          </main>
        </div>
      )}
      {/* 3. ZETA-NEXUS (FIVERR/UPWORK STYLE) VIEW */}
      {activeApp === 'zeta' && (
        <div className="min-h-screen bg-[#09090b] animate-fadeIn">
          <header className="p-4 border-b border-zinc-900 flex justify-between items-center">
            <button onClick={() => navigate('portfolio')} className="text-[10px] font-bold text-emerald-500 uppercase">← Return to Deck</button>
            <div className="flex gap-4 text-[10px] font-bold text-zinc-500">
              <span className="text-white underline underline-offset-4">TALENT_MATRIX</span>
              <span>PROJECT_CONSOLE</span>
            </div>
            <span className="text-[10px] font-mono text-emerald-500">ZETA_MARKET_v4.0</span>
          </header>
          <main className="max-w-6xl mx-auto py-12 px-6">
            <div className="mb-12">
              <h2 className="text-3xl font-bold">Global Talent Matrix</h2>
              <p className="text-zinc-500 text-xs mt-1">Hire world-class AI engineers and smart contract architects.</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {ZETA_TALENT.map(t => (
                <div key={t.id} className="bg-zinc-950 border border-zinc-900 rounded-2xl p-4 hover:border-emerald-500/30 transition-all">
                  <img src={t.image} className="w-full h-32 object-cover rounded-xl mb-4 grayscale" alt={t.name} />
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="text-sm font-bold">{t.name}</h4>
                    <span className="text-[10px] text-amber-500">★ {t.rating}</span>
                  </div>
                  <p className="text-[11px] text-zinc-500 mb-4">{t.role}</p>
                  <div className="flex justify-between items-center border-t border-zinc-900 pt-3">
                    <span className="text-xs font-mono">{t.rate}</span>
                    <button onClick={() => triggerNotify("Allocating talent node...")} className="bg-zinc-900 px-3 py-1.5 rounded-lg text-[10px] font-bold border border-zinc-800">Secure Node</button>
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>
      )}

      {/* 4. MAIN PORTFOLIO DECK (THE LANDING UI) */}
      {activeApp === 'portfolio' && (
        <main className="max-w-4xl mx-auto px-6 py-12 animate-fadeIn">
          <nav className="flex justify-between items-center mb-20 border-b border-zinc-800 pb-6">
            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Naveed.dev</span>
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Available for Hire</span>
          </nav>
          
          <section className="mb-24">
            <h1 className="text-6xl font-extrabold tracking-tight mb-6">I craft high-performance <br /><span className="text-zinc-500">digital experiences.</span></h1>
            <p className="text-lg text-zinc-400 max-w-xl font-light">Next.js expert building elite storefronts, SaaS platforms, and AI systems.</p>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Veloce Card */}
            <div className="p-8 bg-zinc-900/30 border border-zinc-800 rounded-3xl flex flex-col justify-between h-72">
              <div><h3 className="text-xl font-bold">Veloce Dining Suite</h3><p className="text-xs text-zinc-500 mt-2">Digital restaurant console with automated telemetry.</p></div>
              <button onClick={() => navigate('dining')} className="w-fit text-purple-400 text-xs font-bold">Launch Console App →</button>
            </div>

            {/* Apex Card */}
            <div className="p-8 bg-zinc-900/30 border border-zinc-800 rounded-3xl flex flex-col justify-between h-72">
              <div><h3 className="text-xl font-bold">Apex Matrix Store</h3><p className="text-xs text-zinc-500 mt-2">Premium enterprise hardware procurement portal.</p></div>
              <button onClick={() => navigate('apex')} className="w-fit text-white text-xs font-bold">Launch Enterprise Portal →</button>
            </div>

            {/* Zeta Card (New!) */}
            <div className="p-8 bg-zinc-900/30 border border-zinc-800 rounded-3xl flex flex-col justify-between h-72">
              <div><h3 className="text-xl font-bold">Zeta-Nexus Market</h3><p className="text-xs text-zinc-500 mt-2">High-level freelancer talent matrix (Upwork/Fiverr Style).</p></div>
              <button onClick={() => navigate('zeta')} className="w-fit text-emerald-400 text-xs font-bold">Launch Talent Hub →</button>
            </div>

            {/* AI Blog Writer Card */}
            <div className="p-8 bg-zinc-900/30 border border-zinc-800 rounded-3xl flex flex-col justify-between h-72">
              <div><h3 className="text-xl font-bold">AI Blog Writer</h3><p className="text-xs text-zinc-500 mt-2">Autonomous AI-driven content generation engine.</p></div>
              <a href="https://aiblogwriter.vercel.app" target="_blank" className="w-fit text-blue-400 text-xs font-bold">Open External Engine 🚀</a>
            </div>
          </section>
        </main>
      )}
    </div>
  );
}
