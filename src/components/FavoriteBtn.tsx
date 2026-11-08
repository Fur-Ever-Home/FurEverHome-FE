import React, { useState } from 'react';

interface FavoriteBtnProps {
  petId?: string | number;
}

export const FavoriteBtn: React.FC<FavoriteBtnProps> = ({ petId }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation(); // Previne deschiderea paginii de detalii când apeși pe inimă
    e.preventDefault();
    setIsFavorite((prev) => !prev);
  };

  return (
    <button
      onClick={toggleFavorite}
      className={`favorite-btn ${isFavorite ? 'active' : ''}`}
      aria-label="Adaugă la favorite"
      style={{
        background: 'rgba(255, 255, 255, 0.9)',
        border: 'none',
        borderRadius: '50%',
        width: '36px',
        height: '36px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        fontSize: '18px',
        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.15)',
        transition: 'transform 0.15s ease',
      }}
    >
      {isFavorite ? '❤️' : '🤍'}
    </button>
  );
};

export default FavoriteBtn;