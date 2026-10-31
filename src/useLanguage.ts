import { useState, useEffect } from 'react';

export function useLanguage() {
  const [lang, setLang] = useState<'ro' | 'en'>(() => {
    return (localStorage.getItem('site_lang') as 'ro' | 'en') || 'ro';
  });

  const changeLanguage = (newLang: 'ro' | 'en') => {
    setLang(newLang);
    localStorage.setItem('site_lang', newLang);
    window.dispatchEvent(new Event('languagechange'));
  };

  useEffect(() => {
    const handleStorage = () => {
      const savedLang = localStorage.getItem('site_lang') as 'ro' | 'en';
      if (savedLang) setLang(savedLang);
    };
    window.addEventListener('languagechange', handleStorage);
    return () => window.removeEventListener('languagechange', handleStorage);
  }, []);

  return { lang, changeLanguage };
}