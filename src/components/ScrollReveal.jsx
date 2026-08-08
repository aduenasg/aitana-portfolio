import { useLayoutEffect } from 'react';

/**
 * ScrollReveal — el motor de las animaciones de entrada.
 *
 * No pinta nada. Se monta una sola vez en <App> y se encarga de todo el
 * sitio con **un único** IntersectionObserver (nada de escuchar `scroll`).
 *
 * Cómo funciona:
 *
 *  1. Pone `reveal-ready` en <html> antes del primer pintado. El estado
 *     oculto de src/styles/reveal.css cuelga de esa clase, así que si el
 *     JS no llega a ejecutarse el contenido se ve igual, sin animación.
 *
 *  2. Espera a `body.site-loaded` (la pone PageLoaderOverlay al retirarse
 *     el telón de carga). Sin esta espera, lo visible de entrada se
 *     animaría escondido detrás del loader y no se vería nunca.
 *
 *  3. Escanea `.animate-on-scroll` y `.reveal-stagger` y los observa.
 *     Al entrar en pantalla añade `.is-visible` y deja de observarlos:
 *     cada pieza se anima una única vez.
 *
 *  4. Un MutationObserver sobre `childList` vuelve a escanear cuando
 *     React monta nodos nuevos. Eso cubre los cambios de ruta y los
 *     bloques condicionales sin tener que avisar desde cada página.
 *
 * Con `prefers-reduced-motion: reduce` no pone `reveal-ready` ni observa
 * nada: el sitio se pinta quieto. Si la preferencia cambia a mitad de
 * sesión, el motor se reinicia solo.
 */

/* El disparo ocurre cuando la pieza cruza el 8% inferior del viewport.
   Margen y no `threshold`: así funciona igual con piezas diminutas y
   con secciones más altas que la propia pantalla. */
const ROOT_MARGIN = '0px 0px -8% 0px';

/* Tope del escalonado. Sin él, un grupo largo dejaría a las últimas
   piezas esperando más de un segundo — lento y no elegante. */
const MAX_STEPS = 10;

/* Salvavidas por si algún día desaparece PageLoaderOverlay: pasado este
   tiempo el motor arranca aunque nunca llegue `site-loaded`. */
const LOADER_TIMEOUT = 3200;

const REDUCED_MOTION = '(prefers-reduced-motion: reduce)';

/* Las piezas de un grupo las controla su contenedor, no un observador
   propio. Se filtran por `closest` para que los grupos anidados no se
   pisen entre sí. */
const groupItems = (container) =>
  Array.from(container.querySelectorAll('.animate-on-scroll')).filter(
    (el) => el.parentElement?.closest('.reveal-stagger') === container
  );

const ScrollReveal = () => {
  useLayoutEffect(() => {
    const media = window.matchMedia(REDUCED_MOTION);

    // Todo lo que haya que deshacer al desmontar o al reiniciar.
    let teardown = [];

    const start = () => {
      const root = document.documentElement;
      root.classList.add('reveal-ready');
      teardown.push(() => root.classList.remove('reveal-ready'));

      const io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            const el = entry.target;
            io.unobserve(el);

            if (el.classList.contains('reveal-stagger')) {
              groupItems(el).forEach((item, i) => {
                item.style.setProperty(
                  '--reveal-index',
                  String(Math.min(i, MAX_STEPS))
                );
                item.classList.add('is-visible');
              });
            }
            // Un contenedor puede además ser pieza: se anima también.
            el.classList.add('is-visible');
          }
        },
        { rootMargin: ROOT_MARGIN, threshold: 0 }
      );
      teardown.push(() => io.disconnect());

      const scan = () => {
        const nodes = document.querySelectorAll(
          '.animate-on-scroll, .reveal-stagger'
        );
        for (const el of nodes) {
          if (el.dataset.revealBound) continue;

          // Pieza suelta dentro de un grupo: la revela el contenedor.
          const inGroup =
            !el.classList.contains('reveal-stagger') &&
            el.parentElement?.closest('.reveal-stagger');

          el.dataset.revealBound = inGroup ? 'group' : 'self';
          if (!inGroup) io.observe(el);
        }
      };

      scan();

      // React monta y desmonta subárboles enteros (cambio de ruta,
      // AnimatePresence, bloques condicionales). Se reescanea agrupando
      // por frame para no repetir trabajo en la misma tanda de cambios.
      let pending = 0;
      const mo = new MutationObserver(() => {
        if (pending) return;
        pending = requestAnimationFrame(() => {
          pending = 0;
          scan();
        });
      });
      mo.observe(document.body, { childList: true, subtree: true });
      teardown.push(() => {
        mo.disconnect();
        if (pending) cancelAnimationFrame(pending);
      });
    };

    const enable = () => {
      // El telón de carga aún cubre: esperar a que se retire.
      if (document.body.classList.contains('site-loaded')) {
        start();
        return;
      }

      let started = false;
      const go = () => {
        if (started) return;
        started = true;
        bodyObserver.disconnect();
        clearTimeout(timer);
        start();
      };

      const bodyObserver = new MutationObserver(() => {
        if (document.body.classList.contains('site-loaded')) go();
      });
      bodyObserver.observe(document.body, {
        attributes: true,
        attributeFilter: ['class'],
      });

      const timer = setTimeout(go, LOADER_TIMEOUT);

      teardown.push(() => {
        bodyObserver.disconnect();
        clearTimeout(timer);
      });
    };

    const cleanup = () => {
      teardown.forEach((fn) => fn());
      teardown = [];
    };

    // Sin movimiento: no se pone `reveal-ready`, así que nada se oculta.
    if (!media.matches) enable();

    const onPreferenceChange = () => {
      cleanup();
      // Las marcas quedarían obsoletas tras reiniciar el motor.
      document
        .querySelectorAll('[data-reveal-bound]')
        .forEach((el) => delete el.dataset.revealBound);
      if (!media.matches) enable();
    };
    media.addEventListener('change', onPreferenceChange);

    return () => {
      media.removeEventListener('change', onPreferenceChange);
      cleanup();
    };
  }, []);

  return null;
};

export default ScrollReveal;
