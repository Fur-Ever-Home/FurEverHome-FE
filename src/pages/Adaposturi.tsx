import { lazy, Suspense, useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FloatingBtn from '../components/floating-btn';
import type { ShelterMapPoint } from '../components/ShelterMap';
import { API_BASE_URL } from '../config';
import searchIconImg from '../assets/iconita_cautare.png';
import { useLanguage } from '../useLanguage';
import { shelterTranslations } from '../shelterTranslations';
import './Adaposturi.css';

const ShelterMap = lazy(() => import('../components/ShelterMap'));
const mapPlaceholder = <div className="shelter-map" aria-hidden="true" />;

interface Shelter extends ShelterMapPoint {
  phone: string | null;
  animalsCount: number;
  catsCount: number;
  dogsCount: number;
  otherCount: number;
  schedule: string | null;
  email: string | null;
  capacity: number | null;
  socialLinks: {
    instagram: string | null;
    facebook: string | null;
  };
}

type AnimalCountKey = 'catsCount' | 'dogsCount' | 'otherCount';

function sheltersInCounty(shelters: Shelter[], county: string): Shelter[] {
  return county ? shelters.filter((shelter) => shelter.county?.trim() === county) : shelters;
}

function locationOptions(shelters: Shelter[], field: 'county' | 'city'): string[] {
  const values = shelters.map((shelter) => shelter[field]?.trim() ?? '').filter(Boolean);
  return [...new Set(values)].sort((first, second) => first.localeCompare(second, 'ro'));
}

function normalizeSearch(value: string): string {
  return value.trim().toLowerCase().normalize('NFD').replace(/\p{M}/gu, '');
}

export default function Adaposturi() {
  const { lang } = useLanguage();
  const t = shelterTranslations[lang] || shelterTranslations.ro;

  const [shelters, setShelters] = useState<Shelter[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [totalAnimals, setTotalAnimals] = useState<number | 'loading' | 'error'>('loading');

  // Stări pentru filtre și căutare
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCounty, setSelectedCounty] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedAnimalTypes, setSelectedAnimalTypes] = useState<AnimalCountKey[]>([]);
  const animalTypes = [
    { key: 'catsCount', label: t.filterCat },
    { key: 'dogsCount', label: t.filterDog },
    { key: 'otherCount', label: t.filterOther },
  ] as const;

  // Stare pentru cardurile întoarse
  const [flippedCards, setFlippedCards] = useState<number[]>([]);

  useEffect(() => {
    const controller = new AbortController();

    fetch(`${API_BASE_URL}/api/shelters`, { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        const data: Shelter[] = await response.json();
        if (!Array.isArray(data)) {
          throw new Error('Lista de adăposturi are un format invalid.');
        }
        setShelters(data);
      })
      .catch((error) => {
        if (controller.signal.aborted) return;
        console.error('Eroare la preluarea adăposturilor de la backend:', error);
        setLoadError(true);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    fetch(`${API_BASE_URL}/api/animals/count`, { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data: { total?: unknown } | null = await response.json();
        const total = data?.total;
        if (typeof total !== 'number' || !Number.isSafeInteger(total) || total < 0) {
          throw new Error('Totalul animalelor nu are un format valid.');
        }
        if (!controller.signal.aborted) setTotalAnimals(total);
      })
      .catch((error) => {
        if (controller.signal.aborted) return;
        console.error('Eroare la preluarea numărului total de animale:', error);
        setTotalAnimals('error');
      });

    return () => controller.abort();
  }, []);

  const toggleAnimalType = (type: AnimalCountKey) => {
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

  const countyShelters = useMemo(() => sheltersInCounty(shelters, selectedCounty), [shelters, selectedCounty]);
  const counties = locationOptions(shelters, 'county');
  const cities = locationOptions(countyShelters, 'city');

  const handleCountyChange = (county: string) => {
    setSelectedCounty(county);
    if (selectedCity && !sheltersInCounty(shelters, county).some((shelter) => shelter.city?.trim() === selectedCity)) {
      setSelectedCity('');
    }
  };

  const filteredShelters = useMemo(() => {
    const query = normalizeSearch(searchTerm);
    return countyShelters.filter((shelter) => {
      const matchesSearch = normalizeSearch(shelter.name).includes(query);
      const matchesCity = !selectedCity || shelter.city?.trim() === selectedCity;
      const matchesAnimal = selectedAnimalTypes.length === 0 ||
        selectedAnimalTypes.some((type) => shelter[type] > 0);

      return matchesSearch && matchesCity && matchesAnimal;
    });
  }, [countyShelters, searchTerm, selectedCity, selectedAnimalTypes]);

  const getAnimalCount = (shelter: Shelter) => selectedAnimalTypes.length === 0
    ? shelter.animalsCount
    : selectedAnimalTypes.reduce((total, type) => total + shelter[type], 0);

  const totalAnimalsFiltered = filteredShelters.reduce(
    (total, shelter) => total + getAnimalCount(shelter),
    0,
  );
  const hasActiveFilters = Boolean(searchTerm.trim() || selectedCounty || selectedCity || selectedAnimalTypes.length);

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedCounty('');
    setSelectedCity('');
    setSelectedAnimalTypes([]);
  };

  const showShelterCard = useCallback((shelterId: number) => {
    const card = document.getElementById(`shelter-card-${shelterId}`);
    if (!card) return;

    card.focus({ preventScroll: true });
    card.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      block: 'nearest',
    });
  }, []);

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
                  alt=""
                  className="search-icon-img" 
                />
                <input 
                  type="text"
                  placeholder={t.searchShelterPlaceholder}
                  aria-label={t.searchShelterPlaceholder}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Dropdown Județ */}
              <select 
                value={selectedCounty}
                onChange={(e) => handleCountyChange(e.target.value)}
                aria-label={t.filterCounty}
                className="adaposturi-select"
              >
                <option value="">{t.filterCountyLabel}</option>
                {counties.map((county) => <option key={county} value={county}>{county}</option>)}
              </select>

              {/* Dropdown Oraș */}
              <select 
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                aria-label={t.filterCity}
                className="adaposturi-select"
              >
                <option value="">{t.filterCityLabel}</option>
                {cities.map((city) => <option key={city} value={city}>{city}</option>)}
              </select>

              {/* Buton resetare filtre */}
              <button type="button" onClick={handleResetFilters} className="adaposturi-reset-btn">
                {t.resetFiltersBtn}
              </button>
            </div>

            <div className="adaposturi-filters-bottom">
              <div className="animal-type-filters" role="group" aria-labelledby="shelter-species-label">
                <span className="filter-label" id="shelter-species-label">{t.filterSpecies}</span>

                {animalTypes.map(({ key, label }) => {
                  const selected = selectedAnimalTypes.includes(key);
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => toggleAnimalType(key)}
                      aria-pressed={selected}
                      className={`filter-pill ${selected ? 'active' : ''}`}
                    >
                      {selected && <span aria-hidden="true">✓ </span>}{label}
                    </button>
                  );
                })}
              </div>

              <div className="adaposturi-counter" role="status">
                {typeof totalAnimals === 'number' ? (
                  <span className="adaposturi-total">
                    {t.totalAnimalsLabel} <strong>{totalAnimals.toLocaleString(lang === 'en' ? 'en' : 'ro')}</strong>
                  </span>
                ) : (
                  <span>{totalAnimals === 'loading' ? t.totalAnimalsLoading : t.totalAnimalsUnavailable}</span>
                )}
                {hasActiveFilters && !loading && !loadError && (
                  <span>{getCountText(t.animalsFoundCount, totalAnimalsFiltered)}</span>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Secțiunea Principală: Hartă + Carduri */}
        <section className="adaposturi-main-layout">
          
          {loading || loadError ? mapPlaceholder : (
            <Suspense fallback={mapPlaceholder}>
              <ShelterMap shelters={filteredShelters} lang={lang} onShowShelter={showShelterCard} />
            </Suspense>
          )}

          {/* Partea Dreaptă: Lista de Carduri */}
          <div className="shelters-cards-sidebar">
            {loading ? (
              <p className="shelter-list-message" role="status">{t.loadingShelters}</p>
            ) : loadError ? (
              <p className="shelter-list-message" role="alert">{t.shelterLoadError}</p>
            ) : filteredShelters.length === 0 ? (
              <p className="shelter-list-message">{t.noSheltersFound}</p>
            ) : (
              filteredShelters.map((shelter) => {
                const firstLetter = shelter.name ? shelter.name.charAt(0) : 'A';
                const isFlipped = flippedCards.includes(shelter.id);
                
                const animalsText = animalTypes
                  .filter(({ key }) => shelter[key] > 0 &&
                    (selectedAnimalTypes.length === 0 || selectedAnimalTypes.includes(key)))
                  .map(({ label }) => label)
                  .join(' · ');
                const locality = [...new Set([shelter.city, shelter.county].filter(Boolean))];
                const subtitle = [t.shelterKind, ...locality].join(' · ');
                const params = new URLSearchParams({
                  shelterId: String(shelter.id),
                  shelter: shelter.name,
                });
                const catalogUrl = `/catalog?${params}`;
                const socialLinks = [
                  { key: 'instagram', icon: 'IG', label: t.instagramBtn, url: shelter.socialLinks.instagram },
                  { key: 'facebook', icon: 'f', label: t.facebookBtn, url: shelter.socialLinks.facebook },
                ].filter(({ url }) => url && /^https?:\/\//i.test(url));

                return (
                  <div
                    className={`shelter-card-container ${isFlipped ? 'flipped' : ''}`}
                    id={`shelter-card-${shelter.id}`}
                    key={shelter.id}
                    tabIndex={-1}
                  >
                    <div className="shelter-card-inner">
                      
                      {/* FAȚA CARDULUI */}
                      <div className="shelter-card shelter-card-front" inert={isFlipped}>
                        <div className="shelter-card-header">
                          <div className="shelter-avatar">{firstLetter}</div>
                          <div className="shelter-titles">
                            <h3>{shelter.name}</h3>
                            <span className="shelter-subtitle">{subtitle}</span>
                          </div>
                        </div>

                        <div className="shelter-card-info">
                          <div className="info-row">
                            <span className="info-label">{t.addressLabel}</span>
                            <span className="info-val">{shelter.address || t.unavailable}</span>
                          </div>
                          <div className="info-row">
                            <span className="info-label">{t.phoneLabel}</span>
                            <span className="info-val">{shelter.phone || t.unavailable}</span>
                          </div>
                        </div>

                        <div className="shelter-badge-row">
                          <span className="shelter-green-badge">
                            {getCountText(t.animalsAvailableBadge, getAnimalCount(shelter))}
                          </span>
                          {animalsText && (
                            <span className="shelter-animals-list">{animalsText}</span>
                          )}
                        </div>

                        <div className="shelter-card-actions">
                          <Link
                            className="btn-vezi-animale"
                            to={catalogUrl}
                            onClick={() => window.scrollTo(0, 0)}
                          >
                            {t.viewAnimalsBtn}
                          </Link>
                          <button 
                            className="btn-detalii"
                            onClick={() => handleFlipCard(shelter.id)}
                          >
                            <span className="info-icon">i</span> {t.detailsBtn}
                          </button>
                        </div>
                      </div>

                      {/* SPATELE CARDULUI */}
                      <div className="shelter-card shelter-card-back" inert={!isFlipped}>
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
                            <span className="info-val">{shelter.schedule || t.unavailable}</span>
                          </div>
                          <div className="info-row">
                            <span className="info-label">{t.emailLabel}</span>
                            <span className="info-val">{shelter.email || t.unavailable}</span>
                          </div>
                          <div className="info-row">
                            <span className="info-label">{t.capacityLabel}</span>
                            <span className="info-val">{shelter.capacity ?? t.unavailable}</span>
                          </div>
                        </div>

                        {socialLinks.length > 0 && (
                          <div className="social-contact-section">
                            <span className="social-contact-title">{t.quickContactTitle}</span>
                            <div className="social-buttons-row">
                              {socialLinks.map(({ key, icon, label, url }) => (
                                <a
                                  key={key}
                                  href={url ?? undefined}
                                  className={`social-btn ${key}-btn`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <span className="soc-icon" aria-hidden="true">{icon}</span> {label}
                                </a>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="shelter-card-actions">
                          <Link
                            className="btn-vezi-animale"
                            to={catalogUrl}
                            onClick={() => window.scrollTo(0, 0)}
                          >
                            {t.viewAnimalsBtn}
                          </Link>
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
