# Arquitectura — Feynman

## La idea general
Cuando alguien abre el sitio, el request viaja por capas hasta llegar al código. El diagrama muestra esas capas de arriba a abajo.

---

## Las capas

**GitHub → Vercel** — cada `git push` hace el deploy automático. El usuario habla con Vercel, no con tu máquina.

**layout.js** — el marco que envuelve todas las páginas. Ahí van Nav, fuentes y WhatsAppFab. Es Server Component: se ejecuta en el servidor, el browser recibe HTML puro, sin JS.

**Rutas** — Next.js usa las carpetas como URLs. La carpeta `app/tienda/` crea la URL `/tienda`. El archivo `page.js` adentro es lo que se ejecuta. `[id]` significa dinámico — funciona para cualquier número.

**Views** — la pantalla completa. Tienen `'use client'` porque usan `useState`, `useEffect` y eventos — cosas que solo existen en el browser.

**Componentes** — piezas reutilizables que arman la View. Como LEGO: `ProductCard`, `CartDrawer`, `Nav`, etc. Si cambiás uno, se actualiza en todos lados.

**Hooks** — lógica de React extraída para reutilizar. `useCart` maneja el carrito desde cualquier componente. `useScrollReveal` detecta el scroll con IntersectionObserver.

**data/products.js** — array de productos inventados. En E5 lo reemplaza Supabase (base de datos real).

---

## Flujo principal — buscar en la tienda

`TiendaView` → `fetch('/api/products?search=...')` → el API Route filtra `data/products.js` → devuelve JSON → la View renderiza las tarjetas.

---

## Las dos preguntas clave

**Server vs Client Component** — Server corre en el servidor, manda HTML. Client corre en el browser, puede tener estado y eventos.

**Componente vs View** — la View es la pantalla completa. El componente es una pieza de esa pantalla. Las Views importan componentes, no al revés.

---

## Script — cómo explicar el diagrama

> Leelo una vez antes de entrar. No lo leas en voz alta, usalo para internalizar el orden.

---

*"El diagrama muestra cómo está organizado el proyecto por capas, de arriba a abajo, siguiendo el camino que hace un request cuando alguien abre el sitio."*

*"Arriba está la infraestructura: el código vive en GitHub, y cada vez que hago un push, Vercel lo detecta y hace el deploy automáticamente. El usuario siempre habla con Vercel."*

*"Cuando llega un request, lo primero que ejecuta Next.js es el layout.js. Ese archivo es el marco que envuelve todas las páginas — ahí puse la barra de navegación, las fuentes y el botón de WhatsApp. Es un Server Component, o sea que corre en el servidor y el browser recibe HTML puro, sin JavaScript extra."*

*"Después Next.js mira la URL y decide qué ruta mostrar. Yo uso el sistema de carpetas de Next.js: si la carpeta se llama `tienda`, la URL es `/tienda`. El archivo `page.js` adentro es el que se ejecuta. El `[id]` entre corchetes significa que es dinámico — funciona para cualquier producto."*

*"Cada ruta carga su View, que es la pantalla completa. Las Views tienen `'use client'` porque usan estado y eventos del usuario — cosas que solo existen en el browser."*

*"Las Views no tienen todo el código adentro — están compuestas por componentes más chicos y reutilizables. Por ejemplo, `ProductCard` es la tarjeta de cada producto. Si la modifico, se actualiza en toda la tienda automáticamente."*

*"Abajo del todo están los hooks, los datos y los estilos. Los hooks son lógica de React que extraje para reutilizar: `useCart` maneja el carrito desde cualquier componente, y `useScrollReveal` detecta cuando un elemento entra en la pantalla al hacer scroll. Los productos por ahora son un array en JavaScript — en la próxima entrega lo reemplazo con Supabase."*

*"Un flujo concreto para mostrar cómo fluyen los datos: cuando el usuario busca algo en la tienda, `TiendaView` hace un fetch al endpoint `/api/products`, el API Route filtra el array de productos y devuelve JSON, y la View renderiza las tarjetas filtradas."*

---

## Script — Presentación Primer Parcial

> Script completo slide por slide. No leer en voz alta — internalizar el orden y las transiciones.

---

### SLIDE 1 — Portada (SWAP.)
> *~20 seg*

Buenas, soy Segundo Campos. Lo que les voy a presentar hoy es el proyecto de Programación Web que construí durante las primeras nueve semanas de la materia. El proyecto está basado en SWAP, que es el podcast que cohosteamos con Francisco Bottaro.

---

### SLIDE 2 — ¿Para qué es la página web de SWAP?
> *~40 seg*

Lo primero que hay que entender es **para qué existe** esta página. No es una landing genérica — tiene un caso de uso muy específico: cuando alguien escanea el QR que aparece en nuestros episodios, lo primero que ve es la home de SWAP. En cinco segundos tiene que entender qué es el podcast, si le resuena, y si quiere escucharlo o participar como invitado. Todo lo que construí gira en torno a esa experiencia.

---

### SLIDE 3 — ¿Cómo está organizada? *(transition)*
> *~5 seg*

Entonces, ¿cómo está organizada la página?

---

### SLIDE 4 — Home Page
> *~30 seg*

La home tiene la navegación principal con cuatro secciones. El hero dice "Aprende de quienes están en el proceso" — que es el tagline de SWAP. Desde acá podés ir a escuchar en Spotify, conocer el podcast, o hacer clic en "Quiero ser invitado" para ir a la página de invitados.

---

### SLIDE 5 — Invitados
> *~30 seg*

La ruta `/invitado` es la que más importa en la práctica: es la que llega quien escanea el QR. Muestra qué buscamos en un invitado —no expertos, sino gente con algo genuino para contar—, los temas que tratamos, y los datos de los dos hosts. Al final tiene un formulario para postularse.

---

### SLIDE 6 — Merch
> *~30 seg*

La tercera ruta es `/tienda`, que en E4 renombré a Merch. Es la parte e-commerce del proyecto: tiene búsqueda, filtros por categoría —remeras, buzos, accesorios—, y al hacer clic en un producto te lleva a `/tienda/[id]` con el detalle. El carrito es un drawer que se abre desde cualquier parte de la tienda.

---

### SLIDE 7 — Arquitectura del Proyecto
> *~90 seg*

Este diagrama muestra cómo está estructurado todo el proyecto técnicamente. Arriba a la izquierda está la infraestructura: el código vive en GitHub, y cada push a main dispara un deploy automático en Vercel.

Abajo tenemos el layout global — el `layout.js` que es un **Server Component**. Carga las fuentes, el favicon, el WhatsAppFab y los estilos globales. Todo lo que está dentro de ese layout se comparte entre todas las rutas.

Dependiendo de la URL, Next.js renderiza la vista correspondiente. Hay seis rutas: `/`, `/invitado`, `/tienda`, `/tienda/[id]`, `/redes`, y dos rutas de API: `/api/products` y `/api/episodes`.

Las vistas importan componentes — Nav, ProductCard, CartDrawer, GuestForm, y demás. Y todos esos componentes que tienen estado o eventos son **Client Components**, marcados con `'use client'`.

Abajo en los flujos de datos: el carrito usa un custom hook `useCart` que conecta ProductCard con CartDrawer y termina en CheckoutView. La tienda filtra productos haciendo fetch a `/api/products`, que lee del array en `data/products.js` y devuelve JSON. Y el scroll reveal usa Intersection Observer para animar las secciones al hacer scroll.

---

### SLIDE 8 — CI/CD: Deploy Automático
> *~40 seg*

El flujo de deploy es así: durante el desarrollo trabajo en `localhost:3000` con `npm run dev`. Cuando hago un commit y lo pusheo a GitHub, Vercel detecta automáticamente el cambio y lanza el build. Si es un push a una rama de feature, hace un **preview deploy** — una URL temporal para probar. Si es a main, va directo al dominio de producción. Todo eso sin hacer nada manual.

---

### SLIDE 9 — Fundamentos Técnicos
> *~90 seg*

Acá tengo ejemplos concretos del código real del proyecto para cada tecnología.

**HTML** — en `HomeView.js` usé HTML semántico: `<main>`, `<section>` con `id`, y `aria-labelledby` apuntando al `h1`. Eso permite que los lectores de pantalla naveguen por secciones con sentido.

**CSS** — en `globals.css` definí design tokens centralizados con variables CSS, como `--bg`, `--accent`, `--radius`. Eso significa que si cambio el color de acento en un solo lugar, cambia en toda la app.

**JavaScript** — en `TiendaView.js` implementé un debounce para la búsqueda. En lugar de hacer un fetch con cada tecla, espera 300 milisegundos desde la última pulsación antes de buscar. Eso evita saturar el servidor con requests innecesarios.

**React** — el estado del carrito vive en `TiendaView` y baja por props a `ProductCard` y `CartDrawer`. Los hijos no tienen su propio estado del carrito — reciben lo que necesitan y emiten eventos hacia arriba.

**Next.js** — la estructura de carpetas define las rutas automáticamente. `page.js` en `tienda/` es la ruta `/tienda`. `[id]` en corchetes es el parámetro dinámico. Y `'use client'` al principio de un archivo es lo que le dice a Next.js que ese componente corre en el browser, no en el servidor.

---

### SLIDE 10 — Uso de la IA *(transition)*
> *~5 seg*

Ahora, el tema que creo que tiene más peso práctico: cómo usé la inteligencia artificial.

---

### SLIDE 11 — Uso de la IA — Principios y Herramientas
> *~60 seg*

Usé tres herramientas: **Claude Code** como agente principal dentro del editor, **Google Gemini** para generar las imágenes de los productos del merch, y **Vercel's AI** para algunas sugerencias de deploy.

Pero más allá de las herramientas, aprendí cuatro principios que hacen que la IA funcione bien:

Primero, **entender antes de pedir**. Siempre diseñé la solución mentalmente antes de pedirle código. Si no entendés lo que querés construir, la IA tampoco lo va a entender.

Segundo, **contexto específico**. Cada prompt incluía las restricciones del curso: "solo HTML, CSS, JS, React y Next.js, sin librerías externas". Sin eso, la IA agrega dependencias innecesarias.

Tercero, **validar siempre**. Cada cambio lo probaba en el browser antes de hacer commit. El hecho de que compile no significa que funciona.

Cuarto, **documentar todo**. Todos mis prompts quedaron en `PROMPTS.md` con fecha y resultado. Eso me permitió rastrear qué generé y por qué.

---

### SLIDE 12 — Problemas con la IA *(transition)*
> *~5 seg*

Ahora los problemas que tuve, porque los hubo.

---

### SLIDES 13-15 — Problema 1: La IA inventó una función que no existe
> *~60 seg*

El primero fue cuando le pedí *"turn all the page into next.js"* — un prompt muy vago. La IA generó un patrón que no existe en Next.js: una función `App()` que manejaba las rutas con `useState` y pasaba `navigate` como prop a las vistas.

En Next.js la navegación no funciona así. El patrón correcto es usar `useRouter` de `next/navigation` y llamar `router.push('/tienda')`. La IA alucinó un patrón de React SPA puro y lo metió en un proyecto Next.js.

¿Por qué pasó? Porque el prompt fue demasiado amplio y sin contexto. La IA no sabía que estábamos en App Router de Next.js 15.

Acá en el dashboard de Vercel pueden ver el historial de deploys — varios con error en rojo que son exactamente de esa etapa donde tuve que ir corrigiendo de a poco.

---

### SLIDE 16 — Problema 2: Interfaz en celular rota
> *~40 seg*

El segundo problema fue el menú mobile. La IA generó un navbar que en desktop se veía bien, pero en mobile el logo y los links se pisaban completamente. El issue específico era el orden del flexbox en el menú abierto.

Lo corregí manualmente: el logo va arriba, los links centrados abajo, con `flex-direction: column`. Parece simple, pero la IA generó varias iteraciones malas antes de llegar a eso. La lección fue que los bugs visuales los tenés que reproducir en el browser — no podés confiar en que la IA "vea" lo que ve el usuario.

---

### SLIDE 17 — Problema 3: Olvidarme de usar Plan Mode
> *~30 seg*

El tercero es más de workflow: al principio no usaba el Plan Mode de Claude Code. Le pedía cambios directamente y el agente empezaba a editar archivos sin que yo aprobara el approach. Cuando empecé a activar Plan Mode primero, podía revisar la estrategia antes de que tocara el código. Evitó varios commits de "revert".

---

### SLIDE 18 — Problema 4: 5 prompts para cambiar un botón
> *~40 seg*

Y el cuarto, que es el más honesto: tardé cinco prompts para cambiar un botón. Los prompts fueron vagos e incrementales — "I want the button to say...", "and a better arrow", "change the arrow"... Cada prompt corregía el anterior en lugar de definir el resultado desde el principio.

¿Por qué pasó? Porque no tuve claro qué quería antes de empezar a pedirlo.

---

### SLIDE 19 — Buena práctica: el prompt que funcionó en un paso
> *~45 seg*

El contraste a eso fue cuando construí la tienda de merch. El prompt fue: *"I want to build a merch store in the website. This is just for the uni subject, not for production in real life, so I would like to build this on a new branch."*

Resultado correcto en un solo paso. ¿Por qué funcionó? Porque tenía tres elementos: qué quiero construir, para qué contexto es, y cuáles son las restricciones de scope. La fórmula es: **qué quiero + para qué es + restricciones = prompt que genera el resultado esperado**.

---

### SLIDE 20 — Cierre
> *~15 seg*

Eso es todo. Si quieren ver el proyecto en vivo, acá está el QR. Muchas gracias.

---

**Duración estimada total: ~9 min 30 seg**

---

> **Notas de timing:**
> - Slide 7 (arquitectura) es el más denso — expandí si preguntan, comprimí si van rápido.
> - Slide 9 (fundamentos técnicos) es donde más pueden repreguntar en el oral — esos ejemplos de código son exactamente lo que evalúan.
> - El dashboard de Vercel (slide 15) es transición visual — señalá los deploys en rojo para darle concreción al problema 1.
