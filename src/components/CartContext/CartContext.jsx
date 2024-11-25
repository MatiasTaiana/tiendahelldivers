import React, { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
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
    const quantityNumber = Number(quantity);

    if (isNaN(quantityNumber) || quantityNumber <= 0) {
      toast.error("Please enter a valid quantity!", { autoClose: 2000 });
      return;
    }

    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        toast.info(`${product.name} quantity updated!`, { autoClose: 2000 }); 
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantityNumber }
            : item
        );
      } else {
        toast.success(`${product.name} added to cart!`, { autoClose: 2000 });
        return [...prevCart, { ...product, quantity: quantityNumber }];
      }
    });
  };

  const updateQuantity = (productId, newQuantity) => {
    const quantity = Number(newQuantity);

    if (isNaN(quantity) || quantity <= 0) {
      toast.error("Please enter a valid number for quantity!", { autoClose: 2000 });
      return; 
    }

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
    toast.info(`Product quantity updated!`, { autoClose: 2000 }); 
  };

  const removeFromCart = (productId) => {
    const product = cart.find((item) => item.id === productId);
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    
  };

  const clearCart = () => {
    setCart([]);
    toast.error("Cart cleared!", { autoClose: 2000 }); 
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
      const toastId = toast.success(
        <div>
          Order placed! Order ID: {docRef.id}
          <button
            onClick={() => {
              navigator.clipboard.writeText(docRef.id); // Copia el ID al portapapeles
              toast.info("Order ID copied to clipboard!", { autoClose: 2000 }); // Mensaje adicional
  
              // Activa el autocierre de 4 segundos para este toast
              toast.update(toastId, { autoClose: 4000 });
            }}
            style={{
              background: "none",
              border: "none",
              color: "#007BFF",
              marginLeft: "10px",
              cursor: "pointer",
            }}
          >
            <i className="fa-regular fa-copy"></i>
          </button>
        </div>,
        { 
          autoClose: false, // No se cierra automáticamente inicialmente
          closeOnClick: false, // No cerrar al hacer clic en el contenido
          draggable: false, // Desactiva arrastrar
          toastId: "order-toast", // ID único del toast
        }
      );
    } catch (error) {
      console.error("Error creating order: ", error);
      toast.error("Error placing order. Please try again.", { autoClose: 3000 }); 
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
