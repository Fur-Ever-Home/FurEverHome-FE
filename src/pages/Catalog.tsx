import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '../components/Header';
import { AnimalCard } from '../components/AnimalCard';
import { useLanguage } from '../useLanguage';

export default function Catalog() {
  const [searchParams] = useSearchParams();
  const categorie = searchParams.get('categorie');

  const { lang } = useLanguage();

  const [selectedAnimal, setSelectedAnimal] = useState<any | null>(null);
  const [sortOrder, setSortOrder] = useState('noi');

  // Date bilingve complete, inclusiv pentru vârstă
  const animaleList = [
    { 
      id: 1, 
      name: 'Rex', 
      speciesRo: 'Câine',
      speciesEn: 'Dog',
      breedRo: 'Labrador',
      breedEn: 'Labrador',
      ageRo: '2 ani',
      ageEn: '2 years',
      status: 'Disponibil', 
      gender: 'male', 
      size: 'large',   
      shelterRo: 'Adăpostul București',
      shelterEn: 'Bucharest Shelter',
      vaccinated: true,
      dewormed: true,
      sterilized: true,
      image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400',
      descRo: 'Rex este un căine extrem de prietenos, plin de energie și iubitor de copii.',
      descEn: 'Rex is an extremely friendly dog, full of energy and loves children.',
      date: '2026-11-01'
    },
    { 
      id: 2, 
      name: 'Luna', 
      speciesRo: 'Pisică',
      speciesEn: 'Cat',
      breedRo: 'Europeană',
      breedEn: 'European',
      ageRo: '1 an',
      ageEn: '1 year',
      status: 'Disponibil', 
      gender: 'female', 
      size: 'small',   
      shelterRo: 'Adăpostul Cluj',
      shelterEn: 'Cluj Shelter',
      vaccinated: true,
      dewormed: true,
      sterilized: false,
      image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400',
      descRo: 'Luna este o pisicuță liniștită, foarte blândă, căreia îi place să stea la mângâiat.',
      descEn: 'Luna is a quiet, very gentle cat who loves to be petted.',
      date: '2026-11-05'
    },
  ];

  const animaleTraduse = animaleList.map(animal => ({
    ...animal,
    species: lang === 'en' ? animal.speciesEn : animal.speciesRo,
    breed: lang === 'en' ? animal.breedEn : animal.breedRo,
    age: lang === 'en' ? animal.ageEn : animal.ageRo,
    shelter: lang === 'en' ? animal.shelterEn : animal.shelterRo,
    description: lang === 'en' ? animal.descEn : animal.descRo,
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

  return (
    <div style={{ backgroundColor: '#f7f4ed', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      
      <div style={{ padding: '40px 80px', flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
          <h1>{lang === 'en' ? 'Animals Catalog' : 'Catalog Animale'}</h1>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <label style={{ fontWeight: '600', color: '#2b231d' }}>
              {lang === 'en' ? 'Sort by:' : 'Sortează după:'}
            </label>
            <select 
              value={sortOrder} 
              onChange={(e) => setSortOrder(e.target.value)}
              style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #c89551', background: '#fff', cursor: 'pointer' }}
            >
              <option value="noi">{lang === 'en' ? 'Newest' : 'Cele mai noi'}</option>
              <option value="vechi">{lang === 'en' ? 'Oldest' : 'Cele mai vechi'}</option>
            </select>
          </div>
        </div>
        
        {categorie && (
          <div style={{
            backgroundColor: '#fcefdc',
            border: '1px solid #c89551',
            padding: '15px 20px',
            borderRadius: '12px',
            margin: '20px 0',
            color: '#2b231d',
            fontWeight: '600'
          }}>
            {lang === 'en' ? 'Active filter: Showing only animals from category' : 'Filtru activ: Se afișează doar animale din categoria'} 
            <span style={{ color: '#c89551', marginLeft: '5px', textTransform: 'uppercase' }}>
              {categorie}
            </span>.
          </div>
        )}

        <div style={{ display: 'flex', gap: '24px', marginTop: '30px', flexWrap: 'wrap' }}>
          {animaleSortate.map((animal) => (
            <div 
              key={animal.id} 
              onClick={() => setSelectedAnimal(animal)} 
              style={{ cursor: 'pointer' }}
            >
              <AnimalCard animal={animal} />
            </div>
          ))}
        </div>
      </div>

      {selectedAnimal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: '#fff',
            padding: '30px',
            borderRadius: '16px',
            width: '400px',
            maxWidth: '90%',
            boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
            position: 'relative'
          }}>
            <h2 style={{ marginTop: 0, color: '#3F2C20' }}>{selectedAnimal.name}</h2>
            <p><strong>{lang === 'en' ? 'Species' : 'Specie'}:</strong> {selectedAnimal.species}</p>
            <p><strong>{lang === 'en' ? 'Breed' : 'Rasă'}:</strong> {selectedAnimal.breed}</p>
            <p><strong>{lang === 'en' ? 'Age' : 'Vârstă'}:</strong> {selectedAnimal.age}</p>
            <p><strong>{lang === 'en' ? 'Gender' : 'Sex'}:</strong> {selectedAnimal.gender === 'male' ? (lang === 'en' ? 'Male' : 'Mascul') : (lang === 'en' ? 'Female' : 'Femelă')}</p>
            <p><strong>{lang === 'en' ? 'Shelter' : 'Adăpost'}:</strong> {selectedAnimal.shelter}</p>
            <p style={{ marginTop: '15px' }}><strong>{lang === 'en' ? 'Description' : 'Descriere'}:</strong> {selectedAnimal.description}</p>
            
            <button 
              onClick={() => setSelectedAnimal(null)}
              style={{
                marginTop: '20px',
                backgroundColor: '#c89551',
                color: '#fff',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600',
                width: '100%'
              }}
            >
              {lang === 'en' ? 'Close' : 'Închide'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}