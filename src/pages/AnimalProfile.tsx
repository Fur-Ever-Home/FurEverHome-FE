import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import Header from '../components/Header';
import { useLanguage } from '../useLanguage';
import { API_BASE_URL } from '../config';
import FavoriteBtn from '../components/FavoriteBtn';
import AuthRequiredModal from '../components/AuthRequiredModal';

export default function AnimalProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { lang } = useLanguage();
  const isLoggedIn = !!localStorage.getItem('token');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMessage, setAuthMessage] = useState("");

  const animaleList: Record<string, any> = {
    '1': {
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
    },
    '2': {
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
    }
  };

  const stateAnimal = location.state?.animal;
  const [fetchedAnimal, setFetchedAnimal] = useState<any | null>(null);

// Citim de unde a venit utilizatorul (din state-ul trimis prin navigate)
  const fromPage = location.state?.from;

  // Setăm textul butonului în funcție de pagina de proveniență
  const textInapoiRo = fromPage === 'home' ? 'Înapoi Acasă' : 'Înapoi la animale';
  const textInapoiEn = fromPage === 'home' ? 'Back to Home' : 'Back to animals';

  // Funcția care decide unde ne întoarcem
  const handleGoBack = () => {
    if (fromPage === 'home') {
      navigate('/');
    } else {
      navigate(isDistanceMode ? '/catalog?tip=la_distanta' : '/catalog');
    }
  };




  useEffect(() => {
    if (!stateAnimal && id) {
      fetch(`${API_BASE_URL}/api/animals`)
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) {
            const found = data.find((a: any) => String(a.id) === String(id));
            if (found) setFetchedAnimal(found);
          }
        })
        .catch(() => {});
    }
  }, [id, stateAnimal]);

  const rawAnimal = stateAnimal || fetchedAnimal || animaleList[id || '1'] || animaleList['1'];

  // Verificăm dacă suntem în modul de adopție la distanță
  const isDistanceMode = Boolean(
    location.state?.isDistanceMode ||
    searchParams.get('tip') === 'la_distanta' ||
    rawAnimal?.isDistanceAdoption ||
    rawAnimal?.adoptionType === 'la_distanta'
  );

  const mainImage =
    rawAnimal.image ||
    rawAnimal.imageUrl ||
    (rawAnimal.images && rawAnimal.images[0]) ||
    'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=600';

  const speciesDisplay = lang === 'en' ? (rawAnimal.speciesEn || rawAnimal.species || 'Dog') : (rawAnimal.speciesRo || rawAnimal.species || 'Câine');
  const genderDisplay = lang === 'en' ? (rawAnimal.genderEn || rawAnimal.gender || rawAnimal.sex || 'Female') : (rawAnimal.genderRo || rawAnimal.gender || rawAnimal.sex || 'Femelă');
  const ageDisplay = lang === 'en' ? (rawAnimal.ageEn || rawAnimal.age || '1 year') : (rawAnimal.ageRo || rawAnimal.age || '1 an');
  const sizeDisplay = lang === 'en' ? (rawAnimal.sizeEn || rawAnimal.size || 'Medium') : (rawAnimal.sizeRo || rawAnimal.size || 'Medie');
  const temperamentDisplay = lang === 'en' ? (rawAnimal.temperamentEn || rawAnimal.temperament || 'Playful') : (rawAnimal.temperamentRo || rawAnimal.temperament || 'Jucăuș');
  const colorDisplay = lang === 'en' ? (rawAnimal.colorEn || rawAnimal.color || 'Brown') : (rawAnimal.colorRo || rawAnimal.color || 'Maro');
  const shelterDisplay = lang === 'en' ? (rawAnimal.shelterEn || rawAnimal.shelter || rawAnimal.location || 'Copou Paws Shelter') : (rawAnimal.shelterRo || rawAnimal.shelter || rawAnimal.location || 'Adăpostul Lăbuțe din Copou');
  const shelterTypeDisplay = lang === 'en' ? (rawAnimal.shelterTypeEn || rawAnimal.locationType || 'Center') : (rawAnimal.shelterTypeRo || rawAnimal.locationType || 'Centru');

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

const handleDonatieClick = () => {
    if (!isLoggedIn) {
      setAuthMessage(lang === 'en' 
        ? `You must be logged in to donate for ${rawAnimal.name}` 
        : `Dacă vrei să donezi pentru ${rawAnimal.name} trebuie să fii logat`);
      setIsAuthModalOpen(true);
      return;
    }
    // Aici pui logica de donație (ex. navigare)
  };

  const handleProgrameazaVizitaClick = () => {
    if (!isLoggedIn) {
      setAuthMessage(lang === 'en' 
        ? `You must be logged in to schedule a visit with ${rawAnimal.name}` 
        : `Pentru a programa o vizită alături de ${rawAnimal.name} trebuie să fii logat`);
      setIsAuthModalOpen(true);
      return;
    }
    // Aici pui logica pentru programare
    alert(lang === 'en' ? 'Visit scheduled!' : 'Vizită programată!');
  };


  return (
    <div style={{ backgroundColor: '#FAF6F0', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />

      <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px', width: '100%', boxSizing: 'border-box' }}>
        
        {/* Buton Înapoi */}
        <button 
          onClick={handleGoBack} 
          style={{ background: 'none', border: 'none', color: '#3F2C20', fontWeight: 'bold', cursor: 'pointer', marginBottom: '15px', fontSize: '15px', padding: 0 }}
        >
          ← {lang === 'en' ? textInapoiEn : textInapoiRo}
        </button>

        {/* Galerie Foto Principală */}
        <div style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', marginBottom: '12px', height: '280px', backgroundColor: '#000' }}>
          <img src={mainImage} alt={rawAnimal.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          
          <div style={{ position: 'absolute', top: '12px', right: '12px', zIndex: 10 }}>
  <FavoriteBtn animal={rawAnimal} isLoggedIn={isLoggedIn} />
</div>
          <button style={{ position: 'absolute', top: '50%', left: '10px', transform: 'translateY(-50%)', background: '#fff', border: 'none', borderRadius: '50%', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontWeight: 'bold' }}>‹</button>
          <button style={{ position: 'absolute', top: '50%', right: '10px', transform: 'translateY(-50%)', background: '#fff', border: 'none', borderRadius: '50%', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontWeight: 'bold' }}>›</button>

          <div style={{ position: 'absolute', bottom: '12px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '5px' }}>
            <span style={{ width: '16px', height: '5px', borderRadius: '3px', backgroundColor: '#fff' }}></span>
            <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.6)' }}></span>
            <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.6)' }}></span>
          </div>
        </div>

        {/* Cele 3 miniaturi */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
          {[1, 2, 3].map((_, i) => (
            <img key={i} src={mainImage} alt="thumb" style={{ flex: 1, height: '65px', borderRadius: '8px', objectFit: 'cover', border: i === 0 ? '2px solid #C68642' : '1px solid #DFCEB8' }} />
          ))}
        </div>

        {/* Nume și Status (Badge-ul este ascuns la adopția la distanță) */}
        <h1 style={{ fontSize: '32px', color: '#3F2C20', margin: '0 0 8px 0', fontFamily: 'serif', fontWeight: 'bold' }}>{rawAnimal.name}</h1>
        {!isDistanceMode && (
          <span style={{ display: 'inline-block', backgroundColor: '#5c7d53', color: '#fff', padding: '4px 14px', borderRadius: '16px', fontSize: '12px', fontWeight: '600', marginBottom: '15px' }}>
            {rawAnimal.status || 'Disponibil'}
          </span>
        )}

        <p style={{ margin: '4px 0', fontSize: '14px', color: '#444' }}><strong>{lang === 'en' ? 'Location' : 'Locație'}:</strong> {shelterDisplay}</p>
        <p style={{ margin: '4px 0 20px 0', fontSize: '14px', color: '#444' }}><strong>{lang === 'en' ? 'Location type' : 'Tip locație'}:</strong> {shelterTypeDisplay}</p>

        {/* Card Detalii cheie */}
        <div style={{ backgroundColor: '#FFFDF8', padding: '20px', borderRadius: '16px', border: '1px solid #DFCEB8', marginBottom: '20px', boxShadow: '0 4px 12px rgba(96,73,47,0.05)' }}>
          <h3 style={{ marginTop: 0, color: '#3F2C20', fontSize: '16px', marginBottom: '14px', fontWeight: 'bold' }}>{lang === 'en' ? 'Key details' : 'Detalii cheie'}</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '11px', fontSize: '13px', color: '#333' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><span style={{ color: '#555', display: 'flex' }}><IconPaws /></span> <strong>{lang === 'en' ? 'Species' : 'Specie'}:</strong> {speciesDisplay}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><span style={{ color: '#555', display: 'flex' }}><IconGender /></span> <strong>{lang === 'en' ? 'Gender' : 'Sex'}:</strong> {genderDisplay}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><span style={{ color: '#555', display: 'flex' }}><IconClock /></span> <strong>{lang === 'en' ? 'Age' : 'Vârstă'}:</strong> {ageDisplay}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><span style={{ color: '#555', display: 'flex' }}><IconRuler /></span> <strong>{lang === 'en' ? 'Size' : 'Talie'}:</strong> {sizeDisplay}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><span style={{ color: '#555', display: 'flex' }}><IconSmile /></span> <strong>{lang === 'en' ? 'Temperament' : 'Temperament'}:</strong> {temperamentDisplay}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><span style={{ color: '#555', display: 'flex' }}><IconDrop /></span> <strong>{lang === 'en' ? 'Color' : 'Culoare'}:</strong> {colorDisplay}</div>
          </div>
        </div>

        {/* Card Sănătate & Compatibilitate */}
        <div style={{ backgroundColor: '#FFFDF8', padding: '20px', borderRadius: '16px', border: '1px solid #DFCEB8', marginBottom: '20px', boxShadow: '0 4px 12px rgba(96,73,47,0.05)' }}>
          <h3 style={{ marginTop: 0, color: '#3F2C20', fontSize: '16px', marginBottom: '14px', fontWeight: 'bold' }}>{lang === 'en' ? 'Health & Compatibility' : 'Sănătate & Compatibilitate'}</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
            {[
              { labelRo: 'Vaccinat', labelEn: 'Vaccinated', val: rawAnimal.vaccinated !== false, icon: <IconSyringe /> },
              { labelRo: 'Sterilizat', labelEn: 'Sterilized', val: rawAnimal.sterilized !== false, icon: <IconShield /> },
              { labelRo: 'Deparazitat', labelEn: 'Dewormed', val: rawAnimal.dewormed !== false, icon: <IconPill /> },
              { labelRo: 'Microcipat', labelEn: 'Microchipped', val: rawAnimal.microchipped !== false, icon: <IconChip /> },
              { labelRo: 'Pet friendly', labelEn: 'Pet friendly', val: rawAnimal.petFriendly !== false, icon: <IconPaws /> },
              { labelRo: 'Child friendly', labelEn: 'Child friendly', val: rawAnimal.childFriendly !== false, icon: <IconSmile /> },
              { labelRo: 'Fără alergii', labelEn: 'No allergies', val: rawAnimal.noAllergies !== false, icon: <IconLeaf /> },
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

        {/* Card Descriere (Povestea animalului + Procesul de adopție doar dacă NU e la distanță) */}
        <div style={{ backgroundColor: '#FFFDF8', padding: '20px', borderRadius: '16px', border: '1px solid #DFCEB8', marginBottom: '25px', boxShadow: '0 4px 12px rgba(96,73,47,0.05)' }}>
          <h3 style={{ marginTop: 0, color: '#3F2C20', fontSize: '16px', marginBottom: '10px', fontWeight: 'bold' }}>
            Povestea lui {rawAnimal.name}
          </h3>
          <p style={{ fontSize: '13.5px', lineHeight: '1.6', color: '#5d534a', marginBottom: '12px' }}>
            {rawAnimal.description ||
              `${rawAnimal.name} este un suflet blând și plin de viață care așteaptă cu nerăbdare o familie iubitoare. Se bucură enorm de plimbările în aer liber, îi place să primească atenție și se adaptează rapid într-un mediu cald și liniștit.`}
          </p>
          <p style={{ fontSize: '13.5px', lineHeight: '1.6', color: '#5d534a', marginBottom: isDistanceMode ? '0' : '14px' }}>
            La adăpost, {rawAnimal.name} s-a dovedit a fi extrem de ascultător și recunoscător pentru fiecare gest de afecțiune. Are toate controalele medicale la zi și este pregătit să primească toată grija de care are nevoie.
          </p>

          {!isDistanceMode && (
            <div style={{ backgroundColor: '#f7f3ed', padding: '12px 14px', borderRadius: '10px', fontSize: '13px', color: '#5d534a' }}>
              <strong style={{ color: '#3F2C20', display: 'block', marginBottom: '4px' }}>
                🐾 Procesul de adopție:
              </strong>
              Adopția este gratuită și presupune o scurtă vizită de cunoaștere la centru, urmată de semnarea contractului de adopție.
            </div>
          )}
        </div>

        {/* Butoane de Jos: Donează (la distanță) sau Programează o vizită (fizic) + Share */}
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '30px' }}>
          {isDistanceMode ? (
            <button
              type="button"
              onClick={handleDonatieClick}
              style={{
                backgroundColor: '#A66E38',
                color: '#FFFDF8',
                border: 'none',
                padding: '15px 20px',
                borderRadius: '30px',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '15px',
                flex: 1,
                boxShadow: '0 4px 12px rgba(96,73,47,0.15)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <span style={{ fontSize: '14px', lineHeight: 1 }}>🤍</span>
              {lang === 'en' ? 'Donate' : 'Donează'}
            </button>
          ) : (
            <button 
              type="button"
              onClick={handleProgrameazaVizitaClick}
              style={{
                backgroundColor: '#3F2C20',
                color: '#FFFDF8',
                border: 'none',
                padding: '15px 20px',
                borderRadius: '30px',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '15px',
                flex: 1,
                boxShadow: '0 4px 12px rgba(96,73,47,0.15)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              {lang === 'en' ? 'Schedule a visit' : 'Programează o vizită'}
            </button>
          )}

          <button 
            type="button"
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: rawAnimal.name,
                  text: lang === 'en' ? `Check out ${rawAnimal.name} on FurEverHome!` : `Vezi-l pe ${rawAnimal.name} pe FurEverHome!`,
                  url: window.location.href,
                }).catch(() => {});
              } else {
                navigator.clipboard.writeText(window.location.href);
                alert(lang === 'en' ? 'Link copied to clipboard!' : 'Link-ul a fost copiat în clipboard!');
              }
            }}
            style={{
              backgroundColor: '#3F2C20',
              color: '#FFFDF8',
              border: 'none',
              width: '52px',
              height: '52px',
              borderRadius: '50%',
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              boxShadow: '0 4px 12px rgba(96,73,47,0.15)',
              flexShrink: 0
            }}
            title={lang === 'en' ? 'Share' : 'Distribuie'}
          >
            <span style={{ display: 'flex' }}><IconShare /></span>
          </button>
        </div>

      </div>
      <AuthRequiredModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        message={authMessage} 
      />
    </div>
  );
}