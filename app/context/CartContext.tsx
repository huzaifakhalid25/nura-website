"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';

// Cart Item ka structure
type CartItem = {
  id: number;
  name: string;
  price: number;
  qty: number;
  image: string;
};

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  updateQty: (id: number, type: 'plus' | 'minus') => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Page refresh hone par cart data bachane ke liye (Local Storage)
  useEffect(() => {
    const savedCart = localStorage.getItem('nura_cart');
    if (savedCart) setCartItems(JSON.parse(savedCart));
  }, []);

  useEffect(() => {
    localStorage.setItem('nura_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item: CartItem) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === item.id && i.price === item.price);
      if (existing) {
        return prev.map(i => i.id === item.id && i.price === item.price ? { ...i, qty: i.qty + item.qty } : i);
      }
      return [...prev, item];
    });
  };

  const removeFromCart = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQty = (id: number, type: 'plus' | 'minus') => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = type === 'plus' ? item.qty + 1 : item.qty - 1;
        return { ...item, qty: Math.max(1, newQty) };
      }
      return item;
    }));
  };

  const clearCart = () => setCartItems([]);

  const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);
  const cartTotal = cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQty, clearCart, cartCount, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
}