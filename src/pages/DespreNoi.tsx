import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FloatingBtn from '../components/floating-btn';
import heroImage from '../assets/hero-image.png';
import './DespreNoi.css';

export default function DespreNoi() {
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
      alert('Te rugăm să bifezi acordul de confidențialitate.');
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
            Acasă
          </Link>
          <span className="dn-breadcrumb-separator">&gt;</span>
          <span className="dn-breadcrumb-current">Despre noi</span>
        </nav>

        {/* ================= HERO SECTION ================= */}
        <section className="dn-hero-section">
          <div className="dn-hero-grid">
            <div className="dn-hero-content">
              <span className="dn-section-tag">DESPRE NOI</span>
              <h1 className="dn-hero-title">
                Fiecare animal merită un cămin.
                <span className="dn-hero-title-highlight">
                  Noi scurtăm drumul până la el.
                </span>
              </h1>
              <p className="dn-hero-description">
                FurEverHome adună într-un singur loc animalele din adăposturile din
                Iași, ca adopția să fie simplă, transparentă și programată online.
              </p>
              <div className="dn-hero-buttons">
                <button
                  type="button"
                  className="dn-btn-primary"
                  onClick={() => scrollToSection('misiune-section')}
                >
                  Misiunea platformei
                </button>
                <button
                  type="button"
                  className="dn-btn-secondary"
                  onClick={() => scrollToSection('contact-section')}
                >
                  Contact
                </button>
              </div>
            </div>

            <div className="dn-hero-image-wrapper">
              <img
                src={heroImage}
                alt="Două tinere zâmbind cu un câine și o pisică"
                className="dn-hero-image"
              />
            </div>
          </div>
        </section>

        {/* ================= MISIUNEA PLATFORMEI ================= */}
        <section id="misiune-section" className="dn-mission-section">
          <div className="dn-mission-header">
            <span className="dn-section-tag">MISIUNEA PLATFORMEI</span>
            <h2 className="dn-section-title">
              Mai puține anunțuri pierdute, mai multe animale acasă
            </h2>
            <p className="dn-section-subtitle">
              Azi, un animal din adăpost ajunge la tine prin zeci de postări pe
              Facebook sau OLX. Noi le punem pe toate într-un singur loc.
            </p>
          </div>

          <div className="dn-quote-card">
            <div className="dn-quote-icon" aria-hidden="true">
              “
            </div>
            <div className="dn-quote-content">
              <div className="dn-quote-tag">MISIUNEA NOASTRĂ</div>
              <p className="dn-quote-text">
                Vrem ca oricine se gândește să adopte să găsească toate animalele
                disponibile într-un singur loc și să programeze o vizită în câteva
                minute.
              </p>
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
              <h3 className="dn-pillar-title">Transparență</h3>
              <p className="dn-pillar-text">
                Fiecare profil spune tot: vârsta, sănătatea, temperamentul și cu cine
                se înțelege animalul.
              </p>
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
              <h3 className="dn-pillar-title">Simplitate</h3>
              <p className="dn-pillar-text">
                Programezi vizita online, direct din profilul animalului. Fără
                telefoane la care nu răspunde nimeni.
              </p>
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
              <h3 className="dn-pillar-title">Colaborare</h3>
              <p className="dn-pillar-text">
                Lucrăm împreună cu adăposturile și voluntarii, nu în locul lor.
              </p>
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
                <h3 className="dn-role-title">Pentru adoptatori</h3>
              </div>
              <ul className="dn-role-list">
                <li className="dn-role-list-item">
                  <span className="dn-role-bullet">•</span>
                  <span>Cauți și filtrezi animalele din toate adăposturile</span>
                </li>
                <li className="dn-role-list-item">
                  <span className="dn-role-bullet">•</span>
                  <span>Programezi vizite online și le vezi în Rezervările mele</span>
                </li>
                <li className="dn-role-list-item">
                  <span className="dn-role-bullet">•</span>
                  <span>Salvezi la favorite animalele care îți plac</span>
                </li>
                <li className="dn-role-list-item">
                  <span className="dn-role-bullet">•</span>
                  <span>Ai un ghid care te ajută pas cu pas</span>
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
                <h3 className="dn-role-title">Pentru adăposturi</h3>
              </div>
              <ul className="dn-role-list">
                <li className="dn-role-list-item">
                  <span className="dn-role-bullet">•</span>
                  <span>Publici profiluri complete pentru fiecare animal</span>
                </li>
                <li className="dn-role-list-item">
                  <span className="dn-role-bullet">•</span>
                  <span>Primești și gestionezi programările din Panoul centrului</span>
                </li>
                <li className="dn-role-list-item">
                  <span className="dn-role-bullet">•</span>
                  <span>Primești sprijin lunar prin adopția la distanță</span>
                </li>
                <li className="dn-role-list-item">
                  <span className="dn-role-bullet">•</span>
                  <span>Ajungi la oameni care chiar vor să adopte</span>
                </li>
              </ul>
              <Link to="/colaborari" className="dn-role-btn">
                <span>Vrei să colaborăm?</span>
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
              <span className="dn-section-tag">CONTACT</span>
              <h2 className="dn-contact-title">Scrie-ne</h2>
              <p className="dn-contact-desc">
                Ai o întrebare, o idee sau vrei să ne semnalezi o problemă? Îți
                răspundem cât de repede putem.
              </p>

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
                    <span className="dn-contact-row-label">Email</span>
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
                    <span className="dn-contact-row-label">Oraș</span>
                    <span className="dn-contact-row-value">Iași, România</span>
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
                    <span className="dn-contact-row-label">Timp de răspuns</span>
                    <span className="dn-contact-row-value">
                      De obicei, în 1–2 zile lucrătoare
                    </span>
                  </div>
                </div>
              </div>

              {/* Caseta Adăpost din Iași */}
              <div className="dn-shelter-box">
                <h4 className="dn-shelter-box-title">Ești un adăpost din Iași?</h4>
                <p className="dn-shelter-box-text">
                  Hai să-ți publicăm animalele pe platformă. Alege „Sunt un adăpost”
                  la subiect și te contactăm noi.
                </p>
              </div>
            </div>

            {/* Coloana dreaptă: Formular */}
            <div className="dn-form-card">
              <h3 className="dn-form-title">Trimite-ne un mesaj</h3>

              {submitted ? (
                <div className="dn-form-success">
                  Mulțumim pentru mesaj! Am recepționat solicitarea ta și îți vom
                  răspunde în cel mai scurt timp.
                </div>
              ) : (
                <form className="dn-form" onSubmit={handleSubmit}>
                  <div className="dn-form-row">
                    <div className="dn-form-group">
                      <label className="dn-form-label" htmlFor="dn-nume">
                        Nume
                      </label>
                      <input
                        id="dn-nume"
                        type="text"
                        required
                        className="dn-form-input"
                        placeholder="Numele tău"
                        value={formData.nume}
                        onChange={(e) =>
                          setFormData({ ...formData, nume: e.target.value })
                        }
                      />
                    </div>
                    <div className="dn-form-group">
                      <label className="dn-form-label" htmlFor="dn-email">
                        Email
                      </label>
                      <input
                        id="dn-email"
                        type="email"
                        required
                        className="dn-form-input"
                        placeholder="nume@exemplu.ro"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="dn-form-group">
                    <label className="dn-form-label" htmlFor="dn-subiect">
                      Subiect
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
                        Alege un subiect (Adopție, Sunt un adăpost, Colaborare,
                        Altceva)
                      </option>
                      <option value="adoptie">Adopție</option>
                      <option value="adapost">Sunt un adăpost</option>
                      <option value="colaborare">Colaborare</option>
                      <option value="altceva">Altceva</option>
                    </select>
                  </div>

                  <div className="dn-form-group">
                    <label className="dn-form-label" htmlFor="dn-mesaj">
                      Mesaj
                    </label>
                    <textarea
                      id="dn-mesaj"
                      required
                      className="dn-form-textarea"
                      placeholder="Scrie-ne cu ce te putem ajuta..."
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
                      Sunt de acord ca datele mele să fie folosite doar pentru a-mi
                      răspunde. Detalii în{' '}
                      <Link to="/politica-confidentialitate">
                        Politica de confidențialitate
                      </Link>
                      .
                    </label>
                  </div>

                  <button type="submit" className="dn-form-submit-btn">
                    Trimite mesajul
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
              Nu poți adopta acum?{' '}
              <span className="dn-cta-highlight">Poți ajuta altfel.</span>
            </h3>
            <Link to="/colaborari" className="dn-cta-btn">
              <span>Cum poți ajuta</span>
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
