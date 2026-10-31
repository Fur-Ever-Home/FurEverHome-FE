import { useState, useEffect } from 'react';

export function useLanguage() {
  const [lang, setLang] = useState<'ro' | 'en'>(() => {
    return (localStorage.getItem('site_lang') as 'ro' | 'en') || 'ro';
  });

  const changeLanguage = (newLang: 'ro' | 'en') => {
    setLang(newLang);
    localStorage.setItem('site_lang', newLang);
    // Anunță toate componentele/paginile că limba s-a schimbat
    window.dispatchEvent(new Event('languageChange'));
  };

  useEffect(() => {
    const handleStorageChange = () => {
      const currentLang = (localStorage.getItem('site_lang') as 'ro' | 'en') || 'ro';
      setLang(currentLang);
    };

    window.addEventListener('languageChange', handleStorageChange);
    return () => window.window.removeEventListener('languageChange', handleStorageChange);
  }, []);

  return { lang, changeLanguage };
}