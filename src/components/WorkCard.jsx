/**
 * WorkCard
 * Props:
 *   number   {string}  – display number, e.g. "01"
 *   category {string}  – small uppercase label
 *   title    {string}  – project name
 *   image    {string}  – optional photo URL
 *   variant  {string}  – "" | "warm" | "cool"  (background tint)
 *   wide     {boolean} – spans 2 grid columns
 */
import { Link } from 'react-router-dom';

const WorkCard = ({ id, number, category, title, image, variant = '', wide = false }) => {
  const imageClass = [
    'work-card__image',
    variant === 'warm' ? 'work-card__image--warm' : '',
    variant === 'cool' ? 'work-card__image--cool' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Link
      to={`/proyecto/${id}`}
      className={`work-card${wide ? ' work-card--wide' : ''}`}
      aria-label={`Ver proyecto: ${title}`}
    >
      <div className={imageClass}>
        {image && <img src={image} alt={title} />}

        <span className="work-card__number">{number}</span>

        <div className="work-card__overlay">
          <span className="work-card__cta">Ver proyecto</span>
          <p className="work-card__overlay-title">{title}</p>
        </div>
      </div>

      <div className="work-card__meta">
        <p className="work-card__category">{category}</p>
        <p className="work-card__title">{title}</p>
      </div>
    </Link>
  );
};

export default WorkCard;
