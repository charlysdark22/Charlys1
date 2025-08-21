import React, { createContext, useState, useContext, useCallback, useEffect } from 'react';

const DEFAULT_LANGUAGE = 'es';
const SUPPORTED_LANGUAGES = ['en', 'es'];

const translations = {
  en: {
    nav: {
      home: 'Home',
      products: 'Products',
      cart: 'Cart',
      login: 'Login',
      register: 'Register',
      profile: 'Profile',
      logout: 'Logout',
    },
    auth: {
      loginTitle: 'Login to your account',
      registerTitle: 'Create new account',
      email: 'Email',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      name: 'Full Name',
      loginButton: 'Login',
      registerButton: 'Register',
      alreadyHaveAccount: 'Already have an account?',
      dontHaveAccount: 'Don\'t have an account?'
    },
    cart: {
      title: 'Shopping Cart',
      empty: 'Your cart is empty',
      total: 'Total',
      checkout: 'Checkout',
      remove: 'Remove',
      clear: 'Clear Cart',
    },
    products: {
      addToCart: 'Add to Cart',
      outOfStock: 'Out of Stock',
      price: 'Price',
    },
    profile: {
      title: 'User Profile',
      orders: 'My Orders',
      settings: 'Settings',
      addresses: 'My Addresses',
    },
  },
  es: {
    nav: {
      home: 'Inicio',
      products: 'Productos',
      cart: 'Carrito',
      login: 'Iniciar Sesión',
      register: 'Registrarse',
      profile: 'Perfil',
      logout: 'Cerrar Sesión',
    },
    auth: {
      loginTitle: 'Iniciar sesión',
      registerTitle: 'Crear cuenta nueva',
      email: 'Correo electrónico',
      password: 'Contraseña',
      confirmPassword: 'Confirmar Contraseña',
      name: 'Nombre Completo',
      loginButton: 'Iniciar Sesión',
      registerButton: 'Registrarse',
      alreadyHaveAccount: '¿Ya tienes una cuenta?',
      dontHaveAccount: '¿No tienes una cuenta?',
    },
    cart: {
      title: 'Carrito de Compras',
      empty: 'Tu carrito está vacío',
      total: 'Total',
      checkout: 'Pagar',
      remove: 'Eliminar',
      clear: 'Vaciar Carrito',
    },
    products: {
      addToCart: 'Agregar al Carrito',
      outOfStock: 'Agotado',
      price: 'Precio',
    },
    profile: {
      title: 'Perfil de Usuario',
      orders: 'Mis Pedidos',
      settings: 'Configuración',
      addresses: 'Mis Direcciones',
    },
  },
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    try {
      const savedLang = localStorage.getItem('language');
      return SUPPORTED_LANGUAGES.includes(savedLang) ? savedLang : DEFAULT_LANGUAGE;
    } catch (error) {
      console.warn('Error accessing localStorage:', error);
      return DEFAULT_LANGUAGE;
    }
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Ensure the HTML lang attribute is updated
    document.documentElement.lang = language;
    setIsLoading(false);
  }, [language]);

  const changeLanguage = useCallback((lang) => {
    if (!SUPPORTED_LANGUAGES.includes(lang)) {
      console.warn(`Unsupported language: ${lang}`);
      return;
    }
    try {
      setLanguage(lang);
      localStorage.setItem('language', lang);
      document.documentElement.lang = lang;
    } catch (error) {
      console.error('Error setting language:', error);
    }
  }, []);

  const toggleLanguage = useCallback(() => {
    const newLang = language === 'es' ? 'en' : 'es';
    changeLanguage(newLang);
  }, [language, changeLanguage]);

  const t = useCallback((key, params = {}) => {
    try {
      const keys = key.split('.');
      let value = translations[language];
      
      for (const k of keys) {
        if (!value || typeof value !== 'object') {
          console.warn(`Translation key not found: ${key}`);
          return key;
        }
        value = value[k];
      }

      if (typeof value !== 'string') {
        console.warn(`Translation value is not a string for key: ${key}`);
        return key;
      }

      // Handle parameter replacement
      return value.replace(/\${(\w+)}/g, (_, param) => {
        return params[param] || `\${${param}}`;
      });
    } catch (error) {
      console.error('Error in translation:', error);
      return key;
    }
  }, [language]);

  if (isLoading) {
    return null; // Or a loading spinner if you prefer
  }

  return (
    <LanguageContext.Provider 
      value={{ 
        language, 
        toggleLanguage, 
        changeLanguage, 
        t,
        isLoading,
        supportedLanguages: SUPPORTED_LANGUAGES 
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Helper hook for translations with parameters
export const useTranslation = (key, params = {}) => {
  const { t } = useLanguage();
  return t(key, params);
};
