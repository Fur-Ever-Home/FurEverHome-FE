import React from 'react';
import './AnimalCard.css';
import { useLanguage } from '../useLanguage';
import { translations } from '../translations';
import FavoriteBtn from './FavoriteBtn';

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
  const t = translations[lang as keyof typeof translations] || translations.ro;

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
    if (lower.includes('medie') || lower.includes('medium')) return `${t.size || 'talie'} ${t.medium?.toLowerCase() || 'medie'}`;
    if (lower.includes('mare') || lower.includes('large')) return `${t.size || 'talie'} ${t.large?.toLowerCase() || 'mare'}`;
    if (lower.includes('mic')) return `${t.size || 'talie'} ${t.small?.toLowerCase() || 'mică'}`;
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
    <div className={`animal-card ${isDistanceMode ? 'distance-card-style' : ''}`}>
      <div className="card-image-wrapper">
        <span 
          className="status-badge-card"
          style={isDistanceMode ? { backgroundColor: '#A66E38', color: '#FFFDF8' } : undefined}
        >
          {isDistanceMode ? (animal.status || 'Senior') : translateStatus(animal.status)}
        </span>
    <div className={`animal-card ${isDistance ? 'card-distance-mode' : ''}`}>
      <div className="card-top">
        {isDistance ? (
          <span className="status-badge senior-badge">{t.senior || 'Senior'}</span>
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

        {isDistanceMode && (
          <div className="distance-progress-container">
            {/* <-- ÎNCEPUT COMPLETARE: Etichetă nevoie --> */}
            <div style={{ marginBottom: '8px' }}>
              <span style={{
                display: 'inline-block',
                backgroundColor: '#EFE6D8',
                color: '#5C4E43',
                fontSize: '11px',
                fontWeight: 600,
                padding: '4px 10px',
                borderRadius: '12px'
              }}>
                {animal.needType || (lang === 'en' ? 'Permanent care' : 'Cazare permanentă')}
              </span>
            </div>
            {/* <-- SFÂRȘIT COMPLETARE --> */}

            <div className="progress-bar-bg">
           
                className="progress-bar-fill" 
                style={{ width: `${animal.fundingPercent || 45}%` }}
              /
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
              <span className="funding-text">{fundingPercent}% {t.fundingCovered || 'din necesarul lunar acoperit'}</span>
            </div>
            <button type="button" className="btn-donate">
              <span className="heart-icon">🤎</span> {t.btnDonate || 'Donează'}
            </button>
          </div>
        ) : (
          <button type="button" className="btn-details">
            {t.btnViewDetails || "Vezi detalii"}
          </button>
        )}

        <button type="button" className="btn-card-details">
          style={isDistanceMode ? { backgroundColor: '#A66E38', color: '#FFFDF8' } : undefined}
          {isDistanceMode 
            ? `🤍 ${lang === 'en' ? 'Donate' : 'Donează'}` 
            : (t.btnViewDetails || 'Vezi detalii')}
          {t.btnViewDetails || 'Vezi detalii'}
        </button>
      </div>
    </div>
  );
};

export default AnimalCard;