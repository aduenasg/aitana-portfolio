import { useEffect, useRef } from 'react';

/**
 * CountUp — cifra que cuenta hacia arriba al entrar en viewport.
 * Extraído de About.jsx (StatCounter) para reutilizarlo también en
 * la cabecera de Estudios: misma lógica, mismo respeto por
 * prefers-reduced-motion (salta directo al valor final).
 */
const CountUp = ({ to, suffix = '', duration = 1400, as: Tag = 'span', className }) => {
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.textContent = to + suffix;
      return;
    }

    started.current = false;
    el.textContent = '0' + suffix;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || started.current) return;
      started.current = true;
      const start = performance.now();
      const tick = (now) => {
        const t = Math.min((now - start) / duration, 1);
        const ease = 1 - Math.pow(1 - t, 3);
        el.textContent = Math.round(ease * to) + suffix;
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.5 });
    io.observe(el);
    return () => io.disconnect();
  }, [to, suffix, duration]);

  return <Tag className={className} ref={ref}>0{suffix}</Tag>;
};

export default CountUp;
