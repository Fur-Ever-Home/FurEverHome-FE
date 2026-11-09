import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import GhidulAdoptatorului from './pages/GhidulAdoptatorului';
import Catalog from './pages/Catalog';
import Adaposturi from './pages/Adaposturi';
import Colaborari from './pages/Colaborari';
import DespreNoi from './pages/DespreNoi';
import Login from './pages/Login';

// Imporți componentele pentru paginile legale:
import InformatiiLegale from './components/informatii_legale';
import PoliticaConfidentialitate from './components/politica-confidentialitate';
import PoliticaCookies from './components/politica-cookies';
import GDPR from './components/GDPR';



export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/ghidul-adoptatorului" element={<GhidulAdoptatorului />} />
      <Route path="/catalog" element={<Catalog />} />
      <Route path="/adaposturi" element={<Adaposturi />} />
      <Route path="/colaborari" element={<Colaborari />} />
      <Route path="/despre-noi" element={<DespreNoi />} />
      <Route path="/login" element={<Login />} />

      {/* Rutele noi pentru paginile legale */}
      <Route path="/informatii-legale" element={<InformatiiLegale />} />
      <Route path="/politica-confidentialitate" element={<PoliticaConfidentialitate />} />
      <Route path="/politica-cookies" element={<PoliticaCookies />} />
      <Route path="/GDPR" element={<GDPR />} />
      
    </Routes>
  );
}