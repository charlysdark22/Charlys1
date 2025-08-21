// src/pages/Home.jsx
import { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ErrorBoundary } from 'react-error-boundary';

// Lazy load components for better initial load performance
const Hero = lazy(() => import('../components/Hero'));
const FeaturedCategories = lazy(() => import('../components/FeaturedCategories'));
const FeaturedProducts = lazy(() => import('../components/FeaturedProducts'));

// Fallback loading component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-[200px]">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
  </div>
);

// Error fallback component
const ErrorFallback = ({ error, resetErrorBoundary }) => (
  <div className="text-center py-10">
    <h2 className="text-red-600 text-xl mb-4">Something went wrong</h2>
    <button
      onClick={resetErrorBoundary}
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
    >
      Try again
    </button>
  </div>
);

// Animated section component
const AnimatedSection = ({ children, delay = 0 }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
};

export default function Home() {
  return (
    <div className="min-h-screen">
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<LoadingSpinner />}>
          <AnimatedSection>
            <Hero />
          </AnimatedSection>
        </Suspense>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Suspense fallback={<LoadingSpinner />}>
              <AnimatedSection delay={0.2}>
                <FeaturedCategories />
              </AnimatedSection>
            </Suspense>
          </ErrorBoundary>

          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Suspense fallback={<LoadingSpinner />}>
              <AnimatedSection delay={0.4}>
                <FeaturedProducts />
              </AnimatedSection>
            </Suspense>
          </ErrorBoundary>
        </div>
      </ErrorBoundary>
    </div>
  );
}