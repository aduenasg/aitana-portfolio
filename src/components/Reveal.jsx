import './Reveal.css';

/**
 * Reveal — la pieza de patrón que encaja en su sitio.
 *
 * Es el envoltorio cómodo del sistema de entrada: emite un elemento
 * plano con `.animate-on-scroll` y las custom properties del sistema.
 * Quien lo mueve es el motor único, ScrollReveal.jsx, con su
 * IntersectionObserver — aquí no hay ni observador ni framer-motion.
 *
 * Mantiene la API anterior (as / delay / x / y / duration / cut / seam /
 * className) para que las llamadas existentes sigan funcionando igual.
 *
 * Props:
 *  as        — elemento a renderizar (por defecto 'div')
 *  delay     — retraso en segundos
 *  y / x     — desplazamiento inicial en px (por defecto y=34)
 *  duration  — duración en segundos (por defecto 0.72)
 *  cut       — recorta la pieza mientras entra, como si se completara
 *              su contorno. Desactivado por defecto porque recorta
 *              cualquier decoración que sobresalga del contenedor.
 *  seam      — dibuja la costura dorada al terminar de encajar
 *  className — clases a aplicar al contenedor
 *
 * Para casos sueltos no hace falta este componente: basta con poner
 * `animate-on-scroll` (y su variante) directamente en el JSX.
 */

/* El recorte se cierra por el borde de arrastre, o sea el opuesto a
   la dirección en la que viaja la pieza. */
const cutFrom = (x, y) => {
  if (x < 0) return 'inset(0 0 0 14%)';
  if (x > 0) return 'inset(0 14% 0 0)';
  if (y < 0) return 'inset(14% 0 0 0)';
  return 'inset(0 0 14% 0)';
};

const ms = (seconds) => `${Math.round(seconds * 1000)}ms`;

const Reveal = ({
  children,
  as: Tag = 'div',
  delay = 0,
  y = 34,
  x = 0,
  duration = 0.72,
  cut = false,
  seam = false,
  className,
  style,
  ...rest
}) => {
  const classes = [
    'animate-on-scroll',
    'piece',
    cut && 'piece--cut',
    seam && 'piece--seam',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const vars = {
    '--reveal-x': `${x}px`,
    '--reveal-y': `${y}px`,
    '--reveal-duration': ms(duration),
    '--reveal-delay': ms(delay),
    ...(cut && { '--reveal-clip': cutFrom(x, y) }),
    ...style,
  };

  return (
    <Tag className={classes} style={vars} {...rest}>
      {children}
      {seam && <span className="piece__seam" aria-hidden="true" />}
    </Tag>
  );
};

export default Reveal;
