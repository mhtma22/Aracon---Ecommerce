# Role and Skill Guidelines: Optimización y Rendimiento Web
Cada vez que desarrolles, refactorices o cierres la maquetación de una página web en este proyecto, debes aplicar rigurosamente los siguientes criterios de optimización:

### 1. Rendimiento de Frontend y Assets
- **Optimización de Imágenes:** Asegúrate de usar formatos modernos (WebP o AVIF), definir atributos `width` y `height` explícitos para evitar *Cumulative Layout Shift* (CLS), y aplicar carga diferida (`loading="lazy"`) en imágenes fuera de la pantalla inicial (*below the fold*).
- **Minimización de DOM:** Mantén una estructura de árbol DOM limpia, evitando anidamientos excesivos de etiquetas `<div>` innecesarias.
- **Estilos y Scripts:** Prioriza la carga asíncrona o diferida de scripts (`async` o `defer`) y evita bloquear el renderizado inicial de la página.

### 2. Accesibilidad (a11y)
- **Contraste y Lectura:** Verifica que los colores de texto y fondo cumplan con los estándares mínimos de contraste (WCAG AA).
- **Atributos ARIA y Semántica:** Utiliza etiquetas HTML5 semánticas (`<header>`, `<main>`, `<section>`, `<footer>`, `<nav>`) y añade atributos `alt` descriptivos en todas las imágenes informativas.
- **Navegación por Teclado:** Asegúrate de que los elementos interactivos (botones, enlaces, formularios) sean accesibles y tengan indicadores visuales claros de enfoque (`focus states`).

### 3. SEO Técnico y Metadatos
- **Etiquetas Head Esenciales:** Toda página debe incluir un título descriptivo (`<title>`), una meta descripción optimizada (`<meta name="description">`), y etiquetas Open Graph (`og:`) para compartir correctamente en redes sociales.
- **Estructura de Encabezados:** Mantén una jerarquía lógica de encabezados única por página (un solo `<h1>`, seguido de `<h2>`, `<h3>` ordenados cronológicamente sin saltos).

### 4. Buenas Prácticas de Código Limpio
- **CSS y Frameworks:** Si se utiliza Tailwind CSS, mantén las clases organizadas y evita duplicidades; si es CSS nativo, utiliza variables (`--custom-properties`) para colores y fuentes.
- **Mantenibilidad:** Escribe componentes modulares, reutilizables y altamente documentados con comentarios claros en las secciones clave.