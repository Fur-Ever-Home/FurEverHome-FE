import React from 'react';
import './AnimalCard.css';
import { useLanguage } from '../useLanguage';
import { translations } from '../translations';
import FavoriteBtn from './FavoriteBtn';

interface Animal {
  id?: number | string;
  name: string;
  species: string;
  status: string;
  gender: string;
  age: string;
  size: string;
  shelter: string;
  vaccinated: boolean;
  dewormed: boolean;
  sterilized: boolean;
  imageUrl?: string;
  image?: string;
  isDistanceAdoption?: boolean;
  needType?: string;
  fundingPercent?: number;
}

interface AnimalCardProps {
  animal: Animal;
  isDistanceMode?: boolean;
}

export const AnimalCard: React.FC<AnimalCardProps> = ({ animal, isDistanceMode = false }) => {
  const { lang } = useLanguage();
  const t = translations[lang];

  const isLoggedIn = !!localStorage.getItem('token');
  const imgSrc = animal.imageUrl || animal.image; 
  const isDistance = isDistanceMode || animal.isDistanceAdoption;
  const fundingPercent = animal.fundingPercent ?? 72;
  const needType = animal.needType || 'Cazare permanentă';

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
    
    if (lower === 'medie' || lower === 'medium') return t.medium || 'Medie';
    if (lower === 'mare' || lower === 'large') return t.large || 'Mare';
    if (lower === 'mic' || lower === 'small2') return t.small2 || 'Mic';
    if (lower === 'mica' || lower === 'mică' || lower === 'small') return t.small || 'Mică';
    
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

  const translateStatus = (status: string) => {
    if (!status) return '';
    const lower = status.toLowerCase().trim();
    if (lower === 'disponibil' || lower === 'available') return t.statusAvailable || 'Disponibil';
    return status;
  };

  return (
    <div className={`animal-card ${isDistance ? 'card-distance-mode' : ''}`}>
      <div className="card-top">
        {isDistance ? (
          <span className="status-badge senior-badge">Senior</span>
        ) : (
          <span className="status-badge">{translateStatus(animal.status)}</span>
        )}
        
        <FavoriteBtn animal={animal} isLoggedIn={isLoggedIn} />
      </div>

      <div className="card-image-container">
        {imgSrc ? (
          <img src={imgSrc} alt={animal.name} className="animal-real-image" />
        ) : (
          <div className="placeholder-avatar">🐶</div>
        )}
      </div>

      {!isDistance && (
        <div className="medical-icons-row">
          <span className={`icon-badge ${animal.vaccinated ? 'active' : ''}`} title={t.legendVaccinated}>💉</span>
          <span className={`icon-badge ${animal.dewormed ? 'active' : ''}`} title={t.legendDewormed}>💊</span>
          <span className={`icon-badge ${animal.sterilized ? 'active' : ''}`} title={t.legendSterilized}>⚥</span>
        </div>
      )}

      <div className="card-content">
        <h3 className="animal-name">{animal.name}</h3>
        
        <p className="animal-info">
          {translateGender(animal.gender)} · {formatAge(animal.age)} · {translateSize(animal.size)}
        </p>
        
        <p className="animal-shelter">{animal.shelter}</p>

        {isDistance ? (
          <div className="distance-card-body">
            <span className="need-type-pill">{needType}</span>
            <div className="funding-bar-container">
              <div className="funding-bar-track">
                <div 
                  className="funding-bar-fill" 
                  style={{ width: `${Math.min(fundingPercent, 100)}%` }} 
                />
              </div>
              <span className="funding-text">{fundingPercent}% din necesarul lunar acoperit</span>
            </div>
            <button type="button" className="btn-donate">
              <span className="heart-icon">🤎</span> Donează
            </button>
          </div>
        ) : (
          <button type="button" className="btn-details">
            {t.btnViewDetails || "Vezi detalii"}
          </button>
        )}
      </div>
    </div>
  );
};

export default AnimalCard;