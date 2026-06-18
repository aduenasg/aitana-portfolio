import { Link } from 'react-router-dom';
import PROJECTS from '../data/projects';
import WorkCard from './WorkCard';

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
