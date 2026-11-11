import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useLanguage } from "../useLanguage";
import { translations } from "../translations";
import FavoriteBtn from "./FavoriteBtn";
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

export interface AnimalModalProps {
  animal: any;
  isOpen?: boolean;
  onClose?: () => void;
  onScheduleVisit?: (animal: any) => void;
  isDistanceMode?: boolean;
}

export const AnimalModal: React.FC<AnimalModalProps> = ({ animal, isOpen, onClose }) => {
  const { lang } = useLanguage();
  const t = translations[lang as keyof typeof translations] || translations.ro;

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Previne scroll-ul pe fundalul paginii când modalul este deschis
  useEffect(() => {
    if (animal || isOpen) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [animal, isOpen]);

  if (!animal) return null;

  const isLoggedIn = !!localStorage.getItem("token");

  // Preluăm lista de imagini (cu fallback la imageUrl/image dacă arrays lipsește)
  const imagesList: string[] =
    animal.images && animal.images.length > 0
      ? animal.images
      : [animal.imageUrl || animal.image || ""];

  const handleNextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % imagesList.length);
  };

  const handlePrevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + imagesList.length) % imagesList.length);
  };

  // Funcție ajutătoare pentru traducerea speciei venite din baza de date
  const translateSpecies = (species: string) => {
    if (!species) return t.speciesOther || "Altele";
    const lower = species.toLowerCase();
    if (lower.includes("pis") || lower.includes("cat")) return t.speciesCat || "Pisică";
    if (lower.includes("cain") || lower.includes("dog") || lower.includes("câin")) return t.speciesDog || "Câine";
    if (lower.includes("iepur") || lower.includes("rabbit")) return t.speciesRabbit || "Iepure";
    if (lower.includes("papag") || lower.includes("parrot")) return t.speciesParrot || "Papagal";
    if (lower.includes("broasc") || lower.includes("turtle")) return t.speciesTurtle || "Broască țestoasă";
    return species;
  };

  // Funcție ajutătoare pentru traducerea culorii
  const translateColor = (color: string) => {
    if (!color) return t.colorBicolor || "Bicolor";
    const lower = color.toLowerCase();
    if (lower.includes("negru") || lower.includes("black")) return t.colorBlack || "Negru";
    if (lower.includes("alb") || lower.includes("white")) return t.colorWhite || "Alb";
    if (lower.includes("maro") || lower.includes("brown")) return t.colorBrown || "Maro";
    if (lower.includes("portocal") || lower.includes("roscat") || lower.includes("orange")) return t.colorOrange || "Portocaliu";
    if (lower.includes("gri") || lower.includes("grey") || lower.includes("gray")) return t.colorGrey || "Gri";
    if (lower.includes("auriu") || lower.includes("golden")) return t.colorGolden || "Auriu";
    if (lower.includes("tricolor")) return t.colorTricolor || "Tricolor";
    return color;
  };

  return createPortal(
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        
        {/* Buton X pentru MOBIL (Stânga sus) */}
        <button 
          type="button"
          className="modal-close-btn mobile-only-left-close" 
          onClick={onClose}
          aria-label="Închide"
        >
          ✕
        </button>

        {/* Buton X pentru DESKTOP (Dreapta sus) */}
        <button 
          type="button"
          className="modal-close-btn desktop-only-close" 
          onClick={onClose}
          aria-label="Închide"
        >
          ✕
        </button>

        <div className="modal-body-grid">
          {/* COLOANA STÂNGA: Galeria foto */}
          <div className="modal-gallery-section">
            <div className="main-image-container">
              {/* Inimioara de Favorite integrată peste poză */}
              <div className="gallery-favorite-wrapper">
                <FavoriteBtn animal={animal} isLoggedIn={isLoggedIn} />
              </div>

              {imagesList.length > 1 && (
                <>
                  <button type="button" className="gallery-arrow left" onClick={handlePrevImage}>‹</button>
                  <button type="button" className="gallery-arrow right" onClick={handleNextImage}>›</button>
                </>
              )}

              <img 
                src={imagesList[currentImageIndex]} 
                alt={animal.name} 
                className="modal-main-img"
              />
              
              <div className="image-dots">
                {imagesList.map((_, idx) => (
                  <span 
                    key={idx} 
                    className={`dot ${idx === currentImageIndex ? "active" : ""}`}
                    onClick={() => setCurrentImageIndex(idx)}
                  />
                ))}
              </div>
            </div>

            <div className="thumbnails-row">
              {imagesList.map((img, idx) => (
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
          <div className="modal-details-section">
            
            {/* Zona cu scroll pentru informații */}
            <div className="modal-details-scrollable">
              <h2 className="animal-name">{animal.name}</h2>
              
              <span className="status-badge available">
                {animal.status || t.statusAvailable || "Disponibil"}
              </span>

              <p className="location-info">
                <strong>{t.locationLabel || "Locație"}:</strong> {animal.location || animal.shelter || "Adăpostul Lăbuțe din Copou"}
              </p>
              <p className="location-info">
                <strong>{t.locationTypeLabel || "Tip locație"}:</strong> {animal.locationType || "Centru"}
              </p>

              <div className="details-columns-container">
                {/* Detalii cheie */}
                <div className="details-group">
                  <h3>{t.keyDetails || "Detalii cheie"}</h3>
                  <ul>
                    <li>
                      <img src={pawIcon} alt="species" className="detail-icon-img" />
                      <strong>{t.species || "Specie"}:</strong> {translateSpecies(animal.species)}
                    </li>
                    <li>
                      <img src={pawIcon} alt="sex" className="detail-icon-img" />
                      <strong>{t.sex || "Sex"}:</strong> {(animal.sex || animal.gender || '')?.toLowerCase().includes('masc') || (animal.sex || animal.gender || '')?.toLowerCase().includes('male') ? (t.male || "Mascul") : (t.female || "Femelă")}
                    </li>
                    <li>
                      <img src={clockIcon} alt="age" className="detail-icon-img" />
                      <strong>{t.age || "Vârstă"}:</strong> {animal.age}
                    </li>
                    <li>
                      <img src={rulerIcon} alt="size" className="detail-icon-img" />
                      <strong>{t.size || "Talie"}:</strong> {t[animal.size?.toLowerCase() as keyof typeof t] || animal.size}
                    </li>
                    <li>
                      <img src={smileIcon} alt="temperament" className="detail-icon-img" />
                      <strong>{t.temperament || "Temperament"}:</strong> {animal.temperament || "Jucăuș"}
                    </li>
                    <li>
                      <img src={dropIcon} alt="color" className="detail-icon-img" />
                      <strong>{t.color || "Culoare"}:</strong> {translateColor(animal.color || '')}
                    </li>
                  </ul>
                </div>

                {/* Sănătate & Compatibilitate */}
                <div className="details-group">
                  <h3>{t.healthAndCompatibility || "Sănătate & Compatibilitate"}</h3>
                  <ul>
                    <li>
                      <img src={pillIcon} alt="vaccinated" className="detail-icon-img" />
                      {t.vaccinated || "Vaccinat"}: <span className={animal.vaccinated !== false ? "yes" : "no"}>{animal.vaccinated !== false ? `✓ ${t.yes || "Da"}` : `✕ ${t.no || "Nu"}`}</span>
                    </li>
                    <li>
                      <img src={shieldIcon} alt="sterilized" className="detail-icon-img" />
                      {t.sterilized || "Sterilizat"}: <span className={animal.sterilized !== false ? "yes" : "no"}>{animal.sterilized !== false ? `✓ ${t.yes || "Da"}` : `✕ ${t.no || "Nu"}`}</span>
                    </li>
                    <li>
                      <img src={deparazitatIcon} alt="dewormed" className="detail-icon-img" />
                      {t.dewormed || "Deparazitat"}: <span className={animal.dewormed !== false ? "yes" : "no"}>{animal.dewormed !== false ? `✓ ${t.yes || "Da"}` : `✕ ${t.no || "Nu"}`}</span>
                    </li>
                    <li>
                      <img src={chipIcon} alt="microchipped" className="detail-icon-img" />
                      {t.microchipped || "Microcipat"}: <span className={animal.microchipped !== false ? "yes" : "no"}>{animal.microchipped !== false ? `✓ ${t.yes || "Da"}` : `✕ ${t.no || "Nu"}`}</span>
                    </li>
                    <li>
                      <img src={pawIcon} alt="petFriendly" className="detail-icon-img" />
                      {t.petFriendly || "Pet friendly"}: <span className={animal.petFriendly !== false ? "yes" : "no"}>{animal.petFriendly !== false ? `✓ ${t.yes || "Da"}` : `✕ ${t.no || "Nu"}`}</span>
                    </li>
                    <li>
                      <img src={smileIcon} alt="childFriendly" className="detail-icon-img" />
                      {t.childFriendly || "Child friendly"}: <span className={animal.childFriendly !== false ? "yes" : "no"}>{animal.childFriendly !== false ? `✓ ${t.yes || "Da"}` : `✕ ${t.no || "Nu"}`}</span>
                    </li>
                    <li>
                      <img src={leafIcon} alt="noAllergies" className="detail-icon-img" />
                      {t.noAllergies || "Fără alergii"}: <span className={animal.noAllergies !== false ? "yes" : "no"}>{animal.noAllergies !== false ? `✓ ${t.yes || "Da"}` : `✕ ${t.no || "Nu"}`}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Secțiunea de butoane (fixă jos) */}
            <div className="modal-actions-container">
              <button type="button" className="btn-schedule">
                {t.scheduleVisit || "Programează o vizită"}
              </button>
              
              <button 
                type="button"
                className="btn-share" 
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: animal.name,
                      text: `Vezi-l pe ${animal.name} pe FurEverHome!`,
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
    </div>,
    document.body
  );
};

export default AnimalModal;