# Aitana Núñez — Portfolio

Portfolio de una página para Aitana Núñez, diseñadora de moda. Muestra sus proyectos, una colección modelada en 3D (CLO 3D), el proceso creativo de esa colección y sus colaboraciones con marcas. Todo el contenido sale de ficheros de datos estáticos (no hay CMS ni backend).

Disponible en español, inglés, francés e italiano.

## Stack

- **React 18** + **Vite 5** (`react-router-dom` para las rutas)
- **framer-motion**, **gsap** y **ogl** (WebGL) para las animaciones
- CSS con variables (sin framework de estilos) — temas claro/oscuro vía `data-theme` en `<html>`
- Sin backend, sin CMS: el contenido vive en `src/data/` y `src/i18n/`

## Puesta en marcha

```bash
npm install
npm run dev       # servidor de desarrollo (Vite)
npm run build     # build de producción a dist/
npm run preview   # sirve el build de producción en local
```

No hay tests, linter ni type checker configurados en este proyecto.

## Despliegue con Docker

El sitio se despliega vía Docker (`Dockerfile` hace `npm run build` y sirve `dist/` con `serve` en el puerto 3000):

```bash
docker rm -f aitana-portfolio        # si ya hay un contenedor corriendo en el 3000
docker build -t aitana-portfolio-main .
docker run -d -p 3000:3000 --name aitana-portfolio aitana-portfolio-main
```

Después, la web está en `http://localhost:3000`.

## Estructura

```
src/
├─ data/
│  ├─ projects.js          # proyectos: imágenes, créditos, tags, descripción, colección 3D
│  └─ collaborations.js    # colaboraciones con marcas
├─ i18n/
│  └─ translations.js      # textos de la interfaz + copy de cada proyecto, por idioma
├─ context/                # LangContext (idioma) y ThemeContext (claro/oscuro)
├─ components/              # componentes reutilizables (incluye los widgets visuales tipo "React Bits")
├─ pages/                  # HomePage, ProjectPage, Coleccion3DPage, ProcessPage, StudiesPage
├─ styles/                 # main.css (sistema de diseño) y project.css (páginas de proyecto)
└─ img/                    # imágenes, importadas por variable desde projects.js (no por ruta)
```

`old/` es una instantánea de una versión anterior del sitio, guardada solo como referencia — no forma parte de la app actual.

## Contenido

- **Nuevo proyecto** → añadir la entrada en `PROJECTS` (`src/data/projects.js`) con un `id` único, y su traducción en `translations[idioma].projects[id]` (`src/i18n/translations.js`) para cada uno de los 4 idiomas.
- **Nueva colaboración** → añadir la entrada en `COLLABORATIONS` (`src/data/collaborations.js`).
- **Textos de interfaz** (botones, etiquetas, secciones) → claves planas en `translations.js`, uno por idioma.
- Las imágenes se importan siempre por variable en la parte superior de `projects.js`, nunca por ruta de texto.

### Imágenes: antes de subir una nueva

Las fotos de cámara/render pesan varios MB y ralentizan mucho la carga. Antes de añadir una imagen nueva:
- Redimensiónala a un máximo de **2400px** en el lado largo (de sobra para cualquier pantalla, incluida retina).
- Si es una fotografía o un render sin transparencia real, guárdala como **JPEG** (calidad ~80–85), no como PNG — el mismo contenido pesa muchas veces menos.
- Con `sips` (viene instalado en macOS), por ejemplo:
  ```bash
  sips -Z 2400 -s formatOptions 80 mi-foto.jpg
  ```

## Idiomas

El selector de idioma vive en `LangContext` (`src/context/LangContext.jsx`) y persiste en `localStorage`. `t(clave)` traduce textos de interfaz; `tp(id)` traduce el contenido de un proyecto concreto, con el español como idioma de respaldo si falta algo en el idioma activo.
