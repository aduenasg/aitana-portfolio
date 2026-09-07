import { useEffect, useRef } from 'react';
import { useLang } from '../context/LangContext';
import Reveal from './Reveal';
import { LaurelIcon } from './StudyChapters';

/* Los mismos dos honores de StudyChapters, pero aquí son el titular
   en lugar de la nota al margen: el usuario pidió que los premios
   fueran lo que más destaque de la página. */
const HONORS = [
  { periodKey: 'timeline_item1_period', degreeKey: 'timeline_item1_degree', honorKey: 'timeline_item1_honor' },
  { periodKey: 'timeline_item2_period', degreeKey: 'timeline_item2_degree', honorKey: 'timeline_item2_honor' },
];

/* Hilo del scroll: mueve las tarjetas a distinta velocidad mientras
   se cruza la sección, en lugar de dejarlas quietas tras la entrada
   (que ya resuelve <Reveal>). Escribe un único --scroll-parallax en
   la rejilla; cada tarjeta lo lee con su propio signo/profundidad,
   así que suben y bajan en sentido contrario, como una tijera.
   Un listener de scroll con throttle a un frame, no un IntersectionObserver:
   aquí hace falta un valor continuo, no un booleano de "visible". */
const useScrollParallax = () => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let raf = 0;
    const clamp = (v, min, max) => Math.min(max, Math.max(min, v));

    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const progress = (rect.top + rect.height / 2 - vh / 2) / vh;
      el.style.setProperty('--scroll-parallax', clamp(progress, -1.4, 1.4).toFixed(4));
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return ref;
};

/* StudyHonors — sello de reconocimiento, no una tarjeta más: el
   círculo dorado con anillo discontinuo remite al timbre en seco de
   un diploma; gira despacio una vez estampado. */
const StudyHonors = () => {
  const { t } = useLang();
  const gridRef = useScrollParallax();

  return (
    <section className="study-honors">
      <div className="study-honors__head">
        <p className="study-honors__label animate-on-scroll reveal-up reveal-near reveal-fast">
          {t('studies_honors_label')}
        </p>
      </div>

      <div className="study-honors__grid" ref={gridRef}>
        {HONORS.map((h, i) => (
          <Reveal
            key={h.honorKey}
            as="article"
            className="study-honors__card"
            delay={0.12 + i * 0.12}
            y={30}
          >
            <div className="study-honors__card-inner" style={{ '--parallax-dir': i % 2 === 0 ? -1 : 1 }}>
              <span className="study-honors__seal" aria-hidden="true">
                <span className="study-honors__ribbon" />
                <LaurelIcon />
              </span>
              <p className="study-honors__text">{t(h.honorKey)}</p>
              <div>
                <p className="study-honors__meta">{t(h.degreeKey)}</p>
                <span className="study-honors__period">{t(h.periodKey)}</span>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

export default StudyHonors;
