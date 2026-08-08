import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * StackCard — envuelve cada WorkCard para el efecto de "pila" al hacer scroll:
 * la tarjeta queda pegada (sticky) y se va escalando hacia abajo a medida que
 * la siguiente tarjeta la cubre, generando el efecto de tarjetas apiladas.
 *
 * i        → índice de la tarjeta (0-based)
 * total    → número total de tarjetas
 */
const StackCard = ({ i, total, children }) => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'start start'],
  });

  // Cuanto más al principio esté la tarjeta, más se encoge al final.
  const targetScale = 1 - (total - 1 - i) * 0.05;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  return (
    <div
      ref={containerRef}
      className="works__stack-item"
      style={{ top: `calc(6rem + ${i * 28}px)` }}
    >
      <motion.div className="works__stack-card" style={{ scale }}>
        {children}
      </motion.div>
    </div>
  );
};

export default StackCard;
