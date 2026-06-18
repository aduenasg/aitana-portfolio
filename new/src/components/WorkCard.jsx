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
const WorkCard = ({ number, category, title, image, variant = '', wide = false }) => {
  const imageClass = [
    'work-card__image',
    variant === 'warm' ? 'work-card__image--warm' : '',
    variant === 'cool' ? 'work-card__image--cool' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    
    <article className={`work-card${wide ? ' work-card--wide' : ''}`}>{image}
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
    </article>
  );
};

export default WorkCard;
