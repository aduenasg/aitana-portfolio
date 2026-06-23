/**
 * Coleccion3DPage
 * Página especial para el proyecto agrupado "Colección 3D".
 * Muestra los 6 modelos con slider individual, descripción y paleta de acento.
 */
import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import PROJECTS from '../data/projects';

/* ─── Mini-slider por modelo ──────────────────────────────── */
const ModelSlider = ({ images, title, accent }) => {
  const [current, setCurrent]         = useState(0);
  const [transitioning, setTransit]   = useState(false);

  useEffect(() => { setCurrent(0); }, [images]);

  const goTo = useCallback((idx) => {
    if (idx === current || transitioning) return;
    setTransit(true);
    setTimeout(() => { setCurrent(idx); setTransit(false); }, 280);
  }, [current, transitioning]);

  const prev = () => goTo((current - 1 + images.length) % images.length);
  const next = () => goTo((current + 1) % images.length);

  return (
    <div className="c3d-slider" style={{ '--accent': accent }}>
      <div className={`c3d-slider__stage${transitioning ? ' c3d-slider__stage--fade' : ''}`}>
        <img
          src={images[current]}
          alt={`${title} — ${current + 1}`}
          className="c3d-slider__img"
        />
        <span className="c3d-slider__counter">
          {String(current + 1).padStart(2,'0')} / {String(images.length).padStart(2,'0')}
        </span>
      </div>

      {images.length > 1 && (
        <div className="c3d-slider__controls">
          <button onClick={prev} className="c3d-slider__btn" aria-label="Anterior">←</button>
          <div className="c3d-slider__dots">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`c3d-slider__dot${i === current ? ' c3d-slider__dot--on' : ''}`}
                aria-label={`Imagen ${i + 1}`}
              />
            ))}
          </div>
          <button onClick={next} className="c3d-slider__btn" aria-label="Siguiente">→</button>
        </div>
      )}
    </div>
  );
};

/* ─── Página ──────────────────────────────────────────────── */
const Coleccion3DPage = () => {
  const [activeModel, setActiveModel] = useState(0);
  const project = PROJECTS.find(p => p.id === '__coleccion3d__');
  if (!project) return null;

  const { modelos3d } = project;
  const model = modelos3d[activeModel];

  /* índices prev/next para navegación entre proyectos */
  const allProjects  = PROJECTS;
  const myIndex      = allProjects.findIndex(p => p.id === '__coleccion3d__');
  const prevProject  = allProjects[myIndex - 1];
  const nextProject  = allProjects[myIndex + 1];

  return (
    <div className="c3d-page">

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
            <span className="project-hero__meta-label">Software</span>
            <span className="project-hero__meta-value">CLO 3D 2024.2</span>
          </div>
          <div className="project-hero__meta-item">
            <span className="project-hero__meta-label">Modelos</span>
            <span className="project-hero__meta-value">0{modelos3d.length} diseños</span>
          </div>
          <div className="project-hero__meta-item">
            <span className="project-hero__meta-label">Año</span>
            <span className="project-hero__meta-value">{project.year}</span>
          </div>
          <div className="project-hero__meta-item">
            <span className="project-hero__meta-label">Institución</span>
            <span className="project-hero__meta-value">URJC Madrid</span>
          </div>
        </div>
      </header>

      {/* ── Tira / selector de modelos ── */}
      <section className="c3d-strip">
        <p className="c3d-strip__label">Selecciona un modelo</p>
        <div className="c3d-strip__grid">
          {modelos3d.map((m, i) => (
            <button
              key={i}
              className={`c3d-strip__card${i === activeModel ? ' c3d-strip__card--active' : ''}`}
              onClick={() => setActiveModel(i)}
              style={{ '--strip-accent': m.accent }}
            >
              <img src={m.images[0]} alt={m.title} className="c3d-strip__img" />
              <div className="c3d-strip__info">
                <span className="c3d-strip__num">{m.number}</span>
                <span className="c3d-strip__name">{m.title}</span>
              </div>
              <div className="c3d-strip__bar" />
            </button>
          ))}
        </div>
      </section>

      {/* ── Panel del modelo activo ── */}
      <main className="c3d-main" key={activeModel}>
        {/* Izquierda: slider */}
        <div className="c3d-main__slider-col">
          <ModelSlider
            images={model.images}
            title={model.title}
            accent={model.accent}
          />
        </div>

        {/* Derecha: info */}
        <div className="c3d-main__info-col" style={{ '--accent': model.accent }}>
          <div className="c3d-main__model-num">{model.number}</div>
          <h2 className="c3d-main__model-title">{model.title}</h2>
          <p className="c3d-main__model-subtitle">{model.subtitle}</p>
          <div className="c3d-main__divider" />
          <p className="c3d-main__model-desc">{model.description}</p>

          {/* Acento de color */}
          <div className="c3d-main__palette">
            <span className="c3d-main__palette-swatch" style={{ background: model.accent }} />
            <span className="c3d-main__palette-label">Color de colección</span>
          </div>

          {/* Navegación entre modelos */}
          <div className="c3d-main__model-nav">
            <button
              className="c3d-main__model-btn"
              onClick={() => setActiveModel((activeModel - 1 + modelos3d.length) % modelos3d.length)}
              aria-label="Modelo anterior"
            >
              ← Anterior
            </button>
            <span className="c3d-main__model-progress">
              {String(activeModel + 1).padStart(2,'0')} / {String(modelos3d.length).padStart(2,'0')}
            </span>
            <button
              className="c3d-main__model-btn"
              onClick={() => setActiveModel((activeModel + 1) % modelos3d.length)}
              aria-label="Modelo siguiente"
            >
              Siguiente →
            </button>
          </div>
        </div>
      </main>

      {/* ── Prev / Next ── */}
      <nav className="project-nav">
        <div className="project-nav__side project-nav__side--prev">
          {prevProject ? (
            <Link
              to={prevProject.id.startsWith('__') ? '/coleccion-3d' : `/proyecto/${prevProject.id}`}
              className="project-nav__link"
            >
              <span className="project-nav__dir">← Anterior</span>
              <span className="project-nav__name">{prevProject.title}</span>
            </Link>
          ) : <div />}
        </div>
        <Link to="/" className="project-nav__back">
          <span>Ver todos los proyectos</span>
        </Link>
        <div className="project-nav__side project-nav__side--next">
          {nextProject ? (
            <Link
              to={nextProject.id.startsWith('__') ? '/coleccion-3d' : `/proyecto/${nextProject.id}`}
              className="project-nav__link project-nav__link--right"
            >
              <span className="project-nav__dir">Siguiente →</span>
              <span className="project-nav__name">{nextProject.title}</span>
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

export default Coleccion3DPage;
