import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FloatingBtn from '../components/floating-btn';
import { AnimalCard } from '../components/AnimalCard';
import { useLanguage } from '../useLanguage';

export default function Catalog() {
  const [searchParams] = useSearchParams();
  const categorie = searchParams.get('categorie');
  const navigate = useNavigate();

  const { lang } = useLanguage();
  const [sortOrder, setSortOrder] = useState('noi');
  const [adoptionType, setAdoptionType] = useState<'fizica' | 'distanta'>('fizica');
  const [selectedAnimal, setSelectedAnimal] = useState<any | null>(null);

  const animaleList = [
    { 
      id: 1, 
      name: 'Bruno', 
      speciesRo: 'Câine', speciesEn: 'Dog',
      breedRo: 'Metis', breedEn: 'Mixed',
      ageRo: '2 ani', ageEn: '2 years',
      genderRo: 'Mascul', genderEn: 'Male',
      sizeRo: 'talie medie', sizeEn: 'medium size',
      temperamentRo: 'Jucăuș și prietenos', temperamentEn: 'Playful and friendly',
      colorRo: 'Maro', colorEn: 'Brown',
      statusRo: 'Disponibil', statusEn: 'Available',
      shelterRo: 'Adăpostul Lăbuțe din Copou',
      shelterEn: 'Copou Paws Shelter',
      shelterTypeRo: 'Centru', shelterTypeEn: 'Center',
      vaccinated: true,
      sterilized: true,
      dewormed: true,
      microchipped: true,
      petFriendly: true,
      childFriendly: true,
      noAllergies: true,
      image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=600',
      descRo: 'Bruno este un câine extrem de prietenos, plin de energie și iubitor de copii. Îi plac plimbările lungi în parc și se înțelege excelent cu alte animale.',
      descEn: 'Bruno is an extremely friendly dog, full of energy and loves children. He enjoys long walks in the park and gets along great with other animals.',
      date: '2026-11-01'
    },
    { 
      id: 2, 
      name: 'Luna', 
      speciesRo: 'Pisică', speciesEn: 'Cat',
      breedRo: 'Europeană', breedEn: 'European',
      ageRo: '5 luni', ageEn: '5 months',
      genderRo: 'Femelă', genderEn: 'Female',
      sizeRo: 'talie mică', sizeEn: 'small size',
      temperamentRo: 'Jucăuș', temperamentEn: 'Playful',
      colorRo: 'Portocaliu', colorEn: 'Orange',
      statusRo: 'Disponibil', statusEn: 'Available',
      shelterRo: 'Centrul Casa lui Azor',
      shelterEn: "Azor's House Center",
      shelterTypeRo: 'Centru', shelterTypeEn: 'Center',
      vaccinated: true,
      sterilized: false,
      dewormed: true,
      microchipped: true,
      petFriendly: true,
      childFriendly: false,
      noAllergies: true,
      image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600',
      descRo: 'Luna este o pisicuță liniștită, foarte blândă, căreia îi place să stea la mângâiat și să toarcă lângă tine pe canapea.',
      descEn: 'Luna is a quiet, very gentle cat who loves to be petted and purr next to you on the couch.',
      date: '2026-11-05'
    },
  ];

  const animaleTraduse = animaleList.map(animal => {
    const species = lang === 'en' ? animal.speciesEn : animal.speciesRo;
    const breed = lang === 'en' ? animal.breedEn : animal.breedRo;
    const age = lang === 'en' ? animal.ageEn : animal.ageRo;
    const gender = lang === 'en' ? animal.genderEn : animal.genderRo;
    const size = lang === 'en' ? animal.sizeEn : animal.sizeRo;
    const temperament = lang === 'en' ? animal.temperamentEn : animal.temperamentRo;
    const color = lang === 'en' ? animal.colorEn : animal.colorRo;
    const status = lang === 'en' ? animal.statusEn : animal.statusRo;
    const shelter = lang === 'en' ? animal.shelterEn : animal.shelterRo;
    const shelterType = lang === 'en' ? animal.shelterTypeEn : animal.shelterTypeRo;
    const description = lang === 'en' ? animal.descEn : animal.descRo;

    return {
      ...animal,
      species,
      breed,
      age,
      gender,
      sex: gender,
      genderText: gender,
      size,
      sizeText: size,
      temperament,
      color,
      status,
      shelter,
      location: shelter,
      shelterType,
      description,
      imageUrl: animal.image,
    };
  });

  const animaleFiltrate = categorie 
    ? animaleTraduse.filter(animal => {
        const sRo = animal.speciesRo.toLowerCase();
        const sEn = animal.speciesEn.toLowerCase();
        if (categorie === 'caine') return sRo.includes('câine') || sRo.includes('caine') || sEn === 'dog';
        if (categorie === 'pisica') return sRo.includes('pisică') || sRo.includes('pisica') || sEn === 'cat';
        if (categorie === 'altele') return !sRo.includes('câine') && !sRo.includes('pisică');
        return true;
      })
    : animaleTraduse;

  const animaleSortate = [...animaleFiltrate].sort((a, b) => {
    if (sortOrder === 'noi') {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });

  const handleCardClick = (animal: any) => {
    if (window.innerWidth <= 768) {
      navigate(`/animal/${animal.id}`);
    } else {
      setSelectedAnimal(animal);
    }
  };

  const IconFilter = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  );
  const IconPaws = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 11c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-5 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm10 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-5 3c-2.2 0-4 1.8-4 4h8c0-2.2-1.8-4-4-4z"/></svg>;
  const IconGender = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="9" r="5"/><path d="M12 14v7m-3-3h6"/></svg>;
  const IconClock = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9"/><path d="M12 6v6l4 2"/></svg>;
  const IconRuler = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 12h20M2 8h4m-4 8h4m4-8h2m-2 8h2m4-8h2m-2 8h2"/></svg>;
  const IconSmile = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9"/><path d="M9 10h.01M15 10h.01M9 15s1.5 2 3 2 3-2 3-2"/></svg>;
  const IconDrop = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>;
  const IconSyringe = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 2l4 4M7 13l3 3m-7-3l9 9m3-15l4 4m-8.5-1.5l5 5"/></svg>;
  const IconShield = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>;
  const IconPill = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m10.5 20.5 8-8a4.95 4.95 0 1 0-7-7l-8 8a4.95 4.95 0 1 0 7 7ZM8.5 8.5l7 7"/></svg>;
  const IconChip = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M9 9h6v6H9zM9 1v3m6-3v3m0 16v3M9 19v3M1 9h3m16 0h3M1 15h3m16 0h3"/></svg>;
  const IconLeaf = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 20A17 17 0 0 1 4 6c2.5-1.5 5-.5 7 1.5M11 20c3.5 0 7-3 8-7.5-2.5 0-5.5-1.5-7.5-4C10.5 6.5 11 3.5 11 20z"/></svg>;
  const IconShare = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>;

  return (
    <div style={{ backgroundColor: '#FAF6F0', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <style>{`
        .catalog-desktop-layout {
          display: flex;
          padding: 40px 60px;
          gap: 40px;
          flex: 1;
          align-items: flex-start;
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
          box-sizing: border-box;
        }
        .catalog-mobile-header {
          display: none;
        }
        .catalog-desktop-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 20px;
          margin-bottom: 30px;
        }
        .catalog-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 340px));
          gap: 28px;
          width: 100%;
        }
        .catalog-card-wrapper {
          cursor: pointer;
          width: 100%;
          display: flex;
          justify-content: center;
        }
        /* Forțează cardul și containerul imaginii să fie centrate și să umple 100% din sectorul de sus */
        .catalog-card-wrapper > div {
          width: 100% !important;
          max-width: 100% !important;
          margin: 0 !important;
          box-sizing: border-box !important;
          overflow: hidden !important;
        }
        .catalog-card-wrapper > div > div:first-child {
          width: 100% !important;
          padding: 0 !important;
          margin: 0 !important;
          display: flex !important;
          justify-content: center !important;
          align-items: center !important;
          overflow: hidden !important;
        }
        .catalog-card-wrapper img {
          width: 100% !important;
          height: 250px !important;
          max-width: none !important;
          object-fit: cover !important;
          object-position: center center !important;
          display: block !important;
          margin: 0 auto !important;
          padding: 0 !important;
          border-radius: 0 !important;
        }

        /* SCROLLBAR OBLIGATORIU ȘI VIZIBIL PENTRU INFORMAȚIILE DIN DREAPTA ÎN MODAL */
        .modal-info-scroll {
          max-height: 310px;
          overflow-y: scroll !important;
          padding-right: 14px;
          margin-bottom: 18px;
          scrollbar-width: thin;
          scrollbar-color: #C68642 #EFE6D8;
        }
        .modal-info-scroll::-webkit-scrollbar {
          width: 8px;
          display: block;
        }
        .modal-info-scroll::-webkit-scrollbar-track {
          background: #EFE6D8;
          border-radius: 8px;
        }
        .modal-info-scroll::-webkit-scrollbar-thumb {
          background-color: #C68642;
          border-radius: 8px;
          border: 2px solid #EFE6D8;
        }
        .modal-info-scroll::-webkit-scrollbar-thumb:hover {
          background-color: #3F2C20;
        }

        /* STILURI EXCLUSIVE PENTRU TELEFON (max-width: 768px) */
        @media (max-width: 768px) {
          .catalog-desktop-layout {
            flex-direction: column;
            padding: 20px 16px 40px 16px;
            gap: 0;
          }
          .catalog-desktop-header {
            display: none !important;
          }
          .catalog-mobile-header {
            display: block;
            width: 100%;
            margin-bottom: 16px;
          }
          .catalog-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
        }
      `}</style>

      <Header />
      
      <div className="catalog-desktop-layout">
        
        {/* ==================== HEADER EXCLUSIV PENTRU MOBIL ==================== */}
        <div className="catalog-mobile-header">
          <h1 style={{ fontSize: '28px', lineHeight: '1.15', color: '#3F2C20', margin: '0 0 6px 0', fontFamily: 'serif', fontWeight: 'bold' }}>
            {lang === 'en' ? 'Find your future friend.' : 'Găsește-ți viitorul prieten.'}
          </h1>
          <h2 style={{ fontSize: '23px', lineHeight: '1.2', color: '#C68642', margin: '0 0 8px 0', fontFamily: 'serif', fontWeight: 'bold' }}>
            {lang === 'en' ? 'Offer a warm home.' : 'Oferă-i un cămin cald.'}
          </h2>
          <p style={{ fontSize: '13px', color: '#5c4e43', margin: '0 0 18px 0' }}>
            {lang === 'en' ? 'Every soul deserves a chance.' : 'Fiecare suflet merită o șansă.'}
          </p>

          <p style={{ fontSize: '12px', fontWeight: '700', color: '#6b5b4f', margin: '0 0 8px 0' }}>
            {lang === 'en' ? 'Adoption type' : 'Tip adopție'}
          </p>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
            <button 
              onClick={() => setAdoptionType('fizica')}
              style={{ 
                padding: '7px 18px', 
                borderRadius: '20px', 
                border: adoptionType === 'fizica' ? '1px solid #3F2C20' : '1px solid #8c7b6c', 
                backgroundColor: adoptionType === 'fizica' ? '#3F2C20' : 'transparent', 
                color: adoptionType === 'fizica' ? '#FFFDF8' : '#3F2C20', 
                fontSize: '13px', 
                fontWeight: '600',
                cursor: 'pointer' 
              }}
            >
              {lang === 'en' ? 'Physical' : 'Fizică'}
            </button>
            <button 
              onClick={() => setAdoptionType('distanta')}
              style={{ 
                padding: '7px 18px', 
                borderRadius: '20px', 
                border: adoptionType === 'distanta' ? '1px solid #3F2C20' : '1px solid #8c7b6c', 
                backgroundColor: adoptionType === 'distanta' ? '#3F2C20' : 'transparent', 
                color: adoptionType === 'distanta' ? '#FFFDF8' : '#3F2C20', 
                fontSize: '13px', 
                fontWeight: '500',
                cursor: 'pointer' 
              }}
            >
              {lang === 'en' ? 'Remote' : 'La distanță'}
            </button>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
            <button 
              onClick={() => navigate('/catalog')}
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px', 
                padding: '9px 18px', 
                borderRadius: '22px', 
                border: 'none', 
                backgroundColor: '#3F2C20', 
                color: '#FFFDF8', 
                fontSize: '13px', 
                fontWeight: '600',
                cursor: 'pointer' 
              }}
            >
              {lang === 'en' ? 'Filter' : 'Filtrează'} <IconFilter />
            </button>

            <select 
              value={sortOrder} 
              onChange={(e) => setSortOrder(e.target.value)}
              style={{ 
                padding: '8px 16px', 
                borderRadius: '20px', 
                border: '1px solid #DFCEB8', 
                backgroundColor: '#FFFDF8', 
                color: '#3F2C20', 
                fontSize: '13px', 
                fontWeight: '500',
                cursor: 'pointer',
                outline: 'none'
              }}
            >
              <option value="noi">{lang === 'en' ? 'Sort: Newest' : 'Sortează'}</option>
              <option value="vechi">{lang === 'en' ? 'Sort: Oldest' : 'Cele mai vechi'}</option>
            </select>
          </div>

          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px', marginBottom: '16px' }}>
            <button 
              onClick={() => navigate(categorie === 'caine' ? '/catalog' : '/catalog?categorie=caine')} 
              style={{ 
                padding: '6px 16px', 
                borderRadius: '20px', 
                border: (!categorie || categorie === 'caine') ? '1px solid #3F2C20' : '1px solid #8c7b6c', 
                backgroundColor: (!categorie || categorie === 'caine') ? '#3F2C20' : 'transparent', 
                color: (!categorie || categorie === 'caine') ? '#FFFDF8' : '#3F2C20', 
                fontSize: '13px', 
                fontWeight: '600',
                cursor: 'pointer', 
                whiteSpace: 'nowrap' 
              }}
            >
              {lang === 'en' ? 'Dogs' : 'Câini'}
            </button>
            <button 
              onClick={() => navigate(categorie === 'pisica' ? '/catalog' : '/catalog?categorie=pisica')} 
              style={{ 
                padding: '6px 16px', 
                borderRadius: '20px', 
                border: categorie === 'pisica' ? '1px solid #3F2C20' : '1px solid #8c7b6c', 
                backgroundColor: categorie === 'pisica' ? '#3F2C20' : 'transparent', 
                color: categorie === 'pisica' ? '#FFFDF8' : '#3F2C20', 
                fontSize: '13px', 
                fontWeight: '500',
                cursor: 'pointer', 
                whiteSpace: 'nowrap' 
              }}
            >
              {lang === 'en' ? 'Cats' : 'Pisici'}
            </button>
            <button 
              onClick={() => navigate(categorie === 'altele' ? '/catalog' : '/catalog?categorie=altele')} 
              style={{ 
                padding: '6px 16px', 
                borderRadius: '20px', 
                border: categorie === 'altele' ? '1px solid #3F2C20' : '1px solid #8c7b6c', 
                backgroundColor: categorie === 'altele' ? '#3F2C20' : 'transparent', 
                color: categorie === 'altele' ? '#FFFDF8' : '#3F2C20', 
                fontSize: '13px', 
                fontWeight: '500',
                cursor: 'pointer', 
                whiteSpace: 'nowrap' 
              }}
            >
              {lang === 'en' ? 'Other animals' : 'Alte animale'}
            </button>
          </div>

          <p style={{ fontWeight: '700', color: '#3F2C20', fontSize: '14px', margin: '0' }}>
            {lang === 'en' ? '84 friends are looking for a home' : '84 de prieteni își caută o casă'}
          </p>
        </div>

        {/* ==================== CONȚINUT PRINCIPAL & GRILĂ CARDURI ==================== */}
        <main style={{ flex: 1, width: '100%', minWidth: '280px' }}>
          <div className="catalog-desktop-header">
            <h1 style={{ margin: 0, fontSize: '28px', color: '#3F2C20', fontFamily: 'serif' }}>
              {lang === 'en' ? '84 friends are looking for a home' : '84 de prieteni își caută o casă'}
            </h1>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <label style={{ fontWeight: '600', color: '#3F2C20', fontSize: '14px' }}>
                {lang === 'en' ? 'Sort by:' : 'Sortează după:'}
              </label>
              <select 
                value={sortOrder} 
                onChange={(e) => setSortOrder(e.target.value)}
                style={{ padding: '8px 14px', borderRadius: '8px', border: '1px solid #C68642', background: '#fff', cursor: 'pointer', fontWeight: '500', color: '#3F2C20' }}
              >
                <option value="noi">{lang === 'en' ? 'Newest' : 'Cele mai noi'}</option>
                <option value="vechi">{lang === 'en' ? 'Oldest' : 'Cele mai vechi'}</option>
              </select>
            </div>
          </div>

          <div className="catalog-grid">
            {animaleSortate.map((animal: any) => (
              <div 
                key={animal.id} 
                onClick={() => handleCardClick(animal)} 
                className="catalog-card-wrapper"
              >
                <AnimalCard animal={animal as any} />
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* ==================== POP-UP / MODAL (Doar pentru Desktop) ==================== */}
      {selectedAnimal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000,
          padding: '20px',
          boxSizing: 'border-box'
        }}>
          <div style={{
            backgroundColor: '#FFFDF8',
            padding: '30px 40px',
            borderRadius: '24px',
            width: '920px',
            maxWidth: '100%',
            maxHeight: '92vh',
            boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
            position: 'relative',
            display: 'flex',
            gap: '35px',
            flexWrap: 'wrap',
            fontFamily: 'inherit',
            color: '#2b231d',
            boxSizing: 'border-box'
          }}>
            <button 
              onClick={() => setSelectedAnimal(null)}
              style={{
                position: 'absolute',
                top: '25px',
                right: '25px',
                background: '#fff',
                border: '1px solid #dcd6cb',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '15px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#2b231d',
                boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
                zIndex: 10
              }}
            >
              ✕
            </button>

            {/* Stânga: Poza principală centrată + 3 miniaturi */}
            <div style={{ flex: '1.05', minWidth: '300px', display: 'flex', flexDirection: 'column' }}>
              <div style={{ 
                position: 'relative', 
                borderRadius: '16px', 
                overflow: 'hidden', 
                marginBottom: '12px', 
                width: '100%',
                height: '340px' 
              }}>
                <img 
                  src={selectedAnimal.image} 
                  alt={selectedAnimal.name} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }} 
                />
                <button style={{ position: 'absolute', top: '16px', right: '16px', background: '#fff', border: 'none', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>🤍</button>
                <button style={{ position: 'absolute', top: '50%', left: '12px', transform: 'translateY(-50%)', background: '#fff', border: 'none', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 6px rgba(0,0,0,0.2)', fontWeight: 'bold' }}>‹</button>
                <button style={{ position: 'absolute', top: '50%', right: '12px', transform: 'translateY(-50%)', background: '#fff', border: 'none', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 6px rgba(0,0,0,0.2)', fontWeight: 'bold' }}>›</button>

                <div style={{ position: 'absolute', bottom: '16px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '6px', alignItems: 'center' }}>
                  <span style={{ width: '20px', height: '6px', borderRadius: '3px', backgroundColor: '#fff' }}></span>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.6)' }}></span>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.6)' }}></span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px', width: '100%' }}>
                {[1, 2, 3].map((_, i) => (
                  <img 
                    key={i} 
                    src={selectedAnimal.image} 
                    alt="thumb" 
                    style={{ flex: 1, height: '75px', borderRadius: '10px', objectFit: 'cover', objectPosition: 'center', border: i === 0 ? '2px solid #C68642' : '1px solid #dcd6cb', cursor: 'pointer' }} 
                  />
                ))}
              </div>
            </div>

            {/* Dreapta: Informații cu SCROLLBAR OBLIGATORIU + Butoane jos */}
            <div style={{ flex: '1.35', minWidth: '320px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <h2 style={{ marginTop: '0', color: '#2b231d', fontSize: '36px', marginBottom: '8px', fontWeight: 'bold', fontFamily: 'serif' }}>
                  {selectedAnimal.name}
                </h2>
                
                <span style={{ display: 'inline-block', backgroundColor: '#5c7d53', color: '#fff', padding: '5px 16px', borderRadius: '20px', fontSize: '13px', fontWeight: '600', marginBottom: '14px' }}>
                  {selectedAnimal.status}
                </span>

                {/* ZONA CU SCROLLBAR VIZIBIL LÂNGĂ INFORMAȚIILE DIN DREAPTA */}
                <div className="modal-info-scroll">
                  <p style={{ margin: '4px 0', fontSize: '14px', color: '#444' }}>
                    <strong>{lang === 'en' ? 'Location' : 'Locație'}:</strong> {selectedAnimal.shelter}
                  </p>
                  <p style={{ margin: '4px 0 18px 0', fontSize: '14px', color: '#444' }}>
                    <strong>{lang === 'en' ? 'Location type' : 'Tip locație'}:</strong> {selectedAnimal.shelterType}
                  </p>

                  <div style={{ display: 'flex', gap: '25px', flexWrap: 'wrap', marginBottom: '20px' }}>
                    
                    <div style={{ flex: '1', minWidth: '150px' }}>
                      <h4 style={{ margin: '0 0 12px 0', color: '#2b231d', fontSize: '16px', fontWeight: 'bold' }}>
                        {lang === 'en' ? 'Key details' : 'Detalii cheie'}
                      </h4>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '11px', fontSize: '13px', color: '#333' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><span style={{ color: '#555', display: 'flex' }}><IconPaws /></span> <strong>{lang === 'en' ? 'Species' : 'Specie'}:</strong> {selectedAnimal.species}</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><span style={{ color: '#555', display: 'flex' }}><IconGender /></span> <strong>{lang === 'en' ? 'Gender' : 'Sex'}:</strong> {selectedAnimal.genderText}</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><span style={{ color: '#555', display: 'flex' }}><IconClock /></span> <strong>{lang === 'en' ? 'Age' : 'Vârstă'}:</strong> {selectedAnimal.age}</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><span style={{ color: '#555', display: 'flex' }}><IconRuler /></span> <strong>{lang === 'en' ? 'Size' : 'Talie'}:</strong> {selectedAnimal.sizeText}</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><span style={{ color: '#555', display: 'flex' }}><IconSmile /></span> <strong>{lang === 'en' ? 'Temperament' : 'Temperament'}:</strong> {selectedAnimal.temperament}</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><span style={{ color: '#555', display: 'flex' }}><IconDrop /></span> <strong>{lang === 'en' ? 'Color' : 'Culoare'}:</strong> {selectedAnimal.color}</div>
                      </div>
                    </div>

                    <div style={{ flex: '1.2', minWidth: '180px' }}>
                      <h4 style={{ margin: '0 0 12px 0', color: '#2b231d', fontSize: '16px', fontWeight: 'bold' }}>
                        {lang === 'en' ? 'Health & Compatibility' : 'Sănătate & Compatibilitate'}
                      </h4>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '9px', fontSize: '13px' }}>
                        {[
                          { labelRo: 'Vaccinat', labelEn: 'Vaccinated', val: selectedAnimal.vaccinated, icon: <IconSyringe /> },
                          { labelRo: 'Sterilizat', labelEn: 'Sterilized', val: selectedAnimal.sterilized, icon: <IconShield /> },
                          { labelRo: 'Deparazitat', labelEn: 'Dewormed', val: selectedAnimal.dewormed, icon: <IconPill /> },
                          { labelRo: 'Microcipat', labelEn: 'Microchipped', val: selectedAnimal.microchipped, icon: <IconChip /> },
                          { labelRo: 'Pet friendly', labelEn: 'Pet friendly', val: selectedAnimal.petFriendly, icon: <IconPaws /> },
                          { labelRo: 'Child friendly', labelEn: 'Child friendly', val: selectedAnimal.childFriendly, icon: <IconSmile /> },
                          { labelRo: 'Fără alergii', labelEn: 'No allergies', val: selectedAnimal.noAllergies, icon: <IconLeaf /> },
                        ].map((item, idx) => (
                          <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ color: '#333', display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <span style={{ color: '#555', display: 'flex' }}>{item.icon}</span>
                              {lang === 'en' ? item.labelEn : item.labelRo}
                            </span>
                            <span style={{ 
                              backgroundColor: item.val ? '#5c7d53' : '#b83b3b', 
                              color: '#fff', 
                              padding: '3px 12px', 
                              borderRadius: '14px', 
                              fontSize: '11px', 
                              fontWeight: '600'
                            }}>
                              {item.val ? `✓ ${lang === 'en' ? 'Yes' : 'Da'}` : `✕ ${lang === 'en' ? 'No' : 'Nu'}`}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>

                  {/* Descriere suplimentară pentru ca scroll-ul să fie activ și util */}
                  <div style={{ borderTop: '1px solid #EFE6D8', paddingTop: '14px', marginTop: '8px' }}>
                    <h4 style={{ margin: '0 0 8px 0', color: '#2b231d', fontSize: '15px', fontWeight: 'bold' }}>
                      {lang === 'en' ? 'About' : 'Povestea lui'} {selectedAnimal.name}
                    </h4>
                    <p style={{ margin: 0, fontSize: '13px', lineHeight: '1.6', color: '#555' }}>
                      {selectedAnimal.description}
                    </p>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <button 
                  onClick={() => alert(lang === 'en' ? 'Visit scheduled!' : 'Vizită programată!')}
                  style={{
                    backgroundColor: '#3F2C20',
                    color: '#fff',
                    border: 'none',
                    padding: '15px 20px',
                    borderRadius: '30px',
                    cursor: 'pointer',
                    fontWeight: '600',
                    fontSize: '15px',
                    flex: 1,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '10px'
                  }}
                >
                  {lang === 'en' ? 'Schedule a visit' : 'Programează o vizită'}
                </button>

                <button 
                  onClick={() => alert(lang === 'en' ? 'Link copied!' : 'Link copiat!')}
                  style={{
                    backgroundColor: '#3F2C20',
                    color: '#fff',
                    border: 'none',
                    width: '52px',
                    height: '52px',
                    borderRadius: '50%',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    flexShrink: 0
                  }}
                  title={lang === 'en' ? 'Share' : 'Distribuie'}
                >
                  <span style={{ display: 'flex' }}><IconShare /></span>
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      <FloatingBtn />
      <Footer />
    </div>
  );
}