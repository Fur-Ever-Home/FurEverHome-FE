import React from 'react';
import { Link } from 'react-router-dom';
import logoIcon from '../assets/logo.png';
import { useLanguage } from '../useLanguage';
import './Footer.css';

export default function Footer() {
  const { lang } = useLanguage();

  // Dicționar pentru textele din Footer
  const t = {
    ro: {
      description: "Platforma de adopții de animale din Iași.",
      legalTitle: "Informații legale",
      privacy: "Politica de confidențialitate",
      cookies: "Politica de cookies",
      gdpr: "GDPR – drepturile tale",
      copyright: "© 2026 FureverHome. Toate drepturile rezervate. Textele, logo-ul și designul site-ului nu pot fi copiate fără acordul nostru."
    },
    en: {
      description: "Pet adoption platform in Iași.",
      legalTitle: "Legal Information",
      privacy: "Privacy Policy",
      cookies: "Cookie Policy",
      gdpr: "GDPR – your rights",
      copyright: "© 2026 FureverHome. All rights reserved. Text, logo, and website design may not be copied without our permission."
    }
  };

  return (
    <footer className="site-footer">
      <div className="footer-content">
        {/* Partea stângă: Logo și descriere */}
        <div className="footer-brand">
          <div className="footer-logo-container">
            <img src={logoIcon} alt="FurEverHome Logo" className="footer-logo-icon" />
            <span className="footer-logo-text">FUREVER<span className="footer-logo-highlight">HOME</span></span>
          </div>
          <p className="footer-description">
            {t[lang].description}
          </p>
          <a href="mailto:contact@fureverhome.ro" className="footer-contact-email">
            contact@fureverhome.ro
          </a>
        </div>

        {/* Partea dreaptă: Linkuri legale */}
        <div className="footer-links-column">
          <span className="footer-link font-bold">{t[lang].legalTitle}</span>
          <Link to="/politica-confidentialitate" className="footer-link">{t[lang].privacy}</Link>
          <Link to="/politica-cookies" className="footer-link">{t[lang].cookies}</Link>
          <Link to="/gdpr" className="footer-link">{t[lang].gdpr}</Link>
        </div>
      </div>

      <div className="footer-divider"></div>

      {/* Partea de jos: Copyright */}
      <div className="footer-bottom">
        <p className="footer-copyright">
          {t[lang].copyright}
        </p>
      </div>
    </footer>
  );
}