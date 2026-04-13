const scrollReveal = () => {
  const elements = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  elements.forEach((el) => observer.observe(el));
};

const navbarScroll = () => {
  const header = document.querySelector('.header');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });
};

const mobileNav = () => {
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.querySelector('.nav-menu');

  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('nav-menu--open');
    toggle.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  menu.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', () => {
      menu.classList.remove('nav-menu--open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });
};

const statsCounter = () => {
  const numbers = document.querySelectorAll('.stat-number');

  const animateCount = (el, target, duration) => {
    const start = performance.now();

    const step = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target);

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  };

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.dataset.target, 10);
        if (prefersReducedMotion) {
          entry.target.textContent = target;
        } else {
          animateCount(entry.target, target, 1500);
        }
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  numbers.forEach((el) => observer.observe(el));
};

const formHandler = () => {
  const form = document.getElementById('contacto-form');
  if (!form) return;

  const status = document.getElementById('form-status');

  const showError = (inputId, errorId, message) => {
    const input = document.getElementById(inputId);
    const error = document.getElementById(errorId);
    input.classList.add('input-error');
    error.textContent = message;
  };

  const clearErrors = () => {
    form.querySelectorAll('.form-input').forEach((input) => {
      input.classList.remove('input-error');
    });
    form.querySelectorAll('.form-error').forEach((el) => {
      el.textContent = '';
    });
    status.textContent = '';
    status.className = 'form-status';
  };

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    clearErrors();

    const nombre = document.getElementById('nombre').value.trim();
    const email = document.getElementById('email').value.trim();
    const tema = document.getElementById('tema').value.trim();
    let valid = true;

    if (!nombre) {
      showError('nombre', 'nombre-error', 'Por favor ingresá tu nombre.');
      valid = false;
    }

    if (!email || !email.includes('@')) {
      showError('email', 'email-error', 'Por favor ingresá un email válido.');
      valid = false;
    }

    if (!tema) {
      showError('tema', 'tema-error', 'Contanos de qué hablarías.');
      valid = false;
    }

    if (!valid) return;

    status.textContent = '¡Gracias! Te vamos a contactar pronto.';
    status.classList.add('status-ok');
    form.reset();
  });
};

scrollReveal();
navbarScroll();
mobileNav();
statsCounter();
formHandler();
