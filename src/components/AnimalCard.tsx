import React from 'react';
import './AnimalCard.css';

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
// Verificăm imaginea venită din backend
  const imgSrc = animal.imageUrl || animal.image;  return (
    <div className="animal-card">
      <div className="card-top">
        <span className="status-badge">{animal.status}</span>
        <button className="favorite-btn" aria-label="Adaugă la favorite">♡</button>
      </div>

      <div className="card-image-container">
        {imgSrc ? (
          <img src={imgSrc} alt={animal.name} className="animal-real-image" />
        ) : (
          <div className="placeholder-avatar">🐶</div>
        )}
      </div>

      <div className="medical-icons-row">
        <span className={`icon-badge ${animal.vaccinated ? 'active' : ''}`} title="Vaccinat">💉</span>
		<span className={`icon-badge ${animal.dewormed ? 'active' : ''}`} title="Deparazitat">💊</span>
		<span className={`icon-badge ${animal.sterilized ? 'active' : ''}`} title="Sterilizat">⚥</span>
      </div>

      <div className="card-content">
        <h3 className="animal-name">{animal.name}</h3>
        <p className="animal-info">{animal.gender} · {animal.age} · {animal.size}</p>
        <p className="animal-shelter">{animal.shelter}</p>
        
        <button className="btn-details">Vezi detalii</button>
      </div>
    </div>
  );
};