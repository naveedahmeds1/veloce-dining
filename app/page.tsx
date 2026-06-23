'use client';

import React, { useState } from 'react';

const initialMenu = [
  { id: 1, name: 'Truffle Glazed Prime Burger', price: '$24.00', category: 'Main', premium: true },
  { id: 2, name: 'Smoked Salmon Avocado Crisp', price: '$18.50', category: 'Starters', premium: false },
  { id: 3, name: 'Saffron Infused Risotto Sphere', price: '$29.00', category: 'Main', premium: true },
  { id: 4, name: 'Artisanal Matcha Espresso Tart', price: '$12.00', category: 'Desserts', premium: false },
];

export default function PremiumDashboard() {
  const [cart, setCart] = useState<{ id: number; name: string; price: string }[]>([]);
  const [activeTab, setActiveTab] = useState('All');
  const [orderStatus, setOrderStatus] = useState('Idle');
  const [isProcessing, setIsProcessing] = useState(false);

  const filteredMenu = activeTab === 'All' 
    ? initialMenu 
    : initialMenu.filter(item => item.category === activeTab);

  const addToCart = (item: typeof initialMenu[0]) => {
    setCart([...cart, { id: Date.now(), name: item.name, price: item.price }]);
  };

  const triggerOrderPipeline = () => {
    if (cart.length === 0) return;
    setIsProcessing(true);
    setOrderStatus('Verifying Payment Ledger...');
    
    setTimeout(() => {
      setOrderStatus('Transmitting Order to Kitchen Mesh...');
      setTimeout(() => {
        setOrderStatus('Dispatched via Premium Courier');
        setIsProcessing(false);
        setCart([]);
      }, 2500);
    }, 2000);
  };

  return (
    <div className="bg-[#020617] text-gray-100 min-h-screen font-sans antialiased selection:bg-indigo-500/30">
      <div className="absolute top-0 inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <header className="border-b border-slate-900/80 bg-slate-950/40 backdrop-blur-md sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-sm shadow-lg shadow-indigo-500/20 text-white">
            Ω
          </div>
          <span className="text-sm font-bold tracking-wider uppercase bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            Veloce Dining Systems
          </span>
        </div>
        <div className="px-3 py-1 bg-emerald-950/30 border border-emerald-800/30 rounded-full text-[10px] tracking-widest font-bold text-emerald-400 uppercase shadow-inner">
          Server Live
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-12 relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-900 pb-5">
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight text-white mb-1">Interactive Digital Concierge</h1>
              <p className="text-xs text-slate-500 font-medium">Enterprise routing framework for live restaurant operations</p>
            </div>
            
            <div className="flex gap-1.5 bg-slate-950/80 p-1 rounded-xl border border-slate-900 self-start sm:self-center">
              {['All', 'Main', 'Starters', 'Desserts'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                    activeTab === tab ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredMenu.map((item) => (
              <div 
                key={item.id} 
                className="bg-slate-950/40 border border-slate-900 hover:border-indigo-500/30 p-5 rounded-2xl transition-all duration-300 relative group flex flex-col justify-between min-h-[140px] ring-1 ring-white/[0.01]"
              >
                {item.premium && (
                  <span className="absolute top-4 right-4 bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[9px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-md">
                    Chef Special
                  </span>
                )}
                <div>
                  <h3 className="font-bold text-sm text-slate-200 group-hover:text-white transition-colors pr-16">{item.name}</h3>
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mt-1">{item.category}</span>
                </div>
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-900/60">
                  <span className="text-sm font-bold text-indigo-400">{item.price}</span>
                  <button 
                    onClick={() => addToCart(item)}
                    className="bg-slate-900 hover:bg-indigo-600 hover:text-white text-slate-300 px-3 py-1.5 rounded-lg text-xs font-bold transition-all border border-slate-800 hover:border-indigo-500/30 cursor-pointer"
                  >
                    + Add to Manifest
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-950/60 backdrop-blur-xl border border-slate-900 p-6 rounded-2xl shadow-xl flex flex-col justify-between min-h-[380px] ring-1 ring-white/[0.01]">
            <div>
              <div className="flex items-center justify-between border-b border-slate-900 pb-4 mb-4">
                <h2 className="text-sm font-bold text-white uppercase tracking-wider">Live Transaction Queue</h2>
                <span className="px-2 py-0.5 bg-slate-900 rounded-md text-[10px] font-bold text-slate-400">{cart.length} Items</span>
              </div>

              {cart.length === 0 ? (
                <div className="py-12 text-center text-xs text-slate-600 font-medium tracking-wide">
                  Queue Empty. Awaiting customer catalog selection parameters...
                </div>
              ) : (
                <div className="space-y-2.5 max-h-[220px] overflow-y-auto pr-1">
                  {cart.map((cartItem) => (
                    <div key={cartItem.id} className="flex items-center justify-between bg-slate-950/80 p-3 rounded-xl border border-slate-900">
                      <span className="text-xs text-slate-300 font-medium truncate max-w-[160px]">{cartItem.name}</span>
                      <span className="text-xs font-bold text-slate-400">{cartItem.price}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-slate-900/80 mt-4">
              {orderStatus !== 'Idle' && (
                <div className="mb-4 bg-slate-900/40 border border-slate-900 p-3 rounded-xl">
                  <div className="flex items-center justify-between text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1.5">
                    <span>Pipeline Status</span>
                    <span className={isProcessing ? 'text-indigo-400 animate-pulse' : 'text-emerald-400'}>
                      {isProcessing ? 'Active' : 'Settled'}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-slate-300 tracking-wide flex items-center gap-2">
                    <span className={`w-1.5 h-1.5 rounded-full ${isProcessing ? 'bg-indigo-400 animate-ping' : 'bg-emerald-400'}`} />
                    {orderStatus}
                  </p>
                </div>
              )}

              <button 
                onClick={triggerOrderPipeline}
                disabled={cart.length === 0 || isProcessing}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:from-slate-950 disabled:to-slate-950 disabled:text-slate-700 disabled:border-slate-900 text-white font-bold py-3 px-4 rounded-xl text-xs uppercase tracking-wider transition-all border border-indigo-500/20 cursor-pointer shadow-lg shadow-indigo-950/20"
              >
                {isProcessing ? 'Processing Transaction Pipeline...' : 'Initialize Secure Checkout'}
              </button>
            </div>
          </div>

          <div className="bg-slate-950/20 border border-slate-900/60 p-5 rounded-xl">
            <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">System Framework Compliance</h4>
            <ul className="space-y-2 text-[11px] text-slate-400 font-medium">
              <li className="flex items-center justify-between"><span className="text-slate-600">Database Layer</span> <span className="font-mono text-slate-300">Edge Hydration Map</span></li>
              <li className="flex items-center justify-between"><span className="text-slate-600">Latency Core</span> <span className="font-mono text-emerald-400">&lt; 14ms Response</span></li>
              <li className="flex items-center justify-between"><span className="text-slate-600">Security Architecture</span> <span className="font-mono text-purple-400">AES-256 Mesh</span></li>
            </ul>
          </div>
        </div>
      </main>

      <footer className="border-t border-slate-900/60 py-6 text-center text-[10px] text-slate-600 font-semibold tracking-widest uppercase mt-12">
        Powered by Veloce Dining Infrastructure v4.0.0
      </footer>
    </div>
  );
  }
