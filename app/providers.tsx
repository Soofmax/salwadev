'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'base' | 'addon';
  isSelected: boolean;
  dependencies?: string[];
}

interface CartContextType {
  services: Service[];
  addService: (service: Service) => void;
  removeService: (serviceId: string) => void;
  clearCart: () => void;
  total: number;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

interface User {
  id: string;
  email: string;
  walletAddress?: string;
  name?: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => void;
  connectWallet: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

import { CartProvider } from '@/context/CartContext';

export function Providers({ children }: { children: ReactNode }) {
  // ...auth context logic remains unchanged above...

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        signUp,
        signOut,
        connectWallet,
        isLoading,
      }}
    >
      <CartProvider>
        {children}
      </CartProvider>
    </AuthContext.Provider>
  );
}
