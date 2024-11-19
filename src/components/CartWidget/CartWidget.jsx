import React, { useContext }  from 'react';
import { CartContext } from '../CartContext/CartContext';
import { useNavigate } from 'react-router-dom';

const CartWidget = () => {
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);


  return (
    <div className='divCartWidget' onClick={() => navigate("/cart")}>
      ({totalItems})
      <a href=""><i className="fa-solid fa-cart-shopping fa-2x"></i></a>
    </div>
  );
};

export default CartWidget;
