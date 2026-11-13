import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FloatingBtn from '../components/floating-btn';
import heroImage from '../assets/hero-image.png';
import { useLanguage } from '../useLanguage';
import { despreNoiTranslations } from '../despreNoiTranslations';
import './DespreNoi.css';

export default function DespreNoi() {
  const { lang } = useLanguage();
  const t = despreNoiTranslations[lang] || despreNoiTranslations.ro;

  const [formData, setFormData] = useState({
    nume: '',
    email: '',
    subiect: '',
    mesaj: '',
    gdpr: false,
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.gdpr) {
      alert(t.formGdprAlert);
      return;
    }
    setSubmitted(true);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="despre-noi-page">
      <Header />

      <main className="dn-container">
        {/* ================= BREADCRUMBS ================= */}
        <nav className="dn-breadcrumbs" aria-label="Breadcrumb">
          <Link to="/" className="dn-breadcrumb-link">
            {t.breadcrumbHome}
          </Link>
          <span className="dn-breadcrumb-separator">&gt;</span>
          <span className="dn-breadcrumb-current">{t.breadcrumbAbout}</span>
        </nav>

        {/* ================= HERO SECTION ================= */}
        <section className="dn-hero-section">
          <div className="dn-hero-grid">
            <div className="dn-hero-content">
              <span className="dn-section-tag">{t.heroTag}</span>
              <h1 className="dn-hero-title">
                {t.heroTitleLine1}{' '}
                <span className="dn-hero-title-highlight">
                  {t.heroTitleLine2}
                </span>
              </h1>
              <p className="dn-hero-description">{t.heroDesc}</p>
              <div className="dn-hero-buttons">
                <button
                  type="button"
                  className="dn-btn-primary"
                  onClick={() => scrollToSection('misiune-section')}
                >
                  {t.btnMission}
                </button>
                <button
                  type="button"
                  className="dn-btn-secondary"
                  onClick={() => scrollToSection('contact-section')}
                >
                  {t.btnContact}
                </button>
              </div>
            </div>

            <div className="dn-hero-image-wrapper">
              <img
                src={heroImage}
                alt={t.heroImageAlt}
                className="dn-hero-image"
              />
            </div>
          </div>
        </section>

        {/* ================= MISIUNEA PLATFORMEI ================= */}
        <section id="misiune-section" className="dn-mission-section">
          <div className="dn-mission-header">
            <span className="dn-section-tag">{t.missionTag}</span>
            <h2 className="dn-section-title">{t.missionTitle}</h2>
            <p className="dn-section-subtitle">{t.missionDesc}</p>
          </div>

          <div className="dn-quote-card">
            <div className="dn-quote-icon" aria-hidden="true">
              “
            </div>
            <div className="dn-quote-content">
              <div className="dn-quote-tag">{t.quoteTag}</div>
              <p className="dn-quote-text">{t.quoteText}</p>
            </div>
          </div>
        </section>

        {/* ================= CELE 3 PILOANE ================= */}
        <section className="dn-pillars-section">
          <div className="dn-pillars-grid">
            {/* Card 1: Transparență */}
            <div className="dn-pillar-card">
              <div className="dn-pillar-icon-box" aria-hidden="true">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
              </div>
              <h3 className="dn-pillar-title">{t.pillar1Title}</h3>
              <p className="dn-pillar-text">{t.pillar1Text}</p>
            </div>

            {/* Card 2: Simplitate */}
            <div className="dn-pillar-card">
              <div className="dn-pillar-icon-box" aria-hidden="true">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                  <line x1="8" y1="21" x2="16" y2="21"></line>
                  <line x1="12" y1="17" x2="12" y2="21"></line>
                </svg>
              </div>
              <h3 className="dn-pillar-title">{t.pillar2Title}</h3>
              <p className="dn-pillar-text">{t.pillar2Text}</p>
            </div>

            {/* Card 3: Colaborare */}
            <div className="dn-pillar-card">
              <div className="dn-pillar-icon-box" aria-hidden="true">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
              </div>
              <h3 className="dn-pillar-title">{t.pillar3Title}</h3>
              <p className="dn-pillar-text">{t.pillar3Text}</p>
            </div>
          </div>
        </section>

        {/* ================= PENTRU ADOPTATORI & ADĂPOSTURI ================= */}
        <section className="dn-roles-section">
          <div className="dn-roles-grid">
            {/* Card Adoptatori */}
            <div className="dn-role-card">
              <div className="dn-role-header">
                <div className="dn-role-icon-box" aria-hidden="true">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                  </svg>
                </div>
                <h3 className="dn-role-title">{t.adoptersTitle}</h3>
              </div>
              <ul className="dn-role-list">
                <li className="dn-role-list-item">
                  <span className="dn-role-bullet">•</span>
                  <span>{t.adoptersPoint1}</span>
                </li>
                <li className="dn-role-list-item">
                  <span className="dn-role-bullet">•</span>
                  <span>{t.adoptersPoint2}</span>
                </li>
                <li className="dn-role-list-item">
                  <span className="dn-role-bullet">•</span>
                  <span>{t.adoptersPoint3}</span>
                </li>
                <li className="dn-role-list-item">
                  <span className="dn-role-bullet">•</span>
                  <span>{t.adoptersPoint4}</span>
                </li>
              </ul>
            </div>

            {/* Card Adăposturi */}
            <div className="dn-role-card">
              <div className="dn-role-header">
                <div className="dn-role-icon-box" aria-hidden="true">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
                    <path d="M9 22v-4h6v4"></path>
                    <line x1="8" y1="6" x2="10" y2="6"></line>
                    <line x1="14" y1="6" x2="16" y2="6"></line>
                    <line x1="8" y1="10" x2="10" y2="10"></line>
                    <line x1="14" y1="10" x2="16" y2="10"></line>
                    <line x1="8" y1="14" x2="10" y2="14"></line>
                    <line x1="14" y1="14" x2="16" y2="14"></line>
                  </svg>
                </div>
                <h3 className="dn-role-title">{t.sheltersTitle}</h3>
              </div>
              <ul className="dn-role-list">
                <li className="dn-role-list-item">
                  <span className="dn-role-bullet">•</span>
                  <span>{t.sheltersPoint1}</span>
                </li>
                <li className="dn-role-list-item">
                  <span className="dn-role-bullet">•</span>
                  <span>{t.sheltersPoint2}</span>
                </li>
                <li className="dn-role-list-item">
                  <span className="dn-role-bullet">•</span>
                  <span>{t.sheltersPoint3}</span>
                </li>
                <li className="dn-role-list-item">
                  <span className="dn-role-bullet">•</span>
                  <span>{t.sheltersPoint4}</span>
                </li>
              </ul>
              <Link to="/colaborari" className="dn-role-btn">
                <span>{t.btnCollab}</span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </section>

        {/* ================= CONTACT SECTION ================= */}
        <section id="contact-section" className="dn-contact-section">
          <div className="dn-contact-grid">
            {/* Coloana stângă: Informații de contact */}
            <div className="dn-contact-info-col">
              <span className="dn-section-tag">{t.contactTag}</span>
              <h2 className="dn-contact-title">{t.contactTitle}</h2>
              <p className="dn-contact-desc">{t.contactDesc}</p>

              <div className="dn-contact-details">
                {/* Email */}
                <div className="dn-contact-row">
                  <div className="dn-contact-row-icon" aria-hidden="true">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  </div>
                  <div className="dn-contact-row-content">
                    <span className="dn-contact-row-label">{t.labelEmail}</span>
                    <a
                      href="mailto:contact@fureverhome.ro"
                      className="dn-contact-row-value"
                    >
                      contact@fureverhome.ro
                    </a>
                  </div>
                </div>

                {/* Oraș */}
                <div className="dn-contact-row">
                  <div className="dn-contact-row-icon" aria-hidden="true">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                  </div>
                  <div className="dn-contact-row-content">
                    <span className="dn-contact-row-label">{t.labelCity}</span>
                    <span className="dn-contact-row-value">{t.valueCity}</span>
                  </div>
                </div>

                {/* Timp de răspuns */}
                <div className="dn-contact-row">
                  <div className="dn-contact-row-icon" aria-hidden="true">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                  </div>
                  <div className="dn-contact-row-content">
                    <span className="dn-contact-row-label">{t.labelResponseTime}</span>
                    <span className="dn-contact-row-value">
                      {t.valueResponseTime}
                    </span>
                  </div>
                </div>
              </div>

              {/* Caseta Adăpost din Iași */}
              <div className="dn-shelter-box">
                <h4 className="dn-shelter-box-title">{t.shelterBoxTitle}</h4>
                <p className="dn-shelter-box-text">{t.shelterBoxText}</p>
              </div>
            </div>

            {/* Coloana dreaptă: Formular */}
            <div className="dn-form-card">
              <h3 className="dn-form-title">{t.formTitle}</h3>

              {submitted ? (
                <div className="dn-form-success">{t.formSuccess}</div>
              ) : (
                <form className="dn-form" onSubmit={handleSubmit}>
                  <div className="dn-form-row">
                    <div className="dn-form-group">
                      <label className="dn-form-label" htmlFor="dn-nume">
                        {t.formNameLabel}
                      </label>
                      <input
                        id="dn-nume"
                        type="text"
                        required
                        className="dn-form-input"
                        placeholder={t.formNamePlaceholder}
                        value={formData.nume}
                        onChange={(e) =>
                          setFormData({ ...formData, nume: e.target.value })
                        }
                      />
                    </div>
                    <div className="dn-form-group">
                      <label className="dn-form-label" htmlFor="dn-email">
                        {t.formEmailLabel}
                      </label>
                      <input
                        id="dn-email"
                        type="email"
                        required
                        className="dn-form-input"
                        placeholder={t.formEmailPlaceholder}
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="dn-form-group">
                    <label className="dn-form-label" htmlFor="dn-subiect">
                      {t.formSubjectLabel}
                    </label>
                    <select
                      id="dn-subiect"
                      required
                      className="dn-form-select"
                      value={formData.subiect}
                      onChange={(e) =>
                        setFormData({ ...formData, subiect: e.target.value })
                      }
                    >
                      <option value="" disabled>
                        {t.formSubjectPlaceholder}
                      </option>
                      <option value="adoptie">{t.formSubjectOption1}</option>
                      <option value="adapost">{t.formSubjectOption2}</option>
                      <option value="colaborare">{t.formSubjectOption3}</option>
                      <option value="altceva">{t.formSubjectOption4}</option>
                    </select>
                  </div>

                  <div className="dn-form-group">
                    <label className="dn-form-label" htmlFor="dn-mesaj">
                      {t.formMessageLabel}
                    </label>
                    <textarea
                      id="dn-mesaj"
                      required
                      className="dn-form-textarea"
                      placeholder={t.formMessagePlaceholder}
                      value={formData.mesaj}
                      onChange={(e) =>
                        setFormData({ ...formData, mesaj: e.target.value })
                      }
                    ></textarea>
                  </div>

                  <div className="dn-checkbox-group">
                    <input
                      id="dn-gdpr"
                      type="checkbox"
                      required
                      className="dn-checkbox"
                      checked={formData.gdpr}
                      onChange={(e) =>
                        setFormData({ ...formData, gdpr: e.target.checked })
                      }
                    />
                    <label className="dn-checkbox-label" htmlFor="dn-gdpr">
                      {t.formGdprAgree}{' '}
                      <Link to="/politica-confidentialitate">
                        {t.formGdprLink}
                      </Link>
                      .
                    </label>
                  </div>

                  <button type="submit" className="dn-form-submit-btn">
                    {t.formSubmitBtn}
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* ================= BOTTOM CTA BANNER ================= */}
        <section className="dn-cta-section">
          <div className="dn-cta-banner">
            <h3 className="dn-cta-text">
              {t.ctaTextPart1}{' '}
              <span className="dn-cta-highlight">{t.ctaTextHighlight}</span>
            </h3>
            <Link to="/colaborari" className="dn-cta-btn">
              <span>{t.ctaBtn}</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingBtn />
    </div>
  );
}
