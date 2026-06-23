'use client';

import React, { useState, useEffect } from 'react';

// === DATA SCHEMAS AND INTERFACES ===
interface MenuItem {
  id: string;
  name: string;
  category: string;
  price: number;
  tag: string;
}

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface OrderMetadata {
  fullName: string;
  email: string;
  address: string;
  postalCode: string;
  paymentMethod: 'card' | 'crypto' | 'cod';
  cardNumber: string;
}

// === DINING DATA LAYER ===
const MENU_ITEMS: MenuItem[] = [
  { id: 'm1', name: 'Truffle Glazed Prime Burger', category: 'Main', price: 24.00, tag: 'CHEF SPECIAL' },
  { id: 'm2', name: 'Smoked Salmon Avocado Crisp', category: 'Starters', price: 18.50, tag: '' },
  { id: 'm3', name: 'Saffron Infused Risotto Sphere', category: 'Main', price: 29.00, tag: 'CHEF SPECIAL' },
  { id: 'm4', name: 'Artisanal Matcha Espresso Tart', category: 'Desserts', price: 12.00, tag: '' },
];

// === E-COMMERCE DATA LAYER ===
const ECOM_PRODUCTS = [
  { id: 'p1', name: 'AeroGlide Mechanical Keyboard', category: 'Peripherals', price: 149.00, img: '⌨️', desc: 'Gasket-mounted hot-swappable tactile deck.' },
  { id: 'p2', name: 'QuantumCore ANC Headphones', category: 'Audio', price: 299.50, img: '🎧', desc: 'Hybrid active noise cancellation with hi-res audio.' },
  { id: 'p3', name: 'LuminaDesk Ergonomic Mouse', category: 'Peripherals', price: 89.00, img: '🖱️', desc: 'Precision tracking with magnetic infinite scroll.' },
  { id: 'p4', name: 'ApexMatrix 4K Pro Monitor', category: 'Displays', price: 549.00, img: '🖥️', desc: 'Mini-LED 144Hz ultra-wide color spectrum monitor.' },
];

export default function IntegratedPortfolio() {
  // Navigation Matrix State: portfolio | dining | ecommerce | checkout | tracking
  const [activeApp, setActiveApp] = useState<'portfolio' | 'dining' | 'ecommerce' | 'checkout' | 'tracking'>('portfolio');
  const [checkoutSource, setCheckoutSource] = useState<'dining' | 'ecommerce'>('dining');

  // --- Dynamic System State Vectors ---
  const [diningFilter, setDiningFilter] = useState('All');
  const [diningManifest, setDiningManifest] = useState<CartItem[]>([]);
  const [ecomCart, setEcomCart] = useState<CartItem[]>([]);
  const [notification, setNotification] = useState<string | null>(null);

  // --- Checkout Form Framework ---
  const [formValues, setFormValues] = useState<OrderMetadata>({
    fullName: '',
    email: '',
    address: '',
    postalCode: '',
    paymentMethod: 'card',
    cardNumber: ''
  });

  // --- Live Tracking Telemetry States ---
  const [trackingEta, setTrackingEta] = useState(45); 
  const [trackingStatus, setTrackingStatus] = useState<'processing' | 'routing' | 'dispatched' | 'delivered'>('processing');

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (activeApp === 'tracking') {
      timer = setInterval(() => {
        setTrackingEta((prev) => {
          if (prev <= 1) {
            setTrackingStatus('delivered');
            clearInterval(timer);
            return 0;
          }
          if (prev === 30) setTrackingStatus('routing');
          if (prev === 15) setTrackingStatus('dispatched');
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [activeApp]);

  const triggerNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 4000);
  };

  // --- Core Mutation Logic Hub ---
  const addToDiningManifest = (item: MenuItem) => {
    setDiningManifest(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      return [...prev, { id: item.id, name: item.name, price: item.price, quantity: 1 }];
    });
    triggerNotification(`Added ${item.name} to target manifest ledger.`);
  };

  const addToEcomCart = (prod: typeof ECOM_PRODUCTS[0]) => {
    setEcomCart(prev => {
      const existing = prev.find(item => item.id === prod.id);
      if (existing) return prev.map(item => item.id === prod.id ? { ...item, quantity: item.quantity + 1 } : item);
      return [...prev, { id: prod.id, name: prod.name, price: prod.price, quantity: 1 }];
    });
    triggerNotification(`Added ${prod.name} to micro-state system cart.`);
  };

  const updateQuantity = (id: string, delta: number, currentTarget: 'dining' | 'ecommerce') => {
    const updateFn = (prev: CartItem[]) =>
      prev.map(item => {
        if (item.id === id) {
          const nextQty = item.quantity + delta;
          return nextQty > 0 ? { ...item, quantity: nextQty } : null;
        }
        return item;
      }).filter((item): item is CartItem => item !== null);

    if (currentTarget === 'dining') setDiningManifest(updateFn);
    else setEcomCart(updateFn);
  };

  // --- Calculations Matrix Engine ---
  const getActiveCheckoutPayload = () => checkoutSource === 'dining' ? diningManifest : ecomCart;
  const currentSubtotal = getActiveCheckoutPayload().reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const currentShipping = currentSubtotal > 200 ? 0 : 15.00;
  const currentTax = currentSubtotal * 0.08; // 8% International standard VAT
  const currentGrandTotal = currentSubtotal + currentShipping + currentTax;

  const initiateCheckoutState = (source: 'dining' | 'ecommerce') => {
    const targetPayload = source === 'dining' ? diningManifest : ecomCart;
    if (targetPayload.length === 0) {
      triggerNotification("⚠️ Process aborted: Transaction payloads cannot be empty!");
      return;
    }
    setCheckoutSource(source);
    setActiveApp('checkout');
  };

  const executeOrderFinalization = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formValues.fullName || !formValues.email || !formValues.address) {
      triggerNotification("⚠️ Core verification error: Missing required field telemetry nodes.");
      return;
    }
    // Success State Migration
    triggerNotification("🚀 Order Authenticated! Secure routing pipeline active.");
    setTrackingEta(45);
    setTrackingStatus('processing');
    setActiveApp('tracking');
  };

  const purgeTargetCarts = () => {
    if (checkoutSource === 'dining') setDiningManifest([]);
    else setEcomCart([]);
  };

  const capabilities = [
    { icon: "💻", title: "Custom Web Apps", desc: "Bespoke websites built completely from scratch using clean code tailored perfectly to your business needs." },
    { icon: "🛍️", title: "E-Commerce Ecosystems", desc: "High-converting digital stores with fast product grids, secure layouts, and seamless shopping experiences." },
    { icon: "🛠️", title: "CMS & No-Code Tools", desc: "Expert development using WordPress, Shopify, and page builders for fast deployment and easy management." }
  ];

  return (
    <div className="min-h-screen bg-black text-white relative font-sans selection:bg-purple-500/30 selection:text-white overflow-x-hidden">
      
      {/* Toast Alert Banner */}
      {notification && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-md bg-zinc-950 border-2 border-purple-500 text-purple-400 font-mono text-xs p-4 rounded-xl shadow-2xl flex items-center justify-between animate-fade-in">
          <span>{notification}</span>
          <button onClick={() => setNotification(null)} className="text-zinc-500 hover:text-white font-bold ml-2">×</button>
        </div>
      )}

      {/* ================= MODULE 01: DINING APP HUB ================= */}
      {activeApp === 'dining' && (
        <main className="min-h-screen bg-black text-white px-4 py-12 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <div className="w-full flex justify-between items-center mb-10 bg-zinc-950 p-4 rounded-xl border border-zinc-900">
            <button onClick={() => setActiveApp('portfolio')} className="text-xs font-bold uppercase tracking-wider text-purple-400 hover:text-purple-300 transition-colors">
              ← Back to Portfolio
            </button>
            <span className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[9px] font-bold px-2.5 py-0.5 rounded uppercase tracking-widest">
              Veloce Core Active
            </span>
          </div>

          <div className="w-full bg-zinc-950/40 border border-zinc-900 p-6 rounded-2xl text-left">
            <h1 className="text-3xl font-extrabold tracking-tight text-white mb-2">Interactive Digital Concierge</h1>
            <p className="text-xs text-zinc-500 font-mono mb-8">Enterprise routing framework for live restaurant operations</p>

            <div className="flex gap-2 mb-6 justify-end">
              {['All', 'Main', 'Starters', 'Desserts'].map((cat) => (
                <button key={cat} onClick={() => setDiningFilter(cat)} className={`px-3 py-1 rounded text-xs font-medium border transition-all ${diningFilter === cat ? 'bg-zinc-900 border-zinc-700 text-white' : 'bg-transparent border-zinc-900 text-zinc-500 hover:text-zinc-300'}`}>
                  {cat}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {MENU_ITEMS.filter(item => diningFilter === 'All' || item.category === diningFilter).map((item) => (
                <div key={item.id} className="bg-zinc-950 border border-zinc-900 p-4 rounded-xl flex flex-col justify-between hover:border-zinc-800 transition-all">
                  <div>
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="text-xs font-bold text-zinc-200">{item.name}</h3>
                      {item.tag && <span className="text-[7px] font-bold text-amber-500 bg-amber-500/10 border border-amber-500/20 px-1.5 py-0.5 rounded-sm">{item.tag}</span>}
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-4 pt-2 border-t border-zinc-900/60">
                    <span className="text-xs font-mono font-bold text-blue-400">${item.price.toFixed(2)}</span>
                    <button onClick={() => addToDiningManifest(item)} className="bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-[9px] font-medium px-2 py-1 rounded border border-zinc-800 transition-colors">
                      + Add to Manifest
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Dynamic Tracking Manifest Panel */}
            <div className="w-full bg-zinc-950 border border-zinc-900 rounded-xl p-4 mb-6 font-mono">
              <div className="flex justify-between items-center mb-3 pb-2 border-b border-zinc-900">
                <h3 className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Live Transaction Queue</h3>
                <span className="text-[9px] bg-zinc-900 px-2 py-0.5 rounded text-zinc-500">{diningManifest.reduce((a,c)=>a+c.quantity,0)} Items</span>
              </div>
              {diningManifest.length === 0 ? (
                <p className="text-center py-4 text-[10px] text-zinc-600">Queue Empty. Awaiting customer parameters...</p>
              ) : (
                <div className="space-y-2 max-h-[160px] overflow-y-auto mb-4 text-xs text-zinc-400 pr-2">
                  {diningManifest.map((itm) => (
                    <div key={itm.id} className="flex justify-between items-center bg-zinc-950 p-2 rounded border border-zinc-900/60">
                      <span>// {itm.name} (x{itm.quantity})</span>
                      <div className="flex items-center gap-3">
                        <span className="text-blue-400 font-bold">${(itm.price * itm.quantity).toFixed(2)}</span>
                        <div className="flex gap-1 border border-zinc-800 rounded bg-black">
                          <button onClick={() => updateQuantity(itm.id, -1, 'dining')} className="px-1 text-zinc-500 hover:text-white">-</button>
                          <button onClick={() => updateQuantity(itm.id, 1, 'dining')} className="px-1 text-zinc-500 hover:text-white">+</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <button onClick={() => initiateCheckoutState('dining')} className="w-full bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-black py-3.5 rounded-lg uppercase tracking-widest transition-all">
                Proceed To Global Checkout Terminal
              </button>
            </div>
          </div>
        </main>
      )}

      {/* ================= MODULE 02: CUSTOM E-COMMERCE CORE ================= */}
      {activeApp === 'ecommerce' && (
        <main className="min-h-screen bg-[#07070a] text-zinc-100 px-4 py-12 max-w-4xl mx-auto font-sans">
          <div className="w-full flex justify-between items-center mb-10 bg-zinc-900/40 border border-zinc-800/80 p-4 rounded-2xl shadow-xl backdrop-blur-md">
            <button onClick={() => setActiveApp('portfolio')} className="text-xs font-bold uppercase tracking-wider text-blue-400 hover:text-blue-300 transition-colors">
              ← Return to Developer Deck
            </button>
            <span className="text-xs font-mono text-zinc-400 bg-zinc-900 px-3 py-1 rounded-lg border border-zinc-800">
              Payload Total: <span className="text-emerald-400 font-bold">${ecomCart.reduce((a,c)=>a+(c.price*c.quantity),0).toFixed(2)}</span>
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-left">
            <div className="lg:col-span-2 space-y-6">
              <div className="border-b border-zinc-800 pb-4">
                <span className="text-[9px] font-bold tracking-widest text-blue-500 uppercase bg-blue-500/10 px-2.5 py-1 rounded border border-blue-500/20">PRODUCTION APEX HUB</span>
                <h1 className="text-3xl font-black text-white tracking-tight mt-3">Next-Gen Hardware Matrix</h1>
                <p className="text-zinc-500 text-xs mt-1">High conversion lightning fast storefront simulation module</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {ECOM_PRODUCTS.map((product) => (
                  <div key={product.id} className="bg-zinc-900/20 border border-zinc-800/80 rounded-2xl p-5 flex flex-col justify-between hover:border-zinc-700 transition-all duration-300 group">
                    <div>
                      <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-xl mb-4 shadow-md">{product.img}</div>
                      <span className="text-[9px] font-bold text-zinc-500 tracking-wider uppercase font-mono">{product.category}</span>
                      <h3 className="text-sm font-bold text-white mt-1">{product.name}</h3>
                      <p className="text-xs text-zinc-400 mt-2 leading-relaxed">{product.desc}</p>
                    </div>
                    <div className="flex justify-between items-center mt-6 pt-3 border-t border-zinc-800/40">
                      <span className="text-sm font-mono font-bold text-emerald-400">${product.price.toFixed(2)}</span>
                      <button onClick={() => addToEcomCart(product)} className="bg-blue-600 hover:bg-blue-500 text-white font-semibold text-[10px] px-3 py-1.5 rounded-lg tracking-wide transition-colors">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dynamic Mini-Cart Side Deck */}
            <div className="bg-zinc-900/30 border border-zinc-800/80 rounded-2xl p-5 h-fit font-mono shadow-2xl backdrop-blur-xl">
              <h2 className="text-xs font-black uppercase tracking-widest text-zinc-400 mb-4 pb-2 border-b border-zinc-800">Real-Time Cart Layer</h2>
              {ecomCart.length === 0 ? (
                <p className="text-[10px] text-zinc-500 text-center py-8">System queue layer empty.</p>
              ) : (
                <div className="space-y-3 mb-6 max-h-[260px] overflow-y-auto pr-1">
                  {ecomCart.map((item) => (
                    <div key={item.id} className="bg-zinc-950 p-3 rounded-xl border border-zinc-900 flex flex-col gap-2">
                      <div className="flex justify-between text-xs text-zinc-200 font-sans font-bold">
                        <span className="truncate max-w-[120px]">{item.name}</span>
                        <span className="text-emerald-400">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-[9px] text-zinc-500">Qty: {item.quantity}</span>
                        <div className="flex items-center gap-1 bg-zinc-900 rounded border border-zinc-800">
                          <button onClick={() => updateQuantity(item.id, -1, 'ecommerce')} className="text-zinc-500 hover:text-white px-1.5">-</button>
                          <button onClick={() => updateQuantity(item.id, 1, 'ecommerce')} className="text-zinc-500 hover:text-white px-1.5">+</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <button onClick={() => initiateCheckoutState('ecommerce')} className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[10px] font-black py-3 rounded-xl uppercase tracking-widest shadow-lg">
                Secure Checkout Routing
              </button>
            </div>
          </div>
        </main>
      )}

      {/* ================= MODULE 03: PROFESSIONAL STANDARD CHECKOUT PAGE ================= */}
      {activeApp === 'checkout' && (
        <main className="min-h-screen bg-neutral-950 text-white px-4 py-16 font-sans">
          <div className="max-w-4xl mx-auto text-left">
            <button onClick={() => setActiveApp(checkoutSource)} className="text-xs font-mono text-zinc-500 hover:text-white mb-8 block">
              ← ABORT INJECTION AND RETURN
            </button>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
              {/* Payment & Shipping Forms Architecture */}
              <div className="md:col-span-3 space-y-6">
                <div className="bg-zinc-900/30 border border-zinc-800/80 rounded-2xl p-6">
                  <h2 className="text-xl font-bold tracking-tight mb-4">1. International Shipping Registry</h2>
                  <form onSubmit={executeOrderFinalization} className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-mono uppercase text-zinc-500 mb-1">Receiver Legal Full Name *</label>
                      <input type="text" required value={formValues.fullName} onChange={e => setFormValues({...formValues, fullName: e.target.value})} placeholder="Alex Mercer" className="w-full bg-black border border-zinc-800 rounded-lg p-2.5 text-sm focus:border-purple-500 outline-none transition-all" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono uppercase text-zinc-500 mb-1">Destination Notification Email *</label>
                      <input type="email" required value={formValues.email} onChange={e => setFormValues({...formValues, email: e.target.value})} placeholder="alex@matrix-node.io" className="w-full bg-black border border-zinc-800 rounded-lg p-2.5 text-sm focus:border-purple-500 outline-none transition-all" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono uppercase text-zinc-500 mb-1">Bespoke Physical Street Address *</label>
                      <input type="text" required value={formValues.address} onChange={e => setFormVa
