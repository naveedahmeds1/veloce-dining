'use client';

import React, { useState, useEffect, JSX } from 'react';

// === INITIAL DATA ===
const INITIAL_PROJECTS = [
  {
    id: "cs1",
    title: "Veloce Dining Systems",
    category: "Full-Stack Hospitality Suite",
    client: "Veloce Group (USA)",
    tech: ["Next.js 14", "TypeScript", "Tailwind CSS"],
    metrics: { speed: "0.4s Load", retention: "+38% Orders", uptime: "99.99%" },
    problem: "Legacy order processing caused drop-offs during peak hours.",
    solution: "Engineered a zero-latency interactive menu & real-time courier tracking engine.",
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

export default function IntegratedPortfolio(): JSX.Element {
  const [activeTab, setActiveTab] = useState<'overview' | 'work' | 'calculator' | 'contact' | 'admin'>('overview');
  
  // ADMIN & AUTH STATES
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(false);
  const [adminPassword, setAdminPassword] = useState<string>('');
  const [projects, setProjects] = useState(INITIAL_PROJECTS);
  
  // ADMIN NOTIFICATIONS / INBOX STATE
  const [notifications, setNotifications] = useState<Array<{ id: string; type: string; message: string; date: string }>>([
    { id: 'n1', type: 'System', message: 'Veloce Dining Site Live Routing Active', date: 'Just Now' },
    { id: 'n2', type: 'Lead', message: 'Client inquiry received for $5,000 project scope', date: '10 mins ago' }
  ]);

  // NEW PROJECT UPLOAD FORM STATE
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [newClient, setNewClient] = useState('');
  const [newLiveUrl, setNewLiveUrl] = useState('');
  const [newProblem, setNewProblem] = useState('');

  // NOTIFICATION POPUP
  const [toast, setToast] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  // ADMIN LOGIN HANDLER
  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPassword === 'admin123') { // Replace with your secure password
      setIsAdminLoggedIn(true);
      triggerToast("Welcome Back, Owner! Admin Console Unlocked.");
    } else {
      triggerToast("Invalid Password!");
    }
  };

  // ADD NEW PROJECT (ADMIN SIDE)
  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newCategory) return;

    const newEntry = {
      id: `cs_${Date.now()}`,
      title: newTitle,
      category: newCategory,
      client: newClient || 'Private Client',
      tech: ['Next.js', 'Tailwind CSS'],
      metrics: { speed: "0.2s", retention: "+50%", uptime: "100%" },
      problem: newProblem || 'Custom Business Requirements',
      solution: 'Custom high-performance React architecture built and deployed.',
      liveUrl: newLiveUrl || '#'
    };

    setProjects([newEntry, ...projects]);
    
    // Add activity log to admin notifications
    setNotifications([
      { id: `n_${Date.now()}`, type: 'Upload', message: `New Project Uploaded: "${newTitle}"`, date: 'Just Now' },
      ...notifications
    ]);

    setNewTitle('');
    setNewCategory('');
    setNewClient('');
    setNewLiveUrl('');
    setNewProblem('');
    
    triggerToast("Project Successfully Published Live!");
  };

  return (
    <div className="min-h-screen bg-[#030712] text-white relative font-sans antialiased selection:bg-yellow-500/30 selection:text-yellow-200">
      
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50 bg-zinc-900 border border-yellow-500/30 text-white px-6 py-3 rounded-full text-xs font-medium shadow-2xl flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></span>
          <span>{toast}</span>
        </div>
      )}

      <main className="max-w-6xl mx-auto px-6 py-8 relative z-10">

        {/* HEADER */}
        <header className="flex flex-wrap justify-between items-center gap-4 mb-12 pb-6 border-b border-zinc-900">
          <div className="flex items-center gap-3">
            <span className="text-2xl font-black bg-gradient-to-r from-yellow-400 via-amber-300 to-amber-500 bg-clip-text text-transparent font-mono tracking-wider">
              Naveed.dev
            </span>
            <span className="text-[9px] font-mono font-bold bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 px-2.5 py-1 rounded-full uppercase">
              Owner Console Integrated
            </span>
          </div>

          <nav className="flex items-center gap-1 bg-zinc-900/80 p-1.5 rounded-full border border-zinc-800">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'work', label: 'Case Studies' },
              { id: 'admin', label: isAdminLoggedIn ? '👑 Owner Admin' : '🔒 Admin Login' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  activeTab === tab.id 
                    ? 'bg-yellow-500 text-black shadow-lg font-bold' 
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </header>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-12 text-center py-8">
            <h1 className="text-5xl font-extrabold tracking-tight">
              Enterprise Developer & <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500">
                Custom Systems Platform
              </span>
            </h1>
            <p className="text-zinc-400 max-w-xl mx-auto text-sm">
              Manage dynamic case studies and lead telemetry in real-time through the built-in Owner Control Center.
            </p>
          </div>
        )}
        client: newClient || 'Private Client',
      tech: ['Next.js', 'Tailwind CSS'],
      metrics: { speed: "0.2s", retention: "+50%", uptime: "100%" },
      problem: newProblem || 'Custom Business Requirements',
      solution: 'Custom high-performance React architecture built and deployed.',
      liveUrl: newLiveUrl || '#'
    };

    setProjects([newEntry, ...projects]);
    
    // Add activity log to admin notifications
    setNotifications([
      { id: `n_${Date.now()}`, type: 'Upload', message: `New Project Uploaded: "${newTitle}"`, date: 'Just Now' },
      ...notifications
    ]);

    setNewTitle('');
    setNewCategory('');
    setNewClient('');
    setNewLiveUrl('');
    setNewProblem('');
    
    triggerToast("Project Successfully Published Live!");
  };

  return (
    <div className="min-h-screen bg-[#030712] text-white relative font-sans antialiased selection:bg-yellow-500/30 selection:text-yellow-200">
      
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50 bg-zinc-900 border border-yellow-500/30 text-white px-6 py-3 rounded-full text-xs font-medium shadow-2xl flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></span>
          <span>{toast}</span>
        </div>
      )}

      <main className="max-w-6xl mx-auto px-6 py-8 relative z-10">

        {/* HEADER */}
        <header className="flex flex-wrap justify-between items-center gap-4 mb-12 pb-6 border-b border-zinc-900">
          <div className="flex items-center gap-3">
            <span className="text-2xl font-black bg-gradient-to-r from-yellow-400 via-amber-300 to-amber-500 bg-clip-text text-transparent font-mono tracking-wider">
              Naveed.dev
            </span>
            <span className="text-[9px] font-mono font-bold bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 px-2.5 py-1 rounded-full uppercase">
              Owner Console Integrated
            </span>
          </div>

          <nav className="flex items-center gap-1 bg-zinc-900/80 p-1.5 rounded-full border border-zinc-800">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'work', label: 'Case Studies' },
              { id: 'admin', label: isAdminLoggedIn ? '👑 Owner Admin' : '🔒 Admin Login' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  activeTab === tab.id 
                    ? 'bg-yellow-500 text-black shadow-lg font-bold' 
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </header>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-12 text-center py-8">
            <h1 className="text-5xl font-extrabold tracking-tight">
              Enterprise Developer & <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500">
                Custom Systems Platform
              </span>
            </h1>
            <p className="text-zinc-400 max-w-xl mx-auto text-sm">
              Manage dynamic case studies and lead telemetry in real-time through the built-in Owner Control Center.
            </p>
          </div>
        )}

        {/* TAB 2: DYNAMIC CASE STUDIES */}
        {activeTab === 'work' && (
          <div className="space-y-8">
            <div className="flex justify-between items-center border-b border-zinc-900 pb-4">
              <h2 className="text-2xl font-bold">Published Projects</h2>
              <span className="text-xs font-mono text-yellow-500">{projects.length} Active Items</span>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {projects.map((cs) => (
                <div key={cs.id} className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-2xl space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] font-mono text-yellow-500 uppercase">{cs.category}</span>
                      <h3 className="text-lg font-bold text-white mt-1">{cs.title}</h3>
                    </div>
                    <a href={cs.liveUrl} target="_blank" rel="noreferrer" className="text-xs bg-yellow-500 text-black font-bold px-3 py-1.5 rounded-lg">
                      Visit Live 🚀
                    </a>
                  </div>
                  <p className="text-xs text-zinc-400">{cs.problem}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: SECRET OWNER ADMIN PANEL */}
        {activeTab === 'admin' && (
          <div className="max-w-4xl mx-auto space-y-8">
            
            {!isAdminLoggedIn ? (
              /* LOGIN BOX */
              <div className="max-w-md mx-auto bg-zinc-900/60 border border-zinc-800 p-8 rounded-3xl backdrop-blur-xl text-center space-y-6">
                <div>
                  <span className="text-2xl">🔒</span>
                  <h2 className="text-xl font-bold mt-2">Owner Authentication</h2>
                  <p className="text-xs text-zinc-500 mt-1">Enter master key to access admin notifications & data uploader.</p>
                </div>

                <form onSubmit={handleAdminLogin} className="space-y-4">
                  <input 
                    type="password"
                    placeholder="Enter Admin Password (admin123)"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    className="w-full bg-black/60 border border-zinc-800 rounded-xl px-4 py-3 text-xs outline-none focus:border-yellow-500 text-center font-mono"
                  />
                  <button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold text-xs py-3 rounded-xl transition-all">
                    Unlock Owner Dashboard
                  </button>
                </form>
              </div>
            ) : (
              /* ADMIN DASHBOARD CONSOLE */
              <div className="space-y-8">
                
                {/* ADMIN HEADER */}
                <div className="flex justify-between items-center bg-zinc-900/80 border border-zinc-800 p-6 rounded-2xl">
                  <div>
                    <h2 className="text-xl font-bold flex items-center gap-2">
                      <span>👑 Owner Dashboard</span>
                      <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded font-mono">Authenticated</span>
                    </h2>
                    <p className="text-xs text-zinc-400 mt-1">Direct upload engine & lead activity center</p>
                  </div>
                  <button onClick={() => setIsAdminLoggedIn(false)} className="text-xs bg-zinc-800 hover:bg-zinc-700 px-3 py-1.5 rounded-lg border border-zinc-700">
                    Lock Console
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  
                  {/* DATA UPLOADER BOX */}
                  <div className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-2xl space-y-4">
                    <h3 className="text-sm font-bold text-yellow-400 font-mono">// Upload New Project Data</h3>
                    
                    <form onSubmit={handleAddProject} className="space-y-3">
                      <input 
                        type="text" 
                        placeholder="Project Title (e.g. Hyper App)" 
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        className="w-full bg-black/50 border border-zinc-800 px-3 py-2 rounded-lg text-xs outline-none focus:border-yellow-500"
                        required
                      />
                      <input 
                        type="text" 
                        placeholder="Category (e.g. SaaS / Mobile App)" 
                        value={newCategory} 
                        onChange={(e) => setNewCategory(e.target.value)}
                        className="w-full bg-black/50 border border-zinc-800 px-3 py-2 rounded-lg text-xs outline-none focus:border-yellow-500"
                        required
                      />
                      <input 
                        type="text" 
                        placeholder="Client Name" 
                        value={newClient} 
                        onChange={(e) => setNewClient(e.target.value)}
                        className="w-full bg-black/50 border border-zinc-800 px-3 py-2 rounded-lg text-xs outline-none focus:border-yellow-500"
                      />
                      <input 
                        type="url" 
                        placeholder="Live URL (e.g. https://domain.vercel.app)" 
                        value={newLiveUrl} 
                        onChange={(e) => setNewLiveUrl(e.target.value)}
                        className="w-full bg-black/50 border border-zinc-800 px-3 py-2 rounded-lg text-xs outline-none focus:border-yellow-500"
                      />
                      <textarea 
                        placeholder="Short Problem / Overview" 
                        value={newProblem} 
                        onChange={(e) => setNewProblem(e.target.value)}
                        className="w-full bg-black/50 border border-zinc-800 px-3 py-2 rounded-lg text-xs outline-none focus:border-yellow-500 h-20"
                      />
                      <button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold text-xs py-3 rounded-lg font-mono">
                        + Publish Live To Portfolio
                      </button>
                    </form>
                  </div>

                  {/* ADMIN NOTIFICATIONS & INBOX BOX */}
                  <div className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-2xl space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-sm font-bold text-yellow-400 font-mono">// Activity & Lead Inbox</h3>
                      <span className="text-[10px] bg-zinc-800 px-2 py-0.5 rounded text-zinc-400">{notifications.length} Logs</span>
                    </div>

                    <div className="space-y-3 max-h-[320px] overflow-y-auto pr-1">
                      {notifications.map((item) => (
                        <div key={item.id} className="bg-black/50 border border-zinc-800 p-3 rounded-xl space-y-1">
                          <div className="flex justify-between items-center">
                            <span className="text-[9px] font-mono text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded">{item.type}</span>
                            <span className="text-[9px] text-zinc-500">{item.date}</span>
                          </div>
                          <p className="text-xs text-zinc-300 font-light">{item.message}</p>
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
    </div>
  );
                    }
