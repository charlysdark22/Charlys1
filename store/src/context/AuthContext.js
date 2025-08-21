import React, { createContext, useState, useContext, useCallback } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = useCallback(async (email, password) => {
    try {
      // Here you would typically make an API call to your backend
      // For demo purposes, we'll simulate a successful login
      const userData = {
        id: '1',
        name: 'Usuario Demo',
        email: email,
        // Add any other user data you need
      };
      
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }, []);

  const register = useCallback(async (name, email, password) => {
    try {
      // Here you would typically make an API call to your backend
      // For demo purposes, we'll simulate a successful registration
      const userData = {
        id: Date.now().toString(),
        name: name,
        email: email,
        // Add any other user data you need
      };
      
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('user');
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
