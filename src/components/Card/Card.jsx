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
      <img className="card-image" src={image} alt={name} onClick={handleClick} />
      <h3 onClick={handleClick}>{name}</h3>
      <p onClick={handleClick}>Price: {price} SuperCredits</p>
      <button onClick={handleAddToCart}>Add to cart</button>
    </div>
  );
};

export default Card;
