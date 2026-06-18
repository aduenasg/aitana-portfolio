/**
 * projects.js
 * Fuente de verdad de todos los proyectos.
 * Edita aquí para reflejar los cambios en toda la app.
 */

const PROJECTS = [
  {
    id: 'bolso-alhambra',
    number: '01',
    category: '',
    title: 'Bolso Alhambra',
    subtitle: '',
    variant: '',
    wide: false,
    year: '2024',
    client: '',
    role: '',
    location: '',
    description:
      '',
    credits: [
      { label: 'Fotografía',  value: '' },
      { label: 'Maquillaje',  value: '' },
      { label: 'Modelo',      value: '' },
      { label: 'Producción',  value: '' },
    ],
    tags: ['bolso', 'rojo', 'alhamra'],
    images: ['src/img/Bolso.jpg' ], // sustituir por imports reales: [img1, img2, ...]
    coverBg: '#131313',
  },
  {
    id: 'oro-y-sombra',
    number: '02',
    category: 'Campaña · Otoño 2024',
    title: 'Oro y sombra',
    subtitle: 'La campaña que redefinió el otoño',
    variant: 'warm',
    wide: false,
    year: '2024',
    client: 'Sandro Paris',
    role: 'Estilismo y dirección creativa',
    location: 'Madrid, España',
    description:
      'Campaña de temporada para Sandro en la que el contraste entre el dorado cálido y las sombras profundas construye una narrativa sobre el poder femenino. La paleta cromática parte del ocre y termina en el negro absoluto.',
    credits: [
      { label: 'Fotografía',  value: 'Lucía Fernández' },
      { label: 'Maquillaje',  value: 'Ana Torres' },
      { label: 'Modelo',      value: 'Mariam El Koubi' },
      { label: 'Producción',  value: 'AN Studio' },
    ],
    tags: ['campaña', 'otoño', 'dorado', 'poder femenino'],
    images: [],
    coverBg: '#161410',
  },
  {
    id: 'piel-de-luna',
    number: '03',
    category: 'Look book · Primavera',
    title: 'Piel de luna',
    subtitle: 'Blanco, transparencia y luz',
    variant: 'cool',
    wide: false,
    year: '2024',
    client: 'Mango',
    role: 'Estilismo completo',
    location: 'Barcelona, España',
    description:
      'Look book de primavera-verano donde la ligereza de los tejidos dialoga con la arquitectura luminosa de la costa mediterránea. Una celebración de la feminidad sin artificios.',
    credits: [
      { label: 'Fotografía',  value: 'Carles Puig' },
      { label: 'Maquillaje',  value: 'Neus Vidal' },
      { label: 'Modelo',      value: 'Irina Shayk' },
      { label: 'Producción',  value: 'AN Studio' },
    ],
    tags: ['lookbook', 'primavera', 'blanco', 'mediterráneo'],
    images: [],
    coverBg: '#0e1014',
  },
  {
    id: 'el-ultimo-desfile',
    number: '04',
    category: 'Dirección creativa · MBFW',
    title: 'El último desfile',
    subtitle: 'Mercedes-Benz Fashion Week Madrid',
    variant: '',
    wide: true,
    year: '2023',
    client: 'Mercedes-Benz Fashion Week',
    role: 'Directora creativa',
    location: 'Madrid, España',
    description:
      'La dirección creativa completa de un desfile que fusionó moda, performance y arte contemporáneo. Treinta y dos looks, una banda sonora en vivo y una puesta en escena que la prensa especializada calificó como el momento del año.',
    credits: [
      { label: 'Fotografía',  value: 'Rodrigo Sánchez' },
      { label: 'Música en vivo', value: 'Noa Lur' },
      { label: 'Set design',  value: 'Estudio Blanco' },
      { label: 'Producción',  value: 'AN Studio' },
    ],
    tags: ['desfile', 'MBFW', 'dirección creativa', 'performance'],
    images: [],
    coverBg: '#111',
  },
  {
    id: 'terciopelo-negro',
    number: '05',
    category: "Editorial · Harper's Bazaar",
    title: 'Terciopelo negro',
    subtitle: 'La textura como protagonista',
    variant: 'warm',
    wide: false,
    year: '2023',
    client: "Harper's Bazaar España",
    role: 'Estilismo editorial',
    location: 'Sevilla, España',
    description:
      'Editorial conceptual que explora el terciopelo como metáfora de la opulencia sin ostentación. Rodada en los patios de Sevilla, la colisión entre la arquitectura andaluza y las siluetas modernas crea una tensión visual única.',
    credits: [
      { label: 'Fotografía',  value: 'Álvaro Medina' },
      { label: 'Maquillaje',  value: 'Carmela Reyes' },
      { label: 'Modelo',      value: 'Nadia Hernández' },
      { label: 'Producción',  value: 'AN Studio' },
    ],
    tags: ['editorial', 'terciopelo', 'sevilla', 'bazaar'],
    images: [],
    coverBg: '#161410',
  },
];

export default PROJECTS;
