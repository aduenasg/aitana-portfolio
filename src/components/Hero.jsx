/**
 * Hero
 * Props:
 *   heroImage {string} – optional URL / imported asset for the portrait photo
 */
const Hero = ({ heroImage }) => (
  <section className="hero">

    {/* ── Left column ── */}
    <div className="hero__left">
      <p className="hero__tag">Estilista · Directora creativa · Madrid</p>

      <h1 className="hero__title">
        <span className="hero__title--outline">Fashion</span>
        is my
        <span className="hero__title--italic">language.</span>
      </h1>

      <div className="hero__bottom">
        <p className="hero__desc">
          Colecciones que hablan sin palabras. Más de diez años creando universos
          visuales donde cada prenda cuenta una historia diferente.
        </p>
        <span className="hero__scroll-hint">Scroll</span>
      </div>
    </div>

    {/* ── Right column ── */}
    <div className="hero__right">
      <div className="hero__image-frame">
        {heroImage ? (
          <img src={heroImage} alt="Aitana Núñez" />
        ) : (
          <svg
            className="hero__placeholder-svg"
            width="72"
            height="108"
            viewBox="0 0 72 108"
            fill="none"
            stroke="white"
            strokeWidth="0.6"
          >
            <ellipse cx="36" cy="20" rx="14" ry="14" />
            <path d="M14 42 Q14 33 36 33 Q58 33 58 42 L64 102 H8 Z" />
            <line x1="22" y1="56" x2="8" y2="96" />
            <line x1="50" y1="56" x2="64" y2="96" />
          </svg>
        )}
        
      </div>

      <div className="hero__year">2026</div>
    </div>

  </section>
);

export default Hero;
