import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FloatingBtn from '../components/floating-btn';
import { AnimalCard } from '../components/AnimalCard';
import { AnimalModal } from '../components/AnimalModal';
import { useLanguage } from '../useLanguage';
import { translations } from '../translations';
import dogIcon from '../assets/dog-icon.svg';
import './Catalog.css';
import FilterSidebar from '../components/FilterSidebar';

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
}

export default function Catalog() {
  const [searchParams] = useSearchParams();
  const categorieParam = searchParams.get('categorie');

  const { lang } = useLanguage();
  const t = translations[lang as keyof typeof translations] || translations.ro;

  const [animals, setAnimals] = useState<Animal[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAnimal, setSelectedAnimal] = useState<any | null>(null);
  const [sortOrder, setSortOrder] = useState('noi');

  useEffect(() => {
    let url = 'http://localhost:8080/api/animals';
    if (categorieParam) {
      url += `?species=${encodeURIComponent(categorieParam)}`;
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
  }, [categorieParam]);

  const animaleSortate = [...animals].sort((a, b) => {
    const dateA = new Date(a.date || a.createdAt || Date.now()).getTime();
    const dateB = new Date(b.date || b.createdAt || Date.now()).getTime();
    if (sortOrder === 'noi') {
      return dateB - dateA;
    }
    return dateA - dateB;
  });

  return (
    <div className="catalog-page">
      <Header />
      
      <div className="catalog-layout-container">
        {/* Spațiu dedicat pentru sidebar-ul de filtre din stânga */}
        <aside className="catalog-sidebar-filters">
          {/* Aici va lucra colegul tău pe viitor */}
        </aside>

        <main className="catalog-main-content">
          <div className="catalog-header-row">
            <h1 className="catalog-title">
              {lang === 'en' ? '84 friends are looking for a home' : `${animals.length} prieteni își caută o casă`}
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
          
          {categorieParam && (
            <div className="catalog-filter-badge">
              {lang === 'en' ? 'Active filter: Showing category' : 'Filtru activ: Se afișează categoria'} 
              <span className="catalog-filter-highlight">{categorieParam}</span>.
            </div>
          )}

          {/* GRID FIX DE 3 COLOANE PE RÂND */}
          <div className="catalog-cards-grid">
            {loading ? (
              <p className="catalog-message">{t.loading || 'Se încarcă animalele...'}</p>
            ) : animaleSortate.length === 0 ? (
              <p className="catalog-message">
                {lang === 'en' ? 'No animals found.' : 'Nu s-au găsit animale în baza de date.'}
              </p>
            ) : (
              animaleSortate.map((animal) => {
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
                    onClick={() => setSelectedAnimal(animalDataForModal)} 
                    className="catalog-card-item"
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
        </main>
      </div>

      {selectedAnimal && (
        <AnimalModal 
          animal={selectedAnimal} 
          onClose={() => setSelectedAnimal(null)} 
        />
      )}

      <Footer />
      <FloatingBtn />
    </div>
  );
}