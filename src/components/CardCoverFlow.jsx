import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './CardCoverFlow.css';

/**
 * CardCoverFlow — carrusel 3D tipo "cover flow". Componente controlado:
 * el índice activo y el cambio de selección los gestiona quien lo usa
 * (activeIndex + onChange), para poder sincronizarlo con otro estado
 * (p. ej. el modelo activo de la Colección 3D).
 *
 * Se selecciona pasando el ratón por encima de cada tarjeta (hover),
 * no haciendo clic — los botones ← → y los puntos siguen siendo clic.
 */
export default function CardCoverFlow({ className = '', images, activeIndex, onChange }) {
  const toPrev = (e) => {
    e.stopPropagation();
    onChange(Math.max(0, activeIndex - 1));
  };

  const toNext = (e) => {
    e.stopPropagation();
    onChange(Math.min(images.length - 1, activeIndex + 1));
  };

  const toSlide = (index) => {
    if (index !== activeIndex) onChange(index);
  };

  return (
    <div className={`coverflow ${className}`}>
      <div className="coverflow__track">
        {images.map((item, i) => {
          const isActive = activeIndex === i;
          const offset = i - activeIndex;
          const absOffset = Math.abs(offset);
          const isPast = i < activeIndex;

          return (
            <motion.div
              key={i}
              className="coverflow__card"
              initial={false}
              animate={{
                x: offset * 76,
                rotateY: isActive ? 0 : (isPast ? 38 : -38),
                z: isActive ? 50 : -absOffset * 50,
                scale: isActive ? 1.1 : 1 - (absOffset * 0.08),
                opacity: absOffset > 2 ? 0 : 1 - (absOffset * 0.25)
              }}
              transition={{ type: 'spring', stiffness: 200, damping: 25 }}
              style={{ zIndex: 100 - absOffset }}
              onMouseEnter={() => toSlide(i)}
              onFocus={() => toSlide(i)}
              tabIndex={0}
            >
              <img
                src={item.src}
                alt={item.title}
                referrerPolicy="no-referrer"
                className="coverflow__img"
              />
              <motion.div
                className="coverflow__caption"
                animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : -5 }}
              >
                {item.title}
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      <div className="coverflow__controls">
        <button onClick={toPrev} className="coverflow__arrow" aria-label="Anterior">
          <ChevronLeft size={22} />
        </button>
        <div className="coverflow__dots">
          {images.map((_, i) => (
            <div
              key={i}
              onMouseEnter={() => toSlide(i)}
              onClick={() => toSlide(i)}
              className={`coverflow__dot${activeIndex === i ? ' coverflow__dot--on' : ''}`}
            />
          ))}
        </div>
        <button onClick={toNext} className="coverflow__arrow" aria-label="Siguiente">
          <ChevronRight size={22} />
        </button>
      </div>
    </div>
  );
}
