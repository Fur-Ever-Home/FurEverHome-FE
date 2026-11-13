import { mockAnimals as animalsMock } from '../data/animalsMock';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import imagine from '../assets/sectiune1.2.png';
import dogIcon from '../assets/dog-icon.svg';
import catIcon from '../assets/cat-icon.svg';
import otherIcon from '../assets/other-icon.svg';
import vaccineIcon from '../assets/vaccinat.png';
import dewormIcon from '../assets/deparazitat.png';
import sterileIcon from '../assets/sterlizat.png';
import { AnimalCard } from '../components/AnimalCard';
import React, { useState, useEffect, useRef } from 'react';
import Footer from '../components/Footer';
import './Home.css';
import FloatingBtn from '../components/floating-btn';
import { AnimalModal } from "../components/AnimalModal";
import pawIcon from '../assets/paw.png';
import pillIcon from '../assets/pill.png';
import shieldIcon from '../assets/shield.png';

// Importăm hook-ul de limbă și dicționarul creat de noi
import { useLanguage } from '../useLanguage';
import { translations } from '../translations';
import { API_BASE_URL } from '../config';

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
  breed?: string;
  sex?: string;
  temperament?: string;
  color?: string;
  location?: string;
  locationType?: string;
  images?: string[];
  microchipped?: boolean;
  petFriendly?: boolean;
  childFriendly?: boolean;
  noAllergies?: boolean;
}

export default function Home() {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSpecies, setSelectedSpecies] = useState<string>('');
  
  // CORECTAT: Starea pentru modal mutat corect în interiorul componentei Home
  const [selectedAnimal, setSelectedAnimal] = useState<any | null>(null);

  const carouselRef = useRef<HTMLDivElement>(null);

  // Preluăm limba curentă (ro sau en)
  const { lang } = useLanguage();
  const t = translations[lang as keyof typeof translations] || translations.ro;

  useEffect(() => {
    let url = `${API_BASE_URL}/api/animals`;
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
        console.error('Eroare la preluarea animalelor (folosim date mock):', error);
        
        // Filtrare locală pe datele mock pentru câini/pisici/altele
        let filtered = animalsMock as any[];
        if (selectedSpecies) {
          filtered = filtered.filter(
            (item) => item.species?.toLowerCase() === selectedSpecies.toLowerCase()
          );
        }
        setAnimals(filtered);
        setLoading(false);
      });
  }, [selectedSpecies]);

  const handleScroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = 250;
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
        <main className="hero-section flex flex-col-reverse md:flex-row items-center justify-between p-4 md:p-12 gap-8">
          <div className="hero-content w-full md:w-1/2 text-center md:text-left">
            <span className="hero-tag">{t.heroTag}</span>
            
            <h1 className="hero-title">
              {t.heroTitle} <br />
              <span className="hero-title-gold">{t.heroTitleGold}</span>
            </h1>
            
            <p className="hero-description">{t.heroDesc}</p>
            
            {/* Clasă nouă dedicată pentru gruparea și distanțarea butoanelor */}
            <div className="hero-buttons">
              <Link to="/catalog" className="btn-primary">{t.btnViewAnimals}</Link>
              <Link to="/ghidul-adoptatorului" className="btn-secondary">{t.btnHowToAdopt}</Link>
            </div>
          </div>

          <div className="hero-image-container w-full md:w-1/2 flex justify-center">
            <img src={imagine} alt="Oameni cu animale adoptate" className="hero-image" />
          </div>
        </main>

        {/* Secțiunea Pe cine cauți? */}
        <section className="categories-section">
          <div className="categories-header">
            <h2 className="categories-title">{t.categoriesTitle}</h2>
          </div>

          <div className="categories-cards flex flex-wrap justify-center gap-4 p-2">
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
          <div className="carousel-header flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
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

          <div className="carousel-wrapper flex items-center w-full gap-2 md:gap-4 overflow-x-auto px-2">
            <button className="carousel-arrow left" onClick={() => handleScroll('left')}>&larr;</button>

            <div className="carousel-cards-track" ref={carouselRef}>
              {loading ? (
                <p>{t.loading}</p>
              ) : (
                animals.map((animal) => {
                  // Pregătim datele pentru modal (completând cu valori fallback dacă lipsesc din backend)
                  const animalDataForModal = {
                    ...animal,
                    breed: animal.breed || "Rasă comună",
                    sex: animal.gender || "Femelă",
                    age: animal.age || "1 an",
                    size: animal.size || "Medie",
                    temperament: animal.temperament || "Jucăuş",
                    color: animal.color || "Portocaliu",
                    location: animal.shelter || "Centrul Casa lui Azor",
                    locationType: "Centru",
                    status: animal.status || "Disponibil",
                    images: animal.images && animal.images.length > 0 
                      ? animal.images 
                      : [animal.imageUrl && animal.imageUrl.trim() !== "" ? animal.imageUrl : dogIcon],
                    microchipped: animal.microchipped ?? true,
                    petFriendly: animal.petFriendly ?? true,
                    childFriendly: animal.childFriendly ?? false,
                    noAllergies: animal.noAllergies ?? true,
                  };

                  return (
                    <div 
                      key={animal.id} 
                      className="carousel-card-item"
                      onClick={() => setSelectedAnimal(animalDataForModal)} 
                      style={{ cursor: 'pointer' }}
                    >
                      <AnimalCard 
                        animal={{ 
                          ...animal, 
                          imageUrl: animal.imageUrl && animal.imageUrl.trim() !== "" ? animal.imageUrl : dogIcon,
                          image: animal.imageUrl && animal.imageUrl.trim() !== "" ? animal.imageUrl : dogIcon
                        } as any} 
                      />
                    </div>
                  );
                })
              )}
            </div>

            <button className="carousel-arrow right" onClick={() => handleScroll('right')}>&rarr;</button>
          </div>
        </section>

        {/* Secțiunea Adopția în 4 pași simpli */}
        <section className="steps-section">
          <h2 className="steps-title">{t.stepsTitle}</h2>
          <p className="steps-subtitle">{t.stepsSubtitle}</p>

          <div className="steps-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
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

          <div className="steps-banner flex flex-col md:flex-row items-center justify-between text-center md:text-left gap-4 p-6 rounded-2xl">
            <h3 className="steps-banner-text">
              {t.bannerText} <span className="highlight-gold">{t.bannerHighlight}</span>
            </h3>
            <Link to="/ghidul-adoptatorului" className="btn-guide">
              {t.btnGuide}
            </Link>
          </div>
       </section>
       </div>

       {/* Randarea modalului atunci când un animal este selectat */}
       {selectedAnimal && (
         <AnimalModal 
           animal={selectedAnimal} 
           onClose={() => setSelectedAnimal(null)} 
         />
       )}

       <Footer />
       <FloatingBtn />
    </>
  );
}