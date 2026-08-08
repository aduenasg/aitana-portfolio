import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useLang }  from '../context/LangContext';

const LANGS = [
  { code: 'es', label: 'ES' },
  { code: 'en', label: 'EN' },
  { code: 'fr', label: 'FR' },
  { code: 'it', label: 'IT' },
];

/* Las secciones viven en la home. Desde una página interna hay que
   volver a "/" primero, así que el prefijo cambia con la variante. */
const SECTIONS = [
  { id: 'works',    key: 'nav_works'   },
  { id: 'about',    key: 'nav_about'   },
  { id: 'collabs',  key: 'nav_collabs' },
  { id: 'contact',  key: 'nav_contact' },
];

/* Elementos enfocables dentro del panel, para que el tabulador dé
   vueltas dentro del menú en lugar de escaparse a la página de detrás. */
const FOCUSABLE = 'a[href], button:not([disabled])';

const ThemeIcon = ({ theme }) => (
  theme === 'dark' ? (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  ) : (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  )
);

const LangSwitcher = ({ lang, setLanguage, className = '' }) => (
  <div className={`lang-switcher ${className}`.trim()} role="group" aria-label="Idioma">
    {LANGS.map(({ code, label }) => (
      <button
        key={code}
        type="button"
        className={`lang-switcher__btn${lang === code ? ' lang-switcher__btn--active' : ''}`}
        onClick={() => setLanguage(code)}
        aria-label={`Cambiar idioma a ${label}`}
        aria-current={lang === code ? 'true' : undefined}
      >
        {label}
      </button>
    ))}
  </div>
);

/* variant="home"  → enlaces de ancla dentro de la propia página
   variant="inner" → enlaces que vuelven a la home y saltan a la sección */
const Navbar = ({ variant = 'home' }) => {
  const { theme, toggle } = useTheme();
  const { lang, setLanguage, t } = useLang();
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const panelRef  = useRef(null);
  const toggleRef = useRef(null);

  const href = (id) => (variant === 'home' ? `#${id}` : `/#${id}`);

  /* Al cambiar de ruta el panel se queda abierto sobre la página nueva
     si no se cierra a mano. */
  useEffect(() => { setOpen(false); }, [location.pathname, location.hash]);

  /* Mientras el panel está abierto: bloquear el scroll de detrás,
     cerrar con Escape y mantener el tabulador dentro. */
  useEffect(() => {
    if (!open) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
        return;
      }
      if (e.key !== 'Tab') return;

      const nodes = panelRef.current?.querySelectorAll(FOCUSABLE);
      if (!nodes?.length) return;
      const first = nodes[0];
      const last  = nodes[nodes.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    // El primer enlace recibe el foco: quien abre con teclado entra
    // directamente en la navegación.
    panelRef.current?.querySelector(FOCUSABLE)?.focus();

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  /* Al cerrar, el foco vuelve al botón que lo abrió y no al principio
     del documento. */
  const close = () => {
    setOpen(false);
    toggleRef.current?.focus();
  };

  return (
    <>
      {/* El <nav> es sticky: dispara el grupo pero no se anima él. Un
          transform sobre él lo movería de su posición pegada. */}
      <nav className="navbar reveal-stagger reveal-stagger--tight">
        <div className="navbar__brand animate-on-scroll reveal-down reveal-near reveal-fast">
          <div className="navbar__dot" />
          {variant === 'home'
            ? <span className="navbar__name">Aitana Núñez</span>
            : <Link to="/" className="navbar__name">Aitana Núñez</Link>}
        </div>

        <ul className="navbar__links animate-on-scroll reveal-down reveal-near reveal-fast">
          {SECTIONS.map(({ id, key }) => (
            <li key={id}><a href={href(id)}>{t(key)}</a></li>
          ))}
        </ul>

        <div className="navbar__controls animate-on-scroll reveal-down reveal-near reveal-fast">
          <LangSwitcher lang={lang} setLanguage={setLanguage} className="lang-switcher--desktop" />

          <button
            type="button"
            className="navbar__theme-toggle"
            onClick={toggle}
            aria-label={theme === 'dark' ? 'Activar modo claro' : 'Activar modo oscuro'}
          >
            <ThemeIcon theme={theme} />
          </button>

          {/* Sólo visible por debajo de 768px. Dos puntadas de hilván
              que giran a aspa al abrir: el mismo gesto de "marcar →
              cortar" que hace el cursor sobre lo pulsable. */}
          <button
            type="button"
            ref={toggleRef}
            className={`navbar__menu-toggle${open ? ' navbar__menu-toggle--open' : ''}`}
            onClick={() => (open ? close() : setOpen(true))}
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={open}
            aria-controls="nav-panel"
          >
            <span className="navbar__menu-baste" />
            <span className="navbar__menu-baste" />
          </button>
        </div>
      </nav>

      {/* ── Panel de navegación móvil ── */}
      {/* Sin `hidden`: el CSS lo oculta con visibility, que ya lo saca
          del tabulador y deja que la transición de entrada se vea. */}
      <div
        id="nav-panel"
        ref={panelRef}
        className={`nav-panel${open ? ' nav-panel--open' : ''}`}
      >
        <ul className="nav-panel__list">
          {SECTIONS.map(({ id, key }, i) => (
            <li key={id} className="nav-panel__item" style={{ '--i': i }}>
              <a href={href(id)} className="nav-panel__link" onClick={() => setOpen(false)}>
                <span className="nav-panel__index u-tabular">{String(i + 1).padStart(2, '0')}</span>
                <span className="nav-panel__label">{t(key)}</span>
              </a>
            </li>
          ))}
        </ul>

        <div className="nav-panel__foot">
          <LangSwitcher lang={lang} setLanguage={setLanguage} />
          <a href="mailto:aitananr2@gmail.com" className="nav-panel__email">aitananr2@gmail.com</a>
        </div>
      </div>
    </>
  );
};

export default Navbar;
