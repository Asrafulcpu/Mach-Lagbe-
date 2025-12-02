
import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import './FishMarket.css';

const FishMarket = () => {
  // Mock data - no API calls needed
  const [fishes] = useState([
    { 
      id: 1, 
      name: 'Hilsa (Ilish)', 
      pricePerKg: 1200, 
      category: 'saltwater', 
      stock: 50,
      description: 'The national fish of Bangladesh, known for its unique taste'
    },
    { 
      id: 2, 
      name: 'Rohu', 
      pricePerKg: 300, 
      category: 'freshwater', 
      stock: 100,
      description: 'Freshwater carp, very popular in Bengali cuisine'
    },
    { 
      id: 3, 
      name: 'Katla', 
      pricePerKg: 350, 
      category: 'freshwater', 
      stock: 80,
      description: 'Indian carp, known for its large size and tasty meat'
    },
    { 
      id: 4, 
      name: 'Pangas', 
      pricePerKg: 250, 
      category: 'freshwater', 
      stock: 120,
      description: 'Catfish variety, affordable and widely available'
    },
    { 
      id: 5, 
      name: 'Tilapia', 
      pricePerKg: 280, 
      category: 'freshwater', 
      stock: 90,
      description: 'Mild-tasting freshwater fish, easy to cook'
    },
    { 
      id: 6, 
      name: 'Shrimp (Chingri)', 
      pricePerKg: 800, 
      category: 'shellfish', 
      stock: 40,
      description: 'Fresh sea shrimp, perfect for curries'
    }
  ]);
  
  const { addToCart } = useCart();

  const handleAddToCart = (fish) => {
    addToCart(fish, 1);
    alert(`${fish.name} added to cart!`);
  };

  return (
    <div className="fish-market">
      <div className="container">
        <div className="market-header">
          <h2>Fresh Fish Market</h2>
          <p className="subtitle">Direct from fishermen to your kitchen</p>
          <div className="market-stats">
            <span>🛒 {fishes.length} types of fresh fish available</span>
            <span>🐟 Fresh catch daily</span>
            <span>🚚 Free delivery over ৳1000</span>
          </div>
        </div>

        <div className="fish-grid">
          {fishes.map(fish => (
            <div key={fish.id} className="fish-card">
              <div className="fish-image">
                <div className="fish-emoji">
                  {fish.category === 'saltwater' ? '🐟' : 
                   fish.category === 'freshwater' ? '🐠' : '🦐'}
                </div>
              </div>
              <div className="fish-info">
                <h3>{fish.name}</h3>
                <p className="fish-category">{fish.category}</p>
                <p className="fish-description">{fish.description}</p>
                <div className="fish-price">
                  <span className="price">৳{fish.pricePerKg}</span>
                  <span className="unit">per kg</span>
                </div>
                <div className="fish-stock">
                  <span className="in-stock">✅ In stock ({fish.stock} kg)</span>
                </div>
                <button 
                  onClick={() => handleAddToCart(fish)}
                  className="btn btn-primary add-to-cart-btn"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FishMarket;
