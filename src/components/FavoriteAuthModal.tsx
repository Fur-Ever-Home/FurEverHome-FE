import React from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../useLanguage';
import { translations } from '../translations';
import './FavoriteAuthModal.css';

interface FavoriteAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  animalName: string;
  gender?: string;
}

export const FavoriteAuthModal: React.FC<FavoriteAuthModalProps> = ({
  isOpen,
  onClose,
  animalName,
  gender,
}) => {
  const navigate = useNavigate();
  const { lang } = useLanguage();
  const t = translations[lang];

  if (!isOpen) return null;

  // Calculăm corect acordul gramatical pentru RO (masculin/feminin)
  const isFemale = gender && (gender.toLowerCase().includes('fem') || gender.toLowerCase() === 'f');
  const template = isFemale ? t.favModalTitleFemale : t.favModalTitleMale;
  const message = template
    ? template.replace('{name}', animalName)
    : `Pentru a adăuga pe ${animalName} la favorite trebuie să fii logat`;

  const handleLoginRedirect = () => {
    onClose();
    navigate('/login');
  };

  // createPortal atașează modalul direct pe document.body
  return createPortal(
    <div className="fav-auth-overlay" onClick={onClose}>
      <div className="fav-auth-modal" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="fav-auth-close" onClick={onClose} aria-label="Închide">
          ✕
        </button>
        <div className="fav-auth-icon-wrapper">
          <svg className="fav-auth-heart-icon" viewBox="0 0 24 24" width="28" height="28" fill="#3F2C20">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
        <p className="fav-auth-message">{message}</p>
        <button type="button" className="fav-auth-btn" onClick={handleLoginRedirect}>
          {t.favModalLoginBtn}
        </button>
      </div>
    </div>,
    document.body
  );
};

export default FavoriteAuthModal;