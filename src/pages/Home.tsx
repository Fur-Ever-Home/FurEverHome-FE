import { Link } from 'react-router-dom';
import Header from '../components/Header';
import imagine from '../assets/sectiune1.2.png';
import dogIcon from '../assets/dog-icon.svg';
import catIcon from '../assets/cat-icon.svg';
import otherIcon from '../assets/other-icon.svg';
import vaccineIcon from '../assets/vaccine-icon.svg';
import dewormIcon from '../assets/deworm-icon.svg';
import sterileIcon from '../assets/sterile-icon.svg';
import { AnimalCard } from '../components/AnimalCard';
import React, { useState, useEffect, useRef } from 'react';
import Footer from '../components/Footer';
import './Home.css';

// Importăm hook-ul de limbă și dicționarul creat de noi
import { useLanguage } from '../useLanguage';
import { translations } from '../translations';

interface Animal {
  id: number;
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
  imageUrl: string;
}

export default function Home() {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSpecies, setSelectedSpecies] = useState<string>('');
  const carouselRef = useRef<HTMLDivElement>(null);

  // Preluăm limba curentă (ro sau en)
  const { lang } = useLanguage();
  const t = translations[lang];

  useEffect(() => {
    let url = 'http://localhost:8080/api/animals';
    if (selectedSpecies) {
      url += `?species=${encodeURIComponent(selectedSpecies)}`;
    }

    setLoading(true);
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setAnimals(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Eroare la preluarea animalelor:', error);
        setLoading(false);
      });
  }, [selectedSpecies]);

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
            <span className="hero-tag">{t.heroTag}</span>
            
            <h1 className="hero-title">
              {t.heroTitle} <br />
              <span className="hero-title-gold">{t.heroTitleGold}</span>
            </h1>
            
            <p className="hero-description">{t.heroDesc}</p>
            
            <div className="hero-buttons">
              <Link to="/catalog" className="btn-primary">{t.btnViewAnimals}</Link>
              <Link to="/ghidul-adoptatorului" className="btn-secondary">{t.btnHowToAdopt}</Link>
            </div>
          </div>

          <div className="hero-image-container">
            <img src={imagine} alt="Oameni cu animale adoptate" className="hero-image" />
          </div>
        </main>

        {/* Secțiunea Pe cine cauți? */}
        <section className="categories-section">
          <div className="categories-header">
            <h2 className="categories-title">{t.categoriesTitle}</h2>
          </div>

          <div className="categories-cards">
            <div 
              className={`category-card ${selectedSpecies === 'Caine' ? 'active' : ''}`}
              onClick={() => setSelectedSpecies(selectedSpecies === 'Caine' ? '' : 'Caine')}
              style={{ cursor: 'pointer' }}
            >
              <div className="category-icon">
                <img src={dogIcon} alt="Câini" />
              </div>
              <span>{t.catDogs}</span>
            </div>

            <div 
              className={`category-card ${selectedSpecies === 'Pisica' ? 'active' : ''}`}
              onClick={() => setSelectedSpecies(selectedSpecies === 'Pisica' ? '' : 'Pisica')}
              style={{ cursor: 'pointer' }}
            >
              <div className="category-icon">
                <img src={catIcon} alt="Pisici" />
              </div>
              <span>{t.catCats}</span>
            </div>
           
            <div 
              className={`category-card ${selectedSpecies === 'Altele' ? 'active' : ''}`}
              onClick={() => setSelectedSpecies(selectedSpecies === 'Altele' ? '' : 'Altele')}
              style={{ cursor: 'pointer' }}
            >   
              <div className="category-icon">
                <img src={otherIcon} alt="Alte animale" />
              </div>
              <span>{t.catOther}</span>
            </div>
          </div>
        </section>

        {/* Secțiunea Carousel */}
        <section className="carousel-section">
          <div className="carousel-header">
            <div className="carousel-header-left">
              <h2 className="carousel-title">{t.carouselTitle}</h2>
              <div className="carousel-legend">
                <span className="legend-item"><img src={vaccineIcon} alt="Vaccinat" /> {t.legendVaccinated}</span>
                <span className="legend-item"><img src={dewormIcon} alt="Deparazitat" /> {t.legendDewormed}</span>
                <span className="legend-item"><img src={sterileIcon} alt="Sterilizat" /> {t.legendSterilized}</span>
              </div>
            </div>

            <Link to="/catalog" className="btn-view-all">{t.btnViewAll}</Link>
          </div>

          <div className="carousel-wrapper" style={{ display: 'flex', alignItems: 'center', width: '100%', gap: '15px' }}>
            <button className="carousel-arrow left" onClick={() => handleScroll('left')}>&larr;</button>

            <div className="carousel-cards-track" ref={carouselRef}>
              {loading ? (
                <p>{t.loading}</p>
              ) : (
                animals.map((animal) => (
                  <AnimalCard 
                    key={animal.id} 
                    animal={{ 
                      ...animal, 
                      imageUrl: animal.imageUrl && animal.imageUrl.trim() !== "" ? animal.imageUrl : dogIcon,
                      image: animal.imageUrl && animal.imageUrl.trim() !== "" ? animal.imageUrl : dogIcon
                    } as any} 
                  />
                ))
              )}
            </div>

            <button className="carousel-arrow right" onClick={() => handleScroll('right')}>&rarr;</button>
          </div>
        </section>

        {/* Secțiunea Adopția în 4 pași simpli */}
        <section className="steps-section">
          <h2 className="steps-title">{t.stepsTitle}</h2>
          <p className="steps-subtitle">{t.stepsSubtitle}</p>

          <div className="steps-grid">
            <div className="step-card">
              <div className="step-badge">1</div>
              <h3 className="step-card-title">{t.step1Title}</h3>
              <p className="step-card-text">{t.step1Text}</p>
            </div>

            <div className="step-card">
              <div className="step-badge">2</div>
              <h3 className="step-card-title">{t.step2Title}</h3>
              <p className="step-card-text">{t.step2Text}</p>
            </div>

            <div className="step-card">
              <div className="step-badge">3</div>
              <h3 className="step-card-title">{t.step3Title}</h3>
              <p className="step-card-text">{t.step3Text}</p>
            </div>

            <div className="step-card">
              <div className="step-badge">4</div>
              <h3 className="step-card-title">{t.step4Title}</h3>
              <p className="step-card-text">{t.step4Text}</p>
            </div>
          </div>

          <div className="steps-banner">
            <h3 className="steps-banner-text">
              {t.bannerText} <span className="highlight-gold">{t.bannerHighlight}</span>
            </h3>
            <Link to="/ghidul-adoptatorului" className="btn-guide">
              {t.btnGuide}
            </Link>
          </div>
        </section>

        <Footer />
      </div>

      <button className="footer-floating-btn" aria-label={t.chatbotAria}>
        💬
      </button>
    </>
  );
}