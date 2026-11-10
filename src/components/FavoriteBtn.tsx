import React, { useState } from 'react';

interface FavoriteBtnProps {
  petId?: string | number;
}

export const FavoriteBtn: React.FC<FavoriteBtnProps> = ({ petId }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    console.log('Button clicked! State update requested.');
    setIsFavorite((prev) => !prev);
  };
  
  return (
    <button
      type="button"
      onClick={toggleFavorite}
      className={`favorite-btn ${isFavorite ? 'active' : ''}`}
      aria-label="Adaugă la favorite"
      style={{
        background: 'rgba(255, 255, 255, 0.95)',
        border: 'none',
        borderRadius: '50%',
        width: '36px',
        height: '36px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.15)',
        transition: 'transform 0.15s ease',
        zIndex: 10,
      }}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill={isFavorite ? '#e63946' : 'none'}
        stroke={isFavorite ? '#e63946' : '#666666'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    </button>
  );
};

export default FavoriteBtn;