# Code Knowledge — pw-e-commerce

A plain-language glossary of every new concept used in this project. Organized by topic so you can study and explain each concept in your own words during the oral exam.

---

## HTML

- **`<!DOCTYPE html>`** — Le dice al navegador que el archivo es HTML5. Siempre va en la primera línea.

- **`<html lang="es-AR">`** — El elemento raíz que contiene todo el HTML. El atributo `lang` le dice al navegador y a lectores de pantalla que el contenido está en español argentino.

- **`<head>`** — Sección invisible que contiene metadatos: configuración del documento, título, links a estilos, etc. No se muestra en la página.

- **`<meta charset="UTF-8">`** — Define la codificación de caracteres. UTF-8 soporta tildes, eñes y caracteres especiales.

- **`<meta name="viewport">`** — Hace que la página se adapte al ancho del dispositivo. Sin esto, los celulares mostrarían la versión desktop achicada.

- **`<meta name="description">`** — Texto que aparece en los resultados de Google debajo del título. Sirve para SEO (posicionamiento en buscadores).

- **`<header>`** — Etiqueta semántica para el encabezado del sitio. Le dice al navegador "esto es la barra de navegación principal".

- **`<nav>`** — Etiqueta semántica que indica un bloque de navegación. Los lectores de pantalla la usan para que usuarios con discapacidad visual salten directo a los links.

- **`<main>`** — Contiene el contenido principal de la página. Solo debe haber un `<main>` por página.

- **`<section>`** — Agrupa contenido temáticamente relacionado. Cada sección de nuestra landing es un `<section>`.

- **`<article>`** — Representa contenido independiente que tiene sentido por sí solo. Lo usamos para cada tarjeta de tema.

- **`<footer>`** — Etiqueta semántica para el pie de página.

- **`<h1>` a `<h3>`** — Títulos jerárquicos. `<h1>` es el más importante (solo uno por página), `<h2>` para secciones, `<h3>` para subtemas. Esta jerarquía es clave para accesibilidad y SEO.

- **`<ul>` y `<li>`** — Lista desordenada (`ul` = unordered list) con ítems (`li` = list item).

- **`<a href="...">`** — Enlace (anchor). `href` es la dirección a donde te lleva. Con `#id` apunta a un elemento dentro de la misma página.

- **`<img src="..." alt="...">`** — Imagen. `src` es la ruta del archivo, `alt` es el texto alternativo que se muestra si la imagen no carga y que los lectores de pantalla leen en voz alta.

- **`target="_blank"`** — Abre el enlace en una pestaña nueva del navegador.

- **`rel="noopener noreferrer"`** — Seguridad: cuando abrís un link en nueva pestaña, esto evita que la página destino pueda acceder a información de tu página.

- **`aria-label`** — Atributo de accesibilidad que le da un nombre descriptivo a un elemento para lectores de pantalla, cuando el contenido visual no es suficiente.

- **`aria-labelledby`** — Similar a `aria-label`, pero en vez de texto directo, apunta al `id` de otro elemento que ya tiene el texto (como un `<h2>`).

- **`aria-hidden="true"`** — Le dice a los lectores de pantalla que ignoren ese elemento (lo usamos en íconos decorativos).

- **`role="list"`** — Refuerza explícitamente que un `<ul>` es una lista. Algunos navegadores pierden la semántica de lista cuando le sacás los bullets con CSS.

- **`width` y `height` en `<img>`** — Reservan el espacio de la imagen antes de que cargue, evitando que la página "salte" cuando aparece.

- **`<button>`** — Elemento interactivo para acciones. A diferencia de `<a>` (que navega a otra página/sección), `<button>` ejecuta una acción en la misma página. Lo usamos para el botón hamburguesa del menú mobile. Siempre debe tener un `aria-label` si no tiene texto visible.

- **`aria-expanded`** — Atributo de accesibilidad que indica si un elemento colapsable (como un menú) está abierto (`true`) o cerrado (`false`). Los lectores de pantalla lo anuncian para que usuarios ciegos sepan el estado del menú.

---

## CSS

- **`<link rel="stylesheet" href="styles.css">`** — Conecta el archivo CSS externo con el HTML. Separar estilos del HTML es una buena práctica (separación de responsabilidades).

- **CSS Custom Properties (variables)** — Se definen con `--nombre: valor` dentro de `:root` y se usan con `var(--nombre)`. Permiten cambiar un color o tamaño en un solo lugar y que se actualice en toda la página.

- **`:root`** — Selector que apunta al elemento raíz del documento (`<html>`). Se usa para definir variables CSS globales.

- **`box-sizing: border-box`** — Hace que el `width` y `height` de un elemento incluyan el padding y borde. Sin esto, un `div` de 200px con 20px de padding mediría 240px.

- **`*` (selector universal)** — Selecciona todos los elementos. Lo usamos en el reset (`* { margin: 0; padding: 0; }`) para arrancar con estilos limpios.

- **`::before` y `::after`** — Pseudo-elementos que crean contenido antes o después del contenido real de un elemento. Los usamos para los guiones en la lista del formato.

- **`scroll-behavior: smooth`** — Hace que cuando hacés clic en un link interno (`#seccion`), la página se desplace suavemente en vez de saltar.

- **Flexbox (`display: flex`)** — Sistema de layout unidimensional (una fila o una columna). Lo usamos para el nav, los links de plataformas, y el footer.
  - `align-items` — Alinea los elementos en el eje perpendicular (vertical si es fila).
  - `justify-content` — Distribuye los elementos en el eje principal (horizontal si es fila).
  - `gap` — Espacio entre los elementos flex.
  - `flex-wrap: wrap` — Permite que los elementos pasen a la siguiente línea si no entran.

- **CSS Grid (`display: grid`)** — Sistema de layout bidimensional (filas Y columnas a la vez). Lo usamos para las tarjetas de temas, stats, y secciones con 2 columnas.
  - `grid-template-columns` — Define cuántas columnas y de qué tamaño. `repeat(3, 1fr)` crea 3 columnas iguales.
  - `1fr` — Unidad fraccional: reparte el espacio disponible proporcionalmente.

- **`position: fixed`** — Fija el elemento en la pantalla; no se mueve cuando scrolleás. Lo usamos para el nav.

- **`position: relative` y `position: absolute`** — `relative` hace que un elemento sea el punto de referencia, y `absolute` posiciona un hijo respecto a ese padre. Lo usamos para los "—" de la lista.

- **`z-index`** — Controla qué elemento se muestra "encima" de cuál. Número más alto = más arriba.

- **`backdrop-filter: blur()`** — Aplica un efecto de desenfoque al fondo que se ve detrás del elemento. Lo usamos en el nav para que al scrollear se vea un blur elegante.

- **`rgba(0, 0, 0, 0.85)`** — Color con transparencia. El cuarto valor (0.85) es la opacidad: 1 = sólido, 0 = invisible.

- **`transition`** — Anima suavemente un cambio de propiedad CSS (ej: cambio de color al hacer hover). Se define la propiedad a animar y la duración.

- **`transform: translateY(-2px)`** — Mueve un elemento visualmente sin afectar el layout. Lo usamos para el efecto de "elevación" en hover.

- **`border-radius`** — Redondea las esquinas de un elemento. Con `50%` se hace un círculo perfecto.

- **`min-height: 100vh`** — `vh` = viewport height (alto de la ventana). `100vh` significa que el elemento ocupa al menos toda la pantalla.

- **`max-width`** — Ancho máximo. El contenido puede ser más chico, pero nunca más ancho. Lo usamos en `.container` para que en pantallas grandes el contenido no se estire infinitamente.

- **`text-transform: uppercase`** — Muestra el texto en mayúsculas sin cambiar el HTML.

- **`letter-spacing`** — Espacio entre letras. Lo usamos en las etiquetas de stats para un look más espaciado.

- **`@media (max-width: 768px)`** — Media query: aplica estilos solo cuando el ancho de pantalla es 768px o menos (tablets y celulares). Es la base del diseño responsive.

- **`display: none`** — Oculta completamente un elemento. Lo usamos para esconder el nav en mobile.

- **`.visually-hidden`** — Técnica de accesibilidad: oculta un elemento visualmente pero lo mantiene accesible para lectores de pantalla. A diferencia de `display: none`, los lectores de pantalla SÍ lo leen.

- **`:hover`** — Pseudo-clase que aplica estilos cuando el mouse está encima del elemento.

- **`:focus-visible`** — Pseudo-clase que aplica estilos cuando un elemento recibe foco por teclado (Tab). Importante para accesibilidad — permite a usuarios que navegan sin mouse ver dónde están.

- **Google Fonts** — Servicio gratuito de tipografías web. Con `<link>` en el HTML cargamos las fuentes (Bebas Neue para títulos, Inter para cuerpo) y con `font-family` las aplicamos.

- **`position: sticky`** — Combinación de `relative` y `fixed`. El elemento scrollea normalmente hasta que llega a una posición definida con `top`, y ahí se "pega" a la pantalla. Lo usamos para que el texto de la sección "Qué es SWAP" quede fijo mientras las tarjetas de la derecha pasan.

- **`overflow: hidden`** — Oculta el contenido que se sale del borde del elemento. Lo usamos en el efecto de "text reveal" (el texto sube desde abajo, y el overflow esconde la parte que todavía no apareció).

- **`inset: 0`** — Atajo para `top: 0; right: 0; bottom: 0; left: 0`. Hace que un elemento absolute/fixed ocupe todo el espacio del padre.

- **`clamp(min, preferred, max)`** — Función CSS que define un tamaño fluido. Por ejemplo `clamp(3rem, 8vw, 6rem)` significa: "como mínimo 3rem, idealmente 8% del ancho de pantalla, como máximo 6rem". Perfecto para tipografía responsive sin media queries.

- **`will-change: transform`** — Le avisa al navegador que un elemento va a cambiar su `transform` pronto, para que optimice el rendimiento. Se usa en elementos con animaciones.

- **`pointer-events: none`** — Hace que un elemento sea "transparente" a los clics. Lo usamos en el overlay de ruido para que no bloquee la interacción con la página.

- **`@keyframes`** — Define una animación CSS paso a paso. Le das un nombre y los estados (desde `0%` hasta `100%`). Lo usamos para la línea del scroll indicator que sube y baja continuamente.

- **`animation`** — Aplica una `@keyframes` a un elemento. Podés definir duración, velocidad, repeticiones, etc. `infinite` hace que se repita para siempre.

- **`cubic-bezier()`** — Curva de velocidad personalizada para transiciones/animaciones. Controla cómo acelera y desacelera el movimiento. `cubic-bezier(0.16, 1, 0.3, 1)` crea un efecto que arranca rápido y frena suave.

- **`filter: blur(100px)`** — Aplica un desenfoque gaussiano a un elemento. Lo usamos en los "orbs" (círculos de color) para crear un efecto de luz difusa.

- **`flex-shrink: 0`** — En flexbox, le dice al elemento que NO se achique cuando falta espacio. Lo usamos en las topic cards del scroll horizontal para que mantengan su ancho fijo.

- **SVG en CSS (noise overlay)** — Usamos un SVG inline en el `background-image` (como data URI) para generar un patrón de ruido visual. `feTurbulence` es un filtro SVG que crea textura fractal. Le da profundidad y textura "analógica" al sitio.

- **`@media (prefers-reduced-motion: reduce)`** — Media query de accesibilidad que detecta si el usuario tiene activada la opción "reducir movimiento" en su sistema operativo. Si es así, desactivamos todas las animaciones para no causar mareos o molestias.

---

## JavaScript

- **`<script src="script.js">`** — Conecta un archivo JavaScript externo con el HTML, similar a cómo `<link>` conecta CSS. Va al final del `<body>` para que el HTML ya esté cargado cuando el script se ejecute.

- **`var`** — Declara una variable. Una variable es un "contenedor" con nombre donde guardás un valor (un número, un texto, un elemento de la página, etc.) para usarlo después.

- **`document.querySelectorAll('.clase')`** — Busca TODOS los elementos del HTML que tengan esa clase y devuelve una lista (NodeList). Es como decir "dame todos los elementos que tengan esta clase".

- **`document.querySelector('.clase')`** — Igual que `querySelectorAll` pero devuelve solo el PRIMER elemento que encuentre.

- **`document.getElementById('id')`** — Busca un elemento por su `id`. Más rápido que `querySelector` cuando buscás por id.

- **`IntersectionObserver`** — API del navegador que vigila elementos y te avisa cuando entran o salen de la pantalla (el "viewport"). Es mucho más eficiente que estar chequeando posiciones constantemente con scroll. Lo usamos para las animaciones de aparición: cuando un elemento entra en pantalla, le agregamos la clase "revealed".
  - `threshold: 0.15` — Se activa cuando el 15% del elemento es visible.
  - `rootMargin` — Ajusta los bordes de detección (como un padding invisible).
  - `observe(element)` — Empieza a vigilar un elemento.
  - `unobserve(element)` — Deja de vigilar un elemento (ahorra recursos).

- **`entry.isIntersecting`** — Propiedad booleana (true/false) que indica si el elemento observado está visible en la pantalla.

- **`element.classList`** — Permite manipular las clases CSS de un elemento sin reescribir todo el atributo `class`.
  - `.add('clase')` — Agrega una clase.
  - `.remove('clase')` — Saca una clase.
  - `.toggle('clase')` — Si la clase está, la saca. Si no está, la agrega. Devuelve `true` si la agregó.

- **`window.addEventListener('scroll', function)`** — Ejecuta una función cada vez que el usuario scrollea. El "evento" `scroll` se dispara continuamente mientras la página se mueve.

- **`addEventListener('click', function)`** — Ejecuta una función cuando el usuario hace clic en el elemento. Los "event listeners" son la forma principal de reaccionar a acciones del usuario.

- **`addEventListener('mousemove', function)`** — Se ejecuta cuando el mouse se mueve dentro del elemento. Lo usamos para el efecto de botones magnéticos.

- **`addEventListener('mouseleave', function)`** — Se ejecuta cuando el mouse sale del elemento.

- **`window.scrollY`** — Número que indica cuántos píxeles scrolleó el usuario desde arriba. Si estás al tope de la página, es 0.

- **`element.offsetTop`** — Distancia en píxeles desde el tope del documento hasta el elemento.

- **`element.offsetHeight`** — Altura total del elemento en píxeles.

- **`window.innerHeight`** — Altura de la ventana visible del navegador en píxeles.

- **`element.getBoundingClientRect()`** — Devuelve un objeto con la posición y tamaño del elemento relativo a la ventana visible. Útil para calcular dónde está el mouse respecto a un elemento.

- **`element.scrollWidth`** — Ancho total del contenido de un elemento, incluyendo lo que no se ve (lo que está fuera del overflow).

- **`element.style.transform = '...'`** — Modifica el CSS `transform` del elemento directamente desde JavaScript. Lo usamos para mover los orbs (parallax) y los botones magnéticos.

- **`element.setAttribute('aria-expanded', valor)`** — Cambia un atributo HTML del elemento. Lo usamos para actualizar atributos de accesibilidad cuando abrimos/cerramos el menú mobile.

- **`Math.max()` y `Math.min()`** — Funciones matemáticas. `Math.max(0, valor)` asegura que el resultado nunca sea menor a 0. `Math.min(1, valor)` asegura que nunca sea mayor a 1. Combinados, "clampean" un valor entre 0 y 1.

- **`forEach(function)`** — Ejecuta una función para cada elemento de una lista. Es como un loop que recorre todos los items uno por uno.

- **`window.matchMedia('(max-width: 768px)').matches`** — Consulta desde JavaScript si se cumple una media query CSS. Devuelve `true` o `false`. Lo usamos para desactivar el scroll horizontal en mobile.

- **`'ontouchstart' in window`** — Forma de detectar si el dispositivo tiene pantalla táctil. Si existe el evento `touchstart`, es un dispositivo touch. Lo usamos para desactivar el efecto de botones magnéticos en celulares (no tienen mouse).

---

## React

*(concepts will be added as we build)*

---

## Next.js

*(concepts will be added as we build)*

---

## CI/CD & Deployment

*(concepts will be added as we build)*

---
