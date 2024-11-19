import React, { createContext, useState, useEffect } from "react";
import { db } from "../../db/firebase"; // Asegúrate de tener la configuración de Firebase aquí
import { collection, addDoc } from "firebase/firestore";

// Crear el contexto
export const CartContext = createContext();

// Proveedor del contexto
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    // Cargar el carrito desde localStorage si existe
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  // Guardar el carrito en localStorage cada vez que cambia
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Función para agregar un producto al carrito
  const addToCart = (product, quantity = 1) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        // Si ya existe, incrementa la cantidad
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Si no existe, añade el producto con la cantidad inicial
        return [...prevCart, { ...product, quantity }];
      }
    });
  };

  // Función para actualizar la cantidad de un producto
  const updateQuantity = (productId, newQuantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Función para eliminar un producto del carrito
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  // Función para calcular el precio total
  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Función para vaciar el carrito
  const clearCart = () => {
    setCart([]);
  };

  // Función para crear la orden en Firebase
  const createOrder = async (userDetails) => {
    try {
      const order = {
        items: cart,
        total: getTotalPrice(),
        user: userDetails, // Información del usuario (nombre, dirección, etc.)
        date: new Date(),
      };

      // Agregar la orden a Firestore
      const docRef = await addDoc(collection(db, "orders"), order);

      // Vaciar el carrito después de la compra
      clearCart();

      alert(`Order placed successfully! Your order ID is ${docRef.id}`);
    } catch (error) {
      console.error("Error creating order: ", error);
      alert("There was an error processing your order. Please try again.");
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
        createOrder, // Pasar la función de creación de orden
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
