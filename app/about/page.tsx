import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Nura Chocolates | Premium Artisan & Viral Kunafa Chocolate',
  description: 'The story behind Nura Chocolates. From handcrafted luxury bonbons to the famous Dubai viral Kunafa chocolate, discover the best premium artisan chocolate in Pakistan.',
  keywords: 'best chocolate in Pakistan, artisan chocolates, Dubai viral chocolate, Kunafa chocolate Pakistan, premium chocolate gifts, luxury handmade chocolate, Nura chocolates, buy online chocolates',
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#faf6f0] font-sans">
      
      {/* Hero Section */}
      <section className="bg-[#111] py-24 text-center px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-serif text-white mb-6 leading-tight">
            More Than Just Chocolate, <br />
            <i className="text-[#e8c99a] not-italic">It's an Experience.</i>
          </h1>
          <p className="text-[#c49a6c] tracking-[0.2em] uppercase text-sm font-bold">
            Crafting Pakistan's Finest Artisan Chocolates
          </p>
        </div>
      </section>

      {/* Main Blog / Story Section */}
      <section className="py-20 px-6 max-w-3xl mx-auto text-lg text-gray-800 leading-relaxed space-y-10">
        
        {/* Origin Story */}
        <div>
          <h2 className="text-3xl font-serif text-black mb-6">How It All Started</h2>
          <p className="mb-4">
            It didn't start in a massive factory with giant machines. It started with a simple, genuine love for real, high-quality cocoa. At Nura Chocolates, we were tired of the artificial, wax-like chocolates filling the supermarket shelves. We wanted something richer, something that melted perfectly and left a lasting taste.
          </p>
          <p>
            So, we rolled up our sleeves. We sourced the finest single-origin cocoa beans, pure cocoa butter, and premium local ingredients to craft <strong>luxury handmade chocolates</strong> right here in Pakistan. Every single piece you buy from us is hand-painted, hand-tempered, and hand-packed with an obsessive attention to detail.
          </p>
        </div>

        <hr className="border-gray-300" />

        {/* The Viral Trend Section (Heavy SEO for Kunafa/Dubai Chocolate) */}
        <div>
          <h2 className="text-3xl font-serif text-black mb-6">Bringing the <span className="text-[#c49a6c]">Dubai Viral Sensation</span> to You</h2>
          <p className="mb-4">
            Unless you've been living under a rock, you've seen it. That ridiculously satisfying, ASMR-worthy crunch. Yes, we're talking about the <strong>Dubai viral chocolate</strong>. 
          </p>
          <p className="mb-4">
            Our customers kept asking, <em>"Can we get this in Pakistan?"</em> The answer was an absolute yes. But we didn't just copy it; we perfected it. Our signature <strong>Kunafa Chocolate</strong> features a thick layer of premium milk chocolate, stuffed to the brim with crispy, golden toasted kataifi (kunafa pastry) and a rich, roasted pistachio cream that oozes out with every bite.
          </p>
          <p className="font-bold text-black border-l-4 border-[#c49a6c] pl-4 italic">
            "It's not just a trend for us; it's a masterpiece. The crunch, the creamy pistachio, the smooth chocolate—it's a flavor bomb that you have to taste to believe."
          </p>
        </div>

        <hr className="border-gray-300" />

        {/* Why Choose Us (More SEO & Trust Building) */}
        <div>
          <h2 className="text-3xl font-serif text-black mb-6">Why Choose Nura?</h2>
          <p className="mb-6">
            Whether you're treating yourself after a long day or looking for the perfect <strong>premium chocolate gifts</strong> for a wedding, corporate event, or anniversary, here is why Nura stands out:
          </p>
          
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-serif font-bold text-black mb-2">No Compromise on Quality</h3>
              <p className="text-base text-gray-600">We use 100% pure cocoa butter. No vegetable oils, no artificial preservatives. Just pure, unadulterated chocolate goodness.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-serif font-bold text-black mb-2">Artisan & Handcrafted</h3>
              <p className="text-base text-gray-600">From our classic bonbons to our heavy, loaded bars, everything is made in small batches to guarantee freshness and that perfect snap.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-serif font-bold text-black mb-2">Luxury Gifting</h3>
              <p className="text-base text-gray-600">They say you eat with your eyes first. Our elegant, premium packaging makes Nura the ultimate gift to impress your loved ones.</p>
            </div>
          </div>
        </div>

      </section>

      {/* Call to Action */}
      <section className="bg-[#c49a6c] py-16 text-center px-4">
        <h2 className="text-3xl font-serif text-white mb-6">Ready to Taste the Magic?</h2>
        <a href="/products" className="inline-block bg-black text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors duration-300 shadow-lg">
          Explore Our Collection
        </a>
      </section>

    </main>
  );
}