import React, { useContext, useState } from 'react';
import { CartContext } from '../CartContext/CartContext';
import { useNavigate } from 'react-router-dom';

const CartWidget = () => {
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const previewProducts = cart.slice(0, 3);

  const extraProductsCount = cart.length - 3;

  return (
    <div
      className='divCartWidget'
      onClick={() => navigate("/cart")}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div>({totalItems})</div>
      <a href="">
        <i className="fa-solid fa-cart-shopping fa-2x"></i>
      </a>

      {isHovered && (
        <div className="cart-preview">
          {previewProducts.map((item, index) => (
            <div key={index} className="cart-item-preview">
              <img src={item.image} alt={item.name} width="50" height="50" />
              <div>{item.name} x{item.quantity}</div>
            </div>
          ))}
          
          {extraProductsCount > 0 && (
            <div className="extra-products-text">
              and {extraProductsCount} more products
            </div>
          )}

          {cart.length > 3 && (
            <button
              onClick={() => navigate("/cart")}
              className="view-all-button"
            >
              View all
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default CartWidget;
