import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FloatingBtn from '../components/floating-btn';
import { API_BASE_URL } from '../config';
import { useLanguage } from '../useLanguage';
import { colaborariTranslations } from '../colaborariTranslations';
import './Colaborari.css';
import './Colaborari.mobile.css';

export default function Colaborari() {
  const { lang } = useLanguage();
  const t = colaborariTranslations[lang] || colaborariTranslations.ro;

  // Derulare la începutul paginii când este deschisă
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Statistici: Valori implicite din Figma cu suport pentru preluare din backend când devine disponibil
  const [stats, setStats] = useState({
    partners: t.statPartnersNum,
    sponsors: t.statSponsorsNum,
    volunteers: t.statVolunteersNum,
  });

  useEffect(() => {
    setStats({
      partners: t.statPartnersNum,
      sponsors: t.statSponsorsNum,
      volunteers: t.statVolunteersNum,
    });
  }, [t]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/colaborari/stats`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data) {
          setStats({
            partners: String(data.partners ?? data.parteneri ?? t.statPartnersNum),
            sponsors: String(data.sponsors ?? data.sponsori ?? t.statSponsorsNum),
            volunteers: String(data.volunteers ?? data.voluntari ?? t.statVolunteersNum),
          });
        }
      })
      .catch(() => {
        // Backend endpoint-ul nu este încă creat; se păstrează cifrele din Figma ca fallback
      });
  }, [t]);

  // Formular Voluntar
  const [volData, setVolData] = useState({
    nume: '',
    telefon: '',
    email: '',
    activitate: '',
    disponibilitate: '',
    despreTine: '',
    gdpr: false,
  });
  const [volSubmitted, setVolSubmitted] = useState(false);

  // Formular Donează
  const [selectedAmount, setSelectedAmount] = useState<number | 'custom'>(50);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [isRecurring, setIsRecurring] = useState<boolean>(false);
  const [donData, setDonData] = useState({
    nume: '',
    email: '',
    adapost: 'oricare',
  });
  const [donSubmitted, setDonSubmitted] = useState(false);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleVolSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!volData.gdpr) {
      alert(t.volGdprAlert);
      return;
    }
    setVolSubmitted(true);
  };

  const handleDonSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalAmount = selectedAmount === 'custom' ? parseFloat(customAmount) : selectedAmount;
    if (!finalAmount || isNaN(finalAmount) || finalAmount <= 0) {
      alert(t.donAmountAlert);
      return;
    }
    setDonSubmitted(true);
  };

  const partners = [
    {
      initials: t.partner1Initials,
      name: t.partner1Name,
      category: t.partner1Category,
      desc: t.partner1Desc,
    },
    {
      initials: t.partner2Initials,
      name: t.partner2Name,
      category: t.partner2Category,
      desc: t.partner2Desc,
    },
    {
      initials: t.partner3Initials,
      name: t.partner3Name,
      category: t.partner3Category,
      desc: t.partner3Desc,
    },
    {
      initials: t.partner4Initials,
      name: t.partner4Name,
      category: t.partner4Category,
      desc: t.partner4Desc,
    },
    {
      initials: t.partner5Initials,
      name: t.partner5Name,
      category: t.partner5Category,
      desc: t.partner5Desc,
    },
    {
      initials: t.partner6Initials,
      name: t.partner6Name,
      category: t.partner6Category,
      desc: t.partner6Desc,
    },
  ];

  const mainSponsors = [
    { name: t.sponsor1Name, label: t.sponsorPrincipalLabel },
    { name: t.sponsor2Name, label: t.sponsorPrincipalLabel },
  ];

  const regularSponsors = [
    { name: t.sponsor3Name, label: t.sponsorRegularLabel },
    { name: t.sponsor4Name, label: t.sponsorRegularLabel },
    { name: t.sponsor5Name, label: t.sponsorRegularLabel },
    { name: t.sponsor6Name, label: t.sponsorRegularLabel },
  ];

  return (
    <div className="colaborari-page">
      <Header />

      <main className="colaborari-container">
        {/* ================= BREADCRUMBS ================= */}
        <nav className="colab-breadcrumbs" aria-label="Breadcrumb">
          <Link to="/">{t.breadcrumbHome}</Link>
          <span className="colab-breadcrumb-separator">&gt;</span>
          <span className="colab-breadcrumb-current">{t.breadcrumbCollaborators}</span>
        </nav>

        {/* ================= HERO SECTION ================= */}
        <section className="colab-hero">
          <div className="colab-hero-left">
            <span className="colab-hero-tag">{t.heroTag}</span>
            <h1 className="colab-hero-title">
              {t.heroTitleLine1}
              <br />
              {t.heroTitleLine2}
            </h1>
            <p className="colab-hero-desc">{t.heroDesc}</p>
            <div className="colab-hero-cta-group">
              <button
                type="button"
                className="colab-btn-primary"
                onClick={() => scrollToSection('formular-voluntar')}
              >
                {t.btnVolunteer}
              </button>
              <button
                type="button"
                className="colab-btn-secondary"
                onClick={() => scrollToSection('formular-doneaza')}
              >
                {t.btnDonate}
              </button>
            </div>
          </div>

          <div className="colab-stats-card">
            <div className="colab-stat-row">
              <span className="colab-stat-number">{stats.partners}</span>
              <span className="colab-stat-label">{t.statPartnersLabel}</span>
            </div>
            <div className="colab-stat-divider"></div>
            <div className="colab-stat-row">
              <span className="colab-stat-number">{stats.sponsors}</span>
              <span className="colab-stat-label">{t.statSponsorsLabel}</span>
            </div>
            <div className="colab-stat-divider"></div>
            <div className="colab-stat-row">
              <span className="colab-stat-number">{stats.volunteers}</span>
              <span className="colab-stat-label">{t.statVolunteersLabel}</span>
            </div>
          </div>
        </section>

        {/* ================= PARTENERII NOSTRI ================= */}
        <section className="colab-section">
          <h2 className="colab-section-title">{t.partnersTitle}</h2>
          <p className="colab-section-desc">{t.partnersDesc}</p>

          <div className="colab-partners-grid">
            {partners.map((partner, index) => (
              <article key={index} className="colab-partner-card">
                <div className="colab-partner-header">
                  <div className="colab-partner-badge">{partner.initials}</div>
                  <div className="colab-partner-info">
                    <h3 className="colab-partner-name">{partner.name}</h3>
                    <span className="colab-partner-category">{partner.category}</span>
                  </div>
                </div>
                <p className="colab-partner-desc">{partner.desc}</p>
              </article>
            ))}
          </div>
        </section>

        {/* ================= SPONSORII NOSTRI ================= */}
        <section className="colab-section">
          <h2 className="colab-section-title">{t.sponsorsTitle}</h2>
          <p className="colab-section-desc">{t.sponsorsDesc}</p>

          <h3 className="colab-sponsors-group-title">{t.sponsorsMainTitle}</h3>
          <div className="colab-sponsors-main-grid">
            {mainSponsors.map((sponsor, index) => (
              <div key={index} className="colab-sponsor-card">
                <div className="colab-sponsor-logo-box main">LOGO</div>
                <h4 className="colab-sponsor-name">{sponsor.name}</h4>
                <p className="colab-sponsor-label">{sponsor.label}</p>
              </div>
            ))}
          </div>

          <h3 className="colab-sponsors-group-title">{t.sponsorsRegularTitle}</h3>
          <div className="colab-sponsors-regular-grid">
            {regularSponsors.map((sponsor, index) => (
              <div key={index} className="colab-sponsor-card">
                <div className="colab-sponsor-logo-box regular">LOGO</div>
                <h4 className="colab-sponsor-name">{sponsor.name}</h4>
                <p className="colab-sponsor-label">{sponsor.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ================= IMPLICA-TE (FORMULARE) ================= */}
        <section className="colab-section" id="sectiune-implicare">
          <h2 className="colab-section-title">{t.getInvolvedTitle}</h2>
          <p className="colab-section-desc">{t.getInvolvedDesc}</p>

          <div className="colab-forms-grid">
            {/* Formular Devino Voluntar */}
            <div className="colab-form-card" id="formular-voluntar">
              <h3 className="colab-form-title">{t.volFormTitle}</h3>
              <p className="colab-form-subtitle">{t.volFormDesc}</p>

              {volSubmitted ? (
                <div className="colab-success-alert">
                  {t.volSuccessMessage}
                </div>
              ) : (
                <form onSubmit={handleVolSubmit}>
                  <div className="colab-form-row-2col">
                    <div className="colab-form-group">
                      <label className="colab-form-label" htmlFor="vol-nume">
                        {t.labelFullName}
                      </label>
                      <input
                        id="vol-nume"
                        type="text"
                        className="colab-input"
                        placeholder={t.placeholderFullName}
                        value={volData.nume}
                        onChange={(e) => setVolData({ ...volData, nume: e.target.value })}
                        required
                      />
                    </div>
                    <div className="colab-form-group">
                      <label className="colab-form-label" htmlFor="vol-telefon">
                        {t.labelPhone}
                      </label>
                      <input
                        id="vol-telefon"
                        type="tel"
                        className="colab-input"
                        placeholder={t.placeholderPhone}
                        value={volData.telefon}
                        onChange={(e) => setVolData({ ...volData, telefon: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="colab-form-group">
                    <label className="colab-form-label" htmlFor="vol-email">
                      {t.labelEmail}
                    </label>
                    <input
                      id="vol-email"
                      type="email"
                      className="colab-input"
                      placeholder={t.placeholderEmail}
                      value={volData.email}
                      onChange={(e) => setVolData({ ...volData, email: e.target.value })}
                      required
                    />
                  </div>

                  <div className="colab-form-group">
                    <label className="colab-form-label" htmlFor="vol-activitate">
                      {t.labelHelpWith}
                    </label>
                    <select
                      id="vol-activitate"
                      className="colab-select"
                      value={volData.activitate}
                      onChange={(e) => setVolData({ ...volData, activitate: e.target.value })}
                      required
                    >
                      <option value="" disabled>
                        {t.chooseActivity}
                      </option>
                      <option value="promovare">{t.activityPromotion}</option>
                      <option value="ingrijire">{t.activityShelterCare}</option>
                      <option value="transport">{t.activityTransport}</option>
                      <option value="evenimente">{t.activityEvents}</option>
                      <option value="altceva">{t.activityOther}</option>
                    </select>
                  </div>

                  <div className="colab-form-group">
                    <label className="colab-form-label" htmlFor="vol-disponibilitate">
                      {t.labelAvailability}
                    </label>
                    <select
                      id="vol-disponibilitate"
                      className="colab-select"
                      value={volData.disponibilitate}
                      onChange={(e) => setVolData({ ...volData, disponibilitate: e.target.value })}
                      required
                    >
                      <option value="" disabled>
                        {t.chooseAvailability}
                      </option>
                      <option value="weekend">{t.availWeekend}</option>
                      <option value="weekdays">{t.availWeekdays}</option>
                      <option value="flexibil">{t.availFlexible}</option>
                      <option value="peste5ore">{t.availMore}</option>
                    </select>
                  </div>

                  <div className="colab-form-group">
                    <label className="colab-form-label" htmlFor="vol-despre">
                      {t.labelAboutYou}
                    </label>
                    <textarea
                      id="vol-despre"
                      className="colab-textarea"
                      placeholder={t.placeholderAboutYou}
                      value={volData.despreTine}
                      onChange={(e) => setVolData({ ...volData, despreTine: e.target.value })}
                      rows={3}
                    />
                  </div>

                  <label className="colab-checkbox-group">
                    <input
                      type="checkbox"
                      className="colab-checkbox"
                      checked={volData.gdpr}
                      onChange={(e) => setVolData({ ...volData, gdpr: e.target.checked })}
                      required
                    />
                    <span className="colab-checkbox-text">
                      {t.gdprAgreementVol.includes('Politicii de confidențialitate') ? (
                        <>
                          Sunt de acord cu prelucrarea datelor conform{' '}
                          <Link to="/politica-confidentialitate">Politicii de confidențialitate</Link>.
                        </>
                      ) : t.gdprAgreementVol.includes('Privacy Policy') ? (
                        <>
                          I agree to the processing of personal data according to the{' '}
                          <Link to="/politica-confidentialitate">Privacy Policy</Link>.
                        </>
                      ) : (
                        t.gdprAgreementVol
                      )}
                    </span>
                  </label>

                  <button type="submit" className="colab-btn-submit-vol">
                    {t.btnSubmitVol}
                  </button>
                </form>
              )}
            </div>

            {/* Formular Doneaza */}
            <div className="colab-form-card" id="formular-doneaza">
              <h3 className="colab-form-title">{t.donFormTitle}</h3>
              <p className="colab-form-subtitle">{t.donFormDesc}</p>

              {donSubmitted ? (
                <div className="colab-success-alert">
                  {t.donSuccessMessage}
                </div>
              ) : (
                <form onSubmit={handleDonSubmit}>
                  <label className="colab-form-label">{t.donLabelAmount}</label>
                  <div className="colab-chips-group">
                    <button
                      type="button"
                      className={`colab-chip ${selectedAmount === 20 ? 'active' : ''}`}
                      onClick={() => setSelectedAmount(20)}
                    >
                      {t.donChip20}
                    </button>
                    <button
                      type="button"
                      className={`colab-chip ${selectedAmount === 50 ? 'active' : ''}`}
                      onClick={() => setSelectedAmount(50)}
                    >
                      {t.donChip50}
                    </button>
                    <button
                      type="button"
                      className={`colab-chip ${selectedAmount === 100 ? 'active' : ''}`}
                      onClick={() => setSelectedAmount(100)}
                    >
                      {t.donChip100}
                    </button>
                    <button
                      type="button"
                      className={`colab-chip ${selectedAmount === 'custom' ? 'active' : ''}`}
                      onClick={() => setSelectedAmount('custom')}
                    >
                      {t.donChipCustom}
                    </button>
                  </div>

                  {selectedAmount === 'custom' && (
                    <div className="colab-form-group colab-custom-amount-input">
                      <input
                        type="number"
                        min="1"
                        className="colab-input"
                        placeholder={t.donCustomAmountPlaceholder}
                        value={customAmount}
                        onChange={(e) => setCustomAmount(e.target.value)}
                        autoFocus
                        required
                      />
                    </div>
                  )}

                  <label className="colab-checkbox-group" style={{ margin: '12px 0 16px 0' }}>
                    <input
                      type="checkbox"
                      className="colab-checkbox"
                      checked={isRecurring}
                      onChange={(e) => setIsRecurring(e.target.checked)}
                    />
                    <span className="colab-checkbox-text">{t.donRecurringCheckbox}</span>
                  </label>

                  <div className="colab-form-row-2col">
                    <div className="colab-form-group">
                      <label className="colab-form-label" htmlFor="don-nume">
                        {t.labelFullName}
                      </label>
                      <input
                        id="don-nume"
                        type="text"
                        className="colab-input"
                        placeholder={t.placeholderFullName}
                        value={donData.nume}
                        onChange={(e) => setDonData({ ...donData, nume: e.target.value })}
                        required
                      />
                    </div>
                    <div className="colab-form-group">
                      <label className="colab-form-label" htmlFor="don-email">
                        {t.labelEmail}
                      </label>
                      <input
                        id="don-email"
                        type="email"
                        className="colab-input"
                        placeholder={t.placeholderEmail}
                        value={donData.email}
                        onChange={(e) => setDonData({ ...donData, email: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="colab-form-group">
                    <label className="colab-form-label" htmlFor="don-adapost">
                      {t.donLabelShelter}
                    </label>
                    <select
                      id="don-adapost"
                      className="colab-select"
                      value={donData.adapost}
                      onChange={(e) => setDonData({ ...donData, adapost: e.target.value })}
                    >
                      <option value="oricare">{t.donShelterAny}</option>
                      <option value="labute">Adăpostul Lăbuțe</option>
                      <option value="patrupede">Asociația Patrupede</option>
                      <option value="comunitar">Centrul Comunitar Iași</option>
                    </select>
                  </div>

                  <div className="colab-security-note">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                    <span>{t.donSecurityNote}</span>
                  </div>

                  <button type="submit" className="colab-btn-submit-don">
                    {t.btnSubmitDon}
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* ================= CALLOUT BANNER ================= */}
        <section className="colab-bottom-banner">
          <h2 className="colab-banner-title">
            {t.bannerTitlePrefix}
            <span className="colab-banner-highlight">{t.bannerTitleHighlight}</span>
            {t.bannerTitleSuffix}
          </h2>
          <button
            type="button"
            className="colab-btn-banner"
            onClick={() => {
              scrollToSection('formular-voluntar');
              const input = document.getElementById('vol-nume');
              if (input) input.focus();
            }}
          >
            {t.btnContactUs}
          </button>
        </section>
      </main>

      <Footer />
      <FloatingBtn />
    </div>
  );
}
