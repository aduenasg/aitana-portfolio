import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DressLoader from './DressLoader';

/**
 * PageLoaderOverlay — pantalla de carga a pantalla completa que se
 * muestra brevemente al entrar en la web y se desvanece revelando el
 * contenido. La silueta del vestido se dibuja con un trazo dorado y el
 * nombre se posa; el propio loader avisa (onDone) cuando termina, en
 * vez de un temporizador fijo — así nunca corta la secuencia a mitad.
 */
const PageLoaderOverlay = ({ maxDuration = 5000 }) => {
  const [loading, setLoading] = useState(true);

  // Red de seguridad: si algo impide que DressLoader llame a onDone,
  // esto garantiza que la web se revele igualmente.
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), maxDuration);
    return () => clearTimeout(timer);
  }, [maxDuration]);

  // Marca el <body> cuando el telón de carga se retira. El hero espera a
  // esta clase para ensamblarse: si arrancase al cargar la página, su
  // secuencia terminaría oculta detrás del loader y no se vería nunca.
  useEffect(() => {
    if (loading) return;
    document.body.classList.add('site-loaded');

    // Si se entra directamente en una URL con ancla (p. ej. /#timeline),
    // el bloqueo de scroll de este loader se come el salto nativo del
    // navegador: hay que repetirlo a mano una vez se libera el scroll.
    if (window.location.hash) {
      const el = document.getElementById(window.location.hash.slice(1));
      if (el) el.scrollIntoView({ behavior: 'auto' });
    }
  }, [loading]);

  // Mientras el loader está visible, bloquea el scroll de fondo
  useEffect(() => {
    if (loading) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = prevOverflow; };
    }
  }, [loading]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="page-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <DressLoader onDone={() => setLoading(false)} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PageLoaderOverlay;
