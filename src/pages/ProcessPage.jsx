/**
 * ProcessPage — Proceso Creativo · Colección CLO 3D
 * Muestra el proceso de trabajo organizado por modelo,
 * con visor de imagen en lightbox y separadores visuales.
 */
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

/* ── Imágenes de proceso ─────────────────────────────── */
import ProcBotones       from '../img/proceso-botones.png';
import ProcClo01         from '../img/proceso-clo-01.png';
import ProcClo02         from '../img/proceso-clo-02.png';
import ProcClo03         from '../img/proceso-clo-03.png';
import ProcClo04         from '../img/proceso-clo-04.png';
import ProcClo05         from '../img/proceso-clo-05.png';
import ProcClo06         from '../img/proceso-clo-06.png';
import ProcClo07         from '../img/proceso-clo-07.png';
import ProcClo08         from '../img/proceso-clo-08.png';
import ProcClo09         from '../img/proceso-clo-09.png';
import ProcClo10         from '../img/proceso-clo-10.png';
import ProcClo11         from '../img/proceso-clo-11.png';
import ProcCremallera    from '../img/proceso-cremallera.png';
import ProcDisenoTerm    from '../img/proceso-diseno-terminado.png';
import ProcParticle      from '../img/proceso-particle.png';

/* ── Datos de modelos ────────────────────────────────── */
const MODELS = [
  {
    number: '01',
    title: 'Blanco y Carmesí',
    subtitle: 'Chaqueta doble botonadura + falda ombré',
    color: '#1a0608',
    steps: [
      { img: ProcClo01, caption: 'Inicio del patrón base en CLO 3D — avatar femenino FV2' },
      { img: ProcClo02, caption: 'Patronaje de la chaqueta con pinzas y solapa' },
      { img: ProcClo03, caption: 'Prueba de cosido y ajuste de piezas sobre el avatar' },
      { img: ProcClo04, caption: 'Doblar solapa con Fold Arrangement y añadir botones' },
      { img: ProcClo05, caption: 'Selección de tejidos — lino exterior, seda tafetán para el forro' },
      { img: ProcClo06, caption: 'Chaqueta terminada con forro rojo granate y botones burdeos' },
      { img: ProcBotones, caption: 'Detalle render: botones burdeos de 4 agujeros' },
      { img: ProcClo07, caption: 'Construcción de la falda de vuelo con abanicos para amplitud' },
    ],
  },
  {
    number: '02',
    title: 'Top Granate',
    subtitle: 'Corpiño floral + palazzo granate',
    color: '#1a0308',
    steps: [
      { img: ProcClo08, caption: 'Patrón del top corpiño con cuello-solapa bordado en muslin' },
      { img: ProcClo09, caption: 'Simulación del drapeado del escote y ajuste de forro interior' },
      { img: ProcParticle, caption: 'Ajuste de Particle Distance para mayor detalle en la tela' },
    ],
  },
  {
    number: '03',
    title: 'Novia con Cola',
    subtitle: 'Vestido de novia con tirantes finos y cola',
    color: '#0c0c0d',
    steps: [
      { img: ProcClo10, caption: 'Patrón de la falda circular con orificio interno para el talle' },
      { img: ProcClo11, caption: 'Construcción del escenario: suelo de azulejos y ventanal de cristal' },
      { img: ProcCremallera, caption: 'Detalle render: cremallera invisible en el centro de la espalda' },
      { img: ProcDisenoTerm, caption: 'Diseño terminado — simulación de maniquí con vestido de novia' },
    ],
  },
];

/* ── Lightbox ────────────────────────────────────────── */
const Lightbox = ({ src, caption, onClose }) => {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div className="process-lightbox" onClick={onClose}>
      <button className="process-lightbox__close" aria-label="Cerrar">✕</button>
      <div className="process-lightbox__inner" onClick={(e) => e.stopPropagation()}>
        <img src={src} alt={caption} className="process-lightbox__img" />
        {caption && <p className="process-lightbox__caption">{caption}</p>}
      </div>
    </div>
  );
};

/* ── Página principal ────────────────────────────────── */
const ProcessPage = () => {
  const [lightbox, setLightbox] = useState(null); // { src, caption }

  return (
    <div className="process-page">

      {/* ── Navbar ── */}
      <Navbar variant="inner" />

      {/* ── Hero ── */}
      <header className="process-hero">
        {/* Zoom y no desplazamiento: es un rótulo a sangre y cualquier
            viaje lateral asomaría por el borde de la pantalla. */}
        <div className="process-hero__bg-text animate-on-scroll reveal-zoom reveal-slow" aria-hidden="true">CLO3D</div>
        <div className="process-hero__content reveal-stagger">
          <p className="process-hero__label animate-on-scroll reveal-up reveal-near reveal-fast">Proceso creativo · Diseño digital</p>
          <h1 className="process-hero__title animate-on-scroll reveal-up">Behind the<span className="process-hero__title--italic"> collection.</span></h1>
          <p className="process-hero__sub animate-on-scroll reveal-up reveal-near">
            Documentación del proceso de diseño y simulación en CLO 3D —
            trabajo final del Grado en Tecnología y Moda, Universidad Rey Juan Carlos 2025.
          </p>
        </div>
        <div className="process-hero__meta reveal-stagger reveal-stagger--tight">
          <div className="process-hero__meta-item animate-on-scroll reveal-up reveal-near reveal-fast">
            <span className="process-hero__meta-label">Software</span>
            <span className="process-hero__meta-value">CLO 3D 2024.2</span>
          </div>
          <div className="process-hero__meta-item animate-on-scroll reveal-up reveal-near reveal-fast">
            <span className="process-hero__meta-label">Modelos</span>
            <span className="process-hero__meta-value">0{MODELS.length} diseños</span>
          </div>
          <div className="process-hero__meta-item animate-on-scroll reveal-up reveal-near reveal-fast">
            <span className="process-hero__meta-label">Institución</span>
            <span className="process-hero__meta-value">URJC Madrid</span>
          </div>
        </div>
      </header>

      {/* ── Cuerpo por modelos ── */}
      <div className="process-body">
        {MODELS.map((model, mi) => (
          <section
            key={model.number}
            className="process-model"
            style={{ '--model-color': model.color }}
          >
            {/* Cabecera del modelo */}
            <div className="process-model__header animate-on-scroll reveal-up">
              <span className="process-model__number">{model.number}</span>
              <div className="process-model__info">
                <h2 className="process-model__title">{model.title}</h2>
                <p className="process-model__subtitle">{model.subtitle}</p>
              </div>
              <span className="process-model__count">
                {String(model.steps.length).padStart(2, '0')} capturas
              </span>
            </div>

            {/* Grid de capturas.
                Sin `reveal-stagger` en la rejilla: es demasiado alta y
                el grupo se dispararía entero al asomar su borde. Cada
                captura lleva su propio observador y entra al llegar el
                scroll. El índice por columna (si % 3) le da el retraso
                progresivo dentro de cada fila. */}
            <div className="process-model__grid">
              {model.steps.map((step, si) => (
                <button
                  key={si}
                  className="process-step animate-on-scroll reveal-up reveal-near"
                  style={{ '--reveal-index': si % 3 }}
                  onClick={() => setLightbox({ src: step.img, caption: step.caption })}
                  aria-label={`Ampliar: ${step.caption}`}
                >
                  <div className="process-step__img-wrap">
                    <img src={step.img} alt={step.caption} className="process-step__img" />
                    <div className="process-step__overlay">
                      <span className="process-step__zoom">⊕</span>
                    </div>
                  </div>
                  <p className="process-step__caption">{step.caption}</p>
                  <span className="process-step__index">
                    {String(si + 1).padStart(2, '0')}
                  </span>
                </button>
              ))}
            </div>

            {/* Divisor entre modelos (no en el último) */}
            {mi < MODELS.length - 1 && (
              <div className="process-divider animate-on-scroll reveal-fade" aria-hidden="true">
                <span className="process-divider__line" />
                <span className="process-divider__dot">✦</span>
                <span className="process-divider__line" />
              </div>
            )}
          </section>
        ))}
      </div>

      {/* ── Footer ── */}
      <footer className="footer animate-on-scroll reveal-up reveal-near reveal-fast">
        <span className="footer__copy">© 2026 Aitana Núñez</span>
        <Link to="/#works" className="footer__name">← Volver a proyectos</Link>
        <nav className="footer__social">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">IG</a>
          <a href="https://linkedin.com"  target="_blank" rel="noopener noreferrer">LI</a>
          <a href="https://behance.net"   target="_blank" rel="noopener noreferrer">BE</a>
        </nav>
      </footer>

      {/* ── Lightbox ── */}
      {lightbox && (
        <Lightbox
          src={lightbox.src}
          caption={lightbox.caption}
          onClose={() => setLightbox(null)}
        />
      )}
    </div>
  );
};

export default ProcessPage;
