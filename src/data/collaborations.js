/**
 * collaborations.js — fuente de verdad de la sección/página de Colaboraciones.
 *
 * ⚠️ CONTENIDO DE EJEMPLO: reutiliza fotos ya existentes del portfolio como
 * placeholder. Sustituye "image" por las fotos reales de cada colaboración
 * y ajusta brand/title/year/description a tu gusto.
 */

import ColGranate from '../img/col-granate-foto1.png';
import ColBlanco  from '../img/col-blanco-foto1.png';
import ColHalter  from '../img/col-halter-foto1.png';
import ColNovia   from '../img/col-novia-foto1.png';
import ColOrganza from '../img/col-organza-foto1.png';
import ColRaquel  from '../img/colab-raquel-trespalacios.jpg';

const COLLABORATIONS = [
  {
    id: 'colab-01',
    brand: 'Studio Granate',
    title: 'Cápsula editorial FW',
    year: '2025',
    role: 'Diseño y patronaje',
    description: 'Colaboración para una cápsula de temporada centrada en volúmenes drapeados y tonos tierra.',
    image: ColGranate,
  },
  {
    id: 'colab-02',
    brand: 'Atelier Blanco',
    title: 'Editorial de novia',
    year: '2025',
    role: 'Estilismo',
    description: 'Dirección de estilismo para un editorial inspirado en la sastrería nupcial contemporánea.',
    image: ColBlanco,
  },
  {
    id: 'colab-03',
    brand: 'Halter Studio',
    title: 'Colección cápsula halter',
    year: '2024',
    role: 'Patronaje y confección',
    description: 'Desarrollo de patronaje para una línea de piezas con espalda halter, pensada para eventos.',
    image: ColHalter,
  },
  {
    id: 'colab-04',
    brand: 'Casa Novia',
    title: 'Vestidos de ceremonia',
    year: '2024',
    role: 'Diseño',
    description: 'Diseño de una pequeña colección de vestidos de ceremonia a medida.',
    image: ColNovia,
  },
  {
    id: 'colab-05',
    brand: 'Organza Lab',
    title: 'Experimentación textil',
    year: '2023',
    role: 'Diseño y prototipado',
    description: 'Proyecto de investigación textil centrado en el trabajo de la organza y las transparencias.',
    image: ColOrganza,
  },
  {
    id: 'colab-06',
    brand: 'Raquel Trespalacios Martínez',
    title: 'Vestido de invitada a medida',
    year: '2024',
    role: 'Diseño y confección',
    description: 'Colaboración con Raquel Trespalacios Martínez: diseño y confección a medida de un vestido largo con hombros de volumen escultórico para una boda al aire libre.',
    image: ColRaquel,
  },
];

export default COLLABORATIONS;
