"use client";
import './globals.css';
import Link from 'next/link';
import { useState } from 'react';
import { CartProvider, useCart } from './context/CartContext';

function LayoutContent({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // GLOBAL CART ENGINE
  const { cartItems, cartCount, cartTotal, updateQty, removeFromCart } = useCart();

  return (
    <>
      {/* 1. SIDEBAR (Drawer) */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/60 z-[9999] backdrop-blur-sm transition-opacity" onClick={() => setIsSidebarOpen(false)}>
          <div className="bg-white w-[85%] max-w-[320px] h-full shadow-2xl p-6 relative flex flex-col overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6 border-b border-gray-300 pb-4">
              <img src="/favicon.png" alt="NURA" width={120} height={40} className="h-6 object-contain" />
              <button onClick={() => setIsSidebarOpen(false)} className="text-4xl text-gray-800 hover:text-black">&times;</button>
            </div>
            <nav className="space-y-6">
              <div>
                <p className="text-xs text-gray-800 font-bold uppercase tracking-widest mb-3">Shop</p>
                <div className="space-y-4">
                  <Link href="/" onClick={() => setIsSidebarOpen(false)} className="block text-lg font-medium text-gray-900 hover:text-[#8a6340]">Home</Link>
                  <Link href="/products" onClick={() => setIsSidebarOpen(false)} className="block text-lg font-medium text-gray-900 hover:text-[#8a6340]">All Products</Link>
                </div>
              </div>
              <hr className="border-gray-300" />
              <div>
                <p className="text-xs text-gray-800 font-bold uppercase tracking-widest mb-3">Information</p>
                <div className="space-y-4">
                  {/* YAHAN DONO LINKS MEIN onClick ADD KAR DIYA HAI */}
                  <Link href="/about" onClick={() => setIsSidebarOpen(false)} className="block text-lg font-medium text-gray-900 hover:text-[#8a6340]">About Us</Link>
                  <Link href="/contact" onClick={() => setIsSidebarOpen(false)} className="block text-lg font-medium text-gray-900 hover:text-[#8a6340]">Contact Us</Link>
                </div>
              </div>
            </nav>
          </div>
        </div>
      )}

      {/* 2. CART DRAWER */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black/60 z-[9999] backdrop-blur-sm" onClick={() => setIsCartOpen(false)}>
          <div className="bg-white w-[90%] max-w-[400px] h-full shadow-2xl p-6 absolute right-0 flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6 border-b border-gray-300 pb-4">
              <h2 className="text-2xl font-serif font-bold text-black">Your Cart</h2>
              <button onClick={() => setIsCartOpen(false)} className="text-4xl text-gray-800 hover:text-black">&times;</button>
            </div>
            
            <div className="flex-1 overflow-y-auto pr-2" style={{ scrollbarWidth: 'thin' }}>
              {cartItems.length === 0 ? (
                <p className="text-gray-700 text-center mt-10 text-sm">Your cart is currently empty.</p>
              ) : (
                cartItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 mb-4 border-b border-gray-100 pb-4">
                    <img src={item.image} className="w-16 h-16 object-cover rounded-xl border border-gray-50" alt={item.name} />
                    <div className="flex-1">
                      <h4 className="text-sm font-bold text-gray-800 leading-tight">{item.name}</h4>
                      <p className="text-xs text-[#c49a6c] font-bold mt-1">Rs. {item.price.toLocaleString()}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <button onClick={() => updateQty(item.id, 'minus')} className="w-6 h-6 flex items-center justify-center bg-gray-100 rounded-full font-bold hover:bg-black hover:text-white transition">-</button>
                        <span className="text-sm font-bold text-gray-700">{item.qty}</span>
                        <button onClick={() => updateQty(item.id, 'plus')} className="w-6 h-6 flex items-center justify-center bg-gray-100 rounded-full font-bold hover:bg-black hover:text-white transition">+</button>
                      </div>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="text-red-400 p-2 hover:text-red-600 transition">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    </button>
                  </div>
                ))
              )}
            </div>

            <div className="border-t border-gray-300 pt-4 mt-4">
              <div className="flex justify-between font-bold mb-4 text-gray-900">
                <span>Total:</span>
                <span>Rs. {cartTotal.toLocaleString()}</span>
              </div>
              <Link href="/checkout" onClick={() => setIsCartOpen(false)} className="block text-center w-full bg-black text-white py-4 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-[#8a6340] transition-colors">Checkout</Link>
            </div>
          </div>
        </div>
      )}

      {/* 3. HEADER */}
      <div className="bg-white text-gray-900 text-center py-2 text-[13px] font-medium tracking-wide border-b border-gray-300">
        Welcome to our store
      </div>

      <header className="bg-white text-gray-900 relative z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between border-b border-gray-300 md:border-none">
          
          {/* Menu Hamburger Icon */}
          <div className="flex items-center gap-4 w-1/3">
            <button onClick={() => setIsSidebarOpen(true)} className="text-gray-900 hover:text-black focus:outline-none p-1">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"></path></svg>
            </button>
          </div>

          {/* Logo */}
          <div className="w-1/3 flex justify-center">
            <Link href="/">
              <img src="/favicon.png" alt="NURA Logo" width={120} height={40} className="h-8 md:h-10 object-contain" />
            </Link>
          </div>

          <div className="flex items-center justify-end gap-4 w-1/3">
            
            {/* Profile Icon (Links to Profile Page) */}
            <Link href="/profile" className="text-gray-900 hover:text-[#8a6340] transition p-1">
              <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
            </Link>

            {/* Cart Bag Icon with Counter */}
            <button onClick={() => setIsCartOpen(true)} className="relative text-gray-900 hover:text-[#8a6340] transition p-1">
              <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
              <span className="absolute -top-1 -right-2 bg-black text-white text-[10px] w-[18px] h-[18px] rounded-full flex items-center justify-center font-bold">
                {cartCount}
              </span>
            </button>
            
          </div>
        </div>
      </header>

      {/* Main Pages */}
      {children}

      {/* 4. FOOTER */}
      <footer style={{ background: '#080808', borderTop: '1px solid rgba(196,154,108,0.15)', marginTop: '50px', paddingBottom: '40px' }}>
        <div style={{ height: '1px', background: 'linear-gradient(to right, transparent, rgba(196,154,108,0.5), transparent)' }}></div>
        <div className="max-w-6xl mx-auto px-6 pt-16 pb-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
            <div className="flex flex-col items-center md:items-start">
              <img src="/favicon.png" alt="NURA" className="h-8 mb-4 object-contain brightness-0 invert" />
              <p className="text-white/50 text-[13px] font-light tracking-wider max-w-[280px] leading-relaxed">
                Handcrafted luxury chocolates from Pakistan. Crafted for moments worth remembering.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8 text-left max-w-[400px] mx-auto md:mx-0 w-full">
              <div>
                <p className="text-[var(--gold)] text-[11px] tracking-[0.2em] uppercase font-semibold mb-4">Shop</p>
                <div className="flex flex-col gap-3">
                  <Link href="/" className="text-white/60 text-[13px] hover:text-white transition-colors">Home</Link>
                  <Link href="/products" className="text-white/60 text-[13px] hover:text-white transition-colors">Collection</Link>
                </div>
              </div>
              <div>
                <p className="text-[var(--gold)] text-[11px] tracking-[0.2em] uppercase font-semibold mb-4">Info</p>
                <div className="flex flex-col gap-3">
                  <Link href="/about" className="text-white/60 text-[13px] hover:text-white transition-colors">About Us</Link>
                  <Link href="/contact" className="text-white/60 text-[13px] hover:text-white transition-colors">Contact</Link>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center md:items-start">
              <p className="text-[var(--gold)] text-[11px] tracking-[0.2em] uppercase font-semibold mb-5">Follow Our Journey</p>
              <div className="flex gap-6">
                <a href="https://www.instagram.com/nurachocolates.pk" className="text-white/70 hover:text-[var(--gold)] transition-colors">
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-white/5 pt-8 mt-10 text-center">
            <p className="text-white/30 text-[10px] tracking-[0.2em] uppercase">
              &copy; 2026 Nura Luxury Chocolates &nbsp;·&nbsp; All Rights Reserved
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}

// ROOT PROVIDER
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>NURA | Artisan Handcrafted Luxury Chocolates</title>
        <meta name="description" content="Discover NURA's premium handcrafted artisan chocolates in Pakistan." />
        <link rel="icon" type="image/png" href="/favicon.png" />
      </head>
      <body className="font-sans bg-[var(--cream)] text-gray-900 overflow-x-hidden">
        <CartProvider>
          <LayoutContent>{children}</LayoutContent>
        </CartProvider>
      </body>
    </html>
  );
}