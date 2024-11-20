import React, { useContext } from "react";
import { CartContext } from "../CartContext/CartContext";
import { toast } from "react-toastify"; // Importar Toastify
import Swal from "sweetalert2"; // Importar SweetAlert2

const Cart = () => {
  const { cart, removeFromCart, getTotalPrice, clearCart, updateQuantity, createOrder } = useContext(CartContext);

  const handleCompletePurchase = async () => {
    if (cart.length === 0) {
      toast.info("Your cart is empty!", { autoClose: 2000 }); // Toastify
      return;
    }

    const { value: userDetails } = await Swal.fire({
      title: "Complete your purchase",
      html: `
        <label for="name">Name:</label>
        <input id="name" type="text" class="swal2-input" placeholder="Enter your name" required />
        <label for="email">Email:</label>
        <input id="email" type="email" class="swal2-input" placeholder="Enter your email" required />
        <label for="address">Address:</label>
        <input id="address" type="text" class="swal2-input" placeholder="Enter your address" required />
      `,
      focusConfirm: false,
      preConfirm: () => {
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const address = document.getElementById("address").value.trim();

        if (!name || !email || !address) {
          Swal.showValidationMessage("All fields are required!");
          return false;
        }
        return { name, email, address };
      },
    });

    if (userDetails) {
      createOrder(userDetails); // Crear la orden
    }
  };

  const handleChangeQuantity = (id, quantity) => {
    if (quantity < 1) {
      toast.error("Quantity must be at least 1", { autoClose: 2000 });
      return;
    }
    updateQuantity(id, quantity);
  };

  if (cart.length === 0) {
    return <p className="emptyCart">Your cart is empty!</p>;
  }

  return (
    <div className="containerCart">
      <h2>Your Cart</h2>
      <ul>
        {cart.map((product) => (
          <li key={product.id}>
            <div>
              <img src={product.image} alt={product.name} width={50} />
              <p>{product.name}</p>
              <p>{product.description}</p>
              <p>Price: {product.price} Super Credits</p>
              <p>Total: {product.price * product.quantity} Super Credits</p>
              <input
                type="number"
                value={product.quantity}
                min="1"
                onChange={(e) => handleChangeQuantity(product.id, e.target.value)}
                style={{ width: "60px" }}
              />
              <p>Quantity: {product.quantity}</p>
              <button
                onClick={() => {
                  removeFromCart(product.id);
                  toast.warn(`${product.name} removed from cart!`, { autoClose: 2000 }); // Toastify
                }}
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
      <p>Total: {getTotalPrice()} Super Credits</p>
      <button
        onClick={() => {
          clearCart();
        }}
      >
        Empty cart
      </button>
      <button onClick={handleCompletePurchase}>Place Order</button>
    </div>
  );
};

export default Cart;
