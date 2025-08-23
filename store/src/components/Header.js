import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import ThemeToggle from './ThemeToggle';
import CartIcon from './CartIcon';
import { motion, useScroll } from 'framer-motion';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const { language, toggleLanguage, t } = useLanguage();
  const { cartItemCount } = useCart();
  const location = useLocation();
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    return scrollY.onChange((latest) => {
      setIsScrolled(latest > 0);
    });
  }, [scrollY]);

  const isActive = (path) => location.pathname === path;

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link 
              to="/" 
              className={`text-2xl font-bold transition-colors duration-300 ${
                isScrolled
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-gray-900 dark:text-white'
              }`}
            >
              TechStore
            </Link>
          </div>

          {/* Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {[
              { path: '/', label: 'nav.home' },
              { path: '/products', label: 'nav.products' }
            ].map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                className={`relative py-2 transition-colors duration-300 ${
                  isScrolled
                    ? 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                    : 'text-gray-900 dark:text-white hover:text-blue-500 dark:hover:text-blue-300'
                } group`}
              >
                {t(label)}
                <span className={`absolute bottom-0 left-0 w-full h-0.5 transform scale-x-0 transition-transform duration-300 ${
                  isActive(path) ? 'scale-x-100 bg-blue-500' : 'group-hover:scale-x-100 bg-blue-400'
                }`} />
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <button
              onClick={toggleLanguage}
              className={`px-3 py-2 text-sm rounded-lg transition-all duration-300 ${
                isScrolled
                  ? 'bg-gray-100 dark:bg-gray-700'
                  : 'bg-gray-100/50 dark:bg-gray-700/50 backdrop-blur-sm'
              }`}
            >
              {language === 'es' ? '🇪🇸 ES' : '🇺🇸 EN'}
            </button>
            
            {user ? (
              <>
                <Link to="/cart" className="relative">
                  <CartIcon />
                  {cartItemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cartItemCount}
                    </span>
                  )}
                </Link>
                <div className="relative group">
                  <button className={`flex items-center space-x-1 transition-colors duration-300 ${
                    isScrolled
                      ? 'text-gray-700 dark:text-gray-300'
                      : 'text-gray-900 dark:text-white'
                  }`}>
                    <span>{user.name}</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div className="absolute right-0 w-48 mt-2 py-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                    <Link to="/profile" className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700/50">
                      {t('nav.profile')}
                    </Link>
                    <button
                      onClick={logout}
                      className="block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700/50"
                    >
                      {t('nav.logout')}
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className={`transition-colors duration-300 ${
                  isScrolled
                    ? 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                    : 'text-gray-900 dark:text-white hover:text-blue-500 dark:hover:text-blue-300'
                }`}>
                  {t('nav.login')}
                </Link>
                <Link 
                  to="/register" 
                  className="bg-blue-600/90 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all duration-300 backdrop-blur-sm hover:shadow-lg"
                >
                  {t('nav.register')}
                </Link>
              </>
            )}
            
            <button 
              className="md:hidden" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </nav>
      </div>
    </motion.header>
  );
}