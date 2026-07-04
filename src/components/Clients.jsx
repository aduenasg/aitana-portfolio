import { useLang } from '../context/LangContext';

const CLIENTS = ['Vogue España','Elle','Mango','Zara',"Harper's Bazaar",'Sandro'];

const Clients = () => {
  const { t } = useLang();
  return (
    <section className="clients">
      <p className="clients__label">{t('clients_label')}</p>
      <ul className="clients__list">
        {CLIENTS.map((name) => (
          <li key={name} className="clients__item">{name}</li>
        ))}
      </ul>
    </section>
  );
};

export default Clients;
