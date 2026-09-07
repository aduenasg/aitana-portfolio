/**
 * StudiesPage — Formación académica
 * Página dedicada a la trayectoria de estudios de Aitana, a la que
 * lleva el botón «Ver mis estudios» de la sección About.
 */
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import StudyChapters from '../components/StudyChapters';
import StudyHonors from '../components/StudyHonors';
import CountUp from '../components/CountUp';
import { useLang } from '../context/LangContext';
import bolaImg from '../img/bola.png';

const StudiesPage = () => {
  const { t } = useLang();

  return (
    <div className="process-page">
      <Navbar variant="inner" />

      <header className="studies-hero">
        <div className="studies-hero__yarn animate-on-scroll reveal-zoom reveal-fast" aria-hidden="true">
          <img src={bolaImg} alt="" className="studies-hero__yarn-img" />
        </div>
        <div className="studies-hero__content reveal-stagger">
          <p className="studies-hero__label animate-on-scroll reveal-up reveal-near reveal-fast">{t('timeline_label')}</p>
          <h1 className="studies-hero__title animate-on-scroll reveal-up">{t('timeline_title')}</h1>
        </div>
        <div className="studies-hero__meta reveal-stagger reveal-stagger--tight">
          <div className="studies-hero__meta-item animate-on-scroll reveal-up reveal-near reveal-fast">
            <span className="studies-hero__meta-label">{t('studies_meta_degrees_label')}</span>
            <CountUp to={3} className="studies-hero__meta-value" />
          </div>
          <div className="studies-hero__meta-item animate-on-scroll reveal-up reveal-near reveal-fast">
            <span className="studies-hero__meta-label">{t('studies_meta_period_label')}</span>
            <span className="studies-hero__meta-value">2018 — 2026</span>
          </div>
          <div className="studies-hero__meta-item animate-on-scroll reveal-up reveal-near reveal-fast">
            <span className="studies-hero__meta-label">{t('studies_meta_honors_label')}</span>
            <CountUp to={2} className="studies-hero__meta-value" />
          </div>
          <div className="studies-hero__meta-item animate-on-scroll reveal-up reveal-near reveal-fast">
            <span className="studies-hero__meta-label">{t('studies_meta_location_label')}</span>
            <span className="studies-hero__meta-value">{t('studies_meta_location_value')}</span>
          </div>
        </div>
      </header>

      <StudyHonors />
      <StudyChapters />

      <footer className="footer animate-on-scroll reveal-up reveal-near reveal-fast">
        <span className="footer__copy">{t('footer_copy')}</span>
        <Link to="/#about" className="footer__name">← {t('studies_back')}</Link>
        <nav className="footer__social">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">IG</a>
          <a href="https://linkedin.com"  target="_blank" rel="noopener noreferrer">LI</a>
          <a href="https://behance.net"   target="_blank" rel="noopener noreferrer">BE</a>
        </nav>
      </footer>
    </div>
  );
};

export default StudiesPage;
