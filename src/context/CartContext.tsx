"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface Section {
  id: string;
  slug: string;
  title: string;
  imageUrl: string;
  description: string;
  buttonText: string;
  capacities: { value: string; active: boolean }[];
  price: string;
  prev: string | null;
  next: string | null;
}

interface CartContextType {
  cart: Section[];
  addToCart: (section: Section) => void;
  removeFromCart: (itemId: string) => void;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Section[]>([]);

  const addToCart = (section: Section) => {
    setCart((prevCart) => [...prevCart, section]);
  };

  const removeFromCart = (itemId: string) => {
    setCart((prevCart) => prevCart.filter(item => item.id !== itemId));
  };

  const cartCount = cart.length;

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, cartCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};