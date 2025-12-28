import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { CartContext } from '../../contexts/CartContext';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          {/* Logo */}
          <Link to="/" className="logo">
            <h2>Mach Lagbe?</h2>
          </Link>

          {/* Navigation */}
          <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
            <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link to="/market" onClick={() => setIsMenuOpen(false)}>Fish Market</Link>
            
            {user ? (
              <>
                <Link to="/dashboard" onClick={() => setIsMenuOpen(false)}>Dashboard</Link>
                <span className="nav-username">Hi, {user.name ? user.name.split(' ')[0] : 'User'}</span>
                <button onClick={handleLogout} className="btn btn-outline">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>Login</Link>
                <Link to="/register" onClick={() => setIsMenuOpen(false)} className="btn btn-primary">Sign Up</Link>
              </>
            )}
            
            {/* Cart Icon */}
            <Link to="/cart" className="cart-icon" onClick={() => setIsMenuOpen(false)}>
              <span>🛒</span>
              {cartItemCount > 0 && <span className="cart-count">{cartItemCount}</span>}
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="mobile-menu-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;