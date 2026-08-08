import { motion, useScroll, useSpring, useReducedMotion } from 'framer-motion';
import './ScrollProgress.css';

/**
 * ScrollProgress — la costura que se va cosiendo conforme bajas.
 *
 * Hilo dorado de 1px fijado al borde superior del viewport que crece de
 * izquierda a derecha con el avance del scroll. Mismo motivo que el borde
 * del telón de RouteTransition y el subrayado del navbar.
 */
const ScrollProgress = () => {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  // Muelle suave para que el hilo no vaya pegado al pixel del scroll.
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  if (reduceMotion) return null;

  return (
    <motion.div
      className="scroll-progress"
      style={{ scaleX }}
      aria-hidden="true"
    />
  );
};

export default ScrollProgress;
