import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';

const filters = {
  categories: ['Laptops', 'Smartphones', 'Tablets', 'Audio', 'Accesorios', 'Gaming'],
  price: ['0-100', '100-500', '500-1000', '1000+'],
  brands: ['Apple', 'Samsung', 'Sony', 'HP', 'Lenovo', 'Asus'],
};

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden group"
    >
      <div className="aspect-w-1 aspect-h-1 relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-40 transition-opacity" />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">{product.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            ${product.price}
          </span>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => addToCart(product)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Agregar al carrito
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

const FilterSection = ({ title, options, selected, onChange }) => (
  <div className="mb-6">
    <h3 className="text-lg font-semibold mb-3">{title}</h3>
    <div className="space-y-2">
      {options.map((option) => (
        <label key={option} className="flex items-center">
          <input
            type="checkbox"
            checked={selected.includes(option)}
            onChange={() => onChange(option)}
            className="form-checkbox h-4 w-4 text-blue-600"
          />
          <span className="ml-2 text-gray-700 dark:text-gray-300">{option}</span>
        </label>
      ))}
    </div>
  </div>
);

export default function Products() {
  const { t } = useLanguage();
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPrices, setSelectedPrices] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);

  // Mock products data - replace with your actual data
  const products = [
    {
      id: 1,
      name: "MacBook Pro M2",
      price: 1299.99,
      description: "Potente laptop con chip M2",
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "Laptops",
      brand: "Apple"
    },
    // Add more products here
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">{t('products.title', 'Nuestros Productos')}</h1>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            {showFilters ? 'Ocultar filtros' : 'Mostrar filtros'}
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className={`w-full md:w-64 ${showFilters ? 'block' : 'hidden'} md:block`}>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg sticky top-20">
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Ordenar por</h3>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                >
                  <option value="featured">Destacados</option>
                  <option value="price-low">Precio: Menor a Mayor</option>
                  <option value="price-high">Precio: Mayor a Menor</option>
                  <option value="newest">Más recientes</option>
                </select>
              </div>

              <FilterSection
                title="Categorías"
                options={filters.categories}
                selected={selectedCategories}
                onChange={(category) => {
                  setSelectedCategories(prev =>
                    prev.includes(category)
                      ? prev.filter(c => c !== category)
                      : [...prev, category]
                  );
                }}
              />

              <FilterSection
                title="Rango de Precio"
                options={filters.price}
                selected={selectedPrices}
                onChange={(price) => {
                  setSelectedPrices(prev =>
                    prev.includes(price)
                      ? prev.filter(p => p !== price)
                      : [...prev, price]
                  );
                }}
              />

              <FilterSection
                title="Marcas"
                options={filters.brands}
                selected={selectedBrands}
                onChange={(brand) => {
                  setSelectedBrands(prev =>
                    prev.includes(brand)
                      ? prev.filter(b => b !== brand)
                      : [...prev, brand]
                  );
                }}
              />

              <button
                onClick={() => {
                  setSelectedCategories([]);
                  setSelectedPrices([]);
                  setSelectedBrands([]);
                }}
                className="w-full px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
              >
                Limpiar filtros
              </button>
            </div>
          </aside>

          {/* Products Grid */}
          <main className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
