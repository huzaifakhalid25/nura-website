"use client";
import React, { useState, useEffect, MouseEvent } from 'react';
import Link from 'next/link';
import { supabase } from '../../lib/supabase'; // Agar supabase set nahi kiya toh baad mein kar lenge

export default function Profile() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // VIP Card 3D Tilt Effect State
  const [tiltStyle, setTiltStyle] = useState({});

  useEffect(() => {
    // Dummy Data (Baad mein isay Supabase se replace karenge)
    setTimeout(() => {
      setUser({
        full_name: "Huzaifa Khalid",
        email: "huzaifakhalid3058835@gmail.com",
        created_at: "2024-05-01T00:00:00Z"
      });
      setLoading(false);
    }, 1000);
  }, []);

  // 3D Card Hover Logic (Replaces vanilla-tilt.js)
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left;
    const y = e.clientY - box.top;
    const centerX = box.width / 2;
    const centerY = box.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -15;
    const rotateY = ((x - centerX) / centerX) * 15;

    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
      transition: 'none'
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
      transition: 'transform 0.5s ease-out'
    });
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-[var(--cream)]"><p>Loading VIP Profile...</p></div>;
  }

  return (
    <div className="min-h-[85vh] py-24 px-4 md:px-8 max-w-7xl mx-auto flex flex-col lg:flex-row gap-10">
      
      {/* LEFT COLUMN: VIP CARD & SETTINGS */}
      <div className="w-full lg:w-1/3 flex flex-col items-center">
        
        {/* VIP BLACK CARD */}
        <div 
          className="w-full max-w-[380px] aspect-[1.6/1] p-6 flex flex-col justify-between mb-8 cursor-pointer relative overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.4)] rounded-[20px] border border-[rgba(196,154,108,0.3)] bg-gradient-to-br from-[#111] to-[#222]"
          style={tiltStyle}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* Shine Effect */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[rgba(196,154,108,0.1)] to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

          <div className="relative z-10 flex justify-between items-start" style={{ transform: 'translateZ(30px)' }}>
            {/* Golden Chip */}
            <div className="w-[45px] h-[35px] rounded-md relative overflow-hidden border border-white/20 bg-gradient-to-br from-[#d4af37] to-[#aa771c]">
              <div className="absolute top-1/2 left-0 w-full h-[1px] bg-black/20"></div>
              <div className="absolute left-1/2 top-0 h-full w-[1px] bg-black/20"></div>
            </div>
            <h2 className="text-[#c49a6c] font-serif font-bold text-xl tracking-[0.2em] uppercase">Nura</h2>
          </div>
          
          <div className="relative z-10" style={{ transform: 'translateZ(30px)' }}>
            <p className="text-gray-400 text-[9px] uppercase tracking-[0.2em] mb-1">Cardholder Name</p>
            <h3 className="text-white text-lg md:text-xl font-bold tracking-widest uppercase truncate">
              {user?.full_name}
            </h3>
          </div>
          
          <div className="relative z-10 flex justify-between items-end" style={{ transform: 'translateZ(30px)' }}>
            <div>
              <p className="text-gray-400 text-[9px] uppercase tracking-[0.2em] mb-1">Member Since</p>
              <p className="text-white text-sm tracking-widest font-mono">
                {new Date(user?.created_at).toLocaleDateString('en-US', { month: '2-digit', year: '2-digit' }).replace('/', ' / ')}
              </p>
            </div>
            <div className="text-[#c49a6c] font-bold text-xs tracking-widest">VIP MEMBER</div>
          </div>
        </div>

        {/* ACCOUNT SETTINGS */}
        <div className="w-full max-w-[380px] bg-white rounded-3xl p-6 shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-gray-50">
          <h3 className="text-lg font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">Account Settings</h3>
          
          <div className="space-y-4">
            <div className="flex items-center text-gray-600">
              <svg className="w-5 h-5 mr-3 text-[#c49a6c]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
              <span className="text-sm font-medium truncate">{user?.email}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <svg className="w-5 h-5 mr-3 text-[#c49a6c]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
              <span className="text-sm font-medium">Password: ••••••••</span>
              <button className="ml-auto text-[10px] uppercase font-bold text-gray-400 hover:text-black transition">Change</button>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-100">
            <button className="w-full block text-center border border-red-100 bg-red-50 text-red-500 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-red-500 hover:text-white transition shadow-sm">
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: ORDER HISTORY */}
      <div className="w-full lg:w-2/3">
        <div className="bg-white rounded-3xl p-8 shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-gray-50 h-full">
          <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-4">
            <h2 className="text-3xl font-serif font-bold text-gray-900">Your Journey</h2>
            <span className="text-[10px] text-[#c49a6c] uppercase tracking-widest font-bold bg-[#c49a6c]/10 px-3 py-1 rounded-full">Order History</span>
          </div>

          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
              <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
            </div>
            <h3 className="text-xl font-serif font-bold text-gray-900 mb-2">No orders yet</h3>
            <p className="text-gray-400 text-sm max-w-sm mx-auto leading-relaxed mb-8">
              Your luxury chocolate experience awaits. Discover our exquisite collection and treat yourself.
            </p>
            <Link href="/products" className="bg-black text-white px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#c49a6c] hover:text-black transition shadow-lg">
              Start Shopping
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
}