/**
 * collaborations.js — fuente de verdad de la sección/página de Colaboraciones.
 *
 * Solo colaboraciones reales. Para añadir una nueva: importa su foto desde
 * src/img/ y añade una entrada al array con brand/title/year/role/description.
 */

import ColRaquel from '../img/colab-raquel-trespalacios.jpg';

const COLLABORATIONS = [
  {
    id: 'colab-01',
    brand: 'Raquel Trespalacios Martínez',
    title: 'Vestido de invitada a medida',
    year: '2024',
    role: 'Diseño y confección',
    description: 'Diseño y confección a medida de un vestido largo con hombros de volumen escultórico, para una boda al aire libre.',
    image: ColRaquel,
  },
];

export default COLLABORATIONS;
