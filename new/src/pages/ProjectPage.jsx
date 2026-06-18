import { useParams, Link, useNavigate } from 'react-router-dom';
import PROJECTS from '../data/projects';

/* ── small inline helpers ──────────────────────────────────────── */

const PlaceholderFrame = ({ bg = '#131313', number = '01', tall = false }) => (
  <div
    className="project-placeholder"
    style={{
      background: bg,
      aspectRatio: tall ? '2 / 3' : '16 / 9',
    }}
  >
    <svg
      width="60"
      height="90"
      viewBox="0 0 60 90"
      fill="none"
      stroke="rgba(240,236,228,0.08)"
      strokeWidth="0.6"
    >
      <ellipse cx="30" cy="16" rx="12" ry="12" />
      <path d="M10 34 Q10 26 30 26 Q50 26 50 34 L54 86 H6 Z" />
      <line x1="18" y1="46" x2="6" y2="78" />
      <line x1="42" y1="46" x2="54" y2="78" />
    </svg>
    <span className="project-placeholder__number">{number}</span>
  </div>
);

/* ── main component ─────────────────────────────────────────────── */

const ProjectPage = () => {
  const { id }     = useParams();
  const navigate   = useNavigate();
  const project    = PROJECTS.find((p) => p.id === id);

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
        <div className="project-hero__bg-number" aria-hidden="true">
          {project.number}
        </div>

        <div className="project-hero__content">
          <p className="project-hero__category">{project.category}</p>
          <h1 className="project-hero__title">{project.title}</h1>
          <p className="project-hero__subtitle">{project.subtitle}</p>
        </div>

        {/* meta strip */}
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

      {/* ── Cover image ── */}
      <div className="project-cover">
        {project.images[0] ? (
          <img src={project.images[0]} alt={`${project.title} — cover`} />
        ) : (
          <PlaceholderFrame bg={project.coverBg} number={project.number} />
        )}
      </div>

      {/* ── Body ── */}
      <div className="project-body">

        {/* description */}
        <section className="project-description">
          <p className="project-description__label">Sobre el proyecto</p>
          <p className="project-description__text">{project.description}</p>
        </section>

        {/* 2-up images */}
        <div className="project-images-2up">
          {[1, 2].map((i) => (
            project.images[i] ? (
              <img key={i} src={project.images[i]} alt={`${project.title} ${i + 1}`} />
            ) : (
              <PlaceholderFrame key={i} bg={project.coverBg} number={project.number} tall />
            )
          ))}
        </div>

        {/* full-width image */}
        <div className="project-image-full">
          {project.images[3] ? (
            <img src={project.images[3]} alt={`${project.title} — full`} />
          ) : (
            <PlaceholderFrame bg={project.coverBg} number={project.number} />
          )}
        </div>

        {/* credits */}
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

        {/* tags */}
        <div className="project-tags">
          {project.tags.map((t) => (
            <span key={t} className="project-tag">#{t}</span>
          ))}
        </div>

      </div>

      {/* ── Prev / Next navigation ── */}
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
