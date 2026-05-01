"use client";
import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabase';
import Link from 'next/link';
import { useCart } from './context/CartContext'; // <-- Global Cart Import

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);
  const [dialProducts, setDialProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Global Cart Functions
  const { addToCart } = useCart();
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Dial State
  const [currentDial, setCurrentDial] = useState(0);
  const [radius, setRadius] = useState(300);
  const rotorRef = useRef(null);

  // Fetch Data from Supabase
  useEffect(() => {
    async function loadData() {
      const { data: featured } = await supabase.from('products').select('*').eq('is_featured', true).order('id', { ascending: false }).limit(4);
      const { data: dial } = await supabase.from('products').select('*').eq('in_dial', true).order('id', { ascending: false }).limit(10);
      setFeaturedProducts(featured || []);
      setDialProducts(dial || []);
      setLoading(false);
    }
    loadData();
  }, []);

  // Intersection Observer
  useEffect(() => {
    if (loading) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add('on');
      });
    }, { threshold: 0.05 }); 
    
    document.querySelectorAll('.rv').forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [loading]);

  // 3D Dial Calculation
  useEffect(() => {
    const n = dialProducts.length;
    if (n === 0) return;
    const iw = window.innerWidth < 640 ? 230 : 268;
    const R = Math.round((iw / 2) / Math.tan(Math.PI / n)) + 80;
    setRadius(R);
  }, [dialProducts.length]);

  const n = dialProducts.length;
  const theta = n > 0 ? 360 / n : 0;
  const goNext = () => setCurrentDial((prev) => (prev + 1) % n);
  const goPrev = () => setCurrentDial((prev) => (prev - 1 + n) % n);

  // Asli Add to Cart Function
  const handleAddToCart = (product: any) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: Number(product.price),
      qty: 1, // Default 1 add hoga home page se
      image: product.image_url?.startsWith('http') ? product.image_url : `/${product.image_url}`
    });
    
    setToastMessage(`${product.name} added to cart ✨`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <main id="main-content" className="font-sans bg-[var(--cream)]">
      
      {/* TOAST NOTIFICATION */}
      <div className={`fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] transition-all duration-500 ease-out ${toastMessage ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95 pointer-events-none'}`}>
        <div className="bg-[#111] border border-[var(--gold)] text-white px-6 py-4 rounded-full shadow-2xl flex items-center gap-3 w-max max-w-[90vw]">
          <span className="text-[var(--gold)] text-lg">✨</span>
          <p className="text-xs sm:text-sm font-medium tracking-wide">{toastMessage}</p>
        </div>
      </div>

      {/* 1. HERO SECTION */}
      <section className="hero">
        <video className="hero-vid" autoPlay loop muted playsInline>
          <source src="/nura.webm" type="video/webm" />
        </video>
        <div className="hero-grad"></div>
        <div className="hero-body">
          <div className="h-content" id="h-content">
            <p className="h-tag">Handcrafted in Pakistan &middot; Est. 2026</p>
            <h1 className="h-title">Taste<em>The Luxury</em></h1>
            <p className="h-sub">Single-origin cacao &nbsp;&middot;&nbsp; Artisan crafted &nbsp;&middot;&nbsp; Luxury gifting</p>
            <Link href="/products" className="h-cta">Explore Collection &nbsp;&#8594;</Link>
          </div>
        </div>
      </section>

      {/* 2. MARQUEE */}
      <div className="mq-wrap">
        <div className="mq-track">
          {[1, 2, 3, 4].map((i) => (
            <React.Fragment key={i}>
              <span className="mq-item">Free delivery above PKR 2000</span>
              <span className="mq-item">Premium artisan treats</span>
              <span className="mq-item">Gift wrapping available</span>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* 3. TRUST BAR */}
      <div className="trust-bar">
        <div className="max-w-4xl mx-auto px-5 grid grid-cols-2 md:grid-cols-4 gap-5">
          {[
            ['✦', 'Premium Cacao', 'Single Origin'],
            ['🎁', 'Gift Ready', 'Luxury Packaging'],
            ['⚡', 'Fast Delivery', 'Across Pakistan'],
            ['★', '100% Authentic', 'Artisan Made']
          ].map((t, i) => (
            <div className="ti rv" style={{ transitionDelay: `${i * 70}ms` }} key={i}>
              <div className="ti-icon" aria-hidden="true">{t[0]}</div>
              <div className="ti-v">{t[1]}</div>
              <div className="ti-l">{t[2]}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. FEATURED PRODUCTS */}
      <section className="prod-sec" id="prod-sec">
        <div className="max-w-6xl mx-auto px-5">
          <div className="text-center mb-20 rv">
            <p className="sec-label mb-4">Featured Selection</p>
            <h2 className="sec-title">The Signature Collection</h2>
            <div className="gem-div"><span style={{ color: 'var(--gold-dark-text)', fontSize: '12px' }}>★</span></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-16 gap-x-8">
            {featuredProducts.map((p, i) => (
              <div className="rv" style={{ transitionDelay: `${(i + 1) * 100}ms` }} key={p.id}>
                <div className="luxury-box">
                  <Link href={`/product/${p.id}`} className="block w-full">
                    <div className="lb-img-wrap">
                      {p.is_sale && <div className="sale-tag">Sale</div>}
                      <img src={p.image_url?.startsWith('http') ? p.image_url : `/${p.image_url}`} loading="lazy" alt={p.name} className="lb-img" />
                    </div>
                  </Link>
                  <h3 className="lb-title">{p.name}</h3>
                  <div className="lb-desc whitespace-pre-wrap">{p.description || 'An exquisite artisan creation, meticulously handcrafted.'}</div>
                  <Link href={`/product/${p.id}`} className="lb-btn">Discover More</Link>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-20 rv">
            <Link href="/products" className="inline-block border-b border-black pb-1 text-xs tracking-widest uppercase text-gray-900 font-bold hover:text-[#8a6340] hover:border-[#8a6340] transition duration-300">
              View The Complete Collection
            </Link>
          </div>
        </div>
      </section>

      {/* 5. BANNER */}
      <section className="bnr rv">
        <div className="bnr-bg">NURA</div>
        <div className="bnr-in">
          <p className="bnr-ey">The Nura Promise</p>
          <h2 className="bnr-h">Crafted for<br /><em>Moments</em></h2>
          <p className="bnr-p">Every piece of chocolate tells a story — from the cacao farm to your hands.</p>
          <Link href="/products" className="bnr-a">Shop Now &rarr;</Link>
        </div>
      </section>

      {/* 6. TESTIMONIALS */}
      <section className="ts-sec">
        <div className="max-w-7xl mx-auto px-4 mb-12 rv text-center">
          <p className="sec-label mb-2">What Our Customers Say</p>
          <h2 className="sec-title">Loved by Thousands</h2>
        </div>
        <div style={{ overflow: 'hidden' }}>
          <div className="ts-track">
            {[1, 2, 3].map((_, idx) => (
              <React.Fragment key={idx}>
                <div className="tsc">
                  <div className="tsc-s">★★★★★</div>
                  <p className="tsc-t">"The most exquisite chocolate I have tasted."</p>
                  <p className="tsc-a">Aisha K.</p>
                </div>
                <div className="tsc">
                  <div className="tsc-s">★★★★★</div>
                  <p className="tsc-t">"Gifted these to my clients, amazing quality."</p>
                  <p className="tsc-a">Hamza R.</p>
                </div>
                <div className="tsc">
                  <div className="tsc-s">★★★★★</div>
                  <p className="tsc-t">"Absolutely divine. Will order again."</p>
                  <p className="tsc-a">Sara M.</p>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* 7. THE INTERACTIVE DIAL */}
      <section className="dial-sec" id="dial-sec">
        <div className="dial-bg-t">NURA</div>
        <div className="dial-ring"></div>
        <div className="text-center z-20 mb-0 rv">
          <p className="sec-label mb-3" style={{ color: 'var(--gold)' }}>Interactive Experience</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2rem,6vw,4.2rem)', fontWeight: 300, color: '#fff', lineHeight: 1.05 }}>The Signature <em>Dial</em></h2>
          <div className="gem-div" style={{ marginTop: '12px' }}><span style={{ color: 'var(--gold)', fontSize: '12px' }}>★</span></div>
        </div>

        <div className="scene" id="scene">
          <div 
            className="rotor" 
            ref={rotorRef}
            style={{ transform: `translateZ(${-radius}px) rotateY(${currentDial * -theta}deg)` }}
          >
            {n > 0 ? dialProducts.map((row, idx) => {
              const active = idx === currentDial;
              return (
                <div 
                  key={row.id} 
                  className={`di ${active ? 'on' : ''}`}
                  style={{ 
                    transform: `rotateY(${theta * idx}deg) translateZ(${radius}px) scale(${active ? 1 : 0.62})`,
                    opacity: active ? 1 : (idx === (currentDial + 1) % n || idx === (currentDial - 1 + n) % n) ? 0.3 : 0
                  }}
                >
                  <Link href={`/product/${row.id}`} style={{ display: 'block', height: '52%', overflow: 'hidden', marginBottom: '14px', border: '1px solid rgba(196,154,108,0.15)', borderRadius: '8px' }}>
                    <img src={row.image_url?.startsWith('http') ? row.image_url : `/${row.image_url}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt={row.name} />
                  </Link>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', textAlign: 'center' }}>
                    <div>
                      <h3 style={{ fontFamily: "'Cormorant Garamond', serif", color: '#fff', fontSize: '18px', marginBottom: '5px', fontWeight: 300 }}>{row.name}</h3>
                      <p style={{ color: 'var(--gold)', fontSize: '11px', letterSpacing: '0.2em', marginBottom: '12px' }} className="price-tag">{Number(row.price).toLocaleString()}</p>
                    </div>
                    <div className="abc" style={{ opacity: active ? '1' : '0', pointerEvents: active ? 'auto' : 'none', transition: 'opacity 0.5s' }}>
                      <Link href={`/product/${row.id}`} style={{ display: 'block', border: '1px solid rgba(196,154,108,0.35)', color: 'var(--gold)', padding: '6px', fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none', marginBottom: '6px', borderRadius: '30px' }}>View Details</Link>
                      
                      {/* ADD TO CART BUTTON (Global Connection) */}
                      <button 
                        onClick={() => handleAddToCart(row)}
                        style={{ width: '100%', background: 'var(--gold)', color: '#000', border: 'none', padding: '8px', fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 'bold', cursor: 'pointer', borderRadius: '30px' }}
                      >
                        Add Item
                      </button>

                    </div>
                  </div>
                </div>
              );
            }) : <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px', textAlign: 'center', marginTop: '80px' }}>Loading...</div>}
          </div>
        </div>

        <div className="d-ctrl">
          <button className="d-btn" onClick={goPrev}>&larr;</button>
          <div className="d-num">{String(currentDial + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}</div>
          <button className="d-btn" onClick={goNext}>&rarr;</button>
        </div>
      </section>

    </main>
  );
}