/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '../index.js';

const OrderForm = ({ cart, totalPrice }) => {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '' });
  const [orderId, setOrderId] = useState(null);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.name.length < 3 || !formData.phone.match(/^\d{10}$/) || !formData.email.includes('@')) {
      alert('Por favor, revisa tus datos antes de continuar.');
      return;
    }

    const order = {
      buyer: { ...formData },
      date: Timestamp.fromDate(new Date()),
      items: cart.map(item => ({
        id: item.id,
        price: item.price,
        title: item.title,
        quantity: item.quantity
      })),
      total: totalPrice
    };

    try {
      const docRef = await addDoc(collection(db, 'OrderCollection'), order);
      setOrderId(docRef.id);
      alert(`¡Orden generada! Su número de compra es: ${docRef.id}`);
    } catch (error) {
      console.error("Error al generar la orden: ", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Datos del comprador</h3>
      <input
        type="text"
        name="name"
        placeholder="Nombre"
        value={formData.name}
        onChange={handleInputChange}
        required
      />
      <input
        type="text"
        name="phone"
        placeholder="Teléfono"
        value={formData.phone}
        onChange={handleInputChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Correo Electrónico"
        value={formData.email}
        onChange={handleInputChange}
        required
      />
      <button type="submit">Confirmar Compra</button>
      {orderId && <p>Este es tu número de compra: {orderId}</p>}
    </form>
  );
};

export default OrderForm;
