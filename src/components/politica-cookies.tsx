import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FloatingBtn from '../components/floating-btn';
import { useLanguage } from '../useLanguage';
import { legalTranslations } from '../legalTranslations';
import './politica-cookies.css';

export default function PoliticaCookies() {
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
              <Link to="/politica-cookies" className="active-link">
                {t.cookiesTitle}
              </Link>
            </li>
            <li>
              <Link to="/gdpr">
                {lang === 'en' ? 'GDPR – Your rights' : 'GDPR – drepturile tale'}
              </Link>
            </li>
          </ul>
        </aside>

        {/* Conținutul din mijloc */}
        <main className="main-content">
          <p className="breadcrumb">
            {lang === 'en' ? 'Home › Cookie Policy' : 'Acasă › Politica de cookies'}
          </p>
          <h1>{t.cookiesTitle}</h1>
          <span className="subtitle">{t.legalUpdate}</span>

          <section id="ce-sunt-cookie-urile">
            <h2>1. {t.cookiesWhatTitle}</h2>
            <p className="intro-text">
              {t.cookiesWhatText}
            </p>
          </section>

          <section id="tipuri-de-cookies">
            <h2>2. {t.cookiesTypesTitle}</h2>
            <ul>
              <li>
                <strong>{t.cookieEssential}</strong> {t.cookieEssentialText}
              </li>
              <li>
                <strong>{t.cookiePerf}</strong> {t.cookiePerfText}
              </li>
            </ul>
          </section>

          <section id="gestionare-cookies">
            <h2>3. {t.cookiesManageTitle}</h2>
            <p>
              {t.cookiesManageText}
            </p>
          </section>

          {/* Caseta de contact de la final */}
          <div className="contact-card">
            <h4>
              {lang === 'en' ? 'Questions about cookies?' : 'Ai întrebări despre cookie-uri?'}
            </h4>
            <p>
              {lang === 'en' ? 'Write to us at' : 'Scrie-ne la'}{' '}
              <a href="mailto:contact@fureverhome.ro">contact@fureverhome.ro</a>{' '}
              {lang === 'en' ? 'and we will get back to you as soon as possible.' : 'și îți răspundem cât mai repede.'}
            </p>
          </div>
        </main>
      </div>

      <FloatingBtn />
      <Footer />
    </div>
  );
}