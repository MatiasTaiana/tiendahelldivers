import React, { useState, useEffect } from 'react';
import { db } from '../../db/firebase'; // Asegúrate de tener la configuración de Firebase
import { collection, getDocs } from 'firebase/firestore';
import Card from '../Card/Card';

const Terminids = () => {
  const [products, setProducts] = useState([]);
  
  // Función para cargar los productos desde Firestore
  const fetchProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      const productsList = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setProducts(productsList);
    } catch (error) {
      console.error("Error fetching products: ", error);
    }
  };

  // Cargar los productos cuando el componente se monta
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <div className='classTittle'>Terminids</div>
      <div className="cards-container">
        {products.map((product) => (
          product.category === 'terminid' && (
            <Card
              key={product.id}  
              id={product.id}
              name={product.name}
              description={product.description}
              image={product.image}
              price={product.price}
            />
          )
        ))}
      </div>
    </div>
  );
};

export default Terminids;
