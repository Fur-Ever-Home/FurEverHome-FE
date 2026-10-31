import React from 'react';
import { Animal } from '../data/animalsMock';
import './AnimalCard.css';

// Importuri pentru iconițele verzi (en) și gri (ro)
import vaccineGreen from '../assets/vaccine-icon.svg';
import vaccineGray from '../assets/nevaccinat.png';

import dewormGreen from '../assets/deworm-icon.svg';
import dewormGray from '../assets/nedeparazitat (2).png';

import sterilGreen from '../assets/sterile-icon.svg';
import sterilGray from '../assets/nesterlizatB.png'; // Poți folosi nesterlizatF.png dacă e femelă sau cum preferi

interface AnimalCardProps {
  animal: Animal;
}

export const AnimalCard: React.FC<AnimalCardProps> = ({ animal }) => {
  return (
    <div className="animal-card">
      <div className="card-top">
        <span className="status-badge">{animal.status}</span>
        <button className="favorite-btn" aria-label="Adaugă la favorite">♡</button>
      </div>

      <div className="card-image-container">
        <div className="placeholder-avatar">🐕</div>
      </div>

      {/* Rândul cu iconițele medicale corecte */}
      <div className="medical-icons-row">
        <img 
          src={animal.vaccinated ? vaccineGreen : vaccineGray} 
          alt="Vaccinat" 
          title="Vaccinat" 
          className="medical-icon-img" 
        />
        <img 
          src={animal.dewormed ? dewormGreen : dewormGray} 
          alt="Deparazitat" 
          title="Deparazitat" 
          className="medical-icon-img" 
        />
        <img 
          src={animal.sterilized ? sterilGreen : sterilGray} 
          alt="Sterilizat" 
          title="Sterilizat" 
          className="medical-icon-img" 
        />
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