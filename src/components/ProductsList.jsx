/* eslint-disable react/prop-types */

import { useEffect, useState } from 'react';
import { getProducts } from '../asyncMock.js';
import ProductCard from './ProductCard';

export default function ProductsList({ category }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts.then((data) => {
      // Filtra los productos si hay una categoría
      if (category) {
        setProducts(data.filter((product) => product.category === category));
      } else {
        setProducts(data); // Muestra todos los productos si no hay categoría
      }
    });
  }, [category]); // Agrega category como dependencia

  return (
    <>
      <section style={{ display: 'flex', gap: 10 }}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} /> // Asegúrate de usar product.id como key
        ))}
      </section>
    </>
  );
}
