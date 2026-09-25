import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import COLLABORATIONS from '../data/collaborations';
import { useLang } from '../context/LangContext';
import './CollabCarousel.css';

/**
 * CollabCarousel — carrusel de "figuritas" (adaptado del spec TOONHUB
 * de figuras de personajes) aplicado a las fotos de colaboraciones:
 * imagen central grande, con la anterior/siguiente a los lados
 * desenfocadas y una "de atrás" detrás, todo con transición 650ms.
 */
const CollabCarousel = () => {
  const { t, tc } = useLang();
  const total = COLLABORATIONS.length;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isCompact, setIsCompact] = useState(false);
  const [photoBox, setPhotoBox] = useState(null);
  const lockRef = useRef(false);
  const stageRef = useRef(null);
  const centerRef = useRef(null);

  /* El bloque de texto debe quedar encajado exactamente sobre la foto
     central (mismo ancho, apoyado en su borde inferior). Como esa foto
     se dimensiona con aspect-ratio + scale() en roleStyle(), medimos su
     caja real en pantalla en vez de replicar esa aritmética en CSS. */
  const measurePhoto = () => {
    if (!stageRef.current || !centerRef.current) return;
    const stageRect = stageRef.current.getBoundingClientRect();
    const photoRect = centerRef.current.getBoundingClientRect();
    const next = {
      left: photoRect.left - stageRect.left,
      width: photoRect.width,
      bottom: stageRect.bottom - photoRect.bottom,
    };
    setPhotoBox((prev) => (
      prev && prev.left === next.left && prev.width === next.width && prev.bottom === next.bottom
        ? prev
        : next
    ));
  };

  useLayoutEffect(() => {
    measurePhoto();
  }, [isMobile, isCompact, activeIndex]);

  useEffect(() => {
    const onResize = () => {
      setIsMobile(window.innerWidth < 640);
      setIsCompact(window.innerWidth < 900);
      measurePhoto();
      setTimeout(measurePhoto, 700);
    };
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const navigate = (dir) => {
    if (lockRef.current) return;
    lockRef.current = true;
    setIsAnimating(true);
    setActiveIndex((prev) => (dir === 'next' ? (prev + 1) % total : (prev + total - 1) % total));
    setTimeout(() => { lockRef.current = false; setIsAnimating(false); measurePhoto(); }, 650);
  };

  const center = activeIndex;
  const left   = (activeIndex + total - 1) % total;
  const right  = (activeIndex + 1) % total;
  const back   = (activeIndex + total - 2) % total;

  const roleStyle = (role) => {
    switch (role) {
      case 'center':
        return {
          transform: `translateX(-50%) scale(${isMobile ? 1.15 : 1.35})`,
          filter: 'blur(0px)', opacity: 1, zIndex: 20,
          left: '50%', height: isMobile ? '60%' : '86%', bottom: isMobile ? '18%' : 0,
        };
      case 'left':
        return {
          transform: 'translateX(-50%) scale(1)',
          filter: 'blur(2px)', opacity: 0.85, zIndex: 10,
          left: isMobile ? '18%' : '28%', height: isMobile ? '16%' : '28%', bottom: isMobile ? '28%' : '10%',
        };
      case 'right':
        return {
          transform: 'translateX(-50%) scale(1)',
          filter: 'blur(2px)', opacity: 0.85, zIndex: 10,
          left: isMobile ? '82%' : '72%', height: isMobile ? '16%' : '28%', bottom: isMobile ? '28%' : '10%',
        };
      case 'back':
      default:
        return {
          transform: 'translateX(-50%) scale(1)',
          filter: 'blur(4px)', opacity: 1, zIndex: 5,
          left: '50%', height: isMobile ? '13%' : '20%', bottom: isMobile ? '28%' : '10%',
        };
    }
  };

  const current = COLLABORATIONS[center];
  const currentTr = tc(current.id);
  const displayTitle = currentTr.title || current.title;
  const displayDescription = currentTr.description || current.description;

  return (
    <div className="collab-carousel">
      <div className="collab-carousel__stage" ref={stageRef}>

        {/* Grano de textura */}
        <div className="collab-carousel__grain" aria-hidden="true" />

        {/* Texto fantasma gigante */}
        <div className="collab-carousel__ghost" aria-hidden="true">
        </div>

        {/* Figuras */}
        <div className="collab-carousel__items">
          {COLLABORATIONS.map((c, i) => {
            const role = i === center ? 'center' : i === left ? 'left' : i === right ? 'right' : i === back ? 'back' : null;
            if (!role) return null;
            return (
              <div
                key={c.id}
                className="collab-carousel__item"
                style={roleStyle(role)}
                ref={role === 'center' ? centerRef : null}
              >
                <img src={c.image} alt={c.brand} draggable="false" />
              </div>
            );
          })}
        </div>

        {/* Texto + navegación inferior izquierda */}
        <div
          className="collab-carousel__info"
          style={isCompact && photoBox ? { left: photoBox.left, width: photoBox.width, bottom: photoBox.bottom } : undefined}
        >
          {displayTitle && <p className="collab-carousel__title">{displayTitle}</p>}
          <p className="collab-carousel__desc">{displayDescription}</p>
          <div className="collab-carousel__nav">
            <button onClick={() => navigate('prev')} aria-label={t('carousel_prev_aria')} disabled={isAnimating}>
              <ArrowLeft size={22} strokeWidth={2.25} />
            </button>
            <button onClick={() => navigate('next')} aria-label={t('carousel_next_aria')} disabled={isAnimating}>
              <ArrowRight size={22} strokeWidth={2.25} />
            </button>
          </div>
        </div>

        {/* Contador inferior derecha */}
        <div className="collab-carousel__counter">
          {String(center + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </div>
      </div>
    </div>
  );
};

export default CollabCarousel;
