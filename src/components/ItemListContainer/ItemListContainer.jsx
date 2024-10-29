// ItemListContainer.js
import React, { useState, useEffect } from 'react';
import terminidsData from '../../assets/terminids.json';
import automatonData from '../../assets/automatons.json';
import weaponsData from '../../assets/weapons.json';
import stratagemsData from '../../assets/stratagems.json';
import Card from '../Card/Card';

const ItemListContainer = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const combinedProducts = [
      ...terminidsData,
      ...automatonData,
      ...weaponsData,
      ...stratagemsData,
    ];

    setProducts(combinedProducts);
    setLoading(false);
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="cards-container">
      {products.map((product) => (
        <Card
          key={product.id}
          id={product.id}
          name={product.name}
          description={product.description}
          image={product.image}
          price={product.price}
        />
      ))}
    </div>
  );
};

export default ItemListContainer;
