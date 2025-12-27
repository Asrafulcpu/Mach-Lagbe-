import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner = ({ size = 'medium' }) => {
  const sizeClass = `spinner-${size}`;
  
  return (
    <div className="loading-spinner-container">
      <div className={`spinner ${sizeClass}`}></div>
    </div>
  );
};

export default LoadingSpinner;

