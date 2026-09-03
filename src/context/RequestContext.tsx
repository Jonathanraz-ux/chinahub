import React, { createContext, useContext, useState, useCallback } from 'react';
import type { RequestItem, Product } from '../types';

interface RequestContextType {
  items: RequestItem[];
  addItem: (product: Product, quantity?: number, remark?: string) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  updateRemark: (productId: string, remark: string) => void;
  clearItems: () => void;
  totalCount: number;
}

const RequestContext = createContext<RequestContextType | undefined>(undefined);

export function RequestProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<RequestItem[]>([]);

  const addItem = useCallback((product: Product, quantity = 1, remark = '') => {
    setItems(prev => {
      const existing = prev.find(i => i.product.id === product.id);
      if (existing) {
        return prev.map(i => i.product.id === product.id ? { ...i, quantity: i.quantity + quantity } : i);
      }
      return [...prev, { product, quantity, remark }];
    });
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems(prev => prev.filter(i => i.product.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    setItems(prev => prev.map(i => i.product.id === productId ? { ...i, quantity } : i));
  }, []);

  const updateRemark = useCallback((productId: string, remark: string) => {
    setItems(prev => prev.map(i => i.product.id === productId ? { ...i, remark } : i));
  }, []);

  const clearItems = useCallback(() => setItems([]), []);

  const totalCount = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <RequestContext.Provider value={{ items, addItem, removeItem, updateQuantity, updateRemark, clearItems, totalCount }}>
      {children}
    </RequestContext.Provider>
  );
}

export function useRequests() {
  const ctx = useContext(RequestContext);
  if (!ctx) throw new Error('useRequests must be used within RequestProvider');
  return ctx;
}
