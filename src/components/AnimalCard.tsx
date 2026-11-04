import React from 'react';
import './AnimalCard.css';
import { useLanguage } from '../useLanguage';
import { translations } from '../translations';

// Interfața actualizată pentru a se potrivi cu backend-ul Java
interface Animal {
  id?: number;
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
}

interface AnimalCardProps {
  animal: Animal;
}

export const AnimalCard: React.FC<AnimalCardProps> = ({ animal }) => {
  const { lang } = useLanguage();
  const t = translations[lang];

  // Verificăm imaginea venită din backend
  const imgSrc = animal.imageUrl || animal.image; 

  // Funcție pentru traducerea genului
  const translateGender = (gender: string) => {
    if (!gender) return '';
    const lower = gender.toLowerCase().trim();
    if (lower === 'mascul' || lower === 'male') return t.male || 'Mascul';
    if (lower === 'femela' || lower === 'female') return t.female || 'Femelă';
    return gender;
  };
  // Funcție pentru traducerea taliei
  const translateSize = (size: string) => {
    if (!size) return '';
    const lower = size.toLowerCase().trim();
    
    if (lower === 'medie' || lower === 'medium') return t.medium || 'Medie';
    if (lower === 'mare' || lower === 'large') return t.large || 'Mare';
    if (lower === 'mic' || lower === 'small2') return t.small2 || 'Mic';
    if (lower === 'mica' || lower === 'mică' || lower === 'small') return t.small || 'Mică';
    
    return size;
  };

  
  // Funcție pentru formatarea și traducerea vârstei
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

  // Funcție pentru traducerea stării (ex: Disponibil)
  const translateStatus = (status: string) => {
    if (!status) return '';
    const lower = status.toLowerCase().trim();
    if (lower === 'disponibil' || lower === 'available') return t.statusAvailable || 'Disponibil';
    return status;
  };

  return (
    <div className="animal-card">
      <div className="card-top">
        <span className="status-badge">{translateStatus(animal.status)}</span>
        <button className="favorite-btn" aria-label={t.favoriteAria || "Adaugă la favorite"}>♡</button>
      </div>

      <div className="card-image-container">
        {imgSrc ? (
          <img src={imgSrc} alt={animal.name} className="animal-real-image" />
        ) : (
          <div className="placeholder-avatar">🐶</div>
        )}
      </div>

      <div className="medical-icons-row">
        <span className={`icon-badge ${animal.vaccinated ? 'active' : ''}`} title={t.legendVaccinated}>💉</span>
        <span className={`icon-badge ${animal.dewormed ? 'active' : ''}`} title={t.legendDewormed}>💊</span>
        <span className={`icon-badge ${animal.sterilized ? 'active' : ''}`} title={t.legendSterilized}>⚥</span>
      </div>

      <div className="card-content">
        <h3 className="animal-name">{animal.name}</h3>
        
        <p className="animal-info">
          {translateGender(animal.gender)} · {formatAge(animal.age)} · {translateSize(animal.size)}
        </p>
        
        <p className="animal-shelter">{animal.shelter}</p>
        
        <button className="btn-details">
          {t.btnViewDetails || "Vezi detalii"}
        </button>
      </div>
    </div>
  );
};
