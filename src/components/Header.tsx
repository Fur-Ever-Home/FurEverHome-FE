import { Link, useLocation } from 'react-router-dom';
import logoImage from '../assets/logo.png';
import React from 'react';
import { useLanguage } from '../useLanguage';
import './Header.css';

export default function Header() {
  const location = useLocation();
  const { lang, changeLanguage } = useLanguage();

  // Dicționar pentru textele din Header
  const t = {
    ro: {
      home: "Acasă",
      guide: "Ghidul adoptatorului",
      catalog: "Animale disponibile",
      shelters: "Adăposturi",
      collaborations: "Colaborări",
      about: "Despre noi",
      login: "Autentificare"
    },
    en: {
      home: "Home",
      guide: "Adopter's Guide",
      catalog: "Available Pets",
      shelters: "Shelters",
      collaborations: "Collaborations",
      about: "About Us",
      login: "Sign In"
    }
  };

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
        <Link to="/" className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}>{t[lang].home}</Link>
        <Link to="/ghidul-adoptatorului" className={`nav-item ${location.pathname === '/ghidul-adoptatorului' ? 'active' : ''}`}>{t[lang].guide}</Link>
        <Link to="/catalog" className={`nav-item ${location.pathname === '/catalog' ? 'active' : ''}`}>{t[lang].catalog}</Link>
        <Link to="/adaposturi" className={`nav-item ${location.pathname === '/adaposturi' ? 'active' : ''}`}>{t[lang].shelters}</Link>
        <Link to="/colaborari" className={`nav-item ${location.pathname === '/colaborari' ? 'active' : ''}`}>{t[lang].collaborations}</Link>
        <Link to="/despre-noi" className={`nav-item ${location.pathname === '/despre-noi' ? 'active' : ''}`}>{t[lang].about}</Link>
      </nav>

      <div className="header-actions">
        <Link to="/login" className={`btn-auth ${location.pathname === '/login' ? 'active' : ''}`}>{t[lang].login}</Link>
        
        <div className="lang-toggle">
          <span 
            className={`lang-btn ${lang === 'ro' ? 'active' : ''}`}
            onClick={() => changeLanguage('ro')}
          >
            RO
          </span>
          <span 
            className={`lang-btn ${lang === 'en' ? 'active' : ''}`}
            onClick={() => changeLanguage('en')}
          >
            EN
          </span>
        </div>
      </div>
    </header>
  );
}