import React from 'react';
import { useNavigate } from 'react-router-dom';

const Card = ({ id, name, description, image, price }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/item/${id}`);
  };

  return (
    <div className="card" onClick={handleClick}>
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <p>Price: {price} SuperCredits</p>
    </div>
  );
};

export default Card;
