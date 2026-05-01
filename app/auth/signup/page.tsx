"use client";
import React from 'react';
import Link from 'next/link';

export default function SignUpPage() {
  return (
    <main className="min-h-screen bg-[#111] flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute bottom-[-20%] right-[-10%] w-96 h-96 bg-[#c49a6c] opacity-10 rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="w-full max-w-md bg-white/5 backdrop-blur-md p-10 rounded-[30px] border border-white/10 shadow-2xl relative z-10 text-center">
        <h1 className="text-4xl font-serif text-white mb-2">Join Nura</h1>
        <p className="text-[#c49a6c] text-xs tracking-widest uppercase mb-10">Create your luxury account</p>
        
        <form className="flex flex-col gap-5">
          <input 
            type="text" 
            placeholder="Full Name" 
            className="w-full bg-transparent border-b border-white/20 px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-[#c49a6c] transition-colors"
          />
          <input 
            type="email" 
            placeholder="Email Address" 
            className="w-full bg-transparent border-b border-white/20 px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-[#c49a6c] transition-colors"
          />
          <input 
            type="password" 
            placeholder="Password" 
            className="w-full bg-transparent border-b border-white/20 px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-[#c49a6c] transition-colors"
          />
          
          <button type="button" className="w-full bg-[#c49a6c] text-black py-4 rounded-full font-bold uppercase tracking-widest text-xs mt-6 hover:bg-white transition-colors">
            Create Account
          </button>
        </form>
        
        <p className="text-white/50 text-sm mt-8">
          Already have an account? <Link href="/auth/login" className="text-[#c49a6c] hover:text-white">Sign in here</Link>
        </p>
      </div>
    </main>
  );
}