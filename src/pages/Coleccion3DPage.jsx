/**
 * Coleccion3DPage
 * Página especial para el proyecto agrupado "Colección 3D".
 * Muestra los 6 modelos con slider individual, descripción y paleta de acento.
 */
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import PROJECTS from '../data/projects';
import CardCoverFlow from '../components/CardCoverFlow';
import Navbar from '../components/Navbar';

/* ─── Slider de fotos del modelo activo (CardCoverFlow) ──────────────
   Pasando el ratón por encima de cada miniatura se muestra esa foto. ── */
const ModelPhotoCoverFlow = ({ images, title, accent }) => {
  const [photoIndex, setPhotoIndex] = useState(0);

  useEffect(() => { setPhotoIndex(0); }, [images]);

  const items = images.map((src, i) => ({ src, title: `${title} — ${i + 1}` }));

  return (
    <div className="c3d-slider" style={{ '--accent': accent }}>
      <div className="c3d-slider__coverflow">
        <CardCoverFlow
          images={items}
          activeIndex={photoIndex}
          onChange={setPhotoIndex}
        />
      </div>
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
      <Navbar variant="inner" />

      {/* ── Hero banner ── */}
      <header className="project-hero" style={{ '--cover-bg': project.coverBg }}>
        <motion.div
          className="project-hero__bg-number"
          aria-hidden="true"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          {project.number}
        </motion.div>
        <div className="project-hero__content">
          <motion.p
            className="project-hero__category"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.05 }}
          >
            {project.category}
          </motion.p>
          <motion.h1
            className="project-hero__title"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            {project.title}
          </motion.h1>
          <motion.p
            className="project-hero__subtitle"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {project.subtitle}
          </motion.p>
        </div>
        <motion.div
          className="project-hero__meta"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
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
        </motion.div>
      </header>

      {/* ── Tira / selector de modelos ── */}
      <section className="c3d-strip">
        <motion.p
          className="c3d-strip__label"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '50px' }}
          transition={{ duration: 0.5 }}
        >
          Selecciona un modelo
        </motion.p>
        <div className="c3d-strip__grid">
          {modelos3d.map((m, i) => (
            <motion.button
              key={i}
              className={`c3d-strip__card${i === activeModel ? ' c3d-strip__card--active' : ''}`}
              onClick={() => setActiveModel(i)}
              onMouseEnter={() => setActiveModel(i)}
              onFocus={() => setActiveModel(i)}
              style={{ '--strip-accent': m.accent }}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '50px' }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              whileHover={{ y: -6, scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <img src={m.images[0]} alt={m.title} className="c3d-strip__img" />
              <div className="c3d-strip__info">
                <span className="c3d-strip__num">{m.number}</span>
                <span className="c3d-strip__name">{m.title}</span>
              </div>
              <div className="c3d-strip__bar" />
            </motion.button>
          ))}
        </div>
      </section>


      {/* ── Panel del modelo activo ── */}
      <AnimatePresence mode="wait">
        <motion.main
          className="c3d-main"
          key={activeModel}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {/* Izquierda: slider */}
          <div className="c3d-main__slider-col">
            <ModelPhotoCoverFlow
              images={model.images}
              title={model.title}
              accent={model.accent}
            />
          </div>

          {/* Derecha: info */}
          <div className="c3d-main__info-col" style={{ '--accent': model.accent }}>
            <motion.div
              className="c3d-main__model-num"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
            >
              {model.number}
            </motion.div>
            <motion.h2
              className="c3d-main__model-title"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {model.title}
            </motion.h2>
            <motion.p
              className="c3d-main__model-subtitle"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              {model.subtitle}
            </motion.p>
            <motion.div
              className="c3d-main__divider"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              style={{ transformOrigin: 'left' }}
            />
            <motion.p
              className="c3d-main__model-desc"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
            >
              {model.description}
            </motion.p>

            {/* Acento de color */}
            <motion.div
              className="c3d-main__palette"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <motion.span
                className="c3d-main__palette-swatch"
                style={{ background: model.accent }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 0.32 }}
              />
              <span className="c3d-main__palette-label">Color de colección</span>
            </motion.div>

            {/* Navegación entre modelos */}
            <div className="c3d-main__model-nav">
              <motion.button
                className="c3d-main__model-btn"
                onClick={() => setActiveModel((activeModel - 1 + modelos3d.length) % modelos3d.length)}
                aria-label="Modelo anterior"
                whileHover={{ x: -4 }}
                whileTap={{ scale: 0.95 }}
              >
                ← Anterior
              </motion.button>
              <span className="c3d-main__model-progress">
                {String(activeModel + 1).padStart(2,'0')} / {String(modelos3d.length).padStart(2,'0')}
              </span>
              <motion.button
                className="c3d-main__model-btn"
                onClick={() => setActiveModel((activeModel + 1) % modelos3d.length)}
                aria-label="Modelo siguiente"
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.95 }}
              >
                Siguiente →
              </motion.button>
            </div>
          </div>
        </motion.main>
      </AnimatePresence>

      {/* ── Prev / Next ── */}
      <nav className="project-nav reveal-stagger">
        <div className="project-nav__side project-nav__side--prev animate-on-scroll reveal-up reveal-near">
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
        <Link to="/" className="project-nav__back animate-on-scroll reveal-up reveal-near">
          <span>Ver todos los proyectos</span>
        </Link>
        <div className="project-nav__side project-nav__side--next animate-on-scroll reveal-up reveal-near">
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
      <footer className="footer animate-on-scroll reveal-up reveal-near reveal-fast">
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
