import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-column">
            <h3>Mach Lagbe?</h3>
            <p>Fresh fish from Bangladeshi waters directly to your kitchen. Supporting local fishermen and providing quality seafood.</p>
          </div>
          <div className="footer-column">
            <h3>Quick Links</h3>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/market">Fish Market</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>Contact Info</h3>
            <ul>
              <li>📞 +880 1234-567890</li>
              <li>📧 info@machlagbe.com</li>
              <li>📍 Dhaka, Bangladesh</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 Mach Lagbe?. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;