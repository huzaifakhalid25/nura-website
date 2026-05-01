"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '../../lib/supabase'; // Supabase Connection zaroori hai iske liye

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ total_revenue: 0, total_orders: 0, total_products: 0, total_users: 0 });
  const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);
  const [dialProducts, setDialProducts] = useState<any[]>([]);
  const [allProducts, setAllProducts] = useState<any[]>([]);
  
  // Realtime Notification State!
  const [newOrderAlert, setNewOrderAlert] = useState<string | null>(null);

  useEffect(() => {
    // 1. Initial Data Fetching
    fetchDashboardData();

    // 2. REAL-TIME MAGIC: Listen for new orders without refreshing!
    const orderSubscription = supabase
      .channel('public:orders')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'orders' }, payload => {
        // Notification bell bajayen!
        const newOrder = payload.new;
        setNewOrderAlert(`🔔 New Order! #${newOrder.id} - Rs. ${newOrder.total_amount}`);
        
        // Notification 5 second baad ghayab karein
        setTimeout(() => setNewOrderAlert(null), 5000);
        
        // Stats ko dobara khinchien taake paise foran update hon
        fetchDashboardData();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(orderSubscription);
    };
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    
    // Fake Stats for now (Inhe baad mein real Supabase queries se replace karenge)
    setStats({
      total_revenue: 145000,
      total_orders: 34,
      total_products: 12,
      total_users: 156
    });

    // Fetch Products
    const { data: prods } = await supabase.from('products').select('*').order('id', { ascending: false });
    if (prods) {
      setAllProducts(prods);
      setFeaturedProducts(prods.filter(p => p.is_featured));
      setDialProducts(prods.filter(p => p.in_dial));
    }
    
    setLoading(false);
  };

  // Toggle Function for Grid / Dial
  const toggleDisplay = async (id: number, type: 'featured' | 'dial', currentStatus: boolean) => {
    const column = type === 'featured' ? 'is_featured' : 'in_dial';
    await supabase.from('products').update({ [column]: !currentStatus }).eq('id', id);
    fetchDashboardData(); // Refresh list after update
  };

  return (
    <div className="min-h-screen bg-[#f4f6f8] font-sans absolute inset-0 z-[100000] overflow-y-auto pb-20">
      
      {/* ==================================
          REALTIME NOTIFICATION POPUP
      ================================== */}
      <div className={`fixed top-4 left-1/2 -translate-x-1/2 z-[100001] transition-all duration-500 ease-out ${newOrderAlert ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-10 scale-95 pointer-events-none'}`}>
        <div className="bg-green-600 border-2 border-white text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 w-max max-w-[90vw]">
          <p className="text-sm font-bold tracking-wide">{newOrderAlert}</p>
        </div>
      </div>

      {/* ==================================
          TOP HEADER (Mobile Friendly)
      ================================== */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-[#008060] text-white w-8 h-8 flex items-center justify-center rounded font-bold text-lg">N</div>
            <h1 className="text-lg md:text-xl font-bold text-gray-800 hidden sm:block">Store Admin</h1>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-sm font-bold text-[#008060] hover:underline">View Live Shop →</Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-[#202223]">Store Overview</h2>
        </div>

        {/* ==================================
            STATS CARDS
        ================================== */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 border-l-4 border-l-[#008060]">
            <div className="text-xs md:text-sm text-gray-500 mb-1 font-medium">Total Sales</div>
            <div className="text-lg md:text-2xl font-bold text-[#008060]">Rs. {stats.total_revenue.toLocaleString()}</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <div className="text-xs md:text-sm text-gray-500 mb-1 font-medium">Total Orders</div>
            <div className="text-lg md:text-2xl font-bold text-gray-900">{stats.total_orders}</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <div className="text-xs md:text-sm text-gray-500 mb-1 font-medium">Total Products</div>
            <div className="text-lg md:text-2xl font-bold text-gray-900">{stats.total_products}</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <div className="text-xs md:text-sm text-gray-500 mb-1 font-medium">Customers</div>
            <div className="text-lg md:text-2xl font-bold text-gray-900">{stats.total_users}</div>
          </div>
        </div>

        {/* ==================================
            PRODUCT GRIDS (Featured & Dial)
        ================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          
          {/* FEATURED SELECTION */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col h-[500px]">
            <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-gray-900 text-sm md:text-base">Featured Selection</h3>
                <p className="text-[10px] text-gray-500">Choose exactly 4 products for home page grid.</p>
              </div>
              <button className="bg-[#008060] text-white px-3 py-1.5 rounded text-xs font-bold hover:bg-[#006e52] transition">Add +</button>
            </div>
            <div className="p-4 flex-1 overflow-y-auto" style={{ scrollbarWidth: 'thin' }}>
              {featuredProducts.length > 4 && <p className="text-red-500 text-xs mb-3 font-bold">Warning: More than 4 selected!</p>}
              <div className="space-y-3">
                {loading ? <p className="text-center text-sm text-gray-400 py-4">Loading...</p> : 
                  allProducts.map(p => (
                    <div key={p.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg border border-transparent hover:border-gray-100 transition">
                      <div className="flex items-center gap-3">
                        <img src={p.image_url?.startsWith('http') ? p.image_url : `/${p.image_url}`} className="w-10 h-10 rounded object-cover border bg-gray-100" />
                        <span className="font-medium text-sm text-gray-900 truncate max-w-[120px] sm:max-w-[200px]">{p.name}</span>
                      </div>
                      <div className="flex gap-2">
                        <button className="text-[#008060] font-bold text-[10px] border border-[#008060] px-2 py-1 rounded hover:bg-[#008060] hover:text-white transition hidden sm:block">Edit</button>
                        <button 
                          onClick={() => toggleDisplay(p.id, 'featured', p.is_featured)}
                          className={`text-[10px] font-bold px-3 py-1 rounded-full transition ${p.is_featured ? 'bg-green-100 text-green-800 hover:bg-red-100 hover:text-red-800' : 'bg-gray-100 text-gray-600 hover:bg-green-100 hover:text-green-800'}`}
                        >
                          {p.is_featured ? 'Remove' : 'Add to Grid'}
                        </button>
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>

          {/* 3D DIAL SELECTION */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col h-[500px]">
            <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-gray-900 text-sm md:text-base">3D Interactive Dial</h3>
                <p className="text-[10px] text-gray-500">Select up to 10 products to spin.</p>
              </div>
              <button className="bg-[#008060] text-white px-3 py-1.5 rounded text-xs font-bold hover:bg-[#006e52] transition">Add +</button>
            </div>
            <div className="p-4 flex-1 overflow-y-auto" style={{ scrollbarWidth: 'thin' }}>
              <p className="text-blue-600 text-xs mb-3 font-bold">Selected: {dialProducts.length}/10</p>
              <div className="space-y-3">
                {loading ? <p className="text-center text-sm text-gray-400 py-4">Loading...</p> : 
                  allProducts.map(p => (
                    <div key={p.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg border border-transparent hover:border-gray-100 transition">
                      <div className="flex items-center gap-3">
                        <img src={p.image_url?.startsWith('http') ? p.image_url : `/${p.image_url}`} className="w-10 h-10 rounded object-cover border bg-gray-100" />
                        <span className="font-medium text-sm text-gray-900 truncate max-w-[120px] sm:max-w-[200px]">{p.name}</span>
                      </div>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => toggleDisplay(p.id, 'dial', p.in_dial)}
                          className={`text-[10px] font-bold px-3 py-1 rounded-full transition ${p.in_dial ? 'bg-blue-100 text-blue-800 hover:bg-red-100 hover:text-red-800' : 'bg-gray-100 text-gray-600 hover:bg-blue-100 hover:text-blue-800'}`}
                        >
                          {p.in_dial ? 'Remove' : 'Add to Dial'}
                        </button>
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>

        </div>

        {/* ==================================
            WEBSITE CONTENT MANAGER
        ================================== */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <h2 className="text-xl md:text-2xl font-bold text-[#202223] mb-6">Website Content Manager</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Box 1: Hero */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 md:p-6 border-t-4 border-t-[#008060]">
              <h3 className="font-bold text-lg mb-4 text-gray-900">1. Hero Section</h3>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Main Title</label>
              <input type="text" defaultValue="Taste <em>The Luxury</em>" className="w-full border border-gray-300 rounded-lg p-2.5 mb-4 text-sm focus:outline-none focus:border-[#008060] focus:ring-1 focus:ring-[#008060]" />
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Subtitle</label>
              <textarea rows={2} defaultValue="Single-origin cacao · Artisan crafted · Luxury gifting" className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-none focus:border-[#008060] focus:ring-1 focus:ring-[#008060] resize-none" />
            </div>

            {/* Box 2: Banner */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 md:p-6 border-t-4 border-t-[#008060]">
              <h3 className="font-bold text-lg mb-4 text-gray-900">2. Banner Details</h3>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Banner Heading</label>
              <input type="text" defaultValue="Crafted for<br><em>Moments</em>" className="w-full border border-gray-300 rounded-lg p-2.5 mb-4 text-sm focus:outline-none focus:border-[#008060] focus:ring-1 focus:ring-[#008060]" />
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Marquee Text</label>
              <textarea rows={2} defaultValue="Free delivery above PKR 2000, Premium artisan treats" className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-none focus:border-[#008060] focus:ring-1 focus:ring-[#008060] resize-none" />
            </div>
            
          </div>

          <div className="mt-6 flex justify-end">
            <button className="w-full sm:w-auto bg-[#008060] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#006e52] transition-colors shadow-lg active:scale-95">
              Save All Content
            </button>
          </div>
        </div>

      </main>

      {/* MAGIC: Hides customer header/footer automatically */}
      <style dangerouslySetInnerHTML={{__html: `
        body > header, body > footer, .bg-white.text-center.py-2 { display: none !important; }
        body { overflow: hidden; } 
      `}} />

    </div>
  );
}