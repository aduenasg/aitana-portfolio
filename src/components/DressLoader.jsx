import { useEffect } from 'react';
import { useLang } from '../context/LangContext';
import './DressLoader.css';

/* DressLoader — pantalla de carga minimalista: la silueta de un vestido
   se dibuja con un trazo dorado, se cose una costura de cintura y el
   nombre aparece con un desvanecimiento elegante. Toda la animación es
   CSS puro (@keyframes); el único JS es el aviso a PageLoaderOverlay
   de cuándo retirarse. */
const DressLoader = ({ onDone }) => {
  const { t } = useLang();
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const t = setTimeout(() => onDone?.(), reduceMotion ? 700 : 2600);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div className="dress-loader" role="status" aria-label={t('loading_label')}>
      <svg className="dress-loader__svg" viewBox="0 0 160 260" width="160" height="260" fill="none" aria-hidden="true">
        <path
          className="dress-loader__silhouette"
          pathLength="1"
          d="M60,18 Q80,8 100,18 L122,26 C130,55 128,85 114,112 L46,112 C32,85 30,55 38,26 Z"
        />
        <path
          className="dress-loader__silhouette dress-loader__silhouette--skirt"
          pathLength="1"
          d="M46,112 L114,112 L150,250 Q80,262 10,250 Z"
        />
        <path className="dress-loader__seam" pathLength="1" d="M46,112 Q80,120 114,112" />
      </svg>
      <p className="dress-loader__brand">Aitana Núñez</p>
      <span className="dress-loader__rule" aria-hidden="true" />
    </div>
  );
};

export default DressLoader;
