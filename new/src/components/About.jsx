/**
 * About
 * Props:
 *   aboutImage {string} – optional URL / imported asset for the portrait photo
 */
const About = ({ aboutImage }) => (
  <section className="about" id="about">

    {/* ── Image column ── */}
    <div className="about__image">
      {aboutImage ? (
        <img src={aboutImage} alt="Aitana Núñez — studio" />
      ) : (
        <svg
          width="70"
          height="110"
          viewBox="0 0 70 110"
          fill="none"
          stroke="rgba(240,236,228,0.1)"
          strokeWidth="0.6"
        >
          <ellipse cx="35" cy="22" rx="14" ry="14" />
          <path d="M12 46 Q12 36 35 36 Q58 36 58 46 L64 104 H6 Z" />
          <line x1="22" y1="60" x2="8" y2="96" />
          <line x1="48" y1="60" x2="62" y2="96" />
        </svg>
      )}
      <span className="about__rotated-text">Aitana</span>
    </div>

    {/* ── Text column ── */}
    <div className="about__content">
      <p className="about__label">Sobre Aitana</p>

      <blockquote className="about__quote">
        "La moda no es solo ropa. Es el idioma silencioso con el que le digo al mundo quién soy."
      </blockquote>

      <p className="about__body">
        Con más de diez años entre bastidores de la industria, Aitana Núñez ha construido
        un lenguaje visual propio donde la elegancia nunca es accidental. Ha trabajado con
        marcas, editoriales y artistas que comparten su obsesión por los detalles.
      </p>

      <div className="about__actions">
        <button className="btn">Studio →</button>
        <button className="btn btn--gold">Descargar press kit</button>
      </div>
    </div>

  </section>
);

export default About;
