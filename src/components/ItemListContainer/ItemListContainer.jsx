import React, { useState, useEffect } from 'react';
import { db } from '../../db/firebase'; 
import { collection, getDocs } from 'firebase/firestore';
import Card from '../Card/Card';
import OfferComponent from '../Offer/Offer';

const ItemListContainer = () => {
  const [products, setProducts] = useState([]);


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

  
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <div className='classTittle'>Products</div>
      <OfferComponent />
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
    </div>
  );
};

export default ItemListContainer;