import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { db } from '../../db/firebase';
import { collection, addDoc } from 'firebase/firestore';


const Offer = () => {
  const [offerProduct, setOfferProduct] = useState(null);
  const [timeLeft, setTimeLeft] = useState(86400);

  useEffect(() => {
    const products = JSON.parse(localStorage.getItem('products')) || [];

    if (products.length > 0) {
      const savedOffer = localStorage.getItem('currentOffer');
      const savedTime = localStorage.getItem('timeLeft');

      if (savedOffer && savedTime && savedTime > 0) {
        setOfferProduct(JSON.parse(savedOffer));
        setTimeLeft(parseInt(savedTime));
      } else {
        generateNewOffer(products);
      }
    } else {
      console.error('No products available for the offer.');
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev > 0) {
          localStorage.setItem('timeLeft', prev - 1);
          return prev - 1;
        } else {
          clearInterval(interval);
          generateNewOffer(JSON.parse(localStorage.getItem('products')));
          return 86400; 
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const generateNewOffer = (products) => {
    const randomProduct = products[Math.floor(Math.random() * products.length)];
    setOfferProduct(randomProduct);
    localStorage.setItem('currentOffer', JSON.stringify(randomProduct));
    localStorage.setItem('timeLeft', 86400);
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePurchase = async () => {
    if (!offerProduct) return;

    const { value: userDetails } = await Swal.fire({
      title: 'Complete your purchase',
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
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const address = document.getElementById('address').value.trim();

        if (!name || !email || !address) {
          Swal.showValidationMessage('All fields are required!');
          return false;
        }
        return { name, email, address };
      },
    });

    if (userDetails) {
      try {
        const discountedPrice = (offerProduct.price * 0.65).toFixed(2);

        const order = {
          items: [
            {
              ...offerProduct,
              quantity: 1,
              discountedPrice,
            },
          ],
          total: discountedPrice,
          user: userDetails,
          date: new Date(),
        };

        const docRef = await addDoc(collection(db, 'orders'), order);

        const toastId = toast.success(
            <div>
              Order placed! Order ID: {docRef.id}
              <button
                onClick={() => {
                  navigator.clipboard.writeText(docRef.id);
                  toast.info("Order ID copied to clipboard!", { autoClose: 2000 });
      
                 
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
              autoClose: false, 
              closeOnClick: false, 
              draggable: false, 
              toastId: "order-toast", 
            }
          );
      } catch (error) {
        console.error('Error placing order:', error);
        toast.error('Error placing order. Please try again.', { autoClose: 3000 });
      }
    }
  };

  if (!offerProduct) {
    return <div>Loading offer...</div>;
  }

  return (
    <div className="offer">
      <h2>Special Offer!</h2>
      <div className="offer-card">
        <img src={offerProduct.image} alt={offerProduct.name} />
        <h3>{offerProduct.name}</h3>
        <p>
          <span className="original-price">${offerProduct.price.toFixed(2)}</span>{' '}
          <span className="discounted-price">
            ${(offerProduct.price * 0.65).toFixed(2)}
          </span>
        </p>
        <p className="time-left">Time left: {formatTime(timeLeft)}</p>
        <button className="buy-now-button" onClick={handlePurchase}>
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default Offer;
