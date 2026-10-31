import { Link } from 'react-router-dom';
import logoIcon from '../assets/logo.png'; // Asigură-te că folosești calea corectă spre logo-ul tău
import './Footer.css';
import { useLanguage } from '../useLanguage';
import { translations } from '../translations';

export default function Footer() {
  const { lang } = useLanguage();
  const t = translations[lang];
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
            {t.footerDesc}
          </p>
          <a href="mailto:contact@fureverhome.ro" className="footer-contact-email">
            contact@fureverhome.ro
          </a>
        </div>

        {/* Partea dreaptă: Linkuri legale */}
        <div className="footer-links-column">
          <span className="footer-link font-bold">{t.footerLegalTitle}</span>
          <Link to="/politica-confidentialitate" className="footer-link">{t.footerPrivacy}</Link>
          <Link to="/politica-cookies" className="footer-link">{t.footerCookies}</Link>
          <Link to="/gdpr" className="footer-link">{t.footerGdpr}</Link>
        </div>
      </div>

      <div className="footer-divider"></div>

      {/* Partea de jos: Copyright */}
      <div className="footer-bottom">
        <p className="footer-copyright">
          {t.footerCopyright}
        </p>
      </div>
    </footer>
  );
}