import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FloatingBtn from '../components/floating-btn';
import { useLanguage } from '../useLanguage';
import { legalTranslations } from '../legalTranslations';
import './GDPR.css';

export default function GDPR() {
  const { lang } = useLanguage();
  const t = legalTranslations[lang as keyof typeof legalTranslations] || legalTranslations.ro;

  return (
    <div className="page-container">
      <Header />

      <div className="content-wrapper">
        {/* Navigarea din stânga - Cuprins */}
        <aside className="sidebar-cuprins">
          <h3>{lang === 'en' ? 'Table of Contents' : 'Cuprins'}</h3>
          <ul className="cuprins-list">
            <li>
              <Link to="/informatii-legale">
                {t.legalTitle}
              </Link>
            </li>
            <li>
              <Link to="/politica-confidentialitate">
                {t.privacyTitle}
              </Link>
            </li>
            <li>
              <Link to="/politica-cookies">
                {t.cookiesTitle}
              </Link>
            </li>
            <li>
              <Link to="/gdpr" className="active-link">
                {lang === 'en' ? 'GDPR – Your rights' : 'GDPR – drepturile tale'}
              </Link>
            </li>
          </ul>
        </aside>

        {/* Conținutul din mijloc */}
        <main className="main-content">
          <p className="breadcrumb">
            {lang === 'en' ? 'Home › GDPR – Your rights' : 'Acasă › GDPR – drepturile tale'}
          </p>
          <h1>{t.gdprTitle}</h1>
          <span className="subtitle">{t.legalUpdate}</span>

          <section id="informatii-gdpr">
            <p className="intro-text">{t.gdprIntro}</p>
          </section>

          <section id="drepturile-utilizatorului">
            <h2>{lang === 'en' ? 'Your Rights as a User' : 'Drepturile tale de utilizator'}</h2>
            <ul>
              <li>
                <strong>{t.gdprAccess}</strong> {t.gdprAccessText}
              </li>
              <li>
                <strong>{t.gdprRect}</strong> {t.gdprRectText}
              </li>
              <li>
                <strong>{t.gdprDelete}</strong> {t.gdprDeleteText}
              </li>
              <li>
                <strong>{t.gdprPortability}</strong> {t.gdprPortabilityText}
              </li>
            </ul>
          </section>

          {/* Caseta de contact de la final */}
          <div className="contact-card">
            <h4>{t.gdprContactBoxTitle}</h4>
            <p>
              {t.gdprContactBoxText}{' '}
              <a href="mailto:contact@fureverhome.ro">contact@fureverhome.ro</a>. {t.gdprResponse}
            </p>
          </div>
        </main>
      </div>

      <FloatingBtn />
      <Footer />
    </div>
  );
}