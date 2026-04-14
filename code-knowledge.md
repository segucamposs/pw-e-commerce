# Code Knowledge — pw-e-commerce

A plain-language glossary of every new concept used in this project. Organized by topic so you can study and explain each concept in your own words during the oral exam.

---

## HTML

### Semantic Tags
HTML5 tags that describe what the content *is*, not just how it looks. The browser and screen readers use these to understand the page structure.
- `<header>` — the top part of the page (logo, nav)
- `<nav>` — a block of navigation links
- `<main>` — the primary content of the page (only one per page)
- `<section>` — a thematic chunk of content, usually with a heading
- `<footer>` — the bottom of the page (copyright, links)
- `<form>` — an interactive area where users fill in data

### ARIA Attributes
"Accessible Rich Internet Applications" — extra attributes that tell screen readers things HTML alone can't express.
- `aria-label="..."` — gives a name to an element that has no visible text label
- `aria-expanded="true/false"` — tells screen readers whether a toggle (like a menu) is open or closed
- `aria-controls="id"` — says "this button controls that element"
- `aria-required="true"` — marks a form field as required for assistive tech
- `aria-live="polite"` — tells screen readers to announce changes to this element (used for form error messages)
- `role="list"` — needed when a `<ul>` has `list-style: none` in CSS (otherwise Safari VoiceOver won't announce it as a list)
- `role="alert"` — announces the content immediately to screen readers (used for errors)
- `role="status"` — announces content politely (used for success messages)

### `<meta>` Tags
Tags inside `<head>` that give browsers and search engines information about the page.
- `charset="UTF-8"` — tells the browser what character encoding to use (supports Spanish characters like ñ, á, é)
- `name="viewport"` — controls how the page scales on mobile devices
- `name="description"` — the text that appears under the page title in Google search results

### Form Elements
- `<label for="id">` — links a text label to an input; clicking the label focuses the input
- `<input type="text">` — single-line text field
- `<input type="email">` — email field; mobile keyboards show @ automatically; browsers do basic format validation
- `<textarea>` — multi-line text field
- `novalidate` on `<form>` — disables the browser's built-in validation so we can do our own custom validation in JS
- `autocomplete="name"` — tells the browser to offer saved values for this field

### Skip Link
A visually hidden link at the very top of the page. When a keyboard user hits Tab, the first thing they can focus is "Skip to main content", which jumps past the navigation. Required for WCAG compliance.

---

## CSS

### Custom Properties (CSS Variables)
Values stored with a name so you can reuse them throughout the file. Defined inside `:root` (the whole document). Changed in one place → updates everywhere.
```css
:root { --accent: #C8FF00; }
.button { background: var(--accent); }
```

### `clamp(min, preferred, max)`
A function that sets a value that scales fluidly between a minimum and maximum. Used for responsive font sizes without media queries.
```css
font-size: clamp(4rem, 11vw, 9.5rem);
/* → never smaller than 4rem, never bigger than 9.5rem, scales with viewport */
```

### CSS Grid
A two-dimensional layout system. You define rows and columns, and place children inside the grid cells.
```css
display: grid;
grid-template-columns: 1fr 1fr; /* two equal columns */
gap: 5rem;                       /* space between cells */
```

### Flexbox
A one-dimensional layout system. Arranges children in a row or column. Used for nav, buttons, cards, and anything that needs alignment.
```css
display: flex;
align-items: center;   /* vertical alignment */
justify-content: space-between; /* horizontal spacing */
```

### CSS Transitions
Smoothly animate a property from one value to another when something changes (like a hover or a class being added).
```css
transition: background 0.3s ease, transform 0.3s ease;
```
The three parts: *what property*, *how long*, *the timing curve* (ease = starts fast, slows down).

### CSS Animations (`@keyframes`)
Define a sequence of states that play automatically (not triggered by hover/click). Used for the floating orbs and the marquee ticker.
```css
@keyframes marquee-scroll {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
.marquee-track { animation: marquee-scroll 30s linear infinite; }
```

### `transform`
Visually moves, scales, or rotates an element *without* affecting surrounding layout. Much more performant than changing `top`/`left`.
- `translateY(-2px)` — move 2px up
- `translateX(-50%)` — move left by 50% of the element's own width

### `filter: blur()`
Applies a blur effect. Used on the background orbs to create a soft, glowing gradient effect.

### `backdrop-filter: blur()`
Blurs everything *behind* the element. Used on the navbar when it's scrolled, creating the frosted-glass effect.

### `position: fixed`
Locks an element relative to the viewport — it stays in place as you scroll. Used for the navbar.

### `position: absolute`
Positions an element relative to its nearest positioned ancestor. Used for the hero background orbs.

### `overflow: hidden`
Hides anything that sticks out beyond the element's box. Used on the marquee so the text clips at the edges.

### `prefers-reduced-motion`
A media query that detects if the user has enabled "Reduce Motion" in their OS accessibility settings. We disable all animations for these users.
```css
@media (prefers-reduced-motion: reduce) {
  * { animation-duration: 0.01ms !important; }
}
```

### Scoped CSS Variables
Custom properties can be set on a specific element using `style="--var: value"` in HTML. Each topic card has its own color this way:
```html
<li class="tema-card" style="--tema-color: #C8FF00">
```
```css
.tema-card { border-top: 3px solid var(--tema-color); }
```

### `max-width` + `margin: 0 auto`
The standard pattern for centering a block of content with a maximum width. Used for `.container`.

---

## JavaScript

### `querySelector` / `querySelectorAll`
Methods to select HTML elements from JS using CSS selectors.
- `document.querySelector('.header')` — returns the first matching element
- `document.querySelectorAll('.reveal')` — returns all matching elements (a NodeList)

### `classList`
An object that lets you add, remove, and toggle CSS classes on an element from JS.
- `el.classList.add('revealed')` — adds the class
- `el.classList.remove('scrolled')` — removes the class
- `el.classList.toggle('open')` — adds if absent, removes if present; returns true/false

### Event Listeners
Functions that run when something happens (user clicks, scrolls, etc.).
```js
button.addEventListener('click', () => { ... });
window.addEventListener('scroll', () => { ... }, { passive: true });
```
`passive: true` on scroll tells the browser we won't call `preventDefault()`, allowing it to scroll more smoothly.

### `IntersectionObserver`
An API that watches elements and calls a function when they enter or leave the viewport. Much more efficient than listening to the scroll event and checking element positions manually.
```js
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) { /* element is visible */ }
  });
}, { threshold: 0.1 }); // fires when 10% of element is visible

observer.observe(element);    // start watching
observer.unobserve(element);  // stop watching (used after first reveal)
```

### `requestAnimationFrame`
Asks the browser to call a function just before the next screen repaint (~60 times per second). Used for the stats counter animation so it syncs with the display refresh rate and never wastes resources.

### `performance.now()`
Returns the time (in milliseconds) since the page loaded. Used to track how long the counter animation has been running.

### `dataset`
Lets JS read `data-*` attributes from HTML elements.
```html
<span data-target="50">0</span>
```
```js
const target = parseInt(el.dataset.target, 10); // → 50
```

### `parseInt(value, 10)`
Converts a string to an integer. The `10` specifies base-10 (decimal). Always include the base to avoid bugs.

### `event.preventDefault()`
Stops the browser's default behavior for an event. Used on form submit to prevent the page from reloading — we handle the data in JS instead.

### `String.trim()`
Removes whitespace from both ends of a string. Used to clean up form input before validating.
```js
"  Segu  ".trim() // → "Segu"
```

### Arrow Functions `() => {}`
A shorter syntax for writing functions in modern JavaScript (ES6+).
```js
const greet = (name) => `Hola, ${name}`;
```

### `const` / `let`
- `const` — declares a variable that won't be reassigned. Use by default.
- `let` — declares a variable that *can* be reassigned.
Both are block-scoped (only exist within the `{}` they're declared in). Never use `var`.

### Template Literals
Strings that can embed expressions using backticks and `${}`.
```js
const msg = `Hola, ${nombre}!`;
```

### Module Pattern (IIFE-style functions)
Each feature (scrollReveal, navbarScroll, etc.) is wrapped in its own function and called at the bottom of the file. This keeps the code organized and avoids variables from different features colliding.

### `async` / `await`
A modern way to write code that waits for something to finish (like a network request) without blocking everything else. `async` marks a function as asynchronous; `await` pauses inside that function until a Promise resolves.
```js
const submit = async () => {
  const result = await fetch('/api/data'); // waits for response
  const data = await result.json();        // waits for JSON parsing
};
```
If the awaited operation fails, it throws an error — caught with `try/catch`.

---

## Accessibility Patterns

### ARIA Tab Pattern
A tab interface has three key roles that assistive tech understands:
- `role="tablist"` — the container that holds the tab buttons
- `role="tab"` — each clickable tab button; has `aria-selected="true/false"` and `aria-controls="panel-id"`
- `role="tabpanel"` — each content panel; has `aria-labelledby="tab-id"`

The `hidden` attribute (native HTML) hides inactive panels from both visual display and screen readers — no CSS needed.

Keyboard navigation: Arrow keys move focus between tabs within the tablist. This is implemented manually in JS since it differs from standard Tab key behavior.

```html
<div role="tablist">
  <button role="tab" aria-selected="true" aria-controls="panel-1" id="tab-1">Spotify</button>
  <button role="tab" aria-selected="false" aria-controls="panel-2" id="tab-2" tabindex="-1">YouTube</button>
</div>
<div id="panel-1" role="tabpanel" aria-labelledby="tab-1">...</div>
<div id="panel-2" role="tabpanel" aria-labelledby="tab-2" hidden>...</div>
```

`tabindex="-1"` on inactive tabs removes them from the Tab key order — only the active tab is reachable by Tab; inactive ones are reached by arrow keys.

### `<details>` / `<summary>` (Native Accordion)
A built-in HTML element that shows/hides content without any JavaScript. The `<summary>` is always visible; clicking it toggles the `open` attribute on `<details>`.
```html
<details>
  <summary>¿Cuánto dura?</summary>
  <p>Alrededor de 1 hora.</p>
</details>
```
CSS can target the open state with `details[open] summary { ... }`.

### `position: fixed` (Floating Action Button)
An element with `position: fixed` stays in the same spot on screen regardless of scrolling — positioned relative to the viewport, not the page. Used for the WhatsApp FAB pinned to the bottom-right corner.
```css
.whatsapp-fab {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 200; /* stays on top of all other content */
}
```

---

## React

### Component
A JavaScript function that returns JSX (HTML-like markup). The building block of every React app. Components start with a capital letter so React can tell them apart from plain HTML tags.
```jsx
function Button({ label }) {
  return <button className="btn">{label}</button>;
}
```

### JSX
A syntax extension that lets you write HTML-like code inside JavaScript. Under the hood it compiles to `React.createElement(...)` calls. Key differences from HTML:
- `class` → `className` (class is a reserved word in JS)
- `for` → `htmlFor` (same reason)
- All tags must be closed: `<img />`, `<br />`
- Event names are camelCase: `onClick`, `onChange`, `onKeyDown`
- Inline styles use objects: `style={{ color: 'red' }}`

### Props
Data passed from a parent component to a child, like HTML attributes. The child receives them as a single `props` object (or you can destructure them directly).
```jsx
// Parent
<Nav navigate={navigate} />

// Child
function Nav({ navigate }) { ... }
```
Props flow **down** — a child cannot change its parent's props.

### `useState`
A React hook that adds state (memory) to a functional component. Returns a pair: the current value and a setter function. Calling the setter triggers a re-render.
```jsx
const [count, setCount] = useState(0);
// count = current value
// setCount(1) = update to 1 and re-render
```
Used in this project for: `page` (current route), `menuOpen` (mobile nav), `activeTab` (listen tabs), `form` (input values), `errors`, `status`, `submitting`.

### `useEffect`
A React hook for side effects — anything that touches the outside world (DOM, timers, event listeners, fetch calls). Runs *after* the component renders.
```jsx
useEffect(() => {
  // code that runs after render
  return () => { /* cleanup runs before next effect or unmount */ };
}, [dependency]); // re-runs only when `dependency` changes
```
Empty array `[]` = runs once (like componentDidMount). No array = runs after every render.

### `useRef`
A React hook that holds a mutable value that does NOT trigger re-renders when changed. Also used to get a direct reference to a DOM element.
```jsx
const headerRef = useRef(null);
// In JSX: <header ref={headerRef}>
// In JS:  headerRef.current.classList.add('scrolled')
```
Used instead of `document.querySelector()` — safer in React because components can mount/unmount.

### Custom Hooks
A function that starts with `use` and calls other hooks inside. It extracts repeated logic so multiple components can share it.
```js
// src/hooks/useScrollReveal.js
function useScrollReveal() {
  useEffect(() => {
    // IntersectionObserver setup...
  }, []);
}
// Any component can call: useScrollReveal();
```

### SPA Routing (without react-router)
Single Page Application navigation using only `useState`. The app never reloads the browser — it just swaps which component renders.
```jsx
const [page, setPage] = useState('home');
const navigate = (target) => { setPage(target); window.scrollTo(0, 0); };

{page === 'home' ? <HomePage navigate={navigate} /> : <GuestPage navigate={navigate} />}
```
`navigate` is passed as a prop so child components can trigger page changes.

### Controlled Inputs
In React, form inputs are "controlled" when their value is driven by state. Every keystroke updates state, and state sets the value — React owns the input.
```jsx
const [form, setForm] = useState({ nombre: '' });
const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

<input name="nombre" value={form.nombre} onChange={handleChange} />
```
`[e.target.name]` is computed property syntax — it dynamically uses the input's name attribute as the key.

### CRA Project Structure
Create React App generates a standard layout:
- `public/index.html` — the shell HTML page; React injects the app into `<div id="root">`
- `src/index.js` — the entry point that calls `ReactDOM.createRoot().render()`
- `src/App.js` — the root component (conventionally)
- `%PUBLIC_URL%` — a CRA variable in `public/index.html` that resolves to the public folder path

### `key` Prop in Lists
When rendering a list with `.map()`, React needs a unique `key` on each element to track which items changed.
```jsx
{episodes.map((ep) => (
  <article key={ep.id}>...</article>
))}
```
Never use the array index as a key if items can be reordered — use a stable unique ID.

### Conditional Rendering
JSX supports rendering content conditionally using `&&` (render if true) or ternary `? :`.
```jsx
{errors.nombre && <span className="form-error">{errors.nombre}</span>}
{submitting ? 'Enviando...' : 'Quiero participar →'}
```

### Multi-Step Form State
Instead of a boolean `submitted`, use a string `status` to represent multiple phases:
```jsx
const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'success' | 'error'
```
This is cleaner than multiple booleans because each phase is mutually exclusive — it's impossible to be both "submitting" and "success" at the same time. Used in `NewsletterForm.js`.

### `<iframe>` — Embedding Third-Party Content
`<iframe>` lets you embed another webpage or player inside your page. Common uses: YouTube/Spotify embeds, maps.
```jsx
<iframe
  src="https://open.spotify.com/embed/show/..."
  width="100%" height="152"
  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
  loading="lazy"
  title="SWAP Podcast en Spotify"
></iframe>
```
- `allow` — grants the iframe specific browser permissions (autoplay, clipboard, etc.)
- `loading="lazy"` — defers loading until the iframe is near the viewport (performance)
- `title` is required for accessibility (screen readers announce it)
- `frameBorder="0"` removes the default browser border

### `sr-only` — Visually Hidden but Accessible
A CSS pattern to hide an element visually while keeping it in the DOM for screen readers. Used for form labels when the label is redundant with the placeholder.
```css
.sr-only {
  position: absolute;
  width: 1px; height: 1px;
  padding: 0; margin: -1px;
  overflow: hidden;
  clip: rect(0,0,0,0);
  white-space: nowrap;
  border: 0;
}
```
Never use `display: none` or `visibility: hidden` to "hide" labels — that makes the form inaccessible.

### `<blockquote>` + `<footer>` — Semantic Quotes
The correct HTML for a pull quote or testimonial is `<blockquote>` (the quote) + `<footer>` (the attribution). This tells screen readers and search engines "this is a citation."
```html
<blockquote>
  <p>"Cada episodio me da algo para aplicar."</p>
  <footer>Rodrigo M. · Buenos Aires</footer>
</blockquote>
```
