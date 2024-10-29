import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import terminidsData from '../../assets/terminids.json';
import automatonData from '../../assets/automatons.json';
import weaponsData from '../../assets/weapons.json';
import stratagemsData from '../../assets/stratagems.json';
import ItemCount from '../ItemCount/ItemCount';

const ItemDetailContainer = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true); // Estado de carga

  const combinedProducts = [
    ...terminidsData,
    ...automatonData,
    ...weaponsData,
    ...stratagemsData,
  ];

  useEffect(() => {
    // Simular una carga asincrónica
    const fetchProduct = () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const foundProduct = combinedProducts.find((item) => item.id === parseInt(id));
          resolve(foundProduct);
        }, 1000); // Retraso de 1 segundo
      });
    };

    fetchProduct().then((foundProduct) => {
      setProduct(foundProduct);
      setLoading(false); // Cambia el estado de carga a false
    });
  }, [id, combinedProducts]);

  if (loading) return <p>Loading...</p>; // Muestra "Loading..." mientras carga

  if (!product) return <p>Product not found.</p>; // Manejo del caso donde no se encuentra el producto

  const handleAddToCart = (count) => {
    console.log(`Added ${count} of ${product.name} to cart.`);
  };

  return (
    <div>
      <h2>{product.name}</h2>
      <img src={product.image} alt={product.name} />
      <p>{product.description}</p>
      <p>Price: {product.price} Super Credits</p>
      <ItemCount stock={10} initial={1} onAdd={handleAddToCart} />
    </div>
  );
};

export default ItemDetailContainer;
