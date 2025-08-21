// src/components/ProductList.js
import { useCart } from '../context/CartContext';

const products = [
  { id: 1, name: 'Camiseta', price: 25 },
  { id: 2, name: 'Pantalón', price: 45 },
  { id: 3, name: 'Zapatos', price: 80 },
];

export default function ProductList() {
  const { addToCart } = useCart();

  return (
    <div>
      <h2>Productos</h2>
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        {products.map((product) => (
          <div key={product.id} style={{ border: '1px solid #ccc', padding: '10px', width: '150px' }}>
            <h3>{product.name}</h3>
            <p>${product.price}</p>
            <button onClick={() => addToCart(product)}>Agregar</button>
          </div>
        ))}
      </div>
    </div>
  );
}