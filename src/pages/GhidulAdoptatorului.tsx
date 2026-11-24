import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './GhidulAdoptatorului.css';
import { useLanguage } from '../useLanguage';
import { translations } from '../translations';

type AdoptionMode = 'fizica' | 'distanta';
type SpeciesKey = 'caini' | 'pisici' | 'alte';

interface ChecklistCategory {
  id: string;
  title: string;
  icon: 'bag' | 'home' | 'calendar';
  items: string[];
}

interface BrandItem {
  initials: string;
  name: string;
  category: string;
  description: string;
  highlight: string;
  url: string;
}

const STORAGE_KEY = 'fureverhome_adopter_checklist_v1';

const GhidulAdoptatorului: React.FC = () => {
  const navigate = useNavigate();
  const { lang } = useLanguage();
  const t = translations[lang]?.adopterGuide || translations.ro.adopterGuide;

  const [adoptionMode, setAdoptionMode] = useState<AdoptionMode>('fizica');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [activeSpecies, setActiveSpecies] = useState<SpeciesKey>('caini');
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore storage errors
    }
    return {
      'caini-before-0': true,
      'caini-before-1': true,
      'caini-before-2': true,
      'caini-first-days-0': true,
    };
  });

  const brandsCarouselRef = useRef<HTMLDivElement | null>(null);
  const [brandScrollProgress, setBrandScrollProgress] = useState(28);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(checkedItems));
    } catch {
      // ignore storage errors
    }
  }, [checkedItems]);

  const scrollToSection = (id: string, mode?: AdoptionMode) => {
    if (mode) {
      setAdoptionMode(mode);
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const toggleChecklistItem = (key: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const currentSpeciesData: {
    label: string;
    bannerTitle: string;
    categories: ChecklistCategory[];
  } = t.checklist[activeSpecies];

  const totalSpeciesItems = currentSpeciesData.categories.reduce(
    (sum, cat) => sum + cat.items.length,
    0
  );
  const checkedSpeciesItems = currentSpeciesData.categories.reduce((sum, cat) => {
    const count = cat.items.filter(
      (_, idx) => !!checkedItems[`${activeSpecies}-${cat.id}-${idx}`]
    ).length;
    return sum + count;
  }, 0);

  const progressPercentage =
    totalSpeciesItems > 0 ? Math.round((checkedSpeciesItems / totalSpeciesItems) * 100) : 0;

  const handleBrandsScroll = () => {
    const el = brandsCarouselRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    if (maxScroll <= 0) {
      setBrandScrollProgress(100);
      return;
    }
    const pct = 25 + (el.scrollLeft / maxScroll) * 75;
    setBrandScrollProgress(Math.min(100, Math.max(25, pct)));
  };

  const renderCategoryIcon = (icon: 'bag' | 'home' | 'calendar') => {
    if (icon === 'bag') {
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 7h12l1 13H5L6 7z" />
          <path d="M9 7V5a3 3 0 0 1 6 0v2" />
        </svg>
      );
    }
    if (icon === 'home') {
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 10.5L12 3l9 7.5" />
          <path d="M5 9.5V20h14V9.5" />
          <path d="M9.5 20v-6h5v6" />
        </svg>
      );
    }
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="3" />
        <path d="M16 2v4M8 2v4M3 10h18" />
      </svg>
    );
  };

  const progressText = t.progressCount
    .replace('{checked}', String(checkedSpeciesItems))
    .replace('{total}', String(totalSpeciesItems));

  return (
    <>
      <Header />
      <div className="adopter-guide-page">
        <div className="adopter-guide-container">
          {/* BREADCRUMB */}
          <nav className="ag-breadcrumb" aria-label="Breadcrumb">
            <Link to="/">{t.breadcrumbHome}</Link>
            <span>&gt;</span>
            <strong>{t.breadcrumbCurrent}</strong>
          </nav>

          {/* 1. HERO SECTION */}
          <section className="ag-hero">
            <div className="ag-hero-left">
              <span className="ag-kicker">{t.heroKicker}</span>
              <h1 className="ag-hero-title">
                {t.heroTitleLine1}
                <span>{t.heroTitleLine2}</span>
              </h1>
              <p className="ag-hero-subtitle">{t.heroSubtitle}</p>
              <div className="ag-hero-pills">
                <button
                  type="button"
                  className="ag-pill-btn ag-pill-btn--primary"
                  onClick={() => scrollToSection('pasii-adoptiei')}
                >
                  {t.pillSteps}
                </button>
                <button
                  type="button"
                  className="ag-pill-btn ag-pill-btn--outline"
                  onClick={() => scrollToSection('intrebari-frecvente')}
                >
                  {t.pillFaq}
                </button>
                <button
                  type="button"
                  className="ag-pill-btn ag-pill-btn--outline"
                  onClick={() => scrollToSection('sfaturi-ingrijire')}
                >
                  {t.pillCare}
                </button>
              </div>
            </div>

            <aside className="ag-hero-card">
              <h2>{t.precheckTitle}</h2>
              <ul className="ag-hero-checklist">
                {t.precheckItems.map((item: string) => (
                  <li key={item}>
                    <span className="ag-check-circle" aria-hidden="true">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="ag-hero-card-note">{t.precheckNote}</p>
            </aside>
          </section>

          {/* 2. CE FEL DE ADOPȚIE ȚI SE POTRIVEȘTE */}
          <section className="ag-section">
            <div className="ag-section-header">
              <span className="ag-kicker">{t.compareKicker}</span>
              <h2 className="ag-section-title">{t.compareTitle}</h2>
              <p className="ag-section-subtitle">{t.compareSubtitle}</p>
            </div>

            <div className="ag-compare-grid">
              {/* Card Adopție fizică */}
              <div className="ag-compare-card ag-compare-card--featured">
                <div className="ag-compare-top">
                  <div className="ag-compare-identity">
                    <div className="ag-icon-box">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 10.5L12 3l9 7.5" />
                        <path d="M5 9.5V20h14V9.5" />
                        <path d="M9.5 20v-6h5v6" />
                      </svg>
                    </div>
                    <div>
                      <span className="ag-card-kicker">{t.physicalCardKicker}</span>
                      <h3>{t.physicalCardTitle}</h3>
                    </div>
                  </div>
                  <span className="ag-green-pill">{t.physicalCardBadge}</span>
                </div>

                <p className="ag-compare-desc">{t.physicalCardDesc}</p>

                <div className="ag-compare-table">
                  {t.physicalRows.map((row: { label: string; value: string }) => (
                    <div key={row.label} className="ag-compare-row">
                      <span className="ag-row-label">{row.label}</span>
                      <span className="ag-row-value">{row.value}</span>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  className="ag-btn-dark"
                  onClick={() => scrollToSection('pasii-adoptiei', 'fizica')}
                >
                  {t.physicalCardBtn}
                </button>
              </div>

              {/* Card Adopție la distanță */}
              <div className="ag-compare-card">
                <div className="ag-compare-top">
                  <div className="ag-compare-identity">
                    <div className="ag-icon-box">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
                      </svg>
                    </div>
                    <div>
                      <span className="ag-card-kicker">{t.distanceCardKicker}</span>
                      <h3>{t.distanceCardTitle}</h3>
                    </div>
                  </div>
                </div>

                <p className="ag-compare-desc">{t.distanceCardDesc}</p>

                <div className="ag-compare-table">
                  {t.distanceRows.map((row: { label: string; value: string }) => (
                    <div key={row.label} className="ag-compare-row">
                      <span className="ag-row-label">{row.label}</span>
                      <span className="ag-row-value">{row.value}</span>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  className="ag-btn-outline-wide"
                  onClick={() => navigate('/catalog')}
                >
                  {t.distanceCardBtn}
                </button>
              </div>
            </div>
          </section>

          {/* 3. PAȘII ADOPȚIEI (CU COMUTATOR) */}
          <section id="pasii-adoptiei" className="ag-section">
            <div className="ag-steps-header">
              <div>
                <span className="ag-kicker">
                  {adoptionMode === 'fizica' ? t.stepsPhysicalKicker : t.stepsDistanceKicker}
                </span>
                <h2 className="ag-section-title">
                  {adoptionMode === 'fizica' ? t.stepsPhysicalTitle : t.stepsDistanceTitle}
                </h2>
                <p className="ag-section-subtitle">
                  {adoptionMode === 'fizica' ? t.stepsPhysicalSubtitle : t.stepsDistanceSubtitle}
                </p>
              </div>

              <div className="ag-mode-switch" role="tablist" aria-label={t.stepsSwitchAria}>
                <button
                  type="button"
                  role="tab"
                  aria-selected={adoptionMode === 'fizica'}
                  className={`ag-switch-btn ${adoptionMode === 'fizica' ? 'is-active' : ''}`}
                  onClick={() => setAdoptionMode('fizica')}
                >
                  {t.switchPhysical}
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={adoptionMode === 'distanta'}
                  className={`ag-switch-btn ${adoptionMode === 'distanta' ? 'is-active' : ''}`}
                  onClick={() => setAdoptionMode('distanta')}
                >
                  {t.switchDistance}
                </button>
              </div>
            </div>

            {adoptionMode === 'fizica' ? (
              <>
                <div className="ag-steps-grid">
                  {t.stepsPhysicalList.map((step: { title: string; desc: string }, index: number) => (
                    <div key={step.title} className="ag-step-card">
                      <span className="ag-step-badge">{index + 1}</span>
                      <h3>{step.title}</h3>
                      <p>{step.desc}</p>
                    </div>
                  ))}
                </div>

                <div className="ag-info-boxes-grid">
                  <div className="ag-info-box">
                    <div className="ag-info-box-header">
                      <span className="ag-info-icon">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                          <polyline points="14 2 14 8 20 8" />
                          <line x1="16" y1="13" x2="8" y2="13" />
                          <line x1="16" y1="17" x2="8" y2="17" />
                        </svg>
                      </span>
                      <h3>{t.docsPhysicalTitle}</h3>
                    </div>
                    <ul className="ag-dot-list">
                      {t.docsPhysicalList.map((doc: string) => (
                        <li key={doc}>{doc}</li>
                      ))}
                    </ul>
                    <p className="ag-info-footnote">{t.docsPhysicalFootnote}</p>
                  </div>

                  <div className="ag-info-box">
                    <div className="ag-info-box-header">
                      <span className="ag-info-icon">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="4" width="18" height="18" rx="3" />
                          <path d="M16 2v4M8 2v4M3 10h18" />
                        </svg>
                      </span>
                      <h3>{t.goodToKnowTitle}</h3>
                    </div>
                    <ul className="ag-dot-list">
                      {t.goodToKnowPhysicalList.map((tip: string) => (
                        <li key={tip}>{tip}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="ag-steps-cta">
                  <button
                    type="button"
                    className="ag-btn-gold"
                    onClick={() => navigate('/catalog')}
                  >
                    {t.stepsPhysicalCta}
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="ag-steps-grid">
                  {t.stepsDistanceList.map((step: { title: string; desc: string }, index: number) => (
                    <div key={step.title} className="ag-step-card">
                      <span className="ag-step-badge">{index + 1}</span>
                      <h3>{step.title}</h3>
                      <p>{step.desc}</p>
                    </div>
                  ))}
                </div>

                <div className="ag-info-boxes-grid">
                  <div className="ag-info-box">
                    <div className="ag-info-box-header">
                      <span className="ag-info-icon">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                          <polyline points="14 2 14 8 20 8" />
                          <line x1="16" y1="13" x2="8" y2="13" />
                          <line x1="16" y1="17" x2="8" y2="17" />
                        </svg>
                      </span>
                      <h3>{t.docsDistanceTitle}</h3>
                    </div>
                    <ul className="ag-dot-list">
                      {t.docsDistanceList.map((doc: string) => (
                        <li key={doc}>{doc}</li>
                      ))}
                    </ul>
                    <p className="ag-info-footnote">{t.docsDistanceFootnote}</p>
                  </div>

                  <div className="ag-info-box">
                    <div className="ag-info-box-header">
                      <span className="ag-info-icon">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="4" width="18" height="18" rx="3" />
                          <path d="M16 2v4M8 2v4M3 10h18" />
                        </svg>
                      </span>
                      <h3>{t.goodToKnowTitle}</h3>
                    </div>
                    <ul className="ag-dot-list">
                      {t.goodToKnowDistanceList.map((tip: string) => (
                        <li key={tip}>{tip}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="ag-steps-cta">
                  <button
                    type="button"
                    className="ag-btn-gold"
                    onClick={() => navigate('/catalog')}
                  >
                    {t.stepsDistanceCta}
                  </button>
                </div>
              </>
            )}
          </section>

          {/* 4. ÎNTREBĂRI FRECVENTE (FAQ) */}
          <section id="intrebari-frecvente" className="ag-section ag-faq-layout">
            <div className="ag-faq-left">
              <span className="ag-kicker">{t.faqKicker}</span>
              <h2 className="ag-section-title">{t.faqTitle}</h2>
              <p className="ag-section-subtitle">{t.faqSubtitle}</p>

              <div className="ag-contact-card">
                <h3>{t.faqContactTitle}</h3>
                <p>
                  {t.faqContactTextBefore}
                  <a href="mailto:contact@fureverhome.ro">contact@fureverhome.ro</a>
                  {t.faqContactTextAfter}
                </p>
              </div>
            </div>

            <div className="ag-faq-list">
              {t.faqList.map((item: { question: string; answer: string }, idx: number) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={item.question}
                    className={`ag-faq-item ${isOpen ? 'is-open' : ''}`}
                  >
                    <button
                      type="button"
                      className="ag-faq-question"
                      aria-expanded={isOpen}
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    >
                      <span>{item.question}</span>
                      <span className="ag-faq-chevron" aria-hidden="true">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          {isOpen ? (
                            <polyline points="18 15 12 9 6 15" />
                          ) : (
                            <polyline points="6 9 12 15 18 9" />
                          )}
                        </svg>
                      </span>
                    </button>
                    {isOpen && <p className="ag-faq-answer">{item.answer}</p>}
                  </div>
                );
              })}
            </div>
          </section>

          {/* 5. SFATURI DE ÎNGRIJIRE (CHECKLIST INTERACTIV) */}
          <section id="sfaturi-ingrijire" className="ag-section">
            <div className="ag-care-header">
              <div>
                <span className="ag-kicker">{t.careKicker}</span>
                <h2 className="ag-section-title">{t.careTitle}</h2>
                <p className="ag-section-subtitle">{t.careSubtitle}</p>
              </div>

              <div className="ag-species-tabs" role="tablist" aria-label={t.speciesAria}>
                {(Object.keys(t.checklist) as SpeciesKey[]).map((key) => (
                  <button
                    key={key}
                    type="button"
                    role="tab"
                    aria-selected={activeSpecies === key}
                    className={`ag-species-btn ${activeSpecies === key ? 'is-active' : ''}`}
                    onClick={() => setActiveSpecies(key)}
                  >
                    {t.checklist[key].label}
                  </button>
                ))}
              </div>
            </div>

            {/* Progress Banner */}
            <div className="ag-progress-banner">
              <div className="ag-progress-info">
                <h3>{currentSpeciesData.bannerTitle}</h3>
                <p>{t.progressDesc}</p>
              </div>
              <div className="ag-progress-meter">
                <span className="ag-progress-count">{progressText}</span>
                <div className="ag-progress-track">
                  <div
                    className="ag-progress-fill"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </div>
            </div>

            {/* 3 Checklist Columns */}
            <div className="ag-checklist-grid">
              {currentSpeciesData.categories.map((cat) => {
                const catCheckedCount = cat.items.filter(
                  (_, idx) => !!checkedItems[`${activeSpecies}-${cat.id}-${idx}`]
                ).length;

                return (
                  <div key={cat.id} className="ag-checklist-card">
                    <div className="ag-checklist-card-header">
                      <div className="ag-checklist-title-wrap">
                        <span className="ag-info-icon">{renderCategoryIcon(cat.icon)}</span>
                        <h3>{cat.title}</h3>
                      </div>
                      <span className="ag-count-pill">
                        {catCheckedCount}/{cat.items.length}
                      </span>
                    </div>

                    <ul className="ag-checklist-items">
                      {cat.items.map((text, idx) => {
                        const itemKey = `${activeSpecies}-${cat.id}-${idx}`;
                        const checked = !!checkedItems[itemKey];
                        return (
                          <li key={itemKey}>
                            <label className={`ag-checkbox-label ${checked ? 'is-checked' : ''}`}>
                              <input
                                type="checkbox"
                                checked={checked}
                                onChange={() => toggleChecklistItem(itemKey)}
                              />
                              <span className="ag-custom-checkbox" aria-hidden="true">
                                {checked && '✓'}
                              </span>
                              <span className="ag-checkbox-text">{text}</span>
                            </label>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                );
              })}
            </div>
          </section>

          {/* 6. BRANDURI PE CARE LE RECOMANDĂM */}
          <section className="ag-section">
            <div className="ag-section-header">
              <h2 className="ag-brands-title">{t.brandsTitle}</h2>
              <p className="ag-section-subtitle">{t.brandsSubtitle}</p>
            </div>

            <div
              className="ag-brands-grid"
              ref={brandsCarouselRef}
              onScroll={handleBrandsScroll}
            >
              {t.brandsList.map((brand: BrandItem) => (
                <div key={brand.name} className="ag-brand-card">
                  <div className="ag-brand-top">
                    <span className="ag-brand-avatar">{brand.initials}</span>
                    <div>
                      <h3>{brand.name}</h3>
                      <span className="ag-brand-category">{brand.category}</span>
                    </div>
                  </div>

                  <p className="ag-brand-desc">{brand.description}</p>

                  <div className="ag-brand-highlight">
                    <span aria-hidden="true">✓</span>
                    <span>{brand.highlight}</span>
                  </div>

                  <a
                    href={brand.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ag-brand-link"
                  >
                    {t.brandsLinkText}
                  </a>
                </div>
              ))}
            </div>

            {/* Mobile horizontal scroll indicator */}
            <div className="ag-mobile-scroll-bar" aria-hidden="true">
              <div
                className="ag-mobile-scroll-thumb"
                style={{ width: `${brandScrollProgress}%` }}
              />
            </div>

            <p className="ag-brands-footnote">{t.brandsFootnote}</p>
          </section>

          {/* 7. REGULA 3-3-3 */}
          <section className="ag-rule-banner">
            <h2>{t.ruleTitle}</h2>
            <p className="ag-rule-subtitle">{t.ruleSubtitle}</p>

            <div className="ag-rule-grid">
              {t.ruleCards.map((card: { kicker: string; title: string; desc: string }) => (
                <div key={card.title} className="ag-rule-card">
                  <span className="ag-rule-kicker">{card.kicker}</span>
                  <h3>{card.title}</h3>
                  <p>{card.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 8. FINAL CTA BANNER */}
          <section className="ag-final-cta">
            <h2>
              {t.finalCtaTitlePart1} <span>{t.finalCtaTitlePart2}</span>
            </h2>
            <button
              type="button"
              className="ag-btn-gold"
              onClick={() => navigate('/catalog')}
            >
              {t.finalCtaBtn}
            </button>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default GhidulAdoptatorului;