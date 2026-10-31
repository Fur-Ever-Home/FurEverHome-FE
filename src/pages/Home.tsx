import { Link } from 'react-router-dom';
import Header from '../components/Header';

import sectiune12 from '../assets/sectiune1.2.png';
import dogIcon from '../assets/dog-icon.svg';
import catIcon from '../assets/cat-icon.svg';
import otherIcon from '../assets/other-icon.svg';
import vaccineIcon from '../assets/vaccine-icon.svg';
import dewormIcon from '../assets/deworm-icon.svg';
import sterileIcon from '../assets/sterile-icon.svg';
import { AnimalCard } from '../components/AnimalCard';
import { fetchAnimals, Animal } from '../data/animalsMock';
import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../useLanguage';
import Footer from '../components/Footer';

import './Home.css';

export default function Home() {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [loading, setLoading] = useState(true);
  const carouselRef = useRef<HTMLDivElement>(null);
  const { lang } = useLanguage();

  // Dicționarul complet pentru ambele limbi
  const t = {
    ro: {
      heroTag: "ADOPȚII DE ANIMALE ÎN IAȘI",
      heroTitle1: "Găsește-ți prietenul pe viață.",
      heroTitle2: "Oferă-i un cămin cald.",
      heroDesc: "Fiecare suflet merită o șansă. Explorează animalele disponibile pentru adopție în zona ta și fă un bine care îți va schimba viața.",
      btnAnimals: "Vezi animalele",
      btnAdopt: "Cum adopt?",
      categoriesTitle: "Pe cine cauți?",
      dogText: "Câini",
      catText: "Pisici",
      otherText: "Alte animale",
      carouselTitle: "Își caută familia acum",
      vaccine: "Vaccinat",
      deworm: "Deparazitat",
      sterile: "Sterilizat",
      viewAll: "Vezi toate",
      loading: "Se încarcă...",
      stepsTitle: "Adopția, în 4 pași simpli",
      stepsSubtitle: "Fără drumuri inutile și fără mesaje rămase fără răspuns.",
      step1Title: "Găsește-ți prietenul",
      step1Text: "Folosește filtrele și salvează-ți favoritele.",
      step2Title: "Programează o vizită",
      step2Text: "Alegi ziua și ora direct din pagina animalului. Adăpostul îți confirmă.",
      step3Title: "Cunoașteți-vă",
      step3Text: "Mergi la adăpost, petreci timp cu animalul și pui toate întrebările.",
      step4Title: "Mergeți acasă",
      step4Text: "Semnezi contractul de adopție și primești sfaturi pentru primele zile.",
      bannerText: "Nu știi cum să adopți?",
      bannerHighlight: "Intră aici",
      guideBtn: "Ghidul adoptatorului →"
    },
    en: {
      heroTag: "ANIMAL ADOPTIONS IN IASI",
      heroTitle1: "Find your lifelong friend.",
      heroTitle2: "Give them a warm home.",
      heroDesc: "Every soul deserves a chance. Explore available pets for adoption in your area and do a good deed that will change your life.",
      btnAnimals: "View pets",
      btnAdopt: "How to adopt?",
      categoriesTitle: "Who are you looking for?",
      dogText: "Dogs",
      catText: "Cats",
      otherText: "Other pets",
      carouselTitle: "Looking for a family now",
      vaccine: "Vaccinated",
      deworm: "Dewormed",
      sterile: "Sterilized",
      viewAll: "View all",
      loading: "Loading...",
      stepsTitle: "Adoption in 4 simple steps",
      stepsSubtitle: "No unnecessary trips and no unanswered messages.",
      step1Title: "Find your friend",
      step1Text: "Use the filters and save your favorites.",
      step2Title: "Schedule a visit",
      step2Text: "Choose the day and time directly from the pet's page. The shelter will confirm.",
      step3Title: "Get to know each other",
      step3Text: "Go to the shelter, spend time with the pet and ask all your questions.",
      step4Title: "Go home",
      step4Text: "Sign the adoption contract and get advice for the first few days.",
      bannerText: "Don't know how to adopt?",
      bannerHighlight: "Click here",
      guideBtn: "Adopter's Guide →"
    }
  };

  useEffect(() => {
    fetchAnimals().then((data) => {
      setAnimals(data);
      setLoading(false);
    });
  }, []);

  const handleScroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = 320;
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      <div className="home-page">
        <Header />
        
        {/* Secțiunea Hero */}
        <main className="hero-section">
          <div className="hero-content">
            <span className="hero-tag">{t[lang].heroTag}</span>
            
            <h1 className="hero-title">
              {t[lang].heroTitle1}
              <span className="hero-title-gold">{t[lang].heroTitle2}</span>
            </h1>
            
            <p className="hero-description">
              {t[lang].heroDesc}
            </p>
            
            <div className="hero-buttons">
              <Link to="/catalog" className="btn-primary">
                {t[lang].btnAnimals}
              </Link>
              
              <Link to="/ghidul-adoptatorului" className="btn-secondary">
                {t[lang].btnAdopt}
              </Link>
            </div>
          </div>

          <div className="hero-image-container">
            <img src={sectiune12} alt="Oameni cu animale adoptate" className="hero-image" />
          </div>
        </main>

        {/* Secțiunea Pe cine cauți? */}
        <section className="categories-section">
          <div className="categories-header">
            <h2 className="categories-title">{t[lang].categoriesTitle}</h2>
          </div>

          <div className="categories-cards">
            <div className="category-card active">
              <div className="category-icon">
                <img src={dogIcon} alt="Câini" />
              </div>
              <span>{t[lang].dogText}</span>
            </div>

            <div className="category-card active">
              <div className="category-icon">
                <img src={catIcon} alt="Pisici" />
              </div>
              <span>{t[lang].catText}</span>
            </div>

            <div className="category-card active">
              <div className="category-icon">
                <img src={otherIcon} alt="Alte animale" />
              </div>
              <span>{t[lang].otherText}</span>
            </div>
          </div>
          
          <section className="carousel-section">
            {/* Antetul secțiunii */}
            <div className="carousel-header">
              <div className="carousel-header-left">
                <h2 className="carousel-title">{t[lang].carouselTitle}</h2>
                <div className="carousel-legend">
                  <span className="legend-item">
                    <img src={vaccineIcon} alt="Vaccinat" /> {t[lang].vaccine}
                  </span>
                  <span className="legend-item">
                    <img src={dewormIcon} alt="Deparazitat" /> {t[lang].deworm}
                  </span>
                  <span className="legend-item">
                    <img src={sterileIcon} alt="Sterilizat" /> {t[lang].sterile}
                  </span>
                </div>
              </div>

              <Link to="/catalog" className="btn-view-all">
                {t[lang].viewAll}
              </Link>
            </div>

            <div className="carousel-section">
              <div className="carousel-wrapper" style={{ display: 'flex', alignItems: 'center', width: '100%', gap: '15px' }}>
                <button className="carousel-arrow left" onClick={() => handleScroll('left')}>
                  &larr;
                </button>

                <div className="carousel-cards-track" ref={carouselRef}>
                  {loading ? (
                    <p>{t[lang].loading}</p>
                  ) : (
                    animals.map((animal) => (
                      <AnimalCard key={animal.id} animal={animal} />
                    ))
                  )}
                </div>

                <button className="carousel-arrow right" onClick={() => handleScroll('right')}>
                  &rarr;
                </button>
              </div>
            </div>
          </section>
        </section>

        {/* Secțiunea Adopția în 4 pași simpli */}
        <section className="steps-section">
          <h2 className="steps-title">{t[lang].stepsTitle}</h2>
          <p className="steps-subtitle">
            {t[lang].stepsSubtitle}
          </p>

          {/* Cadranele celor 4 pași */}
          <div className="steps-grid">
            <div className="step-card">
              <div className="step-badge">1</div>
              <h3 className="step-card-title">{t[lang].step1Title}</h3>
              <p className="step-card-text">
                {t[lang].step1Text}
              </p>
            </div>

            <div className="step-card">
              <div className="step-badge">2</div>
              <h3 className="step-card-title">{t[lang].step2Title}</h3>
              <p className="step-card-text">
                {t[lang].step2Text}
              </p>
            </div>

            <div className="step-card">
              <div className="step-badge">3</div>
              <h3 className="step-card-title">{t[lang].step3Title}</h3>
              <p className="step-card-text">
                {t[lang].step3Text}
              </p>
            </div>

            <div className="step-card">
              <div className="step-badge">4</div>
              <h3 className="step-card-title">{t[lang].step4Title}</h3>
              <p className="step-card-text">
                {t[lang].step4Text}
              </p>
            </div>
          </div>
          
          <div className="steps-banner">
            <h3 className="steps-banner-text">
              {t[lang].bannerText} <span className="highlight-gold">{t[lang].bannerHighlight}</span>
            </h3>
            <Link to="/ghidul-adoptatorului" className="btn-guide">
              {t[lang].guideBtn}
            </Link>
          </div>
        </section>

        <Footer />
      </div>

      {/* Butonul de chatbot */}
      <button className="footer-floating-btn" aria-label="Asistență">
        💬
      </button>
    </>
  );
}