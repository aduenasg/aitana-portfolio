import { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import PROJECTS from '../data/projects';
import Stack from '../components/Stack';
import CircularGallery from '../components/CircularGallery';
import Lightbox from '../components/Lightbox';
import Reveal from '../components/Reveal';
import ScrollFloat from '../components/ScrollFloat';
import Navbar from '../components/Navbar';
import { useLang } from '../context/LangContext';

/* ── Galería de fotos: pila arrastrable (Stack, de React Bits) ── */
const PhotoStack = ({ images, title }) => {
  const { t } = useLang();
  if (!images || !images.length) return null;

  return (
    <div className="project-stack">
      <Stack
        cards={images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`${title} — ${i + 1} ${t('lightbox_of')} ${images.length}`}
            className="card-image"
          />
        ))}
        randomRotation
        sendToBackOnClick
        sensitivity={150}
      />
      {images.length > 1 && (
        <p className="project-stack__hint">{t('project_stack_hint')}</p>
      )}
    </div>
  );
};

/* ── Galería de proceso creativo: galería circular 3D (CircularGallery, de React Bits) ──
   Al hacer clic en un paso, se abre a pantalla completa con navegación. */
const ProcessCircularGallery = ({ images, title }) => {
  const { t } = useLang();
  const [lightboxIndex, setLightboxIndex] = useState(null);

  if (!images || !images.length) return null;

  const items = images.map((src, i) => ({
    image: src,
    text: `${t('project_step')} ${String(i + 1).padStart(2, '0')}`,
  }));

  return (
    <div className="project-circular-gallery-wrap">
      <div className="project-circular-gallery">
        <CircularGallery
          items={items}
          bend={2}
          textColor="#c9a96e"
          borderRadius={0.05}
          font="bold 22px Playfair Display"
          scrollSpeed={1.6}
          scrollEase={0.06}
          onItemClick={setLightboxIndex}
        />
      </div>
      <p className="project-circular-gallery__hint">{t('project_gallery_hint')}</p>
      <Lightbox
        images={images}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={setLightboxIndex}
        title={title}
      />
    </div>
  );
};



/* ── Página de proyecto ─────────────────────────────────── */
const ProjectPage = () => {
  const { id }  = useParams();
  const { t, tp } = useLang();
  const project = PROJECTS.find((p) => p.id === id);

  if (id === '__coleccion3d__') return <Navigate to="/coleccion-3d" replace />;

  if (!project) {
    return (
      <div className="project-not-found">
        <p>{t('project_not_found')}</p>
        <Link to="/" className="btn">{t('project_back_home')}</Link>
      </div>
    );
  }

  const currentIndex = PROJECTS.findIndex((p) => p.id === id);
  const prev = PROJECTS[currentIndex - 1] ?? null;
  const next = PROJECTS[currentIndex + 1] ?? null;

  /* Traducción del proyecto: cae al español de PROJECTS campo a campo
     cuando el idioma activo no tiene ese dato (o el proyecto no está
     en translations.js todavía), así nunca se ve un hueco en blanco. */
  const tr = tp(project.id);
  const displayTitle       = tr.title       || project.title;
  const displayCategory    = tr.category    || project.category;
  const displaySubtitle    = tr.subtitle    || project.subtitle;
  const displayDescription = tr.description || project.description;
  const displayCredits     = tr.credits     || project.credits;
  const displayClient      = tr.client      || project.client;
  const displayRole        = tr.role        || project.role;
  const displayLocation    = tr.location    || project.location;
  const prevTitle = prev ? (tp(prev.id).title || prev.title) : null;
  const nextTitle = next ? (tp(next.id).title || next.title) : null;

  const hasProcess = project.processImages && project.processImages.length > 0;

  return (
    <div className="project-page">

      {/* ── Navbar ── */}
      <Navbar variant="inner" />

      {/* ── Hero banner ── */}
      <header className="project-hero" style={{ '--cover-bg': project.coverBg }}>
        {/* Zoom: es un número a sangre, sin desplazamiento lateral. */}
        <div className="project-hero__bg-number animate-on-scroll reveal-zoom reveal-slow" aria-hidden="true">{project.number}</div>
        <div className="project-hero__content">
          <Reveal as="p" className="project-hero__category" y={16} duration={0.6}>{displayCategory}</Reveal>
          <Reveal as="h1" className="project-hero__title" y={24} delay={0.1} duration={0.7}>{displayTitle}</Reveal>
          <Reveal as="p" className="project-hero__subtitle" y={16} delay={0.2} duration={0.6}>{displaySubtitle}</Reveal>
        </div>
        <Reveal as="div" className="project-hero__meta" y={20} delay={0.3}>
          <div className="project-hero__meta-item">
            <span className="project-hero__meta-label">{t('project_client')}</span>
            <span className="project-hero__meta-value">{displayClient}</span>
          </div>
          <div className="project-hero__meta-item">
            <span className="project-hero__meta-label">{t('project_role')}</span>
            <span className="project-hero__meta-value">{displayRole}</span>
          </div>
          <div className="project-hero__meta-item">
            <span className="project-hero__meta-label">{t('project_year')}</span>
            <span className="project-hero__meta-value">{project.year}</span>
          </div>
          <div className="project-hero__meta-item">
            <span className="project-hero__meta-label">{t('project_location')}</span>
            <span className="project-hero__meta-value">{displayLocation}</span>
          </div>
        </Reveal>
      </header>

      {/* ── Body ── */}
      <div className="project-body">

        {/* Descripción */}
        <Reveal as="section" className="project-description">
          <ScrollFloat as="p" containerClassName="project-description__label" stagger={0.02} animationDuration={0.6}>{t('project_about')}</ScrollFloat>
          <p className="project-description__text">{displayDescription}</p>
        </Reveal>

        {/* ── BookFlip: fotos del producto ── */}
        <Reveal as="div" className="project-section">
          <div className="project-section__header">
            <ScrollFloat as="span" containerClassName="project-section__label" stagger={0.02} animationDuration={0.6}>{t('project_photos')}</ScrollFloat>
            <span className="project-section__count">{String(project.images.length).padStart(2, '0')} {t('project_images_n')}</span>
          </div>
          <PhotoStack
            images={project.images}
            title={displayTitle}
          />
        </Reveal>

        {/* ── BookFlip: proceso creativo (solo si hay) ── */}
        {hasProcess && (
          <Reveal as="div" className="project-section">
            <div className="project-section__header">
              <ScrollFloat as="span" containerClassName="project-section__label" stagger={0.02} animationDuration={0.6}>{t('project_process')}</ScrollFloat>
              <span className="project-section__count">{String(project.processImages.length).padStart(2, '0')} {t('project_images_n')}</span>
            </div>
            <ProcessCircularGallery
              images={project.processImages}
              title={displayTitle}
            />
          </Reveal>
        )}

        {/* Créditos */}
        <Reveal as="section" className="project-credits">
          <p className="project-credits__label">{t('project_credits_label')}</p>
          <ul className="project-credits__list">
            {displayCredits.map((c, i) => (
              <li key={`${c.label}-${i}`} className="project-credits__item">
                <span className="project-credits__role">{c.label}</span>
                <span className="project-credits__name">{c.value}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Tags */}
        <Reveal as="div" className="project-tags">
          {project.tags.map((tag) => (
            <span key={tag} className="project-tag">#{tag}</span>
          ))}
        </Reveal>

      </div>

      {/* ── Prev / Next ── */}
      <nav className="project-nav reveal-stagger">
        <div className="project-nav__side project-nav__side--prev animate-on-scroll reveal-up reveal-near">
          {prev ? (
            <Link to={`/proyecto/${prev.id}`} className="project-nav__link">
              <span className="project-nav__dir">{t('project_prev')}</span>
              <span className="project-nav__name">{prevTitle}</span>
            </Link>
          ) : <div />}
        </div>
        <Link to="/" className="project-nav__back animate-on-scroll reveal-up reveal-near">
          <span>{t('project_view_all')}</span>
        </Link>
        <div className="project-nav__side project-nav__side--next animate-on-scroll reveal-up reveal-near">
          {next ? (
            <Link to={`/proyecto/${next.id}`} className="project-nav__link project-nav__link--right">
              <span className="project-nav__dir">{t('project_next')}</span>
              <span className="project-nav__name">{nextTitle}</span>
            </Link>
          ) : <div />}
        </div>
      </nav>

      {/* ── Footer ── */}
      <footer className="footer animate-on-scroll reveal-up reveal-near reveal-fast">
        <span className="footer__copy">{t('footer_copy')}</span>
        <span className="footer__name">AN Studio</span>
        <nav className="footer__social">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">IG</a>
          <a href="https://linkedin.com"  target="_blank" rel="noopener noreferrer">LI</a>
          <a href="https://behance.net"   target="_blank" rel="noopener noreferrer">BE</a>
        </nav>
      </footer>

    </div>
  );
};

export default ProjectPage;
