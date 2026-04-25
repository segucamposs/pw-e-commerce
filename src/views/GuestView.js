'use client';
// 'use client' is required because this component uses hooks (useScrollReveal, useState, useEffect)
// and browser-specific behavior (click handlers on the logo).

import { useState, useEffect } from 'react';
import Link from 'next/link';
import '../guest.css';
import GuestForm from '@/components/GuestForm';
import useScrollReveal from '@/hooks/useScrollReveal';

function GuestView() {
  useScrollReveal();

  // episodeCount starts at null so we can show a loading state.
  // Once /api/episodes responds, we update it with the real count.
  const [episodeCount, setEpisodeCount] = useState(null);

  useEffect(() => {
    fetch('/api/episodes')
      .then((res) => res.json())
      .then((data) => setEpisodeCount(data.count))
      .catch(() => setEpisodeCount(14)); // fallback if fetch fails
  }, []);

  return (
    <div className="page-wrap">

      <header className="g-header">
        {/* Link is Next.js's navigation component — client-side, no full reload. */}
        <Link href="/" aria-label="Volver al inicio">
          <img
            src="/assets/swap-logo-transparent.png" alt="SWAP Podcast" className="g-logo"
          />
        </Link>
        <p className="g-handle">@swapodcast</p>
      </header>

      <section className="g-hero" aria-labelledby="g-hero-title">
        <h1 className="g-hero-title" id="g-hero-title">
          Construiste algo.<br /><em>Contálo.</em>
        </h1>
        <p className="g-hero-sub">
          No buscamos expertos ni figuras públicas. Buscamos gente con algo genuino para contar — aunque no tengan todo resuelto.
        </p>
      </section>

      <section className="g-section" aria-labelledby="temas-title">
        <h2 className="g-section-title" id="temas-title">De qué hablamos</h2>
        <ul className="topics-list">
          {[
            { color: '#FF6600', label: '⚡ Productividad' },
            { color: '#FF6B6B', label: '🧠 Mindset' },
            { color: '#4ECDC4', label: '🚀 Emprendimiento' },
            { color: '#A78BFA', label: '🤖 Inteligencia Artificial' },
            { color: '#F59E0B', label: '💪 Salud & Energía' },
            { color: '#34D399', label: '🎯 Carrera' },
          ].map((t) => (
            <li key={t.label} className="topic-pill" style={{ '--t': t.color }}>{t.label}</li>
          ))}
          <li className="topic-pill topic-pill--more">y más...</li>
        </ul>
      </section>

      <section className="g-section" aria-labelledby="hosts-title">
        <h2 className="g-section-title" id="hosts-title">Los hosts</h2>
        <div className="hosts-grid">
          <article className="host-card">
            <div className="host-avatar" aria-hidden="true">S</div>
            <h3 className="host-name">Segu</h3>
            <p className="host-role">Co-host &amp; creador</p>
            <p className="host-bio">Estudiante de ingeniería. Apasionado por la productividad, el emprendimiento y cómo la tecnología cambia la forma en que construimos cosas.</p>
          </article>
          <article className="host-card">
            <div className="host-avatar host-avatar--alt" aria-hidden="true">F</div>
            <h3 className="host-name">Francisco</h3>
            <p className="host-role">Co-host &amp; creador</p>
            <p className="host-bio">Emprendedor y creador de contenido. Le apasiona el bienestar, el mindset y cómo los jóvenes están construyendo su camino propio.</p>
          </article>
        </div>
      </section>

      <section className="g-section" aria-labelledby="numeros-title">
        <h2 className="g-section-title" id="numeros-title">SWAP en números</h2>
        <div className="numbers-row">
          <div className="number-item" role="listitem">
            <span className="number-val">
              {episodeCount === null ? '—' : episodeCount}
            </span>
            <span className="number-label">episodios</span>
          </div>
          <div className="number-item" role="listitem">
            <span className="number-cadence-label">Nuevo episodio todos los...</span>
            <span className="number-cadence-day">viernes 19hs</span>
            <span className="number-cadence-dot" aria-hidden="true"></span>
          </div>
        </div>
      </section>

      <section className="g-section" aria-labelledby="escucha-ahora-title">
        <h2 className="g-section-title" id="escucha-ahora-title">Escuchá un episodio</h2>
        <div className="g-spotify-embed">
          <iframe
            src="https://open.spotify.com/embed/show/1t25iC8KdPXDZ9BUr1KgxY?utm_source=generator&theme=0"
            width="100%" height="152" frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            title="SWAP Podcast en Spotify"
          ></iframe>
        </div>
      </section>

      <section className="g-section" aria-labelledby="como-es-title">
        <h2 className="g-section-title" id="como-es-title">¿Cómo es grabar en SWAP?</h2>
        <div className="g-testimonials">
          {[
            { icon: '🎙', title: 'Sin preparación formal', desc: 'Te hacemos preguntas, vos respondés desde tu experiencia. No hay guión ni respuestas correctas.' },
            { icon: '🤝', title: 'Vos manejás el ritmo', desc: 'Si hay algo que preferís no tocar, lo saltamos. La conversación sigue tu comodidad.' },
            { icon: '📍', title: 'Presencial', desc: 'Grabamos en persona en Buenos Aires. Podemos organizar virtual si estás en otro lado del mundo.' },
            { icon: '✂️', title: 'Nosotros editamos todo', desc: 'Solo tenés que aparecer y hablar. El resto lo manejamos nosotros.' },
          ].map((item) => (
            <div key={item.title} className="g-testimonial">
              <p className="g-testimonial-stars" aria-hidden="true">{item.icon}</p>
              <p className="g-testimonial-text" style={{ fontStyle: 'normal', fontWeight: 600, color: 'var(--text)' }}>{item.title}</p>
              <p className="g-testimonial-text" style={{ fontStyle: 'normal' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="g-section" aria-labelledby="escuchar-title">
        <h2 className="g-section-title" id="escuchar-title">Escuchanos</h2>
        <div className="platforms">
          <a href="https://open.spotify.com/show/1t25iC8KdPXDZ9BUr1KgxY?si=3f041e502d6c4350" target="_blank" rel="noopener noreferrer" className="platform-btn" aria-label="Escuchar SWAP en Spotify">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
            </svg>
            Spotify
          </a>
          <a href="https://www.youtube.com/@SwapPodcast" target="_blank" rel="noopener noreferrer" className="platform-btn" aria-label="Ver SWAP en YouTube">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            YouTube
          </a>
          <a href="https://www.tiktok.com/@swappodcast" target="_blank" rel="noopener noreferrer" className="platform-btn" aria-label="Ver SWAP en TikTok">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/>
            </svg>
            TikTok
          </a>
          <a href="https://www.instagram.com/swapodcast/" target="_blank" rel="noopener noreferrer" className="platform-btn" aria-label="Seguir SWAP en Instagram">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
            </svg>
            Instagram
          </a>
          <a href="https://podcasts.apple.com/ar/podcast/swap-podcast/id1830727081?l=en-GB" target="_blank" rel="noopener noreferrer" className="platform-btn" aria-label="Escuchar SWAP en Apple Podcasts">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M5.34 0A5.328 5.328 0 000 5.34v13.32A5.328 5.328 0 005.34 24h13.32A5.328 5.328 0 0024 18.66V5.34A5.328 5.328 0 0018.66 0zm6.525 2.568c2.336 0 4.448.902 6.056 2.587 1.224 1.272 1.912 2.619 2.264 4.392.12.59.12 2.2.007 2.864a8.506 8.506 0 01-3.24 5.296c-.608.46-2.096 1.261-2.336 1.261-.088 0-.096-.091-.056-.46.072-.592.144-.715.48-.856.536-.224 1.448-.874 2.008-1.435a7.644 7.644 0 002.008-3.536c.208-.824.184-2.656-.048-3.504-.728-2.696-2.928-4.792-5.624-5.352-.784-.16-2.208-.16-3 0-2.728.56-4.984 2.76-5.672 5.528-.184.752-.184 2.584 0 3.336.456 1.832 1.64 3.512 3.192 4.512.304.2.672.408.824.472.336.144.408.264.472.856.04.36.03.464-.056.464-.056 0-.464-.176-.896-.384l-.04-.03c-2.472-1.216-4.056-3.274-4.632-6.012-.144-.706-.168-2.392-.03-3.04.36-1.74 1.048-3.1 2.192-4.304 1.648-1.737 3.768-2.656 6.128-2.656zm.134 2.81c.409.004.803.04 1.106.106 2.784.62 4.76 3.408 4.376 6.174-.152 1.114-.536 2.03-1.216 2.88-.336.43-1.152 1.15-1.296 1.15-.023 0-.048-.272-.048-.603v-.605l.416-.496c1.568-1.878 1.456-4.502-.256-6.224-.664-.67-1.432-1.064-2.424-1.246-.64-.118-.776-.118-1.448-.008-1.02.167-1.81.562-2.512 1.256-1.72 1.704-1.832 4.342-.264 6.222l.413.496v.608c0 .336-.027.608-.06.608-.03 0-.264-.16-.512-.36l-.034-.011c-.832-.664-1.568-1.842-1.872-2.997-.184-.698-.184-2.024.008-2.72.504-1.878 1.888-3.335 3.808-4.019.41-.145 1.133-.22 1.814-.211zm-.13 2.99c.31 0 .62.06.844.178.488.253.888.745 1.04 1.259.464 1.578-1.208 2.96-2.72 2.254h-.015c-.712-.331-1.096-.956-1.104-1.77 0-.733.408-1.371 1.112-1.745.224-.117.534-.176.844-.176zm-.011 4.728c.988-.004 1.706.349 1.97.97.198.464.124 1.932-.218 4.302-.232 1.656-.36 2.074-.68 2.356-.44.39-1.064.498-1.656.288h-.003c-.716-.257-.87-.605-1.164-2.644-.341-2.37-.416-3.838-.218-4.302.262-.616.974-.966 1.97-.97z"/>
            </svg>
            Apple Podcasts
          </a>
        </div>
      </section>

      <section className="g-section" aria-labelledby="faq-title">
        <h2 className="g-section-title" id="faq-title">Todo lo que necesitás saber</h2>
        <div className="g-faq">
          {[
            { q: '¿Cuánto dura la grabación?', a: 'Alrededor de 1 hora. Editamos y nos quedamos con lo mejor de la conversación.' },
            { q: '¿Puedo grabar de forma remota?', a: 'Sí, por videollamada. Preferimos presencialidad si estás en Buenos Aires porque es mejor la dinámica.' },
            { q: '¿Necesito preparación previa?', a: 'No. Te hacemos preguntas, vos respondés desde tu experiencia. No hay guión ni respuestas correctas.' },
            { q: '¿Cuándo se publica el episodio?', a: 'Generalmente entre 1 y 2 semanas después de grabar. Te avisamos y te enviamos todo el material para compartir.' },
            { q: '¿Necesito ser conocido o tener muchos seguidores?', a: 'Para nada. Lo que importa es tu historia y perspectiva, no tus métricas. No buscamos influencers — buscamos conversaciones genuinas.' },
          ].map((item) => (
            <details key={item.q} className="faq-item">
              <summary className="faq-question">{item.q}</summary>
              <p className="faq-answer">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="g-cta" aria-labelledby="cta-title">
        <p className="cta-label">Sumate</p>
        <h2 className="cta-title" id="cta-title">¿Querés ser el próximo invitado?</h2>
        <p className="cta-sub">Contanos quién sos. No hace falta que seas famoso ni que tengas todo resuelto. Solo necesitás tener algo genuino para contar.</p>
        <GuestForm />
      </section>

      <footer className="g-footer">
        <img src="/assets/swap-logo-transparent.png" alt="SWAP Podcast" className="g-footer-logo" />
        <p>© 2026 SWAP Podcast · Argentina</p>
      </footer>

    </div>
  );
}

export default GuestView;
