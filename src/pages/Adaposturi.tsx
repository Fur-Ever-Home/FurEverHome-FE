import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FloatingBtn from '../components/floating-btn';
import { API_BASE_URL } from '../config';
import searchIconImg from '../assets/iconiță căutare.png';
import { useLanguage } from '../useLanguage';
import { shelterTranslations } from '../shelterTranslations';
import './Adaposturi.css';

interface Shelter {
  id: number;
  name: string;
  county: string;
  city: string;
  address?: string;
  phone?: string;
  typeLabel?: string;
  animalsCount?: number;
  catsCount?: number;
  dogsCount?: number;
  otherCount?: number;
  animalsType?: string[];
  schedule?: string;
  email?: string;
  capacity?: string;
  socialLinks?: {
    whatsapp?: string;
    instagram?: string;
    facebook?: string;
  };
}

export default function Adaposturi() {
  const { lang } = useLanguage();
  const t = shelterTranslations[lang] || shelterTranslations.ro;

  const [shelters, setShelters] = useState<Shelter[]>([]);
  const [loading, setLoading] = useState(true);

  // Stări pentru filtre și căutare
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCounty, setSelectedCounty] = useState('Iași');
  const [selectedCity, setSelectedCity] = useState('Iași');
  const [selectedAnimalTypes, setSelectedAnimalTypes] = useState<string[]>([]);

  // Stare pentru cardurile întoarse
  const [flippedCards, setFlippedCards] = useState<number[]>([]);

  // Stare pentru zoom-ul hărții
  const [mapScale, setMapScale] = useState(1);

  // Conexiunea directă la backend 
  useEffect(() => {
    const url = `${API_BASE_URL}/api/shelters`;

    setLoading(true);
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const formattedData = data.map((item: any, index: number) => ({
          ...item,
          address: item.address || `Str. Exemplu ${index + 1}, Iași`,
          phone: item.phone || `0232 000 10${index}`,
          typeLabel: item.typeLabel || `Adăpost · ${item.city || 'Iași'}`,
          catsCount: item.catsCount ?? 10,
          dogsCount: item.dogsCount ?? 12,
          otherCount: item.otherCount ?? 2,
          animalsCount: item.animalsCount ?? 24,
          animalsType: item.animalsType || ['Pisici', 'Căței'],
          schedule: item.schedule || 'Zilnic, 10:00 – 18:00',
          email: item.email || `contact@adapost-${index + 1}.ro`,
          capacity: item.capacity || '60 de locuri',
          socialLinks: item.socialLinks || {
            whatsapp: '#',
            instagram: '#',
            facebook: '#'
          }
        }));
        setShelters(formattedData);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Eroare la preluarea adăposturilor de la backend:', error);
        setShelters([
          { 
            id: 24, 
            name: 'Adăpostul Lăbuțe din Copou', 
            county: 'Iași', 
            city: 'Iași', 
            address: 'Str. Exemplu 12, Copou', 
            phone: '0232 000 101', 
            typeLabel: 'Adăpost · Copou', 
            animalsCount: 24, 
            catsCount: 14, 
            dogsCount: 10, 
            otherCount: 0, 
            animalsType: ['Pisici', 'Căței'],
            schedule: 'Zilnic, 10:00 – 18:00',
            email: 'contact@labute-copou.ro',
            capacity: '60 de locuri',
            socialLinks: { whatsapp: '#', instagram: '#', facebook: '#' }
          },
          { 
            id: 9, 
            name: 'Centrul Prietenii Blănoși', 
            county: 'Iași', 
            city: 'Iași', 
            address: 'Șos. Exemplu 45, Tătărași', 
            phone: '0232 000 102', 
            typeLabel: 'Centru de adopție · Tătărași', 
            animalsCount: 17, 
            catsCount: 0, 
            dogsCount: 12, 
            otherCount: 5, 
            animalsType: ['Căței', 'Alte animale'],
            schedule: 'Luni - Sâmbătă, 09:00 – 17:00',
            email: 'contact@prieteniiblanosi.ro',
            capacity: '45 de locuri',
            socialLinks: { whatsapp: '#', instagram: '#', facebook: '#' }
          },
          { 
            id: 31, 
            name: 'Adăpostul Casa Speranței', 
            county: 'Iași', 
            city: 'Iași', 
            address: 'Str. Exemplu 7, Păcurari', 
            phone: '0232 000 103', 
            typeLabel: 'Adăpost · Păcurari', 
            animalsCount: 31, 
            catsCount: 11, 
            dogsCount: 15, 
            otherCount: 5, 
            animalsType: ['Pisici', 'Căței', 'Alte animale'],
            schedule: 'Zilnic, 08:00 – 19:00',
            email: 'contact@casasperantei.ro',
            capacity: '80 de locuri',
            socialLinks: { whatsapp: '#', instagram: '#', facebook: '#' }
          },
          { 
            id: 17, 
            name: 'Refugiul Patrupezilor', 
            county: 'Iași', 
            city: 'Iași', 
            address: 'Str. Exemplu 31, Nicolina', 
            phone: '0232 000 104', 
            typeLabel: 'Adăpost · Nicolina', 
            animalsCount: 12, 
            catsCount: 12, 
            dogsCount: 0, 
            otherCount: 0, 
            animalsType: ['Pisici'],
            schedule: 'Luni - Vineri, 10:00 – 16:00',
            email: 'contact@refugiulpatrupezilor.ro',
            capacity: '30 de locuri',
            socialLinks: { whatsapp: '#', instagram: '#', facebook: '#' }
          },
          { 
            id: 12, 
            name: 'Centrul Mustăcioții', 
            county: 'Iași', 
            city: 'Iași', 
            address: 'Bd. Exemplu 3, Alexandru cel Bun', 
            phone: '0232 000 105', 
            typeLabel: 'Centru de adopție · Alexandru', 
            animalsCount: 9, 
            catsCount: 4, 
            dogsCount: 0, 
            otherCount: 5, 
            animalsType: ['Pisici', 'Alte animale'],
            schedule: 'Zilnic, 09:00 – 18:00',
            email: 'contact@mustaciotii.ro',
            capacity: '25 de locuri',
            socialLinks: { whatsapp: '#', instagram: '#', facebook: '#' }
          }
        ]);
        setLoading(false);
      });
  }, []);

  const toggleAnimalType = (type: string) => {
    setSelectedAnimalTypes((prev) =>
      prev.includes(type) 
        ? prev.filter((item) => item !== type) 
        : [...prev, type] 
    );
  };

  const handleFlipCard = (shelterId: number) => {
    setFlippedCards((prev) => 
      prev.includes(shelterId) ? prev.filter(id => id !== shelterId) : [...prev, shelterId]
    );
  };

  const filteredShelters = shelters.filter((shelter) => {
    const matchesSearch = shelter.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCounty = selectedCounty ? shelter.county === selectedCounty : true;
    const matchesCity = selectedCity ? shelter.city === selectedCity : true;
    
    const matchesAnimal = selectedAnimalTypes.length > 0
      ? selectedAnimalTypes.some((type) => shelter.animalsType?.includes(type))
      : true;

    return matchesSearch && matchesCounty && matchesCity && matchesAnimal;
  });

  const totalAnimalsFiltered = filteredShelters.reduce((acc, shelter) => {
    if (selectedAnimalTypes.length === 0) {
      return acc + (shelter.animalsCount ?? ((shelter.catsCount || 0) + (shelter.dogsCount || 0) + (shelter.otherCount || 0)));
    } else {
      let subTotal = 0;
      if (selectedAnimalTypes.includes('Pisici')) subTotal += shelter.catsCount || 0;
      if (selectedAnimalTypes.includes('Căței')) subTotal += shelter.dogsCount || 0;
      if (selectedAnimalTypes.includes('Altele')) subTotal += shelter.otherCount || 0;
      return acc + subTotal;
    }
  }, 0);

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedCounty('Iași');
    setSelectedCity('Iași');
    setSelectedAnimalTypes([]);
  };

  const handleZoomIn = () => setMapScale((prev) => Math.min(prev + 0.1, 1.3));
  const handleZoomOut = () => setMapScale((prev) => Math.max(prev - 0.1, 0.9));

  const handlePinClick = (shelterId: number) => {
    console.log(`S-a dat click pe pinul cu ID-ul: ${shelterId}`);
  };

  const handleViewAnimals = (shelterId: number, shelterName: string) => {
    console.log(`Vezi animalele pentru adăpostul: ${shelterName} (ID: ${shelterId})`);
  };

  // Helper pentru formata stringurile cu acolade ex: {count}
  const formatText = (template: string, values: { [key: string]: any }) => {
    return template.replace(/{(\w+)}/g, (_, key) => values[key] !== undefined ? values[key] : '');
  };

  const getCountText = (template: string, count: number) => {
    if (lang === 'ro') {
      const text = count === 1 ? (count === 1 && template.includes('animal găsit') ? 'animal găsit' : 'animal disponibil') : (template.includes('găsite') ? 'animale găsite' : 'animale disponibile');
      return `${count} ${text}`;
    } else {
      const text = count === 1 ? (template.includes('found') ? 'animal found' : 'animal available') : (template.includes('found') ? 'animals found' : 'animals available');
      return `${count} ${text}`;
    }
  };

  return (
    <>
      <div className="adaposturi-page">
        <Header />
        
        {/* Prima secțiune: Antet, Căutare, Filtre și Contor */}
        <section className="adaposturi-hero-section">
          <div className="adaposturi-header-text">
            <h1>{t.sheltersTitle}</h1>
          </div>

          <div className="adaposturi-filters-container">
            <div className="adaposturi-filters-top">
              
              {/* Input căutare după nume */}
              <div className="adaposturi-search-wrapper">
                <img 
                  src={searchIconImg} 
                  alt="Căutare" 
                  className="search-icon-img" 
                />
                <input 
                  type="text"
                  placeholder={t.searchShelterPlaceholder}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Dropdown Județ */}
              <select 
                value={selectedCounty}
                onChange={(e) => setSelectedCounty(e.target.value)}
                className="adaposturi-select"
              >
                <option value="Iași">{t.filterCountyLabel}</option>
              </select>

              {/* Dropdown Oraș */}
              <select 
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="adaposturi-select"
              >
                <option value="Iași">{t.filterCityIasi}</option>
                <option value="Pașcani">{t.filterCityPascani}</option>
              </select>

              {/* Buton resetare filtre */}
              <button onClick={handleResetFilters} className="adaposturi-reset-btn">
                {t.resetFiltersBtn}
              </button>
            </div>

            <div className="adaposturi-filters-bottom">
              <div className="animal-type-filters">
                <span className="filter-label">{t.availableAnimalsLabel}</span>

                <button 
                  onClick={() => toggleAnimalType('Pisici')}
                  className={`filter-pill ${selectedAnimalTypes.includes('Pisici') ? 'active' : ''}`}
                >
                  {selectedAnimalTypes.includes('Pisici') ? '✓ ' : ''}{t.filterCat}
                </button>

                <button 
                  onClick={() => toggleAnimalType('Căței')}
                  className={`filter-pill ${selectedAnimalTypes.includes('Căței') ? 'active' : ''}`}
                >
                  {selectedAnimalTypes.includes('Căței') ? '✓ ' : ''}{t.filterDog}
                </button>

                <button 
                  onClick={() => toggleAnimalType('Altele')}
                  className={`filter-pill ${selectedAnimalTypes.includes('Altele') ? 'active' : ''}`}
                >
                  {selectedAnimalTypes.includes('Altele') ? '✓ ' : ''}{t.filterOther}
                </button>
              </div>

              {/* Contor dinamic tradus */}
              <div className="adaposturi-counter">
                {loading ? (lang === 'ro' ? 'Se încarcă...' : 'Loading...') : getCountText(t.animalsFoundCount, totalAnimalsFiltered)}
              </div>
            </div>
          </div>
        </section>

        {/* Secțiunea Principală: Hartă + Carduri */}
        <section className="adaposturi-main-layout">
          
          {/* Partea Stângă: Harta Schematică */}
          <div className="schematic-map-container">
            <div className="map-viewport" style={{ transform: `scale(${mapScale})`, transition: 'transform 0.3s ease' }}>
              
              <span className="map-zone zone-copou">{t.mapZoneCopou}</span>
              <span className="map-zone zone-pacurari">{t.mapZonePacurari}</span>
              <span className="map-zone zone-centru">{t.mapZoneCentru}</span>
              <span className="map-zone zone-tatarasi">{t.mapZoneTatarasi}</span>
              <span className="map-river">{t.mapRiver}</span>
              
              <button className="map-pin pin-24" onClick={() => handlePinClick(24)}><span>24</span></button>
              <button className="map-pin pin-9" onClick={() => handlePinClick(9)}><span>9</span></button>
              <button className="map-pin pin-12" onClick={() => handlePinClick(12)}><span>12</span></button>
              <button className="map-pin pin-31" onClick={() => handlePinClick(31)}><span>31</span></button>
              <button className="map-pin pin-17" onClick={() => handlePinClick(17)}><span>17</span></button>
              
              <div className="map-footer-text">{t.mapFooterText}</div>
            </div>

            <div className="map-zoom-controls">
              <button onClick={handleZoomIn}>+</button>
              <button onClick={handleZoomOut}>-</button>
            </div>
          </div>

          {/* Partea Dreaptă: Lista de Carduri */}
          <div className="shelters-cards-sidebar">
            {loading ? (
              <p style={{ textAlign: 'center', color: '#665c52', padding: '20px' }}>{lang === 'ro' ? 'Se încarcă adăposturile...' : 'Loading shelters...'}</p>
            ) : filteredShelters.length === 0 ? (
              <p style={{ textAlign: 'center', color: '#665c52', padding: '20px' }}>{lang === 'ro' ? 'Nu a fost găsit niciun adăpost conform filtrelor.' : 'No shelters found matching filters.'}</p>
            ) : (
              filteredShelters.map((shelter) => {
                const firstLetter = shelter.name ? shelter.name.charAt(0) : 'A';
                const isFlipped = flippedCards.includes(shelter.id);
                
                let dynamicCount = 0;
                if (selectedAnimalTypes.length === 0) {
                  dynamicCount = shelter.animalsCount ?? ((shelter.catsCount || 0) + (shelter.dogsCount || 0) + (shelter.otherCount || 0));
                } else {
                  if (selectedAnimalTypes.includes('Pisici')) dynamicCount += shelter.catsCount || 0;
                  if (selectedAnimalTypes.includes('Căței')) dynamicCount += shelter.dogsCount || 0;
                  if (selectedAnimalTypes.includes('Altele')) dynamicCount += shelter.otherCount || 0;
                }

                const activeTypes = shelter.animalsType || [];
                const displayedTypes = selectedAnimalTypes.length > 0
                  ? activeTypes.filter((tType) => selectedAnimalTypes.includes(tType))
                  : [];
                const animalsText = displayedTypes.join(' · ');

                return (
                  <div className={`shelter-card-container ${isFlipped ? 'flipped' : ''}`} key={shelter.id}>
                    <div className="shelter-card-inner">
                      
                      {/* FAȚA CARDULUI */}
                      <div className="shelter-card shelter-card-front">
                        <div className="shelter-card-header">
                          <div className="shelter-avatar">{firstLetter}</div>
                          <div className="shelter-titles">
                            <h3>{shelter.name}</h3>
                            <span className="shelter-subtitle">{shelter.typeLabel}</span>
                          </div>
                        </div>

                        <div className="shelter-card-info">
                          <div className="info-row">
                            <span className="info-label">{t.addressLabel}</span>
                            <span className="info-val">{shelter.address}</span>
                          </div>
                          <div className="info-row">
                            <span className="info-label">{t.phoneLabel}</span>
                            <span className="info-val">{shelter.phone}</span>
                          </div>
                        </div>

                        <div className="shelter-badge-row">
                          <span className="shelter-green-badge">
                            {getCountText(t.animalsAvailableBadge, dynamicCount)}
                          </span>
                          {animalsText && (
                            <span className="shelter-animals-list">{animalsText}</span>
                          )}
                        </div>

                        <div className="shelter-card-actions">
                          <button 
                            className="btn-vezi-animale"
                            onClick={() => handleViewAnimals(shelter.id, shelter.name)}
                          >
                            {t.viewAnimalsBtn}
                          </button>
                          <button 
                            className="btn-detalii"
                            onClick={() => handleFlipCard(shelter.id)}
                          >
                            <span className="info-icon">i</span> {t.detailsBtn}
                          </button>
                        </div>
                      </div>

                      {/* SPATELE CARDULUI */}
                      <div className="shelter-card shelter-card-back">
                        <div className="shelter-card-header-back">
                          <div className="shelter-avatar">{firstLetter}</div>
                          <div className="shelter-titles">
                            <h3>{shelter.name}</h3>
                          </div>
                          <button 
                            className="btn-inapoi"
                            onClick={() => handleFlipCard(shelter.id)}
                          >
                            {t.backBtn}
                          </button>
                        </div>

                        <div className="shelter-card-info">
                          <div className="info-row">
                            <span className="info-label">{t.scheduleLabel}</span>
                            <span className="info-val">{shelter.schedule}</span>
                          </div>
                          <div className="info-row">
                            <span className="info-label">{t.emailLabel}</span>
                            <span className="info-val">{shelter.email}</span>
                          </div>
                          <div className="info-row">
                            <span className="info-label">{t.capacityLabel}</span>
                            <span className="info-val">{shelter.capacity}</span>
                          </div>
                        </div>

                        <div className="social-contact-section">
                          <span className="social-contact-title">{t.quickContactTitle}</span>
                          <div className="social-buttons-row">
                            <a href={shelter.socialLinks?.whatsapp || '#'} className="social-btn whatsapp-btn" target="_blank" rel="noopener noreferrer">
                              <span className="soc-icon">W</span> {t.whatsappBtn}
                            </a>
                            <a href={shelter.socialLinks?.instagram || '#'} className="social-btn instagram-btn" target="_blank" rel="noopener noreferrer">
                              <span className="soc-icon">IG</span> {t.instagramBtn}
                            </a>
                            <a href={shelter.socialLinks?.facebook || '#'} className="social-btn facebook-btn" target="_blank" rel="noopener noreferrer">
                              <span className="soc-icon">f</span> {t.facebookBtn}
                            </a>
                          </div>
                        </div>

                        <div className="shelter-card-actions">
                          <button 
                            className="btn-vezi-animale"
                            onClick={() => handleViewAnimals(shelter.id, shelter.name)}
                          >
                            {t.viewAnimalsBtn}
                          </button>
                        </div>
                      </div>

                    </div>
                  </div>
                );
              })
            )}
          </div>

        </section>
      </div>

      <Footer />
      <FloatingBtn />
    </>
  );
}