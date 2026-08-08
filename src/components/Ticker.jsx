import { useLang } from '../context/LangContext';

/* Reserva por si un idioma no trae la lista: mejor una cinta en
   español que una cinta vacía. */
const FALLBACK = ['Estilismo', 'Dirección creativa', 'Moda editorial', 'Lookbook', 'Dirección de arte', 'Campaña'];

const Ticker = () => {
  const { t } = useLang();
  const items = t('ticker_items');
  const list = Array.isArray(items) ? items : FALLBACK;

  // Duplicada, la cinta encadena sin salto: la animación recorre el
  // 50% del ancho y vuelve al origen sobre contenido idéntico.
  const doubled = [...list, ...list];

  return (
    /* aria-hidden: es una cinta decorativa que repite el contenido, y
       leída por un lector de pantalla sale duplicada y sin contexto. */
    <div className="ticker" aria-hidden="true">
      <div className="ticker__track">
        {doubled.map((item, i) => (
          <span key={i} className="ticker__item">
            {item}
            <span className="ticker__sep">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default Ticker;
