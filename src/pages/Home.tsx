import { Link } from 'react-router-dom';
import Header from '../components/Header';
import heroImage from '../assets/sectiune_1.png';
import dogIcon from '../assets/dog-icon.svg';
import catIcon from '../assets/cat-icon.svg';
import otherIcon from '../assets/other-icon.svg';
import vaccineIcon from '../assets/vaccine-icon.svg';
import dewormIcon from '../assets/deworm-icon.svg';
import sterileIcon from '../assets/sterile-icon.svg';
import { AnimalCard } from '../components/AnimalCard';
import { fetchAnimals, Animal } from '../data/animalsMock';
import React, { useState, useEffect, useRef } from 'react';
import Footer from '../components/Footer';


import './Home.css';
export default function Home() {

  const [animals, setAnimals] = useState<Animal[]>([]);
const [loading, setLoading] = useState(true);
const carouselRef = useRef<HTMLDivElement>(null);

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
    <div className="home-page">
      <Header />
      
      {/* Secțiunea Hero */}
      <main className="hero-section">
        <div className="hero-content">
          <span className="hero-tag">ADOPȚII DE ANIMALE ÎN IAȘI</span>
          
          <h1 className="hero-title">
            Găsește-ți prietenul pe viață.
            <span className="hero-title-gold">Oferă-i un cămin cald.</span>
          </h1>
          
          <p className="hero-description">
            Fiecare suflet merită o șansă. Explorează animalele disponibile pentru adopție în zona ta și fă un bine care îți va schimba viața.
          </p>
          
          <div className="hero-buttons">
            <Link to="/catalog" className="btn-primary">
              Vezi animalele
            </Link>
            
            <Link to="/ghidul-adoptatorului" className="btn-secondary">
              Cum adopt?
            </Link>
          </div>
        </div>

        <div className="hero-image-container">
          <img src={heroImage} alt="Oameni cu animale adoptate" className="hero-image" />
        </div>
      </main>

      {/* Secțiunea Pe cine cauți? */}
      <section className="categories-section">
        <div className="categories-header">
          <h2 className="categories-title">Pe cine cauți?</h2>
          <Link to="/catalog" className="btn-view-all">
            Vezi toate
          </Link>
        </div>

        <div className="categories-cards">
          <Link to="/catalog?categorie=caini" className="category-card active">
            <div className="category-icon">
              <img src={dogIcon} alt="Câini" />
            </div>
            <span>Câini</span>
          </Link>

          <Link to="/catalog?categorie=pisici" className="category-card">
            <div className="category-icon">
              <img src={catIcon} alt="Pisici" />
            </div>
            <span>Pisici</span>
          </Link>

          <Link to="/catalog?categorie=altele" className="category-card">
            <div className="category-icon">
              <img src={otherIcon} alt="Alte animale" />
            </div>
            <span>Alte animale</span>
          </Link>
        </div>
      
      
      <section className="carousel-section">
  {/* Antetul secțiunii */}
  <div className="carousel-header">
    <div className="carousel-header-left">
      <h2 className="carousel-title">Își caută familia acum</h2>
      <div className="carousel-legend">
        <span className="legend-item">
          <img src={vaccineIcon} alt="Vaccinat" /> Vaccinat
        </span>
        <span className="legend-item">
          <img src={dewormIcon} alt="Deparazitat" /> Deparazitat
        </span>
        <span className="legend-item">
          <img src={sterileIcon} alt="Sterilizat" /> Sterilizat
        </span>
      </div>
    </div>

    <Link to="/catalog" className="btn-view-all">
      Vezi toate
    </Link>
  </div>

 <div className="carousel-section">
  <div className="carousel-wrapper" style={{ display: 'flex', alignItems: 'center', width: '100%', gap: '15px' }}>
    <button className="carousel-arrow left" onClick={() => handleScroll('left')}>
      &larr;
    </button>

    <div className="carousel-cards-track" ref={carouselRef}>
      {loading ? (
        <p>Se încarcă...</p>
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
        <h2 className="steps-title">Adopția, în 4 pași simpli</h2>
        <p className="steps-subtitle">
          Fără drumuri inutile și fără mesaje rămase fără răspuns.
        </p>

        {/* Cadranele celor 4 pași */}
        <div className="steps-grid">
          <div className="step-card">
            <div className="step-badge">1</div>
            <h3 className="step-card-title">Găsește-ți prietenul</h3>
            <p className="step-card-text">
              Folosește filtrele și salvează-ți favoritele.
            </p>
          </div>

          <div className="step-card">
            <div className="step-badge">2</div>
            <h3 className="step-card-title">Programează o vizită</h3>
            <p className="step-card-text">
              Alegi ziua și ora direct din pagina animalului. Adăpostul îți confirmă.
            </p>
          </div>

          <div className="step-card">
            <div className="step-badge">3</div>
            <h3 className="step-card-title">Cunoașteți-vă</h3>
            <p className="step-card-text">
              Mergi la adăpost, petreci timp cu animalul și pui toate întrebările.
            </p>
          </div>

          <div className="step-card">
            <div className="step-badge">4</div>
            <h3 className="step-card-title">Mergeți acasă</h3>
            <p className="step-card-text">
              Semnezi contractul de adopție și primești sfaturi pentru primele zile.
            </p>
          </div>
        </div>

        
        <div className="steps-banner">
          <h3 className="steps-banner-text">
            Nu știi cum să adopți? <span className="highlight-gold">Intră aici</span>
          </h3>
          <Link to="/ghidul-adoptatorului" className="btn-guide">
            Ghidul adoptatorului &rarr;
          </Link>
        </div>
      </section>
      <Footer />
    </div>
  );
}
  