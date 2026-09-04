'use client';

import React, { useState, useEffect, JSX } from 'react';

// === INITIAL DATA & CASE STUDIES ===
const INITIAL_PROJECTS = [
  {
    id: "cs1",
    title: "Veloce Dining Systems",
    category: "Full-Stack Hospitality Suite",
    client: "Veloce Group (USA)",
    tech: ["Next.js 14", "TypeScript", "Tailwind CSS", "WebSockets"],
    metrics: { speed: "0.4s Load", retention: "+38% Orders", uptime: "99.99%" },
    problem: "Legacy order processing caused drop-offs during peak hours.",
    solution: "Engineered a zero-latency interactive menu with drone telemetry & courier tracking.",
    liveUrl: "https://veloce-dining.vercel.app"
  },
  {
    id: "cs2",
    title: "Apex Combo Storefront",
    category: "High-Frequency B2B Hardware",
    client: "Apex Quantum Technologies",
    tech: ["React 18", "Tailwind CSS", "GraphQL"],
    metrics: { conversion: "+45% Checkout", lighthouse: "99/100 Score", scale: "10k+ Daily Users" },
    problem: "B2B hardware buyers required dynamic parameter customization.",
    solution: "Developed an ultra-responsive dynamic hardware simulation engine.",
    liveUrl: "https://apex-combo-store.vercel.app"
  }
];

const MENU_ITEMS = [
  { id: 'm1', name: 'Truffle Glazed Prime Burger', category: 'Main', price: 24.00, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=80" },
  { id: 'm2', name: 'Smoked Salmon Avocado Crisp', category: 'Starters', price: 18.50, image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80" },
  { id: 'm3', name: 'Saffron Infused Risotto Sphere', category: 'Main', price: 29.00, image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=500&q=80" },
  { id: 'm4', name: 'Artisanal Matcha Espresso Tart', category: 'Desserts', price: 12.00, image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=500&q=80" },
];

export default function IntegratedPortfolio(): JSX.Element {
  const [activeApp, setActiveApp] = useState<'portfolio' | 'dining'>('portfolio');
  const [activeTab, setActiveTab] = useState<'overview' | 'work' | 'admin'>('overview');
  
  // VELOCE DINING STATES
  const [diningTab, setDiningTab] = useState<'home' | 'menu' | 'tracking'>('home');
  const [diningManifest, setDiningManifest] = useState<{ id: string; name: string; price: number }[]>([]);
  const [countdown, setCountdown] = useState<number>(180); // 3 minutes order countdown
  const [isTimerActive, setIsTimerActive] = useState<boolean>(false);
  const [vehicleDetails, setVehicleDetails] = useState({ id: 'VLC-DRONE-88', battery: '98%', status: 'In Transit' });
  const [deliveryLogs, setDeliveryLogs] = useState<string[]>([]);

  // OWNER ADMIN STATES
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(false);
  const [adminPassword, setAdminPassword] = useState<string>('');
  const [projects, setProjects] = useState(INITIAL_PROJECTS);
  const [notifications, setNotifications] = useState<Array<{ id: string; type: string; message: string; date: string }>>([
    { id: 'n1', type: 'System', message: 'Veloce Dining Web Console Active', date: 'Just Now' },
    { id: 'n2', type: 'Lead', message: 'Inquiry received for $5,000 project scope', date: '12 mins ago' }
  ]);

  // NEW PROJECT UPLOAD STATE
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [newLiveUrl, setNewLiveUrl] = useState('');

  // TOAST NOTIFICATION
  const [toast, setToast] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  // COUNTDOWN TIMER EFFECT
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isTimerActive && countdown > 0) {
      timer = setInterval(() => setCountdown(prev => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [isTimerActive, countdown]);

  // ADMIN LOGIN
  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
if (adminPassword === 'admin123') {
      setIsAdminLoggedIn(true);
      triggerToast("👑 Owner Access Granted. Welcome Back!");
    } else {
      triggerToast("❌ Access Denied: Incorrect Password!");
    }
  };

  // UPLOAD PROJECT DATA (ADMIN SIDE)
  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newCategory) return;

    const newEntry = {
      id: `cs_${Date.now()}`,
      title: newTitle,
      category: newCategory,
      client: "Direct Owner Upload",
      tech: ["Next.js 14", "TypeScript"],
      metrics: { speed: "0.2s", retention: "+100%", uptime: "100%" },
      problem: "Custom platform deployment requirement.",
      solution: "Deployed via Owner Control Console.",
      liveUrl: newLiveUrl || "#"
    };

    setProjects([newEntry, ...projects]);
    setNotifications([
      { id: `n_${Date.now()}`, type: 'Upload', message: `New project published: ${newTitle}`, date: 'Just Now' },
      ...notifications
    ]);

    setNewTitle('');
    setNewCategory('');
    setNewLiveUrl('');
    triggerToast("🚀 New Data Published To Portfolio!");
  };

  // START ORDER TRACKING
  const handleCheckout = () => {
    if (diningManifest.length === 0) return;
    setIsTimerActive(true);
    setDiningTab('tracking');
    setDeliveryLogs([
      "Order payload registered in telemetry database...",
      "Autonomous Drone VLC-DRONE-88 assigned to pad 04.",
      "Vector trajectory locked. Dispatching courier unit..."
    ]);
    triggerToast("🚁 Autonomous Drone Delivery Dispatched!");
    
    // Send Notification to Owner Admin Panel
    setNotifications(prev => [
      { id: `n_${Date.now()}`, type: 'Order', message: `New Veloce Order Value: $${diningManifest.reduce((a,b)=>a+b.price, 0).toFixed(2)}`, date: 'Just Now' },
      ...prev
    ]);
  };

  return (
    <div className="min-h-screen bg-[#030712] text-white font-sans antialiased relative selection:bg-yellow-500/30 selection:text-yellow-200">
      
      {/* Toast Alert */}
      {toast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-zinc-900 border border-yellow-500/40 text-white px-6 py-3 rounded-full text-xs font-medium shadow-2xl flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></span>
          <span>{toast}</span>
        </div>
      )}

      {/* ================= VELOCE DINING RESTAURANT CONSOLE ================= */}
      {activeApp === 'dining' ? (
        <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col">
          <header className="sticky top-0 z-40 bg-black/90 border-b border-zinc-800 px-6 py-4 flex flex-wrap items-center justify-between gap-4">
            <button onClick={() => setActiveApp('portfolio')} className="text-xs font-bold uppercase tracking-wider text-yellow-500 hover:text-yellow-400">
              ← Back To Main Terminal
            </button>
            <div className="flex gap-2 bg-zinc-900 p-1 rounded-xl border border-zinc-800">
              {(['home', 'menu', 'tracking'] as const).map(tab => (
                <button key={tab} onClick={() => setDiningTab(tab)} className={`px-4 py-1.5 rounded-lg text-xs capitalize font-medium ${diningTab === tab ? 'bg-yellow-500 text-black font-bold' : 'text-zinc-400'}`}>
                  {tab}
                </button>
              ))}
            </div>
            <a href="https://veloce-dining.vercel.app" target="_blank" rel="noreferrer" className="text-xs bg-yellow-500 text-black font-bold px-4 py-2 rounded-full">
              Live Vercel Site 🚀
              </a>
          </header>

          <main className="max-w-5xl mx-auto px-6 py-12 flex-1 w-full space-y-8">
            {diningTab === 'home' && (
              <div className="relative h-[380px] rounded-3xl overflow-hidden bg-cover bg-center flex items-center p-8 border border-zinc-800" style={{ backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.95), rgba(0,0,0,0.3)), url('https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&q=80')` }}>
                <div className="max-w-xl space-y-4">
                  <span className="text-yellow-500 font-mono text-[10px] uppercase tracking-widest bg-yellow-500/10 border border-yellow-500/20 px-3 py-1 rounded-full">Veloce Autonomous Dining</span>
                  <h1 className="text-4xl font-black text-white leading-tight">Next-Gen Culinary Infrastructure</h1>
                  <p className="text-zinc-400 text-xs font-light">Experience automated menu selection, real-time drone telemetry, and sub-second order dispatching.</p>
                  <button onClick={() => setDiningTab('menu')} className="bg-yellow-500 text-black font-bold text-xs px-6 py-3 rounded-xl shadow-lg">
                    Open Smart Menu →
                  </button>
                </div>
              </div>
            )}

            {diningTab === 'menu' && (
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 grid sm:grid-cols-2 gap-4">
                  {MENU_ITEMS.map((item) => (
                    <div key={item.id} className="bg-zinc-900/40 border border-zinc-800 rounded-2xl overflow-hidden p-4 space-y-3">
                      <img src={item.image} alt={item.name} className="h-32 w-full object-cover rounded-xl" />
                      <div className="flex justify-between items-center">
                        <h3 className="text-xs font-bold text-white">{item.name}</h3>
                        <span className="text-xs font-mono font-bold text-yellow-500">${item.price.toFixed(2)}</span>
                      </div>
                      <button onClick={() => setDiningManifest([...diningManifest, item])} className="w-full bg-zinc-800 hover:bg-zinc-700 text-xs font-medium py-2 rounded-lg border border-zinc-700">
                        + Add To Manifest
                      </button>
                    </div>
                  ))}
                </div>

                <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 font-mono space-y-4 h-fit">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">// Order Queue ({diningManifest.length})</h3>
                  <div className="space-y-2 max-h-48 overflow-y-auto text-xs">
                    {diningManifest.map((itm, i) => (
                      <div key={i} className="flex justify-between bg-black/40 p-2 rounded-lg border border-zinc-800">
                        <span>{itm.name}</span>
                        <span className="text-yellow-500">${itm.price.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  {diningManifest.length > 0 && (
                    <button onClick={handleCheckout} className="w-full bg-yellow-500 text-black font-bold text-xs py-3 rounded-xl uppercase">
                      Dispatch Drone Courier →
                    </button>
                  )}
                </div>
              </div>
            )}

            {diningTab === 'tracking' && (
              <div className="max-w-2xl mx-auto space-y-6">
                <div className="bg-zinc-900/60 border border-zinc-800 rounded-3xl p-8 backdrop-blur-xl space-y-6 font-mono">
                  <div className="flex justify-between items-center border-b border-zinc-800 pb-4">
                    <div>
                      <span className="text-[10px] text-zinc-500 uppercase">Drone Unit Telemetry</span>
                      <h2 className="text-lg font-bold text-yellow-400">{vehicleDetails.id}</h2>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-zinc-500 block">Battery Level</span>
                      <span className="text-xs font-bold text-emerald-400">{vehicleDetails.battery}</span>
                    </div>
                  </div>

                  {/* COUNTDOWN TIMER DISPLAY */}
                  <div className="bg-black/60 border border-zinc-800 p-6 rounded-2xl text-center space-y-2">
                    <span className="text-[10px] text-zinc-500 uppercase tracking-widest block">// Estimated Drone Arrival</span>
                    <div className="text-4xl font-bold text-yellow-400 tracking-wider">
                      {Math.floor(countdown / 60)}:{('0' + (countdown % 60)).slice(-2)}
                    </div>
                  </div>

                  {/* TELEMETRY LOGS */}
                  <div className="space-y-2 bg-black/40 p-4 rounded-xl border border-zinc-800 text-xs text-zinc-400">
                    {deliveryLogs.map((log, i) => <p key={i}>&gt; {log}</p>)}
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
     ) : (
        /* ================= MAIN PORTFOLIO & OWNER DECK ================= */
        <main className="max-w-6xl mx-auto px-6 py-8">
          <header className="flex flex-wrap justify-between items-center gap-4 mb-12 pb-6 border-b border-zinc-900">
            <div className="flex items-center gap-3">
              <span className="text-2xl font-black bg-gradient-to-r from-yellow-400 via-amber-300 to-amber-500 bg-clip-text text-transparent font-mono">
                Naveed.dev
              </span>
              <span className="text-[9px] font-mono font-bold bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 px-2.5 py-1 rounded-full uppercase">
                Senior Systems Engineer
              </span>
            </div>

            <nav className="flex gap-1 bg-zinc-900/80 p-1.5 rounded-full border border-zinc-800">
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'work', label: 'Case Studies' },
                { id: 'admin', label: isAdminLoggedIn ? '👑 Owner Admin' : '🔒 Owner Login' }
              ].map(tab => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id as any)} className={`px-4 py-2 rounded-full text-xs font-semibold ${activeTab === tab.id ? 'bg-yellow-500 text-black font-bold' : 'text-zinc-400 hover:text-white'}`}>
                  {tab.label}
                </button>
              ))}
            </nav>
          </header>

          {activeTab === 'overview' && (
            <div className="space-y-12 text-center py-8">
              <h1 className="text-5xl font-extrabold tracking-tight">
                Engineering Enterprise Applications & <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500">
                  Autonomous Web Systems
                </span>
              </h1>
              <div className="pt-4 flex justify-center gap-4">
                <button onClick={() => setActiveApp('dining')} className="bg-yellow-500 text-black font-bold text-xs px-6 py-3 rounded-xl shadow-xl">
                  Launch Veloce Dining Web Console 🚀
                </button>
                <a href="https://veloce-dining.vercel.app" target="_blank" rel="noreferrer" className="bg-zinc-900 border border-zinc-800 text-xs px-6 py-3 rounded-xl font-semibold">
                  Visit Production Site ↗
                </a>
              </div>
            </div>
          )}

          {activeTab === 'work' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold border-b border-zinc-900 pb-4">Dynamic Case Studies</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {projects.map((cs) => (
                  <div key={cs.id} className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-2xl space-y-4">
                    <span className="text-[10px] font-mono text-yellow-500 uppercase">{cs.category}</span>
                    <h3 className="text-lg font-bold text-white">{cs.title}</h3>
                    <p className="text-xs text-zinc-400">{cs.solution}</p>
                    <a href={cs.liveUrl} target="_blank" rel="noreferrer" className="inline-block text-xs font-bold bg-yellow-500 text-black px-4 py-2 rounded-lg">
                      Launch Web Link 🚀
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'admin' && (
            <div className="max-w-4xl mx-auto space-y-8">
              {!isAdminLoggedIn ? (
                <div className="max-w-md mx-auto bg-zinc-900/60 border border-zinc-800 p-8 rounded-3xl text-center space-y-4">
                  <h2 className="text-lg font-bold">Owner Authentication</h2>
                  <p className="text-xs text-zinc-500">Enter secure key to access notification center & project manager.</p>
                  <form onSubmit={handleAdminLogin} className="space-y-3">
                    <input 
                      type="password" 
                      placeholder="Password (admin123)" 
                      value={adminPassword} 
                      onChange={(e) => setAdminPassword(e.target.value)} 
                      className="w-full bg-black/60 border border-zinc-800 px-4 py-3 rounded-xl text-xs text-center outline-none focus:border-yellow-500" 
                    />
                    <button type="submit" className="w-full bg-yellow-500 text-black font-bold text-xs py-3 rounded-xl">Unlock Panel</button>
                  </form>
                </div>
              ) : (
              <div className="space-y-8">
                  <div className="flex justify-between items-center bg-zinc-900/80 border border-zinc-800 p-6 rounded-2xl">
                    <h2 className="text-lg font-bold">👑 Owner Administration Dashboard</h2>
                    <button onClick={() => setIsAdminLoggedIn(false)} className="text-xs bg-zinc-800 px-3 py-1.5 rounded-lg border border-zinc-700">Lock</button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    {/* DATA UPLOADER */}
                    <div className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-2xl space-y-4">
                      <h3 className="text-xs font-mono font-bold text-yellow-400">// Data Uploader Engine</h3>
                      <form onSubmit={handleAddProject} className="space-y-3">
                        <input type="text" placeholder="Project Title" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} className="w-full bg-black/50 border border-zinc-800 px-3 py-2 rounded-lg text-xs outline-none" required />
                        <input type="text" placeholder="Category" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} className="w-full bg-black/50 border border-zinc-800 px-3 py-2 rounded-lg text-xs outline-none" required />
                        <input type="url" placeholder="Production URL" value={newLiveUrl} onChange={(e) => setNewLiveUrl(e.target.value)} className="w-full bg-black/50 border border-zinc-800 px-3 py-2 rounded-lg text-xs outline-none" />
                        <button type="submit" className="w-full bg-yellow-500 text-black font-bold text-xs py-3 rounded-lg">+ Publish To Live Site</button>
                      </form>
                    </div>

                    {/* OWNER NOTIFICATIONS INBOX */}
                    <div className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-2xl space-y-4">
                      <h3 className="text-xs font-mono font-bold text-yellow-400">// Notification Inbox ({notifications.length})</h3>
                      <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                        {notifications.map(n => (
                          <div key={n.id} className="bg-black/50 border border-zinc-800 p-3 rounded-xl space-y-1">
                            <div className="flex justify-between text-[9px] font-mono">
                              <span className="text-emerald-400">{n.type}</span>
                              <span className="text-zinc-500">{n.date}</span>
                            </div>
                            <p className="text-xs text-zinc-300">{n.message}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </main>
      )}

    </div>
  );
                    }
