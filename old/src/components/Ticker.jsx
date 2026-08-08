const ITEMS = [
  'Styling',
  'Creative Direction',
  'Editorial Fashion',
  'Lookbook',
  'Art Direction',
  'Campaign',
];

const Ticker = () => {
  // Duplicate items so the animation loops seamlessly
  const doubled = [...ITEMS, ...ITEMS];

  return (
    <div className="ticker">
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
