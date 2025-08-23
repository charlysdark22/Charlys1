// src/components/FeaturedCategories.jsx
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';

const categories = [
  {
    id: 1,
    name: 'Computadoras',
    icon: '💻',
    description: 'PCs de escritorio potentes',
    link: '/category/computers'
  },
  {
    id: 2,
    name: 'Laptops',
    icon: '🔋',
    description: 'Portátiles para trabajo y gaming',
    link: '/category/laptops'
  },
  {
    id: 3,
    name: 'Teléfonos',
    icon: '📱',
    description: 'Smartphones de última generación',
    link: '/category/phones'
  },
  {
    id: 4,
    name: 'Accesorios',
    icon: '🎧',
    description: 'Complementos y periféricos',
    link: '/category/accessories'
  }
];

const FeaturedCategories = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section ref={ref} className="py-16">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-3xl font-bold text-center mb-12"
        >
          Categorías Destacadas
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <Link
                to={category.link}
                className="block p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="text-4xl mb-4">{category.icon}</div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                  {category.name}
                </h3>
                <p className="text-gray-600">{category.description}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;