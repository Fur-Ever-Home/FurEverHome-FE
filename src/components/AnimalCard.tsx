import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import './AnimalModal.css';
import { useLanguage } from '../useLanguage';
import { translations } from '../translations';
import FavoriteBtn from './FavoriteBtn';

export interface AnimalModalDetails {
  id: string | number;
  name: string;
  species: string;
  breed?: string;
  gender: string;
  age: string;
  size: string;
  shelter: string;
  status: string;
  vaccinated: boolean;
  dewormed: boolean;
  sterilized: boolean;
  microchipped?: boolean;
  petFriendly?: boolean;
  childFriendly?: boolean;
  noAllergies?: boolean;
  temperament?: string;
  color?: string;
  images?: string[];
  imageUrl?: string;
  image?: string;
  description?: string;
}

interface AnimalModalProps {
  animal: AnimalModalDetails | null;
  isOpen: boolean;
  onClose: () => void;
  onScheduleVisit?: (animal: AnimalModalDetails) => void;
}

export const AnimalModal: React.FC<AnimalModalProps> = ({
  animal,
  isOpen,
  onClose,
  onScheduleVisit,
}) => {
  const { lang } = useLanguage();
  const t = translations[lang as keyof typeof translations] || translations.ro;

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Previne scroll-ul pe fundal când pop-up-ul este deschis pe mobil/desktop
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [isOpen]);

  // Resetează indexul imaginii la deschiderea unui nou modal
  useEffect(() => {
    if (isOpen) {
      setActiveImageIndex(0);
    }
  }, [isOpen, animal]);

  if (!isOpen || !animal) return null;

  const isLoggedIn = !!localStorage.getItem('token');

  // Colectare imagini galerie
  const galleryImages: string[] = [];
  if (animal.images && animal.images.length > 0) {
    galleryImages.push(...animal.images);
  } else if (animal.imageUrl || animal.image) {
    galleryImages.push(animal.imageUrl || animal.image || '');
  }

  const currentImage = galleryImages[activeImageIndex] || '';

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
  };

  const translateGender = (gender: string) => {
    if (!gender) return '';
    const lower = gender.toLowerCase().trim();
    if (lower === 'mascul' || lower === 'male') return t.male || 'Mascul';
    if (lower === 'femela' || lower === 'female') return t.female || 'Femelă';
    return gender;
  };

  const translateSize = (size: string) => {
    if (!size) return '';
    const lower = size.toLowerCase().trim();
    if (lower.includes('medie') || lower.includes('medium')) return t.medium || 'Medie';
    if (lower.includes('mare') || lower.includes('large')) return t.large || 'Mare';
    if (lower.includes('mic')) return t.small || 'Mică';
    return size;
  };

  const formatAge = (ageStr: string) => {
    if (!ageStr) return '';
    const numbers = ageStr.replace(/\D/g, '');
    if (numbers) {
      const num = parseInt(numbers, 10);
      const textAni = num === 1 ? (t.yearOld || 'an') : (t.yearsOld || 'ani');
      return `${num} ${textAni}`;
    }
    return ageStr;
  };

  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="animal-modal-container" 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Buton Închidere Adaptiv */}
        <button type="button" className="modal-close-btn" onClick={onClose} aria-label="Închide">
          ✕
        </button>

        <div className="animal-modal-body">
          {/* Galerie Foto */}
          <div className="modal-gallery-section">
            <div className="main-image-wrapper">
              {currentImage ? (
                <img src={currentImage} alt={animal.name} className="modal-main-image" />
              ) : (
                <div className="placeholder-avatar-large">🐶</div>
              )}

              {galleryImages.length > 1 && (
                <>
                  <button type="button" className="gallery-arrow arrow-left" onClick={handlePrevImage}>
                    ‹
                  </button>
                  <button type="button" className="gallery-arrow arrow-right" onClick={handleNextImage}>
                    ›
                  </button>
                </>
              )}

              <div className="modal-fav-wrapper">
                <FavoriteBtn animal={animal} isLoggedIn={isLoggedIn} />
              </div>
            </div>

            {/* Thumbnails Galerie */}
            {galleryImages.length > 1 && (
              <div className="gallery-thumbnails-row">
                {galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`thumbnail-btn ${idx === activeImageIndex ? 'active' : ''}`}
                    onClick={() => setActiveImageIndex(idx)}
                  >
                    <img src={img} alt={`${animal.name} ${idx + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Conținut & Detalii */}
          <div className="modal-info-section">
            <div className="modal-header-info">
              <span className="status-badge-modal">{animal.status || t.statusAvailable}</span>
              <h2 className="modal-animal-title">{animal.name}</h2>
              <p className="modal-animal-subtitle">
                {translateGender(animal.gender)} · {formatAge(animal.age)} · {t.size || 'Talie'} {translateSize(animal.size).toLowerCase()}
              </p>
              <p className="modal-animal-shelter">📍 {animal.shelter}</p>
            </div>

            {/* Detalii Cheie */}
            <div className="modal-details-card">
              <h4 className="card-section-title">{t.keyDetails || 'Detalii cheie'}</h4>
              <div className="details-grid">
                <div className="detail-item">
                  <span className="detail-label">{t.species || 'Specie'}:</span>
                  <span className="detail-value">{animal.species}</span>
                </div>
                {animal.breed && (
                  <div className="detail-item">
                    <span className="detail-label">{t.breed || 'Rasă'}:</span>
                    <span className="detail-value">{animal.breed}</span>
                  </div>
                )}
                <div className="detail-item">
                  <span className="detail-label">{t.temperament || 'Temperament'}:</span>
                  <span className="detail-value">{animal.temperament || (t.playful || 'Jucăuș')}</span>
                </div>
                {animal.color && (
                  <div className="detail-item">
                    <span className="detail-label">{t.color || 'Culoare'}:</span>
                    <span className="detail-value">{animal.color}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Sănătate & Compatibilitate */}
            <div className="modal-details-card">
              <h4 className="card-section-title">{t.healthAndCompatibility || 'Sănătate & Compatibilitate'}</h4>
              <div className="badges-list">
                <span className={`health-pill ${animal.vaccinated ? 'active' : ''}`}>
                  💉 {t.vaccinated || 'Vaccinat'}
                </span>
                <span className={`health-pill ${animal.dewormed ? 'active' : ''}`}>
                  💊 {t.dewormed || 'Deparazitat'}
                </span>
                <span className={`health-pill ${animal.sterilized ? 'active' : ''}`}>
                  ⚥ {t.sterilized || 'Sterilizat'}
                </span>
                {animal.microchipped && (
                  <span className="health-pill active">
                    🏷️ {t.microchipped || 'Microcipat'}
                  </span>
                )}
                {animal.petFriendly && (
                  <span className="health-pill active">
                    🐾 {t.petFriendly || 'Pet friendly'}
                  </span>
                )}
                {animal.childFriendly && (
                  <span className="health-pill active">
                    👶 {t.childFriendly || 'Child friendly'}
                  </span>
                )}
              </div>
            </div>

            {/* Acțiuni Modal */}
            <div className="modal-actions-footer">
              <button
                type="button"
                className="btn-schedule-visit"
                onClick={() => onScheduleVisit && onScheduleVisit(animal)}
              >
                📅 {t.scheduleVisit || 'Programează o vizită'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default AnimalModal;