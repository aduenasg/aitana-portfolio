import { createContext, useContext, useState } from 'react';
import translations from '../i18n/translations';

const LangContext = createContext();

export const LangProvider = ({ children }) => {
  const [lang, setLang] = useState(() => {
    try { return localStorage.getItem('lang') || 'es'; } catch { return 'es'; }
  });

  const setLanguage = (l) => {
    setLang(l);
    try { localStorage.setItem('lang', l); } catch {}
  };

  const t = (key) => translations[lang]?.[key] ?? translations['es']?.[key] ?? key;
  const tp = (projectId) => translations[lang]?.projects?.[projectId] ?? translations['es']?.projects?.[projectId] ?? {};

  return (
    <LangContext.Provider value={{ lang, setLanguage, t, tp }}>
      {children}
    </LangContext.Provider>
  );
};

export const useLang = () => useContext(LangContext);
