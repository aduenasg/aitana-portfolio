import { useEffect } from 'react';

/**
 * Lightbox — visor de imágenes a pantalla completa con navegación
 * anterior/siguiente, cierre con Escape, flechas de teclado y clic
 * en el fondo para cerrar.
 *
 * images: array de URLs
 * index:  índice activo (null = cerrado)
 * onClose: () => void
 * onNavigate: (nuevoIndice) => void
 */
const Lightbox = ({ images, index, onClose, onNavigate, title }) => {
  const isOpen = index !== null && index !== undefined;

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNavigate((index + 1) % images.length);
      if (e.key === 'ArrowLeft') onNavigate((index - 1 + images.length) % images.length);
    };

    document.addEventListener('keydown', onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, index, images, onClose, onNavigate]);

  if (!isOpen) return null;

  return (
    <div className="lightbox" onClick={onClose} role="dialog" aria-modal="true">
      <button className="lightbox__close" onClick={onClose} aria-label="Cerrar">
        ✕
      </button>

      {images.length > 1 && (
        <button
          className="lightbox__nav lightbox__nav--prev"
          onClick={(e) => { e.stopPropagation(); onNavigate((index - 1 + images.length) % images.length); }}
          aria-label="Imagen anterior"
        >
          ←
        </button>
      )}

      <figure className="lightbox__figure" onClick={(e) => e.stopPropagation()}>
        <img src={images[index]} alt={`${title ? title + ' — ' : ''}${index + 1} de ${images.length}`} className="lightbox__img" />
      </figure>

      {images.length > 1 && (
        <button
          className="lightbox__nav lightbox__nav--next"
          onClick={(e) => { e.stopPropagation(); onNavigate((index + 1) % images.length); }}
          aria-label="Imagen siguiente"
        >
          →
        </button>
      )}

      {images.length > 1 && (
        <span className="lightbox__counter">
          {String(index + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
        </span>
      )}
    </div>
  );
};

export default Lightbox;
