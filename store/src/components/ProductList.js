// src/components/ProductList.js
import { useCart } from '../context/CartContext';
import { memo } from 'react';

const products = [
  { 
    id: 1, 
    name: 'Camiseta', 
    price: 25,
    description: 'Camiseta de algodón premium',
    image: 'https://via.placeholder.com/150'
  },
  { 
    id: 2, 
    name: 'Pantalón', 
    price: 45,
    description: 'Pantalón casual de alta calidad',
    image: 'https://via.placeholder.com/150'
  },
  { 
    id: 3, 
    name: 'Zapatos', 
    price: 80,
    description: 'Zapatos deportivos cómodos',
    image: 'https://via.placeholder.com/150'
  },
];

const ProductCard = memo(({ product, onAddToCart }) => (
  <div className="bg-white rounded-lg shadow-sm overflow-hidden transition-transform hover:scale-105">
    <img 
      src={product.image} 
      alt={product.name}
      className="w-full h-40 object-cover"
    />
    <div className="p-4">
      <h3 className="text-lg font-semibold">{product.name}</h3>
      <p className="text-gray-600 text-sm mb-2">{product.description}</p>
      <div className="flex justify-between items-center">
        <span className="text-xl font-bold">${product.price}</span>
        <button 
          onClick={() => onAddToCart(product)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
        >
          Agregar
        </button>
      </div>
    </div>
  </div>
));

export default function ProductList() {
  const { addToCart } = useCart();

  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold mb-6">Productos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onAddToCart={addToCart}
          />
        ))}
      </div>
    </div>
  );
}