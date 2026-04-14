import { useEffect } from 'react';
import Nav from '../components/Nav';
import ListenTabs from '../components/ListenTabs';
import NewsletterForm from '../components/NewsletterForm';
import useScrollReveal from '../hooks/useScrollReveal';

function HomePage({ navigate }) {
  // Activate scroll reveal animations for all .reveal elements.
  useScrollReveal();

  // Animate the stat numbers when they scroll into view.
  useEffect(() => {
    const numbers = document.querySelectorAll('.stat-number');
    if (!numbers.length) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const animateCount = (el, target, duration) => {
      const start = performance.now();
      const step = (now) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(eased * target);
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

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
    return () => observer.disconnect();
  }, []);

  const goToGuest = (e) => {
    e.preventDefault();
    navigate('guest');
  };

  return (
    <>
      <a href="#main" className="skip-link">Saltar al contenido principal</a>

      <Nav navigate={navigate} />

      <main id="main">

        {/* ── Hero ─────────────────────────────────────────── */}
        <section className="hero" id="hero" aria-labelledby="hero-heading">
          <div className="hero-bg" aria-hidden="true">
            <div className="orb orb--1"></div>
            <div className="orb orb--2"></div>
          </div>
          <div className="container hero-content">
            <p className="eyebrow reveal">
              <span className="eyebrow-dot" aria-hidden="true"></span>
              Podcast · Argentina &amp; LATAM
            </p>
            <h1 className="hero-title" id="hero-heading">
              <span className="hero-line reveal">¿Querés</span>
              <span className="hero-line reveal reveal--delay-1">ser parte</span>
              <span className="hero-line reveal reveal--delay-2">de <em>SWAP</em>?</span>
            </h1>
            <p className="hero-sub reveal reveal--delay-3">
              Conversaciones reales sobre salud, productividad, emprendimiento, IA y mindset.
              Para jóvenes que están construyendo algo.
            </p>
            <div className="hero-actions reveal reveal--delay-4">
              <button className="btn btn-primary" onClick={goToGuest}>Quiero ser invitado</button>
              <a href="#que-es" className="btn btn-ghost">Conocé el podcast</a>
            </div>
            <div className="hero-hosts reveal reveal--delay-5">
              <div className="host-avatars" aria-hidden="true">
                <div className="host-avatar">S</div>
                <div className="host-avatar">F</div>
              </div>
              <span className="host-label">Segu &amp; Francisco · hosts</span>
            </div>
          </div>
          <div className="marquee" aria-hidden="true">
            <div className="marquee-track">
              <span>SALUD</span><span aria-hidden="true">·</span>
              <span>PRODUCTIVIDAD</span><span aria-hidden="true">·</span>
              <span>EMPRENDIMIENTO</span><span aria-hidden="true">·</span>
              <span>INTELIGENCIA ARTIFICIAL</span><span aria-hidden="true">·</span>
              <span>MINDSET</span><span aria-hidden="true">·</span>
              <span>CARRERA</span><span aria-hidden="true">·</span>
              <span>SALUD</span><span aria-hidden="true">·</span>
              <span>PRODUCTIVIDAD</span><span aria-hidden="true">·</span>
              <span>EMPRENDIMIENTO</span><span aria-hidden="true">·</span>
              <span>INTELIGENCIA ARTIFICIAL</span><span aria-hidden="true">·</span>
              <span>MINDSET</span><span aria-hidden="true">·</span>
              <span>CARRERA</span><span aria-hidden="true">·</span>
            </div>
          </div>
        </section>

        {/* ── Qué es SWAP ──────────────────────────────────── */}
        <section className="section" id="que-es" aria-labelledby="que-es-heading">
          <div className="container que-es-grid">
            <div className="que-es-text">
              <p className="section-label reveal">Qué es SWAP</p>
              <h2 className="section-title reveal reveal--delay-1" id="que-es-heading">
                Un podcast para los que están <em>construyendo</em> su versión
              </h2>
              <p className="section-body reveal reveal--delay-2">
                SWAP es una conversación sin filtros entre jóvenes que están en el proceso — no los que ya llegaron. Hablamos de lo que está pasando de verdad: los fracasos, los aprendizajes, las herramientas que funcionan.
              </p>
              <p className="section-body reveal reveal--delay-3">
                Cada episodio trae una perspectiva distinta. Tu historia puede ser la que alguien necesita escuchar.
              </p>
            </div>
            <div className="stats-grid" aria-label="Estadísticas del podcast">
              <div className="stat-card reveal">
                <span className="stat-number" data-target="50">0</span>
                <span className="stat-label">episodios</span>
              </div>
              <div className="stat-card reveal reveal--delay-1">
                <span className="stat-number" data-target="16">0</span>
                <span className="stat-label">a 25 años</span>
              </div>
              <div className="stat-card reveal reveal--delay-2">
                <span className="stat-number" data-target="5">0</span>
                <span className="stat-label">países</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── Temas ────────────────────────────────────────── */}
        <section className="section temas-section" id="temas" aria-labelledby="temas-heading">
          <div className="container">
            <p className="section-label reveal">De qué hablamos</p>
            <h2 className="section-title reveal reveal--delay-1" id="temas-heading">Los temas que nos mueven</h2>
            <ul className="temas-grid">
              {[
                { color: '#C8FF00', icon: '⚡', name: 'Productividad', desc: 'Sistemas reales para hacer más con menos fricción.' },
                { color: '#FF6B6B', icon: '🧠', name: 'Mindset', desc: 'La mentalidad detrás de quienes construyen cosas.' },
                { color: '#4ECDC4', icon: '🚀', name: 'Emprendimiento', desc: 'Proyectos reales, desde cero, sin romanticismo.' },
                { color: '#A78BFA', icon: '🤖', name: 'Inteligencia Artificial', desc: 'Cómo los jóvenes usan IA para moverse más rápido.' },
                { color: '#F59E0B', icon: '💪', name: 'Salud & Energía', desc: 'El cuerpo y la mente como base de todo lo demás.' },
                { color: '#34D399', icon: '🎯', name: 'Carrera', desc: 'Cómo posicionarte en el mercado que viene.' },
              ].map((tema, i) => (
                <li
                  key={tema.name}
                  className={`tema-card reveal${i > 0 ? ` reveal--delay-${i}` : ''}`}
                  style={{ '--tema-color': tema.color }}
                >
                  <span className="tema-icon" aria-hidden="true">{tema.icon}</span>
                  <h3 className="tema-name">{tema.name}</h3>
                  <p className="tema-desc">{tema.desc}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── Episodios ────────────────────────────────────── */}
        <section className="section episodios-section" id="episodios" aria-labelledby="episodios-heading">
          <div className="container">
            <p className="section-label reveal">Episodios recientes</p>
            <h2 className="section-title reveal reveal--delay-1" id="episodios-heading">Lo que estamos hablando</h2>
            <div className="episodios-grid">
              {[
                { num: '01', tag: '⚡ Productividad', title: 'Cómo construir hábitos que realmente duran', desc: 'Los sistemas detrás de las personas que hacen más. Sin fuerza de voluntad — solo estructura.' },
                { num: '02', tag: '🚀 Emprendimiento', title: 'Emprender desde cero en Argentina', desc: 'Qué significa construir algo propio en un contexto difícil — y por qué eso puede ser una ventaja.' },
                { num: '03', tag: '🤖 Inteligencia Artificial', title: 'IA: el arma secreta de los jóvenes', desc: 'Cómo usar inteligencia artificial para moverse más rápido que cualquier generación anterior.' },
              ].map((ep, i) => (
                <article key={ep.num} className={`episodio-card reveal${i > 0 ? ` reveal--delay-${i}` : ''}`}>
                  <span className="ep-badge">Ep. {ep.num}</span>
                  <span className="ep-tag">{ep.tag}</span>
                  <h3 className="ep-title">{ep.title}</h3>
                  <p className="ep-desc">{ep.desc}</p>
                  <a href="https://open.spotify.com/show/1t25iC8KdPXDZ9BUr1KgxY?si=3f041e502d6c4350" target="_blank" rel="noopener noreferrer" className="ep-link">Escuchar →</a>
                </article>
              ))}
            </div>
            <div className="episodios-footer reveal">
              <a href="https://open.spotify.com/show/1t25iC8KdPXDZ9BUr1KgxY?si=3f041e502d6c4350" target="_blank" rel="noopener noreferrer" className="btn btn-ghost">Ver todos los episodios →</a>
            </div>
          </div>
        </section>

        {/* ── Por qué aparecer ─────────────────────────────── */}
        <section className="section porque-section" aria-labelledby="porque-heading">
          <div className="container">
            <p className="section-label reveal">Por qué aparecer</p>
            <h2 className="section-title reveal reveal--delay-1" id="porque-heading">Tu historia tiene valor</h2>
            <ul className="porque-list">
              {[
                { num: '01', title: 'Amplificá tu voz', desc: 'Llegá a miles de jóvenes argentinos y latinoamericanos que están buscando exactamente lo que vos tenés para contar.' },
                { num: '02', title: 'Conversación real', desc: 'No es una entrevista de PR. Es una charla entre pares — sin guión, sin respuestas ensayadas.' },
                { num: '03', title: 'Contenido que queda', desc: 'El episodio se publica en Spotify, YouTube y redes. Tu historia sigue llegando a gente nueva mucho después de grabarlo.' },
              ].map((item, i) => (
                <li key={item.num} className={`porque-item reveal${i > 0 ? ` reveal--delay-${i}` : ''}`}>
                  <span className="porque-num" aria-hidden="true">{item.num}</span>
                  <div className="porque-text">
                    <h3 className="porque-item-title">{item.title}</h3>
                    <p className="porque-item-desc">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── Proceso ──────────────────────────────────────── */}
        <section className="section" id="proceso" aria-labelledby="proceso-heading">
          <div className="container">
            <p className="section-label reveal">Cómo funciona</p>
            <h2 className="section-title reveal reveal--delay-1" id="proceso-heading">El proceso, paso a paso</h2>
            <ol className="proceso-steps">
              {[
                { num: '01', title: 'Mandanos tu info', desc: 'Completá el formulario. Contanos quién sos y de qué podrías hablar.' },
                { num: '02', title: 'Nos ponemos en contacto', desc: 'Si el tema encaja, te escribimos para coordinar fecha y hora. Remoto o presencial en Buenos Aires.' },
                { num: '03', title: 'Grabamos', desc: 'Una hora de conversación. Sin preparación formal. Vos sos el experto en tu propia historia.' },
                { num: '04', title: 'Sale al aire', desc: 'Editamos, subimos y distribuimos. Vos recibís todo el contenido para compartir en tus redes.' },
              ].map((step, i) => (
                <li key={step.num} className={`proceso-step reveal${i > 0 ? ` reveal--delay-${i}` : ''}`}>
                  <div className="paso-marker" aria-hidden="true">{step.num}</div>
                  <div className="paso-content">
                    <h3 className="paso-title">{step.title}</h3>
                    <p className="paso-desc">{step.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── Escuchanos ───────────────────────────────────── */}
        <section className="section escuchanos-section" id="escuchanos" aria-labelledby="escuchanos-heading">
          <div className="container escuchanos-inner">
            <p className="section-label reveal">Dónde encontrarnos</p>
            <h2 className="section-title reveal reveal--delay-1" id="escuchanos-heading">Escuchanos antes de sumarte</h2>
            <div className="reveal reveal--delay-2">
              <ListenTabs />
            </div>
            <div className="plataformas plataformas--social reveal reveal--delay-4">
              <span className="social-label">Seguinos en redes:</span>
              <a href="https://www.tiktok.com/@swappodcast" target="_blank" rel="noopener noreferrer" className="plataforma-btn" aria-label="Ver SWAP en TikTok">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/>
                </svg>
                TikTok
              </a>
              <a href="https://www.instagram.com/swapodcast/" target="_blank" rel="noopener noreferrer" className="plataforma-btn" aria-label="Seguir SWAP en Instagram">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
                </svg>
                Instagram
              </a>
            </div>
          </div>
        </section>

      </main>

      {/* ── Newsletter ───────────────────────────────────── */}
        <section className="section newsletter-section" aria-labelledby="newsletter-heading">
          <div className="container newsletter-inner">
            <div className="newsletter-text reveal">
              <p className="section-label">Comunidad SWAP</p>
              <h2 className="section-title" id="newsletter-heading">
                Sé el primero en enterarte
              </h2>
              <p className="section-body">
                Nuevo episodio cada semana. Sin spam — solo el contenido que vale la pena.
              </p>
            </div>
            <div className="reveal reveal--delay-2">
              <NewsletterForm />
            </div>
          </div>
        </section>

      {/* ── Footer ───────────────────────────────────────── */}
      <footer className="footer" role="contentinfo">
        <div className="container footer-inner">
          <img src="/assets/swap-logo-transparent.png" alt="SWAP Podcast" className="footer-logo" />
          <button className="btn btn-primary footer-cta" onClick={goToGuest}>
            Quiero ser invitado
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M2 8h12M9 3l5 5-5 5" />
            </svg>
          </button>
          <p className="footer-copy">© 2026 SWAP Podcast · Argentina</p>
          <p className="footer-tagline">Para los que están construyendo su versión.</p>
        </div>
      </footer>
    </>
  );
}

export default HomePage;
