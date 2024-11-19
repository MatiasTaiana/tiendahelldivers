import React, { useState, useEffect } from 'react';
import { db } from '../../db/firebase'; // Asegúrate de tener la configuración de Firebase
import { collection, getDocs } from 'firebase/firestore'; // Para obtener los documentos de la colección
import Card from '../Card/Card';

const ItemListContainer = () => {
  const [products, setProducts] = useState([]);

  // Función para cargar los productos desde Firestore
  const fetchProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      const productsList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
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
      <div className='classTittle'>Products</div>
      <div className="cards-container">
        {products.map((product) => (
          <Card
            key={product.id} // La clave debe ser única
            id={product.id}
            name={product.name}
            description={product.description}
            image={product.image}
            price={product.price}
          />
        ))}
      </div>
    </div>
  );
};

export default ItemListContainer;