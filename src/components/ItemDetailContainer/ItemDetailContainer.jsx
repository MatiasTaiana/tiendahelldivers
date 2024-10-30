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

  const combinedProducts = [
    ...terminidsData,
    ...automatonData,
    ...weaponsData,
    ...stratagemsData,
  ];

  useEffect(() => {
    const foundProduct = combinedProducts.find((item) => item.id === parseInt(id));
    setProduct(foundProduct);
  }, [id]);

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
