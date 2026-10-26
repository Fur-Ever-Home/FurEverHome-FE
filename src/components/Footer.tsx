import { Link } from 'react-router-dom';
import logoIcon from '../assets/logo.png'; // Asigură-te că folosești calea corectă spre logo-ul tău
import './Footer.css';

export default function Footer() {
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
            Platforma de adopții de animale din Iași.
          </p>
          <a href="mailto:contact@fureverhome.ro" className="footer-contact-email">
            contact@fureverhome.ro
          </a>
        </div>

        {/* Partea dreaptă: Linkuri legale */}
        <div className="footer-links-column">
          <Link to="/informatii-legale" className="footer-link font-bold">Informații legale</Link>
          <Link to="/politica-confidentialitate" className="footer-link">Politica de confidențialitate</Link>
          <Link to="/politica-cookies" className="footer-link">Politica de cookies</Link>
          <Link to="/gdpr" className="footer-link">GDPR – drepturile tale</Link>
        </div>
      </div>

      <div className="footer-divider"></div>

      {/* Partea de jos: Copyright și butonul portocaliu */}
      <div className="footer-bottom">
        <p className="footer-copyright">
          © 2026 FureverHome. Toate drepturile rezervate. Textele, logo-ul și designul site-ului nu pot fi copiate fără acordul nostru.
        </p>

        <button className="footer-floating-btn" aria-label="Asistență">
          💬
        </button>
      </div>
    </footer>
  );
}