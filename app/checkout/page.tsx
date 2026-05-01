"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '../context/CartContext';

export default function Checkout() {
  const { cartItems, cartTotal, updateQty, removeFromCart, clearCart } = useCart();
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState<number | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({ full_name: '', phone: '', address: '', city: '', payment_method: 'COD', email: '' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // DIRECT WEB3FORMS INTEGRATION
  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    const newOrderId = Math.floor(Math.random() * 9000) + 1000;

    try {
      // 1. Email ka message tayyar karna
      const emailMessage = `
🚨 NEW ORDER RECEIVED 🚨

Order ID: #NURA-${newOrderId}
Customer Name: ${formData.full_name}
Phone: ${formData.phone}
Address: ${formData.address}
City: ${formData.city}
Total Amount: Rs. ${cartTotal.toLocaleString()}

Please check your Admin Panel or contact the customer to confirm.
      `;

      // 2. Direct Web3Forms API ko data bhejna
      await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "1e624c05-2fc2-4135-9d8a-31d63bd182f8", // Aapki key yahan lag gayi hai
          subject: `🚨 New Order #NURA-${newOrderId} from ${formData.full_name}`,
          from_name: "Nura Chocolates Shop",
          message: emailMessage,
        }),
      });

      // 3. Success Screen aur Cart Khali
      setOrderId(newOrderId);
      setIsOrderPlaced(true);
      clearCart();

    } catch (error) {
      console.error("Order failed to send", error);
      alert("Network Error: Order place nahi hua.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (isOrderPlaced) return (
    <div className="min-h-screen bg-[#faf9f6] flex items-center justify-center">
      <div className="bg-white p-10 rounded-3xl text-center shadow-xl">
        <h1 className="text-3xl font-serif font-bold mb-4">Order Confirmed!</h1>
        <p className="mb-4">Order #NURA-{orderId}</p>
        <Link href="/" className="bg-black text-[#c49a6c] px-6 py-3 rounded-full uppercase tracking-widest font-bold text-xs">Return Home</Link>
      </div>
    </div>
  );

  if (cartItems.length === 0) return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center">
      <h2 className="text-3xl font-serif font-bold mb-4">Your Cart is Empty</h2>
      <Link href="/products" className="bg-black text-[#c49a6c] px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest">Shop Now</Link>
    </div>
  );

  return (
    <div className="bg-[#faf9f6] min-h-screen pt-20 pb-20">
      <div className="max-w-7xl mx-auto px-4 mt-10">
        <h1 className="text-4xl font-serif font-bold text-center mb-12">Secure Checkout</h1>
        <div className="flex flex-col lg:flex-row gap-10">
          
          <div className="lg:w-2/3 bg-white p-10 rounded-3xl shadow-sm">
            <h2 className="text-xl font-serif font-bold mb-6 border-b pb-4">Shipping Information</h2>
            <form onSubmit={handlePlaceOrder} id="checkout-form">
              <input type="text" name="full_name" required value={formData.full_name} onChange={handleInputChange} className="w-full mb-4 border rounded-xl p-3 bg-gray-50 focus:outline-none focus:border-[#c49a6c]" placeholder="Full Name *" />
              <input type="tel" name="phone" required value={formData.phone} onChange={handleInputChange} className="w-full mb-4 border rounded-xl p-3 bg-gray-50 focus:outline-none focus:border-[#c49a6c]" placeholder="Phone Number *" />
              <textarea name="address" required rows={3} value={formData.address} onChange={handleInputChange} className="w-full mb-4 border rounded-xl p-3 bg-gray-50 focus:outline-none focus:border-[#c49a6c]" placeholder="Address *"></textarea>
              <select name="city" required value={formData.city} onChange={handleInputChange} className="w-full mb-8 border rounded-xl p-3 bg-gray-50 focus:outline-none focus:border-[#c49a6c]">
                <option value="" disabled>Select City *</option>
                <option value="Karachi">Karachi</option>
                <option value="Lahore">Lahore</option>
                <option value="Islamabad">Islamabad</option>
              </select>
              <button type="submit" disabled={isProcessing} className="w-full bg-black text-[#c49a6c] py-4 rounded-full font-bold uppercase tracking-widest lg:hidden">
                {isProcessing ? 'Processing...' : 'Confirm Order'}
              </button>
            </form>
          </div>

          <div className="lg:w-1/3">
            <div className="bg-black text-white p-8 rounded-3xl sticky top-24">
              <h2 className="text-2xl font-serif font-bold text-[#c49a6c] mb-6">Order Summary</h2>
              <div className="space-y-4 border-b border-gray-800 pb-4 mb-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <img src={item.image} className="w-10 h-10 rounded-lg object-cover" />
                      <p className="text-sm line-clamp-1">{item.name} x{item.qty}</p>
                    </div>
                    <p className="text-[#c49a6c] font-bold">Rs. {(item.price * item.qty).toLocaleString()}</p>
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-xl font-bold mb-8">
                <span>Total</span>
                <span className="text-[#c49a6c]">Rs. {cartTotal.toLocaleString()}</span>
              </div>
              <button type="submit" form="checkout-form" disabled={isProcessing} className="hidden lg:block w-full bg-[#c49a6c] text-black py-4 rounded-full font-bold uppercase tracking-widest hover:bg-white transition">
                {isProcessing ? 'Processing...' : 'Place Order'}
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}