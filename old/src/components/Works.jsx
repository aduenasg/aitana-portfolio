import { Link } from 'react-router-dom';
import PROJECTS from '../data/projects';
import WorkCard from './WorkCard';
import { useLang } from '../context/LangContext';

const Works = () => {
  const { t } = useLang();
  return (
    <section className="works" id="works">
      <div className="works__header">
        <span className="works__label">{t('works_label')}</span>
        <span className="works__count">0{PROJECTS.length}</span>
      </div>
      <div className="works__grid">
        {PROJECTS.map((p) => (
          <WorkCard key={p.id} {...p} />
        ))}
      </div>
    </section>
  );
};

export default Works;
