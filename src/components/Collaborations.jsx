import Reveal from './Reveal';
import ScrollFloat from './ScrollFloat';
import CollabCarousel from './CollabCarousel';
import COLLABORATIONS from '../data/collaborations';
import { useLang } from '../context/LangContext';

const Collaborations = () => {
  const { t } = useLang();
  return (
    <section className="collabs" id="collabs">
      <div className="works__header">
        <ScrollFloat as="span" containerClassName="works__label" stagger={0.02} animationDuration={0.6}>{t('collabs_label')}</ScrollFloat>
        <span className="works__count">0{COLLABORATIONS.length}</span>
      </div>

      <Reveal delay={0.1}>
        <CollabCarousel />
      </Reveal>
    </section>
  );
};

export default Collaborations;
