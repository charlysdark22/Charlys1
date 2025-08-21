// src/components/Cart.js
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { cart, removeFromCart, clearCart } = useCart();

  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', marginTop: '20px' }}>
      <h2>Carrito ({cart.length})</h2>
      {cart.length === 0 ? (
        <p>Carrito vacío</p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>
                {item.name} x{item.quantity} - ${item.price * item.quantity}
              </span>
              <button onClick={() => removeFromCart(item.id)}>Eliminar</button>
            </div>
          ))}
          <button onClick={clearCart} style={{ marginTop: '10px' }}>
            Vaciar carrito
          </button>
        </>
      )}
    </div>
  );
}