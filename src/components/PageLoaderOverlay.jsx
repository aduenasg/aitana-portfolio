import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import WaveLoader from './Loader';

/**
 * PageLoaderOverlay — pantalla de carga a pantalla completa que se
 * muestra brevemente al entrar en la web y se desvanece revelando
 * el contenido. Usa el WaveLoader y el tema actual (claro/oscuro).
 */
const PageLoaderOverlay = ({ minDuration = 1600 }) => {
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme() ?? { theme: 'dark' };

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), minDuration);
    return () => clearTimeout(timer);
  }, [minDuration]);

  // Marca el <body> cuando el telón de carga se retira. El hero espera a
  // esta clase para ensamblarse: si arrancase al cargar la página, su
  // secuencia terminaría oculta detrás del loader y no se vería nunca.
  useEffect(() => {
    if (loading) return;
    document.body.classList.add('site-loaded');
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
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          <WaveLoader theme={theme} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PageLoaderOverlay;
