import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FloatingBtn from '../components/floating-btn';
import { useLanguage } from '../useLanguage';
import { legalTranslations } from '../legalTranslations';
import './politica-confidentialitate.css';

export default function PoliticaConfidentialitate() {
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
              <Link to="/politica-confidentialitate" className="active-link">
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

        {/* Conținutul din mijloc */}
        <main className="main-content">
          <p className="breadcrumb">
            {lang === 'en' ? 'Home › Privacy Policy' : 'Acasă › Politica de confidențialitate'}
          </p>
          <h1>{t.privacyTitle}</h1>
          <span className="subtitle">{t.legalUpdate}</span>

          <section id="informatii-generale">
            <h2>1. {lang === 'en' ? 'General Information' : 'Informații Generale'}</h2>
            <p className="intro-text">
              {t.privacyIntro}
            </p>
          </section>

          <section id="ce-date-colectam">
            <h2>2. {t.dataCollectedTitle}</h2>
            <ul>
              <li>
                <strong>{t.dataId}</strong> {t.dataIdText}
              </li>
              <li>
                <strong>{t.dataProfile}</strong> {t.dataProfileText}
              </li>
              <li>
                <strong>{t.dataFinancial}</strong> {t.dataFinancialText}
              </li>
            </ul>
          </section>

          <section id="scopul-colectarii">
            <h2>3. {t.dataPurposeTitle}</h2>
            <p>{lang === 'en' ? 'Data is used strictly for:' : 'Datele sunt folosite strict pentru:'}</p>
            <ul>
              <li>{t.dataPurpose1}</li>
              <li>{t.dataPurpose2}</li>
              <li>{t.dataPurpose3}</li>
              <li>{t.dataPurpose4}</li>
            </ul>
          </section>

          <section id="partajarea-datelor">
            <h2>4. {t.sharingTitle}</h2>
            <p>
              {t.sharingText}
            </p>
          </section>

          <section id="durata-stocare">
            <h2>5. {t.retentionTitle}</h2>
            <p>
              {t.retentionText}
            </p>
          </section>

          {/* Caseta de contact de la final */}
          <div className="contact-card">
            <h4>
              {lang === 'en' ? 'Questions about privacy?' : 'Ai întrebări legate de confidențialitate?'}
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