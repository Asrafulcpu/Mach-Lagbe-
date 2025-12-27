import React, { useState, useEffect } from 'react';
import { useCart } from '../contexts/CartContext';
import { getFish } from '../services/fishService';
import LoadingSpinner from '../components/common/LoadingSpinner';
import './FishMarket.css';

const FishMarket = () => {
  const [fishes, setFishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchFishes = async () => {
      try {
        setLoading(true);
        const response = await getFish();
        if (response.success && response.data) {
          // Normalize data: ensure _id exists and map imageUrl to image
          const normalizedFishes = response.data.map(fish => ({
            ...fish,
            _id: fish._id || fish.id,
            id: fish._id || fish.id, // Support both for compatibility
            image: fish.imageUrl || fish.image || '', // Support both imageUrl and image
            imageUrl: fish.imageUrl || fish.image || ''
          }));
          setFishes(normalizedFishes);
        } else {
          setError('Failed to load fish');
        }
      } catch (err) {
        console.error('Error fetching fish:', err);
        setError(err.error || 'Failed to load fish. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchFishes();
  }, []);

  const handleAddToCart = (fish) => {
    // Ensure fish has _id for cart operations
    const fishWithId = {
      ...fish,
      _id: fish._id || fish.id
    };
    addToCart(fishWithId, 1);
    alert(`${fish.name} added to cart!`);
  };

  if (loading) {
    return (
      <div className="fish-market" style={{ padding: '40px 20px', textAlign: 'center' }}>
        <LoadingSpinner />
        <p>Loading fresh fish...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fish-market" style={{ padding: '40px 20px', textAlign: 'center' }}>
        <div style={{ color: 'red', marginBottom: '20px' }}>
          ⚠️ {error}
        </div>
        <button 
          onClick={() => window.location.reload()} 
          className="btn btn-primary"
        >
          Retry
        </button>
      </div>
    );
  }

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
          {fishes.length === 0 ? (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px' }}>
              <p>No fish available at the moment. Please check back later.</p>
            </div>
          ) : (
            fishes.map(fish => (
            <div key={fish._id || fish.id} className="fish-card" style={{ 
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
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default FishMarket;
