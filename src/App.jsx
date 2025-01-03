import './App.css';
import NavBar from './components/NavBar/NavBar';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer';
import Terminids from './components/Terminids/Terminids';
import Automatons from './components/Automatons/Automatons';
import Weapons from './components/Weapons/Weapons';
import Stratagems from './components/Stratagems/Stratagems';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Cart from './components/Cart/Cart';
import { CartProvider } from './components/CartContext/CartContext';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from 'react';
import { db } from './db/firebase';
import { collection, getDocs } from 'firebase/firestore';
import CartWidget from './components/CartWidget/CartWidget';
function App() {
  useEffect(() => {
    const fetchProductsFromFirebase = async () => {
      try {
        const productsCollection = collection(db, "products"); 
        const productsSnapshot = await getDocs(productsCollection);
        const products = productsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

    
        if (!localStorage.getItem("products")) {
          localStorage.setItem("products", JSON.stringify(products));
        }
      } catch (error) {
        console.error("Error fetching products from Firebase: ", error);
      }
    };

    fetchProductsFromFirebase();
  }, []);

  return (
    <CartProvider>
      <BrowserRouter>
        <NavBar />
        <CartWidget />      
        <ToastContainer />
        <h1>Freedom Store</h1>
        <Routes>
          <Route path="/terminids" element={<Terminids />} />
          <Route path="/automatons" element={<Automatons />} />
          <Route path="/weapons" element={<Weapons />} />
          <Route path="/stratagems" element={<Stratagems />} />
          <Route path="/item/:id" element={<ItemDetailContainer />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/" element={<ItemListContainer />} /> {/* Home */}
          <Route path="/index.html" element={<ItemListContainer />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;

