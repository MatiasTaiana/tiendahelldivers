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
function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <NavBar />
        <ToastContainer />
        <h1>Freedom store</h1>
        <Routes>
          <Route path="/terminids" element={<Terminids />} />
          <Route path="/automatons" element={<Automatons />} />
          <Route path="/weapons" element={<Weapons />} />
          <Route path="/stratagems" element={<Stratagems />} />
          <Route path="/item/:id" element={<ItemDetailContainer />} />
          <Route path="/" element={<ItemListContainer />} /> {/* Home */}
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
