import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Product {
  id: string;
  name: string;
  category: string;
  quantity: number;
}

const STORAGE_KEY = '@inventory_data';

export const useInventory = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        setProducts(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to load inventory', e);
    } finally {
      setLoading(false);
    }
  };

  const saveProducts = async (newProducts: Product[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newProducts));
      setProducts(newProducts);
    } catch (e) {
      console.error('Failed to save inventory', e);
    }
  };

  const addProduct = (product: Omit<Product, 'id'>) => {
    const newProduct = { ...product, id: Date.now().toString() };
    saveProducts([...products, newProduct]);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    const newProducts = products.map((p) => (p.id === id ? { ...p, ...updates } : p));
    saveProducts(newProducts);
  };

  const deleteProduct = (id: string) => {
    const newProducts = products.filter((p) => p.id !== id);
    saveProducts(newProducts);
  };

  const updateQuantity = (id: string, delta: number) => {
    const newProducts = products.map((p) => {
      if (p.id === id) {
        const newQty = Math.max(0, p.quantity + delta);
        return { ...p, quantity: newQty };
      }
      return p;
    });
    saveProducts(newProducts);
  };

  return {
    products,
    loading,
    addProduct,
    updateProduct,
    deleteProduct,
    updateQuantity,
  };
};
