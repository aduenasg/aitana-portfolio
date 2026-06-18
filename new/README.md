# Aitana Núñez — Portfolio

Portfolio personal para Aitana Núñez, estilista y directora creativa.  
Construido con **React 18 + Vite + React Router v6**. Sin dependencias de UI externas.

---

## Estructura de ficheros

```
aitana-portfolio/
├── index.html
├── vite.config.js
├── package.json
└── src/
    ├── main.jsx
    ├── App.jsx                  ← router principal
    ├── styles/
    │   ├── main.css             ← estilos generales + variables CSS
    │   └── project.css          ← estilos de las páginas de proyecto
    ├── data/
    │   └── projects.js          ← fuente de verdad de todos los proyectos
    ├── pages/
    │   ├── HomePage.jsx         ← página de inicio (monta todos los bloques)
    │   └── ProjectPage.jsx      ← página de detalle de proyecto
    └── components/
        ├── Navbar.jsx
        ├── Hero.jsx
        ├── Ticker.jsx
        ├── Works.jsx            ← grid de proyectos con links
        ├── WorkCard.jsx         ← tarjeta individual (también en Works)
        ├── About.jsx
        ├── Clients.jsx
        ├── Contact.jsx
        └── Footer.jsx
```

---

## Rutas

| Ruta                    | Página                        |
|-------------------------|-------------------------------|
| `/`                     | Home (portfolio completo)     |
| `/proyecto/:id`         | Detalle de cada proyecto      |

Los IDs de los proyectos están definidos en `src/data/projects.js`.

---

## Puesta en marcha

```bash
npm install
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173).

---

## Añadir o editar proyectos

Todo se gestiona desde `src/data/projects.js`.  
Cada proyecto tiene este esquema:

```js
{
  id:          'nombre-del-proyecto',     // slug para la URL
  number:      '01',
  category:    'Editorial · Vogue ES',
  title:       'Nombre del proyecto',
  subtitle:    'Tagline o descripción corta',
  variant:     '',                        // '' | 'warm' | 'cool'
  wide:        false,                     // true = tarjeta ancha en el grid
  year:        '2024',
  client:      'Nombre del cliente',
  role:        'Tu rol en el proyecto',
  location:    'Ciudad, País',
  description: 'Texto largo...',
  credits: [
    { label: 'Fotografía', value: 'Nombre fotógrafo' },
    // ...
  ],
  tags:    ['editorial', 'lujo'],
  images:  [],                            // importa aquí las fotos reales
  coverBg: '#131313',                     // color de fondo si no hay foto
}
```

### Añadir fotos reales

```js
// En projects.js:
import cover   from '../assets/proyecto-01/cover.jpg';
import foto1   from '../assets/proyecto-01/foto-1.jpg';
import foto2   from '../assets/proyecto-01/foto-2.jpg';
import foto3   from '../assets/proyecto-01/foto-3.jpg';
import fullImg from '../assets/proyecto-01/full.jpg';

// images: [cover, foto1, foto2, foto3, fullImg]
// El orden importa:
//   [0] → imagen de portada (hero)
//   [1] → imagen izquierda del dúo
//   [2] → imagen derecha del dúo
//   [3] → imagen a ancho completo
```

---

## Cambiar colores / tipografía

Variables en `:root` dentro de `src/styles/main.css`:

```css
:root {
  --color-gold:   #c9a96e;   /* acento dorado */
  --color-bg:     #0a0a0a;   /* fondo negro */
  --color-text:   #f0ece4;   /* texto claro */
  --font-display: 'Playfair Display', serif;
  --font-body:    'Inter', sans-serif;
}
```

---

## Build para producción

```bash
npm run build
```

Los ficheros compilados quedan en `/dist`, listos para Netlify, Vercel o cualquier hosting estático.
