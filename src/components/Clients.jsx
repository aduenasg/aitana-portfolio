const CLIENTS = [
  'Vogue España',
  'Elle',
  'Mango',
  'Zara',
  "Harper's Bazaar",
  'Sandro',
];

const Clients = () => (
  <section className="clients">
    <p className="clients__label">Han confiado en ella</p>
    <ul className="clients__list">
      {CLIENTS.map((name) => (
        <li key={name} className="clients__item">{name}</li>
      ))}
    </ul>
  </section>
);

export default Clients;
