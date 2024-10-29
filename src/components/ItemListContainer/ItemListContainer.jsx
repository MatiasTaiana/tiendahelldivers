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
    const fetchProducts = () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const combinedProducts = [
            ...terminidsData,
            ...automatonData,
            ...weaponsData,
            ...stratagemsData
          ];
          resolve(combinedProducts); // Resolviendo con los productos combinados
        }, 1000); // Simula un retraso de 1 segundo
      });
    };

    fetchProducts().then((combinedProducts) => {
      setProducts(combinedProducts);
      setLoading(false); // Cambia el estado de carga a false
    });
  }, []); // Solo se ejecuta una vez al montar el componente

  if (loading) return <p>Loading...</p>; // Muestra "Loading..." mientras carga

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
