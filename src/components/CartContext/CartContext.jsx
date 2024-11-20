import React, { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify"; // Importar Toastify
import { db } from "../../db/firebase";
import { collection, addDoc } from "firebase/firestore";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, quantity = 1) => {
    const quantityNumber = Number(quantity); // Convertir cantidad a número

    if (isNaN(quantityNumber) || quantityNumber <= 0) {
      toast.error("Please enter a valid quantity!", { autoClose: 2000 });
      return;
    }

    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        toast.info(`${product.name} quantity updated!`, { autoClose: 2000 }); // Alerta
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantityNumber }
            : item
        );
      } else {
        toast.success(`${product.name} added to cart!`, { autoClose: 2000 }); // Alerta
        return [...prevCart, { ...product, quantity: quantityNumber }];
      }
    });
  };

  const updateQuantity = (productId, newQuantity) => {
    const quantity = Number(newQuantity); // Convertir newQuantity a un número

    if (isNaN(quantity) || quantity <= 0) {
      toast.error("Please enter a valid number for quantity!", { autoClose: 2000 });
      return; // Evitar actualizar si no es un número válido
    }

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
    toast.info(`Product quantity updated!`, { autoClose: 2000 }); // Alerta
  };

  const removeFromCart = (productId) => {
    const product = cart.find((item) => item.id === productId);
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    
  };

  const clearCart = () => {
    setCart([]);
    toast.error("Cart cleared!", { autoClose: 2000 }); // Alerta
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const createOrder = async (userDetails) => {
    try {
      const order = {
        items: cart,
        total: getTotalPrice(),
        user: userDetails,
        date: new Date(),
      };

      const docRef = await addDoc(collection(db, "orders"), order);
      clearCart();
      toast.success(`Order placed! Order ID: ${docRef.id}`, { autoClose: 8000 }); // Alerta
    } catch (error) {
      console.error("Error creating order: ", error);
      toast.error("Error placing order. Please try again.", { autoClose: 3000 }); // Alerta
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        getTotalPrice,
        clearCart,
        createOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
