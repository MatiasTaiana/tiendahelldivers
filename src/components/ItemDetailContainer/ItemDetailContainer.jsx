import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { CartContext } from '../CartContext/CartContext';  // Importa el contexto
import { db } from '../../db/firebase'; // Asegúrate de tener la configuración de Firebase
import { doc, getDoc } from 'firebase/firestore'; // Para obtener un único documento de Firestore
import ItemCount from '../ItemCount/ItemCount';

const ItemDetailContainer = () => {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);  // Obtén la función addToCart desde el contexto
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const docRef = doc(db, "products", id);  // Obtiene el documento del producto por id
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setProduct(docSnap.data()); // Si existe el documento, guarda los datos en el estado
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error getting document: ", error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) return <p>Product not found.</p>; // Manejo del caso donde no se encuentra el producto

  const handleAddToCart = (count) => {
    addToCart(product, count); // Llama a la función addToCart desde el contexto
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
