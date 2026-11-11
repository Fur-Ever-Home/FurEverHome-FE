import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FloatingBtn from '../components/floating-btn';
import { useLanguage } from '../useLanguage';
import { legalTranslations } from '../legalTranslations';
import './informatii_legae.css';

export default function InformatiiLegale() {
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
              <Link to="/informatii-legale" className="active-link">
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
              <Link to="/gdpr">
                {lang === 'en' ? 'GDPR – Your rights' : 'GDPR – drepturile tale'}
              </Link>
            </li>
          </ul>
        </aside>

        {/* Conținutul din mijloc actualizat */}
        <main className="main-content">
          <p className="breadcrumb">{lang === 'en' ? 'Home › Legal Information' : 'Acasă › Informații legale'}</p>
          <h1>{t.legalTitle}</h1>
          <span className="subtitle">{t.legalUpdate}</span>

          <p className="intro-text">
            {t.legalIntroText}
          </p>

          <section id="scopul-platformei">
            <h2>1. {t.scopeTitle}</h2>
            <p>
              {t.scopeText}
            </p>
          </section>

          <section id="tipuri-utilizatori">
            <h2>2. {t.usersTitle}</h2>
            <ul>
              <li>
                <strong>{t.adoptersLabel}</strong> {t.adoptersText}
              </li>
              <li>
                <strong>{t.sheltersLabel}</strong> {t.sheltersText}
              </li>
            </ul>
          </section>

          <section id="reguli-adoptie">
            <h2>3. {t.adoptionRulesTitle}</h2>
            <p>
              {t.adoptionRulesText}
            </p>
          </section>

          <section id="politica-anti-abuz">
            <h2>4. {t.antiAbuseTitle}</h2>
            <p>
              {t.antiAbuseText}
            </p>
          </section>

          <section id="plati-donatii">
            <h2>5. {t.paymentsTitle}</h2>
            <p>
              {t.paymentsText}
            </p>
          </section>

          <section id="limitarea-raspunderii">
            <h2>6. {t.liabilityTitle}</h2>
            <p>
              {t.liabilityText}
            </p>
          </section>

          {/* Caseta de contact de la final */}
          <div className="contact-card">
            <h4>{lang === 'en' ? 'Got questions?' : 'Ai întrebări?'}</h4>
            <p>
              {lang === 'en' ? 'Write to us at' : 'Scrie-ne la'} <a href="mailto:contact@fureverhome.ro">contact@fureverhome.ro</a> {lang === 'en' ? 'and we will get back to you as soon as possible.' : 'și îți răspundem cât mai repede.'}
            </p>
          </div>
        </main>
      </div>

      <FloatingBtn />
      <Footer />
    </div>
  );
}