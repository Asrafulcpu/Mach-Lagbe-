import React from 'react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Cart.css';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    // Add checkout logic here
    alert('Order placed successfully!');
    clearCart();
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <div className="container">
          <h2>Your Cart</h2>
          <div className="empty-cart">
            <p>Your cart is empty</p>
            <button onClick={() => navigate('/market')} className="btn btn-primary">
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <h2>Your Shopping Cart</h2>
        <div className="cart-content">
          <div className="cart-items">
            {cartItems.map(item => (
              <div key={item._id} className="cart-item">
                <div className="item-info">
                  <h4>{item.name}</h4>
                  <p>৳{item.pricePerKg} per kg</p>
                </div>
                <div className="quantity-controls">
                  <button 
                    onClick={() => updateQuantity(item._id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span>{item.quantity} kg</span>
                  <button onClick={() => updateQuantity(item._id, item.quantity + 1)}>
                    +
                  </button>
                </div>
                <div className="item-total">
                  ৳{(item.pricePerKg * item.quantity).toFixed(2)}
                </div>
                <button 
                  onClick={() => removeFromCart(item._id)}
                  className="btn-remove"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          
          <div className="cart-summary">
            <h3>Order Summary</h3>
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>৳{getCartTotal().toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Delivery:</span>
              <span>৳50.00</span>
            </div>
            <div className="summary-row total">
              <span>Total:</span>
              <span>৳{(getCartTotal() + 50).toFixed(2)}</span>
            </div>
            <button onClick={handleCheckout} className="btn btn-primary checkout-btn">
              Proceed to Checkout
            </button>
            <button onClick={clearCart} className="btn btn-outline">
              Clear Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;