import { useState } from 'react';
import { useLang } from '../context/LangContext';
import Reveal from './Reveal';

/* Formación de más reciente a más antigua. `schoolKey`/`honorKey` a null
   cuando el dato no existe, para no inventar contenido que no nos han dado.
   `bg` — un tono por etapa, de la misma familia que las portadas de
   proyecto (tinta cálida casi negra, con identidad de color propia):
   la tarjeta pasa de superficie neutra a muestrario de tela. */
const ITEMS = [
  { periodKey: 'timeline_item1_period', degreeKey: 'timeline_item1_degree', schoolKey: 'timeline_item1_school', honorKey: 'timeline_item1_honor', descKey: 'timeline_item1_desc', bg: '#241506' },
  { periodKey: 'timeline_item2_period', degreeKey: 'timeline_item2_degree', schoolKey: null, honorKey: 'timeline_item2_honor', descKey: 'timeline_item2_desc', bg: '#210810' },
  { periodKey: 'timeline_item3_period', degreeKey: 'timeline_item3_degree', schoolKey: 'timeline_item3_school', honorKey: null, descKey: 'timeline_item3_desc', bg: '#0f150b' },
];

/* Laurel de línea fina, a juego con el trazo minimalista del resto del
   sitio: no es un trofeo, es una marca de distinción discreta. */
export const LaurelIcon = () => (
  <svg className="study-chapter__honor-icon" viewBox="0 0 28 22" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
    <path d="M14,20 Q6,17 4,7" strokeLinecap="round" />
    <path d="M8,16.5 L4.5,15" strokeLinecap="round" />
    <path d="M6.3,12.5 L2.5,11.5" strokeLinecap="round" />
    <path d="M5,8.5 L1,8" strokeLinecap="round" />
    <path d="M14,20 Q22,17 24,7" strokeLinecap="round" />
    <path d="M20,16.5 L23.5,15" strokeLinecap="round" />
    <path d="M21.7,12.5 L25.5,11.5" strokeLinecap="round" />
    <path d="M23,8.5 L27,8" strokeLinecap="round" />
  </svg>
);

/* Birrete de línea fina, mismo grosor de trazo que el laurel: empareja
   icono + texto en el centro de la ficha, igual que ya hace el honor,
   para que las dos filas de detalle se lean del mismo modo de un
   vistazo. */
const SchoolIcon = () => (
  <svg className="study-chapter__school-icon" viewBox="0 0 24 18" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
    <path d="M12,3 L22,8 L12,13 L2,8 Z" strokeLinejoin="round" />
    <path d="M6,10.2 V14.5 Q6,17 12,17 Q18,17 18,14.5 V10.2" strokeLinecap="round" />
    <path d="M22,8 V13" strokeLinecap="round" />
  </svg>
);

/* Doble flecha en círculo: la pista de que la tarjeta se puede
   voltear, ahora también en icono y no sólo en texto — se lee de un
   vistazo aunque no se llegue a leer el rótulo. */
const FlipIcon = () => (
  <svg className="study-chapter__flip-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
    <path d="M2.5,8 A5.5,5.5 0 0 1 12.1,4.4 M13.5,2 V5 H10.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M13.5,8 A5.5,5.5 0 0 1 3.9,11.6 M2.5,14 V11 H5.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* Una titulación, una tarjeta que se voltea: delante lo esencial
   (curso y titulación, con el número de etapa a sangre); detrás, el
   resto de la ficha (centro y distinción, cuando los hay). Estado de
   giro propio de cada tarjeta — no tiene por qué coincidir con el de
   las demás. */
const StudyChapter = ({ item, index, t }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <Reveal
      as="article"
      className={`study-chapter${index % 2 === 1 ? ' study-chapter--alt' : ''}`}
      y={40}
      delay={index * 0.08}
    >
      <button
        type="button"
        className="study-chapter__flip"
        onClick={() => setFlipped((f) => !f)}
        aria-pressed={flipped}
        aria-label={t(flipped ? 'studies_chapter_flip_back' : 'studies_chapter_flip_hint')}
      >
        <div className={`study-chapter__flip-inner${flipped ? ' is-flipped' : ''}`} style={{ '--chapter-bg': item.bg }}>
          <div className="study-chapter__face study-chapter__face--front">
            <span className="study-chapter__ghost" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
            <p className="study-chapter__period">{t(item.periodKey)}</p>
            <h2 className="study-chapter__degree">{t(item.degreeKey)}</h2>
            <span className="study-chapter__flip-cue" aria-hidden="true">
              <FlipIcon />
              {t('studies_chapter_flip_hint')}
            </span>
          </div>
          <div className="study-chapter__face study-chapter__face--back">
            <p className="study-chapter__back-label">{t('studies_chapter_back_label')}</p>
            {item.descKey && <p className="study-chapter__desc">{t(item.descKey)}</p>}
            {item.schoolKey && (
              <div className="study-chapter__school-row">
                <SchoolIcon />
                <span className="study-chapter__school">{t(item.schoolKey)}</span>
              </div>
            )}
            {item.honorKey && (
              <div className="study-chapter__honor">
                <LaurelIcon />
                <span className="study-chapter__honor-text">{t(item.honorKey)}</span>
              </div>
            )}
            <span className="study-chapter__flip-cue" aria-hidden="true">
              <FlipIcon />
              {t('studies_chapter_flip_back')}
            </span>
          </div>
        </div>
      </button>
    </Reveal>
  );
};

/* StudyChapters — cada titulación es su propia tarjeta volteable, no
   una fila en una línea de tiempo. Vive en su propia página
   (StudiesPage), que le pone la cabecera. */
const StudyChapters = () => {
  const { t } = useLang();

  return (
    <div className="study-chapters">
      <div className="study-chapters__head">
        <p className="study-chapters__label animate-on-scroll reveal-up reveal-near reveal-fast">
          {t('studies_chapters_label')}
        </p>
      </div>

      <div className="study-chapters__grid">
        {ITEMS.map((item, i) => (
          <StudyChapter key={item.degreeKey} item={item} index={i} t={t} />
        ))}
      </div>
    </div>
  );
};

export default StudyChapters;
