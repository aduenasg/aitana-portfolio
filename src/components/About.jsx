import { useEffect, useRef } from 'react';
import { useLang } from '../context/LangContext';
import Reveal from './Reveal';

/* Cifras del bloque "sobre mí". Editar aquí para actualizarlas. */
const STATS = [
  { to: 1, suffix: '', labelKey: 'about_stat1_label' },
  { to: 3, suffix: '', labelKey: 'about_stat2_label' },
  { to: 0, suffix: '', labelKey: 'about_stat3_label' },
];

const StatCounter = ({ to, suffix = '', label }) => {
  const numRef  = useRef(null);
  const started = useRef(false);
  useEffect(() => {
    const el = numRef.current;
    if (!el) return;
    started.current = false;
    el.textContent = '0' + suffix;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || started.current) return;
      started.current = true;
      const duration = 1400;
      const start = performance.now();
      const tick = (now) => {
        const t = Math.min((now - start) / duration, 1);
        const ease = 1 - Math.pow(1 - t, 3);
        el.textContent = Math.round(ease * to) + suffix;
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.5 });
    io.observe(el);
    return () => io.disconnect();
  }, [to, suffix]);
  return (
    <div className="about__stat">
      <span className="about__stat-num" ref={numRef}>0{suffix}</span>
      <span className="about__stat-label">{label}</span>
    </div>
  );
};

const About = ({ aboutImage }) => {
  const { t } = useLang();
  return (
    /* Dos grupos de entrada anidados, no uno:
       · `.about` dispara el hilvanado de la sección y el retrato.
       · `.about__content` dispara su propia columna, para que en móvil
         —donde la sección es muy alta y se apila— el texto no se anime
         mucho antes de que llegues a verlo.
       El filtro por `closest` de ScrollReveal mantiene los dos grupos
       separados sin que se pisen. */
    <section className="about reveal-stagger" id="about">
      <Reveal as="div" className="about__image" x={-32} y={0} duration={0.8}>
        {aboutImage
          ? <img src={aboutImage} alt="Aitana Núñez — studio" />
          /* Silueta de reserva si no hay foto. El trazo lo pone el CSS
             vía currentColor: escrito a mano era casi blanco y en modo
             claro desaparecía sobre el hueso. */
          : <svg className="about__placeholder" width="70" height="110" viewBox="0 0 70 110" fill="none" stroke="currentColor" strokeWidth="0.6">
              <ellipse cx="35" cy="22" rx="14" ry="14" />
              <path d="M12 46 Q12 36 35 36 Q58 36 58 46 L64 104 H6 Z" />
              <line x1="22" y1="60" x2="8" y2="96" /><line x1="48" y1="60" x2="62" y2="96" />
            </svg>
        }
      </Reveal>
      {/* Los `delay` manuales se han quitado: el escalonado lo estampa
          ahora el motor (--reveal-index), y sumar ambos duplicaba la
          espera de las últimas piezas. */}
      <div className="about__content reveal-stagger">
        {/* Fuera de la fotografía: sobre el retrato tapaba la cara. Vive
            en el margen izquierdo de esta columna, sobre el fondo. */}
        <span className="about__rotated-text" aria-hidden="true">Aitana</span>
        <Reveal as="p" className="about__label">{t('about_label')}</Reveal>
        <Reveal as="blockquote" className="about__quote">{t('about_quote')}</Reveal>
        <Reveal as="p" className="about__body">{t('about_body')}</Reveal>
        {/* Sólo se pintan las cifras con valor. Una casilla que cuenta
            hasta 0 ("Publicaciones · 0") resta en lugar de sumar; en
            cuanto haya publicaciones, se pone el número y reaparece. */}
        <Reveal as="div" className="about__stats">
          {STATS.map(({ to, suffix, labelKey }) => (
            to > 0 && <StatCounter key={labelKey} to={to} suffix={suffix} label={t(labelKey)} />
          ))}
        </Reveal>
        <Reveal as="div" className="about__actions">
          <button className="btn">{t('about_studio')}</button>
          <a href="/Portfolio-Aitana-Nunez.pdf" download="Portfolio-2026-Aitana-Nunez.pdf" className="btn btn--gold">
            {t('about_kit')}
          </a>
        </Reveal>
      </div>
    </section>
  );
};

export default About;
