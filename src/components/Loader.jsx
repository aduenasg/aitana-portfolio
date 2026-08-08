import { motion } from 'framer-motion';
import { useMemo } from 'react';
import './Loader.css';

/**
 * Loader — animación de "pelota rebotando sobre barras" que se muestra
 * a pantalla completa mientras carga la web. Adaptado de WavePhysicsLoader
 * (React Bits / comunidad), sin TypeScript ni Tailwind, usando los
 * colores del tema actual (claro/oscuro) del portfolio.
 */
export function WaveLoader({ theme = 'dark' }) {
  const numBars = 15;
  const barWidth = 12;
  const barGap = 8;
  const barTotalWidth = barWidth + barGap;

  const numFrames = 201;
  const B = 4;
  const maxBounce = 60;
  const baseBarH = 16;
  const wavePeakH = 48;

  const { bars, ballX, ballY, ballScaleX, ballScaleY, times } = useMemo(() => {
    const barsData = Array.from({ length: numBars }).map(() => ({
      heights: [],
      colors: [],
    }));
    const bX = [];
    const bY = [];
    const bScaleX = [];
    const bScaleY = [];
    const tArr = [];

    for (let k = 0; k < numFrames; k++) {
      const t = k / (numFrames - 1);
      tArr.push(t);

      const x_frac = t < 0.5 ? t / 0.5 : (1 - t) / 0.5;
      const ball_idx = x_frac * (numBars - 1);

      bX.push(`${ball_idx * barTotalWidth}px`);

      let bounce_f = (x_frac * B) % 1.0;
      if (x_frac === 1 || x_frac === 0) bounce_f = 0;

      const bounce_h = 4 * bounce_f * (1 - bounce_f);
      const height_factor = Math.max(0, 1 - bounce_h * 2);

      const ball_indent = height_factor * 20;
      const ball_y = (baseBarH + wavePeakH - ball_indent) + bounce_h * maxBounce;
      bY.push(`-${ball_y}px`);

      const squish = height_factor;
      bScaleY.push(1 - squish * 0.3);
      bScaleX.push(1 + squish * 0.25);

      for (let i = 0; i < numBars; i++) {
        const dist = Math.abs(i - ball_idx);

        let wave_val = 0;
        if (dist < 3) {
          wave_val = Math.cos((dist / 3) * (Math.PI / 2));
        }

        let indent = 0;
        if (dist < 1.5) {
          const indent_dist = Math.cos((dist / 1.5) * (Math.PI / 2));
          indent = indent_dist * height_factor * 20;
        }

        const bar_h = baseBarH + wave_val * wavePeakH - indent;
        barsData[i].heights.push(`${Math.max(4, bar_h)}px`);

        // Colores: barras apagadas en reposo, se iluminan con el dorado
        // del sitio a medida que la ola pasa por ellas.
        const isDark = theme === 'dark';
        let r, g, b;
        if (isDark) {
          // De gris oscuro (apagado, se funde con el fondo) a crema claro (pico)
          r = Math.round(45 + wave_val * (240 - 45));
          g = Math.round(45 + wave_val * (236 - 45));
          b = Math.round(48 + wave_val * (228 - 48));
        } else {
          // De crema claro (se funde con el fondo) a marrón oscuro (pico)
          r = Math.round(226 - wave_val * (226 - 97));
          g = Math.round(222 - wave_val * (222 - 58));
          b = Math.round(213 - wave_val * (213 - 26));
        }
        barsData[i].colors.push(`rgb(${r}, ${g}, ${b})`);
      }
    }

    return { bars: barsData, ballX: bX, ballY: bY, ballScaleX: bScaleX, ballScaleY: bScaleY, times: tArr };
  }, [theme]);

  return (
    <div className="wave-loader">
      <div className="wave-loader__track">
        {bars.map((bar, i) => (
          <motion.div
            key={i}
            className="wave-loader__bar"
            style={{
              height: '16px',
              backgroundColor: theme === 'dark' ? 'rgb(45, 45, 48)' : 'rgb(226, 222, 213)',
            }}
            animate={{
              height: bar.heights,
              backgroundColor: bar.colors,
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              times,
              ease: 'linear',
            }}
          />
        ))}

        <motion.div
          className="wave-loader__ball"
          style={{ bottom: 0, left: 0, transformOrigin: 'bottom center' }}
          animate={{
            x: ballX,
            y: ballY,
            scaleX: ballScaleX,
            scaleY: ballScaleY,
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            times,
            ease: 'linear',
          }}
        />
      </div>
    </div>
  );
}

export default WaveLoader;
