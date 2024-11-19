// src/helpers/uploadProductsToFirebase.js
import { db } from "../db/firebase";  // Asegúrate de que la ruta sea correcta
import { collection, addDoc, getDocs } from "firebase/firestore";

const uploadProductsToFirebase = async (products) => {
  try {
    const productsCollection = collection(db, "products");

    // Obtiene todos los productos existentes en Firestore
    const querySnapshot = await getDocs(productsCollection);

    // Conviértelo en un array para verificar si los productos ya existen
    const existingProducts = querySnapshot.docs.map(doc => doc.data().id);

    // Verifica si los productos ya están en la base de datos
    for (const product of products) {
      if (!existingProducts.includes(product.id)) {
        await addDoc(productsCollection, product);  // Solo agrega si no existe
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
