import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>Fresh Fish from Bangladeshi Waters</h1>
            <p>Connect directly with fisheries and get the freshest catch delivered to your doorstep</p>
            <div className="hero-buttons">
              <Link to="/market" className="btn btn-primary">Buy Fish</Link>
              <Link to="/register" className="btn btn-outline">Sell Fish</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2>Why Choose Mach Lagbe?</h2>
          <div className="grid grid-3">
            <div className="feature-card">
              <div className="feature-icon">🎣</div>
              <h3>Direct from Fishermen</h3>
              <p>Get fish directly from local fishermen, ensuring freshness and fair prices</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🚚</div>
              <h3>Fast Delivery</h3>
              <p>Quick and reliable delivery to maintain fish freshness</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💰</div>
              <h3>Best Prices</h3>
              <p>Competitive prices by eliminating middlemen</p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Fish Section */}
      <section className="popular-fish">
        <div className="container">
          <h2>Popular Fish Varieties</h2>
          <div className="grid grid-4">
            <div className="fish-type">
              <div className="fish-image">🐟</div>
              <h4>Ilish</h4>
            </div>
            <div className="fish-type">
              <div className="fish-image">🐠</div>
              <h4>Rui</h4>
            </div>
            <div className="fish-type">
              <div className="fish-image">🦐</div>
              <h4>Chingri</h4>
            </div>
            <div className="fish-type">
              <div className="fish-image">🐡</div>
              <h4>Pangash</h4>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;