import React, { useState } from "react";
import { useLanguage } from "../useLanguage";
import { translations } from "../translations";
import "./AnimalModal.css";

// Importuri pentru iconițele din folderul assets
import chipIcon from "../assets/chip.png";
import clockIcon from "../assets/clock.png";
import deparazitatIcon from "../assets/pill.png";
import dropIcon from "../assets/drop.png";
import leafIcon from "../assets/leaf.png";
import pawIcon from "../assets/paw.png";
import pillIcon from "../assets/pill.png";
import rulerIcon from "../assets/ruler.png";
import shieldIcon from "../assets/shield.png";
import smileIcon from "../assets/smile.png";
import sterlizatIcon from "../assets/syringe.png";

interface AnimalModalProps {
  animal: {
    id: number;
    name: string;
    species: string;
    breed: string;
    sex: string;
    age: string | number;
    size: string;
    temperament: string;
    color: string;
    location: string;
    locationType: string;
    status: string;
    images: string[];
    vaccinated: boolean;
    sterilized: boolean;
    dewormed: boolean;
    microchipped: boolean;
    petFriendly: boolean;
    childFriendly: boolean;
    noAllergies: boolean;
  };
  onClose: () => void;
}

export const AnimalModal: React.FC<AnimalModalProps> = ({ animal, onClose }) => {
  const { lang } = useLanguage();
  const t = translations[lang as keyof typeof translations] || translations.ro;

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % animal.images.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + animal.images.length) % animal.images.length);
  };

  // Funcție ajutătoare pentru traducerea speciei venite din baza de date
  const translateSpecies = (species: string) => {
    if (!species) return t.speciesOther;
    const lower = species.toLowerCase();
    if (lower.includes("pis") || lower.includes("cat")) return t.speciesCat;
    if (lower.includes("cain") || lower.includes("dog") || lower.includes("câin")) return t.speciesDog;
    if (lower.includes("iepur") || lower.includes("rabbit")) return t.speciesRabbit;
    if (lower.includes("papag") || lower.includes("parrot")) return t.speciesParrot;
    if (lower.includes("broasc") || lower.includes("turtle")) return t.speciesTurtle;
    return species;
  };

  // Funcție ajutătoare pentru traducerea culorii
  const translateColor = (color: string) => {
    if (!color) return t.colorBicolor;
    const lower = color.toLowerCase();
    if (lower.includes("negru") || lower.includes("black")) return t.colorBlack;
    if (lower.includes("alb") || lower.includes("white")) return t.colorWhite;
    if (lower.includes("maro") || lower.includes("brown")) return t.colorBrown;
    if (lower.includes("portocal") || lower.includes("roscat") || lower.includes("orange")) return t.colorOrange;
    if (lower.includes("gri") || lower.includes("grey") || lower.includes("gray")) return t.colorGrey;
    if (lower.includes("auriu") || lower.includes("golden")) return t.colorGolden;
    if (lower.includes("tricolor")) return t.colorTricolor;
    return color;
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          ✕
        </button>

        <div className="modal-body-grid">
          {/* COLOANA STÂNGA: Galeria foto */}
          <div className="modal-gallery-section">
            <div className="main-image-container">
              <button className="gallery-arrow left" onClick={handlePrevImage}>‹</button>
              <img 
                src={animal.images[currentImageIndex] || animal.images[0]} 
                alt={animal.name} 
                className="modal-main-img"
              />
              <button className="gallery-arrow right" onClick={handleNextImage}>›</button>
              
              <div className="image-dots">
                {animal.images.map((_, idx) => (
                  <span 
                    key={idx} 
                    className={`dot ${idx === currentImageIndex ? "active" : ""}`}
                    onClick={() => setCurrentImageIndex(idx)}
                  />
                ))}
              </div>
            </div>

            <div className="thumbnails-row">
              {animal.images.map((img, idx) => (
                <img 
                  key={idx}
                  src={img}
                  alt={`thumbnail-${idx}`}
                  className={`thumb ${idx === currentImageIndex ? "selected" : ""}`}
                  onClick={() => setCurrentImageIndex(idx)}
                />
              ))}
            </div>
          </div>

          {/* COLOANA DREAPTA: Detalii animăluț */}
          <div className="modal-details-section" style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
            
            {/* Zona care va avea scroll și va conține informațiile */}
            <div className="modal-details-scrollable" style={{ overflowY: 'auto', flex: 1, paddingRight: '8px' }}>
              <h2 className="animal-name">{animal.name}</h2>
              
              <span className="status-badge available">
                {t.statusAvailable}
              </span>

              <p className="location-info">
                <strong>{t.locationLabel}:</strong> {animal.location}
              </p>
              <p className="location-info">
                <strong>{t.locationTypeLabel}:</strong> {animal.locationType}
              </p>

              <div className="details-columns-container">
                {/* Detalii cheie */}
                <div className="details-group">
                  <h3>{t.keyDetails}</h3>
                  <ul>
                    <li>
                      <img src={pawIcon} alt="species" className="detail-icon-img" />
                      <strong>{t.species}:</strong> {translateSpecies(animal.species)}
                    </li>
                    <li>
                      <img src={pawIcon} alt="sex" className="detail-icon-img" />
                      <strong>{t.sex}:</strong> {animal.sex?.toLowerCase().includes('masc') || animal.sex?.toLowerCase().includes('male') ? t.male : t.female}
                    </li>
                    <li>
                      <img src={clockIcon} alt="age" className="detail-icon-img" />
                      <strong>{t.age}:</strong> {animal.age}
                    </li>
                    <li>
                      <img src={rulerIcon} alt="size" className="detail-icon-img" />
                      <strong>{t.size}:</strong> {t[animal.size?.toLowerCase() as keyof typeof t] || animal.size}
                    </li>
                    <li>
                      <img src={smileIcon} alt="temperament" className="detail-icon-img" />
                      <strong>{t.temperament}:</strong> {animal.temperament}
                    </li>
                    <li>
                      <img src={dropIcon} alt="color" className="detail-icon-img" />
                      <strong>{t.color}:</strong> {translateColor(animal.color)}
                    </li>
                  </ul>
                </div>

                {/* Sănătate & Compatibilitate */}
                <div className="details-group">
                  <h3>{t.healthAndCompatibility}</h3>
                  <ul>
                    <li>
                      <img src={pillIcon} alt="vaccinated" className="detail-icon-img" />
                      {t.vaccinated}: <span className={animal.vaccinated ? "yes" : "no"}>{animal.vaccinated ? `✓ ${t.yes}` : `✕ ${t.no}`}</span>
                    </li>
                    <li>
                      <img src={shieldIcon} alt="sterilized" className="detail-icon-img" />
                      {t.sterilized}: <span className={animal.sterilized ? "yes" : "no"}>{animal.sterilized ? `✓ ${t.yes}` : `✕ ${t.no}`}</span>
                    </li>
                    <li>
                      <img src={deparazitatIcon} alt="dewormed" className="detail-icon-img" />
                      {t.dewormed}: <span className={animal.dewormed ? "yes" : "no"}>{animal.dewormed ? `✓ ${t.yes}` : `✕ ${t.no}`}</span>
                    </li>
                    <li>
                      <img src={chipIcon} alt="microchipped" className="detail-icon-img" />
                      {t.microchipped}: <span className={animal.microchipped ? "yes" : "no"}>{animal.microchipped ? `✓ ${t.yes}` : `✕ ${t.no}`}</span>
                    </li>
                    <li>
                      <img src={pawIcon} alt="petFriendly" className="detail-icon-img" />
                      {t.petFriendly}: <span className={animal.petFriendly ? "yes" : "no"}>{animal.petFriendly ? `✓ ${t.yes}` : `✕ ${t.no}`}</span>
                    </li>
                    <li>
                      <img src={smileIcon} alt="childFriendly" className="detail-icon-img" />
                      {t.childFriendly}: <span className={animal.childFriendly ? "yes" : "no"}>{animal.childFriendly ? `✓ ${t.yes}` : `✕ ${t.no}`}</span>
                    </li>
                    <li>
                      <img src={leafIcon} alt="noAllergies" className="detail-icon-img" />
                      {t.noAllergies}: <span className={animal.noAllergies ? "yes" : "no"}>{animal.noAllergies ? `✓ ${t.yes}` : `✕ ${t.no}`}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Secțiunea de butoane în partea de jos (fixă, nu se va deplasa la scroll) */}
            <div className="modal-actions-container" style={{ display: 'flex', gap: '12px', alignItems: 'center', marginTop: '15px', flexShrink: 0 }}>
              <button className="btn-schedule" style={{ flex: 1 }}>
                  {t.scheduleVisit}
              </button>
              
              <button 
                className="btn-share" 
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: animal.name,
                      text: `Vezi-l pe ${animal.name} pe FureverHome!`,
                      url: window.location.href,
                    }).catch(() => {});
                  } else {
                    navigator.clipboard.writeText(window.location.href);
                    alert("Link-ul a fost copiat în clipboard!");
                  }
                }}
                title="Distribuie profilul"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
                  <polyline points="16 6 12 2 8 6"></polyline>
                  <line x1="12" y1="2" x2="12" y2="15"></line>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};