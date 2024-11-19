import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../CartContext/CartContext";

const Card = ({ id, name, description, image, price }) => {
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const product = { id, name, description, image, price };

  const handleClick = () => {
    navigate(`/item/${id}`);
  };

  const handleAddToCart = () => {
    addToCart(product);
    console.log(`${name} added to cart!`);
  };

  return (
    <div className="card">
      <img src={image} alt={name} onClick={handleClick} />
      <h3>{name}</h3>
      <p>Price: {price} SuperCredits</p>
      <button onClick={handleAddToCart}>Add to cart</button>
    </div>
  );
};

export default Card;
