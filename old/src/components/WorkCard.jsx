import { Link } from 'react-router-dom';
import { useLang } from '../context/LangContext';

const WorkCard = ({ id, number, category, title, image, variant = '', wide = false }) => {
  const { t, tp } = useLang();
  const proj = tp(id);

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
    <Link to={href} className={cardClass} aria-label={`Ver proyecto: ${proj.title || title}`}>
      <div className="work-card__image-wrap">
        {image && <img src={image} alt={proj.title || title} className="work-card__img" />}
        <div className="work-card__gradient" />
        <span className="work-card__number" aria-hidden="true">{number}</span>
        <div className="work-card__info">
          <p className="work-card__category">{proj.category || category}</p>
          <p className="work-card__title">{proj.title || title}</p>
        </div>
        <div className="work-card__overlay">
          <span className="work-card__cta">{t('work_cta')}</span>
        </div>
      </div>
    </Link>
  );
};

export default WorkCard;
