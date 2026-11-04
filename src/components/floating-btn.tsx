import React, { useState } from 'react';
import './floating-btn.css';
import { useLanguage } from '../useLanguage';
import { translations } from '../translations';

export default function FloatingBtn() {
  // Starea care controlează dacă fereastra este vizibilă sau nu
  const [isOpen, setIsOpen] = useState(false);

  // Preluăm limba curentă și dicționarul corespunzător
  const { lang } = useLanguage();
  const t = translations[lang];

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Butonul tău flotant existent */}
      <button 
        className="footer-floating-btn" 
        onClick={toggleChat}
        aria-label="Deschide Asistent FureverHome"
      >
        💬
      </button>

      {/* Fereastra pop-up (apare doar când isOpen este true) */}
      {isOpen && (
        <div className="chat-popup-container">
          
          {/* Antetul (Header) */}
          <div className="chat-header">
            <div className="chat-header-info">
              <div className="chat-avatar">F</div>
              <div>
                <h4>{t.chatTitle}</h4>
                <span className="chat-status">{t.chatStatus}</span>
              </div>
            </div>
            <button className="chat-close-btn" onClick={toggleChat}>
              &times;
            </button>
          </div>

          {/* Corpul chatului (Mesaje & Întrebări frecvente) */}
          <div className="chat-body">
            <div className="chat-message-bubble">
              {t.welcomeMsg}
            </div>

            <div className="faq-section">
              <span className="faq-title">{t.faqTitle}</span>
              <button className="faq-pill">{t.faq1}</button>
              <button className="faq-pill">{t.faq2}</button>
              <button className="faq-pill">{t.faq3}</button>
              <button className="faq-pill">{t.faq4}</button>
              <button className="faq-pill">{t.faq5}</button>
            </div>
          </div>

          {/* Partea de jos (Input text + Buton trimitere) */}
          <div className="chat-footer">
            <input 
              type="text" 
              placeholder={t.chatPlaceholder} 
              className="chat-input"
            />
            <button className="chat-send-btn">
              ➔
            </button>
          </div>

        </div>
      )}
    </>
  );
}