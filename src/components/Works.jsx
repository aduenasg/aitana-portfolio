import { Link } from 'react-router-dom';
import PROJECTS from '../data/projects';
import WorkCard from './WorkCard';
import StackCard from './StackCard';
import ScrollFloat from './ScrollFloat';
import { useLang } from '../context/LangContext';

const Works = () => {
  const { t } = useLang();
  return (
    <section className="works" id="works">
      {/* Sólo entra la cabecera. Las tarjetas NO: .works__stack-item es
          sticky y su tarjeta ya se escala con el scroll (StackCard).
          Un transform de entrada rompería el sticky y competiría con
          esa animación. */}
      <div className="works__header animate-on-scroll reveal-up">
        <ScrollFloat as="span" containerClassName="works__label" stagger={0.02} animationDuration={0.6}>{t('works_label')}</ScrollFloat>
        <span className="works__count">0{PROJECTS.length}</span>
      </div>
      <div className="works__stack">
        {PROJECTS.map((p, i) => (
          <StackCard key={p.id} i={i} total={PROJECTS.length}>
            <WorkCard {...p} />
          </StackCard>
        ))}
      </div>
    </section>
  );
};

export default Works;
