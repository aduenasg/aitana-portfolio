import { useLang } from '../context/LangContext';
import Reveal from './Reveal';

const CLIENTS = ['Vogue España','Elle','Mango','Zara',"Harper's Bazaar",'Sandro'];

const Clients = () => {
  const { t } = useLang();
  return (
    <section className="clients">
      <Reveal as="p" className="clients__label">{t('clients_label')}</Reveal>
      <Reveal as="ul" className="clients__list" delay={0.1}>
        {CLIENTS.map((name) => (
          <li key={name} className="clients__item">{name}</li>
        ))}
      </Reveal>
    </section>
  );
};

export default Clients;
