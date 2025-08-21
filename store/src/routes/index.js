import { lazy } from 'react';

// Lazy load components for better performance
export const routes = {
  home: {
    path: '/',
    component: lazy(() => import('../pages/Home')),
  },
  products: {
    path: '/products',
    component: lazy(() => import('../pages/Products')),
  },
  product: {
    path: '/product/:id',
    component: lazy(() => import('../pages/ProductDetail')),
  },
  cart: {
    path: '/cart',
    component: lazy(() => import('../pages/Cart')),
    protected: true,
  },
  login: {
    path: '/login',
    component: lazy(() => import('../pages/Login')),
    guestOnly: true,
  },
  register: {
    path: '/register',
    component: lazy(() => import('../pages/Register')),
    guestOnly: true,
  },
  profile: {
    path: '/profile',
    component: lazy(() => import('../pages/Profile')),
    protected: true,
  },
  orders: {
    path: '/orders',
    component: lazy(() => import('../pages/Orders')),
    protected: true,
  },
  settings: {
    path: '/settings',
    component: lazy(() => import('../pages/Settings')),
    protected: true,
  },
  notFound: {
    path: '*',
    component: lazy(() => import('../pages/NotFound')),
  },
};
