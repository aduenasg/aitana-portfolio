import { useEffect, useRef } from 'react';
import { useLang } from '../context/LangContext';

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
    <section className="about" id="about">
      <div className="about__image">
        {aboutImage
          ? <img src={aboutImage} alt="Aitana Núñez — studio" />
          : <svg width="70" height="110" viewBox="0 0 70 110" fill="none" stroke="rgba(240,236,228,0.1)" strokeWidth="0.6">
              <ellipse cx="35" cy="22" rx="14" ry="14" />
              <path d="M12 46 Q12 36 35 36 Q58 36 58 46 L64 104 H6 Z" />
              <line x1="22" y1="60" x2="8" y2="96" /><line x1="48" y1="60" x2="62" y2="96" />
            </svg>
        }
        <span className="about__rotated-text">Aitana</span>
      </div>
      <div className="about__content">
        <p className="about__label">{t('about_label')}</p>
        <blockquote className="about__quote">{t('about_quote')}</blockquote>
        <p className="about__body">{t('about_body')}</p>
        <div className="about__stats">
          <StatCounter to={1} suffix="" label={t('about_stat1_label')} />
          <StatCounter to={3}  suffix=""  label={t('about_stat2_label')} />
          <StatCounter to={0}  suffix=""  label={t('about_stat3_label')} />
        </div>
        <div className="about__actions">
          <button className="btn">{t('about_studio')}</button>
          <a href="/Portfolio-Aitana-Nunez.pdf" download="Portfolio-2026-Aitana-Nunez.pdf" className="btn btn--gold">
            {t('about_kit')}
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;
