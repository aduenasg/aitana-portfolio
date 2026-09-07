import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import PROJECTS from '../data/projects';
import { useLang } from '../context/LangContext';
import './RouteTransition.css';

/* Duración del barrido de subida del telón. El intercambio de ruta
   ocurre justo cuando la pantalla está totalmente cubierta. */
const COVER_MS = 560;

/* Rótulo que se muestra sobre el telón según la ruta de destino. */
const labelFor = (pathname, t, tp) => {
  if (pathname === '/')               return 'Aitana Núñez';
  if (pathname === '/coleccion-3d')   return tp('__coleccion3d__').title || 'Colección 3D';
  if (pathname === '/proceso-clo3d')  return t('route_transition_process');
  if (pathname === '/mis-estudios')   return t('route_transition_studies');

  const match = pathname.match(/^\/proyecto\/(.+)$/);
  if (match) {
    const project = PROJECTS.find(p => p.id === match[1]);
    if (project) return tp(project.id).title || project.title;
  }
  return 'Aitana Núñez';
};

/**
 * RouteTransition — «el telón del atelier».
 *
 * Al navegar entre páginas, un panel sube desde abajo encabezado por una
 * costura dorada de 1px, cubre la pantalla, y se lleva la página anterior
 * consigo al salir por arriba. El cambio de ruta sucede oculto tras el
 * telón, de modo que nunca se ve el salto ni el scroll reposicionándose.
 *
 * Se usa como render prop porque necesita retrasar la ubicación que
 * renderiza <Routes>:
 *
 *   <RouteTransition>{loc => <Routes location={loc}>…</Routes>}</RouteTransition>
 */
const RouteTransition = ({ children }) => {
  const location = useLocation();
  const reduceMotion = useReducedMotion();
  const { t, tp } = useLang();

  // Ubicación realmente pintada: va por detrás de `location` mientras cubre.
  const [shown, setShown]       = useState(location);
  const [covering, setCovering] = useState(false);
  const isFirstRender           = useRef(true);

  // Si el destino lleva ancla (#about, #timeline…), hay que ir a esa
  // sección en vez de al principio: antes esto se ignoraba y cualquier
  // enlace a una sección con cambio de ruta te dejaba en la cabecera.
  const scrollToTarget = (smooth) => {
    if (location.hash) {
      const el = document.getElementById(location.hash.slice(1));
      if (el) {
        el.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto' });
        return;
      }
    }
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    // La carga inicial ya la cubre PageLoaderOverlay: no duplicamos telón.
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    // Misma página, sólo cambia el ancla: sin telón, scroll suave.
    if (location.pathname === shown.pathname) {
      setShown(location);
      scrollToTarget(true);
      return;
    }

    // Sin movimiento: cambio inmediato, sin telón.
    if (reduceMotion) {
      setShown(location);
      scrollToTarget(false);
      return;
    }

    setCovering(true);
    const timer = setTimeout(() => {
      setShown(location);
      scrollToTarget(false);
      setCovering(false);
    }, COVER_MS);
    return () => clearTimeout(timer);
  }, [location, shown.pathname, reduceMotion]);

  // Mientras el telón cubre, bloquea el scroll para que el barrido sea limpio.
  useEffect(() => {
    if (!covering) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previous; };
  }, [covering]);

  return (
    <>
      {children(shown)}

      <AnimatePresence>
        {covering && (
          <motion.div
            className="route-curtain"
            aria-hidden="true"
            initial={{ y: '100%' }}
            animate={{ y: '0%' }}
            exit={{ y: '-100%' }}
            transition={{
              duration: COVER_MS / 1000,
              ease: [0.76, 0, 0.24, 1],
            }}
          >
            {/* La costura: el borde de ataque del telón */}
            <span className="route-curtain__seam" />
            <motion.span
              className="route-curtain__label"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.22, duration: 0.28 } }}
              exit={{ opacity: 0, transition: { duration: 0.16 } }}
            >
              {labelFor(location.pathname, t, tp)}
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default RouteTransition;
