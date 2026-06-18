import { Link } from 'react-router-dom';
import PROJECTS from '../data/projects';

const WorkCard = ({ id, number, category, title, image, variant = '', wide = false }) => {
  const imageClass = [
    'work-card__image',
    variant === 'warm' ? 'work-card__image--warm' : '',
    variant === 'cool' ? 'work-card__image--cool' : '',
  ].filter(Boolean).join(' ');

  return (
    <Link
      to={`/proyecto/${id}`}
      className={`work-card${wide ? ' work-card--wide' : ''}`}
      aria-label={`Ver proyecto: ${title}`}
    >
      <div className={imageClass}>
        <h1>holaaa {image} </h1>
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

const Works = () => (
  <section className="works" id="works">
    <div className="works__header">
      <span className="works__label">Trabajos seleccionados</span>
      <span className="works__count">0{PROJECTS.length}</span>
    </div>
    <div className="works__grid">
      {PROJECTS.map((p) => (
        <WorkCard key={p.id} {...p} />
      ))}
    </div>
  </section>
);

export default Works;
