'use client';
// 'use client' tells Next.js this component runs in the browser (not on the server).
// It's required here because we use React hooks (useEffect, useState) and browser APIs
// like IntersectionObserver. Server Components can't use any of these.

import { useEffect } from 'react';
import Nav from '@/components/Nav';
import ListenTabs from '@/components/ListenTabs';
import NewsletterForm from '@/components/NewsletterForm';
import useScrollReveal from '@/hooks/useScrollReveal';

function HomeView() {
  // useRouter gives us programmatic navigation — the Next.js equivalent of navigate().
  useScrollReveal();

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

  return (
    <>
      <a href="#main" className="skip-link">Saltar al contenido principal</a>

      <Nav />

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
              <span className="hero-line reveal">Aprende de</span>
              <span className="hero-line reveal reveal--delay-1">quienes están</span>
              <span className="hero-line reveal reveal--delay-2">en el <em>proceso</em>.</span>
            </h1>
            <p className="hero-sub reveal reveal--delay-3">
              SWAP es el podcast en español donde jóvenes de 16 a 25 hablan de salud, carrera, emprendimiento e IA — sin postureo, sin guión. Conversaciones reales que te dan algo para aplicar.
            </p>
            <div className="hero-actions reveal reveal--delay-4">
              <a href="https://open.spotify.com/show/1t25iC8KdPXDZ9BUr1KgxY?si=3f041e502d6c4350" target="_blank" rel="noopener noreferrer" className="btn btn-primary">Escuchar en Spotify</a>
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
                Una <em>conversación</em>, no una entrevista
              </h2>
              <p className="section-body reveal reveal--delay-2">
                SWAP no es un podcast de grandes figuras hablando desde arriba. Es una conversación entre pares — jóvenes que están en el proceso, compartiendo lo que realmente está pasando.
              </p>
              <p className="section-body reveal reveal--delay-3">
                Hablamos de salud, carrera, emprendimiento e IA desde la experiencia real: los errores, las dudas, las herramientas que funcionan. Hosts y audiencia aprendemos juntos.
              </p>
            </div>
            <div className="stats-grid" aria-label="Estadísticas del podcast">
              <div className="stat-card reveal">
                <span className="stat-number" data-target="14">0</span>
                <span className="stat-label">episodios</span>
              </div>
              <div className="stat-card reveal reveal--delay-1">
                <span className="stat-number" data-target="16">0</span>
                <span className="stat-label">a 25 años</span>
              </div>
              <div className="stat-card reveal reveal--delay-2">
                <span className="stat-number" data-target="4">0</span>
                <span className="stat-label">plataformas</span>
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
                { color: '#FF6600', icon: '⚡', name: 'Productividad', desc: 'Sistemas concretos. Sin fuerza de voluntad.' },
                { color: '#FF6B6B', icon: '🧠', name: 'Mindset', desc: 'Cómo piensan los que construyen cosas.' },
                { color: '#4ECDC4', icon: '🚀', name: 'Emprendimiento', desc: 'Desde cero, en Argentina, sin romanticismo.' },
                { color: '#A78BFA', icon: '🤖', name: 'Inteligencia Artificial', desc: 'La herramienta que cambia todo si sabés usarla.' },
                { color: '#F59E0B', icon: '💪', name: 'Salud & Energía', desc: 'Sin base física y mental, nada funciona.' },
                { color: '#34D399', icon: '🎯', name: 'Carrera', desc: 'Posicionarte en el mercado que viene.' },
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
                { num: '01', tag: '💪 Salud & Energía', title: 'Cuerpo y rendimiento: lo que nadie te dice sobre entrenar', desc: 'Hablamos con un coach de fitness sobre los mitos del entrenamiento y por qué la mayoría abandona antes de ver resultados.' },
                { num: '02', tag: '🎯 Carrera', title: 'Crear contenido para marcas: el negocio que nadie enseña', desc: 'Una creadora de UGC nos cuenta cómo construyó su carrera sin audiencia propia — solo habilidad, sistema y consistencia.' },
                { num: '03', tag: '⚡ Productividad', title: 'Las herramientas que usamos para hacer más con menos', desc: 'Los sistemas y apps que cambiaron nuestra forma de trabajar — y por qué la productividad no es lo que te vendieron.' },
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

        {/* ── Por qué escucharnos ──────────────────────────── */}
        <section className="section porque-section" aria-labelledby="porque-heading">
          <div className="container">
            <p className="section-label reveal">Por qué escucharnos</p>
            <h2 className="section-title reveal reveal--delay-1" id="porque-heading">Lo que te llevás</h2>
            <ul className="porque-list">
              {[
                { num: '01', title: 'Perspectivas desde adentro', desc: 'Hablamos con gente que está en el proceso real, no gurús con respuestas armadas. Lo que dicen, lo vivieron.' },
                { num: '02', title: 'Algo para aplicar, siempre', desc: 'Después de cada episodio tenés al menos una idea, herramienta o perspectiva nueva. No solo motivación — acción.' },
                { num: '03', title: 'Una comunidad que entiende', desc: 'No sos el único que está construyendo algo sin tener todo claro. En SWAP, eso es exactamente el punto.' },
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

        {/* ── El formato ───────────────────────────────────── */}
        <section className="section" id="proceso" aria-labelledby="proceso-heading">
          <div className="container">
            <p className="section-label reveal">Cómo funciona</p>
            <h2 className="section-title reveal reveal--delay-1" id="proceso-heading">Qué vas a encontrar</h2>
            <ol className="proceso-steps">
              {[
                { num: '01', title: 'Episodios con invitados', desc: 'Conversaciones de 60 a 90 minutos con gente que tiene algo valioso para contar. Sin apuro, sin guión.' },
                { num: '02', title: 'Episodios solo', desc: 'Segu y Francisco hablando de lo que les está pasando. Hasta 30 minutos, ida y vuelta, sin filtros.' },
                { num: '03', title: 'Sin intro, sin música', desc: 'Arrancamos directo. Cero producción de relleno — solo conversación desde el primer segundo.' },
                { num: '04', title: 'Nuevo episodio cada semana', desc: 'Subimos consistentemente para que siempre tengas algo nuevo para escuchar.' },
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
            <h2 className="section-title reveal reveal--delay-1" id="escuchanos-heading">Escuchanos donde quieras</h2>
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
              Un episodio nuevo, cada semana.
            </h2>
            <p className="section-body">
              Nada de newsletters de relleno. Solo te avisamos cuando hay algo que vale la pena escuchar.
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
          <a href="https://open.spotify.com/show/1t25iC8KdPXDZ9BUr1KgxY?si=3f041e502d6c4350" target="_blank" rel="noopener noreferrer" className="btn btn-primary footer-cta">
            Escuchar ahora
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M2 8h12M9 3l5 5-5 5" />
            </svg>
          </a>
          <p className="footer-copy">© 2026 SWAP Podcast · Argentina</p>
          <p className="footer-tagline">Para los que están construyendo su versión.</p>
        </div>
      </footer>
    </>
  );
}

export default HomeView;
