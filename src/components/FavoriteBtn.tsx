import React, { useState } from 'react';
import FavoriteAuthModal from './FavoriteAuthModal';
import { API_BASE_URL } from '../config';
import './FavoriteBtn.css';

interface Animal {
  id?: string | number;
  name: string;
  gender?: string;
  sex?: string;
}

interface FavoriteBtnProps {
  animal: Animal;
  isLoggedIn: boolean;
}

export const FavoriteBtn: React.FC<FavoriteBtnProps> = ({ animal, isLoggedIn }) => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoriteClick = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Oprește deschiderea modalului cu fișa animalului

    if (!isLoggedIn) {
      // Cazul 1: Utilizator neautentificat -> deschidem pop-up-ul
      setShowAuthModal(true);
      return;
    }

    // Cazul 2: Utilizator autentificat -> schimbăm starea și apelăm backend-ul
    const nextFavoriteState = !isFavorite;
    setIsFavorite(nextFavoriteState);

    try {
      if (animal.id) {
        await fetch(`${API_BASE_URL}/api/favorites/${animal.id}`, {
          method: nextFavoriteState ? 'POST' : 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
      }
    } catch (error) {
      console.error('Eroare la actualizarea favoritului:', error);
      setIsFavorite(!nextFavoriteState); // Revenire în caz de eroare
    }
  };

  return (
    <>
      <button
        type="button"
        className={`fav-card-btn ${isFavorite ? 'is-active' : ''}`}
        onClick={handleFavoriteClick}
        aria-label="Adaugă la favorite"
      >
        <svg
          viewBox="0 0 24 24"
          width="22"
          height="22"
          fill={isFavorite ? '#e74c3c' : 'none'}
          stroke={isFavorite ? '#e74c3c' : '#3f2c20'}
          strokeWidth="2"
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      </button>

      <FavoriteAuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        animalName={animal.name}
        gender={animal.gender || animal.sex}
      />
    </>
  );
};

export default FavoriteBtn;