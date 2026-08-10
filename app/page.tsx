'use client';

import React, { useState, useEffect, JSX } from 'react';

// === VELOCE DINING MENU DATA LAYER ===
const MENU_ITEMS = [
  { 
    id: 'm1', 
    name: 'Truffle Glazed Prime Burger', 
    category: 'Main', 
    price: 24.00, 
    tag: 'CHEF SPECIAL', 
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=80" 
  },
  { 
    id: 'm2', 
    name: 'Smoked Salmon Avocado Crisp', 
    category: 'Starters', 
    price: 18.50, 
    tag: '', 
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80" 
  },
  { 
    id: 'm3', 
    name: 'Saffron Infused Risotto Sphere', 
    category: 'Main', 
    price: 29.00, 
    tag: 'CHEF SPECIAL', 
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=500&q=80" 
  },
  { 
    id: 'm4', 
    name: 'Artisanal Matcha Espresso Tart', 
    category: 'Desserts', 
    price: 12.00, 
    tag: '', 
    image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=500&q=80" 
  },
];

export default function VeloceDiningPlatform(): JSX.Element {
  const [diningTab, setDiningTab] = useState<'home' | 'menu' | 'reservation' | 'tracking' | 'events'>('home');
  const [diningFilter, setDiningFilter] = useState<string>('All');
  const [diningManifest, setDiningManifest] = useState<{ id: string; name: string; price: number }[]>([]);
  const [diningTrackingActive, setDiningTrackingActive] = useState<boolean>(false);
  const [diningLogs, setDiningLogs] = useState<string[]>([]);
  const [formData, setFormData] = useState({ name: '', email: '', address: '', date: '', time: '', guests: '2' });
  const [notification, setNotification] = useState<string | null>(null);

  const triggerNotification = (msg: string): void => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  useEffect(() => {
    if (diningTrackingActive) {
      setDiningLogs(["Order received into secure routing system...", "Kitchen station initialised recipe core vectors..."]);
      const phrases = [
        "Thermal core validation check complete.",
        "Dispatching automated local courier unit.",
        "Veloce telemetry vector transit state: stable.",
        "Arrived at destination coordinates successfully."
      ];
      const timers = phrases.map((phrase, index) => 
        setTimeout(() => setDiningLogs(prev => [...prev, phrase]), (index + 1) * 1500)
      );
      return () => timers.forEach(clearTimeout);
    } else {
      setDiningLogs([]);
    }
  }, [diningTrackingActive]);

  const filteredDining = diningFilter === 'All' 
    ? MENU_ITEMS 
    : MENU_ITEMS.filter(item => item.category === diningFilter);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans relative selection:bg-zinc-800">
      {/* Background Ambient Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-b from-yellow-500/5 to-transparent rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="absolute bottom-1/4 left-0 w-[600px] h-[600px] bg-gradient-to-t from-purple-500/5 to-transparent rounded-full blur-[150px] pointer-events-none z-0"></div>

      {notification && (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50 bg-zinc-900/90 backdrop-blur-xl border border-zinc-800 text-white px-6 py-3 rounded-full text-xs font-medium tracking-wide shadow-2xl flex items-center gap-3 transition-all duration-300">
          <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse"></span>
          <span>{notification}</span>
        </div>
      )}

      {/* ================= VELOCE DINING HEADER ================= */}
      <header className="sticky top-0 z-40 bg-black/80 backdrop-blur-md border-b border-zinc-900 px-4 py-3 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-black tracking-wider text-yellow-500 uppercase">VELOCE DINING</span>
        </div>

        <nav className="flex items-center space-x-1 bg-zinc-900/80 p-1 rounded-xl border border-zinc-800">
          {(['home', 'menu', 'reservation', 'tracking', 'events'] as const).map((tab) => (
            <button 
              key={tab} 
              onClick={() => setDiningTab(tab)} 
              className={`px-3 py-1.5 rounded-lg text-xs capitalize font-medium transition-all ${diningTab === tab ? 'bg-zinc-800 text-white border border-zinc-700/50 shadow' : 'text-zinc-500 hover:text-zinc-300'}`}
            >
              {tab}
            </button>
          ))}
        </nav>

        <span className="text-[10px] bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 px-2.5 py-1 rounded-full font-mono uppercase tracking-widest">
          Veloce Hub v2.5
        </span>
      </header>

      {/* ================= MAIN CONTENT AREA ================= */}
      <main className="max-w-5xl mx-auto px-4 py-12 relative z-10">
        {/* TAB 1: HOME */}
        {diningTab === 'home' && (
          <div className="space-y-16">
            <div 
              className="relative h-[420px] rounded-[2.5rem] overflow-hidden bg-cover bg-center flex items-center p-8 sm:p-12 border border-zinc-900 shadow-2xl" 
              style={{ backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.95), rgba(0,0,0,0.4)), url('https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&q=80')` }}
            >
              <div className="max-w-xl space-y-4">
                <span className="text-yellow-500 font-mono text-[10px] tracking-widest uppercase bg-yellow-500/10 border border-yellow-500/20 px-3 py-1 rounded-full">
                  Autonomous Restaurant Framework
                </span>
                <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white leading-tight">
                  Culinary Excellence.<br />Routed at Light Speed.
                </h1>
                <p className="text-zinc-400 text-sm font-light leading-relaxed">
                  Experience a state-of-the-art interactive digital lounge mapping dynamic molecular dishes with automated secure logistic delivery trackers.
                </p>
                <div className="pt-4 flex gap-3">
                  <button 
                    onClick={() => setDiningTab('menu')} 
                    className="bg-yellow-500 hover:bg-yellow-400 text-black font-semibold text-xs px-5 py-3 rounded-xl shadow-lg shadow-yellow-500/10 transition-all"
                  >
                    Explore Smart Menu
                  </button>
                  <button 
                    onClick={() => setDiningTab('reservation')} 
                    className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs px-5 py-3 rounded-xl font-medium transition-all"
                  >
                    Book Secure Table
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { val: "12,400+", label: "Dispatched Telemetry" },
                { val: "99.8%", label: "Thermal Freshness Rate" },
                { val: "< 14 Mins", label: "Average Drone Vector" },
                { val: "4.9 Stars", label: "Client Execution Rating" }
              ].map((stat, i) => (
                <div key={i} className="backdrop-blur-xl bg-zinc-900/30 border border-zinc-900/80 p-5 rounded-2xl text-center shadow-lg">
                  <h3 className="text-xl font-bold text-white font-mono">{stat.val}</h3>
                  <p className="text-[10px] text-zinc-500 uppercase mt-1 tracking-wider">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: MENU */}
        {diningTab === 'menu' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center justify-between bg-zinc-900/50 backdrop-blur-md border border-zinc-900 p-4 rounded-2xl shadow-md">
                <div>
                  <h2 className="text-xl font-bold tracking-tight">Interactive Menu Console</h2>
                  <p className="text-xs text-zinc-500">Select dish logs to allocate variables to live manifest queue</p>
                </div>
                <div className="flex gap-1.5">
                  {['All', 'Main', 'Starters', 'Desserts'].map((cat) => (
                    <button 
                      key={cat} 
                      onClick={() => setDiningFilter(cat)} 
                      className={`px-2.5 py-1 rounded text-[11px] font-medium transition-all ${diningFilter === cat ? 'bg-yellow-500 text-black font-bold' : 'bg-zinc-900 border border-zinc-800 text-zinc-400'}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredDining.map((item) => (
                  <div key={item.id} className="backdrop-blur-xl bg-zinc-900/20 border border-zinc-900 rounded-2xl overflow-hidden hover:border-yellow-500/30 transition-all duration-300 flex flex-col justify-between shadow-lg group">
                    <div className="overflow-hidden h-40 w-full relative">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="h-full w-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500" 
                      />
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
                        <button 
                          onClick={() => {
                            setDiningManifest([...diningManifest, { id: Date.now().toString(), name: item.name, price: item.price }]);
                            triggerNotification(`${item.name} Added to Manifest!`);
                          }} 
                          className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 text-[10px] font-bold px-3 py-1.5 rounded-lg transition-all hover:border-yellow-500/40"
                        >
                          + Add Item
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Live Manifest Sidebar */}
            <div className="bg-zinc-900/30 backdrop-blur-xl border border-zinc-900 rounded-3xl p-6 h-fit space-y-6 shadow-2xl">
              <div className="flex justify-between items-center border-b border-zinc-800/80 pb-4">
                <h3 className="text-sm font-bold tracking-tight uppercase">Live Manifest Queue</h3>
                <span className="text-[10px] font-mono bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded-md">{diningManifest.length} Items</span>
              </div>

              {diningManifest.length === 0 ? (
                <div className="text-center py-8 text-zinc-600 text-xs font-mono">
                  Queue Empty. Allocate menu nodes to start order telemetry.
                </div>
              ) : (
                <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                  {diningManifest.map((item, index) => (
                    <div key={index} className="flex justify-between items-center bg-zinc-950/60 p-2.5 rounded-xl border border-zinc-800/50 text-xs">
                      <span className="text-zinc-300 truncate max-w-[140px]">{item.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-yellow-500">${item.price.toFixed(2)}</span>
                        <button 
                          onClick={() => setDiningManifest(diningManifest.filter((_, i) => i !== index))}
                          className="text-zinc-500 hover:text-red-400 font-bold px-1"
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {diningManifest.length > 0 && (
                <div className="pt-4 border-t border-zinc-800 space-y-4">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-zinc-400">Total Valuation:</span>
                    <span className="text-yellow-400 font-bold">
                      ${diningManifest.reduce((acc, curr) => acc + curr.price, 0).toFixed(2)}
                    </span>
                  </div>
                  <button 
                    onClick={() => {
                      setDiningTrackingActive(true);
                      setDiningTab('tracking');
                      triggerNotification("Telemetry dispatch order initiated!");
                    }} 
                    className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold text-xs py-3 rounded-xl transition-all shadow-lg shadow-yellow-500/10"
                  >
                    Dispatch Courier Telemetry
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: RESERVATION */}
        {diningTab === 'reservation' && (
          <div className="max-w-xl mx-auto backdrop-blur-2xl bg-zinc-900/30 border border-zinc-800 p-8 rounded-3xl space-y-6 shadow-2xl">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Reserve A Table Sector</h2>
              <p className="text-xs text-zinc-500 mt-1">Configure telemetry parameters for secure lounge allocation</p>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault();
              triggerNotification(`Table reserved for ${formData.name}!`);
              setFormData({ name: '', email: '', address: '', date: '', time: '', guests: '2' });
            }} className="space-y-4 text-xs">
              <div>
                <label className="text-zinc-400 block mb-1">Full Identity Name</label>
                <input 
                  type="text" 
                  required 
                  value={formData.name} 
                  onChange={e => setFormData({ ...formData, name: e.target.value })} 
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-500" 
                  placeholder="e.g. Alex Vance" 
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-zinc-400 block mb-1">Date Parameter</label>
                  <input 
                    type="date" 
                    required 
                    value={formData.date} 
                    onChange={e => setFormData({ ...formData, date: e.target.value })} 
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-500" 
                  />
                </div>
                <div>
                  <label className="text-zinc-400 block mb-1">Target Time Vector</label>
                  <input 
                    type="time" 
                    required 
                    value={formData.time} 
                    onChange={e => setFormData({ ...formData, time: e.target.value })} 
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-500" 
                  />
                </div>
              </div>
              <div>
                <label className="text-zinc-400 block mb-1">Guest Matrix Capacity</label>
                <select 
                  value={formData.guests} 
                  onChange={e => setFormData({ ...formData, guests: e.target.value })} 
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-500"
                >
                  <option value="1">1 Person Node</option>
                  <option value="2">2 Person Cluster</option>
                  <option value="4">4 Person Lounge</option>
                  <option value="8">8 Person VIP Deck</option>
                </select>
              </div>
              <button 
                type="submit" 
                className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3.5 rounded-xl transition-all mt-4"
              >
                Confirm Table Allocation
              </button>
            </form>
          </div>
        )}

        {/* TAB 4: TRACKING */}
        {diningTab === 'tracking' && (
          <div className="max-w-xl mx-auto space-y-6">
            <div className="bg-zinc-900/40 backdrop-blur-xl border border-zinc-800 rounded-3xl p-6 shadow-2xl">
              <h2 className="text-lg font-bold tracking-tight mb-2">Live Vector Delivery Log</h2>
              <p className="text-xs text-zinc-500 mb-6">Real-time status updates via Veloce routing engine</p>
              
              <div className="font-mono text-xs space-y-3">
                {diningLogs.length === 0 ? (
                  <p className="text-zinc-600">No active dispatch log found. Place an order from the menu tab.</p>
                ) : (
                  diningLogs.map((log, index) => (
                    <div key={index} className="flex items-start gap-3 text-zinc-300 animate-fadeIn">
                      <span className="text-yellow-500">›</span>
                      <span>{log}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: EVENTS */}
        {diningTab === 'events' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold tracking-tight">Exclusive Gastronomy Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: "Molecular Fusion Night", date: "Every Friday, 20:00 UTC", desc: "Interactive multi-course culinary experience showcasing modern texture design." },
                { title: "Private Chef Cellar Showcase", date: "Monthly First Saturday", desc: "Exclusive wine pairing menu with custom curated dishes by executive chefs." }
              ].map((evt, i) => (
                <div key={i} className="bg-zinc-900/30 border border-zinc-800 p-6 rounded-2xl space-y-3">
                  <span className="text-[10px] font-mono text-yellow-500 bg-yellow-500/10 border border-yellow-500/20 px-2.5 py-1 rounded-full uppercase">{evt.date}</span>
                  <h3 className="text-lg font-bold text-white">{evt.title}</h3>
                  <p className="text-xs text-zinc-400 font-light leading-relaxed">{evt.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
