import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logoImage from '../assets/logo.png';
import './Header.css';
import { useLanguage } from '../useLanguage';
import { translations } from '../translations';

export default function Header() {
  const location = useLocation();
  const { lang, changeLanguage } = useLanguage();
  const t = translations[lang];

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);


  return (
    <header className="site-header">
      <Link to="/" className="logo-container" style={{ textDecoration: 'none' }}>
        <img src={logoImage} alt="FurEverHome Logo" style={{ height: '40px' }} />
        <div className="logo-text">
          <span className="logo-dark">FUREVER</span>
          <span className="logo-gold">HOME</span>
        </div>
      </Link>

     <nav className={`nav-menu ${isMenuOpen ? 'open' : ''}`}>
        <Link to="/" className={`nav-item ${location.pathname === '/' ? 'active' : ''}`} onClick={closeMenu}>{t.navHome}</Link>
        <Link to="/ghidul-adoptatorului" className={`nav-item ${location.pathname === '/ghidul-adoptatorului' ? 'active' : ''}`} onClick={closeMenu}>{t.navGuide}</Link>
        <Link to="/catalog" className={`nav-item ${location.pathname === '/catalog' ? 'active' : ''}`} onClick={closeMenu}>{t.navCatalog}</Link>
        <Link to="/adaposturi" className={`nav-item ${location.pathname === '/adaposturi' ? 'active' : ''}`} onClick={closeMenu}>{t.navShelters}</Link>
        <Link to="/colaborari" className={`nav-item ${location.pathname === '/colaborari' ? 'active' : ''}`} onClick={closeMenu}>{t.navCollaborators}</Link>
        <Link to="/despre-noi" className={`nav-item ${location.pathname === '/despre-noi' ? 'active' : ''}`} onClick={closeMenu}>{t.navAbout}</Link>
      </nav>

      <div className="header-actions">
        <Link to="/login" className={`btn-auth ${location.pathname === '/login' ? 'active' : ''}`}>
          {t.navLogin || "Autentificare"}
        </Link>

        <div className="lang-toggle">
          <button 
            className={`lang-btn ${lang === 'ro' ? 'active' : ''}`} 
            onClick={() => changeLanguage('ro')}
          >
            RO
          </button>
          <button 
            className={`lang-btn ${lang === 'en' ? 'active' : ''}`} 
            onClick={() => changeLanguage('en')}
          >
            EN
          </button>
        </div>
        <button className="mobile-menu-btn" onClick={toggleMenu} aria-label="Meniu">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
}