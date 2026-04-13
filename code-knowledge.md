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
