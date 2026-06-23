import { useParams, Link, Navigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import PROJECTS from '../data/projects';

/* ── BookFlip — todas las imágenes en DOM, solo CSS anima ── */
const BookFlip = ({ images, title }) => {
  const [idx, setIdx]   = useState(0);
  const [anim, setAnim] = useState(null); // null | 'next' | 'prev'
  const lockRef         = useRef(false);

  useEffect(() => {
    setIdx(0);
    setAnim(null);
    lockRef.current = false;
  }, [images]);

  if (!images || !images.length) return null;

  const go = (dir) => {
    if (lockRef.current) return;
    if (dir === 'next' && idx >= images.length - 1) return;
    if (dir === 'prev' && idx <= 0) return;

    lockRef.current = true;
    const nextIdx = dir === 'next' ? idx + 1 : idx - 1;

    // Actualizamos idx inmediatamente — las imágenes ya están en el DOM
    setIdx(nextIdx);
    setAnim(dir);

    setTimeout(() => {
      setAnim(null);
      lockRef.current = false;
    }, 650);
  };

  // Página izquierda = idx-1, página derecha = idx
  const leftSrc  = idx > 0 ? images[idx - 1] : null;
  const rightSrc = images[idx];

  return (
    <div className="book-flip">
      {/* Precargar todas las imágenes ocultas */}
      <div style={{ display: 'none' }} aria-hidden="true">
        {images.map((src, i) => <img key={i} src={src} alt="" />)}
      </div>

      <div className="book-flip__spine" />

      <div className="book-flip__book">

        {/* Página izquierda */}
        <div className={`book-flip__page book-flip__page--left${anim === 'prev' ? ' book-flip__page--flipping-prev' : ''}`}>
          {leftSrc
            ? <img src={leftSrc} alt="" className="book-flip__img" aria-hidden="true" />
            : <div className="book-flip__empty" />
          }
          <div className="book-flip__page-shadow book-flip__page-shadow--left" />
        </div>

        {/* Página derecha */}
        <div className={`book-flip__page book-flip__page--right${anim === 'next' ? ' book-flip__page--flipping-next' : ''}`}>
          <img
            src={rightSrc}
            alt={`${title} — ${idx + 1} de ${images.length}`}
            className="book-flip__img"
          />
          <div className="book-flip__page-shadow book-flip__page-shadow--right" />
        </div>

      </div>

      {/* Controles */}
      {images.length > 1 && (
        <div className="book-flip__controls">
          <button className="book-flip__btn" onClick={() => go('prev')} disabled={idx === 0} aria-label="Página anterior">←</button>
          <span className="book-flip__counter">{String(idx + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}</span>
          <div className="book-flip__dots">
            {images.map((_, i) => (
              <button key={i} className={`book-flip__dot${i === idx ? ' book-flip__dot--active' : ''}`}
                onClick={() => { if (i > idx) go('next'); else if (i < idx) go('prev'); }}
                aria-label={`Imagen ${i + 1}`} />
            ))}
          </div>
          <button className="book-flip__btn" onClick={() => go('next')} disabled={idx === images.length - 1} aria-label="Página siguiente">→</button>
        </div>
      )}
    </div>
  );
};

/* ── Página de proyecto ─────────────────────────────────── */
const ProjectPage = () => {
  const { id }  = useParams();
  const project = PROJECTS.find((p) => p.id === id);

  if (id === '__coleccion3d__') return <Navigate to="/coleccion-3d" replace />;
  if (id === '__process__')    return <Navigate to="/proceso-clo3d" replace />;

  if (!project) {
    return (
      <div className="project-not-found">
        <p>Proyecto no encontrado.</p>
        <Link to="/" className="btn">← Volver al portfolio</Link>
      </div>
    );
  }

  const currentIndex = PROJECTS.findIndex((p) => p.id === id);
  const prev = PROJECTS[currentIndex - 1] ?? null;
  const next = PROJECTS[currentIndex + 1] ?? null;

  const hasProcess = project.processImages && project.processImages.length > 0;

  return (
    <div className="project-page">

      {/* ── Navbar ── */}
      <nav className="navbar">
        <div className="navbar__brand">
          <div className="navbar__dot" />
          <Link to="/" className="navbar__name">Aitana Núñez</Link>
        </div>
        <ul className="navbar__links">
          <li><Link to="/#works">Obras</Link></li>
          <li><Link to="/#about">Studio</Link></li>
          <li><Link to="/#contact">Contacto</Link></li>
        </ul>
      </nav>

      {/* ── Hero banner ── */}
      <header className="project-hero" style={{ '--cover-bg': project.coverBg }}>
        <div className="project-hero__bg-number" aria-hidden="true">{project.number}</div>
        <div className="project-hero__content">
          <p className="project-hero__category">{project.category}</p>
          <h1 className="project-hero__title">{project.title}</h1>
          <p className="project-hero__subtitle">{project.subtitle}</p>
        </div>
        <div className="project-hero__meta">
          <div className="project-hero__meta-item">
            <span className="project-hero__meta-label">Cliente</span>
            <span className="project-hero__meta-value">{project.client}</span>
          </div>
          <div className="project-hero__meta-item">
            <span className="project-hero__meta-label">Rol</span>
            <span className="project-hero__meta-value">{project.role}</span>
          </div>
          <div className="project-hero__meta-item">
            <span className="project-hero__meta-label">Año</span>
            <span className="project-hero__meta-value">{project.year}</span>
          </div>
          <div className="project-hero__meta-item">
            <span className="project-hero__meta-label">Localización</span>
            <span className="project-hero__meta-value">{project.location}</span>
          </div>
        </div>
      </header>

      {/* ── Body ── */}
      <div className="project-body">

        {/* Descripción */}
        <section className="project-description">
          <p className="project-description__label">Sobre el proyecto</p>
          <p className="project-description__text">{project.description}</p>
        </section>

        {/* ── BookFlip: fotos del producto ── */}
        <div className="project-section">
          <div className="project-section__header">
            <span className="project-section__label">Fotografía del producto</span>
            <span className="project-section__count">{String(project.images.length).padStart(2, '0')} imágenes</span>
          </div>
          <BookFlip
            images={project.images}
            title={project.title}
          />
        </div>

        {/* ── BookFlip: proceso creativo (solo si hay) ── */}
        {hasProcess && (
          <div className="project-section">
            <div className="project-section__header">
              <span className="project-section__label">Proceso creativo</span>
              <span className="project-section__count">{String(project.processImages.length).padStart(2, '0')} imágenes</span>
            </div>
            <BookFlip
              images={project.processImages}
              title={`${project.title} — proceso`}
            />
          </div>
        )}

        {/* Créditos */}
        <section className="project-credits">
          <p className="project-credits__label">Créditos</p>
          <ul className="project-credits__list">
            {project.credits.map((c) => (
              <li key={c.label} className="project-credits__item">
                <span className="project-credits__role">{c.label}</span>
                <span className="project-credits__name">{c.value}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Tags */}
        <div className="project-tags">
          {project.tags.map((t) => (
            <span key={t} className="project-tag">#{t}</span>
          ))}
        </div>

      </div>

      {/* ── Prev / Next ── */}
      <nav className="project-nav">
        <div className="project-nav__side project-nav__side--prev">
          {prev ? (
            <Link to={`/proyecto/${prev.id}`} className="project-nav__link">
              <span className="project-nav__dir">← Anterior</span>
              <span className="project-nav__name">{prev.title}</span>
            </Link>
          ) : <div />}
        </div>
        <Link to="/" className="project-nav__back">
          <span>Ver todos los proyectos</span>
        </Link>
        <div className="project-nav__side project-nav__side--next">
          {next ? (
            <Link to={`/proyecto/${next.id}`} className="project-nav__link project-nav__link--right">
              <span className="project-nav__dir">Siguiente →</span>
              <span className="project-nav__name">{next.title}</span>
            </Link>
          ) : <div />}
        </div>
      </nav>

      {/* ── Footer ── */}
      <footer className="footer">
        <span className="footer__copy">© 2026 Aitana Núñez</span>
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
