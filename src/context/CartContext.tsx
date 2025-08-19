'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type CartItem = {
  serviceId: string;
  addonIds: string[];
};

type CartContextType = {
  items: CartItem[];
  addItem: (serviceId: string, addonIds: string[], compatibleAddons: string[]) => void;
  removeItem: (serviceId: string) => void;
  clearCart: () => void;
  getItems: () => CartItem[];
};

const STORAGE_KEY = 'cart_items';

export const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  // Load cart from localStorage at mount
  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null;
    if (stored) setItems(JSON.parse(stored));
  }, []);

  // Save cart to localStorage on change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }
  }, [items]);

  const addItem = (serviceId: string, addonIds: string[], compatibleAddons: string[]) => {
    // Only take compatible addon ids
    const filtered = addonIds.filter(id => compatibleAddons.includes(id));
    setItems((prev) => {
      // Replace if exists, else add
      const others = prev.filter(i => i.serviceId !== serviceId);
      return [...others, { serviceId, addonIds: filtered }];
    });
  };

  const removeItem = (serviceId: string) => {
    setItems((prev) => prev.filter(i => i.serviceId !== serviceId));
  };

  const clearCart = () => setItems([]);

  const getItems = () => items;

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, clearCart, getItems }}>
      {children}
    </CartContext.Provider>
  );
};