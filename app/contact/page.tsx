import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | Nura Artisan Chocolates',
  description: 'Get in touch with Nura Chocolates for custom orders, corporate gifting, and general inquiries.',
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#faf6f0] font-sans">
      <section className="bg-[#111] py-20 text-center px-4">
        <h1 className="text-5xl md:text-6xl font-serif text-white mb-4">Get in <i className="text-[#e8c99a] not-italic">Touch</i></h1>
        <p className="text-[#c49a6c] tracking-[0.3em] uppercase text-xs">We would love to hear from you</p>
      </section>

      <section className="py-20 px-6 max-w-2xl mx-auto">
        <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-2xl font-serif text-black mb-6 text-center">Send us a Message</h2>
          
          {/* Web3Forms Integration */}
          <form action="https://api.web3forms.com/submit" method="POST" className="space-y-6">
            
            {/* Bhai, yahan "value=" ke aage double quotes ("") ke andar apni Web3Forms key paste kar dena */}
            <input type="hidden" name="access_key" value="1e624c05-2fc2-4135-9d8a-31d63bd182f8" />
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input type="text" name="name" required className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c49a6c]" placeholder="John Doe" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input type="email" name="email" required className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c49a6c]" placeholder="john@example.com" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea name="message" required rows={5} className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c49a6c]" placeholder="How can we help you?"></textarea>
            </div>

            <button type="submit" className="w-full bg-[#111] text-white py-4 rounded-lg font-bold hover:bg-[#c49a6c] transition-colors duration-300">
              Send Message
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}