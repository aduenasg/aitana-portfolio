/**
 * projects.js — fuente de verdad de todos los proyectos
 */

import BolsoImg        from '../img/Bolso.jpg';
import BolsoFoto1      from '../img/bolso-foto1.jpg';
import BolsoFoto2      from '../img/bolso-foto2.jpg';
import BolsoFoto3      from '../img/bolso-foto3.jpg';
import BolsoFoto4      from '../img/bolso-foto4.jpg';
import BolsoConcepto   from '../img/bolso-concepto.jpg';
import BolsoColores    from '../img/bolso-colores.jpg';
import BolsoMateriales from '../img/bolso-materiales.jpg';
import BolsoDiseño     from '../img/bolso-diseno.jpg';
import BolsoPatrones   from '../img/bolso-patrones.jpg';

import MiniFoto1 from '../img/mini-foto1.jpg';
import MiniFoto2 from '../img/mini-foto2.jpg';
import MiniFoto3 from '../img/mini-foto3.jpg';
import MiniFoto4 from '../img/mini-foto4.jpg';

import SirenaFoto1 from '../img/sirena-foto1.jpg';
import SirenaFoto2 from '../img/sirena-foto2.jpg';
import SirenaFoto3 from '../img/sirena-foto3.jpg';
import SirenaFoto4 from '../img/sirena-foto4.jpg';
import SirenaFoto5 from '../img/sirena-foto5.jpg';

import HofburgFoto1  from '../img/hofburg-foto1.jpg';
import HofburgFoto2  from '../img/hofburg-foto2.jpg';
import HofburgFoto3  from '../img/hofburg-foto3.jpg';
import HofburgFoto4  from '../img/hofburg-foto4.jpg';
import HofburgFoto5  from '../img/hofburg-foto5.jpg';
import HofburgFicha1 from '../img/hofburg-ficha1.jpg';
import HofburgFicha2 from '../img/hofburg-ficha2.jpg';
import HofburgFicha3 from '../img/hofburg-ficha3.jpg';
import HofburgFicha4 from '../img/hofburg-ficha4.jpg';
import HofburgTextil1 from '../img/hofburg-textil1.jpg';
import HofburgTextil2 from '../img/hofburg-textil2.jpg';

const PROJECTS = [
  /* ── 01 ── */
  {
    id: 'bolso-alhambra',
    number: '01',
    category: 'Accesorios · Diseño de producto 2024',
    title: 'Bolso Alhambra',
    subtitle: 'Artesanía nazarí hecha accesorio',
    variant: 'warm',
    wide: false,
    year: '2024',
    client: 'Proyecto propio — AN Studio',
    role: 'Diseño, patronaje y dirección creativa',
    location: 'Granada, España',
    description:
      'El Bolso Alhambra nace de la geometría nazarí de La Alhambra de Granada. Los motivos en corte láser sobre piel de ternera reproducen el entrelazado de los azulejos del palacio, traduciendo un lenguaje arquitectónico del siglo XIV en un accesorio contemporáneo. La pieza incluye una bolsa interior de cierre con cuerdas y cantos en negro.',
    credits: [
      { label: 'Diseño y patronaje', value: 'Aitana Núñez' },
      { label: 'Material',           value: 'Piel de ternera, forro algodón' },
      { label: 'Técnica',            value: 'Corte láser, marroquinería' },
      { label: 'Fotografía',         value: 'AN Studio' },
    ],
    tags: ['bolso', 'corte láser', 'piel', 'alhambra', 'nazarí', 'diseño de producto'],
    images: [
      BolsoFoto3, BolsoFoto1, BolsoFoto2, BolsoFoto4,
      BolsoConcepto, BolsoColores, BolsoMateriales, BolsoDiseño, BolsoPatrones,
    ],
    coverBg: '#1a0a06',
    image: BolsoImg,
  },

   {
    id: 'canto-de-sirena',
    number: '02',
    category: 'Moda · Colección 2024',
    title: 'Canto de sirena',
    subtitle: 'Blanco, macramé y naturaleza',
    variant: 'cool',
    wide: true,
    year: '2024',
    client: 'Proyecto propio — AN Studio',
    role: 'Diseño, confección y dirección creativa',
    location: 'Castilla, España',
    description:
      'Dos piezas que dialogan entre sí: un vestido largo blanco de escote en V con pliegue frontal, y una sobrefaldilla de macramé anudada a mano que cae sobre los hombros como una red de sirena. La sesión se rodó al amanecer entre álamos y amapolas silvestres, buscando esa tensión entre lo primitivo y lo etéreo.',
    credits: [
      { label: 'Diseño y confección', value: 'Aitana Núñez' },
      { label: 'Macramé a mano',      value: 'Aitana Núñez' },
      { label: 'Fotografía',          value: 'AN Studio' },
      { label: 'Modelo',              value: 'AN Studio' },
    ],
    tags: ['vestido', 'blanco', 'macramé', 'naturaleza', 'colección', 'artesanía'],
    images: [
      SirenaFoto4, SirenaFoto1, SirenaFoto2, SirenaFoto3, SirenaFoto5,
    ],
    coverBg: '#0d1208',
    image: SirenaFoto4,
  },

  /* ── 03 ── */
  {
    id: 'bolso-mini',
    number: '03',
    category: 'Accesorios · Diseño de producto 2024',
    title: 'Bolso Mini',
    subtitle: 'La esencia en formato pequeño',
    variant: 'cool',
    wide: false,
    year: '2024',
    client: 'Proyecto propio — AN Studio',
    role: 'Diseño, patronaje y confección',
    location: 'Madrid, España',
    description:
      'Una versión miniaturizada del tote clásico que no renuncia a ningún detalle. Fabricado en piel de ternera color teja con pespuntes negros a mano, el Bolso Mini incorpora las trabillas en chevron —firma de AN Studio— y cantos acabados en negro. Una pieza diaria diseñada para durar.',
    credits: [
      { label: 'Diseño y patronaje', value: 'Aitana Núñez' },
      { label: 'Material',           value: 'Piel de ternera color teja' },
      { label: 'Técnica',            value: 'Costura a mano, marroquinería' },
      { label: 'Fotografía',         value: 'AN Studio' },
    ],
    tags: ['bolso mini', 'tote', 'piel', 'teja', 'artesanía', 'diseño de producto'],
    images: [MiniFoto1, MiniFoto2, MiniFoto3, MiniFoto4],
    coverBg: '#1e1210',
    image: MiniFoto1,
  },



  /* ── 04 ── */
  {
    id: 'hofburg',
    number: '04',
    category: 'Colección ERBE · Otoño-Invierno 2022',
    title: 'Hofburg',
    subtitle: 'Ball gown para una emperatriz moderna',
    variant: 'warm',
    wide: true,
    year: '2022',
    client: 'Colección ERBE — A medida',
    role: 'Diseño, patronaje y confección',
    location: 'Ávila, España',
    description:
      'Modelo Hofburg de la colección ERBE, inspirada en la arquitectura imperial centroeuropea. Un vestido de cuerpo estructurado con costadillo francés y ballenas, volante de gasa en escote bardot tejido a mano, y una falda de satén blanco con cola que despliega 395 cm de vuelo. La capa corta en terciopelo topo completa el look, sujetada con un broche de mariposa. Confección a mano y máquina, tejido principal en tafetán de rayón celulósico.',
    credits: [
      { label: 'Diseño y confección', value: 'Aitana Núñez Ramírez' },
      { label: 'Colección',           value: 'ERBE — Otoño-Invierno 2022' },
      { label: 'Tejido principal',    value: 'Tafetán de rayón (celulósico)' },
      { label: 'Técnica',             value: 'Confección a mano y máquina, ballenas, estarcido' },
      { label: 'Fotografía',          value: 'AN Studio' },
    ],
    tags: ['vestido', 'ball gown', 'novia', 'satén', 'bardot', 'colección ERBE', 'a medida'],
    images: [
      HofburgFoto3,   // cover: frontal arquitectura piedra
      HofburgFoto1,   // 2-up: espalda con cola
      HofburgFoto4,   // 2-up: perfil
      HofburgFoto2,   // full-width: falda en parque con capa
      HofburgFoto5,   // extra: detalle capa topo
      HofburgFicha1,  // extra: ficha técnica diseño (manuscrita)
      HofburgFicha2,  // extra: ficha técnica diseño (limpia)
      HofburgFicha3,  // extra: ficha técnica capa
      HofburgFicha4,  // extra: ficha técnica miriñaque
      HofburgTextil1, // extra: ficha textiles
      HofburgTextil2, // extra: ficha telar tecnología textil
    ],
    coverBg: '#110e0b',
    image: HofburgFoto3,
  },

  /* ── 05 ── */
  // {
  //   id: 'oro-y-sombra',
  //   number: '05',
  //   category: 'Campaña · Otoño 2024',
  //   title: 'Oro y sombra',
  //   subtitle: 'La campaña que redefinió el otoño',
  //   variant: 'warm',
  //   wide: false,
  //   year: '2024',
  //   client: 'Sandro Paris',
  //   role: 'Estilismo y dirección creativa',
  //   location: 'Madrid, España',
  //   description:
  //     'Campaña de temporada para Sandro en la que el contraste entre el dorado cálido y las sombras profundas construye una narrativa sobre el poder femenino. La paleta cromática parte del ocre y termina en el negro absoluto.',
  //   credits: [
  //     { label: 'Fotografía',  value: 'Lucía Fernández' },
  //     { label: 'Maquillaje',  value: 'Ana Torres' },
  //     { label: 'Modelo',      value: 'Mariam El Koubi' },
  //     { label: 'Producción',  value: 'AN Studio' },
  //   ],
  //   tags: ['campaña', 'otoño', 'dorado', 'poder femenino'],
  //   images: [],
  //   coverBg: '#161410',
  // },

  // /* ── 06 ── */
  // {
  //   id: 'piel-de-luna',
  //   number: '06',
  //   category: 'Look book · Primavera',
  //   title: 'Piel de luna',
  //   subtitle: 'Blanco, transparencia y luz',
  //   variant: 'cool',
  //   wide: false,
  //   year: '2024',
  //   client: 'Mango',
  //   role: 'Estilismo completo',
  //   location: 'Barcelona, España',
  //   description:
  //     'Look book de primavera-verano donde la ligereza de los tejidos dialoga con la arquitectura luminosa de la costa mediterránea. Una celebración de la feminidad sin artificios.',
  //   credits: [
  //     { label: 'Fotografía',  value: 'Carles Puig' },
  //     { label: 'Maquillaje',  value: 'Neus Vidal' },
  //     { label: 'Modelo',      value: 'Irina Shayk' },
  //     { label: 'Producción',  value: 'AN Studio' },
  //   ],
  //   tags: ['lookbook', 'primavera', 'blanco', 'mediterráneo'],
  //   images: [],
  //   coverBg: '#0e1014',
  // },

  // /* ── 07 ── */
  // {
  //   id: 'el-ultimo-desfile',
  //   number: '07',
  //   category: 'Dirección creativa · MBFW',
  //   title: 'El último desfile',
  //   subtitle: 'Mercedes-Benz Fashion Week Madrid',
  //   variant: '',
  //   wide: true,
  //   year: '2023',
  //   client: 'Mercedes-Benz Fashion Week',
  //   role: 'Directora creativa',
  //   location: 'Madrid, España',
  //   description:
  //     'La dirección creativa completa de un desfile que fusionó moda, performance y arte contemporáneo. Treinta y dos looks, una banda sonora en vivo y una puesta en escena que la prensa especializada calificó como el momento del año.',
  //   credits: [
  //     { label: 'Fotografía',     value: 'Rodrigo Sánchez' },
  //     { label: 'Música en vivo', value: 'Noa Lur' },
  //     { label: 'Set design',     value: 'Estudio Blanco' },
  //     { label: 'Producción',     value: 'AN Studio' },
  //   ],
  //   tags: ['desfile', 'MBFW', 'dirección creativa', 'performance'],
  //   images: [],
  //   coverBg: '#111',
  // },

  // /* ── 08 ── */
  // {
  //   id: 'terciopelo-negro',
  //   number: '08',
  //   category: "Editorial · Harper's Bazaar",
  //   title: 'Terciopelo negro',
  //   subtitle: 'La textura como protagonista',
  //   variant: 'warm',
  //   wide: false,
  //   year: '2023',
  //   client: "Harper's Bazaar España",
  //   role: 'Estilismo editorial',
  //   location: 'Sevilla, España',
  //   description:
  //     'Editorial conceptual que explora el terciopelo como metáfora de la opulencia sin ostentación. Rodada en los patios de Sevilla, la colisión entre la arquitectura andaluza y las siluetas modernas crea una tensión visual única.',
  //   credits: [
  //     { label: 'Fotografía',  value: 'Álvaro Medina' },
  //     { label: 'Maquillaje',  value: 'Carmela Reyes' },
  //     { label: 'Modelo',      value: 'Nadia Hernández' },
  //     { label: 'Producción',  value: 'AN Studio' },
  //   ],
  //   tags: ['editorial', 'terciopelo', 'sevilla', 'bazaar'],
  //   images: [],
  //   coverBg: '#161410',
  // },
];

export default PROJECTS;
