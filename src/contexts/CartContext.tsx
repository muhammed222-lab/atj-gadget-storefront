
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '@/components/ProductCard';
import { useToast } from "@/components/ui/use-toast";

export interface CartItem {
  product: Product;
  quantity: number;
  color?: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity: number, color?: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
}

const CartContext = createContext<CartContextType>({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  getCartTotal: () => 0,
});

export const useCart = () => useContext(CartContext);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const { toast } = useToast();
  
  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem('atj-cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error('Failed to parse cart from localStorage:', error);
      }
    }
  }, []);
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('atj-cart', JSON.stringify(cart));
  }, [cart]);
  
  const addToCart = (product: Product, quantity: number = 1, color?: string) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.product.id === product.id && (!color || item.color === color)
      );
      
      if (existingItem) {
        // Update existing item quantity
        return prevCart.map((item) => {
          if (item.product.id === product.id && (!color || item.color === color)) {
            return { ...item, quantity: item.quantity + quantity };
          }
          return item;
        });
      } else {
        // Add new item
        return [...prevCart, { product, quantity, color }];
      }
    });
    
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
      duration: 2000,
    });
  };
  
  const removeFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
    
    toast({
      title: "Removed from cart",
      description: "The item has been removed from your cart.",
      duration: 2000,
    });
  };
  
  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) return;
    
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };
  
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('atj-cart');
  };
  
  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  };
  
  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
