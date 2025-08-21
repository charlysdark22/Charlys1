// src/components/Cart.js
import { useCart } from '../context/CartContext';
import { memo } from 'react';

const CartItem = memo(({ item, onRemove }) => (
  <div className="flex justify-between items-center p-2 border-b">
    <span className="flex-1">
      {item.name} <span className="text-sm text-gray-600">x{item.quantity}</span>
    </span>
    <span className="mx-4">${(item.price * item.quantity).toFixed(2)}</span>
    <button 
      onClick={() => onRemove(item.id)}
      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition-colors"
    >
      Eliminar
    </button>
  </div>
));

export default function Cart() {
  const { cart, removeFromCart, clearCart, cartTotal, cartItemCount } = useCart();

  return (
    <div className="border rounded-lg shadow-sm p-4 mt-6 bg-white">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Carrito ({cartItemCount})</h2>
        {cartItemCount > 0 && (
          <span className="text-lg font-medium">Total: ${cartTotal.toFixed(2)}</span>
        )}
      </div>
      
      {cart.length === 0 ? (
        <p className="text-gray-500 text-center py-4">Carrito vacío</p>
      ) : (
        <>
          <div className="space-y-2">
            {cart.map((item) => (
              <CartItem key={item.id} item={item} onRemove={removeFromCart} />
            ))}
          </div>
          <button 
            onClick={clearCart} 
            className="w-full mt-4 bg-gray-800 text-white py-2 rounded hover:bg-gray-900 transition-colors"
          >
            Vaciar carrito
          </button>
        </>
      )}
    </div>
  );
}