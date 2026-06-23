/**
 * WorkCard — mejorado estéticamente
 * Imagen a pantalla completa con overlay elegante y zoom sutil en hover
 * Si id === '__process__' enlaza a /proceso-clo3d en vez de /proyecto/:id
 */
import { Link } from 'react-router-dom';

const WorkCard = ({ id, number, category, title, image, variant = '', wide = false }) => {
  const cardClass = [
    'work-card',
    wide ? 'work-card--wide' : '',
    variant ? `work-card--${variant}` : '',
  ].filter(Boolean).join(' ');

  const href = id === '__process__'
    ? '/proceso-clo3d'
    : id === '__coleccion3d__'
    ? '/coleccion-3d'
    : `/proyecto/${id}`;

  return (
    <Link
      to={href}
      className={cardClass}
      aria-label={`Ver proyecto: ${title}`}
    >
      <div className="work-card__image-wrap">
        {image && <img src={image} alt={title} className="work-card__img" />}
        <div className="work-card__gradient" />

        {/* Number watermark */}
        <span className="work-card__number" aria-hidden="true">{number}</span>

        {/* Bottom info always visible */}
        <div className="work-card__info">
          <p className="work-card__category">{category}</p>
          <p className="work-card__title">{title}</p>
        </div>

        {/* Hover CTA */}
        <div className="work-card__overlay">
          <span className="work-card__cta">Ver proyecto →</span>
        </div>
      </div>
    </Link>
  );
};

export default WorkCard;
