import React, { useContext, useState } from 'react';
import { CartContext } from '../CartContext/CartContext';

const Cart = () => {
  const { cart, removeFromCart, getTotalPrice, clearCart, createOrder } = useContext(CartContext);
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    address: '',
  });

  const handleChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    // Llamar a la función createOrder con los detalles del usuario
    createOrder(userDetails);
  };

  if (cart.length === 0) {
    return <p>Your cart is empty!</p>;
  }

  return (
    <div>
      <h2>Your Cart</h2>
      <ul>
        {cart.map((product) => (
          <li key={product.id}>
            <div>
              <img src={product.image} alt={product.name} width={50} />
              <p>{product.name}</p>
              <p>{product.description}</p>
              <p>Price: {product.price} Super Credits</p>
              <p>Quantity: {product.quantity}</p>
              <button onClick={() => removeFromCart(product.id)}>Remove</button>
            </div>
          </li>
        ))}
      </ul>
      <p>Total: {getTotalPrice()} Super Credits</p>
      <button onClick={clearCart}>Empty cart</button>

      <h3>Complete your purchase</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={userDetails.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={userDetails.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={userDetails.address}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Place Order</button>
      </form>
    </div>
  );
};

export default Cart;
