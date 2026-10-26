import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import GhidulAdoptatorului from './pages/GhidulAdoptatorului';
import Catalog from './pages/Catalog';
import Adaposturi from './pages/Adaposturi';
import Colaborari from './pages/Colaborari';
import DespreNoi from './pages/DespreNoi';
import Login from './pages/Login';

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
    </Routes>
  );
}