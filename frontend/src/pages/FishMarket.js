import React from 'react';
import { useCart } from '../contexts/CartContext';

const fishData = [
  { _id: 1, name: 'Hilsa (Ilish)', pricePerKg: 1200, image: '🐟' },
  { _id: 2, name: 'Rohu', pricePerKg: 300, image: '🐠' },
  { _id: 3, name: 'Katla', pricePerKg: 350, image: '🐡' },
];

export default function FishMarket() {
  const { addToCart } = useCart();

  return (
    <div className="fish-market">
      <h2>Fresh Fish Market</h2>
      <div className="fish-grid">
        {fishData.map(fish => (
          <div key={fish._id} className="fish-card">
            <div className="fish-image">{fish.image}</div>
            <h3>{fish.name}</h3>
            <p>৳{fish.pricePerKg}/kg</p>
            <button onClick={() => addToCart(fish)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}