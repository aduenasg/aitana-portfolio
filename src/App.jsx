import { useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles/main.css';
import './styles/project.css';
import { ThemeProvider } from './context/ThemeContext';
import { LangProvider }  from './context/LangContext';

import HomePage        from './pages/HomePage';
import ProjectPage     from './pages/ProjectPage';
import ProcessPage     from './pages/ProcessPage';
import Coleccion3DPage from './pages/Coleccion3DPage';

/* ── Cursor personalizado ── */
const CustomCursor = () => {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);
  const pos     = useRef({ x: -100, y: -100 });
  const ring    = useRef({ x: -100, y: -100 });
  const raf     = useRef(null);

  useEffect(() => {
    const dot  = dotRef.current;
    const ringEl = ringRef.current;
    if (!dot || !ringEl) return;

    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    };

    const onEnter = () => document.body.classList.add('cursor--active');
    const onLeave = () => document.body.classList.remove('cursor--active');

    // Hover sobre links y botones: expande el anillo
    const onLinkEnter = () => ringEl.classList.add('cursor-ring--hover');
    const onLinkLeave = () => ringEl.classList.remove('cursor-ring--hover');

    const animate = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.12;
      ring.current.y += (pos.current.y - ring.current.y) * 0.12;
      ringEl.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px)`;
      raf.current = requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseenter', onEnter);
    document.addEventListener('mouseleave', onLeave);

    const attachHover = () => {
      document.querySelectorAll('a, button, .work-card').forEach(el => {
        el.addEventListener('mouseenter', onLinkEnter);
        el.addEventListener('mouseleave', onLinkLeave);
      });
    };
    attachHover();

    raf.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseenter', onEnter);
      document.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <>
      <div ref={dotRef}  className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
};

const App = () => (
  <LangProvider>
    <ThemeProvider>
      <BrowserRouter>
        <CustomCursor />
        <Routes>
          <Route path="/"                  element={<HomePage />} />
          <Route path="/proyecto/:id"      element={<ProjectPage />} />
          <Route path="/proceso-clo3d"     element={<ProcessPage />} />
          <Route path="/coleccion-3d"      element={<Coleccion3DPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </LangProvider>
);

export default App;
