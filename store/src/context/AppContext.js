// src/context/AppContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';

// Crear el contexto
export const AppContext = createContext();

// Proveedor del contexto
export const AppProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('es');
  const [cart, setCart] = useState([]);

  // Cargar estado desde localStorage al iniciar
  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode') === 'true';
    const savedLang = localStorage.getItem('language') || 'es';
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];

    setDarkMode(savedMode);
    setLanguage(savedLang);
    setCart(savedCart);
  }, []);

  // Guardar modo oscuro en localStorage y aplicarlo al documento
  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Guardar idioma
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  // Guardar carrito
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Funciones del carrito
  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleDarkMode = () => setDarkMode((prev) => !prev);
  const changeLanguage = (lang) => setLanguage(lang);

  return (
    <AppContext.Provider
      value={{
        darkMode,
        toggleDarkMode,
        language,
        changeLanguage,
        cart,
        addToCart,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Hook personalizado exportable
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};