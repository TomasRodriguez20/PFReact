/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import OrderForm from './OrderForm';

const Cart = () => {
  const { cart, removeItem, clear } = useCart();
  const [showOrderForm, setShowOrderForm] = useState(false);
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleCheckout = () => {
    setShowOrderForm(true);
  };

  return (
    <div>
      <h2>Carrito de Compras</h2>
      {cart.length === 0 ? (
        <div>
          <p>No hay ítems en tu carrito.</p>
          <Link to="/">Volver a buscar productos</Link>
        </div>
      ) : (
        <div>
          <ul>
            {cart.map(item => (
              <li key={item.id}>
                <h4>{item.title}</h4>
                <p>Precio: ${item.price}</p>
                <p>Cantidad: {item.quantity}</p>
                <button onClick={() => removeItem(item.id)}>Eliminar</button>
              </li>
            ))}
          </ul>
          <h3>Total: ${totalPrice.toFixed(2)}</h3>
          <button onClick={clear}>Vaciar Carrito</button>
          <button onClick={handleCheckout}>Continuar con la Compra</button>
          {showOrderForm && <OrderForm cart={cart} totalPrice={totalPrice} />}
        </div>
      )}
    </div>
  );
};

export default Cart;
