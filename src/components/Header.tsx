import { Link, useLocation } from 'react-router-dom';
import logoImage from '../assets/logo.png';
import './Header.css';

export default function Header() {
  const location = useLocation();

  return (
    <header className="site-header">
      <Link to="/" className="logo-container" style={{ textDecoration: 'none' }}>
        <img src={logoImage} alt="FurEverHome Logo" style={{ height: '40px' }} />
        <div className="logo-text">
          <span className="logo-dark">FUREVER</span>
          <span className="logo-gold">HOME</span>
        </div>
      </Link>

      <nav className="nav-menu">
        <Link to="/" className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}>Acasă</Link>
        <Link to="/ghidul-adoptatorului" className={`nav-item ${location.pathname === '/ghidul-adoptatorului' ? 'active' : ''}`}>Ghidul adoptatorului</Link>
        <Link to="/catalog" className={`nav-item ${location.pathname === '/catalog' ? 'active' : ''}`}>Animale disponibile</Link>
        <Link to="/adaposturi" className={`nav-item ${location.pathname === '/adaposturi' ? 'active' : ''}`}>Adăposturi</Link>
        <Link to="/colaborari" className={`nav-item ${location.pathname === '/colaborari' ? 'active' : ''}`}>Colaborări</Link>
        <Link to="/despre-noi" className={`nav-item ${location.pathname === '/despre-noi' ? 'active' : ''}`}>Despre noi</Link>
      </nav>

      <div className="header-actions">
        <Link to="/login" className={`btn-auth ${location.pathname === '/login' ? 'active' : ''}`}>Autentificare</Link>

        <div className="lang-toggle">
          <span className="lang-btn active">RO</span>
          <span className="lang-btn">EN</span>
        </div>
      </div>
    </header>
  );
}