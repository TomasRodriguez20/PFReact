/* eslint-disable react/prop-types */

import { useEffect, useState } from 'react';
import { getProducts } from '../asyncMock.js';
import ProductCard from './ProductCard';

export default function ProductsList({ category }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts.then((data) => {
      
      if (category) {
        setProducts(data.filter((product) => product.category === category));
      } else {
        setProducts(data);
      }
    });
  }, [category]);

  return (
    <>
      <section style={{ display: 'flex', gap: 10 }}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>
    </>
  );
}
