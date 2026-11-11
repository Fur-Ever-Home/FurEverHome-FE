import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { AnimalCard } from '../components/AnimalCard';
import { useLanguage } from '../useLanguage';

export default function Catalog() {
  const [searchParams] = useSearchParams();
  const categorie = searchParams.get('categorie');
  const navigate = useNavigate();

  const { lang } = useLanguage();
  const [sortOrder, setSortOrder] = useState('noi');
  const [selectedAnimal, setSelectedAnimal] = useState<any | null>(null);

  const animaleList = [
    { 
      id: 1, 
      name: 'Bruno', 
      speciesRo: 'Câine', speciesEn: 'Dog',
      breedRo: 'Metis', breedEn: 'Mixed',
      ageRo: '2 ani', ageEn: '2 years',
      genderRo: 'Mascul', genderEn: 'Male',
      sizeRo: 'Medie', sizeEn: 'Medium',
      temperamentRo: 'Jucăuș și prietenos', temperamentEn: 'Playful and friendly',
      colorRo: 'Maro', colorEn: 'Brown',
      status: 'Disponibil', 
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
      date: '2026-11-01'
    },
    { 
      id: 2, 
      name: 'Luna', 
      speciesRo: 'Pisică', speciesEn: 'Cat',
      breedRo: 'Europeană', breedEn: 'European',
      ageRo: '5 luni', ageEn: '5 months',
      genderRo: 'Femelă', genderEn: 'Female',
      sizeRo: 'Mică', sizeEn: 'Small',
      temperamentRo: 'Jucăuș', temperamentEn: 'Playful',
      colorRo: 'Portocaliu', colorEn: 'Orange',
      status: 'Disponibil', 
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
      date: '2026-11-05'
    },
  ];

  const animaleTraduse = animaleList.map(animal => ({
    ...animal,
    species: lang === 'en' ? animal.speciesEn : animal.speciesRo,
    breed: lang === 'en' ? animal.breedEn : animal.breedRo,
    age: lang === 'en' ? animal.ageEn : animal.ageRo,
    genderText: lang === 'en' ? animal.genderEn : animal.genderRo,
    sizeText: lang === 'en' ? animal.sizeEn : animal.sizeRo,
    temperament: lang === 'en' ? animal.temperamentEn : animal.temperamentRo,
    color: lang === 'en' ? animal.colorEn : animal.colorRo,
    shelter: lang === 'en' ? animal.shelterEn : animal.shelterRo,
    shelterType: lang === 'en' ? animal.shelterTypeEn : animal.shelterTypeRo,
  }));

  const animaleFiltrate = categorie 
    ? animaleTraduse.filter(animal => animal.speciesRo.toLowerCase() === categorie.toLowerCase() || animal.speciesEn.toLowerCase() === categorie.toLowerCase() || categorie === 'altele')
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
      <Header />
      
      <div style={{ display: 'flex', padding: '40px 60px', gap: '40px', flex: 1, alignItems: 'flex-start', flexWrap: 'wrap' }}>
        
        {/* Sidebar Filtre */}
        <aside style={{ 
          width: '280px', 
          backgroundColor: '#DFCEB8', 
          padding: '24px', 
          borderRadius: '16px', 
          border: '1px solid #C68642',
          flexShrink: 0 
        }}>
          <h3 style={{ marginTop: 0, color: '#3F2C20', fontSize: '20px', marginBottom: '20px' }}>
            {lang === 'en' ? 'Filter by' : 'Filtrează după'}
          </h3>
          
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontWeight: '600', fontSize: '13px', color: '#6b5b4f', marginBottom: '8px', textTransform: 'uppercase' }}>
              {lang === 'en' ? 'Adoption Type' : 'Tip Adopție'}
            </label>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button style={{ padding: '6px 14px', borderRadius: '20px', border: '1px solid #C68642', backgroundColor: '#3F2C20', color: '#fff', fontSize: '13px', cursor: 'pointer' }}>
                {lang === 'en' ? 'Physical' : 'Fizică'}
              </button>
              <button style={{ padding: '6px 14px', borderRadius: '20px', border: '1px solid #C68642', backgroundColor: '#fff', color: '#3F2C20', fontSize: '13px', cursor: 'pointer' }}>
                {lang === 'en' ? 'Remote' : 'La distanță'}
              </button>
            </div>
          </div>
        </aside>

        {/* Conținut Principal */}
        <main style={{ flex: 1, width: '100%', minWidth: '280px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px', marginBottom: '30px' }}>
            <h1 style={{ margin: 0, fontSize: '28px', color: '#3F2C20' }}>
              {lang === 'en' ? '84 friends are looking for a home' : '84 de prieteni își caută o casă'}
            </h1>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <label style={{ fontWeight: '600', color: '#3F2C20', fontSize: '14px' }}>
                {lang === 'en' ? 'Sort by:' : 'Sortează după:'}
              </label>
              <select 
                value={sortOrder} 
                onChange={(e) => setSortOrder(e.target.value)}
                style={{ padding: '8px 14px', borderRadius: '8px', border: '1px solid #C68642', background: '#fff', cursor: 'pointer', fontWeight: '500' }}
              >
                <option value="noi">{lang === 'en' ? 'Newest' : 'Cele mai noi'}</option>
                <option value="vechi">{lang === 'en' ? 'Oldest' : 'Cele mai vechi'}</option>
              </select>
            </div>
          </div>
          
          {categorie && (
            <div style={{
              backgroundColor: '#DFCEB8',
              border: '1px solid #C68642',
              padding: '12px 20px',
              borderRadius: '12px',
              marginBottom: '25px',
              color: '#3F2C20',
              fontWeight: '600'
            }}>
              {lang === 'en' ? 'Active filter: Showing only animals from category' : 'Filtru activ: Se afișează doar animale din categoria'} 
              <span style={{ color: '#C68642', marginLeft: '5px', textTransform: 'uppercase' }}>
                {categorie}
              </span>.
            </div>
          )}

          {/* Grila cardurilor compatibilă cu AnimalCard */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', 
            gap: '24px',
            justifyContent: 'center'
          }}>
            {animaleSortate.map((animal) => {
              const cardData = {
                id: animal.id,
                name: animal.name,
                species: animal.species,
                status: animal.status,
                gender: animal.genderText,
                age: animal.age,
                size: animal.sizeText,
                shelter: animal.shelter,
                vaccinated: animal.vaccinated,
                dewormed: animal.dewormed,
                sterilized: animal.sterilized,
                image: animal.image
              };

              return (
                <div 
                  key={animal.id} 
                  onClick={() => handleCardClick(animal)} 
                  style={{ cursor: 'pointer', display: 'flex', justifyContent: 'center' }}
                >
                  <AnimalCard animal={cardData} />
                </div>
              );
            })}
          </div>
        </main>
      </div>

      {/* POP-UP / MODAL (Doar pentru Desktop) */}
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
          padding: '20px'
        }}>
          <div style={{
            backgroundColor: '#FFFDF8',
            padding: '30px 40px',
            borderRadius: '24px',
            width: '900px',
            maxWidth: '100%',
            maxHeight: '92vh',
            overflowY: 'auto',
            boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
            position: 'relative',
            display: 'flex',
            gap: '35px',
            flexWrap: 'wrap',
            fontFamily: 'inherit',
            color: '#2b231d'
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
                boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
              }}
            >
              ✕
            </button>

            {/* Partea Stângă: Galerie Foto */}
            <div style={{ flex: '1.1', minWidth: '320px', display: 'flex', flexDirection: 'column' }}>
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
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} 
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
                    style={{ flex: 1, height: '75px', borderRadius: '10px', objectFit: 'cover', border: i === 0 ? '2px solid #C68642' : '1px solid #dcd6cb', cursor: 'pointer' }} 
                  />
                ))}
              </div>
            </div>

            {/* Partea Dreaptă: Detalii și Sănătate */}
            <div style={{ flex: '1.3', minWidth: '340px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <h2 style={{ marginTop: '5px', color: '#2b231d', fontSize: '38px', marginBottom: '10px', fontWeight: 'bold', fontFamily: 'serif' }}>
                  {selectedAnimal.name}
                </h2>
                
                <span style={{ display: 'inline-block', backgroundColor: '#5c7d53', color: '#fff', padding: '5px 16px', borderRadius: '20px', fontSize: '13px', fontWeight: '600', marginBottom: '16px' }}>
                  {selectedAnimal.status}
                </span>

                <p style={{ margin: '4px 0', fontSize: '14px', color: '#444' }}><strong>{lang === 'en' ? 'Location' : 'Locație'}:</strong> {selectedAnimal.shelter}</p>
                <p style={{ margin: '4px 0 22px 0', fontSize: '14px', color: '#444' }}><strong>{lang === 'en' ? 'Location type' : 'Tip locație'}:</strong> {selectedAnimal.shelterType}</p>

                <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap', marginBottom: '25px' }}>
                  
                  {/* Detalii cheie */}
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

                  {/* Sănătate & Compatibilitate */}
                  <div style={{ flex: '1.3', minWidth: '180px' }}>
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
              </div>

              {/* Butoane jos în nuanța Espresso #3F2C20 */}
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginTop: '10px' }}>
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
    </div>
  );
}