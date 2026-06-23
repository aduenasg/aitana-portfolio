/**
 * projects.js — fuente de verdad de todos los proyectos
 * images        → fotos del producto (slider principal)
 * processImages → fotos del proceso creativo (sección separada)
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

import ColBlancFoto1  from '../img/col-blanco-foto1.png';
import ColBlancFoto2  from '../img/col-blanco-foto2.png';
import ColBlancFoto3  from '../img/col-blanco-foto3.png';
import ColBlancFoto4  from '../img/col-blanco-foto4.png';
import ColBlancFoto5  from '../img/col-blanco-foto5.png';
import ColBlancFoto6  from '../img/col-blanco-foto6.png';

import ColGranFoto1   from '../img/col-granate-foto1.png';
import ColGranFoto2   from '../img/col-granate-foto2.png';
import ColGranFoto3   from '../img/col-granate-foto3.png';
import ColGranFoto4   from '../img/col-granate-foto4.png';
import ColGranFoto5   from '../img/col-granate-foto5.png';
import ColGranFoto6   from '../img/col-granate-foto6.png';
import ColGranFoto7   from '../img/col-granate-foto7.png';
import ColGranFoto8   from '../img/col-granate-foto8.png';
import ColGranFoto9   from '../img/col-granate-foto9.png';

import ColOrgFoto1    from '../img/col-organza-foto1.png';
import ColOrgFoto2    from '../img/col-organza-foto2.png';
import ColOrgFoto3    from '../img/col-organza-foto3.png';
import ColOrgFoto4    from '../img/col-organza-foto4.png';

import ColSalvFoto1   from '../img/col-salvia-foto1.png';
import ColSalvFoto2   from '../img/col-salvia-foto2.png';
import ColSalvFoto3   from '../img/col-salvia-foto3.png';
import ColSalvFoto4   from '../img/col-salvia-foto4.png';

import ColHaltFoto1   from '../img/col-halter-foto1.png';
import ColHaltFoto2   from '../img/col-halter-foto2.png';
import ColHaltFoto3   from '../img/col-halter-foto3.png';
import ColHaltFoto4   from '../img/col-halter-foto4.png';

import ColNoviScen    from '../img/col-novia-escenario.png';
import ColColecGroup  from '../img/col-coleccion-grupo.png';
import ColNovFoto1    from '../img/col-novia-foto1.png';
import ColNovFoto2    from '../img/col-novia-foto2.png';
import ColNovFoto3    from '../img/col-novia-foto3.png';
import ColNovFoto4    from '../img/col-novia-foto4.png';

import ProcCover      from '../img/proceso-diseno-terminado.png';
import ProcClo06      from '../img/proceso-clo-06.png';
import ProcClo11      from '../img/proceso-clo-11.png';

import DoradoFoto1    from '../img/dorado-foto1.jpg';
import DoradoFoto2    from '../img/dorado-foto2.jpg';
import DoradoFoto3    from '../img/dorado-foto3.jpg';
import DoradoFoto4    from '../img/dorado-foto4.jpg';
import DoradoFoto5    from '../img/dorado-foto5.jpg';
import DoradoFoto6    from '../img/dorado-foto6.jpg';
import DoradoFoto7    from '../img/dorado-foto7.jpg';
import DoradoFoto8    from '../img/dorado-foto8.jpg';
import DoradoMoodboard from '../img/dorado-moodboard.jpg';

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
    images: [BolsoFoto3, BolsoFoto1, BolsoFoto2, BolsoFoto4],
    processImages: [BolsoConcepto, BolsoColores, BolsoMateriales, BolsoDiseño, BolsoPatrones],
    coverBg: '#1a0a06',
    image: BolsoImg,
  },

  /* ── 02 ── */
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
    images: [SirenaFoto4, SirenaFoto1, SirenaFoto2, SirenaFoto3, SirenaFoto5],
    processImages: [],
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
    processImages: [],
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
    images: [HofburgFoto3, HofburgFoto1, HofburgFoto4, HofburgFoto2, HofburgFoto5],
    processImages: [HofburgFicha1, HofburgFicha2, HofburgFicha3, HofburgFicha4, HofburgTextil1, HofburgTextil2],
    coverBg: '#110e0b',
    image: HofburgFoto3,
  },

  /* ── 06 ── Colección 3D (todos los modelos agrupados) */
  {
    id: '__coleccion3d__',
    number: '05',
    category: 'Diseño digital · CLO 3D · Colección 2025',
    title: 'Colección 3D',
    subtitle: 'Seis diseños simulados en CLO 3D',
    variant: 'cool',
    wide: false,
    year:'2025',
    location: 'Madrid, España',
    description:
      'Colección completa de seis diseños digitales creados y simulados en CLO 3D como Trabajo Final del Grado en Tecnología y Moda de la Universidad Rey Juan Carlos. El concepto gira en torno a la recuperación de la inocencia tras la guerra, transitando de la gravedad del rojo oscuro y el blanco roto hasta la ligereza del salvia y el blanco nupcial.',
    credits: [
      { label: 'Diseño y simulación', value: 'Aitana Núñez Ramírez' },
      { label: 'Software',            value: 'CLO 3D 2024.2' },
      { label: 'Institución',         value: 'URJC — Tecnología y Moda' },
    ],
    tags: ['CLO 3D', 'colección', 'simulación 3D', 'URJC', '2025'],
    images: [ColBlancFoto3, ColGranFoto3, ColOrgFoto1, ColSalvFoto1, ColHaltFoto1, ColNovFoto1],
    processImages: [ProcCover, ProcClo06, ProcClo11, ColColecGroup],
    coverBg: '#161410',
    image: ColBlancFoto3,

    /* ── Modelos internos de la colección ── */
    modelos3d: [
      {
        number: '01',
        title: 'Blanco y Carmesí',
        subtitle: 'Blazer doble botonadura + falda maxi ombré',
        description: 'Conjunto en lino crudo con degradado ombré que tiñe la falda de blanco a carmesí. Blazer con solapas en pico, doble botonadura con botones burdeos y forro en seda tafetán rojo.',
        accent: '#8a1a1a',
        images: [ColBlancFoto3, ColBlancFoto5, ColBlancFoto1, ColBlancFoto6, ColBlancFoto2, ColBlancFoto4],
      },
      {
        number: '02',
        title: 'Top Granate',
        subtitle: 'Corpiño floral + palazzo granate',
        description: 'Top corpiño sin mangas con cuello-solapa bordado en motivo floral margarita, combinado con falda palazzo maxi en granate oscuro de vuelo generoso.',
        accent: '#6b1020',
        images: [ColGranFoto3, ColGranFoto1, ColGranFoto7, ColGranFoto4, ColGranFoto9, ColGranFoto2, ColGranFoto6, ColGranFoto8, ColGranFoto5],
      },
      {
        number: '03',
        title: 'Capa Organza',
        subtitle: 'Transparencia escarlata sobre blanco',
        description: 'Capa de organza roja semitransparente con caída asimétrica sobre vestido blanco con cinturón escarlata. El contraste entre lo translúcido y lo sólido crea volumen y drama.',
        accent: '#b02020',
        images: [ColOrgFoto1, ColOrgFoto2, ColOrgFoto3, ColOrgFoto4],
      },
      {
        number: '04',
        title: 'Vestido Salvia',
        subtitle: 'Jacquard vegetal con banda de organza',
        description: 'Vestido midi en jacquard de estampado vegetal verde salvia. Una banda de organza roja en diagonal desde el hombro, con rosa volumétrica, introduce el acento cromático.',
        accent: '#4a5e30',
        images: [ColSalvFoto1, ColSalvFoto2, ColSalvFoto3, ColSalvFoto4],
      },
      {
        number: '05',
        title: 'Halter Salvia',
        subtitle: 'Escote drapeado y corte canesú',
        description: 'Vestido halter en popelín estampado verde salvia con escote drapeado, corte canesú y espalda descubierta. Cierre con cremallera invisible en el centro.',
        accent: '#3a5228',
        images: [ColHaltFoto1, ColHaltFoto2, ColHaltFoto3, ColHaltFoto4],
      },
      {
        number: '06',
        title: 'Novia con Cola',
        subtitle: 'Vestido de novia en seda satén',
        description: 'Pieza culminante de la colección. Vestido de novia con tirantes finos, cuerpo estructurado y cola escultural en seda satén blanco. Cremallera invisible en el centro de la espalda.',
        accent: '#8a8a9a',
        images: [ColNovFoto1, ColNovFoto2, ColNovFoto3, ColNovFoto4],
      },
    ],
  }, 
  {
    id: 'oro-y-narciso',
    number: '06',
    category: 'Moda · Colección 2025',
    title: 'Oro y Narciso',
    subtitle: 'Plisado geométrico y flores de tela',
    variant: 'warm',
    wide: true,
    year: '2025',
    client: 'Proyecto propio — AN Studio',
    role: 'Diseño, confección y dirección creativa',
    location: 'Madrid, España',
    description:
      'Conjunto en algodón dorado compuesto por top halter de cuello vuelto drapeado y falda con banda de plisado geométrico en diamante y globo de vuelo. El tocado, artesanal en muselina de algodón sin teñir, recrea narcisos de gran formato que enmarcan el rostro. La paleta —ocre, crudo y amarillo pistilo— dialoga con el moodboard de inspiración: la nostalgia analógica, la luna llena y los arándanos oscuros como contrapunto cromático.',
    credits: [
      { label: 'Diseño y confección', value: 'Aitana Núñez' },
      { label: 'Tocado',              value: 'Aitana Núñez — muselina de algodón' },
      { label: 'Material',            value: 'Algodón dorado, muselina cruda' },
      { label: 'Técnica',             value: 'Plisado geométrico a mano, drapeado, florística textil' },
      { label: 'Fotografía',          value: 'AN Studio' },
    ],
    tags: ['vestido', 'dorado', 'plisado', 'tocado', 'narciso', 'algodón', 'colección 2025'],
    images: [DoradoFoto4, DoradoFoto2, DoradoFoto5, DoradoFoto6, DoradoFoto7, DoradoFoto8, DoradoFoto1],
    processImages: [DoradoMoodboard, DoradoFoto3],
    coverBg: '#1c1406',
    image: DoradoFoto8,
  }
];

export default PROJECTS;
