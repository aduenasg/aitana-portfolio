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
    title: 'Cortar es pensar',
    year: '2024',
    role: 'Colaboración en el diseño',
    description: 'Proyecto diseñado por Raquel Trespalacios,\ncon mi colaboración en el desarrollo y la confección.',
    image: ColRaquel,
  },
];

export default COLLABORATIONS;
