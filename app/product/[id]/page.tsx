"use client";
import React, { useState } from 'react';
import { useCart } from '../../context/CartContext'; // <-- CART ENGINE ADDED YAHAN

export default function ProductDetail() {
  const { addToCart } = useCart(); // <-- GLOBAL CART FUNCTION

  // 1. Dummy Product Data
  const product = {
    id: 1,
    name: "Signature Artisan Box",
    actualPrice: 5000,
    price: 3500,
    description: "Indulge in the ultimate luxury experience with our handcrafted signature artisan chocolate box. Each piece is meticulously crafted using premium single-origin cacao, delivering a rich and indulgent taste that lingers.",
    images: ["/favicon.png", "/favicon.png", "/favicon.png"],
    discounts: { 2: 5, 3: 7, 4: 10 } 
  };

  // 2. React States
  const [mainImg, setMainImg] = useState(product.images[0]);
  const [bundle, setBundle] = useState(1);
  const [qty4Plus, setQty4Plus] = useState(4);
  const [isAdding, setIsAdding] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  // 3. Dynamic Pricing Calculations
  const currentQty = bundle === 4 ? qty4Plus : bundle;
  const currentDisc = bundle === 1 ? 0 : product.discounts[bundle as keyof typeof product.discounts];

  const saleTotal = product.price * currentQty;
  const discTotal = Math.round(saleTotal * (1 - currentDisc / 100));
  const actualTotal = product.actualPrice * currentQty;
  const saveAmount = Math.round(actualTotal - discTotal);

  // 4. Handlers
  const handleQtyChange = (val: number, e: React.MouseEvent) => {
    e.preventDefault();
    setQty4Plus(prev => Math.max(4, prev + val)); 
  };

  // ADD TO CART FUNCTION (Ab ye Global Cart me bhejega)
  const handleAddToCart = () => {
    setIsAdding(true);
    
    // Per unit price calculate karna discount ke baad
    const unitPrice = Math.round(product.price * (1 - currentDisc / 100));

    // Global Cart mein item add karna
    addToCart({
      id: product.id,
      name: product.name,
      price: unitPrice,
      qty: currentQty,
      image: mainImg
    });

    setTimeout(() => {
      setIsAdding(false);
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 2000);
    }, 800);
  };

  return (
    <main className="max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-16 overflow-hidden bg-[#fcfcfc] min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mt-10">
        
        {/* LEFT: IMAGE GALLERY */}
        <div className="w-full">
          <div className="w-full aspect-square bg-gray-50 rounded-2xl overflow-hidden mb-4 border border-gray-100 shadow-sm">
            <img src={mainImg} alt={product.name} className="w-full h-full object-cover transition-opacity duration-300" />
          </div>
          
          <div className="flex gap-3 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {product.images.map((img, idx) => (
              <button 
                key={idx} 
                onClick={() => setMainImg(img)} 
                className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${mainImg === img ? 'border-black' : 'border-transparent hover:border-gray-400'}`}
              >
                <img src={img} className="w-full h-full object-cover pointer-events-none" alt="Thumbnail" />
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT: PRODUCT DETAILS */}
        <div className="lg:sticky lg:top-24">
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">NURA</p>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 break-words font-serif">{product.name}</h1>
          
          <div className="flex items-center gap-3 mb-8">
            <span className="text-gray-400 line-through text-xs md:text-sm">Rs.{product.actualPrice.toLocaleString()} PKR</span>
            <span className="text-lg md:text-2xl font-bold">Rs.{product.price.toLocaleString()} PKR</span>
            <span className="bg-black text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">Sale</span>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-3 gap-2 py-4 border-y border-gray-100 mb-10 text-center">
            <div className="flex flex-col items-center">
              <svg className="w-8 h-8 mb-2 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" strokeWidth="1"/></svg>
              <span className="text-[9px] font-bold uppercase text-gray-500 leading-tight">Loved by<br/>Customers</span>
            </div>
            <div className="flex flex-col items-center">
              <svg className="w-8 h-8 mb-2 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M20.24 12.24a6 6 0 00-8.49-8.49L5 10.5V19h8.5z" strokeWidth="1"/></svg>
              <span className="text-[9px] font-bold uppercase text-gray-500 leading-tight">Premium<br/>Ingredients</span>
            </div>
            <div className="flex flex-col items-center">
              <svg className="w-8 h-8 mb-2 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674z" strokeWidth="1"/></svg>
              <span className="text-[9px] font-bold uppercase text-gray-500 leading-tight">Rich &<br/>Indulgent Taste</span>
            </div>
          </div>

          <h2 className="font-bold text-lg mb-6 text-gray-900">Buy more, save more</h2>

          {/* BUNDLE SYSTEM */}
          <div className="space-y-4 mb-10">
            
            {/* Bundle 1 */}
            <label className="block relative cursor-pointer">
              <input type="radio" name="bundle" checked={bundle === 1} onChange={() => setBundle(1)} className="sr-only peer" />
              <div className="border-[1.2px] border-gray-200 rounded-xl bg-white p-5 flex justify-between items-center transition-all peer-checked:border-black peer-checked:bg-gray-50 peer-checked:border-2">
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 border rounded-full flex items-center justify-center ${bundle === 1 ? 'border-black' : 'border-gray-300'}`}>
                    {bundle === 1 && <div className="w-2.5 h-2.5 bg-black rounded-full"></div>}
                  </div>
                  <span className="font-bold text-sm text-gray-900">Buy 1 <span className="bg-gray-400 text-white text-[9px] px-2 py-0.5 rounded ml-2 uppercase">Full price</span></span>
                </div>
                <span className="text-sm font-medium text-gray-900">Rs.{product.price.toLocaleString()}</span>
              </div>
            </label>

            {/* Bundle 2 */}
            <label className="block relative cursor-pointer">
              <div className="absolute -top-2.5 right-5 bg-black text-white text-[10px] px-2.5 py-0.5 rounded uppercase tracking-wider font-bold z-10">Popular</div>
              <input type="radio" name="bundle" checked={bundle === 2} onChange={() => setBundle(2)} className="sr-only peer" />
              <div className="border-[1.2px] border-gray-200 rounded-xl bg-white p-5 flex justify-between items-center transition-all peer-checked:border-black peer-checked:bg-gray-50 peer-checked:border-2">
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 border rounded-full flex items-center justify-center ${bundle === 2 ? 'border-black' : 'border-gray-300'}`}>
                    {bundle === 2 && <div className="w-2.5 h-2.5 bg-black rounded-full"></div>}
                  </div>
                  <span className="font-bold text-sm text-gray-900">Buy 2 <span className="bg-gray-400 text-white text-[9px] px-2 py-0.5 rounded ml-2 uppercase">Save {product.discounts[2]}%</span></span>
                </div>
                <div className="text-right">
                  <span className="block text-[10px] text-gray-400 line-through">Rs.{(product.actualPrice * 2).toLocaleString()}</span>
                  <span className="block font-bold text-sm text-gray-900">Rs.{Math.round((product.price * 2) * (1 - product.discounts[2]/100)).toLocaleString()}</span>
                </div>
              </div>
            </label>

            {/* Bundle 3 */}
            <label className="block relative cursor-pointer">
              <input type="radio" name="bundle" checked={bundle === 3} onChange={() => setBundle(3)} className="sr-only peer" />
              <div className="border-[1.2px] border-gray-200 rounded-xl bg-white p-5 flex justify-between items-center transition-all peer-checked:border-black peer-checked:bg-gray-50 peer-checked:border-2">
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 border rounded-full flex items-center justify-center ${bundle === 3 ? 'border-black' : 'border-gray-300'}`}>
                    {bundle === 3 && <div className="w-2.5 h-2.5 bg-black rounded-full"></div>}
                  </div>
                  <span className="font-bold text-sm text-gray-900">Buy 3 <span className="bg-gray-400 text-white text-[9px] px-2 py-0.5 rounded ml-2 uppercase">Save {product.discounts[3]}%</span></span>
                </div>
                <div className="text-right">
                  <span className="block text-[10px] text-gray-400 line-through">Rs.{(product.actualPrice * 3).toLocaleString()}</span>
                  <span className="block font-bold text-sm text-gray-900">Rs.{Math.round((product.price * 3) * (1 - product.discounts[3]/100)).toLocaleString()}</span>
                </div>
              </div>
            </label>

            {/* Bundle 4+ */}
            <label className="block relative cursor-pointer">
              <input type="radio" name="bundle" checked={bundle === 4} onChange={() => setBundle(4)} className="sr-only peer" />
              <div className="border-[1.2px] border-gray-200 rounded-xl bg-white p-5 transition-all peer-checked:border-black peer-checked:bg-gray-50 peer-checked:border-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 border rounded-full flex items-center justify-center ${bundle === 4 ? 'border-black' : 'border-gray-300'}`}>
                      {bundle === 4 && <div className="w-2.5 h-2.5 bg-black rounded-full"></div>}
                    </div>
                    <span className="font-bold text-sm text-gray-900">Buy 4+ <span className="bg-gray-400 text-white text-[9px] px-2 py-0.5 rounded ml-2 uppercase">Save {product.discounts[4]}%</span></span>
                  </div>
                  <div className="text-right">
                    <span className="block text-[10px] text-gray-400 line-through">Rs.{(product.actualPrice * qty4Plus).toLocaleString()}</span>
                    <span className="block font-bold text-sm text-gray-900">Rs.{Math.round((product.price * qty4Plus) * (1 - product.discounts[4]/100)).toLocaleString()}</span>
                  </div>
                </div>
                
                {/* Qty Selector */}
                {bundle === 4 && (
                  <div className="flex justify-between items-center pt-4 border-t border-gray-200 mt-4">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Quantity</span>
                    <div className="flex items-center gap-4 text-gray-900">
                      <button onClick={(e) => handleQtyChange(-1, e)} className="w-8 h-8 border border-gray-300 bg-white rounded-full flex items-center justify-center font-bold hover:bg-gray-100 transition">-</button>
                      <span className="font-bold text-sm">{qty4Plus}</span>
                      <button onClick={(e) => handleQtyChange(1, e)} className="w-8 h-8 border border-gray-300 bg-white rounded-full flex items-center justify-center font-bold hover:bg-gray-100 transition">+</button>
                    </div>
                  </div>
                )}
              </div>
            </label>
            
          </div>

          {/* CHECKOUT TOTAL & BUTTON */}
          <div className="bg-gray-50 p-6 rounded-2xl mb-10 border border-gray-100">
            <div className="flex flex-col mb-6">
              <span className={`text-[10px] font-bold text-[#c49a6c] uppercase mb-1 transition-opacity duration-300 ${saveAmount > 0 ? 'opacity-100' : 'opacity-0'}`}>
                ✨ YOU SAVE Rs.{saveAmount.toLocaleString()}
              </span>
              <div className="flex justify-between items-center text-gray-900">
                <span className="text-xl font-bold uppercase tracking-tight">Total</span>
                <span className="text-2xl font-bold">Rs.{discTotal.toLocaleString()}</span>
              </div>
            </div>
            
            <button 
              onClick={handleAddToCart} 
              disabled={isAdding || isAdded}
              className={`w-full py-5 rounded-full font-bold uppercase text-[11px] tracking-[0.2em] transition-all shadow-lg
                ${isAdded ? 'bg-green-600 text-white' : 'bg-black text-[#c49a6c] hover:bg-[#c49a6c] hover:text-black active:scale-95'}
                ${isAdding ? 'opacity-70 cursor-wait' : ''}
              `}
            >
              {isAdding ? 'ADDING...' : isAdded ? 'ADDED! ✅' : 'ADD TO CART'}
            </button>
          </div>
          
          <div className="mt-8 text-sm text-gray-600 leading-relaxed italic break-words">
            {product.description}
          </div>
        </div>

      </div>
    </main>
  );
}