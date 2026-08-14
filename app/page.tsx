'use client';

import React, { useState, useEffect, JSX } from 'react';

// === TYPES & MULTI-CURRENCY LOGIC ===
type Currency = 'USD' | 'EUR' | 'GBP' | 'PKR';

const CURRENCY_RATES: Record<Currency, { symbol: string; rate: number }> = {
  USD: { symbol: '$', rate: 1 },
  EUR: { symbol: '€', rate: 0.92 },
  GBP: { symbol: '£', rate: 0.78 },
  PKR: { symbol: 'Rs ', rate: 278 }
};

// === CLIENT REVIEWS DATA ===
const CLIENT_REVIEWS = [
  {
    id: 1,
    name: "Alexander Wright",
    role: "CEO, Nexa Tech Global",
    review: "Naveed delivered our full-stack enterprise dashboard ahead of schedule. Exceptional performance and UI precision!",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 2,
    name: "Sarah Jenkins",
    role: "Product Lead, Gourmet Vibe",
    review: "The Veloce Dining system built by Naveed with live tracking and interactive calculators completely transformed our ordering UX.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 3,
    name: "Hamza Malik",
    role: "Founder, Zenith E-Com",
    review: "10/10 quality. Fast response time, super clean code, and zero bugs during product launch.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
  }
];

// === VELOCE MENU DATA ===
const MENU_ITEMS = [
  { id: 'm1', name: 'Truffle Glazed Wagyu Burger', category: 'Main', priceUSD: 24.00, tag: 'CHEF SPECIAL', image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=80", desc: "Aged Wagyu beef patty with black truffle aioli & caramelized shallots." },
  { id: 'm2', name: 'Smoked Salmon Avocado Crisp', category: 'Starters', priceUSD: 18.50, tag: 'FRESH', image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80", desc: "Fresh Norwegian salmon served on artisanal sourdough toast." },
  { id: 'm3', name: 'Saffron Wild Mushroom Risotto', category: 'Main', priceUSD: 29.00, tag: 'POPULAR', image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=500&q=80", desc: "Creamy Arborio rice infused with Spanish saffron & wild truffles." },
  { id: 'm4', name: 'Artisanal Matcha Espresso Tart', category: 'Desserts', priceUSD: 12.00, tag: 'DESSERT', image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=500&q=80", desc: "Uji matcha pastry cream paired with rich dark espresso crust." },
  { id: 'm5', name: 'Royal Grand Seafood Platter', category: 'Platters', priceUSD: 85.00, tag: 'SPECIAL OFFER', image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=500&q=80", desc: "Grilled lobster tail, jumbo tiger prawns, charred octopus & lemon butter." },
  { id: 'm6', name: 'Smoked BBQ Feast Platter', category: 'Platters', priceUSD: 65.00, tag: 'SPECIAL OFFER', image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=500&q=80", desc: "Slow-cooked beef brisket, smoked ribs, artisanal sausages & signature sauce." }
];

export default function InternationalPortfolioSystem(): JSX.Element {
  // Navigation & Core States
  const [activeApp, setActiveApp] = useState<'portfolio' | 'dining'>('portfolio');
  const [currency, setCurrency] = useState<Currency>('USD');
  const [notification, setNotification] = useState<string | null>(null);

  // Custom Offer Form State
  const [offerData, setOfferData] = useState({
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    projectType: 'Full-Stack Enterprise App',
    budgetUSD: 1500,
    message: ''
  });

  // Veloce Dining Engine State
  const [diningTab, setDiningTab] = useState<'home' | 'menu' | 'calculator' | 'reservation' | 'tracking' | 'events'>('home');
  const [diningFilter, setDiningFilter] = useState<string>('All');
  const [diningManifest, setDiningManifest] = useState<{ id: string; name: string; priceUSD: number; qty: number }[]>([]);
  const [diningTrackingActive, setDiningTrackingActive] = useState<boolean>(false);
  const [deliveryMode, setDeliveryMode] = useState<'pod' | 'drone'>('pod');
  const [countdown, setCountdown] = useState<number>(840);
  const [diningLogs, setDiningLogs] = useState<string[]>([]);
  
  // Reservation State
  const [resData, setResData] = useState({ name: '', classTier: 'business', date: '', time: '', guests: '2' });

  // Price Conversion Helper
  const formatPrice = (priceInUSD: number): string => {
    const { symbol, rate } = CURRENCY_RATES[currency];
    const converted = (priceInUSD * rate).toFixed(currency === 'PKR' ? 0 : 2);
    return `${symbol}${converted}`;
  };

  const triggerNotification = (msg: string): void => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  // Delivery Countdown Timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (diningTrackingActive && countdown > 0) {
      interval = setInterval(() => setCountdown(prev => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [diningTrackingActive, countdown]);

  // Telemetry Logs Simulation
  useEffect(() => {
    if (diningTrackingActive) {
      setDiningLogs([
        "Order #VEL-8942 received by kitchen node.",
        "Preparation initiated under temperature-controlled staging.",
        "Thermal dispatch packaging locked & verified."
      ]);
      const phrases = [
        "Courier assigned: Captain Tariq Khan (Vehicle: Autonomous Pod #EL-904).",
        "Route optimized via real-time traffic telemetry.",
        "Transit clearance granted: En route to destination.",
        "Proximity alert: Vehicle within 1.5 km zone.",
        "Drone Auto-Pilot Lock: Target landing pad verified."
      ];
      const timers = phrases.map((phrase, index) => 
        setTimeout(() => setDiningLogs(prev => [...prev, phrase]), (index + 1) * 2000)
      );
      return () => timers.forEach(clearTimeout);
    }
  }, [diningTrackingActive]);

  const calcSubtotal = diningManifest.reduce((acc, item) => acc + (item.priceUSD * item.qty), 0);
  const calcTax = calcSubtotal * 0.08;
  const calcDelivery = calcSubtotal > 0 ? 5.00 : 0;
  const calcGrandTotal = calcSubtotal + calcTax + calcDelivery;

  const filteredDining = diningFilter === 'All' ? MENU_ITEMS : MENU_ITEMS.filter(item => item.category === diningFilter);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Direct Offer Dispatch Handler
  const handleOfferSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formattedBudget = formatPrice(offerData.budgetUSD);
    const subject = encodeURIComponent(`Project Offer: ${offerData.projectType} from ${offerData.clientName}`);
    const body = encodeURIComponent(
      `CLIENT OFFER DETAILS:\n` +
      `----------------------\n` +
      `Name: ${offerData.clientName}\n` +
      `Email: ${offerData.clientEmail}\n` +
      `Phone/WhatsApp: ${offerData.clientPhone}\n` +
      `Project Type: ${offerData.projectType}\n` +
      `Estimated Budget: ${formattedBudget} (${offerData.budgetUSD} USD)\n\n` +
      `Project Requirements & Message:\n${offerData.message}`
    );

    window.location.href = `mailto:na0953237@gmail.com?subject=${subject}&body=${body}`;
    triggerNotification("🚀 Custom Offer compiled! Opening email client...");
  };

  return (
    <div className="min-h-screen bg-[#030712] text-white relative font-sans antialiased selection:bg-yellow-500/30">
      
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-zinc-900/90 backdrop-blur-xl border border-yellow-500/40 text-white px-6 py-3 rounded-full text-xs font-medium tracking-wide shadow-2xl flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></span>
          <span>{notification}</span>
        </div>
      )}

      {/* ================= PORTFOLIO MAIN CONTAINER ================= */}
      {activeApp === 'portfolio' && (
        <div className="max-w-5xl mx-auto px-6 py-12 space-y-12">
          
          {/* HEADER / INTRO SECTION */}
          <header className="space-y-6">
            <div className="flex flex-wrap justify-between items-start gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-widest font-semibold">Available for hires & custom contracts</span>
                </div>
                <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white mt-2">Naveed</h1>
                <p className="text-zinc-400 text-sm mt-1 font-medium">Full-Stack Engineer & Autonomous Web Systems Architect</p>
              </div>

              {/* Currency Selector */}
              <div className="flex items-center gap-1 bg-zinc-900/80 p-1 rounded-xl border border-zinc-800">
                {(['USD', 'EUR', 'GBP', 'PKR'] as Currency[]).map((curr) => (
                  <button key={curr} onClick={() => setCurrency(curr)} className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all ${currency === curr ? 'bg-yellow-500 text-black shadow-md' : 'text-zinc-400 hover:text-white'}`}>{curr}</button>
                ))}
              </div>
            </div>

            <p className="text-zinc-400 text-sm leading-relaxed max-w-2xl font-light">
              Designing & developing high-performance full-stack web platforms, real-time telemetry systems, interactive dining consoles, and AI-powered tools with precision.
            </p>

            {/* DIRECT CONTACT BUTTONS */}
            <div className="flex flex-wrap gap-3 pt-2">
              <a href="https://api.whatsapp.com/send?phone=923103273904&text=Hi%20Naveed,%20I%20have%20a%20project%20offer%20for%20you." target="_blank" rel="noopener noreferrer" className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500 hover:text-black text-xs font-bold px-4 py-2.5 rounded-xl transition-all flex items-center gap-2">
                💬 WhatsApp (+923103273904)
              </a>
              <a href="mailto:na0953237@gmail.com" className="bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 hover:bg-yellow-500 hover:text-black text-xs font-bold px-4 py-2.5 rounded-xl transition-all flex items-center gap-2">
                ✉️ Direct Email (na0953237@gmail.com)
              </a>
            </div>
          </header>

          {/* TRUST METRICS & METRICS DASHBOARD */}
          <section className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 bg-zinc-900/30 border border-zinc-800/80 rounded-3xl backdrop-blur-xl">
            <div className="text-center font-mono">
              <p className="text-2xl font-black text-yellow-500">25+</p>
              <p className="text-[10px] text-zinc-400 uppercase tracking-wider mt-1">Projects Delivered</p>
            </div>
            <div className="text-center font-mono">
              <p className="text-2xl font-black text-emerald-400">100%</p>
              <p className="text-[10px] text-zinc-400 uppercase tracking-wider mt-1">Client Satisfaction</p>
            </div>
            <div className="text-center font-mono">
              <p className="text-2xl font-black text-yellow-500">99.9%</p>
              <p className="text-[10px] text-zinc-400 uppercase tracking-wider mt-1">System Uptime</p>
            </div>
            <div className="text-center font-mono">
              <p className="text-2xl font-black text-emerald-400">24/7</p>
              <p className="text-[10px] text-zinc-400 uppercase tracking-wider mt-1">Direct Support</p>
            </div>
          </section>

          {/* FEATURED PRODUCTION PROJECTS */}
          <section className="space-y-6">
            <h2 className="text-xs font-mono text-yellow-500 uppercase tracking-widest">// Featured Production Applications</h2>

            <div className="grid grid-cols-1 gap-6">
              
              {/* VELOCE DINING CARD */}
              <div className="p-6 sm:p-8 bg-zinc-900/30 border border-zinc-800/80 hover:border-yellow-500/30 rounded-3xl transition-all duration-300 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 group shadow-2xl">
                <div className="space-y-2 max-w-xl">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 px-2.5 py-0.5 rounded">FULL GOURMET SYSTEM</span>
                    <span className="text-[10px] font-mono text-zinc-500">Next.js • TypeScript • Tailwind</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white group-hover:text-yellow-400 transition-colors">Veloce Dining Platform</h3>
                  <p className="text-xs text-zinc-400 font-light leading-relaxed">
                    Luxury culinary platform featuring real-time driver/drone telemetry, live countdown timers, multi-tier room reservations, and dynamic order calculators.
                  </p>
                </div>

                <div className="flex flex-col gap-2 w-full sm:w-auto">
                  <button onClick={() => setActiveApp('dining')} className="bg-yellow-500 hover:bg-yellow-400 text-black text-xs font-bold px-5 py-3 rounded-xl transition-all shadow-md text-center">
                    Launch Interactive App →
                  </button>
                  <a href="https://veloce-dining.vercel.app" target="_blank" rel="noopener noreferrer" className="bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-yellow-500 text-xs font-semibold px-5 py-2.5 rounded-xl transition-all text-center">
                    Visit Live Link ↗
                  </a>
                </div>
              </div>

              {/* AI GENERATOR CARD */}
              <div className="p-6 sm:p-8 bg-zinc-900/30 border border-zinc-800/80 hover:border-yellow-500/30 rounded-3xl transition-all duration-300 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 group shadow-2xl">
                <div className="space-y-2 max-w-xl">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-2.5 py-0.5 rounded">AI ENGINE</span>
                    <span className="text-[10px] font-mono text-zinc-500">React • OpenAI API • Tailwind</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white group-hover:text-yellow-400 transition-colors">AI Content Generator</h3>
                  <p className="text-xs text-zinc-400 font-light leading-relaxed">
                    Automated content platform that converts user prompts into structured, styled technical documentation and blog layouts instantly.
                  </p>
                </div>

                <a href="https://aiblogwriter.vercel.app" target="_blank" rel="noopener noreferrer" className="bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-yellow-500 text-xs font-semibold px-5 py-3 rounded-xl transition-all text-center w-full sm:w-auto">
                  Launch AI App ↗
                </a>
              </div>

            </div>
          </section>

          {/* CLIENT REVIEWS & TESTIMONIALS */}
          <section className="space-y-6">
            <h2 className="text-xs font-mono text-yellow-500 uppercase tracking-widest">// Trusted By Global Clients & Reviews</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {CLIENT_REVIEWS.map((rev) => (
                <div key={rev.id} className="bg-zinc-900/30 border border-zinc-800/80 p-6 rounded-3xl flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex text-yellow-400 text-xs gap-1 mb-3">
                      {Array.from({ length: rev.rating }).map((_, i) => (
                        <span key={i}>★</span>
                      ))}
                    </div>
                    <p className="text-xs text-zinc-300 font-light leading-relaxed">"{rev.review}"</p>
                  </div>

                  <div className="flex items-center gap-3 pt-3 border-t border-zinc-800/60">
                    <img src={rev.avatar} alt={rev.name} className="w-8 h-8 rounded-full object-cover" />
                    <div>
                      <p className="text-xs font-bold text-white">{rev.name}</p>
                      <p className="text-[10px] text-zinc-500">{rev.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* CUSTOM PROJECT OFFERS & DIRECT DISPATCH */}
          <section className="bg-zinc-900/30 border border-zinc-800 rounded-3xl p-8 backdrop-blur-xl space-y-6 shadow-2xl">
            <div className="flex justify-between items-start flex-wrap gap-2">
              <div>
                <span className="text-[10px] font-mono bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 px-2.5 py-1 rounded">INSTANT PROJECT OFFER GENERATOR</span>
                <h2 className="text-2xl font-bold text-white mt-2">Send Custom Project Offer Directly</h2>
                <p className="text-xs text-zinc-400 mt-1 font-light">Select your budget in {currency} ({formatPrice(offerData.budgetUSD)}). Offers are dispatched directly to my email and phone.</p>
              </div>
              <span className="text-xs font-mono text-yellow-500 bg-yellow-500/10 px-3 py-1 rounded-full border border-yellow-500/20">Selected: {formatPrice(offerData.budgetUSD)}</span>
            </div>

            <form onSubmit={handleOfferSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <input type="text" required placeholder="Your Full Name" className="w-full bg-black/60 border border-zinc-800 rounded-xl px-4 py-3 text-xs text-zinc-200 focus:outline-none focus:border-yellow-500" value={offerData.clientName} onChange={(e) => setOfferData({...offerData, clientName: e.target.value})} />
                <input type="email" required placeholder="Your Email Address" className="w-full bg-black/60 border border-zinc-800 rounded-xl px-4 py-3 text-xs text-zinc-200 focus:outline-none focus:border-yellow-500" value={offerData.clientEmail} onChange={(e) => setOfferData({...offerData, clientEmail: e.target.value})} />
                <input type="tel" placeholder="WhatsApp / Phone Number" className="w-full bg-black/60 border border-zinc-800 rounded-xl px-4 py-3 text-xs text-zinc-200 focus:outline-none focus:border-yellow-500" value={offerData.clientPhone} onChange={(e) => setOfferData({...offerData, clientPhone: e.target.value})} />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <select className="w-full bg-black/60 border border-zinc-800 rounded-xl px-4 py-3 text-xs text-zinc-200 focus:outline-none font-mono" value={offerData.projectType} onChange={(e) => setOfferData({...offerData, projectType: e.target.value})}>
                  <option value="Full-Stack Web App">Full-Stack Enterprise Web Application</option>
                  <option value="Restaurant / Dining System">Veloce Restaurant / Delivery Console</option>
                  <option value="E-Commerce System">Modern E-Commerce Engine</option>
                  <option value="AI Integration">AI API Custom Integration</option>
      </select>

                <select className="w-full bg-black/60 border border-zinc-800 rounded-xl px-4 py-3 text-xs text-zinc-200 focus:outline-none font-mono" value={offerData.budgetUSD} onChange={(e) => setOfferData({...offerData, budgetUSD: Number(e.target.value)})}>
                  <option value={500}>{formatPrice(500)} - Small Project ($500 USD)</option>
                  <option value={1500}>{formatPrice(1500)} - Medium Platform ($1,500 USD)</option>
                  <option value={3000}>{formatPrice(3000)} - Enterprise Application ($3,000 USD)</option>
                  <option value={5000}>{formatPrice(5000)} - Custom Full Suite ($5,000 USD+)</option>
                </select>
              </div>

              <textarea required rows={3} placeholder="Describe your custom project requirements..." className="w-full bg-black/60 border border-zinc-800 rounded-xl px-4 py-3 text-xs text-zinc-200 focus:outline-none focus:border-yellow-500" value={offerData.message} onChange={(e) => setOfferData({...offerData, message: e.target.value})} />

              <button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold text-xs py-3.5 rounded-xl transition-all shadow-lg">
                🚀 Send Custom Offer Directly via Email & WhatsApp →
              </button>
            </form>
          </section>

          {/* FOOTER */}
          <footer className="pt-8 border-t border-zinc-900 flex justify-between items-center text-xs text-zinc-500 font-mono">
            <p>© {new Date().getFullYear()} Naveed. All rights reserved.</p>
            <p>Direct Contact: +923103273904</p>
          </footer>

        </div>
      )}

      {/* ================= VELOCE DINING SYSTEM CONSOLE ================= */}
      {activeApp === 'dining' && (
        <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans relative z-10">
          <header className="sticky top-0 z-40 bg-black/80 backdrop-blur-md border-b border-zinc-900/80 px-6 py-3 flex flex-wrap items-center justify-between gap-4">
            <button onClick={() => { setActiveApp('portfolio'); setDiningTrackingActive(false); }} className="text-xs font-bold uppercase tracking-wider text-yellow-500 hover:text-yellow-400 transition-all">← Back To Main Portfolio</button>
            <nav className="flex items-center space-x-1 bg-zinc-900/80 p-1 rounded-xl border border-zinc-800/80">
              {(['home', 'menu', 'calculator', 'reservation', 'tracking', 'events'] as const).map((tab) => (
                <button key={tab} onClick={() => setDiningTab(tab)} className={`px-3 py-1.5 rounded-lg text-xs capitalize font-medium transition-all ${diningTab === tab ? 'bg-yellow-500 text-black font-bold shadow' : 'text-zinc-400 hover:text-zinc-200'}`}>{tab}</button>
              ))}
            </nav>
            <span className="text-[10px] bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 px-2.5 py-1 rounded-full font-mono uppercase tracking-widest">Veloce Suite v4.0</span>
          </header>

          <main className="max-w-6xl mx-auto px-6 py-10 relative z-10">
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

            {diningTab === 'menu' && (
              <div className="space-y-6">
                <div className="flex flex-wrap items-center justify-between bg-zinc-900/45 backdrop-blur-md border border-zinc-800 p-4 rounded-2xl gap-4">
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
                      <div className="flex justify-between"><span>Express Delivery Logistics:</span><span>{formatPrice(calcDelivery)}</span></div>
                      <div className="flex justify-between text-base font-bold text-white pt-3 border-t border-zinc-800">
                        <span>Grand Total Estimate:</span>
                        <span className="text-yellow-500">{formatPrice(calcGrandTotal)}</span>
                      </div>
                    </div>

                    <button onClick={() => { setDiningTrackingActive(true); setDiningTab('tracking'); triggerNotification("🚀 Order Dispatched to Live Courier Telemetry!"); }} className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold text-xs py-4 rounded-xl shadow-lg transition-all uppercase tracking-wider">Proceed to Delivery Telemetry →</button>
                  </div>
                )}
              </div>
            )}

            {diningTab === 'reservation' && (
              <div className="max-w-2xl mx-auto bg-zinc-900/30 border border-zinc-800 rounded-3xl p-8 backdrop-blur-xl shadow-2xl">
                <div className="mb-6">
                  <h2 className="text-xl font-bold">Veloce Dining Room Reservation</h2>
                  <p className="text-xs text-zinc-500 mt-1">Select table class: Ordinary, Economy, Business Class, or VIP Lounge.</p>
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

            {diningTab === 'tracking' && (
              <div className="max-w-3xl mx-auto space-y-6">
                <div className="bg-zinc-900/40 border border-zinc-800 rounded-3xl p-6 backdrop-blur-xl shadow-2xl">
                  <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-zinc-800">
                    <div>
                      <span className="text-[10px] font-mono text-yellow-500 bg-yellow-500/10 px-2.5 py-1 rounded border border-yellow-500/20 uppercase">Live Delivery Telemetry</span>
                      <h3 className="text-xl font-bold text-white mt-1">Active Dispatch Status</h3>
                    </div>

                    <div className="flex bg-black p-1 rounded-xl border border-zinc-800 text-xs">
                      <button onClick={() => setDeliveryMode('pod')} className={`px-3 py-1 rounded-lg transition-all ${deliveryMode === 'pod' ? 'bg-yellow-500 text-black font-bold' : 'text-zinc-400'}`}>Electric Pod</button>
                      <button onClick={() => setDeliveryMode('drone')} className={`px-3 py-1 rounded-lg transition-all ${deliveryMode === 'drone' ? 'bg-yellow-500 text-black font-bold' : 'text-zinc-400'}`}>Aerial Drone</button>
                    </div>
                  </div>

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

                  <div className="space-y-2 bg-black/80 p-4 rounded-2xl border border-zinc-800 font-mono text-xs max-h-[180px] overflow-y-auto text-zinc-400">
                    {diningLogs.map((log, idx) => (
                      <p key={idx} className="leading-relaxed">&gt; [TELEMETRY] {log}</p>
                    ))}
                    <div className="w-1.5 h-3.5 bg-yellow-500 animate-pulse inline-block align-middle"></div>
                  </div>
                </div>

                <div className="bg-zinc-900/30 border border-zinc-800 p-2 rounded-3xl overflow-hidden relative shadow-2xl">
                  <iframe title="Map Core" width="100%" height="240" frameBorder="0" src="https://www.openstreetmap.org/export/embed.html?bbox=66.9000%2C24.8000%2C67.1000%2C24.9500&amp;layer=mapnik" className="opacity-40 invert-[0.92] hue-rotate-[180deg] saturate-[0.3] rounded-2xl" />
                </div>
              </div>
            )}

            {diningTab === 'events' && (
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-zinc-900/30 backdrop-blur-xl border border-zinc-800 rounded-3xl overflow-hidden p-6 flex flex-col justify-between shadow-xl group">
                  <div>
                    <img src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=600&q=80" alt="Private Banquet" className="w-full h-48 object-cover rounded-2xl mb-4 group-hover:scale-105 transition-all duration-500" />
                    <h3 className="text-lg font-bold text-white">Corporate Banquets & Dinners</h3>
                    <p className="text-xs text-zinc-400 mt-2 font-light leading-relaxed">Custom dining layouts configured for corporate announcements, team celebrations, and executive networking.</p>
                  </div>
                  <button onClick={() => triggerNotification("📬 Event Query Logged. Management team will contact you.")} className="w-full bg-zinc-800 hover:bg-yellow-500 hover:text-black text-white text-xs font-bold py-3 rounded-xl border border-zinc-700 mt-6 transition-all">Request Event Booking →</button>
                </div>

                <div className="bg-zinc-900/30 backdrop-blur-xl border border-zinc-800 rounded-3xl overflow-hidden p-6 flex flex-col justify-between shadow-xl group">
                  <div>
                    <img src="https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=600&q=80" alt="VIP Deck" className="w-full h-48 object-cover rounded-2xl mb-4 group-hover:scale-105 transition-all duration-500" />
                    <h3 className="text-lg font-bold text-white">Private VIP Lounge</h3>
                    <p className="text-xs text-zinc-400 mt-2 font-light leading-relaxed">Isolated private dining space featuring custom menus and dedicated server team.</p>
                  </div>
                  <button onClick={() => triggerNotification("📬 VIP Lounge Request Logged.")} className="w-full bg-zinc-800 hover:bg-yellow-500 hover:text-black text-white text-xs font-bold py-3 rounded-xl border border-zinc-700 mt-6 transition-all">Request VIP Lounge →</button>
                </div>
              </div>
            )}
          </main>
        </div>
      )}

    </div>
  );
                  }
