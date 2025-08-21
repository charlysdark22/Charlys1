import React, { createContext, useState, useContext, useCallback, useMemo } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = useCallback((product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const cartTotal = useMemo(() => 
    cart.reduce((total, item) => total + (item.price * item.quantity), 0),
    [cart]
  );

  const cartItemCount = useMemo(() => 
    cart.reduce((total, item) => total + item.quantity, 0),
    [cart]
  );

  const value = useMemo(() => ({
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    cartTotal,
    cartItemCount
  }), [cart, addToCart, removeFromCart, clearCart, cartTotal, cartItemCount]);

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);