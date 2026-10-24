import { useSearchParams } from 'react-router-dom';
import Header from '../components/Header';

export default function Catalog() {
  const [searchParams] = useSearchParams();
  const categorie = searchParams.get('categorie'); // preia 'caini', 'pisici' sau 'altele'

  return (
    <div style={{ backgroundColor: '#f7f4ed', minHeight: '100vh' }}>
      <Header />
      
      <div style={{ padding: '40px 80px' }}>
        <h1>Catalog Animale</h1>
        
        {/* Mesaj provizoriu de filtrare */}
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
            Filtru activ: Se afișează doar animale din categoria 
            <span style={{ color: '#c89551', marginLeft: '5px', textTransform: 'uppercase' }}>
              {categorie}
            </span>.
          </div>
        )}

        <p>Aici vor fi listate animalele disponibile pentru adopție...</p>
      </div>
    </div>
  );
}