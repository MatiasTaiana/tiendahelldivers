
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCNiq5OqZ1_yXaEolfGJmftldDPj74RZ_g",
  authDomain: "tienda-helldivers.firebaseapp.com",
  projectId: "tienda-helldivers",
  storageBucket: "tienda-helldivers.firebasestorage.app",
  messagingSenderId: "420004022855",
  appId: "1:420004022855:web:6ea796e7737b0c4240ff62"
};

// Inicializa la aplicación Firebase
const app = initializeApp(firebaseConfig);

// Inicializa Firestore
const db = getFirestore(app);

// Exporta la instancia de Firestore
export { db };