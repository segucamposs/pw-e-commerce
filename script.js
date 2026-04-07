/* ================================
   SWAP Podcast — Interactions
   ================================ */

/* ---------- Scroll Reveal (Intersection Observer) ---------- */

// Seleccionamos todos los elementos que tienen la clase "reveal" o "text-reveal"
var revealElements = document.querySelectorAll('.reveal, .text-reveal');

// Creamos un observador que detecta cuando un elemento entra en pantalla
var revealObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    // Si el elemento es visible en el viewport, le agregamos "revealed"
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      // Dejamos de observarlo para que no se repita
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.15,  // Se activa cuando el 15% del elemento es visible
  rootMargin: '0px 0px -50px 0px'  // Margen para activar un poco antes de llegar al borde
});

// Registramos cada elemento para que el observador lo vigile
revealElements.forEach(function (element) {
  revealObserver.observe(element);
});

/* ---------- Navbar: background on scroll ---------- */

var header = document.getElementById('site-header');

window.addEventListener('scroll', function () {
  // Si scrolleamos más de 50px, le ponemos fondo al nav
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

/* ---------- Mobile Nav Toggle ---------- */

var navToggle = document.querySelector('.nav-toggle');
var navLinks = document.getElementById('nav-links');

navToggle.addEventListener('click', function () {
  var isOpen = navLinks.classList.toggle('open');
  navToggle.classList.toggle('active');
  // Actualizamos el atributo aria para accesibilidad
  navToggle.setAttribute('aria-expanded', isOpen);
  navToggle.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
});

// Cerrar menú al hacer clic en un link
navLinks.querySelectorAll('a').forEach(function (link) {
  link.addEventListener('click', function () {
    navLinks.classList.remove('open');
    navToggle.classList.remove('active');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Abrir menú');
  });
});

/* ---------- Horizontal Scroll (Topics Section) ---------- */

var horizontalSection = document.querySelector('.horizontal-section');
var horizontalTrack = document.getElementById('horizontal-track');

// Solo activamos el scroll horizontal en pantallas grandes
var isMobile = window.matchMedia('(max-width: 768px)').matches;

if (!isMobile) {
  window.addEventListener('scroll', function () {
    // Calculamos la posición de la sección en la página
    var sectionTop = horizontalSection.offsetTop;
    var sectionHeight = horizontalSection.offsetHeight;
    var viewportHeight = window.innerHeight;

    // Cuánto scrolleamos dentro de esta sección (de 0 a 1)
    var scrollProgress = (window.scrollY - sectionTop) / (sectionHeight - viewportHeight);

    // Limitamos el progreso entre 0 y 1
    var clampedProgress = Math.max(0, Math.min(1, scrollProgress));

    // Calculamos cuánto mover el track horizontalmente
    var trackWidth = horizontalTrack.scrollWidth;
    var containerWidth = window.innerWidth;
    var maxTranslate = trackWidth - containerWidth + 80; // +80 por el padding

    horizontalTrack.style.transform = 'translateX(' + (-clampedProgress * maxTranslate) + 'px)';
  });
}

/* ---------- Magnetic Buttons ---------- */

// Solo en dispositivos con mouse (no touch)
var hasTouch = 'ontouchstart' in window;

if (!hasTouch) {
  var magneticElements = document.querySelectorAll('.btn-magnetic');

  magneticElements.forEach(function (element) {
    element.addEventListener('mousemove', function (event) {
      // Calculamos la posición del mouse relativa al centro del botón
      var rect = element.getBoundingClientRect();
      var x = event.clientX - rect.left - rect.width / 2;
      var y = event.clientY - rect.top - rect.height / 2;

      // Movemos el botón un 30% de la distancia del mouse
      element.style.transform = 'translate(' + (x * 0.3) + 'px, ' + (y * 0.3) + 'px)';
    });

    element.addEventListener('mouseleave', function () {
      // Volvemos a la posición original
      element.style.transform = 'translate(0px, 0px)';
    });
  });
}

/* ---------- Parallax Hero Orbs ---------- */

var heroOrbs = document.querySelectorAll('.hero-bg .orb');

if (!isMobile && !hasTouch) {
  window.addEventListener('scroll', function () {
    var scrollY = window.scrollY;
    // Movemos los orbs más lento que el scroll para crear profundidad
    heroOrbs.forEach(function (orb, index) {
      var speed = 0.3 + (index * 0.1); // Cada orb se mueve a distinta velocidad
      orb.style.transform = 'translateY(' + (scrollY * speed) + 'px)';
    });
  });
}
