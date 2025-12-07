import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import './FishMarket.css';

const FishMarket = () => {
  // Mock data with image paths
  const [fishes] = useState([
    { 
      id: 1, 
      name: 'Hilsa (Ilish)', 
      pricePerKg: 1200, 
      category: 'saltwater', 
      stock: 50,
      description: 'The national fish of Bangladesh, known for its unique taste',
      image: '/image/ilish.png'
    },
    { 
      id: 2, 
      name: 'Rohu', 
      pricePerKg: 300, 
      category: 'freshwater', 
      stock: 100,
      description: 'Freshwater carp, very popular in Bengali cuisine',
      image: '/image/rui.png'
    },
    { 
      id: 3, 
      name: 'Katla', 
      pricePerKg: 350, 
      category: 'freshwater', 
      stock: 80,
      description: 'Indian carp, known for its large size and tasty meat',
      image: '/image/katla.jpg'
    },
    { 
      id: 4, 
      name: 'Pangas', 
      pricePerKg: 250, 
      category: 'freshwater', 
      stock: 120,
      description: 'Catfish variety, affordable and widely available',
      image: '/image/pangash.png'
    },
    { 
      id: 5, 
      name: 'Tilapia', 
      pricePerKg: 280, 
      category: 'freshwater', 
      stock: 90,
      description: 'Mild-tasting freshwater fish, easy to cook',
      image: '/image/tilapia.webp'
    },
    { 
      id: 6, 
      name: 'Shrimp (Chingri)', 
      pricePerKg: 800, 
      category: 'shellfish', 
      stock: 40,
      description: 'Fresh sea shrimp, perfect for curries',
      image: '/image/chingri.png'
    }
  ]);

  const { addToCart } = useCart();

  const handleAddToCart = (fish) => {
    addToCart(fish, 1);
    alert(`${fish.name} added to cart!`);
  };

  return (
    <div className="fish-market" style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <div className="container">
        <div className="market-header" style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h2 style={{ fontSize: '2.2rem' }}>Fresh Fish Market</h2>
          <p className="subtitle" style={{ opacity: 0.8 }}>Direct from fishermen to your kitchen</p>
          <div className="market-stats" style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '10px', flexWrap: 'wrap' }}>
            <span>🛒 {fishes.length} types of fresh fish available</span>
            <span>🐟 Fresh catch daily</span>
            <span>🚚 Free delivery over ৳1000</span>
          </div>
        </div>

        <div className="fish-grid" style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', 
          gap: '20px' 
        }}>
          {fishes.map(fish => (
            <div key={fish.id} className="fish-card" style={{ 
              background: 'white', 
              borderRadius: '15px', 
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)', 
              overflow: 'hidden', 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              padding: '15px' 
            }}>
              {/* Fish Image */}
              {fish.image ? (
                <img 
                  src={fish.image} 
                  alt={fish.name} 
                  style={{
                    width: '120px',
                    height: '120px',
                    objectFit: 'cover',
                    borderRadius: '10px',
                    marginBottom: '10px'
                  }}
                />
              ) : (
                <div style={{ fontSize: '50px', marginBottom: '10px' }}>
                  {fish.category === 'saltwater' ? '🐟' : fish.category === 'freshwater' ? '🐠' : '🦐'}
                </div>
              )}

              {/* Fish Info */}
              <div className="fish-info" style={{ textAlign: 'center' }}>
                <h3 style={{ marginBottom: '5px' }}>{fish.name}</h3>
                <p className="fish-category" style={{ fontStyle: 'italic', opacity: 0.7 }}>{fish.category}</p>
                <p className="fish-description" style={{ fontSize: '0.9rem', margin: '10px 0' }}>{fish.description}</p>
                <div className="fish-price" style={{ marginBottom: '10px' }}>
                  <span className="price" style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>৳{fish.pricePerKg}</span>
                  <span className="unit" style={{ marginLeft: '5px', fontSize: '0.9rem' }}>per kg</span>
                </div>
                <div className="fish-stock" style={{ marginBottom: '10px' }}>
                  <span className="in-stock" style={{ color: 'green' }}>✅ In stock ({fish.stock} kg)</span>
                </div>
                <button 
                  onClick={() => handleAddToCart(fish)}
                  className="btn btn-primary add-to-cart-btn"
                  style={{
                    background: '#005eff',
                    color: 'white',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '0.95rem'
                  }}
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
