import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useLanguage } from "../useLanguage";
import { translations } from "../translations";
import FavoriteBtn from "./FavoriteBtn";
import "./AnimalModal.css";

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

export const AnimalModal: React.FC<AnimalModalProps> = ({ 
  animal, 
  isOpen = true, 
  onClose,
  onScheduleVisit
}) => {
  const { lang } = useLanguage();
  const t = translations[lang as keyof typeof translations] || translations.ro;

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    setCurrentImageIndex(0);
  }, [animal]);

  useEffect(() => {
    if (animal && isOpen) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [animal, isOpen]);

  if (!animal || !isOpen) return null;

  const isLoggedIn = !!localStorage.getItem("token");

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

  const translateSpecies = (species: string) => {
    if (!species) return t.speciesOther || (lang === 'ro' ? "Altele" : "Other");
    const lower = species.toLowerCase().trim();
    if (lower.includes("pis") || lower.includes("cat")) return t.speciesCat || (lang === 'ro' ? "Pisică" : "Cat");
    if (lower.includes("cain") || lower.includes("dog") || lower.includes("câin")) return t.speciesDog || (lang === 'ro' ? "Câine" : "Dog");
    if (lower.includes("iepur") || lower.includes("rabbit")) return t.speciesRabbit || (lang === 'ro' ? "Iepure" : "Rabbit");
    if (lower.includes("papag") || lower.includes("parrot")) return t.speciesParrot || (lang === 'ro' ? "Papagal" : "Parrot");
    if (lower.includes("broasc") || lower.includes("turtle")) return t.speciesTurtle || (lang === 'ro' ? "Broască țestoasă" : "Turtle");
    if (lower.includes("alt") || lower.includes("other")) return t.speciesOther || (lang === 'ro' ? "Altele" : "Other");
    return species;
  };

  const translateColor = (color: string) => {
    if (!color) return t.colorBicolor || (lang === 'ro' ? "Bicolor" : "Bicolor");
    const lower = color.toLowerCase().trim();
    if (lower.includes("negru") || lower.includes("black")) return t.colorBlack || (lang === 'ro' ? "Negru" : "Black");
    if (lower.includes("alb") || lower.includes("white")) return t.colorWhite || (lang === 'ro' ? "Alb" : "White");
    if (lower.includes("maro") || lower.includes("brown")) return t.colorBrown || (lang === 'ro' ? "Maro" : "Brown");
    if (lower.includes("portocal") || lower.includes("roscat") || lower.includes("orange") || lower.includes("ginger")) return t.colorOrange || (lang === 'ro' ? "Portocaliu (Roșcat)" : "Orange (Ginger)");
    if (lower.includes("gri") || lower.includes("grey") || lower.includes("gray")) return t.colorGrey || (lang === 'ro' ? "Gri" : "Grey");
    if (lower.includes("auriu") || lower.includes("golden")) return t.colorGolden || (lang === 'ro' ? "Auriu" : "Golden");
    if (lower.includes("tricolor")) return t.colorTricolor || (lang === 'ro' ? "Tricolor" : "Tricolor");
    if (lower.includes("bicolor")) return t.colorBicolor || (lang === 'ro' ? "Bicolor" : "Bicolor");
    return color;
  };

  const translateSize = (size: string) => {
    if (!size) return '';
    const lower = size.toLowerCase().trim();
    if (lower.includes("medie") || lower.includes("medium")) return lang === 'ro' ? 'talie medie' : 'medium size';
    if (lower.includes("mare") || lower.includes("large")) return lang === 'ro' ? 'talie mare' : 'large size';
    if (lower.includes("mic") || lower.includes("small")) return lang === 'ro' ? 'talie mică' : 'small size';
    return size;
  };

  const translateStatus = (status?: string) => {
    if (!status) return t.statusAvailable || (lang === 'ro' ? "Disponibil" : "Available");
    const lower = status.toLowerCase().trim();
    if (lower.includes("disponibil") || lower.includes("available")) return t.statusAvailable || (lang === 'ro' ? "Disponibil" : "Available");
    if (lower.includes("rezervat") || lower.includes("reserved")) return t.statusReserved || (lang === 'ro' ? "Rezervat" : "Reserved");
    if (lower.includes("adoptat") || lower.includes("adopted")) return t.statusAdopted || (lang === 'ro' ? "Adoptat" : "Adopted");
    return status;
  };

  const translateGender = (g?: string) => {
    if (!g) return t.female || (lang === 'ro' ? "Femelă" : "Female");
    const lower = g.toLowerCase().trim();
    if (lower.includes("masc") || lower === "male") return t.male || (lang === 'ro' ? "Mascul" : "Male");
    if (lower.includes("fem") || lower === "female") return t.female || (lang === 'ro' ? "Femelă" : "Female");
    return g;
  };

  const translateLocationType = (locType?: string) => {
    if (!locType) return lang === 'ro' ? 'Centru' : 'City center';
    const lower = locType.toLowerCase().trim();
    if (lower.includes("centru") || lower.includes("center")) return lang === 'ro' ? 'Centru' : 'City center';
    if (lower.includes("foster")) return lang === 'ro' ? 'În Foster' : 'In Foster';
    return locType;
  };

  const translateTemperament = (temp?: string) => {
    if (!temp) return t.playful || (lang === 'ro' ? "Jucăuș" : "Playful");
    
    // Eliminăm diacriticele pentru potrivire sigură (ex: "jucăuș" -> "jucaus")
    const cleanTemp = temp.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();

    if (cleanTemp.includes("jucaus") || cleanTemp.includes("playful")) return t.playful || (lang === 'ro' ? "Jucăuș" : "Playful");
    if (cleanTemp.includes("calm")) return t.calm || (lang === 'ro' ? "Calm" : "Calm");
    if (cleanTemp.includes("energic") || cleanTemp.includes("energetic")) return t.energetic || (lang === 'ro' ? "Energic" : "Energetic");
    if (cleanTemp.includes("timid") || cleanTemp.includes("shy")) return t.shy || (lang === 'ro' ? "Timid" : "Shy");
    
    return temp;
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

  return createPortal(
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        
        {/* Buton X Stânga MOBIL / Dreapta DESKTOP */}
        <button 
          type="button"
          className="modal-close-btn mobile-only-left-close" 
          onClick={onClose}
          aria-label="Închide"
        >
          ✕
        </button>

        <button 
          type="button"
          className="modal-close-btn desktop-only-close" 
          onClick={onClose}
          aria-label="Închide"
        >
          ✕
        </button>

        <div className="modal-body-grid">
          {/* COLOANA STÂNGA: Galeria Foto */}
          <div className="modal-gallery-section">
            <div className="main-image-container">
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

          {/* COLOANA DREAPTA: Informații & Acțiuni */}
          <div className="modal-details-section">
            
            <div className="modal-details-scrollable">
              <h2 className="animal-name">{animal.name}</h2>
              
              <span className="status-badge available">
                {translateStatus(animal.status)}
              </span>

              <p className="location-info">
                <strong>{t.locationLabel || (lang === 'ro' ? "Locație" : "Location")}:</strong> {animal.location || animal.shelter || "Casa lui Azor"}
              </p>
              <p className="location-info">
                <strong>{t.locationTypeLabel || (lang === 'ro' ? "Tip locație" : "Location type")}:</strong> {translateLocationType(animal.locationType)}
              </p>

              <div className="details-columns-container">
                {/* Detalii Cheie */}
                <div className="details-group">
                  <h3>{t.keyDetails || (lang === 'ro' ? "Detalii cheie" : "Key details")}</h3>
                  <ul>
                    <li>
                      <img src={pawIcon} alt="species" className="detail-icon-img" />
                      <strong>{t.species || (lang === 'ro' ? "Specie" : "Species")}:</strong> {translateSpecies(animal.species)}
                    </li>
                    <li>
                      <img src={pawIcon} alt="sex" className="detail-icon-img" />
                      <strong>{t.sex || (lang === 'ro' ? "Sex" : "Sex")}:</strong> {translateGender(animal.sex || animal.gender)}
                    </li>
                    <li>
                      <img src={clockIcon} alt="age" className="detail-icon-img" />
                      <strong>{t.age || (lang === 'ro' ? "Vârstă" : "Age")}:</strong> {translateAge(animal.age)}
                    </li>
                    <li>
                      <img src={rulerIcon} alt="size" className="detail-icon-img" />
                      <strong>{t.size || (lang === 'ro' ? "Talie" : "Size")}:</strong> {translateSize(animal.size)}
                    </li>
                    <li>
                      <img src={smileIcon} alt="temperament" className="detail-icon-img" />
                      <strong>{t.temperament || (lang === 'ro' ? "Temperament" : "Temperament")}:</strong> {translateTemperament(animal.temperament)}
                    </li>
                    <li>
                      <img src={dropIcon} alt="color" className="detail-icon-img" />
                      <strong>{t.color || (lang === 'ro' ? "Culoare" : "Color")}:</strong> {translateColor(animal.color || '')}
                    </li>
                  </ul>
                </div>

                {/* Sănătate & Compatibilitate */}
                <div className="details-group">
                  <h3>{t.healthAndCompatibility || (lang === 'ro' ? "Sănătate & Compatibilitate" : "Health & Compatibility")}</h3>
                  <ul>
                    <li>
                      <span className="health-label-wrapper">
                        <img src={pillIcon} alt="vaccinated" className="detail-icon-img" />
                        {t.vaccinated || (lang === 'ro' ? "Vaccinat" : "Vaccinated")}
                      </span>
                      <span className={`status-pill ${animal.vaccinated !== false ? "yes" : "no"}`}>
                        {animal.vaccinated !== false ? `✓ ${t.yes || (lang === 'ro' ? 'Da' : 'Yes')}` : `✕ ${t.no || (lang === 'ro' ? 'Nu' : 'No')}`}
                      </span>
                    </li>
                    <li>
                      <span className="health-label-wrapper">
                        <img src={shieldIcon} alt="sterilized" className="detail-icon-img" />
                        {t.sterilized || (lang === 'ro' ? "Sterilizat" : "Sterilized")}
                      </span>
                      <span className={`status-pill ${animal.sterilized !== false ? "yes" : "no"}`}>
                        {animal.sterilized !== false ? `✓ ${t.yes || (lang === 'ro' ? 'Da' : 'Yes')}` : `✕ ${t.no || (lang === 'ro' ? 'Nu' : 'No')}`}
                      </span>
                    </li>
                    <li>
                      <span className="health-label-wrapper">
                        <img src={deparazitatIcon} alt="dewormed" className="detail-icon-img" />
                        {t.dewormed || (lang === 'ro' ? "Deparazitat" : "Dewormed")}
                      </span>
                      <span className={`status-pill ${animal.dewormed !== false ? "yes" : "no"}`}>
                        {animal.dewormed !== false ? `✓ ${t.yes || (lang === 'ro' ? 'Da' : 'Yes')}` : `✕ ${t.no || (lang === 'ro' ? 'Nu' : 'No')}`}
                      </span>
                    </li>
                    <li>
                      <span className="health-label-wrapper">
                        <img src={chipIcon} alt="microchipped" className="detail-icon-img" />
                        {t.microchipped || (lang === 'ro' ? "Microcipat" : "Microchipped")}
                      </span>
                      <span className={`status-pill ${animal.microchipped !== false ? "yes" : "no"}`}>
                        {animal.microchipped !== false ? `✓ ${t.yes || (lang === 'ro' ? 'Da' : 'Yes')}` : `✕ ${t.no || (lang === 'ro' ? 'Nu' : 'No')}`}
                      </span>
                    </li>
                    <li>
                      <span className="health-label-wrapper">
                        <img src={pawIcon} alt="petFriendly" className="detail-icon-img" />
                        {t.petFriendly || "Pet friendly"}
                      </span>
                      <span className={`status-pill ${animal.petFriendly !== false ? "yes" : "no"}`}>
                        {animal.petFriendly !== false ? `✓ ${t.yes || (lang === 'ro' ? 'Da' : 'Yes')}` : `✕ ${t.no || (lang === 'ro' ? 'Nu' : 'No')}`}
                      </span>
                    </li>
                    <li>
                      <span className="health-label-wrapper">
                        <img src={smileIcon} alt="childFriendly" className="detail-icon-img" />
                        {t.childFriendly || "Child friendly"}
                      </span>
                      <span className={`status-pill ${animal.childFriendly !== false ? "yes" : "no"}`}>
                        {animal.childFriendly !== false ? `✓ ${t.yes || (lang === 'ro' ? 'Da' : 'Yes')}` : `✕ ${t.no || (lang === 'ro' ? 'Nu' : 'No')}`}
                      </span>
                    </li>
                    <li>
                      <span className="health-label-wrapper">
                        <img src={leafIcon} alt="noAllergies" className="detail-icon-img" />
                        {t.noAllergies || (lang === 'ro' ? "Fără alergii" : "No allergies")}
                      </span>
                      <span className={`status-pill ${animal.noAllergies !== false ? "yes" : "no"}`}>
                        {animal.noAllergies !== false ? `✓ ${t.yes || (lang === 'ro' ? 'Da' : 'Yes')}` : `✕ ${t.no || (lang === 'ro' ? 'Nu' : 'No')}`}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Secțiunea de butoane (fixă jos) */}
            <div className="modal-actions-container">
              <button 
                type="button" 
                className="btn-schedule"
                onClick={() => onScheduleVisit && onScheduleVisit(animal)}
              >
                <span>{t.scheduleVisit || (lang === 'ro' ? "Programează o vizită" : "Schedule a visit")}</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
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
                title={t.shareProfile || (lang === 'ro' ? "Distribuie profilul" : "Share profile")}
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