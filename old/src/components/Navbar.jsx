import { useTheme } from '../context/ThemeContext';
import { useLang }  from '../context/LangContext';

const LANGS = [
  { code: 'es', label: 'ES' },
  { code: 'en', label: 'EN' },
  { code: 'fr', label: 'FR' },
  { code: 'it', label: 'IT' },
];

const Navbar = () => {
  const { theme, toggle } = useTheme();
  const { lang, setLanguage, t } = useLang();

  return (
    <nav className="navbar">
      <div className="navbar__brand">
        <div className="navbar__dot" />
        <span className="navbar__name">Aitana Núñez</span>
      </div>

      <ul className="navbar__links">
        <li><a href="#works">{t('nav_works')}</a></li>
        <li><a href="#about">{t('nav_about')}</a></li>
        <li><a href="#contact">{t('nav_contact')}</a></li>
      </ul>

      <div className="navbar__controls">
        {/* Selector de idioma */}
        <div className="lang-switcher">
          {LANGS.map(({ code, label }) => (
            <button
              key={code}
              className={`lang-switcher__btn${lang === code ? ' lang-switcher__btn--active' : ''}`}
              onClick={() => setLanguage(code)}
              aria-label={`Cambiar idioma a ${label}`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Toggle tema */}
        <button
          className="navbar__theme-toggle"
          onClick={toggle}
          aria-label={theme === 'dark' ? 'Activar modo claro' : 'Activar modo oscuro'}
        >
          {theme === 'dark' ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="12" r="5"/>
              <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
              <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
          )}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
