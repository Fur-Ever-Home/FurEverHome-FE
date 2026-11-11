import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FloatingBtn from '../components/floating-btn';
import AnimalCard from '../components/AnimalCard';
import { AnimalModal } from '../components/AnimalModal';
import { useLanguage } from '../useLanguage';
import { translations } from '../translations';
import dogIcon from '../assets/dog-icon.svg';
import FilterSidebar, { FilterState } from '../components/FilterSidebar';
import './Catalog.css';

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
  date?: string;
  createdAt?: string;
  isDistanceAdoption?: boolean;
  needType?: string;
  fundingPercent?: number;
}

const initialFilterState: FilterState = {
  adoptionType: '',
  species: '',
  gender: '',
  size: '',
  ageGroup: '',
  temperament: '',
  healthState: '',
  color: '',
  county: '',
  shelter: '',
  locationType: '',
  petFriendly: false,
  childFriendly: false,
  noAllergies: false,
  microchipped: false,
  vaccinated: false,
  sterilized: false,
  dewormed: false,
};

export default function Catalog() {
  const [searchParams] = useSearchParams();
  const categorieParam = searchParams.get('categorie');
  const tipParam = searchParams.get('tip');

  const { lang } = useLanguage();
  const t = translations[lang as keyof typeof translations] || translations.ro;

  const [animals, setAnimals] = useState<Animal[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAnimal, setSelectedAnimal] = useState<any | null>(null);
  const [sortOrder, setSortOrder] = useState('noi');

  const [filters, setFilters] = useState<FilterState>({
    ...initialFilterState,
    adoptionType: tipParam === 'la_distanta' ? 'la_distanta' : '',
  });
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Ref pentru slider-ul orizontal pe mobil
  const mobileTrackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (categorieParam) {
      setFilters((prev) => ({ ...prev, species: categorieParam }));
    }
  }, [categorieParam]);

  const isDistanceMode = filters.adoptionType === 'la_distanta';

  const fetchAnimals = () => {
    setLoading(true);

    const queryParams = new URLSearchParams();
    if (filters.adoptionType) queryParams.append('adoptionType', filters.adoptionType);
    if (filters.species) queryParams.append('species', filters.species);
    if (filters.gender) queryParams.append('gender', filters.gender);
    if (filters.size) queryParams.append('size', filters.size);
    if (filters.shelter) queryParams.append('shelter', filters.shelter);
    if (filters.vaccinated) queryParams.append('vaccinated', 'true');
    if (filters.sterilized) queryParams.append('sterilized', 'true');
    if (filters.dewormed) queryParams.append('dewormed', 'true');

    const queryString = queryParams.toString();
    const url = `http://localhost:8080/api/animals${queryString ? `?${queryString}` : ''}`;

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
  };

  useEffect(() => {
    fetchAnimals();
  }, [categorieParam, filters.adoptionType]);

  const handleResetFilters = () => {
    setFilters(initialFilterState);
    fetchAnimals();
  };

  const animaleSortate = [...animals].sort((a, b) => {
    const dateA = new Date(a.date || a.createdAt || Date.now()).getTime();
    const dateB = new Date(b.date || b.createdAt || Date.now()).getTime();
    if (sortOrder === 'noi') {
      return dateB - dateA;
    }
    return dateA - dateB;
  });

  const handleMobileScroll = (direction: 'left' | 'right') => {
    if (mobileTrackRef.current) {
      const scrollAmount = 296; // Lățimea cardului (280px) + gap-ul (16px)
      mobileTrackRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="catalog-page">
      <Header />
      
      <div className="catalog-layout-container">
        
        <FilterSidebar
          filters={filters}
          onFilterChange={setFilters}
          onApply={fetchAnimals}
          onReset={handleResetFilters}
          totalResults={animaleSortate.length}
          isOpenMobile={isMobileFilterOpen}
          onCloseMobile={() => setIsMobileFilterOpen(false)}
        />

        <main className="catalog-main-content">
          
          <div className="catalog-mobile-filter-bar">
            <button 
              type="button" 
              className="btn-open-mobile-filters"
              onClick={() => setIsMobileFilterOpen(true)}
            >
              ⚙️ {lang === 'en' ? 'Filters' : 'Filtrează'} ({animaleSortate.length})
            </button>
          </div>

          <div className="catalog-header-row">
            <h1 className="catalog-title">
              {isDistanceMode
                ? (lang === 'en' ? `${animaleSortate.length} friends waiting for a sponsor` : `${animaleSortate.length} prieteni așteaptă un sponsor`)
                : (lang === 'en' ? `${animaleSortate.length} friends are looking for a home` : `${animaleSortate.length} prieteni își caută o casă`)}
            </h1>
            
            <div className="catalog-sort-wrapper">
              <label className="catalog-sort-label">
                {lang === 'en' ? 'Sort by:' : 'Sortează după:'}
              </label>
              <select 
                className="catalog-sort-select"
                value={sortOrder} 
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="noi">{lang === 'en' ? 'Newest' : 'Cele mai noi'}</option>
                <option value="vechi">{lang === 'en' ? 'Oldest' : 'Cele mai vechi'}</option>
              </select>
            </div>
          </div>

          {/* BANNER ADOPȚIE LA DISTANȚĂ TRADUS */}
          {isDistanceMode && (
            <div className="distance-banner-card">
              <div className="distance-banner-icon">🤎</div>
              <div className="distance-banner-text">
                <h3>{t.distanceBannerTitle || 'Adopția la distanță'}</h3>
                <p>{t.distanceBannerDesc || 'Sprijină îngrijirea, tratamentul și cazarea unui animal care nu mai poate fi adoptat fizic.'}</p>
              </div>
            </div>
          )}
          
          {filters.species && !isDistanceMode && (
            <div className="catalog-filter-badge">
              {lang === 'en' ? 'Active filter: Showing category' : 'Filtru activ: Se afișează categoria'}{' '}
              <span className="catalog-filter-highlight">{filters.species}</span>.
            </div>
          )}

          {/* RENDER DESKTOP (GRID DE COLOANE) */}
          <div className="catalog-cards-grid desktop-only-grid">
            {loading ? (
              <p className="catalog-message">{t.loading || 'Se încarcă animalele...'}</p>
            ) : animaleSortate.length === 0 ? (
              <p className="catalog-message">
                {lang === 'en' ? 'No animals found.' : 'Nu s-au găsit animale conform filtrelor selectate.'}
              </p>
            ) : (
              animaleSortate.map((animal) => {
                const animalDataForModal = {
                  ...animal,
                  breed: animal.breed || "Rasă comună",
                  sex: animal.gender || animal.sex || "Femelă",
                  age: animal.age || "1 an",
                  size: animal.size || "Medie",
                  temperament: animal.temperament || "Jucăuș",
                  color: animal.color || "Portocaliu",
                  location: animal.shelter || animal.location || "Centrul Casa lui Azor",
                  locationType: animal.locationType || "Centru",
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
                    onClick={() => setSelectedAnimal(animalDataForModal)} 
                    className="catalog-card-item"
                  >
                    <AnimalCard
                      animal={{ 
                        ...animal, 
                        imageUrl: animal.imageUrl && animal.imageUrl.trim() !== "" ? animal.imageUrl : dogIcon,
                        image: animal.imageUrl && animal.imageUrl.trim() !== "" ? animal.imageUrl : dogIcon
                      } as any}
                      isDistanceMode={isDistanceMode}
                    />
                  </div>
                );
              })
            )}
          </div>

          {/* RENDER MOBIL (SLIDER ORIZONTAL CU SĂGEȚI STÂNGA / DREAPTA) */}
          <div className="mobile-carousel-wrapper">
            <button 
              type="button" 
              className="mobile-arrow-btn left" 
              onClick={() => handleMobileScroll('left')}
              aria-label="Anterior"
            >
              ‹
            </button>

            <div className="mobile-cards-track" ref={mobileTrackRef}>
              {animaleSortate.map((animal) => {
                const animalDataForModal = {
                  ...animal,
                  breed: animal.breed || "Rasă comună",
                  sex: animal.gender || animal.sex || "Femelă",
                  age: animal.age || "1 an",
                  size: animal.size || "Medie",
                  temperament: animal.temperament || "Jucăuș",
                  color: animal.color || "Portocaliu",
                  location: animal.shelter || animal.location || "Centrul Casa lui Azor",
                  locationType: animal.locationType || "Centru",
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
                    onClick={() => setSelectedAnimal(animalDataForModal)} 
                    className="mobile-card-slide"
                  >
                    <AnimalCard 
                      animal={{ 
                        ...animal, 
                        imageUrl: animal.imageUrl && animal.imageUrl.trim() !== "" ? animal.imageUrl : dogIcon,
                        image: animal.imageUrl && animal.imageUrl.trim() !== "" ? animal.imageUrl : dogIcon
                      } as any}
                      isDistanceMode={isDistanceMode}
                    />
                  </div>
                );
              })}
            </div>

            <button 
              type="button" 
              className="mobile-arrow-btn right" 
              onClick={() => handleMobileScroll('right')}
              aria-label="Următor"
            >
              ›
            </button>
          </div>

        </main>
      </div>

      {selectedAnimal && (
        <AnimalModal 
          animal={selectedAnimal} 
          isOpen={!!selectedAnimal} 
          onClose={() => setSelectedAnimal(null)} 
        />
      )}

      <Footer />
      <FloatingBtn />
    </div>
  );
}