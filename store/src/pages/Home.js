// src/pages/Home.jsx
import { Suspense, lazy, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ErrorBoundary } from 'react-error-boundary';
import { Link } from 'react-router-dom';

// Optimized lazy loading
const Hero = lazy(() => import('../components/Hero'));
const FeaturedCategories = lazy(() => import('../components/FeaturedCategories'));
const FeaturedProducts = lazy(() => import('../components/FeaturedProducts'));

// Promotional blocks data
const promoBlocks = [
  {
    id: 1,
    title: "Tecnología de Vanguardia",
    description: "Descubre los últimos avances en tecnología",
    link: "/products/tech",
    bgColor: "from-blue-600 to-indigo-700",
    image: "/images/tech-banner.jpg"
  },
  {
    id: 2,
    title: "Audio Premium",
    description: "La mejor experiencia sonora para tus momentos",
    link: "/products/audio",
    bgColor: "from-purple-600 to-pink-700",
    image: "/images/audio-banner.jpg"
  },
  {
    id: 3,
    title: "Gadgets Innovadores",
    description: "Accesorios que transforman tu día a día",
    link: "/products/gadgets",
    bgColor: "from-green-600 to-teal-700",
    image: "/images/gadgets-banner.jpg"
  }
];

// Optimized loading spinner
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-[200px]">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
  </div>
);

// Enhanced error fallback
const ErrorFallback = ({ error, resetErrorBoundary }) => (
  <div className="text-center py-10 bg-red-50 rounded-lg">
    <h2 className="text-red-600 text-xl mb-4">Oops! Algo salió mal</h2>
    <p className="text-gray-600 mb-4">{error.message}</p>
    <button
      onClick={resetErrorBoundary}
      className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
    >
      Reintentar
    </button>
  </div>
);

// Optimized animated section with improved performance
const AnimatedSection = ({ children, delay = 0 }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: '50px',
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
};

// Promotional Block Component
const PromoBlock = ({ block }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={`rounded-xl overflow-hidden shadow-lg relative cursor-pointer`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <Link to={block.link}>
        <div className={`p-6 bg-gradient-to-r ${block.bgColor} text-white relative z-10 h-full`}>
          <motion.h3 
            className="text-2xl font-bold mb-2"
            animate={{ y: isHovered ? -5 : 0 }}
          >
            {block.title}
          </motion.h3>
          <motion.p 
            className="mb-4 opacity-90"
            animate={{ y: isHovered ? -5 : 0 }}
          >
            {block.description}
          </motion.p>
          <motion.button 
            className="bg-white text-gray-800 px-6 py-2 rounded-lg font-semibold transition-all"
            animate={{ 
              y: isHovered ? -5 : 0,
              backgroundColor: isHovered ? "#f8fafc" : "#ffffff"
            }}
          >
            Explorar →
          </motion.button>
        </div>
      </Link>
    </motion.div>
  );
};

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<LoadingSpinner />}>
          <AnimatedSection>
            <Hero />
          </AnimatedSection>
        </Suspense>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Promo Blocks Section */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <AnimatePresence>
              {promoBlocks.map((block, index) => (
                <AnimatedSection key={block.id} delay={index * 0.1}>
                  <PromoBlock block={block} />
                </AnimatedSection>
              ))}
            </AnimatePresence>
          </div>

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