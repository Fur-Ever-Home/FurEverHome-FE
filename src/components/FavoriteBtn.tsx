import React, { useState } from 'react';
import FavoriteAuthModal from './FavoriteAuthModal';
import './FavoriteBtn.css';

// ❌ VECHI:
// interface Animal {
//   id: string | number;
//   name: string;
//   gender?: string;
//   sex?: string;
// }

// ✅ NOU:
interface Animal {
  id?: string | number;
  name: string;
  gender?: string;
  sex?: string;
}

interface FavoriteBtnProps {
  animal: Animal;
  isLoggedIn: boolean; // Transmis din App, AuthContext sau localStorage
}

export const FavoriteBtn: React.FC<FavoriteBtnProps> = ({ animal, isLoggedIn }) => {
  // Starea pentru afișarea pop-up-ului de autentificare
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Starea locală a butonului (true = adăugat la favorite, false = neadăugat)
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoriteClick = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Oprește deschiderea altor modaluri (ex: fișa animalului)

    if (!isLoggedIn) {
      // =========================================================================
      // ❌ CAZUL 1: UTILIZATOR NEAUTENTIFICAT (isLoggedIn === false)
      // =========================================================================
      // Deschidem pop-up-ul FavoriteAuthModal care îl redirecționează la /login
      setShowAuthModal(true);
      return;
    }

    // =========================================================================
    // ✅ CAZUL 2: UTILIZATOR AUTENTIFICAT (isLoggedIn === true)
    // =========================================================================
    // 1. Schimbăm starea vizuală a inimioarei (plină / goală)
    const nextFavoriteState = !isFavorite;
    setIsFavorite(nextFavoriteState);

    // 2. Sincronizăm cu backend-ul / localStorage
    try {
      await fetch(`http://localhost:8080/api/favorites/${animal.id}`, {
        method: nextFavoriteState ? 'POST' : 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      console.log(`${animal.name} a fost ${nextFavoriteState ? 'adăugat la' : 'scos de la'} favorite.`);
    } catch (error) {
      console.error('Eroare la actualizarea favoritului:', error);
      // Revenim la starea anterioară în caz de eroare de rețea
      setIsFavorite(!nextFavoriteState);
    }
  };

  return (
    <>
      {/* Butonul Inimioară */}
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

      {/* Pop-up-ul afișat automat doar când showAuthModal devine true */}
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