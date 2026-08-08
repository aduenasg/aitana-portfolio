import { useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MotionConfig, useReducedMotion } from 'framer-motion';
import './styles/main.css';
import './styles/project.css';
/* Después de main/project a propósito: el sistema de entrada sólo
   toca opacity y transform, y así gana a cualquier regla previa. */
import './styles/reveal.css';
import { ThemeProvider } from './context/ThemeContext';
import { LangProvider }  from './context/LangContext';
import SplashCursor from './components/SplashCursor';
import PageLoaderOverlay from './components/PageLoaderOverlay';
import RouteTransition from './components/RouteTransition';
import ScrollProgress from './components/ScrollProgress';
import ScrollReveal from './components/ScrollReveal';

import HomePage        from './pages/HomePage';
import ProjectPage     from './pages/ProjectPage';
import ProcessPage     from './pages/ProcessPage';
import Coleccion3DPage from './pages/Coleccion3DPage';

/* Todo lo que se puede pulsar y por tanto cierra el hilván del cursor */
const CURSOR_INTERACTIVE =
  'a, button, summary, input, textarea, select, [role="button"], .work-card';

/* ── Cursor personalizado ──
   Instrumental de patronaje: una cruz de marcado —la marca de registro
   que se traza sobre el patrón— y, siguiéndola con retardo, un aro de
   hilván (puntada discontinua) que gira muy despacio. Sobre lo pulsable
   el hilván se cierra en lugar de abrirse y la cruz gira a aspa: pasa de
   marcar a cortar. */
const CustomCursor = () => {
  const markRef = useRef(null);
  const ringRef = useRef(null);
  const pos     = useRef({ x: -100, y: -100 });
  const ring    = useRef({ x: -100, y: -100 });
  const raf     = useRef(null);

  useEffect(() => {
    const mark   = markRef.current;
    const ringEl = ringRef.current;
    if (!mark || !ringEl) return;

    const body = document.body;

    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      mark.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      // Con solo mouseenter no siempre se activa (si el ratón ya
      // está sobre la ventana al cargar, ese evento no llega a disparar).
      // Activarlo también aquí garantiza que el cursor sea visible.
      body.classList.add('cursor--active');
    };

    const onEnter = () => body.classList.add('cursor--active');
    const onLeave = () => body.classList.remove('cursor--active');

    // Delegación en lugar de enganchar cada enlace: así también entran
    // los que aparecen al cambiar de ruta o al abrir el lightbox.
    // `mouseover` salta en cada elemento al que se entra, de modo que el
    // propio toggle sirve tanto para activar como para desactivar.
    const onOver = (e) => {
      const target = e.target;
      const hit = target instanceof Element && target.closest(CURSOR_INTERACTIVE);
      body.classList.toggle('cursor--hover', !!hit);
    };

    const onDown = () => body.classList.add('cursor--press');
    const onUp   = () => body.classList.remove('cursor--press');

    const animate = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.13;
      ring.current.y += (pos.current.y - ring.current.y) * 0.13;
      ringEl.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px)`;
      raf.current = requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseenter', onEnter);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('mouseup', onUp);

    raf.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseenter', onEnter);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('mouseup', onUp);
      cancelAnimationFrame(raf.current);
      body.classList.remove('cursor--hover', 'cursor--press');
    };
  }, []);

  return (
    <>
      <svg ref={ringRef} className="cursor-ring" viewBox="0 0 44 44" aria-hidden="true">
        <g className="cursor-ring__scale">
          <circle className="cursor-ring__baste" cx="22" cy="22" r="21" />
        </g>
      </svg>
      <div ref={markRef} className="cursor-mark" aria-hidden="true" />
    </>
  );
};

/* Envuelve lo que depende de la preferencia de movimiento del sistema.
   MotionConfig con reducedMotion="user" hace que TODOS los componentes de
   framer-motion del sitio (Reveal, StackCard, GradientText, Stack,
   CardCoverFlow, Loader…) respeten prefers-reduced-motion sin tocarlos
   uno a uno. */
const AppShell = () => {
  const reduceMotion = useReducedMotion();

  return (
    <BrowserRouter>
      <PageLoaderOverlay />
      <ScrollProgress />
      {/* Motor único de las animaciones de entrada. No pinta nada:
          observa el DOM y va marcando las piezas con `.is-visible`. */}
      <ScrollReveal />
      <CustomCursor />
      {/* La simulación de fluidos WebGL no se monta si el usuario ha
          pedido menos movimiento: es la animación más intensa del sitio. */}
      {!reduceMotion && <SplashCursor />}
      <RouteTransition>
        {(location) => (
          <Routes location={location}>
            <Route path="/"                  element={<HomePage />} />
            <Route path="/proyecto/:id"      element={<ProjectPage />} />
            <Route path="/proceso-clo3d"     element={<ProcessPage />} />
            <Route path="/coleccion-3d"      element={<Coleccion3DPage />} />
          </Routes>
        )}
      </RouteTransition>
    </BrowserRouter>
  );
};

const App = () => {
  return (
    <LangProvider>
      <ThemeProvider>
        <MotionConfig reducedMotion="user">
          <AppShell />
        </MotionConfig>
      </ThemeProvider>
    </LangProvider>
  );
};

export default App;
