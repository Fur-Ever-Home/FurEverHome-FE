import React from 'react';
import FavoriteBtn from './FavoriteBtn';
import { useLanguage } from '../useLanguage';
import { translations } from '../translations';
import vaccineIcon from '../assets/vaccinat.png';
import dewormIcon from '../assets/deparazitat.png';
import sterileIcon from '../assets/sterlizat.png';
import './AnimalCard.css';

export interface AnimalCardProps {
  animal: {
    id: number | string;
    name: string;
    species: string;
    gender?: string;
    sex?: string;
    age: string | number;
    size: string;
    shelter?: string;
    location?: string;
    status?: string;
    vaccinated?: boolean;
    dewormed?: boolean;
    sterilized?: boolean;
    imageUrl?: string;
    image?: string;
    fundingPercent?: number;
    needType?: string;
  };
  isDistanceMode?: boolean;
}

export const AnimalCard: React.FC<AnimalCardProps> = ({ animal, isDistanceMode = false }) => {
  const { lang } = useLanguage();
  const t = translations[lang as keyof typeof translations] || translations.ro;
  const isLoggedIn = !!localStorage.getItem('token');

  const imageSrc = animal.imageUrl || animal.image || '';
  const genderValue = animal.gender || animal.sex || '';

  const translateGender = (g: string) => {
    if (!g) return '';
    const lower = g.toLowerCase().trim();
    if (lower.includes('masc') || lower.includes('male')) return t.male || 'Mascul';
    if (lower.includes('fem') || lower.includes('female')) return t.female || 'Femelă';
    return g;
  };

  const translateSize = (s: string) => {
    if (!s) return '';
    const lower = s.toLowerCase().trim();
    if (lower.includes('medie') || lower.includes('medium')) return t.medium || 'Medie';
    if (lower.includes('mare') || lower.includes('large')) return t.large || 'Mare';
    if (lower.includes('mic') || lower.includes('small')) return t.small || 'Mică';
    return s;
  };

  return (
    <div className={`animal-card ${isDistanceMode ? 'distance-card-style' : ''}`}>
      <div className="card-image-wrapper">
        {imageSrc ? (
          <img src={imageSrc} alt={animal.name} className="animal-card-img" />
        ) : (
          <div className="placeholder-avatar">🐶</div>
        )}

        <div className="card-fav-btn">
          <FavoriteBtn animal={animal} isLoggedIn={isLoggedIn} />
        </div>

        {isDistanceMode && (
          <span className="distance-badge">{t.senior || 'Senior'}</span>
        )}
      </div>

      <div className="card-content">
        <h3 className="card-title">{animal.name}</h3>
        <p className="card-subtitle">
          {translateGender(genderValue)} · {animal.age} · {translateSize(animal.size)}
        </p>
        <p className="card-location">📍 {animal.shelter || animal.location || 'Iași'}</p>

        {!isDistanceMode ? (
          <div className="card-health-icons">
            <img 
              src={vaccineIcon} 
              alt="Vaccinat" 
              className={`health-icon ${animal.vaccinated ? 'active' : 'inactive'}`} 
              title={t.vaccinated || 'Vaccinat'}
            />
            <img 
              src={dewormIcon} 
              alt="Deparazitat" 
              className={`health-icon ${animal.dewormed ? 'active' : 'inactive'}`} 
              title={t.dewormed || 'Deparazitat'}
            />
            <img 
              src={sterileIcon} 
              alt="Sterilizat" 
              className={`health-icon ${animal.sterilized ? 'active' : 'inactive'}`} 
              title={t.sterilized || 'Sterilizat'}
            />
          </div>
        ) : (
          <div className="distance-progress-container">
            <div className="progress-bar-bg">
              <div 
                className="progress-bar-fill" 
                style={{ width: `${animal.fundingPercent || 45}%` }}
              />
            </div>
            <span className="progress-text">
              {animal.fundingPercent || 45}% {t.fundingCovered || 'din necesar acoperit'}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnimalCard;