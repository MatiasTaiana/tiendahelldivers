import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { CartContext } from '../CartContext/CartContext'; 
import { db } from '../../db/firebase'; 
import { doc, getDoc } from 'firebase/firestore'; 
import ItemCount from '../ItemCount/ItemCount';

const ItemDetailContainer = () => {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext); 
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const docRef = doc(db, "products", id); 
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setProduct(docSnap.data()); 
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error getting document: ", error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) return <p>Product not found.</p>;

  const handleAddToCart = (count) => {
    addToCart(product, count); 
  };

  return (
    <div className='containerDetail'>
      <h2 className='detailTittle'>{product.name}</h2>
      <img src={product.image} alt={product.name} />
      <p className='detailDescription'>{product.description}</p>
      <p className='detailPrice'>Price: {product.price} Super Credits</p>
      <ItemCount stock={10} initial={1} onAdd={handleAddToCart} product={product} />
    </div>
  );
};

export default ItemDetailContainer;
