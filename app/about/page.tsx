import React from 'react';
import { Metadata } from 'next';

// Yeh hai asli SEO ka Jadoo (Meta Tags for Google)
export const metadata: Metadata = {
  title: 'About Us | Nura Artisan Chocolates',
  description: 'Discover the story behind Nura Chocolates. We craft premium, handcrafted artisan chocolates using the finest ingredients in Pakistan. Perfect for luxury gifting.',
  keywords: 'artisan chocolates, premium chocolate Pakistan, handcrafted chocolates, Nura chocolates, luxury gifting',
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#faf6f0] font-sans">
      {/* Hero Section */}
      <section className="bg-[#111] py-20 text-center px-4">
        <h1 className="text-5xl md:text-6xl font-serif text-white mb-4">Our <i className="text-[#e8c99a] not-italic">Story</i></h1>
        <p className="text-[#c49a6c] tracking-[0.3em] uppercase text-xs">The Art of Chocolate Making</p>
      </section>

      {/* Content Section */}
      <section className="py-20 px-6 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-serif text-black mb-6">Handcrafted with Passion</h2>
        <p className="text-gray-600 mb-8 leading-relaxed">
          At Nura Chocolates, we believe that chocolate making is an art form. Every piece is meticulously handcrafted by our master chocolatiers using only the finest, ethically sourced cocoa. We blend traditional techniques with modern flavors to create an unforgettable tasting experience.
        </p>
        <p className="text-gray-600 mb-12 leading-relaxed">
          Whether you are looking for the perfect luxury gift or a moment of pure indulgence for yourself, our artisan collection is designed to bring joy to every occasion. Made with love, crafted for perfection.
        </p>
        
        {/* SEO Keywords naturally used in UI */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 border-t border-[#e8c99a] pt-12">
          <div>
            <h3 className="text-xl font-serif text-black mb-2">Premium Quality</h3>
            <p className="text-sm text-gray-500">100% pure cocoa butter and the finest global ingredients.</p>
          </div>
          <div>
            <h3 className="text-xl font-serif text-black mb-2">Artisan Crafted</h3>
            <p className="text-sm text-gray-500">Hand-painted and molded by experts in our chocolate lab.</p>
          </div>
          <div>
            <h3 className="text-xl font-serif text-black mb-2">Luxury Gifting</h3>
            <p className="text-sm text-gray-500">Elegant packaging designed to impress your loved ones.</p>
          </div>
        </div>
      </section>
    </main>
  );
}