import React, { useState, useRef, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { CartContext } from '../../contexts/CartContext';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout, updateAvatar } = useAuth();
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  const fileInputRef = useRef(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // data-URL fallback SVG used when user's avatar is missing or fails to load
  const DEFAULT_AVATAR = 'data:image/svg+xml;utf8,' + encodeURIComponent(`
    <svg xmlns='http://www.w3.org/2000/svg' width='36' height='36' viewBox='0 0 24 24'>
      <circle cx='12' cy='12' r='12' fill='%230ea5a2'/>
      <path d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-3 0-6 1.5-6 4.5V21h12v-2.5C18 15.5 15 14 12 14z' fill='%23fff'/>
    </svg>
  `);

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
                {user?.role === 'admin' ? (
                  <Link to="/admin" onClick={() => setIsMenuOpen(false)}>Admin</Link>
                ) : null}
                <button className="avatar-btn" onClick={() => setIsDropdownOpen(!isDropdownOpen)} aria-haspopup="true">
                  {user?.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="avatar-img"
                      onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = DEFAULT_AVATAR; }}
                    />
                  ) : (
                    <div className="avatar-fallback">{(user?.name || 'U').split(' ').map(n=>n[0]).slice(0,2).join('').toUpperCase()}</div>
                  )}
                </button>

                {isDropdownOpen && (
                  <div className="profile-dropdown">
                    <div className="profile-info">
                      {user?.avatar ? (
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="avatar-img-lg"
                          onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = DEFAULT_AVATAR; }}
                        />
                      ) : (
                        <div className="avatar-fallback-lg">{(user?.name || 'U').split(' ').map(n=>n[0]).slice(0,2).join('').toUpperCase()}</div>
                      )}
                      <div className="profile-text">
                        <div className="profile-name">{user?.name}</div>
                        <div className="profile-email">{user?.email}</div>
                      </div>
                    </div>
                    <Link to="/profile" className="dropdown-item" onClick={() => setIsDropdownOpen(false)}>Profile</Link>
                    {user?.role === 'admin' ? (
                      <Link to="/admin" className="dropdown-item" onClick={() => setIsDropdownOpen(false)}>Admin Panel</Link>
                    ) : null}
                    <button className="dropdown-item" onClick={() => { fileInputRef.current?.click(); }}>Upload Avatar</button>
                    <button className="dropdown-item" onClick={() => { handleLogout(); setIsDropdownOpen(false); }}>Logout</button>
                  </div>
                )}
                <input ref={fileInputRef} type="file" accept="image/*" className="sr-only" onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    await updateAvatar(file);
                    setIsDropdownOpen(false);
                  }
                }} />
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