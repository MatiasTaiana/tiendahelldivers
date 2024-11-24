
import { db } from "../db/firebase"; 
import { collection, addDoc, getDocs } from "firebase/firestore";

const uploadProductsToFirebase = async (products) => {
  try {
    const productsCollection = collection(db, "products");

    
    const querySnapshot = await getDocs(productsCollection);

  
    const existingProducts = querySnapshot.docs.map(doc => doc.data().id);

    
    for (const product of products) {
      if (!existingProducts.includes(product.id)) {
        await addDoc(productsCollection, product); 
        console.log(`Producto subido: ${product.name}`);
      } else {
        console.log(`Producto ya existe: ${product.name}`);
      }
    }
  } catch (error) {
    console.error("Error subiendo productos:", error);
  }
};

export default uploadProductsToFirebase;
