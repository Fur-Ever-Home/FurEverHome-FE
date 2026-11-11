import React from 'react';
import FavoriteBtn from './FavoriteBtn';
import { useLanguage } from '../useLanguage';
import { translations } from '../translations';
import vaccineIcon from '../assets/vaccinat.png';
import dewormIcon from '../assets/deparazitat.png';
import sterileIcon from '../assets/sterlizat.png';
import dogIcon from '../assets/dog-icon.svg';
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
  };
  isDistanceMode?: boolean;
}

export const AnimalCard: React.FC<AnimalCardProps> = ({ animal, isDistanceMode = false }) => {
  const { lang } = useLanguage();
  const t = translations[lang as keyof typeof translations] || translations.ro;
  const isLoggedIn = !!localStorage.getItem('token');

  const imageSrc = animal.imageUrl || animal.image || dogIcon;
  const genderValue = animal.gender || animal.sex || '';

  const translateGender = (g: string) => {
    if (!g) return '';
    const lower = g.toLowerCase().trim();
    if (lower.includes('masc') || lower === 'male') return t.male || 'Mascul';
    if (lower.includes('fem') || lower === 'female') return t.female || 'Femelă';
    return g;
  };

  const translateSize = (s: string) => {
    if (!s) return '';
    const lower = s.toLowerCase().trim();
    if (lower.includes('medie') || lower.includes('medium')) return lang === 'ro' ? 'talie medie' : 'medium size';
    if (lower.includes('mare') || lower.includes('large')) return lang === 'ro' ? 'talie mare' : 'large size';
    if (lower.includes('mic') || lower.includes('small')) return lang === 'ro' ? 'talie mică' : 'small size';
    return s;
  };

  const translateStatus = (st?: string) => {
    if (!st) return t.statusAvailable || 'Disponibil';
    const lower = st.toLowerCase().trim();
    if (lower.includes('disponibil') || lower.includes('available')) return t.statusAvailable || 'Disponibil';
    if (lower.includes('rezervat') || lower.includes('reserved')) return t.statusReserved || 'Rezervat';
    if (lower.includes('adoptat') || lower.includes('adopted')) return t.statusAdopted || 'Adoptat';
    return st;
  };

  const translateAge = (age: string | number) => {
    if (!age) return '';
    const ageStr = String(age).toLowerCase().trim();
    if (lang === 'ro') return ageStr;
    return ageStr
      .replace(/luni/g, t.months || 'months')
      .replace(/ani/g, t.yearsOld || 'years old')
      .replace(/an\b/g, t.yearOld || 'year old');
  };

  return (
    <div className={`animal-card ${isDistanceMode ? 'distance-card-style' : ''}`}>
      <div className="card-image-wrapper">
        <span className="status-badge-card">{translateStatus(animal.status)}</span>
        
        <img src={imageSrc} alt={animal.name} className="animal-card-img" />

        <div className="card-fav-btn">
          <FavoriteBtn animal={animal} isLoggedIn={isLoggedIn} />
        </div>

        {/* Iconițele de pe card - identice cu cele din legendă */}
        {!isDistanceMode && (
          <div className="card-health-overlay">
            <span className={`legend-badge ${animal.vaccinated !== false ? 'active' : 'inactive'}`} title={t.vaccinated || 'Vaccinat'}>
              <img src={vaccineIcon} alt={t.vaccinated || 'Vaccinat'} />
            </span>
            <span className={`legend-badge ${animal.dewormed !== false ? 'active' : 'inactive'}`} title={t.dewormed || 'Deparazitat'}>
              <img src={dewormIcon} alt={t.dewormed || 'Deparazitat'} />
            </span>
            <span className={`legend-badge ${animal.sterilized !== false ? 'active' : 'inactive'}`} title={t.sterilized || 'Sterilizat'}>
              <img src={sterileIcon} alt={t.sterilized || 'Sterilizat'} />
            </span>
          </div>
        )}
      </div>

      <div className="card-content">
        <h3 className="card-title">{animal.name}</h3>
        <p className="card-subtitle">
          {translateGender(genderValue)} · {translateAge(animal.age)} · {translateSize(animal.size)}
        </p>
        <p className="card-location">{animal.shelter || animal.location || 'Casa lui Azor'}</p>

        {isDistanceMode && (
          <div className="distance-progress-container">
            <div className="progress-bar-bg">
              <div 
                className="progress-bar-fill" 
                style={{ width: `${animal.fundingPercent || 45}%` }}
              />
            </div>
            <span className="progress-text">
              {animal.fundingPercent || 45}% {t.fundingCovered || 'din necesarul lunar acoperit'}
            </span>
          </div>
        )}

        <button type="button" className="btn-card-details">
          {t.btnViewDetails || 'Vezi detalii'}
        </button>
      </div>
    </div>
  );
};

export default AnimalCard;