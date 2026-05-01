"use client";
import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import Link from 'next/link';

export default function ProductsPage() {
  // Yahan <any[]> laga diya hai taake TypeScript khamosh ho jaye
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getProducts() {
      const { data } = await supabase.from('products').select('*').order('id', { ascending: false });
      setProducts(data || []);
      setLoading(false);
    }
    getProducts();
  }, []);

  return (
    <main className="min-h-screen bg-[#faf6f0] font-sans">
      <section className="bg-[#111] py-20 text-center px-4">
        <h1 className="text-5xl md:text-6xl font-serif text-white mb-4">Our <i className="text-[#e8c99a] not-italic">Collection</i></h1>
        <p className="text-[#c49a6c] tracking-[0.3em] uppercase text-xs">Handcrafted Artisan Chocolates</p>
      </section>

      <section className="py-20 px-6 max-w-7xl mx-auto">
        {loading ? (
          <p className="text-center text-gray-500 italic">Curating collection...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10">
            {products.map((p: any) => ( // Yahan bhi :any add kar diya hai
              <Link href={`/product/${p.id}`} key={p.id} className="group cursor-pointer block">
                <div className="aspect-[4/5] bg-white rounded-2xl overflow-hidden mb-4 shadow-sm border border-gray-100 relative">
                  {p.is_sale && <span className="absolute top-3 left-3 bg-black text-white text-[9px] uppercase tracking-widest px-3 py-1 rounded-full z-10">Sale</span>}
                  <img src={p.image_url?.startsWith('http') ? p.image_url : `/${p.image_url}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={p.name} />
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-serif text-black">{p.name}</h3>
                  <p className="text-[#c49a6c] font-bold mt-1">Rs. {Number(p.price).toLocaleString()}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}