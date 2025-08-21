// src/components/FeaturedProducts.jsx
import { useApp } from '../context/AppContext';

const products = [
  { id: 1, name: 'Laptop Gamer', price: 1299, image: 'https://via.placeholder.com/300x200?text=Laptop' },
  { id: 2, name: 'Smartphone Pro', price: 899, image: 'https://via.placeholder.com/300x200?text=Phone' },
  { id: 3, name: 'Teclado Mecánico', price: 129, image: 'https://via.placeholder.com/300x200?text=Keyboard' },
  { id: 4, name: 'Monitor 4K', price: 499, image: 'https://via.placeholder.com/300x200?text=Monitor' },
];

export default function FeaturedProducts() {
  const { addToCart } = useApp();

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">Productos Destacados</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" id="featured-products">
          {products.map(product => (
            <div key={product.id} className="bg-white dark:bg-gray-700 rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
              <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded mb-4" />
              <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">${product.price}</p>
              <button
                onClick={() => addToCart(product)}
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
              >
                Añadir al carrito
              </button>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <a
            href="/productos"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Ver Todos los Productos
          </a>
        </div>
      </div>
    </section>
  );
}